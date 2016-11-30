"use strict";
var mongoose = require("mongoose");
var photoSchema = new mongoose.Schema({
    caption: {
        type: String,
    },
    fileUrl: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model("Photo", photoSchema);
