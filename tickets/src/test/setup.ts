import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

let mongo: any
beforeAll(async () => {
    process.env.JWT_KEY ="asdf";
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    if(mongoose.connection.db) {
        const collections = await mongoose.connection.db.collections();
    
        for (let collection of collections) {
            await collection.deleteMany({});
        }
    }
});

afterAll(async () => {
    if(mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
}); 

declare global {
    var signin: () => string[];
}

global.signin = () => {
    const payload = {
        id: "sdfsflsjfd",
        email: "test@example.com"
    };
    const token= jwt.sign(payload, process.env.JWT_KEY!);

    const session= { jwt: token };
    const sessionJSON= JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString('base64');
    const cookie = `session=${base64}`;
    return [cookie];
}
