import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Toaster } from 'react-hot-toast';
import NavBar from './components/NavBar';
import ListOfOrchids from './pages/ListOfOrchids';
import EditOrchid from './pages/EditOrchid';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<ListOfOrchids />} />
          <Route path="/edit/:id" element={<EditOrchid />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
