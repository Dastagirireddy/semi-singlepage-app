System.register(['../Subscriber', '../scheduler/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1, async_1;
    var ThrottleTimeOperator, ThrottleTimeSubscriber;
    /**
     * Emits a value from the source Observable, then ignores subsequent source
     * values for `duration` milliseconds, then repeats this process.
     *
     * <span class="informal">Lets a value pass, then ignores source values for the
     * next `duration` milliseconds.</span>
     *
     * <img src="./img/throttleTime.png" width="100%">
     *
     * `throttleTime` emits the source Observable values on the output Observable
     * when its internal timer is disabled, and ignores source values when the timer
     * is enabled. Initially, the timer is disabled. As soon as the first source
     * value arrives, it is forwarded to the output Observable, and then the timer
     * is enabled. After `duration` milliseconds (or the time unit determined
     * internally by the optional `scheduler`) has passed, the timer is disabled,
     * and this process repeats for the next source value. Optionally takes a
     * {@link Scheduler} for managing timers.
     *
     * @example <caption>Emit clicks at a rate of at most one click per second</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks.throttleTime(1000);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link auditTime}
     * @see {@link debounceTime}
     * @see {@link delay}
     * @see {@link sampleTime}
     * @see {@link throttle}
     *
     * @param {number} duration Time to wait before emitting another value after
     * emitting the last value, measured in milliseconds or the time unit determined
     * internally by the optional `scheduler`.
     * @param {Scheduler} [scheduler=async] The {@link Scheduler} to use for
     * managing the timers that handle the sampling.
     * @return {Observable<T>} An Observable that performs the throttle operation to
     * limit the rate of emissions from the source.
     * @method throttleTime
     * @owner Observable
     */
    function throttleTime(duration, scheduler) {
        if (scheduler === void 0) { scheduler = async_1.async; }
        return this.lift(new ThrottleTimeOperator(duration, scheduler));
    }
    exports_1("throttleTime", throttleTime);
    function dispatchNext(arg) {
        var subscriber = arg.subscriber;
        subscriber.clearThrottle();
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
            ThrottleTimeOperator = (function () {
                function ThrottleTimeOperator(duration, scheduler) {
                    this.duration = duration;
                    this.scheduler = scheduler;
                }
                ThrottleTimeOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler));
                };
                return ThrottleTimeOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            ThrottleTimeSubscriber = (function (_super) {
                __extends(ThrottleTimeSubscriber, _super);
                function ThrottleTimeSubscriber(destination, duration, scheduler) {
                    _super.call(this, destination);
                    this.duration = duration;
                    this.scheduler = scheduler;
                }
                ThrottleTimeSubscriber.prototype._next = function (value) {
                    if (!this.throttled) {
                        this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, { subscriber: this }));
                        this.destination.next(value);
                    }
                };
                ThrottleTimeSubscriber.prototype.clearThrottle = function () {
                    var throttled = this.throttled;
                    if (throttled) {
                        throttled.unsubscribe();
                        this.remove(throttled);
                        this.throttled = null;
                    }
                };
                return ThrottleTimeSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3Rocm90dGxlVGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0NHO0lBQ0gsc0JBQWdDLFFBQWdCLEVBQUUsU0FBNEI7UUFBNUIseUJBQTRCLEdBQTVCLHlCQUE0QjtRQUM1RSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFGRCx1Q0FFQyxDQUFBO0lBbURELHNCQUF5QixHQUFtQjtRQUNsQywrQkFBVSxDQUFTO1FBQzNCLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7Ozs7Ozs7O1lBaEREO2dCQUNFLDhCQUFvQixRQUFnQixFQUNoQixTQUFvQjtvQkFEcEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtvQkFDaEIsY0FBUyxHQUFULFNBQVMsQ0FBVztnQkFDeEMsQ0FBQztnQkFFRCxtQ0FBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO29CQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNsRyxDQUFDO2dCQUNILDJCQUFDO1lBQUQsQ0FSQSxBQVFDLElBQUE7WUFFRDs7OztlQUlHO1lBQ0g7Z0JBQXdDLDBDQUFhO2dCQUduRCxnQ0FBWSxXQUEwQixFQUNsQixRQUFnQixFQUNoQixTQUFvQjtvQkFDdEMsa0JBQU0sV0FBVyxDQUFDLENBQUM7b0JBRkQsYUFBUSxHQUFSLFFBQVEsQ0FBUTtvQkFDaEIsY0FBUyxHQUFULFNBQVMsQ0FBVztnQkFFeEMsQ0FBQztnQkFFUyxzQ0FBSyxHQUFmLFVBQWdCLEtBQVE7b0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ3RHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMvQixDQUFDO2dCQUNILENBQUM7Z0JBRUQsOENBQWEsR0FBYjtvQkFDRSxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUNqQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUNkLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ3hCLENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCw2QkFBQztZQUFELENBeEJBLEFBd0JDLENBeEJ1Qyx1QkFBVSxHQXdCakQiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3IvdGhyb3R0bGVUaW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtPcGVyYXRvcn0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7U2NoZWR1bGVyfSBmcm9tICcuLi9TY2hlZHVsZXInO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge2FzeW5jfSBmcm9tICcuLi9zY2hlZHVsZXIvYXN5bmMnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcblxuLyoqXG4gKiBFbWl0cyBhIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCB0aGVuIGlnbm9yZXMgc3Vic2VxdWVudCBzb3VyY2VcbiAqIHZhbHVlcyBmb3IgYGR1cmF0aW9uYCBtaWxsaXNlY29uZHMsIHRoZW4gcmVwZWF0cyB0aGlzIHByb2Nlc3MuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkxldHMgYSB2YWx1ZSBwYXNzLCB0aGVuIGlnbm9yZXMgc291cmNlIHZhbHVlcyBmb3IgdGhlXG4gKiBuZXh0IGBkdXJhdGlvbmAgbWlsbGlzZWNvbmRzLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3Rocm90dGxlVGltZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgdGhyb3R0bGVUaW1lYCBlbWl0cyB0aGUgc291cmNlIE9ic2VydmFibGUgdmFsdWVzIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZVxuICogd2hlbiBpdHMgaW50ZXJuYWwgdGltZXIgaXMgZGlzYWJsZWQsIGFuZCBpZ25vcmVzIHNvdXJjZSB2YWx1ZXMgd2hlbiB0aGUgdGltZXJcbiAqIGlzIGVuYWJsZWQuIEluaXRpYWxseSwgdGhlIHRpbWVyIGlzIGRpc2FibGVkLiBBcyBzb29uIGFzIHRoZSBmaXJzdCBzb3VyY2VcbiAqIHZhbHVlIGFycml2ZXMsIGl0IGlzIGZvcndhcmRlZCB0byB0aGUgb3V0cHV0IE9ic2VydmFibGUsIGFuZCB0aGVuIHRoZSB0aW1lclxuICogaXMgZW5hYmxlZC4gQWZ0ZXIgYGR1cmF0aW9uYCBtaWxsaXNlY29uZHMgKG9yIHRoZSB0aW1lIHVuaXQgZGV0ZXJtaW5lZFxuICogaW50ZXJuYWxseSBieSB0aGUgb3B0aW9uYWwgYHNjaGVkdWxlcmApIGhhcyBwYXNzZWQsIHRoZSB0aW1lciBpcyBkaXNhYmxlZCxcbiAqIGFuZCB0aGlzIHByb2Nlc3MgcmVwZWF0cyBmb3IgdGhlIG5leHQgc291cmNlIHZhbHVlLiBPcHRpb25hbGx5IHRha2VzIGFcbiAqIHtAbGluayBTY2hlZHVsZXJ9IGZvciBtYW5hZ2luZyB0aW1lcnMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCBjbGlja3MgYXQgYSByYXRlIG9mIGF0IG1vc3Qgb25lIGNsaWNrIHBlciBzZWNvbmQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy50aHJvdHRsZVRpbWUoMTAwMCk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGF1ZGl0VGltZX1cbiAqIEBzZWUge0BsaW5rIGRlYm91bmNlVGltZX1cbiAqIEBzZWUge0BsaW5rIGRlbGF5fVxuICogQHNlZSB7QGxpbmsgc2FtcGxlVGltZX1cbiAqIEBzZWUge0BsaW5rIHRocm90dGxlfVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaW1lIHRvIHdhaXQgYmVmb3JlIGVtaXR0aW5nIGFub3RoZXIgdmFsdWUgYWZ0ZXJcbiAqIGVtaXR0aW5nIHRoZSBsYXN0IHZhbHVlLCBtZWFzdXJlZCBpbiBtaWxsaXNlY29uZHMgb3IgdGhlIHRpbWUgdW5pdCBkZXRlcm1pbmVkXG4gKiBpbnRlcm5hbGx5IGJ5IHRoZSBvcHRpb25hbCBgc2NoZWR1bGVyYC5cbiAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyPWFzeW5jXSBUaGUge0BsaW5rIFNjaGVkdWxlcn0gdG8gdXNlIGZvclxuICogbWFuYWdpbmcgdGhlIHRpbWVycyB0aGF0IGhhbmRsZSB0aGUgc2FtcGxpbmcuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fSBBbiBPYnNlcnZhYmxlIHRoYXQgcGVyZm9ybXMgdGhlIHRocm90dGxlIG9wZXJhdGlvbiB0b1xuICogbGltaXQgdGhlIHJhdGUgb2YgZW1pc3Npb25zIGZyb20gdGhlIHNvdXJjZS5cbiAqIEBtZXRob2QgdGhyb3R0bGVUaW1lXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGVUaW1lPFQ+KGR1cmF0aW9uOiBudW1iZXIsIHNjaGVkdWxlcjogU2NoZWR1bGVyID0gYXN5bmMpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgVGhyb3R0bGVUaW1lT3BlcmF0b3IoZHVyYXRpb24sIHNjaGVkdWxlcikpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRocm90dGxlVGltZVNpZ25hdHVyZTxUPiB7XG4gIChkdXJhdGlvbjogbnVtYmVyLCBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFQ+O1xufVxuXG5jbGFzcyBUaHJvdHRsZVRpbWVPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkdXJhdGlvbjogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjaGVkdWxlcjogU2NoZWR1bGVyKSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IFRocm90dGxlVGltZVN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5kdXJhdGlvbiwgdGhpcy5zY2hlZHVsZXIpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgVGhyb3R0bGVUaW1lU3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBwcml2YXRlIHRocm90dGxlZDogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGR1cmF0aW9uOiBudW1iZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgc2NoZWR1bGVyOiBTY2hlZHVsZXIpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpIHtcbiAgICBpZiAoIXRoaXMudGhyb3R0bGVkKSB7XG4gICAgICB0aGlzLmFkZCh0aGlzLnRocm90dGxlZCA9IHRoaXMuc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoTmV4dCwgdGhpcy5kdXJhdGlvbiwgeyBzdWJzY3JpYmVyOiB0aGlzIH0pKTtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXJUaHJvdHRsZSgpIHtcbiAgICBjb25zdCB0aHJvdHRsZWQgPSB0aGlzLnRocm90dGxlZDtcbiAgICBpZiAodGhyb3R0bGVkKSB7XG4gICAgICB0aHJvdHRsZWQudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMucmVtb3ZlKHRocm90dGxlZCk7XG4gICAgICB0aGlzLnRocm90dGxlZCA9IG51bGw7XG4gICAgfVxuICB9XG59XG5cbmludGVyZmFjZSBEaXNwYXRjaEFyZzxUPiB7XG4gIHN1YnNjcmliZXI6IFRocm90dGxlVGltZVN1YnNjcmliZXI8VD47XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoTmV4dDxUPihhcmc6IERpc3BhdGNoQXJnPFQ+KSB7XG4gIGNvbnN0IHsgc3Vic2NyaWJlciB9ID0gYXJnO1xuICBzdWJzY3JpYmVyLmNsZWFyVGhyb3R0bGUoKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
