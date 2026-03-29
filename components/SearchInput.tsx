import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
}

export default function SearchInput({ 
  placeholder = "Search applications, companies, or roles..." 
}: SearchInputProps) {
  return (
    <div className="relative mb-16 max-w-xl group">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/30 w-5 h-5 transition-colors group-focus-within:text-primary" />
      
      <input 
        type="text" 
        placeholder={placeholder}
        className="
          w-full pl-12 pr-4 py-4 
          rounded-xl border-none outline-none
          bg-surface-container-low
          text-sm text-on-surface 
          placeholder:text-on-surface/30 
          focus:ring-4 focus:ring-primary/10 
          transition-all 
          shadow-inner
        "
      />
    </div>
  );
}