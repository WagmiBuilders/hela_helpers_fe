import "./style/homePage.css";
import Header from "../components/header";
import mainImage from "../images/main.jpg";
import ButtonLarge from "../components/buttonLarge";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleOnGetStarted = () => {
    navigate("/suggestion");
  };
  const handleOnSubscribeForRaindPrediction = () => {
    navigate("/subscribePrediction");
  };

  return (
    <div className="container-home ">
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <div className="image-wrapper">
          <img src={mainImage} className="main-image" alt="Main-image" />
          <div className="image-overlay"></div>
          <div className="content">
            <h2>Welcome to Hela Helpers</h2>
            <p>Empowering Farmers with Data-Driven Crop Suggestions</p>
            <ButtonLarge
              title="What Should I Grow?"
              onClick={handleOnGetStarted}
            />
            <p>Get Rain Prediction according to your area</p>
            <ButtonLarge
              title="Subscribe for prediction"
              onClick={handleOnSubscribeForRaindPrediction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
