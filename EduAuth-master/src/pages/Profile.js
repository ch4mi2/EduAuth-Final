import { useAuthContext } from '../hooks/useAuthContext';
import '../css/profile.css';
import { useEffect, useState } from 'react';


const Profile = () => {
  const [certificates, setCertificates] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCertificates = async () => {
      if (user !== null) {
        const response = await fetch(`/api/user/${user.userID}/certificates`);
        const json = await response.json();
  
        if (response.ok) {
          const certificates = json.map((name) => ({ name }));
          setCertificates(certificates);
        }
      }
    };
  
    fetchCertificates();
  }, [user]);
  
  const renderCertificateBadge = (name) => {
    if (name === 'cProgrammingQuiz') {
      return (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/eduauth-72983.appspot.com/o/badges%2FcProgramming.png?alt=media&token=07617a2e-ce59-4505-9109-c0ffb1ba1b9b"
          alt="cProgrammingQuiz Badge"
          style={{ width: '100px', height: '100px' }}
        />
      );
    }else if(name === 'cyberSecurityQuiz'){
      return (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/eduauth-72983.appspot.com/o/badges%2FCyberSecurity.png?alt=media&token=98441c36-09aa-495e-9f81-d216827f356a"
          alt="cyberSecurityQuiz Badge"
          style={{ width: '100px', height: '100px' }}
        />
      );
    }else if(name === 'AIQuiz'){
      return (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/eduauth-72983.appspot.com/o/badges%2FAL.png?alt=media&token=ea8d1bbd-eb77-496b-872f-5ae4d5a5179d"
          alt="cyberSecurityQuiz Badge"
          style={{ width: '100px', height: '100px' }}
        />
      );
    }else if(name === 'javaQuiz'){
      return (
        <img
          src="https://firebasestorage.googleapis.com/v0/b/eduauth-72983.appspot.com/o/badges%2Fjava.png?alt=media&token=a6bb7452-4f00-470c-a7e7-55a9a2c323ad"
          alt="cyberSecurityQuiz Badge"
          style={{ width: '100px', height: '100px' }}
        />
      );
    }
     else {
      return <p>{name}</p>;
    }
  };

  return (
    <div className="profile">
      <div>
        <h2 style={{ marginLeft: 20, marginTop: 20 }}>
        {user ? `Welcome back ${user.email}` : 'Loading...'}
        </h2>
      </div>
      <div className="card">
        <h2>Badges</h2>
        {certificates === null ? (
          <p>Loading...</p>
        ) : (
          certificates.length > 0 ? (
            certificates.map((cert) => (
              <div key={cert._id}>
                {renderCertificateBadge(cert.name)}
              </div>
            ))
          ) : (
            <p>No certificates found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
