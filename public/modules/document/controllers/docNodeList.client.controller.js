/*global $:false */
'use strict';

// Uploads controller
angular.module('document').controller('DocumentListController', ['$scope', '$stateParams', '$location', 'Authentication', 'documentService', 'ngDialog',
    function($scope, $stateParams, $location, Authentication, documentService, ngDialog) {

        $scope.authentication = Authentication;
        $scope.data = documentService.getData();
        $scope.toggle = function(scope) {
            scope.toggle();
        };

        $scope.createRootNode = function() {

            documentService.createRootNode(function () {
                $scope.data = documentService.getData();
                $location.path('documents');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);
