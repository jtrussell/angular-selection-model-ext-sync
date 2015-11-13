
# selectionModel.ext.sync

[![Build Status](https://secure.travis-ci.org/jtrussell/angular-selection-model-ext-sync.png?branch=master)](https://travis-ci.org/jtrussell/angular-selection-model-ext-sync)

> Sync Selection Model with an array of selected items.

[Selection Model](https://github.com/jtrussell/angular-selection-model) will
populate an (read only) array with user selected items. This extension closes
the loop by selecting collection items that match things in your array of
selected items. Super useful for server paginated lists.


## Installation

Install with bower:

```
bower install --save angular-selection-model-ext-sync
```


## Usage

Add this module as a dependency to your app:

```
angular.module('myApp', [
  'selectionModel',
  'selectionModel.ext.sync'
]);
```

Now simply add a `selection-model-ext-sync` attribute to your selection model
elements:

```html
<!--
scope = {
  bag: [/* collection of stuff */],
  selectedThings: [/* collection of stuff to select */]
}
-->
<ul>
  <li ng-repeat="thing in bag"
      selection-model
      selection-model-selected-items="selectedThings"
      selection-model-ext-sync>
    {{$index + 1}}: {{thing.label}}
  </li>
</ul>
```

The extension matches collection items with things in the selected things by a
given attribute (`'id'` by default).


### The `selection-model-ext-sync-id-attribute` attribute

Allows you to specify which property to use to compare collection items. For
example, here items in `peeps` will be compared by `name`:

```html
<!--
scope = {
  peeps: [
    {name: 'kate', age: 30},
    {name: 'justin', age: 28},
    {name: 'bella', age: .75},
  ],
  selectedPeeps: [
    {name: 'bella'}
  ]
}
-->
<ul>
  <li ng-repeat="p in peeps"
      selection-model
      selection-model-selected-items="selectedPeeps"
      selection-model-ext-sync
      selection-model-ext-sync-id-attribute="'name'">
    {{p.name}}
  </li>
</ul>
```

Note that references in the selected items array are updated as matching
collection items are found.


### `selectionModelExtSyncOptions` 

We also expose a provider for setting global defaults:

```javascript
myApp.config(function(selectionModelExtSyncOptionsProvider) {
  selectionModelExtSyncOptionsProvider.set({
    idAttribute: 'id'
  });
});
```


## Testing

Use `npm test` to run the full suite of linting, style checks, and unit tests.

Or, run each individually:

- Use `grunt jshint` for linting
- Use `grunt jscs` for coding style checks
- Use `grunt jasmine` to unit tests

For ease of development the `grunt watch` task will run each of the above as
needed when you make changes to source files.


## Changelog

- 2015-11-13 v0.1.0 Initial release


## License

MIT
