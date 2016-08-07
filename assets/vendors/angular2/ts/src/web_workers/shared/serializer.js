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
                        'templateUrl': obj.templateUrl,
                        'slotCount': obj.slotCount,
                        'encapsulation': this.serialize(obj.encapsulation, view_1.ViewEncapsulation),
                        'styles': this.serialize(obj.styles, PRIMITIVE)
                    };
                };
                Serializer.prototype._deserializeRenderComponentType = function (map) {
                    return new api_1.RenderComponentType(map['id'], map['templateUrl'], map['slotCount'], this.deserialize(map['encapsulation'], view_1.ViewEncapsulation), this.deserialize(map['styles'], PRIMITIVE));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBWWEsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUZ0QixzRkFBc0Y7WUFDdEYsdURBQXVEO1lBQzFDLHVCQUFBLFNBQVMsR0FBUyxNQUFNLENBQUEsQ0FBQztZQUd0QztnQkFDRSxvQkFBb0IsWUFBeUI7b0JBQXpCLGlCQUFZLEdBQVosWUFBWSxDQUFhO2dCQUFHLENBQUM7Z0JBRWpELDhCQUFTLEdBQVQsVUFBVSxHQUFRLEVBQUUsSUFBUztvQkFBN0IsaUJBcUJDO29CQXBCQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNkLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsTUFBTSxDQUFTLEdBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO29CQUN4RCxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDO29CQUNiLENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLGlCQUFpQixDQUFDLENBQUMsQ0FBQzt3QkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMxQyxDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUsseUJBQW1CLENBQUMs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Qy9DLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxFQUFFLHdCQUFpQixDQUFDLEVBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdFLENBQUM7Z0JBcEhIO29CQUFDLGVBQVUsRUFBRTs7OEJBQUE7Z0JBcUhiLGlCQUFDO1lBQUQsQ0FwSEEsQUFvSEMsSUFBQTtZQXBIRCxtQ0FvSEMsQ0FBQTtZQUdEO2dCQUFBO2dCQUFnQyxDQUFDO2dCQUFELHdCQUFDO1lBQUQsQ0FBaEMsQUFBaUMsSUFBQTtZQUFqQyxpREFBaUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGUsIGlzQXJyYXksIGlzUHJlc2VudCwgc2VyaWFsaXplRW51bSwgZGVzZXJpYWxpemVFbnVtfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nXCI7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5cbmltcG9ydCB7TWFwLCBTdHJpbmdNYXBXcmFwcGVyLCBNYXBXcmFwcGVyfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uXCI7XG5pbXBvcnQge1JlbmRlckNvbXBvbmVudFR5cGV9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9yZW5kZXIvYXBpXCI7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9kaVwiO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9yZW5kZXJfc3RvcmUnO1xuaW1wb3J0IHtWaWV3RW5jYXBzdWxhdGlvbiwgVklFV19FTkNBUFNVTEFUSU9OX1ZBTFVFU30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEvdmlldyc7XG5pbXBvcnQge0xvY2F0aW9uVHlwZX0gZnJvbSAnLi9zZXJpYWxpemVkX3R5cGVzJztcblxuLy8gUFJJTUlUSVZFIGlzIGFueSB0eXBlIHRoYXQgZG9lcyBub3QgbmVlZCB0byBiZSBzZXJpYWxpemVkIChzdHJpbmcsIG51bWJlciwgYm9vbGVhbilcbi8vIFdlIHNldCBpdCB0byBTdHJpbmcgc28gdGhhdCBpdCBpcyBjb25zaWRlcmVkIGEgVHlwZS5cbmV4cG9ydCBjb25zdCBQUklNSVRJVkU6IFR5cGUgPSBTdHJpbmc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJpYWxpemVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcmVuZGVyU3RvcmU6IFJlbmRlclN0b3JlKSB7fVxuXG4gIHNlcmlhbGl6ZShvYmo6IGFueSwgdHlwZTogYW55KTogT2JqZWN0IHtcbiAgICBpZiAoIWlzUHJlc2VudChvYmopKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgcmV0dXJuICg8YW55W10+b2JqKS5tYXAodiA9PiB0aGlzLnNlcmlhbGl6ZSh2LCB0eXBlKSk7XG4gICAgfVxuICAgIGlmICh0eXBlID09IFBSSU1JVElWRSkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gUmVuZGVyU3RvcmVPYmplY3QpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTdG9yZS5zZXJpYWxpemUob2JqKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFJlbmRlckNvbXBvbmVudFR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVSZW5kZXJDb21wb25lbnRUeXBlKG9iaik7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBWaWV3RW5jYXBzdWxhdGlvbikge1xuICAgICAgcmV0dXJuIHNlcmlhbGl6ZUVudW0ob2JqKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IExvY2F0aW9uVHlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlcmlhbGl6ZUxvY2F0aW9uKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFwiTm8gc2VyaWFsaXplciBmb3IgXCIgKyB0eXBlLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgfVxuXG4gIGRlc2VyaWFsaXplKG1hcDogYW55LCB0eXBlOiBhbnksIGRhdGE/OiBhbnkpOiBhbnkge1xuICAgIGlmICghaXNQcmVzZW50KG1hcCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoaXNBcnJheShtYXApKSB7XG4gICAgICB2YXIgb2JqOiBhbnlbXSA9IFtdO1xuICAgICAgKDxhbnlbXT5tYXApLmZvckVhY2godmFsID0+IG9iai5wdXNoKHRoaXMuZGVzZXJpYWxpemUodmFsLCB0eXBlLCBkYXRhKSkpO1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gUFJJTUlUSVZFKSB7XG4gICAgICByZXR1cm4gbWFwO1xuICAgIH1cblxuICAgIGlmICh0eXBlID09IFJlbmRlclN0b3JlT2JqZWN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU3RvcmUuZGVzZXJpYWxpemUobWFwKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFJlbmRlckNvbXBvbmVudFR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZXNlcmlhbGl6ZVJlbmRlckNvbXBvbmVudFR5cGUobWFwKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFZpZXdFbmNhcHN1bGF0aW9uKSB7XG4gICAgICByZXR1cm4gVklFV19FTkNBUFNVTEFUSU9OX1ZBTFVFU1ttYXBdO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gTG9jYXRpb25UeXBlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZGVzZXJpYWxpemVMb2NhdGlvbihtYXApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIk5vIGRlc2VyaWFsaXplciBmb3IgXCIgKyB0eXBlLnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgfVxuXG4gIG1hcFRvT2JqZWN0KG1hcDogTWFwPHN0cmluZywgYW55PiwgdHlwZT86IFR5cGUpOiBPYmplY3Qge1xuICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICB2YXIgc2VyaWFsaXplID0gaXNQcmVzZW50KHR5cGUpO1xuXG4gICAgbWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGlmIChzZXJpYWxpemUpIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSB0aGlzLnNlcmlhbGl6ZSh2YWx1ZSwgdHlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICAvKlxuICAgKiBUcmFuc2Zvcm1zIGEgSmF2YXNjcmlwdCBvYmplY3QgKFN0cmluZ01hcCkgaW50byBhIE1hcDxzdHJpbmcsIFY+XG4gICAqIElmIHRoZSB2YWx1ZXMgbmVlZCB0byBiZSBkZXNlcmlhbGl6ZWQgcGFzcyBpbiB0aGVpciB0eXBlXG4gICAqIGFuZCB0aGV5IHdpbGwgYmUgZGVzZXJpYWxpemVkIGJlZm9yZSBiZWluZyBwbGFjZWQgaW4gdGhlIG1hcFxuICAgKi9cbiAgb2JqZWN0VG9NYXAob2JqOiB7W2tleTogc3RyaW5nXTogYW55fSwgdHlwZT86IFR5cGUsIGRhdGE/OiBhbnkpOiBNYXA8c3RyaW5nLCBhbnk+IHtcbiAgICBpZiAoaXNQcmVzZW50KHR5cGUpKSB7XG4gICAgICB2YXIgbWFwID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChvYmosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZhbCwga2V5KSA9PiB7IG1hcC5zZXQoa2V5LCB0aGlzLmRlc2VyaWFsaXplKHZhbCwgdHlwZSwgZGF0YSkpOyB9KTtcbiAgICAgIHJldHVybiBtYXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBNYXBXcmFwcGVyLmNyZWF0ZUZyb21TdHJpbmdNYXAob2JqKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZXJpYWxpemVMb2NhdGlvbihsb2M6IExvY2F0aW9uVHlwZSk6IE9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdocmVmJzogbG9jLmhyZWYsXG4gICAgICAncHJvdG9jb2wnOiBsb2MucHJvdG9jb2wsXG4gICAgICAnaG9zdCc6IGxvYy5ob3N0LFxuICAgICAgJ2hvc3RuYW1lJzogbG9jLmhvc3RuYW1lLFxuICAgICAgJ3BvcnQnOiBsb2MucG9ydCxcbiAgICAgICdwYXRobmFtZSc6IGxvYy5wYXRobmFtZSxcbiAgICAgICdzZWFyY2gnOiBsb2Muc2VhcmNoLFxuICAgICAgJ2hhc2gnOiBsb2MuaGFzaCxcbiAgICAgICdvcmlnaW4nOiBsb2Mub3JpZ2luXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc2VyaWFsaXplTG9jYXRpb24obG9jOiB7W2tleTogc3RyaW5nXTogYW55fSk6IExvY2F0aW9uVHlwZSB7XG4gICAgcmV0dXJuIG5ldyBMb2NhdGlvblR5cGUobG9jWydocmVmJ10sIGxvY1sncHJvdG9jb2wnXSwgbG9jWydob3N0J10sIGxvY1snaG9zdG5hbWUnXSwgbG9jWydwb3J0J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jWydwYXRobmFtZSddLCBsb2NbJ3NlYXJjaCddLCBsb2NbJ2hhc2gnXSwgbG9jWydvcmlnaW4nXSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXJpYWxpemVSZW5kZXJDb21wb25lbnRUeXBlKG9iajogUmVuZGVyQ29tcG9uZW50VHlwZSk6IE9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdpZCc6IG9iai5pZCxcbiAgICAgICd0ZW1wbGF0ZVVybCc6IG9iai50ZW1wbGF0ZVVybCxcbiAgICAgICdzbG90Q291bnQnOiBvYmouc2xvdENvdW50LFxuICAgICAgJ2VuY2Fwc3VsYXRpb24nOiB0aGlzLnNlcmlhbGl6ZShvYmouZW5jYXBzdWxhdGlvbiwgVmlld0VuY2Fwc3VsYXRpb24pLFxuICAgICAgJ3N0eWxlcyc6IHRoaXMuc2VyaWFsaXplKG9iai5zdHlsZXMsIFBSSU1JVElWRSlcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzZXJpYWxpemVSZW5kZXJDb21wb25lbnRUeXBlKG1hcDoge1trZXk6IHN0cmluZ106IGFueX0pOiBSZW5kZXJDb21wb25lbnRUeXBlIHtcbiAgICByZXR1cm4gbmV3IFJlbmRlckNvbXBvbmVudFR5cGUobWFwWydpZCddLCBtYXBbJ3RlbXBsYXRlVXJsJ10sIG1hcFsnc2xvdENvdW50J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzZXJpYWxpemUobWFwWydlbmNhcHN1bGF0aW9uJ10sIFZpZXdFbmNhcHN1bGF0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZShtYXBbJ3N0eWxlcyddLCBQUklNSVRJVkUpKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBSZW5kZXJTdG9yZU9iamVjdCB7fVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
