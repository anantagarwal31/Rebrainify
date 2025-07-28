import { useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { XIcon } from "../icons/XIcon";
import { TextIcon } from "../icons/TextIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { BACKEND_URL } from "../config";
import axios from "axios";

declare global {
  interface Window {
    twttr: {
      widgets: {
        load: () => void;
      };
    };
  }
}

interface CardProps{
    _id: string,
    title:string,
    link?: string,
    text?: string,
    type: "youtube" | "x" | "text",
    onDelete?: () => void;
}

export function Card(props: CardProps){
    useEffect(() => {
        if (props.type === "x" && window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load();
        }
    }, [props.type, props.link]); 

    let logo;
    if(props.type=="youtube"){
        logo = <YoutubeIcon/>
    }
    else if(props.type=="x"){
        logo = <XIcon/>
    }
    else if(props.type=="text"){
        logo = <TextIcon/>
    }

    function deleteContent(){
        const confirmed = confirm("Are you sure you want to delete this content?")
        if(!confirmed) return;

        axios.delete(`${BACKEND_URL}/api/v1/content`,{
            headers:{
                Authorization:localStorage.getItem("token")
            },
            data:{
                contentId: props._id
            }
        }).then(()=>{
            if(props.onDelete){
                props.onDelete();
            }
            alert("Content deleted successfully.");
        }).catch(err=>{
            console.error("Failed to delete the content: ", err);
            alert("Failed to delete the content")
        })
    }
    return <div>
        <div className="p-4 bg-white rounded-xl border-gray-100 w-80 border-2 h-80 flex flex-col justify-start">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="pr-4 text-gray-400">
                        {logo}
                    </div>
                    {props.title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-400">
                        <a href={props.link} target="_blank">
                            <ShareIcon/>
                        </a>
                    </div>
                    <div onClick={deleteContent} className="pr-2 text-gray-400">
                        <DeleteIcon/>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                {props.type=="youtube" && <iframe className="w-full" src={props.link && props.link.includes("watch?v=")
                ? props.link.replace("watch?v=", "embed/")
                : props.link && props.link.includes("youtu.be/")
                ? `https://www.youtube.com/embed/${props.link.split("youtu.be/")[1].split(/[?&]/)[0]}`
                : props.link && props.link.includes("/shorts/")
                ? `https://www.youtube.com/embed/${props.link.split("/shorts/")[1].split(/[?&]/)[0]}`
                : ""} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                {props.type === "x" && <blockquote className="twitter-tweet">
                    <a href={props.link && props.link.replace("x.com", "twitter.com")}></a> 
                </blockquote>}
                {props.type === "text" && <div className="flex justify-center items-center pt-2">
                    <textarea
                    value={props.text}
                    readOnly
                    className="px-4 py-2 border border-gray-200 rounded-xl w-full min-h-32 text-sm resize-none"
                    />
                </div>}
            </div>
        </div>
    </div>
}