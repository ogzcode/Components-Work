/* eslint-disable react/prop-types */
import { useEffect } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Item } from "./Item";
import { TreeParentItem } from "./TreeParentItem";

export const TreeItem = ({ label, value, child, selectedList, onChecked }) => {

    useEffect(() => {
        let itemChild = child.map((child) => child.value);
        if (
            selectedList.includes(value) &&
            selectedList.every((item) => !itemChild.includes(item))
        ) {
            onChecked(selectedList.filter((item) => item !== value));
        }
    }, [selectedList, value, child, onChecked]);

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
                    <TreeParentItem
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