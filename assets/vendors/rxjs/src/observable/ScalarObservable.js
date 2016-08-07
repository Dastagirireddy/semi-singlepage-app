System.register(['../Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1;
    var ScalarObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            ScalarObservable = (function (_super) {
                __extends(ScalarObservable, _super);
                function ScalarObservable(value, scheduler) {
                    _super.call(this);
                    this.value = value;
                    this.scheduler = scheduler;
                    this._isScalar = true;
                    if (scheduler) {
                        this._isScalar = false;
                    }
                }
                ScalarObservable.create = function (value, scheduler) {
                    return new ScalarObservable(value, scheduler);
                };
                ScalarObservable.dispatch = function (state) {
                    var done = state.done, value = state.value, subscriber = state.subscriber;
                    if (done) {
                        subscriber.complete();
                        return;
                    }
                    subscriber.next(value);
                    if (subscriber.isUnsubscribed) {
                        return;
                    }
                    state.done = true;
                    this.schedule(state);
                };
                ScalarObservable.prototype._subscribe = function (subscriber) {
                    var value = this.value;
                    var scheduler = this.scheduler;
                    if (scheduler) {
                        return scheduler.schedule(ScalarObservable.dispatch, 0, {
                            done: false, value: value, subscriber: subscriber
                        });
                    }
                    else {
                        subscriber.next(value);
                        if (!subscriber.isUnsubscribed) {
                            subscriber.complete();
                        }
                    }
                };
                return ScalarObservable;
            }(Observable_1.Observable));
            exports_1("ScalarObservable", ScalarObservable);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvU2NhbGFyT2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1lBS0E7Ozs7ZUFJRztZQUNIO2dCQUF5QyxvQ0FBYTtnQkF3QnBELDBCQUFtQixLQUFRLEVBQVUsU0FBcUI7b0JBQ3hELGlCQUFPLENBQUM7b0JBRFMsVUFBSyxHQUFMLEtBQUssQ0FBRztvQkFBVSxjQUFTLEdBQVQsU0FBUyxDQUFZO29CQUYxRCxjQUFTLEdBQVksSUFBSSxDQUFDO29CQUl4QixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUNkLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUN6QixDQUFDO2dCQUNILENBQUM7Z0JBNUJNLHVCQUFNLEdBQWIsVUFBaUIsS0FBUSxFQUFFLFNBQXFCO29CQUM5QyxNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ2hELENBQUM7Z0JBRU0seUJBQVEsR0FBZixVQUFnQixLQUFVO29CQUNoQixxQkFBSSxFQUFFLG1CQUFLLEVBQUUsNkJBQVUsQ0FBVztvQkFFMUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDVCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ3RCLE1BQU0sQ0FBQztvQkFDVCxDQUFDO29CQUVELFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixNQUFNLENBQUM7b0JBQ1QsQ0FBQztvQkFFRCxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDWCxJQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMvQixDQUFDO2dCQVdTLHFDQUFVLEdBQXBCLFVBQXFCLFVBQXlCO29CQUM1QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUN6QixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUVqQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUNkLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7NEJBQ3RELElBQUksRUFBRSxLQUFLLEVBQUUsT0FBQSxLQUFLLEVBQUUsWUFBQSxVQUFVO3lCQUMvQixDQUFDLENBQUM7b0JBQ0wsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN2QixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOzRCQUMvQixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ3hCLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUNILHVCQUFDO1lBQUQsQ0E5Q0EsQUE4Q0MsQ0E5Q3dDLHVCQUFVLEdBOENsRDtZQTlDRCwrQ0E4Q0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vYnNlcnZhYmxlL1NjYWxhck9ic2VydmFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NjaGVkdWxlcn0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHtUZWFyZG93bkxvZ2ljfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIFNjYWxhck9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcbiAgc3RhdGljIGNyZWF0ZTxUPih2YWx1ZTogVCwgc2NoZWR1bGVyPzogU2NoZWR1bGVyKTogU2NhbGFyT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBTY2FsYXJPYnNlcnZhYmxlKHZhbHVlLCBzY2hlZHVsZXIpO1xuICB9XG5cbiAgc3RhdGljIGRpc3BhdGNoKHN0YXRlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCB7IGRvbmUsIHZhbHVlLCBzdWJzY3JpYmVyIH0gPSBzdGF0ZTtcblxuICAgIGlmIChkb25lKSB7XG4gICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICBpZiAoc3Vic2NyaWJlci5pc1Vuc3Vic2NyaWJlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN0YXRlLmRvbmUgPSB0cnVlO1xuICAgICg8YW55PiB0aGlzKS5zY2hlZHVsZShzdGF0ZSk7XG4gIH1cblxuICBfaXNTY2FsYXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogVCwgcHJpdmF0ZSBzY2hlZHVsZXI/OiBTY2hlZHVsZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgIHRoaXMuX2lzU2NhbGFyID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPik6IFRlYXJkb3duTG9naWMge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICBjb25zdCBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcblxuICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoU2NhbGFyT2JzZXJ2YWJsZS5kaXNwYXRjaCwgMCwge1xuICAgICAgICBkb25lOiBmYWxzZSwgdmFsdWUsIHN1YnNjcmliZXJcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgaWYgKCFzdWJzY3JpYmVyLmlzVW5zdWJzY3JpYmVkKSB7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
