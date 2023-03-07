import { useState } from 'react';

const AddCourseForm = () => {
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [courseMaterialUrl, setCourseMaterialUrl] = useState();
  const [category, setCategory] = useState();
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseDetails = { name, courseMaterialUrl, category, desc };

    const response = await fetch('/api/courses', {
      method: 'POST',
      body: JSON.stringify(courseDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setName('');
      setDesc('');
      setCourseMaterialUrl('');
      setCategory('');
      setError(null);
      setEmptyFields([]);
      console.log('new course added', json);
    }
  };

  return (
    <div className="container mt-5 ">
      <form onSubmit={handleSubmit}>
        <h2>Add a new Course</h2>
        <div className="row">
          <div className="col-4 mt-5">
            <label>Name: </label>
          </div>
          <div className="col-8 mt-5">
            <input
              style={{ width: '100%' }}
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={emptyFields.includes('name') ? 'error' : ''}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-4 mt-5">
            <label>Description: </label>
          </div>
          <div className="col-8 mt-5">
            <textarea
              style={{ width: '100%' }}
              type="text"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              className={emptyFields.includes('desc') ? 'error' : ''}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-4 mt-5">
            <label>Course Material URL: </label>
          </div>
          <div className="col-8 mt-5">
            <input
              style={{ width: '100%' }}
              type="text"
              onChange={(e) => setCourseMaterialUrl(e.target.value)}
              value={courseMaterialUrl}
              className={
                emptyFields.includes('courseMaterialUrl') ? 'error' : ''
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-4 mt-5">
            <label>Category: </label>
          </div>
          <div className="col-8 mt-5">
            <input
              style={{ width: '100%' }}
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className={emptyFields.includes('category') ? 'error' : ''}
            />
          </div>
        </div>
        <br />
        <button>Add Course</button>

        {error ? (
          <div className="text-danger border border-danger mt-2 m-auto text-center">
            {error}
          </div>
        ) : (
          <div className="text-success border border-success mt-2 m-auto text-center">
            Added Successfully
          </div>
        )}
      </form>
    </div>
  );
};

export default AddCourseForm;
