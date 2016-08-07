System.register(['../Observable', './EmptyObservable', '../util/isArray', '../util/subscribeToResult', '../OuterSubscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1, EmptyObservable_1, isArray_1, subscribeToResult_1, OuterSubscriber_1;
    var ForkJoinObservable, ForkJoinSubscriber;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (EmptyObservable_1_1) {
                EmptyObservable_1 = EmptyObservable_1_1;
            },
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            }],
        execute: function() {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            ForkJoinObservable = (function (_super) {
                __extends(ForkJoinObservable, _super);
                function ForkJoinObservable(sources, resultSelector) {
                    _super.call(this);
                    this.sources = sources;
                    this.resultSelector = resultSelector;
                }
                /* tslint:enable:max-line-length */
                /**
                 * @param sources
                 * @return {any}
                 * @static true
                 * @name forkJoin
                 * @owner Observable
                 */
                ForkJoinObservable.create = function () {
                    var sources = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        sources[_i - 0] = arguments[_i];
                    }
                    if (sources === null || arguments.length === 0) {
                        return new EmptyObservable_1.EmptyObservable();
                    }
                    var resultSelector = null;
                    if (typeof sources[sources.length - 1] === 'function') {
                        resultSelector = sources.pop();
                    }
                    // if the first and only other argument besides the resultSelector is an array
                    // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
                    if (sources.length === 1 && isArray_1.isArray(sources[0])) {
                        sources = sources[0];
                    }
                    if (sources.length === 0) {
                        return new EmptyObservable_1.EmptyObservable();
                    }
                    return new ForkJoinObservable(sources, resultSelector);
                };
                ForkJoinObservable.prototype._subscribe = function (subscriber) {
                    return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
                };
                return ForkJoinObservable;
            }(Observable_1.Observable));
            exports_1("ForkJoinObservable", ForkJoinObservable);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ForkJoinSubscriber = (function (_super) {
                __extends(ForkJoinSubscriber, _super);
                function ForkJoinSubscriber(destination, sources, resultSelector) {
                    _super.call(this, destination);
                    this.sources = sources;
                    this.resultSelector = resultSelector;
                    this.completed = 0;
                    this.haveValues = 0;
                    var len = sources.length;
                    this.total = len;
                    this.values = new Array(len);
                    for (var i = 0; i < len; i++) {
                        var source = sources[i];
                        var innerSubscription = subscribeToResult_1.subscribeToResult(this, source, null, i);
                        if (innerSubscription) {
                            innerSubscription.outerIndex = i;
                            this.add(innerSubscription);
                        }
                    }
                }
                ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.values[outerIndex] = innerValue;
                    if (!innerSub._hasValue) {
                        innerSub._hasValue = true;
                        this.haveValues++;
                    }
                };
                ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
                    var destination = this.destination;
                    var _a = this, haveValues = _a.haveValues, resultSelector = _a.resultSelector, values = _a.values;
                    var len = values.length;
                    if (!innerSub._hasValue) {
                        destination.complete();
                        return;
                    }
                    this.completed++;
                    if (this.completed !== len) {
                        return;
                    }
                    if (haveValues === len) {
                        var value = resultSelector ? resultSelector.apply(this, values) : values;
                        destination.next(value);
                    }
                    destination.complete();
                };
                return ForkJoinSubscriber;
            }(OuterSubscriber_1.OuterSubscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvRm9ya0pvaW5PYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQTs7OztlQUlHO1lBQ0g7Z0JBQTJDLHNDQUFhO2dCQUN0RCw0QkFBb0IsT0FBMEMsRUFDMUMsY0FBNkM7b0JBQy9ELGlCQUFPLENBQUM7b0JBRlUsWUFBTyxHQUFQLE9BQU8sQ0FBbUM7b0JBQzFDLG1CQUFjLEdBQWQsY0FBYyxDQUErQjtnQkFFakUsQ0FBQztnQkFtQkQsbUNBQW1DO2dCQUNuQzs7Ozs7O21CQU1HO2dCQUNJLHlCQUFNLEdBQWI7b0JBQWlCLGlCQUVnRDt5QkFGaEQsV0FFZ0QsQ0FGaEQsc0JBRWdELENBRmhELElBRWdEO3dCQUZoRCxnQ0FFZ0Q7O29CQUMvRCxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0MsTUFBTSxDQUFDLElBQUksaUNBQWUsRUFBSyxDQUFDO29CQUNsQyxDQUFDO29CQUVELElBQUksY0FBYyxHQUFtQyxJQUFJLENBQUM7b0JBQzFELEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQzt3QkFDdEQsY0FBYyxHQUFtQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ2pFLENBQUM7b0JBRUQsOEVBQThFO29CQUM5RSw4RUFBOEU7b0JBQzlFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLGlCQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoRCxPQUFPLEdBQXNDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUQsQ0FBQztvQkFF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VUFBVSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLElBQU0sS0FBSyxHQUFHLGNBQWMsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7d0JBQzNFLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzFCLENBQUM7b0JBRUQsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUNILHlCQUFDO1lBQUQsQ0EzREEsQUEyREMsQ0EzRG1DLGlDQUFlLEdBMkRsRCIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vYnNlcnZhYmxlL0ZvcmtKb2luT2JzZXJ2YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaWJhYmxlT3JQcm9taXNlfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7RW1wdHlPYnNlcnZhYmxlfSBmcm9tICcuL0VtcHR5T2JzZXJ2YWJsZSc7XG5pbXBvcnQge2lzQXJyYXl9IGZyb20gJy4uL3V0aWwvaXNBcnJheSc7XG5cbmltcG9ydCB7c3Vic2NyaWJlVG9SZXN1bHR9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuaW1wb3J0IHtPdXRlclN1YnNjcmliZXJ9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQge0lubmVyU3Vic2NyaWJlcn0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBGb3JrSm9pbk9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzb3VyY2VzOiBBcnJheTxTdWJzY3JpYmFibGVPclByb21pc2U8YW55Pj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVzdWx0U2VsZWN0b3I/OiAoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBUKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyPih2MTogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ+LCB2MjogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQyPik6IE9ic2VydmFibGU8W1QsIFQyXT47XG4gIHN0YXRpYyBjcmVhdGU8VCwgVDIsIFQzPih2MTogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ+LCB2MjogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQyPiwgdjM6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUMz4pOiBPYnNlcnZhYmxlPFtULCBUMiwgVDNdPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFQ0Pih2MTogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ+LCB2MjogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQyPiwgdjM6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUMz4sIHY0OiBTdWJzY3JpYmFibGVPclByb21pc2U8VDQ+KTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNF0+O1xuICBzdGF0aWMgY3JlYXRlPFQsIFQyLCBUMywgVDQsIFQ1Pih2MTogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ+LCB2MjogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQyPiwgdjM6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUMz4sIHY0OiBTdWJzY3JpYmFibGVPclByb21pc2U8VDQ+LCB2NTogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ1Pik6IE9ic2VydmFibGU8W1QsIFQyLCBUMywgVDQsIFQ1XT47XG4gIHN0YXRpYyBjcmVhdGU8VCwgVDIsIFQzLCBUNCwgVDUsIFQ2Pih2MTogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ+LCB2MjogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQyPiwgdjM6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUMz4sIHY0OiBTdWJzY3JpYmFibGVPclByb21pc2U8VDQ+LCB2NTogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ1PiwgdjY6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUNj4pOiBPYnNlcnZhYmxlPFtULCBUMiwgVDMsIFQ0LCBUNSwgVDZdPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgUj4odjE6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUPiwgdjI6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUMj4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyKSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFI+KHYxOiBTdWJzY3JpYmFibGVPclByb21pc2U8VD4sIHYyOiBTdWJzY3JpYmFibGVPclByb21pc2U8VDI+LCB2MzogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQzPiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMykgPT4gUik6IE9ic2VydmFibGU8Uj47XG4gIHN0YXRpYyBjcmVhdGU8VCwgVDIsIFQzLCBUNCwgUj4odjE6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUPiwgdjI6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUMj4sIHYzOiBTdWJzY3JpYmFibGVPclByb21pc2U8VDM+LCB2NDogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ0PiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFQ0LCBUNSwgUj4odjE6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUPiwgdjI6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUMj4sIHYzOiBTdWJzY3JpYmFibGVPclByb21pc2U8VDM+LCB2NDogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ0PiwgdjU6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUNT4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgdjU6IFQ1KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxULCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFI+KHYxOiBTdWJzY3JpYmFibGVPclByb21pc2U8VD4sIHYyOiBTdWJzY3JpYmFibGVPclByb21pc2U8VDI+LCB2MzogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQzPiwgdjQ6IFN1YnNjcmliYWJsZU9yUHJvbWlzZTxUND4sIHY1OiBTdWJzY3JpYmFibGVPclByb21pc2U8VDU+LCB2NjogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ2PiwgcHJvamVjdDogKHYxOiBULCB2MjogVDIsIHYzOiBUMywgdjQ6IFQ0LCB2NTogVDUsIHY2OiBUNikgPT4gUik6IE9ic2VydmFibGU8Uj47XG4gIHN0YXRpYyBjcmVhdGU8VD4oc291cmNlczogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ+W10pOiBPYnNlcnZhYmxlPFRbXT47XG4gIHN0YXRpYyBjcmVhdGU8Uj4oc291cmNlczogU3Vic2NyaWJhYmxlT3JQcm9taXNlPGFueT5bXSk6IE9ic2VydmFibGU8Uj47XG4gIHN0YXRpYyBjcmVhdGU8VCwgUj4oc291cmNlczogU3Vic2NyaWJhYmxlT3JQcm9taXNlPFQ+W10sIHByb2plY3Q6ICguLi52YWx1ZXM6IEFycmF5PFQ+KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxSPihzb3VyY2VzOiBTdWJzY3JpYmFibGVPclByb21pc2U8YW55PltdLCBwcm9qZWN0OiAoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbiAgc3RhdGljIGNyZWF0ZTxUPiguLi5zb3VyY2VzOiBTdWJzY3JpYmFibGVPclByb21pc2U8VD5bXSk6IE9ic2VydmFibGU8VFtdPjtcbiAgc3RhdGljIGNyZWF0ZTxSPiguLi5zb3VyY2VzOiBTdWJzY3JpYmFibGVPclByb21pc2U8YW55PltdKTogT2JzZXJ2YWJsZTxSPjtcbiAgLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cbiAgLyoqXG4gICAqIEBwYXJhbSBzb3VyY2VzXG4gICAqIEByZXR1cm4ge2FueX1cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIGZvcmtKb2luXG4gICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlPFQ+KC4uLnNvdXJjZXM6IEFycmF5PFN1YnNjcmliYWJsZU9yUHJvbWlzZTxhbnk+IHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcnJheTxTdWJzY3JpYmFibGVPclByb21pc2U8YW55Pj4gfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBhbnkpPik6IE9ic2VydmFibGU8VD4ge1xuICAgIGlmIChzb3VyY2VzID09PSBudWxsIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBuZXcgRW1wdHlPYnNlcnZhYmxlPFQ+KCk7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdFNlbGVjdG9yOiAoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBhbnkgPSBudWxsO1xuICAgIGlmICh0eXBlb2Ygc291cmNlc1tzb3VyY2VzLmxlbmd0aCAtIDFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXN1bHRTZWxlY3RvciA9IDwoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBhbnk+c291cmNlcy5wb3AoKTtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgZmlyc3QgYW5kIG9ubHkgb3RoZXIgYXJndW1lbnQgYmVzaWRlcyB0aGUgcmVzdWx0U2VsZWN0b3IgaXMgYW4gYXJyYXlcbiAgICAvLyBhc3N1bWUgaXQncyBiZWVuIGNhbGxlZCB3aXRoIGBmb3JrSm9pbihbb2JzMSwgb2JzMiwgb2JzM10sIHJlc3VsdFNlbGVjdG9yKWBcbiAgICBpZiAoc291cmNlcy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShzb3VyY2VzWzBdKSkge1xuICAgICAgc291cmNlcyA9IDxBcnJheTxTdWJzY3JpYmFibGVPclByb21pc2U8YW55Pj4+c291cmNlc1swXTtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBuZXcgRW1wdHlPYnNlcnZhYmxlPFQ+KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBGb3JrSm9pbk9ic2VydmFibGUoPEFycmF5PFN1YnNjcmliYWJsZU9yUHJvbWlzZTxhbnk+Pj5zb3VyY2VzLCByZXN1bHRTZWxlY3Rvcik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGFueT4pOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiBuZXcgRm9ya0pvaW5TdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuc291cmNlcywgdGhpcy5yZXN1bHRTZWxlY3Rvcik7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIEZvcmtKb2luU3Vic2NyaWJlcjxUPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBUPiB7XG4gIHByaXZhdGUgY29tcGxldGVkID0gMDtcbiAgcHJpdmF0ZSB0b3RhbDogbnVtYmVyO1xuICBwcml2YXRlIHZhbHVlczogYW55W107XG4gIHByaXZhdGUgaGF2ZVZhbHVlcyA9IDA7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgc291cmNlczogQXJyYXk8U3Vic2NyaWJhYmxlT3JQcm9taXNlPGFueT4+LFxuICAgICAgICAgICAgICBwcml2YXRlIHJlc3VsdFNlbGVjdG9yPzogKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gVCkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcblxuICAgIGNvbnN0IGxlbiA9IHNvdXJjZXMubGVuZ3RoO1xuICAgIHRoaXMudG90YWwgPSBsZW47XG4gICAgdGhpcy52YWx1ZXMgPSBuZXcgQXJyYXkobGVuKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IHNvdXJjZSA9IHNvdXJjZXNbaV07XG4gICAgICBjb25zdCBpbm5lclN1YnNjcmlwdGlvbiA9IHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIHNvdXJjZSwgbnVsbCwgaSk7XG5cbiAgICAgIGlmIChpbm5lclN1YnNjcmlwdGlvbikge1xuICAgICAgICAoPGFueT4gaW5uZXJTdWJzY3JpcHRpb24pLm91dGVySW5kZXggPSBpO1xuICAgICAgICB0aGlzLmFkZChpbm5lclN1YnNjcmlwdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5TmV4dChvdXRlclZhbHVlOiBhbnksIGlubmVyVmFsdWU6IFQsXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBUPik6IHZvaWQge1xuICAgIHRoaXMudmFsdWVzW291dGVySW5kZXhdID0gaW5uZXJWYWx1ZTtcbiAgICBpZiAoISg8YW55PmlubmVyU3ViKS5faGFzVmFsdWUpIHtcbiAgICAgICg8YW55PmlubmVyU3ViKS5faGFzVmFsdWUgPSB0cnVlO1xuICAgICAgdGhpcy5oYXZlVmFsdWVzKys7XG4gICAgfVxuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBUPik6IHZvaWQge1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICBjb25zdCB7IGhhdmVWYWx1ZXMsIHJlc3VsdFNlbGVjdG9yLCB2YWx1ZXMgfSA9IHRoaXM7XG4gICAgY29uc3QgbGVuID0gdmFsdWVzLmxlbmd0aDtcblxuICAgIGlmICghKDxhbnk+aW5uZXJTdWIpLl9oYXNWYWx1ZSkge1xuICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNvbXBsZXRlZCsrO1xuXG4gICAgaWYgKHRoaXMuY29tcGxldGVkICE9PSBsZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaGF2ZVZhbHVlcyA9PT0gbGVuKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJlc3VsdFNlbGVjdG9yID8gcmVzdWx0U2VsZWN0b3IuYXBwbHkodGhpcywgdmFsdWVzKSA6IHZhbHVlcztcbiAgICAgIGRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgIH1cblxuICAgIGRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
