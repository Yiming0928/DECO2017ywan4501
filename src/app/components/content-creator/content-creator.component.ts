import { DataControllerService } from '@/service/data.controller.service';
import { Content } from '@/types/content';
import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-content-creator',
  templateUrl: './content-creator.component.html',
})
export class ContentCreatorComponent implements OnInit, OnDestroy {
  @Input() public modalVisible = false;
  @Output() private changeModal = new EventEmitter<boolean>();
  public validateForm: FormGroup;
  public isOkLoading = false;



  constructor(
    private dataControllerService: DataControllerService,
    private notification: NzNotificationService,
    private message: NzMessageService,
    private fb: FormBuilder,
  ) { }

  public ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      text: [null, [Validators.required]],
      url: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
  }

  public ngOnDestroy() {
  }

  public afterOpen() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      text: [null, [Validators.required]],
      url: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
  }

  public afterClose() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      text: [null, [Validators.required]],
      url: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
  }

  public handleCancel() {
    this.changeModal.emit(false);
    this.isOkLoading = false;
    this.validateForm.reset();
  }

  /**
   * build content for creating content
   */
  public buildParams(): Content {
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
      text: this.validateForm.value['text'],
      url: this.validateForm.value['url'],
      type: this.validateForm.value['type'],
    };
  }

  /**
   * handle on ok button
   */
  public handleOnOk() {
    this.add();
  }

  /** 
   * add content and close this modal
   */
  public add() {
    const params = this.buildParams();
    if (!params) return;
    this.dataControllerService.addContent(params);
    this.changeModal.emit(false);
    this.validateForm.reset();
    this.notification.success('success', 'add content success', {
      nzDuration: 2000,
    });
  }
}
