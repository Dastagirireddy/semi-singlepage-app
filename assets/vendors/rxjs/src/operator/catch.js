System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1;
    var CatchOperator, CatchSubscriber;
    /**
     * Catches errors on the observable to be handled by returning a new observable or throwing an error.
     * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
     *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
     *  is returned by the `selector` will be used to continue the observable chain.
     * @return {Observable} an observable that originates from either the source or the observable returned by the
     *  catch `selector` function.
     * @method catch
     * @owner Observable
     */
    function _catch(selector) {
        var operator = new CatchOperator(selector);
        var caught = this.lift(operator);
        return (operator.caught = caught);
    }
    exports_1("_catch", _catch);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            CatchOperator = (function () {
                function CatchOperator(selector) {
                    this.selector = selector;
                }
                CatchOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
                };
                return CatchOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            CatchSubscriber = (function (_super) {
                __extends(CatchSubscriber, _super);
                function CatchSubscriber(destination, selector, caught) {
                    _super.call(this, destination);
                    this.selector = selector;
                    this.caught = caught;
                }
                // NOTE: overriding `error` instead of `_error` because we don't want
                // to have this flag this subscriber as `isStopped`.
                CatchSubscriber.prototype.error = function (err) {
                    if (!this.isStopped) {
                        var result = void 0;
                        try {
                            result = this.selector(err, this.caught);
                        }
                        catch (err) {
                            this.destination.error(err);
                            return;
                        }
                        this._innerSub(result);
                    }
                };
                CatchSubscriber.prototype._innerSub = function (result) {
                    this.unsubscribe();
                    this.destination.remove(this);
                    result.subscribe(this.destination);
                };
                return CatchSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL2NhdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFJQTs7Ozs7Ozs7O09BU0c7SUFDSCxnQkFBNkIsUUFBNEQ7UUFDdkYsSUFBTSxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFKRCwyQkFJQyxDQUFBOzs7Ozs7O1lBT0Q7Z0JBR0UsdUJBQW9CLFFBQWdFO29CQUFoRSxhQUFRLEdBQVIsUUFBUSxDQUF3RDtnQkFDcEYsQ0FBQztnQkFFRCw0QkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO29CQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDeEYsQ0FBQztnQkFDSCxvQkFBQztZQUFELENBVEEsQUFTQyxJQUFBO1lBRUQ7Ozs7ZUFJRztZQUNIO2dCQUFpQyxtQ0FBYTtnQkFFNUMseUJBQVksV0FBNEIsRUFDcEIsUUFBZ0UsRUFDaEUsTUFBdUI7b0JBQ3pDLGtCQUFNLFdBQVcsQ0FBQyxDQUFDO29CQUZELGFBQVEsR0FBUixRQUFRLENBQXdEO29CQUNoRSxXQUFNLEdBQU4sTUFBTSxDQUFpQjtnQkFFM0MsQ0FBQztnQkFFRCxxRUFBcUU7Z0JBQ3JFLG9EQUFvRDtnQkFDcEQsK0JBQUssR0FBTCxVQUFNLEdBQVE7b0JBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsSUFBSSxNQUFNLFNBQUssQ0FBQzt3QkFFaEIsSUFBSSxDQUFDOzRCQUNILE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzNDLENBQUU7d0JBQUEsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDYixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDNUIsTUFBTSxDQUFDO3dCQUNULENBQUM7d0JBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDekIsQ0FBQztnQkFDSCxDQUFDO2dCQUVPLG1DQUFTLEdBQWpCLFVBQWtCLE1BQXVCO29CQUN2QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ2IsSUFBSSxDQUFDLFdBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3JDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO2dCQUNILHNCQUFDO1lBQUQsQ0E5QkEsQUE4QkMsQ0E5QmdDLHVCQUFVLEdBOEIxQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vcGVyYXRvci9jYXRjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BlcmF0b3J9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJy4uL09ic2VydmFibGUnO1xuXG4vKipcbiAqIENhdGNoZXMgZXJyb3JzIG9uIHRoZSBvYnNlcnZhYmxlIHRvIGJlIGhhbmRsZWQgYnkgcmV0dXJuaW5nIGEgbmV3IG9ic2VydmFibGUgb3IgdGhyb3dpbmcgYW4gZXJyb3IuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzZWxlY3RvciBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYXMgYXJndW1lbnRzIGBlcnJgLCB3aGljaCBpcyB0aGUgZXJyb3IsIGFuZCBgY2F1Z2h0YCwgd2hpY2hcbiAqICBpcyB0aGUgc291cmNlIG9ic2VydmFibGUsIGluIGNhc2UgeW91J2QgbGlrZSB0byBcInJldHJ5XCIgdGhhdCBvYnNlcnZhYmxlIGJ5IHJldHVybmluZyBpdCBhZ2Fpbi4gV2hhdGV2ZXIgb2JzZXJ2YWJsZVxuICogIGlzIHJldHVybmVkIGJ5IHRoZSBgc2VsZWN0b3JgIHdpbGwgYmUgdXNlZCB0byBjb250aW51ZSB0aGUgb2JzZXJ2YWJsZSBjaGFpbi5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IGFuIG9ic2VydmFibGUgdGhhdCBvcmlnaW5hdGVzIGZyb20gZWl0aGVyIHRoZSBzb3VyY2Ugb3IgdGhlIG9ic2VydmFibGUgcmV0dXJuZWQgYnkgdGhlXG4gKiAgY2F0Y2ggYHNlbGVjdG9yYCBmdW5jdGlvbi5cbiAqIEBtZXRob2QgY2F0Y2hcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY2F0Y2g8VCwgUj4oc2VsZWN0b3I6IChlcnI6IGFueSwgY2F1Z2h0OiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFI+KTogT2JzZXJ2YWJsZTxSPiB7XG4gIGNvbnN0IG9wZXJhdG9yID0gbmV3IENhdGNoT3BlcmF0b3Ioc2VsZWN0b3IpO1xuICBjb25zdCBjYXVnaHQgPSB0aGlzLmxpZnQob3BlcmF0b3IpO1xuICByZXR1cm4gKG9wZXJhdG9yLmNhdWdodCA9IGNhdWdodCk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2F0Y2hTaWduYXR1cmU8VD4ge1xuICAoc2VsZWN0b3I6IChlcnI6IGFueSwgY2F1Z2h0OiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFQ+KTogT2JzZXJ2YWJsZTxUPjtcbiAgPFI+KHNlbGVjdG9yOiAoZXJyOiBhbnksIGNhdWdodDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxSPik6IE9ic2VydmFibGU8Uj47XG59XG5cbmNsYXNzIENhdGNoT3BlcmF0b3I8VCwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBSPiB7XG4gIGNhdWdodDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VsZWN0b3I6IChlcnI6IGFueSwgY2F1Z2h0OiBPYnNlcnZhYmxlPGFueT4pID0+IE9ic2VydmFibGU8YW55Pikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFI+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5fc3Vic2NyaWJlKG5ldyBDYXRjaFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5zZWxlY3RvciwgdGhpcy5jYXVnaHQpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgQ2F0Y2hTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8YW55PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzZWxlY3RvcjogKGVycjogYW55LCBjYXVnaHQ6IE9ic2VydmFibGU8YW55PikgPT4gT2JzZXJ2YWJsZTxhbnk+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNhdWdodDogT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgLy8gTk9URTogb3ZlcnJpZGluZyBgZXJyb3JgIGluc3RlYWQgb2YgYF9lcnJvcmAgYmVjYXVzZSB3ZSBkb24ndCB3YW50XG4gIC8vIHRvIGhhdmUgdGhpcyBmbGFnIHRoaXMgc3Vic2NyaWJlciBhcyBgaXNTdG9wcGVkYC5cbiAgZXJyb3IoZXJyOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICBsZXQgcmVzdWx0OiBhbnk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuc2VsZWN0b3IoZXJyLCB0aGlzLmNhdWdodCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2lubmVyU3ViKHJlc3VsdCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5uZXJTdWIocmVzdWx0OiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgKDxhbnk+dGhpcy5kZXN0aW5hdGlvbikucmVtb3ZlKHRoaXMpO1xuICAgIHJlc3VsdC5zdWJzY3JpYmUodGhpcy5kZXN0aW5hdGlvbik7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
