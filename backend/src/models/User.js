import mongoose, { isValidObjectId } from 'mongoose'

const Schema = mongoose.Schema

const EventSchema = new Schema(
    {
        color: String,
        compSec: Number,
        date: String,
        tag: String,
        time: String
    }

)

const GoalSchema = new Schema(
    {   
        name:{
            type:String,
            required:[true,"goal name is required"]
        },
        subs: {
            type: [SubSchema],
            default: [],
            
        }
    }

)

const SubSchema = new Schema(
    {
        finish: {
            type: Boolean,
            required: [true, "done missing"]
        },
        name: {
            type: String,
        },
        _id:{
            type:Schema.Types.ObjectId,
            required:[true,"_id missing"]
        }
    }
)

const TaskSchema = new Schema(
    {
        finish: {
            type: Boolean,
            required: [true, "done missing"]
        },
        name: {
            type: String,
        },
        
    }
)

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        password: {
            type: String,
            required: [true, "Password is required"]

        },
        pet: {
            type: Number,
            required: [true, "pet is required"]
        },
        petname: {
            type: String,
            default: "Doggy"
        },
        focusedTime: {
            type: Number,
            default: 0
        },
        events: {
            type: [EventSchema],
            default: []
        },
        goals: {
            type: [GoalSchema],
            default: []
        },
        tasks: {
            type: [TaskSchema],
            default: [{ finish: false, name: "試著輸入想完成的工作吧！" }]
        },

    }
)

export default mongoose.model('User', UserSchema);
