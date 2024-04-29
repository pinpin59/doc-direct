export interface SessionState {
  userToken: string | null;
  healthProfessionalToken: string | null;
}

export function createInitialState(): SessionState {
  return {
    userToken: null,
    healthProfessionalToken: null
  };
}
