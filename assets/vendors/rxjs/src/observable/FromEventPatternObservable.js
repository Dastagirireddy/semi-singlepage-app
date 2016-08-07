System.register(['../Observable', '../Subscription'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1, Subscription_1;
    var FromEventPatternObservable;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }],
        execute: function() {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            FromEventPatternObservable = (function (_super) {
                __extends(FromEventPatternObservable, _super);
                function FromEventPatternObservable(addHandler, removeHandler, selector) {
                    _super.call(this);
                    this.addHandler = addHandler;
                    this.removeHandler = removeHandler;
                    this.selector = selector;
                }
                /**
                 * Creates an Observable from an API based on addHandler/removeHandler
                 * functions.
                 *
                 * <span class="informal">Converts any addHandler/removeHandler API to an
                 * Observable.</span>
                 *
                 * <img src="./img/fromEventPattern.png" width="100%">
                 *
                 * Creates an Observable by using the `addHandler` and `removeHandler`
                 * functions to add and remove the handlers, with an optional selector
                 * function to project the event arguments to a result. The `addHandler` is
                 * called when the output Observable is subscribed, and `removeHandler` is
                 * called when the Subscription is unsubscribed.
                 *
                 * @example <caption>Emits clicks happening on the DOM document</caption>
                 * function addClickHandler(handler) {
                 *   document.addEventListener('click', handler);
                 * }
                 *
                 * function removeClickHandler(handler) {
                 *   document.removeEventListener('click', handler);
                 * }
                 *
                 * var clicks = Rx.Observable.fromEventPattern(
                 *   addClickHandler,
                 *   removeClickHandler
                 * );
                 * clicks.subscribe(x => console.log(x));
                 *
                 * @see {@link from}
                 * @see {@link fromEvent}
                 *
                 * @param {function(handler: Function): any} addHandler A function that takes
                 * a `handler` function as argument and attaches it somehow to the actual
                 * source of events.
                 * @param {function(handler: Function): void} removeHandler A function that
                 * takes a `handler` function as argument and removes it in case it was
                 * previously attached using `addHandler`.
                 * @param {function(...args: any): T} [selector] An optional function to
                 * post-process results. It takes the arguments from the event handler and
                 * should return a single value.
                 * @return {Observable<T>}
                 * @static true
                 * @name fromEventPattern
                 * @owner Observable
                 */
                FromEventPatternObservable.create = function (addHandler, removeHandler, selector) {
                    return new FromEventPatternObservable(addHandler, removeHandler, selector);
                };
                FromEventPatternObservable.prototype._subscribe = function (subscriber) {
                    var _this = this;
                    var removeHandler = this.removeHandler;
                    var handler = !!this.selector ? function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        _this._callSelector(subscriber, args);
                    } : function (e) { subscriber.next(e); };
                    this._callAddHandler(handler, subscriber);
                    subscriber.add(new Subscription_1.Subscription(function () {
                        //TODO: determine whether or not to forward to error handler
                        removeHandler(handler);
                    }));
                };
                FromEventPatternObservable.prototype._callSelector = function (subscriber, args) {
                    try {
                        var result = this.selector.apply(this, args);
                        subscriber.next(result);
                    }
                    catch (e) {
                        subscriber.error(e);
                    }
                };
                FromEventPatternObservable.prototype._callAddHandler = function (handler, errorSubscriber) {
                    try {
                        this.addHandler(handler);
                    }
                    catch (e) {
                        errorSubscriber.error(e);
                    }
                };
                return FromEventPatternObservable;
            }(Observable_1.Observable));
            exports_1("FromEventPatternObservable", FromEventPatternObservable);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvRnJvbUV2ZW50UGF0dGVybk9ic2VydmFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUlBOzs7O2VBSUc7WUFDSDtnQkFBc0QsOENBQWE7Z0JBdURqRSxvQ0FBb0IsVUFBc0MsRUFDdEMsYUFBMEMsRUFDMUMsUUFBcUM7b0JBQ3ZELGlCQUFPLENBQUM7b0JBSFUsZUFBVSxHQUFWLFVBQVUsQ0FBNEI7b0JBQ3RDLGtCQUFhLEdBQWIsYUFBYSxDQUE2QjtvQkFDMUMsYUFBUSxHQUFSLFFBQVEsQ0FBNkI7Z0JBRXpELENBQUM7Z0JBekREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQThDRztnQkFDSSxpQ0FBTSxHQUFiLFVBQWlCLFVBQXNDLEVBQ3RDLGFBQTBDLEVBQzFDLFFBQXFDO29CQUNwRCxNQUFNLENBQUMsSUFBSSwwQkFBMEIsQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUM3RSxDQUFDO2dCQVFTLCtDQUFVLEdBQXBCLFVBQXFCLFVBQXlCO29CQUE5QyxpQkFZQztvQkFYQyxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO29CQUV6QyxJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRzt3QkFBQyxjQUFtQjs2QkFBbkIsV0FBbUIsQ0FBbkIsc0JBQW1CLENBQW5CLElBQW1COzRCQUFuQiw2QkFBbUI7O3dCQUNwRCxLQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxHQUFHLFVBQVMsQ0FBTSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRTdDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUMxQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksMkJBQVksQ0FBQzt3QkFDOUIsNERBQTREO3dCQUM1RCxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sQ0FBQztnQkFFTyxrREFBYSxHQUFyQixVQUFzQixVQUF5QixFQUFFLElBQWdCO29CQUMvRCxJQUFJLENBQUM7d0JBQ0gsSUFBTSxNQUFNLEdBQU0sSUFBSSxDQUFDLFFBQVEsT0FBYixJQUFJLEVBQWEsSUFBSSxDQUFDLENBQUM7d0JBQ3pDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzFCLENBQ0E7b0JBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDVCxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QixDQUFDO2dCQUNILENBQUM7Z0JBRU8sb0RBQWUsR0FBdkIsVUFBd0IsT0FBeUIsRUFBRSxlQUE4QjtvQkFDL0UsSUFBSSxDQUFDO3dCQUNILElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzNCLENBQ0E7b0JBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDVCxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQixDQUFDO2dCQUNILENBQUM7Z0JBQ0gsaUNBQUM7WUFBRCxDQTdGQSxBQTZGQyxDQTdGcUQsdUJBQVUsR0E2Ri9EO1lBN0ZELG1FQTZGQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvRnJvbUV2ZW50UGF0dGVybk9ic2VydmFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGV9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIEZyb21FdmVudFBhdHRlcm5PYnNlcnZhYmxlPFQsIFI+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSBmcm9tIGFuIEFQSSBiYXNlZCBvbiBhZGRIYW5kbGVyL3JlbW92ZUhhbmRsZXJcbiAgICogZnVuY3Rpb25zLlxuICAgKlxuICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+Q29udmVydHMgYW55IGFkZEhhbmRsZXIvcmVtb3ZlSGFuZGxlciBBUEkgdG8gYW5cbiAgICogT2JzZXJ2YWJsZS48L3NwYW4+XG4gICAqXG4gICAqIDxpbWcgc3JjPVwiLi9pbWcvZnJvbUV2ZW50UGF0dGVybi5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAgICpcbiAgICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIGJ5IHVzaW5nIHRoZSBgYWRkSGFuZGxlcmAgYW5kIGByZW1vdmVIYW5kbGVyYFxuICAgKiBmdW5jdGlvbnMgdG8gYWRkIGFuZCByZW1vdmUgdGhlIGhhbmRsZXJzLCB3aXRoIGFuIG9wdGlvbmFsIHNlbGVjdG9yXG4gICAqIGZ1bmN0aW9uIHRvIHByb2plY3QgdGhlIGV2ZW50IGFyZ3VtZW50cyB0byBhIHJlc3VsdC4gVGhlIGBhZGRIYW5kbGVyYCBpc1xuICAgKiBjYWxsZWQgd2hlbiB0aGUgb3V0cHV0IE9ic2VydmFibGUgaXMgc3Vic2NyaWJlZCwgYW5kIGByZW1vdmVIYW5kbGVyYCBpc1xuICAgKiBjYWxsZWQgd2hlbiB0aGUgU3Vic2NyaXB0aW9uIGlzIHVuc3Vic2NyaWJlZC5cbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdHMgY2xpY2tzIGhhcHBlbmluZyBvbiB0aGUgRE9NIGRvY3VtZW50PC9jYXB0aW9uPlxuICAgKiBmdW5jdGlvbiBhZGRDbGlja0hhbmRsZXIoaGFuZGxlcikge1xuICAgKiAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlcik7XG4gICAqIH1cbiAgICrigIPigINcbiAgICogZnVuY3Rpb24gcmVtb3ZlQ2xpY2tIYW5kbGVyKGhhbmRsZXIpIHtcbiAgICogICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpO1xuICAgKiB9XG4gICAq4oCD4oCDXG4gICAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudFBhdHRlcm4oXG4gICAqICAgYWRkQ2xpY2tIYW5kbGVyLFxuICAgKiAgIHJlbW92ZUNsaWNrSGFuZGxlclxuICAgKiApO1xuICAgKiBjbGlja3Muc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICAgKlxuICAgKiBAc2VlIHtAbGluayBmcm9tfVxuICAgKiBAc2VlIHtAbGluayBmcm9tRXZlbnR9XG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oaGFuZGxlcjogRnVuY3Rpb24pOiBhbnl9IGFkZEhhbmRsZXIgQSBmdW5jdGlvbiB0aGF0IHRha2VzXG4gICAqIGEgYGhhbmRsZXJgIGZ1bmN0aW9uIGFzIGFyZ3VtZW50IGFuZCBhdHRhY2hlcyBpdCBzb21laG93IHRvIHRoZSBhY3R1YWxcbiAgICogc291cmNlIG9mIGV2ZW50cy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbihoYW5kbGVyOiBGdW5jdGlvbik6IHZvaWR9IHJlbW92ZUhhbmRsZXIgQSBmdW5jdGlvbiB0aGF0XG4gICAqIHRha2VzIGEgYGhhbmRsZXJgIGZ1bmN0aW9uIGFzIGFyZ3VtZW50IGFuZCByZW1vdmVzIGl0IGluIGNhc2UgaXQgd2FzXG4gICAqIHByZXZpb3VzbHkgYXR0YWNoZWQgdXNpbmcgYGFkZEhhbmRsZXJgLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKC4uLmFyZ3M6IGFueSk6IFR9IFtzZWxlY3Rvcl0gQW4gb3B0aW9uYWwgZnVuY3Rpb24gdG9cbiAgICogcG9zdC1wcm9jZXNzIHJlc3VsdHMuIEl0IHRha2VzIHRoZSBhcmd1bWVudHMgZnJvbSB0aGUgZXZlbnQgaGFuZGxlciBhbmRcbiAgICogc2hvdWxkIHJldHVybiBhIHNpbmdsZSB2YWx1ZS5cbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIGZyb21FdmVudFBhdHRlcm5cbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgICovXG4gIHN0YXRpYyBjcmVhdGU8VD4oYWRkSGFuZGxlcjogKGhhbmRsZXI6IEZ1bmN0aW9uKSA9PiBhbnksXG4gICAgICAgICAgICAgICAgICAgcmVtb3ZlSGFuZGxlcjogKGhhbmRsZXI6IEZ1bmN0aW9uKSA9PiB2b2lkLFxuICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yPzogKC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IFQpIHtcbiAgICByZXR1cm4gbmV3IEZyb21FdmVudFBhdHRlcm5PYnNlcnZhYmxlKGFkZEhhbmRsZXIsIHJlbW92ZUhhbmRsZXIsIHNlbGVjdG9yKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWRkSGFuZGxlcjogKGhhbmRsZXI6IEZ1bmN0aW9uKSA9PiBhbnksXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVtb3ZlSGFuZGxlcjogKGhhbmRsZXI6IEZ1bmN0aW9uKSA9PiB2b2lkLFxuICAgICAgICAgICAgICBwcml2YXRlIHNlbGVjdG9yPzogKC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IFQpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPikge1xuICAgIGNvbnN0IHJlbW92ZUhhbmRsZXIgPSB0aGlzLnJlbW92ZUhhbmRsZXI7XG5cbiAgICBjb25zdCBoYW5kbGVyID0gISF0aGlzLnNlbGVjdG9yID8gKC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IHtcbiAgICAgIHRoaXMuX2NhbGxTZWxlY3RvcihzdWJzY3JpYmVyLCBhcmdzKTtcbiAgICB9IDogZnVuY3Rpb24oZTogYW55KSB7IHN1YnNjcmliZXIubmV4dChlKTsgfTtcblxuICAgIHRoaXMuX2NhbGxBZGRIYW5kbGVyKGhhbmRsZXIsIHN1YnNjcmliZXIpO1xuICAgIHN1YnNjcmliZXIuYWRkKG5ldyBTdWJzY3JpcHRpb24oKCkgPT4ge1xuICAgICAgLy9UT0RPOiBkZXRlcm1pbmUgd2hldGhlciBvciBub3QgdG8gZm9yd2FyZCB0byBlcnJvciBoYW5kbGVyXG4gICAgICByZW1vdmVIYW5kbGVyKGhhbmRsZXIpO1xuICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NhbGxTZWxlY3RvcihzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+LCBhcmdzOiBBcnJheTxhbnk+KTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdDogVCA9IHRoaXMuc2VsZWN0b3IoLi4uYXJncyk7XG4gICAgICBzdWJzY3JpYmVyLm5leHQocmVzdWx0KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHN1YnNjcmliZXIuZXJyb3IoZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2FsbEFkZEhhbmRsZXIoaGFuZGxlcjogKGU6IGFueSkgPT4gdm9pZCwgZXJyb3JTdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYWRkSGFuZGxlcihoYW5kbGVyKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIGVycm9yU3Vic2NyaWJlci5lcnJvcihlKTtcbiAgICB9XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
