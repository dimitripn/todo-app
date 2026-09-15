import { useState } from "react";
import { api, saveToken } from "../api";

function Auth({ onLogin }) {
	const [mode, setMode] = useState("login"); // "login" | "register"
	const [form, setForm] = useState({ username: "", email: "", name: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	function update(field) {
		return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			if (mode === "login") {
				const { token } = await api.login(form.username, form.password);
				saveToken(token);
				onLogin();
			} else {
				await api.register(form.username, form.email, form.name, form.password);
				const { token } = await api.login(form.username, form.password);
				saveToken(token);
				onLogin();
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="auth-card">
			<h1>Todo App</h1>
			<div className="auth-tabs">
				<button
					className={mode === "login" ? "active" : ""}
					onClick={() => setMode("login")}
					type="button"
				>
					Log in
				</button>
				<button
					className={mode === "register" ? "active" : ""}
					onClick={() => setMode("register")}
					type="button"
				>
					Register
				</button>
			</div>
			<form onSubmit={handleSubmit} className="auth-form">
				<input
					placeholder="Username"
					value={form.username}
					onChange={update("username")}
					required
				/>
				{mode === "register" && (
					<>
						<input
							type="email"
							placeholder="Email"
							value={form.email}
							onChange={update("email")}
							required
						/>
						<input
							placeholder="Name"
							value={form.name}
							onChange={update("name")}
							required
						/>
					</>
				)}
				<input
					type="password"
					placeholder="Password"
					value={form.password}
					onChange={update("password")}
					required
				/>
				{error && <p className="error">{error}</p>}
				<button type="submit" disabled={loading}>
					{loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
				</button>
			</form>
		</div>
	);
}

export default Auth;
