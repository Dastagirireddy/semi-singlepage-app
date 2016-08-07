System.register(['../scheduler/async', '../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var async_1, Subscriber_1;
    var AuditTimeOperator, AuditTimeSubscriber;
    /**
     * Ignores source values for `duration` milliseconds, then emits the most recent
     * value from the source Observable, then repeats this process.
     *
     * <span class="informal">When it sees a source values, it ignores that plus
     * the next ones for `duration` milliseconds, and then it emits the most recent
     * value from the source.</span>
     *
     * <img src="./img/auditTime.png" width="100%">
     *
     * `auditTime` is similar to `throttleTime`, but emits the last value from the
     * silenced time window, instead of the first value. `auditTime` emits the most
     * recent value from the source Observable on the output Observable as soon as
     * its internal timer becomes disabled, and ignores source values while the
     * timer is enabled. Initially, the timer is disabled. As soon as the first
     * source value arrives, the timer is enabled. After `duration` milliseconds (or
     * the time unit determined internally by the optional `scheduler`) has passed,
     * the timer is disabled, then the most recent source value is emitted on the
     * output Observable, and this process repeats for the next source value.
     * Optionally takes a {@link Scheduler} for managing timers.
     *
     * @example <caption>Emit clicks at a rate of at most one click per second</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var result = clicks.auditTime(1000);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link audit}
     * @see {@link debounceTime}
     * @see {@link delay}
     * @see {@link sampleTime}
     * @see {@link throttleTime}
     *
     * @param {number} duration Time to wait before emitting the most recent source
     * value, measured in milliseconds or the time unit determined internally
     * by the optional `scheduler`.
     * @param {Scheduler} [scheduler=async] The {@link Scheduler} to use for
     * managing the timers that handle the rate-limiting behavior.
     * @return {Observable<T>} An Observable that performs rate-limiting of
     * emissions from the source Observable.
     * @method auditTime
     * @owner Observable
     */
    function auditTime(duration, scheduler) {
        if (scheduler === void 0) { scheduler = async_1.async; }
        return this.lift(new AuditTimeOperator(duration, scheduler));
    }
    exports_1("auditTime", auditTime);
    function dispatchNext(subscriber) {
        subscriber.clearThrottle();
    }
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            AuditTimeOperator = (function () {
                function AuditTimeOperator(duration, scheduler) {
                    this.duration = duration;
                    this.scheduler = scheduler;
                }
                AuditTimeOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new AuditTimeSubscriber(subscriber, this.duration, this.scheduler));
                };
                return AuditTimeOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            AuditTimeSubscriber = (function (_super) {
                __extends(AuditTimeSubscriber, _super);
                function AuditTimeSubscriber(destination, duration, scheduler) {
                    _super.call(this, destination);
                    this.duration = duration;
                    this.scheduler = scheduler;
                    this.hasValue = false;
                }
                AuditTimeSubscriber.prototype._next = function (value) {
                    this.value = value;
                    this.hasValue = true;
                    if (!this.throttled) {
                        this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, this));
                    }
                };
                AuditTimeSubscriber.prototype.clearThrottle = function () {
                    var _a = this, value = _a.value, hasValue = _a.hasValue, throttled = _a.throttled;
                    if (throttled) {
                        this.remove(throttled);
                        this.throttled = null;
                        throttled.unsubscribe();
                    }
                    if (hasValue) {
                        this.value = null;
                        this.hasValue = false;
                        this.destination.next(value);
                    }
                };
                return AuditTimeSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL2F1ZGl0VGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUNHO0lBQ0gsbUJBQTZCLFFBQWdCLEVBQUUsU0FBNEI7UUFBNUIseUJBQTRCLEdBQTVCLHlCQUE0QjtRQUN6RSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFGRCxpQ0FFQyxDQUFBO0lBd0RELHNCQUF5QixVQUFrQztRQUN6RCxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7Ozs7OztZQXBERDtnQkFDRSwyQkFBb0IsUUFBZ0IsRUFDaEIsU0FBb0I7b0JBRHBCLGFBQVEsR0FBUixRQUFRLENBQVE7b0JBQ2hCLGNBQVMsR0FBVCxTQUFTLENBQVc7Z0JBQ3hDLENBQUM7Z0JBRUQsZ0NBQUksR0FBSixVQUFLLFVBQXlCLEVBQUUsTUFBVztvQkFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDL0YsQ0FBQztnQkFDSCx3QkFBQztZQUFELENBUkEsQUFRQyxJQUFBO1lBRUQ7Ozs7ZUFJRztZQUNIO2dCQUFxQyx1Q0FBYTtnQkFNaEQsNkJBQVksV0FBMEIsRUFDbEIsUUFBZ0IsRUFDaEIsU0FBb0I7b0JBQ3RDLGtCQUFNLFdBQVcsQ0FBQyxDQUFDO29CQUZELGFBQVEsR0FBUixRQUFRLENBQVE7b0JBQ2hCLGNBQVMsR0FBVCxTQUFTLENBQVc7b0JBTGhDLGFBQVEsR0FBWSxLQUFLLENBQUM7Z0JBT2xDLENBQUM7Z0JBRVMsbUNBQUssR0FBZixVQUFnQixLQUFRO29CQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN4RixDQUFDO2dCQUNILENBQUM7Z0JBRUQsMkNBQWEsR0FBYjtvQkFDRSxJQUFBLFNBQTJDLEVBQW5DLGdCQUFLLEVBQUUsc0JBQVEsRUFBRSx3QkFBUyxDQUFVO29CQUM1QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO3dCQUN0QixTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQzFCLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDYixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzt3QkFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7d0JBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMvQixDQUFDO2dCQUNILENBQUM7Z0JBQ0gsMEJBQUM7WUFBRCxDQWpDQSxBQWlDQyxDQWpDb0MsdUJBQVUsR0FpQzlDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL2F1ZGl0VGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXN5bmN9IGZyb20gJy4uL3NjaGVkdWxlci9hc3luYyc7XG5pbXBvcnQge09wZXJhdG9yfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQge1NjaGVkdWxlcn0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbi8qKlxuICogSWdub3JlcyBzb3VyY2UgdmFsdWVzIGZvciBgZHVyYXRpb25gIG1pbGxpc2Vjb25kcywgdGhlbiBlbWl0cyB0aGUgbW9zdCByZWNlbnRcbiAqIHZhbHVlIGZyb20gdGhlIHNvdXJjZSBPYnNlcnZhYmxlLCB0aGVuIHJlcGVhdHMgdGhpcyBwcm9jZXNzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5XaGVuIGl0IHNlZXMgYSBzb3VyY2UgdmFsdWVzLCBpdCBpZ25vcmVzIHRoYXQgcGx1c1xuICogdGhlIG5leHQgb25lcyBmb3IgYGR1cmF0aW9uYCBtaWxsaXNlY29uZHMsIGFuZCB0aGVuIGl0IGVtaXRzIHRoZSBtb3N0IHJlY2VudFxuICogdmFsdWUgZnJvbSB0aGUgc291cmNlLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2F1ZGl0VGltZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBgYXVkaXRUaW1lYCBpcyBzaW1pbGFyIHRvIGB0aHJvdHRsZVRpbWVgLCBidXQgZW1pdHMgdGhlIGxhc3QgdmFsdWUgZnJvbSB0aGVcbiAqIHNpbGVuY2VkIHRpbWUgd2luZG93LCBpbnN0ZWFkIG9mIHRoZSBmaXJzdCB2YWx1ZS4gYGF1ZGl0VGltZWAgZW1pdHMgdGhlIG1vc3RcbiAqIHJlY2VudCB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBvbiB0aGUgb3V0cHV0IE9ic2VydmFibGUgYXMgc29vbiBhc1xuICogaXRzIGludGVybmFsIHRpbWVyIGJlY29tZXMgZGlzYWJsZWQsIGFuZCBpZ25vcmVzIHNvdXJjZSB2YWx1ZXMgd2hpbGUgdGhlXG4gKiB0aW1lciBpcyBlbmFibGVkLiBJbml0aWFsbHksIHRoZSB0aW1lciBpcyBkaXNhYmxlZC4gQXMgc29vbiBhcyB0aGUgZmlyc3RcbiAqIHNvdXJjZSB2YWx1ZSBhcnJpdmVzLCB0aGUgdGltZXIgaXMgZW5hYmxlZC4gQWZ0ZXIgYGR1cmF0aW9uYCBtaWxsaXNlY29uZHMgKG9yXG4gKiB0aGUgdGltZSB1bml0IGRldGVybWluZWQgaW50ZXJuYWxseSBieSB0aGUgb3B0aW9uYWwgYHNjaGVkdWxlcmApIGhhcyBwYXNzZWQsXG4gKiB0aGUgdGltZXIgaXMgZGlzYWJsZWQsIHRoZW4gdGhlIG1vc3QgcmVjZW50IHNvdXJjZSB2YWx1ZSBpcyBlbWl0dGVkIG9uIHRoZVxuICogb3V0cHV0IE9ic2VydmFibGUsIGFuZCB0aGlzIHByb2Nlc3MgcmVwZWF0cyBmb3IgdGhlIG5leHQgc291cmNlIHZhbHVlLlxuICogT3B0aW9uYWxseSB0YWtlcyBhIHtAbGluayBTY2hlZHVsZXJ9IGZvciBtYW5hZ2luZyB0aW1lcnMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCBjbGlja3MgYXQgYSByYXRlIG9mIGF0IG1vc3Qgb25lIGNsaWNrIHBlciBzZWNvbmQ8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIHJlc3VsdCA9IGNsaWNrcy5hdWRpdFRpbWUoMTAwMCk7XG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGF1ZGl0fVxuICogQHNlZSB7QGxpbmsgZGVib3VuY2VUaW1lfVxuICogQHNlZSB7QGxpbmsgZGVsYXl9XG4gKiBAc2VlIHtAbGluayBzYW1wbGVUaW1lfVxuICogQHNlZSB7QGxpbmsgdGhyb3R0bGVUaW1lfVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvbiBUaW1lIHRvIHdhaXQgYmVmb3JlIGVtaXR0aW5nIHRoZSBtb3N0IHJlY2VudCBzb3VyY2VcbiAqIHZhbHVlLCBtZWFzdXJlZCBpbiBtaWxsaXNlY29uZHMgb3IgdGhlIHRpbWUgdW5pdCBkZXRlcm1pbmVkIGludGVybmFsbHlcbiAqIGJ5IHRoZSBvcHRpb25hbCBgc2NoZWR1bGVyYC5cbiAqIEBwYXJhbSB7U2NoZWR1bGVyfSBbc2NoZWR1bGVyPWFzeW5jXSBUaGUge0BsaW5rIFNjaGVkdWxlcn0gdG8gdXNlIGZvclxuICogbWFuYWdpbmcgdGhlIHRpbWVycyB0aGF0IGhhbmRsZSB0aGUgcmF0ZS1saW1pdGluZyBiZWhhdmlvci5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VD59IEFuIE9ic2VydmFibGUgdGhhdCBwZXJmb3JtcyByYXRlLWxpbWl0aW5nIG9mXG4gKiBlbWlzc2lvbnMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUuXG4gKiBAbWV0aG9kIGF1ZGl0VGltZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGF1ZGl0VGltZTxUPihkdXJhdGlvbjogbnVtYmVyLCBzY2hlZHVsZXI6IFNjaGVkdWxlciA9IGFzeW5jKTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IEF1ZGl0VGltZU9wZXJhdG9yKGR1cmF0aW9uLCBzY2hlZHVsZXIpKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBdWRpdFRpbWVTaWduYXR1cmU8VD4ge1xuICAoZHVyYXRpb246IG51bWJlciwgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxUPjtcbn1cblxuY2xhc3MgQXVkaXRUaW1lT3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZHVyYXRpb246IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFNjaGVkdWxlcikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5fc3Vic2NyaWJlKG5ldyBBdWRpdFRpbWVTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuZHVyYXRpb24sIHRoaXMuc2NoZWR1bGVyKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIEF1ZGl0VGltZVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcblxuICBwcml2YXRlIHZhbHVlOiBUO1xuICBwcml2YXRlIGhhc1ZhbHVlOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgdGhyb3R0bGVkOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgZHVyYXRpb246IG51bWJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI6IFNjaGVkdWxlcikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmhhc1ZhbHVlID0gdHJ1ZTtcbiAgICBpZiAoIXRoaXMudGhyb3R0bGVkKSB7XG4gICAgICB0aGlzLmFkZCh0aGlzLnRocm90dGxlZCA9IHRoaXMuc2NoZWR1bGVyLnNjaGVkdWxlKGRpc3BhdGNoTmV4dCwgdGhpcy5kdXJhdGlvbiwgdGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyVGhyb3R0bGUoKTogdm9pZCB7XG4gICAgY29uc3QgeyB2YWx1ZSwgaGFzVmFsdWUsIHRocm90dGxlZCB9ID0gdGhpcztcbiAgICBpZiAodGhyb3R0bGVkKSB7XG4gICAgICB0aGlzLnJlbW92ZSh0aHJvdHRsZWQpO1xuICAgICAgdGhpcy50aHJvdHRsZWQgPSBudWxsO1xuICAgICAgdGhyb3R0bGVkLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmIChoYXNWYWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICB0aGlzLmhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQodmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaE5leHQ8VD4oc3Vic2NyaWJlcjogQXVkaXRUaW1lU3Vic2NyaWJlcjxUPik6IHZvaWQge1xuICBzdWJzY3JpYmVyLmNsZWFyVGhyb3R0bGUoKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
