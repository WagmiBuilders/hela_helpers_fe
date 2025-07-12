import './style/homePage.css';
import Header from '../components/header'; 
import mainImage from '../images/main.jpg'; 
import ButtonLarge from '../components/buttonLarge';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleOnGetStarted = () => {
    navigate("/suggestion");
  };

  return (
    <div className="container">
      <div className='header'>
        <Header />
      </div>
      <div className="body">
        <div className="image-wrapper">
            <img src={mainImage} className="main-image" alt="Main-image" />
            <div className="image-overlay"></div>
            <div className="content">
                <p>Welcome to Hela Helpers</p>
                <ButtonLarge title='Get Started' onClick={handleOnGetStarted}/>
            </div> 
        </div>
      </div>
    </div>
  );
}

export default HomePage;
