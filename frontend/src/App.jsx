import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GenrePage from "./pages/GenrePage";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import BookDetails from "./pages/BookDetails";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import ProtectedRoute from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  return (
    <UserProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route path="/genre/:genreName" element={<GenrePage />} />
            <Route path="/book/:bookId" element={<BookDetails />} />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </UserProvider>
  );
};

export default App;
