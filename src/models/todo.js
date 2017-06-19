import mongoose from 'mongoose'
import defSchemaOpts from './default-schema-opts'

const opts = Object.assign({}, defSchemaOpts);
const todoSchema = new mongoose.Schema({
    order: {
        type: Number,
        default: 100
    },
    caption: {type: String, required: true, unique: true},
    completed: {
        type: Boolean,
        default: false
    },
}, opts);

todoSchema.plugin(global.db.autoIncrement.plugin, 'Todo');

const Todo = mongoose.model('Todo', todoSchema)

export default Todo