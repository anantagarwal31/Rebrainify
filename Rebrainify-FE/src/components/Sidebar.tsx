import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../icons/LogoIcon";
import { LogoutIcon } from "../icons/LogoutIcon";
import { XIcon } from "../icons/XIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
    const navigate = useNavigate();
    const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    };
    return <div className="h-screen bg-white border-r-2 border-gray-50 w-72 fixed flex flex-col">
        <div className="pt-2">
            <h1 className="flex items-center text-2xl gap-4 pl-4 pt-4 font-bold ">
                {<LogoIcon/>} Rebrainify
            </h1>
            <div className="left-0 top-0 pt-8">
                <SidebarItem icon={<XIcon/>} text="Tweets"/>
                <SidebarItem icon={<YoutubeIcon/>} text="Videos"/>
            </div>
        </div>
        <div className="mt-auto pb-4">
            <SidebarItem icon={<LogoutIcon/>} text="Logout" onClick={logout}/>
        </div>
    </div>
}