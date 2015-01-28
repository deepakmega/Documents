'use strict';

//Setting up route
angular.module('document').config(['$stateProvider',
    function($stateProvider) {
        // Documents state routing
        $stateProvider.
            state('listDocuments', {
                url: '/documents',
                templateUrl: 'modules/document/views/list-document.client.view.html'
            }).
            state('uploadDocuments', {
                url: '/documents/Upload',
                templateUrl: 'modules/document/views/upload-document.client.view.html'
            }).
            state('viewUpload', {
                url: '/documents/Edit',
                templateUrl: 'modules/document/views/edit-document.client.view.html'
            });
            /* .
            state('editUpload', {
                url: '/uploads/:uploadId/edit',
                templateUrl: 'modules/uploads/views/edit-upload.client.view.html'
            });*/
    }
]);
