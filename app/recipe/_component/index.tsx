import { Separator } from "@/components/ui/separator";

const Title = ({ left, right }: { left: string; right: string }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <p className="text-xl front-bold">{left}</p>
      <span className="w-[75%]">
        <Separator />
      </span>
      <p className="text-xl front-semibold">{right}</p>
    </div>
  );
};

export default Title;
