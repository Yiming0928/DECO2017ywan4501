export class Task {
  public name: string;
  public list: TaskDetail[];
};

export class TaskDetail {
  public id: number;
  public name: string;
  public createDate?: Date;
  public useTime?: string;
  public tag?: string;
};
