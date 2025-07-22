import { useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateComponentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"


export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
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
        <Card type="twitter" link="https://x.com/JohnCena/status/1945103460086509654" title="John Cena tweet"/>
        <Card type="youtube" link="https://www.youtube.com/embed/E2_AEgizcgU?si=Vlp8XL9VKUmhxF6o" title="Saket Gokhale - what really happened"/>
      </div>
    </div>
  </div>
}