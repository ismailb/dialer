angular.module('dialer.services', ['ngCordova'])
/**
 * A simple example service that returns some data.
 */
.factory('Contacts', function($cordovaContacts, $q) {
    return {
        all: function() {
            var options = {};
            //options.fields = '*';
            options.filter = "";
            options.multiple = true;
            var defer = $q.defer();
            $cordovaContacts.find(options).then(function(result) {
                defer.resolve(result);
            }, function(err) {
                defer.reject(err);
            })
            return defer.promise;
        },
        get: function(filterKeyword, field) {
            var options = {};
            //options.fields = filterKeyword ? (field ? field : 'displayName') : '*';
            options.filter = filterKeyword;
            options.multiple = true;
            var defer = $q.defer();
            $cordovaContacts.find(options).then(function(result) {
                defer.resolve(result);
            }, function(err) {
                defer.reject(err);
            })
            return defer.promise;
        },
        save: function(contact) {
            $cordovaContacts.save(contact).then(function() {
                console.log('successfully saved!!!');
            }, function(e) {
                console.log(e);
            });
        }
    }
})
.factory('LocalStorage', ['$window',
    function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }
]);