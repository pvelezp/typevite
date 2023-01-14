import ReactDOM from 'react-dom/client'
import App from './App'
import { GameProvider } from './context/game-context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <GameProvider>
    <App />
    </GameProvider>
,
)
