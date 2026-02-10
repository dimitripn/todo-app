function BigButton({ onClick, children }) {
	return (
		<button
			style={{ fontSize: "24px", padding: "10px 20px" }}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

function Test() {
	return (
		<div>
			<h2>Welcome to my first React component!</h2>
			<BigButton onClick={() => alert("Big Button Clicked!")}>
				Click Me!
			</BigButton>
		</div>
	);
}

export default Test;
