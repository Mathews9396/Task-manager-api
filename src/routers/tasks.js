const express = require('express')
const Tasks = require('../models/tasks')
const auth = require('../middleware/auth')
const router = new express.Router()

//                                                                                              Create a Task
router.post('/tasks', auth, async (req, res) => {
    //const task = new Tasks(req.body)
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//                                                                                  Read all tasks for a User
//GET /task?completed=false/true
//GET /task?limit=2&skip=2
//Get /task?sortBy=createdAt_asc or desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        // console.log(req.user._id);        
        // const tasks = await Tasks.find({owner:req.user._id})
        // res.send(tasks)
        //OR
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})
//                                                                                           Read task by id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Tasks.findOne({ _id, owner: req.user._id })
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})
//                                                                                              Updating tasks
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    if (!isValid) {
        return res.status(400).send({ error: 'Invalid property!' })
    }

    try {
        const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id })
        // const task = await Tasks.findByIdAndUpdate(req.params.id)
        // const task= await Tasks.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }

})

//                                                                                              Deleting Task 
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Tasks.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(400).send({ error: 'Task not found' })
        }
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router