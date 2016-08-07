System.register(['../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1;
    var BufferCountOperator, BufferCountSubscriber;
    /**
     * Buffers the source Observable values until the size hits the maximum
     * `bufferSize` given.
     *
     * <span class="informal">Collects values from the past as an array, and emits
     * that array only when its size reaches `bufferSize`.</span>
     *
     * <img src="./img/bufferCount.png" width="100%">
     *
     * Buffers a number of values from the source Observable by `bufferSize` then
     * emits the buffer and clears it, and starts a new buffer each
     * `startBufferEvery` values. If `startBufferEvery` is not provided or is
     * `null`, then new buffers are started immediately at the start of the source
     * and when each buffer closes and is emitted.
     *
     * @example <caption>Emit the last two click events as an array</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var buffered = clicks.bufferCount(2);
     * buffered.subscribe(x => console.log(x));
     *
     * @example <caption>On every click, emit the last two click events as an array</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * var buffered = clicks.bufferCount(2, 1);
     * buffered.subscribe(x => console.log(x));
     *
     * @see {@link buffer}
     * @see {@link bufferTime}
     * @see {@link bufferToggle}
     * @see {@link bufferWhen}
     * @see {@link pairwise}
     * @see {@link windowCount}
     *
     * @param {number} bufferSize The maximum size of the buffer emitted.
     * @param {number} [startBufferEvery] Interval at which to start a new buffer.
     * For example if `startBufferEvery` is `2`, then a new buffer will be started
     * on every other value from the source. A new buffer is started at the
     * beginning of the source by default.
     * @return {Observable<T[]>} An Observable of arrays of buffered values.
     * @method bufferCount
     * @owner Observable
     */
    function bufferCount(bufferSize, startBufferEvery) {
        if (startBufferEvery === void 0) { startBufferEvery = null; }
        return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
    }
    exports_1("bufferCount", bufferCount);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            BufferCountOperator = (function () {
                function BufferCountOperator(bufferSize, startBufferEvery) {
                    this.bufferSize = bufferSize;
                    this.startBufferEvery = startBufferEvery;
                }
                BufferCountOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new BufferCountSubscriber(subscriber, this.bufferSize, this.startBufferEvery));
                };
                return BufferCountOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            BufferCountSubscriber = (function (_super) {
                __extends(BufferCountSubscriber, _super);
                function BufferCountSubscriber(destination, bufferSize, startBufferEvery) {
                    _super.call(this, destination);
                    this.bufferSize = bufferSize;
                    this.startBufferEvery = startBufferEvery;
                    this.buffers = [[]];
                    this.count = 0;
                }
                BufferCountSubscriber.prototype._next = function (value) {
                    var count = (this.count += 1);
                    var destination = this.destination;
                    var bufferSize = this.bufferSize;
                    var startBufferEvery = (this.startBufferEvery == null) ? bufferSize : this.startBufferEvery;
                    var buffers = this.buffers;
                    var len = buffers.length;
                    var remove = -1;
                    if (count % startBufferEvery === 0) {
                        buffers.push([]);
                    }
                    for (var i = 0; i < len; i++) {
                        var buffer = buffers[i];
                        buffer.push(value);
                        if (buffer.length === bufferSize) {
                            remove = i;
                            destination.next(buffer);
                        }
                    }
                    if (remove !== -1) {
                        buffers.splice(remove, 1);
                    }
                };
                BufferCountSubscriber.prototype._complete = function () {
                    var destination = this.destination;
                    var buffers = this.buffers;
                    while (buffers.length > 0) {
                        var buffer = buffers.shift();
                        if (buffer.length > 0) {
                            destination.next(buffer);
                        }
                    }
                    _super.prototype._complete.call(this);
                };
                return BufferCountSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL2J1ZmZlckNvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdDRztJQUNILHFCQUErQixVQUFrQixFQUFFLGdCQUErQjtRQUEvQixnQ0FBK0IsR0FBL0IsdUJBQStCO1FBQ2hGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQW1CLENBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRkQscUNBRUMsQ0FBQTs7Ozs7OztZQU1EO2dCQUNFLDZCQUFvQixVQUFrQixFQUFVLGdCQUF3QjtvQkFBcEQsZUFBVSxHQUFWLFVBQVUsQ0FBUTtvQkFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7Z0JBQ3hFLENBQUM7Z0JBRUQsa0NBQUksR0FBSixVQUFLLFVBQTJCLEVBQUUsTUFBVztvQkFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUMxRyxDQUFDO2dCQUNILDBCQUFDO1lBQUQsQ0FQQSxBQU9DLElBQUE7WUFFRDs7OztlQUlHO1lBQ0g7Z0JBQXVDLHlDQUFhO2dCQUlsRCwrQkFBWSxXQUE0QixFQUFVLFVBQWtCLEVBQVUsZ0JBQXdCO29CQUNwRyxrQkFBTSxXQUFXLENBQUMsQ0FBQztvQkFENkIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtvQkFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7b0JBSDlGLFlBQU8sR0FBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUMzQixVQUFLLEdBQVcsQ0FBQyxDQUFDO2dCQUkxQixDQUFDO2dCQUVTLHFDQUFLLEdBQWYsVUFBZ0IsS0FBUTtvQkFDdEIsSUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO29CQUNyQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUNuQyxJQUFNLGdCQUFnQixHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7b0JBQzlGLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQzdCLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7b0JBQzNCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUVoQixFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDbkIsQ0FBQztvQkFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUM3QixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ25CLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQzs0QkFDakMsTUFBTSxHQUFHLENBQUMsQ0FBQzs0QkFDWCxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMzQixDQUFDO29CQUNILENBQUM7b0JBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzVCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFUyx5Q0FBUyxHQUFuQjtvQkFDRSxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO29CQUNyQyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUM3QixPQUFPLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQzFCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDN0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN0QixXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMzQixDQUFDO29CQUNILENBQUM7b0JBQ0QsZ0JBQUssQ0FBQyxTQUFTLFdBQUUsQ0FBQztnQkFDcEIsQ0FBQztnQkFDSCw0QkFBQztZQUFELENBOUNBLEFBOENDLENBOUNzQyx1QkFBVSxHQThDaEQiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3IvYnVmZmVyQ291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wZXJhdG9yfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcblxuLyoqXG4gKiBCdWZmZXJzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB2YWx1ZXMgdW50aWwgdGhlIHNpemUgaGl0cyB0aGUgbWF4aW11bVxuICogYGJ1ZmZlclNpemVgIGdpdmVuLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5Db2xsZWN0cyB2YWx1ZXMgZnJvbSB0aGUgcGFzdCBhcyBhbiBhcnJheSwgYW5kIGVtaXRzXG4gKiB0aGF0IGFycmF5IG9ubHkgd2hlbiBpdHMgc2l6ZSByZWFjaGVzIGBidWZmZXJTaXplYC48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9idWZmZXJDb3VudC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBCdWZmZXJzIGEgbnVtYmVyIG9mIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBieSBgYnVmZmVyU2l6ZWAgdGhlblxuICogZW1pdHMgdGhlIGJ1ZmZlciBhbmQgY2xlYXJzIGl0LCBhbmQgc3RhcnRzIGEgbmV3IGJ1ZmZlciBlYWNoXG4gKiBgc3RhcnRCdWZmZXJFdmVyeWAgdmFsdWVzLiBJZiBgc3RhcnRCdWZmZXJFdmVyeWAgaXMgbm90IHByb3ZpZGVkIG9yIGlzXG4gKiBgbnVsbGAsIHRoZW4gbmV3IGJ1ZmZlcnMgYXJlIHN0YXJ0ZWQgaW1tZWRpYXRlbHkgYXQgdGhlIHN0YXJ0IG9mIHRoZSBzb3VyY2VcbiAqIGFuZCB3aGVuIGVhY2ggYnVmZmVyIGNsb3NlcyBhbmQgaXMgZW1pdHRlZC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IHRoZSBsYXN0IHR3byBjbGljayBldmVudHMgYXMgYW4gYXJyYXk8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGJ1ZmZlcmVkID0gY2xpY2tzLmJ1ZmZlckNvdW50KDIpO1xuICogYnVmZmVyZWQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk9uIGV2ZXJ5IGNsaWNrLCBlbWl0IHRoZSBsYXN0IHR3byBjbGljayBldmVudHMgYXMgYW4gYXJyYXk8L2NhcHRpb24+XG4gKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICogdmFyIGJ1ZmZlcmVkID0gY2xpY2tzLmJ1ZmZlckNvdW50KDIsIDEpO1xuICogYnVmZmVyZWQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIGJ1ZmZlcn1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlclRpbWV9XG4gKiBAc2VlIHtAbGluayBidWZmZXJUb2dnbGV9XG4gKiBAc2VlIHtAbGluayBidWZmZXJXaGVufVxuICogQHNlZSB7QGxpbmsgcGFpcndpc2V9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dDb3VudH1cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gYnVmZmVyU2l6ZSBUaGUgbWF4aW11bSBzaXplIG9mIHRoZSBidWZmZXIgZW1pdHRlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnRCdWZmZXJFdmVyeV0gSW50ZXJ2YWwgYXQgd2hpY2ggdG8gc3RhcnQgYSBuZXcgYnVmZmVyLlxuICogRm9yIGV4YW1wbGUgaWYgYHN0YXJ0QnVmZmVyRXZlcnlgIGlzIGAyYCwgdGhlbiBhIG5ldyBidWZmZXIgd2lsbCBiZSBzdGFydGVkXG4gKiBvbiBldmVyeSBvdGhlciB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UuIEEgbmV3IGJ1ZmZlciBpcyBzdGFydGVkIGF0IHRoZVxuICogYmVnaW5uaW5nIG9mIHRoZSBzb3VyY2UgYnkgZGVmYXVsdC5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn0gQW4gT2JzZXJ2YWJsZSBvZiBhcnJheXMgb2YgYnVmZmVyZWQgdmFsdWVzLlxuICogQG1ldGhvZCBidWZmZXJDb3VudFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1ZmZlckNvdW50PFQ+KGJ1ZmZlclNpemU6IG51bWJlciwgc3RhcnRCdWZmZXJFdmVyeTogbnVtYmVyID0gbnVsbCk6IE9ic2VydmFibGU8VFtdPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IEJ1ZmZlckNvdW50T3BlcmF0b3I8VD4oYnVmZmVyU2l6ZSwgc3RhcnRCdWZmZXJFdmVyeSkpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJ1ZmZlckNvdW50U2lnbmF0dXJlPFQ+IHtcbiAgKGJ1ZmZlclNpemU6IG51bWJlciwgc3RhcnRCdWZmZXJFdmVyeT86IG51bWJlcik6IE9ic2VydmFibGU8VFtdPjtcbn1cblxuY2xhc3MgQnVmZmVyQ291bnRPcGVyYXRvcjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFRbXT4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJ1ZmZlclNpemU6IG51bWJlciwgcHJpdmF0ZSBzdGFydEJ1ZmZlckV2ZXJ5OiBudW1iZXIpIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUW10+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5fc3Vic2NyaWJlKG5ldyBCdWZmZXJDb3VudFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5idWZmZXJTaXplLCB0aGlzLnN0YXJ0QnVmZmVyRXZlcnkpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgQnVmZmVyQ291bnRTdWJzY3JpYmVyPFQ+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiB7XG4gIHByaXZhdGUgYnVmZmVyczogQXJyYXk8VFtdPiA9IFtbXV07XG4gIHByaXZhdGUgY291bnQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VFtdPiwgcHJpdmF0ZSBidWZmZXJTaXplOiBudW1iZXIsIHByaXZhdGUgc3RhcnRCdWZmZXJFdmVyeTogbnVtYmVyKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKSB7XG4gICAgY29uc3QgY291bnQgPSAodGhpcy5jb3VudCArPSAxKTtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgY29uc3QgYnVmZmVyU2l6ZSA9IHRoaXMuYnVmZmVyU2l6ZTtcbiAgICBjb25zdCBzdGFydEJ1ZmZlckV2ZXJ5ID0gKHRoaXMuc3RhcnRCdWZmZXJFdmVyeSA9PSBudWxsKSA/IGJ1ZmZlclNpemUgOiB0aGlzLnN0YXJ0QnVmZmVyRXZlcnk7XG4gICAgY29uc3QgYnVmZmVycyA9IHRoaXMuYnVmZmVycztcbiAgICBjb25zdCBsZW4gPSBidWZmZXJzLmxlbmd0aDtcbiAgICBsZXQgcmVtb3ZlID0gLTE7XG5cbiAgICBpZiAoY291bnQgJSBzdGFydEJ1ZmZlckV2ZXJ5ID09PSAwKSB7XG4gICAgICBidWZmZXJzLnB1c2goW10pO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IGJ1ZmZlcnNbaV07XG4gICAgICBidWZmZXIucHVzaCh2YWx1ZSk7XG4gICAgICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gYnVmZmVyU2l6ZSkge1xuICAgICAgICByZW1vdmUgPSBpO1xuICAgICAgICBkZXN0aW5hdGlvbi5uZXh0KGJ1ZmZlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZSAhPT0gLTEpIHtcbiAgICAgIGJ1ZmZlcnMuc3BsaWNlKHJlbW92ZSwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpIHtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG4gICAgY29uc3QgYnVmZmVycyA9IHRoaXMuYnVmZmVycztcbiAgICB3aGlsZSAoYnVmZmVycy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgYnVmZmVyID0gYnVmZmVycy5zaGlmdCgpO1xuICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGRlc3RpbmF0aW9uLm5leHQoYnVmZmVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3VwZXIuX2NvbXBsZXRlKCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
