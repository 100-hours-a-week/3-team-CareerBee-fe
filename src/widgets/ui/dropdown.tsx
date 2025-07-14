import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/widgets/ui/select';

export interface itemProps {
  label: string;
  value: string;
}
interface dropdownProps {
  placeholder: string;
  items: itemProps[];
  value?: string;
  onChange?: (_value: string) => void;
}

const Dropdown = React.forwardRef<HTMLDivElement, dropdownProps>(
  ({ placeholder, items, value, onChange }, _ref) => {
    return (
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={value ? value : placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item, index) => (
              <SelectItem value={item.value} key={index}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  },
);
Dropdown.displayName = 'Dropdown';

export default Dropdown;
