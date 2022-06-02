import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import Category from "./pages/Category";
import React from "react";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path={`/product/:productId`} element={<Product />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/category/:category/:brand" element={<Category />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
