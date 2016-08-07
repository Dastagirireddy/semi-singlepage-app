System.register(['../Subject', './multicast'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1, multicast_1;
    /**
     * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
     * before it begins emitting items to those Observers that have subscribed to it.
     *
     * <img src="./img/publish.png" width="100%">
     *
     * @param {Function} Optional selector function which can use the multicasted source sequence as many times as needed,
     * without causing multiple subscriptions to the source sequence.
     * Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
     * @return a ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
     * @method publish
     * @owner Observable
     */
    function publish(selector) {
        return selector ? multicast_1.multicast.call(this, function () { return new Subject_1.Subject(); }, selector) :
            multicast_1.multicast.call(this, new Subject_1.Subject());
    }
    exports_1("publish", publish);
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (multicast_1_1) {
                multicast_1 = multicast_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3B1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUtBOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILGlCQUEyQixRQUFtRDtRQUM1RSxNQUFNLENBQUMsUUFBUSxHQUFHLHFCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxjQUFNLE9BQUEsSUFBSSxpQkFBTyxFQUFLLEVBQWhCLENBQWdCLEVBQUUsUUFBUSxDQUFDO1lBQ3RELHFCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLGlCQUFPLEVBQUssQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFIRCw2QkFHQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29wZXJhdG9yL3B1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1YmplY3R9IGZyb20gJy4uL1N1YmplY3QnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7bXVsdGljYXN0fSBmcm9tICcuL211bHRpY2FzdCc7XG5pbXBvcnQge0Nvbm5lY3RhYmxlT2JzZXJ2YWJsZX0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9Db25uZWN0YWJsZU9ic2VydmFibGUnO1xuXG4vKipcbiAqIFJldHVybnMgYSBDb25uZWN0YWJsZU9ic2VydmFibGUsIHdoaWNoIGlzIGEgdmFyaWV0eSBvZiBPYnNlcnZhYmxlIHRoYXQgd2FpdHMgdW50aWwgaXRzIGNvbm5lY3QgbWV0aG9kIGlzIGNhbGxlZFxuICogYmVmb3JlIGl0IGJlZ2lucyBlbWl0dGluZyBpdGVtcyB0byB0aG9zZSBPYnNlcnZlcnMgdGhhdCBoYXZlIHN1YnNjcmliZWQgdG8gaXQuXG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9wdWJsaXNoLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IE9wdGlvbmFsIHNlbGVjdG9yIGZ1bmN0aW9uIHdoaWNoIGNhbiB1c2UgdGhlIG11bHRpY2FzdGVkIHNvdXJjZSBzZXF1ZW5jZSBhcyBtYW55IHRpbWVzIGFzIG5lZWRlZCxcbiAqIHdpdGhvdXQgY2F1c2luZyBtdWx0aXBsZSBzdWJzY3JpcHRpb25zIHRvIHRoZSBzb3VyY2Ugc2VxdWVuY2UuXG4gKiBTdWJzY3JpYmVycyB0byB0aGUgZ2l2ZW4gc291cmNlIHdpbGwgcmVjZWl2ZSBhbGwgbm90aWZpY2F0aW9ucyBvZiB0aGUgc291cmNlIGZyb20gdGhlIHRpbWUgb2YgdGhlIHN1YnNjcmlwdGlvbiBvbi5cbiAqIEByZXR1cm4gYSBDb25uZWN0YWJsZU9ic2VydmFibGUgdGhhdCB1cG9uIGNvbm5lY3Rpb24gY2F1c2VzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB0byBlbWl0IGl0ZW1zIHRvIGl0cyBPYnNlcnZlcnMuXG4gKiBAbWV0aG9kIHB1Ymxpc2hcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwdWJsaXNoPFQ+KHNlbGVjdG9yPzogKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPik6IE9ic2VydmFibGU8VD4gfCBDb25uZWN0YWJsZU9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gc2VsZWN0b3IgPyBtdWx0aWNhc3QuY2FsbCh0aGlzLCAoKSA9PiBuZXcgU3ViamVjdDxUPigpLCBzZWxlY3RvcikgOlxuICAgICAgICAgICAgICAgICAgICBtdWx0aWNhc3QuY2FsbCh0aGlzLCBuZXcgU3ViamVjdDxUPigpKTtcbn1cblxuZXhwb3J0IHR5cGUgc2VsZWN0b3I8VD4gPSAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFQ+O1xuXG5leHBvcnQgaW50ZXJmYWNlIFB1Ymxpc2hTaWduYXR1cmU8VD4ge1xuICAoKTogQ29ubmVjdGFibGVPYnNlcnZhYmxlPFQ+O1xuICAoc2VsZWN0b3I6IHNlbGVjdG9yPFQ+KTogT2JzZXJ2YWJsZTxUPjtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
