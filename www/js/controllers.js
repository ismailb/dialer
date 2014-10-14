angular.module('dialer.controllers', []).controller('ContactCtrl', function($scope, Contacts) {
    var contact = {
        id: 1001,
        name: {
            givenName: 'Dexter',
            familyName: 'Morgan'
        },
        displayName: name.givenName + ' ' + name.familyName,
        nickname: name.givenName,
        phoneNumbers: []
    };
    Contacts.save(contact);
    $scope.contacts = Contacts.all();
    console.log($scope.contacts);
})
.controller('ContactDetailCtrl', function($scope, $stateParams, Contacts) {
    $scope.contact = Contacts.get($stateParams.contactId);
})
.controller('AccountCtrl', function($scope) {})
.controller('AboutCtrl', function($scope) {});