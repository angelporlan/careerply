interface FormTextAreaProps {
  name: string;
  label: string;
  placeholder: string;
  rows?: number;
  value?: string;
  onChange?: (value: string) => void;
}

export default function FormTextArea({ 
  name,
  label, 
  placeholder, 
  rows = 4, 
  value, 
  onChange 
}: FormTextAreaProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[10px] font-extrabold text-on-surface/40 tracking-widest uppercase px-1">
        {label}
      </label>
      <textarea 
        name={name}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="
          w-full p-4 rounded-xl border-none outline-none resize-none
          /* Estética Hundida del Manual */
          bg-surface-container-low text-sm text-on-surface 
          placeholder:text-on-surface/20
          /* Ghost Border en Focus */
          focus:ring-4 focus:ring-primary/10 
          transition-all shadow-inner
        "
      />
    </div>
  );
}