import { useEffect, useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CreateComponentModalProps{
    open: Boolean,
    onClose: ()=>void
}

export const ContentType = {
  Youtube: "youtube",
  X: "x"
} as const;

export type ContentType = typeof ContentType[keyof typeof ContentType];


export function CreateComponentModal({open, onClose}: CreateComponentModalProps){
    const modalRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<ContentType>(ContentType.Youtube)

    useEffect(()=>{
        function handleClickOutside(event:MouseEvent){
            if(modalRef.current && !modalRef.current.contains(event.target as Node)){
                onClose();
            }
        }
        if(open){
            document.addEventListener("mousedown",handleClickOutside)
        }

        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside)
        };
    },[open,onClose])

    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            title,
            link,
            type
        },{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })

        onClose();
    }

    return <div>
        {open && (<div className="w-screen h-screen top-0 left-0  fixed flex justify-center items-center">
            <div className="absolute w-full h-full bg-slate-500 opacity-60"></div>
            <div ref={modalRef} className="z-10 flex flex-col justify-center">
                <span className="bg-white p-4 rounded-md">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon/>
                        </div>
                    </div>
                    <div>
                        <Input ref={titleRef} placeholder={'Title'}/>
                        <Input ref={linkRef} placeholder={'Link'}/>
                    </div>
                    <div>
                        <h1 className="flex justify-center">Type</h1>
                        <div className="flex gap-2 p-2 justify-center">
                            <Button text="Youtube" variant={type==ContentType.Youtube?"primary":"secondary"} onClick={()=>{
                                setType(ContentType.Youtube)
                            }}/>
                            <Button text="X" variant={type==ContentType.X?"primary":"secondary"} onClick={()=>{
                                setType(ContentType.X)
                            }}/>
                        </div>
                    </div>
                    <div className="flex justify-center pt-2">
                        <Button onClick={addContent} variant="primary" text="Submit"/>
                    </div>
                </span>
            </div>
        </div>)}
    </div>
}