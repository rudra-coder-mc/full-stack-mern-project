import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./Components/Navigation/Navbar";
import Service from "./pages/Service";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contect from "./pages/Contect";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/service" element={<Service/>}/>
          <Route path="/blogs" element={<Blog/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contect/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
