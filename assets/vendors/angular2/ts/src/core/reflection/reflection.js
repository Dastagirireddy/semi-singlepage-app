System.register(['./reflector', './reflection_capabilities'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var reflector_1, reflection_capabilities_1;
    var reflector;
    return {
        setters:[
            function (reflector_1_1) {
                reflector_1 = reflector_1_1;
                exports_1({
                    "Reflector": reflector_1_1["Reflector"],
                    "ReflectionInfo": reflector_1_1["ReflectionInfo"]
                });
            },
            function (reflection_capabilities_1_1) {
                reflection_capabilities_1 = reflection_capabilities_1_1;
            }],
        execute: function() {
            /**
             * The {@link Reflector} used internally in Angular to access metadata
             * about symbols.
             */
            exports_1("reflector", reflector = new reflector_1.Reflector(new reflection_capabilities_1.ReflectionCapabilities()));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBVVcsU0FBUzs7Ozs7Ozs7Ozs7Ozs7WUFKcEI7OztlQUdHO1lBQ1EsdUJBQUEsU0FBUyxHQUFHLElBQUkscUJBQVMsQ0FBQyxJQUFJLGdEQUFzQixFQUFFLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHlwZSwgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7UmVmbGVjdG9yfSBmcm9tICcuL3JlZmxlY3Rvcic7XG5leHBvcnQge1JlZmxlY3RvciwgUmVmbGVjdGlvbkluZm99IGZyb20gJy4vcmVmbGVjdG9yJztcbmltcG9ydCB7UmVmbGVjdGlvbkNhcGFiaWxpdGllc30gZnJvbSAnLi9yZWZsZWN0aW9uX2NhcGFiaWxpdGllcyc7XG5cbi8qKlxuICogVGhlIHtAbGluayBSZWZsZWN0b3J9IHVzZWQgaW50ZXJuYWxseSBpbiBBbmd1bGFyIHRvIGFjY2VzcyBtZXRhZGF0YVxuICogYWJvdXQgc3ltYm9scy5cbiAqL1xuZXhwb3J0IHZhciByZWZsZWN0b3IgPSBuZXcgUmVmbGVjdG9yKG5ldyBSZWZsZWN0aW9uQ2FwYWJpbGl0aWVzKCkpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
