const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    date: { type: Date, default: Date.now, require: true },
    content: { type: String, require: true },
    author: { type: String, require: true },
    archiveDate: { type: Date }
});

module.exports = mongoose.model('news', newsSchema);