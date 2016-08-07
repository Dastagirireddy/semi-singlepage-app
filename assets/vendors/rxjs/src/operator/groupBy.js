System.register(['../Subscriber', '../Subscription', '../Observable', '../Subject', '../util/Map', '../util/FastMap'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1, Subscription_1, Observable_1, Subject_1, Map_1, FastMap_1;
    var GroupByOperator, GroupBySubscriber, GroupDurationSubscriber, GroupedObservable, InnerRefCountSubscription;
    /**
     * Groups the items emitted by an Observable according to a specified criterion,
     * and emits these grouped items as `GroupedObservables`, one
     * {@link GroupedObservable} per group.
     *
     * <img src="./img/groupBy.png" width="100%">
     *
     * @param {function(value: T): K} keySelector a function that extracts the key
     * for each item.
     * @param {function(value: T): R} [elementSelector] a function that extracts the
     * return element for each item.
     * @param {function(grouped: GroupedObservable<K,R>): Observable<any>} [durationSelector]
     * a function that returns an Observable to determine how long each group should
     * exist.
     * @return {Observable<GroupedObservable<K,R>>} an Observable that emits
     * GroupedObservables, each of which corresponds to a unique key value and each
     * of which emits those items from the source Observable that share that key
     * value.
     * @method groupBy
     * @owner Observable
     */
    function groupBy(keySelector, elementSelector, durationSelector) {
        return this.lift(new GroupByOperator(this, keySelector, elementSelector, durationSelector));
    }
    exports_1("groupBy", groupBy);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (Map_1_1) {
                Map_1 = Map_1_1;
            },
            function (FastMap_1_1) {
                FastMap_1 = FastMap_1_1;
            }],
        execute: function() {
            GroupByOperator = (function () {
                function GroupByOperator(source, keySelector, elementSelector, durationSelector) {
                    this.source = source;
                    this.keySelector = keySelector;
                    this.elementSelector = elementSelector;
                    this.durationSelector = durationSelector;
                }
                GroupByOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector));
                };
                return GroupByOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            GroupBySubscriber = (function (_super) {
                __extends(GroupBySubscriber, _super);
                function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector) {
                    _super.call(this, destination);
                    this.keySelector = keySelector;
                    this.elementSelector = elementSelector;
                    this.durationSelector = durationSelector;
                    this.groups = null;
                    this.attemptedToUnsubscribe = false;
                    this.count = 0;
                }
                GroupBySubscriber.prototype._next = function (value) {
                    var key;
                    try {
                        key = this.keySelector(value);
                    }
                    catch (err) {
                        this.error(err);
                        return;
                    }
                    this._group(value, key);
                };
                GroupBySubscriber.prototype._group = function (value, key) {
                    var groups = this.groups;
                    if (!groups) {
                        groups = this.groups = typeof key === 'string' ? new FastMap_1.FastMap() : new Map_1.Map();
                    }
                    var group = groups.get(key);
                    var element;
                    if (this.elementSelector) {
                        try {
                            element = this.elementSelector(value);
                        }
                        catch (err) {
                            this.error(err);
                        }
                    }
                    else {
                        element = value;
                    }
                    if (!group) {
                        groups.set(key, group = new Subject_1.Subject());
                        var groupedObservable = new GroupedObservable(key, group, this);
                        this.destination.next(groupedObservable);
                        if (this.durationSelector) {
                            var duration = void 0;
                            try {
                                duration = this.durationSelector(new GroupedObservable(key, group));
                            }
                            catch (err) {
                                this.error(err);
                                return;
                            }
                            this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
                        }
                    }
                    if (!group.isUnsubscribed) {
                        group.next(element);
                    }
                };
                GroupBySubscriber.prototype._error = function (err) {
                    var groups = this.groups;
                    if (groups) {
                        groups.forEach(function (group, key) {
                            group.error(err);
                        });
                        groups.clear();
                    }
                    this.destination.error(err);
                };
                GroupBySubscriber.prototype._complete = function () {
                    var groups = this.groups;
                    if (groups) {
                        groups.forEach(function (group, key) {
                            group.complete();
                        });
                        groups.clear();
                    }
                    this.destination.complete();
                };
                GroupBySubscriber.prototype.removeGroup = function (key) {
                    this.groups.delete(key);
                };
                GroupBySubscriber.prototype.unsubscribe = function () {
                    if (!this.isUnsubscribed && !this.attemptedToUnsubscribe) {
                        this.attemptedToUnsubscribe = true;
                        if (this.count === 0) {
                            _super.prototype.unsubscribe.call(this);
                        }
                    }
                };
                return GroupBySubscriber;
            }(Subscriber_1.Subscriber));
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            GroupDurationSubscriber = (function (_super) {
                __extends(GroupDurationSubscriber, _super);
                function GroupDurationSubscriber(key, group, parent) {
                    _super.call(this);
                    this.key = key;
                    this.group = group;
                    this.parent = parent;
                }
                GroupDurationSubscriber.prototype._next = function (value) {
                    this._complete();
                };
                GroupDurationSubscriber.prototype._error = function (err) {
                    var group = this.group;
                    if (!group.isUnsubscribed) {
                        group.error(err);
                    }
                    this.parent.removeGroup(this.key);
                };
                GroupDurationSubscriber.prototype._complete = function () {
                    var group = this.group;
                    if (!group.isUnsubscribed) {
                        group.complete();
                    }
                    this.parent.removeGroup(this.key);
                };
                return GroupDurationSubscriber;
            }(Subscriber_1.Subscriber));
            /**
             * An Observable representing values belonging to the same group represented by
             * a common key. The values emitted by a GroupedObservable come from the source
             * Observable. The common key is available as the field `key` on a
             * GroupedObservable instance.
             *
             * @class GroupedObservable<K, T>
             */
            GroupedObservable = (function (_super) {
                __extends(GroupedObservable, _super);
                function GroupedObservable(key, groupSubject, refCountSubscription) {
                    _super.call(this);
                    this.key = key;
                    this.groupSubject = groupSubject;
                    this.refCountSubscription = refCountSubscription;
                }
                GroupedObservable.prototype._subscribe = function (subscriber) {
                    var subscription = new Subscription_1.Subscription();
                    var _a = this, refCountSubscription = _a.refCountSubscription, groupSubject = _a.groupSubject;
                    if (refCountSubscription && !refCountSubscription.isUnsubscribed) {
                        subscription.add(new InnerRefCountSubscription(refCountSubscription));
                    }
                    subscription.add(groupSubject.subscribe(subscriber));
                    return subscription;
                };
                return GroupedObservable;
            }(Observable_1.Observable));
            exports_1("GroupedObservable", GroupedObservable);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            InnerRefCountSubscription = (function (_super) {
                __extends(InnerRefCountSubscription, _super);
                function InnerRefCountSubscription(parent) {
                    _super.call(this);
                    this.parent = parent;
                    parent.count++;
                }
                InnerRefCountSubscription.prototype.unsubscribe = function () {
                    var parent = this.parent;
                    if (!parent.isUnsubscribed && !this.isUnsubscribed) {
                        _super.prototype.unsubscribe.call(this);
                        parent.count -= 1;
                        if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                            parent.unsubscribe();
                        }
                    }
                };
                return InnerRefCountSubscription;
            }(Subscription_1.Subscription));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL2dyb3VwQnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQVFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9CRztJQUNILGlCQUFpQyxXQUE0QixFQUM1QixlQUFpQyxFQUNqQyxnQkFBd0U7UUFDdkcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFKRCw2QkFJQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBaUJEO2dCQUNFLHlCQUFtQixNQUFxQixFQUNwQixXQUE0QixFQUM1QixlQUFpQyxFQUNqQyxnQkFBd0U7b0JBSHpFLFdBQU0sR0FBTixNQUFNLENBQWU7b0JBQ3BCLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtvQkFDNUIsb0JBQWUsR0FBZixlQUFlLENBQWtCO29CQUNqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdEO2dCQUM1RixDQUFDO2dCQUVELDhCQUFJLEdBQUosVUFBSyxVQUErQyxFQUFFLE1BQVc7b0JBQy9ELE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksaUJBQWlCLENBQzVDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUMxRSxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFDSCxzQkFBQztZQUFELENBWkEsQUFZQyxJQUFBO1lBRUQ7Ozs7ZUFJRztZQUNIO2dCQUF5QyxxQ0FBYTtnQkFLcEQsMkJBQVksV0FBZ0QsRUFDeEMsV0FBNEIsRUFDNUIsZUFBaUMsRUFDakMsZ0JBQXdFO29CQUMxRixrQkFBTSxXQUFXLENBQUMsQ0FBQztvQkFIRCxnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7b0JBQzVCLG9CQUFlLEdBQWYs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QUksQ0FBQyxNQUFNLENBQUM7b0JBQzNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO3dCQUNuRCxnQkFBSyxDQUFDLFdBQVcsV0FBRSxDQUFDO3dCQUNwQixNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFDbEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQzs0QkFDeEQsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUN2QixDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCxnQ0FBQztZQUFELENBaEJBLEFBZ0JDLENBaEJ1QywyQkFBWSxHQWdCbkQiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvb3BlcmF0b3IvZ3JvdXBCeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge09wZXJhdG9yfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJy4uL1N1YmplY3QnO1xuaW1wb3J0IHtNYXB9IGZyb20gJy4uL3V0aWwvTWFwJztcbmltcG9ydCB7RmFzdE1hcH0gZnJvbSAnLi4vdXRpbC9GYXN0TWFwJztcblxuLyoqXG4gKiBHcm91cHMgdGhlIGl0ZW1zIGVtaXR0ZWQgYnkgYW4gT2JzZXJ2YWJsZSBhY2NvcmRpbmcgdG8gYSBzcGVjaWZpZWQgY3JpdGVyaW9uLFxuICogYW5kIGVtaXRzIHRoZXNlIGdyb3VwZWQgaXRlbXMgYXMgYEdyb3VwZWRPYnNlcnZhYmxlc2AsIG9uZVxuICoge0BsaW5rIEdyb3VwZWRPYnNlcnZhYmxlfSBwZXIgZ3JvdXAuXG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9ncm91cEJ5LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQpOiBLfSBrZXlTZWxlY3RvciBhIGZ1bmN0aW9uIHRoYXQgZXh0cmFjdHMgdGhlIGtleVxuICogZm9yIGVhY2ggaXRlbS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IFQpOiBSfSBbZWxlbWVudFNlbGVjdG9yXSBhIGZ1bmN0aW9uIHRoYXQgZXh0cmFjdHMgdGhlXG4gKiByZXR1cm4gZWxlbWVudCBmb3IgZWFjaCBpdGVtLlxuICogQHBhcmFtIHtmdW5jdGlvbihncm91cGVkOiBHcm91cGVkT2JzZXJ2YWJsZTxLLFI+KTogT2JzZXJ2YWJsZTxhbnk+fSBbZHVyYXRpb25TZWxlY3Rvcl1cbiAqIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIE9ic2VydmFibGUgdG8gZGV0ZXJtaW5lIGhvdyBsb25nIGVhY2ggZ3JvdXAgc2hvdWxkXG4gKiBleGlzdC5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8R3JvdXBlZE9ic2VydmFibGU8SyxSPj59IGFuIE9ic2VydmFibGUgdGhhdCBlbWl0c1xuICogR3JvdXBlZE9ic2VydmFibGVzLCBlYWNoIG9mIHdoaWNoIGNvcnJlc3BvbmRzIHRvIGEgdW5pcXVlIGtleSB2YWx1ZSBhbmQgZWFjaFxuICogb2Ygd2hpY2ggZW1pdHMgdGhvc2UgaXRlbXMgZnJvbSB0aGUgc291cmNlIE9ic2VydmFibGUgdGhhdCBzaGFyZSB0aGF0IGtleVxuICogdmFsdWUuXG4gKiBAbWV0aG9kIGdyb3VwQnlcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBncm91cEJ5PFQsIEssIFI+KGtleVNlbGVjdG9yOiAodmFsdWU6IFQpID0+IEssXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50U2VsZWN0b3I/OiAodmFsdWU6IFQpID0+IFIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvblNlbGVjdG9yPzogKGdyb3VwZWQ6IEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+KSA9PiBPYnNlcnZhYmxlPGFueT4pOiBPYnNlcnZhYmxlPEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+PiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IEdyb3VwQnlPcGVyYXRvcih0aGlzLCBrZXlTZWxlY3RvciwgZWxlbWVudFNlbGVjdG9yLCBkdXJhdGlvblNlbGVjdG9yKSk7XG59XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuZXhwb3J0IGludGVyZmFjZSBHcm91cEJ5U2lnbmF0dXJlPFQ+IHtcbiAgPEs+KGtleVNlbGVjdG9yOiAodmFsdWU6IFQpID0+IEspOiBPYnNlcnZhYmxlPEdyb3VwZWRPYnNlcnZhYmxlPEssIFQ+PjtcbiAgPEs+KGtleVNlbGVjdG9yOiAodmFsdWU6IFQpID0+IEssIGVsZW1lbnRTZWxlY3Rvcjogdm9pZCwgZHVyYXRpb25TZWxlY3RvcjogKGdyb3VwZWQ6IEdyb3VwZWRPYnNlcnZhYmxlPEssIFQ+KSA9PiBPYnNlcnZhYmxlPGFueT4pOiBPYnNlcnZhYmxlPEdyb3VwZWRPYnNlcnZhYmxlPEssIFQ+PjtcbiAgPEssIFI+KGtleVNlbGVjdG9yOiAodmFsdWU6IFQpID0+IEssIGVsZW1lbnRTZWxlY3Rvcj86ICh2YWx1ZTogVCkgPT4gUiwgZHVyYXRpb25TZWxlY3Rvcj86IChncm91cGVkOiBHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPikgPT4gT2JzZXJ2YWJsZTxhbnk+KTogT2JzZXJ2YWJsZTxHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPj47XG59XG4vKiB0c2xpbnQ6ZW5hYmxlOm1heC1saW5lLWxlbmd0aCAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlZkNvdW50U3Vic2NyaXB0aW9uIHtcbiAgY291bnQ6IG51bWJlcjtcbiAgdW5zdWJzY3JpYmU6ICgpID0+IHZvaWQ7XG4gIGlzVW5zdWJzY3JpYmVkOiBib29sZWFuO1xuICBhdHRlbXB0ZWRUb1Vuc3Vic2NyaWJlOiBib29sZWFuO1xufVxuXG5jbGFzcyBHcm91cEJ5T3BlcmF0b3I8VCwgSywgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPj4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGtleVNlbGVjdG9yOiAodmFsdWU6IFQpID0+IEssXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudFNlbGVjdG9yPzogKHZhbHVlOiBUKSA9PiBSLFxuICAgICAgICAgICAgICBwcml2YXRlIGR1cmF0aW9uU2VsZWN0b3I/OiAoZ3JvdXBlZDogR3JvdXBlZE9ic2VydmFibGU8SywgUj4pID0+IE9ic2VydmFibGU8YW55Pikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+Piwgc291cmNlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBzb3VyY2UuX3N1YnNjcmliZShuZXcgR3JvdXBCeVN1YnNjcmliZXIoXG4gICAgICBzdWJzY3JpYmVyLCB0aGlzLmtleVNlbGVjdG9yLCB0aGlzLmVsZW1lbnRTZWxlY3RvciwgdGhpcy5kdXJhdGlvblNlbGVjdG9yXG4gICAgKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIEdyb3VwQnlTdWJzY3JpYmVyPFQsIEssIFI+IGV4dGVuZHMgU3Vic2NyaWJlcjxUPiBpbXBsZW1lbnRzIFJlZkNvdW50U3Vic2NyaXB0aW9uIHtcbiAgcHJpdmF0ZSBncm91cHM6IE1hcDxLLCBTdWJqZWN0PFR8Uj4+ID0gbnVsbDtcbiAgcHVibGljIGF0dGVtcHRlZFRvVW5zdWJzY3JpYmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGNvdW50OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBrZXlTZWxlY3RvcjogKHZhbHVlOiBUKSA9PiBLLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnRTZWxlY3Rvcj86ICh2YWx1ZTogVCkgPT4gUixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkdXJhdGlvblNlbGVjdG9yPzogKGdyb3VwZWQ6IEdyb3VwZWRPYnNlcnZhYmxlPEssIFI+KSA9PiBPYnNlcnZhYmxlPGFueT4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpOiB2b2lkIHtcbiAgICBsZXQga2V5OiBLO1xuICAgIHRyeSB7XG4gICAgICBrZXkgPSB0aGlzLmtleVNlbGVjdG9yKHZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMuZXJyb3IoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9ncm91cCh2YWx1ZSwga2V5KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dyb3VwKHZhbHVlOiBULCBrZXk6IEspIHtcbiAgICBsZXQgZ3JvdXBzID0gdGhpcy5ncm91cHM7XG5cbiAgICBpZiAoIWdyb3Vwcykge1xuICAgICAgZ3JvdXBzID0gdGhpcy5ncm91cHMgPSB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyA/IG5ldyBGYXN0TWFwKCkgOiBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgbGV0IGdyb3VwID0gZ3JvdXBzLmdldChrZXkpO1xuXG4gICAgbGV0IGVsZW1lbnQ6IFI7XG4gICAgaWYgKHRoaXMuZWxlbWVudFNlbGVjdG9yKSB7XG4gICAgICB0cnkge1xuICAgICAgICBlbGVtZW50ID0gdGhpcy5lbGVtZW50U2VsZWN0b3IodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHRoaXMuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudCA9IDxhbnk+dmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKCFncm91cCkge1xuICAgICAgZ3JvdXBzLnNldChrZXksIGdyb3VwID0gbmV3IFN1YmplY3Q8Uj4oKSk7XG4gICAgICBjb25zdCBncm91cGVkT2JzZXJ2YWJsZSA9IG5ldyBHcm91cGVkT2JzZXJ2YWJsZShrZXksIGdyb3VwLCB0aGlzKTtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChncm91cGVkT2JzZXJ2YWJsZSk7XG4gICAgICBpZiAodGhpcy5kdXJhdGlvblNlbGVjdG9yKSB7XG4gICAgICAgIGxldCBkdXJhdGlvbjogYW55O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGR1cmF0aW9uID0gdGhpcy5kdXJhdGlvblNlbGVjdG9yKG5ldyBHcm91cGVkT2JzZXJ2YWJsZTxLLCBSPihrZXksIDxTdWJqZWN0PFI+Pmdyb3VwKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHRoaXMuZXJyb3IoZXJyKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGQoZHVyYXRpb24uc3Vic2NyaWJlKG5ldyBHcm91cER1cmF0aW9uU3Vic2NyaWJlcihrZXksIGdyb3VwLCB0aGlzKSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZ3JvdXAuaXNVbnN1YnNjcmliZWQpIHtcbiAgICAgIGdyb3VwLm5leHQoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9lcnJvcihlcnI6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGdyb3VwcyA9IHRoaXMuZ3JvdXBzO1xuICAgIGlmIChncm91cHMpIHtcbiAgICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCwga2V5KSA9PiB7XG4gICAgICAgIGdyb3VwLmVycm9yKGVycik7XG4gICAgICB9KTtcblxuICAgICAgZ3JvdXBzLmNsZWFyKCk7XG4gICAgfVxuICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKTogdm9pZCB7XG4gICAgY29uc3QgZ3JvdXBzID0gdGhpcy5ncm91cHM7XG4gICAgaWYgKGdyb3Vwcykge1xuICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwLCBrZXkpID0+IHtcbiAgICAgICAgZ3JvdXAuY29tcGxldGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICBncm91cHMuY2xlYXIoKTtcbiAgICB9XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcmVtb3ZlR3JvdXAoa2V5OiBLKTogdm9pZCB7XG4gICAgdGhpcy5ncm91cHMuZGVsZXRlKGtleSk7XG4gIH1cblxuICB1bnN1YnNjcmliZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNVbnN1YnNjcmliZWQgJiYgIXRoaXMuYXR0ZW1wdGVkVG9VbnN1YnNjcmliZSkge1xuICAgICAgdGhpcy5hdHRlbXB0ZWRUb1Vuc3Vic2NyaWJlID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLmNvdW50ID09PSAwKSB7XG4gICAgICAgIHN1cGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBHcm91cER1cmF0aW9uU3Vic2NyaWJlcjxLLCBUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGtleTogSyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBncm91cDogU3ViamVjdDxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwYXJlbnQ6IEdyb3VwQnlTdWJzY3JpYmVyPGFueSwgSywgVD4pIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgdGhpcy5fY29tcGxldGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZXJyb3IoZXJyOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZ3JvdXA7XG4gICAgaWYgKCFncm91cC5pc1Vuc3Vic2NyaWJlZCkge1xuICAgICAgZ3JvdXAuZXJyb3IoZXJyKTtcbiAgICB9XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlR3JvdXAodGhpcy5rZXkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBncm91cCA9IHRoaXMuZ3JvdXA7XG4gICAgaWYgKCFncm91cC5pc1Vuc3Vic2NyaWJlZCkge1xuICAgICAgZ3JvdXAuY29tcGxldGUoKTtcbiAgICB9XG4gICAgdGhpcy5wYXJlbnQucmVtb3ZlR3JvdXAodGhpcy5rZXkpO1xuICB9XG59XG5cbi8qKlxuICogQW4gT2JzZXJ2YWJsZSByZXByZXNlbnRpbmcgdmFsdWVzIGJlbG9uZ2luZyB0byB0aGUgc2FtZSBncm91cCByZXByZXNlbnRlZCBieVxuICogYSBjb21tb24ga2V5LiBUaGUgdmFsdWVzIGVtaXR0ZWQgYnkgYSBHcm91cGVkT2JzZXJ2YWJsZSBjb21lIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZS4gVGhlIGNvbW1vbiBrZXkgaXMgYXZhaWxhYmxlIGFzIHRoZSBmaWVsZCBga2V5YCBvbiBhXG4gKiBHcm91cGVkT2JzZXJ2YWJsZSBpbnN0YW5jZS5cbiAqXG4gKiBAY2xhc3MgR3JvdXBlZE9ic2VydmFibGU8SywgVD5cbiAqL1xuZXhwb3J0IGNsYXNzIEdyb3VwZWRPYnNlcnZhYmxlPEssIFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBrZXk6IEssXG4gICAgICAgICAgICAgIHByaXZhdGUgZ3JvdXBTdWJqZWN0OiBTdWJqZWN0PFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIHJlZkNvdW50U3Vic2NyaXB0aW9uPzogUmVmQ291bnRTdWJzY3JpcHRpb24pIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPikge1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICBjb25zdCB7cmVmQ291bnRTdWJzY3JpcHRpb24sIGdyb3VwU3ViamVjdH0gPSB0aGlzO1xuICAgIGlmIChyZWZDb3VudFN1YnNjcmlwdGlvbiAmJiAhcmVmQ291bnRTdWJzY3JpcHRpb24uaXNVbnN1YnNjcmliZWQpIHtcbiAgICAgIHN1YnNjcmlwdGlvbi5hZGQobmV3IElubmVyUmVmQ291bnRTdWJzY3JpcHRpb24ocmVmQ291bnRTdWJzY3JpcHRpb24pKTtcbiAgICB9XG4gICAgc3Vic2NyaXB0aW9uLmFkZChncm91cFN1YmplY3Quc3Vic2NyaWJlKHN1YnNjcmliZXIpKTtcbiAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBJbm5lclJlZkNvdW50U3Vic2NyaXB0aW9uIGV4dGVuZHMgU3Vic2NyaXB0aW9uIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJlbnQ6IFJlZkNvdW50U3Vic2NyaXB0aW9uKSB7XG4gICAgc3VwZXIoKTtcbiAgICBwYXJlbnQuY291bnQrKztcbiAgfVxuXG4gIHVuc3Vic2NyaWJlKCkge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgIGlmICghcGFyZW50LmlzVW5zdWJzY3JpYmVkICYmICF0aGlzLmlzVW5zdWJzY3JpYmVkKSB7XG4gICAgICBzdXBlci51bnN1YnNjcmliZSgpO1xuICAgICAgcGFyZW50LmNvdW50IC09IDE7XG4gICAgICBpZiAocGFyZW50LmNvdW50ID09PSAwICYmIHBhcmVudC5hdHRlbXB0ZWRUb1Vuc3Vic2NyaWJlKSB7XG4gICAgICAgIHBhcmVudC51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
