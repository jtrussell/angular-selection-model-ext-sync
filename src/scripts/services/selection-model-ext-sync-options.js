
/**
 * Options for the selection model sync extension
 *
 * @package selectionModel.ext.sync
 */

angular.module('selectionModel.ext.sync').provider('selectionModelExtSyncOptions', [function() {
  'use strict';

  var options = {
    idAttribute: 'id'
  };

  this.set = function(userOpts) {
    angular.extend(options, userOpts);
  };

  this.$get = function() {
    var exports = {
      get: function() {
        return angular.copy(options);
      }
    };
    return exports;
  };
}]);
