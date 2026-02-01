import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unquie: true,
        lowercase: true
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    resetOtp: String,
    resetOtpExpire: Date,
},
    { timeStamps: true }
)

const User = mongoose.model('User', UserSchema);
export default User;