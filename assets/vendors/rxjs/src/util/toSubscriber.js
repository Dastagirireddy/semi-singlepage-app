System.register(['../Subscriber', '../symbol/rxSubscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subscriber_1, rxSubscriber_1;
    function toSubscriber(nextOrObserver, error, complete) {
        if (nextOrObserver) {
            if (nextOrObserver instanceof Subscriber_1.Subscriber) {
                return nextOrObserver;
            }
            if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
                return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
            }
        }
        if (!nextOrObserver && !error && !complete) {
            return new Subscriber_1.Subscriber();
        }
        return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
    }
    exports_1("toSubscriber", toSubscriber);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (rxSubscriber_1_1) {
                rxSubscriber_1 = rxSubscriber_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL3V0aWwvdG9TdWJzY3JpYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFJQSxzQkFDRSxjQUEwRCxFQUMxRCxLQUE0QixFQUM1QixRQUFxQjtRQUVyQixFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLGNBQWMsWUFBWSx1QkFBVSxDQUFDLENBQUMsQ0FBQztnQkFDekMsTUFBTSxDQUFrQixjQUFlLENBQUM7WUFDMUMsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyw2QkFBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLENBQUMsY0FBYyxDQUFDLDZCQUFjLENBQUMsRUFBRSxDQUFDO1lBQzFDLENBQUM7UUFDSCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksdUJBQVUsQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFwQkQsdUNBb0JDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvdXRpbC90b1N1YnNjcmliZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BhcnRpYWxPYnNlcnZlcn0gZnJvbSAnLi4vT2JzZXJ2ZXInO1xuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7JCRyeFN1YnNjcmliZXJ9IGZyb20gJy4uL3N5bWJvbC9yeFN1YnNjcmliZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9TdWJzY3JpYmVyPFQ+KFxuICBuZXh0T3JPYnNlcnZlcj86IFBhcnRpYWxPYnNlcnZlcjxUPiB8ICgodmFsdWU6IFQpID0+IHZvaWQpLFxuICBlcnJvcj86IChlcnJvcjogYW55KSA9PiB2b2lkLFxuICBjb21wbGV0ZT86ICgpID0+IHZvaWQpOiBTdWJzY3JpYmVyPFQ+IHtcblxuICBpZiAobmV4dE9yT2JzZXJ2ZXIpIHtcbiAgICBpZiAobmV4dE9yT2JzZXJ2ZXIgaW5zdGFuY2VvZiBTdWJzY3JpYmVyKSB7XG4gICAgICByZXR1cm4gKDxTdWJzY3JpYmVyPFQ+PiBuZXh0T3JPYnNlcnZlcik7XG4gICAgfVxuXG4gICAgaWYgKG5leHRPck9ic2VydmVyWyQkcnhTdWJzY3JpYmVyXSkge1xuICAgICAgcmV0dXJuIG5leHRPck9ic2VydmVyWyQkcnhTdWJzY3JpYmVyXSgpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghbmV4dE9yT2JzZXJ2ZXIgJiYgIWVycm9yICYmICFjb21wbGV0ZSkge1xuICAgIHJldHVybiBuZXcgU3Vic2NyaWJlcigpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBTdWJzY3JpYmVyKG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpO1xufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
