import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Product from "./pages/product";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/login" exact element={<Login />} />
          <Route path={`/product/:productId`} exact element={<Product />} />
          <Route path="/signUp" exact element={<SignUp />} />
      </Routes>

        <Footer/>
    </BrowserRouter>
  );
}

export default App;
