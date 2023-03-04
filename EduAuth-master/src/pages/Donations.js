import '../css/donation.css'
import donationImg from '../images/donation.jpg'
const Donations = () => {
    return (
      

        <div class="dHero">
          <div class="dHero-content">
            <h1>We rise</h1>
            <h1>by lifting</h1>
            <h1>others</h1>
          </div>
          <div class="dHero-image">
          <img src={donationImg} alt="donation"/>
          </div>
        </div>

     
    );
  }
   
  export default Donations;