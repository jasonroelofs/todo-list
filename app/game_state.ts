import {Todo} from './todo'
import {Steps, nextTaskTODO, nextWorkerTODO} from './game_steps'

export interface GameState {
  todos: Array<Todo>;
  taskWallet: number;

  totalTasks: number;
  totalWorkers: number;

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
  Todo,
  Task,
  Worker,
}

export const InitialGameState: GameState = {
  todos: [],
  taskWallet: 0,

  totalTasks: 0,
  totalWorkers: 0,

  activatedStory: [],
  activatedSteps: new Set(),

  canAllocateWorkers: false,
}

export function addTodo(gameState: GameState, todo: Todo) {
  gameState.todos.push(todo);
}

export function performAction(gameState: GameState, action: GameAction): GameState {
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

/**
 * Worker Support
 */

export function workersEnabled(gameState: GameState): boolean {
  return gameState.canAllocateWorkers;
}

export function workerCost(gameState: GameState): number {
  return Math.ceil((gameState.totalWorkers + 1) * 1.05);
}

export function canAllocateWorker(gameState: GameState): boolean {
  return gameState.canAllocateWorkers && workerCost(gameState) < gameState.taskWallet;
}

function allocateWorker(gameState: GameState) {
  gameState.taskWallet -= workerCost(gameState);
  gameState.totalWorkers += 1;

  let todo = activeTodoOfType(gameState, ActionType.Worker);
  todo.count += 1;
}

/**
 * Gameplay Loop and general actions
 */

function tickSteps(gameState: GameState) {
  incrementTasks(gameState, gameState.totalWorkers);
}

function checkRules(gameState: GameState) {
  // Find entries that are complete
  gameState.todos.forEach((todo) => {
    if (!todo.complete && todo.count >= todo.needs) {
      completeTodo(gameState, todo);
    }
  });

  // Find if we need to activate the next story unit
  let stepsToCheck = new Set(Object.keys(Steps));
  gameState.activatedSteps.forEach((stepName) => stepsToCheck.delete(stepName));

  stepsToCheck.forEach((stepName) => {
    if(Steps[stepName].activateOn(gameState)) {
      activateStep(stepName, gameState);
    }
  });

  // See if we need to add any more TODOs to the list
  nextTaskTODO(gameState);
  nextWorkerTODO(gameState);
}

function activateStep(stepName: string, gameState: GameState) {
  let step = Steps[stepName]

  if (step.onAdd) {
    step.onAdd(gameState);
  }

  gameState.activatedSteps.add(stepName);
  gameState.activatedStory.push(Steps[stepName].story);
}

function incrementTasks(gameState: GameState, amount: number = 1) {
  gameState.taskWallet += amount;
  gameState.totalTasks += amount;

  // Only increment the first entry we have
  let todo = activeTodoOfType(gameState, ActionType.Task);

  todo.count += amount;

  // TODO: Count += amount can lead to applying way more
  // tasks to the current todo than is necessary, effectively losing progress.
  // Figure out how to cleanly iterate through or otherwise clamp `count` and apply
  // the remainder to the next-in-line. Also making sure that we run through the game rules
  // so that there always is a next-in-line.
}

function completeTodo(gameState: GameState, todo: Todo) {
  todo.complete = true;

  if (todo.createdBy && Steps[todo.createdBy].onComplete) {
    Steps[todo.createdBy].onComplete(gameState);
  }

  let tracker = activeTodoOfType(gameState, ActionType.Todo);
  tracker.count += 1;
}

export function activeTodoOfType(gameState: GameState, actionType: ActionType): Todo {
  return gameState.todos.find((t) => !t.complete && t.type == actionType);
}
