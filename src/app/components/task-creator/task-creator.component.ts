import { DataControllerService } from '@/service/data.controller.service';
import { TaskType } from '@/types/task';
import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
})
export class TaskCreatorComponent implements OnInit, OnDestroy {
  @Input() public id: number;
  @Input() public type: TaskType;
  @Input() public modalVisible = false;
  @Output() private changeModal = new EventEmitter<boolean>();
  public validateForm: FormGroup;
  public isOkLoading = false;

  public modalTitle = 'add task';
  public taskDetail = null;


  constructor(
    private dataControllerService: DataControllerService,
    private notification: NzNotificationService,
    private message: NzMessageService,
    private fb: FormBuilder,
  ) { }
  
  /**
   * init form
   */
  public ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      tag: [null, [Validators.required]],
    });
  }

  public ngOnDestroy() {
  }

  /**
   * edit task or add task
   */
  public afterOpen() {
    if (this.id) {
      this.modalTitle = 'edit task';
      this.getById(this.id);
    } else {
      this.modalTitle = 'add task';
      this.validateForm.setValue({
        name: null,
        tag: null,
      });
      this.validateForm.controls['name'].setValidators([Validators.required]);
      this.validateForm.controls['tag'].setValidators([Validators.required]);
      this.taskDetail = null;
    }
  }

  /**
   * after close this modal
   */
  public afterClose() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      tag: [null, [Validators.required]],
    });
    this.taskDetail = null;
  }

  /**
   * get task detail by DataControllerService and init form
   */
  public getById(id: number) {
    const taskDetail = this.dataControllerService.findTaskById(id, this.type);
    if (taskDetail) {
      this.taskDetail = taskDetail;
      this.validateForm.setValue({
        name: taskDetail.name,
        tag: taskDetail.tag,
      });
      this.validateForm.controls['name'].setValidators([Validators.required]);
      this.validateForm.controls['tag'].setValidators([Validators.required]);
    }
  }

  public handleCancel() {
    this.changeModal.emit(false);
    this.isOkLoading = false;
    this.validateForm.reset();
  }

  public buildParams() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.validateForm.valid) {
      this.notification.error('fail', `please check the form`, {
        nzDuration: 2000,
      });
      return;
    }
    this.isOkLoading = true;
    return {
      name: this.validateForm.value['name'],
      tag: this.validateForm.value['tag'],
    };
  }

  public handleOnOk() {
    if (this.id) this.update();
    else this.add();
  }

  /**
   * build params and use dataControllerService to create task
   */
  public add() {
    const params = this.buildParams();
    if (!params) return;
    this.dataControllerService.saveTask({
      id: new Date().getTime(),
      name: params.name,
      tag: params.tag,
      createDate: new Date(),
    }, this.type);
    this.isOkLoading = false;
    this.changeModal.emit(false);
    this.validateForm.reset();
    this.notification.success('success', 'create task success', {
      nzDuration: 2000,
    });
  }

  /**
   * build params and use dataControllerService to update task
   */
  public update() {
    const params = this.buildParams();
    if (!params) return;
    this.dataControllerService.saveTask({
      id: this.taskDetail.id,
      name: params.name,
      tag: params.tag,
      createDate: this.taskDetail.createDate,
    }, this.type);
    this.changeModal.emit(false);
    this.validateForm.reset();
    this.notification.success('success', 'update task success', {
      nzDuration: 2000,
    });
  }
}
