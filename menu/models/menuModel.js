const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }
}, {timestamps: true});

const Menu = mongoose.model('Menu', menuSchema)
module.exports = Menu;