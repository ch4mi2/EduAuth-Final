import { useNavigate } from 'react-router-dom';
const CourseDetails = ({ course }) => {
  const navigate = useNavigate();

  const handleOnClick = (name) => {
    navigate(`${name}`);
  };

  return (
    <div classname="contianer">
      <div className="searchItem">
        <img src={course.imageUrl} className="siImg" alt="courseImage" />
        <div className="siDesc">
          <h1 className="siTitle">{course.name}</h1>
          <span className="siDetails">{course.description}</span>
          <span className="enrol">
            <a href={course.originalUrl}>
              <button id="sibtn">Start Course Now</button>
            </a>
            <button id="sibtn" onClick={() => handleOnClick(course.quiz)}>
              Start Quiz
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
