import { useEffect, useState } from "react"
import { Card } from "../components/Card"
import { Sidebar } from "../components/Sidebar"
import { useParams } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

type ContentItem = {
  _id: string;
  title: string;
  link?: string;
  text?: string;
  type: "youtube" | "x" | "text";
};

export function SharedContent() {
  const { shareId } = useParams();
  const [username, setUsername] = useState("");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [filter, setFilter] = useState<"home" | "youtube" | "x" | "text">("home");

  const filteredContents = filter === "home"
  ? content 
  : content.filter(c => c.type === filter);

   useEffect(() => {
    async function fetchSharedContent() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareId}`);
        setContent(res.data.content);
        setUsername(res.data.username);
      } catch (err) {
        console.error("Invalid share link or server error", err);
      }
    }

    fetchSharedContent();
  }, [shareId]);

  return <div>
    <Sidebar setFilter={setFilter} sharedLink={true}/>
    <div className="p-4 ml-72 min-h-screen bg-gray-100">
        <h2 className="text-2xl pl-4 pt-2 font-semibold mb-4">Welcome to the Brain of {username}</h2>
        <div className="pl-4 flex gap-4 flex-wrap">
            {filteredContents.map(({ _id, title, link, text, type }) => (
            <Card key={_id} _id={_id} type={type} link={link} text={text} title={title} readOnly={true} />
            ))}
        </div>
    </div>
  </div>
}