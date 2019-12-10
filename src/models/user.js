const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Tasks=require('./tasks')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age should not be negative')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        default: 0,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password can not contain Password')
            }
            //&& validator(value)!=='password'
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

//                                                                              Authentication for loggin in
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })    //email:email is the way to be written but we are using the shorthand operator

    if (!user) {
        throw new Error('Unable to Login!')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to Login!')
    }

    return user
}

//                                                                           Generating Authentication Tokens
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    user.save()

    return token
}

//                                                                                      Hiding the Private info
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

//                                                                      Hash the plain password to hashed value
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()  //Should be called to continue the operation. Otherwise this loop will gang forever
})

//                                                                              Creating Virtual Property
userSchema.virtual('tasks',{
    ref:'Tasks',
    localField:'_id',
    foreignField:'owner'
})

//                                                                          Deleteing Tasks along with User
userSchema.pre('remove', async function(next){
    const user=this
    await Tasks.deleteMany({owner:user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

