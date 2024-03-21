import { Link } from "react-router-dom"; // Importa el componente Link de react-router-dom

function HomePage() {
  return (
    // Contenedor principal de la página de inicio
    <section className="bg-zinc-50 flex justify-center items-center">
      {/* Encabezado de la página */}
      <header className="bg-zinc-800 text-zinc-50 rounded-2xl  w-11/12 p-10" style={{ marginTop: "15px" }}>
        {/* Título principal */}
        <h1 className="text-5xl py-2 font-bold">ASHA</h1>
        {/* Descripción */}
        <p className="text-md text-slate-400">
          Sistema Hidropónico
        </p>
        {/* Párrafo de texto */}
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, iusto ducimus possimus ad ex atque? Nesciunt tenetur, voluptate maiores, odio nemo autem asperiores adipisci accusamus dicta vero, corrupti voluptatibus similique.
        </p>
        {/* Enlace para dirigirse a la página de inicio de sesión */}
        <Link
          className="bg-zinc-400 text-white hover:bg-green-400 px-4 py-2 rounded-md mt-4 inline-block"
          to="/login"
        >
          Comenzar
        </Link>
      </header>
    </section>
  );
}

export default HomePage; // Exporta el componente HomePage
