const express = require('express')
const router = express.Router()
const Tasks = require('../model/taskSchema')

router.get('/api/task', async (req, res) => {
  // const page  = parseint(req.query.page,10)||1
  const limit = parseInt(req.query.limit,10)||10
  // const sanitizePage  = page>1?page:1
  const sanitizeLimit = limit < 1?10:limit
  // const skip = (sanitizePage - 1) * sanitizeLimit
  // const {task,totalTask} = await Promise.all([
  //   Tasks.find().populate("User","name","email").sort({createdAt:-1}).skip(skip).limit(sanitizeLimit),
  //   Tasks.countDocument()
  // ])
  // const totalPages = Math.ceil(totalTask/sanitizeLimit)
  // 
  // res.status(200).json({
  //   metadata:{
  //   totalTask,
  //   totalPages,
  //   currentPage:sanitizePage,
  //   hasPrevious:sanitizePage>1,
  //   hasNext:sanitizePage<totalPages
  // }
  // })
  const {nextCursor} = req.query;
  const query = {};
  if(nextCursor){
    if(!mongoose.isValidObjectId){
      return res.status(400).json({
        success:false,
        message:"Not valid Id"
      })
    }
  }
  // query._id = {$lt:}
  const task = Tasks.find(query).sort({_id:-1}).limit(sanitizeLimit+1)
  const hasNext = task.length>sanitizeLimit

  if(hasNext){
    task.pop();
  }
  const  lastItem = task[task.length - 1];
  const newCursor = hashNext&&lastItem?lastItem.id:null;
  res.status(200).json({
    success:true,
    metadata:{
      limit:sanitizeLimit,
      nextCursor:newCursor,
    },
    data:task
  })

})

router.post('/api/task', (req, res) => {
  const { title } = req.body

  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'Title is missing' })
  }

  const newtask = {
    id: taskid++,
    title: title.trim(),
  }

  tasks.push(newtask)
  return res.status(200).json(newtask)
})

router.delete('/api/task/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({ message: 'Invalid task ID' })
  }

  const index = tasks.findIndex((task) => task.id === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' })
  }

  tasks.splice(index, 1)
  return res.status(200).json({ message: 'Task deleted successfully' })
})

module.exports = router