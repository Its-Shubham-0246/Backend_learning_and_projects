const express = require('express')
const mongoose = require('mongoose')
const Tasks = require('../model/taskSchema')

const router = express.Router()

const toApiTask = (task) => ({
  id: task._id.toString(),
  title: task.title,
  completed: task.completed,
  createdAt: task.createdAt,
})

router.get('/api/task', async (req, res) => {
  const tasks = await Tasks.find().sort({ createdAt: -1 }).lean()
  return res.status(200).json(tasks.map(toApiTask))
})

router.post('/api/task', async (req, res) => {
  const title = req.body?.title

  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ message: 'Title is missing' })
  }

  const task = await Tasks.create({ title: title.trim() })
  return res.status(201).json(toApiTask(task))
})

router.patch('/api/task/:id', async (req, res) => {
  const { id } = req.params
  const { completed } = req.body ?? {}

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid task ID' })
  }

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'Completed must be a boolean' })
  }

  const task = await Tasks.findByIdAndUpdate(
    id,
    { completed },
    { new: true, runValidators: true },
  )

  if (!task) {
    return res.status(404).json({ message: 'Task not found' })
  }

  return res.status(200).json(toApiTask(task))
})

router.delete('/api/task/:id', async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid task ID' })
  }

  const task = await Tasks.findByIdAndDelete(id)

  if (!task) {
    return res.status(404).json({ message: 'Task not found' })
  }

  return res.status(200).json({ message: 'Task deleted successfully' })
})

module.exports = router
