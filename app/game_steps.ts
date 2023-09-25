import {addTodo, ActionType} from "./game_state"

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
    onAdd: (gameState: GameState) => {
      addTodo(gameState, {name: "Perform 100 Tasks", count: 0, needs: 100, type: ActionType.Task});
    }
  },
  batch1000: {
    story: "Keep going!",
    activateOn: (gameState: GameState): boolean => {
      return gameState.totalTasks >= 100;
    },
    onAdd: (gameState: GameState) => {
      addTodo(gameState, {name: "Perform 1000 Tasks", count: 0, needs: 1000, type: ActionType.Task});
    }
  },
  batch10000: {
    story: "And going!",
    activateOn: (gameState: GameState): boolean => {
      return gameState.totalTasks >= 1000;
    },
    onAdd: (gameState: GameState) => {
      addTodo(gameState, {name: "Perform 10,000 Tasks", count: 0, needs: 10000, type: ActionType.Task});
    }
  },
  firstWorker: {
    story: "This is getting tedious. How about you allocate a worker to perform task for you?",
    activateOn: (gameState: GameState): boolean => {
      return gameState.totalTasks >= 30;
    },
    onAdd: (gameState: GameState) => {
      addTodo(gameState, {name: "Allocate a Worker", count: 0, needs: 1, type: ActionType.Worker})
      gameState.canAllocateWorkers = true;
    },
  },
  workersCostTasks: {
    story: "You'll notice that the worker have a cost. That's right, the tasks you perform can be used as currency to improve your efficiency! Lets allocate more workers.",
    activateOn: (gameState: GameState): boolean => {
      return gameState.totalWorkers >= 1;
    },
    onAdd: (gameState: GameState) => {
      addTodo(gameState, {name: "Allocate 10 Workers", count: 0, needs: 10, type: ActionType.Worker});
    },
  },
  moreWorkers: {
    story: "Keep it going! You can never have too many workers.",
    activateOn: (gameState: GameState): boolean => {
      return gameState.totalWorkers >= 8;
    },
    onAdd: (gameState: GameState) => {
      addTodo(gameState, {name: "Allocate 100 Workers", count: 0, needs: 100, type: ActionType.Worker});
    },
  },
}
