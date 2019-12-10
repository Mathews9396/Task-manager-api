const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')

//                                                                                          Create a user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()   //this line is not necessary as per my testing
        const token = await user.generateAuthToken()
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//                                                                                              Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token, Message: "You are logged in." })
    } catch (e) {
        res.status(400).send({ error: "login not succesful" })
    }
})

//                                                                                              Logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send({ Message: 'You are logged out of this session' })
    } catch (e) {
        res.status(500).send()
    }
})

//                                                                                          Logout All
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        // req.user.tokens = req.user.tokens.filter((token)=>{
        //     return token.token === req.token
        // }) //Used to delete all other tokens except          
        await req.user.save()
        res.send({ Message: "You are logged out of all the devices." })
    } catch (e) {
        res.status(500).send({ Error: "Logout Failed!" })
    }
})

//                                                      Read all users - changed to - Read authneticated User
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
    //To check the id is in a mongodb object id format or not
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    // return res.status(400).send({error: 'Invalid ID!'})
})

//                                                                                           Updating User
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update property!' })
    }
    try {
        // const user = await User.findByIdAndUpdate(req.user._id)
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // if (!user) {
        //     return res.status(404).send()
        // }
        res.send(req.user)
    } catch (e) {
        res.status(400).send()
    }
})

//                                                                                          Deleting User
router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return res.status(400).send({ error: 'User not found' })
        // }
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(400).send()
    }
})


//                                                                                    Uploading Profile pic
const avatarUpload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File format should be jpg or jpeg or png'))
        }
        cb(undefined, true)
    }
})
router.post('/users/me/avatar', auth, avatarUpload.single('avatar'), async (req, res) => {
    if (!req.file) {
        res.status(400).send({ error: "No file selected" })
    }
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send({ Message: "Profile pic has been uploaded" })
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

//                                                                                      Deleting Avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
    if (!req.user.avatar) {
        res.status(400).send({ error: 'No avatar to delete' })
    }
    req.user.avatar = undefined
    await req.user.save()
    res.send({ message: 'avatar deleted' })
})

//                                                                                      displaying avatar
router.get('/users/:id/avatar', async (req, res, ) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error({ error: 'No image or user' })
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }
})
//copy the object to id here and image can be displayed

module.exports = router























//<img src="data:jpg;base64,binary_value"> to display the binary image in html page


// const errorMiddleware=(req,res,next)=>{
//     throw new Error('From error middleware')
// } writing a middleware to send errors


// router.get('/test',(req,res)=>{
//     res.send('This is from user router')
// })  

//                                                                                          Read user by id
/*router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
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
*/