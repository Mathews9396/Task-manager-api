const mongoose= require('mongoose')
// const validator=require('validator')

mongoose.connect(process.env.MONGODB_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})
























// const Tasks=mongoose.model('Tasks',{
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })






//useNewUrlParser
//useUnifiedTopology

// const User=mongoose.model('User',{
//     name:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     age:{
//         type:Number,
//         validate(value){
//             if(value<0){
//                 throw new Error('Age should not be negative')
//             }
//         }
//     },
//     email:{
//         type:String,
//         required:true,
//         default:0,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error("Email is invalid")
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         minlength:7,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                throw new Error('Password can not contain Password') 
//             }
//             //&& validator(value)!=='password'
//         }
//     }
// })

// const me=new User({
//     name:'Andrew',
//     age:10,
//     email:'mike@gmail.com',
//     password:'Password'
// })

// me.save().then( () => {
//     console.log(me);
// }).catch( (error) => {
//     console.log("Error",error);    
// })




/*
const gym=new Tasks({
    description:''
})

gym.save().then( () => {
    console.log(gym);
}).catch( (error) => {
    console.log("Error",error);    
})
*/