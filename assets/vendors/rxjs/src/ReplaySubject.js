System.register(['./Subject', './scheduler/queue', './operator/observeOn'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subject_1, queue_1, observeOn_1;
    var ReplaySubject, ReplayEvent;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (queue_1_1) {
                queue_1 = queue_1_1;
            },
            function (observeOn_1_1) {
                observeOn_1 = observeOn_1_1;
            }],
        execute: function() {
            /**
             * @class ReplaySubject<T>
             */
            ReplaySubject = (function (_super) {
                __extends(ReplaySubject, _super);
                function ReplaySubject(bufferSize, windowTime, scheduler) {
                    if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
                    if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
                    _super.call(this);
                    this.scheduler = scheduler;
                    this._events = [];
                    this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
                    this._windowTime = windowTime < 1 ? 1 : windowTime;
                }
                ReplaySubject.prototype.next = function (value) {
                    var now = this._getNow();
                    this._events.push(new ReplayEvent(now, value));
                    this._trimBufferThenGetEvents();
                    _super.prototype.next.call(this, value);
                };
                ReplaySubject.prototype._subscribe = function (subscriber) {
                    var _events = this._trimBufferThenGetEvents();
                    var scheduler = this.scheduler;
                    if (scheduler) {
                        subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
                    }
                    var len = _events.length;
                    for (var i = 0; i < len && !subscriber.isUnsubscribed; i++) {
                        subscriber.next(_events[i].value);
                    }
                    return _super.prototype._subscribe.call(this, subscriber);
                };
                ReplaySubject.prototype._getNow = function () {
                    return (this.scheduler || queue_1.queue).now();
                };
                ReplaySubject.prototype._trimBufferThenGetEvents = function () {
                    var now = this._getNow();
                    var _bufferSize = this._bufferSize;
                    var _windowTime = this._windowTime;
                    var _events = this._events;
                    var eventsCount = _events.length;
                    var spliceCount = 0;
                    // Trim events that fall out of the time window.
                    // Start at the front of the list. Break early once
                    // we encounter an event that falls within the window.
                    while (spliceCount < eventsCount) {
                        if ((now - _events[spliceCount].time) < _windowTime) {
                            break;
                        }
                        spliceCount++;
                    }
                    if (eventsCount > _bufferSize) {
                        spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
                    }
                    if (spliceCount > 0) {
                        _events.splice(0, spliceCount);
                    }
                    return _events;
                };
                return ReplaySubject;
            }(Subject_1.Subject));
            exports_1("ReplaySubject", ReplaySubject);
            ReplayEvent = (function () {
                function ReplayEvent(time, value) {
                    this.time = time;
                    this.value = value;
                }
                return ReplayEvent;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL1JlcGxheVN1YmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU9BOztlQUVHO1lBQ0g7Z0JBQXNDLGlDQUFVO2dCQUs5Qyx1QkFBWSxVQUE2QyxFQUM3QyxVQUE2QyxFQUNyQyxTQUFxQjtvQkFGN0IsMEJBQTZDLEdBQTdDLGFBQXFCLE1BQU0sQ0FBQyxpQkFBaUI7b0JBQzdDLDBCQUE2QyxHQUE3QyxhQUFxQixNQUFNLENBQUMsaUJBQWlCO29CQUV2RCxpQkFBTyxDQUFDO29CQURVLGNBQVMsR0FBVCxTQUFTLENBQVk7b0JBTmpDLFlBQU8sR0FBcUIsRUFBRSxDQUFDO29CQVFyQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztvQkFDbkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUM7Z0JBQ3JELENBQUM7Z0JBRUQsNEJBQUksR0FBSixVQUFLLEtBQVE7b0JBQ1gsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7b0JBQ2hDLGdCQUFLLENBQUMsSUFBSSxZQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQixDQUFDO2dCQUVTLGtDQUFVLEdBQXBCLFVBQXFCLFVBQXlCO29CQUM1QyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztvQkFDaEQsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFFakMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDZCxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLCtCQUFtQixDQUFJLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNqRixDQUFDO29CQUVELElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7b0JBQzNCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUMzRCxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEMsQ0FBQztvQkFFRCxNQUFNLENBQUMsZ0JBQUssQ0FBQyxVQUFVLFlBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7Z0JBRUQsK0JBQU8sR0FBUDtvQkFDRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLGFBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUN6QyxDQUFDO2dCQUVPLGdEQUF3QixHQUFoQztvQkFDRSxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzNCLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQ3JDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQ3JDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBRTdCLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7b0JBQ2pDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztvQkFFcEIsZ0RBQWdEO29CQUNoRCxtREFBbUQ7b0JBQ25ELHNEQUFzRDtvQkFDdEQsT0FBTyxXQUFXLEdBQUcsV0FBVyxFQUFFLENBQUM7d0JBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDOzRCQUNwRCxLQUFLLENBQUM7d0JBQ1IsQ0FBQzt3QkFDRCxXQUFXLEVBQUUsQ0FBQztvQkFDaEIsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQzt3QkFDOUIsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFdBQVcsR0FBRyxXQUFXLENBQUMsQ0FBQztvQkFDakUsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7b0JBQ2pDLENBQUM7b0JBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsQ0FBQztnQkFDSCxvQkFBQztZQUFELENBckVBLEFBcUVDLENBckVxQyxpQkFBTyxHQXFFNUM7WUFyRUQseUNBcUVDLENBQUE7WUFFRDtnQkFDRSxxQkFBbUIsSUFBWSxFQUFTLEtBQVE7b0JBQTdCLFNBQUksR0FBSixJQUFJLENBQVE7b0JBQVMsVUFBSyxHQUFMLEtBQUssQ0FBRztnQkFDaEQsQ0FBQztnQkFDSCxrQkFBQztZQUFELENBSEEsQUFHQyxJQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL1JlcGxheVN1YmplY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1YmplY3R9IGZyb20gJy4vU3ViamVjdCc7XG5pbXBvcnQge1NjaGVkdWxlcn0gZnJvbSAnLi9TY2hlZHVsZXInO1xuaW1wb3J0IHtxdWV1ZX0gZnJvbSAnLi9zY2hlZHVsZXIvcXVldWUnO1xuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tICcuL1N1YnNjcmliZXInO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7T2JzZXJ2ZU9uU3Vic2NyaWJlcn0gZnJvbSAnLi9vcGVyYXRvci9vYnNlcnZlT24nO1xuXG4vKipcbiAqIEBjbGFzcyBSZXBsYXlTdWJqZWN0PFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBSZXBsYXlTdWJqZWN0PFQ+IGV4dGVuZHMgU3ViamVjdDxUPiB7XG4gIHByaXZhdGUgX2V2ZW50czogUmVwbGF5RXZlbnQ8VD5bXSA9IFtdO1xuICBwcml2YXRlIF9idWZmZXJTaXplOiBudW1iZXI7XG4gIHByaXZhdGUgX3dpbmRvd1RpbWU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihidWZmZXJTaXplOiBudW1iZXIgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXG4gICAgICAgICAgICAgIHdpbmRvd1RpbWU6IG51bWJlciA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2J1ZmZlclNpemUgPSBidWZmZXJTaXplIDwgMSA/IDEgOiBidWZmZXJTaXplO1xuICAgIHRoaXMuX3dpbmRvd1RpbWUgPSB3aW5kb3dUaW1lIDwgMSA/IDEgOiB3aW5kb3dUaW1lO1xuICB9XG5cbiAgbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IG5vdyA9IHRoaXMuX2dldE5vdygpO1xuICAgIHRoaXMuX2V2ZW50cy5wdXNoKG5ldyBSZXBsYXlFdmVudChub3csIHZhbHVlKSk7XG4gICAgdGhpcy5fdHJpbUJ1ZmZlclRoZW5HZXRFdmVudHMoKTtcbiAgICBzdXBlci5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pOiBTdWJzY3JpcHRpb24ge1xuICAgIGNvbnN0IF9ldmVudHMgPSB0aGlzLl90cmltQnVmZmVyVGhlbkdldEV2ZW50cygpO1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuXG4gICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgc3Vic2NyaWJlci5hZGQoc3Vic2NyaWJlciA9IG5ldyBPYnNlcnZlT25TdWJzY3JpYmVyPFQ+KHN1YnNjcmliZXIsIHNjaGVkdWxlcikpO1xuICAgIH1cblxuICAgIGNvbnN0IGxlbiA9IF9ldmVudHMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuICYmICFzdWJzY3JpYmVyLmlzVW5zdWJzY3JpYmVkOyBpKyspIHtcbiAgICAgIHN1YnNjcmliZXIubmV4dChfZXZlbnRzW2ldLnZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIuX3N1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgfVxuXG4gIF9nZXROb3coKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuc2NoZWR1bGVyIHx8IHF1ZXVlKS5ub3coKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RyaW1CdWZmZXJUaGVuR2V0RXZlbnRzKCk6IFJlcGxheUV2ZW50PFQ+W10ge1xuICAgIGNvbnN0IG5vdyA9IHRoaXMuX2dldE5vdygpO1xuICAgIGNvbnN0IF9idWZmZXJTaXplID0gdGhpcy5fYnVmZmVyU2l6ZTtcbiAgICBjb25zdCBfd2luZG93VGltZSA9IHRoaXMuX3dpbmRvd1RpbWU7XG4gICAgY29uc3QgX2V2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICAgIGxldCBldmVudHNDb3VudCA9IF9ldmVudHMubGVuZ3RoO1xuICAgIGxldCBzcGxpY2VDb3VudCA9IDA7XG5cbiAgICAvLyBUcmltIGV2ZW50cyB0aGF0IGZhbGwgb3V0IG9mIHRoZSB0aW1lIHdpbmRvdy5cbiAgICAvLyBTdGFydCBhdCB0aGUgZnJvbnQgb2YgdGhlIGxpc3QuIEJyZWFrIGVhcmx5IG9uY2VcbiAgICAvLyB3ZSBlbmNvdW50ZXIgYW4gZXZlbnQgdGhhdCBmYWxscyB3aXRoaW4gdGhlIHdpbmRvdy5cbiAgICB3aGlsZSAoc3BsaWNlQ291bnQgPCBldmVudHNDb3VudCkge1xuICAgICAgaWYgKChub3cgLSBfZXZlbnRzW3NwbGljZUNvdW50XS50aW1lKSA8IF93aW5kb3dUaW1lKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgc3BsaWNlQ291bnQrKztcbiAgICB9XG5cbiAgICBpZiAoZXZlbnRzQ291bnQgPiBfYnVmZmVyU2l6ZSkge1xuICAgICAgc3BsaWNlQ291bnQgPSBNYXRoLm1heChzcGxpY2VDb3VudCwgZXZlbnRzQ291bnQgLSBfYnVmZmVyU2l6ZSk7XG4gICAgfVxuXG4gICAgaWYgKHNwbGljZUNvdW50ID4gMCkge1xuICAgICAgX2V2ZW50cy5zcGxpY2UoMCwgc3BsaWNlQ291bnQpO1xuICAgIH1cblxuICAgIHJldHVybiBfZXZlbnRzO1xuICB9XG59XG5cbmNsYXNzIFJlcGxheUV2ZW50PFQ+IHtcbiAgY29uc3RydWN0b3IocHVibGljIHRpbWU6IG51bWJlciwgcHVibGljIHZhbHVlOiBUKSB7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
