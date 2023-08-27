import {Task} from './task'
import {GameAction} from './game_context'

export interface GameState {
  tasks: Array<Task>;
}

const initialTasks: Array<Task> = [
  {name: "Complete all tasks and go home"},
  {name: "Perform 10 Tasks", count: 0, needs: 10},
  {name: "Perform 100 Tasks", count: 0, needs: 100},
  {name: "Perform 1,000 Tasks", count: 0, needs: 1000},
  {name: "Allocate 10 Workers", count: 0, needs: 10},
  {name: "Add some color", count: 0, needs: "Color"},
  {name: "Hire a designer", count: 0, needs: "Design?"},
]

export const InitialGameState: GameState = {
  tasks: initialTasks
}

export function performAction(gameState: GameState, action: GameAction): GameState {
  console.log("Performing game action", action, "on", gameState);

  gameState.tasks.forEach((task) => {
    task.count += 1;
  });

  return structuredClone(gameState);
}
