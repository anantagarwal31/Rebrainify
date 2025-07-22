import type { ReactElement } from "react";

interface SidebarItemProps{
    text:string,
    icon: ReactElement
}

export function SidebarItem(props:SidebarItemProps){
    return <div className="flex text-gray-700 py-2 items-center cursor-pointer hover:bg-gray-200 rounded max-w-full ml-2 mr-2 transition-all duration-300">
        <div className="pr-2 pl-6">
            {props.icon}
        </div>
        <div className="">
            {props.text}
        </div>
    </div>
}