angular.module('dialer.controllers', []).controller('ContactCtrl', function($scope, Contacts, LocalStorage) {
    function setupData() {
        var contact1 = {
            id: 1001,
            name: {
                givenName: 'Dexter',
                familyName: 'Morgan'
            },
            displayName: 'Dexter Morgan',
            nickname: 'Dexter',
            phoneNumbers: [{
                value: '+971123456789',
                type: 'mobile',
                pref: true
            }]
        };
        var contact2 = {
            id: 1002,
            name: {
                givenName: 'Debra',
                familyName: 'Morgan'
            },
            displayName: 'Debra Morgan',
            nickname: 'Deb',
            phoneNumbers: [{
                value: '+971444456789',
                type: 'mobile',
                pref: true
            }]
        };
        Contacts.save(contact1);
        Contacts.save(contact2);
    }
    //setupData();
    Contacts.all().then(function(result) {
        $scope.contacts = result;
        console.log($scope.contacts);
    }, function(e) {
        console.log(e)
    });
    $scope.searchKeyword = '';
    $scope.searchContact = function(key) {
        Contacts.get.call(this, key).then(function(result) {
            $scope.contacts = result;
            console.log($scope.contacts);
        }, function(e) {
            console.log(e)
        });
    };
    $scope.goToContactDetail = function(id) {
        $state.go('tab.contactdetail');
    };
    $scope.call = function(phoneNumber) {
        console.log('call ' + phoneNumber);
        var userSettings = 'user.settings';
        var settings = LocalStorage.getObject(userSettings);
        if (settings && settings.tollNumber && settings.authCode) {
            var callPrefix = "tel:" + settings.tollNumber + ',9,' + settings.authCode + '#,,,,,,';
            // TODO: strip + sign and take the , ; #s from the client
            document.location.href = callPrefix + phoneNumber;
        } else {
            console.log('Configure settings first!!!');
        }
    };
}).controller('AccountCtrl', function($scope, LocalStorage) {
    var userSettings = 'user.settings';
    console.log(LocalStorage.getObject(userSettings));
    $scope.accountDetail = LocalStorage.getObject(userSettings) || {
        voipName: '',
        tollNumber: '',
        authCode: ''
    };
    $scope.save = function() {
        console.log('in settings save');
        LocalStorage.setObject(userSettings, $scope.accountDetail);
    };
}).controller('AboutCtrl', function($scope) {});