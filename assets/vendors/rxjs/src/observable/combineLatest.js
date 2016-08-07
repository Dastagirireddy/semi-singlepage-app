System.register(['../util/isScheduler', '../util/isArray', './ArrayObservable', '../operator/combineLatest'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var isScheduler_1, isArray_1, ArrayObservable_1, combineLatest_1;
    /* tslint:enable:max-line-length */
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
     * `combineLatest` combines the values from all the Observables passed as
     * arguments. This is done by subscribing to each Observable, in order, and
     * collecting an array of each of the most recent values any time any of the
     * input Observables emits, then either taking that array and passing it as
     * arguments to an optional `project` function and emitting the return value of
     * that, or just emitting the array of recent values directly if there is no
     * `project` function.
     *
     * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
     * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
     * var height = Rx.Observable.of(1.76, 1.77, 1.78);
     * var bmi = Rx.Observable.combineLatest(weight, height, (w, h) => w / (h * h));
     * bmi.subscribe(x => console.log('BMI is ' + x));
     *
     * @see {@link combineAll}
     * @see {@link merge}
     * @see {@link withLatestFrom}
     *
     * @param {Observable} observable1 An input Observable to combine with the
     * source Observable.
     * @param {Observable} observable2 An input Observable to combine with the
     * source Observable. More than one input Observables may be given as argument.
     * @param {function} [project] An optional function to project the values from
     * the combined latest values into a new value on the output Observable.
     * @param {Scheduler} [scheduler=null] The Scheduler to use for subscribing to
     * each input Observable.
     * @return {Observable} An Observable of projected values from the most recent
     * values from each input Observable, or an array of the most recent values from
     * each input Observable.
     * @static true
     * @name combineLatest
     * @owner Observable
     */
    function combineLatest() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            observables[_i - 0] = arguments[_i];
        }
        var project = null;
        var scheduler = null;
        if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
            scheduler = observables.pop();
        }
        if (typeof observables[observables.length - 1] === 'function') {
            project = observables.pop();
        }
        // if the first and only other argument besides the resultSelector is an array
        // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
        if (observables.length === 1 && isArray_1.isArray(observables[0])) {
            observables = observables[0];
        }
        return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new combineLatest_1.CombineLatestOperator(project));
    }
    exports_1("combineLatest", combineLatest);
    return {
        setters:[
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            },
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (ArrayObservable_1_1) {
                ArrayObservable_1 = ArrayObservable_1_1;
            },
            function (combineLatest_1_1) {
                combineLatest_1 = combineLatest_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvY29tYmluZUxhdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBNEJBLG1DQUFtQztJQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMENHO0lBQ0g7UUFBb0MscUJBRzBCO2FBSDFCLFdBRzBCLENBSDFCLHNCQUcwQixDQUgxQixJQUcwQjtZQUgxQixvQ0FHMEI7O1FBQzVELElBQUksT0FBTyxHQUFrQyxJQUFJLENBQUM7UUFDbEQsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDO1FBRWhDLEVBQUUsQ0FBQyxDQUFDLHlCQUFXLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsU0FBUyxHQUFjLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzQyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzlELE9BQU8sR0FBaUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzVELENBQUM7UUFFRCw4RUFBOEU7UUFDOUUsNEVBQTRFO1FBQzVFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLGlCQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELFdBQVcsR0FBMkIsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxpQ0FBZSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxxQ0FBcUIsQ0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUF0QkQseUNBc0JDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb2JzZXJ2YWJsZS9jb21iaW5lTGF0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZUlucHV0IH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTY2hlZHVsZXIgfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgaXNTY2hlZHVsZXIgfSBmcm9tICcuLi91dGlsL2lzU2NoZWR1bGVyJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi91dGlsL2lzQXJyYXknO1xuaW1wb3J0IHsgQXJyYXlPYnNlcnZhYmxlIH0gZnJvbSAnLi9BcnJheU9ic2VydmFibGUnO1xuaW1wb3J0IHsgQ29tYmluZUxhdGVzdE9wZXJhdG9yIH0gZnJvbSAnLi4vb3BlcmF0b3IvY29tYmluZUxhdGVzdCc7XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgVDI+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFtULCBUMl0+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgVDIsIFQzPih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6IE9ic2VydmFibGU8W1QsIFQyLCBUM10+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgVDIsIFQzLCBUND4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0Piwgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxbVCwgVDIsIFQzLCBUNF0+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgVDIsIFQzLCBUNCwgVDU+KHYxOiBPYnNlcnZhYmxlSW5wdXQ8VD4sIHYyOiBPYnNlcnZhYmxlSW5wdXQ8VDI+LCB2MzogT2JzZXJ2YWJsZUlucHV0PFQzPiwgdjQ6IE9ic2VydmFibGVJbnB1dDxUND4sIHY1OiBPYnNlcnZhYmxlSW5wdXQ8VDU+LCBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFtULCBUMiwgVDMsIFQ0LCBUNV0+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgVDIsIFQzLCBUNCwgVDUsIFQ2Pih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCB2NTogT2JzZXJ2YWJsZUlucHV0PFQ1PiwgdjY6IE9ic2VydmFibGVJbnB1dDxUNj4sIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6IE9ic2VydmFibGU8W1QsIFQyLCBUMywgVDQsIFQ1LCBUNl0+O1xuXG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBSPih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCBwcm9qZWN0OiAodjE6IFQpID0+IFIsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBUMiwgUj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyKSA9PiBSLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgVDIsIFQzLCBSPih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMpID0+IFIsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBUMiwgVDMsIFQ0LCBSPih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCBwcm9qZWN0OiAodjE6IFQsIHYyOiBUMiwgdjM6IFQzLCB2NDogVDQpID0+IFIsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBUMiwgVDMsIFQ0LCBUNSwgUj4odjE6IE9ic2VydmFibGVJbnB1dDxUPiwgdjI6IE9ic2VydmFibGVJbnB1dDxUMj4sIHYzOiBPYnNlcnZhYmxlSW5wdXQ8VDM+LCB2NDogT2JzZXJ2YWJsZUlucHV0PFQ0PiwgdjU6IE9ic2VydmFibGVJbnB1dDxUNT4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgdjU6IFQ1KSA9PiBSLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8VCwgVDIsIFQzLCBUNCwgVDUsIFQ2LCBSPih2MTogT2JzZXJ2YWJsZUlucHV0PFQ+LCB2MjogT2JzZXJ2YWJsZUlucHV0PFQyPiwgdjM6IE9ic2VydmFibGVJbnB1dDxUMz4sIHY0OiBPYnNlcnZhYmxlSW5wdXQ8VDQ+LCB2NTogT2JzZXJ2YWJsZUlucHV0PFQ1PiwgdjY6IE9ic2VydmFibGVJbnB1dDxUNj4sIHByb2plY3Q6ICh2MTogVCwgdjI6IFQyLCB2MzogVDMsIHY0OiBUNCwgdjU6IFQ1LCB2NjogVDYpID0+IFIsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6IE9ic2VydmFibGU8Uj47XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQ+KGFycmF5OiBPYnNlcnZhYmxlSW5wdXQ8VD5bXSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxUW10+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8Uj4oYXJyYXk6IE9ic2VydmFibGVJbnB1dDxhbnk+W10sIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxULCBSPihhcnJheTogT2JzZXJ2YWJsZUlucHV0PFQ+W10sIHByb2plY3Q6ICguLi52YWx1ZXM6IEFycmF5PFQ+KSA9PiBSLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFI+O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVMYXRlc3Q8Uj4oYXJyYXk6IE9ic2VydmFibGVJbnB1dDxhbnk+W10sIHByb2plY3Q6ICguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFIsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxUPiguLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PFQ+IHwgU2NoZWR1bGVyPik6IE9ic2VydmFibGU8VFtdPjtcbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFI+KC4uLm9ic2VydmFibGVzOiBBcnJheTxPYnNlcnZhYmxlSW5wdXQ8VD4gfCAoKC4uLnZhbHVlczogQXJyYXk8VD4pID0+IFIpIHwgU2NoZWR1bGVyPik6IE9ic2VydmFibGU8Uj47XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUxhdGVzdDxSPiguLi5vYnNlcnZhYmxlczogQXJyYXk8T2JzZXJ2YWJsZUlucHV0PGFueT4gfCAoKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUikgfCBTY2hlZHVsZXI+KTogT2JzZXJ2YWJsZTxSPjtcbi8qIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5cbi8qKlxuICogQ29tYmluZXMgbXVsdGlwbGUgT2JzZXJ2YWJsZXMgdG8gY3JlYXRlIGFuIE9ic2VydmFibGUgd2hvc2UgdmFsdWVzIGFyZVxuICogY2FsY3VsYXRlZCBmcm9tIHRoZSBsYXRlc3QgdmFsdWVzIG9mIGVhY2ggb2YgaXRzIGlucHV0IE9ic2VydmFibGVzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5XaGVuZXZlciBhbnkgaW5wdXQgT2JzZXJ2YWJsZSBlbWl0cyBhIHZhbHVlLCBpdFxuICogY29tcHV0ZXMgYSBmb3JtdWxhIHVzaW5nIHRoZSBsYXRlc3QgdmFsdWVzIGZyb20gYWxsIHRoZSBpbnB1dHMsIHRoZW4gZW1pdHNcbiAqIHRoZSBvdXRwdXQgb2YgdGhhdCBmb3JtdWxhLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2NvbWJpbmVMYXRlc3QucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gKlxuICogYGNvbWJpbmVMYXRlc3RgIGNvbWJpbmVzIHRoZSB2YWx1ZXMgZnJvbSBhbGwgdGhlIE9ic2VydmFibGVzIHBhc3NlZCBhc1xuICogYXJndW1lbnRzLiBUaGlzIGlzIGRvbmUgYnkgc3Vic2NyaWJpbmcgdG8gZWFjaCBPYnNlcnZhYmxlLCBpbiBvcmRlciwgYW5kXG4gKiBjb2xsZWN0aW5nIGFuIGFycmF5IG9mIGVhY2ggb2YgdGhlIG1vc3QgcmVjZW50IHZhbHVlcyBhbnkgdGltZSBhbnkgb2YgdGhlXG4gKiBpbnB1dCBPYnNlcnZhYmxlcyBlbWl0cywgdGhlbiBlaXRoZXIgdGFraW5nIHRoYXQgYXJyYXkgYW5kIHBhc3NpbmcgaXQgYXNcbiAqIGFyZ3VtZW50cyB0byBhbiBvcHRpb25hbCBgcHJvamVjdGAgZnVuY3Rpb24gYW5kIGVtaXR0aW5nIHRoZSByZXR1cm4gdmFsdWUgb2ZcbiAqIHRoYXQsIG9yIGp1c3QgZW1pdHRpbmcgdGhlIGFycmF5IG9mIHJlY2VudCB2YWx1ZXMgZGlyZWN0bHkgaWYgdGhlcmUgaXMgbm9cbiAqIGBwcm9qZWN0YCBmdW5jdGlvbi5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5EeW5hbWljYWxseSBjYWxjdWxhdGUgdGhlIEJvZHktTWFzcyBJbmRleCBmcm9tIGFuIE9ic2VydmFibGUgb2Ygd2VpZ2h0IGFuZCBvbmUgZm9yIGhlaWdodDwvY2FwdGlvbj5cbiAqIHZhciB3ZWlnaHQgPSBSeC5PYnNlcnZhYmxlLm9mKDcwLCA3MiwgNzYsIDc5LCA3NSk7XG4gKiB2YXIgaGVpZ2h0ID0gUnguT2JzZXJ2YWJsZS5vZigxLjc2LCAxLjc3LCAxLjc4KTtcbiAqIHZhciBibWkgPSBSeC5PYnNlcnZhYmxlLmNvbWJpbmVMYXRlc3Qod2VpZ2h0LCBoZWlnaHQsICh3LCBoKSA9PiB3IC8gKGggKiBoKSk7XG4gKiBibWkuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coJ0JNSSBpcyAnICsgeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGNvbWJpbmVBbGx9XG4gKiBAc2VlIHtAbGluayBtZXJnZX1cbiAqIEBzZWUge0BsaW5rIHdpdGhMYXRlc3RGcm9tfVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZX0gb2JzZXJ2YWJsZTEgQW4gaW5wdXQgT2JzZXJ2YWJsZSB0byBjb21iaW5lIHdpdGggdGhlXG4gKiBzb3VyY2UgT2JzZXJ2YWJsZS5cbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZX0gb2JzZXJ2YWJsZTIgQW4gaW5wdXQgT2JzZXJ2YWJsZSB0byBjb21iaW5lIHdpdGggdGhlXG4gKiBzb3VyY2UgT2JzZXJ2YWJsZS4gTW9yZSB0aGFuIG9uZSBpbnB1dCBPYnNlcnZhYmxlcyBtYXkgYmUgZ2l2ZW4gYXMgYXJndW1lbnQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbcHJvamVjdF0gQW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gcHJvamVjdCB0aGUgdmFsdWVzIGZyb21cbiAqIHRoZSBjb21iaW5lZCBsYXRlc3QgdmFsdWVzIGludG8gYSBuZXcgdmFsdWUgb24gdGhlIG91dHB1dCBPYnNlcnZhYmxlLlxuICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXI9bnVsbF0gVGhlIFNjaGVkdWxlciB0byB1c2UgZm9yIHN1YnNjcmliaW5nIHRvXG4gKiBlYWNoIGlucHV0IE9ic2VydmFibGUuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIG9mIHByb2plY3RlZCB2YWx1ZXMgZnJvbSB0aGUgbW9zdCByZWNlbnRcbiAqIHZhbHVlcyBmcm9tIGVhY2ggaW5wdXQgT2JzZXJ2YWJsZSwgb3IgYW4gYXJyYXkgb2YgdGhlIG1vc3QgcmVjZW50IHZhbHVlcyBmcm9tXG4gKiBlYWNoIGlucHV0IE9ic2VydmFibGUuXG4gKiBAc3RhdGljIHRydWVcbiAqIEBuYW1lIGNvbWJpbmVMYXRlc3RcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lTGF0ZXN0PFQsIFI+KC4uLm9ic2VydmFibGVzOiBBcnJheTxhbnkgfCBPYnNlcnZhYmxlSW5wdXQ8YW55PiB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXk8T2JzZXJ2YWJsZUlucHV0PGFueT4+IHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKCguLi52YWx1ZXM6IEFycmF5PGFueT4pID0+IFIpKSB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2NoZWR1bGVyPik6IE9ic2VydmFibGU8Uj4ge1xuICBsZXQgcHJvamVjdDogKC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUiA9ICBudWxsO1xuICBsZXQgc2NoZWR1bGVyOiBTY2hlZHVsZXIgPSBudWxsO1xuXG4gIGlmIChpc1NjaGVkdWxlcihvYnNlcnZhYmxlc1tvYnNlcnZhYmxlcy5sZW5ndGggLSAxXSkpIHtcbiAgICBzY2hlZHVsZXIgPSA8U2NoZWR1bGVyPm9ic2VydmFibGVzLnBvcCgpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYnNlcnZhYmxlc1tvYnNlcnZhYmxlcy5sZW5ndGggLSAxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHByb2plY3QgPSA8KC4uLnZhbHVlczogQXJyYXk8YW55PikgPT4gUj5vYnNlcnZhYmxlcy5wb3AoKTtcbiAgfVxuXG4gIC8vIGlmIHRoZSBmaXJzdCBhbmQgb25seSBvdGhlciBhcmd1bWVudCBiZXNpZGVzIHRoZSByZXN1bHRTZWxlY3RvciBpcyBhbiBhcnJheVxuICAvLyBhc3N1bWUgaXQncyBiZWVuIGNhbGxlZCB3aXRoIGBjb21iaW5lTGF0ZXN0KFtvYnMxLCBvYnMyLCBvYnMzXSwgcHJvamVjdClgXG4gIGlmIChvYnNlcnZhYmxlcy5sZW5ndGggPT09IDEgJiYgaXNBcnJheShvYnNlcnZhYmxlc1swXSkpIHtcbiAgICBvYnNlcnZhYmxlcyA9IDxBcnJheTxPYnNlcnZhYmxlPGFueT4+Pm9ic2VydmFibGVzWzBdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBBcnJheU9ic2VydmFibGUob2JzZXJ2YWJsZXMsIHNjaGVkdWxlcikubGlmdChuZXcgQ29tYmluZUxhdGVzdE9wZXJhdG9yPFQsIFI+KHByb2plY3QpKTtcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
