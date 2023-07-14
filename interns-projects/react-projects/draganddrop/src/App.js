import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import React from 'react';
import MyPage from './components/MyApp';
import Login from './components/Login';
import SignUp from './components/Signup';
import SelectTemplate from './components/SelectTemplate';
import UserPage from './components/UserPage';
import LabelTemplate from './components/LabelEdit';
import UserFormTemplateData from './components/UserFormTemplateData/UserFormTemplateData';
// import NewModal from './components/NewModal';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectTemplate />} />
        <Route path="/editFormTemplate" element={<MyPage />} />
        <Route path="/editLabelTemplate" element={<LabelTemplate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userTemplate" element={<UserPage />} />
        <Route path="/userFormTemplateData" element={<UserFormTemplateData />} />
        <Route path ="*" element={<h1>Not Found</h1>} />

        {/* <Route path ="/modal" element={<NewModal />} /> */}
      </Routes>
    </BrowserRouter>

  );

  }
export default App;
