import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { DropEvent } from 'ng-drag-drop';
import { SpinControllerService } from '@/service/spin.controller.service';
import { Task, TaskDetail } from '@/types/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.style.less'],
})
export class TaskListComponent implements OnInit {
 
  public allList: Task[] = [{
    name: 'To Do',
    list: [{
      id: 1,
      name: 'test',
      createDate: new Date(),
      useTime: '12h 43min 23s',
      tag: 'quiz'
    }]
  }];
  public taskList: TaskDetail[] = [];

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    public spinControllerService: SpinControllerService,
  ) { }

  public ngOnInit() {
    
  }


  /**
   * 看板拖拽更新状态
   *
   * @param {DropEvent} event
   * @param {TaskDetail} task
   * @memberof KanbanComponent
   */
  public onItemDrop(event: DropEvent, task: TaskDetail) {
  }


}
