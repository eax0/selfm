import mongoose from 'mongoose'
import defSchemaOpts from './default-schema-opts'

const opts       = Object.assign({}, defSchemaOpts);
const taskSchema = new mongoose.Schema({
    caption: {type: String, required: true, trim: true},
    parent_id: Number,
    notes: {type: String, trim: true},
    depth: {type: Number, default: 1},
    created_at: {type: Date, default: Date.now},
    completed: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 1
    },
}, opts);

const setDepth = function(next) {
    if (!this.isNew) {
        next();
    }

    if (!this.parent_id) {
        this.depth = 1;
        next();
    }

    this.constructor.findById(this.parent_id).then(parent => {
        if (!parent) {
            throw new Error('parent doesnt exists');
        }

        this.depth = parent.depth + 1;
        next();
    });
}

const setOrder = function(next) {
    if (!this.isNew) {
        next();
    }

    this.constructor.findOne({id : {$lt: this.id}}).sort('-id').then(prevDoc => {
        if (prevDoc) {
            this.order = prevDoc.order + 1;
        }

        next();
    });
}

taskSchema.pre('save', setDepth);
taskSchema.pre('save', setOrder);

taskSchema.plugin(global.db.autoIncrement.plugin, {model: 'Task', startAt: 100});

const Task = mongoose.model('Task', taskSchema)

export default Task