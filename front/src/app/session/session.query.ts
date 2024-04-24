import { Query } from '@datorama/akita';
import { SessionStore } from './session.store';
import { SessionState } from './session.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  
  constructor(protected override store: SessionStore) {
    super(store);
  }

  selectToken() {
    return this.select(state => state.token);
  }

}
