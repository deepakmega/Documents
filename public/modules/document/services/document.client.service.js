'use strict';

//Uploads service used to communicate Uploads REST endpoints
angular.module('document').factory('documentService', ['$resource',
    function($resource) {
        return $resource('documents/:nodeId',  {nodeId:'@id'}, {
            update: { method: 'POST' },
            'getData':  {method:'GET', isArray:true},
            'removeNode': { method: 'POST' }
        });
    }
]);
