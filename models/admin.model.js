import mongoose,{Schema} from "mongoose";

const adminSchema = new Schema({
    username: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required:true,
    },
    password:{
        type:String,
        require:true
    }
})

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;