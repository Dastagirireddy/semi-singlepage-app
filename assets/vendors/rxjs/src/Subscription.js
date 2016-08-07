System.register(['./util/isArray', './util/isObject', './util/isFunction', './util/tryCatch', './util/errorObject', './util/UnsubscriptionError'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var isArray_1, isObject_1, isFunction_1, tryCatch_1, errorObject_1, UnsubscriptionError_1;
    var Subscription;
    return {
        setters:[
            function (isArray_1_1) {
                isArray_1 = isArray_1_1;
            },
            function (isObject_1_1) {
                isObject_1 = isObject_1_1;
            },
            function (isFunction_1_1) {
                isFunction_1 = isFunction_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (UnsubscriptionError_1_1) {
                UnsubscriptionError_1 = UnsubscriptionError_1_1;
            }],
        execute: function() {
            /**
             * Represents a disposable resource, such as the execution of an Observable. A
             * Subscription has one important method, `unsubscribe`, that takes no argument
             * and just disposes the resource held by the subscription.
             *
             * Additionally, subscriptions may be grouped together through the `add()`
             * method, which will attach a child Subscription to the current Subscription.
             * When a Subscription is unsubscribed, all its children (and its grandchildren)
             * will be unsubscribed as well.
             *
             * @class Subscription
             */
            Subscription = (function () {
                /**
                 * @param {function(): void} [unsubscribe] A function describing how to
                 * perform the disposal of resources when the `unsubscribe` method is called.
                 */
                function Subscription(unsubscribe) {
                    /**
                     * A flag to indicate whether this Subscription has already been unsubscribed.
                     * @type {boolean}
                     */
                    this.isUnsubscribed = false;
                    if (unsubscribe) {
                        this._unsubscribe = unsubscribe;
                    }
                }
                /**
                 * Disposes the resources held by the subscription. May, for instance, cancel
                 * an ongoing Observable execution or cancel any other type of work that
                 * started when the Subscription was created.
                 * @return {void}
                 */
                Subscription.prototype.unsubscribe = function () {
                    var hasErrors = false;
                    var errors;
                    if (this.isUnsubscribed) {
                        return;
                    }
                    this.isUnsubscribed = true;
                    var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
                    this._subscriptions = null;
                    if (isFunction_1.isFunction(_unsubscribe)) {
                        var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
                        if (trial === errorObject_1.errorObject) {
                            hasErrors = true;
                            (errors = errors || []).push(errorObject_1.errorObject.e);
                        }
                    }
                    if (isArray_1.isArray(_subscriptions)) {
                        var index = -1;
                        var len = _subscriptions.length;
                        while (++index < len) {
                            var sub = _subscriptions[index];
                            if (isObject_1.isObject(sub)) {
                                var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                                if (trial === errorObject_1.errorObject) {
                                    hasErrors = true;
                                    errors = errors || [];
                                    var err = errorObject_1.errorObject.e;
                                    if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                                        errors = errors.concat(err.errors);
                                    }
                                    else {
                                        errors.push(err);
                                    }
                                }
                            }
                        }
                    }
                    if (hasErrors) {
                        throw new UnsubscriptionError_1.UnsubscriptionError(errors);
                    }
                };
                /**
                 * Adds a tear down to be called during the unsubscribe() of this
                 * Subscription.
                 *
                 * If the tear down being added is a subscription that is already
                 * unsubscribed, is the same reference `add` is being called on, or is
                 * `Subscription.EMPTY`, it will not be added.
                 *
                 * If this subscription is already in an `isUnsubscribed` state, the passed
                 * tear down logic will be executed immediately.
                 *
                 * @param {TeardownLogic} teardown The additional logic to execute on
                 * teardown.
                 * @return {Subscription} Returns the Subscription used or created to be
                 * added to the inner subscriptions list. This Subscription can be used with
                 * `remove()` to remove the passed teardown logic from the inner subscriptions
                 * list.
                 */
                Subscription.prototype.add = function (teardown) {
                    if (!teardown || (teardown === this) || (teardown === Subscription.EMPTY)) {
                        return;
                    }
                    var sub = teardown;
                    switch (typeof teardown) {
                        case 'function':
                            sub = new Subscription(teardown);
                        case 'object':
                            if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
                                break;
                            }
                            else if (this.isUnsubscribed) {
                                sub.unsubscribe();
                            }
                            else {
                                (this._subscriptions || (this._subscriptions = [])).push(sub);
                            }
                            break;
                        default:
                            throw new Error('Unrecognized teardown ' + teardown + ' added to Subscription.');
                    }
                    return sub;
                };
                /**
                 * Removes a Subscription from the internal list of subscriptions that will
                 * unsubscribe during the unsubscribe process of this Subscription.
                 * @param {Subscription} subscription The subscription to remove.
                 * @return {void}
                 */
                Subscription.prototype.remove = function (subscription) {
                    // HACK: This might be redundant because of the logic in `add()`
                    if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
                        return;
                    }
                    var subscriptions = this._subscriptions;
                    if (subscriptions) {
                        var subscriptionIndex = subscriptions.indexOf(subscription);
                        if (subscriptionIndex !== -1) {
                            subscriptions.splice(subscriptionIndex, 1);
                        }
                    }
                };
                Subscription.EMPTY = (function (empty) {
                    empty.isUnsubscribed = true;
                    return empty;
                }(new Subscription()));
                return Subscription;
            }());
            exports_1("Subscription", Subscription);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL1N1YnNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQWtCQTs7Ozs7Ozs7Ozs7ZUFXRztZQUNIO2dCQVlFOzs7bUJBR0c7Z0JBQ0gsc0JBQVksV0FBd0I7b0JBVnBDOzs7dUJBR0c7b0JBQ0ksbUJBQWMsR0FBWSxLQUFLLENBQUM7b0JBT3JDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ1QsSUFBSyxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7b0JBQzFDLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRDs7Ozs7bUJBS0c7Z0JBQ0gsa0NBQVcsR0FBWDtvQkFDRSxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ3RCLElBQUksTUFBYSxDQUFDO29CQUVsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsTUFBTSxDQUFDO29CQUNULENBQUM7b0JBRUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7b0JBRTNCLElBQUEsU0FBcUQsRUFBN0MsOEJBQVksRUFBRSxrQ0FBYyxDQUFrQjtvQkFFL0MsSUFBSyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7b0JBRW5DLEVBQUUsQ0FBQyxDQUFDLHVCQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QixJQUFJLEtBQUssR0FBRyxtQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDOUMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLHlCQUFXLENBQUMsQ0FBQyxDQUFDOzRCQUMxQixTQUFTLEdBQUcsSUFBSSxDQUFDOzRCQUNqQixDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JB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LGdFQUFnRTtvQkFDaEUsRUFBRSxDQUFDLENBQUMsWUFBWSxJQUFJLElBQUksSUFBTSxDQUMxQixZQUFZLEtBQUssSUFBSSxDQUFDLElBQUksQ0FDMUIsWUFBWSxLQUFLLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3pDLE1BQU0sQ0FBQztvQkFDVCxDQUFDO29CQUVELElBQU0sYUFBYSxHQUFVLElBQUssQ0FBQyxjQUFjLENBQUM7b0JBRWxELEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLElBQU0saUJBQWlCLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDOUQsRUFBRSxDQUFDLENBQUMsaUJBQWlCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUM3QixhQUFhLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUM3QyxDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztnQkFsSmEsa0JBQUssR0FBaUIsQ0FBQyxVQUFTLEtBQVU7b0JBQ3RELEtBQUssQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO29CQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNmLENBQUMsQ0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFnSnpCLG1CQUFDO1lBQUQsQ0FwSkEsQUFvSkMsSUFBQTtZQXBKRCx1Q0FvSkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9TdWJzY3JpcHRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzQXJyYXl9IGZyb20gJy4vdXRpbC9pc0FycmF5JztcbmltcG9ydCB7aXNPYmplY3R9IGZyb20gJy4vdXRpbC9pc09iamVjdCc7XG5pbXBvcnQge2lzRnVuY3Rpb259IGZyb20gJy4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7dHJ5Q2F0Y2h9IGZyb20gJy4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQge2Vycm9yT2JqZWN0fSBmcm9tICcuL3V0aWwvZXJyb3JPYmplY3QnO1xuaW1wb3J0IHtVbnN1YnNjcmlwdGlvbkVycm9yfSBmcm9tICcuL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW5vbnltb3VzU3Vic2NyaXB0aW9uIHtcbiAgdW5zdWJzY3JpYmUoKTogdm9pZDtcbn1cblxuZXhwb3J0IHR5cGUgVGVhcmRvd25Mb2dpYyA9IEFub255bW91c1N1YnNjcmlwdGlvbiB8IEZ1bmN0aW9uIHwgdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBJU3Vic2NyaXB0aW9uIGV4dGVuZHMgQW5vbnltb3VzU3Vic2NyaXB0aW9uIHtcbiAgdW5zdWJzY3JpYmUoKTogdm9pZDtcbiAgaXNVbnN1YnNjcmliZWQ6IGJvb2xlYW47XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGRpc3Bvc2FibGUgcmVzb3VyY2UsIHN1Y2ggYXMgdGhlIGV4ZWN1dGlvbiBvZiBhbiBPYnNlcnZhYmxlLiBBXG4gKiBTdWJzY3JpcHRpb24gaGFzIG9uZSBpbXBvcnRhbnQgbWV0aG9kLCBgdW5zdWJzY3JpYmVgLCB0aGF0IHRha2VzIG5vIGFyZ3VtZW50XG4gKiBhbmQganVzdCBkaXNwb3NlcyB0aGUgcmVzb3VyY2UgaGVsZCBieSB0aGUgc3Vic2NyaXB0aW9uLlxuICpcbiAqIEFkZGl0aW9uYWxseSwgc3Vic2NyaXB0aW9ucyBtYXkgYmUgZ3JvdXBlZCB0b2dldGhlciB0aHJvdWdoIHRoZSBgYWRkKClgXG4gKiBtZXRob2QsIHdoaWNoIHdpbGwgYXR0YWNoIGEgY2hpbGQgU3Vic2NyaXB0aW9uIHRvIHRoZSBjdXJyZW50IFN1YnNjcmlwdGlvbi5cbiAqIFdoZW4gYSBTdWJzY3JpcHRpb24gaXMgdW5zdWJzY3JpYmVkLCBhbGwgaXRzIGNoaWxkcmVuIChhbmQgaXRzIGdyYW5kY2hpbGRyZW4pXG4gKiB3aWxsIGJlIHVuc3Vic2NyaWJlZCBhcyB3ZWxsLlxuICpcbiAqIEBjbGFzcyBTdWJzY3JpcHRpb25cbiAqL1xuZXhwb3J0IGNsYXNzIFN1YnNjcmlwdGlvbiBpbXBsZW1lbnRzIElTdWJzY3JpcHRpb24ge1xuICBwdWJsaWMgc3RhdGljIEVNUFRZOiBTdWJzY3JpcHRpb24gPSAoZnVuY3Rpb24oZW1wdHk6IGFueSl7XG4gICAgZW1wdHkuaXNVbnN1YnNjcmliZWQgPSB0cnVlO1xuICAgIHJldHVybiBlbXB0eTtcbiAgfShuZXcgU3Vic2NyaXB0aW9uKCkpKTtcblxuICAvKipcbiAgICogQSBmbGFnIHRvIGluZGljYXRlIHdoZXRoZXIgdGhpcyBTdWJzY3JpcHRpb24gaGFzIGFscmVhZHkgYmVlbiB1bnN1YnNjcmliZWQuXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgcHVibGljIGlzVW5zdWJzY3JpYmVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oKTogdm9pZH0gW3Vuc3Vic2NyaWJlXSBBIGZ1bmN0aW9uIGRlc2NyaWJpbmcgaG93IHRvXG4gICAqIHBlcmZvcm0gdGhlIGRpc3Bvc2FsIG9mIHJlc291cmNlcyB3aGVuIHRoZSBgdW5zdWJzY3JpYmVgIG1ldGhvZCBpcyBjYWxsZWQuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih1bnN1YnNjcmliZT86ICgpID0+IHZvaWQpIHtcbiAgICBpZiAodW5zdWJzY3JpYmUpIHtcbiAgICAgICg8YW55PiB0aGlzKS5fdW5zdWJzY3JpYmUgPSB1bnN1YnNjcmliZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZXMgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSBzdWJzY3JpcHRpb24uIE1heSwgZm9yIGluc3RhbmNlLCBjYW5jZWxcbiAgICogYW4gb25nb2luZyBPYnNlcnZhYmxlIGV4ZWN1dGlvbiBvciBjYW5jZWwgYW55IG90aGVyIHR5cGUgb2Ygd29yayB0aGF0XG4gICAqIHN0YXJ0ZWQgd2hlbiB0aGUgU3Vic2NyaXB0aW9uIHdhcyBjcmVhdGVkLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgdW5zdWJzY3JpYmUoKTogdm9pZCB7XG4gICAgbGV0IGhhc0Vycm9ycyA9IGZhbHNlO1xuICAgIGxldCBlcnJvcnM6IGFueVtdO1xuXG4gICAgaWYgKHRoaXMuaXNVbnN1YnNjcmliZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmlzVW5zdWJzY3JpYmVkID0gdHJ1ZTtcblxuICAgIGNvbnN0IHsgX3Vuc3Vic2NyaWJlLCBfc3Vic2NyaXB0aW9ucyB9ID0gKDxhbnk+IHRoaXMpO1xuXG4gICAgKDxhbnk+IHRoaXMpLl9zdWJzY3JpcHRpb25zID0gbnVsbDtcblxuICAgIGlmIChpc0Z1bmN0aW9uKF91bnN1YnNjcmliZSkpIHtcbiAgICAgIGxldCB0cmlhbCA9IHRyeUNhdGNoKF91bnN1YnNjcmliZSkuY2FsbCh0aGlzKTtcbiAgICAgIGlmICh0cmlhbCA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgKGVycm9ycyA9IGVycm9ycyB8fCBbXSkucHVzaChlcnJvck9iamVjdC5lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheShfc3Vic2NyaXB0aW9ucykpIHtcblxuICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICBjb25zdCBsZW4gPSBfc3Vic2NyaXB0aW9ucy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuKSB7XG4gICAgICAgIGNvbnN0IHN1YiA9IF9zdWJzY3JpcHRpb25zW2luZGV4XTtcbiAgICAgICAgaWYgKGlzT2JqZWN0KHN1YikpIHtcbiAgICAgICAgICBsZXQgdHJpYWwgPSB0cnlDYXRjaChzdWIudW5zdWJzY3JpYmUpLmNhbGwoc3ViKTtcbiAgICAgICAgICBpZiAodHJpYWwgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xuICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzIHx8IFtdO1xuICAgICAgICAgICAgbGV0IGVyciA9IGVycm9yT2JqZWN0LmU7XG4gICAgICAgICAgICBpZiAoZXJyIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvcikge1xuICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMuY29uY2F0KGVyci5lcnJvcnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaGFzRXJyb3JzKSB7XG4gICAgICB0aHJvdyBuZXcgVW5zdWJzY3JpcHRpb25FcnJvcihlcnJvcnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgdGVhciBkb3duIHRvIGJlIGNhbGxlZCBkdXJpbmcgdGhlIHVuc3Vic2NyaWJlKCkgb2YgdGhpc1xuICAgKiBTdWJzY3JpcHRpb24uXG4gICAqXG4gICAqIElmIHRoZSB0ZWFyIGRvd24gYmVpbmcgYWRkZWQgaXMgYSBzdWJzY3JpcHRpb24gdGhhdCBpcyBhbHJlYWR5XG4gICAqIHVuc3Vic2NyaWJlZCwgaXMgdGhlIHNhbWUgcmVmZXJlbmNlIGBhZGRgIGlzIGJlaW5nIGNhbGxlZCBvbiwgb3IgaXNcbiAgICogYFN1YnNjcmlwdGlvbi5FTVBUWWAsIGl0IHdpbGwgbm90IGJlIGFkZGVkLlxuICAgKlxuICAgKiBJZiB0aGlzIHN1YnNjcmlwdGlvbiBpcyBhbHJlYWR5IGluIGFuIGBpc1Vuc3Vic2NyaWJlZGAgc3RhdGUsIHRoZSBwYXNzZWRcbiAgICogdGVhciBkb3duIGxvZ2ljIHdpbGwgYmUgZXhlY3V0ZWQgaW1tZWRpYXRlbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7VGVhcmRvd25Mb2dpY30gdGVhcmRvd24gVGhlIGFkZGl0aW9uYWwgbG9naWMgdG8gZXhlY3V0ZSBvblxuICAgKiB0ZWFyZG93bi5cbiAgICogQHJldHVybiB7U3Vic2NyaXB0aW9ufSBSZXR1cm5zIHRoZSBTdWJzY3JpcHRpb24gdXNlZCBvciBjcmVhdGVkIHRvIGJlXG4gICAqIGFkZGVkIHRvIHRoZSBpbm5lciBzdWJzY3JpcHRpb25zIGxpc3QuIFRoaXMgU3Vic2NyaXB0aW9uIGNhbiBiZSB1c2VkIHdpdGhcbiAgICogYHJlbW92ZSgpYCB0byByZW1vdmUgdGhlIHBhc3NlZCB0ZWFyZG93biBsb2dpYyBmcm9tIHRoZSBpbm5lciBzdWJzY3JpcHRpb25zXG4gICAqIGxpc3QuXG4gICAqL1xuICBhZGQodGVhcmRvd246IFRlYXJkb3duTG9naWMpOiBTdWJzY3JpcHRpb24ge1xuICAgIGlmICghdGVhcmRvd24gfHwgKFxuICAgICAgICB0ZWFyZG93biA9PT0gdGhpcykgfHwgKFxuICAgICAgICB0ZWFyZG93biA9PT0gU3Vic2NyaXB0aW9uLkVNUFRZKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzdWIgPSAoPFN1YnNjcmlwdGlvbj4gdGVhcmRvd24pO1xuXG4gICAgc3dpdGNoICh0eXBlb2YgdGVhcmRvd24pIHtcbiAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgc3ViID0gbmV3IFN1YnNjcmlwdGlvbig8KCgpID0+IHZvaWQpID4gdGVhcmRvd24pO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKHN1Yi5pc1Vuc3Vic2NyaWJlZCB8fCB0eXBlb2Ygc3ViLnVuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1Vuc3Vic2NyaWJlZCkge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICgoPGFueT4gdGhpcykuX3N1YnNjcmlwdGlvbnMgfHwgKCg8YW55PiB0aGlzKS5fc3Vic2NyaXB0aW9ucyA9IFtdKSkucHVzaChzdWIpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnJlY29nbml6ZWQgdGVhcmRvd24gJyArIHRlYXJkb3duICsgJyBhZGRlZCB0byBTdWJzY3JpcHRpb24uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1YjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgU3Vic2NyaXB0aW9uIGZyb20gdGhlIGludGVybmFsIGxpc3Qgb2Ygc3Vic2NyaXB0aW9ucyB0aGF0IHdpbGxcbiAgICogdW5zdWJzY3JpYmUgZHVyaW5nIHRoZSB1bnN1YnNjcmliZSBwcm9jZXNzIG9mIHRoaXMgU3Vic2NyaXB0aW9uLlxuICAgKiBAcGFyYW0ge1N1YnNjcmlwdGlvbn0gc3Vic2NyaXB0aW9uIFRoZSBzdWJzY3JpcHRpb24gdG8gcmVtb3ZlLlxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgcmVtb3ZlKHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uKTogdm9pZCB7XG5cbiAgICAvLyBIQUNLOiBUaGlzIG1pZ2h0IGJlIHJlZHVuZGFudCBiZWNhdXNlIG9mIHRoZSBsb2dpYyBpbiBgYWRkKClgXG4gICAgaWYgKHN1YnNjcmlwdGlvbiA9PSBudWxsICAgfHwgKFxuICAgICAgICBzdWJzY3JpcHRpb24gPT09IHRoaXMpIHx8IChcbiAgICAgICAgc3Vic2NyaXB0aW9uID09PSBTdWJzY3JpcHRpb24uRU1QVFkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3Vic2NyaXB0aW9ucyA9ICg8YW55PiB0aGlzKS5fc3Vic2NyaXB0aW9ucztcblxuICAgIGlmIChzdWJzY3JpcHRpb25zKSB7XG4gICAgICBjb25zdCBzdWJzY3JpcHRpb25JbmRleCA9IHN1YnNjcmlwdGlvbnMuaW5kZXhPZihzdWJzY3JpcHRpb24pO1xuICAgICAgaWYgKHN1YnNjcmlwdGlvbkluZGV4ICE9PSAtMSkge1xuICAgICAgICBzdWJzY3JpcHRpb25zLnNwbGljZShzdWJzY3JpcHRpb25JbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
