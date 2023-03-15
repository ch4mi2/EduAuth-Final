import { useState } from 'react';
import '../css/donation.css';
import donationImg from '../images/donation.jpg';

const Donations = () => {
  const [show, setShow] = useState('none');

  const handleShow = () => {
    setShow('block');
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in
            varius nisi.
          </p>
        </div>
        <div className="card-donate">
          <button onClick={handleShow}>Donate Now</button>
        </div>
      </div>
      <div className="card" style={{ display: show }}>
        <div className="container m-auto">
          <div className="row">
            <div className="col-4">
              <button style={{ minHeight: '58px' }}>
                Donate through EduAuth
              </button>
            </div>
            <div className="col-4">
              <button style={{ minHeight: '58px' }}>
                Donate directly to the family
              </button>
            </div>
            <div className="col-4 ml-5">
              <button style={{ minHeight: '58px' }}>
                Donate to religious place
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-text">
          <h2>Charity B</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in
            varius nisi.
          </p>
        </div>
        <div className="card-donate">
          <button>Donate Now</button>
        </div>
      </div>
      <div className="card">
        <div className="card-text">
          <h2>Charity C</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in
            varius nisi.
          </p>
        </div>
        <div className="card-donate">
          <button>Donate Now</button>
        </div>
      </div>
    </div>
  );
};

export default Donations;
