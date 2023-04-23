export default function throttle(func, delay) {
  let timerId
  return function (...args) {
    if (!timerId) {
      timerId = setTimeout(() => {
        func.apply(this, args)
        timerId = null
      }, delay)
    }
  }
}
