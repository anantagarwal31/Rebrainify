import { ShareIcon } from "../icons/ShareIcon";

interface CardProps{
    title:string,
    link: string,
    type: "youtube" | "twitter"
}

export function Card(props: CardProps){
    return <div>
        <div className="p-4 bg-white rounded-md border-gray-100 max-w-72 border-2 min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="pr-2 text-gray-400">
                        <ShareIcon/>
                    </div>
                    {props.title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-400">
                        <a href={props.link} target="_blank">
                            <ShareIcon/>
                        </a>
                    </div>
                    <div className="pr-2 text-gray-400">
                        <ShareIcon/>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                {props.type=="youtube" && <iframe className="w-full" src={props.link.replace("watch","embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
                {props.type=="twitter" && <blockquote className="twitter-tweet">
                    <a href={props.link.replace("x.com","twitter.com")}></a> 
                </blockquote>}
            </div>
        </div>
    </div>
}