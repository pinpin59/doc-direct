import { Query } from '@datorama/akita';
import { SessionStore } from './session.store';
import { SessionState } from './session.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  
  constructor(protected override store: SessionStore) {
    super(store);
  }

  selectUserToken() {
    return this.select(state => state.userToken);
  }

  selectHealtProfessionalToken() {
    return this.select(state => state.healthProfessionalToken);
  }

  selectTokens(){
    return this.select(state => {
      return {
        userToken: state.userToken,
        healthProfessionalToken: state.healthProfessionalToken
      }
    });
  }

}
