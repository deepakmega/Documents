/*global $:false */
'use strict';

// Uploads controller
angular.module('document').controller('DocumentUploadController', ['$scope', '$stateParams', '$location', 'Authentication', 'documentService', 'ngDialog',
    function($scope, $stateParams, $location, Authentication, documentService, ngDialog) {

        $scope.authentication = Authentication;
        $scope.data = documentService.getData();

        $scope.deleteNode = function(scope) {
            var nodeData = scope.$modelValue;
            documentService.removeNode({id: nodeData._id}, function() {
                $scope.data = documentService.getData();
                $location.path('documents/Upload');
            });
        };

        $scope.toggle = function(scope) {
            scope.toggle();
        };

        $scope.openConfirmWithPreCloseCallbackInlinedWithNestedConfirm = function (scope) {
            $scope.parentID = scope.$modelValue._id;
            ngDialog.openConfirm({
                template: '/modules/document/views/upload-document.popup.client.view.html',
                className: 'ngdialog-theme-default',
                controller: 'docNodeUploadController',
                //preCloseCallback: function(value) {
                //    var nestedConfirmDialog = ngDialog.openConfirm({
                //        template:
                //        '<p>Are you sure you want to close the parent dialog?</p>' +
                //        '<div class="ngdialog-buttons">' +
                //        '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No' +
                //        '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes' +
                //        '</button></div>',
                //        plain: true,
                //        className: 'ngdialog-theme-default'
                //    });
                //    return nestedConfirmDialog;
                //},
                scope: $scope
            })
                .then(function(value){
                    console.log('resolved:' + value);
                    //$scope.createNewNode(value, scope.$modelValue._id);
                    $scope.uploadedURL = null;
                    $scope.data = documentService.getData();
                    $location.path('documents/Upload');
                }, function(value){
                    console.log('rejected:' + value);
                    $scope.uploadedURL = null;
                    $scope.data = documentService.getData();
                    $location.path('documents/Upload');
                });
        };

        $scope.createRootNode = function() {

            documentService.createRootNode(function () {
                $scope.data = documentService.getData();
                $location.path('documents/Upload');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);
