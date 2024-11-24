import { Minus, Plus } from "lucide-react";

export const CapacityInput = (props: { value: number; setValue: (value: number) => void }) => {
  const value = props.value || 0;
  return (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        className="rounded-full p-1.5 border shadow-sm disabled:opacity-50"
        onClick={() => props.setValue(value <= 0 ? 0 : value - 1)}
        disabled={value <= 0}
      >
        <Minus className="w-3 h-3" />
      </button>

      <span className="grid font-medium text-lg place-content-center w-8 h-8 text-center rounded-full">
        {value}
      </span>

      <button
        type="button"
        className="rounded-full p-1.5 border shadow-sm"
        onClick={() => props.setValue(value + 1)}
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
};
