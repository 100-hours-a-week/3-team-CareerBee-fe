import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface itemProps {
  label: string;
  value: string;
}
interface dropdownProps {
  placeholder: string;
  items: itemProps[];
  onChange?: (_value: string) => void;
}

export default function Dropdown({ placeholder, items, onChange }: dropdownProps) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
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
}
