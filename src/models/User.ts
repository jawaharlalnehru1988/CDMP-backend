import mongoose, {Schema, Document} from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    role: "patient" | "provider";
    comparePassword(candidatePassword:string):Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, enum: ["patient", "provider"]}
});

UserSchema.pre<IUser>("save", async function(next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (candidatePassword:string):Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);    
}

export default mongoose.model<IUser>("User", UserSchema);