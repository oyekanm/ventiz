import Link from 'next/link';
import React from 'react'

interface Props {
  children: React.ReactNode;
  title: string;
  noXt?: boolean;
  link?:string
  xt?:string
}

export default function SectionBlock({ children, noXt=false, title,link,xt="see all" }: Props) {
  const secCon = "grid gap-4"
  const titleCon = "flex items-center justify-between"
  const titleClx = "text-[1.8rem] leading-[2.8rem] font-semibold"
  const seeClx = "xs-text cursor-pointer"
  return (
    <div className={secCon}>
      <div className={titleCon}>
        <p className={titleClx}>{title}</p>
        {!noXt && <Link href={link || ""} className={`${seeClx} ${link?"!text-[#221FCB]":""}`}>{xt}</Link>}
      </div>
      {children}
    </div>
  )
}
