/* eslint-disable react/prop-types */
import './App.css'

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, Check } from "lucide-react"

const Item = ({ label, value, checked, onChecked }) => {
  return (
    <div onClick={() => onChecked(value)} className="relative flex gap-2 w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none hover:bg-slate-100 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50">
      <Checkbox checked={checked} />
      <span>{label}</span>
    </div>
  )
}

const AccordionParent = ({
  checked,
  label,
  onSelectAllItems,
}) => {
  return (
    <div className='flex gap-2 items-center' onClick={onSelectAllItems}>
      <div
        className="peer flex justify-center items-center h-4 w-4 shrink-0 rounded-sm border border-slate-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=checked]:text-slate-50 dark:border-slate-800 dark:border-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900"
        onClick={onSelectAllItems}
        data-state={checked ? 'checked' : 'unchecked'}
      >
        <input
          type="checkbox"
          className='appearance-none'
        />
        {checked && <Check className="h-4 w-4" />}
      </div>
      <span className="text-sm">{label}</span>
    </div>
  )
}

const TreeItem = ({ label, value, child, selectedList, onChecked }) => {

  const handleSelectAllItems = (value) => {
    let itemChild = child.map((child) => child.value)
    if (selectedList.includes(value)) {
      let copy = [...selectedList]
      copy = copy.filter((item) => !itemChild.includes(item))
      copy = copy.filter((item) => item !== value)
      onChecked(copy)
    }
    else {
      onChecked([...selectedList, ...itemChild, value])
    }
  };

  const handleCheckChildItems = (value) => {
    let copy = [...selectedList]

    if (selectedList.includes(value)) {
      copy = copy.filter((item) => item !== value)
    }
    else {
      copy.push(value)
    }

    onChecked(copy)
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={value}>
        <AccordionTrigger>
          <AccordionParent
            label={label}
            checked={selectedList.includes(value)}
            onSelectAllItems={() => handleSelectAllItems(value)}
          />
        </AccordionTrigger>
        <AccordionContent>
          <div className="pl-4">
            {child && child.map((child, index) => (
              <Item
                key={index}
                label={child.label}
                value={child.value}
                checked={selectedList.includes(child.value)}
                onChecked={handleCheckChildItems}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function MultipleSelect({ options, selectedList, onChangeSelectedList }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" onClick={() => setOpen(true)} className="font-normal flex justify-between items-center min-w-[20rem]">
            <span>
              {
                selectedList.length === 0 ? "Select items" :
                  `${selectedList.length} items selected`
              }
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-[20rem]">
          <ScrollArea className="min-h-[10rem]">
            {options.map((option, index) => (
              <TreeItem
                key={index}
                label={option.label}
                value={option.value}
                child={option.children}
                selectedList={selectedList}
                onChecked={onChangeSelectedList}
              />
            ))}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  )
}

function App() {
  const items = [
    {
      label: "Option 1",
      value: "option1",
      children: [
        {
          label: "Option 1.1",
          value: "option1.1"
        },
        {
          label: "Option 1.2",
          value: "option1.2"
        }
      ]
    },
    {
      label: "Option 2",
      value: "option2",
      children: [
        {
          label: "Option 2.1",
          value: "option2.1"
        },
        {
          label: "Option 2.2",
          value: "option2.2"
        },
        {
          label: "Option 2.3",
          value: "option2.3"
        }
      ]
    },
    {
      label: "Option 3",
      value: "option3",
      children: [
        {
          label: "Option 3.1",
          value: "option3.1"
        },
        {
          label: "Option 3.2",
          value: "option3.2"
        },
        {
          label: "Option 3.3",
          value: "option3.3"
        },
        {
          label: "Option 3.4",
          value: "option3.4"
        }
      ]
    }
  ]
  const [selectedList, setSelectedList] = useState([])


  return (
    <div className="flex justify-center items-center min-h-screen">
      <MultipleSelect
        options={items}
        selectedList={selectedList}
        onChangeSelectedList={setSelectedList}
      />
    </div>
  )
}

export default App
