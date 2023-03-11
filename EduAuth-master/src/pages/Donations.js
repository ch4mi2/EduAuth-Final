import '../css/donation.css';
import donationImg from '../images/donation.jpg';

const Donations = () => {
  return (
    <div className='container' style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card" style={{ backgroundColor: '#FFEE58' }}>
        <div className="card-text">
          <h2>WE RISE BY LIFTING OTHERS</h2>
        </div>
        <div className="card-img">
          <img src={donationImg} alt="Donation" />
        </div>
      </div>
      <div className="card">
        <div className="card-text">
          <h2>Charity A</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in varius nisi.</p>
        </div>
        <div className="card-donate">
          <button>Donate Now</button>
        </div>
      </div>
      <div className="card">
        <div className="card-text">
          <h2>Charity B</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in varius nisi.</p>
        </div>
        <div className="card-donate">
          <button>Donate Now</button>
        </div>
      </div>
      <div className="card">
        <div className="card-text">
          <h2>Charity C</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in varius nisi.</p>
        </div>
        <div className="card-donate">
          <button>Donate Now</button>
        </div>
      </div>
    </div>
  );
};

export default Donations;



