import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import Category from "./pages/Category";

function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/login" exact element={<Login />} />
          <Route path={`/product/:productId`} exact element={<Product />} />
          <Route path="/signUp" exact element={<SignUp />} />
          <Route path="/myPage" exact element={<MyPage />} />
          <Route path="/category/:category/:brand" exact element={<Category />} />
      </Routes>

        <Footer/>
    </BrowserRouter>
  );
}

export default App;
