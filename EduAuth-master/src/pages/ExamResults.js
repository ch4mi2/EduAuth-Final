import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

function ExamResults() {
  const { examName } = useParams();
  const location = useLocation();
  const percentageMarks = location.state.marks;
  const { user } = useAuthContext();
  const userID = user.userID;
  const url = window.location.pathname;
  const url2 = url.substring(url.indexOf('/examPage/') + '/examPage/'.length);
  const exam = url2.replace('/results', '');

  const [certificateAdded, setCertificateAdded] = useState(false);

  useEffect(() => {
    async function addCertificate() {
      if (percentageMarks > 80) {
        try {
          const response = await fetch(`/api/user/${userID}/certificates`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID, exam }),
          });
          const json = await response.json();
          console.log(json);
          setCertificateAdded(true);
        } catch (error) {
          console.error(error);
        }
      }
    }
    addCertificate();
  }, [userID, examName, percentageMarks]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5">
          {percentageMarks ? (
            <div>
              <h1>
                Your Score is{' '}
                {(Math.round(percentageMarks * 100) / 100).toFixed(2)} %
              </h1>
            </div>
          ) : (
            <div>{<h1>Your Score is 0%</h1>}</div>
          )}{' '}
          {certificateAdded ? (
            <div>
              <h2>A new certificate is added to your account</h2>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExamResults;
