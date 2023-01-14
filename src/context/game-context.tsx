import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomIntFromInterval } from "../utils/randomNumber";

type ModeParamsValue = {
  bubbleDuration: number;
  ratePoint: number;
}

export type ModeParamsKey = 'easy' | 'medium' | 'hard'
type ModeParams = Record<ModeParamsKey,ModeParamsValue>
const modeParams:ModeParams  = {
  'easy':{
    bubbleDuration: 1000,
    ratePoint: 1,
  },
  'medium':{
    bubbleDuration: 860,
    ratePoint: 2,
  },
  'hard':{
    bubbleDuration: 760,
    ratePoint: 5,
  },
}

type ModeParamsKeys = keyof ModeParams
interface GameContext {
    points:number;
    isGameOver: boolean;
    addPoint: ()=> void;
    setGameOver: ()=> void;
    isGameStarted: boolean;
    startGame: ()=>void;
    setMode: (mode:ModeParamsKeys) => void;
    modeParams: ModeParams[ModeParamsKeys];
    name:string;
    setName: (name:string)=>void
}

const gameContext = createContext({} as GameContext);

export const GameProvider = ({ children }: PropsWithChildren<{}>) => {

    const [points, setPoints] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false)
    const [isGameStarted, setIsGameStarted] = useState(false)
    const [name, setCurrentName] = useState("")
    
    const setName = (name:string) =>{
      setCurrentName(name)
    }
    const startGame = () =>{
      setIsGameStarted(true)
      setIsGameOver(false)
      setPoints(0)
    }
    const [mode, setCurrentMode] = useState<ModeParamsValue>({
      bubbleDuration: randomIntFromInterval(1200,2000),
      ratePoint: 1,
    })
    const setMode = (mode:ModeParamsKeys) =>{
      setCurrentMode(modeParams[mode])
    }
    const addPoint = () => {
      setPoints(prev=>prev + mode["ratePoint"])
    }
    const setGameOver = () => {
      setIsGameStarted(false)
      setIsGameOver(true)
    }
    
    return (
        <gameContext.Provider
          value={{
            isGameStarted,
            modeParams: mode,
            points,
            name,
            startGame,
            isGameOver,
            setMode,
            setGameOver,
            setName,
            addPoint
          }}
        >
          {children}
        </gameContext.Provider>
      );
}

export const useGameContext = () => useContext(gameContext);


