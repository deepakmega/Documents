'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    materializedPlugin = require('mongoose-materialized'),
    Schema = mongoose.Schema;


var DocumentSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    url: {
        type: String,
        default: '',
        trim: true
    },
    isFolder: {
      type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});


DocumentSchema.plugin(materializedPlugin);

mongoose.model('Document', DocumentSchema); // Category
