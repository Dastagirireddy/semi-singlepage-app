System.register(['../Subscriber', '../scheduler/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1, async_1;
    var SampleTimeOperator, SampleTimeSubscriber;
    /**
     * Emits the most recently emitted value from the source Observable within
     * periodic time intervals.
     *
     * <span class="informal">Samples the source Observable at periodic time
     * intervals, emitting what it samples.</span>
     *
     * <img src="./img/sampleTime.png" width="100%">
     *
     * `sampleTime` periodically looks at the source Observable and emits whichever
     * value it has most recently emitted since the previous sampling, unless the
     * source has not emitted anything since the previous sampling. The sampling
     * happens periodically in time every `period` milliseconds (or the time unit
     * defined by the optional `scheduler` argument). The sampling starts as soon as
     * the output Observable is subscribed.
     *
     * @example <caption>Every second, emit the most recent click at most once</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks.sampleTime(1000);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link auditTime}
     * @see {@link debounceTime}
     * @see {@link delay}
     * @see {@link sample}
     * @see {@link throttleTime}
     *
     * @param {number} period The sampling period expressed in milliseconds or the
     * time unit determined internally by the optional `scheduler`.
     * @param {Scheduler} [scheduler=async] The {@link Scheduler} to use for
     * managing the timers that handle the sampling.
     * @return {Observable<T>} An Observable that emits the results of sampling the
     * values emitted by the source Observable at the specified time interval.
     * @method sampleTime
     * @owner Observable
     */
    function sampleTime(period, scheduler) {
        if (scheduler === void 0) { scheduler = async_1.async; }
        return this.lift(new SampleTimeOperator(period, scheduler));
    }
    exports_1("sampleTime", sampleTime);
    function dispatchNotification(state) {
        var subscriber = state.subscriber, period = state.period;
        subscriber.notifyNext();
        this.schedule(state, period);
    }
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            SampleTimeOperator = (function () {
                function SampleTimeOperator(period, scheduler) {
                    this.period = period;
                    this.scheduler = scheduler;
                }
                SampleTimeOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new SampleTimeSubscriber(subscriber, this.period, this.scheduler));
                };
                return SampleTimeOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SampleTimeSubscriber = (function (_super) {
                __extends(SampleTimeSubscriber, _super);
                function SampleTimeSubscriber(destination, period, scheduler) {
                    _super.call(this, destination);
                    this.period = period;
                    this.scheduler = scheduler;
                    this.hasValue = false;
                    this.add(scheduler.schedule(dispatchNotification, period, { subscriber: this, period: period }));
                }
                SampleTimeSubscriber.prototype._next = function (value) {
                    this.lastValue = value;
                    this.hasValue = true;
                };
                SampleTimeSubscriber.prototype.notifyNext = function () {
                    if (this.hasValue) {
                        this.hasValue = false;
                        this.destination.next(this.lastValue);
                    }
                };
                return SampleTimeSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3NhbXBsZVRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1DRztJQUNILG9CQUE4QixNQUFjLEVBQUUsU0FBNEI7UUFBNUIseUJBQTRCLEdBQTVCLHlCQUE0QjtRQUN4RSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFGRCxtQ0FFQyxDQUFBO0lBNkNELDhCQUFpQyxLQUFVO1FBQ25DLGlDQUFVLEVBQUUscUJBQU0sQ0FBVztRQUNuQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7Ozs7OztZQTNDRDtnQkFDRSw0QkFBb0IsTUFBYyxFQUNkLFNBQW9CO29CQURwQixXQUFNLEdBQU4sTUFBTSxDQUFRO29CQUNkLGNBQVMsR0FBVCxTQUFTLENBQVc7Z0JBQ3hDLENBQUM7Z0JBRUQsaUNBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztvQkFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDOUYsQ0FBQztnQkFDSCx5QkFBQztZQUFELENBUkEsQUFRQyxJQUFBO1lBRUQ7Ozs7ZUFJRztZQUNIO2dCQUFzQyx3Q0FBYTtnQkFJakQsOEJBQVksV0FBMEIsRUFDbEIsTUFBYyxFQUNkLFNBQW9CO29CQUN0QyxrQkFBTSxXQUFXLENBQUMsQ0FBQztvQkFGRCxXQUFNLEdBQU4sTUFBTSxDQUFRO29CQUNkLGNBQVMsR0FBVCxTQUFTLENBQVc7b0JBSnhDLGFBQVEsR0FBWSxLQUFLLENBQUM7b0JBTXhCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQUEsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMzRixDQUFDO2dCQUVTLG9DQUFLLEdBQWYsVUFBZ0IsS0FBUTtvQkFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixDQUFDO2dCQUVELHlDQUFVLEdBQVY7b0JBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO3dCQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3hDLENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCwyQkFBQztZQUFELENBdEJBLEFBc0JDLENBdEJxQyx1QkFBVSxHQXNCL0MiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3Ivc2FtcGxlVGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge09wZXJhdG9yfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHtTY2hlZHVsZXJ9IGZyb20gJy4uL1NjaGVkdWxlcic7XG5pbXBvcnQge2FzeW5jfSBmcm9tICcuLi9zY2hlZHVsZXIvYXN5bmMnO1xuXG4vKipcbiAqIEVtaXRzIHRoZSBtb3N0IHJlY2VudGx5IGVtaXR0ZWQgdmFsdWUgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgd2l0aGluXG4gKiBwZXJpb2RpYyB0aW1lIGludGVydmFscy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+U2FtcGxlcyB0aGUgc291cmNlIE9ic2VydmFibGUgYXQgcGVyaW9kaWMgdGltZVxuICogaW50ZXJ2YWxzLCBlbWl0dGluZyB3aGF0IGl0IHNhbXBsZXMuPC9zcGFuPlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvc2FtcGxlVGltZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgc2FtcGxlVGltZWAgcGVyaW9kaWNhbGx5IGxvb2tzIGF0IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhbmQgZW1pdHMgd2hpY2hldmVyXG4gKiB2YWx1ZSBpdCBoYXMgbW9zdCByZWNlbnRseSBlbWl0dGVkIHNpbmNlIHRoZSBwcmV2aW91cyBzYW1wbGluZywgdW5sZXNzIHRoZVxuICogc291cmNlIGhhcyBub3QgZW1pdHRlZCBhbnl0aGluZyBzaW5jZSB0aGUgcHJldmlvdXMgc2FtcGxpbmcuIFRoZSBzYW1wbGluZ1xuICogaGFwcGVucyBwZXJpb2RpY2FsbHkgaW4gdGltZSBldmVyeSBgcGVyaW9kYCBtaWxsaXNlY29uZHMgKG9yIHRoZSB0aW1lIHVuaXRcbiAqIGRlZmluZWQgYnkgdGhlIG9wdGlvbmFsIGBzY2hlZHVsZXJgIGFyZ3VtZW50KS4gVGhlIHNhbXBsaW5nIHN0YXJ0cyBhcyBzb29uIGFzXG4gKiB0aGUgb3V0cHV0IE9ic2VydmFibGUgaXMgc3Vic2NyaWJlZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FdmVyeSBzZWNvbmQsIGVtaXQgdGhlIG1vc3QgcmVjZW50IGNsaWNrIGF0IG1vc3Qgb25jZTwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLnNhbXBsZVRpbWUoMTAwMCk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGF1ZGl0VGltZX1cbiAqIEBzZWUge0BsaW5rIGRlYm91bmNlVGltZX1cbiAqIEBzZWUge0BsaW5rIGRlbGF5fVxuICogQHNlZSB7QGxpbmsgc2FtcGxlfVxuICogQHNlZSB7QGxpbmsgdGhyb3R0bGVUaW1lfVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBwZXJpb2QgVGhlIHNhbXBsaW5nIHBlcmlvZCBleHByZXNzZWQgaW4gbWlsbGlzZWNvbmRzIG9yIHRoZVxuICogdGltZSB1bml0IGRldGVybWluZWQgaW50ZXJuYWxseSBieSB0aGUgb3B0aW9uYWwgYHNjaGVkdWxlcmAuXG4gKiBAcGFyYW0ge1NjaGVkdWxlcn0gW3NjaGVkdWxlcj1hc3luY10gVGhlIHtAbGluayBTY2hlZHVsZXJ9IHRvIHVzZSBmb3JcbiAqIG1hbmFnaW5nIHRoZSB0aW1lcnMgdGhhdCBoYW5kbGUgdGhlIHNhbXBsaW5nLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSByZXN1bHRzIG9mIHNhbXBsaW5nIHRoZVxuICogdmFsdWVzIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIGF0IHRoZSBzcGVjaWZpZWQgdGltZSBpbnRlcnZhbC5cbiAqIEBtZXRob2Qgc2FtcGxlVGltZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbXBsZVRpbWU8VD4ocGVyaW9kOiBudW1iZXIsIHNjaGVkdWxlcjogU2NoZWR1bGVyID0gYXN5bmMpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgU2FtcGxlVGltZU9wZXJhdG9yKHBlcmlvZCwgc2NoZWR1bGVyKSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2FtcGxlVGltZVNpZ25hdHVyZTxUPiB7XG4gIChwZXJpb2Q6IG51bWJlciwgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxUPjtcbn1cblxuY2xhc3MgU2FtcGxlVGltZU9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBlcmlvZDogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogU2NoZWR1bGVyKSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IFNhbXBsZVRpbWVTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucGVyaW9kLCB0aGlzLnNjaGVkdWxlcikpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBTYW1wbGVUaW1lU3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBsYXN0VmFsdWU6IFQ7XG4gIGhhc1ZhbHVlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcGVyaW9kOiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBTY2hlZHVsZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgdGhpcy5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoTm90aWZpY2F0aW9uLCBwZXJpb2QsIHsgc3Vic2NyaWJlcjogdGhpcywgcGVyaW9kIH0pKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCkge1xuICAgIHRoaXMubGFzdFZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5oYXNWYWx1ZSA9IHRydWU7XG4gIH1cblxuICBub3RpZnlOZXh0KCkge1xuICAgIGlmICh0aGlzLmhhc1ZhbHVlKSB7XG4gICAgICB0aGlzLmhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodGhpcy5sYXN0VmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaE5vdGlmaWNhdGlvbjxUPihzdGF0ZTogYW55KSB7XG4gIGxldCB7IHN1YnNjcmliZXIsIHBlcmlvZCB9ID0gc3RhdGU7XG4gIHN1YnNjcmliZXIubm90aWZ5TmV4dCgpO1xuICAoPGFueT50aGlzKS5zY2hlZHVsZShzdGF0ZSwgcGVyaW9kKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
