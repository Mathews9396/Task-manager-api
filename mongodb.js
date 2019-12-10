//CRUD -  create read update delete in Mongo DB Database - Not used in the Task-Manager App - This is just for learning the CRUD operations


//      /home/mathews/Software/mongodb-4.2.1/bin/mongod --dbpath=/home/mathews/Software/mongodb-data
// const mongodb=require('mongodb')
// const MongoClient=mongodb.MongoClient
// const objectID=mongodb.objectID

//Shorthand is below for the 3 lines of code above
const {MongoClient, ObjectID} = require('mongodb') 

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

// const id = new ObjectID()   
// console.log(id.id.length);
// console.log(id.getTimeStamp());
// console.log(id.toHexString().length);
// console.log(id);
// console.log(id.toHexString());

MongoClient.connect(connectionURL, {useUnifiedTopology:true}, (error,client)=> {
    if(error){
        return console.log('Unable to connect to database');        
    }

    // console.log("Connected succesfully");   
     const db=client.db(databaseName)

    db.collection('users').deleteMany(
        {age:15}
        ).then((result)=>{
            console.log(result);            
        }).catch((error)=>{console.log("Deletion unsuccesful");
        })





     //                                                                          updating  data
    /*
     db.collection('users').updateMany(
        {},
        {$inc:{age:5}}
     ).then((result)=>{
        console.log(result);        
     }).catch((error)=>{
        console.log(error);        
     })
     */
     //                                                                             Insert a set of data
     /*
     db.collection('users').insertOne({
        _id:id, 
        name:'Mathews',
         age:24
     },(error,result)=> {

         if(error){
         return console.log("Unable to insert data")
         }

         console.log(result.ops)
         
     })
     */
     //                                                                     inserting multiple data
    /*
    db.collection('users').insertMany([
        {
            name:'John',
            age:10
        },
        {
            name:'Gunther',
            age:57
        }
    ],(error,result)=>{
        if(error){
            return console.log(error);            
        }
        console.log(result.ops);
        console.log(result.connection);
        console.log(result.connectionURL);
    })
    */

    /*
    db.collection('tasks').insertMany([
        {
            name:'Go to Gym',
            completed:true
        },
        {
            name:'Have Eggs',
            completed:false
        },
        {
            name:'Start with Udemy',
            completed:true
        }
    ],(error,result)=>{
        if(error){
            return console.log("Unable to insert docs");
        }

        console.log(result.ops);        
    })
    */
    //                                                                                  Finding data
    // db.collection('users').findOne({age:24}, (error,user)=>{
    //     if(error){ return console.log("Not able to get the details");}else{
    //     console.log(user);        }
    // })
    // db.collection('users').find({age:24}, (error,user)=>{
    //     if(error){ return console.log("Not able to get the details");}else{
    //     console.log(user);        }
    // })
    // db.collection('users').find({age:24}).count((error,user)=>{
    //     if(error){ return console.log("Not able to get the details");}else{
    //     console.log(user);        }
    // })
    // db.collection('tasks').find({completed:false}).toArray((error,task)=>{
    //     if(error){ return console.log("Not able to get the details");}
    //         console.log(task);  
    //   })
})

