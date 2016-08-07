System.register(['./change_detection_jit_generator'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var change_detection_jit_generator_1;
    var JitProtoChangeDetector;
    return {
        setters:[
            function (change_detection_jit_generator_1_1) {
                change_detection_jit_generator_1 = change_detection_jit_generator_1_1;
            }],
        execute: function() {
            JitProtoChangeDetector = (function () {
                function JitProtoChangeDetector(definition) {
                    this.definition = definition;
                    this._factory = this._createFactory(definition);
                }
                JitProtoChangeDetector.isSupported = function () { return true; };
                JitProtoChangeDetector.prototype.instantiate = function () { return this._factory(); };
                /** @internal */
                JitProtoChangeDetector.prototype._createFactory = function (definition) {
                    return new change_detection_jit_generator_1.ChangeDetectorJITGenerator(definition, 'util', 'AbstractChangeDetector', 'ChangeDetectorStatus')
                        .generate();
                };
                return JitProtoChangeDetector;
            }());
            exports_1("JitProtoChangeDetector", JitProtoChangeDetector);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9qaXRfcHJvdG9fY2hhbmdlX2RldGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBTUE7Z0JBSUUsZ0NBQW9CLFVBQW9DO29CQUFwQyxlQUFVLEdBQVYsVUFBVSxDQUEwQjtvQkFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDO2dCQUVNLGtDQUFXLEdBQWxCLGNBQWdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUU5Qyw0Q0FBVyxHQUFYLGNBQWdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUV6RCxnQkFBZ0I7Z0JBQ2hCLCtDQUFjLEdBQWQsVUFBZSxVQUFvQztvQkFDakQsTUFBTSxDQUFDLElBQUksMkRBQTBCLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSx3QkFBd0IsRUFDNUMsc0JBQXNCLENBQUM7eUJBQ3hELFFBQVEsRUFBRSxDQUFDO2dCQUNsQixDQUFDO2dCQUNILDZCQUFDO1lBQUQsQ0FsQkEsQUFrQkMsSUFBQTtZQWxCRCwyREFrQkMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vaml0X3Byb3RvX2NoYW5nZV9kZXRlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHtQcm90b0NoYW5nZURldGVjdG9yLCBDaGFuZ2VEZXRlY3RvciwgQ2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9ufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvckpJVEdlbmVyYXRvcn0gZnJvbSAnLi9jaGFuZ2VfZGV0ZWN0aW9uX2ppdF9nZW5lcmF0b3InO1xuXG5leHBvcnQgY2xhc3MgSml0UHJvdG9DaGFuZ2VEZXRlY3RvciBpbXBsZW1lbnRzIFByb3RvQ2hhbmdlRGV0ZWN0b3Ige1xuICAvKiogQGludGVybmFsICovXG4gIF9mYWN0b3J5OiBGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlZmluaXRpb246IENoYW5nZURldGVjdG9yRGVmaW5pdGlvbikge1xuICAgIHRoaXMuX2ZhY3RvcnkgPSB0aGlzLl9jcmVhdGVGYWN0b3J5KGRlZmluaXRpb24pO1xuICB9XG5cbiAgc3RhdGljIGlzU3VwcG9ydGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxuXG4gIGluc3RhbnRpYXRlKCk6IENoYW5nZURldGVjdG9yIHsgcmV0dXJuIHRoaXMuX2ZhY3RvcnkoKTsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NyZWF0ZUZhY3RvcnkoZGVmaW5pdGlvbjogQ2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9uKSB7XG4gICAgcmV0dXJuIG5ldyBDaGFuZ2VEZXRlY3RvckpJVEdlbmVyYXRvcihkZWZpbml0aW9uLCAndXRpbCcsICdBYnN0cmFjdENoYW5nZURldGVjdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDaGFuZ2VEZXRlY3RvclN0YXR1cycpXG4gICAgICAgIC5nZW5lcmF0ZSgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
