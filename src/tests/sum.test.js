const request = require("supertest")
const assert = require("assert")
const express = require("express")

describe("PUT /sums", function () {
  it("calculates total", async function () {
    const baseUrl = "http://localhost:3000"
    const response = await request(baseUrl).put("/sums").send({
      firstNumber: 1,
      secondNumber: 2,
    })
    expect(response.status).toEqual(200)
    expect(response.body.total).toEqual(3)
  })
})
