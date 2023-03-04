import { useAuthContext } from '../hooks/useAuthContext';
import '../css/profile.css'

const Profile = () => {
    const {user} = useAuthContext()
    return (
      <div className="profile">
        <div>
        <h1>Welcome back {user.email}</h1>
        </div>
        <div class="card">
            <h2>Badges</h2>
            <ul>
                <li>Badge 1</li>
                <li>Badge 2</li>
                <li>Badge 3</li>
            </ul>
        </div>
      </div>
    )
  }
  
  export default Profile