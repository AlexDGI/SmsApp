import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  @Output() titulo$ = new BehaviorSubject('')
  // @Output() titulo$: EventEmitter<string> = new EventEmitter()

  constructor() { }
}