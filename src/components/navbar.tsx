import Button from "./button"
import './style/navbar.css'
import '../constants/colors.css'
import { useNavigate } from "react-router-dom";

function navbar() {
  const navigate = useNavigate();

  const handleOnSignIn = () => {
    alert('Sign in');
  };

  const handleOnProfile = () => {
    navigate("/profile")
  };

  return (
    <div className="navbar">
       <Button 
          title="Sign In" 
          onClick={handleOnSignIn}
          bgColor="var(--bg-darkGreen)"
          textColor="var(--text-light)"
        />
       <Button 
          title="Profile" 
          onClick={handleOnProfile}
          bgColor="var(--white)"
          textColor="var(--text-dark)"
        />
    </div>
  )
}

export default navbar