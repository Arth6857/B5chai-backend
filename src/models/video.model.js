import mongoose from "mongoose"
import mongooseAggregatePaginate
from "mongoose-aggregate-paginate-v2"

const videoSchema=mongoose.Schema({
    videoFile:{
        type:String,//cloudinary url
        default:true
    },
    thumbnail:{
        type:String,
        default:true
    },
    title:{
        type:String,
        default:true
    },
    description:{
        type:String,
        default:true
    },
    duration:{
         type:Number,
         required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true    
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video=mongoose.model("Video",videoSchema)