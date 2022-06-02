import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { DropEvent } from 'ng-drag-drop';
import { SpinControllerService } from '@/service/spin.controller.service';
import { Task, TaskDetail, TaskTag, TaskType } from '@/types/task';
import { DataControllerService } from '@/service/data.controller.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.style.less'],
})
export class TaskListComponent implements OnInit {
 
  public allList: Task[] = [];
  public taskList: TaskDetail[] = [];
  public editorVisible: boolean = false;
  /**
   * task being edited
   */
  public activeId: number = null;
  public activeType: TaskType = null;

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private spinControllerService: SpinControllerService,
    private dataControllerService: DataControllerService,
  ) { }
  
  /**
   * get task list by using dataControllerService
   */
  public ngOnInit() {
    this.allList = this.dataControllerService.getTaskList();
  }

  /**
   * update task type when dragging
   */
  public onItemDrop(event: DropEvent, task: Task) {
    this.dataControllerService.saveTask(event.dragData, task.type);
    this.allList = this.dataControllerService.getTaskList();

  }

  /**
   * open modal and remove activeId and activeType
   */
  public addTask(list: Task) {
    this.editorVisible = true;
    this.activeId = null;
    this.activeType = list.type;
  }

  /**
   * open modal and init activeId and activeType
   */
  public editTask(id: number, list: Task) {
    this.editorVisible = true;
    this.activeId = id;
    this.activeType = list.type;
  }

  public changeEditorModal(visible: boolean) {
    this.editorVisible = visible;
    this.activeId = null;
    this.activeType = null;
    this.allList = this.dataControllerService.getTaskList();
  }
}
