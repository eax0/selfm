export default {
    toJSON: {
        transform: (doc, obj) => {
            obj.id = obj._id;

            delete obj.__v;
            delete obj._id;
        }
    }
}