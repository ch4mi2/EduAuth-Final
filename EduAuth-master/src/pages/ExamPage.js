import * as faceapi from 'face-api.js';
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ExamPage = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const [exams, setExams] = useState('');
  const [dis, setDis] = useState('none');
  const [QuestionsAndAnswers, setQuestionsAndAnswers] = useState();
  const [examQuestions, setExamQuestions] = useState();
  const [examAnswers, setExamAnswers] = useState();
  const [correctAnswers, setCorrectAnswers] = useState();
  const [answersByUser, setAnswersByUser] = useState([]);
  const [percentageMarks, setPercentageMarks] = useState(null);

  var c = 3;
  var consecFailmSec = 0;
  const MySwal = withReactContent(Swal);
  const videoRef = useRef();
  const videoHeight = 480 / 2;
  const videoWidth = 640 / 2;
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();

    const fetchExams = async () => {
      const response = await fetch('/api/exams/');
      const json = await response.json();
      setExams(json);
    };
    fetchExams();
  }, []);

  const startVideo = () => {
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
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        const displaySize = {
          width: videoWidth,
          height: videoHeight
        }

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks().withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
        canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        //canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
        if( !detections.length ) {
          consecFailmSec++;
          if( consecFailmSec > 5 ) {
            consecFailmSec = 0;
            clearInterval(detectFace);
              MySwal.fire({
                title: 'Please Face the screen',
                text: 'You have ' + c +' warnings remaining',
                icon: 'warning',
                confirmButtonText: 'Ok'
              }).then(() => {
                c--;
                if( c === -1 ) {
                  MySwal.fire({
                    title: 'Test Failed',
                    text: 'You have exceeded the warning limit',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                }).then(() => {
                  closeWebcam();
                })
                } else {
                  MySwal.fire({
                    title: '3',
                    text: 'Get Ready!!',
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                  MySwal.fire({
                    title: '2',
                    text: 'Get Ready!!',
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                  MySwal.fire({
                    title: '1',
                    text: 'Get Ready!!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                  handleVideoOnPlay();
                })
                })
                })
                }
              })
          } // if of checking consecutive failed seconds 
        } else {
          consecFailmSec = 0;
        }
      }
    }, 100)
  }

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

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

  let correctCount = 0;
  const submitExam = (e) => {
    e.preventDefault();

    answersByUser.forEach((item) => {
      //console.log('item' + item);
      //console.log(correctAnswers);
      correctAnswers.forEach((correct) => {
        //console.log('correct' + correct);
        if (correct[0] === item[0] && correct[1] === item[1]) {
          correctCount++;
        }
      });
    });
    setPercentageMarks((correctCount / examQuestions.length) * 100);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <div className="row">
            <div className="col-12">
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
            {captureVideo && !QuestionsAndAnswers ? (
              <div>
                <h1>Available Exams</h1>
                {exams &&
                  exams.map((exam) => (
                    <div key={exam._id}>
                      <h3>{exam.name}</h3>
                      <button onClick={() => loadExam(exam.name)}>
                        Exam Link
                      </button>
                    </div>
                  ))}
              </div>
            ) : (
              <div></div>
            )}
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
      <div className="row">
        {percentageMarks && c > -1 ? (
          <div>
            <h1>Your Score is {percentageMarks} %</h1>
          </div>
        ) : (
          <div>
            {/* <h1>You have been disqualified due to exceeding warning amount.</h1> */}
          </div>
        )}{' '}
        {percentageMarks > 80 && c > -1 && (
          <div>
            <h2>A new certificate is added to your account</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamPage;
