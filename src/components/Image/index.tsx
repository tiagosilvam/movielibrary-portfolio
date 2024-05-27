import { Image, ImageProps, Skeleton } from "@mantine/core";
import { Fragment, useState } from "react";

export const LoadingImage = ({
  alt,
  ...props
}: ImageProps & { alt: string }) => {
  const [loading, setLoading] = useState(true);
  return (
    <Fragment>
      {loading && <Skeleton className={props.className} />}
      <Image
        {...props}
        display={loading ? "none" : "block"}
        onLoad={() => setLoading(false)}
        alt={alt}
      />
    </Fragment>
  );
};
