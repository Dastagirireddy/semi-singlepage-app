System.register(['./Subject', './Subscription'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subject_1, Subscription_1;
    var AsyncSubject;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }],
        execute: function() {
            /**
             * @class AsyncSubject<T>
             */
            AsyncSubject = (function (_super) {
                __extends(AsyncSubject, _super);
                function AsyncSubject() {
                    _super.apply(this, arguments);
                    this.value = null;
                    this.hasNext = false;
                    this.hasCompleted = false;
                }
                AsyncSubject.prototype._subscribe = function (subscriber) {
                    if (this.hasCompleted && this.hasNext) {
                        subscriber.next(this.value);
                        subscriber.complete();
                        return Subscription_1.Subscription.EMPTY;
                    }
                    else if (this.hasError) {
                        subscriber.error(this.thrownError);
                        return Subscription_1.Subscription.EMPTY;
                    }
                    return _super.prototype._subscribe.call(this, subscriber);
                };
                AsyncSubject.prototype.next = function (value) {
                    this.value = value;
                    this.hasNext = true;
                };
                AsyncSubject.prototype.complete = function () {
                    this.hasCompleted = true;
                    if (this.hasNext) {
                        _super.prototype.next.call(this, this.value);
                    }
                    _super.prototype.complete.call(this);
                };
                return AsyncSubject;
            }(Subject_1.Subject));
            exports_1("AsyncSubject", AsyncSubject);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL0FzeW5jU3ViamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBSUE7O2VBRUc7WUFDSDtnQkFBcUMsZ0NBQVU7Z0JBQS9DO29CQUFxQyw4QkFBVTtvQkFDN0MsVUFBSyxHQUFNLElBQUksQ0FBQztvQkFFaEIsWUFBTyxHQUFZLEtBQUssQ0FBQztvQkFFekIsaUJBQVksR0FBWSxLQUFLLENBQUM7Z0JBMkJoQyxDQUFDO2dCQXpCVyxpQ0FBVSxHQUFwQixVQUFxQixVQUEyQjtvQkFDOUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzVCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDdEIsTUFBTSxDQUFDLDJCQUFZLENBQUMsS0FBSyxDQUFDO29CQUM1QixDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDekIsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ25DLE1BQU0sQ0FBQywyQkFBWSxDQUFDLEtBQUssQ0FBQztvQkFDNUIsQ0FBQztvQkFFRCxNQUFNLENBQUMsZ0JBQUssQ0FBQyxVQUFVLFlBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7Z0JBRUQsMkJBQUksR0FBSixVQUFLLEtBQVE7b0JBQ1gsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixDQUFDO2dCQUVELCtCQUFRLEdBQVI7b0JBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7b0JBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixnQkFBSyxDQUFDLElBQUksWUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pCLENBQUM7b0JBQ0QsZ0JBQUssQ0FBQyxRQUFRLFdBQUUsQ0FBQztnQkFDbkIsQ0FBQztnQkFDSCxtQkFBQztZQUFELENBaENBLEFBZ0NDLENBaENvQyxpQkFBTyxHQWdDM0M7WUFoQ0QsdUNBZ0NDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvQXN5bmNTdWJqZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdWJqZWN0fSBmcm9tICcuL1N1YmplY3QnO1xuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tICcuL1N1YnNjcmliZXInO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcblxuLyoqXG4gKiBAY2xhc3MgQXN5bmNTdWJqZWN0PFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBBc3luY1N1YmplY3Q8VD4gZXh0ZW5kcyBTdWJqZWN0PFQ+IHtcbiAgdmFsdWU6IFQgPSBudWxsO1xuXG4gIGhhc05leHQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBoYXNDb21wbGV0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGFueT4pOiBTdWJzY3JpcHRpb24ge1xuICAgIGlmICh0aGlzLmhhc0NvbXBsZXRlZCAmJiB0aGlzLmhhc05leHQpIHtcbiAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLnZhbHVlKTtcbiAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgIHJldHVybiBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhhc0Vycm9yKSB7XG4gICAgICBzdWJzY3JpYmVyLmVycm9yKHRoaXMudGhyb3duRXJyb3IpO1xuICAgICAgcmV0dXJuIFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIuX3N1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgfVxuXG4gIG5leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5oYXNOZXh0ID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbXBsZXRlKCk6IHZvaWQge1xuICAgIHRoaXMuaGFzQ29tcGxldGVkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5oYXNOZXh0KSB7XG4gICAgICBzdXBlci5uZXh0KHRoaXMudmFsdWUpO1xuICAgIH1cbiAgICBzdXBlci5jb21wbGV0ZSgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
