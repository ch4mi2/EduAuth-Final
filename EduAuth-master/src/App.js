import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ExamPage from './pages/ExamPage.js';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Donations from './pages/Donations';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import AddCourse from './pages/AddCourse';
import ExamResults from './pages/ExamResults.js';
import Courses from './pages/courses';

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/profile" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/profile" />}
            />
            <Route path="/donations" element={<Donations />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/examPage/:examName" element={<ExamPage />} />
            <Route
              path="/examPage/:examName/results"
              element={<ExamResults />}
            />
            <Route path='/courses' element={<Courses/>}/>
            <Route path="/addCourse" element={<AddCourse />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
