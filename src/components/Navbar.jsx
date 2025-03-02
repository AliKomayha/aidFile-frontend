import { use } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { token } from 'react';
import { baseUrl } from "../config";
import { useEffect } from 'react';


function Navbar({setToken}) {

    const navigate = useNavigate();
    const token = localStorage.getItem('auth_token');

     // Auto Logout Feature - 10 minutes of inactivity
     useEffect(() => {
        let timeout;

        const resetTimer = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                handleLogout();
            }, 10 * 60 * 1000); // 10 minutes
        };

        // Reset timer on user activity
        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);
        window.addEventListener("click", resetTimer);
        resetTimer(); // Start the timer initially

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("keydown", resetTimer);
            window.removeEventListener("click", resetTimer);
        };
    }, []); // Runs once when component mounts


    const handleLogout = async() => {
   
    try{
        
        const response = await fetch(`${baseUrl}/api/logout`, {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`
            }
        });
        if(response.ok){
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_role');
            setToken(null);
            
        } else{
            alert(`logout failed`);
        }

     }catch(error){
        console.error("Error logging out:", error);
    } 
        
        
    }

    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
            <li><button style={styles.button} onClick={() => navigate('/aid-distributions')}>تقديم المساعدات</button></li> 
            <li><button style={styles.button} onClick={() => navigate('/beneficiaries')}>المستفيدون</button></li>
            <li><button style={styles.button} onClick={() => navigate('/new-beneficiary')}>إضافة مستفيد</button></li>
            <li><button style={styles.button} onClick={() => navigate('/test')}>Users</button></li>
            <li><button style={styles.logoutButton} onClick={handleLogout}>تسجيل الخروج</button></li>
            </ul>
        </nav>
    );
}

// Basic Styling for Navbar
const styles = {
    
    navbar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '@media (minwidth: 768px)': {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        background: '#2D336B',
        padding: '10px',
        textAlign: 'center',
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex: '1000',
        left: '0',
        right: '0',
        margin: '0',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        margin: '0',
        padding: '0'
    },
    link: {
        // textDecoration: 'none',
        // color: 'white',
        // fontSize: '18px',
        // padding: '10px 15px',
        // marginTop: '10px',
        // background: '#0056b3',
        // borderRadius: '5px'
        
    },
    button: {
        fontSize: '18px',
        padding: '10px 15px',
        margin : '10px',
        background: '#2D336B',
        color: '#A9B5DF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease'
    },
    logoutButton: {
        fontSize: '18px',
        padding: '10px 15px',
        margin: '10px',
        background: '#A9B5DF', // 🔴 Red for logout
        color: '#2D336B',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease'
    }
};

export default Navbar;