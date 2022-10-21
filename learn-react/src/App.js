import './App.css';
import Header from './common/header/Header';
import { Routes, Route} from "react-router-dom";
import Footer from "./common/footer/Footer"
import Pages from "./pages/Pages"
import Login from './components/login/Login';
import Profile from './components/login/Profile';
import Register from './components/login/Register';
import CreateReq from './components/request/CreateReq';
import SmallC from './components/list/SmallC';

function App() {
  return (
    <>
        <Header />
        <Routes>
          <Route path="/" element={<Pages />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="register" element={<Register />} />
          <Route path="request" element={<CreateReq />} />
          <Route path="smallChildren" element={<SmallC />} />
        </Routes>
        <Footer />
    </>
  );
}

export default App;
