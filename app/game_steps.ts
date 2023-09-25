import {addTodo, activeTodoOfType, ActionType} from "./game_state"
import {Todo} from './todo'

/**
 * The story, driven by the progress players make through the game
 */
export const Steps = {
  initial: {
    story: "Good morning! Your job is simple: clear your TODO LIST! When your TODO LIST is clear, you can go home. Good luck!",
    onAdd: (gameState: GameState) => {
      addTodo(gameState, {name: "Complete all TODOs and go home", count: 0, needs: "?", type: ActionType.Todo});
      addTodo(gameState, {name: "Perform 10 Tasks", count: 0, needs: 10, type: ActionType.Task});
    }
  },
  batch100: {
    story: "You are doing great! Here's the next batch",
    activateOn: (gameState: GameState): boolean => {
      return gameState.totalTasks >= 8;
    },
  },
  batch1000: {
    story: "Keep going!",
    activateOn: (gameState: GameState): boolean => {
      return gameState.totalTasks >= 100;
    },
  },
  batch10000: {
    story: "And going!",
    activateOn: (gameState: GameState): boolean => {
      return gameState.totalTasks >= 1000;
    },
  },
  firstWorker: {
    story: "This is getting tedious. How about you allocate a worker to perform task for you?",
    activateOn: (gameState: GameState): boolean => {
      return gameState.totalTasks >= 30;
    },
    onAdd: (gameState: GameState) => {
      addTodo(gameState, {name: "Allocate a Worker", count: 0, needs: 1, type: ActionType.Worker, createdBy: "firstWorker"});
      gameState.canAllocateWorkers = true;
    },
    onComplete: (gameState: GameState) => {
      // This call sets up Workers to make proper use of the templates for all further worker-type TODOs
      addTodo(gameState, {name: "Allocate 10 Workers", count: 0, needs: 10, type: ActionType.Worker})
    }
  },
  workersCostTasks: {
    story: "You'll notice that the worker have a cost. That's right, the tasks you perform can be used as currency to improve your efficiency! Lets allocate more workers.",
    activateOn: (gameState: GameState): boolean => {
      return gameState.totalWorkers >= 1;
    },
  },
  moreWorkers: {
    story: "Keep it going! You can never have too many workers.",
    activateOn: (gameState: GameState): boolean => {
      return gameState.totalWorkers >= 8;
    },
  },
}

/**
 * Infinite templates for providing ever growing TODOs.
 * When the current active TODO of each type gets to 80%, add the next one.
 */
export function nextTaskTODO(gameState: GameState): Todo {
  let activeTask = activeTodoOfType(gameState, ActionType.Task);

  if (activeTask && (activeTask.count / activeTask.needs >= 0.8)) {
    const newCount = activeTask.needs * 10;
    addTodo(gameState, {name: `Perform ${newCount} Tasks`, count: 0, needs: newCount, type: ActionType.Task});
  }
}

export function nextWorkerTODO(gameState: GameState): Todo {
  let activeTask = activeTodoOfType(gameState, ActionType.Worker);

  if (activeTask && (activeTask.count / activeTask.needs >= 0.8)) {
    const newCount = activeTask.needs * 10;
    addTodo(gameState, {name: `Allocate ${newCount} Workers`, count: 0, needs: newCount, type: ActionType.Worker});
  }
}
