import React, { useEffect, useState } from "react"
import { WhatsappShareButton } from "react-share"
import { ModeParamsKey, useGameContext } from "../../context/game-context"
import styles from './styles.module.scss'
import { auth,  provider } from "../../config/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { DocumentData } from "firebase/firestore/lite";
import { getPoints } from "../../services";

const difficultyModes = [
    {id:1, text:'Easy' , status:'easy'as ModeParamsKey},
    {id:2, text:'Medium' , status:'medium'as ModeParamsKey},
    {id:3, text:'Hard', status:'hard'as ModeParamsKey},
]

export const IntroPage = () => {
const [topPlayers, setTopPlayers] = useState<DocumentData[]>()

const [user, loading] = useAuthState(auth as any);

    const {setMode, startGame, points,  isGameOver, setName, name} = useGameContext()
    const [modeSelected, setIsModeSelected] = useState<null| ModeParamsKey>(null)
    const savePoints = async ()=>{
/*         await setDoc(doc(db, "points", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
          }); */
    }
    useEffect(() => {
      if(user && !loading){
        setName(user?.displayName ?? '')
        savePoints()
      }
    }, [user, loading])

    useEffect(() => {
      const savePlayers = async ()=>{
        setTopPlayers(await getPoints())
      }
        savePlayers()
    }, [ points])
    
    const signIn = () => {
      auth.signInWithPopup(provider)
      .catch((error:any) => alert(error.message));
    };
    
    const handleMode = (status:ModeParamsKey) =>{
        setMode(status)
        setIsModeSelected(status)
    }

    const handleSubmit = (e:React.SyntheticEvent)=> {
        e.preventDefault()
        startGame()
    }
  return (
    <div className={styles.introPage}>

        <div className={styles.introPageDescription}>
           <strong>
           Type the letters of the bubbles the quickest you can in 1 minute! Wanna try?
           </strong>
           <small>
                This is a game specially made for wider dimensions. Please play on desktop!
           </small>
        </div>
      {isGameOver ?  <div className={styles.introPageCongrats}>
        {points===0 ? `Oh, sorry ${name}. You've made no points, but you can try playing again!`:
        `Congratulations ${name}, you made ${points} points!`
        }
        <section>
        Brag your result with your friends by Whatsapp😎
<br />
            <div style={{display:'flex', justifyContent:'center', marginTop:'1rem'}}>
            <WhatsappShareButton title={`I've just made ${points} in TypeVite. I dare you to make more points than me!`} separator=" Go to " 
            url='https://typevite.netlify.app/'  >
            <img height={36} src='/whatsapp-logo-png.webp' />
            </WhatsappShareButton>
            </div>
        </section>
        </div> : null}
       <div style={{display:'flex', gap:32}}>
       <form 
        className={styles.introPageForm}
        onSubmit={handleSubmit}>
     {!name ?  <div
       className={styles.introPageFormName}
       >
        <button type='button' onClick={signIn}>Sign In</button>
       </div>: `Hi ${name}!`}
    <h4>Choose a level:</h4>
<div
        className={styles.introPageFormButtons}
>
{
    difficultyModes.map(({id,text,status}) =>(
        <button
        style={{backgroundColor: modeSelected !== null && modeSelected===status ? 'orange': 'purple'}}

        type="button" onClick={()=> handleMode(status)} key={id}>
            {text}
        </button>
    ))
}
</div>
<div
        className={styles.introPageFormSubmit}
>
    <button disabled={(!name) || !modeSelected } type="submit" >
        Let's go!
    </button>
</div>
        </form>
        <div>
<h3>
Top players!
  </h3>    
  <ul>
    {
topPlayers?.map((player,i) =>{
  const [firstName, lastName] = player.user.split(' ')
  return(
  <li key={i}>{i+1}. {`${firstName} ${lastName ? lastName[0]+'.' : ''}`} - {player.puntaje}  {i===0? '👑' :null}</li>
)})
    }
  </ul>
      </div>
       </div>
    </div>
  )
}
