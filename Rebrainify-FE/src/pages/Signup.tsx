import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { LogoIcon } from "../icons/LogoIcon";

export function Signup(){
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border-none min-w-48 text-gray-700 p-8">
            <div className="flex items-center justify-center pb-4 gap-2 text-2xl font-semibold">
                <LogoIcon/>
                Rebrainify
            </div>
            <Input placeholder="Username" onChange={()=>{}}/>
            <Input placeholder="Password" onChange={()=>{}}/>
            <div className="flex justify-center pt-4">
                <Button variant="primary" text="Signup" fullWidth={true} loading={false}/>
            </div>
        </div>
    </div>
}