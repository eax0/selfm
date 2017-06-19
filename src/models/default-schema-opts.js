export default {
    options: {
        toJSON: (doc, obj) => {
            obj.id = obj._id;

            delete obj.__v;
            delete obj._id;

            return obj;
        }
    }
}