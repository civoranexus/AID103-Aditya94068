import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, MapPin, Sprout, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  farm_name: string | null;
  location: string | null;
  crops_grown: string[] | null;
}

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [farmName, setFarmName] = useState("");
  const [location, setLocation] = useState("");
  const [cropsGrown, setCropsGrown] = useState<string[]>([]);
  const [newCrop, setNewCrop] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user!.id)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    }

    if (data) {
      setProfile(data);
      setFarmName(data.farm_name || "");
      setLocation(data.location || "");
      setCropsGrown(data.crops_grown || []);
    }
    setLoading(false);
  };

  const saveProfile = async () => {
    setSaving(true);

    const profileData = {
      user_id: user!.id,
      farm_name: farmName || null,
      location: location || null,
      crops_grown: cropsGrown.length > 0 ? cropsGrown : null,
    };

    let error;
    if (profile) {
      ({ error } = await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", profile.id));
    } else {
      ({ error } = await supabase.from("profiles").insert(profileData));
    }

    setSaving(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save profile",
        variant: "destructive",
      });
    } else {
      toast({ title: "Saved", description: "Your profile has been updated" });
      fetchProfile();
    }
  };

  const addCrop = () => {
    if (newCrop.trim() && !cropsGrown.includes(newCrop.trim())) {
      setCropsGrown([...cropsGrown, newCrop.trim()]);
      setNewCrop("");
    }
  };

  const removeCrop = (crop: string) => {
    setCropsGrown(cropsGrown.filter((c) => c !== crop));
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
        <div className="container max-w-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Farm Profile</h1>
            <p className="text-muted-foreground">
              Manage your farm details for better crop analysis recommendations
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Your Details
              </CardTitle>
              <CardDescription>
                Email: {user?.email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="farm-name">Farm Name</Label>
                <div className="relative">
                  <Sprout className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="farm-name"
                    placeholder="Enter your farm name"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Enter your farm location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Crops Grown</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a crop type"
                    value={newCrop}
                    onChange={(e) => setNewCrop(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCrop())}
                  />
                  <Button type="button" variant="outline" onClick={addCrop}>
                    Add
                  </Button>
                </div>
                {cropsGrown.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {cropsGrown.map((crop) => (
                      <Badge key={crop} variant="secondary" className="gap-1">
                        {crop}
                        <button
                          onClick={() => removeCrop(crop)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Button onClick={saveProfile} disabled={saving} className="w-full">
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
