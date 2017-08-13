# Taskify

`util.promisify` but for Tasks ! 🙌

## Install

```
yarn add util.taskify
```

or

```
npm install util.taskify
```

⚠️  You must give `taskify` the Task data type of your choice.

I suggest you to try [`Fluture`](https://github.com/fluture-js/Fluture) or [`Taskorama`](https://github.com/YannickDot/Taskorama).

## Usage


For a single function :

```js
const taskify = require('util.taskify')
const fs = require('fs')
const Task = require('taskorama')
// or
// const Task = require('fluture')

const readFileTask = taskify(Task, fs.readFile)

readFileTask('package.json', 'utf8')
  .fork(
    err => console.error('Failed.', err),
    str => console.log('Done!', str)
  )
```

Or for a whole module :

```js
const taskify = require('util.taskify')
const fs = require('fs')
const Task = require('taskorama')
// or
// const Task = require('fluture')

const Filesystem = taskify(Task, fs)

Filesystem.readFile('package.json', 'utf8')
  .fork(
    err => console.error('Failed.', err),
    str => console.log('Done!', str)
  )
```

#### BONUS

If you like currying (using ramda `curry()` function) :


```js
const { curry } = require('ramda')
const util_taskify = require('util.taskify')
const fs = require('fs')
const Task = require('taskorama')
// or
// const Task = require('fluture')
//

const taskify = curry(util_taskify)
const taskifier = taskify(Task)

const readFileTask = taskifier(fs.readFile)

readFileTask('package.json')
  .fork(
    err => console.error('Failed.', err),
    str => console.log('Done!', str)
  )
```
