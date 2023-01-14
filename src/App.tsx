import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GameBoard, Header } from './components'
import { Footer } from './components/footer'
import { auth } from './config/config'
import { useGameContext } from './context/game-context'
import { IntroPage } from './pages/intro-page'
import { getUserMaxPoints, setPoints } from './services'
import './App.scss'

const App = () => {
  const {isGameStarted, isGameOver, points, name} =useGameContext()
  const [user] = useAuthState(auth as any);
  const userId = user?.email

  const fetchPointsByUser = async () =>{
    if(userId){
      const data = await getUserMaxPoints(userId)
      if(data){
        return data.puntaje
      }
    }
  }

  useEffect(() => {
    const getPoints = async () =>{
      const userPoints = await fetchPointsByUser()
      if(points > userPoints || userPoints === undefined){
        setPoints({id:userId,name}, points)
      }
    }

  if(points && !isGameStarted && isGameOver){
    getPoints()
  }
  }, [isGameStarted, points])

  return (
    <div className="game">
      <Header />
   { !isGameStarted ? <><IntroPage /> <Footer /></>  :  <GameBoard />}
    </div>
  )
}

export default App
