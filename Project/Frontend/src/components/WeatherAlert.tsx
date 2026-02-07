import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Droplets, Wind, Thermometer, AlertTriangle } from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  precipitation: number;
  weatherDescription: string;
  windSpeed: number;
  conditions: string[];
  diseaseRiskFactors: string[];
  alerts: string[];
}

interface WeatherAlertProps {
  weather: WeatherData | null;
}

export const WeatherAlert = ({ weather }: WeatherAlertProps) => {
  if (!weather) return null;

  const hasAlerts = weather.alerts && weather.alerts.length > 0;
  const hasRisks = weather.diseaseRiskFactors && weather.diseaseRiskFactors.length > 0;

  return (
    <Card className={`border-2 ${hasAlerts ? 'border-warning bg-warning/5' : 'border-border'}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Cloud className="h-5 w-5 text-primary" />
          Weather Conditions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
            <Thermometer className="h-4 w-4 text-destructive" />
            <div>
              <p className="text-xs text-muted-foreground">Temperature</p>
              <p className="font-semibold">{weather.temperature}°C</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
            <Droplets className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="font-semibold">{weather.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
            <Cloud className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Weather</p>
              <p className="font-semibold text-sm">{weather.weatherDescription}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
            <Wind className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Wind</p>
              <p className="font-semibold">{weather.windSpeed} km/h</p>
            </div>
          </div>
        </div>

        {/* Conditions Tags */}
        {weather.conditions && weather.conditions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {weather.conditions.map((condition, i) => (
              <Badge 
                key={i} 
                variant={condition.includes("Risk") || condition.includes("Stress") ? "destructive" : "secondary"}
              >
                {condition}
              </Badge>
            ))}
          </div>
        )}

        {/* Disease Risk Alerts */}
        {hasAlerts && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2 text-warning">
              <AlertTriangle className="h-4 w-4" />
              Weather Alerts
            </h4>
            <div className="space-y-2">
              {weather.alerts.map((alert, i) => (
                <div key={i} className="p-3 rounded-lg bg-warning/10 border border-warning/30 text-sm">
                  {alert}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Disease Risk Factors */}
        {hasRisks && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Disease Risk Factors</h4>
            <ul className="space-y-1">
              {weather.diseaseRiskFactors.map((factor, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
