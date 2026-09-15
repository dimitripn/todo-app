import { useState } from "react";
import "../styles/App.css";
import Auth from "./Auth";
import TaskList from "./TaskList";
import { hasToken } from "../api";

function App() {
	const [loggedIn, setLoggedIn] = useState(hasToken());

	return (
		<div className="app">
			{loggedIn ? (
				<TaskList onLogout={() => setLoggedIn(false)} />
			) : (
				<Auth onLogin={() => setLoggedIn(true)} />
			)}
		</div>
	);
}

export default App;
