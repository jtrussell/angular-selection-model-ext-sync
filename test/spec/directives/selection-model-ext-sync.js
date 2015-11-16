
/**
 * the fire is dead
 * the room is freezing
 */

describe('Directive: selectionModelExtSync', function() {
  'use strict';

  var ng = angular
    , scope
    , c;

  beforeEach(module('selectionModel.ext.sync'));

  var setup = function() {
    inject(function($rootScope, $compile) {
      scope = $rootScope.$new();

      scope.bag = [
        {id: 'foo', label: 'Foo'},
        {id: 'bar', label: 'Bar'},
        {id: 'baz', label: 'Baz'}
      ];

      c = function(tpl, s) {
        s = s || scope;
        tpl = ng.isArray(tpl) ? tpl.join('\n') : tpl;
        var $el = $compile(ng.element(tpl))(s);
        s.$apply();
        return $el;
      };
    });
  };

  describe('with default provider settings', function() {
    beforeEach(setup);

    it('should throw if selection-model is not attached the element', function() {
      var makeEl = function() {
        c([
          '<ul>',
            '<li ng-repeat="thing in bag"',
                'selection-model-ext-sync>',
            '</li>',
          '</ul>'
        ]);
      };
      expect(makeEl).toThrow();
    });

    it('should throw if an array is not provided in selection-model-selected-items', function() {
      var makeEl = function() {
        c([
          '<ul>',
            '<li ng-repeat="thing in bag"',
                'selection-model',
                'selection-model-ext-sync>',
            '</li>',
          '</ul>'
        ]);
      };
      expect(makeEl).toThrow();
    });

    it('should mark incoming items as selected if present in selected items array', function() {
      scope.selectedThings = [{id: 'bar', label: 'Bar'}];
      var $el = c([
        '<ul>',
          '<li ng-repeat="thing in bag"',
              'selection-model',
              'selection-model-selected-items="selectedThings"',
              'selection-model-ext-sync>',
          '</li>',
        '</ul>'
      ]);
      expect(scope.bag[0].selected).toBe(false);
      expect(scope.bag[1].selected).toBe(true);
      expect(scope.bag[2].selected).toBe(false);
    });

    it('should update selected items to match incoming items', function() {
      scope.selectedThings = [{id: 'bar', label: 'Bar'}];
      var $el = c([
        '<ul>',
          '<li ng-repeat="thing in bag"',
              'selection-model',
              'selection-model-selected-items="selectedThings"',
              'selection-model-ext-sync>',
          '</li>',
        '</ul>'
      ]);
      expect(scope.bag[1]).toBe(scope.selectedThings[0]);
    });

    it('should allow a custom id property inline', function() {
      scope.selectedThings = [{label: 'Bar'}];
      var $el = c([
        '<ul>',
          '<li ng-repeat="thing in bag"',
              'selection-model',
              'selection-model-selected-items="selectedThings"',
              'selection-model-ext-sync',
              'selection-model-ext-sync-id-attribute="\'label\'">',
          '</li>',
        '</ul>'
      ]);
      expect(scope.bag[0].selected).toBe(false);
      expect(scope.bag[1].selected).toBe(true);
      expect(scope.bag[2].selected).toBe(false);
    });

    it('should revalidate on selmExtSync_validate', function() {
      scope.selectedThings = [{id: 'bar'}];
      var $el = c([
        '<ul>',
          '<li ng-repeat="thing in bag"',
              'selection-model',
              'selection-model-selected-items="selectedThings"',
              'selection-model-ext-sync>',
          '</li>',
        '</ul>'
      ]);
      scope.selectedThings.length = 0;
      scope.selectedThings.push({id: 'foo'});
      scope.$broadcast('eventSelectionModelExt_validate');
      scope.$apply();
      expect(scope.bag[0].selected).toBe(true);
      expect(scope.bag[1].selected).toBe(false);
      expect(scope.bag[2].selected).toBe(false);
    });
  }); // END: with default provider settings

  it('should allow you to configure a default id property', function() {
    module(function(selectionModelExtSyncOptionsProvider) {
      selectionModelExtSyncOptionsProvider.set({
        idAttribute: 'label'
      });
    });
    setup();
    scope.selectedThings = [{label: 'Bar'}];
    var $el = c([
      '<ul>',
        '<li ng-repeat="thing in bag"',
            'selection-model',
            'selection-model-selected-items="selectedThings"',
            'selection-model-ext-sync>',
        '</li>',
      '</ul>'
    ]);
    expect(scope.bag[0].selected).toBe(false);
    expect(scope.bag[1].selected).toBe(true);
    expect(scope.bag[2].selected).toBe(false);
  });
});
