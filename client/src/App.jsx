import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopRoute from "./components/ScrollToTopRoute";
import Toast from "./components/Toast";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLoader from "./components/PageLoader";
import "./App.css";

// Lazy-loaded pages for code splitting
const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));
const Service = lazy(() => import("./pages/service"));
const Register = lazy(() => import("./pages/register"));
const Login = lazy(() => import("./pages/login"));
const Admin = lazy(() => import("./pages/admin"));
const Error = lazy(() => import("./pages/error"));

const App = () => {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Shani Devpriya - Frontend Developer Portfolio. React, JavaScript, UI/UX expert. Building modern web experiences."
        />
        <meta
          name="keywords"
          content="portfolio, frontend developer, react developer, web developer, shani devpriya, ui/ux"
        />
        <meta name="author" content="Shani Devpriya" />
        <meta
          property="og:title"
          content="Shani Devpriya | Frontend Developer Portfolio"
        />
        <meta
          property="og:description"
          content="I provide clean code and pixel perfect design. Let's build something amazing together."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shanidevpriya.dev" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Shani Devpriya | Frontend Developer"
        />
        <meta
          name="twitter:description"
          content="Frontend developer crafting clean, modern web experiences."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <title>Shani Devpriya | Frontend Developer Portfolio</title>
      </Helmet>

      <BrowserRouter>
        <ErrorBoundary>
          <Navbar />
          <main className="main-content">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/service" element={<Service />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <ScrollToTopRoute />
          <ScrollToTop />
          <Toast />
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
};

export default App;
