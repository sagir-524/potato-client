export interface UnprocessableEntityError {
  code: string;
  path: string[];
  message: string;
}

export type UnprocessableEntity = Array<UnprocessableEntityError>;