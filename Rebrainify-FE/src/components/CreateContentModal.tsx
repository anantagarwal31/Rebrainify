import { useEffect, useRef } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

interface CreateComponentModalProps{
    open: Boolean,
    onClose: ()=>void
}

export function CreateComponentModal({open, onClose}: CreateComponentModalProps){
    const modalRef = useRef<HTMLDivElement>(null);

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
                        <Input placeholder={'Title'} onChange={()=>{}}/>
                        <Input placeholder={'Link'} onChange={()=>{}}/>
                    </div>
                    <div className="flex justify-center pt-2">
                        <Button variant="primary" text="Submit"/>
                    </div>
                </span>
            </div>
        </div>)}
    </div>
}