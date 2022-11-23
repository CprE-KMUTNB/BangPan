import './App.css';
import Header from './common/header/Header';
import { Routes, Route} from "react-router-dom";
import Footer from "./common/footer/Footer"
import Pages from "./pages/Pages"
import Login from './login/Login';
import Profile from './login/Profile';
import Register from './login/Register';
import CreateReq from './components/request/CreateReq';
import SmallC from './components/list/SmallC';
import Child from './components/list/Child';
import Cripple from './components/list/Cripple';
import Pets from './components/list/Pets';
import Adult from './components/list/Adult';
import MyRequest from './components/request/MyRequest';
import AllCate from './components/list/AllCate';
import Category from './components/list/Category';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './pages/Layout';

function App() {
  return (
    <Provider store={store}>
        <Layout>
          <Routes>
            <Route path="/" element={<Pages />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="register" element={<Register />} />
            <Route path="request" element={<MyRequest />} />
            <Route path="smallChildren" element={<SmallC/>} />
            <Route path="children" element={<Child />} />
            <Route path="cripple" element={<Cripple />} />
            <Route path="pets" element={<Pets />} />
            <Route path="oldPeople" element={<Adult />} />
            <Route path="all" element={<AllCate />} />
            <Route path="request/create" element={<CreateReq />} />
            <Route path="category_object/:id" element={<Category />} />
          </Routes>
        </Layout>
        <Footer />
    </Provider>
  );
}

export default App;
