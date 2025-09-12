import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo, setLoginType } from "./store/memberSlice";
import { setShoppingAccount, initShoppingCart } from "./store/shoppingSlice";
import ScrollUp from "./components/ScrollUp/ScrollUp";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SideReserveButton from "./components/SideReserveButton/SideReserveButton";
import BurgerList from "./components/BurgerList/BurgerList";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Menu from "./pages/Menu/Menu";
import Reserve from "./pages/Reserve/Reserve";
import Cover from "./components/Cover/Cover";
import Member from "./components/Member/Member";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ReserveList from "./pages/User/ReserveList";
import Info from "./pages/User/Info";
import Basic from "./pages/User/Basic";
import Point from "./pages/User/Point";
import Security from "./pages/User/Security";
import TakeOut from "./pages/TakeOut/TakeOut";
import ShoppingCart from "./pages/User/ShoppingCartFolder/ShoppingCart";
import ShoppingInfo from "./pages/User/ShoppingCartFolder/ShoppingInfo";
import CheckOut from "./pages/User/ShoppingCartFolder/CheckOut";
import Complete from "./pages/User/ShoppingCartFolder/Complete";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import CancelByEmail from "./pages/CancelByEmail/CancelByEmail";
import Privacy from "./pages/Privacy/Privacy";
import Term from "./pages/Term/Term";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfoStr = localStorage.getItem("userInfo");
    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr);
      const account = userInfo.account;
      dispatch(setUserInfo(userInfo));
      dispatch(setLoginType(true));
      dispatch(setShoppingAccount(account));
      const shoppingCartStr = localStorage.getItem(`${account}_productList`);
      const shoppingCart = shoppingCartStr ? JSON.parse(shoppingCartStr) : [];
      dispatch(initShoppingCart(shoppingCart));
    } else {
      dispatch(setLoginType(false));
    }
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <ScrollUp />
      <BurgerList />
      <SideReserveButton />
      <Member />
      <Cover />
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/take-out" element={<TakeOut />} />
          <Route
            path="/reserve"
            element={
              <ProtectedRoute>
                <Reserve />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/cancel-order" element={<CancelByEmail />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/term" element={<Term />} />
          <Route
            path="/user/reserveList"
            element={
              <ProtectedRoute>
                <ReserveList />
              </ProtectedRoute>
            }
          />
          <Route path="/user/shopping-cart" element={<ShoppingCart />}>
            <Route index element={<ShoppingInfo />} />
            <Route
              path="check-out"
              element={
                  <CheckOut />
              }
            />
            <Route
              path="complete"
              element={
                  <Complete />
              }
            />
          </Route>
          <Route path="/user/info" element={<Info />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Basic />
                </ProtectedRoute>
              }
            />
            <Route
              path="point"
              element={
                <ProtectedRoute>
                  <Point />
                </ProtectedRoute>
              }
            />
            <Route
              path="security"
              element={
                <ProtectedRoute>
                  <Security />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
