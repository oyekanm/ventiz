import React, { useState } from "react";
import FunctionalButton from "./functionalButton";
import { X } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface Props {
    open: boolean;
    addOptions: any,
    toggle?: any
    options: string[],
    multi?: boolean
    desc?:string,
    singleValue?:string,
    multiValue?:string[];
    small?:boolean
}

const MultiSelect = ({ addOptions, open, toggle, options, multi = true,desc,singleValue,multiValue=[], small=false }: Props) => {

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleChange = (selected: any) => {
        const value = selected
        const newOptions = [...multiValue, value]
        addOptions(newOptions)
        setSelectedOptions(newOptions);


    };
    const handleSingle = (selected: any) => {
        addOptions(selected)

    };
    const remove = (id: string) => {
        const newOption = multiValue.filter(opt => opt !== id)
        addOptions(newOption)
        setSelectedOptions(newOption)
    }
    console.log(singleValue)
    return (
        <div className="flex flex-col gap-4">
            {open && (<div className={`${small? "grid grid-cols-4 gap-4 items-center": "w-full"} `}>
                {!multi ? <Select onValueChange={handleSingle} defaultValue={singleValue}>
                    <SelectTrigger className="auth-input-container !w-full auth-input ">
                        <SelectValue placeholder={desc} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map(event => {
                            return <SelectItem className="xs-text" key={event} value={event}>{event}</SelectItem>
                        })}
                    </SelectContent>
                </Select> : (
                    <Select onValueChange={handleChange}  >
                    <SelectTrigger className="auth-input-container !w-full auth-input ">
                        <SelectValue placeholder={multiValue?.toString() || "Select one or multiple categories"} 
                        // defaultValue={selectedOptions?.toString()} 
                        />
                    </SelectTrigger>
                    <SelectContent>
                         {/* <SelectItem className="xs-text"  value={selectedOptions?.toString()}>{selectedOptions?.toString()}</SelectItem> */}
                        {options.filter(opt => !multiValue?.includes(opt)).map(event => {
                            return( <SelectItem className="xs-text" key={event} value={event}>{event}</SelectItem>)
                        })}
                    </SelectContent>
                </Select>
                )}
                {toggle && <span onClick={toggle} className="cursor-pointer" ><X className={`!size-8 text-[#344054]`} /></span>}
            </div>
            )}

            {/* Display selected options */}
            <div className="flex items-center flex-wrap gap-4">
                {
                    multiValue?.map(opt => {
                        return <div
                            key={opt}
                            className={`flex items-center  gap-2 py-6 px-[1.4rem] rounded-[.8rem] h-[4rem] bg-white border border-[#D0D5DD]`}>
                            <span className={`xs-text !text-[#344054] !font-semibold`}>{opt}</span>
                            <span onClick={() => remove(opt)} className="cursor-pointer"><X className={`!size-8 text-[#344054]`} /></span>
                        </div>
                    })
                }

            </div>
        </div>
    );
};

export default MultiSelect;