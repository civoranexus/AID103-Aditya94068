import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, MapPin, Calendar } from "lucide-react";

interface FarmDetailsProps {
  cropType: string;
  setCropType: (value: string) => void;
  farmLocation: string;
  setFarmLocation: (value: string) => void;
  growthStage: string;
  setGrowthStage: (value: string) => void;
}

const cropTypes = [
  "Wheat",
  "Rice",
  "Corn/Maize",
  "Soybean",
  "Cotton",
  "Sugarcane",
  "Potato",
  "Tomato",
  "Onion",
  "Chilli",
  "Mango",
  "Banana",
  "Grape",
  "Apple",
  "Orange",
  "Other",
];

const growthStages = [
  "Seedling",
  "Vegetative",
  "Flowering",
  "Fruiting",
  "Maturity",
  "Harvest Ready",
];

export const FarmDetails = ({
  cropType,
  setCropType,
  farmLocation,
  setFarmLocation,
  growthStage,
  setGrowthStage,
}: FarmDetailsProps) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sprout className="h-5 w-5 text-primary" />
          Farm Details
          <span className="text-sm font-normal text-muted-foreground ml-auto">
            (Optional)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="crop-type" className="flex items-center gap-2">
              <Sprout className="h-3.5 w-3.5 text-muted-foreground" />
              Crop Type
            </Label>
            <Select value={cropType} onValueChange={setCropType}>
              <SelectTrigger id="crop-type" className="bg-background">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {cropTypes.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              Farm Location
            </Label>
            <Input
              id="location"
              placeholder="e.g., Maharashtra, India"
              value={farmLocation}
              onChange={(e) => setFarmLocation(e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="growth-stage" className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              Growth Stage
            </Label>
            <Select value={growthStage} onValueChange={setGrowthStage}>
              <SelectTrigger id="growth-stage" className="bg-background">
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {growthStages.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Providing these details helps our AI give more accurate and context-specific recommendations.
        </p>
      </CardContent>
    </Card>
  );
};
