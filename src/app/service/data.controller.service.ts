import { Content, ContentList, ContentType } from '@/types/content';
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

  public getContentList(): ContentList[] {
    const contents: Content[] = JSON.parse(localStorage.getItem('content-list')) || [];
    const list : ContentList[] = [{type: ContentType.jpns1611, list: []}, {type: ContentType.writ1000, list: []}];
    const jpns1611List = list.find(l => l.type === ContentType.jpns1611);
    const writ1000List = list.find(l => l.type === ContentType.writ1000);
    contents.forEach(c => {
      if (c.type === ContentType.jpns1611) jpns1611List.list.push(c);
      if (c.type === ContentType.writ1000) writ1000List.list.push(c);
    });
    return list;
  }

  public addContent(content: Content) {
    const contents: Content[] = JSON.parse(localStorage.getItem('content-list')) || [];
    contents.push(content);
    localStorage.setItem('content-list', JSON.stringify(contents));
  }

}
