import { useState } from "react";

const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  function handleClick() {
    return updateBoard(index);
  }
  return <div onClick={handleClick} className={className}>{children}</div>;
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  // TABLERO DE 3 EN RAYA, ARRAY DE 9 VALORES
  const [board, setBoard] = useState(Array(9).fill(null));

  // ESTADO PARA SABER CON QUE TURNO SE EMPIEZA Y EN QUE TURNO ESTA AHORA
  const [turn, setTurn] = useState(TURNS.X);

  //NULL que no hay ganador, FALSE que hay un empate
  const [winner, setWinner] = useState(null);

  //Recibe la tabla actualizada para verificar dentro del if si el valor colocado dentro de la posicion del array,es igual a lo del array "WINNER COMBOS", ya que es su condicion del ganador
  function checkWinner(boardToCheck) {
    for(const combo of WINNER_COMBOS) {
      // Del array WINNER_COMBOS los valor toman posicon del "a", "b" y "c" para entrar en la condicion IF
      const [a, b, c] = combo;
      if (boardToCheck[a] && boardToCheck[a] == boardToCheck[b] && boardToCheck[a] == boardToCheck[c]) {
        //Retornar el primer valor ya sea "x" u "o"
        return boardToCheck[a];
      }
    }
    //Si no hay ganador
    return null
  }

   // CUANDO SE PASA EN PARAMETROS "UPDATEBOARD" SE PASA LA FUNCION PARA EJECUTARLA CUANDO SEA NECESARIO, POR EL CONTRARIO SI SE PASA "UPDATEBOARD()" SE EJECUTARIA LA FUNCION DEPENDIENDO CUANTAS VECES SE RENDERICE, MUCHAS NO SE QUIERE ESO.---> IR A <SQUARE>
  function updateBoard(index) {
    //Si el "board" (la tabla) tiene un valor no se escribira encima
    if(board[index] || winner) return

    //En la posicion del "index" se colocara el valor del turno "X" u "O"
    const newBoard = [...board];    
    newBoard[index] = turn;
    setBoard(newBoard);

    //Cambio de turno dependiendo si turno actual es "X" u "O"
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //Envia la tabla nueva(actualizada) para la verificacion del GANADOR
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      alert(`Ganador ${newWinner}`);
    }    
  }
 
  return (
    <main className="board">
      <h1>TRES EN RAYA</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
    </main>
  );
}

export default App;
