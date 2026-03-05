import { POST } from "@/app/api/movie/route";

describe("Movie API", () => {
  it("should return 400 if imdbId is missing", async () => {
    const request = new Request("http://localhost/api/movie", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });
});