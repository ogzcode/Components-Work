import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown } from "lucide-react"
import { Input } from "../components/ui/input"

import { Item } from "./components/Item"
import { Header } from "./components/Header"

export default function MultipleSelect({ options, selectedList, onChangeSelectedList }) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')

    const handleSelect = (value) => {
        let copy = [...selectedList]

        if (copy.includes(value)) {
            copy = copy.filter((item) => item !== value)
        }
        else {
            copy.push(value)
        }

        onChangeSelectedList(copy)
    }

    const handleSelectAll = (type=null) => {
        if (type === 'all') {
            onChangeSelectedList(options.map((option) => option.value))
        }
        else {
            onChangeSelectedList([])
        }
    }

    const getFilteredOptions = () => {
        return options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()))
    }

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" onClick={() => setOpen(true)} className="font-normal flex justify-between items-center min-w-[20rem]">
                        <span>

                            {
                                selectedList.length === 0 ? 'Select an option' :
                                    selectedList.length === 1 ? options.find((option) => option.value === selectedList[0]).label :
                                        `${selectedList.length} items selected`
                            }
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2 w-[20rem]">
                    <Header
                        isSelectAll={options.length === selectedList.length}
                        search={search}
                        onChangeSearch={setSearch}
                        onChangeSelectAll={handleSelectAll}
                    />
                    <ScrollArea className="h-[10rem]">
                        {getFilteredOptions().map((option, index) => {
                            return (
                                <Item
                                    key={index}
                                    label={option.label}
                                    value={option.value}
                                    checked={selectedList.includes(option.value)}
                                    onChecked={handleSelect}
                                />
                            )
                        })}
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </div>
    )
}