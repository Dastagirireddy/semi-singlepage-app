System.register(["angular2/src/facade/lang", 'angular2/src/facade/exceptions', "angular2/src/facade/collection", "angular2/src/core/render/api", "angular2/src/core/di", 'angular2/src/web_workers/shared/render_store', 'angular2/src/core/metadata/view', './serialized_types'], function(exports_1, context_1) {
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
    var lang_1, exceptions_1, collection_1, api_1, di_1, render_store_1, view_1, serialized_types_1;
    var PRIMITIVE, Serializer, RenderStoreObject;
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
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (render_store_1_1) {
                render_store_1 = render_store_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (serialized_types_1_1) {
                serialized_types_1 = serialized_types_1_1;
            }],
        execute: function() {
            // PRIMITIVE is any type that does not need to be serialized (string, number, boolean)
            // We set it to String so that it is considered a Type.
            exports_1("PRIMITIVE", PRIMITIVE = String);
            Serializer = (function () {
                function Serializer(_renderStore) {
                    this._renderStore = _renderStore;
                }
                Serializer.prototype.serialize = function (obj, type) {
                    var _this = this;
                    if (!lang_1.isPresent(obj)) {
                        return null;
                    }
                    if (lang_1.isArray(obj)) {
                        return obj.map(function (v) { return _this.serialize(v, type); });
                    }
                    if (type == PRIMITIVE) {
                        return obj;
                    }
                    if (type == RenderStoreObject) {
                        return this._renderStore.serialize(obj);
                    }
                    else if (type === api_1.RenderComponentType) {
                        return this._serializeRenderComponentType(obj);
                    }
                    else if (type === view_1.ViewEncapsulation) {
                        return lang_1.serializeEnum(obj);
                    }
                    else if (type === serialized_types_1.LocationType) {
                        return this._serializeLocation(obj);
                    }
                    else {
                        throw new exceptions_1.BaseException("No serializer for " + type.toString());
                    }
                };
                Serializer.prototype.deserialize = function (map, type, data) {
                    var _this = this;
                    if (!lang_1.isPresent(map)) {
                        return null;
                    }
                    if (lang_1.isArray(map)) {
                        var obj = [];
                        map.forEach(function (val) { return obj.push(_this.deserialize(val, type, data)); });
                        return obj;
                    }
                    if (type == PRIMITIVE) {
                        return map;
                    }
                    if (type == RenderStoreObject) {
                        return this._renderStore.deserialize(map);
                    }
                    else if (type === api_1.RenderComponentType) {
                        return this._deserializeRenderComponentType(map);
                    }
                    else if (type === view_1.ViewEncapsulation) {
                        return view_1.VIEW_ENCAPSULATION_VALUES[map];
                    }
                    else if (type === serialized_types_1.LocationType) {
                        return this._deserializeLocation(map);
                    }
                    else {
                        throw new exceptions_1.BaseException("No deserializer for " + type.toString());
                    }
                };
                Serializer.prototype.mapToObject = function (map, type) {
                    var _this = this;
                    var object = {};
                    var serialize = lang_1.isPresent(type);
                    map.forEach(function (value, key) {
                        if (serialize) {
                            object[key] = _this.serialize(value, type);
                        }
                        else {
                            object[key] = value;
                        }
                    });
                    return object;
                };
                /*
                 * Transforms a Javascript object (StringMap) into a Map<string, V>
                 * If the values need to be deserialized pass in their type
                 * and they will be deserialized before being placed in the map
                 */
                Serializer.prototype.objectToMap = function (obj, type, data) {
                    var _this = this;
                    if (lang_1.isPresent(type)) {
                        var map = new collection_1.Map();
                        collection_1.StringMapWrapper.forEach(obj, function (val, key) { map.set(key, _this.deserialize(val, type, data)); });
                        return map;
                    }
                    else {
                        return collection_1.MapWrapper.createFromStringMap(obj);
                    }
                };
                Serializer.prototype._serializeLocation = function (loc) {
                    return {
                        'href': loc.href,
                        'protocol': loc.protocol,
                        'host': loc.host,
                        'hostname': loc.hostname,
                        'port': loc.port,
                        'pathname': loc.pathname,
                        'search': loc.search,
                        'hash': loc.hash,
                        'origin': loc.origin
                    };
                };
                Serializer.prototype._deserializeLocation = function (loc) {
                    return new serialized_types_1.LocationType(loc['href'], loc['protocol'], loc['host'], loc['hostname'], loc['port'], loc['pathname'], loc['search'], loc['hash'], loc['origin']);
                };
                Serializer.prototype._serializeRenderComponentType = function (obj) {
                    return {
                        'id': obj.id,
                        'encapsulation': this.serialize(obj.encapsulation, view_1.ViewEncapsulation),
                        'styles': this.serialize(obj.styles, PRIMITIVE)
                    };
                };
                Serializer.prototype._deserializeRenderComponentType = function (map) {
                    return new api_1.RenderComponentType(map['id'], this.deserialize(map['encapsulation'], view_1.ViewEncapsulation), this.deserialize(map['styles'], PRIMITIVE));
                };
                Serializer = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [render_store_1.RenderStore])
                ], Serializer);
                return Serializer;
            }());
            exports_1("Serializer", Serializer);
            RenderStoreObject = (function () {
                function RenderStoreObject() {
                }
                return RenderStoreObject;
            }());
            exports_1("RenderStoreObject", RenderStoreObject);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7UUFZYSxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRnRCLHNGQUFzRjtZQUN0Rix1REFBdUQ7WUFDMUMsdUJBQUEsU0FBUyxHQUFTLE1BQU0sQ0FBQSxDQUFDO1lBR3RDO2dCQUNFLG9CQUFvQixZQUF5QjtvQkFBekIsaUJBQVksR0FBWixZQUFZLENBQWE7Z0JBQUcsQ0FBQztnQkFFakQsOEJBQVMsR0FBVCxVQUFVLEdBQVEsRUFBRSxJQUFTO29CQUE3QixpQkFxQkM7b0JBcEJDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2QsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixNQUFNLENBQVMsR0FBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUF2QixDQUF1QixDQUFDLENBQUM7b0JBQ3hELENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLE1BQU0sQ0FBQyxHQUFHLENBQUM7b0JBQ2IsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDO3dCQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzFDLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyx5QkFBbUIs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RSxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM3RSxDQUFDO2dCQWxISDtvQkFBQyxlQUFVLEVBQUU7OzhCQUFBO2dCQW1IYixpQkFBQztZQUFELENBbEhBLEFBa0hDLElBQUE7WUFsSEQsbUNBa0hDLENBQUE7WUFHRDtnQkFBQTtnQkFBZ0MsQ0FBQztnQkFBRCx3QkFBQztZQUFELENBQWhDLEFBQWlDLElBQUE7WUFBakMsaURBQWlDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGUsIGlzQXJyYXksIGlzUHJlc2VudCwgc2VyaWFsaXplRW51bSwgZGVzZXJpYWxpemVFbnVtfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nXCI7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5cbmltcG9ydCB7TWFwLCBTdHJpbmdNYXBXcmFwcGVyLCBNYXBXcmFwcGVyfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uXCI7XG5pbXBvcnQge1JlbmRlckNvbXBvbmVudFR5cGV9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9yZW5kZXIvYXBpXCI7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9kaVwiO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9yZW5kZXJfc3RvcmUnO1xuaW1wb3J0IHtWaWV3RW5jYXBzdWxhdGlvbiwgVklFV19FTkNBUFNVTEFUSU9OX1ZBTFVFU30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEvdmlldyc7XG5pbXBvcnQge0xvY2F0aW9uVHlwZX0gZnJvbSAnLi9zZXJpYWxpemVkX3R5cGVzJztcblxuLy8gUFJJTUlUSVZFIGlzIGFueSB0eXBlIHRoYXQgZG9lcyBub3QgbmVlZCB0byBiZSBzZXJpYWxpemVkIChzdHJpbmcsIG51bWJlciwgYm9vbGVhbilcbi8vIFdlIHNldCBpdCB0byBTdHJpbmcgc28gdGhhdCBpdCBpcyBjb25zaWRlcmVkIGEgVHlwZS5cbmV4cG9ydCBjb25zdCBQUklNSVRJVkU6IFR5cGUgPSBTdHJpbmc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJpYWxpemVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcmVuZGVyU3RvcmU6IFJlbmRlclN0b3JlKSB7fVxuXG4gIHNlcmlhbGl6ZShvYmo6IGFueSwgdHlwZTogYW55KTogT2JqZWN0IHtcbiAgICBpZiAoIWlzUHJlc2VudChvYmopKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgcmV0dXJuICg8YW55W10+b2JqKS5tYXAodiA9PiB0aGlzLnNlcmlhbGl6ZSh2LCB0eXBlKSk7XG4gICAgfVxuICAgIGlmICh0eXBlID09IFBSSU1JVElWRSkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gUmVuZGVyU3RvcmVPYmplY3QpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTdG9yZS5zZXJpYWxpemUob2JqKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFJlbmRlckNvbXBvbmVudFR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVSZW5kZXJDb21wb25lbnRUeXBlKG9iaik7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBWaWV3RW5jYXBzdWxhdGlvbikge1xuICAgICAgcmV0dXJuIHNlcmlhbGl6ZUVudW0ob2JqKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IExvY2F0aW9uVHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZUxvY2F0aW9uKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFwiTm8gc2VyaWFsaXplciBmb3IgXCIgKyB0eXBlLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgfVxuXG4gIGRlc2VyaWFsaXplKG1hcDogYW55LCB0eXBlOiBhbnksIGRhdGE/OiBhbnkpOiBhbnkge1xuICAgIGlmICghaXNQcmVzZW50KG1hcCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoaXNBcnJheShtYXApKSB7XG4gICAgICB2YXIgb2JqOiBhbnlbXSA9IFtdO1xuICAgICAgKDxhbnlbXT5tYXApLmZvckVhY2godmFsID0+IG9iai5wdXNoKHRoaXMuZGVzZXJpYWxpemUodmFsLCB0eXBlLCBkYXRhKSkpO1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gUFJJTUlUSVZFKSB7XG4gICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIGlmICh0eXBlID09IFJlbmRlclN0b3JlT2JqZWN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU3RvcmUuZGVzZXJpYWxpemUobWFwKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFJlbmRlckNvbXBvbmVudFR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZXNlcmlhbGl6ZVJlbmRlckNvbXBvbmVudFR5cGUobWFwKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFZpZXdFbmNhcHN1bGF0aW9uKSB7XG4gICAgICByZXR1cm4gVklFV19FTkNBUFNVTEFUSU9OX1ZBTFVFU1ttYXBdO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gTG9jYXRpb25UeXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVzZXJpYWxpemVMb2NhdGlvbihtYXApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIk5vIGRlc2VyaWFsaXplciBmb3IgXCIgKyB0eXBlLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgfVxuXG4gIG1hcFRvT2JqZWN0KG1hcDogTWFwPHN0cmluZywgYW55PiwgdHlwZT86IFR5cGUpOiBPYmplY3Qge1xuICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICB2YXIgc2VyaWFsaXplID0gaXNQcmVzZW50KHR5cGUpO1xuXG4gICAgbWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGlmIChzZXJpYWxpemUpIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSB0aGlzLnNlcmlhbGl6ZSh2YWx1ZSwgdHlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICAvKlxuICAgKiBUcmFuc2Zvcm1zIGEgSmF2YXNjcmlwdCBvYmplY3QgKFN0cmluZ01hcCkgaW50byBhIE1hcDxzdHJpbmcsIFY+XG4gICAqIElmIHRoZSB2YWx1ZXMgbmVlZCB0byBiZSBkZXNlcmlhbGl6ZWQgcGFzcyBpbiB0aGVpciB0eXBlXG4gICAqIGFuZCB0aGV5IHdpbGwgYmUgZGVzZXJpYWxpemVkIGJlZm9yZSBiZWluZyBwbGFjZWQgaW4gdGhlIG1hcFxuICAgKi9cbiAgb2JqZWN0VG9NYXAob2JqOiB7W2tleTogc3RyaW5nXTogYW55fSwgdHlwZT86IFR5cGUsIGRhdGE/OiBhbnkpOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICBpZiAoaXNQcmVzZW50KHR5cGUpKSB7XG4gICAgICB2YXIgbWFwID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChvYmosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZhbCwga2V5KSA9PiB7IG1hcC5zZXQoa2V5LCB0aGlzLmRlc2VyaWFsaXplKHZhbCwgdHlwZSwgZGF0YSkpOyB9KTtcbiAgICAgIHJldHVybiBtYXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBNYXBXcmFwcGVyLmNyZWF0ZUZyb21TdHJpbmdNYXAob2JqKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZXJpYWxpemVMb2NhdGlvbihsb2M6IExvY2F0aW9uVHlwZSk6IE9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdocmVmJzogbG9jLmhyZWYsXG4gICAgICAncHJvdG9jb2wnOiBsb2MucHJvdG9jb2wsXG4gICAgICAnaG9zdCc6IGxvYy5ob3N0LFxuICAgICAgJ2hvc3RuYW1lJzogbG9jLmhvc3RuYW1lLFxuICAgICAgJ3BvcnQnOiBsb2MucG9ydCxcbiAgICAgICdwYXRobmFtZSc6IGxvYy5wYXRobmFtZSxcbiAgICAgICdzZWFyY2gnOiBsb2Muc2VhcmNoLFxuICAgICAgJ2hhc2gnOiBsb2MuaGFzaCxcbiAgICAgICdvcmlnaW4nOiBsb2Mub3JpZ2luXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc2VyaWFsaXplTG9jYXRpb24obG9jOiB7W2tleTogc3RyaW5nXTogYW55fSk6IExvY2F0aW9uVHlwZSB7XG4gICAgcmV0dXJuIG5ldyBMb2NhdGlvblR5cGUobG9jWydocmVmJ10sIGxvY1sncHJvdG9jb2wnXSwgbG9jWydob3N0J10sIGxvY1snaG9zdG5hbWUnXSwgbG9jWydwb3J0J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jWydwYXRobmFtZSddLCBsb2NbJ3NlYXJjaCddLCBsb2NbJ2hhc2gnXSwgbG9jWydvcmlnaW4nXSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXJpYWxpemVSZW5kZXJDb21wb25lbnRUeXBlKG9iajogUmVuZGVyQ29tcG9uZW50VHlwZSk6IE9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdpZCc6IG9iai5pZCxcbiAgICAgICdlbmNhcHN1bGF0aW9uJzogdGhpcy5zZXJpYWxpemUob2JqLmVuY2Fwc3VsYXRpb24sIFZpZXdFbmNhcHN1bGF0aW9uKSxcbiAgICAgICdzdHlsZXMnOiB0aGlzLnNlcmlhbGl6ZShvYmouc3R5bGVzLCBQUklNSVRJVkUpXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc2VyaWFsaXplUmVuZGVyQ29tcG9uZW50VHlwZShtYXA6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogUmVuZGVyQ29tcG9uZW50VHlwZSB7XG4gICAgcmV0dXJuIG5ldyBSZW5kZXJDb21wb25lbnRUeXBlKG1hcFsnaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZShtYXBbJ2VuY2Fwc3VsYXRpb24nXSwgVmlld0VuY2Fwc3VsYXRpb24pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc2VyaWFsaXplKG1hcFsnc3R5bGVzJ10sIFBSSU1JVElWRSkpO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFJlbmRlclN0b3JlT2JqZWN0IHt9XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
