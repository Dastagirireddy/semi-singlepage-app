System.register(['../Observable', '../ReplaySubject'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, ReplaySubject_1;
    /**
     * @param bufferSize
     * @param windowTime
     * @param scheduler
     * @return {Observable<any>}
     * @method cache
     * @owner Observable
     */
    function cache(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
        if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
        var subject;
        var source = this;
        var refs = 0;
        var outerSub;
        var getSubject = function () {
            subject = new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler);
            return subject;
        };
        return new Observable_1.Observable(function (observer) {
            if (!subject) {
                subject = getSubject();
                outerSub = source.subscribe(function (value) { return subject.next(value); }, function (err) {
                    var s = subject;
                    subject = null;
                    s.error(err);
                }, function () { return subject.complete(); });
            }
            refs++;
            if (!subject) {
                subject = getSubject();
            }
            var innerSub = subject.subscribe(observer);
            return function () {
                refs--;
                if (innerSub) {
                    innerSub.unsubscribe();
                }
                if (refs === 0) {
                    outerSub.unsubscribe();
                }
            };
        });
    }
    exports_1("cache", cache);
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (ReplaySubject_1_1) {
                ReplaySubject_1 = ReplaySubject_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL2NhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFNQTs7Ozs7OztPQU9HO0lBQ0gsZUFBeUIsVUFBNkMsRUFDN0MsVUFBNkMsRUFDN0MsU0FBcUI7UUFGckIsMEJBQTZDLEdBQTdDLGFBQXFCLE1BQU0sQ0FBQyxpQkFBaUI7UUFDN0MsMEJBQTZDLEdBQTdDLGFBQXFCLE1BQU0sQ0FBQyxpQkFBaUI7UUFFcEUsSUFBSSxPQUF5QixDQUFDO1FBQzlCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLFFBQXNCLENBQUM7UUFFM0IsSUFBTSxVQUFVLEdBQUc7WUFDakIsT0FBTyxHQUFHLElBQUksNkJBQWEsQ0FBSSxVQUFVLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakIsQ0FBQyxDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksdUJBQVUsQ0FBSSxVQUFDLFFBQXFCO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDYixPQUFPLEdBQUcsVUFBVSxFQUFFLENBQUM7Z0JBQ3ZCLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUN6QixVQUFDLEtBQVEsSUFBSyxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQW5CLENBQW1CLEVBQ2pDLFVBQUMsR0FBUTtvQkFDUCxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7b0JBQ2hCLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ2YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDZixDQUFDLEVBQ0QsY0FBTSxPQUFBLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBbEIsQ0FBa0IsQ0FDekIsQ0FBQztZQUNKLENBQUM7WUFFRCxJQUFJLEVBQUUsQ0FBQztZQUVQLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDYixPQUFPLEdBQUcsVUFBVSxFQUFFLENBQUM7WUFDekIsQ0FBQztZQUNELElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFM0MsTUFBTSxDQUFDO2dCQUNMLElBQUksRUFBRSxDQUFDO2dCQUNQLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2IsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNmLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDekIsQ0FBQztZQUNILENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQTVDRCx5QkE0Q0MsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vcGVyYXRvci9jYWNoZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1NjaGVkdWxlcn0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7UmVwbGF5U3ViamVjdH0gZnJvbSAnLi4vUmVwbGF5U3ViamVjdCc7XG5pbXBvcnQge09ic2VydmVyfSBmcm9tICcuLi9PYnNlcnZlcic7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuLyoqXG4gKiBAcGFyYW0gYnVmZmVyU2l6ZVxuICogQHBhcmFtIHdpbmRvd1RpbWVcbiAqIEBwYXJhbSBzY2hlZHVsZXJcbiAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cbiAqIEBtZXRob2QgY2FjaGVcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWNoZTxUPihidWZmZXJTaXplOiBudW1iZXIgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXG4gICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93VGltZTogbnVtYmVyID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLFxuICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6IE9ic2VydmFibGU8VD4ge1xuICBsZXQgc3ViamVjdDogUmVwbGF5U3ViamVjdDxUPjtcbiAgbGV0IHNvdXJjZSA9IHRoaXM7XG4gIGxldCByZWZzID0gMDtcbiAgbGV0IG91dGVyU3ViOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3QgZ2V0U3ViamVjdCA9ICgpID0+IHtcbiAgICBzdWJqZWN0ID0gbmV3IFJlcGxheVN1YmplY3Q8VD4oYnVmZmVyU2l6ZSwgd2luZG93VGltZSwgc2NoZWR1bGVyKTtcbiAgICByZXR1cm4gc3ViamVjdDtcbiAgfTtcblxuICByZXR1cm4gbmV3IE9ic2VydmFibGU8VD4oKG9ic2VydmVyOiBPYnNlcnZlcjxUPikgPT4ge1xuICAgIGlmICghc3ViamVjdCkge1xuICAgICAgc3ViamVjdCA9IGdldFN1YmplY3QoKTtcbiAgICAgIG91dGVyU3ViID0gc291cmNlLnN1YnNjcmliZShcbiAgICAgICAgKHZhbHVlOiBUKSA9PiBzdWJqZWN0Lm5leHQodmFsdWUpLFxuICAgICAgICAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICBsZXQgcyA9IHN1YmplY3Q7XG4gICAgICAgICAgc3ViamVjdCA9IG51bGw7XG4gICAgICAgICAgcy5lcnJvcihlcnIpO1xuICAgICAgICB9LFxuICAgICAgICAoKSA9PiBzdWJqZWN0LmNvbXBsZXRlKClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmVmcysrO1xuXG4gICAgaWYgKCFzdWJqZWN0KSB7XG4gICAgICBzdWJqZWN0ID0gZ2V0U3ViamVjdCgpO1xuICAgIH1cbiAgICBsZXQgaW5uZXJTdWIgPSBzdWJqZWN0LnN1YnNjcmliZShvYnNlcnZlcik7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmVmcy0tO1xuICAgICAgaWYgKGlubmVyU3ViKSB7XG4gICAgICAgIGlubmVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgICBpZiAocmVmcyA9PT0gMCkge1xuICAgICAgICBvdXRlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhY2hlU2lnbmF0dXJlPFQ+IHtcbiAgKGJ1ZmZlclNpemU/OiBudW1iZXIsIHdpbmRvd1RpbWU/OiBudW1iZXIsIHNjaGVkdWxlcj86IFNjaGVkdWxlcik6IE9ic2VydmFibGU8VD47XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
