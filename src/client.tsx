import { hc } from "hono/client";
import { useState } from "hono/jsx";
import { render } from "hono/jsx/dom";
import type { AppType } from "./index";

const client = hc<AppType>("/");

function App() {
	const [message, setMessage] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchMessage = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await client.hello.$get();
			const data = await res.json();
			setMessage(data.message);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to fetch message");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			style={{
				padding: "20px",
				fontFamily: "sans-serif",
				maxWidth: "600px",
				margin: "0 auto",
			}}
		>
			<h1>API Demo</h1>
			<div style={{ margin: "20px 0" }}>
				<button
					type="button"
					onClick={fetchMessage}
					disabled={loading}
					style={{
						padding: "10px 20px",
						fontSize: "16px",
						cursor: loading ? "not-allowed" : "pointer",
						opacity: loading ? 0.6 : 1,
					}}
				>
					{loading ? "Loading..." : "Fetch Message"}
				</button>
			</div>
			{error && (
				<div
					style={{
						padding: "10px",
						backgroundColor: "#fee",
						color: "#c33",
						borderRadius: "4px",
						marginBottom: "10px",
					}}
				>
					Error: {error}
				</div>
			)}
			{message && (
				<div
					style={{
						padding: "20px",
						backgroundColor: "#e8f5e9",
						borderRadius: "4px",
						fontSize: "18px",
					}}
				>
					<strong>Message:</strong> {message}
				</div>
			)}
		</div>
	);
}

// biome-ignore lint/style/noNonNullAssertion: root is guaranteed to be in the document
const root = document.getElementById("root")!;
render(<App />, root);
