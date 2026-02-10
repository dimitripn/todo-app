import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../styles/App.css";
import Test from "./Test";

function MyButton() {
	const [showTest, setShowTest] = useState(false);

	function handleClick() {
		setShowTest(true);
	}

	return (
		<>
			<button onClick={handleClick}>
				This is a button created by Dimitri
				<br />
			</button>
			{showTest && <Test />}
		</>
	);
}

function AnotherButton({ count, onClick }) {
	return (
		<button onClick={onClick}>
			Another Button
			<br /> Count is {count}
		</button>
	);
}

function App() {
	const [count, setCount] = useState(0);

	function handleClick() {
		setCount(count + 1);
	}

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={handleClick}>count is {count}</button>
				<br /> <br />
				<AnotherButton count={count} onClick={handleClick} />
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<div>
				<p> You are a developer building a todo app!</p>
				<MyButton />
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
