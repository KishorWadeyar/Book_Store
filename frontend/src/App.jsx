// import React from 'react'
import Home from "./Home/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
// import Contacts from "./components/Contacts";
import { useAuth } from "./context/AuthProvider";
import Order from "./components/Order";
import Contact from "./components/Contact";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
