import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/widgets/ui/select';

import React from 'react';
import { useState } from 'react';

export interface TierLevelOption {
  label: string;
  value: string;
}

interface TierOptionGroup {
  label: string;
  value: string;
  children: TierLevelOption[];
}

interface dropdownProps {
  placeholder: string;
  items: TierOptionGroup[];
  value?: string;
  onChange?: (_value: string) => void;
}

const DoubleDropdown = React.forwardRef<HTMLDivElement, dropdownProps>(
  ({ placeholder, items, value, onChange }, _ref) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={value ? value : placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.children.length === 0 ? (
                <SelectItem value={item.value}>{item.label}</SelectItem>
              ) : (
                <SelectGroup>
                  <SelectLabel
                    onClick={() => {
                      setOpenIndex((prev) => (prev === index ? null : index));
                    }}
                  >
                    {item.label}
                  </SelectLabel>
                  {openIndex === index &&
                    item.children.map((level, subIndex) => (
                      <SelectItem value={level.value} key={subIndex} className="pl-4">
                        {level.label}
                      </SelectItem>
                    ))}
                </SelectGroup>
              )}
            </React.Fragment>
          ))}
        </SelectContent>
      </Select>
    );
  },
);

export default DoubleDropdown;
