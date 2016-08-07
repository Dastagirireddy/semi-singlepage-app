System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection', './reflector_reader'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, exceptions_1, collection_1, reflector_reader_1;
    var ReflectionInfo, Reflector;
    function _mergeMaps(target, config) {
        collection_1.StringMapWrapper.forEach(config, function (v, k) { return target.set(k, v); });
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (reflector_reader_1_1) {
                reflector_reader_1 = reflector_reader_1_1;
            }],
        execute: function() {
            /**
             * Reflective information about a symbol, including annotations, interfaces, and other metadata.
             */
            ReflectionInfo = (function () {
                function ReflectionInfo(annotations, parameters, factory, interfaces, propMetadata) {
                    this.annotations = annotations;
                    this.parameters = parameters;
                    this.factory = factory;
                    this.interfaces = interfaces;
                    this.propMetadata = propMetadata;
                }
                return ReflectionInfo;
            }());
            exports_1("ReflectionInfo", ReflectionInfo);
            /**
             * Provides access to reflection data about symbols. Used internally by Angular
             * to power dependency injection and compilation.
             */
            Reflector = (function (_super) {
                __extends(Reflector, _super);
                function Reflector(reflectionCapabilities) {
                    _super.call(this);
                    /** @internal */
                    this._injectableInfo = new collection_1.Map();
                    /** @internal */
                    this._getters = new collection_1.Map();
                    /** @internal */
                    this._setters = new collection_1.Map();
                    /** @internal */
                    this._methods = new collection_1.Map();
                    this._usedKeys = null;
                    this.reflectionCapabilities = reflectionCapabilities;
                }
                Reflector.prototype.isReflectionEnabled = function () { return this.reflectionCapabilities.isReflectionEnabled(); };
                /**
                 * Causes `this` reflector to track keys used to access
                 * {@link ReflectionInfo} objects.
                 */
                Reflector.prototype.trackUsage = function () { this._usedKeys = new collection_1.Set(); };
                /**
                 * Lists types for which reflection information was not requested since
                 * {@link #trackUsage} was called. This list could later be audited as
                 * potential dead code.
                 */
                Reflector.prototype.listUnusedKeys = function () {
                    var _this = this;
                    if (this._usedKeys == null) {
                        throw new exceptions_1.BaseException('Usage tracking is disabled');
                    }
                    var allTypes = collection_1.MapWrapper.keys(this._injectableInfo);
                    return allTypes.filter(function (key) { return !collection_1.SetWrapper.has(_this._usedKeys, key); });
                };
                Reflector.prototype.registerFunction = function (func, funcInfo) {
                    this._injectableInfo.set(func, funcInfo);
                };
                Reflector.prototype.registerType = function (type, typeInfo) {
                    this._injectableInfo.set(type, typeInfo);
                };
                Reflector.prototype.registerGetters = function (getters) { _mergeMaps(this._getters, getters); };
                Reflector.prototype.registerSetters = function (setters) { _mergeMaps(this._setters, setters); };
                Reflector.prototype.registerMethods = function (methods) { _mergeMaps(this._methods, methods); };
                Reflector.prototype.factory = function (type) {
                    if (this._containsReflectionInfo(type)) {
                        var res = this._getReflectionInfo(type).factory;
                        return lang_1.isPresent(res) ? res : null;
                    }
                    else {
                        return this.reflectionCapabilities.factory(type);
                    }
                };
                Reflector.prototype.parameters = function (typeOrFunc) {
                    if (this._injectableInfo.has(typeOrFunc)) {
                        var res = this._getReflectionInfo(typeOrFunc).parameters;
                        return lang_1.isPresent(res) ? res : [];
                    }
                    else {
                        return this.reflectionCapabilities.parameters(typeOrFunc);
                    }
                };
                Reflector.prototype.annotations = function (typeOrFunc) {
                    if (this._injectableInfo.has(typeOrFunc)) {
                        var res = this._getReflectionInfo(typeOrFunc).annotations;
                        return lang_1.isPresent(res) ? res : [];
                    }
                    else {
                        return this.reflectionCapabilities.annotations(typeOrFunc);
                    }
                };
                Reflector.prototype.propMetadata = function (typeOrFunc) {
                    if (this._injectableInfo.has(typeOrFunc)) {
                        var res = this._getReflectionInfo(typeOrFunc).propMetadata;
                        return lang_1.isPresent(res) ? res : {};
                    }
                    else {
                        return this.reflectionCapabilities.propMetadata(typeOrFunc);
                    }
                };
                Reflector.prototype.interfaces = function (type) {
                    if (this._injectableInfo.has(type)) {
                        var res = this._getReflectionInfo(type).interfaces;
                        return lang_1.isPresent(res) ? res : [];
                    }
                    else {
                        return this.reflectionCapabilities.interfaces(type);
                    }
                };
                Reflector.prototype.getter = function (name) {
                    if (this._getters.has(name)) {
                        return this._getters.get(name);
                    }
                    else {
                        return this.reflectionCapabilities.getter(name);
                    }
                };
                Reflector.prototype.setter = function (name) {
                    if (this._setters.has(name)) {
                        return this._setters.get(name);
                    }
                    else {
                        return this.reflectionCapabilities.setter(name);
                    }
                };
                Reflector.prototype.method = function (name) {
                    if (this._methods.has(name)) {
                        return this._methods.get(name);
                    }
                    else {
                        return this.reflectionCapabilities.method(name);
                    }
                };
                /** @internal */
                Reflector.prototype._getReflectionInfo = function (typeOrFunc) {
                    if (lang_1.isPresent(this._usedKeys)) {
                        this._usedKeys.add(typeOrFunc);
                    }
                    return this._injectableInfo.get(typeOrFunc);
                };
                /** @internal */
                Reflector.prototype._containsReflectionInfo = function (typeOrFunc) { return this._injectableInfo.has(typeOrFunc); };
                Reflector.prototype.importUri = function (type) { return this.reflectionCapabilities.importUri(type); };
                return Reflector;
            }(reflector_reader_1.ReflectorReader));
            exports_1("Reflector", Reflector);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQXFLQSxvQkFBb0IsTUFBNkIsRUFBRSxNQUFpQztRQUNsRiw2QkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQUMsQ0FBVyxFQUFFLENBQVMsSUFBSyxPQUFBLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUM7SUFDakYsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztZQXZKRDs7ZUFFRztZQUNIO2dCQUNFLHdCQUFtQixXQUFtQixFQUFTLFVBQW9CLEVBQVMsT0FBa0IsRUFDM0UsVUFBa0IsRUFBUyxZQUFxQztvQkFEaEUsZ0JBQVcsR0FBWCxXQUFXLENBQVE7b0JBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBVTtvQkFBUyxZQUFPLEdBQVAsT0FBTyxDQUFXO29CQUMzRSxlQUFVLEdBQVYsVUFBVSxDQUFRO29CQUFTLGlCQUFZLEdBQVosWUFBWSxDQUF5QjtnQkFBRyxDQUFDO2dCQUN6RixxQkFBQztZQUFELENBSEEsQUFHQyxJQUFBO1lBSEQsMkNBR0MsQ0FBQTtZQUVEOzs7ZUFHRztZQUNIO2dCQUErQiw2QkFBZTtnQkFhNUMsbUJBQVksc0JBQXNEO29CQUNoRSxpQkFBTyxDQUFDO29CQWJWLGdCQUFnQjtvQkFDaEIsb0JBQWUsR0FBRyxJQUFJLGdCQUFHLEVBQXVCLENBQUM7b0JBQ2pELGdCQUFnQjtvQkFDaEIsYUFBUSxHQUFHLElBQUksZ0JBQUcsRUFBb0IsQ0FBQztvQkFDdkMsZ0JBQWdCO29CQUNoQixhQUFRLEdBQUcsSUFBSSxnQkFBRyxFQUFvQixDQUFDO29CQUN2QyxnQkFBZ0I7b0JBQ2hCLGFBQVEsR0FBRyxJQUFJLGdCQUFHLEVBQW9CLENBQUM7b0JBT3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxD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Q0FBQyxDQUFDO29CQUNqQyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsRCxDQUFDO2dCQUNILENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQixzQ0FBa0IsR0FBbEIsVUFBbUIsVUFBZTtvQkFDaEMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDakMsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzlDLENBQUM7Z0JBRUQsZ0JBQWdCO2dCQUNoQiwyQ0FBdUIsR0FBdkIsVUFBd0IsVUFBZSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXpGLDZCQUFTLEdBQVQsVUFBVSxJQUFVLElBQVksTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RixnQkFBQztZQUFELENBdklBLEFBdUlDLENBdkk4QixrQ0FBZSxHQXVJN0M7WUF2SUQsaUNBdUlDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHlwZSwgaXNQcmVzZW50LCBzdHJpbmdpZnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1xuICBMaXN0V3JhcHBlcixcbiAgTWFwLFxuICBNYXBXcmFwcGVyLFxuICBTZXQsXG4gIFNldFdyYXBwZXIsXG4gIFN0cmluZ01hcFdyYXBwZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7U2V0dGVyRm4sIEdldHRlckZuLCBNZXRob2RGbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge1JlZmxlY3RvclJlYWRlcn0gZnJvbSAnLi9yZWZsZWN0b3JfcmVhZGVyJztcbmltcG9ydCB7UGxhdGZvcm1SZWZsZWN0aW9uQ2FwYWJpbGl0aWVzfSBmcm9tICcuL3BsYXRmb3JtX3JlZmxlY3Rpb25fY2FwYWJpbGl0aWVzJztcbmV4cG9ydCB7U2V0dGVyRm4sIEdldHRlckZuLCBNZXRob2RGbn0gZnJvbSAnLi90eXBlcyc7XG5leHBvcnQge1BsYXRmb3JtUmVmbGVjdGlvbkNhcGFiaWxpdGllc30gZnJvbSAnLi9wbGF0Zm9ybV9yZWZsZWN0aW9uX2NhcGFiaWxpdGllcyc7XG5cbi8qKlxuICogUmVmbGVjdGl2ZSBpbmZvcm1hdGlvbiBhYm91dCBhIHN5bWJvbCwgaW5jbHVkaW5nIGFubm90YXRpb25zLCBpbnRlcmZhY2VzLCBhbmQgb3RoZXIgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWZsZWN0aW9uSW5mbyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhbm5vdGF0aW9ucz86IGFueVtdLCBwdWJsaWMgcGFyYW1ldGVycz86IGFueVtdW10sIHB1YmxpYyBmYWN0b3J5PzogRnVuY3Rpb24sXG4gICAgICAgICAgICAgIHB1YmxpYyBpbnRlcmZhY2VzPzogYW55W10sIHB1YmxpYyBwcm9wTWV0YWRhdGE/OiB7W2tleTogc3RyaW5nXTogYW55W119KSB7fVxufVxuXG4vKipcbiAqIFByb3ZpZGVzIGFjY2VzcyB0byByZWZsZWN0aW9uIGRhdGEgYWJvdXQgc3ltYm9scy4gVXNlZCBpbnRlcm5hbGx5IGJ5IEFuZ3VsYXJcbiAqIHRvIHBvd2VyIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGFuZCBjb21waWxhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZmxlY3RvciBleHRlbmRzIFJlZmxlY3RvclJlYWRlciB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2luamVjdGFibGVJbmZvID0gbmV3IE1hcDxhbnksIFJlZmxlY3Rpb25JbmZvPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF9nZXR0ZXJzID0gbmV3IE1hcDxzdHJpbmcsIEdldHRlckZuPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF9zZXR0ZXJzID0gbmV3IE1hcDxzdHJpbmcsIFNldHRlckZuPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF9tZXRob2RzID0gbmV3IE1hcDxzdHJpbmcsIE1ldGhvZEZuPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF91c2VkS2V5czogU2V0PGFueT47XG4gIHJlZmxlY3Rpb25DYXBhYmlsaXRpZXM6IFBsYXRmb3JtUmVmbGVjdGlvbkNhcGFiaWxpdGllcztcblxuICBjb25zdHJ1Y3RvcihyZWZsZWN0aW9uQ2FwYWJpbGl0aWVzOiBQbGF0Zm9ybVJlZmxlY3Rpb25DYXBhYmlsaXRpZXMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3VzZWRLZXlzID0gbnVsbDtcbiAgICB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMgPSByZWZsZWN0aW9uQ2FwYWJpbGl0aWVzO1xuICB9XG5cbiAgaXNSZWZsZWN0aW9uRW5hYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5pc1JlZmxlY3Rpb25FbmFibGVkKCk7IH1cblxuICAvKipcbiAgICogQ2F1c2VzIGB0aGlzYCByZWZsZWN0b3IgdG8gdHJhY2sga2V5cyB1c2VkIHRvIGFjY2Vzc1xuICAgKiB7QGxpbmsgUmVmbGVjdGlvbkluZm99IG9iamVjdHMuXG4gICAqL1xuICB0cmFja1VzYWdlKCk6IHZvaWQgeyB0aGlzLl91c2VkS2V5cyA9IG5ldyBTZXQoKTsgfVxuXG4gIC8qKlxuICAgKiBMaXN0cyB0eXBlcyBmb3Igd2hpY2ggcmVmbGVjdGlvbiBpbmZvcm1hdGlvbiB3YXMgbm90IHJlcXVlc3RlZCBzaW5jZVxuICAgKiB7QGxpbmsgI3RyYWNrVXNhZ2V9IHdhcyBjYWxsZWQuIFRoaXMgbGlzdCBjb3VsZCBsYXRlciBiZSBhdWRpdGVkIGFzXG4gICAqIHBvdGVudGlhbCBkZWFkIGNvZGUuXG4gICAqL1xuICBsaXN0VW51c2VkS2V5cygpOiBhbnlbXSB7XG4gICAgaWYgKHRoaXMuX3VzZWRLZXlzID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdVc2FnZSB0cmFja2luZyBpcyBkaXNhYmxlZCcpO1xuICAgIH1cbiAgICB2YXIgYWxsVHlwZXMgPSBNYXBXcmFwcGVyLmtleXModGhpcy5faW5qZWN0YWJsZUluZm8pO1xuICAgIHJldHVybiBhbGxUeXBlcy5maWx0ZXIoa2V5ID0+ICFTZXRXcmFwcGVyLmhhcyh0aGlzLl91c2VkS2V5cywga2V5KSk7XG4gIH1cblxuICByZWdpc3RlckZ1bmN0aW9uKGZ1bmM6IEZ1bmN0aW9uLCBmdW5jSW5mbzogUmVmbGVjdGlvbkluZm8pOiB2b2lkIHtcbiAgICB0aGlzLl9pbmplY3RhYmxlSW5mby5zZXQoZnVuYywgZnVuY0luZm8pO1xuICB9XG5cbiAgcmVnaXN0ZXJUeXBlKHR5cGU6IFR5cGUsIHR5cGVJbmZvOiBSZWZsZWN0aW9uSW5mbyk6IHZvaWQge1xuICAgIHRoaXMuX2luamVjdGFibGVJbmZvLnNldCh0eXBlLCB0eXBlSW5mbyk7XG4gIH1cblxuICByZWdpc3RlckdldHRlcnMoZ2V0dGVyczoge1trZXk6IHN0cmluZ106IEdldHRlckZufSk6IHZvaWQgeyBfbWVyZ2VNYXBzKHRoaXMuX2dldHRlcnMsIGdldHRlcnMpOyB9XG5cbiAgcmVnaXN0ZXJTZXR0ZXJzKHNldHRlcnM6IHtba2V5OiBzdHJpbmddOiBTZXR0ZXJGbn0pOiB2b2lkIHsgX21lcmdlTWFwcyh0aGlzLl9zZXR0ZXJzLCBzZXR0ZXJzKTsgfVxuXG4gIHJlZ2lzdGVyTWV0aG9kcyhtZXRob2RzOiB7W2tleTogc3RyaW5nXTogTWV0aG9kRm59KTogdm9pZCB7IF9tZXJnZU1hcHModGhpcy5fbWV0aG9kcywgbWV0aG9kcyk7IH1cblxuICBmYWN0b3J5KHR5cGU6IFR5cGUpOiBGdW5jdGlvbiB7XG4gICAgaWYgKHRoaXMuX2NvbnRhaW5zUmVmbGVjdGlvbkluZm8odHlwZSkpIHtcbiAgICAgIHZhciByZXMgPSB0aGlzLl9nZXRSZWZsZWN0aW9uSW5mbyh0eXBlKS5mYWN0b3J5O1xuICAgICAgcmV0dXJuIGlzUHJlc2VudChyZXMpID8gcmVzIDogbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5mYWN0b3J5KHR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHBhcmFtZXRlcnModHlwZU9yRnVuYzogLypUeXBlKi8gYW55KTogYW55W11bXSB7XG4gICAgaWYgKHRoaXMuX2luamVjdGFibGVJbmZvLmhhcyh0eXBlT3JGdW5jKSkge1xuICAgICAgdmFyIHJlcyA9IHRoaXMuX2dldFJlZmxlY3Rpb25JbmZvKHR5cGVPckZ1bmMpLnBhcmFtZXRlcnM7XG4gICAgICByZXR1cm4gaXNQcmVzZW50KHJlcykgPyByZXMgOiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5wYXJhbWV0ZXJzKHR5cGVPckZ1bmMpO1xuICAgIH1cbiAgfVxuXG4gIGFubm90YXRpb25zKHR5cGVPckZ1bmM6IC8qVHlwZSovIGFueSk6IGFueVtdIHtcbiAgICBpZiAodGhpcy5faW5qZWN0YWJsZUluZm8uaGFzKHR5cGVPckZ1bmMpKSB7XG4gICAgICB2YXIgcmVzID0gdGhpcy5fZ2V0UmVmbGVjdGlvbkluZm8odHlwZU9yRnVuYykuYW5ub3RhdGlvbnM7XG4gICAgICByZXR1cm4gaXNQcmVzZW50KHJlcykgPyByZXMgOiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5hbm5vdGF0aW9ucyh0eXBlT3JGdW5jKTtcbiAgICB9XG4gIH1cblxuICBwcm9wTWV0YWRhdGEodHlwZU9yRnVuYzogLypUeXBlKi8gYW55KToge1trZXk6IHN0cmluZ106IGFueVtdfSB7XG4gICAgaWYgKHRoaXMuX2luamVjdGFibGVJbmZvLmhhcyh0eXBlT3JGdW5jKSkge1xuICAgICAgdmFyIHJlcyA9IHRoaXMuX2dldFJlZmxlY3Rpb25JbmZvKHR5cGVPckZ1bmMpLnByb3BNZXRhZGF0YTtcbiAgICAgIHJldHVybiBpc1ByZXNlbnQocmVzKSA/IHJlcyA6IHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLnByb3BNZXRhZGF0YSh0eXBlT3JGdW5jKTtcbiAgICB9XG4gIH1cblxuICBpbnRlcmZhY2VzKHR5cGU6IFR5cGUpOiBhbnlbXSB7XG4gICAgaWYgKHRoaXMuX2luamVjdGFibGVJbmZvLmhhcyh0eXBlKSkge1xuICAgICAgdmFyIHJlcyA9IHRoaXMuX2dldFJlZmxlY3Rpb25JbmZvKHR5cGUpLmludGVyZmFjZXM7XG4gICAgICByZXR1cm4gaXNQcmVzZW50KHJlcykgPyByZXMgOiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5pbnRlcmZhY2VzKHR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGdldHRlcihuYW1lOiBzdHJpbmcpOiBHZXR0ZXJGbiB7XG4gICAgaWYgKHRoaXMuX2dldHRlcnMuaGFzKG5hbWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZ2V0dGVycy5nZXQobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuZ2V0dGVyKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldHRlcihuYW1lOiBzdHJpbmcpOiBTZXR0ZXJGbiB7XG4gICAgaWYgKHRoaXMuX3NldHRlcnMuaGFzKG5hbWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2V0dGVycy5nZXQobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMuc2V0dGVyKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIG1ldGhvZChuYW1lOiBzdHJpbmcpOiBNZXRob2RGbiB7XG4gICAgaWYgKHRoaXMuX21ldGhvZHMuaGFzKG5hbWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbWV0aG9kcy5nZXQobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnJlZmxlY3Rpb25DYXBhYmlsaXRpZXMubWV0aG9kKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dldFJlZmxlY3Rpb25JbmZvKHR5cGVPckZ1bmM6IGFueSk6IFJlZmxlY3Rpb25JbmZvIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMuX3VzZWRLZXlzKSkge1xuICAgICAgdGhpcy5fdXNlZEtleXMuYWRkKHR5cGVPckZ1bmMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5faW5qZWN0YWJsZUluZm8uZ2V0KHR5cGVPckZ1bmMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY29udGFpbnNSZWZsZWN0aW9uSW5mbyh0eXBlT3JGdW5jOiBhbnkpIHsgcmV0dXJuIHRoaXMuX2luamVjdGFibGVJbmZvLmhhcyh0eXBlT3JGdW5jKTsgfVxuXG4gIGltcG9ydFVyaSh0eXBlOiBUeXBlKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMucmVmbGVjdGlvbkNhcGFiaWxpdGllcy5pbXBvcnRVcmkodHlwZSk7IH1cbn1cblxuZnVuY3Rpb24gX21lcmdlTWFwcyh0YXJnZXQ6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uPiwgY29uZmlnOiB7W2tleTogc3RyaW5nXTogRnVuY3Rpb259KTogdm9pZCB7XG4gIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChjb25maWcsICh2OiBGdW5jdGlvbiwgazogc3RyaW5nKSA9PiB0YXJnZXQuc2V0KGssIHYpKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
