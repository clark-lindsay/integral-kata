export class User {
  name: string;
  private timeline: Post[];

  constructor({ name }: { name: string }) {
    this.name = name;
    this.timeline = [];
  }

  publishPost(content: string): void {
    this.timeline.push({
      content,
      datePublished: new Date(),
      author: this,
    });
  }

  getTimeline(): Post[] {
    return this.timeline;
  }
}

interface Post {
  content: string;
  datePublished: Date;
  author: User;
}
