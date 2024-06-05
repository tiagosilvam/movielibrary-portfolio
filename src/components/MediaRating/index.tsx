const getColor = (certification: string) => {
  switch (certification) {
    case "L":
      return "bg-green-600";
    case "10":
      return "bg-blue-500";
    case "12":
      return "bg-yellow-500";
    case "14":
      return "bg-orange-500";
    case "16":
      return "bg-red-500";
    case "18":
      return "bg-black";
    default:
      return "bg-cyan-500";
  }
};

export const MediaRating = ({ certification }: { certification: string }) => {
  if (!certification) {
    certification = "N/A";
  }

  return (
    <div
      className={`${getColor(certification)} mr-1 min-h-6 min-w-6 rounded-md p-1`}
    >
      <p className="text-center text-xs font-bold">{certification}</p>
    </div>
  );
};
