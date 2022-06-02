import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinControllerService {
  public showSpin = true;
  public subject: Subject<any> = new Subject();

  /**
   * subscribe and delivery method
   */
  public subscribe(fun: (show: boolean) => void): Subscription {
    return this.subject.subscribe({
      next: fun,
    });
  }

  /**
   * update loading status
   */
  public update = (show: boolean) => {
    this.showSpin = show;
    this.subject.next(show);
  }

  public unsubscribe() {
    this.subject.subscribe();
  }
}
