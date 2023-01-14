import { LegacyRef, MutableRefObject, useEffect, useRef, useState } from 'react'
import { useGameContext } from '../../context/game-context'
import { setPoints } from '../../services'
import { randomCharacter } from '../../utils/generatRandomLetter'
import { randomIntFromInterval } from '../../utils/randomNumber'
import styles from './styles.module.scss'

const numbers  = [...new Array(50).keys()]
const lettersItems = numbers.map(number =>({
    id:number,
    letter: randomCharacter(),
    active: false,
    completed: false
  }))

export const GameBoard = () => {
    
  const [grid, setGrid] = useState(lettersItems)
  const [lastLetter, setLastLetter] = useState<string | null>(null)
  const {addPoint, isGameOver, modeParams, points} = useGameContext()
  const inputRef  = useRef<HTMLInputElement | null>(null)

  const changeActiveness = (index:number, bool:boolean) => {
    setGrid(prev => prev.map((item,i) =>{
        if( i=== index && item.completed===false )  {
          return {...item, active:bool}
        }
        return item
    })) 
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if(!isGameOver) {
        const interval = setInterval(()=>{
            const num = randomIntFromInterval(1,50)
            changeActiveness(num,true)
            setTimeout(() => {
                setGrid(prev => prev.map((item,i) =>{
                    if( i=== num ){
                      return {...item, active: false}
                    }
                    return item
                })) 
            }, modeParams.bubbleDuration);
        }, modeParams.bubbleDuration)
    
        return () => {
          clearInterval(interval);
        }
    }
  }, [isGameOver])
  
  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
        const keycode = event.code.slice(-1)
        setLastLetter(keycode)
    };
    document.addEventListener('keydown', callback);
    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, []);

  useEffect(() => {
    if(lastLetter!==null){
    const index = grid.findIndex(item =>item.letter=== lastLetter && item.active === true)
   if(index !== -1){
   addPoint()
   }  
    setGrid(prev => prev.map((item,i) =>{
        if( i=== index )  {
          return {...item, active:false, completed:true}
        }
        return item
    }))
  setLastLetter(null)
    }
    
  }, [lastLetter])
  return (
    <div className={styles.gameboard}>
<div /* className={styles.gameboardInvisibleInput} */>
<input ref={inputRef}  />
  </div>        {
            grid.map(item =>(
                <button
                onClick={()=> {}}
                style={{backgroundColor:item.active ? '#7f37c2' : ''}}
                className={`${styles.gameboardLetter}`} key={item.id}>
                    {(item.active || item.completed)? item.letter :  null}
                </button>
            ))
        }
    </div>
  )
}
