"use client"

import {useDispatch, useGameState} from '../game_context'
import {GameAction, workersEnabled, canAllocateWorker} from '../game_state'
import {TimeoutButton} from './timeout_button'
import {workerCost, workerProductivity} from '../formulas'

function PerformTasksRow() {
  const gameState = useGameState();
  const dispatch = useDispatch();

  return (
    <>
      <strong>{gameState.taskWallet} Tasks</strong>
      <div>0% Task Productivity</div>
      <div>1 Task Per Click</div>
      <TimeoutButton onClick={() => dispatch(GameAction.PerformTask)} disableMs={0}>Perform Task</TimeoutButton>
    </>
  );
}

function AllocateWorkersRow() {
  const gameState = useGameState();
  const dispatch = useDispatch();

  return (
    <>
      <div>{gameState.totalWorkers} Workers Allocated</div>
      <div>0% Worker Productivity</div>
      <div>{workerProductivity(gameState)} Tasks / second</div>
      <button
        onClick={() => dispatch(GameAction.AllocateWorker)}
        disabled={!canAllocateWorker(gameState)}
      >
        Allocate Worker ({workerCost(gameState)} Tasks)
      </button>
    </>
  );
}

export function ActionPanel() {
  const gameState = useGameState();

  return (
    <div className="action_panel">
      <PerformTasksRow />
      {workersEnabled(gameState) && <AllocateWorkersRow />}
    </div>
  )
}
