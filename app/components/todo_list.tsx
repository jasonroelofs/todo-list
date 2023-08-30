"use client"

import {useGameState} from '../game_context'
import {TodoEntry} from './todo_entry'

export function TodoList() {
  const gameState = useGameState();

  return (
    <div className="todo_list">
      <ul>
        {gameState.tasks.map((task, i) => <TodoEntry key={`task_${i}`} task={task}/>)}
      </ul>
    </div>
  )
}
