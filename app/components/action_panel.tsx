"use client"

import {useDispatch, useGameState} from '../game_context'
import {GameAction} from '../game_state'
import {TimeoutButton} from './timeout_button'

export function ActionPanel() {
  const gameState = useGameState();
  const dispatch = useDispatch();

  return (
    <div className="action_panel">
      <TimeoutButton onClick={() => dispatch(GameAction.PerformTask)} disableMs={300}>Perform Task</TimeoutButton>
      {gameState.canAllocateWorkers && (
        <TimeoutButton onClick={() => dispatch(GameAction.AllocateWorker)} disableMs={300}>Allocate Worker</TimeoutButton>
      )}
    </div>
  )
}
