export class User {
  name: string;
  private timeline: Post[];
  private following: User[];

  constructor({ name }: { name: string }) {
    this.name = name;
    this.timeline = [];
    this.following = [];
  }

  follow(userToFollow: User): void {
    this.following.push(userToFollow);
  }

  publishPost(content: string, datePublished?: Date): void {
    this.timeline.push({
      content,
      datePublished: datePublished || new Date(),
      author: this,
    });
  }

  getTimeline(): Post[] {
    return [...this.timeline].reverse();
  }

  getWall(): Post[] {
    let result: Post[] = this.getTimeline();
    this.following.forEach(
      (user) => (result = [...result, ...user.getTimeline()])
    );

    return result.sort((a: Post, b: Post) => {
      return b.datePublished.valueOf() - a.datePublished.valueOf();
    });
  }
}

interface Post {
  content: string;
  datePublished: Date;
  author: User;
}
