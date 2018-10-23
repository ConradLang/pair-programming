const expect = require("chai").expect;
const describe = require("mocha").describe;
const it = require("mocha").it;
const converter = require("../src/converter");

describe("Convert dollars to words", () => {
  it("Converts successfully", () => {
    const result = converter.convertAmount("123");

    expect(result).to.equal("one hundred and twenty three dollars");
  })
})