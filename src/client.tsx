import { hc } from "hono/client";
import { Suspense, use, useState } from "hono/jsx";
import { render } from "hono/jsx/dom";
import type { AppType } from "./index";

const client = hc<AppType>("/");

function MessageDisplay({ promise }: { promise: Promise<{ message: string }> }) {
	const data = use(promise);
	return (
		<div
			style={{
				padding: "20px",
				backgroundColor: "#e8f5e9",
				borderRadius: "4px",
				fontSize: "18px",
			}}
		>
			<strong>Message:</strong> {data.message}
		</div>
	);
}

function App() {
	const [messagePromise, setMessagePromise] = useState<Promise<{
		message: string;
	}> | null>(null);

	const fetchMessage = () => {
		setMessagePromise(client.hello.$get().then((res) => res.json()));
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
					style={{
						padding: "10px 20px",
						fontSize: "16px",
						cursor: "pointer",
					}}
				>
					Fetch Message
				</button>
			</div>
			{messagePromise && (
				<Suspense
					fallback={
						<div
							style={{
								padding: "20px",
								backgroundColor: "#f5f5f5",
								borderRadius: "4px",
								fontSize: "18px",
							}}
						>
							Loading...
						</div>
					}
				>
					<MessageDisplay promise={messagePromise} />
				</Suspense>
			)}
		</div>
	);
}

// oxlint-disable-next-line typescript/no-non-null-assertion -- root is guaranteed to be in the document
const root = document.getElementById("root")!;
render(<App />, root);
