/*global $:false */
'use strict';

// Uploads controller
angular.module('document').controller('docNodeCreateController', ['$scope', '$stateParams', '$location', 'Authentication', 'documentService', 'ngDialog',
    function($scope, $stateParams, $location, Authentication, documentService, ngDialog) {

        $scope.sizeLimit = 10585760; // 10MB in Bytes
        $scope.uploadProgress = 0;
        $scope.creds = {access_key:'AKIAI7P42testGQ' , secret_key:'CmN8P/cEJ6hstestBYhPfPcuOQVMqq4w', bucket:'docstore2015'};
        $scope.authentication = Authentication;

        $scope.upload = function(scopeFile) {
            AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
            AWS.config.region = 'us-east-1';
            var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket} });
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
                        $scope.doc.uploadedURL = 'https://s3.amazonaws.com/docstore2015/' + uniqueFileName;
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
