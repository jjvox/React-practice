import "./App.css";
import generateRnadomNumber from "./utils/random.js";
import { useState, useRef } from "react";

function App() {
  const [randomNumber, setRandomNumber] = useState(generateRnadomNumber());
  const [isSuccess, setIsSuccess] = useState(false);
  const [answer, setAnswer] = useState("");
  const [logs, setLogs] = useState([]);
  const inputRef = useRef();

  const handleAnswerChanged = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    if (isNaN(Number(answer)) === true) {
      alert("숫자를 입력하세요");
      setAnswer("");
      inputRef.current.focus();
      return;
    } else if (answer.length !== 4) {
      alert("네자리를 입력하세요");
      setAnswer("");
      inputRef.current.focus();
      return;
    } else if (new Set(answer).length !== 4) {
      alert("중복된 값은 입력 하실 수 없습니다. ");
      setAnswer("");
      inputRef.current.focus();
      return;
    }

    const answers = answer.split("").map((item) => Number(item));

    const { strike, ball } = randomNumber.reduce(
      (prev, cur, idx) => {
        if (answers[idx] === cur) {
          return {
            ...prev,
            strike: prev.strike + 1,
          };
        } else if (answers.includes(cur)) {
          return {
            ...prev,
            ball: prev.ball + 1,
          };
        } else {
          return prev;
        }
      },
      {
        // prev 값
        strike: 0,
        ball: 0,
      }
    );

    if (strike === 4) {
      setLogs([...logs, `${answer} 축하합니다 정답입니다.`]);
      setIsSuccess(true);
    } else {
      setLogs([...logs, `${answer} (strike: ${strike}, ball: ${ball})`]);
      setAnswer("");
    }
  };

  const handleReset = () => {
    setRandomNumber(generateRnadomNumber());
    setAnswer("");
    setLogs([]);
    setIsSuccess(false);
  };

  return (
    <div className="App">
      <h1>숫자 야구 게임</h1>
      <header className="header">
        {isSuccess ? `정답: ${answer}` : "----"}
      </header>
      <section>
        <input
          type="text"
          value={answer}
          onChange={handleAnswerChanged}
          disabled={isSuccess}
          ref={inputRef}
        />
        {isSuccess ? (
          <button onClick={handleReset}>다시하기</button>
        ) : (
          <button onClick={handleSubmit}>맞춰보기</button>
        )}
      </section>
      <h2>기록</h2>
      <ol>
        {logs.map((log, idx) => {
          return <li key={`${log}_${idx}`}>{log}</li>;
        })}
      </ol>
    </div>
  );
}

export default App;
