import {Todo} from './todo'
import {Steps} from './game_steps'

export interface GameState {
  todos: Array<Todo>;

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
  let todo = gameState.todos.find((todo) => {
    return !todo.complete && todo.type == ActionType.Task;
  });

  todo.count += amount;
}

function allocateWorker(gameState: GameState) {
  gameState.totalWorkers += 1;

  let todo = gameState.todos.find((todo) => {
    return !todo.complete && todo.type == ActionType.Worker;
  });

  todo.count += 1;
}

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

function completeTodo(gameState: GameState, todo: Todo) {
  todo.complete = true;

  let tracker = gameState.todos.find((t) => {
    return t.type == ActionType.Todo;
  });

  tracker.count += 1;
}
