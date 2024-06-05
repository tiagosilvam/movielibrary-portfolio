import { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const MediaSkeleton = () => {
  return (
    <Fragment>
      {Array.from({ length: 20 }, (_, index) => index++).map((item) => (
        <div
          key={item}
          className="flex min-h-[302px] flex-col justify-self-center"
        >
          <Skeleton className="h-60 w-40" />
          <div className="mt-2 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </Fragment>
  );
};
