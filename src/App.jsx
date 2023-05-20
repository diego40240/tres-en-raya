const TURNS = {
  x: "x",
  O: "o",
};

// TABLERO DE 3 EN RAYA
const board = Array(9).fill(null);

const Square = ({ children, updateBoard, index }) => {
  return <div className="square">{children}</div>;
};
function App() {
  return (
    <main className="board">
      <h1>hola DIEGO</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index}>
              {index}
            </Square>
          );
        })}
      </section>
    </main>
  );
}

export default App;
