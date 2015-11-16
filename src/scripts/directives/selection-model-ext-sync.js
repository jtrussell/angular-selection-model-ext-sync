
/**
 * Sync a selection model with your list of selected items
 *
 * @package selectionModel.ext.sync
 */

angular.module('selectionModel.ext.sync')
  .directive('selectionModelExtSync', ['selectionModelOptions', 'selectionModelExtSyncOptions',
      function(selectionModelOptions, selectionModelExtSyncOptions) {
    'use strict';
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        /**
         * Not much we can do without a selection model
         */
        if(!attrs.hasOwnProperty('selectionModel')) {
          throw new Error('selectionModelExtSync requires selectionModel on the attached element');
        }

        /**
         * The user provided list of selected items
         *
         * These will be synced back to the collection items themselves (e.g. a
         * given item will be marked as selected if it is represented here).
         */
        var selectedItems = scope.$eval(attrs.selectionModelSelectedItems);

        /**
         * Not much we can do without a list of selected items
         */
        if(!angular.isArray(selectedItems)) {
          throw new Error('selectionModelExtSync requires that an array be provided in selectionModelSelectedItems');
        }

        var selmOpts = selectionModelOptions.get()
          , selmSyncOpts = selectionModelExtSyncOptions.get()
          , selectedAttr = selmOpts.selectedAttribute
          , idAttr = scope.$eval(attrs.selectionModelExtSyncIdAttribute) || selmSyncOpts.idAttribute;

        var smItem = scope.$eval(attrs.ngRepeat.split(' in ')[0]) || {}
          , smItemId = smItem[idAttr];

        var validateSelection = function() {
          for(var ix = selectedItems.length; ix--;) {
            if(smItemId === selectedItems[ix][idAttr]) {
              smItem[selectedAttr] = true;
              selectedItems[ix] = smItem;
              break;
            } else {
              smItem[selectedAttr] = false;
            }
          }
        };

        validateSelection();

        scope.$on('eventSelectionModelExt_validate', validateSelection);
      }
    };
  }]);
