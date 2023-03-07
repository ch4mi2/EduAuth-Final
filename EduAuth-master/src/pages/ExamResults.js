import { useLocation, useParams } from 'react-router-dom';

function ExamResults() {
  const { examName } = useParams();
  const location = useLocation();
  const percentageMarks = location.state.marks;

  if (percentageMarks > 80) {
    // get user details and append courseName/badgeurl to certificates attribute
  }

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
            <div>
              {/* <h1>You have been disqualified due to exceeding warning amount.</h1> */}
            </div>
          )}{' '}
          {percentageMarks > 80 ? (
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
