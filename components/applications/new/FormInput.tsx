interface FormInputProps {
  label: string;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
}

export default function FormInput({ label, placeholder, type = "text", icon }: FormInputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[10px] font-extrabold text-on-surface/40 tracking-widest uppercase px-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30">
            {icon}
          </div>
        )}
        <input 
          type={type}
          placeholder={placeholder}
          className={`
            w-full p-4 rounded-xl border-none outline-none
            bg-surface-container-low text-sm text-on-surface placeholder:text-on-surface/20
            focus:ring-4 focus:ring-primary/10 transition-all shadow-inner
            ${icon ? 'pl-12' : 'pl-4'}
          `}
        />
      </div>
    </div>
  );
}