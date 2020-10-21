import { User } from "../src/User";

describe("the Publishing feature", () => {
  it("adds published posts to a users personal timeline", () => {
    const alice = new User({ name: "Alice" });
    alice.publishPost("I love the weather today.");

    expect(alice.getTimeline()[0].content).toEqual("I love the weather today.");
  });
});
