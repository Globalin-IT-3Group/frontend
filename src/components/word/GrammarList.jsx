import Grammar from "./Grammar";

export default function GrammarList({ grammars }) {
  if (!grammars || grammars.length === 0) return null;
  return (
    <>
      {grammars.map((grammar) => (
        <Grammar key={grammar.id} grammar={grammar} />
      ))}
    </>
  );
}
