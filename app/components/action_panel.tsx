"use client"

import {useDispatch, useGameState} from '../game_context'
import {GameAction} from '../game_state'

export function ActionPanel() {
  const gameState = useGameState();
  const dispatch = useDispatch();

  return (
    <div className="action_panel">
      <button onClick={() => dispatch(GameAction.PerformTask)}>Perform Task</button>
      {gameState.canAllocateWorkers && (
        <button onClick={() => dispatch(GameAction.AllocateWorker)}>Allocate Worker</button>
      )}
    </div>
  )
}
