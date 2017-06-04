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


```js
const taskify = require('util.taskify')
const fs = require('fs')
const Task = require('taskorama')
// or
// const Task = require('fluture')

const Filesystem = taskify(fs,Task)

Filesystem.readFile('package.json')
  .fork(
    err => console.error('Failed.', err),
    str => console.log('Done!', str)
  )
```
