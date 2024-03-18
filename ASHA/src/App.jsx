// Importaciones de módulos y componentes necesarios
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import { TaskProvider } from "./context/tasksContext";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    // Proveedor de autenticación para toda la aplicación
    <AuthProvider>
      {/* Proveedor de tareas para toda la aplicación */}
      <TaskProvider>
        {/* Enrutador principal para manejar las rutas */}
        <BrowserRouter>
          {/* Contenedor principal de la aplicación */}
          <main className="container content-container mx-auto px-10 md:px-0">
            {/* Barra de navegación */}
            <Navbar />
            {/* Definición de rutas de la aplicación */}
            <Routes>
              {/* Página de inicio */}
              <Route path="/" element={<HomePage />} />
              {/* Página de inicio de sesión */}
              <Route path="/login" element={<LoginPage />} />
              {/* Página de registro */}
              <Route path="/register" element={<RegisterPage />} />
              {/* Rutas protegidas que requieren autenticación */}
              <Route element={<ProtectedRoute />}>
                {/* Página de tareas (se comenta para ser reemplazada) */}
                <Route path="/tasks" element={<TasksPage />} />
                {/* Página de perfil del usuario */}
                <Route path="/profile" element={<h1>Profile</h1>} />
                {/* Página de administración de tareas */}
                {/* <Route path="/tasks" element={<AdminPage />} /> */} {/* Se comenta porque está es la ruta del administrador */}
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;