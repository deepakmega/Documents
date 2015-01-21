'use strict';

// Configuring the Articles module
angular.module('document').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Documents', 'document', 'dropdown', '/documents');
        Menus.addSubMenuItem('topbar', 'document', 'List Documents', 'documents');
        Menus.addSubMenuItem('topbar', 'document', 'Upload Documents', 'documents/Upload');
        Menus.addSubMenuItem('topbar', 'document', 'Edit Structure', 'documents/Edit');
    }
]);
