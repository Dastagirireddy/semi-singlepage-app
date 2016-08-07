System.register(['../Observable', '../util/tryCatch', '../util/errorObject', '../Subscription'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Observable_1, tryCatch_1, errorObject_1, Subscription_1;
    var FromEventObservable;
    function isNodeStyleEventEmmitter(sourceObj) {
        return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
    }
    function isJQueryStyleEventEmitter(sourceObj) {
        return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
    }
    function isNodeList(sourceObj) {
        return !!sourceObj && sourceObj.toString() === '[object NodeList]';
    }
    function isHTMLCollection(sourceObj) {
        return !!sourceObj && sourceObj.toString() === '[object HTMLCollection]';
    }
    function isEventTarget(sourceObj) {
        return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
    }
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
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
            FromEventObservable = (function (_super) {
                __extends(FromEventObservable, _super);
                function FromEventObservable(sourceObj, eventName, selector) {
                    _super.call(this);
                    this.sourceObj = sourceObj;
                    this.eventName = eventName;
                    this.selector = selector;
                }
                /**
                 * Creates an Observable that emits events of a specific type coming from the
                 * given event target.
                 *
                 * <span class="informal">Creates an Observable from DOM events, or Node
                 * EventEmitter events or others.</span>
                 *
                 * <img src="./img/fromEvent.png" width="100%">
                 *
                 * Creates an Observable by attaching an event listener to an "event target",
                 * which may be an object with `addEventListener` and `removeEventListener`,
                 * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
                 * DOM, or an HTMLCollection from the DOM. The event handler is attached when
                 * the output Observable is subscribed, and removed when the Subscription is
                 * unsubscribed.
                 *
                 * @example <caption>Emits clicks happening on the DOM document</caption>
                 * var clicks = Rx.Observable.fromEvent(document, 'click');
                 * clicks.subscribe(x => console.log(x));
                 *
                 * @see {@link from}
                 * @see {@link fromEventPattern}
                 *
                 * @param {EventTargetLike} target The DOMElement, event target, Node.js
                 * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
                 * @param {string} eventName The event name of interest, being emitted by the
                 * `target`.
                 * @param {function(...args: any): T} [selector] An optional function to
                 * post-process results. It takes the arguments from the event handler and
                 * should return a single value.
                 * @return {Observable<T>}
                 * @static true
                 * @name fromEvent
                 * @owner Observable
                 */
                FromEventObservable.create = function (target, eventName, selector) {
                    return new FromEventObservable(target, eventName, selector);
                };
                FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber) {
                    var unsubscribe;
                    if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
                        for (var i = 0, len = sourceObj.length; i < len; i++) {
                            FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber);
                        }
                    }
                    else if (isEventTarget(sourceObj)) {
                        var source_1 = sourceObj;
                        sourceObj.addEventListener(eventName, handler);
                        unsubscribe = function () { return source_1.removeEventListener(eventName, handler); };
                    }
                    else if (isJQueryStyleEventEmitter(sourceObj)) {
                        var source_2 = sourceObj;
                        sourceObj.on(eventName, handler);
                        unsubscribe = function () { return source_2.off(eventName, handler); };
                    }
                    else if (isNodeStyleEventEmmitter(sourceObj)) {
                        var source_3 = sourceObj;
                        sourceObj.addListener(eventName, handler);
                        unsubscribe = function () { return source_3.removeListener(eventName, handler); };
                    }
                    subscriber.add(new Subscription_1.Subscription(unsubscribe));
                };
                FromEventObservable.prototype._subscribe = function (subscriber) {
                    var sourceObj = this.sourceObj;
                    var eventName = this.eventName;
                    var selector = this.selector;
                    var handler = selector ? function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
                        if (result === errorObject_1.errorObject) {
                            subscriber.error(errorObject_1.errorObject.e);
                        }
                        else {
                            subscriber.next(result);
                        }
                    } : function (e) { return subscriber.next(e); };
                    FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber);
                };
                return FromEventObservable;
            }(Observable_1.Observable));
            exports_1("FromEventObservable", FromEventObservable);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvRnJvbUV2ZW50T2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBVUEsa0NBQWtDLFNBQWM7UUFDOUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksT0FBTyxTQUFTLENBQUMsV0FBVyxLQUFLLFVBQVUsSUFBSSxPQUFPLFNBQVMsQ0FBQyxjQUFjLEtBQUssVUFBVSxDQUFDO0lBQ3RILENBQUM7SUFNRCxtQ0FBbUMsU0FBYztRQUMvQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxFQUFFLEtBQUssVUFBVSxJQUFJLE9BQU8sU0FBUyxDQUFDLEdBQUcsS0FBSyxVQUFVLENBQUM7SUFDbEcsQ0FBQztJQUVELG9CQUFvQixTQUFjO1FBQ2hDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxtQkFBbUIsQ0FBQztJQUNyRSxDQUFDO0lBRUQsMEJBQTBCLFNBQWM7UUFDdEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLHlCQUF5QixDQUFDO0lBQzNFLENBQUM7SUFFRCx1QkFBdUIsU0FBYztRQUNuQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxnQkFBZ0IsS0FBSyxVQUFVLElBQUksT0FBTyxTQUFTLENBQUMsbUJBQW1CLEtBQUssVUFBVSxDQUFDO0lBQ2hJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7WUFJRDs7OztlQUlHO1lBQ0g7Z0JBQStDLHVDQUFhO2dCQTJDMUQsNkJBQW9CLFNBQTBCLEVBQzFCLFNBQWlCLEVBQ2pCLFFBQXFDO29CQUN2RCxpQkFBTyxDQUFDO29CQUhVLGNBQVMsR0FBVCxTQUFTLENBQWlCO29CQUMxQixjQUFTLEdBQVQsU0FBUyxDQUFRO29CQUNqQixhQUFR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QzNCLFVBQVUsQ0FBQyxLQUFLLENBQUMseUJBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMxQixDQUFDO29CQUNILENBQUMsR0FBRyxVQUFDLENBQU0sSUFBSyxPQUFBLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQWxCLENBQWtCLENBQUM7b0JBRW5DLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNuRixDQUFDO2dCQUNILDBCQUFDO1lBQUQsQ0ExRkEsQUEwRkMsQ0ExRjhDLHVCQUFVLEdBMEZ4RDtZQTFGRCxxREEwRkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vYnNlcnZhYmxlL0Zyb21FdmVudE9ic2VydmFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGV9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHt0cnlDYXRjaH0gZnJvbSAnLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQge2Vycm9yT2JqZWN0fSBmcm9tICcuLi91dGlsL2Vycm9yT2JqZWN0JztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHtTdWJzY3JpYmVyfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcblxuZXhwb3J0IHR5cGUgTm9kZVN0eWxlRXZlbnRFbW1pdHRlciA9IHtcbiAgYWRkTGlzdGVuZXI6IChldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pID0+IHZvaWQ7XG4gIHJlbW92ZUxpc3RlbmVyOiAoZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKSA9PiB2b2lkO1xufTtcbmZ1bmN0aW9uIGlzTm9kZVN0eWxlRXZlbnRFbW1pdHRlcihzb3VyY2VPYmo6IGFueSk6IHNvdXJjZU9iaiBpcyBOb2RlU3R5bGVFdmVudEVtbWl0dGVyIHtcbiAgcmV0dXJuICEhc291cmNlT2JqICYmIHR5cGVvZiBzb3VyY2VPYmouYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZU9iai5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IHR5cGUgSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIgPSB7XG4gIG9uOiAoZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKSA9PiB2b2lkO1xuICBvZmY6IChldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pID0+IHZvaWQ7XG59O1xuZnVuY3Rpb24gaXNKUXVlcnlTdHlsZUV2ZW50RW1pdHRlcihzb3VyY2VPYmo6IGFueSk6IHNvdXJjZU9iaiBpcyBKUXVlcnlTdHlsZUV2ZW50RW1pdHRlciB7XG4gIHJldHVybiAhIXNvdXJjZU9iaiAmJiB0eXBlb2Ygc291cmNlT2JqLm9uID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VPYmoub2ZmID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc05vZGVMaXN0KHNvdXJjZU9iajogYW55KTogc291cmNlT2JqIGlzIE5vZGVMaXN0IHtcbiAgcmV0dXJuICEhc291cmNlT2JqICYmIHNvdXJjZU9iai50b1N0cmluZygpID09PSAnW29iamVjdCBOb2RlTGlzdF0nO1xufVxuXG5mdW5jdGlvbiBpc0hUTUxDb2xsZWN0aW9uKHNvdXJjZU9iajogYW55KTogc291cmNlT2JqIGlzIEhUTUxDb2xsZWN0aW9uIHtcbiAgcmV0dXJuICEhc291cmNlT2JqICYmIHNvdXJjZU9iai50b1N0cmluZygpID09PSAnW29iamVjdCBIVE1MQ29sbGVjdGlvbl0nO1xufVxuXG5mdW5jdGlvbiBpc0V2ZW50VGFyZ2V0KHNvdXJjZU9iajogYW55KTogc291cmNlT2JqIGlzIEV2ZW50VGFyZ2V0IHtcbiAgcmV0dXJuICEhc291cmNlT2JqICYmIHR5cGVvZiBzb3VyY2VPYmouYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlT2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCB0eXBlIEV2ZW50VGFyZ2V0TGlrZSA9IEV2ZW50VGFyZ2V0IHwgTm9kZVN0eWxlRXZlbnRFbW1pdHRlciB8IEpRdWVyeVN0eWxlRXZlbnRFbWl0dGVyIHwgTm9kZUxpc3QgfCBIVE1MQ29sbGVjdGlvbjtcblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKiBAaGlkZSB0cnVlXG4gKi9cbmV4cG9ydCBjbGFzcyBGcm9tRXZlbnRPYnNlcnZhYmxlPFQsIFI+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGV2ZW50cyBvZiBhIHNwZWNpZmljIHR5cGUgY29taW5nIGZyb20gdGhlXG4gICAqIGdpdmVuIGV2ZW50IHRhcmdldC5cbiAgICpcbiAgICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPkNyZWF0ZXMgYW4gT2JzZXJ2YWJsZSBmcm9tIERPTSBldmVudHMsIG9yIE5vZGVcbiAgICogRXZlbnRFbWl0dGVyIGV2ZW50cyBvciBvdGhlcnMuPC9zcGFuPlxuICAgKlxuICAgKiA8aW1nIHNyYz1cIi4vaW1nL2Zyb21FdmVudC5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAgICpcbiAgICogQ3JlYXRlcyBhbiBPYnNlcnZhYmxlIGJ5IGF0dGFjaGluZyBhbiBldmVudCBsaXN0ZW5lciB0byBhbiBcImV2ZW50IHRhcmdldFwiLFxuICAgKiB3aGljaCBtYXkgYmUgYW4gb2JqZWN0IHdpdGggYGFkZEV2ZW50TGlzdGVuZXJgIGFuZCBgcmVtb3ZlRXZlbnRMaXN0ZW5lcmAsXG4gICAqIGEgTm9kZS5qcyBFdmVudEVtaXR0ZXIsIGEgalF1ZXJ5IHN0eWxlIEV2ZW50RW1pdHRlciwgYSBOb2RlTGlzdCBmcm9tIHRoZVxuICAgKiBET00sIG9yIGFuIEhUTUxDb2xsZWN0aW9uIGZyb20gdGhlIERPTS4gVGhlIGV2ZW50IGhhbmRsZXIgaXMgYXR0YWNoZWQgd2hlblxuICAgKiB0aGUgb3V0cHV0IE9ic2VydmFibGUgaXMgc3Vic2NyaWJlZCwgYW5kIHJlbW92ZWQgd2hlbiB0aGUgU3Vic2NyaXB0aW9uIGlzXG4gICAqIHVuc3Vic2NyaWJlZC5cbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdHMgY2xpY2tzIGhhcHBlbmluZyBvbiB0aGUgRE9NIGRvY3VtZW50PC9jYXB0aW9uPlxuICAgKiB2YXIgY2xpY2tzID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpO1xuICAgKiBjbGlja3Muc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICAgKlxuICAgKiBAc2VlIHtAbGluayBmcm9tfVxuICAgKiBAc2VlIHtAbGluayBmcm9tRXZlbnRQYXR0ZXJufVxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0TGlrZX0gdGFyZ2V0IFRoZSBET01FbGVtZW50LCBldmVudCB0YXJnZXQsIE5vZGUuanNcbiAgICogRXZlbnRFbWl0dGVyLCBOb2RlTGlzdCBvciBIVE1MQ29sbGVjdGlvbiB0byBhdHRhY2ggdGhlIGV2ZW50IGhhbmRsZXIgdG8uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgVGhlIGV2ZW50IG5hbWUgb2YgaW50ZXJlc3QsIGJlaW5nIGVtaXR0ZWQgYnkgdGhlXG4gICAqIGB0YXJnZXRgLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKC4uLmFyZ3M6IGFueSk6IFR9IFtzZWxlY3Rvcl0gQW4gb3B0aW9uYWwgZnVuY3Rpb24gdG9cbiAgICogcG9zdC1wcm9jZXNzIHJlc3VsdHMuIEl0IHRha2VzIHRoZSBhcmd1bWVudHMgZnJvbSB0aGUgZXZlbnQgaGFuZGxlciBhbmRcbiAgICogc2hvdWxkIHJldHVybiBhIHNpbmdsZSB2YWx1ZS5cbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIGZyb21FdmVudFxuICAgKiBAb3duZXIgT2JzZXJ2YWJsZVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZTxUPih0YXJnZXQ6IEV2ZW50VGFyZ2V0TGlrZSxcbiAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICBzZWxlY3Rvcj86ICguLi5hcmdzOiBBcnJheTxhbnk+KSA9PiBUKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBGcm9tRXZlbnRPYnNlcnZhYmxlKHRhcmdldCwgZXZlbnROYW1lLCBzZWxlY3Rvcik7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNvdXJjZU9iajogRXZlbnRUYXJnZXRMaWtlLFxuICAgICAgICAgICAgICBwcml2YXRlIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICBwcml2YXRlIHNlbGVjdG9yPzogKC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IFQpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc2V0dXBTdWJzY3JpcHRpb248VD4oc291cmNlT2JqOiBFdmVudFRhcmdldExpa2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyOiBGdW5jdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPikge1xuICAgIGxldCB1bnN1YnNjcmliZTogKCkgPT4gdm9pZDtcbiAgICBpZiAoaXNOb2RlTGlzdChzb3VyY2VPYmopIHx8IGlzSFRNTENvbGxlY3Rpb24oc291cmNlT2JqKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNvdXJjZU9iai5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBGcm9tRXZlbnRPYnNlcnZhYmxlLnNldHVwU3Vic2NyaXB0aW9uKHNvdXJjZU9ialtpXSwgZXZlbnROYW1lLCBoYW5kbGVyLCBzdWJzY3JpYmVyKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRXZlbnRUYXJnZXQoc291cmNlT2JqKSkge1xuICAgICAgY29uc3Qgc291cmNlID0gc291cmNlT2JqO1xuICAgICAgc291cmNlT2JqLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCA8RXZlbnRMaXN0ZW5lcj5oYW5kbGVyKTtcbiAgICAgIHVuc3Vic2NyaWJlID0gKCkgPT4gc291cmNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCA8RXZlbnRMaXN0ZW5lcj5oYW5kbGVyKTtcbiAgICB9IGVsc2UgaWYgKGlzSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIoc291cmNlT2JqKSkge1xuICAgICAgY29uc3Qgc291cmNlID0gc291cmNlT2JqO1xuICAgICAgc291cmNlT2JqLm9uKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICB1bnN1YnNjcmliZSA9ICgpID0+IHNvdXJjZS5vZmYoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICB9IGVsc2UgaWYgKGlzTm9kZVN0eWxlRXZlbnRFbW1pdHRlcihzb3VyY2VPYmopKSB7XG4gICAgICBjb25zdCBzb3VyY2UgPSBzb3VyY2VPYmo7XG4gICAgICBzb3VyY2VPYmouYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgIHVuc3Vic2NyaWJlID0gKCkgPT4gc291cmNlLnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlci5hZGQobmV3IFN1YnNjcmlwdGlvbih1bnN1YnNjcmliZSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPikge1xuICAgIGNvbnN0IHNvdXJjZU9iaiA9IHRoaXMuc291cmNlT2JqO1xuICAgIGNvbnN0IGV2ZW50TmFtZSA9IHRoaXMuZXZlbnROYW1lO1xuICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvcjtcbiAgICBsZXQgaGFuZGxlciA9IHNlbGVjdG9yID8gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gdHJ5Q2F0Y2goc2VsZWN0b3IpKC4uLmFyZ3MpO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChyZXN1bHQpO1xuICAgICAgfVxuICAgIH0gOiAoZTogYW55KSA9PiBzdWJzY3JpYmVyLm5leHQoZSk7XG5cbiAgICBGcm9tRXZlbnRPYnNlcnZhYmxlLnNldHVwU3Vic2NyaXB0aW9uKHNvdXJjZU9iaiwgZXZlbnROYW1lLCBoYW5kbGVyLCBzdWJzY3JpYmVyKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
