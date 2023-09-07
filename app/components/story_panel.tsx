"use client"

import {useGameState} from '../game_context'

export function StoryPanel() {
  const gameState = useGameState();

  return (
    <div>
      <ul>
        {gameState.activatedStory.map((story) => <li>{story}</li>)}
      </ul>
    </div>
  )
}