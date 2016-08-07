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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFVVyxTQUFTOzs7Ozs7Ozs7Ozs7OztZQUpwQjs7O2VBR0c7WUFDUSx1QkFBQSxTQUFTLEdBQUcsSUFBSSxxQkFBUyxDQUFDLElBQUksZ0RBQXNCLEVBQUUsQ0FBQyxDQUFBLENBQUMiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGUsIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1JlZmxlY3Rvcn0gZnJvbSAnLi9yZWZsZWN0b3InO1xuZXhwb3J0IHtSZWZsZWN0b3IsIFJlZmxlY3Rpb25JbmZvfSBmcm9tICcuL3JlZmxlY3Rvcic7XG5pbXBvcnQge1JlZmxlY3Rpb25DYXBhYmlsaXRpZXN9IGZyb20gJy4vcmVmbGVjdGlvbl9jYXBhYmlsaXRpZXMnO1xuXG4vKipcbiAqIFRoZSB7QGxpbmsgUmVmbGVjdG9yfSB1c2VkIGludGVybmFsbHkgaW4gQW5ndWxhciB0byBhY2Nlc3MgbWV0YWRhdGFcbiAqIGFib3V0IHN5bWJvbHMuXG4gKi9cbmV4cG9ydCB2YXIgcmVmbGVjdG9yID0gbmV3IFJlZmxlY3RvcihuZXcgUmVmbGVjdGlvbkNhcGFiaWxpdGllcygpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
