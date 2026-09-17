import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";

type ToggleItemProps = {
  label?: React.ReactNode;
  isOn: boolean;
  handleToggle: (checked?:boolean) => void;
  className?: string;
  toggleContent?: React.ReactNode;
};

const ToggleItem = ({ label, isOn, handleToggle, className, toggleContent }: ToggleItemProps) => {
  toggleContent ||= isOn ? "On" : "Off";    
  return (
    <div className={cn("flex items-center justify-between gap-4 px-3 py-2 border-b border-white/10 last:border-b-0", className)}>
      {label}
      <span className="flex items-center gap-2">
        <Switch
          id="airplane-mode"
          checked={isOn}
          onCheckedChange={handleToggle}
        />
        <span className="min-w-2 w-fit text-center text-sm text-white/80">
          {toggleContent}
        </span>
      </span>
      {/* <div className="relative w-[57px] h-[24px] rounded-[12px] bg-white/5">
        <button
          className={`absolute transition-all duration-200 flex items-center justify-center
                            ${
                              isOn
                                ? "w-[35px] h-[20px] right-0 top-[2px] bg-[#0E42B1] text-white rounded-[12px]"
                                : "w-[35px] h-[20px] left-0 top-[2px] bg-white/10 text-[#FFFFFF] rounded-[10px]"
                            }
                          `}
          onClick={handleToggle}
          style={{
            boxShadow: isOn ? "0 2px 8px rgba(14,66,177,0.15)" : "none",
          }}
        >
          <span className="text-[14px]">{isOn ? "ON" : "OFF"}</span>
        </button>
      </div> */}
    </div>
  );
};

export default ToggleItem;
