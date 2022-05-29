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

  public showLogout() {
    // this.modalService.confirm({
    //   nzTitle: '确定退出登录吗？',
    //   nzOnOk: () => {
    //     if (this.logout$) this.logout$.unsubscribe();
    //     this.logout$ = this.authService.logout().subscribe(res => {
    //       if (res.success) this.router.navigate(['/page/login']);
    //       else {
    //         this.notification.error('失败', `退出登录失败！原因:${res.message}`, {
    //           nzDuration: 2000,
    //         });
    //       }
    //     });
    //   }
    // });

  }

}
