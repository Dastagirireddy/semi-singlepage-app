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
             * `*ngFor="let i of myList"`.
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
                    this._dirty = true;
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
                QueryList.prototype.reset = function (res) {
                    this._results = collection_1.ListWrapper.flatten(res);
                    this._dirty = false;
                };
                /** @internal */
                QueryList.prototype.notifyOnChanges = function () { this._emitter.emit(this); };
                /** internal */
                QueryList.prototype.setDirty = function () { this._dirty = true; };
                Object.defineProperty(QueryList.prototype, "dirty", {
                    /** internal */
                    get: function () { return this._dirty; },
                    enumerable: true,
                    configurable: true
                });
                return QueryList;
            }());
            exports_1("QueryList", QueryList);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci9xdWVyeV9saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBS0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBdUJHO1lBQ0g7Z0JBQUE7b0JBQ1UsV0FBTSxHQUFHLElBQUksQ0FBQztvQkFDZCxhQUFRLEdBQWEsRUFBRSxDQUFDO29CQUN4QixhQUFRLEdBQUcsSUFBSSxvQkFBWSxFQUFFLENBQUM7Z0JBb0R4QyxDQUFDO2dCQWxEQyxzQkFBSSw4QkFBTzt5QkFBWCxjQUFpQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDeEQsc0JBQUksNkJBQU07eUJBQVYsY0FBdUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUNyRCxzQkFBSSw0QkFBSzt5QkFBVCxjQUFpQixNQUFNLENBQUMsd0JBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUMzRCxzQkFBSSwyQkFBSTt5QkFBUixjQUFnQixNQUFNLENBQUMsd0JBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUV6RDs7bUJBRUc7Z0JBQ0gsdUJBQUcsR0FBSCxVQUFPLEVBQWtCLElBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFakU7O21CQUVHO2dCQUNILDBCQUFNLEdBQU4sVUFBTyxFQUF3QixJQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTFFOzttQkFFRztnQkFDSCwwQkFBTSxHQUFOLFVBQVUsRUFBMEIsRUFBRSxJQUFPLElBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTVGOzttQkFFRztnQkFDSCwyQkFBTyxHQUFQLFVBQVEsRUFBcUIsSUFBVSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRW5FOzttQkFFRztnQkFDSCwyQkFBTyxHQUFQLGNBQWlCLE1BQU0sQ0FBQyx3QkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUzRCxvQkFBQyx3QkFBaUIsRUFBRSxDQUFDLEdBQXJCLGNBQStCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUFpQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFN0UsNEJBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRXZEOzttQkFFRztnQkFDSCx5QkFBSyxHQUFMLFVBQU0sR0FBcUI7b0JBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsd0JBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixDQUFDO2dCQUVELGdCQUFnQjtnQkFDaEIsbUNBQWUsR0FBZixjQUEwQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXJELGVBQWU7Z0JBQ2YsNEJBQVEsR0FBUixjQUFhLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFHbEMsc0JBQUksNEJBQUs7b0JBRFQsZUFBZTt5QkFDZixjQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUNyQyxnQkFBQztZQUFELENBdkRBLEFBdURDLElBQUE7WUF2REQsaUNBdURDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3F1ZXJ5X2xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xpc3RXcmFwcGVyLCBNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtnZXRTeW1ib2xJdGVyYXRvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgRXZlbnRFbWl0dGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcblxuXG4vKipcbiAqIEFuIHVubW9kaWZpYWJsZSBsaXN0IG9mIGl0ZW1zIHRoYXQgQW5ndWxhciBrZWVwcyB1cCB0byBkYXRlIHdoZW4gdGhlIHN0YXRlXG4gKiBvZiB0aGUgYXBwbGljYXRpb24gY2hhbmdlcy5cbiAqXG4gKiBUaGUgdHlwZSBvZiBvYmplY3QgdGhhdCB7QGxpbmsgUXVlcnlNZXRhZGF0YX0gYW5kIHtAbGluayBWaWV3UXVlcnlNZXRhZGF0YX0gcHJvdmlkZS5cbiAqXG4gKiBJbXBsZW1lbnRzIGFuIGl0ZXJhYmxlIGludGVyZmFjZSwgdGhlcmVmb3JlIGl0IGNhbiBiZSB1c2VkIGluIGJvdGggRVM2XG4gKiBqYXZhc2NyaXB0IGBmb3IgKHZhciBpIG9mIGl0ZW1zKWAgbG9vcHMgYXMgd2VsbCBhcyBpbiBBbmd1bGFyIHRlbXBsYXRlcyB3aXRoXG4gKiBgKm5nRm9yPVwibGV0IGkgb2YgbXlMaXN0XCJgLlxuICpcbiAqIENoYW5nZXMgY2FuIGJlIG9ic2VydmVkIGJ5IHN1YnNjcmliaW5nIHRvIHRoZSBjaGFuZ2VzIGBPYnNlcnZhYmxlYC5cbiAqXG4gKiBOT1RFOiBJbiB0aGUgZnV0dXJlIHRoaXMgY2xhc3Mgd2lsbCBpbXBsZW1lbnQgYW4gYE9ic2VydmFibGVgIGludGVyZmFjZS5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvUlg4c0puUVlsOUZXdVNDV21lNXo/cD1wcmV2aWV3KSlcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIEBDb21wb25lbnQoey4uLn0pXG4gKiBjbGFzcyBDb250YWluZXIge1xuICogICBjb25zdHJ1Y3RvcihAUXVlcnkoSXRlbSkgaXRlbXM6IFF1ZXJ5TGlzdDxJdGVtPikge1xuICogICAgIGl0ZW1zLmNoYW5nZXMuc3Vic2NyaWJlKF8gPT4gY29uc29sZS5sb2coaXRlbXMubGVuZ3RoKSk7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgUXVlcnlMaXN0PFQ+IHtcbiAgcHJpdmF0ZSBfZGlydHkgPSB0cnVlO1xuICBwcml2YXRlIF9yZXN1bHRzOiBBcnJheTxUPiA9IFtdO1xuICBwcml2YXRlIF9lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGdldCBjaGFuZ2VzKCk6IE9ic2VydmFibGU8YW55PiB7IHJldHVybiB0aGlzLl9lbWl0dGVyOyB9XG4gIGdldCBsZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3Jlc3VsdHMubGVuZ3RoOyB9XG4gIGdldCBmaXJzdCgpOiBUIHsgcmV0dXJuIExpc3RXcmFwcGVyLmZpcnN0KHRoaXMuX3Jlc3VsdHMpOyB9XG4gIGdldCBsYXN0KCk6IFQgeyByZXR1cm4gTGlzdFdyYXBwZXIubGFzdCh0aGlzLl9yZXN1bHRzKTsgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGEgbmV3IGFycmF5IHdpdGggdGhlIHBhc3NlZCBpbiBmdW5jdGlvbiBhcHBsaWVkIHRvIGVhY2ggZWxlbWVudC5cbiAgICovXG4gIG1hcDxVPihmbjogKGl0ZW06IFQpID0+IFUpOiBVW10geyByZXR1cm4gdGhpcy5fcmVzdWx0cy5tYXAoZm4pOyB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgYSBmaWx0ZXJlZCBhcnJheS5cbiAgICovXG4gIGZpbHRlcihmbjogKGl0ZW06IFQpID0+IGJvb2xlYW4pOiBUW10geyByZXR1cm4gdGhpcy5fcmVzdWx0cy5maWx0ZXIoZm4pOyB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgYSByZWR1Y2VkIHZhbHVlLlxuICAgKi9cbiAgcmVkdWNlPFU+KGZuOiAoYWNjOiBVLCBpdGVtOiBUKSA9PiBVLCBpbml0OiBVKTogVSB7IHJldHVybiB0aGlzLl9yZXN1bHRzLnJlZHVjZShmbiwgaW5pdCk7IH1cblxuICAvKipcbiAgICogZXhlY3V0ZXMgZnVuY3Rpb24gZm9yIGVhY2ggZWxlbWVudCBpbiBhIHF1ZXJ5LlxuICAgKi9cbiAgZm9yRWFjaChmbjogKGl0ZW06IFQpID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fcmVzdWx0cy5mb3JFYWNoKGZuKTsgfVxuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBRdWVyeUxpc3QgaW50byBhbiBhcnJheVxuICAgKi9cbiAgdG9BcnJheSgpOiBUW10geyByZXR1cm4gTGlzdFdyYXBwZXIuY2xvbmUodGhpcy5fcmVzdWx0cyk7IH1cblxuICBbZ2V0U3ltYm9sSXRlcmF0b3IoKV0oKTogYW55IHsgcmV0dXJuIHRoaXMuX3Jlc3VsdHNbZ2V0U3ltYm9sSXRlcmF0b3IoKV0oKTsgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9yZXN1bHRzLnRvU3RyaW5nKCk7IH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICByZXNldChyZXM6IEFycmF5PFQgfCBhbnlbXT4pOiB2b2lkIHtcbiAgICB0aGlzLl9yZXN1bHRzID0gTGlzdFdyYXBwZXIuZmxhdHRlbihyZXMpO1xuICAgIHRoaXMuX2RpcnR5ID0gZmFsc2U7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5vdGlmeU9uQ2hhbmdlcygpOiB2b2lkIHsgdGhpcy5fZW1pdHRlci5lbWl0KHRoaXMpOyB9XG5cbiAgLyoqIGludGVybmFsICovXG4gIHNldERpcnR5KCkgeyB0aGlzLl9kaXJ0eSA9IHRydWU7IH1cblxuICAvKiogaW50ZXJuYWwgKi9cbiAgZ2V0IGRpcnR5KCkgeyByZXR1cm4gdGhpcy5fZGlydHk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
