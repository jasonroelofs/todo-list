import {TodoList} from './components/todo_list'
import {ActionPanel} from './components/action_panel'
import {StoryPanel} from './components/story_panel'

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
          <div className="story_panel">
            <StoryPanel />
          </div>
          <div className="game_panel">
            <ActionPanel />
          </div>
        </div>
      </main>
    </>
  )
}
