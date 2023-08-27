"use client"

import {useDispatch, GameAction} from '../game_context'

export function ActionPanel() {
  const dispatch = useDispatch();

  return (
    <div className="action_panel">
      <button onClick={() => dispatch(GameAction.PerformTask)}>Perform Task</button>
    </div>
  )
}
