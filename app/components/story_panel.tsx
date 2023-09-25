"use client"

import {useGameState} from '../game_context'

export function StoryPanel() {
  const gameState = useGameState();

  return (
    <ul>
      {gameState.activatedStory.map((story, i) => <li key={`story_${i}`}>{story}</li>)}
    </ul>
  )
}
