import { useRouter,useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type selectTypes = {
  label: string,
  items: string[]
}

const SelectComp = (params: selectTypes) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get Value From Search Params If Exist
  const seletedValue = searchParams.get(params.label) || ""

  // Send Selected Value To The Url
  function handleChange(value: string) {
    const setSearchParams = new URLSearchParams(searchParams.toString())
    setSearchParams.set(params.label, value)
    router.push(`${window.location.pathname}?${setSearchParams.toString()}`)
  }

  return (
    <Select value={seletedValue} onValueChange={handleChange}>
      <SelectTrigger className="w-[150px] border-2 border-black text-sm">
        <SelectValue placeholder={`${params.label}`}  className="text-sm"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-gray-600 text-sm">{params.label}</SelectLabel>
          {
            params.items.map((i) => {
              return <SelectItem key={i} value={i} className="text-base">{i}</SelectItem>
            })
          }
        </SelectGroup>
      </SelectContent>
  </Select>
  )
}
export default SelectComp