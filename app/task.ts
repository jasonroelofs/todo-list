import {ActionType} from './game_state'

export interface Task {
  name: string;
  count: number | string;
  needs: number | string;
  complete: boolean;
  type: ActionType;
}
