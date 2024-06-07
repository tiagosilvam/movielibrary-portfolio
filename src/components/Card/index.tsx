import { LoadingImage } from "@/components/LoadingImage";

export const Card = ({
  image,
  title,
  label,
  onClick,
}: {
  image: string;
  title: string;
  label: string;
  onClick?: () => void;
}) => {
  return (
    <div className="group h-[302px] max-w-40 cursor-pointer" onClick={onClick}>
      <div className="overflow-hidden rounded-lg group-hover:shadow-lg">
        <LoadingImage
          className="h-60 w-40 transition-all group-hover:scale-105"
          src={image}
          alt={title}
        />
      </div>
      <div className="pt-1.5 text-center">
        <span className="line-clamp-2 text-sm font-medium text-foreground group-hover:font-bold">
          {title}
        </span>
        <span className="line-clamp-2 text-xs text-muted-foreground">
          {label}
        </span>
      </div>
    </div>
  );
};
