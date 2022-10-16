import './App.css';
import Header from './common/header/Header';
import { Routes, Route, Link } from "react-router-dom";
import Footer from "./common/footer/Footer"
import Pages from "./pages/Pages"
import Login from './components/login/Login';
import Profile from './components/login/Profile';

function App() {
  return (
    <>
        <Header />
        <Routes>
          <Route path="/" element={<Pages />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
        <Footer />
    </>
  );
}

export default App;
