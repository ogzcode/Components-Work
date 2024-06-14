import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, X } from "lucide-react"

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

    const handleSelectAll = (type = null) => {
        if (type === 'all') {
            onChangeSelectedList(options.map((option) => option.value))
        }
        else {
            onChangeSelectedList([])
        }
    }

    const getFilteredOptionsTemplate = () => {
        const filtered = options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()))

        if (filtered.length === 0) {
            return (
                <div className="text-center text-sm">
                    No options found
                </div>
            )
        }
        else {
            return filtered.map((option, index) => {
                return (
                    <Item
                        key={index}
                        label={option.label}
                        value={option.value}
                        checked={selectedList.includes(option.value)}
                        onChecked={handleSelect}
                    />
                )
            })
        }
    }

    const selectedItemsTemplate = () => {
        if (selectedList.length === 0) {
            return "Select an option"
        }
        else if (selectedList.length === 1) {
            return options.find((option) => option.value === selectedList[0]).label
        }
        else {
            return `${selectedList.length} items selected`
        }
    }

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" onClick={() => setOpen(true)} className="font-normal flex justify-between items-center min-w-[20rem]">
                        <span>
                            {selectedItemsTemplate()}
                        </span>
                        <div className="flex gap-2">
                            {selectedList.length > 0 && (
                                <X className="h-4 w-4 opacity-50" onClick={(e) => {
                                    e.stopPropagation()
                                    onChangeSelectedList([])
                                }}
                                />
                            )}
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2 w-[20rem]">
                    <Header
                        isSelectAll={options.length === selectedList.length}
                        search={search}
                        onChangeSearch={setSearch}
                        onChangeSelectAll={handleSelectAll}
                    />

                    <ScrollArea className="max-h-[10rem]">
                        {getFilteredOptionsTemplate()}
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </div>
    )
}