const CourseDetails = ({course}) => {
    return (
        <div classname = "contianer">
        < div className="searchItem">
        <img src={course.imageUrl} className = "siImg" alt = "courseImage"/>
            <div className="siDesc">
                <h1 className="siTitle">{course.name}</h1>
                <span className="siDetails">{course.description}</span>
                < span className="enrol">
                    <a href={course.originalUrl}><button id="sibtn">Start Course Now</button></a>
                    <a href={course.link}><button id="sibtn">Start Quiz</button></a>
                </span>
            </div>
        </div>
        </div>
    )
}

export default CourseDetails;