import { Store, StoreConfig } from '@datorama/akita';
import { SessionState, createInitialState } from './session.model';

@StoreConfig({ name: 'auth' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
