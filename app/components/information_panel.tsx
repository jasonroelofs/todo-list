"use client"

import {useGameState} from '../game_context'

export function InformationPanel() {
  const gameState = useGameState();

  return (
    <div className="information_panel">
      <div>{gameState.totalTasks} Tasks Performed</div>
      {gameState.canAllocateWorkers && (
        <div>{gameState.totalWorkers} Workers Allocated</div>
      )}
    </div>
  )
}
