import {TodoList} from './components/todo_list'
import {InformationPanel} from './components/information_panel'
import {ActionPanel} from './components/action_panel'

import {useState} from 'react';

export default function Home() {
  return (
    <>
      <header>TODO LIST</header>
      <main>
        <div className="main_todo_list">
          <TodoList />
        </div>
        <div className="game_container">
          <ActionPanel />
          <InformationPanel />
        </div>
      </main>
    </>
  )
}
