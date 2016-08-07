System.register(['../Subject', '../Observable', '../Subscriber', '../Subscription'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subject_1, Observable_1, Subscriber_1, Subscription_1;
    var ConnectableObservable, ConnectableSubscriber, RefCountOperator, RefCountSubscriber;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }],
        execute: function() {
            /**
             * @class ConnectableObservable<T>
             */
            ConnectableObservable = (function (_super) {
                __extends(ConnectableObservable, _super);
                function ConnectableObservable(source, subjectFactory) {
                    _super.call(this);
                    this.source = source;
                    this.subjectFactory = subjectFactory;
                    this._refCount = 0;
                }
                ConnectableObservable.prototype._subscribe = function (subscriber) {
                    return this.getSubject().subscribe(subscriber);
                };
                ConnectableObservable.prototype.getSubject = function () {
                    var subject = this._subject;
                    if (!subject || subject.isStopped) {
                        this._subject = this.subjectFactory();
                    }
                    return this._subject;
                };
                ConnectableObservable.prototype.connect = function () {
                    var connection = this._connection;
                    if (!connection) {
                        connection = this._connection = new Subscription_1.Subscription();
                        connection.add(this.source
                            .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
                        if (connection.isUnsubscribed) {
                            this._connection = null;
                            connection = Subscription_1.Subscription.EMPTY;
                        }
                        else {
                            this._connection = connection;
                        }
                    }
                    return connection;
                };
                ConnectableObservable.prototype.refCount = function () {
                    return this.lift(new RefCountOperator(this));
                };
                return ConnectableObservable;
            }(Observable_1.Observable));
            exports_1("ConnectableObservable", ConnectableObservable);
            ConnectableSubscriber = (function (_super) {
                __extends(ConnectableSubscriber, _super);
                function ConnectableSubscriber(destination, connectable) {
                    _super.call(this, destination);
                    this.connectable = connectable;
                }
                ConnectableSubscriber.prototype._error = function (err) {
                    this._unsubscribe();
                    _super.prototype._error.call(this, err);
                };
                ConnectableSubscriber.prototype._complete = function () {
                    this._unsubscribe();
                    _super.prototype._complete.call(this);
                };
                ConnectableSubscriber.prototype._unsubscribe = function () {
                    var connectable = this.connectable;
                    if (connectable) {
                        this.connectable = null;
                        var connection = connectable._connection;
                        connectable._refCount = 0;
                        connectable._subject = null;
                        connectable._connection = null;
                        if (connection) {
                            connection.unsubscribe();
                        }
                    }
                };
                return ConnectableSubscriber;
            }(Subject_1.SubjectSubscriber));
            RefCountOperator = (function () {
                function RefCountOperator(connectable) {
                    this.connectable = connectable;
                }
                RefCountOperator.prototype.call = function (subscriber, source) {
                    var connectable = this.connectable;
                    connectable._refCount++;
                    var refCounter = new RefCountSubscriber(subscriber, connectable);
                    var subscription = source._subscribe(refCounter);
                    if (!refCounter.isUnsubscribed) {
                        refCounter.connection = connectable.connect();
                    }
                    return subscription;
                };
                return RefCountOperator;
            }());
            RefCountSubscriber = (function (_super) {
                __extends(RefCountSubscriber, _super);
                function RefCountSubscriber(destination, connectable) {
                    _super.call(this, destination);
                    this.connectable = connectable;
                }
                RefCountSubscriber.prototype._unsubscribe = function () {
                    var connectable = this.connectable;
                    if (!connectable) {
                        this.connection = null;
                        return;
                    }
                    this.connectable = null;
                    var refCount = connectable._refCount;
                    if (refCount <= 0) {
                        this.connection = null;
                        return;
                    }
                    connectable._refCount = refCount - 1;
                    if (refCount > 1) {
                        this.connection = null;
                        return;
                    }
                    ///
                    // Compare the local RefCountSubscriber's connection Subscription to the
                    // connection Subscription on the shared ConnectableObservable. In cases
                    // where the ConnectableObservable source synchronously emits values, and
                    // the RefCountSubscriber's dowstream Observers synchronously unsubscribe,
                    // execution continues to here before the RefCountOperator has a chance to
                    // supply the RefCountSubscriber with the shared connection Subscription.
                    // For example:
                    // ```
                    // Observable.range(0, 10)
                    //   .publish()
                    //   .refCount()
                    //   .take(5)
                    //   .subscribe();
                    // ```
                    // In order to account for this case, RefCountSubscriber should only dispose
                    // the ConnectableObservable's shared connection Subscription if the
                    // connection Subscription exists, *and* either:
                    //   a. RefCountSubscriber doesn't have a reference to the shared connection
                    //      Subscription yet, or,
                    //   b. RefCountSubscriber's connection Subscription reference is identical
                    //      to the shared connection Subscription
                    ///
                    var connection = this.connection;
                    var sharedConnection = connectable._connection;
                    this.connection = null;
                    if (sharedConnection && (!connection || sharedConnection === connection)) {
                        sharedConnection.unsubscribe();
                    }
                };
                return RefCountSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvQ29ubmVjdGFibGVPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNQTs7ZUFFRztZQUNIO2dCQUE4Qyx5Q0FBYTtnQkFNekQsK0JBQXNCLE1BQXFCLEVBQ3JCLGNBQWdDO29CQUNwRCxpQkFBTyxDQUFDO29CQUZZLFdBQU0sR0FBTixNQUFNLENBQWU7b0JBQ3JCLG1CQUFjLEdBQWQsY0FBYyxDQUFrQjtvQkFKNUMsY0FBUyxHQUFXLENBQUMsQ0FBQztnQkFNaEMsQ0FBQztnQkFFUywwQ0FBVSxHQUFwQixVQUFxQixVQUF5QjtvQkFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ2pELENBQUM7Z0JBRVMsMENBQVUsR0FBcEI7b0JBQ0UsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN4QyxDQUFDO29CQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUN2QixDQUFDO2dCQUVELHVDQUFPLEdBQVA7b0JBQ0UsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztvQkFDbEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUNoQixVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQzt3QkFDbkQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTTs2QkFDdkIsU0FBUyxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxD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QUFJLENBQUM7b0JBRXZCLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLENBQUMsQ0FBQyxVQUFVLElBQUksZ0JBQWdCLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6RSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDakMsQ0FBQztnQkFDSCxDQUFDO2dCQUNILHlCQUFDO1lBQUQsQ0E3REEsQUE2REMsQ0E3RG1DLHVCQUFVLEdBNkQ3QyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9vYnNlcnZhYmxlL0Nvbm5lY3RhYmxlT2JzZXJ2YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3ViamVjdCwgU3ViamVjdFN1YnNjcmliZXJ9IGZyb20gJy4uL1N1YmplY3QnO1xuaW1wb3J0IHtPcGVyYXRvcn0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7U3Vic2NyaWJlcn0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuLyoqXG4gKiBAY2xhc3MgQ29ubmVjdGFibGVPYnNlcnZhYmxlPFQ+XG4gKi9cbmV4cG9ydCBjbGFzcyBDb25uZWN0YWJsZU9ic2VydmFibGU8VD4gZXh0ZW5kcyBPYnNlcnZhYmxlPFQ+IHtcblxuICBwcm90ZWN0ZWQgX3N1YmplY3Q6IFN1YmplY3Q8VD47XG4gIHByb3RlY3RlZCBfcmVmQ291bnQ6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfY29ubmVjdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzb3VyY2U6IE9ic2VydmFibGU8VD4sXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBzdWJqZWN0RmFjdG9yeTogKCkgPT4gU3ViamVjdDxUPikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3N1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFQ+KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U3ViamVjdCgpLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTdWJqZWN0KCk6IFN1YmplY3Q8VD4ge1xuICAgIGNvbnN0IHN1YmplY3QgPSB0aGlzLl9zdWJqZWN0O1xuICAgIGlmICghc3ViamVjdCB8fCBzdWJqZWN0LmlzU3RvcHBlZCkge1xuICAgICAgdGhpcy5fc3ViamVjdCA9IHRoaXMuc3ViamVjdEZhY3RvcnkoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3N1YmplY3Q7XG4gIH1cblxuICBjb25uZWN0KCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgbGV0IGNvbm5lY3Rpb24gPSB0aGlzLl9jb25uZWN0aW9uO1xuICAgIGlmICghY29ubmVjdGlvbikge1xuICAgICAgY29ubmVjdGlvbiA9IHRoaXMuX2Nvbm5lY3Rpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICBjb25uZWN0aW9uLmFkZCh0aGlzLnNvdXJjZVxuICAgICAgICAuc3Vic2NyaWJlKG5ldyBDb25uZWN0YWJsZVN1YnNjcmliZXIodGhpcy5nZXRTdWJqZWN0KCksIHRoaXMpKSk7XG4gICAgICBpZiAoY29ubmVjdGlvbi5pc1Vuc3Vic2NyaWJlZCkge1xuICAgICAgICB0aGlzLl9jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgY29ubmVjdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29ubmVjdGlvbjtcbiAgfVxuXG4gIHJlZkNvdW50KCk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLmxpZnQobmV3IFJlZkNvdW50T3BlcmF0b3I8VD4odGhpcykpO1xuICB9XG59XG5cbmNsYXNzIENvbm5lY3RhYmxlU3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YmplY3RTdWJzY3JpYmVyPFQ+IHtcbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YmplY3Q8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY29ubmVjdGFibGU6IENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxUPikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2Vycm9yKGVycjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fdW5zdWJzY3JpYmUoKTtcbiAgICBzdXBlci5fZXJyb3IoZXJyKTtcbiAgfVxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX3Vuc3Vic2NyaWJlKCk7XG4gICAgc3VwZXIuX2NvbXBsZXRlKCk7XG4gIH1cbiAgcHJvdGVjdGVkIF91bnN1YnNjcmliZSgpIHtcbiAgICBjb25zdCB7IGNvbm5lY3RhYmxlIH0gPSB0aGlzO1xuICAgIGlmIChjb25uZWN0YWJsZSkge1xuICAgICAgdGhpcy5jb25uZWN0YWJsZSA9IG51bGw7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gKDxhbnk+IGNvbm5lY3RhYmxlKS5fY29ubmVjdGlvbjtcbiAgICAgICg8YW55PiBjb25uZWN0YWJsZSkuX3JlZkNvdW50ID0gMDtcbiAgICAgICg8YW55PiBjb25uZWN0YWJsZSkuX3N1YmplY3QgPSBudWxsO1xuICAgICAgKDxhbnk+IGNvbm5lY3RhYmxlKS5fY29ubmVjdGlvbiA9IG51bGw7XG4gICAgICBpZiAoY29ubmVjdGlvbikge1xuICAgICAgICBjb25uZWN0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNsYXNzIFJlZkNvdW50T3BlcmF0b3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29ubmVjdGFibGU6IENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxUPikge1xuICB9XG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBhbnkge1xuXG4gICAgY29uc3QgeyBjb25uZWN0YWJsZSB9ID0gdGhpcztcbiAgICAoPGFueT4gY29ubmVjdGFibGUpLl9yZWZDb3VudCsrO1xuXG4gICAgY29uc3QgcmVmQ291bnRlciA9IG5ldyBSZWZDb3VudFN1YnNjcmliZXIoc3Vic2NyaWJlciwgY29ubmVjdGFibGUpO1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHNvdXJjZS5fc3Vic2NyaWJlKHJlZkNvdW50ZXIpO1xuXG4gICAgaWYgKCFyZWZDb3VudGVyLmlzVW5zdWJzY3JpYmVkKSB7XG4gICAgICAoPGFueT4gcmVmQ291bnRlcikuY29ubmVjdGlvbiA9IGNvbm5lY3RhYmxlLmNvbm5lY3QoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICB9XG59XG5cbmNsYXNzIFJlZkNvdW50U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuXG4gIHByaXZhdGUgY29ubmVjdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPFQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbm5lY3RhYmxlOiBDb25uZWN0YWJsZU9ic2VydmFibGU8VD4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Vuc3Vic2NyaWJlKCkge1xuXG4gICAgY29uc3QgeyBjb25uZWN0YWJsZSB9ID0gdGhpcztcbiAgICBpZiAoIWNvbm5lY3RhYmxlKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29ubmVjdGFibGUgPSBudWxsO1xuICAgIGNvbnN0IHJlZkNvdW50ID0gKDxhbnk+IGNvbm5lY3RhYmxlKS5fcmVmQ291bnQ7XG4gICAgaWYgKHJlZkNvdW50IDw9IDApIHtcbiAgICAgIHRoaXMuY29ubmVjdGlvbiA9IG51bGw7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgKDxhbnk+IGNvbm5lY3RhYmxlKS5fcmVmQ291bnQgPSByZWZDb3VudCAtIDE7XG4gICAgaWYgKHJlZkNvdW50ID4gMSkge1xuICAgICAgdGhpcy5jb25uZWN0aW9uID0gbnVsbDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLy9cbiAgICAvLyBDb21wYXJlIHRoZSBsb2NhbCBSZWZDb3VudFN1YnNjcmliZXIncyBjb25uZWN0aW9uIFN1YnNjcmlwdGlvbiB0byB0aGVcbiAgICAvLyBjb25uZWN0aW9uIFN1YnNjcmlwdGlvbiBvbiB0aGUgc2hhcmVkIENvbm5lY3RhYmxlT2JzZXJ2YWJsZS4gSW4gY2FzZXNcbiAgICAvLyB3aGVyZSB0aGUgQ29ubmVjdGFibGVPYnNlcnZhYmxlIHNvdXJjZSBzeW5jaHJvbm91c2x5IGVtaXRzIHZhbHVlcywgYW5kXG4gICAgLy8gdGhlIFJlZkNvdW50U3Vic2NyaWJlcidzIGRvd3N0cmVhbSBPYnNlcnZlcnMgc3luY2hyb25vdXNseSB1bnN1YnNjcmliZSxcbiAgICAvLyBleGVjdXRpb24gY29udGludWVzIHRvIGhlcmUgYmVmb3JlIHRoZSBSZWZDb3VudE9wZXJhdG9yIGhhcyBhIGNoYW5jZSB0b1xuICAgIC8vIHN1cHBseSB0aGUgUmVmQ291bnRTdWJzY3JpYmVyIHdpdGggdGhlIHNoYXJlZCBjb25uZWN0aW9uIFN1YnNjcmlwdGlvbi5cbiAgICAvLyBGb3IgZXhhbXBsZTpcbiAgICAvLyBgYGBcbiAgICAvLyBPYnNlcnZhYmxlLnJhbmdlKDAsIDEwKVxuICAgIC8vICAgLnB1Ymxpc2goKVxuICAgIC8vICAgLnJlZkNvdW50KClcbiAgICAvLyAgIC50YWtlKDUpXG4gICAgLy8gICAuc3Vic2NyaWJlKCk7XG4gICAgLy8gYGBgXG4gICAgLy8gSW4gb3JkZXIgdG8gYWNjb3VudCBmb3IgdGhpcyBjYXNlLCBSZWZDb3VudFN1YnNjcmliZXIgc2hvdWxkIG9ubHkgZGlzcG9zZVxuICAgIC8vIHRoZSBDb25uZWN0YWJsZU9ic2VydmFibGUncyBzaGFyZWQgY29ubmVjdGlvbiBTdWJzY3JpcHRpb24gaWYgdGhlXG4gICAgLy8gY29ubmVjdGlvbiBTdWJzY3JpcHRpb24gZXhpc3RzLCAqYW5kKiBlaXRoZXI6XG4gICAgLy8gICBhLiBSZWZDb3VudFN1YnNjcmliZXIgZG9lc24ndCBoYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBzaGFyZWQgY29ubmVjdGlvblxuICAgIC8vICAgICAgU3Vic2NyaXB0aW9uIHlldCwgb3IsXG4gICAgLy8gICBiLiBSZWZDb3VudFN1YnNjcmliZXIncyBjb25uZWN0aW9uIFN1YnNjcmlwdGlvbiByZWZlcmVuY2UgaXMgaWRlbnRpY2FsXG4gICAgLy8gICAgICB0byB0aGUgc2hhcmVkIGNvbm5lY3Rpb24gU3Vic2NyaXB0aW9uXG4gICAgLy8vXG4gICAgY29uc3QgeyBjb25uZWN0aW9uIH0gPSB0aGlzO1xuICAgIGNvbnN0IHNoYXJlZENvbm5lY3Rpb24gPSAoPGFueT4gY29ubmVjdGFibGUpLl9jb25uZWN0aW9uO1xuICAgIHRoaXMuY29ubmVjdGlvbiA9IG51bGw7XG5cbiAgICBpZiAoc2hhcmVkQ29ubmVjdGlvbiAmJiAoIWNvbm5lY3Rpb24gfHwgc2hhcmVkQ29ubmVjdGlvbiA9PT0gY29ubmVjdGlvbikpIHtcbiAgICAgIHNoYXJlZENvbm5lY3Rpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
