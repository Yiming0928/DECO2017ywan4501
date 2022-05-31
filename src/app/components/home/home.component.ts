import { Component, OnDestroy, Inject } from '@angular/core';
import { SpinControllerService } from '@/service/spin.controller.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  public showTasks = true;
  public logout$: Subscription;

  constructor(
    private modalService: NzModalService,
    private notification: NzNotificationService,
    public spinControllerService: SpinControllerService,
  ) {
    this.spinControllerService.update(false);
  }

}
