System.register(['../Subscriber', '../Subject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1, Subject_1;
    var WindowCountOperator, WindowCountSubscriber;
    /**
     * Branch out the source Observable values as a nested Observable with each
     * nested Observable emitting at most `windowSize` values.
     *
     * <span class="informal">It's like {@link bufferCount}, but emits a nested
     * Observable instead of an array.</span>
     *
     * <img src="./img/windowCount.png" width="100%">
     *
     * Returns an Observable that emits windows of items it collects from the source
     * Observable. The output Observable emits windows every `startWindowEvery`
     * items, each containing no more than `windowSize` items. When the source
     * Observable completes or encounters an error, the output Observable emits
     * the current window and propagates the notification from the source
     * Observable. If `startWindowEvery` is not provided, then new windows are
     * started immediately at the start of the source and when each window completes
     * with size `windowSize`.
     *
     * @example <caption>Ignore every 3rd click event, starting from the first one</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks.windowCount(3)
     *   .map(win => win.skip(1)) // skip first of every 3 clicks
     *   .mergeAll(); // flatten the Observable-of-Observables
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Ignore every 3rd click event, starting from the third one</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks.windowCount(2, 3)
     *   .mergeAll(); // flatten the Observable-of-Observables
     * result.subscribe(x => console.log(x));
     *
     * @see {@link window}
     * @see {@link windowTime}
     * @see {@link windowToggle}
     * @see {@link windowWhen}
     * @see {@link bufferCount}
     *
     * @param {number} windowSize The maximum number of values emitted by each
     * window.
     * @param {number} [startWindowEvery] Interval at which to start a new window.
     * For example if `startWindowEvery` is `2`, then a new window will be started
     * on every other value from the source. A new window is started at the
     * beginning of the source by default.
     * @return {Observable<Observable<T>>} An Observable of windows, which in turn
     * are Observable of values.
     * @method windowCount
     * @owner Observable
     */
    function windowCount(windowSize, startWindowEvery) {
        if (startWindowEvery === void 0) { startWindowEvery = 0; }
        return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
    }
    exports_1("windowCount", windowCount);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            WindowCountOperator = (function () {
                function WindowCountOperator(windowSize, startWindowEvery) {
                    this.windowSize = windowSize;
                    this.startWindowEvery = startWindowEvery;
                }
                WindowCountOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
                };
                return WindowCountOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            WindowCountSubscriber = (function (_super) {
                __extends(WindowCountSubscriber, _super);
                function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
                    _super.call(this, destination);
                    this.destination = destination;
                    this.windowSize = windowSize;
                    this.startWindowEvery = startWindowEvery;
                    this.windows = [new Subject_1.Subject()];
                    this.count = 0;
                    destination.next(this.windows[0]);
                }
                WindowCountSubscriber.prototype._next = function (value) {
                    var startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
                    var destination = this.destination;
                    var windowSize = this.windowSize;
                    var windows = this.windows;
                    var len = windows.length;
                    for (var i = 0; i < len && !this.isUnsubscribed; i++) {
                        windows[i].next(value);
                    }
                    var c = this.count - windowSize + 1;
                    if (c >= 0 && c % startWindowEvery === 0 && !this.isUnsubscribed) {
                        windows.shift().complete();
                    }
                    if (++this.count % startWindowEvery === 0 && !this.isUnsubscribed) {
                        var window_1 = new Subject_1.Subject();
                        windows.push(window_1);
                        destination.next(window_1);
                    }
                };
                WindowCountSubscriber.prototype._error = function (err) {
                    var windows = this.windows;
                    if (windows) {
                        while (windows.length > 0 && !this.isUnsubscribed) {
                            windows.shift().error(err);
                        }
                    }
                    this.destination.error(err);
                };
                WindowCountSubscriber.prototype._complete = function () {
                    var windows = this.windows;
                    if (windows) {
                        while (windows.length > 0 && !this.isUnsubscribed) {
                            windows.shift().complete();
                        }
                    }
                    this.destination.complete();
                };
                WindowCountSubscriber.prototype._unsubscribe = function () {
                    this.count = 0;
                    this.windows = null;
                };
                return WindowCountSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3dpbmRvd0NvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0ErQ0c7SUFDSCxxQkFBK0IsVUFBa0IsRUFDbEIsZ0JBQTRCO1FBQTVCLGdDQUE0QixHQUE1QixvQkFBNEI7UUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxtQkFBbUIsQ0FBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFIRCxxQ0FHQyxDQUFBOzs7Ozs7Ozs7O1lBTUQ7Z0JBRUUsNkJBQW9CLFVBQWtCLEVBQ2xCLGdCQUF3QjtvQkFEeEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtvQkFDbEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFRO2dCQUM1QyxDQUFDO2dCQUVELGtDQUFJLEdBQUosVUFBSyxVQUFxQyxFQUFFLE1BQVc7b0JBQ3JELE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUkscUJBQXFCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDMUcsQ0FBQztnQkFDSCwwQkFBQztZQUFELENBVEEsQUFTQyxJQUFBO1lBRUQ7Ozs7ZUFJRztZQUNIO2dCQUF1Qyx5Q0FBYTtnQkFJbEQsK0JBQXNCLFdBQXNDLEVBQ3hDLFVBQWtCLEVBQ2xCLGdCQUF3QjtvQkFDMUMsa0JBQU0sV0FBVyxDQUFDLENBQUM7b0JBSEMsZ0JBQVcsR0FBWCxXQUFXLENBQTJCO29CQUN4QyxlQUFVLEdBQVYsVUFBVSxDQUFRO29CQUNsQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7b0JBTHBDLFlBQU8sR0FBaUIsQ0FBRSxJQUFJLGlCQUFPLEVBQUssQ0FBRSxDQUFDO29CQUM3QyxVQUFL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QUQsQ0F4REEsQUF3REMsQ0F4RHNDLHVCQUFVLEdBd0RoRCIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vcGVyYXRvci93aW5kb3dDb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BlcmF0b3J9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICcuLi9TdWJqZWN0JztcblxuLyoqXG4gKiBCcmFuY2ggb3V0IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB2YWx1ZXMgYXMgYSBuZXN0ZWQgT2JzZXJ2YWJsZSB3aXRoIGVhY2hcbiAqIG5lc3RlZCBPYnNlcnZhYmxlIGVtaXR0aW5nIGF0IG1vc3QgYHdpbmRvd1NpemVgIHZhbHVlcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayBidWZmZXJDb3VudH0sIGJ1dCBlbWl0cyBhIG5lc3RlZFxuICogT2JzZXJ2YWJsZSBpbnN0ZWFkIG9mIGFuIGFycmF5Ljwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3dpbmRvd0NvdW50LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdpbmRvd3Mgb2YgaXRlbXMgaXQgY29sbGVjdHMgZnJvbSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBUaGUgb3V0cHV0IE9ic2VydmFibGUgZW1pdHMgd2luZG93cyBldmVyeSBgc3RhcnRXaW5kb3dFdmVyeWBcbiAqIGl0ZW1zLCBlYWNoIGNvbnRhaW5pbmcgbm8gbW9yZSB0aGFuIGB3aW5kb3dTaXplYCBpdGVtcy4gV2hlbiB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlIGNvbXBsZXRlcyBvciBlbmNvdW50ZXJzIGFuIGVycm9yLCB0aGUgb3V0cHV0IE9ic2VydmFibGUgZW1pdHNcbiAqIHRoZSBjdXJyZW50IHdpbmRvdyBhbmQgcHJvcGFnYXRlcyB0aGUgbm90aWZpY2F0aW9uIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZS4gSWYgYHN0YXJ0V2luZG93RXZlcnlgIGlzIG5vdCBwcm92aWRlZCwgdGhlbiBuZXcgd2luZG93cyBhcmVcbiAqIHN0YXJ0ZWQgaW1tZWRpYXRlbHkgYXQgdGhlIHN0YXJ0IG9mIHRoZSBzb3VyY2UgYW5kIHdoZW4gZWFjaCB3aW5kb3cgY29tcGxldGVzXG4gKiB3aXRoIHNpemUgYHdpbmRvd1NpemVgLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPklnbm9yZSBldmVyeSAzcmQgY2xpY2sgZXZlbnQsIHN0YXJ0aW5nIGZyb20gdGhlIGZpcnN0IG9uZTwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLndpbmRvd0NvdW50KDMpXG4gKiAgIC5tYXAod2luID0+IHdpbi5za2lwKDEpKSAvLyBza2lwIGZpcnN0IG9mIGV2ZXJ5IDMgY2xpY2tzXG4gKiAgIC5tZXJnZUFsbCgpOyAvLyBmbGF0dGVuIHRoZSBPYnNlcnZhYmxlLW9mLU9ic2VydmFibGVzXG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPklnbm9yZSBldmVyeSAzcmQgY2xpY2sgZXZlbnQsIHN0YXJ0aW5nIGZyb20gdGhlIHRoaXJkIG9uZTwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLndpbmRvd0NvdW50KDIsIDMpXG4gKiAgIC5tZXJnZUFsbCgpOyAvLyBmbGF0dGVuIHRoZSBPYnNlcnZhYmxlLW9mLU9ic2VydmFibGVzXG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIHdpbmRvd31cbiAqIEBzZWUge0BsaW5rIHdpbmRvd1RpbWV9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dUb2dnbGV9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dXaGVufVxuICogQHNlZSB7QGxpbmsgYnVmZmVyQ291bnR9XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHdpbmRvd1NpemUgVGhlIG1heGltdW0gbnVtYmVyIG9mIHZhbHVlcyBlbWl0dGVkIGJ5IGVhY2hcbiAqIHdpbmRvdy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnRXaW5kb3dFdmVyeV0gSW50ZXJ2YWwgYXQgd2hpY2ggdG8gc3RhcnQgYSBuZXcgd2luZG93LlxuICogRm9yIGV4YW1wbGUgaWYgYHN0YXJ0V2luZG93RXZlcnlgIGlzIGAyYCwgdGhlbiBhIG5ldyB3aW5kb3cgd2lsbCBiZSBzdGFydGVkXG4gKiBvbiBldmVyeSBvdGhlciB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UuIEEgbmV3IHdpbmRvdyBpcyBzdGFydGVkIGF0IHRoZVxuICogYmVnaW5uaW5nIG9mIHRoZSBzb3VyY2UgYnkgZGVmYXVsdC5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj59IEFuIE9ic2VydmFibGUgb2Ygd2luZG93cywgd2hpY2ggaW4gdHVyblxuICogYXJlIE9ic2VydmFibGUgb2YgdmFsdWVzLlxuICogQG1ldGhvZCB3aW5kb3dDb3VudFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0NvdW50PFQ+KHdpbmRvd1NpemU6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFdpbmRvd0V2ZXJ5OiBudW1iZXIgPSAwKTogT2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFQ+PiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IFdpbmRvd0NvdW50T3BlcmF0b3I8VD4od2luZG93U2l6ZSwgc3RhcnRXaW5kb3dFdmVyeSkpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdpbmRvd0NvdW50U2lnbmF0dXJlPFQ+IHtcbiAgKHdpbmRvd1NpemU6IG51bWJlciwgc3RhcnRXaW5kb3dFdmVyeT86IG51bWJlcik6IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj47XG59XG5cbmNsYXNzIFdpbmRvd0NvdW50T3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBPYnNlcnZhYmxlPFQ+PiB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB3aW5kb3dTaXplOiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgc3RhcnRXaW5kb3dFdmVyeTogbnVtYmVyKSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8T2JzZXJ2YWJsZTxUPj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IFdpbmRvd0NvdW50U3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLndpbmRvd1NpemUsIHRoaXMuc3RhcnRXaW5kb3dFdmVyeSkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBXaW5kb3dDb3VudFN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSB3aW5kb3dzOiBTdWJqZWN0PFQ+W10gPSBbIG5ldyBTdWJqZWN0PFQ+KCkgXTtcbiAgcHJpdmF0ZSBjb3VudDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZGVzdGluYXRpb246IFN1YnNjcmliZXI8T2JzZXJ2YWJsZTxUPj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgd2luZG93U2l6ZTogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHN0YXJ0V2luZG93RXZlcnk6IG51bWJlcikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICBkZXN0aW5hdGlvbi5uZXh0KHRoaXMud2luZG93c1swXSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpIHtcbiAgICBjb25zdCBzdGFydFdpbmRvd0V2ZXJ5ID0gKHRoaXMuc3RhcnRXaW5kb3dFdmVyeSA+IDApID8gdGhpcy5zdGFydFdpbmRvd0V2ZXJ5IDogdGhpcy53aW5kb3dTaXplO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICBjb25zdCB3aW5kb3dTaXplID0gdGhpcy53aW5kb3dTaXplO1xuICAgIGNvbnN0IHdpbmRvd3MgPSB0aGlzLndpbmRvd3M7XG4gICAgY29uc3QgbGVuID0gd2luZG93cy5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbiAmJiAhdGhpcy5pc1Vuc3Vic2NyaWJlZDsgaSsrKSB7XG4gICAgICB3aW5kb3dzW2ldLm5leHQodmFsdWUpO1xuICAgIH1cbiAgICBjb25zdCBjID0gdGhpcy5jb3VudCAtIHdpbmRvd1NpemUgKyAxO1xuICAgIGlmIChjID49IDAgJiYgYyAlIHN0YXJ0V2luZG93RXZlcnkgPT09IDAgJiYgIXRoaXMuaXNVbnN1YnNjcmliZWQpIHtcbiAgICAgIHdpbmRvd3Muc2hpZnQoKS5jb21wbGV0ZSgpO1xuICAgIH1cbiAgICBpZiAoKyt0aGlzLmNvdW50ICUgc3RhcnRXaW5kb3dFdmVyeSA9PT0gMCAmJiAhdGhpcy5pc1Vuc3Vic2NyaWJlZCkge1xuICAgICAgY29uc3Qgd2luZG93ID0gbmV3IFN1YmplY3Q8VD4oKTtcbiAgICAgIHdpbmRvd3MucHVzaCh3aW5kb3cpO1xuICAgICAgZGVzdGluYXRpb24ubmV4dCh3aW5kb3cpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfZXJyb3IoZXJyOiBhbnkpIHtcbiAgICBjb25zdCB3aW5kb3dzID0gdGhpcy53aW5kb3dzO1xuICAgIGlmICh3aW5kb3dzKSB7XG4gICAgICB3aGlsZSAod2luZG93cy5sZW5ndGggPiAwICYmICF0aGlzLmlzVW5zdWJzY3JpYmVkKSB7XG4gICAgICAgIHdpbmRvd3Muc2hpZnQoKS5lcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCkge1xuICAgIGNvbnN0IHdpbmRvd3MgPSB0aGlzLndpbmRvd3M7XG4gICAgaWYgKHdpbmRvd3MpIHtcbiAgICAgIHdoaWxlICh3aW5kb3dzLmxlbmd0aCA+IDAgJiYgIXRoaXMuaXNVbnN1YnNjcmliZWQpIHtcbiAgICAgICAgd2luZG93cy5zaGlmdCgpLmNvbXBsZXRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdW5zdWJzY3JpYmUoKSB7XG4gICAgdGhpcy5jb3VudCA9IDA7XG4gICAgdGhpcy53aW5kb3dzID0gbnVsbDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
