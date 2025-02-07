import { use } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { token } from 'react';

function Navbar({setToken}) {

    const navigate = useNavigate();

    const handleLogout = async() => {
    // to be logged out  15|uO8Fa7y7wMZpwm7z5qdjYyTZMQbjDLTgZPWnkWWL028dd2c9
    try{
        const token = localStorage.getItem('auth_token');
        const response = await fetch('http://192.168.1.121:8001/api/logout', {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${token}`
            }
        });
        if(response.ok){
            localStorage.removeItem('auth_token');
            setToken(null);
            navigate('/Login');
        } else{
            alert(`logout failed  ${token}`);
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
            <li><button style={styles.button}>Button</button></li>
            <li><button style={styles.button}>Button</button></li>
            <li><button style={styles.logoutButton} onClick={handleLogout}>تسجيل الخروج</button></li>
            </ul>
        </nav>
    );
}

// Basic Styling for Navbar
const styles = {
    navbar: {
        background: '#007BFF',
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
        background: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease'
    },
    logoutButton: {
        fontSize: '18px',
        padding: '10px 15px',
        margin: '10px',
        background: '#dc3545', // 🔴 Red for logout
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s ease'
    }
};

export default Navbar;