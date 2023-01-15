import { useEffect, useState } from 'react'
import { auth } from '../../config/config'
import { useGameContext } from '../../context/game-context'
import styles from './styles.module.scss'

export const Header = () => {
  const {points, setGameOver, isGameStarted, setName, name} = useGameContext()
  const [timeLeft, setTimeLeft] = useState(60)

  useEffect(() => {
    setTimeLeft(60)
  }, [isGameStarted])

  useEffect(() => {
    if(isGameStarted){
      const countdownId = setInterval(()=>{
        if(timeLeft===1){
          setGameOver()
          return
        } else setTimeLeft(prev=>  prev-1)
      },1000)
      return () => clearInterval(countdownId)
    }
  }, [timeLeft, isGameStarted])

  const handleLogout = () =>{
    auth.signOut()
    setName("")
  }

  return (
    <div className={styles.header}>
        <div>TypeVite!</div>
        <div>
          {
          isGameStarted ?   `Time left: ${timeLeft}`:null
          }
        </div>
     { name && !isGameStarted  ? <div>
          <button style={{backgroundColor:'orange'}} onClick={handleLogout}>
          <img src='/logout.png' color='white' />
          </button>
        </div>: null}
     {isGameStarted ?   <div>Score: {points}</div> : null}
    </div>
  )
}
