import {ActionType} from './game_state'

export interface Todo {
  name: string;
  count: number | string;
  needs: number | string;
  complete: boolean;
  type: ActionType;
}
