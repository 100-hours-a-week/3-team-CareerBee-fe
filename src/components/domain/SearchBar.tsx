import { Input } from "@/components/ui/input"
import { PiMagnifyingGlass, PiX } from "react-icons/pi"
import { useRef, useState } from "react"
import { Button } from "../ui/button"

export function SearchBar(props: React.ComponentProps<typeof Input>) {
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative w-full">
        <Button
            variant="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2"
            label= {<PiMagnifyingGlass />}
                    onClick={() => {
            inputRef.current?.focus()
            }}
        >
        </Button>
        <Input
            ref={inputRef}
            variant="search"
            className="pl-12 pr-10"
            value={value}
            onChange={(e) => {
            setValue(e.target.value)
            props.onChange?.(e)
            }}
            {...props}
        />
        {value && (
            <Button
            variant="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            label= {<PiX />}
            onClick={() => {
                setValue("")
                props.onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
            }}
            >
            </Button>
        )}
    </div>
  )
}