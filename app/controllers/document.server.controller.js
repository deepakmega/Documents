'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    documentModel = mongoose.model('Document'),
    _ = require('lodash');


/**
 * List of Documents
 */
exports.list = function(req, res) {
    documentModel.GetFullArrayTree(function(err, tree){
        if(Array.isArray(tree)) {
            res.jsonp(tree);
        }
        else{
            res.jsonp([]);
        }
    });
};

/**
 * Creates a Document Node
 */
exports.create = function(req, res) {
    var docNode = new documentModel(req.body);
    docNode.user = req.user;
    docNode.created = Date.now();
    docNode.save(function(err, data){
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(docNode);
        }
    });
};

/**
 * Delete an Document Node
 */
exports.delete = function(req, res) {
    var docNodeId = req.body.id ;

    documentModel.Remove( { _id : docNodeId }, function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(docNodeId);
        }
    });
};

/**
 * Creates a Root Document Node
 */
exports.createRoot = function(req, res) {
    var docNode = new documentModel(
        {name: 'Root',
        title: 'Root',
        isFolder: true,
        url: 'Root'});
    docNode.user = req.user;
    docNode.created = Date.now();
    docNode.save(function(err, data){
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(docNode);
        }
    });
};

exports.getAWSCred = function(req, res) {
    res.jsonp({access_key:'AKIAI7P42EMTFT2AKKGQ' , secret_key:'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', bucket:'docstore2015'});
};

exports.getFolderStructure= function(req, res) {
    documentModel.GetFullArrayTree(function(err, tree){
        if(Array.isArray(tree)) {
            res.jsonp(tree);
        }
        else{
            res.jsonp([]);
        }
    });
};

/**
 * Document authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.document.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};

