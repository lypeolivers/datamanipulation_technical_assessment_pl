import { describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../src/app";

describe("Read OZMAP XLS", () => {
  beforeEach(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdatabase");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Create All documents", async () => {
    const response = await supertest(app).get("/ozmap");
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("boxes");
    expect(response.body).toHaveProperty("splitters");
    expect(response.body).toHaveProperty("clients");
  });
});
