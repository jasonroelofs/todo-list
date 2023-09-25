"use client"

import {useGameState} from '../game_context'

export function InformationPanel() {
  const gameState = useGameState();

  return (
    <div className="information_panel">
      {gameState.canAllocateWorkers ? (
        <>
          <div>{gameState.taskWallet} Tasks</div>
          <div>{gameState.totalWorkers} Workers Allocated</div>
        </>
      ) : (
        <div>{gameState.totalTasks} Total Tasks Performed</div>
      )}
    </div>
  )
}
