export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="text-xs block my-1 text-zinc-900">
      {children}
    </label>
  );
}