/// <reference path="./subject.ts" />
var Rx;
(function (Rx) {
})(Rx || (Rx = {}));
(function () {
    var s = new Rx.BehaviorSubject(false);
    var b = s.getValue();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9zdWJqZWN0cy9iZWhhdmlvcnN1YmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscUNBQXFDO0FBRXJDLElBQU8sRUFBRSxDQXlCUjtBQXpCRCxXQUFPLEVBQUUsRUFBQyxDQUFDO0FBeUJYLENBQUMsRUF6Qk0sQ0F3QitDLENBeEI3QyxLQUFGLEVBQUUsUUF5QlI7QUFFRCxDQUFDO0lBQ0csSUFBSSxDQUFDLEdBQWlDLElBQUksRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRSxJQUFJLENBQUMsR0FBYSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbkMsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9yeC90cy9jb3JlL3N1YmplY3RzL2JlaGF2aW9yc3ViamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3N1YmplY3QudHNcIiAvPlxuXG5tb2R1bGUgUngge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgQmVoYXZpb3JTdWJqZWN0PFQ+IGV4dGVuZHMgU3ViamVjdDxUPiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHZhbHVlIG9yIHRocm93cyBhbiBleGNlcHRpb24uXG4gICAgICAgICAqIFZhbHVlIGlzIGZyb3plbiBhZnRlciBvbkNvbXBsZXRlZCBpcyBjYWxsZWQuXG4gICAgICAgICAqIEFmdGVyIG9uRXJyb3IgaXMgY2FsbGVkIGFsd2F5cyB0aHJvd3MgdGhlIHNwZWNpZmllZCBleGNlcHRpb24uXG4gICAgICAgICAqIEFuIGV4Y2VwdGlvbiBpcyBhbHdheXMgdGhyb3duIGFmdGVyIGRpc3Bvc2UgaXMgY2FsbGVkLlxuICAgICAgICAgKiBAcmV0dXJucyB7TWl4ZWR9IFRoZSBpbml0aWFsIHZhbHVlIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3IgdW50aWwgb25OZXh0IGlzIGNhbGxlZDsgYWZ0ZXIgd2hpY2gsIHRoZSBsYXN0IHZhbHVlIHBhc3NlZCB0byBvbk5leHQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXRWYWx1ZSgpOiBUO1xuICAgIH1cblxuICAgIGludGVyZmFjZSBCZWhhdmlvclN1YmplY3RTdGF0aWMge1xuICAgICAgICAvKipcbiAgICAgICAgICogIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBCZWhhdmlvclN1YmplY3QgY2xhc3Mgd2hpY2ggY3JlYXRlcyBhIHN1YmplY3QgdGhhdCBjYWNoZXMgaXRzIGxhc3QgdmFsdWUgYW5kIHN0YXJ0cyB3aXRoIHRoZSBzcGVjaWZpZWQgdmFsdWUuXG4gICAgICAgICAqICBAcGFyYW0ge01peGVkfSB2YWx1ZSBJbml0aWFsIHZhbHVlIHNlbnQgdG8gb2JzZXJ2ZXJzIHdoZW4gbm8gb3RoZXIgdmFsdWUgaGFzIGJlZW4gcmVjZWl2ZWQgYnkgdGhlIHN1YmplY3QgeWV0LlxuICAgICAgICAgKi9cbiAgICAgICAgbmV3IDxUPihpbml0aWFsVmFsdWU6IFQpOiBCZWhhdmlvclN1YmplY3Q8VD47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIFJlcHJlc2VudHMgYSB2YWx1ZSB0aGF0IGNoYW5nZXMgb3ZlciB0aW1lLlxuICAgICAqICBPYnNlcnZlcnMgY2FuIHN1YnNjcmliZSB0byB0aGUgc3ViamVjdCB0byByZWNlaXZlIHRoZSBsYXN0IChvciBpbml0aWFsKSB2YWx1ZSBhbmQgYWxsIHN1YnNlcXVlbnQgbm90aWZpY2F0aW9ucy5cbiAgICAgKi9cbiAgICBleHBvcnQgdmFyIEJlaGF2aW9yU3ViamVjdDogQmVoYXZpb3JTdWJqZWN0U3RhdGljO1xufVxuXG4oZnVuY3Rpb24oKSB7XG4gICAgdmFyIHMgOiBSeC5CZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgUnguQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcbiAgICB2YXIgYiA6IGJvb2xlYW4gPSBzLmdldFZhbHVlKCk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==