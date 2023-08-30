import {Task} from './task'
import {Steps} from './game_steps'

export interface GameState {
  totalTasks: number;
  totalWorkers: number;
  tasks: Array<Task>;

  canAllocateWorkers: boolean;
}

export enum GameAction {
  Load,
  Tick,
  PerformTask,
  AllocateWorker
}

export const InitialGameState: GameState = {
  totalTasks: 0,
  totalWorkers: 0,
  tasks: [],

  canAllocateWorkers: false,
}

export function addTask(gameState: GameState, task: Task) {
  gameState.tasks.push(task);
}

export function performAction(gameState: GameState, action: GameAction): GameState {
  console.log("Performing game action", action, "on", gameState);

  switch(action) {
    case GameAction.Load:
      Steps[0].onAdd(gameState)
      break;
    case GameAction.Tick:
      tickSteps(gameState);
      break;
    case GameAction.PerformTask:
      incrementTasks(gameState)
      break;
    case GameAction.AllocateWorker:
      allocateWorker(gameState)
      break;
  }

  checkRules(gameState);

  return structuredClone(gameState);
}

function incrementTasks(gameState: GameState) {
  gameState.totalTasks += 1;

  gameState.tasks.forEach((task) => {
    task.count += 1;
  });
}

function allocateWorker(gameState: GameState) {
  gameState.totalWorkers += 1;
}

function tickSteps(gameState: GameState) {
  gameState.totalTasks += (gameState.totalWorkers);
}

function checkRules(gameState: GameState) {

}
