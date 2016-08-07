System.register(['../observable/ArrayObservable', '../util/isArray', '../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ArrayObservable_1, isArray_1, OuterSubscriber_1, subscribeToResult_1;
    var none, CombineLatestOperator, CombineLatestSubscriber;
    /**
     * Combines multiple Observables to create an Observable whose values are
     * calculated from the latest values of each of its input Observables.
     *
     * <span class="informal">Whenever any input Observable emits a value, it
     * computes a formula using the latest values from all the inputs, then emits
     * the output of that formula.</span>
     *
     * <img src="./img/combineLatest.png" width="100%">
     *
     * `combineLatest` combines the values from this Observable with values from
     * Observables passed as arguments. This is done by subscribing to each
     * Observable, in order, and collecting an array of each of the most recent
     * values any time any of the input Observables emits, then either taking that
     * array and passing it as arguments to an optional `project` function and
     * emitting the return value of that, or just emitting the array of recent
     * values directly if there is no `project` function.
     *
     * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
     * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
     * var height = Rx.Observable.of(1.76, 1.77, 1.78);
     * var bmi = weight.combineLatest(height, (w, h) => w / (h * h));
     * bmi.subscribe(x => console.log('BMI is ' + x));
     *
     * @see {@link combineAll}
     * @see {@link merge}
     * @see {@link withLatestFrom}
     *
     * @param {Observable} other An input Observable to combine with the source
     * Observable. More than one input Observables may be given as argument.
     * @param {function} [project] An optional function to project the values from
     * the combined latest values into a new value on the output Observable.
     * @return {Observable} An Observable of projected values from the most recent
     * values from each input Observable, or an array of the most recent values from
     * each input Observable.
     * @method combineLatest
     * @owner Observable
     */
    function combineLatest() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i - 0] = arguments[_i];
        }
        var project = null;
        if (typeof observables[observables.length - 1] === 'function') {
            project = observables.pop();
        }
        // if the first and only other argument besides the resultSelector is an array
        // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
        if (observables.length === 1 && isArray_1.isArray(observables[0])) {
            observables = observables[0];
        }
        observables.unshift(this);
        return new ArrayObservable_1.ArrayObservable(observables).lift(new CombineLatestOperator(project));
    }
    exports_1("combineLatest", combineLatest);
    return {
        setters:[
            function (ArrayObservable_1_1) {
                ArrayObservable_1 = ArrayObservable_1_1;
            },
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            none = {};
            /* tslint:enable:max-line-length */
            CombineLatestOperator = (function () {
                function CombineLatestOperator(project) {
                    this.project = project;
                }
                CombineLatestOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new CombineLatestSubscriber(subscriber, this.project));
                };
                return CombineLatestOperator;
            }());
            exports_1("CombineLatestOperator", CombineLatestOperator);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            CombineLatestSubscriber = (function (_super) {
                __extends(CombineLatestSubscriber, _super);
                function CombineLatestSubscriber(destination, project) {
                    _super.call(this, destination);
                    this.project = project;
                    this.active = 0;
                    this.values = [];
                    this.observables = [];
                }
                CombineLatestSubscriber.prototype._next = function (observable) {
                    this.values.push(none);
                    this.observables.push(observable);
                };
                CombineLatestSubscriber.prototype._complete = function () {
                    var observables = this.observables;
                    var len = observables.length;
                    if (len === 0) {
                        this.destination.complete();
                    }
                    else {
                        this.active = len;
                        this.toRespond = len;
                        for (var i = 0; i < len; i++) {
                            var observable = observables[i];
                            this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
                        }
                    }
                };
                CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
                    if ((this.active -= 1) === 0) {
                        this.destination.complete();
                    }
                };
                CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    var values = this.values;
                    var oldVal = values[outerIndex];
                    var toRespond = !this.toRespond
                        ? 0
                        : oldVal === none ? --this.toRespond : this.toRespond;
                    values[outerIndex] = innerValue;
                    if (toRespond === 0) {
                        if (this.project) {
                            this._tryProject(values);
                        }
                        else {
                            this.destination.next(values);
                        }
                    }
                };
                CombineLatestSubscriber.prototype._tryProject = function (values) {
                    var result;
                    try {
                        result = this.project.apply(this, values);
                    }
                    catch (err) {
                        this.destination.error(err);
                        return;
                    }
                    this.destination.next(result);
                };
                return CombineLatestSubscriber;
            }(OuterSubscriber_1.OuterSubscriber));
            exports_1("CombineLatestSubscriber", CombineLatestSubscriber);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL2NvbWJpbmVMYXRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1FBUU0sSUFBSTtJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUNHO0lBQ0g7UUFBb0MscUJBRWtEO2FBRmxELFdBRWtELENBRmxELHNCQUVrRCxDQUZsRCxJQUVrRDtZQUZsRCxvQ0FFa0Q7O1FBQ3BGLElBQUksT0FBTyxHQUFpQyxJQUFJLENBQUM7UUFDakQsRUFBRSxDQUFDLENBQUMsT0FBTyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzlELE9BQU8sR0FBaUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzVELENBQUM7UUFFRCw4RUFBOEU7UUFDOUUsNEVBQTRFO1FBQzVFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLGlCQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELFdBQVcsR0FBUSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUVELFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUIsTUFBTSxDQUFDLElBQUksaUNBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFqQkQseUNBaUJDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7WUF6REssSUFBSSxHQUFHLEVBQUUsQ0FBQztZQThFaEIsbUNBQW1DO1lBRW5DO2dCQUNFLCtCQUFvQixPQUFzQztvQkFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBK0I7Z0JBQzFELENBQUM7Z0JBRUQsb0NBQUksR0FBSixVQUFLLFVBQXlC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LENBQUMsQ0FBQzt3QkFDaEMsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7Z0JBRU8sNkNBQVcsR0FBbkIsVUFBb0IsTUFBYTtvQkFDL0IsSUFBSSxNQUFXLENBQUM7b0JBQ2hCLElBQUksQ0FBQzt3QkFDSCxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUM1QyxDQUFFO29CQUFBLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzVCLE1BQU0sQ0FBQztvQkFDVCxDQUFDO29CQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoQyxDQUFDO2dCQUNILDhCQUFDO1lBQUQsQ0FqRUEsQUFpRUMsQ0FqRWtELGlDQUFlLEdBaUVqRTtZQWpFRCw2REFpRUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vcGVyYXRvci9jb21iaW5lTGF0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPYnNlcnZhYmxlLCBPYnNlcnZhYmxlSW5wdXR9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHtBcnJheU9ic2VydmFibGV9IGZyb20gJy4uL29ic2VydmFibGUvQXJyYXlPYnNlcnZhYmxlJztcbmltcG9ydCB7aXNBcnJheX0gZnJvbSAnLi4vdXRpbC9pc0FycmF5JztcbmltcG9ydCB7T3BlcmF0b3J9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge091dGVyU3Vic2NyaWJlcn0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7SW5uZXJTdWJzY3JpYmVyfSBmcm9tICcuLi9Jbm5lclN1YnNjcmliZXInO1xuaW1wb3J0IHtzdWJzY3JpYmVUb1Jlc3VsdH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5jb25zdCBub25lID0ge307XG5cbi8qKlxuICogQ29tYmluZXMgbXVsdGlwbGUgT2JzZXJ2YWJsZXMgdG8gY3JlYXRlIGFuIE9ic2VydmFibGUgd2hvc2UgdmFsdWVzIGFyZVxuICogY2FsY3VsYXRlZCBmcm9tIHRoZSBsYXRlc3QgdmFsdWVzIG9mIGVhY2ggb2YgaXRzIGlucHV0IE9ic2VydmFibGVzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5XaGVuZXZlciBhbnkgaW5wdXQgT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlLCBpdFxuICogY29tcHV0ZXMgYSBmb3JtdWxhIHVzaW5nIHRoZSBsYXRlc3QgdmFsdWVzIGZyb20gYWxsIHRoZSBpbnB1dHMsIHRoZW4gZW1pdHNcbiAqIHRoZSBvdXRwdXQgb2YgdGhhdCBmb3JtdWxhLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2NvbWJpbmVMYXRlc3QucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGNvbWJpbmVMYXRlc3RgIGNvbWJpbmVzIHRoZSB2YWx1ZXMgZnJvbSB0aGlzIE9ic2VydmFibGUgd2l0aCB2YWx1ZXMgZnJvbVxuICogT2JzZXJ2YWJsZXMgcGFzc2VkIGFzIGFyZ3VtZW50cy4gVGhpcyBpcyBkb25lIGJ5IHN1YnNjcmliaW5nIHRvIGVhY2hcbiAqIE9ic2VydmFibGUsIGluIG9yZGVyLCBhbmQgY29sbGVjdGluZyBhbiBhcnJheSBvZiBlYWNoIG9mIHRoZSBtb3N0IHJlY2VudFxuICogdmFsdWVzIGFueSB0aW1lIGFueSBvZiB0aGUgaW5wdXQgT2JzZXJ2YWJsZXMgZW1pdHMsIHRoZW4gZWl0aGVyIHRha2luZyB0aGF0XG4gKiBhcnJheSBhbmQgcGFzc2luZyBpdCBhcyBhcmd1bWVudHMgdG8gYW4gb3B0aW9uYWwgYHByb2plY3RgIGZ1bmN0aW9uIGFuZFxuICogZW1pdHRpbmcgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGF0LCBvciBqdXN0IGVtaXR0aW5nIHRoZSBhcnJheSBvZiByZWNlbnRcbiAqIHZhbHVlcyBkaXJlY3RseSBpZiB0aGVyZSBpcyBubyBgcHJvamVjdGAgZnVuY3Rpb24uXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RHluYW1pY2FsbHkgY2FsY3VsYXRlIHRoZSBCb2R5LU1hc3MgSW5kZXggZnJvbSBhbiBPYnNlcnZhYmxlIG9mIHdlaWdodCBhbmQgb25lIGZvciBoZWlnaHQ8L2NhcHRpb24+XG4gKiB2YXIgd2VpZ2h0ID0gUnguT2JzZXJ2YWJsZS5vZig3MCwgNzIsIDc2LCA3OSwgNzUpO1xuICogdmFyIGhlaWdodCA9IFJ4Lk9ic2VydmFibGUub2YoMS43NiwgMS43NywgMS43OCk7XG4gKiB2YXIgYm1pID0gd2VpZ2h0LmNvbWJpbmVMYXRlc3QoaGVpZ2h0LCAodywgaCkgPT4gdyAvIChoICogaCkpO1xuICogYm1pLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKCdCTUkgaXMgJyArIHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBjb21iaW5lQWxsfVxuICogQHNlZSB7QGxpbmsgbWVyZ2V9XG4gKiBAc2VlIHtAbGluayB3aXRoTGF0ZXN0RnJvbX1cbiAqXG4gKiBAcGFyYW0ge09ic2VydmFibGV9IG90aGVyIEFuIGlucHV0IE9ic2VydmFibGUgdG8gY29tYmluZSB3aXRoIHRoZSBzb3VyY2VcbiAqIE9ic2VydmFibGUuIE1vcmUgdGhhbiBvbmUgaW5wdXQgT2JzZXJ2YWJsZXMgbWF5IGJlIGdpdmVuIGFzIGFyZ3VtZW50LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gW3Byb2plY3RdIEFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIHByb2plY3QgdGhlIHZhbHVlcyBmcm9tXG4gKiB0aGUgY29tYmluZWQgbGF0ZXN0IHZhbHVlcyBpbnRvIGEgbmV3IHZhbHVlIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgb2YgcHJvamVjdGVkIHZhbHVlcyBmcm9tIHRoZSBtb3N0IHJlY2VudFxuICogdmFsdWVzIGZyb20gZWFjaCBpbnB1dCBPYnNlcnZhYmxlLCBvciBhbiBhcnJheSBvZiB0aGUgbW9zdCByZWNlbnQgdmFsdWVzIGZyb21cbiAqIGVhY2ggaW5wdXQgT2JzZXJ2YWJsZS5cbiAqIEBtZXRob2QgY29tYmluZUxhdGVzdFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgUj4oLi4ub2JzZXJ2YWJsZXM6IEFycmF5PE9ic2VydmFibGVJbnB1dDxhbnk+IHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8YW55Pj4gfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSKT4pOiBPYnNlcnZhYmxlPFI+IHtcbiAgbGV0IHByb2plY3Q6ICguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFIgPSBudWxsO1xuICBpZiAodHlwZW9mIG9ic2VydmFibGVzW29ic2VydmFibGVzLmxlbmd0aCAtIDFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcHJvamVjdCA9IDwoLi4udmFsdWVzOiBBcnJheTxhbnk+KSA9PiBSPm9ic2VydmFibGVzLnBvcCgpO1xuICB9XG5cbiAgLy8gaWYgdGhlIGZpcnN0IGFuZCBvbmx5IG90aGVyIGFyZ3VtZW50IGJlc2lkZXMgdGhlIHJlc3VsdFNlbGVjdG9yIGlzIGFuIGFycmF5XG4gIC8vIGFzc3VtZSBpdCdzIGJlZW4gY2FsbGVkIHdpdGggYGNvbWJpbmVMYXRlc3QoW29iczEsIG9iczIsIG9iczNdLCBwcm9qZWN0KWBcbiAgaWYgKG9ic2VydmFibGVzLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KG9ic2VydmFibGVzWzBdKSkge1xuICAgIG9ic2VydmFibGVzID0gPGFueT5vYnNlcnZhYmxlc1swXTtcbiAgfVxuXG4gIG9ic2VydmFibGVzLnVuc2hpZnQodGhpcyk7XG5cbiAgcmV0dXJuIG5ldyBBcnJheU9ic2VydmFibGUob2JzZXJ2YWJsZXMpLmxpZnQobmV3IENvbWJpbmVMYXRlc3RPcGVyYXRvcihwcm9qZWN0KSk7XG59XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21iaW5lTGF0ZXN0U2lnbmF0dXJlPFQ+IHtcbiAgPFI+KHByb2plY3Q6ICh2MTogVCkgPT4gUik6IE9ic2VydmFibGU8Uj47XG4gIDxUMiwgUj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyKSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbiAgPFQyLCBUMywgUj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzKSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbiAgPFQyLCBUMywgVDQsIFI+KHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCkgPT4gUik6IE9ic2VydmFibGU8Uj47XG4gIDxUMiwgVDMsIFQ0LCBUNSwgUj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgdjU6IFQ1KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbiAgPFQyLCBUMywgVDQsIFQ1LCBUNiwgUj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHY2OiBPYnNlcnZhYmxlSW5wdXQ8VDY+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQsIHY1OiBUNSwgdjY6IFQ2KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcblxuICA8VDI+KHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+KTogT2JzZXJ2YWJsZTxbVCwgVDJdPjtcbiAgPFQyLCBUMz4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+KTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzXT47XG4gIDxUMiwgVDMsIFQ0Pih2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+KTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNF0+O1xuICA8VDIsIFQzLCBUNCwgVDU+KHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+KTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNCwgVDVdPjtcbiAgPFQyLCBUMywgVDQsIFQ1LCBUNj4odjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHY2OiBPYnNlcnZhYmxlSW5wdXQ8VDY+KTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNCwgVDUsIFQ2XT47XG5cbiAgPFI+KC4uLm9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8VD4gfCAoKC4uLnZhbHVlczogQXJyYXk8VD4pID0+IFIpPik6IE9ic2VydmFibGU8Uj47XG4gIDxSPihhcnJheTogT2JzZXJ2YWJsZUlucHV0PFQ+W10pOiBPYnNlcnZhYmxlPEFycmF5PFQ+PjtcbiAgPFRPdGhlciwgUj4oYXJyYXk6IE9ic2VydmFibGVJbnB1dDxUT3RoZXI+W10sIHByb2plY3Q6ICh2MTogVCwgLi4udmFsdWVzOiBBcnJheTxUT3RoZXI+KSA9PiBSKTogT2JzZXJ2YWJsZTxSPjtcbn1cbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbmV4cG9ydCBjbGFzcyBDb21iaW5lTGF0ZXN0T3BlcmF0b3I8VCwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBSPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcHJvamVjdD86ICguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFIpIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxSPiwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgQ29tYmluZUxhdGVzdFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5wcm9qZWN0KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBDb21iaW5lTGF0ZXN0U3Vic2NyaWJlcjxULCBSPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBSPiB7XG4gIHByaXZhdGUgYWN0aXZlOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHZhbHVlczogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSBvYnNlcnZhYmxlczogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSB0b1Jlc3BvbmQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxSPiwgcHJpdmF0ZSBwcm9qZWN0PzogKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dChvYnNlcnZhYmxlOiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlcy5wdXNoKG5vbmUpO1xuICAgIHRoaXMub2JzZXJ2YWJsZXMucHVzaChvYnNlcnZhYmxlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKSB7XG4gICAgY29uc3Qgb2JzZXJ2YWJsZXMgPSB0aGlzLm9ic2VydmFibGVzO1xuICAgIGNvbnN0IGxlbiA9IG9ic2VydmFibGVzLmxlbmd0aDtcbiAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gbGVuO1xuICAgICAgdGhpcy50b1Jlc3BvbmQgPSBsZW47XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSBvYnNlcnZhYmxlc1tpXTtcbiAgICAgICAgdGhpcy5hZGQoc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgb2JzZXJ2YWJsZSwgb2JzZXJ2YWJsZSwgaSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5vdGlmeUNvbXBsZXRlKHVudXNlZDogU3Vic2NyaWJlcjxSPik6IHZvaWQge1xuICAgIGlmICgodGhpcy5hY3RpdmUgLT0gMSkgPT09IDApIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IFIsXG4gICAgICAgICAgICAgb3V0ZXJJbmRleDogbnVtYmVyLCBpbm5lckluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgaW5uZXJTdWI6IElubmVyU3Vic2NyaWJlcjxULCBSPik6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMudmFsdWVzO1xuICAgIGNvbnN0IG9sZFZhbCA9IHZhbHVlc1tvdXRlckluZGV4XTtcbiAgICBjb25zdCB0b1Jlc3BvbmQgPSAhdGhpcy50b1Jlc3BvbmRcbiAgICAgID8gMFxuICAgICAgOiBvbGRWYWwgPT09IG5vbmUgPyAtLXRoaXMudG9SZXNwb25kIDogdGhpcy50b1Jlc3BvbmQ7XG4gICAgdmFsdWVzW291dGVySW5kZXhdID0gaW5uZXJWYWx1ZTtcblxuICAgIGlmICh0b1Jlc3BvbmQgPT09IDApIHtcbiAgICAgIGlmICh0aGlzLnByb2plY3QpIHtcbiAgICAgICAgdGhpcy5fdHJ5UHJvamVjdCh2YWx1ZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdHJ5UHJvamVjdCh2YWx1ZXM6IGFueVtdKSB7XG4gICAgbGV0IHJlc3VsdDogYW55O1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnByb2plY3QuYXBwbHkodGhpcywgdmFsdWVzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHJlc3VsdCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
