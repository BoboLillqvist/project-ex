import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NotificationService {

  private message = new BehaviorSubject<string>('default message');

  public type: string;
  public notification: boolean;
  public currentMessage = this.message.asObservable();

  constructor() { }

  notify(message: string, type: string) {
    this.message.next(message);
    this.type = type;
    this.notification = true;
  }
}
