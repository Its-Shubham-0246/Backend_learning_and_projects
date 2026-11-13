const assert = require('node:assert/strict')
const { after, before, test } = require('node:test')
const express = require('express')
const mongoose = require('mongoose')
const Tasks = require('../model/taskSchema')
const taskRoute = require('../router/taskRoute')

const originalMethods = {
  find: Tasks.find,
  create: Tasks.create,
  findByIdAndUpdate: Tasks.findByIdAndUpdate,
  findByIdAndDelete: Tasks.findByIdAndDelete,
}

let server
let tasks = []
let api

const makeTask = (title) => ({
  _id: new mongoose.Types.ObjectId(),
  title,
  completed: false,
  createdAt: new Date(),
})

before(async () => {
  const app = express()
  app.use(express.json())
  app.use(taskRoute)
  server = app.listen(0, '127.0.0.1')
  await new Promise((resolve) => server.once('listening', resolve))
  api = `http://127.0.0.1:${server.address().port}/api/task`
})

after(async () => {
  await new Promise((resolve) => server.close(resolve))
  Object.assign(Tasks, originalMethods)
})

test('creates tasks and persists completion changes through the task API', async () => {
  Tasks.find = () => ({
    sort() {
      return this
    },
    lean() {
      return Promise.resolve(tasks)
    },
  })
  Tasks.create = async ({ title }) => {
    const task = makeTask(title)
    tasks.push(task)
    return task
  }
  Tasks.findByIdAndUpdate = async (id, { completed }) => {
    const task = tasks.find((item) => item._id.toString() === id)
    if (task) task.completed = completed
    return task ?? null
  }
  Tasks.findByIdAndDelete = async (id) => {
    const index = tasks.findIndex((item) => item._id.toString() === id)
    if (index === -1) return null
    return tasks.splice(index, 1)[0]
  }

  const emptyList = await fetch(api)
  assert.deepEqual(await emptyList.json(), [])

  const createResponse = await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: '  Ship the feature  ' }),
  })
  assert.equal(createResponse.status, 201)
  const createdTask = await createResponse.json()
  assert.equal(createdTask.title, 'Ship the feature')
  assert.equal(createdTask.completed, false)

  const completeResponse = await fetch(`${api}/${createdTask.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: true }),
  })
  assert.equal(completeResponse.status, 200)
  assert.equal((await completeResponse.json()).completed, true)

  const invalidCompletionResponse = await fetch(`${api}/${createdTask.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: 'yes' }),
  })
  assert.equal(invalidCompletionResponse.status, 400)

  const incompleteResponse = await fetch(`${api}/${createdTask.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: false }),
  })
  assert.equal((await incompleteResponse.json()).completed, false)

  const deleteResponse = await fetch(`${api}/${createdTask.id}`, {
    method: 'DELETE',
  })
  assert.equal(deleteResponse.status, 200)

  const finalList = await fetch(api)
  assert.deepEqual(await finalList.json(), [])
})
