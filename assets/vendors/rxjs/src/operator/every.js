System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1;
    var EveryOperator, EverySubscriber;
    /**
     * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
     * @param {function} predicate a function for determining if an item meets a specified condition.
     * @param {any} [thisArg] optional object to use for `this` in the callback
     * @return {Observable} an Observable of booleans that determines if all items of the source Observable meet the condition specified.
     * @method every
     * @owner Observable
     */
    function every(predicate, thisArg) {
        return this.lift(new EveryOperator(predicate, thisArg, this));
    }
    exports_1("every", every);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            EveryOperator = (function () {
                function EveryOperator(predicate, thisArg, source) {
                    this.predicate = predicate;
                    this.thisArg = thisArg;
                    this.source = source;
                }
                EveryOperator.prototype.call = function (observer, source) {
                    return source._subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
                };
                return EveryOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            EverySubscriber = (function (_super) {
                __extends(EverySubscriber, _super);
                function EverySubscriber(destination, predicate, thisArg, source) {
                    _super.call(this, destination);
                    this.predicate = predicate;
                    this.thisArg = thisArg;
                    this.source = source;
                    this.index = 0;
                    this.thisArg = thisArg || this;
                }
                EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
                    this.destination.next(everyValueMatch);
                    this.destination.complete();
                };
                EverySubscriber.prototype._next = function (value) {
                    var result = false;
                    try {
                        result = this.predicate.call(this.thisArg, value, this.index++, this.source);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    if (!result) {
                        this.notifyComplete(false);
                    }
                };
                EverySubscriber.prototype._complete = function () {
                    this.notifyComplete(true);
                };
                return EverySubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL2V2ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFLQTs7Ozs7OztPQU9HO0lBQ0gsZUFBeUIsU0FBc0UsRUFDdEUsT0FBYTtRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUhELHlCQUdDLENBQUE7Ozs7Ozs7WUFNRDtnQkFDRSx1QkFBb0IsU0FBc0UsRUFDdEUsT0FBYSxFQUNiLE1BQXNCO29CQUZ0QixjQUFTLEdBQVQsU0FBUyxDQUE2RDtvQkFDdEUsWUFBTyxHQUFQLE9BQU8sQ0FBTTtvQkFDYixXQUFNLEdBQU4sTUFBTSxDQUFnQjtnQkFDMUMsQ0FBQztnQkFFRCw0QkFBSSxHQUFKLFVBQUssUUFBNkIsRUFBRSxNQUFXO29CQUM3QyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNyRyxDQUFDO2dCQUNILG9CQUFDO1lBQUQsQ0FUQSxBQVNDLElBQUE7WUFFRDs7OztlQUlHO1lBQ0g7Z0JBQWlDLG1DQUFhO2dCQUc1Qyx5QkFBWSxXQUE4QixFQUN0QixTQUFzRSxFQUN0RSxPQUFZLEVBQ1osTUFBc0I7b0JBQ3hDLGtCQUFNLFdBQVcsQ0FBQyxDQUFDO29CQUhELGNBQVMsR0FBVCxTQUFTLENBQTZEO29CQUN0RSxZQUFPLEdBQVAsT0FBTyxDQUFLO29CQUNaLFdBQU0sR0FBTixNQUFNLENBQWdCO29CQUxsQyxVQUFLLEdBQVcsQ0FBQyxDQUFDO29CQU94QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUM7Z0JBQ2pDLENBQUM7Z0JBRU8sd0NBQWMsR0FBdEIsVUFBdUIsZUFBd0I7b0JBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5QixDQUFDO2dCQUVTLCtCQUFLLEdBQWYsVUFBZ0IsS0FBUTtvQkFDdEIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUM7d0JBQ0gsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQy9FLENBQUU7b0JBQUEsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDYixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDNUIsTUFBTSxDQUFDO29CQUNULENBQUM7b0JBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNaLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzdCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFUyxtQ0FBUyxHQUFuQjtvQkFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QixDQUFDO2dCQUNILHNCQUFDO1lBQUQsQ0FqQ0EsQUFpQ0MsQ0FqQ2dDLHVCQUFVLEdBaUMxQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vcGVyYXRvci9ldmVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BlcmF0b3J9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7T2JzZXJ2ZXJ9IGZyb20gJy4uL09ic2VydmVyJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG4vKipcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZXRoZXIgb3Igbm90IGV2ZXJ5IGl0ZW0gb2YgdGhlIHNvdXJjZSBzYXRpc2ZpZXMgdGhlIGNvbmRpdGlvbiBzcGVjaWZpZWQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwcmVkaWNhdGUgYSBmdW5jdGlvbiBmb3IgZGV0ZXJtaW5pbmcgaWYgYW4gaXRlbSBtZWV0cyBhIHNwZWNpZmllZCBjb25kaXRpb24uXG4gKiBAcGFyYW0ge2FueX0gW3RoaXNBcmddIG9wdGlvbmFsIG9iamVjdCB0byB1c2UgZm9yIGB0aGlzYCBpbiB0aGUgY2FsbGJhY2tcbiAqIEByZXR1cm4ge09ic2VydmFibGV9IGFuIE9ic2VydmFibGUgb2YgYm9vbGVhbnMgdGhhdCBkZXRlcm1pbmVzIGlmIGFsbCBpdGVtcyBvZiB0aGUgc291cmNlIE9ic2VydmFibGUgbWVldCB0aGUgY29uZGl0aW9uIHNwZWNpZmllZC5cbiAqIEBtZXRob2QgZXZlcnlcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBldmVyeTxUPihwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBib29sZWFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNBcmc/OiBhbnkpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgRXZlcnlPcGVyYXRvcihwcmVkaWNhdGUsIHRoaXNBcmcsIHRoaXMpKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFdmVyeVNpZ25hdHVyZTxUPiB7XG4gIChwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBib29sZWFuLCB0aGlzQXJnPzogYW55KTogT2JzZXJ2YWJsZTxib29sZWFuPjtcbn1cblxuY2xhc3MgRXZlcnlPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIGJvb2xlYW4+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBib29sZWFuLFxuICAgICAgICAgICAgICBwcml2YXRlIHRoaXNBcmc/OiBhbnksXG4gICAgICAgICAgICAgIHByaXZhdGUgc291cmNlPzogT2JzZXJ2YWJsZTxUPikge1xuICB9XG5cbiAgY2FsbChvYnNlcnZlcjogU3Vic2NyaWJlcjxib29sZWFuPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgRXZlcnlTdWJzY3JpYmVyKG9ic2VydmVyLCB0aGlzLnByZWRpY2F0ZSwgdGhpcy50aGlzQXJnLCB0aGlzLnNvdXJjZSkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBFdmVyeVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogT2JzZXJ2ZXI8Ym9vbGVhbj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0aGlzQXJnOiBhbnksXG4gICAgICAgICAgICAgIHByaXZhdGUgc291cmNlPzogT2JzZXJ2YWJsZTxUPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnIHx8IHRoaXM7XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeUNvbXBsZXRlKGV2ZXJ5VmFsdWVNYXRjaDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChldmVyeVZhbHVlTWF0Y2gpO1xuICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5wcmVkaWNhdGUuY2FsbCh0aGlzLnRoaXNBcmcsIHZhbHVlLCB0aGlzLmluZGV4KyssIHRoaXMuc291cmNlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgdGhpcy5ub3RpZnlDb21wbGV0ZShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLm5vdGlmeUNvbXBsZXRlKHRydWUpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
