// test/index.spec.ts
import { describe, expect, it } from "vitest";
import app from "../src/index";

describe("Hello endpoint", () => {
	it("responds with Hello World message", async () => {
		const response = await app.request("/hello", {
			method: "GET",
		});

		expect(response.status).toBe(200);
		const body = await response.json();
		expect(body).toEqual({ message: "Hello World" });
	});
});
