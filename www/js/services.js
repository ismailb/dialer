angular.module('dialer.services', ['ngCordovaMocks'])
/**
 * A simple example service that returns some data.
 */
.factory('Contacts', function($cordovaContacts) {
    // Might use a resource here that returns a JSON array
    // Some fake testing data
    var contacts = [];
    return {
        all: function() {
            var options = {};
            options.filter = "";
            options.multiple = true;
            $cordovaContacts.find(options).then(function(result) {
                contacts = result;
            }, function(err) {
                console.log(err);
            })
            return contacts;
        },
        get: function(filterKeyword) {
            var options = {};
            options.filter = filterKeyword;
            options.multiple = true;
            $cordovaContacts.find(options).then(function(result) {
                contacts = result;
            }, function(err) {
                console.log(err);
            })
            return contacts;
        },
        save: function(contact) {
            $cordovaContacts.save(contact);
        }
    }
});