import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectDashboardProps{
    children: ReactNode
}

export function ProtectDashboard({children}:ProtectDashboardProps){
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/signin"/>;
}