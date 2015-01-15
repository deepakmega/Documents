/*global $:false */
'use strict';

// Uploads controller
angular.module('document').controller('DocumentController', ['$scope', '$stateParams', '$location', 'Authentication', 'documentService', 'ngDialog',
    function($scope, $stateParams, $location, Authentication, documentService, ngDialog) {

        $scope.sizeLimit = 10585760; // 10MB in Bytes
        $scope.uploadProgress = 0;
        $scope.creds = {access_key:'AKIAIZ7TSXPBUGRQKINA' , secret_key:'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', bucket:'docstore2015'};

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

        $scope.openConfirmWithPreCloseCallbackInlinedWithNestedConfirm = function (scope) {
            ngDialog.openConfirm({
                    template: '/modules/document/views/list-document.popup.client.view.html',
                    className: 'ngdialog-theme-default',
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
                    $scope.createNewNode(value, scope.$modelValue._id);
                    $scope.uploadedURL = null;
                }, function(value){
                    console.log('rejected:' + value);
                    $scope.uploadedURL = null;
                });
        };

        $scope.createNewNode = function(doc, parentID) {
            if(doc || $scope.uploadedURL) {
                var newNode = {
                    name: doc?doc.Name:$scope.uploadedURL,
                    title: doc?doc.Name:$scope.uploadedURL,
                    parentId: parentID,
                    url: $scope.uploadedURL
                };

                documentService.update(newNode, function () {
                    $scope.data = documentService.getData();
                    $location.path('documents');
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            }
        };

        $scope.upload = function(scopeFile) {
            AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
            AWS.config.region = 'us-east-1';
            var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
            $scope.uploadedURL = null;
            if(scopeFile) {
                // Perform File Size Check First
                var fileSize = Math.round(parseInt(scopeFile.size));
                if (fileSize > $scope.sizeLimit) {
                    toastr.error('Sorry, your attachment is too big. <br/> Maximum ' + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
                    return false;
                }
                // Prepend Unique String To Prevent Overwrites
                var uniqueFileName = $scope.uniqueString() + '-' + scopeFile.name;
                var params = { Key: uniqueFileName, ContentType: scopeFile.type, Body: scopeFile, ServerSideEncryption: 'AES256' };
                bucket.putObject(params, function(err, data) {
                    if(err) {
                        toastr.error(err.message,err.code);
                        return false;
                    }
                    else {
                        // Upload Successfully Finished
                        toastr.success('File Uploaded Successfully', 'Done');
                        $scope.uploadedURL = 'https://s3.amazonaws.com/docstore2015/' + uniqueFileName;
                        // Reset The Progress Bar
                        setTimeout(function() {
                            $scope.uploadProgress = 0;
                            $scope.$digest();
                        }, 4000);
                    }
                })
                    .on('httpUploadProgress',function(progress) {
                        $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
                        $scope.$digest();
                    });
            }
            else {
                // No File Selected
                toastr.error('Please select a file to upload');
            }
        };

        $scope.fileSizeLabel = function() {
            // Convert Bytes To MB
            return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
        };
        $scope.uniqueString = function() {
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for( var i=0; i < 8; i++ ) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
    }
]);
