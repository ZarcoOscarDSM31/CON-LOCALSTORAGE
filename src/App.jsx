import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";
import { LoginPage } from "./pages/LoginPage";
import RegisterPage  from "./pages/RegisterPage";
import  HomePage  from "./pages/HomePage";
import SensoresPage  from "./pages/SensoresPage";
import { Navbar } from "./components/navbar";
import {SensorProvider} from "./context/sensorContext";
const App = () => {
  return (
    <AuthProvider>
      <SensorProvider>
        <BrowserRouter>
          <main>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/sensor" element={<SensoresPage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
        </SensorProvider>
    </AuthProvider>
  );
};

export default App;
