function debounce(fn, ms) {
  let id
  return function (...args) {
    if (id) clearTimeout(id)
    id = setTimeout(() => {
      fn(...args)
    }, ms)
  }
}

export default debounce
