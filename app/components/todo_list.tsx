"use client"

import {useGameState} from '../game_context'
import {TodoEntry} from './todo_entry'

export function TodoList() {
  const gameState = useGameState();

  return (
    <div className="todo_list">
      <ul>
        {gameState.todos.map((todo, i) => <TodoEntry key={`todo_${i}`} todo={todo}/>)}
      </ul>
    </div>
  )
}
