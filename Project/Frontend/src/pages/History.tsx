import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, MapPin, Sprout, AlertTriangle, CheckCircle, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface AnalysisRecord {
  id: string;
  crop_type: string | null;
  farm_location: string | null;
  growth_stage: string | null;
  analysis_result: any;
  created_at: string;
}

const History = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [analyses, setAnalyses] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchAnalyses();
    }
  }, [user]);

  const fetchAnalyses = async () => {
    const { data, error } = await supabase
      .from("analysis_history")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load analysis history",
        variant: "destructive",
      });
    } else {
      setAnalyses(data || []);
    }
    setLoading(false);
  };

  const deleteAnalysis = async (id: string) => {
    const { error } = await supabase
      .from("analysis_history")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete analysis",
        variant: "destructive",
      });
    } else {
      setAnalyses(analyses.filter((a) => a.id !== id));
      toast({ title: "Deleted", description: "Analysis removed from history" });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Analysis History</h1>
            <p className="text-muted-foreground">
              View your past crop disease analyses and track farm health over time
            </p>
          </div>

          {analyses.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Sprout className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No analyses yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by analyzing your first crop image
                </p>
                <Button onClick={() => navigate("/")}>Analyze Crop</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {analyses.map((analysis) => (
                <Card key={analysis.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {analysis.analysis_result?.disease_detected ? (
                            <>
                              <AlertTriangle className="h-5 w-5 text-destructive" />
                              {analysis.analysis_result?.disease_name || "Disease Detected"}
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-5 w-5 text-primary" />
                              Healthy Crop
                            </>
                          )}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(analysis.created_at), "MMM d, yyyy")}
                          </span>
                          {analysis.crop_type && (
                            <span className="flex items-center gap-1">
                              <Sprout className="h-4 w-4" />
                              {analysis.crop_type}
                            </span>
                          )}
                          {analysis.farm_location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {analysis.farm_location}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {analysis.analysis_result?.severity && (
                          <Badge variant={getSeverityColor(analysis.analysis_result.severity)}>
                            {analysis.analysis_result.severity} severity
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteAnalysis(analysis.id)}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  {analysis.analysis_result?.summary && (
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">
                        {analysis.analysis_result.summary}
                      </p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;
