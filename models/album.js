"use strict";
var mongoose = require("mongoose");
var albumSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    albumName: {
        type: String,
        required: true
    },
    albumCover: {
        type: String,
        required: true
    },
    photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }]
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model('Album', albumSchema);
