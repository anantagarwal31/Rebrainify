import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateComponentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/UseContent"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/signin");
    }
  },[])

  useEffect(()=>{
    refresh();
  },[modalOpen])

  return <div>
    <Sidebar/>
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
          const shareURL = `http://localhost:5173/share/${response.data.hash}`
          alert(shareURL);
        }} variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}/>
        <Button onClick={()=>{
          setModalOpen(true);
        }} variant="primary" text="Add Content" startIcon={<PlusIcon/>}/>
      </div>
      <div className="flex gap-4 flex-wrap">
        {contents.map(({_id, title, link, type})=><Card key={_id} type={type} link={link} title={title}/>)}
      </div>
    </div>
  </div>
}