"use client"

import {useDispatch, useGameState} from '../game_context'
import {GameAction, workersEnabled, canAllocateWorker, canIncreaseTaskProductivity} from '../game_state'
import {TimeoutButton} from './timeout_button'
import {workerCost, taskProductivity, taskProductivityCost, tasksPerClick, workerProductivity} from '../formulas'
import {formatAsPercent} from '../utils'

function PerformTasksRow() {
  const gameState = useGameState();
  const dispatch = useDispatch();

  let productivityString = "";

  if (gameState.enableTaskProductivity) {
    productivityString = (
      <>
        `${formatAsPercent(taskProductivity(gameState))} Task Productivity`
        <button
          onClick={() => dispatch(GameAction.IncreaseTaskProductivity)}
          disabled={!canIncreaseTaskProductivity(gameState)}
        >
          +10% ({taskProductivityCost(gameState)} Tasks)
        </button>
      </>
    );
  }

  return (
    <>
      <strong>{gameState.taskWallet} Tasks</strong>
      <div>{productivityString}</div>
      <div>{tasksPerClick(gameState)} Task / click</div>
      <TimeoutButton onClick={() => dispatch(GameAction.PerformTask)} disableMs={1000}>Perform Task</TimeoutButton>
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
