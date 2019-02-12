import firebaseConfig from "../../../firebase"
import firebase from 'firebase/app'
import 'firebase/firestore'

const app = firebase.initializeApp(firebaseConfig)

export default app