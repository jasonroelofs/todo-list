import {ActionType} from './game_state'

export interface Todo {
  name: string;
  count: number | string;
  needs: number | string;
  complete: boolean;
  type: ActionType;

  // Pointer back to the Story step that created this task,
  // allowing us to run some extra step functionality as needed
  createdBy: string;
}
