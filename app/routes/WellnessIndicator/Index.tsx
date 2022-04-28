type variant = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";

function Bubble({
  color,
}: {
  color:
    | "bg-blue-1"
    | "bg-blue-2"
    | "bg-blue-3"
    | "bg-blue-4"
    | "bg-blue-5"
    | "bg-blue-6"
    | "bg-blue-7"
    | "bg-blue-8"
    | "bg-blue-9"
    | "bg-blue-10";
}) {
  return <div className={`${color} w-30 h-30 rounded-full`} />;
}

export default function WellnessIndicator() {
  const arr: variant[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  return (
    <div className="flex flex-col items-center gap-sm">
      <span className="font-laila tracking-widest">
        How did you feel today?
      </span>
      <div className="bg-red-1 p-sm rounded-md">
        <div className="flex">
          {arr.map((val) => (
            <Bubble key={val} color={`bg-blue-${val}`} />
          ))}
        </div>
        <div className="flex justify-between">
          <span>1</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
}
