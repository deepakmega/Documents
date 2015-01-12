'use strict';

//Setting up route
angular.module('document').config(['$stateProvider',
    function($stateProvider) {
        // Documents state routing
        $stateProvider.
            state('listDocuments', {
                url: '/documents',
                templateUrl: 'modules/document/views/list-document.client.view.html'
            });
           /* .
            state('createUpload', {
                url: '/uploads/create',
                templateUrl: 'modules/uploads/views/create-upload.client.view.html'
            }).
            state('viewUpload', {
                url: '/uploads/:uploadId',
                templateUrl: 'modules/uploads/views/view-upload.client.view.html'
            }).
            state('editUpload', {
                url: '/uploads/:uploadId/edit',
                templateUrl: 'modules/uploads/views/edit-upload.client.view.html'
            });*/
    }
]);
