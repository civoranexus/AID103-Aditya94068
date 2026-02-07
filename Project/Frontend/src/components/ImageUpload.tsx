import { useCallback, useState } from "react";
import { Upload, Camera, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utilis";

interface ImageUploadProps {
  onImageSelect: (imageBase64: string) => void;
  isLoading?: boolean;
}

export const ImageUpload = ({ onImageSelect, isLoading }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const clearImage = useCallback(() => {
    setPreview(null);
  }, []);

  const analyzeImage = useCallback(() => {
    if (preview) {
      onImageSelect(preview);
    }
  }, [preview, onImageSelect]);

  return (
    <div className="space-y-4 animate-fade-in">
      {!preview ? (
        <Card
          className={cn(
            "relative border-2 border-dashed transition-all duration-300 cursor-pointer hover-lift",
            isDragging
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CardContent className="flex flex-col items-center justify-center py-12 px-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Upload Crop Image
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
              Drag and drop an image of your crop, or click to browse.
              Supported formats: JPG, PNG, WebP
            </p>
            <div className="flex gap-3">
              <Button variant="default" className="relative" disabled={isLoading}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Browse Files
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isLoading}
                />
              </Button>
              <Button variant="outline" className="relative" disabled={isLoading}>
                <Camera className="h-4 w-4 mr-2" />
                Use Camera
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isLoading}
                />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden animate-slide-up">
          <div className="relative">
            <img
              src={preview}
              alt="Uploaded crop"
              className="w-full h-64 object-cover"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-3 right-3"
              onClick={clearImage}
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardContent className="pt-4">
            <div className="flex gap-3">
              <Button
                onClick={analyzeImage}
                disabled={isLoading}
                className="flex-1 animate-pulse-glow"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4 mr-2" />
                    Analyze Image
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={clearImage} disabled={isLoading}>
                Change Image
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
