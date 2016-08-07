System.register(['../Observable', '../observable/ConnectableObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1, ConnectableObservable_1;
    var MulticastObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (ConnectableObservable_1_1) {
                ConnectableObservable_1 = ConnectableObservable_1_1;
            }],
        execute: function() {
            MulticastObservable = (function (_super) {
                __extends(MulticastObservable, _super);
                function MulticastObservable(source, subjectFactory, selector) {
                    _super.call(this);
                    this.source = source;
                    this.subjectFactory = subjectFactory;
                    this.selector = selector;
                }
                MulticastObservable.prototype._subscribe = function (subscriber) {
                    var _a = this, selector = _a.selector, source = _a.source;
                    var connectable = new ConnectableObservable_1.ConnectableObservable(source, this.subjectFactory);
                    var subscription = selector(connectable).subscribe(subscriber);
                    subscription.add(connectable.connect());
                    return subscription;
                };
                return MulticastObservable;
            }(Observable_1.Observable));
            exports_1("MulticastObservable", MulticastObservable);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvTXVsdGljYXN0T2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBTUE7Z0JBQTRDLHVDQUFhO2dCQUN2RCw2QkFBc0IsTUFBcUIsRUFDdkIsY0FBZ0MsRUFDaEMsUUFBa0Q7b0JBQ3BFLGlCQUFPLENBQUM7b0JBSFksV0FBTSxHQUFOLE1BQU0sQ0FBZTtvQkFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWtCO29CQUNoQyxhQUFRLEdBQVIsUUFBUSxDQUEwQztnQkFFdEUsQ0FBQztnQkFFUyx3Q0FBVSxHQUFwQixVQUFxQixVQUF5QjtvQkFDNUMsSUFBQSxTQUFpQyxFQUF6QixzQkFBUSxFQUFFLGtCQUFNLENBQVU7b0JBQ2xDLElBQU0sV0FBVyxHQUFHLElBQUksNkNBQXFCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDM0UsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDakUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDeEMsTUFBTSxDQUFDLFlBQVksQ0FBQztnQkFDdEIsQ0FBQztnQkFDSCwwQkFBQztZQUFELENBZEEsQUFjQyxDQWQyQyx1QkFBVSxHQWNyRDtZQWRELHFEQWNDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb2JzZXJ2YWJsZS9NdWx0aWNhc3RPYnNlcnZhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdWJqZWN0fSBmcm9tICcuLi9TdWJqZWN0JztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge0Nvbm5lY3RhYmxlT2JzZXJ2YWJsZX0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9Db25uZWN0YWJsZU9ic2VydmFibGUnO1xuXG5leHBvcnQgY2xhc3MgTXVsdGljYXN0T2JzZXJ2YWJsZTxUPiBleHRlbmRzIE9ic2VydmFibGU8VD4ge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc291cmNlOiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIHN1YmplY3RGYWN0b3J5OiAoKSA9PiBTdWJqZWN0PFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIHNlbGVjdG9yOiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFQ+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pOiBTdWJzY3JpcHRpb24ge1xuICAgIGNvbnN0IHsgc2VsZWN0b3IsIHNvdXJjZSB9ID0gdGhpcztcbiAgICBjb25zdCBjb25uZWN0YWJsZSA9IG5ldyBDb25uZWN0YWJsZU9ic2VydmFibGUoc291cmNlLCB0aGlzLnN1YmplY3RGYWN0b3J5KTtcbiAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBzZWxlY3Rvcihjb25uZWN0YWJsZSkuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgIHN1YnNjcmlwdGlvbi5hZGQoY29ubmVjdGFibGUuY29ubmVjdCgpKTtcbiAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
