import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';

export const TodoSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            minLength: 3
        },
        description: {
            type: String,
            trim: true,
        },
    },
    {
        collection: 'todo',
    }
);

TodoSchema.plugin(timestamps);

TodoSchema.index({ createdAt: 1, updatedAt: 1 });

export const Todo = mongoose.model('Todo', TodoSchema);
export const TodoTC = composeWithMongoose(Todo);
