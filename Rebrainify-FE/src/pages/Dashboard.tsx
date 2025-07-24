import { useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateComponentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/UseContent"


export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();

  return <div>
    <Sidebar/>
    <div className="p-4 ml-72 min-h-screen bg-gray-100">
      <CreateComponentModal open={modalOpen} onClose={()=>{
        setModalOpen(false);
      }}/>
      <div className="flex justify-end gap-4">
        <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}/>
        <Button onClick={()=>{
          setModalOpen(true);
        }} variant="primary" text="Add Content" startIcon={<PlusIcon/>}/>
      </div>
      <div className="flex gap-4">
        {contents.map(({_id, title, link, type})=><Card key={_id} type={type} link={link} title={title}/>)}
      </div>
    </div>
  </div>
}