import home1 from '../images/home1.svg';

const Home = () => {
  return (
    <div className="home">
      <h1 style={{margin: "50px"}}>Welcome to EduAuth</h1>
      <div className="homeContent" style={{display: "flex", alignItems: "center"}}>
        <img src={home1} alt="img1" style={{marginRight: "20px"}}/>  
        <p style={{marginLeft: "20px", marginRight: "20px", textAlign: "center"}}>
          EduAuth is a web-based application that serves as a central hub for free, 
          certified courses from all around the world. The app is designed to make it easy 
          for individuals to find courses that match their career ambition and enhance 
          their skills. Furthermore, EduAuth features an AI-based proctoring system that 
          monitors the user during online exams. This system helps to validate the 
          authenticity of the user and provides a level of assurance to employers, ensuring 
          that the certificates earned through course providers have real value in the job market.
        </p>
      </div>
    </div>
  );
};

export default Home;

