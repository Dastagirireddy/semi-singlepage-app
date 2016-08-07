System.register(['./Subject', './util/throwError', './util/ObjectUnsubscribedError'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subject_1, throwError_1, ObjectUnsubscribedError_1;
    var BehaviorSubject;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (throwError_1_1) {
                throwError_1 = throwError_1_1;
            },
            function (ObjectUnsubscribedError_1_1) {
                ObjectUnsubscribedError_1 = ObjectUnsubscribedError_1_1;
            }],
        execute: function() {
            /**
             * @class BehaviorSubject<T>
             */
            BehaviorSubject = (function (_super) {
                __extends(BehaviorSubject, _super);
                function BehaviorSubject(_value) {
                    _super.call(this);
                    this._value = _value;
                }
                BehaviorSubject.prototype.getValue = function () {
                    if (this.hasError) {
                        throwError_1.throwError(this.thrownError);
                    }
                    else if (this.isUnsubscribed) {
                        throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
                    }
                    else {
                        return this._value;
                    }
                };
                Object.defineProperty(BehaviorSubject.prototype, "value", {
                    get: function () {
                        return this.getValue();
                    },
                    enumerable: true,
                    configurable: true
                });
                BehaviorSubject.prototype._subscribe = function (subscriber) {
                    var subscription = _super.prototype._subscribe.call(this, subscriber);
                    if (subscription && !subscription.isUnsubscribed) {
                        subscriber.next(this._value);
                    }
                    return subscription;
                };
                BehaviorSubject.prototype.next = function (value) {
                    _super.prototype.next.call(this, this._value = value);
                };
                return BehaviorSubject;
            }(Subject_1.Subject));
            exports_1("BehaviorSubject", BehaviorSubject);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL0JlaGF2aW9yU3ViamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBTUE7O2VBRUc7WUFDSDtnQkFBd0MsbUNBQVU7Z0JBRWhELHlCQUFvQixNQUFTO29CQUMzQixpQkFBTyxDQUFDO29CQURVLFdBQU0sR0FBTixNQUFNLENBQUc7Z0JBRTdCLENBQUM7Z0JBRUQsa0NBQVEsR0FBUjtvQkFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDbEIsdUJBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQy9CLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO3dCQUMvQix1QkFBVSxDQUFDLElBQUksaURBQXVCLEVBQUUsQ0FBQyxDQUFDO29CQUM1QyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO29CQUNyQixDQUFDO2dCQUNILENBQUM7Z0JBRUQsc0JBQUksa0NBQUs7eUJBQVQ7d0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDekIsQ0FBQzs7O21CQUFBO2dCQUVTLG9DQUFVLEdBQXBCLFVBQXFCLFVBQXlCO29CQUM1QyxJQUFNLFlBQVksR0FBRyxnQkFBSyxDQUFDLFVBQVUsWUFBQyxVQUFVLENBQUMsQ0FBQztvQkFDbEQsRUFBRSxDQUFDLENBQUMsWUFBWSxJQUFJLENBQWtCLFlBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO3dCQUNuRSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDL0IsQ0FBQztvQkFDRCxNQUFNLENBQUMsWUFBWSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELDhCQUFJLEdBQUosVUFBSyxLQUFRO29CQUNYLGdCQUFLLENBQUMsSUFBSSxZQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQ2xDLENBQUM7Z0JBQ0gsc0JBQUM7WUFBRCxDQS9CQSxBQStCQyxDQS9CdUMsaUJBQU8sR0ErQjlDO1lBL0JELDZDQStCQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL0JlaGF2aW9yU3ViamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3ViamVjdH0gZnJvbSAnLi9TdWJqZWN0JztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7U3Vic2NyaXB0aW9uLCBJU3Vic2NyaXB0aW9ufSBmcm9tICcuL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge3Rocm93RXJyb3J9IGZyb20gJy4vdXRpbC90aHJvd0Vycm9yJztcbmltcG9ydCB7T2JqZWN0VW5zdWJzY3JpYmVkRXJyb3J9IGZyb20gJy4vdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG5cbi8qKlxuICogQGNsYXNzIEJlaGF2aW9yU3ViamVjdDxUPlxuICovXG5leHBvcnQgY2xhc3MgQmVoYXZpb3JTdWJqZWN0PFQ+IGV4dGVuZHMgU3ViamVjdDxUPiB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmFsdWU6IFQpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgZ2V0VmFsdWUoKTogVCB7XG4gICAgaWYgKHRoaXMuaGFzRXJyb3IpIHtcbiAgICAgIHRocm93RXJyb3IodGhpcy50aHJvd25FcnJvcik7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzVW5zdWJzY3JpYmVkKSB7XG4gICAgICB0aHJvd0Vycm9yKG5ldyBPYmplY3RVbnN1YnNjcmliZWRFcnJvcigpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPik6IFN1YnNjcmlwdGlvbiB7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gc3VwZXIuX3N1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICBpZiAoc3Vic2NyaXB0aW9uICYmICEoPElTdWJzY3JpcHRpb24+IHN1YnNjcmlwdGlvbikuaXNVbnN1YnNjcmliZWQpIHtcbiAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gIH1cblxuICBuZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgc3VwZXIubmV4dCh0aGlzLl92YWx1ZSA9IHZhbHVlKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
