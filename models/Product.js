const { Schema, model } = require('mongoose');

const productSchema = new Schema ({
    name: { type: String, required: true },
    type: { type: String, required: true },
    prize: { type: Number, required: true },
    description: { type: String, required: true },
    imagePath: { type: String, required: true },
    favorite: { type: Boolean, required: true }
});

module.exports = model('Product', productSchema);