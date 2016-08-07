System.register(['angular2/src/platform/dom/dom_adapter', 'angular2/src/facade/lang', 'angular2/src/facade/collection', './event_manager', 'angular2/src/core/di'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var dom_adapter_1, lang_1, collection_1, event_manager_1, di_1;
    var modifierKeys, modifierKeyGetters, KeyEventsPlugin;
    return {
        setters:[
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (event_manager_1_1) {
                event_manager_1 = event_manager_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            modifierKeys = ['alt', 'control', 'meta', 'shift'];
            modifierKeyGetters = {
                'alt': function (event) { return event.altKey; },
                'control': function (event) { return event.ctrlKey; },
                'meta': function (event) { return event.metaKey; },
                'shift': function (event) { return event.shiftKey; }
            };
            KeyEventsPlugin = (function (_super) {
                __extends(KeyEventsPlugin, _super);
                function KeyEventsPlugin() {
                    _super.call(this);
                }
                KeyEventsPlugin.prototype.supports = function (eventName) {
                    return lang_1.isPresent(KeyEventsPlugin.parseEventName(eventName));
                };
                KeyEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
                    var parsedEvent = KeyEventsPlugin.parseEventName(eventName);
                    var outsideHandler = KeyEventsPlugin.eventCallback(element, collection_1.StringMapWrapper.get(parsedEvent, 'fullKey'), handler, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular(function () {
                        return dom_adapter_1.DOM.onAndCancel(element, collection_1.StringMapWrapper.get(parsedEvent, 'domEventName'), outsideHandler);
                    });
                };
                KeyEventsPlugin.parseEventName = function (eventName) {
                    var parts = eventName.toLowerCase().split('.');
                    var domEventName = parts.shift();
                    if ((parts.length === 0) ||
                        !(lang_1.StringWrapper.equals(domEventName, 'keydown') ||
                            lang_1.StringWrapper.equals(domEventName, 'keyup'))) {
                        return null;
                    }
                    var key = KeyEventsPlugin._normalizeKey(parts.pop());
                    var fullKey = '';
                    modifierKeys.forEach(function (modifierName) {
                        if (collection_1.ListWrapper.contains(parts, modifierName)) {
                            collection_1.ListWrapper.remove(parts, modifierName);
                            fullKey += modifierName + '.';
                        }
                    });
                    fullKey += key;
                    if (parts.length != 0 || key.length === 0) {
                        // returning null instead of throwing to let another plugin process the event
                        return null;
                    }
                    var result = collection_1.StringMapWrapper.create();
                    collection_1.StringMapWrapper.set(result, 'domEventName', domEventName);
                    collection_1.StringMapWrapper.set(result, 'fullKey', fullKey);
                    return result;
                };
                KeyEventsPlugin.getEventFullKey = function (event) {
                    var fullKey = '';
                    var key = dom_adapter_1.DOM.getEventKey(event);
                    key = key.toLowerCase();
                    if (lang_1.StringWrapper.equals(key, ' ')) {
                        key = 'space'; // for readability
                    }
                    else if (lang_1.StringWrapper.equals(key, '.')) {
                        key = 'dot'; // because '.' is used as a separator in event names
                    }
                    modifierKeys.forEach(function (modifierName) {
                        if (modifierName != key) {
                            var modifierGetter = collection_1.StringMapWrapper.get(modifierKeyGetters, modifierName);
                            if (modifierGetter(event)) {
                                fullKey += modifierName + '.';
                            }
                        }
                    });
                    fullKey += key;
                    return fullKey;
                };
                KeyEventsPlugin.eventCallback = function (element, fullKey, handler, zone) {
                    return function (event) {
                        if (lang_1.StringWrapper.equals(KeyEventsPlugin.getEventFullKey(event), fullKey)) {
                            zone.runGuarded(function () { return handler(event); });
                        }
                    };
                };
                /** @internal */
                KeyEventsPlugin._normalizeKey = function (keyName) {
                    // TODO: switch to a StringMap if the mapping grows too much
                    switch (keyName) {
                        case 'esc':
                            return 'escape';
                        default:
                            return keyName;
                    }
                };
                KeyEventsPlugin = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], KeyEventsPlugin);
                return KeyEventsPlugin;
            }(event_manager_1.EventManagerPlugin));
            exports_1("KeyEventsPlugin", KeyEventsPlugin);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2tleV9ldmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBYUksWUFBWSxFQUNaLGtCQUFrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQURsQixZQUFZLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNuRCxrQkFBa0IsR0FBdUQ7Z0JBQzNFLEtBQUssRUFBRSxVQUFDLEtBQW9CLElBQUssT0FBQSxLQUFLLENBQUMsTUFBTSxFQUFaLENBQVk7Z0JBQzdDLFNBQVMsRUFBRSxVQUFDLEtBQW9CLElBQUssT0FBQSxLQUFLLENBQUMsT0FBTyxFQUFiLENBQWE7Z0JBQ2xELE1BQU0sRUFBRSxVQUFDLEtBQW9CLElBQUssT0FBQSxLQUFLLENBQUMsT0FBTyxFQUFiLENBQWE7Z0JBQy9DLE9BQU8sRUFBRSxVQUFDLEtBQW9CLElBQUssT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFkLENBQWM7YUFDbEQsQ0FBQztZQUdGO2dCQUFxQyxtQ0FBa0I7Z0JBQ3JEO29CQUFnQixpQkFBTyxDQUFDO2dCQUFDLENBQUM7Z0JBRTFCLGtDQUFRLEdBQVIsVUFBUyxTQUFpQjtvQkFDeEIsTUFBTSxDQUFDLGdCQUFTLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCxDQUFDO2dCQUVELDBDQUFnQixHQUFoQixVQUFpQixPQUFvQixFQUFFLFNBQWlCLEVBQUUsT0FBaUI7b0JBQ3pFLElBQUksV0FBVyxHQUFHLGVBQWUsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBRTVELElBQUksY0FBYyxHQUFHLGVBQWUsQ0FBQyxhQUFhLENBQzlDLE9BQU8sRUFBRSw2QkFBZ0IsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxFQUFFLE9BQU8s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QyxDQTFGb0Msa0NBQWtCLEdBMEZ0RDtZQTFGRCw2Q0EwRkMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9rZXlfZXZlbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET019IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuaW1wb3J0IHtcbiAgaXNQcmVzZW50LFxuICBpc0JsYW5rLFxuICBTdHJpbmdXcmFwcGVyLFxuICBSZWdFeHBXcmFwcGVyLFxuICBOdW1iZXJXcmFwcGVyXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXIsIExpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vZXZlbnRfbWFuYWdlcic7XG5pbXBvcnQge05nWm9uZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvem9uZS9uZ196b25lJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuXG52YXIgbW9kaWZpZXJLZXlzID0gWydhbHQnLCAnY29udHJvbCcsICdtZXRhJywgJ3NoaWZ0J107XG52YXIgbW9kaWZpZXJLZXlHZXR0ZXJzOiB7W2tleTogc3RyaW5nXTogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBib29sZWFufSA9IHtcbiAgJ2FsdCc6IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gZXZlbnQuYWx0S2V5LFxuICAnY29udHJvbCc6IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gZXZlbnQuY3RybEtleSxcbiAgJ21ldGEnOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGV2ZW50Lm1ldGFLZXksXG4gICdzaGlmdCc6IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gZXZlbnQuc2hpZnRLZXlcbn07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBLZXlFdmVudHNQbHVnaW4gZXh0ZW5kcyBFdmVudE1hbmFnZXJQbHVnaW4ge1xuICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoKTsgfVxuXG4gIHN1cHBvcnRzKGV2ZW50TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzUHJlc2VudChLZXlFdmVudHNQbHVnaW4ucGFyc2VFdmVudE5hbWUoZXZlbnROYW1lKSk7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgdmFyIHBhcnNlZEV2ZW50ID0gS2V5RXZlbnRzUGx1Z2luLnBhcnNlRXZlbnROYW1lKGV2ZW50TmFtZSk7XG5cbiAgICB2YXIgb3V0c2lkZUhhbmRsZXIgPSBLZXlFdmVudHNQbHVnaW4uZXZlbnRDYWxsYmFjayhcbiAgICAgICAgZWxlbWVudCwgU3RyaW5nTWFwV3JhcHBlci5nZXQocGFyc2VkRXZlbnQsICdmdWxsS2V5JyksIGhhbmRsZXIsIHRoaXMubWFuYWdlci5nZXRab25lKCkpO1xuXG4gICAgcmV0dXJuIHRoaXMubWFuYWdlci5nZXRab25lKCkucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgcmV0dXJuIERPTS5vbkFuZENhbmNlbChlbGVtZW50LCBTdHJpbmdNYXBXcmFwcGVyLmdldChwYXJzZWRFdmVudCwgJ2RvbUV2ZW50TmFtZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRzaWRlSGFuZGxlcik7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VFdmVudE5hbWUoZXZlbnROYW1lOiBzdHJpbmcpOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSB7XG4gICAgdmFyIHBhcnRzOiBzdHJpbmdbXSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpLnNwbGl0KCcuJyk7XG5cbiAgICB2YXIgZG9tRXZlbnROYW1lID0gcGFydHMuc2hpZnQoKTtcbiAgICBpZiAoKHBhcnRzLmxlbmd0aCA9PT0gMCkgfHxcbiAgICAgICAgIShTdHJpbmdXcmFwcGVyLmVxdWFscyhkb21FdmVudE5hbWUsICdrZXlkb3duJykgfHxcbiAgICAgICAgICBTdHJpbmdXcmFwcGVyLmVxdWFscyhkb21FdmVudE5hbWUsICdrZXl1cCcpKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGtleSA9IEtleUV2ZW50c1BsdWdpbi5fbm9ybWFsaXplS2V5KHBhcnRzLnBvcCgpKTtcblxuICAgIHZhciBmdWxsS2V5ID0gJyc7XG4gICAgbW9kaWZpZXJLZXlzLmZvckVhY2gobW9kaWZpZXJOYW1lID0+IHtcbiAgICAgIGlmIChMaXN0V3JhcHBlci5jb250YWlucyhwYXJ0cywgbW9kaWZpZXJOYW1lKSkge1xuICAgICAgICBMaXN0V3JhcHBlci5yZW1vdmUocGFydHMsIG1vZGlmaWVyTmFtZSk7XG4gICAgICAgIGZ1bGxLZXkgKz0gbW9kaWZpZXJOYW1lICsgJy4nO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bGxLZXkgKz0ga2V5O1xuXG4gICAgaWYgKHBhcnRzLmxlbmd0aCAhPSAwIHx8IGtleS5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIHJldHVybmluZyBudWxsIGluc3RlYWQgb2YgdGhyb3dpbmcgdG8gbGV0IGFub3RoZXIgcGx1Z2luIHByb2Nlc3MgdGhlIGV2ZW50XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IFN0cmluZ01hcFdyYXBwZXIuY3JlYXRlKCk7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5zZXQocmVzdWx0LCAnZG9tRXZlbnROYW1lJywgZG9tRXZlbnROYW1lKTtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLnNldChyZXN1bHQsICdmdWxsS2V5JywgZnVsbEtleSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRFdmVudEZ1bGxLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBzdHJpbmcge1xuICAgIHZhciBmdWxsS2V5ID0gJyc7XG4gICAgdmFyIGtleSA9IERPTS5nZXRFdmVudEtleShldmVudCk7XG4gICAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKFN0cmluZ1dyYXBwZXIuZXF1YWxzKGtleSwgJyAnKSkge1xuICAgICAga2V5ID0gJ3NwYWNlJzsgIC8vIGZvciByZWFkYWJpbGl0eVxuICAgIH0gZWxzZSBpZiAoU3RyaW5nV3JhcHBlci5lcXVhbHMoa2V5LCAnLicpKSB7XG4gICAgICBrZXkgPSAnZG90JzsgIC8vIGJlY2F1c2UgJy4nIGlzIHVzZWQgYXMgYSBzZXBhcmF0b3IgaW4gZXZlbnQgbmFtZXNcbiAgICB9XG4gICAgbW9kaWZpZXJLZXlzLmZvckVhY2gobW9kaWZpZXJOYW1lID0+IHtcbiAgICAgIGlmIChtb2RpZmllck5hbWUgIT0ga2V5KSB7XG4gICAgICAgIHZhciBtb2RpZmllckdldHRlciA9IFN0cmluZ01hcFdyYXBwZXIuZ2V0KG1vZGlmaWVyS2V5R2V0dGVycywgbW9kaWZpZXJOYW1lKTtcbiAgICAgICAgaWYgKG1vZGlmaWVyR2V0dGVyKGV2ZW50KSkge1xuICAgICAgICAgIGZ1bGxLZXkgKz0gbW9kaWZpZXJOYW1lICsgJy4nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgZnVsbEtleSArPSBrZXk7XG4gICAgcmV0dXJuIGZ1bGxLZXk7XG4gIH1cblxuICBzdGF0aWMgZXZlbnRDYWxsYmFjayhlbGVtZW50OiBIVE1MRWxlbWVudCwgZnVsbEtleTogYW55LCBoYW5kbGVyOiBGdW5jdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgem9uZTogTmdab25lKTogRnVuY3Rpb24ge1xuICAgIHJldHVybiAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChTdHJpbmdXcmFwcGVyLmVxdWFscyhLZXlFdmVudHNQbHVnaW4uZ2V0RXZlbnRGdWxsS2V5KGV2ZW50KSwgZnVsbEtleSkpIHtcbiAgICAgICAgem9uZS5ydW5HdWFyZGVkKCgpID0+IGhhbmRsZXIoZXZlbnQpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBzdGF0aWMgX25vcm1hbGl6ZUtleShrZXlOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIFRPRE86IHN3aXRjaCB0byBhIFN0cmluZ01hcCBpZiB0aGUgbWFwcGluZyBncm93cyB0b28gbXVjaFxuICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgICAgY2FzZSAnZXNjJzpcbiAgICAgICAgcmV0dXJuICdlc2NhcGUnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGtleU5hbWU7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
