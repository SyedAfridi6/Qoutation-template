import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxGroupProps {
  title: string;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
}

export function CheckboxGroup({ title, options, value, onChange, className }: CheckboxGroupProps) {
  const [isGroupEnabled, setIsGroupEnabled] = useState(true);

  const handleGroupToggle = (checked: boolean) => {
    setIsGroupEnabled(checked);
    if (!checked) {
      onChange([]);
    }
  };

  const handleOptionChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter(v => v !== optionValue));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="checkbox-head rounded-lg p-3 bg-purple-50 border border-purple-200">
        <div className="flex items-center space-x-3">
          <Checkbox
            id={`${title}-head`}
            checked={isGroupEnabled}
            onCheckedChange={handleGroupToggle}
            className="h-5 w-5 accent-purple-600"
          />
          <Label
            htmlFor={`${title}-head`}
            className="font-bold text-purple-700 text-lg cursor-pointer"
          >
            {title}
          </Label>
        </div>
      </div>
      
      <div className="space-y-2 ml-4">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`${title}-${option.value}`}
              checked={value.includes(option.value)}
              onCheckedChange={(checked) => handleOptionChange(option.value, checked)}
              disabled={!isGroupEnabled}
              className="h-[18px] w-[18px] accent-purple-600"
            />
            <Label
              htmlFor={`${title}-${option.value}`}
              className="text-sm font-medium cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
