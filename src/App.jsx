import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/about/AboutUs";
import News from "./pages/news/News";
import BlogDetails from "./pages/blog/details/BlogDetails";
import Career from "./pages/career/Career";
import ContactUs from "./pages/Contact/ContactUs";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Industries from "./pages/Industries/Industries";
import OurProduct from "./pages/Product/OurProduct";

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<OurProduct />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/news" element={<News />} />
          <Route path="/blog/details" element={<BlogDetails />} />
          <Route path="/jobs" element={<Career />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/industries" element={<Industries />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
