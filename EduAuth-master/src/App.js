import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ExamPage from './pages/ExamPage.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/examPage" element={<ExamPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
