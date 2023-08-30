import {addTask} from "./game_state"

export const Steps = {
  initial: {
    story: "Good morning! Your job is simple: clear your TODO LIST! When your TODO LIST is clear, you can go home. Good luck!",
    onAdd: (gameState: GameState) => {
      addTask(gameState, {name: "Complete all tasks and go home"})
      addTask(gameState, {name: "Perform 10 Tasks", count: 0, needs: 10})
    }
  },
  label1: {
    after: 8,
    story: "You are doing great! Here's the next batch",
    onAdd: (gameState: GameState) => {
      addTask(gameState, {name: "Perform 100 Tasks", needs: 100});
    }
  },
  label2: {
    story: "This is getting tedious. How about you allocate a worker to do the task for you?",
    onAdd: (gameState: GameState) => {
      addTask(gameState, {name: "Allocate a Worker", needs: 1, type: "worker"})
      gameState.canAllocateWorkers = true;
    },
  },
}
