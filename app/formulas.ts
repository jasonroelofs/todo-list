import {GameState} from './game_state'

export function workerCost(gameState: GameState): number {
  return Math.floor(10 * Math.pow(1.07, gameState.totalWorkers + 1));
}
