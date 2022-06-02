import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { DropEvent } from 'ng-drag-drop';
import { SpinControllerService } from '@/service/spin.controller.service';
import { Task, TaskDetail, TaskTag, TaskType } from '@/types/task';
import { DataControllerService } from '@/service/data.controller.service';
import { ContentList } from '@/types/content';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.style.less'],
})
export class ContentListComponent implements OnInit {
 
  public contentList: ContentList[] = [];
  public editorVisible: boolean = false;;

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private spinControllerService: SpinControllerService,
    private dataControllerService: DataControllerService,
  ) { }

  /**
   * init contentList
   */
  public ngOnInit() {
    this.contentList = this.dataControllerService.getContentList();
    console.log(444445555, this.contentList);
  }

  /**
   * open content editor
   */
  public addContent(list: Task) {
    this.editorVisible = true;
  }

  /**
   * close editor and get contentList
   */
  public changeEditorModal(visible: boolean) {
    this.editorVisible = visible;
    this.contentList = this.dataControllerService.getContentList();
  }
}
