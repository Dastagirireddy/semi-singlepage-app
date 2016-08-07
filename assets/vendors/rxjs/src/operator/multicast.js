System.register(['../observable/MulticastObservable', '../observable/ConnectableObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MulticastObservable_1, ConnectableObservable_1;
    /**
     * Returns an Observable that emits the results of invoking a specified selector on items
     * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
     *
     * <img src="./img/multicast.png" width="100%">
     *
     * @param {Function|Subject} Factory function to create an intermediate subject through
     * which the source sequence's elements will be multicast to the selector function
     * or Subject to push source elements into.
     * @param {Function} Optional selector function that can use the multicasted source stream
     * as many times as needed, without causing multiple subscriptions to the source stream.
     * Subscribers to the given source will receive all notifications of the source from the
     * time of the subscription forward.
     * @return {Observable} an Observable that emits the results of invoking the selector
     * on the items emitted by a `ConnectableObservable` that shares a single subscription to
     * the underlying stream.
     * @method multicast
     * @owner Observable
     */
    function multicast(subjectOrSubjectFactory, selector) {
        var subjectFactory;
        if (typeof subjectOrSubjectFactory === 'function') {
            subjectFactory = subjectOrSubjectFactory;
        }
        else {
            subjectFactory = function subjectFactory() {
                return subjectOrSubjectFactory;
            };
        }
        return !selector ?
            new ConnectableObservable_1.ConnectableObservable(this, subjectFactory) :
            new MulticastObservable_1.MulticastObservable(this, subjectFactory, selector);
    }
    exports_1("multicast", multicast);
    return {
        setters:[
            function (MulticastObservable_1_1) {
                MulticastObservable_1 = MulticastObservable_1_1;
            },
            function (ConnectableObservable_1_1) {
                ConnectableObservable_1 = ConnectableObservable_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL211bHRpY2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBS0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILG1CQUE2Qix1QkFBd0QsRUFDeEQsUUFBbUQ7UUFDOUUsSUFBSSxjQUFnQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sdUJBQXVCLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsRCxjQUFjLEdBQXFCLHVCQUF1QixDQUFDO1FBQzdELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLGNBQWMsR0FBRztnQkFDZixNQUFNLENBQWEsdUJBQXVCLENBQUM7WUFDN0MsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUVELE1BQU0sQ0FBQyxDQUFDLFFBQVE7WUFDZCxJQUFJLDZDQUFxQixDQUFDLElBQUksRUFBRSxjQUFjLENBQUM7WUFDL0MsSUFBSSx5Q0FBbUIsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFkRCxpQ0FjQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL211bHRpY2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3ViamVjdH0gZnJvbSAnLi4vU3ViamVjdCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHtNdWx0aWNhc3RPYnNlcnZhYmxlfSBmcm9tICcuLi9vYnNlcnZhYmxlL011bHRpY2FzdE9ic2VydmFibGUnO1xuaW1wb3J0IHtDb25uZWN0YWJsZU9ic2VydmFibGV9IGZyb20gJy4uL29ic2VydmFibGUvQ29ubmVjdGFibGVPYnNlcnZhYmxlJztcblxuLyoqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgcmVzdWx0cyBvZiBpbnZva2luZyBhIHNwZWNpZmllZCBzZWxlY3RvciBvbiBpdGVtc1xuICogZW1pdHRlZCBieSBhIENvbm5lY3RhYmxlT2JzZXJ2YWJsZSB0aGF0IHNoYXJlcyBhIHNpbmdsZSBzdWJzY3JpcHRpb24gdG8gdGhlIHVuZGVybHlpbmcgc3RyZWFtLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvbXVsdGljYXN0LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb258U3ViamVjdH0gRmFjdG9yeSBmdW5jdGlvbiB0byBjcmVhdGUgYW4gaW50ZXJtZWRpYXRlIHN1YmplY3QgdGhyb3VnaFxuICogd2hpY2ggdGhlIHNvdXJjZSBzZXF1ZW5jZSdzIGVsZW1lbnRzIHdpbGwgYmUgbXVsdGljYXN0IHRvIHRoZSBzZWxlY3RvciBmdW5jdGlvblxuICogb3IgU3ViamVjdCB0byBwdXNoIHNvdXJjZSBlbGVtZW50cyBpbnRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gT3B0aW9uYWwgc2VsZWN0b3IgZnVuY3Rpb24gdGhhdCBjYW4gdXNlIHRoZSBtdWx0aWNhc3RlZCBzb3VyY2Ugc3RyZWFtXG4gKiBhcyBtYW55IHRpbWVzIGFzIG5lZWRlZCwgd2l0aG91dCBjYXVzaW5nIG11bHRpcGxlIHN1YnNjcmlwdGlvbnMgdG8gdGhlIHNvdXJjZSBzdHJlYW0uXG4gKiBTdWJzY3JpYmVycyB0byB0aGUgZ2l2ZW4gc291cmNlIHdpbGwgcmVjZWl2ZSBhbGwgbm90aWZpY2F0aW9ucyBvZiB0aGUgc291cmNlIGZyb20gdGhlXG4gKiB0aW1lIG9mIHRoZSBzdWJzY3JpcHRpb24gZm9yd2FyZC5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB0aGUgcmVzdWx0cyBvZiBpbnZva2luZyB0aGUgc2VsZWN0b3JcbiAqIG9uIHRoZSBpdGVtcyBlbWl0dGVkIGJ5IGEgYENvbm5lY3RhYmxlT2JzZXJ2YWJsZWAgdGhhdCBzaGFyZXMgYSBzaW5nbGUgc3Vic2NyaXB0aW9uIHRvXG4gKiB0aGUgdW5kZXJseWluZyBzdHJlYW0uXG4gKiBAbWV0aG9kIG11bHRpY2FzdFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG11bHRpY2FzdDxUPihzdWJqZWN0T3JTdWJqZWN0RmFjdG9yeTogU3ViamVjdDxUPiB8ICgoKSA9PiBTdWJqZWN0PFQ+KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I/OiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFQ+KTogT2JzZXJ2YWJsZTxUPiB8IENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxUPiB7XG4gIGxldCBzdWJqZWN0RmFjdG9yeTogKCkgPT4gU3ViamVjdDxUPjtcbiAgaWYgKHR5cGVvZiBzdWJqZWN0T3JTdWJqZWN0RmFjdG9yeSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHN1YmplY3RGYWN0b3J5ID0gPCgpID0+IFN1YmplY3Q8VD4+c3ViamVjdE9yU3ViamVjdEZhY3Rvcnk7XG4gIH0gZWxzZSB7XG4gICAgc3ViamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBzdWJqZWN0RmFjdG9yeSgpIHtcbiAgICAgIHJldHVybiA8U3ViamVjdDxUPj5zdWJqZWN0T3JTdWJqZWN0RmFjdG9yeTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuICFzZWxlY3RvciA/XG4gICAgbmV3IENvbm5lY3RhYmxlT2JzZXJ2YWJsZSh0aGlzLCBzdWJqZWN0RmFjdG9yeSkgOlxuICAgIG5ldyBNdWx0aWNhc3RPYnNlcnZhYmxlKHRoaXMsIHN1YmplY3RGYWN0b3J5LCBzZWxlY3Rvcik7XG59XG5cbmV4cG9ydCB0eXBlIGZhY3RvcnlPclZhbHVlPFQ+ID0gVCB8ICgoKSA9PiBUKTtcbmV4cG9ydCB0eXBlIHNlbGVjdG9yPFQ+ID0gKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPjtcblxuZXhwb3J0IGludGVyZmFjZSBNdWx0aWNhc3RTaWduYXR1cmU8VD4ge1xuICAoc3ViamVjdE9yU3ViamVjdEZhY3Rvcnk6IGZhY3RvcnlPclZhbHVlPFN1YmplY3Q8VD4+KTogQ29ubmVjdGFibGVPYnNlcnZhYmxlPFQ+O1xuICAoU3ViamVjdEZhY3Rvcnk6ICgpID0+IFN1YmplY3Q8VD4sIHNlbGVjdG9yPzogc2VsZWN0b3I8VD4pOiBPYnNlcnZhYmxlPFQ+O1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
