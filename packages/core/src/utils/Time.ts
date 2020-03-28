export const fillZero = (n: number) => (n < 10 ? "0" + n : "" + n)

export const secToTime = (s: number) => {
  // TODO: can we use Intl package?
  const intSec = s | 0
  const sec = intSec % 60
  const min = ((intSec / 60) | 0) % 60
  const hour = (intSec / 60 / 60) | 0
  const convertedMinStr = `${fillZero(min)}:${fillZero(sec)}`
  return hour > 0 ? `${fillZero(hour)}:${convertedMinStr}` : convertedMinStr
}
