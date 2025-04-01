import React from 'react'

interface Props {
    title: string;
    description: string;
    other: string;
    btn?: any;
    children?: React.ReactNode
    popUp?: any,
    active?: boolean
}

export default function SummaryInfoColum({ btn, description, other, title, children, popUp, active }: Props) {
    return (
        <div onClick={popUp} className="p-4 px-6 border-b last:border-b-0">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 ">
                    {children}
                    <div className="">
                        <p className="xs-text !font-medium !text-[#101828]">{title}</p>
                        <p className="xs-text  !text-[#475467]">{popUp ? description.substring(0, 100) : description}</p>
                        {/* <p className="xs-text  !text-[#475467]">{description}</p> */}
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    {!active && <span className='size-[.8rem] bg-[#221FCB] rounded-full' />}
                    <span onClick={btn} className={`xs-text cursor-pointer ${btn ? "!font-semibold !text-[#19499E]" : ""}`} >{other}</span>
                </div>
            </div>
            {/* <div className="flex-1 flex justify-between items-center">
                                <div className="">
                                    <p className="xs-text !font-medium !text-[#101828]">{notification.type}</p>
                                    <p className="xs-text">{notification.message}</p>
                                </div>
                                <p className="xs-text">{'59s ago'}</p>
                            </div> */}
        </div>
    )
}
