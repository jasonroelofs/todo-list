"use client"

import {createContext, useContext, useReducer, useEffect, type Dispatch} from 'react'
import {GameState, InitialGameState, performAction, GameAction} from './game_state'

export const GameContext = createContext<GameState>(InitialGameState);
export const GameDispatchContext = createContext<Dispatch<GameAction>>(() => {});

export function GameContextProvider({children}: React.PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(performAction, InitialGameState);

  useEffect(() => {
    const interval = setInterval(() => dispatch(GameAction.Tick), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => dispatch(GameAction.Load), []);

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

export function useDispatch(): Dispatch<GameAction> {
  return useContext(GameDispatchContext);
}
