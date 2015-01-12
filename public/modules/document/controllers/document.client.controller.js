'use strict';

// Uploads controller
angular.module('document').controller('DocumentController', ['$scope', '$stateParams', '$location', 'Authentication', 'documentService', 'ngDialog',
    function($scope, $stateParams, $location, Authentication, documentService, ngDialog) {
        $scope.authentication = Authentication;
        $scope.data = documentService.getData();

        $scope.newSubItem = function(scope) {
            var nodeData = scope.$modelValue;

            var newNode ={
                name: 'newNode',
                title: 'newNodeTitle',
                parentId: nodeData._id,
                url: 'newNodeURL'};

            documentService.update(newNode, function() {
                $scope.data = documentService.getData();
                $location.path('documents');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.deleteNode = function(scope) {
            var nodeData = scope.$modelValue;
            documentService.removeNode({id: nodeData._id}, function() {
                $scope.data = documentService.getData();
                $location.path('documents');
            });
        };

        $scope.toggle = function(scope) {
            scope.toggle();
        };

        $scope.clickToOpen = function () {
            ngDialog.open({ template: '/modules/document/views/list-document.popup.client.view.html' });
        };

        $scope.openConfirmWithPreCloseCallbackInlinedWithNestedConfirm = function () {
            ngDialog.openConfirm({
                template: '/modules/document/views/list-document.popup.client.view.html',
                className: 'ngdialog-theme-default',
                preCloseCallback: function(value) {
                    var nestedConfirmDialog = ngDialog.openConfirm({
                        template:
                        '<p>Are you sure you want to close the parent dialog?</p>' +
                        '<div class="ngdialog-buttons">' +
                        '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No' +
                        '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes' +
                        '</button></div>',
                        plain: true,
                        className: 'ngdialog-theme-default'
                    });
                    return nestedConfirmDialog;
                },
                scope: $scope
            })
                .then(function(value){
                    console.log('resolved:' + value);
// Perform the save here
                }, function(value){
                    console.log('rejected:' + value);
                });
        };
    }
]);
