export class Task {
  public type: TaskType;
  public list: TaskDetail[];
};

export class TaskDetail {
  public id: number;
  public name: string;
  public createDate?: Date;
  public tag?: TaskTag;
};

export enum TaskType {
  todo = 'To Do',
  inProgress = 'In Progress',
  done = 'Done',
}
export enum TaskTag {
  quiz = 'quiz',
  easy = 'easy',
  groupWork = 'groupWork',
}
