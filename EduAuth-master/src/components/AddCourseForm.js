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
    <form onSubmit={handleSubmit}>
      <h2>Add a new Course</h2>

      <label>Name: </label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Description: </label>
      <textarea
        type="text"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
        className={emptyFields.includes('desc') ? 'error' : ''}
      />

      <label>Course Material URL: </label>
      <input
        type="text"
        onChange={(e) => setCourseMaterialUrl(e.target.value)}
        value={courseMaterialUrl}
        className={emptyFields.includes('courseMaterialUrl') ? 'error' : ''}
      />

      <label>Category: </label>
      <input
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className={emptyFields.includes('category') ? 'error' : ''}
      />

      <button>Add Course</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddCourseForm;
