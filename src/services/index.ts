import { collection, query, getDocs, doc, setDoc, limit, orderBy, getDoc } from 'firebase/firestore/lite';
import db from '../config/config';

  async function getPoints() {
    const points = collection(db, 'user-points');
    const q = query(points, orderBy("puntaje","desc"), limit(10));
    const citySnapshot = await getDocs(q);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList
  }

    async function setPoints(user:any,points: number) {
      await setDoc(doc(db, "user-points", user.id), {
        user: user.name,
        puntaje: points,
      });
  }

  async function getUserMaxPoints(userId:string){
    const snapshot = await getDoc(doc(db, "user-points", userId));
    if (snapshot.exists()) {
     return snapshot.data()
    } else {
      return undefined
    }
  }

  export{getPoints, setPoints, getUserMaxPoints}