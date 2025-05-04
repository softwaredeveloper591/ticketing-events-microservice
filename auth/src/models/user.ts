import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserAttrs {
    email: string;
    password: string;
}

// An interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
    // The build method is a static method that takes in the attributes of a User and returns a User Document
    // The User Document is an instance of the User Model and has all the properties of a User Document
}

// An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        // Hash the password using bcrypt or any other hashing library
        const hashedPassword = await bcrypt.hash(this.get('password'), 8);
        this.set('password', hashedPassword);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User};