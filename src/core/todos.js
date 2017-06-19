import Todo from '../models/todo'

export function load() {
    return Todo.find({}).select('').sort('order')
}

export function add(fields) {
    const todo = new Todo(fields);

    return todo.save();
}

const validateModel = todo => {
    return todo.id ? Promise.resolve() : Promise.reject(new Error("todo is not saved"));
}

export function update(id, fields) {
    
    return Todo.findByIdAndUpdate(id, fields).then((r) => console.log('update', r));
}

export function remove(id) {
    return Todo.findByIdAndRemove(id);
}

export function sync(todos) {
    if (!todos) {
        return Promise.reject(new Error('empty todos'));
    }
    
    if (!Array.isArray(todos)) {
        return Promise.reject(new Error('todos must be an array'));
    }

    const promises = todos.map((todo) => {
        if (!todo.id) {
            return add(todo).then(validateModel);
        }

        if (todo.removed) {
            return remove(todo.id);
        }

        if (todo.id) {
            return update(todo.id, todo).then(validateModel);
        }
    });

    return Promise.all(promises).then(() => {
        return load(Todo);
    });
}