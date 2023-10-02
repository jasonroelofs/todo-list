import {GameState} from './game_state'

/**
 * How many tasks does each manual click perform?
 * How many tasks / second does each worker perform?
 */
export function taskProductivity(gameState: GameState): number {
  return gameState.taskProductivity;
}

export function taskProductivityCost(gameState: GameState): number {
  return Math.floor(1 * Math.pow(1.07, (gameState.taskProductivity * 10) + 1));
}

/**
 * How many tasks does each click give the player?
 */
export function tasksPerClick(gameState: GameState): number {
  return Math.max(gameState.taskProductivity, 1);
}

/**
 * Given the current state of the game, how much does it cost
 * to allocate the next worker?
 */
export function workerCost(gameState: GameState): number {
  return Math.floor(10 * Math.pow(1.07, gameState.totalWorkers + 1));
}

/**
 * How many tasks are workers performing each second?
 */
export function workerProductivity(gameState: GameState): number {
  return gameState.totalWorkers;
}

