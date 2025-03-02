import { useState, useEffect } from "react";
import { baseUrl } from "../config";
import { useNavigate } from 'react-router-dom';


function Test(){

    
    const token = localStorage.getItem('auth_token');

    const [users, setUsers]= useState([]);

    useEffect(()=>{fetch(`${baseUrl}/api/users`, {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
        setUsers(data)

    })
    .catch(error => console.error("Error fetching users:", error));
    });
   
    const handleChange = (e) =>{
        setUsers({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) =>{

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
                        <tr>
                            <td>{b.name}</td>
                            <td>{b.role}</td>
                        </tr>
                    ))

                    }
                </tbody>
            </table>
           
           <table>
            <tbody>
                    <tr>
                        <td>
                            Username:
                        </td>
                        <td> 
                        <input type="text" name="name" value={users.name} onChange={handleChange} required />
                        </td>
                        <td>
                            password:
                        </td>
                        <td>
                        <input type="password" name="password" value={users.password} onChange={handleChange} required />
                        </td>
                        <td>
                        <select name="role" value={users.role} onChange={handleChange} required>
                        <option value="">role</option> {/* Default Placeholder */}
                        <option value="master">master</option>
                        <option value="admin">admin </option>
                        <option value="user">user </option>
                         </select>
                        </td>
                        <td>
                        <button onClick={handleSubmit}> Add User</button>
                        </td>
                    </tr>
            </tbody>
           </table>

        </div>
    );


}

export default Test;