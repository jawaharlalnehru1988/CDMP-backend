import mongoose, {Schema, Document} from "mongoose";

export interface IMessage extends Document{
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    message: string;
    timestamp: Date;
}

const MessageSchema: Schema<IMessage> = new Schema(
    {
        sender: {type: Schema.Types.ObjectId, required: true},
        receiver: {type: Schema.Types.ObjectId, required: true},
        message: {type: String, required: true},
        timestamp: {type: Date, default: Date.now}
    },
    { timestamps : true }
);

export default mongoose.model<IMessage>('Message', MessageSchema);