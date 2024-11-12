import {Route, Routes} from "react-router-dom";
import BoardList from "./routes/sample/board/BoardList";
import BoardDetail from "./routes/sample/board/BoardDetail";
import BoardWrite from "./routes/sample/board/BoardWrite";
import BoardUpdate from "./routes/sample/board/BoardUpdate";
import LoginForm from "./routes/sample/my_weapon/LoginForm";
import SigninForm from "./routes/sample/my_weapon/SigninForm";
import LecturePlatform from "./routes/sample/my_weapon/LecturePlatform";
import StudyList from "./routes/sample/my_weapon/StudyList";
import StudyHome from "./routes/study/StudyHome";
import StudyBoard from "./routes/study/StudyBoard";
import StudyFiles from "./routes/study/StudyFiles";
import StudySchedule from "./routes/study/StudySchedule";
import StudyMeeting from "./routes/study/StudyMeeting";
import Signup from "./routes/sample/auth/signup";
import Login from "./routes/sample/auth/login";
import Home from "./routes/Home";
import React from "react";

function App() {
  return (
    <div className="max-w-screen-lg container mx-auto p-6">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/board" element={<BoardList/>}/>
        <Route path="/board/:postId" element={<BoardDetail/>}/>
        <Route path="/write" element={<BoardWrite/>}/>
        <Route path="/update/:postId" element={<BoardUpdate />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/weapon/login" element={<LoginForm/>}/>
        <Route path="/weapon/signin" element={<SigninForm/>}/>
        <Route path="/weapon/lecture" element={<LecturePlatform/>}/>
        <Route path="/weapon/study" element={<StudyList/>}/>
        <Route path="/study/:roomId" element={<StudyHome/>}/>
        <Route path="/study/:roomId/board" element={<StudyBoard/>}/>
        <Route path="/study/:roomId/files" element={<StudyFiles/>}/>
        <Route path="/study/:roomId/schedule" element={<StudySchedule/>}/>
        <Route path="/study/:roomId/meeting" element={<StudyMeeting/>}/>
      </Routes>
    </div>
  );
}

export default App;