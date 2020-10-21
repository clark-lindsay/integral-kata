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

describe("the Following feature", () => {
  describe("the Users wall", () => {
    it("should return an aggregated list of the posts of all the users that they follow, sorted in revers-publishing order", () => {
      const alice = new User({ name: "Alice" });
      alice.publishPost(
        "I love the weather today.",
        new Date(new Date().setMinutes(0))
      );

      const bob = new User({ name: "Bob" });
      bob.publishPost("Darn! We lost!", new Date(new Date().setMinutes(3)));
      bob.publishPost("Good game though.", new Date(new Date().setMinutes(4)));

      const charlie = new User({ name: "Charlie" });
      charlie.publishPost(
        "I'm in New York today! Anyone want to have a coffee?",
        new Date(new Date().setMinutes(5))
      );
      charlie.follow(alice);
      charlie.follow(bob);

      const charlieWall = charlie.getWall();

      expect(charlieWall[0].content).toEqual(
        "I'm in New York today! Anyone want to have a coffee?"
      );
      expect(charlieWall[0].author.name).toEqual("Charlie");

      expect(charlieWall[1].content).toEqual("Good game though.");
      expect(charlieWall[1].author.name).toEqual("Bob");

      expect(charlieWall[2].content).toEqual("Darn! We lost!");
      expect(charlieWall[2].author.name).toEqual("Bob");

      expect(charlieWall[3].content).toEqual("I love the weather today.");
      expect(charlieWall[3].author.name).toEqual("Alice");
    });
  });
});
