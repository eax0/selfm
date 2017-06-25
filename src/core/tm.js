import Task from '../models/task'

export function loadTasks(filter, withChildren) {
    const tasksPromise = Task.find(filter).sort('order _id')
        .then(tasks => tasks.map((task => task.toJSON())));

    if (!withChildren) {
        return tasksPromise;
    }

    return tasksPromise.then(tasks => {
        const ids = tasks.map(t => t.id)

        return loadTasks({parent_id: {$in: ids}}).then(subtasks => {
            return tasks.map(t => {
                t.todos = subtasks.filter(subtask => subtask.parent_id === t.id);

                return t;
            });
        });
    })
}

export function loadFullProject(id) {
    return Task.findOne({_id: id, depth: 1})
        .then(project => project.toJSON())
        .then(project => {
            return loadTasks({parent_id: project.id}).then(children => {
                project.children = children;

                return project;
            });
        }).catch(err => {
            console.log(err)
        });
}

export function addTask(fields) {
    const tempId = fields.tempId;
    delete fields.tempId;

    const task = new Task(fields);

    return task.save().then(task => Object.assign({tempId}, task.toJSON()));
}

//addTask({parent_id: 1, caption: 'Some task', notes: 'some notes'});
//addTask({parent_id: 1, caption: 'Some task 2 ', notes: 'some notes 2'});

const validateModel = task => {
    return task.id ? Promise.resolve() : Promise.reject(new Error("task is not saved"));
}

export function updateTask(id, fields) {
    return Task.findByIdAndUpdate(id, fields, {new: true}).then(task => task.toJSON());
}

export function removeTask(id) {
    return Task.findByIdAndRemove(id);
}

export function sync(tasks) {
    if (!tasks) {
        return Promise.reject(new Error('empty tasks'));
    }

    if (!Array.isArray(tasks)) {
        return Promise.reject(new Error('tasks must be an array'));
    }

    const promises = tasks.map((task) => {
        if (!task.id) {
            return addTask(task).then(validateModel);
        }

        if (task.removed) {
            return removeTask(task.id);
        }

        if (task.id) {
            return updateTask(task.id, task).then(validateModel);
        }
    });

    return Promise.all(promises).then(() => {
        return loadTasks(Task);
    });
}