import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithCredential,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDMv9nILMjIdxMCjNXMHYMtyFEUjRlhjug',
  authDomain: 'crwn-clothing-db-9b480.firebaseapp.com',
  projectId: 'crwn-clothing-db-9b480',
  storageBucket: 'crwn-clothing-db-9b480.appspot.com',
  messagingSenderId: '157076411212',
  appId: '1:157076411212:web:29e2b364454cb3c4d935e9',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDockRef = doc(db, 'users', userAuth.uid)

  console.log(userDockRef)

  const userSnapshot = await getDoc(userDockRef)
  console.log(userSnapshot.exists())
}
