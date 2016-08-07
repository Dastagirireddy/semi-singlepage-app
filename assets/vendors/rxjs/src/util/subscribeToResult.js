System.register(['./root', './isArray', './isPromise', '../Observable', '../symbol/iterator', '../InnerSubscriber', 'symbol-observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var root_1, isArray_1, isPromise_1, Observable_1, iterator_1, InnerSubscriber_1, symbol_observable_1;
    function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
        var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
        if (destination.isUnsubscribed) {
            return;
        }
        if (result instanceof Observable_1.Observable) {
            if (result._isScalar) {
                destination.next(result.value);
                destination.complete();
                return;
            }
            else {
                return result.subscribe(destination);
            }
        }
        if (isArray_1.isArray(result)) {
            for (var i = 0, len = result.length; i < len && !destination.isUnsubscribed; i++) {
                destination.next(result[i]);
            }
            if (!destination.isUnsubscribed) {
                destination.complete();
            }
        }
        else if (isPromise_1.isPromise(result)) {
            result.then(function (value) {
                if (!destination.isUnsubscribed) {
                    destination.next(value);
                    destination.complete();
                }
            }, function (err) { return destination.error(err); })
                .then(null, function (err) {
                // Escaping the Promise trap: globally throw unhandled errors
                root_1.root.setTimeout(function () { throw err; });
            });
            return destination;
        }
        else if (typeof result[iterator_1.$$iterator] === 'function') {
            for (var _i = 0, _a = result; _i < _a.length; _i++) {
                var item = _a[_i];
                destination.next(item);
                if (destination.isUnsubscribed) {
                    break;
                }
            }
            if (!destination.isUnsubscribed) {
                destination.complete();
            }
        }
        else if (typeof result[symbol_observable_1.default] === 'function') {
            var obs = result[symbol_observable_1.default]();
            if (typeof obs.subscribe !== 'function') {
                destination.error('invalid observable');
            }
            else {
                return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
            }
        }
        else {
            destination.error(new TypeError('unknown type returned'));
        }
    }
    exports_1("subscribeToResult", subscribeToResult);
    return {
        setters:[
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (isPromise_1_1) {
                isPromise_1 = isPromise_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (iterator_1_1) {
                iterator_1 = iterator_1_1;
            },
            function (InnerSubscriber_1_1) {
                InnerSubscriber_1 = InnerSubscriber_1_1;
            },
            function (symbol_observable_1_1) {
                symbol_observable_1 = symbol_observable_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQWdCQSwyQkFBcUMsZUFBMEMsRUFDMUMsTUFBMEIsRUFDMUIsVUFBYyxFQUNkLFVBQW1CO1FBQ3RELElBQUksV0FBVyxHQUFvQixJQUFJLGlDQUFlLENBQUMsZUFBZSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVoRyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxZQUFZLHVCQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixXQUFXLENBQUMsSUFBSSxDQUFPLE1BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN2QixNQUFNLENBQUM7WUFDVCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdkMsQ0FBQztRQUNILENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDakYsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pCLENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLHFCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQ1QsVUFBQyxLQUFLO2dCQUNKLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLFdBQVcsQ0FBQyxJQUFJLENBQU0sS0FBSyxDQUFDLENBQUM7b0JBQzdCLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDekIsQ0FBQztZQUNILENBQUMsRUFDRCxVQUFDLEdBQVEsSUFBSyxPQUFBLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQXRCLENBQXNCLENBQ3JDO2lCQUNBLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQyxHQUFRO2dCQUNuQiw2REFBNkQ7Z0JBQzdELFdBQUksQ0FBQyxVQUFVLENBQUMsY0FBUSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNyQixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLHFCQUFVLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxDQUFhLFVBQVcsRUFBWCxLQUFLLE1BQU0sRUFBWCxjQUFXLEVBQVgsSUFBVyxDQUFDO2dCQUF4QixJQUFJLElBQUksU0FBQTtnQkFDWCxXQUFXLENBQUMsSUFBSSxDQUFNLElBQUksQ0FBQyxDQUFDO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFDL0IsS0FBSyxDQUFDO2dCQUNSLENBQUM7YUFDRjtZQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6QixDQUFDO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQywyQkFBWSxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsMkJBQVksQ0FBQyxFQUFFLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsU0FBUyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLFdBQVcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxpQ0FBZSxDQUFDLGVBQWUsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNyRixDQUFDO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7UUFDNUQsQ0FBQztJQUNILENBQUM7SUE5REQsaURBOERDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cm9vdH0gZnJvbSAnLi9yb290JztcbmltcG9ydCB7aXNBcnJheX0gZnJvbSAnLi9pc0FycmF5JztcbmltcG9ydCB7aXNQcm9taXNlfSBmcm9tICcuL2lzUHJvbWlzZSc7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBPYnNlcnZhYmxlSW5wdXR9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHskJGl0ZXJhdG9yfSBmcm9tICcuLi9zeW1ib2wvaXRlcmF0b3InO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge0lubmVyU3Vic2NyaWJlcn0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7T3V0ZXJTdWJzY3JpYmVyfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuXG5pbXBvcnQgJCRvYnNlcnZhYmxlIGZyb20gJ3N5bWJvbC1vYnNlcnZhYmxlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHN1YnNjcmliZVRvUmVzdWx0PFQsIFI+KG91dGVyU3Vic2NyaWJlcjogT3V0ZXJTdWJzY3JpYmVyPFQsIFI+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogYW55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyVmFsdWU/OiBULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVySW5kZXg/OiBudW1iZXIpOiBTdWJzY3JpcHRpb247XG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlVG9SZXN1bHQ8VD4ob3V0ZXJTdWJzY3JpYmVyOiBPdXRlclN1YnNjcmliZXI8YW55LCBhbnk+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogT2JzZXJ2YWJsZUlucHV0PFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyVmFsdWU/OiBULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dGVySW5kZXg/OiBudW1iZXIpOiBTdWJzY3JpcHRpb24ge1xuICBsZXQgZGVzdGluYXRpb246IFN1YnNjcmliZXI8YW55PiA9IG5ldyBJbm5lclN1YnNjcmliZXIob3V0ZXJTdWJzY3JpYmVyLCBvdXRlclZhbHVlLCBvdXRlckluZGV4KTtcblxuICBpZiAoZGVzdGluYXRpb24uaXNVbnN1YnNjcmliZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAocmVzdWx0IGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgIGlmIChyZXN1bHQuX2lzU2NhbGFyKSB7XG4gICAgICBkZXN0aW5hdGlvbi5uZXh0KCg8YW55PnJlc3VsdCkudmFsdWUpO1xuICAgICAgZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdC5zdWJzY3JpYmUoZGVzdGluYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpc0FycmF5KHJlc3VsdCkpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gcmVzdWx0Lmxlbmd0aDsgaSA8IGxlbiAmJiAhZGVzdGluYXRpb24uaXNVbnN1YnNjcmliZWQ7IGkrKykge1xuICAgICAgZGVzdGluYXRpb24ubmV4dChyZXN1bHRbaV0pO1xuICAgIH1cbiAgICBpZiAoIWRlc3RpbmF0aW9uLmlzVW5zdWJzY3JpYmVkKSB7XG4gICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgIHJlc3VsdC50aGVuKFxuICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICghZGVzdGluYXRpb24uaXNVbnN1YnNjcmliZWQpIHtcbiAgICAgICAgICBkZXN0aW5hdGlvbi5uZXh0KDxhbnk+dmFsdWUpO1xuICAgICAgICAgIGRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoZXJyOiBhbnkpID0+IGRlc3RpbmF0aW9uLmVycm9yKGVycilcbiAgICApXG4gICAgLnRoZW4obnVsbCwgKGVycjogYW55KSA9PiB7XG4gICAgICAvLyBFc2NhcGluZyB0aGUgUHJvbWlzZSB0cmFwOiBnbG9iYWxseSB0aHJvdyB1bmhhbmRsZWQgZXJyb3JzXG4gICAgICByb290LnNldFRpbWVvdXQoKCkgPT4geyB0aHJvdyBlcnI7IH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcmVzdWx0WyQkaXRlcmF0b3JdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm9yIChsZXQgaXRlbSBvZiA8YW55PnJlc3VsdCkge1xuICAgICAgZGVzdGluYXRpb24ubmV4dCg8YW55Pml0ZW0pO1xuICAgICAgaWYgKGRlc3RpbmF0aW9uLmlzVW5zdWJzY3JpYmVkKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWRlc3RpbmF0aW9uLmlzVW5zdWJzY3JpYmVkKSB7XG4gICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgcmVzdWx0WyQkb2JzZXJ2YWJsZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCBvYnMgPSByZXN1bHRbJCRvYnNlcnZhYmxlXSgpO1xuICAgIGlmICh0eXBlb2Ygb2JzLnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZGVzdGluYXRpb24uZXJyb3IoJ2ludmFsaWQgb2JzZXJ2YWJsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2JzLnN1YnNjcmliZShuZXcgSW5uZXJTdWJzY3JpYmVyKG91dGVyU3Vic2NyaWJlciwgb3V0ZXJWYWx1ZSwgb3V0ZXJJbmRleCkpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBkZXN0aW5hdGlvbi5lcnJvcihuZXcgVHlwZUVycm9yKCd1bmtub3duIHR5cGUgcmV0dXJuZWQnKSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
