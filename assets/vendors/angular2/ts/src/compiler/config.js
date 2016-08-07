System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', './identifiers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, identifiers_1;
    var CompilerConfig, RenderTypes, DefaultRenderTypes;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (identifiers_1_1) {
                identifiers_1 = identifiers_1_1;
            }],
        execute: function() {
            CompilerConfig = (function () {
                function CompilerConfig(genDebugInfo, logBindingUpdate, useJit, renderTypes) {
                    if (renderTypes === void 0) { renderTypes = null; }
                    this.genDebugInfo = genDebugInfo;
                    this.logBindingUpdate = logBindingUpdate;
                    this.useJit = useJit;
                    if (lang_1.isBlank(renderTypes)) {
                        renderTypes = new DefaultRenderTypes();
                    }
                    this.renderTypes = renderTypes;
                }
                return CompilerConfig;
            }());
            exports_1("CompilerConfig", CompilerConfig);
            /**
             * Types used for the renderer.
             * Can be replaced to specialize the generated output to a specific renderer
             * to help tree shaking.
             */
            RenderTypes = (function () {
                function RenderTypes() {
                }
                Object.defineProperty(RenderTypes.prototype, "renderer", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RenderTypes.prototype, "renderText", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RenderTypes.prototype, "renderElement", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RenderTypes.prototype, "renderComment", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RenderTypes.prototype, "renderNode", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RenderTypes.prototype, "renderEvent", {
                    get: function () { return exceptions_1.unimplemented(); },
                    enumerable: true,
                    configurable: true
                });
                return RenderTypes;
            }());
            exports_1("RenderTypes", RenderTypes);
            DefaultRenderTypes = (function () {
                function DefaultRenderTypes() {
                    this.renderer = identifiers_1.Identifiers.Renderer;
                    this.renderText = null;
                    this.renderElement = null;
                    this.renderComment = null;
                    this.renderNode = null;
                    this.renderEvent = null;
                }
                return DefaultRenderTypes;
            }());
            exports_1("DefaultRenderTypes", DefaultRenderTypes);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFLQTtnQkFFRSx3QkFBbUIsWUFBcUIsRUFBUyxnQkFBeUIsRUFDdkQsTUFBZSxFQUFFLFdBQStCO29CQUEvQiwyQkFBK0IsR0FBL0Isa0JBQStCO29CQURoRCxpQkFBWSxHQUFaLFlBQVksQ0FBUztvQkFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVM7b0JBQ3ZELFdBQU0sR0FBTixNQUFNLENBQVM7b0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3pCLFdBQVcsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7b0JBQ3pDLENBQUM7b0JBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7Z0JBQ2pDLENBQUM7Z0JBQ0gscUJBQUM7WUFBRCxDQVRBLEFBU0MsSUFBQTtZQVRELDJDQVNDLENBQUE7WUFFRDs7OztlQUlHO1lBQ0g7Z0JBQUE7Z0JBT0EsQ0FBQztnQkFOQyxzQkFBSSxpQ0FBUTt5QkFBWixjQUE0QyxNQUFNLENBQUMsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUNyRSxzQkFBSSxtQ0FBVTt5QkFBZCxjQUE4QyxNQUFNLENBQUMsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUN2RSxzQkFBSSxzQ0FBYTt5QkFBakIsY0FBaUQsTUFBTSxDQUFDLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFDMUUsc0JBQUksc0NBQWE7eUJBQWpCLGNBQWlELE1BQU0sQ0FBQywwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQzFFLHNCQUFJLG1DQUFVO3lCQUFkLGNBQThDLE1BQU0sQ0FBQywwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQ3ZFLHNCQUFJLG9DQUFXO3lCQUFmLGNBQStDLE1BQU0sQ0FBQywwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQzFFLGtCQUFDO1lBQUQsQ0FQQSxBQU9DLElBQUE7WUFQRCxxQ0FPQyxDQUFBO1lBRUQ7Z0JBQUE7b0JBQ0UsYUFBUSxHQUFHLHlCQUFXLENBQUMsUUFBUSxDQUFDO29CQUNoQyxlQUFVLEdBQUcsSUFBSSxDQUFDO29CQUNsQixrQkFBYSxHQUFHLElBQUksQ0FBQztvQkFDckIsa0JBQWEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLGVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQ2xCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixDQUFDO2dCQUFELHlCQUFDO1lBQUQsQ0FQQSxBQU9DLElBQUE7WUFQRCxtREFPQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge3VuaW1wbGVtZW50ZWR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge0lkZW50aWZpZXJzfSBmcm9tICcuL2lkZW50aWZpZXJzJztcbmltcG9ydCB7Q29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YX0gZnJvbSAnLi9jb21waWxlX21ldGFkYXRhJztcblxuZXhwb3J0IGNsYXNzIENvbXBpbGVyQ29uZmlnIHtcbiAgcHVibGljIHJlbmRlclR5cGVzOiBSZW5kZXJUeXBlcztcbiAgY29uc3RydWN0b3IocHVibGljIGdlbkRlYnVnSW5mbzogYm9vbGVhbiwgcHVibGljIGxvZ0JpbmRpbmdVcGRhdGU6IGJvb2xlYW4sXG4gICAgICAgICAgICAgIHB1YmxpYyB1c2VKaXQ6IGJvb2xlYW4sIHJlbmRlclR5cGVzOiBSZW5kZXJUeXBlcyA9IG51bGwpIHtcbiAgICBpZiAoaXNCbGFuayhyZW5kZXJUeXBlcykpIHtcbiAgICAgIHJlbmRlclR5cGVzID0gbmV3IERlZmF1bHRSZW5kZXJUeXBlcygpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlclR5cGVzID0gcmVuZGVyVHlwZXM7XG4gIH1cbn1cblxuLyoqXG4gKiBUeXBlcyB1c2VkIGZvciB0aGUgcmVuZGVyZXIuXG4gKiBDYW4gYmUgcmVwbGFjZWQgdG8gc3BlY2lhbGl6ZSB0aGUgZ2VuZXJhdGVkIG91dHB1dCB0byBhIHNwZWNpZmljIHJlbmRlcmVyXG4gKiB0byBoZWxwIHRyZWUgc2hha2luZy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlbmRlclR5cGVzIHtcbiAgZ2V0IHJlbmRlcmVyKCk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9XG4gIGdldCByZW5kZXJUZXh0KCk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9XG4gIGdldCByZW5kZXJFbGVtZW50KCk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9XG4gIGdldCByZW5kZXJDb21tZW50KCk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9XG4gIGdldCByZW5kZXJOb2RlKCk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9XG4gIGdldCByZW5kZXJFdmVudCgpOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIHsgcmV0dXJuIHVuaW1wbGVtZW50ZWQoKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdFJlbmRlclR5cGVzIGltcGxlbWVudHMgUmVuZGVyVHlwZXMge1xuICByZW5kZXJlciA9IElkZW50aWZpZXJzLlJlbmRlcmVyO1xuICByZW5kZXJUZXh0ID0gbnVsbDtcbiAgcmVuZGVyRWxlbWVudCA9IG51bGw7XG4gIHJlbmRlckNvbW1lbnQgPSBudWxsO1xuICByZW5kZXJOb2RlID0gbnVsbDtcbiAgcmVuZGVyRXZlbnQgPSBudWxsO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
