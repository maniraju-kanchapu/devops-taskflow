const request = require("supertest");
const app = require("../src/app");

describe("TaskFlow API", () => {

    test("GET / should return API status", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("TaskFlow API is running");
    });

    test("GET /tasks should return tasks", async () => {
        const response = await request(app).get("/tasks");

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

});