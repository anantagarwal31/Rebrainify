import axios from "axios"
import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { LogoIcon } from "../icons/LogoIcon";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        await axios.post(BACKEND_URL+"/api/v1/signup", {
            username,
            password
        })
        navigate("/signin")
        alert("You have signed up!")
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border-none min-w-48 text-gray-700 p-8">
            <div className="flex items-center justify-center pb-4 gap-2 text-2xl font-semibold">
                <LogoIcon/>
                Rebrainify
            </div>
            <Input ref={usernameRef} placeholder="Username"/>
            <Input ref={passwordRef} placeholder="Password"/>
            <div className="flex justify-center pt-4">
                <Button onClick={signup} variant="primary" text="Signup" fullWidth={true} loading={false}/>
            </div>
        </div>
    </div>
}