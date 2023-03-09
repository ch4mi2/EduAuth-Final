import '../css/donation.css';
import donationImg from '../images/donation.jpg';
const Donations = () => {
  return (
    <div className="dHero">
      <div className="dHero-content">
        <h1>We rise</h1>
        <h1>by lifting</h1>
        <h1>others</h1>
      </div>
      <div className="dHero-image">
        <img src={donationImg} alt="donation" />
      </div>
    </div>
  );
};

export default Donations;
