const mongoose = require("mongoose")


const bookSchema = new mongoose.Schema({
    title:String,
    description:String,
    rating:Number,
    //the type of author is objectId
    //ref needs to match the first arguement in the author model
    //if we put the type in an array we can have an array of object Ids
    author_id:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }]
}
,
{
    timestamps:true 
}
)


module.exports = mongoose.model('Book',bookSchema)



//embedded schema example
/* const authorSchema = new Schema({
    name:String,
    age:Number
})

const bookSchema = new Schema({
    title:String,
    description:String,
    rating:Number,
    author: authorSchema


}
,
{
    timestamps:true
}
) */