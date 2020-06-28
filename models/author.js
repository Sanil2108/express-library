const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: {
        required: true,
        type: String,
        maxlength: 100
    },
    family_name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    date_of_birth: {
        type: Date,
    },
    date_of_death: {
        type: Date,
    },
});

AuthorSchema
    .virtual('name')
    .get(() => `${this.first_name} ${this.family_name}`)
    .set((newName) => {
        [this.first_name, this.family_name] = newName.split(' ');
    });

AuthorSchema
    .virtual('lifespan')
    .get(() => (this.date_of_death.getYears() - this.date_of_birth.getYears()).toString());

AuthorSchema
    .virtual('url')
    .get(() => `/catalog/authors/${this._id}`)

module.exports = mongoose.model('Author', AuthorSchema);
