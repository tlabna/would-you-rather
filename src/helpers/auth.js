import { ref, firebaseAuth } from 'config/constants'

export default function auth() {
  return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
}

export function logout() {
  return firebaseAuth().logout()
}

/**
 * Saves user at 'users/AUTHED-USERS-ID/info'
 * @param  {Object} user [authenticated user object]
 * @return {Object}      [user object - details]
 */
export function saveUser(user) {
  return (
    ref
      .child(`users/${user.uid}/info`)
      // .set() save user to location above and it will return a promise
      .set(user)
      .then(() => user)
  )
}
