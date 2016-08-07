System.register(['../observable/ArrayObservable', '../util/isArray', '../Subscriber', '../OuterSubscriber', '../util/subscribeToResult', '../symbol/iterator'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ArrayObservable_1, isArray_1, Subscriber_1, OuterSubscriber_1, subscribeToResult_1, iterator_1;
    var ZipOperator, ZipSubscriber, StaticIterator, StaticArrayIterator, ZipBufferIterator;
    /**
     * @param observables
     * @return {Observable<R>}
     * @method zip
     * @owner Observable
     */
    function zipProto() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i - 0] = arguments[_i];
        }
        observables.unshift(this);
        return zipStatic.apply(this, observables);
    }
    exports_1("zipProto", zipProto);
    /* tslint:enable:max-line-length */
    /**
     * @param observables
     * @return {Observable<R>}
     * @static true
     * @name zip
     * @owner Observable
     */
    function zipStatic() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i - 0] = arguments[_i];
        }
        var project = observables[observables.length - 1];
        if (typeof project === 'function') {
            observables.pop();
        }
        return new ArrayObservable_1.ArrayObservable(observables).lift(new ZipOperator(project));
    }
    exports_1("zipStatic", zipStatic);
    return {
        setters:[
            function (ArrayObservable_1_1) {
                ArrayObservable_1 = ArrayObservable_1_1;
            },
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            },
            function (iterator_1_1) {
                iterator_1 = iterator_1_1;
            }],
        execute: function() {
            ZipOperator = (function () {
                function ZipOperator(project) {
                    this.project = project;
                }
                ZipOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new ZipSubscriber(subscriber, this.project));
                };
                return ZipOperator;
            }());
            exports_1("ZipOperator", ZipOperator);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ZipSubscriber = (function (_super) {
                __extends(ZipSubscriber, _super);
                function ZipSubscriber(destination, project, values) {
                    if (values === void 0) { values = Object.create(null); }
                    _super.call(this, destination);
                    this.index = 0;
                    this.iterators = [];
                    this.active = 0;
                    this.project = (typeof project === 'function') ? project : null;
                    this.values = values;
                }
                ZipSubscriber.prototype._next = function (value) {
                    var iterators = this.iterators;
                    var index = this.index++;
                    if (isArray_1.isArray(value)) {
                        iterators.push(new StaticArrayIterator(value));
                    }
                    else if (typeof value[iterator_1.$$iterator] === 'function') {
                        iterators.push(new StaticIterator(value[iterator_1.$$iterator]()));
                    }
                    else {
                        iterators.push(new ZipBufferIterator(this.destination, this, value, index));
                    }
                };
                ZipSubscriber.prototype._complete = function () {
                    var iterators = this.iterators;
                    var len = iterators.length;
                    this.active = len;
                    for (var i = 0; i < len; i++) {
                        var iterator = iterators[i];
                        if (iterator.stillUnsubscribed) {
                            this.add(iterator.subscribe(iterator, i));
                        }
                        else {
                            this.active--; // not an observable
                        }
                    }
                };
                ZipSubscriber.prototype.notifyInactive = function () {
                    this.active--;
                    if (this.active === 0) {
                        this.destination.complete();
                    }
                };
                ZipSubscriber.prototype.checkIterators = function () {
                    var iterators = this.iterators;
                    var len = iterators.length;
                    var destination = this.destination;
                    // abort if not all of them have values
                    for (var i = 0; i < len; i++) {
                        var iterator = iterators[i];
                        if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
                            return;
                        }
                    }
                    var shouldComplete = false;
                    var args = [];
                    for (var i = 0; i < len; i++) {
                        var iterator = iterators[i];
                        var result = iterator.next();
                        // check to see if it's completed now that you've gotten
                        // the next value.
                        if (iterator.hasCompleted()) {
                            shouldComplete = true;
                        }
                        if (result.done) {
                            destination.complete();
                            return;
                        }
                        args.push(result.value);
                    }
                    if (this.project) {
                        this._tryProject(args);
                    }
                    else {
                        destination.next(args);
                    }
                    if (shouldComplete) {
                        destination.complete();
                    }
                };
                ZipSubscriber.prototype._tryProject = function (args) {
                    var result;
                    try {
                        result = this.project.apply(this, args);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.destination.next(result);
                };
                return ZipSubscriber;
            }(Subscriber_1.Subscriber));
            exports_1("ZipSubscriber", ZipSubscriber);
            StaticIterator = (function () {
                function StaticIterator(iterator) {
                    this.iterator = iterator;
                    this.nextResult = iterator.next();
                }
                StaticIterator.prototype.hasValue = function () {
                    return true;
                };
                StaticIterator.prototype.next = function () {
                    var result = this.nextResult;
                    this.nextResult = this.iterator.next();
                    return result;
                };
                StaticIterator.prototype.hasCompleted = function () {
                    var nextResult = this.nextResult;
                    return nextResult && nextResult.done;
                };
                return StaticIterator;
            }());
            StaticArrayIterator = (function () {
                function StaticArrayIterator(array) {
                    this.array = array;
                    this.index = 0;
                    this.length = 0;
                    this.length = array.length;
                }
                StaticArrayIterator.prototype[iterator_1.$$iterator] = function () {
                    return this;
                };
                StaticArrayIterator.prototype.next = function (value) {
                    var i = this.index++;
                    var array = this.array;
                    return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
                };
                StaticArrayIterator.prototype.hasValue = function () {
                    return this.array.length > this.index;
                };
                StaticArrayIterator.prototype.hasCompleted = function () {
                    return this.array.length === this.index;
                };
                return StaticArrayIterator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ZipBufferIterator = (function (_super) {
                __extends(ZipBufferIterator, _super);
                function ZipBufferIterator(destination, parent, observable, index) {
                    _super.call(this, destination);
                    this.parent = parent;
                    this.observable = observable;
                    this.index = index;
                    this.stillUnsubscribed = true;
                    this.buffer = [];
                    this.isComplete = false;
                }
                ZipBufferIterator.prototype[iterator_1.$$iterator] = function () {
                    return this;
                };
                // NOTE: there is actually a name collision here with Subscriber.next and Iterator.next
                //    this is legit because `next()` will never be called by a subscription in this case.
                ZipBufferIterator.prototype.next = function () {
                    var buffer = this.buffer;
                    if (buffer.length === 0 && this.isComplete) {
                        return { value: null, done: true };
                    }
                    else {
                        return { value: buffer.shift(), done: false };
                    }
                };
                ZipBufferIterator.prototype.hasValue = function () {
                    return this.buffer.length > 0;
                };
                ZipBufferIterator.prototype.hasCompleted = function () {
                    return this.buffer.length === 0 && this.isComplete;
                };
                ZipBufferIterator.prototype.notifyComplete = function () {
                    if (this.buffer.length > 0) {
                        this.isComplete = true;
                        this.parent.notifyInactive();
                    }
                    else {
                        this.destination.complete();
                    }
                };
                ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.buffer.push(innerValue);
                    this.parent.checkIterators();
                };
                ZipBufferIterator.prototype.subscribe = function (value, index) {
                    return subscribeToResult_1.subscribeToResult(this, this.observable, this, index);
                };
                return ZipBufferIterator;
            }(OuterSubscriber_1.OuterSubscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3ppcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBV0E7Ozs7O09BS0c7SUFDSDtRQUE0QixxQkFBNEU7YUFBNUUsV0FBNEUsQ0FBNUUsc0JBQTRFLENBQTVFLElBQTRFO1lBQTVFLG9DQUE0RTs7UUFDdEcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUhELCtCQUdDLENBQUE7SUE2Q0QsbUNBQW1DO0lBRW5DOzs7Ozs7T0FNRztJQUNIO1FBQWdDLHFCQUE0RTthQUE1RSxXQUE0RSxDQUE1RSxzQkFBNEUsQ0FBNUUsSUFBNEU7WUFBNUUsb0NBQTRFOztRQUMxRyxJQUFNLE9BQU8sR0FBZ0MsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakYsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLGlDQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQU5ELGlDQU1DLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFFRDtnQkFJRSxxQkFBWSxPQUFzQztvQkFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRUQsMEJBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztvQkFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFP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QUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDckQsQ0FBQztnQkFFRCwwQ0FBYyxHQUFkO29CQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO3dCQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUMvQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzlCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxzQ0FBVSxHQUFWLFVBQVcsVUFBYSxFQUFFLFVBQWUsRUFDOUIsVUFBa0IsRUFBRSxVQUFrQixFQUN0QyxRQUErQjtvQkFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQy9CLENBQUM7Z0JBRUQscUNBQVMsR0FBVCxVQUFVLEtBQVUsRUFBRSxLQUFhO29CQUNqQyxNQUFNLENBQUMscUNBQWlCLENBQVcsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN6RSxDQUFDO2dCQUNILHdCQUFDO1lBQUQsQ0F0REEsQUFzREMsQ0F0RHFDLGlDQUFlLEdBc0RwRCIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vcGVyYXRvci96aXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGUsIE9ic2VydmFibGVJbnB1dH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge0FycmF5T2JzZXJ2YWJsZX0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9BcnJheU9ic2VydmFibGUnO1xuaW1wb3J0IHtpc0FycmF5fSBmcm9tICcuLi91dGlsL2lzQXJyYXknO1xuaW1wb3J0IHtPcGVyYXRvcn0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHtQYXJ0aWFsT2JzZXJ2ZXJ9IGZyb20gJy4uL09ic2VydmVyJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge091dGVyU3Vic2NyaWJlcn0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7SW5uZXJTdWJzY3JpYmVyfSBmcm9tICcuLi9Jbm5lclN1YnNjcmliZXInO1xuaW1wb3J0IHtzdWJzY3JpYmVUb1Jlc3VsdH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5pbXBvcnQgeyQkaXRlcmF0b3J9IGZyb20gJy4uL3N5bWJvbC9pdGVyYXRvcic7XG5cbi8qKlxuICogQHBhcmFtIG9ic2VydmFibGVzXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFI+fVxuICogQG1ldGhvZCB6aXBcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6aXBQcm90bzxSPiguLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PGFueT4gfCAoKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUik+KTogT2JzZXJ2YWJsZTxSPiB7XG4gIG9ic2VydmFibGVzLnVuc2hpZnQodGhpcyk7XG4gIHJldHVybiB6aXBTdGF0aWMuYXBwbHkodGhpcywgb2JzZXJ2YWJsZXMpO1xufVxuXG4vKiB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbmV4cG9ydCBpbnRlcmZhY2UgWmlwU2lnbmF0dXJlPFQ+IHtcbiAgPFI+KHByb2plY3Q6ICh2MTogVCkgPT4gUik6IE9ic2VydmFibGU8Uj47XG4gIDxUMiwgUj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyKSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbiAgPFQyLCBUMywgUj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzKSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbiAgPFQyLCBUMywgVDQsIFI+KHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCkgPT4gUik6IE9ic2VydmFibGU8Uj47XG4gIDxUMiwgVDMsIFQ0LCBUNSwgUj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgdjU6IFQ1KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbiAgPFQyLCBUMywgVDQsIFQ1LCBUNiwgUj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHY2OiBPYnNlcnZhYmxlSW5wdXQ8VDY+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgdjY6IFQ2KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcblxuICA8VDI+KHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+KTogT2JzZXJ2YWJsZTxbVCwgVDJdPjtcbiAgPFQyLCBUMz4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+KTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzXT47XG4gIDxUMiwgVDMsIFQ0Pih2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+KTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNF0+O1xuICA8VDIsIFQzLCBUNCwgVDU+KHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+KTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNCwgVDVdPjtcbiAgPFQyLCBUMywgVDQsIFQ1LCBUNj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHY2OiBPYnNlcnZhYmxlSW5wdXQ8VDY+KTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNCwgVDUsIFQ2XT47XG5cbiAgPFI+KC4uLm9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8VD4gfCAoKC4uLnZhbHVlczogQXJyYXk8VD4pID0+IFIpPik6IE9ic2VydmFibGU8Uj47XG4gIDxSPihhcnJheTogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PFQ+Pik6IE9ic2VydmFibGU8Uj47XG4gIDxUT3RoZXIsIFI+KGFycmF5OiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8VE90aGVyPj4sIHByb2plY3Q6ICh2MTogVCwgLi4udmFsdWVzOiBBcnJheTxUT3RoZXI+KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbn1cbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBUMj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4pOiBPYnNlcnZhYmxlPFtULCBUMl0+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBUMiwgVDM+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPik6IE9ic2VydmFibGU8W1QsIFQyLCBUM10+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBUMiwgVDMsIFQ0Pih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+KTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNF0+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBUMiwgVDMsIFQ0LCBUNT4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4pOiBPYnNlcnZhYmxlPFtULCBUMiwgVDMsIFQ0LCBUNV0+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBUMiwgVDMsIFQ0LCBUNSwgVDY+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+LCB2NjogT2JzZXJ2YWJsZUlucHV0PFQ2Pik6IE9ic2VydmFibGU8W1QsIFQyLCBUMywgVDQsIFQ1LCBUNl0+O1xuXG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHByb2plY3Q6ICh2MTogVCkgPT4gUik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFQyLCBSPih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIpID0+IFIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBUMiwgVDMsIFI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMykgPT4gUik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFQyLCBUMywgVDQsIFI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCkgPT4gUik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFQyLCBUMywgVDQsIFQ1LCBSPih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCB2NTogT2JzZXJ2YWJsZUlucHV0PFQ1PiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUpID0+IFIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+LCB2NjogT2JzZXJ2YWJsZUlucHV0PFQ2PiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUsIHY2OiBUNikgPT4gUik6IE9ic2VydmFibGU8Uj47XG5cbmV4cG9ydCBmdW5jdGlvbiB6aXBTdGF0aWM8VD4oYXJyYXk6IE9ic2VydmFibGVJbnB1dDxUPltdKTogT2JzZXJ2YWJsZTxUW10+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxSPihhcnJheTogT2JzZXJ2YWJsZUlucHV0PGFueT5bXSk6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFI+KGFycmF5OiBPYnNlcnZhYmxlSW5wdXQ8VD5bXSwgcHJvamVjdDogKC4uLnZhbHVlczogQXJyYXk8VD4pID0+IFIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxSPihhcnJheTogT2JzZXJ2YWJsZUlucHV0PGFueT5bXSwgcHJvamVjdDogKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUik6IE9ic2VydmFibGU8Uj47XG5cbmV4cG9ydCBmdW5jdGlvbiB6aXBTdGF0aWM8VD4oLi4ub2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGVJbnB1dDxUPj4pOiBPYnNlcnZhYmxlPFRbXT47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFQsIFI+KC4uLm9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8VD4gfCAoKC4uLnZhbHVlczogQXJyYXk8VD4pID0+IFIpPik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gemlwU3RhdGljPFI+KC4uLm9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8YW55PiB8ICgoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSKT4pOiBPYnNlcnZhYmxlPFI+O1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cblxuLyoqXG4gKiBAcGFyYW0gb2JzZXJ2YWJsZXNcbiAqIEByZXR1cm4ge09ic2VydmFibGU8Uj59XG4gKiBAc3RhdGljIHRydWVcbiAqIEBuYW1lIHppcFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHppcFN0YXRpYzxULCBSPiguLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PGFueT4gfCAoKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUik+KTogT2JzZXJ2YWJsZTxSPiB7XG4gIGNvbnN0IHByb2plY3QgPSA8KCguLi55czogQXJyYXk8YW55PikgPT4gUik+IG9ic2VydmFibGVzW29ic2VydmFibGVzLmxlbmd0aCAtIDFdO1xuICBpZiAodHlwZW9mIHByb2plY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvYnNlcnZhYmxlcy5wb3AoKTtcbiAgfVxuICByZXR1cm4gbmV3IEFycmF5T2JzZXJ2YWJsZShvYnNlcnZhYmxlcykubGlmdChuZXcgWmlwT3BlcmF0b3IocHJvamVjdCkpO1xufVxuXG5leHBvcnQgY2xhc3MgWmlwT3BlcmF0b3I8VCwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBSPiB7XG5cbiAgcHJvamVjdDogKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUjtcblxuICBjb25zdHJ1Y3Rvcihwcm9qZWN0PzogKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUikge1xuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Uj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IFppcFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5wcm9qZWN0KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBaaXBTdWJzY3JpYmVyPFQsIFI+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgaW5kZXggPSAwO1xuICBwcml2YXRlIHZhbHVlczogYW55O1xuICBwcml2YXRlIHByb2plY3Q6ICguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFI7XG4gIHByaXZhdGUgaXRlcmF0b3JzOiBMb29rQWhlYWRJdGVyYXRvcjxhbnk+W10gPSBbXTtcbiAgcHJpdmF0ZSBhY3RpdmUgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFI+LFxuICAgICAgICAgICAgICBwcm9qZWN0PzogKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUixcbiAgICAgICAgICAgICAgdmFsdWVzOiBhbnkgPSBPYmplY3QuY3JlYXRlKG51bGwpKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMucHJvamVjdCA9ICh0eXBlb2YgcHJvamVjdCA9PT0gJ2Z1bmN0aW9uJykgPyBwcm9qZWN0IDogbnVsbDtcbiAgICB0aGlzLnZhbHVlcyA9IHZhbHVlcztcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogYW55KSB7XG4gICAgY29uc3QgaXRlcmF0b3JzID0gdGhpcy5pdGVyYXRvcnM7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4Kys7XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBpdGVyYXRvcnMucHVzaChuZXcgU3RhdGljQXJyYXlJdGVyYXRvcih2YWx1ZSkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlWyQkaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpdGVyYXRvcnMucHVzaChuZXcgU3RhdGljSXRlcmF0b3IodmFsdWVbJCRpdGVyYXRvcl0oKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVyYXRvcnMucHVzaChuZXcgWmlwQnVmZmVySXRlcmF0b3IodGhpcy5kZXN0aW5hdGlvbiwgdGhpcywgdmFsdWUsIGluZGV4KSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpIHtcbiAgICBjb25zdCBpdGVyYXRvcnMgPSB0aGlzLml0ZXJhdG9ycztcbiAgICBjb25zdCBsZW4gPSBpdGVyYXRvcnMubGVuZ3RoO1xuICAgIHRoaXMuYWN0aXZlID0gbGVuO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBpdGVyYXRvcjogWmlwQnVmZmVySXRlcmF0b3I8YW55LCBhbnk+ID0gPGFueT5pdGVyYXRvcnNbaV07XG4gICAgICBpZiAoaXRlcmF0b3Iuc3RpbGxVbnN1YnNjcmliZWQpIHtcbiAgICAgICAgdGhpcy5hZGQoaXRlcmF0b3Iuc3Vic2NyaWJlKGl0ZXJhdG9yLCBpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFjdGl2ZS0tOyAvLyBub3QgYW4gb2JzZXJ2YWJsZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5vdGlmeUluYWN0aXZlKCkge1xuICAgIHRoaXMuYWN0aXZlLS07XG4gICAgaWYgKHRoaXMuYWN0aXZlID09PSAwKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tJdGVyYXRvcnMoKSB7XG4gICAgY29uc3QgaXRlcmF0b3JzID0gdGhpcy5pdGVyYXRvcnM7XG4gICAgY29uc3QgbGVuID0gaXRlcmF0b3JzLmxlbmd0aDtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG5cbiAgICAvLyBhYm9ydCBpZiBub3QgYWxsIG9mIHRoZW0gaGF2ZSB2YWx1ZXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgaXRlcmF0b3IgPSBpdGVyYXRvcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGl0ZXJhdG9yLmhhc1ZhbHVlID09PSAnZnVuY3Rpb24nICYmICFpdGVyYXRvci5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgc2hvdWxkQ29tcGxldGUgPSBmYWxzZTtcbiAgICBjb25zdCBhcmdzOiBhbnlbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBpdGVyYXRvciA9IGl0ZXJhdG9yc1tpXTtcbiAgICAgIGxldCByZXN1bHQgPSBpdGVyYXRvci5uZXh0KCk7XG5cbiAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiBpdCdzIGNvbXBsZXRlZCBub3cgdGhhdCB5b3UndmUgZ290dGVuXG4gICAgICAvLyB0aGUgbmV4dCB2YWx1ZS5cbiAgICAgIGlmIChpdGVyYXRvci5oYXNDb21wbGV0ZWQoKSkge1xuICAgICAgICBzaG91bGRDb21wbGV0ZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHQuZG9uZSkge1xuICAgICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFyZ3MucHVzaChyZXN1bHQudmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb2plY3QpIHtcbiAgICAgIHRoaXMuX3RyeVByb2plY3QoYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3RpbmF0aW9uLm5leHQoYXJncyk7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZENvbXBsZXRlKSB7XG4gICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfdHJ5UHJvamVjdChhcmdzOiBhbnlbXSkge1xuICAgIGxldCByZXN1bHQ6IGFueTtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gdGhpcy5wcm9qZWN0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQocmVzdWx0KTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgTG9va0FoZWFkSXRlcmF0b3I8VD4gZXh0ZW5kcyBJdGVyYXRvcjxUPiB7XG4gIGhhc1ZhbHVlKCk6IGJvb2xlYW47XG4gIGhhc0NvbXBsZXRlZCgpOiBib29sZWFuO1xufVxuXG5jbGFzcyBTdGF0aWNJdGVyYXRvcjxUPiBpbXBsZW1lbnRzIExvb2tBaGVhZEl0ZXJhdG9yPFQ+IHtcbiAgcHJpdmF0ZSBuZXh0UmVzdWx0OiBJdGVyYXRvclJlc3VsdDxUPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZXJhdG9yOiBJdGVyYXRvcjxUPikge1xuICAgIHRoaXMubmV4dFJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgfVxuXG4gIGhhc1ZhbHVlKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbmV4dCgpOiBJdGVyYXRvclJlc3VsdDxUPiB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5uZXh0UmVzdWx0O1xuICAgIHRoaXMubmV4dFJlc3VsdCA9IHRoaXMuaXRlcmF0b3IubmV4dCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBoYXNDb21wbGV0ZWQoKSB7XG4gICAgY29uc3QgbmV4dFJlc3VsdCA9IHRoaXMubmV4dFJlc3VsdDtcbiAgICByZXR1cm4gbmV4dFJlc3VsdCAmJiBuZXh0UmVzdWx0LmRvbmU7XG4gIH1cbn1cblxuY2xhc3MgU3RhdGljQXJyYXlJdGVyYXRvcjxUPiBpbXBsZW1lbnRzIExvb2tBaGVhZEl0ZXJhdG9yPFQ+IHtcbiAgcHJpdmF0ZSBpbmRleCA9IDA7XG4gIHByaXZhdGUgbGVuZ3RoID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFycmF5OiBUW10pIHtcbiAgICB0aGlzLmxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgfVxuXG4gIFskJGl0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG5leHQodmFsdWU/OiBhbnkpOiBJdGVyYXRvclJlc3VsdDxUPiB7XG4gICAgY29uc3QgaSA9IHRoaXMuaW5kZXgrKztcbiAgICBjb25zdCBhcnJheSA9IHRoaXMuYXJyYXk7XG4gICAgcmV0dXJuIGkgPCB0aGlzLmxlbmd0aCA/IHsgdmFsdWU6IGFycmF5W2ldLCBkb25lOiBmYWxzZSB9IDogeyB2YWx1ZTogbnVsbCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgaGFzVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXJyYXkubGVuZ3RoID4gdGhpcy5pbmRleDtcbiAgfVxuXG4gIGhhc0NvbXBsZXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5hcnJheS5sZW5ndGggPT09IHRoaXMuaW5kZXg7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIFppcEJ1ZmZlckl0ZXJhdG9yPFQsIFI+IGV4dGVuZHMgT3V0ZXJTdWJzY3JpYmVyPFQsIFI+IGltcGxlbWVudHMgTG9va0FoZWFkSXRlcmF0b3I8VD4ge1xuICBzdGlsbFVuc3Vic2NyaWJlZCA9IHRydWU7XG4gIGJ1ZmZlcjogVFtdID0gW107XG4gIGlzQ29tcGxldGUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogUGFydGlhbE9ic2VydmVyPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIHBhcmVudDogWmlwU3Vic2NyaWJlcjxULCBSPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGluZGV4OiBudW1iZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBbJCRpdGVyYXRvcl0oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBOT1RFOiB0aGVyZSBpcyBhY3R1YWxseSBhIG5hbWUgY29sbGlzaW9uIGhlcmUgd2l0aCBTdWJzY3JpYmVyLm5leHQgYW5kIEl0ZXJhdG9yLm5leHRcbiAgLy8gICAgdGhpcyBpcyBsZWdpdCBiZWNhdXNlIGBuZXh0KClgIHdpbGwgbmV2ZXIgYmUgY2FsbGVkIGJ5IGEgc3Vic2NyaXB0aW9uIGluIHRoaXMgY2FzZS5cbiAgbmV4dCgpOiBJdGVyYXRvclJlc3VsdDxUPiB7XG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDAgJiYgdGhpcy5pc0NvbXBsZXRlKSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogbnVsbCwgZG9uZTogdHJ1ZSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4geyB2YWx1ZTogYnVmZmVyLnNoaWZ0KCksIGRvbmU6IGZhbHNlIH07XG4gICAgfVxuICB9XG5cbiAgaGFzVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVmZmVyLmxlbmd0aCA+IDA7XG4gIH1cblxuICBoYXNDb21wbGV0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVmZmVyLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmlzQ29tcGxldGU7XG4gIH1cblxuICBub3RpZnlDb21wbGV0ZSgpIHtcbiAgICBpZiAodGhpcy5idWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5pc0NvbXBsZXRlID0gdHJ1ZTtcbiAgICAgIHRoaXMucGFyZW50Lm5vdGlmeUluYWN0aXZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IGFueSxcbiAgICAgICAgICAgICBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICBpbm5lclN1YjogSW5uZXJTdWJzY3JpYmVyPFQsIFI+KTogdm9pZCB7XG4gICAgdGhpcy5idWZmZXIucHVzaChpbm5lclZhbHVlKTtcbiAgICB0aGlzLnBhcmVudC5jaGVja0l0ZXJhdG9ycygpO1xuICB9XG5cbiAgc3Vic2NyaWJlKHZhbHVlOiBhbnksIGluZGV4OiBudW1iZXIpIHtcbiAgICByZXR1cm4gc3Vic2NyaWJlVG9SZXN1bHQ8YW55LCBhbnk+KHRoaXMsIHRoaXMub2JzZXJ2YWJsZSwgdGhpcywgaW5kZXgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
