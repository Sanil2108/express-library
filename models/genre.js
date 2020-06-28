const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    }
});

GenreSchema.virtual('url').get(() => `/catalog/genres/${this._id}`)

GenreModel = mongoose.model('Genre', GenreSchema);

module.exports = GenreModel;
