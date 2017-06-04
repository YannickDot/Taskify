const wrapFn = (fn, task) => {
  return (...args) => {
    return new task((rej, res) => {
      const cb = (err, contents) => (err ? rej(err) : res(contents))
      fn.apply(null, [...args, cb])
    })
  }
}

export default function taskify(arg, task, options) {
  if (!task)
    throw Error('Please pass a Task data type as second argument of taskify.')
  if (typeof arg === 'function') {
    return wrapFn(arg, task)
  } else {
    return Object.getOwnPropertyNames(arg)
      .filter(key => arg.hasOwnProperty(key))
      .map(key => {
        const val = arg[key]
        const isFunction = typeof val === 'function'
        const isSuitableFn = !key.match(/.+(Sync|Stream)$/)
        if (isFunction && isSuitableFn) {
          return [key, wrapFn(val, task)]
        }
        return [key, val]
      })
      .reduce((acc, [key, value]) => {
        acc[key] = value
        return acc
      }, {})
  }
}
