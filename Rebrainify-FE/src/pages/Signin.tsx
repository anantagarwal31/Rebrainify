import axios from "axios"
import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { LogoIcon } from "../icons/LogoIcon";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    async function signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try{
            const response = await axios.post(BACKEND_URL+"/api/v1/signin", {
                username,
                password
            })
            const jwt = response.data.token;
            localStorage.setItem("token", jwt)
            navigate("/dashboard")
        }
        catch(err:any){
            if(err.response && err.response.data && err.response.data.error){
                setError(err.response.data.error);
            }
            else{
                setError("Something went wrong. Please try again later.");
            }
        }

    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border-none min-w-48 text-gray-700 p-8">
            <div className="flex items-center justify-center pb-4 gap-2 text-2xl font-semibold">
                <LogoIcon/>
                Rebrainify
            </div>
            <Input ref={usernameRef} placeholder="Username"/>
            <Input ref={passwordRef} placeholder="Password"/>
            {error && (
                <div className="text-red-500 text-sm mt-2 text-center">
                {error}
                </div>
            )}
            <div className="flex justify-center pt-2">
                New user?<span className="pl-1 text-blue-700 hover:text-purple-600 hover:underline" onClick={()=>{
                    navigate("/signup")
                }}>SignUp</span>
            </div>
            <div className="flex justify-center pt-4">
                <Button onClick={signin} variant="primary" text="Signin" fullWidth={true} loading={false}/>
            </div>
        </div>
    </div>
}