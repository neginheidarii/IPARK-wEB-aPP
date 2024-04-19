import {cn, Switch} from "@nextui-org/react";
import React from "react";

const Checkbox = ({ label, checked, onChange, description = '' }) => {
    return (
        <Switch
            isSelected={checked} onValueChange={onChange}
            classNames={{
                base: cn(
                    "inline-flex flex-row-reverse bg-content1 hover:bg-content2 items-center py-4 px-2 min-w-[100%]",
                    "justify-between cursor-pointer rounded-lg border-2 border-transparent",
                    // "data-[selected=true]:border-primary",
                ),
                wrapper: "p-0 h-4 overflow-visible",
                thumb: cn("w-6 h-6 border-2 shadow-lg",
                    "group-data-[hover=true]:border-primary",
                    //selected
                    "group-data-[selected=true]:ml-6 group-data-[selected=true]:border-primary",
                    // pressed
                    "group-data-[pressed=true]:w-7",
                    "group-data-[selected]:group-data-[pressed]:ml-4",
                ),
            }}
            className={'w-full'}
        >
            <div className="flex flex-col gap-1">
                <p className="text-medium">{ label }</p>
                <p className="text-tiny text-default-400"> 
                    {description}
                </p>
            </div>
        </Switch>
    )
}

export default Checkbox;
