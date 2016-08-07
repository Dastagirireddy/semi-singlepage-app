System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/facade/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, lang_1, async_1;
    var QueryList;
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            /**
             * An unmodifiable list of items that Angular keeps up to date when the state
             * of the application changes.
             *
             * The type of object that {@link QueryMetadata} and {@link ViewQueryMetadata} provide.
             *
             * Implements an iterable interface, therefore it can be used in both ES6
             * javascript `for (var i of items)` loops as well as in Angular templates with
             * `*ngFor="#i of myList"`.
             *
             * Changes can be observed by subscribing to the changes `Observable`.
             *
             * NOTE: In the future this class will implement an `Observable` interface.
             *
             * ### Example ([live demo](http://plnkr.co/edit/RX8sJnQYl9FWuSCWme5z?p=preview))
             * ```typescript
             * @Component({...})
             * class Container {
             *   constructor(@Query(Item) items: QueryList<Item>) {
             *     items.changes.subscribe(_ => console.log(items.length));
             *   }
             * }
             * ```
             */
            QueryList = (function () {
                function QueryList() {
                    this._results = [];
                    this._emitter = new async_1.EventEmitter();
                }
                Object.defineProperty(QueryList.prototype, "changes", {
                    get: function () { return this._emitter; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(QueryList.prototype, "length", {
                    get: function () { return this._results.length; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(QueryList.prototype, "first", {
                    get: function () { return collection_1.ListWrapper.first(this._results); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(QueryList.prototype, "last", {
                    get: function () { return collection_1.ListWrapper.last(this._results); },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * returns a new array with the passed in function applied to each element.
                 */
                QueryList.prototype.map = function (fn) { return this._results.map(fn); };
                /**
                 * returns a filtered array.
                 */
                QueryList.prototype.filter = function (fn) { return this._results.filter(fn); };
                /**
                 * returns a reduced value.
                 */
                QueryList.prototype.reduce = function (fn, init) { return this._results.reduce(fn, init); };
                /**
                 * executes function for each element in a query.
                 */
                QueryList.prototype.forEach = function (fn) { this._results.forEach(fn); };
                /**
                 * converts QueryList into an array
                 */
                QueryList.prototype.toArray = function () { return collection_1.ListWrapper.clone(this._results); };
                QueryList.prototype[lang_1.getSymbolIterator()] = function () { return this._results[lang_1.getSymbolIterator()](); };
                QueryList.prototype.toString = function () { return this._results.toString(); };
                /**
                 * @internal
                 */
                QueryList.prototype.reset = function (res) { this._results = res; };
                /** @internal */
                QueryList.prototype.notifyOnChanges = function () { this._emitter.emit(this); };
                return QueryList;
            }());
            exports_1("QueryList", QueryList);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3F1ZXJ5X2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUF1Qkc7WUFDSDtnQkFBQTtvQkFDVSxhQUFRLEdBQWEsRUFBRSxDQUFDO29CQUN4QixhQUFRLEdBQUcsSUFBSSxvQkFBWSxFQUFFLENBQUM7Z0JBMkN4QyxDQUFDO2dCQXpDQyxzQkFBSSw4QkFBTzt5QkFBWCxjQUFpQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDeEQsc0JBQUksNkJBQU07eUJBQVYsY0FBdUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUNyRCxzQkFBSSw0QkFBSzt5QkFBVCxjQUFpQixNQUFNLENBQUMsd0JBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUMzRCxzQkFBSSwyQkFBSTt5QkFBUixjQUFnQixNQUFNLENBQUMsd0JBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUV6RDs7bUJBRUc7Z0JBQ0gsdUJBQUcsR0FBSCxVQUFPLEVBQWtCLElBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFakU7O21CQUVHO2dCQUNILDBCQUFNLEdBQU4sVUFBTyxFQUF3QixJQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTFFOzttQkFFRztnQkFDSCwwQkFBTSxHQUFOLFVBQVUsRUFBMEIsRUFBRSxJQUFPLElBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTVGOzttQkFFRztnQkFDSCwyQkFBTyxHQUFQLFVBQVEsRUFBcUIsSUFBVSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRW5FOzttQkFFRztnQkFDSCwyQkFBTyxHQUFQLGNBQWlCLE1BQU0sQ0FBQyx3QkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUzRCxvQkFBQyx3QkFBaUIsRUFBRSxDQUFDLEdBQXJCLGNBQStCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUFpQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFN0UsNEJBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRXZEOzttQkFFRztnQkFDSCx5QkFBSyxHQUFMLFVBQU0sR0FBUSxJQUFVLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFFOUMsZ0JBQWdCO2dCQUNoQixtQ0FBZSxHQUFmLGNBQTBCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkQsZ0JBQUM7WUFBRCxDQTdDQSxBQTZDQyxJQUFBO1lBN0NELGlDQTZDQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3F1ZXJ5X2xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xpc3RXcmFwcGVyLCBNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtnZXRTeW1ib2xJdGVyYXRvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgRXZlbnRFbWl0dGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcblxuXG4vKipcbiAqIEFuIHVubW9kaWZpYWJsZSBsaXN0IG9mIGl0ZW1zIHRoYXQgQW5ndWxhciBrZWVwcyB1cCB0byBkYXRlIHdoZW4gdGhlIHN0YXRlXG4gKiBvZiB0aGUgYXBwbGljYXRpb24gY2hhbmdlcy5cbiAqXG4gKiBUaGUgdHlwZSBvZiBvYmplY3QgdGhhdCB7QGxpbmsgUXVlcnlNZXRhZGF0YX0gYW5kIHtAbGluayBWaWV3UXVlcnlNZXRhZGF0YX0gcHJvdmlkZS5cbiAqXG4gKiBJbXBsZW1lbnRzIGFuIGl0ZXJhYmxlIGludGVyZmFjZSwgdGhlcmVmb3JlIGl0IGNhbiBiZSB1c2VkIGluIGJvdGggRVM2XG4gKiBqYXZhc2NyaXB0IGBmb3IgKHZhciBpIG9mIGl0ZW1zKWAgbG9vcHMgYXMgd2VsbCBhcyBpbiBBbmd1bGFyIHRlbXBsYXRlcyB3aXRoXG4gKiBgKm5nRm9yPVwiI2kgb2YgbXlMaXN0XCJgLlxuICpcbiAqIENoYW5nZXMgY2FuIGJlIG9ic2VydmVkIGJ5IHN1YnNjcmliaW5nIHRvIHRoZSBjaGFuZ2VzIGBPYnNlcnZhYmxlYC5cbiAqXG4gKiBOT1RFOiBJbiB0aGUgZnV0dXJlIHRoaXMgY2xhc3Mgd2lsbCBpbXBsZW1lbnQgYW4gYE9ic2VydmFibGVgIGludGVyZmFjZS5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvUlg4c0puUVlsOUZXdVNDV21lNXo/cD1wcmV2aWV3KSlcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIEBDb21wb25lbnQoey4uLn0pXG4gKiBjbGFzcyBDb250YWluZXIge1xuICogICBjb25zdHJ1Y3RvcihAUXVlcnkoSXRlbSkgaXRlbXM6IFF1ZXJ5TGlzdDxJdGVtPikge1xuICogICAgIGl0ZW1zLmNoYW5nZXMuc3Vic2NyaWJlKF8gPT4gY29uc29sZS5sb2coaXRlbXMubGVuZ3RoKSk7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgUXVlcnlMaXN0PFQ+IHtcbiAgcHJpdmF0ZSBfcmVzdWx0czogQXJyYXk8VD4gPSBbXTtcbiAgcHJpdmF0ZSBfZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBnZXQgY2hhbmdlcygpOiBPYnNlcnZhYmxlPGFueT4geyByZXR1cm4gdGhpcy5fZW1pdHRlcjsgfVxuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9yZXN1bHRzLmxlbmd0aDsgfVxuICBnZXQgZmlyc3QoKTogVCB7IHJldHVybiBMaXN0V3JhcHBlci5maXJzdCh0aGlzLl9yZXN1bHRzKTsgfVxuICBnZXQgbGFzdCgpOiBUIHsgcmV0dXJuIExpc3RXcmFwcGVyLmxhc3QodGhpcy5fcmVzdWx0cyk7IH1cblxuICAvKipcbiAgICogcmV0dXJucyBhIG5ldyBhcnJheSB3aXRoIHRoZSBwYXNzZWQgaW4gZnVuY3Rpb24gYXBwbGllZCB0byBlYWNoIGVsZW1lbnQuXG4gICAqL1xuICBtYXA8VT4oZm46IChpdGVtOiBUKSA9PiBVKTogVVtdIHsgcmV0dXJuIHRoaXMuX3Jlc3VsdHMubWFwKGZuKTsgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGEgZmlsdGVyZWQgYXJyYXkuXG4gICAqL1xuICBmaWx0ZXIoZm46IChpdGVtOiBUKSA9PiBib29sZWFuKTogVFtdIHsgcmV0dXJuIHRoaXMuX3Jlc3VsdHMuZmlsdGVyKGZuKTsgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGEgcmVkdWNlZCB2YWx1ZS5cbiAgICovXG4gIHJlZHVjZTxVPihmbjogKGFjYzogVSwgaXRlbTogVCkgPT4gVSwgaW5pdDogVSk6IFUgeyByZXR1cm4gdGhpcy5fcmVzdWx0cy5yZWR1Y2UoZm4sIGluaXQpOyB9XG5cbiAgLyoqXG4gICAqIGV4ZWN1dGVzIGZ1bmN0aW9uIGZvciBlYWNoIGVsZW1lbnQgaW4gYSBxdWVyeS5cbiAgICovXG4gIGZvckVhY2goZm46IChpdGVtOiBUKSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX3Jlc3VsdHMuZm9yRWFjaChmbik7IH1cblxuICAvKipcbiAgICogY29udmVydHMgUXVlcnlMaXN0IGludG8gYW4gYXJyYXlcbiAgICovXG4gIHRvQXJyYXkoKTogVFtdIHsgcmV0dXJuIExpc3RXcmFwcGVyLmNsb25lKHRoaXMuX3Jlc3VsdHMpOyB9XG5cbiAgW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk6IGFueSB7IHJldHVybiB0aGlzLl9yZXN1bHRzW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7IH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fcmVzdWx0cy50b1N0cmluZygpOyB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcmVzZXQocmVzOiBUW10pOiB2b2lkIHsgdGhpcy5fcmVzdWx0cyA9IHJlczsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbm90aWZ5T25DaGFuZ2VzKCk6IHZvaWQgeyB0aGlzLl9lbWl0dGVyLmVtaXQodGhpcyk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
