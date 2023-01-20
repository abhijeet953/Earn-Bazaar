import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Main from "./pages/main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Messenger from "./pages/messenger/Messenger";
import Profile from "./pages/profile/Profile";
// import Rightbar from "./components/rightbar/Rightbar";

function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      <TopBar />
      {/* <Rightbar user={user}/> */}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Main />}/>
        <Route path="/home" element={user ? <Home /> : <Main />}/>
        <Route path="/register" element={user ? <Home /> : <Register />}/>
        <Route path="/login" element={user ? <Home /> : <Login />}/>
        <Route path="/write" element={user ? <Write /> : <Register />}/>
        <Route path="/settings" element={user ? <Settings /> : <Register />}/>
        <Route path="/messenger" element={user ? <Messenger/> : <Main />}/>
        <Route path="/post/:postId" element={<Single />}/>
        <Route path="/profile/:userId" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
