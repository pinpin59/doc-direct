export interface SessionState {
  token: string | null;
}

export function createInitialState(): SessionState {
  return {
    token: null,
  };
}
