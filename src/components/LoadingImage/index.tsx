"use client";

import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "@/components/Loader";
import { ImageOff } from "lucide-react";
import Image from "next/image";

export const LoadingImage = ({
  className,
  src,
  alt,
  original = false,
}: {
  className: string;
  src: string;
  alt: string;
  original?: boolean;
}) => {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return (
      <div
        className={cn(
          className,
          "flex items-center justify-center bg-muted text-primary",
        )}
      >
        <ImageOff />
      </div>
    );
  }

  return (
    <Fragment>
      {!loaded && (
        <Skeleton className={cn(className, "relative")}>
          <Loader type="spinner" />
        </Skeleton>
      )}
      <Image
        className={cn(className, "object-cover")}
        src={`https://media.themoviedb.org/t/p/${
          original ? "original" : "w500"
        }${src}`}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        priority
        style={{ display: loaded ? "block" : "none" }}
        onLoad={() => setLoaded(true)}
        unoptimized
      />
    </Fragment>
  );
};
