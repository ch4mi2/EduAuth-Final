import logo from '../images/logo.png';
import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
import '../css/navBar.css';

const Navbar = () => {

  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
    logout()
  }

    return (
      <nav className="navbar">
        <img src={logo} alt="EduAuth"/>
        <div className="links">
          
          <Link to="/home">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/api">API</Link>
          <Link to="/donations">Donations</Link>
          {user &&(
            <Link to="/profile">Profile</Link>
          )}
          {!user &&(
            <Link to="/login" style={{ 
              color: 'white', 
              backgroundColor: '#0CA575',
              borderRadius: '8px' 
            }}>Login</Link>
          )}
        </div>
          {user &&(
          <div>
            <button style={{marginLeft:"50px",padding:"5px" ,color: "white", backgroundColor: "#0CA575", 
            border: "none", borderRadius: "8px"}} onClick={handleClick}>Log out</button>
          </div>
        )}
      </nav>
    );
  }
   
  export default Navbar;