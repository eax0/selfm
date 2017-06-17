export function load(Todo) {
    return Todo.findAll({
        raw: true, 
        order: [['order', 'asc']], 
        attributes: ['id', 'caption', 'completed', 'order']
    });
}

export function add(Todo, fields) {
    const todo = new Todo(fields);

    return todo.save();
}

const validateModel = todo => {
    return todo.id ? Promise.resolve() : Promise.reject(new Error("todo is not saved"));
}

export function update(Todo, id, fields) {
    return Todo.findById(id).then(todo => todo.update(fields));
}

export function remove(Todo, id) {
    return Todo.findById(id).then(todo => todo.destroy());
}

export function sync(Todo, todos) {
    if (!todos) {
        return Promise.reject(new Error('empty todos'));
    }
    
    if (!Array.isArray(todos)) {
        return Promise.reject(new Error('todos must be an array'));
    }

    const promises = todos.map((todo) => {
        if (!todo.id) {
            return add(Todo, todo).then(validateModel);
        }

        if (todo.removed) {
            return remove(Todo, todo.id);
        }

        if (todo.id) {
            return update(Todo, todo.id, todo).then(validateModel);
        }
    });

    return Promise.all(promises).then(() => {
        return load(Todo);
    });
}