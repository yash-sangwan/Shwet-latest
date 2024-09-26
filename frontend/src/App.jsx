import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./components/Private/AuthContext"; // Adjust path accordingly
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import "./App.css";
import PrivateRoute from "./components/Private/PrivateRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/playground"
              element={
                <PrivateRoute>
                  <Playground />{" "}
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
