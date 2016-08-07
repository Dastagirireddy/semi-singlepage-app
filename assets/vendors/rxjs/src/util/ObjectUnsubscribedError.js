System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ObjectUnsubscribedError;
    return {
        setters:[],
        execute: function() {
            /**
             * An error thrown when an action is invalid because the object has been
             * unsubscribed.
             *
             * @see {@link Subject}
             * @see {@link BehaviorSubject}
             *
             * @class ObjectUnsubscribedError
             */
            ObjectUnsubscribedError = (function (_super) {
                __extends(ObjectUnsubscribedError, _super);
                function ObjectUnsubscribedError() {
                    var err = _super.call(this, 'object unsubscribed');
                    this.name = err.name = 'ObjectUnsubscribedError';
                    this.stack = err.stack;
                    this.message = err.message;
                }
                return ObjectUnsubscribedError;
            }(Error));
            exports_1("ObjectUnsubscribedError", ObjectUnsubscribedError);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL3V0aWwvT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O1lBQUE7Ozs7Ozs7O2VBUUc7WUFDSDtnQkFBNkMsMkNBQUs7Z0JBQ2hEO29CQUNFLElBQU0sR0FBRyxHQUFRLGtCQUFNLHFCQUFxQixDQUFDLENBQUM7b0JBQ3ZDLElBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyx5QkFBeUIsQ0FBQztvQkFDbEQsSUFBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO29CQUN4QixJQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JDLENBQUM7Z0JBQ0gsOEJBQUM7WUFBRCxDQVBBLEFBT0MsQ0FQNEMsS0FBSyxHQU9qRDtZQVBELDZEQU9DLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQW4gZXJyb3IgdGhyb3duIHdoZW4gYW4gYWN0aW9uIGlzIGludmFsaWQgYmVjYXVzZSB0aGUgb2JqZWN0IGhhcyBiZWVuXG4gKiB1bnN1YnNjcmliZWQuXG4gKlxuICogQHNlZSB7QGxpbmsgU3ViamVjdH1cbiAqIEBzZWUge0BsaW5rIEJlaGF2aW9yU3ViamVjdH1cbiAqXG4gKiBAY2xhc3MgT2JqZWN0VW5zdWJzY3JpYmVkRXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIE9iamVjdFVuc3Vic2NyaWJlZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBlcnI6IGFueSA9IHN1cGVyKCdvYmplY3QgdW5zdWJzY3JpYmVkJyk7XG4gICAgKDxhbnk+IHRoaXMpLm5hbWUgPSBlcnIubmFtZSA9ICdPYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG4gICAgKDxhbnk+IHRoaXMpLnN0YWNrID0gZXJyLnN0YWNrO1xuICAgICg8YW55PiB0aGlzKS5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
