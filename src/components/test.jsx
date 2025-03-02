import { useState, useEffect } from "react";
import { baseUrl } from "../config";
import { useNavigate } from 'react-router-dom';


function Test(){

    const navigate = useNavigate();
    const token = localStorage.getItem('auth_token');
    const userRole = localStorage.getItem("user_role");

    useEffect(() =>{
        if (userRole !== "master") {
            navigate('/beneficiaries'); // Change to your unauthorized route
            
        }

    }, [userRole, navigate]);

    const [users, setUsers]= useState([]);
    const [newUser, setNewUser]= useState({name: "", password: "", role: ""});  

    
    
    
    
    useEffect(()=>{fetch(`${baseUrl}/api/users`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(response => response.json())
    .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    },[]);
   
    
    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

     // Handle form submission
     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) throw new Error("Failed to create user");

            const createdUser = await response.json();
            setUsers([...users, createdUser]); // Update UI
            setNewUser({ name: "", password: "", role: "" }); // Reset form
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    return(
        <div>
            <table border="1" width="100%">
            <tbody>
                    <tr>
                    <td>name</td>
                    <td>role</td>
                    </tr>   
                   {users.map((b) => (
                        <tr key={b.id}>
                            <td>{b.name}</td>
                            <td>{b.role}</td>
                        </tr>
                    ))

                    }
                </tbody>
            </table>
           
            <h2>Add New User</h2>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Username:</td>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={newUser.name}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                            <td>Password:</td>
                            <td>
                                <input
                                    type="password"
                                    name="password"
                                    value={newUser.password}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                            <td>Role:</td>
                            <td>
                                <select name="role" value={newUser.role} onChange={handleChange} required>
                                    <option value="">Select Role</option>
                                    <option value="master">Master</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </td>
                            <td>
                                <button type="submit">Add User</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

        </div>
    );


}

export default Test;