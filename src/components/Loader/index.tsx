import { LoaderCircle, Loader as LucideLoader } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const Loader = ({
  type = "circle",
  value,
}: {
  type?: "circle" | "spinner" | "progress";
  value?: number;
}) => {
  return (
    <div className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2">
      {type === "circle" ? (
        <LoaderCircle className="animate-spin" />
      ) : type === "spinner" ? (
        <LucideLoader className="animate-spin" />
      ) : (
        <Progress className="h-2 w-96" value={value} />
      )}
    </div>
  );
};
