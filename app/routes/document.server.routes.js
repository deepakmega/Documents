'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller');
    var documents = require('../../app/controllers/document.server.controller');

    // Uploads Routes
    app.route('/documents')
        .post(users.requiresLogin, documents.create)
        .get(users.requiresLogin, documents.list)
        .put(users.requiresLogin, documents.create);

    app.route('/documents/:documentId')
        .post(users.requiresLogin, documents.delete);

    app.route('/documents/createRoot')
        .get(users.requiresLogin, documents.createRoot);

    app.route('/documents/getAWSCred')
        .get(users.requiresLogin, documents.getAWSCred);

    app.route('/documents/folderStructure')
        .get(users.requiresLogin, documents.getFolderStructure);
};
