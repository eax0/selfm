import {TODO_ACTION_TYPES as Actions} from '../constants/action_types'

export function add(fields) {
    return {
        type: Actions.ADD,
        fields
    };
}

export function remove(id) {
    return {
        type: Actions.REMOVE,
        id
    };
}

export function complete(id) {
    return {
        type: Actions.COMPLETE,
        id
    };
}