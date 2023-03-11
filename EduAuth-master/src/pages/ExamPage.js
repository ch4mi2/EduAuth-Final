import * as faceapi from 'face-api.js';
import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuthContext } from '../hooks/useAuthContext';

const ExamPage = () => {
  const navigate = useNavigate();
  const {user} = useAuthContext();
  const { examName } = useParams();
  const [img, setImg] = React.useState();
  // const [imageUrl,setImagUrl] = React.useState();
  const [faceMatcher,setFaceMatcher] = React.useState();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  //const [course, setCourse] = useState('');
  const [dis, setDis] = useState('none');
  const [QuestionsAndAnswers, setQuestionsAndAnswers] = useState();
  const [examQuestions, setExamQuestions] = useState();
  const [examAnswers, setExamAnswers] = useState();
  const [correctAnswers, setCorrectAnswers] = useState();
  const [answersByUser, setAnswersByUser] = useState([]);
  // const [percentageMarks, setPercentageMarks] = useState();

  var c = 3;
  var consecFailmSec = 0;
  const MySwal = withReactContent(Swal);
  const videoRef = useRef();
  const videoHeight = 480 / 2;
  const videoWidth = 640 / 2;
  const canvasRef = useRef();
  const imageUrl = "https://firebasestorage.googleapis.com/v0/b/eduauth-72983.appspot.com/o/face%2F1678524353548_undefined?alt=media&token=dcc7ea20-3a41-4e12-829a-065a29502edb";

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';     

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
      ]).then(fetchImage).then(setFace).then(setModelsLoaded(true));
    };
    const fetchImage = async () => { 
      const res = await fetch(imageUrl);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    };
    const setFace = async() => {
      const results = await faceapi.detectAllFaces(document.getElementById("FaceImg")).withFaceLandmarks()
          .withFaceDescriptors()
      console.log(results);
      if(!results.length) {
        return;
      }
      setFaceMatcher(new faceapi.FaceMatcher(results));
    };
    loadModels();
    /* const fetchCourses = async () => {
      const response = await fetch('/api/courses/');
      const json = await response.json();
      setCourse(json);
    };
    fetchCourses();
*/
  }, []);

  // async function setFace() {
  //   const results = await faceapi.detectAllFaces(img).withFaceLandmarks()
  //       .withFaceDescriptors()
  //   if(!results.length) {
  //           return;
  //   }
  //   const faceMatcher = new faceapi.FaceMatcher(results);
  // }

  const startVideo = () => {
    const loadExam = (examName) => {
      const fetchExamDetails = async () => {
        const response = await fetch('/api/' + examName);
        const json = await response.json();

        setQuestionsAndAnswers(json);
        console.log(json[0].correctAnswers);
        console.log(json[0]);
        setExamAnswers(json[0].answers);
        setExamQuestions(json[0].questions);
        setCorrectAnswers(json[0].correctAnswers);
        setDis(true);
      };

      fetchExamDetails();
    };
    loadExam(examName);
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error('error:', err);
      });
  };

  const handleVideoOnPlay = () => {
    const detectFace = setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        const singleResult = await faceapi.detectSingleFace(videoRef.current).withFaceLandmarks().withFaceDescriptor()

        const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor);
        // console.log(bestMatch.toString());
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        canvasRef &&
          canvasRef.current &&
          canvasRef.current
            .getContext('2d')
            .clearRect(0, 0, videoWidth, videoHeight);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef &&
          canvasRef.current &&
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        if (!detections.length) {
          consecFailmSec++;
          if (consecFailmSec > 5) {
            consecFailmSec = 0;
            clearInterval(detectFace);
            MySwal.fire({
              title: 'Please Face the screen',
              text: 'You have ' + c + ' warnings remaining',
              icon: 'warning',
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              c--;
              if (c === -1) {
                MySwal.fire({
                  title: 'Test Failed',
                  text: 'You have exceeded the warning limit',
                  icon: 'error',
                  confirmButtonText: 'Ok',
                }).then(() => {
                  closeWebcam();
                });
              } else {
                MySwal.fire({
                  title: '3',
                  text: 'Get Ready!!',
                  icon: 'info',
                  showConfirmButton: false,
                  timer: 1000,
                }).then(() => {
                  MySwal.fire({
                    title: '2',
                    text: 'Get Ready!!',
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 1000,
                  }).then(() => {
                    MySwal.fire({
                      title: '1',
                      text: 'Get Ready!!',
                      icon: 'success',
                      showConfirmButton: false,
                      timer: 1000,
                    }).then(() => {
                      handleVideoOnPlay();
                    });
                  });
                });
              }
            });
          } // if of checking consecutive failed seconds
        } else {
          consecFailmSec = 0;
          if( !(bestMatch.toString().substring(0,8) === 'person 1') ) {
            clearInterval(detectFace);
            MySwal.fire({
              title: 'Not the person registered..',
              text: 'The test cannot be continued',
              icon: 'warning',
              confirmButtonText: 'Ok'
            }).then(() => {
              closeWebcam();
            })
          }
        }
      }
    }, 100);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
    navigate("/");
  };

  let correctCount = 0;
  const submitExam = (e) => {
    e.preventDefault();

    answersByUser.forEach((item) => {
      correctAnswers.forEach((correct) => {
        if (correct[0] === item[0] && correct[1] === item[1]) {
          correctCount++;
        }
      });
    });

    const percentageMarks = (correctCount / examQuestions.length) * 100;
    console.log(percentageMarks);
    navigate(`results`, {
      state: { marks: percentageMarks },
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <div className="row">
            <div className="col-12">
            <img src = { img } hidden alt='Used Face' id='FaceImg'/>
              {!QuestionsAndAnswers && (
                <div style={{ textAlign: 'center', padding: '10px' }}>
                  {captureVideo && modelsLoaded ? (
                    <button
                      onClick={closeWebcam}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '15px',
                        fontSize: '25px',
                        border: 'none',
                        borderRadius: '10px',
                      }}
                    >
                      Close Webcam
                    </button>
                  ) : (
                    <button
                      onClick={startVideo}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '15px',
                        fontSize: '25px',
                        border: 'none',
                        borderRadius: '10px',
                      }}
                    >
                      Open Webcam
                    </button>
                  )}
                </div>
              )}
              {captureVideo ? (
                modelsLoaded ? (
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '10px',
                      }}
                    >
                      <video
                        ref={videoRef}
                        height={videoHeight}
                        width={videoWidth}
                        onPlay={handleVideoOnPlay}
                        style={{ borderRadius: '10px' }}
                      />
                      <canvas
                        ref={canvasRef}
                        style={{ position: 'absolute' }}
                      />
                    </div>
                  </div>
                ) : (
                  <div>loading...</div>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="row">
            {/*captureVideo && !QuestionsAndAnswers ? (
              <div>
                <h1>Available Exams</h1>
                {course &&
                  course.map((course) => (
                    <div key={course._id}>
                      <h3>{course.name}</h3>
                      <button onClick={() => loadExam(course.name)}>
                        Exam Link
                      </button>
                    </div>
                  ))}
              </div>
            ) : (
              <div></div>
            )*/}
          </div>
        </div>

        <div className="col-9">
          <form
            onSubmit={submitExam}
            id="iframe "
            style={{ width: '100%', height: '75dvh', display: dis }}
          >
            {QuestionsAndAnswers &&
              examQuestions &&
              examQuestions.map((q, index) => (
                <div key={q}>
                  <label>{q}</label>
                  <br />

                  <select
                    name={q}
                    onChange={(e) =>
                      setAnswersByUser((prevAnswers) => [
                        ...prevAnswers,
                        [e.target.name, e.target.value],
                      ])
                    }
                  >
                    <option value="none" defaultValue>
                      Select an Option
                    </option>
                    <option value={examAnswers[index][0]}>
                      {examAnswers[index][0]}
                    </option>
                    <option value={examAnswers[index][1]}>
                      {examAnswers[index][1]}
                    </option>
                    <option value={examAnswers[index][2]}>
                      {examAnswers[index][2]}
                    </option>
                    <option value={examAnswers[index][3]}>
                      {examAnswers[index][3]}
                    </option>
                  </select>

                  <br />
                  <br />
                </div>
              ))}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;