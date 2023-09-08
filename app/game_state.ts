import {Task} from './task'
import {Steps} from './game_steps'

export interface GameState {
  totalTasks: number;
  totalWorkers: number;
  tasks: Array<Task>;

  activatedStory: Array<string>;
  activatedSteps: Set<string>;

  canAllocateWorkers: boolean;
}

export enum GameAction {
  Load,
  Tick,
  PerformTask,
  AllocateWorker
}

export enum ActionType {
  Global,
  Task,
  Worker,
}

export const InitialGameState: GameState = {
  totalTasks: 0,
  totalWorkers: 0,
  tasks: [],

  activatedStory: [],
  activatedSteps: new Set(),

  canAllocateWorkers: false,
}

export function addTask(gameState: GameState, task: Task) {
  gameState.tasks.push(task);
}

export function performAction(gameState: GameState, action: GameAction): GameState {
  console.log("Performing game action", action, "on", gameState);

  switch(action) {
    case GameAction.Load:
      activateStep("initial", gameState);
      break;
    case GameAction.Tick:
      tickSteps(gameState);
      break;
    case GameAction.PerformTask:
      incrementTasks(gameState);
      break;
    case GameAction.AllocateWorker:
      allocateWorker(gameState);
      break;
  }

  checkRules(gameState);

  return structuredClone(gameState);
}

function incrementTasks(gameState: GameState, amount: number = 1) {
  gameState.totalTasks += amount;

  // Only increment the first entry we have
  let task = gameState.tasks.find((task) => {
    return !task.complete && task.type == ActionType.Task;
  });

  task.count += amount;
}

function allocateWorker(gameState: GameState) {
  gameState.totalWorkers += 1;

  let task = gameState.tasks.find((task) => {
    return !task.complete && task.type == ActionType.Worker;
  });

  task.count += 1;
}

function tickSteps(gameState: GameState) {
  incrementTasks(gameState, gameState.totalWorkers);
}

function checkRules(gameState: GameState) {
  // Find entries that are complete
  gameState.tasks.forEach((task) => {
    if (!task.complete && task.count >= task.needs) {
      completeTask(gameState, task);
    }
  });

  // Find if we need to add more steps to the todo list
  let stepsToCheck = new Set(Object.keys(Steps));
  gameState.activatedSteps.forEach((stepName) => stepsToCheck.delete(stepName));

  stepsToCheck.forEach((stepName) => {
    if(Steps[stepName].activateOn(gameState)) {
      activateStep(stepName, gameState);
    }
  });
}

function activateStep(stepName: string, gameState: GameState) {
  Steps[stepName].onAdd(gameState);
  gameState.activatedSteps.add(stepName);
  gameState.activatedStory.push(Steps[stepName].story);
}

function completeTask(gameState: GameState, task: Task) {
  task.complete = true;

  let tracker = gameState.tasks.find((t) => {
    return t.type == ActionType.Global;
  });

  tracker.count += 1;
}
