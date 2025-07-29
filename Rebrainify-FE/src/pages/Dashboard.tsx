import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateComponentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { UseContent } from "../hooks/UseContent"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useNavigate } from "react-router-dom"

type ContentItem = {
  _id: string;
  title: string;
  link?: string;
  text?: string;
  type: "youtube" | "x" | "text";
};

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = UseContent();
  const navigate = useNavigate();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [filter, setFilter] = useState<"home" | "youtube" | "x" | "text">("home");

  const filteredContents = filter === "home"
  ? content 
  : content.filter(c => c.type === filter);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/signin");
    }
  },[])

  useEffect(()=>{
    refresh();
  },[modalOpen])

  useEffect(() => {
    setContent(contents);
  }, [contents]);

  return <div>
    <Sidebar setFilter={setFilter} sharedLink={false}/>
    <div className="p-4 ml-72 min-h-screen bg-gray-100">
      <CreateComponentModal open={modalOpen} onClose={()=>{
        setModalOpen(false);
      }}/>
      <div className="flex justify-end gap-4 pb-4">
        <Button onClick={async ()=>{
          const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
            share: true
          },{
            headers:{
              "Authorization": localStorage.getItem("token")
            }
          })
          const shareURL = `${window.location.origin}/brain/${response.data.hash}`;
          alert(shareURL);
        }} variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}/>
        <Button onClick={()=>{
          setModalOpen(true);
        }} variant="primary" text="Add Content" startIcon={<PlusIcon/>}/>
      </div>
      <div className="pl-4 flex gap-4 flex-wrap">
        {filteredContents.map(({ _id, title, link, text, type }) => (
          <Card key={_id} _id={_id} type={type} link={link} text={text} title={title} onDelete={refresh} readOnly={false} />
        ))}
      </div>
    </div>
  </div>
}