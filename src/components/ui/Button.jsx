export function Button({ onClick, children }) {
  return (
    <button
      className="bg-green-100 text-black hover:bg-green-500 hover:text-zinc-50 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
