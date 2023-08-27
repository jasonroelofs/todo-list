"use client"

import {createContext, useContext, useReducer} from 'react'
import {GameState, InitialGameState, performAction} from './game_state'

export const GameContext = createContext<GameState>(null);
export const GameDispatchContext = createContext(null);

export enum GameAction {
  PerformTask,
}

export function GameContextProvider({children}) {
  const [state, dispatch] = useReducer(performAction, InitialGameState);

  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  )
}

export function useGameState(): GameState {
  return useContext(GameContext);
}

export function useDispatch() {
  return useContext(GameDispatchContext);
}
