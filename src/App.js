import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Routes>
        <Route path="/" exact element={<Main />} />
          <Route path="/login" exact element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
