import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAy0RD9WFhkmK21SCEpYc79KjPgFM3mg98",
  authDomain: "prodash-3ae31.firebaseapp.com",
  projectId: "prodash-3ae31",
  storageBucket: "prodash-3ae31.firebasestorage.app",
  messagingSenderId: "694998620019",
  appId: "1:694998620019:web:90029ccf215b0611f39706",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const githubProvider = new GithubAuthProvider()
