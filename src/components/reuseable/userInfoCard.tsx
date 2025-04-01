import React from 'react'

interface User {
  name: string,
  other: string
}
export default function UserInfoCard(user: User) {
  const nameSplit = user.name?.split(" ");
  const first = user.name && nameSplit[0]?.slice(0, 1)
  const second = user.name&& nameSplit[1]?.slice(0, 1)
  return (
    <div className="flex items-center gap-[1.6rem]">
      <div className="size-[4rem] uppercase bg-[#F2F4F7] !text-[#667085] sm-text !font-semibold flex justify-center items-center rounded-full border-[.075rem] border-[#E4E7EC]">
        {user.name ? `${first}${second? second : ""}` : "JD"}
      </div>
      <div >
        <p className="xs-text !font-medium capitalize">{user.name ? user.name : "John Doe"}</p>
        <p className="xs-text">{user.other}</p>
      </div>
    </div>
  )
}
