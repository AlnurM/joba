import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useUploadResume } from "@/entities/resume";
import { Progress } from "@/shared/ui/progress";
import { FileIcon } from "lucide-react";

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " bytes";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  else return (bytes / 1048576).toFixed(1) + " MB";
};

export const ResumeUpload = ({
  children,
  onSuccess,
}: {
  children: (props: {
    loading: boolean;
    onClick: () => void;
    disabled: boolean;
  }) => React.ReactNode;
  onSuccess?: (id: string) => void;
}) => {
  const uploadMutation = useUploadResume();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFile, setUploadingFile] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const [analysisStep, setAnalysisStep] = useState<string>("");

  const handleUploadCV = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx";
    fileInput.click();

    fileInput.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          setIsUploading(true);
          setUploadingFile({
            name: file.name,
            size: formatFileSize(file.size),
          });

          // Analysis steps for visualization
          const analysisSteps = [
            "Initializing upload...",
            "Uploading file...",
            "Scanning document...",
            "Extracting information...",
            "Processing content...",
            "Analyzing structure...",
            "Validating format...",
            "Preparing storage...",
            "Finalizing upload...",
          ];

          let currentStepIndex = 0;
          setAnalysisStep(analysisSteps[currentStepIndex]);

          // Simulate progress with realistic steps
          setUploadProgress(5); // Start at 5%

          const progressInterval = setInterval(() => {
            setUploadProgress((prev) => {
              // Calculate new progress based on current stage
              const baseProgress =
                (currentStepIndex / analysisSteps.length) * 100;
              const increment = Math.random() * 2;

              // Next step when we reach certain thresholds
              if (baseProgress + 10 < prev + increment) {
                currentStepIndex = Math.min(
                  currentStepIndex + 1,
                  analysisSteps.length - 1,
                );
                setAnalysisStep(analysisSteps[currentStepIndex]);
              }

              const newValue = Math.min(prev + increment, 90); // Cap at 90% until complete
              return newValue;
            });
          }, 800);

          const data = await uploadMutation.mutateAsync(file);

          if (onSuccess) {
            onSuccess(data._id);
          }

          clearInterval(progressInterval);
          setUploadProgress(100);
          setAnalysisStep("Upload complete!");

          setTimeout(() => {
            setIsUploading(false);
            setUploadingFile(null);
            setUploadProgress(0);
            setAnalysisStep("");
          }, 1500);
        } catch (error) {
          console.log(error);
          setIsUploading(false);
          setUploadingFile(null);
          setUploadProgress(0);
          setAnalysisStep("");
        }
      }
    };
  };
  return (
    <>
      {children({
        loading: isUploading,
        onClick: handleUploadCV,
        disabled: isUploading,
      })}
      {isUploading && uploadingFile && (
        <div className="fixed bottom-4 right-4 w-80 bg-background/95 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden z-50 border border-border animate-in slide-in-from-bottom-5">
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-lg p-2.5">
                <FileIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{uploadingFile.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {uploadingFile.size}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative pt-1">
                <Progress
                  value={uploadProgress}
                  className="h-1.5 bg-primary/10 rounded-full overflow-hidden"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-primary">
                  {analysisStep}
                </span>
                <span className="text-xs font-medium">
                  {Math.round(uploadProgress)}%
                </span>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-2 flex items-center gap-2">
              <div className="bg-primary/10 rounded-full p-1">
                <Loader2 className="h-3 w-3 text-primary animate-spin" />
              </div>
              <p className="text-xs text-muted-foreground">
                Processing may take up to 1 minute
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
