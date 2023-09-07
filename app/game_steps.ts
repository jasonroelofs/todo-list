import {addTask} from "./game_state"

export const Steps = {
  initial: {
    story: "Good morning! Your job is simple: clear your TODO LIST! When your TODO LIST is clear, you can go home. Good luck!",
    onAdd: (gameState: GameState) => {
      addTask(gameState, {name: "Complete all tasks and go home"});
      addTask(gameState, {name: "Perform 10 Tasks", count: 0, needs: 10});
    }
  },
  batch100: {
    story: "You are doing great! Here's the next batch",
    activateOn: (gameState: GameState): boolean => {
      return gameState.totalTasks >= 8;
    },
    onAdd: (gameState: GameState) => {
      addTask(gameState, {name: "Perform 100 Tasks", count: 0, needs: 100});
    }
  },
  firstWorker: {
    story: "This is getting tedious. How about you allocate a worker to do the task for you?",
    activateOn: (gameState: GameState): boolean => {
      return gameState.totalTasks >= 50;
    },
    onAdd: (gameState: GameState) => {
      addTask(gameState, {name: "Allocate a Worker", count: 0, needs: 1, type: "worker"})
      gameState.canAllocateWorkers = true;
    },
  },
  moreWorkers: {
    story: "One worker will never be enough, allocate more!",
    activateOn: (gameState: GameState): boolean => {
      return gameState.totalWorkers >= 1;
    },
    onAdd: (gameState: GameState) => {
      addTask(gameState, {name: "Allocate 100 Workers", count: 0, needs: 100, type: "worker"});
    },
  },
}
