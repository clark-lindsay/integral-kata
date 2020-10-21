import { User } from "../src/User";

describe("the Publishing feature", () => {
  it("adds published posts to a users personal timeline", () => {
    const alice = new User({ name: "Alice" });
    alice.publishPost("I love the weather today.");

    expect(alice.getTimeline()[0].content).toEqual("I love the weather today.");
  });
});

describe("the Timeline feature", () => {
  it("shows all of a users personal posts, sorted in reverse order by date", () => {
    const bob = new User({ name: "Bob" });
    bob.publishPost("Darn! We lost!");
    bob.publishPost("Good game though.");

    expect(bob.getTimeline()[0].content).toEqual("Good game though.");
    expect(bob.getTimeline()[1].content).toEqual("Darn! We lost!");

    const timeOfFirstPost = bob.getTimeline()[1].datePublished.valueOf();
    const timeOfSecondPost = bob.getTimeline()[0].datePublished.valueOf();

    expect(timeOfFirstPost).toBeLessThanOrEqual(timeOfSecondPost);
    expect(timeOfSecondPost).toBeGreaterThanOrEqual(timeOfFirstPost);
  });
});
