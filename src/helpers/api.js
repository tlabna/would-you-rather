import { ref } from 'config/constants'

export function saveDecision(decision) {
  const decisionId = ref.child('decisions').push().key
  return ref.child(`decisions/${decisionId}`).set({ ...decision, decisionId })
}

/**
 * Listener to let us know if we have a change
 * @param  {Function} cb    [callback fn]
 * @param  {[type]}   error
 * @return {[object]}         [decision change or none]
 */
export function listenToDecisions(cb, error) {
  return ref.child('decisions').on(
    'value',
    (snapshot) => {
      return cb(snapshot.val() || {})
    },
    error
  )
}

/**
 * Fetch a single decision
 * @param  {[number]} decisionId [decision ID]
 * @return {[object]}            [decision or none]
 */
export function fetchSingleDecision(decisionId) {
  return ref
    .child(`decisions/${decisionId}`)
    .once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchUsersMadeDecisions(uid) {
  return ref
    .child(`users/${uid}/decisionsMade`)
    .once('value')
    .then((snapshot) => snapshot.val() || {})
    .catch((error) => console.warn('Error fetching decisions', error))
}
