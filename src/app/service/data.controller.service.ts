import { Task, TaskDetail, TaskType } from '@/types/task';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataControllerService {

  public saveTask(taskDetail: TaskDetail, type: TaskType): Task {
    const task: Task = JSON.parse(localStorage.getItem(type)) || {
      type,
      list: []
    };
    const sameTask = task.list.find(t => t.id === taskDetail.id);
    if (!sameTask) {
      task.list.push({...taskDetail});
    } else {
      task.list.forEach(t => {
        if ((t.id === taskDetail.id)) {
          t.name = taskDetail.name;
          t.tag = taskDetail.tag;
        }
      });
    }

    localStorage.setItem(task.type, JSON.stringify(task));

    // remove the same task
    [TaskType.todo, TaskType.inProgress, TaskType.done].forEach(t =>{
      if (type !== t) {
        const task2: Task = JSON.parse(localStorage.getItem(t)) || {
          type,
          list: []
        };
        const i = task2.list.findIndex(t => t.id === taskDetail.id);
        if (i !== -1) {
          task2.list.splice(i, 1);
          localStorage.setItem(t, JSON.stringify(task2));
        }
      }
    });

    return JSON.parse(localStorage.getItem(task.type));
  }

  public getTaskList() {
    const allList: Task[] = [];
    allList.push(JSON.parse(localStorage.getItem(TaskType.todo)) || {
      type: TaskType.todo,
      list: [],
    });
    allList.push(JSON.parse(localStorage.getItem(TaskType.inProgress)) || {
      type: TaskType.inProgress,
      list: [],
    });
    allList.push(JSON.parse(localStorage.getItem(TaskType.done)) || {
      type: TaskType.done,
      list: [],
    });
    console.log(4444, allList);
    return allList;
  }

  public findTaskById(id: number, type: TaskType) {
    const task: Task = JSON.parse(localStorage.getItem(type));
    return task.list.find(t => t.id === id);
  }

}
