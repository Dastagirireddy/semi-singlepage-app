System.register(['../Subscriber', '../Subscription'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1, Subscription_1;
    var FinallyOperator, FinallySubscriber;
    /**
     * Returns an Observable that mirrors the source Observable, but will call a specified function when
     * the source terminates on complete or error.
     * @param {function} callback function to be called when source terminates.
     * @return {Observable} an Observable that mirrors the source, but will call the specified function on termination.
     * @method finally
     * @owner Observable
     */
    function _finally(callback) {
        return this.lift(new FinallyOperator(callback));
    }
    exports_1("_finally", _finally);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }],
        execute: function() {
            FinallyOperator = (function () {
                function FinallyOperator(callback) {
                    this.callback = callback;
                }
                FinallyOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new FinallySubscriber(subscriber, this.callback));
                };
                return FinallyOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            FinallySubscriber = (function (_super) {
                __extends(FinallySubscriber, _super);
                function FinallySubscriber(destination, callback) {
                    _super.call(this, destination);
                    this.add(new Subscription_1.Subscription(callback));
                }
                return FinallySubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL2ZpbmFsbHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUtBOzs7Ozs7O09BT0c7SUFDSCxrQkFBNEIsUUFBb0I7UUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRkQsK0JBRUMsQ0FBQTs7Ozs7Ozs7OztZQU1EO2dCQUNFLHlCQUFvQixRQUFvQjtvQkFBcEIsYUFBUSxHQUFSLFFBQVEsQ0FBWTtnQkFDeEMsQ0FBQztnQkFFRCw4QkFBSSxHQUFKLFVBQUssVUFBeUIsRUFBRSxNQUFXO29CQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDN0UsQ0FBQztnQkFDSCxzQkFBQztZQUFELENBUEEsQUFPQyxJQUFBO1lBRUQ7Ozs7ZUFJRztZQUNIO2dCQUFtQyxxQ0FBYTtnQkFDOUMsMkJBQVksV0FBMEIsRUFBRSxRQUFvQjtvQkFDMUQsa0JBQU0sV0FBVyxDQUFDLENBQUM7b0JBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSwyQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBQ0gsd0JBQUM7WUFBRCxDQUxBLEFBS0MsQ0FMa0MsdUJBQVUsR0FLNUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3IvZmluYWxseS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BlcmF0b3J9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5cbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgbWlycm9ycyB0aGUgc291cmNlIE9ic2VydmFibGUsIGJ1dCB3aWxsIGNhbGwgYSBzcGVjaWZpZWQgZnVuY3Rpb24gd2hlblxuICogdGhlIHNvdXJjZSB0ZXJtaW5hdGVzIG9uIGNvbXBsZXRlIG9yIGVycm9yLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gc291cmNlIHRlcm1pbmF0ZXMuXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBhbiBPYnNlcnZhYmxlIHRoYXQgbWlycm9ycyB0aGUgc291cmNlLCBidXQgd2lsbCBjYWxsIHRoZSBzcGVjaWZpZWQgZnVuY3Rpb24gb24gdGVybWluYXRpb24uXG4gKiBAbWV0aG9kIGZpbmFsbHlcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfZmluYWxseTxUPihjYWxsYmFjazogKCkgPT4gdm9pZCk6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBGaW5hbGx5T3BlcmF0b3IoY2FsbGJhY2spKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaW5hbGx5U2lnbmF0dXJlPFQ+IHtcbiAgKGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogT2JzZXJ2YWJsZTxUPjtcbn1cblxuY2xhc3MgRmluYWxseU9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLl9zdWJzY3JpYmUobmV3IEZpbmFsbHlTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuY2FsbGJhY2spKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgRmluYWxseVN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sIGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMuYWRkKG5ldyBTdWJzY3JpcHRpb24oY2FsbGJhY2spKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
