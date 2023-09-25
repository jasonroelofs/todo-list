"use client"

import {useDispatch, useGameState} from '../game_context'
import {GameAction, workersEnabled, canAllocateWorker, workerCost} from '../game_state'
import {TimeoutButton} from './timeout_button'

export function ActionPanel() {
  const gameState = useGameState();
  const dispatch = useDispatch();

  return (
    <div className="action_panel">
      <TimeoutButton onClick={() => dispatch(GameAction.PerformTask)} disableMs={0}>Perform Task</TimeoutButton>
      {workersEnabled(gameState) && (
        <button
          onClick={() => dispatch(GameAction.AllocateWorker)}
          disabled={!canAllocateWorker(gameState)}
        >
          Allocate Worker ({workerCost(gameState)} Tasks)
        </button>
      )}
    </div>
  )
}
