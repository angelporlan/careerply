import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export default function FormSelect({ name, label, options, defaultValue, onChange }: FormSelectProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[10px] font-extrabold text-on-surface/40 tracking-widest uppercase px-1">
        {label}
      </label>
      <div className="relative group">
        <select 
          name={name}
          defaultValue={defaultValue}
          onChange={(e) => onChange?.(e.target.value)}
          className="
            w-full p-4 rounded-xl border-none outline-none appearance-none
            bg-surface-container-low text-sm text-on-surface font-medium
            focus:ring-4 focus:ring-primary/10 transition-all shadow-inner
            cursor-pointer
          "
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-surface-container-low">
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Icono de flecha personalizado */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface/30 group-focus-within:text-primary transition-colors">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}