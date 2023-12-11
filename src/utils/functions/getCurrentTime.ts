export const getCurrentTimestamp: () => {
  seconds: number
  nanoseconds: number
} = () => {
  const now = new Date()
  const seconds = Math.floor(now.getTime() / 1000)
  const nanoseconds = now.getMilliseconds() * 1000000
  return { seconds, nanoseconds }
}
