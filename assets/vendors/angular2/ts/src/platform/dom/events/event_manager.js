System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/core/di', 'angular2/src/core/zone/ng_zone', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var lang_1, exceptions_1, di_1, ng_zone_1, collection_1;
    var EVENT_MANAGER_PLUGINS, EventManager, EventManagerPlugin;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (ng_zone_1_1) {
                ng_zone_1 = ng_zone_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            exports_1("EVENT_MANAGER_PLUGINS", EVENT_MANAGER_PLUGINS = lang_1.CONST_EXPR(new di_1.OpaqueToken("EventManagerPlugins")));
            EventManager = (function () {
                function EventManager(plugins, _zone) {
                    var _this = this;
                    this._zone = _zone;
                    plugins.forEach(function (p) { return p.manager = _this; });
                    this._plugins = collection_1.ListWrapper.reversed(plugins);
                }
                EventManager.prototype.addEventListener = function (element, eventName, handler) {
                    var plugin = this._findPluginFor(eventName);
                    return plugin.addEventListener(element, eventName, handler);
                };
                EventManager.prototype.addGlobalEventListener = function (target, eventName, handler) {
                    var plugin = this._findPluginFor(eventName);
                    return plugin.addGlobalEventListener(target, eventName, handler);
                };
                EventManager.prototype.getZone = function () { return this._zone; };
                /** @internal */
                EventManager.prototype._findPluginFor = function (eventName) {
                    var plugins = this._plugins;
                    for (var i = 0; i < plugins.length; i++) {
                        var plugin = plugins[i];
                        if (plugin.supports(eventName)) {
                            return plugin;
                        }
                    }
                    throw new exceptions_1.BaseException("No event manager plugin found for event " + eventName);
                };
                EventManager = __decorate([
                    di_1.Injectable(),
                    __param(0, di_1.Inject(EVENT_MANAGER_PLUGINS)), 
                    __metadata('design:paramtypes', [Array, ng_zone_1.NgZone])
                ], EventManager);
                return EventManager;
            }());
            exports_1("EventManager", EventManager);
            EventManagerPlugin = (function () {
                function EventManagerPlugin() {
                }
                // That is equivalent to having supporting $event.target
                EventManagerPlugin.prototype.supports = function (eventName) { return false; };
                EventManagerPlugin.prototype.addEventListener = function (element, eventName, handler) {
                    throw "not implemented";
                };
                EventManagerPlugin.prototype.addGlobalEventListener = function (element, eventName, handler) {
                    throw "not implemented";
                };
                return EventManagerPlugin;
            }());
            exports_1("EventManagerPlugin", EventManagerPlugin);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2V2ZW50X21hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztRQU1hLHFCQUFxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUFyQixtQ0FBQSxxQkFBcUIsR0FDOUIsaUJBQVUsQ0FBQyxJQUFJLGdCQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFHdkQ7Z0JBR0Usc0JBQTJDLE9BQTZCLEVBQVUsS0FBYTtvQkFIakcsaUJBK0JDO29CQTVCbUYsVUFBSyxHQUFMLEtBQUssQ0FBUTtvQkFDN0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSSxFQUFoQixDQUFnQixDQUFDLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsd0JBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2hELENBQUM7Z0JBRUQsdUNBQWdCLEdBQWhCLFVBQWlCLE9BQW9CLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtvQkFDekUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM5RCxDQUFDO2dCQUVELDZDQUFzQixHQUF0QixVQUF1QixNQUFjLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtvQkFDekUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNuRSxDQUFDO2dCQUVELDhCQUFPLEdBQVAsY0FBb0IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUV4QyxnQkFBZ0I7Z0JBQ2hCLHFDQUFjLEdBQWQsVUFBZSxTQUFpQjtvQkFDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDNUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ3hDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUM7d0JBQ2hCLENBQUM7b0JBQ0gsQ0FBQztvQkFDRCxNQUFNLElBQUksMEJBQWEsQ0FBQyw2Q0FBMkMsU0FBVyxDQUFDLENBQUM7Z0JBQ2xGLENBQUM7Z0JBL0JIO29CQUFDLGVBQVUsRUFBRTsrQkFJRSxXQUFNLENBQUMscUJBQXFCLENBQUM7O2dDQUovQjtnQkFnQ2IsbUJBQUM7WUFBRCxDQS9CQSxBQStCQyxJQUFBO1lBL0JELHVDQStCQyxDQUFBO1lBRUQ7Z0JBQUE7Z0JBYUEsQ0FBQztnQkFWQyx3REFBd0Q7Z0JBQ3hELHFDQUFRLEdBQVIsVUFBUyxTQUFpQixJQUFhLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUV0RCw2Q0FBZ0IsR0FBaEIsVUFBaUIsT0FBb0IsRUFBRSxTQUFpQixFQUFFLE9BQWlCO29CQUN6RSxNQUFNLGlCQUFpQixDQUFDO2dCQUMxQixDQUFDO2dCQUVELG1EQUFzQixHQUF0QixVQUF1QixPQUFlLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtvQkFDMUUsTUFBTSxpQkFBaUIsQ0FBQztnQkFDMUIsQ0FBQztnQkFDSCx5QkFBQztZQUFELENBYkEsQUFhQyxJQUFBO1lBYkQsbURBYUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9ldmVudF9tYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3QsIE9wYXF1ZVRva2VufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge05nWm9uZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvem9uZS9uZ196b25lJztcbmltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmV4cG9ydCBjb25zdCBFVkVOVF9NQU5BR0VSX1BMVUdJTlM6IE9wYXF1ZVRva2VuID1cbiAgICBDT05TVF9FWFBSKG5ldyBPcGFxdWVUb2tlbihcIkV2ZW50TWFuYWdlclBsdWdpbnNcIikpO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXZlbnRNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfcGx1Z2luczogRXZlbnRNYW5hZ2VyUGx1Z2luW107XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChFVkVOVF9NQU5BR0VSX1BMVUdJTlMpIHBsdWdpbnM6IEV2ZW50TWFuYWdlclBsdWdpbltdLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcbiAgICBwbHVnaW5zLmZvckVhY2gocCA9PiBwLm1hbmFnZXIgPSB0aGlzKTtcbiAgICB0aGlzLl9wbHVnaW5zID0gTGlzdFdyYXBwZXIucmV2ZXJzZWQocGx1Z2lucyk7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgdmFyIHBsdWdpbiA9IHRoaXMuX2ZpbmRQbHVnaW5Gb3IoZXZlbnROYW1lKTtcbiAgICByZXR1cm4gcGx1Z2luLmFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIGFkZEdsb2JhbEV2ZW50TGlzdGVuZXIodGFyZ2V0OiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICB2YXIgcGx1Z2luID0gdGhpcy5fZmluZFBsdWdpbkZvcihldmVudE5hbWUpO1xuICAgIHJldHVybiBwbHVnaW4uYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICBnZXRab25lKCk6IE5nWm9uZSB7IHJldHVybiB0aGlzLl96b25lOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmluZFBsdWdpbkZvcihldmVudE5hbWU6IHN0cmluZyk6IEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gICAgdmFyIHBsdWdpbnMgPSB0aGlzLl9wbHVnaW5zO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGx1Z2lucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBsdWdpbiA9IHBsdWdpbnNbaV07XG4gICAgICBpZiAocGx1Z2luLnN1cHBvcnRzKGV2ZW50TmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIHBsdWdpbjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYE5vIGV2ZW50IG1hbmFnZXIgcGx1Z2luIGZvdW5kIGZvciBldmVudCAke2V2ZW50TmFtZX1gKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRXZlbnRNYW5hZ2VyUGx1Z2luIHtcbiAgbWFuYWdlcjogRXZlbnRNYW5hZ2VyO1xuXG4gIC8vIFRoYXQgaXMgZXF1aXZhbGVudCB0byBoYXZpbmcgc3VwcG9ydGluZyAkZXZlbnQudGFyZ2V0XG4gIHN1cHBvcnRzKGV2ZW50TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICB0aHJvdyBcIm5vdCBpbXBsZW1lbnRlZFwiO1xuICB9XG5cbiAgYWRkR2xvYmFsRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICB0aHJvdyBcIm5vdCBpbXBsZW1lbnRlZFwiO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
