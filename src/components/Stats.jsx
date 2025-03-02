import { useState, useEffect } from "react";
import { baseUrl } from "../config";
import { useNavigate } from 'react-router-dom';


function Stats(){

    const navigate = useNavigate();
    const token = localStorage.getItem('auth_token');
    const userRole = localStorage.getItem("user_role");

    useEffect(() =>{
        if (userRole !== "master") {
            navigate('/beneficiaries'); // Change to your unauthorized route
            
        }

    }, [userRole, navigate]);   

    return(

       <div>
        <h2>Stats </h2>
        <h2>To be added</h2>
       </div>
        
    );




}
export default Stats;