import React from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils';


interface Props {
    children?: React.ReactNode;
    text?: string;
    txtClr?: string;
    bgClr?: string;
    clx?: string,
    Icon?: any;
    order?: number,
    noIcn?: boolean,
    click?: any,
    disable?:boolean
}

export default function FunctionalButton({
    bgClr = "#221FCB",
    text = "Create an event",
    txtClr = "#ffff",
    clx,
    Icon = Plus,
    children,
    order = 1,
    noIcn = false,
    click,
    disable
}: Props) {
    return (
        <Button
            onClick={click}
            style={{ backgroundColor: bgClr }}
            disabled={disable}
            className={cn(`flex items-center  gap-2 py-6 px-[1.4rem] rounded-[.8rem] h-[4rem]`, clx)}>
            {
                children ?
                    children :
                    <>
                        {!noIcn && order === 1 && <span><Icon style={{ color: txtClr }} className={`!size-8`} /></span>}
                        <span style={{ color: txtClr }} className={`xs-text !font-semibold`}>{text}</span>
                        {!noIcn && order === 2 && <span><Icon style={{ color: txtClr }} className={`!size-8`} /></span>}
                    </>
            }
        </Button>
    )
}
