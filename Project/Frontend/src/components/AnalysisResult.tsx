import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Pill,
  Leaf,
  Shield,
  Info,
  ArrowRight,
  Bug,
  Droplets,
  Cloud,
} from "lucide-react";
import { cn } from "@/lib/utilis";

interface WeatherCorrelation {
  relevance: string;
  weatherImpact: string;
  adjustedRecommendations: string[];
}

interface AnalysisData {
  healthStatus: "healthy" | "warning" | "critical" | "unknown";
  overallConfidence: number;
  diagnosis: {
    primaryCondition: string;
    scientificName: string;
    description: string;
    affectedParts: string[];
    severity: "mild" | "moderate" | "severe";
    spreadRisk: "low" | "medium" | "high";
  };
  causes: string[];
  symptoms: string[];
  treatment: {
    immediate: string[];
    organic: string[];
    chemical: string[];
    preventive: string[];
  };
  weatherCorrelation?: WeatherCorrelation;
  recommendations: string[];
  additionalNotes: string;
}

interface AnalysisResultProps {
  analysis: AnalysisData;
}

const statusConfig = {
  healthy: {
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    label: "Healthy",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    label: "Warning",
  },
  critical: {
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    label: "Critical",
  },
  unknown: {
    icon: Info,
    color: "text-info",
    bgColor: "bg-info/10",
    borderColor: "border-info/30",
    label: "Unknown",
  },
};

const severityColors = {
  mild: "bg-success/20 text-success border-success/30",
  moderate: "bg-warning/20 text-warning border-warning/30",
  severe: "bg-destructive/20 text-destructive border-destructive/30",
};

const riskColors = {
  low: "bg-success/20 text-success",
  medium: "bg-warning/20 text-warning",
  high: "bg-destructive/20 text-destructive",
};

export const AnalysisResult = ({ analysis }: AnalysisResultProps) => {
  const status = statusConfig[analysis.healthStatus] || statusConfig.unknown;
  const StatusIcon = status.icon;

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Status Header */}
      <Card className={cn("border-2", status.borderColor)}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-full", status.bgColor)}>
                <StatusIcon className={cn("h-8 w-8", status.color)} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {status.label}
                </h2>
                <p className="text-muted-foreground">
                  {analysis.diagnosis.primaryCondition}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Confidence</p>
                <p className="text-2xl font-bold text-foreground">
                  {analysis.overallConfidence}%
                </p>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-muted"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={`${(analysis.overallConfidence / 100) * 176} 176`}
                    className={status.color}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diagnosis Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-primary" />
            Diagnosis Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {analysis.diagnosis.scientificName && (
            <p className="text-sm italic text-muted-foreground">
              Scientific name: {analysis.diagnosis.scientificName}
            </p>
          )}
          <p className="text-foreground">{analysis.diagnosis.description}</p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={severityColors[analysis.diagnosis.severity]}>
              Severity: {analysis.diagnosis.severity}
            </Badge>
            <Badge variant="outline" className={riskColors[analysis.diagnosis.spreadRisk]}>
              Spread Risk: {analysis.diagnosis.spreadRisk}
            </Badge>
          </div>

          {analysis.diagnosis.affectedParts.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Affected Parts:
              </p>
              <div className="flex flex-wrap gap-2">
                {analysis.diagnosis.affectedParts.map((part, i) => (
                  <Badge key={i} variant="secondary">
                    {part}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Causes & Symptoms */}
      {(analysis.causes.length > 0 || analysis.symptoms.length > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          {analysis.causes.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-warning" />
                  Possible Causes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.causes.map((cause, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <ArrowRight className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {analysis.symptoms.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Info className="h-4 w-4 text-info" />
                  Observed Symptoms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.symptoms.map((symptom, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <ArrowRight className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Treatment Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-primary" />
            Treatment Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {analysis.treatment.immediate.length > 0 && (
            <div>
              <h4 className="font-semibold text-destructive flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4" />
                Immediate Actions
              </h4>
              <ul className="space-y-2 pl-6">
                {analysis.treatment.immediate.map((action, i) => (
                  <li key={i} className="text-sm list-disc">
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          <div className="grid gap-6 md:grid-cols-2">
            {analysis.treatment.organic.length > 0 && (
              <div>
                <h4 className="font-semibold text-success flex items-center gap-2 mb-3">
                  <Leaf className="h-4 w-4" />
                  Organic Treatment
                </h4>
                <ul className="space-y-2 pl-6">
                  {analysis.treatment.organic.map((treatment, i) => (
                    <li key={i} className="text-sm list-disc">
                      {treatment}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.treatment.chemical.length > 0 && (
              <div>
                <h4 className="font-semibold text-info flex items-center gap-2 mb-3">
                  <Droplets className="h-4 w-4" />
                  Chemical Treatment
                </h4>
                <ul className="space-y-2 pl-6">
                  {analysis.treatment.chemical.map((treatment, i) => (
                    <li key={i} className="text-sm list-disc">
                      {treatment}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {analysis.treatment.preventive.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold text-primary flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4" />
                  Preventive Measures
                </h4>
                <ul className="space-y-2 pl-6">
                  {analysis.treatment.preventive.map((measure, i) => (
                    <li key={i} className="text-sm list-disc">
                      {measure}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Weather Correlation */}
      {analysis.weatherCorrelation && (
        <Card className="border-info/30 bg-info/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Cloud className="h-5 w-5 text-info" />
              Weather Impact Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Relevance</p>
              <p className="text-sm">{analysis.weatherCorrelation.relevance}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Weather Impact</p>
              <p className="text-sm">{analysis.weatherCorrelation.weatherImpact}</p>
            </div>
            {analysis.weatherCorrelation.adjustedRecommendations && 
             analysis.weatherCorrelation.adjustedRecommendations.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Weather-Adjusted Recommendations
                </p>
                <ul className="space-y-2 pl-6">
                  {analysis.weatherCorrelation.adjustedRecommendations.map((rec, i) => (
                    <li key={i} className="text-sm list-disc">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Key Recommendations */}
      {analysis.recommendations.length > 0 && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Key Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {i + 1}
                  </span>
                  <span className="text-sm pt-0.5">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Additional Notes */}
      {analysis.additionalNotes && (
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground italic">
              <strong>Note:</strong> {analysis.additionalNotes}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
