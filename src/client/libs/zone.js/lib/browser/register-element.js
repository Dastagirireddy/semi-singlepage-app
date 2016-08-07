System.register(['./define-property', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var define_property_1, utils_1;
    function registerElementPatch(_global) {
        if (!utils_1.isBrowser || !('registerElement' in _global.document)) {
            return;
        }
        var _registerElement = document.registerElement;
        var callbacks = [
            'createdCallback',
            'attachedCallback',
            'detachedCallback',
            'attributeChangedCallback'
        ];
        document.registerElement = function (name, opts) {
            if (opts && opts.prototype) {
                callbacks.forEach(function (callback) {
                    var source = 'Document.registerElement::' + callback;
                    if (opts.prototype.hasOwnProperty(callback)) {
                        var descriptor = Object.getOwnPropertyDescriptor(opts.prototype, callback);
                        if (descriptor && descriptor.value) {
                            descriptor.value = Zone.current.wrap(descriptor.value, source);
                            define_property_1._redefineProperty(opts.prototype, callback, descriptor);
                        }
                        else {
                            opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
                        }
                    }
                    else if (opts.prototype[callback]) {
                        opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
                    }
                });
            }
            return _registerElement.apply(document, [name, opts]);
        };
    }
    exports_1("registerElementPatch", registerElementPatch);
    return {
        setters:[
            function (define_property_1_1) {
                define_property_1 = define_property_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvem9uZS5qcy9saWIvYnJvd3Nlci9yZWdpc3Rlci1lbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7SUFHQSw4QkFBcUMsT0FBWTtRQUMvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFTLElBQUksQ0FBQyxDQUFDLGlCQUFpQixJQUFVLE9BQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEUsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELElBQUksZ0JBQWdCLEdBQVMsUUFBUyxDQUFDLGVBQWUsQ0FBQztRQUN2RCxJQUFJLFNBQVMsR0FBRztZQUNkLGlCQUFpQjtZQUNqQixrQkFBa0I7WUFDbEIsa0JBQWtCO1lBQ2xCLDBCQUEwQjtTQUMzQixDQUFDO1FBRUksUUFBUyxDQUFDLGVBQWUsR0FBRyxVQUFVLElBQUksRUFBRSxJQUFJO1lBQ3BELEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLFFBQVE7b0JBQ2xDLElBQUksTUFBTSxHQUFHLDRCQUE0QixHQUFHLFFBQVEsQ0FBQztvQkFDckQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1QyxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQzt3QkFDM0UsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzRCQUNuQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7NEJBQy9ELG1DQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO3dCQUMxRCxDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDakYsQ0FBQztvQkFDSCxDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNqRixDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQWpDRCx1REFpQ0MsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL3pvbmUuanMvbGliL2Jyb3dzZXIvcmVnaXN0ZXItZWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7X3JlZGVmaW5lUHJvcGVydHl9IGZyb20gJy4vZGVmaW5lLXByb3BlcnR5JztcbmltcG9ydCB7aXNCcm93c2VyfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRWxlbWVudFBhdGNoKF9nbG9iYWw6IGFueSkge1xuICBpZiAoIWlzQnJvd3NlciB8fCAhKCdyZWdpc3RlckVsZW1lbnQnIGluICg8YW55Pl9nbG9iYWwpLmRvY3VtZW50KSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBfcmVnaXN0ZXJFbGVtZW50ID0gKDxhbnk+ZG9jdW1lbnQpLnJlZ2lzdGVyRWxlbWVudDtcbiAgdmFyIGNhbGxiYWNrcyA9IFtcbiAgICAnY3JlYXRlZENhbGxiYWNrJyxcbiAgICAnYXR0YWNoZWRDYWxsYmFjaycsXG4gICAgJ2RldGFjaGVkQ2FsbGJhY2snLFxuICAgICdhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2snXG4gIF07XG5cbiAgKDxhbnk+ZG9jdW1lbnQpLnJlZ2lzdGVyRWxlbWVudCA9IGZ1bmN0aW9uIChuYW1lLCBvcHRzKSB7XG4gICAgaWYgKG9wdHMgJiYgb3B0cy5wcm90b3R5cGUpIHtcbiAgICAgIGNhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgc291cmNlID0gJ0RvY3VtZW50LnJlZ2lzdGVyRWxlbWVudDo6JyArIGNhbGxiYWNrO1xuICAgICAgICBpZiAob3B0cy5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoY2FsbGJhY2spKSB7XG4gICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9wdHMucHJvdG90eXBlLCBjYWxsYmFjayk7XG4gICAgICAgICAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci52YWx1ZSkge1xuICAgICAgICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IFpvbmUuY3VycmVudC53cmFwKGRlc2NyaXB0b3IudmFsdWUsIHNvdXJjZSk7XG4gICAgICAgICAgICBfcmVkZWZpbmVQcm9wZXJ0eShvcHRzLnByb3RvdHlwZSwgY2FsbGJhY2ssIGRlc2NyaXB0b3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRzLnByb3RvdHlwZVtjYWxsYmFja10gPSBab25lLmN1cnJlbnQud3JhcChvcHRzLnByb3RvdHlwZVtjYWxsYmFja10sIHNvdXJjZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9wdHMucHJvdG90eXBlW2NhbGxiYWNrXSkge1xuICAgICAgICAgIG9wdHMucHJvdG90eXBlW2NhbGxiYWNrXSA9IFpvbmUuY3VycmVudC53cmFwKG9wdHMucHJvdG90eXBlW2NhbGxiYWNrXSwgc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9yZWdpc3RlckVsZW1lbnQuYXBwbHkoZG9jdW1lbnQsIFtuYW1lLCBvcHRzXSk7XG4gIH07XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
