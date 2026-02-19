import { type ReactNode } from "react";

interface CheckboxProps {
  label: string | ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({ label, checked, onChange, className = "" }: CheckboxProps) {
  return (
    <label className={`flex items-center gap-2.5 text-xs text-gray-600 cursor-pointer select-none group py-1 ${className}`}>
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer appearance-none w-4 h-4 border-2 border-gray-300 rounded transition-all checked:border-highlight checked:bg-highlight hover:border-gray-600 cursor-pointer"
        />
        <svg
          className="absolute w-2.5 h-2.5 text-eigengrau pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span className="group-hover:text-gray-900 transition-colors">
        {label}
      </span>
    </label>
  );
}
