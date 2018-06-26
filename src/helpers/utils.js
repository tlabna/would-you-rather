import { decisionsExpirationLength } from 'config/constants'

export function formatUserInfo(name, avatar, uid) {
  return {
    name,
    avatar,
    uid,
  }
}

export function formatDecision(
  title,
  firstDecisionText,
  secondDecisionText,
  user
) {
  return {
    timestamp: Date.now(),
    author: user,
    title,
    firstOption: {
      text: firstDecisionText,
      selectedCount: 0,
    },
    secondOption: {
      text: secondDecisionText,
      selectedCount: 0,
    },
  }
}

/**
 * pretty format timestamp
 * @param  {[number]} timestamp [timestamp recorded]
 * @return {[string]}           [formated timestamp]
 */
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function getMilliseconds(timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime()
}

/**
 * Check if decisions are stale (i.e. not updated in a while)
 * @param  {[number]} timestamp [recorded timestamp]
 * @return {[bool]}           [returns true/false on expiration length]
 */
export function decisionsAreStale(timestamp) {
  return getMilliseconds(timestamp) > decisionsExpirationLength
}
