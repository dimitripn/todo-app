const API_BASE = "http://localhost:3000";

function getToken() {
	return localStorage.getItem("token");
}

function decodeUserId(token) {
	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return payload.id;
	} catch {
		return null;
	}
}

async function request(path, { method = "GET", body, auth = false } = {}) {
	const headers = { "Content-Type": "application/json" };
	if (auth) {
		const token = getToken();
		if (token) headers["Authorization"] = `Bearer ${token}`;
	}

	const res = await fetch(`${API_BASE}${path}`, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	});

	let data = null;
	try {
		data = await res.json();
	} catch {
		// no JSON body
	}

	if (!res.ok) {
		const message = data?.error || data?.message || `Request failed (${res.status})`;
		throw new Error(message);
	}

	return data;
}

export const api = {
	register: (username, email, name, password) =>
		request("/auth/register", { method: "POST", body: { username, email, name, password } }),

	login: (username, password) =>
		request("/auth/login", { method: "POST", body: { username, password } }),

	getTasks: () => request("/tasks", { auth: true }),

	createTask: (title, description) =>
		request("/tasks", { method: "POST", body: { title, description }, auth: true }),

	updateTaskStatus: (taskId, status) => {
		const userId = decodeUserId(getToken());
		return request(`/tasks/${userId}/${taskId}/status`, {
			method: "PUT",
			body: { status },
			auth: true,
		});
	},

	deleteTask: (taskId) => {
		const userId = decodeUserId(getToken());
		return request(`/tasks/${userId}/${taskId}`, { method: "DELETE", auth: true });
	},
};

export function saveToken(token) {
	localStorage.setItem("token", token);
}

export function clearToken() {
	localStorage.removeItem("token");
}

export function hasToken() {
	return !!getToken();
}
