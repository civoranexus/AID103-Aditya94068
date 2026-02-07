import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WeatherData {
  temperature: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  weatherDescription: string;
  windSpeed: number;
  conditions: string[];
  diseaseRiskFactors: string[];
  alerts: string[];
}

async function fetchWeatherData(latitude: number, longitude: number): Promise<WeatherData | null> {
  try {
    console.log(`Fetching weather for coordinates: ${latitude}, ${longitude}`);
    
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
    );
    
    if (!response.ok) {
      console.error("Weather API error:", response.status);
      return null;
    }
    
    const data = await response.json();
    const current = data.current;
    
    const weatherDescriptions: Record<number, string> = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Slight snow",
      73: "Moderate snow",
      75: "Heavy snow",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };
    
    const weatherCode = current.weather_code;
    const temperature = current.temperature_2m;
    const humidity = current.relative_humidity_2m;
    const precipitation = current.precipitation;
    
    // Analyze disease risk factors
    const diseaseRiskFactors: string[] = [];
    const alerts: string[] = [];
    const conditions: string[] = [];
    
    // High humidity risk
    if (humidity > 80) {
      diseaseRiskFactors.push("High humidity (>80%) increases fungal disease risk");
      alerts.push("🍄 High humidity alert: Monitor for fungal infections like powdery mildew, downy mildew, and leaf blight");
      conditions.push("High Humidity");
    } else if (humidity > 65) {
      conditions.push("Moderate Humidity");
    }
    
    // Temperature-based risks
    if (temperature > 25 && temperature < 35 && humidity > 70) {
      diseaseRiskFactors.push("Warm and humid conditions favor bacterial and fungal growth");
      alerts.push("⚠️ Disease-favorable weather: Warm humid conditions increase pathogen activity");
    }
    
    if (temperature < 10) {
      diseaseRiskFactors.push("Cold stress may weaken plant immunity");
      alerts.push("❄️ Cold stress alert: Plants may be more susceptible to infections");
      conditions.push("Cold Stress Risk");
    } else if (temperature > 38) {
      diseaseRiskFactors.push("Heat stress can cause wilting and weaken defenses");
      alerts.push("🌡️ Heat stress alert: Ensure adequate irrigation and consider shade netting");
      conditions.push("Heat Stress Risk");
    }
    
    // Rain and moisture risks
    if (precipitation > 0 || [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
      diseaseRiskFactors.push("Wet conditions promote disease spread through water splashing");
      alerts.push("🌧️ Wet weather alert: Avoid foliar applications; diseases spread easily in rain");
      conditions.push("Wet Conditions");
    }
    
    // Fog risk
    if ([45, 48].includes(weatherCode)) {
      diseaseRiskFactors.push("Foggy conditions maintain leaf wetness, promoting infections");
      alerts.push("🌫️ Fog alert: Prolonged leaf wetness increases disease risk");
      conditions.push("Foggy");
    }
    
    if (conditions.length === 0) {
      conditions.push("Normal");
    }
    
    return {
      temperature,
      humidity,
      precipitation,
      weatherCode,
      weatherDescription: weatherDescriptions[weatherCode] || "Unknown",
      windSpeed: current.wind_speed_10m,
      conditions,
      diseaseRiskFactors,
      alerts,
    };
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null;
  }
}

async function geocodeLocation(location: string): Promise<{ lat: number; lon: number } | null> {
  try {
    console.log(`Geocoding location: ${location}`);
    
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
    );
    
    if (!response.ok) {
      console.error("Geocoding API error:", response.status);
      return null;
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      console.log(`Found coordinates for ${location}: ${result.latitude}, ${result.longitude}`);
      return { lat: result.latitude, lon: result.longitude };
    }
    
    console.log(`No geocoding results for: ${location}`);
    return null;
  } catch (error) {
    console.error("Geocoding failed:", error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, cropType, farmLocation, growthStage } = await req.json();
    
    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service is not configured");
    }

    console.log("Analyzing crop image...");
    console.log(`Crop Type: ${cropType || 'Not specified'}`);
    console.log(`Location: ${farmLocation || 'Not specified'}`);
    console.log(`Growth Stage: ${growthStage || 'Not specified'}`);

    // Fetch weather data if location is provided
    let weatherData: WeatherData | null = null;
    if (farmLocation) {
      const coords = await geocodeLocation(farmLocation);
      if (coords) {
        weatherData = await fetchWeatherData(coords.lat, coords.lon);
        console.log("Weather data fetched:", weatherData ? "success" : "failed");
      }
    }

    const weatherContext = weatherData
      ? `
Current Weather Conditions at Farm Location:
- Temperature: ${weatherData.temperature}°C
- Humidity: ${weatherData.humidity}%
- Weather: ${weatherData.weatherDescription}
- Wind Speed: ${weatherData.windSpeed} km/h
- Precipitation: ${weatherData.precipitation} mm

Weather-Related Disease Risk Factors:
${weatherData.diseaseRiskFactors.length > 0 ? weatherData.diseaseRiskFactors.map(f => `- ${f}`).join('\n') : '- No significant weather-related risks detected'}

Consider these weather conditions when providing treatment recommendations and preventive measures.`
      : '';

    const systemPrompt = `You are CropGuard AI, an expert agricultural disease detection and advisory system developed by Civora Nexus Pvt. Ltd. You analyze crop images to identify diseases, pests, and health issues.

Your analysis must be:
- Accurate and based on visible symptoms in the image
- Context-aware (consider crop type, location, growth stage, and weather conditions if provided)
- Weather-informed: correlate disease risk with current weather conditions
- Actionable with clear treatment recommendations
- Farmer-friendly with simple, understandable language

Always structure your response as a JSON object with the following fields:
{
  "healthStatus": "healthy" | "warning" | "critical",
  "overallConfidence": number (0-100),
  "diagnosis": {
    "primaryCondition": string,
    "scientificName": string (if applicable),
    "description": string,
    "affectedParts": string[],
    "severity": "mild" | "moderate" | "severe",
    "spreadRisk": "low" | "medium" | "high"
  },
  "causes": string[],
  "symptoms": string[],
  "treatment": {
    "immediate": string[],
    "organic": string[],
    "chemical": string[],
    "preventive": string[]
  },
  "weatherCorrelation": {
    "relevance": string,
    "weatherImpact": string,
    "adjustedRecommendations": string[]
  },
  "recommendations": string[],
  "additionalNotes": string
}

If the image doesn't show a crop or plant, respond with healthStatus "unknown" and explain in additionalNotes.`;

    const userPrompt = `Analyze this crop image for diseases, pests, or health issues.

Context:
- Crop Type: ${cropType || 'Not specified (please identify if possible)'}
- Farm Location: ${farmLocation || 'Not specified'}
- Growth Stage: ${growthStage || 'Not specified'}
${weatherContext}

Please provide a comprehensive analysis with treatment recommendations, considering the current weather conditions for disease correlation and preventive measures.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: userPrompt },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64.startsWith("data:") ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add more credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error("Failed to analyze image");
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No analysis received from AI");
    }

    console.log("AI Response received successfully");

    // Parse the JSON from the AI response
    let analysisResult;
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                        content.match(/```\s*([\s\S]*?)\s*```/) ||
                        [null, content];
      const jsonString = jsonMatch[1] || content;
      analysisResult = JSON.parse(jsonString.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      analysisResult = {
        healthStatus: "warning",
        overallConfidence: 70,
        diagnosis: {
          primaryCondition: "Analysis Complete",
          scientificName: "",
          description: content,
          affectedParts: [],
          severity: "moderate",
          spreadRisk: "medium"
        },
        causes: [],
        symptoms: [],
        treatment: {
          immediate: [],
          organic: [],
          chemical: [],
          preventive: []
        },
        weatherCorrelation: null,
        recommendations: ["Please review the detailed analysis above."],
        additionalNotes: "Raw analysis provided - structured parsing was not possible."
      };
    }

    // Add weather data to response
    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis: analysisResult,
        weather: weatherData 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in analyze-crop function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
