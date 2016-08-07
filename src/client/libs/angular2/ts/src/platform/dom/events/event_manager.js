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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMvZXZlbnRfbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1FBTWEscUJBQXFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBQXJCLG1DQUFBLHFCQUFxQixHQUM5QixpQkFBVSxDQUFDLElBQUksZ0JBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUd2RDtnQkFHRSxzQkFBMkMsT0FBNkIsRUFBVSxLQUFhO29CQUhqRyxpQkErQkM7b0JBNUJtRixVQUFLLEdBQUwsS0FBSyxDQUFRO29CQUM3RixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFJLEVBQWhCLENBQWdCLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyx3QkFBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEQsQ0FBQztnQkFFRCx1Q0FBZ0IsR0FBaEIsVUFBaUIsT0FBb0IsRUFBRSxTQUFpQixFQUFFLE9BQWlCO29CQUN6RSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM1QyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzlELENBQUM7Z0JBRUQsNkNBQXNCLEdBQXRCLFVBQXVCLE1BQWMsRUFBRSxTQUFpQixFQUFFLE9BQWlCO29CQUN6RSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM1QyxNQUFNLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ25FLENBQUM7Z0JBRUQsOEJBQU8sR0FBUCxjQUFvQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRXhDLGdCQUFnQjtnQkFDaEIscUNBQWMsR0FBZCxVQUFlLFNBQWlCO29CQUM5QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUM1QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDeEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQzt3QkFDaEIsQ0FBQztvQkFDSCxDQUFDO29CQUNELE1BQU0sSUFBSSwwQkFBYSxDQUFDLDZDQUEyQyxTQUFXLENBQUMsQ0FBQztnQkFDbEYsQ0FBQztnQkEvQkg7b0JBQUMsZUFBVSxFQUFFOytCQUlFLFdBQU0sQ0FBQyxxQkFBcUIsQ0FBQzs7Z0NBSi9CO2dCQWdDYixtQkFBQztZQUFELENBL0JBLEFBK0JDLElBQUE7WUEvQkQsdUNBK0JDLENBQUE7WUFFRDtnQkFBQTtnQkFhQSxDQUFDO2dCQVZDLHdEQUF3RDtnQkFDeEQscUNBQVEsR0FBUixVQUFTLFNBQWlCLElBQWEsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRXRELDZDQUFnQixHQUFoQixVQUFpQixPQUFvQixFQUFFLFNBQWlCLEVBQUUsT0FBaUI7b0JBQ3pFLE1BQU0saUJBQWlCLENBQUM7Z0JBQzFCLENBQUM7Z0JBRUQsbURBQXNCLEdBQXRCLFVBQXVCLE9BQWUsRUFBRSxTQUFpQixFQUFFLE9BQWlCO29CQUMxRSxNQUFNLGlCQUFpQixDQUFDO2dCQUMxQixDQUFDO2dCQUNILHlCQUFDO1lBQUQsQ0FiQSxBQWFDLElBQUE7WUFiRCxtREFhQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMvZXZlbnRfbWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0LCBPcGFxdWVUb2tlbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtOZ1pvbmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3pvbmUvbmdfem9uZSc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG5leHBvcnQgY29uc3QgRVZFTlRfTUFOQUdFUl9QTFVHSU5TOiBPcGFxdWVUb2tlbiA9XG4gICAgQ09OU1RfRVhQUihuZXcgT3BhcXVlVG9rZW4oXCJFdmVudE1hbmFnZXJQbHVnaW5zXCIpKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV2ZW50TWFuYWdlciB7XG4gIHByaXZhdGUgX3BsdWdpbnM6IEV2ZW50TWFuYWdlclBsdWdpbltdO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRVZFTlRfTUFOQUdFUl9QTFVHSU5TKSBwbHVnaW5zOiBFdmVudE1hbmFnZXJQbHVnaW5bXSwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XG4gICAgcGx1Z2lucy5mb3JFYWNoKHAgPT4gcC5tYW5hZ2VyID0gdGhpcyk7XG4gICAgdGhpcy5fcGx1Z2lucyA9IExpc3RXcmFwcGVyLnJldmVyc2VkKHBsdWdpbnMpO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIHZhciBwbHVnaW4gPSB0aGlzLl9maW5kUGx1Z2luRm9yKGV2ZW50TmFtZSk7XG4gICAgcmV0dXJuIHBsdWdpbi5hZGRFdmVudExpc3RlbmVyKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICBhZGRHbG9iYWxFdmVudExpc3RlbmVyKHRhcmdldDogc3RyaW5nLCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgdmFyIHBsdWdpbiA9IHRoaXMuX2ZpbmRQbHVnaW5Gb3IoZXZlbnROYW1lKTtcbiAgICByZXR1cm4gcGx1Z2luLmFkZEdsb2JhbEV2ZW50TGlzdGVuZXIodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgZ2V0Wm9uZSgpOiBOZ1pvbmUgeyByZXR1cm4gdGhpcy5fem9uZTsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2ZpbmRQbHVnaW5Gb3IoZXZlbnROYW1lOiBzdHJpbmcpOiBFdmVudE1hbmFnZXJQbHVnaW4ge1xuICAgIHZhciBwbHVnaW5zID0gdGhpcy5fcGx1Z2lucztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsdWdpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwbHVnaW4gPSBwbHVnaW5zW2ldO1xuICAgICAgaWYgKHBsdWdpbi5zdXBwb3J0cyhldmVudE5hbWUpKSB7XG4gICAgICAgIHJldHVybiBwbHVnaW47XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBObyBldmVudCBtYW5hZ2VyIHBsdWdpbiBmb3VuZCBmb3IgZXZlbnQgJHtldmVudE5hbWV9YCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gIG1hbmFnZXI6IEV2ZW50TWFuYWdlcjtcblxuICAvLyBUaGF0IGlzIGVxdWl2YWxlbnQgdG8gaGF2aW5nIHN1cHBvcnRpbmcgJGV2ZW50LnRhcmdldFxuICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cblxuICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgdGhyb3cgXCJub3QgaW1wbGVtZW50ZWRcIjtcbiAgfVxuXG4gIGFkZEdsb2JhbEV2ZW50TGlzdGVuZXIoZWxlbWVudDogc3RyaW5nLCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgdGhyb3cgXCJub3QgaW1wbGVtZW50ZWRcIjtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
