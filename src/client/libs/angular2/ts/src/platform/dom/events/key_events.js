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
                            zone.run(function () { return handler(event); });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMva2V5X2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFhSSxZQUFZLEVBQ1osa0JBQWtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRGxCLFlBQVksR0FBRyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELGtCQUFrQixHQUF1RDtnQkFDM0UsS0FBSyxFQUFFLFVBQUMsS0FBb0IsSUFBSyxPQUFBLEtBQUssQ0FBQyxNQUFNLEVBQVosQ0FBWTtnQkFDN0MsU0FBUyxFQUFFLFVBQUMsS0FBb0IsSUFBSyxPQUFBLEtBQUssQ0FBQyxPQUFPLEVBQWIsQ0FBYTtnQkFDbEQsTUFBTSxFQUFFLFVBQUMsS0FBb0IsSUFBSyxPQUFBLEtBQUssQ0FBQyxPQUFPLEVBQWIsQ0FBYTtnQkFDL0MsT0FBTyxFQUFFLFVBQUMsS0FBb0IsSUFBSyxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQWQsQ0FBYzthQUNsRCxDQUFDO1lBR0Y7Z0JBQXFDLG1DQUFrQjtnQkFDckQ7b0JBQWdCLGlCQUFPLENBQUM7Z0JBQUMsQ0FBQztnQkFFMUIsa0NBQVEsR0FBUixVQUFTLFNBQWlCO29CQUN4QixNQUFNLENBQUMsZ0JBQVMsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlELENBQUM7Z0JBRUQsMENBQWdCLEdBQWhCLFVBQWlCLE9BQW9CLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtvQkFDekUsSUFBSSxXQUFXLEdBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFFNUQsSUFBSSxjQUFjLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FDOUMsT0FBTyxFQUFFLDZCQUFnQixDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLEVBQUUs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LEFBMEZDLENBMUZvQyxrQ0FBa0IsR0EwRnREO1lBMUZELDZDQTBGQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMva2V5X2V2ZW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7XG4gIGlzUHJlc2VudCxcbiAgaXNCbGFuayxcbiAgU3RyaW5nV3JhcHBlcixcbiAgUmVnRXhwV3JhcHBlcixcbiAgTnVtYmVyV3JhcHBlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyLCBMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7RXZlbnRNYW5hZ2VyUGx1Z2lufSBmcm9tICcuL2V2ZW50X21hbmFnZXInO1xuaW1wb3J0IHtOZ1pvbmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3pvbmUvbmdfem9uZSc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcblxudmFyIG1vZGlmaWVyS2V5cyA9IFsnYWx0JywgJ2NvbnRyb2wnLCAnbWV0YScsICdzaGlmdCddO1xudmFyIG1vZGlmaWVyS2V5R2V0dGVyczoge1trZXk6IHN0cmluZ106IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gYm9vbGVhbn0gPSB7XG4gICdhbHQnOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGV2ZW50LmFsdEtleSxcbiAgJ2NvbnRyb2wnOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGV2ZW50LmN0cmxLZXksXG4gICdtZXRhJzogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5tZXRhS2V5LFxuICAnc2hpZnQnOiAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IGV2ZW50LnNoaWZ0S2V5XG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgS2V5RXZlbnRzUGx1Z2luIGV4dGVuZHMgRXZlbnRNYW5hZ2VyUGx1Z2luIHtcbiAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCk7IH1cblxuICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1ByZXNlbnQoS2V5RXZlbnRzUGx1Z2luLnBhcnNlRXZlbnROYW1lKGV2ZW50TmFtZSkpO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIHZhciBwYXJzZWRFdmVudCA9IEtleUV2ZW50c1BsdWdpbi5wYXJzZUV2ZW50TmFtZShldmVudE5hbWUpO1xuXG4gICAgdmFyIG91dHNpZGVIYW5kbGVyID0gS2V5RXZlbnRzUGx1Z2luLmV2ZW50Q2FsbGJhY2soXG4gICAgICAgIGVsZW1lbnQsIFN0cmluZ01hcFdyYXBwZXIuZ2V0KHBhcnNlZEV2ZW50LCAnZnVsbEtleScpLCBoYW5kbGVyLCB0aGlzLm1hbmFnZXIuZ2V0Wm9uZSgpKTtcblxuICAgIHJldHVybiB0aGlzLm1hbmFnZXIuZ2V0Wm9uZSgpLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHJldHVybiBET00ub25BbmRDYW5jZWwoZWxlbWVudCwgU3RyaW5nTWFwV3JhcHBlci5nZXQocGFyc2VkRXZlbnQsICdkb21FdmVudE5hbWUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0c2lkZUhhbmRsZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlRXZlbnROYW1lKGV2ZW50TmFtZTogc3RyaW5nKToge1trZXk6IHN0cmluZ106IHN0cmluZ30ge1xuICAgIHZhciBwYXJ0czogc3RyaW5nW10gPSBldmVudE5hbWUudG9Mb3dlckNhc2UoKS5zcGxpdCgnLicpO1xuXG4gICAgdmFyIGRvbUV2ZW50TmFtZSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgaWYgKChwYXJ0cy5sZW5ndGggPT09IDApIHx8XG4gICAgICAgICEoU3RyaW5nV3JhcHBlci5lcXVhbHMoZG9tRXZlbnROYW1lLCAna2V5ZG93bicpIHx8XG4gICAgICAgICAgU3RyaW5nV3JhcHBlci5lcXVhbHMoZG9tRXZlbnROYW1lLCAna2V5dXAnKSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBrZXkgPSBLZXlFdmVudHNQbHVnaW4uX25vcm1hbGl6ZUtleShwYXJ0cy5wb3AoKSk7XG5cbiAgICB2YXIgZnVsbEtleSA9ICcnO1xuICAgIG1vZGlmaWVyS2V5cy5mb3JFYWNoKG1vZGlmaWVyTmFtZSA9PiB7XG4gICAgICBpZiAoTGlzdFdyYXBwZXIuY29udGFpbnMocGFydHMsIG1vZGlmaWVyTmFtZSkpIHtcbiAgICAgICAgTGlzdFdyYXBwZXIucmVtb3ZlKHBhcnRzLCBtb2RpZmllck5hbWUpO1xuICAgICAgICBmdWxsS2V5ICs9IG1vZGlmaWVyTmFtZSArICcuJztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBmdWxsS2V5ICs9IGtleTtcblxuICAgIGlmIChwYXJ0cy5sZW5ndGggIT0gMCB8fCBrZXkubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyByZXR1cm5pbmcgbnVsbCBpbnN0ZWFkIG9mIHRocm93aW5nIHRvIGxldCBhbm90aGVyIHBsdWdpbiBwcm9jZXNzIHRoZSBldmVudFxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBTdHJpbmdNYXBXcmFwcGVyLmNyZWF0ZSgpO1xuICAgIFN0cmluZ01hcFdyYXBwZXIuc2V0KHJlc3VsdCwgJ2RvbUV2ZW50TmFtZScsIGRvbUV2ZW50TmFtZSk7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5zZXQocmVzdWx0LCAnZnVsbEtleScsIGZ1bGxLZXkpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0RXZlbnRGdWxsS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogc3RyaW5nIHtcbiAgICB2YXIgZnVsbEtleSA9ICcnO1xuICAgIHZhciBrZXkgPSBET00uZ2V0RXZlbnRLZXkoZXZlbnQpO1xuICAgIGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChTdHJpbmdXcmFwcGVyLmVxdWFscyhrZXksICcgJykpIHtcbiAgICAgIGtleSA9ICdzcGFjZSc7ICAvLyBmb3IgcmVhZGFiaWxpdHlcbiAgICB9IGVsc2UgaWYgKFN0cmluZ1dyYXBwZXIuZXF1YWxzKGtleSwgJy4nKSkge1xuICAgICAga2V5ID0gJ2RvdCc7ICAvLyBiZWNhdXNlICcuJyBpcyB1c2VkIGFzIGEgc2VwYXJhdG9yIGluIGV2ZW50IG5hbWVzXG4gICAgfVxuICAgIG1vZGlmaWVyS2V5cy5mb3JFYWNoKG1vZGlmaWVyTmFtZSA9PiB7XG4gICAgICBpZiAobW9kaWZpZXJOYW1lICE9IGtleSkge1xuICAgICAgICB2YXIgbW9kaWZpZXJHZXR0ZXIgPSBTdHJpbmdNYXBXcmFwcGVyLmdldChtb2RpZmllcktleUdldHRlcnMsIG1vZGlmaWVyTmFtZSk7XG4gICAgICAgIGlmIChtb2RpZmllckdldHRlcihldmVudCkpIHtcbiAgICAgICAgICBmdWxsS2V5ICs9IG1vZGlmaWVyTmFtZSArICcuJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGZ1bGxLZXkgKz0ga2V5O1xuICAgIHJldHVybiBmdWxsS2V5O1xuICB9XG5cbiAgc3RhdGljIGV2ZW50Q2FsbGJhY2soZWxlbWVudDogSFRNTEVsZW1lbnQsIGZ1bGxLZXk6IGFueSwgaGFuZGxlcjogRnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgIHpvbmU6IE5nWm9uZSk6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoU3RyaW5nV3JhcHBlci5lcXVhbHMoS2V5RXZlbnRzUGx1Z2luLmdldEV2ZW50RnVsbEtleShldmVudCksIGZ1bGxLZXkpKSB7XG4gICAgICAgIHpvbmUucnVuKCgpID0+IGhhbmRsZXIoZXZlbnQpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBzdGF0aWMgX25vcm1hbGl6ZUtleShrZXlOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIC8vIFRPRE86IHN3aXRjaCB0byBhIFN0cmluZ01hcCBpZiB0aGUgbWFwcGluZyBncm93cyB0b28gbXVjaFxuICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgICAgY2FzZSAnZXNjJzpcbiAgICAgICAgcmV0dXJuICdlc2NhcGUnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGtleU5hbWU7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
