import { useEffect, useState } from "react";
import { api, clearToken } from "../api";

function TaskList({ onLogout }) {
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	async function loadTasks() {
		try {
			const data = await api.getTasks();
			setTasks(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		loadTasks();
	}, []);

	async function handleAdd(e) {
		e.preventDefault();
		if (!title.trim()) return;
		setError("");
		try {
			const newTask = await api.createTask(title.trim(), description.trim());
			setTasks((prev) => [...prev, newTask]);
			setTitle("");
			setDescription("");
		} catch (err) {
			setError(err.message);
		}
	}

	async function handleToggle(task) {
		const newStatus = task.status === 1 ? 0 : 1;
		try {
			const updated = await api.updateTaskStatus(task.id, newStatus);
			setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
		} catch (err) {
			setError(err.message);
		}
	}

	async function handleDelete(taskId) {
		try {
			await api.deleteTask(taskId);
			setTasks((prev) => prev.filter((t) => t.id !== taskId));
		} catch (err) {
			setError(err.message);
		}
	}

	function handleLogout() {
		clearToken();
		onLogout();
	}

	return (
		<div className="task-card">
			<div className="task-header">
				<h1>My Tasks</h1>
				<button className="logout-btn" onClick={handleLogout} type="button">
					Log out
				</button>
			</div>

			<form onSubmit={handleAdd} className="task-form">
				<input
					placeholder="Task title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<input
					placeholder="Description (optional)"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button type="submit">Add</button>
			</form>

			{error && <p className="error">{error}</p>}

			{loading ? (
				<p>Loading…</p>
			) : tasks.length === 0 ? (
				<p className="empty">No tasks yet. Add one above!</p>
			) : (
				<ul className="task-list">
					{tasks.map((task) => (
						<li key={task.id} className={task.status === 1 ? "done" : ""}>
							<label>
								<input
									type="checkbox"
									checked={task.status === 1}
									onChange={() => handleToggle(task)}
								/>
								<div className="task-text">
									<span className="task-title">{task.title}</span>
									{task.description && (
										<span className="task-desc">{task.description}</span>
									)}
								</div>
							</label>
							<button
								className="delete-btn"
								onClick={() => handleDelete(task.id)}
								type="button"
							>
								✕
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default TaskList;
