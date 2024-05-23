import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/home/Home.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Product from "./pages/product/Product.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import { Provider } from 'react-redux'
import store from '../reduxs/store.js'
import Cookies from 'js-cookie';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ProductDetail from "./pages/productDetail/ProductDetail.jsx";

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenn = Cookies.get('token');
    console.log(token)
    setToken(tokenn);
  }, []);

  return (
    <Provider store={store}>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-x-hidden">
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/menu/:id' element={<Product />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
