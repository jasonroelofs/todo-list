import {GameState} from './game_state'

/**
 * How many tasks does each manual click perform?
 * How many tasks / second does each worker perform?
 */
export function taskProductivity(gameState: GameState): number {
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

