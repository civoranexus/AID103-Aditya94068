import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ImageUpload } from "@/components/ImageUpload";
import { FarmDetails } from "@/components/FarmDetail";
import { AnalysisResult } from "@/components/AnalysisResult";
import { WeatherAlert } from "@/components/WeatherAlert";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TypewriterText } from "@/components/TypewriterText";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { FloatingParticles } from "@/components/FloatingParticles";
import { InteractiveCard } from "@/components/interactive-card";
import { ScrollToTop } from "@/components/ScrollToTop";
import { supabase } from "@/integrations/supabase/client.ts";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Shield, Leaf, Zap, Users, Cloud, TrendingUp, Microscope, Globe } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const [cropType, setCropType] = useState("");
  const [farmLocation, setFarmLocation] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  const handleImageAnalysis = async (imageBase64: string) => {
    setIsLoading(true);
    setAnalysis(null);
    setWeather(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-crop", {
        body: { imageBase64, cropType, farmLocation, growthStage },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setAnalysis(data.analysis);
      setWeather(data.weather);
      toast({ title: "Analysis Complete", description: "Your crop has been analyzed successfully." });

      if (user && data.analysis) {
        const { error: saveError } = await supabase.from("analysis_history").insert({
          user_id: user.id,
          crop_type: cropType || null,
          farm_location: farmLocation || null,
          growth_stage: growthStage || null,
          analysis_result: data.analysis,
        });

        if (saveError) {
          console.error("Failed to save analysis:", saveError);
        }
      }
    } catch (error: any) {
      toast({ title: "Analysis Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Shield, label: "Accurate Detection", desc: "AI-powered analysis" },
    { icon: Leaf, label: "Organic Solutions", desc: "Eco-friendly treatments" },
    { icon: Zap, label: "Instant Results", desc: "Real-time analysis" },
    { icon: Cloud, label: "Weather Aware", desc: "Climate correlation" },
    { icon: Users, label: "Farmer Friendly", desc: "Simple interface" },
  ];

  const stats = [
    { value: 50, suffix: "+", label: "Crop Types", icon: Leaf },
    { value: 95, suffix: "%", label: "Accuracy", icon: Microscope },
    { value: 24, suffix: "/7", label: "Availability", icon: Globe },
    { value: 100, suffix: "+", label: "Diseases", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-20 bg-gradient-to-b from-secondary to-background overflow-hidden">
          <FloatingParticles />
          <div className="container text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Zap className="h-4 w-4" />
              AI-Powered Disease Detection
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            >
              Protect Your Crops with{" "}
              <span className="text-primary">
                <TypewriterText
                  texts={["AI Intelligence", "Smart Detection", "Instant Diagnosis", "Weather Insights"]}
                  speed={100}
                  deleteSpeed={50}
                  pauseTime={2500}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Upload an image of your crop and get instant AI-powered disease detection, 
              diagnosis, and treatment recommendations.
            </motion.p>

            {/* Animated Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="p-4 rounded-xl bg-card border border-border shadow-sm cursor-default"
                >
                  <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2000 + i * 300} />
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-8 border-b border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {features.map((feature, i) => (
                <InteractiveCard key={i} delay={i * 0.08} hoverScale={1.05}>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border group">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="h-8 w-8 text-primary shrink-0" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-sm">{feature.label}</p>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-10">
          <div className="container max-w-4xl space-y-6">
            <ScrollReveal>
              <FarmDetails
                cropType={cropType}
                setCropType={setCropType}
                farmLocation={farmLocation}
                setFarmLocation={setFarmLocation}
                growthStage={growthStage}
                setGrowthStage={setGrowthStage}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <ImageUpload onImageSelect={handleImageAnalysis} isLoading={isLoading} />
            </ScrollReveal>
            {weather && (
              <ScrollReveal>
                <WeatherAlert weather={weather} />
              </ScrollReveal>
            )}
            {analysis && (
              <ScrollReveal>
                <AnalysisResult analysis={analysis} />
              </ScrollReveal>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
