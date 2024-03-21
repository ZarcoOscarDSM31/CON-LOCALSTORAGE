import React from "react";

const ThemeSwitch = ({ checked, setChecked }) => {
  // Función para cambiar el tema y el estado 'checked'
  const toggleThemeChange = () => {
    const newTheme = checked ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setChecked(!checked);
  };

  return (
    <div>
      {/* Ícono de sol para el tema claro */}
      <svg
        className={`p-1 rounded-full bg-white bg-opacity-60 text-black w-8 h-8 absolute inset-y-0 left-0 m-2 ${!checked ? 'block' : 'hidden'}`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onClick={toggleThemeChange} // Agregamos la función para cambiar el tema al hacer clic en el ícono
      >
        <path d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
      </svg>
      {/* Ícono de luna para el tema oscuro */}
      <svg
        className={`p-1 rounded-full bg-black bg-opacity-60 w-8 h-8 text-white absolute inset-y-0 left-0 m-2 ${checked ? 'block' : 'hidden'}`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onClick={toggleThemeChange} // Agregamos la función para cambiar el tema al hacer clic en el ícono
      >
        <path d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z" />
      </svg>
    </div>
  );
};

export default ThemeSwitch;