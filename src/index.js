const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Tasks = require('./models/tasks')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//Passing in the port value to run the whole script on the given port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})


//Change JWT_SECRET & MONGODB_URL for changing json web token and accessing another databse









/**
const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('File must be doc or docx format'))
        }
        cb(undefined, true)
        // cb(new Error('File must be pdf'))
        // cb(undefined,true)
        // cb(undefined,false)
    }
})
app.post('/upload', upload.single('image'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
}) */






// const Task = require('./models/tasks')
// const main = async () => {
//     // const task = await Task.findById('5dea8abf51e509475caef32c')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)  
//     const user = await User.findById('5dea8a2c3413c846e44bcf64')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()


//Using an express middleware
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     }else{
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send('Site is under maintanence. Please Try after some time.')
// })

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id:'abc123' },'this is my new course',{expiresIn:'7 days'})
//     // console.log(token);    
//     const data=jwt.verify(token,'this is my new course')
//     console.log(data);    
// }

//Sample Token - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE1NzU1NjgwNjN9.LRmJh5EHSac99KyulqsVblevvk07QjqN177gnCmzGes

/*
const bcrypt = require('bcrypt')
const myFunction = async () => {
    const pass = 'red@122344'
    //                                                                      Hashing password
    const hashedPass = await bcrypt.hash(pass, 8)
    console.log(pass, '\n' + hashedPass);
    //                                                                      Comparing passwords
    const isMatch = await bcrypt.compare('red@122344', hashedPass)
    console.log(isMatch);
}
*/


//Declaring a new Route Handler
// const router=new express.Router()
// router.get('/test',(req,res)=>{
//     res.send('This is from another router')
// })
// app.use(router)

/*
//Create a user
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})

//Read all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()

    }
})

//Read user by id
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    //To check the id is in a mongodb object id format or not
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    // return res.status(400).send({error: 'Invalid ID!'})

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

//Updating User
app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update property!' })
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})

//Deleting User
app.delete('/users/:id', async(req,res) =>{
    try {
        const user= await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).send({error:'User not found'})
        }
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})

//create a new task
app.post('/tasks', async (req, res) => {
    const tasks = new Tasks(req.body)

    try {
        await tasks.save()
        res.status(200).send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }
})
*/