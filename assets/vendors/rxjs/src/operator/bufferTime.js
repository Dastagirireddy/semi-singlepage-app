System.register(['../Subscriber', '../scheduler/async', '../util/isScheduler'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1, async_1, isScheduler_1;
    var BufferTimeOperator, Context, BufferTimeSubscriber;
    /**
     * Buffers the source Observable values for a specific time period.
     *
     * <span class="informal">Collects values from the past as an array, and emits
     * those arrays periodically in time.</span>
     *
     * <img src="./img/bufferTime.png" width="100%">
     *
     * Buffers values from the source for a specific time duration `bufferTimeSpan`.
     * Unless the optional argument `bufferCreationInterval` is given, it emits and
     * resets the buffer every `bufferTimeSpan` milliseconds. If
     * `bufferCreationInterval` is given, this operator opens the buffer every
     * `bufferCreationInterval` milliseconds and closes (emits and resets) the
     * buffer every `bufferTimeSpan` milliseconds. When the optional argument
     * `maxBufferSize` is specified, the buffer will be closed either after
     * `bufferTimeSpan` milliseconds or when it contains `maxBufferSize` elements.
     *
     * @example <caption>Every second, emit an array of the recent click events</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var buffered = clicks.bufferTime(1000);
     * buffered.subscribe(x => console.log(x));
     *
     * @example <caption>Every 5 seconds, emit the click events from the next 2 seconds</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var buffered = clicks.bufferTime(2000, 5000);
     * buffered.subscribe(x => console.log(x));
     *
     * @see {@link buffer}
     * @see {@link bufferCount}
     * @see {@link bufferToggle}
     * @see {@link bufferWhen}
     * @see {@link windowTime}
     *
     * @param {number} bufferTimeSpan The amount of time to fill each buffer array.
     * @param {number} [bufferCreationInterval] The interval at which to start new
     * buffers.
     * @param {number} [maxBufferSize] The maximum buffer size.
     * @param {Scheduler} [scheduler=async] The scheduler on which to schedule the
     * intervals that determine buffer boundaries.
     * @return {Observable<T[]>} An observable of arrays of buffered values.
     * @method bufferTime
     * @owner Observable
     */
    function bufferTime(bufferTimeSpan) {
        var length = arguments.length;
        var scheduler = async_1.async;
        if (isScheduler_1.isScheduler(arguments[arguments.length - 1])) {
            scheduler = arguments[arguments.length - 1];
            length--;
        }
        var bufferCreationInterval = null;
        if (length >= 2) {
            bufferCreationInterval = arguments[1];
        }
        var maxBufferSize = Number.POSITIVE_INFINITY;
        if (length >= 3) {
            maxBufferSize = arguments[2];
        }
        return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
    }
    exports_1("bufferTime", bufferTime);
    function dispatchBufferTimeSpanOnly(state) {
        var subscriber = state.subscriber;
        var prevContext = state.context;
        if (prevContext) {
            subscriber.closeContext(prevContext);
        }
        if (!subscriber.isUnsubscribed) {
            state.context = subscriber.openContext();
            state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
        }
    }
    function dispatchBufferCreation(state) {
        var bufferCreationInterval = state.bufferCreationInterval, bufferTimeSpan = state.bufferTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler;
        var context = subscriber.openContext();
        var action = this;
        if (!subscriber.isUnsubscribed) {
            subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, context: context }));
            action.schedule(state, bufferCreationInterval);
        }
    }
    function dispatchBufferClose(arg) {
        var subscriber = arg.subscriber, context = arg.context;
        subscriber.closeContext(context);
    }
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (isScheduler_1_1) {
                isScheduler_1 = isScheduler_1_1;
            }],
        execute: function() {
            BufferTimeOperator = (function () {
                function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
                    this.bufferTimeSpan = bufferTimeSpan;
                    this.bufferCreationInterval = bufferCreationInterval;
                    this.maxBufferSize = maxBufferSize;
                    this.scheduler = scheduler;
                }
                BufferTimeOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
                };
                return BufferTimeOperator;
            }());
            Context = (function () {
                function Context() {
                    this.buffer = [];
                }
                return Context;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            BufferTimeSubscriber = (function (_super) {
                __extends(BufferTimeSubscriber, _super);
                function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
                    _super.call(this, destination);
                    this.bufferTimeSpan = bufferTimeSpan;
                    this.bufferCreationInterval = bufferCreationInterval;
                    this.maxBufferSize = maxBufferSize;
                    this.scheduler = scheduler;
                    this.contexts = [];
                    var context = this.openContext();
                    this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;
                    if (this.timespanOnly) {
                        var timeSpanOnlyState = { subscriber: this, context: context, bufferTimeSpan: bufferTimeSpan };
                        this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
                    }
                    else {
                        var closeState = { subscriber: this, context: context };
                        var creationState = { bufferTimeSpan: bufferTimeSpan, bufferCreationInterval: bufferCreationInterval, subscriber: this, scheduler: scheduler };
                        this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
                        this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
                    }
                }
                BufferTimeSubscriber.prototype._next = function (value) {
                    var contexts = this.contexts;
                    var len = contexts.length;
                    var filledBufferContext;
                    for (var i = 0; i < len; i++) {
                        var context = contexts[i];
                        var buffer = context.buffer;
                        buffer.push(value);
                        if (buffer.length == this.maxBufferSize) {
                            filledBufferContext = context;
                        }
                    }
                    if (filledBufferContext) {
                        this.onBufferFull(filledBufferContext);
                    }
                };
                BufferTimeSubscriber.prototype._error = function (err) {
                    this.contexts.length = 0;
                    _super.prototype._error.call(this, err);
                };
                BufferTimeSubscriber.prototype._complete = function () {
                    var _a = this, contexts = _a.contexts, destination = _a.destination;
                    while (contexts.length > 0) {
                        var context = contexts.shift();
                        destination.next(context.buffer);
                    }
                    _super.prototype._complete.call(this);
                };
                BufferTimeSubscriber.prototype._unsubscribe = function () {
                    this.contexts = null;
                };
                BufferTimeSubscriber.prototype.onBufferFull = function (context) {
                    this.closeContext(context);
                    var closeAction = context.closeAction;
                    closeAction.unsubscribe();
                    this.remove(closeAction);
                    if (this.timespanOnly) {
                        context = this.openContext();
                        var bufferTimeSpan = this.bufferTimeSpan;
                        var timeSpanOnlyState = { subscriber: this, context: context, bufferTimeSpan: bufferTimeSpan };
                        this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
                    }
                };
                BufferTimeSubscriber.prototype.openContext = function () {
                    var context = new Context();
                    this.contexts.push(context);
                    return context;
                };
                BufferTimeSubscriber.prototype.closeContext = function (context) {
                    this.destination.next(context.buffer);
                    var contexts = this.contexts;
                    var spliceIndex = contexts ? contexts.indexOf(context) : -1;
                    if (spliceIndex >= 0) {
                        contexts.splice(contexts.indexOf(context), 1);
                    }
                };
                return BufferTimeSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL2J1ZmZlclRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EwQ0c7SUFDSCxvQkFBOEIsY0FBc0I7UUFDbEQsSUFBSSxNQUFNLEdBQVcsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUV0QyxJQUFJLFNBQVMsR0FBYyxhQUFLLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMseUJBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUMsTUFBTSxFQUFFLENBQUM7UUFDWCxDQUFDO1FBRUQsSUFBSSxzQkFBc0IsR0FBVyxJQUFJLENBQUM7UUFDMUMsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsc0JBQXNCLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFRCxJQUFJLGFBQWEsR0FBVyxNQUFNLENBQUMsaUJBQWlCLENBQUM7UUFDckQsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsYUFBYSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxrQkFBa0IsQ0FBSSxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDaEgsQ0FBQztJQXBCRCxtQ0FvQkMsQ0FBQTtJQWlJRCxvQ0FBb0MsS0FBVTtRQUM1QyxJQUFNLFVBQVUsR0FBOEIsS0FBSyxDQUFDLFVB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QVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2hELENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCwyQkFBQztZQUFELENBeEZBLEFBd0ZDLENBeEZxQyx1QkFBVSxHQXdGL0MiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3IvYnVmZmVyVGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BlcmF0b3J9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1NjaGVkdWxlcn0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7QWN0aW9ufSBmcm9tICcuLi9zY2hlZHVsZXIvQWN0aW9uJztcbmltcG9ydCB7YXN5bmN9IGZyb20gJy4uL3NjaGVkdWxlci9hc3luYyc7XG5pbXBvcnQge2lzU2NoZWR1bGVyfSBmcm9tICcuLi91dGlsL2lzU2NoZWR1bGVyJztcblxuLyoqXG4gKiBCdWZmZXJzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB2YWx1ZXMgZm9yIGEgc3BlY2lmaWMgdGltZSBwZXJpb2QuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkNvbGxlY3RzIHZhbHVlcyBmcm9tIHRoZSBwYXN0IGFzIGFuIGFycmF5LCBhbmQgZW1pdHNcbiAqIHRob3NlIGFycmF5cyBwZXJpb2RpY2FsbHkgaW4gdGltZS48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9idWZmZXJUaW1lLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEJ1ZmZlcnMgdmFsdWVzIGZyb20gdGhlIHNvdXJjZSBmb3IgYSBzcGVjaWZpYyB0aW1lIGR1cmF0aW9uIGBidWZmZXJUaW1lU3BhbmAuXG4gKiBVbmxlc3MgdGhlIG9wdGlvbmFsIGFyZ3VtZW50IGBidWZmZXJDcmVhdGlvbkludGVydmFsYCBpcyBnaXZlbiwgaXQgZW1pdHMgYW5kXG4gKiByZXNldHMgdGhlIGJ1ZmZlciBldmVyeSBgYnVmZmVyVGltZVNwYW5gIG1pbGxpc2Vjb25kcy4gSWZcbiAqIGBidWZmZXJDcmVhdGlvbkludGVydmFsYCBpcyBnaXZlbiwgdGhpcyBvcGVyYXRvciBvcGVucyB0aGUgYnVmZmVyIGV2ZXJ5XG4gKiBgYnVmZmVyQ3JlYXRpb25JbnRlcnZhbGAgbWlsbGlzZWNvbmRzIGFuZCBjbG9zZXMgKGVtaXRzIGFuZCByZXNldHMpIHRoZVxuICogYnVmZmVyIGV2ZXJ5IGBidWZmZXJUaW1lU3BhbmAgbWlsbGlzZWNvbmRzLiBXaGVuIHRoZSBvcHRpb25hbCBhcmd1bWVudFxuICogYG1heEJ1ZmZlclNpemVgIGlzIHNwZWNpZmllZCwgdGhlIGJ1ZmZlciB3aWxsIGJlIGNsb3NlZCBlaXRoZXIgYWZ0ZXJcbiAqIGBidWZmZXJUaW1lU3BhbmAgbWlsbGlzZWNvbmRzIG9yIHdoZW4gaXQgY29udGFpbnMgYG1heEJ1ZmZlclNpemVgIGVsZW1lbnRzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkV2ZXJ5IHNlY29uZCwgZW1pdCBhbiBhcnJheSBvZiB0aGUgcmVjZW50IGNsaWNrIGV2ZW50czwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgYnVmZmVyZWQgPSBjbGlja3MuYnVmZmVyVGltZSgxMDAwKTtcbiAqIGJ1ZmZlcmVkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FdmVyeSA1IHNlY29uZHMsIGVtaXQgdGhlIGNsaWNrIGV2ZW50cyBmcm9tIHRoZSBuZXh0IDIgc2Vjb25kczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgYnVmZmVyZWQgPSBjbGlja3MuYnVmZmVyVGltZSgyMDAwLCA1MDAwKTtcbiAqIGJ1ZmZlcmVkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBidWZmZXJ9XG4gKiBAc2VlIHtAbGluayBidWZmZXJDb3VudH1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlclRvZ2dsZX1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlcldoZW59XG4gKiBAc2VlIHtAbGluayB3aW5kb3dUaW1lfVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBidWZmZXJUaW1lU3BhbiBUaGUgYW1vdW50IG9mIHRpbWUgdG8gZmlsbCBlYWNoIGJ1ZmZlciBhcnJheS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYnVmZmVyQ3JlYXRpb25JbnRlcnZhbF0gVGhlIGludGVydmFsIGF0IHdoaWNoIHRvIHN0YXJ0IG5ld1xuICogYnVmZmVycy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbWF4QnVmZmVyU2l6ZV0gVGhlIG1heGltdW0gYnVmZmVyIHNpemUuXG4gKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcj1hc3luY10gVGhlIHNjaGVkdWxlciBvbiB3aGljaCB0byBzY2hlZHVsZSB0aGVcbiAqIGludGVydmFscyB0aGF0IGRldGVybWluZSBidWZmZXIgYm91bmRhcmllcy5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn0gQW4gb2JzZXJ2YWJsZSBvZiBhcnJheXMgb2YgYnVmZmVyZWQgdmFsdWVzLlxuICogQG1ldGhvZCBidWZmZXJUaW1lXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVmZmVyVGltZTxUPihidWZmZXJUaW1lU3BhbjogbnVtYmVyKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgbGV0IGxlbmd0aDogbnVtYmVyID0gYXJndW1lbnRzLmxlbmd0aDtcblxuICBsZXQgc2NoZWR1bGVyOiBTY2hlZHVsZXIgPSBhc3luYztcbiAgaWYgKGlzU2NoZWR1bGVyKGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV0pKSB7XG4gICAgc2NoZWR1bGVyID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICBsZW5ndGgtLTtcbiAgfVxuXG4gIGxldCBidWZmZXJDcmVhdGlvbkludGVydmFsOiBudW1iZXIgPSBudWxsO1xuICBpZiAobGVuZ3RoID49IDIpIHtcbiAgICBidWZmZXJDcmVhdGlvbkludGVydmFsID0gYXJndW1lbnRzWzFdO1xuICB9XG5cbiAgbGV0IG1heEJ1ZmZlclNpemU6IG51bWJlciA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgaWYgKGxlbmd0aCA+PSAzKSB7XG4gICAgbWF4QnVmZmVyU2l6ZSA9IGFyZ3VtZW50c1syXTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmxpZnQobmV3IEJ1ZmZlclRpbWVPcGVyYXRvcjxUPihidWZmZXJUaW1lU3BhbiwgYnVmZmVyQ3JlYXRpb25JbnRlcnZhbCwgbWF4QnVmZmVyU2l6ZSwgc2NoZWR1bGVyKSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnVmZmVyVGltZVNpZ25hdHVyZTxUPiB7XG4gIChidWZmZXJUaW1lU3BhbjogbnVtYmVyLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFRbXT47XG4gIChidWZmZXJUaW1lU3BhbjogbnVtYmVyLCBidWZmZXJDcmVhdGlvbkludGVydmFsOiBudW1iZXIsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6IE9ic2VydmFibGU8VFtdPjtcbiAgKGJ1ZmZlclRpbWVTcGFuOiBudW1iZXIsIGJ1ZmZlckNyZWF0aW9uSW50ZXJ2YWw6IG51bWJlciwgbWF4QnVmZmVyU2l6ZTogbnVtYmVyLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFRbXT47XG59XG5cbmNsYXNzIEJ1ZmZlclRpbWVPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFRbXT4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJ1ZmZlclRpbWVTcGFuOiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgYnVmZmVyQ3JlYXRpb25JbnRlcnZhbDogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIG1heEJ1ZmZlclNpemU6IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFNjaGVkdWxlcikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFRbXT4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IEJ1ZmZlclRpbWVTdWJzY3JpYmVyKFxuICAgICAgc3Vic2NyaWJlciwgdGhpcy5idWZmZXJUaW1lU3BhbiwgdGhpcy5idWZmZXJDcmVhdGlvbkludGVydmFsLCB0aGlzLm1heEJ1ZmZlclNpemUsIHRoaXMuc2NoZWR1bGVyXG4gICAgKSk7XG4gIH1cbn1cblxuY2xhc3MgQ29udGV4dDxUPiB7XG4gIGJ1ZmZlcjogVFtdID0gW107XG4gIGNsb3NlQWN0aW9uOiBTdWJzY3JpcHRpb247XG59XG5cbnR5cGUgQ3JlYXRpb25TdGF0ZTxUPiA9IHtcbiAgYnVmZmVyVGltZVNwYW46IG51bWJlcjtcbiAgYnVmZmVyQ3JlYXRpb25JbnRlcnZhbDogbnVtYmVyLFxuICBzdWJzY3JpYmVyOiBCdWZmZXJUaW1lU3Vic2NyaWJlcjxUPjtcbiAgc2NoZWR1bGVyOiBTY2hlZHVsZXI7XG59O1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgQnVmZmVyVGltZVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSBjb250ZXh0czogQXJyYXk8Q29udGV4dDxUPj4gPSBbXTtcbiAgcHJpdmF0ZSB0aW1lc3Bhbk9ubHk6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VFtdPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBidWZmZXJUaW1lU3BhbjogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIGJ1ZmZlckNyZWF0aW9uSW50ZXJ2YWw6IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBtYXhCdWZmZXJTaXplOiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBTY2hlZHVsZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMub3BlbkNvbnRleHQoKTtcbiAgICB0aGlzLnRpbWVzcGFuT25seSA9IGJ1ZmZlckNyZWF0aW9uSW50ZXJ2YWwgPT0gbnVsbCB8fCBidWZmZXJDcmVhdGlvbkludGVydmFsIDwgMDtcbiAgICBpZiAodGhpcy50aW1lc3Bhbk9ubHkpIHtcbiAgICAgIGNvbnN0IHRpbWVTcGFuT25seVN0YXRlID0geyBzdWJzY3JpYmVyOiB0aGlzLCBjb250ZXh0LCBidWZmZXJUaW1lU3BhbiB9O1xuICAgICAgdGhpcy5hZGQoY29udGV4dC5jbG9zZUFjdGlvbiA9IHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaEJ1ZmZlclRpbWVTcGFuT25seSwgYnVmZmVyVGltZVNwYW4sIHRpbWVTcGFuT25seVN0YXRlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNsb3NlU3RhdGUgPSB7IHN1YnNjcmliZXI6IHRoaXMsIGNvbnRleHQgfTtcbiAgICAgIGNvbnN0IGNyZWF0aW9uU3RhdGU6IENyZWF0aW9uU3RhdGU8VD4gPSB7IGJ1ZmZlclRpbWVTcGFuLCBidWZmZXJDcmVhdGlvbkludGVydmFsLCBzdWJzY3JpYmVyOiB0aGlzLCBzY2hlZHVsZXIgfTtcbiAgICAgIHRoaXMuYWRkKGNvbnRleHQuY2xvc2VBY3Rpb24gPSBzY2hlZHVsZXIuc2NoZWR1bGUoZGlzcGF0Y2hCdWZmZXJDbG9zZSwgYnVmZmVyVGltZVNwYW4sIGNsb3NlU3RhdGUpKTtcbiAgICAgIHRoaXMuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShkaXNwYXRjaEJ1ZmZlckNyZWF0aW9uLCBidWZmZXJDcmVhdGlvbkludGVydmFsLCBjcmVhdGlvblN0YXRlKSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKSB7XG4gICAgY29uc3QgY29udGV4dHMgPSB0aGlzLmNvbnRleHRzO1xuICAgIGNvbnN0IGxlbiA9IGNvbnRleHRzLmxlbmd0aDtcbiAgICBsZXQgZmlsbGVkQnVmZmVyQ29udGV4dDogQ29udGV4dDxUPjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjb250ZXh0ID0gY29udGV4dHNbaV07XG4gICAgICBjb25zdCBidWZmZXIgPSBjb250ZXh0LmJ1ZmZlcjtcbiAgICAgIGJ1ZmZlci5wdXNoKHZhbHVlKTtcbiAgICAgIGlmIChidWZmZXIubGVuZ3RoID09IHRoaXMubWF4QnVmZmVyU2l6ZSkge1xuICAgICAgICBmaWxsZWRCdWZmZXJDb250ZXh0ID0gY29udGV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZmlsbGVkQnVmZmVyQ29udGV4dCkge1xuICAgICAgdGhpcy5vbkJ1ZmZlckZ1bGwoZmlsbGVkQnVmZmVyQ29udGV4dCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9lcnJvcihlcnI6IGFueSkge1xuICAgIHRoaXMuY29udGV4dHMubGVuZ3RoID0gMDtcbiAgICBzdXBlci5fZXJyb3IoZXJyKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKSB7XG4gICAgY29uc3QgeyBjb250ZXh0cywgZGVzdGluYXRpb24gfSA9IHRoaXM7XG4gICAgd2hpbGUgKGNvbnRleHRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBjb250ZXh0cy5zaGlmdCgpO1xuICAgICAgZGVzdGluYXRpb24ubmV4dChjb250ZXh0LmJ1ZmZlcik7XG4gICAgfVxuICAgIHN1cGVyLl9jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF91bnN1YnNjcmliZSgpIHtcbiAgICB0aGlzLmNvbnRleHRzID0gbnVsbDtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkJ1ZmZlckZ1bGwoY29udGV4dDogQ29udGV4dDxUPikge1xuICAgIHRoaXMuY2xvc2VDb250ZXh0KGNvbnRleHQpO1xuICAgIGNvbnN0IGNsb3NlQWN0aW9uID0gY29udGV4dC5jbG9zZUFjdGlvbjtcbiAgICBjbG9zZUFjdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMucmVtb3ZlKGNsb3NlQWN0aW9uKTtcblxuICAgIGlmICh0aGlzLnRpbWVzcGFuT25seSkge1xuICAgICAgY29udGV4dCA9IHRoaXMub3BlbkNvbnRleHQoKTtcbiAgICAgIGNvbnN0IGJ1ZmZlclRpbWVTcGFuID0gdGhpcy5idWZmZXJUaW1lU3BhbjtcbiAgICAgIGNvbnN0IHRpbWVTcGFuT25seVN0YXRlID0geyBzdWJzY3JpYmVyOiB0aGlzLCBjb250ZXh0LCBidWZmZXJUaW1lU3BhbiB9O1xuICAgICAgdGhpcy5hZGQoY29udGV4dC5jbG9zZUFjdGlvbiA9IHRoaXMuc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoQnVmZmVyVGltZVNwYW5Pbmx5LCBidWZmZXJUaW1lU3BhbiwgdGltZVNwYW5Pbmx5U3RhdGUpKTtcbiAgICB9XG4gIH1cblxuICBvcGVuQ29udGV4dCgpOiBDb250ZXh0PFQ+IHtcbiAgICBjb25zdCBjb250ZXh0OiBDb250ZXh0PFQ+ID0gbmV3IENvbnRleHQ8VD4oKTtcbiAgICB0aGlzLmNvbnRleHRzLnB1c2goY29udGV4dCk7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG4gIH1cblxuICBjbG9zZUNvbnRleHQoY29udGV4dDogQ29udGV4dDxUPikge1xuICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChjb250ZXh0LmJ1ZmZlcik7XG4gICAgY29uc3QgY29udGV4dHMgPSB0aGlzLmNvbnRleHRzO1xuXG4gICAgY29uc3Qgc3BsaWNlSW5kZXggPSBjb250ZXh0cyA/IGNvbnRleHRzLmluZGV4T2YoY29udGV4dCkgOiAtMTtcbiAgICBpZiAoc3BsaWNlSW5kZXggPj0gMCkge1xuICAgICAgY29udGV4dHMuc3BsaWNlKGNvbnRleHRzLmluZGV4T2YoY29udGV4dCksIDEpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaEJ1ZmZlclRpbWVTcGFuT25seShzdGF0ZTogYW55KSB7XG4gIGNvbnN0IHN1YnNjcmliZXI6IEJ1ZmZlclRpbWVTdWJzY3JpYmVyPGFueT4gPSBzdGF0ZS5zdWJzY3JpYmVyO1xuXG4gIGNvbnN0IHByZXZDb250ZXh0ID0gc3RhdGUuY29udGV4dDtcbiAgaWYgKHByZXZDb250ZXh0KSB7XG4gICAgc3Vic2NyaWJlci5jbG9zZUNvbnRleHQocHJldkNvbnRleHQpO1xuICB9XG5cbiAgaWYgKCFzdWJzY3JpYmVyLmlzVW5zdWJzY3JpYmVkKSB7XG4gICAgc3RhdGUuY29udGV4dCA9IHN1YnNjcmliZXIub3BlbkNvbnRleHQoKTtcbiAgICBzdGF0ZS5jb250ZXh0LmNsb3NlQWN0aW9uID0gKDxhbnk+dGhpcykuc2NoZWR1bGUoc3RhdGUsIHN0YXRlLmJ1ZmZlclRpbWVTcGFuKTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgRGlzcGF0Y2hBcmc8VD4ge1xuICBzdWJzY3JpYmVyOiBCdWZmZXJUaW1lU3Vic2NyaWJlcjxUPjtcbiAgY29udGV4dDogQ29udGV4dDxUPjtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hCdWZmZXJDcmVhdGlvbjxUPihzdGF0ZTogQ3JlYXRpb25TdGF0ZTxUPikge1xuICBjb25zdCB7IGJ1ZmZlckNyZWF0aW9uSW50ZXJ2YWwsIGJ1ZmZlclRpbWVTcGFuLCBzdWJzY3JpYmVyLCBzY2hlZHVsZXIgfSA9IHN0YXRlO1xuICBjb25zdCBjb250ZXh0ID0gc3Vic2NyaWJlci5vcGVuQ29udGV4dCgpO1xuICBjb25zdCBhY3Rpb24gPSA8QWN0aW9uPENyZWF0aW9uU3RhdGU8VD4+PnRoaXM7XG4gIGlmICghc3Vic2NyaWJlci5pc1Vuc3Vic2NyaWJlZCkge1xuICAgIHN1YnNjcmliZXIuYWRkKGNvbnRleHQuY2xvc2VBY3Rpb24gPSBzY2hlZHVsZXIuc2NoZWR1bGU8RGlzcGF0Y2hBcmc8VD4+KGRpc3BhdGNoQnVmZmVyQ2xvc2UsIGJ1ZmZlclRpbWVTcGFuLCB7IHN1YnNjcmliZXIsIGNvbnRleHQgfSkpO1xuICAgIGFjdGlvbi5zY2hlZHVsZShzdGF0ZSwgYnVmZmVyQ3JlYXRpb25JbnRlcnZhbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hCdWZmZXJDbG9zZTxUPihhcmc6IERpc3BhdGNoQXJnPFQ+KSB7XG4gIGNvbnN0IHsgc3Vic2NyaWJlciwgY29udGV4dCB9ID0gYXJnO1xuICBzdWJzY3JpYmVyLmNsb3NlQ29udGV4dChjb250ZXh0KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
