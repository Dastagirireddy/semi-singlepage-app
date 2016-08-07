System.register(['angular2/src/facade/collection', 'angular2/src/core/change_detection/change_detection', 'angular2/src/core/change_detection/interfaces', './element', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/core/render/api', './view_ref', 'angular2/src/core/pipes/pipes', 'angular2/src/core/render/util', './view_type'], function(exports_1, context_1) {
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
    var collection_1, change_detection_1, interfaces_1, element_1, lang_1, exceptions_1, api_1, view_ref_1, pipes_1, util_1, pipes_2, view_type_1;
    var REFLECT_PREFIX, EMPTY_CONTEXT, AppView, AppProtoView, HostViewFactory;
    function _localsToStringMap(locals) {
        var res = {};
        var c = locals;
        while (lang_1.isPresent(c)) {
            res = collection_1.StringMapWrapper.merge(res, collection_1.MapWrapper.toStringMap(c.current));
            c = c.parent;
        }
        return res;
    }
    function flattenNestedViewRenderNodes(nodes) {
        return _flattenNestedViewRenderNodes(nodes, []);
    }
    exports_1("flattenNestedViewRenderNodes", flattenNestedViewRenderNodes);
    function _flattenNestedViewRenderNodes(nodes, renderNodes) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node instanceof element_1.AppElement) {
                var appEl = node;
                renderNodes.push(appEl.nativeElement);
                if (lang_1.isPresent(appEl.nestedViews)) {
                    for (var k = 0; k < appEl.nestedViews.length; k++) {
                        _flattenNestedViewRenderNodes(appEl.nestedViews[k].rootNodesOrAppElements, renderNodes);
                    }
                }
            }
            else {
                renderNodes.push(node);
            }
        }
        return renderNodes;
    }
    function findLastRenderNode(node) {
        var lastNode;
        if (node instanceof element_1.AppElement) {
            var appEl = node;
            lastNode = appEl.nativeElement;
            if (lang_1.isPresent(appEl.nestedViews)) {
                // Note: Views might have no root nodes at all!
                for (var i = appEl.nestedViews.length - 1; i >= 0; i--) {
                    var nestedView = appEl.nestedViews[i];
                    if (nestedView.rootNodesOrAppElements.length > 0) {
                        lastNode = findLastRenderNode(nestedView.rootNodesOrAppElements[nestedView.rootNodesOrAppElements.length - 1]);
                    }
                }
            }
        }
        else {
            lastNode = node;
        }
        return lastNode;
    }
    exports_1("findLastRenderNode", findLastRenderNode);
    function checkSlotCount(componentName, expectedSlotCount, projectableNodes) {
        var givenSlotCount = lang_1.isPresent(projectableNodes) ? projectableNodes.length : 0;
        if (givenSlotCount < expectedSlotCount) {
            throw new exceptions_1.BaseException(("The component " + componentName + " has " + expectedSlotCount + " <ng-content> elements,") +
                (" but only " + givenSlotCount + " slots were provided."));
        }
    }
    exports_1("checkSlotCount", checkSlotCount);
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (interfaces_1_1) {
                interfaces_1 = interfaces_1_1;
                exports_1({
                    "DebugContext": interfaces_1_1["DebugContext"]
                });
            },
            function (element_1_1) {
                element_1 = element_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (view_ref_1_1) {
                view_ref_1 = view_ref_1_1;
            },
            function (pipes_1_1) {
                pipes_1 = pipes_1_1;
                pipes_2 = pipes_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (view_type_1_1) {
                view_type_1 = view_type_1_1;
            }],
        execute: function() {
            REFLECT_PREFIX = 'ng-reflect-';
            EMPTY_CONTEXT = lang_1.CONST_EXPR(new Object());
            /**
             * Cost of making objects: http://jsperf.com/instantiate-size-of-object
             *
             */
            AppView = (function () {
                function AppView(proto, renderer, viewManager, projectableNodes, containerAppElement, imperativelyCreatedProviders, rootInjector, changeDetector) {
                    this.proto = proto;
                    this.renderer = renderer;
                    this.viewManager = viewManager;
                    this.projectableNodes = projectableNodes;
                    this.containerAppElement = containerAppElement;
                    this.changeDetector = changeDetector;
                    /**
                     * The context against which data-binding expressions in this view are evaluated against.
                     * This is always a component instance.
                     */
                    this.context = null;
                    this.destroyed = false;
                    this.ref = new view_ref_1.ViewRef_(this);
                    var injectorWithHostBoundary = element_1.AppElement.getViewParentInjector(this.proto.type, containerAppElement, imperativelyCreatedProviders, rootInjector);
                    this.parentInjector = injectorWithHostBoundary.injector;
                    this.hostInjectorBoundary = injectorWithHostBoundary.hostInjectorBoundary;
                    var pipes;
                    var context;
                    switch (proto.type) {
                        case view_type_1.ViewType.COMPONENT:
                            pipes = new pipes_2.Pipes(proto.protoPipes, containerAppElement.getInjector());
                            context = containerAppElement.getComponent();
                            break;
                        case view_type_1.ViewType.EMBEDDED:
                            pipes = containerAppElement.parentView.pipes;
                            context = containerAppElement.parentView.context;
                            break;
                        case view_type_1.ViewType.HOST:
                            pipes = null;
                            context = EMPTY_CONTEXT;
                            break;
                    }
                    this.pipes = pipes;
                    this.context = context;
                }
                AppView.prototype.init = function (rootNodesOrAppElements, allNodes, disposables, appElements) {
                    this.rootNodesOrAppElements = rootNodesOrAppElements;
                    this.allNodes = allNodes;
                    this.disposables = disposables;
                    this.appElements = appElements;
                    var localsMap = new collection_1.Map();
                    collection_1.StringMapWrapper.forEach(this.proto.templateVariableBindings, function (templateName, _) { localsMap.set(templateName, null); });
                    for (var i = 0; i < appElements.length; i++) {
                        var appEl = appElements[i];
                        var providerTokens = [];
                        if (lang_1.isPresent(appEl.proto.protoInjector)) {
                            for (var j = 0; j < appEl.proto.protoInjector.numberOfProviders; j++) {
                                providerTokens.push(appEl.proto.protoInjector.getProviderAtIndex(j).key.token);
                            }
                        }
                        collection_1.StringMapWrapper.forEach(appEl.proto.directiveVariableBindings, function (directiveIndex, name) {
                            if (lang_1.isBlank(directiveIndex)) {
                                localsMap.set(name, appEl.nativeElement);
                            }
                            else {
                                localsMap.set(name, appEl.getDirectiveAtIndex(directiveIndex));
                            }
                        });
                        this.renderer.setElementDebugInfo(appEl.nativeElement, new api_1.RenderDebugInfo(appEl.getInjector(), appEl.getComponent(), providerTokens, localsMap));
                    }
                    var parentLocals = null;
                    if (this.proto.type !== view_type_1.ViewType.COMPONENT) {
                        parentLocals =
                            lang_1.isPresent(this.containerAppElement) ? this.containerAppElement.parentView.locals : null;
                    }
                    if (this.proto.type === view_type_1.ViewType.COMPONENT) {
                        // Note: the render nodes have been attached to their host element
                        // in the ViewFactory already.
                        this.containerAppElement.attachComponentView(this);
                        this.containerAppElement.parentView.changeDetector.addViewChild(this.changeDetector);
                    }
                    this.locals = new change_detection_1.Locals(parentLocals, localsMap);
                    this.changeDetector.hydrate(this.context, this.locals, this, this.pipes);
                    this.viewManager.onViewCreated(this);
                };
                AppView.prototype.destroy = function () {
                    if (this.destroyed) {
                        throw new exceptions_1.BaseException('This view has already been destroyed!');
                    }
                    this.changeDetector.destroyRecursive();
                };
                AppView.prototype.notifyOnDestroy = function () {
                    this.destroyed = true;
                    var hostElement = this.proto.type === view_type_1.ViewType.COMPONENT ? this.containerAppElement.nativeElement : null;
                    this.renderer.destroyView(hostElement, this.allNodes);
                    for (var i = 0; i < this.disposables.length; i++) {
                        this.disposables[i]();
                    }
                    this.viewManager.onViewDestroyed(this);
                };
                Object.defineProperty(AppView.prototype, "changeDetectorRef", {
                    get: function () { return this.changeDetector.ref; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppView.prototype, "flatRootNodes", {
                    get: function () { return flattenNestedViewRenderNodes(this.rootNodesOrAppElements); },
                    enumerable: true,
                    configurable: true
                });
                AppView.prototype.hasLocal = function (contextName) {
                    return collection_1.StringMapWrapper.contains(this.proto.templateVariableBindings, contextName);
                };
                AppView.prototype.setLocal = function (contextName, value) {
                    if (!this.hasLocal(contextName)) {
                        return;
                    }
                    var templateName = this.proto.templateVariableBindings[contextName];
                    this.locals.set(templateName, value);
                };
                // dispatch to element injector or text nodes based on context
                AppView.prototype.notifyOnBinding = function (b, currentValue) {
                    if (b.isTextNode()) {
                        this.renderer.setText(this.allNodes[b.elementIndex], currentValue);
                    }
                    else {
                        var nativeElement = this.appElements[b.elementIndex].nativeElement;
                        if (b.isElementProperty()) {
                            this.renderer.setElementProperty(nativeElement, b.name, currentValue);
                        }
                        else if (b.isElementAttribute()) {
                            this.renderer.setElementAttribute(nativeElement, b.name, lang_1.isPresent(currentValue) ? "" + currentValue : null);
                        }
                        else if (b.isElementClass()) {
                            this.renderer.setElementClass(nativeElement, b.name, currentValue);
                        }
                        else if (b.isElementStyle()) {
                            var unit = lang_1.isPresent(b.unit) ? b.unit : '';
                            this.renderer.setElementStyle(nativeElement, b.name, lang_1.isPresent(currentValue) ? "" + currentValue + unit : null);
                        }
                        else {
                            throw new exceptions_1.BaseException('Unsupported directive record');
                        }
                    }
                };
                AppView.prototype.logBindingUpdate = function (b, value) {
                    if (b.isDirective() || b.isElementProperty()) {
                        var nativeElement = this.appElements[b.elementIndex].nativeElement;
                        this.renderer.setBindingDebugInfo(nativeElement, "" + REFLECT_PREFIX + util_1.camelCaseToDashCase(b.name), "" + value);
                    }
                };
                AppView.prototype.notifyAfterContentChecked = function () {
                    var count = this.appElements.length;
                    for (var i = count - 1; i >= 0; i--) {
                        this.appElements[i].ngAfterContentChecked();
                    }
                };
                AppView.prototype.notifyAfterViewChecked = function () {
                    var count = this.appElements.length;
                    for (var i = count - 1; i >= 0; i--) {
                        this.appElements[i].ngAfterViewChecked();
                    }
                };
                AppView.prototype.getDebugContext = function (appElement, elementIndex, directiveIndex) {
                    try {
                        if (lang_1.isBlank(appElement) && elementIndex < this.appElements.length) {
                            appElement = this.appElements[elementIndex];
                        }
                        var container = this.containerAppElement;
                        var element = lang_1.isPresent(appElement) ? appElement.nativeElement : null;
                        var componentElement = lang_1.isPresent(container) ? container.nativeElement : null;
                        var directive = lang_1.isPresent(directiveIndex) ? appElement.getDirectiveAtIndex(directiveIndex) : null;
                        var injector = lang_1.isPresent(appElement) ? appElement.getInjector() : null;
                        return new interfaces_1.DebugContext(element, componentElement, directive, this.context, _localsToStringMap(this.locals), injector);
                    }
                    catch (e) {
                        // TODO: vsavkin log the exception once we have a good way to log errors and warnings
                        // if an error happens during getting the debug context, we return null.
                        return null;
                    }
                };
                AppView.prototype.getDirectiveFor = function (directive) {
                    return this.appElements[directive.elementIndex].getDirectiveAtIndex(directive.directiveIndex);
                };
                AppView.prototype.getDetectorFor = function (directive) {
                    var componentView = this.appElements[directive.elementIndex].componentView;
                    return lang_1.isPresent(componentView) ? componentView.changeDetector : null;
                };
                /**
                 * Triggers the event handlers for the element and the directives.
                 *
                 * This method is intended to be called from directive EventEmitters.
                 *
                 * @param {string} eventName
                 * @param {*} eventObj
                 * @param {number} boundElementIndex
                 * @return false if preventDefault must be applied to the DOM event
                 */
                AppView.prototype.triggerEventHandlers = function (eventName, eventObj, boundElementIndex) {
                    return this.changeDetector.handleEvent(eventName, boundElementIndex, eventObj);
                };
                return AppView;
            }());
            exports_1("AppView", AppView);
            /**
             *
             */
            AppProtoView = (function () {
                function AppProtoView(type, protoPipes, templateVariableBindings) {
                    this.type = type;
                    this.protoPipes = protoPipes;
                    this.templateVariableBindings = templateVariableBindings;
                }
                AppProtoView.create = function (metadataCache, type, pipes, templateVariableBindings) {
                    var protoPipes = null;
                    if (lang_1.isPresent(pipes) && pipes.length > 0) {
                        var boundPipes = collection_1.ListWrapper.createFixedSize(pipes.length);
                        for (var i = 0; i < pipes.length; i++) {
                            boundPipes[i] = metadataCache.getResolvedPipeMetadata(pipes[i]);
                        }
                        protoPipes = pipes_1.ProtoPipes.fromProviders(boundPipes);
                    }
                    return new AppProtoView(type, protoPipes, templateVariableBindings);
                };
                return AppProtoView;
            }());
            exports_1("AppProtoView", AppProtoView);
            HostViewFactory = (function () {
                function HostViewFactory(selector, viewFactory) {
                    this.selector = selector;
                    this.viewFactory = viewFactory;
                }
                HostViewFactory = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [String, Function])
                ], HostViewFactory);
                return HostViewFactory;
            }());
            exports_1("HostViewFactory", HostViewFactory);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvbGlua2VyL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQXdDTSxjQUFjLEVBRWQsYUFBYTtJQWlQbkIsNEJBQTRCLE1BQWM7UUFDeEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ2YsT0FBTyxnQkFBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDcEIsR0FBRyxHQUFHLDZCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsdUJBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDckUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDZixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUM7SUE2QkQsc0NBQTZDLEtBQVk7UUFDdkQsTUFBTSxDQUFDLDZCQUE2QixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRkQsdUVBRUMsQ0FBQTtJQUVELHVDQUF1QyxLQUFZLEVBQUUsV0FBa0I7UUFDckUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDdEMsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBWSxvQkFBVSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxLQUFLLEdBQWUsSUFBSSxDQUFDO2dCQUM3QixXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDdEMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ2xELDZCQUE2QixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLEVBQUUsV0FBVyxDQUFDLENBQUM7b0JBQzFGLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRUQsNEJBQW1DLElBQVM7UUFDMUMsSUFBSSxRQUFRLENBQUM7UUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLFlBQVksb0JBQVUsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxLQUFLLEdBQWUsSUFBSSxDQUFDO1lBQzdCLFFBQVEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsK0NBQStDO2dCQUMvQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUN2RCxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pELFFBQVEsR0FBRyxrQkFBa0IsQ0FDekIsVUFBVSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkYsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDbEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQW5CRCxtREFtQkMsQ0FBQTtJQUVELHdCQUErQixhQUFxQixFQUFFLGlCQUF5QixFQUNoRCxnQkFBeUI7UUFDdEQsSUFBSSxjQUFjLEdBQUcsZ0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDL0UsRUFBRSxDQUFDLENBQUMsY0FBYyxHQUFHLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLElBQUksMEJBQWEsQ0FDbkIsb0JBQWlCLGFBQWEsYUFBUSxpQkFBaUIsNkJBQXlCO2dCQUNoRixnQkFBYSxjQUFjLDJCQUF1QixDQUFDLENBQUM7UUFDMUQsQ0FBQztJQUNILENBQUM7SUFSRCwyQ0FRQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQTNVSyxjQUFjLEdBQVcsYUFBYSxDQUFDO1lBRXZDLGFBQWEsR0FBRyxpQkFBVSxDQUFDLElBQUksTUFBTSxFQUFFLENBQUMsQ0FBQztZQUUvQzs7O2VBR0c7WUFDSDtnQkFnQ0UsaUJBQW1CLEtBQW1CLEVBQVMsUUFBa0IsRUFDOUMsV0FBNEIsRUFBUyxnQkFBb0MsRUFDekUsbUJBQStCLEVBQ3RDLDRCQUFnRCxFQUFFLFlBQXNCLEVBQ2pFLGNBQThCO29CQUo5QixVQUFLLEdBQUwsS0FBSyxDQUFjO29CQUFTLGFBQVEsR0FBUixRQUFRLENBQVU7b0JBQzlDLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtvQkFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW9CO29CQUN6RSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQVk7b0JBRS9CLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtvQkE3QmpEOzs7dUJBR0c7b0JBQ0gsWUFBTyxHQUFRLElBQUksQ0FBQztvQkFtQnBCLGNBQVMsR0FBWSxLQUFLLENBQUM7b0JBT3pCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxtQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM5QixJQUFJLHdCQUF3QixHQUFHLG9CQUFVLENBQUMscUJBQXFCLENBQzNELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFLDRCQUE0QixFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUN0RixJQUFJLENBQUMsY0FBYyxHQUFHLHdCQUF3QixDQUFDLFFBQVEsQ0FBQztvQkFDeEQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLHdCQUF3QixDQUFDLG9CQUFvQixDQUFDO29CQUMxRSxJQUFJLEtBQUssQ0FBQztvQkFDVixJQUFJLE9BQU8sQ0FBQztvQkFDWixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsS0FBSyxvQkFBUSxDQUFDLFNBQVM7NEJBQ3JCLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7NEJBQ3ZFLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQzs0QkFDN0MsS0FBSyxDQUFDO3dCQUNSLEtBQUssb0JBQVEsQ0FBQyxRQUFROzRCQUNwQixLQUFLLEdBQUcsbUJBQW1CLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQzs0QkFDN0MsT0FBTyxHQUFHLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7NEJBQ2pELEtBQUssQ0FBQzt3QkFDUixLQUFLLG9CQUFRLENBQUMsSUFBSTs0QkFDaEIsS0FBSyxHQUFHLElBQUksQ0FBQzs0QkFDYixPQUFPLEdBQUcsYUFBYSxDQUFDOzRCQUN4QixLQUFLLENBQUM7b0JBQ1YsQ0FBQztvQkFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRUQsc0JBQUksR0FBSixVQUFLLHNCQUE2QixFQUFFLFFBQWUsRUFBRSxXQUF1QixFQUN2RSxXQUF5QjtvQkFDNUIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDO29CQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztvQkFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7b0JBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO29CQUMvQixJQUFJLFNBQVMsR0FBRyxJQUFJLGdCQUFHLEVBQWUsQ0FBQztvQkFDdkMsNkJBQWdCLENBQUMsT0FBTyxDQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUNuQyxVQUFDLFlBQW9CLEVBQUUsQ0FBUyxJQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pGLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUM1QyxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQzt3QkFDeEIsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDekMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dDQUNyRSxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDakYsQ0FBQzt3QkFDSCxDQUFDO3dCQUNELDZCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUNyQyxVQUFDLGNBQXNCLEVBQUUsSUFBWTs0QkFDbkMsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDNUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDOzRCQUMzQyxDQUFDOzRCQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNOLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOzRCQUNqRSxDQUFDO3dCQUNILENBQUMsQ0FBQyxDQUFDO3dCQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUM3QixLQUFLLENBQUMsYUFBYSxFQUFFLElBQUkscUJBQWUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxDQUFDLFlBQVksRUFBRSxFQUN6QyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDM0UsQ0FBQztvQkFDRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUM7b0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLG9CQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDM0MsWUFBWTs0QkFDUixnQkFBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDOUYsQ0FBQztvQkFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxvQkFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQzNDLGtFQUFrRTt3QkFDbEUsOEJBQThCO3dCQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25ELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ3ZGLENBQUM7b0JBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHlCQUFNLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUNsRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBRUQseUJBQU8sR0FBUDtvQkFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsTUFBTSxJQUFJLDBCQUFhLENBQUMsdUNBQXVDLENBQUMsQ0FBQztvQkFDbkUsQ0FBQztvQkFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3pDLENBQUM7Z0JBRUQsaUNBQWUsR0FBZjtvQkFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDdEIsSUFBSSxXQUFXLEdBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssb0JBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQzNGLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3RELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUN4QixDQUFDO29CQUNELElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QyxDQUFDO2dCQUVELHNCQUFJLHNDQUFpQjt5QkFBckIsY0FBNkMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUU5RSxzQkFBSSxrQ0FBYTt5QkFBakIsY0FBNkIsTUFBTSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVoRywwQkFBUSxHQUFSLFVBQVMsV0FBbUI7b0JBQzFCLE1BQU0sQ0FBQyw2QkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDckYsQ0FBQztnQkFFRCwwQkFBUSxHQUFSLFVBQVMsV0FBbUIsRUFBRSxLQUFVO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNLENBQUM7b0JBQ1QsQ0FBQztvQkFDRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNwRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBRUQsOERBQThEO2dCQUM5RCxpQ0FBZSxHQUFmLFVBQWdCLENBQWdCLEVBQUUsWUFBaUI7b0JBQ2pELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUNyRSxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLGFBQWEsQ0FBQzt3QkFDbkUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO3dCQUN4RSxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQ3JCLGdCQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBRyxZQUFjLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBQ3hGLENBQUM7d0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO3dCQUNyRSxDQUFDO3dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUM5QixJQUFJLElBQUksR0FBRyxnQkFBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQzs0QkFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQ3JCLGdCQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBRyxZQUFZLEdBQUcsSUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO3dCQUMzRixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLE1BQU0sSUFBSSwwQkFBYSxDQUFDLDhCQUE4QixDQUFDLENBQUM7d0JBQzFELENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUVELGtDQUFnQixHQUFoQixVQUFpQixDQUFnQixFQUFFLEtBQVU7b0JBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQzdDLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLGFBQWEsQ0FBQzt3QkFDbkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FDN0IsYUFBYSxFQUFFLEtBQUcsY0FBYyxHQUFHLDBCQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUcsRUFBRSxLQUFHLEtBQU8sQ0FBQyxDQUFDO29CQUNwRixDQUFDO2dCQUNILENBQUM7Z0JBRUQsMkNBQXlCLEdBQXpCO29CQUNFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO29CQUNwQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO29CQUM5QyxDQUFDO2dCQUNILENBQUM7Z0JBRUQsd0NBQXNCLEdBQXRCO29CQUNFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO29CQUNwQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO29CQUMzQyxDQUFDO2dCQUNILENBQUM7Z0JBRUQsaUNBQWUsR0FBZixVQUFnQixVQUFzQixFQUFFLFlBQW9CLEVBQzVDLGNBQXNCO29CQUNwQyxJQUFJLENBQUM7d0JBQ0gsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBQ2xFLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUM5QyxDQUFDO3dCQUNELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQzt3QkFFekMsSUFBSSxPQUFPLEdBQUcsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFVLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzt3QkFDdEUsSUFBSSxnQkFBZ0IsR0FBRyxnQkFBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO3dCQUM3RSxJQUFJLFNBQVMsR0FDVCxnQkFBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQ3RGLElBQUksUUFBUSxHQUFHLGdCQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQzt3QkFFdkUsTUFBTSxDQUFDLElBQUkseUJBQVksQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQ2xELGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFFckUsQ0FBRTtvQkFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNYLHFGQUFxRjt3QkFDckYsd0VBQXdFO3dCQUN4RSxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNkLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxpQ0FBZSxHQUFmLFVBQWdCLFNBQXlCO29CQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNoRyxDQUFDO2dCQUVELGdDQUFjLEdBQWQsVUFBZSxTQUF5QjtvQkFDdEMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsYUFBYSxDQUFDO29CQUMzRSxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxhQUFhLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDeEUsQ0FBQztnQkFFRDs7Ozs7Ozs7O21CQVNHO2dCQUNILHNDQUFvQixHQUFwQixVQUFxQixTQUFpQixFQUFFLFFBQWUsRUFBRSxpQkFBeUI7b0JBQ2hGLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2pGLENBQUM7Z0JBQ0gsY0FBQztZQUFELENBek9BLEFBeU9DLElBQUE7WUF6T0QsNkJBeU9DLENBQUE7WUFZRDs7ZUFFRztZQUNIO2dCQWNFLHNCQUFtQixJQUFjLEVBQVMsVUFBc0IsRUFDN0Msd0JBQWlEO29CQURqRCxTQUFJLEdBQUosSUFBSSxDQUFVO29CQUFTLGVBQVUsR0FBVixVQUFVLENBQVk7b0JBQzdDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBeUI7Z0JBQUcsQ0FBQztnQkFkakUsbUJBQU0sR0FBYixVQUFjLGFBQW9DLEVBQUUsSUFBYyxFQUFFLEtBQWEsRUFDbkUsd0JBQWlEO29CQUM3RCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6QyxJQUFJLFVBQVUsR0FBRyx3QkFBVyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzNELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzRCQUN0QyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsRSxDQUFDO3dCQUNELFVBQVUsR0FBRyxrQkFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDcEQsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDO2dCQUlILG1CQUFDO1lBQUQsQ0FoQkEsQUFnQkMsSUFBQTtZQWhCRCx1Q0FnQkMsQ0FBQTtZQUlEO2dCQUNFLHlCQUFtQixRQUFnQixFQUFTLFdBQXFCO29CQUE5QyxhQUFRLEdBQVIsUUFBUSxDQUFRO29CQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFVO2dCQUFHLENBQUM7Z0JBRnZFO29CQUFDLFlBQUssRUFBRTs7bUNBQUE7Z0JBR1Isc0JBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELDZDQUVDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9saW5rZXIvdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIExpc3RXcmFwcGVyLFxuICBNYXBXcmFwcGVyLFxuICBNYXAsXG4gIFN0cmluZ01hcFdyYXBwZXIsXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvcixcbiAgQ2hhbmdlRGlzcGF0Y2hlcixcbiAgRGlyZWN0aXZlSW5kZXgsXG4gIEJpbmRpbmdUYXJnZXQsXG4gIExvY2FscyxcbiAgUHJvdG9DaGFuZ2VEZXRlY3RvcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmltcG9ydCB7UmVzb2x2ZWRQcm92aWRlciwgSW5qZWN0YWJsZSwgSW5qZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7RGVidWdDb250ZXh0fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQge0FwcFByb3RvRWxlbWVudCwgQXBwRWxlbWVudCwgRGlyZWN0aXZlUHJvdmlkZXJ9IGZyb20gJy4vZWxlbWVudCc7XG5pbXBvcnQge1xuICBpc1ByZXNlbnQsXG4gIGlzQmxhbmssXG4gIFR5cGUsXG4gIGlzQXJyYXksXG4gIGlzTnVtYmVyLFxuICBDT05TVCxcbiAgQ09OU1RfRVhQUlxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtSZW5kZXJlciwgUm9vdFJlbmRlcmVyLCBSZW5kZXJEZWJ1Z0luZm99IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlbmRlci9hcGknO1xuaW1wb3J0IHtWaWV3UmVmXywgSG9zdFZpZXdGYWN0b3J5UmVmfSBmcm9tICcuL3ZpZXdfcmVmJztcbmltcG9ydCB7UHJvdG9QaXBlc30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcGlwZXMvcGlwZXMnO1xuaW1wb3J0IHtjYW1lbENhc2VUb0Rhc2hDYXNlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZW5kZXIvdXRpbCc7XG5cbmV4cG9ydCB7RGVidWdDb250ZXh0fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtQaXBlc30gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcGlwZXMvcGlwZXMnO1xuaW1wb3J0IHtBcHBWaWV3TWFuYWdlcl8sIEFwcFZpZXdNYW5hZ2VyfSBmcm9tICcuL3ZpZXdfbWFuYWdlcic7XG5pbXBvcnQge1Jlc29sdmVkTWV0YWRhdGFDYWNoZX0gZnJvbSAnLi9yZXNvbHZlZF9tZXRhZGF0YV9jYWNoZSc7XG5pbXBvcnQge1ZpZXdUeXBlfSBmcm9tICcuL3ZpZXdfdHlwZSc7XG5cbmNvbnN0IFJFRkxFQ1RfUFJFRklYOiBzdHJpbmcgPSAnbmctcmVmbGVjdC0nO1xuXG5jb25zdCBFTVBUWV9DT05URVhUID0gQ09OU1RfRVhQUihuZXcgT2JqZWN0KCkpO1xuXG4vKipcbiAqIENvc3Qgb2YgbWFraW5nIG9iamVjdHM6IGh0dHA6Ly9qc3BlcmYuY29tL2luc3RhbnRpYXRlLXNpemUtb2Ytb2JqZWN0XG4gKlxuICovXG5leHBvcnQgY2xhc3MgQXBwVmlldyBpbXBsZW1lbnRzIENoYW5nZURpc3BhdGNoZXIge1xuICByZWY6IFZpZXdSZWZfO1xuICByb290Tm9kZXNPckFwcEVsZW1lbnRzOiBhbnlbXTtcbiAgYWxsTm9kZXM6IGFueVtdO1xuICBkaXNwb3NhYmxlczogRnVuY3Rpb25bXTtcbiAgYXBwRWxlbWVudHM6IEFwcEVsZW1lbnRbXTtcblxuICAvKipcbiAgICogVGhlIGNvbnRleHQgYWdhaW5zdCB3aGljaCBkYXRhLWJpbmRpbmcgZXhwcmVzc2lvbnMgaW4gdGhpcyB2aWV3IGFyZSBldmFsdWF0ZWQgYWdhaW5zdC5cbiAgICogVGhpcyBpcyBhbHdheXMgYSBjb21wb25lbnQgaW5zdGFuY2UuXG4gICAqL1xuICBjb250ZXh0OiBhbnkgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBWYXJpYWJsZXMsIGxvY2FsIHRvIHRoaXMgdmlldywgdGhhdCBjYW4gYmUgdXNlZCBpbiBiaW5kaW5nIGV4cHJlc3Npb25zIChpbiBhZGRpdGlvbiB0byB0aGVcbiAgICogY29udGV4dCkuIFRoaXMgaXMgdXNlZCBmb3IgdGhpbmcgbGlrZSBgPHZpZGVvICNwbGF5ZXI+YCBvclxuICAgKiBgPGxpIHRlbXBsYXRlPVwiZm9yICNpdGVtIG9mIGl0ZW1zXCI+YCwgd2hlcmUgXCJwbGF5ZXJcIiBhbmQgXCJpdGVtXCIgYXJlIGxvY2FscywgcmVzcGVjdGl2ZWx5LlxuICAgKi9cbiAgbG9jYWxzOiBMb2NhbHM7XG5cbiAgcGlwZXM6IFBpcGVzO1xuXG4gIHBhcmVudEluamVjdG9yOiBJbmplY3RvcjtcblxuICAvKipcbiAgICogV2hldGhlciByb290IGluamVjdG9ycyBvZiB0aGlzIHZpZXdcbiAgICogaGF2ZSBhIGhvc3RCb3VuZGFyeS5cbiAgICovXG4gIGhvc3RJbmplY3RvckJvdW5kYXJ5OiBib29sZWFuO1xuXG4gIGRlc3Ryb3llZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm90bzogQXBwUHJvdG9WaWV3LCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgdmlld01hbmFnZXI6IEFwcFZpZXdNYW5hZ2VyXywgcHVibGljIHByb2plY3RhYmxlTm9kZXM6IEFycmF5PGFueSB8IGFueVtdPixcbiAgICAgICAgICAgICAgcHVibGljIGNvbnRhaW5lckFwcEVsZW1lbnQ6IEFwcEVsZW1lbnQsXG4gICAgICAgICAgICAgIGltcGVyYXRpdmVseUNyZWF0ZWRQcm92aWRlcnM6IFJlc29sdmVkUHJvdmlkZXJbXSwgcm9vdEluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgcHVibGljIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3Rvcikge1xuICAgIHRoaXMucmVmID0gbmV3IFZpZXdSZWZfKHRoaXMpO1xuICAgIHZhciBpbmplY3RvcldpdGhIb3N0Qm91bmRhcnkgPSBBcHBFbGVtZW50LmdldFZpZXdQYXJlbnRJbmplY3RvcihcbiAgICAgICAgdGhpcy5wcm90by50eXBlLCBjb250YWluZXJBcHBFbGVtZW50LCBpbXBlcmF0aXZlbHlDcmVhdGVkUHJvdmlkZXJzLCByb290SW5qZWN0b3IpO1xuICAgIHRoaXMucGFyZW50SW5qZWN0b3IgPSBpbmplY3RvcldpdGhIb3N0Qm91bmRhcnkuaW5qZWN0b3I7XG4gICAgdGhpcy5ob3N0SW5qZWN0b3JCb3VuZGFyeSA9IGluamVjdG9yV2l0aEhvc3RCb3VuZGFyeS5ob3N0SW5qZWN0b3JCb3VuZGFyeTtcbiAgICB2YXIgcGlwZXM7XG4gICAgdmFyIGNvbnRleHQ7XG4gICAgc3dpdGNoIChwcm90by50eXBlKSB7XG4gICAgICBjYXNlIFZpZXdUeXBlLkNPTVBPTkVOVDpcbiAgICAgICAgcGlwZXMgPSBuZXcgUGlwZXMocHJvdG8ucHJvdG9QaXBlcywgY29udGFpbmVyQXBwRWxlbWVudC5nZXRJbmplY3RvcigpKTtcbiAgICAgICAgY29udGV4dCA9IGNvbnRhaW5lckFwcEVsZW1lbnQuZ2V0Q29tcG9uZW50KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBWaWV3VHlwZS5FTUJFRERFRDpcbiAgICAgICAgcGlwZXMgPSBjb250YWluZXJBcHBFbGVtZW50LnBhcmVudFZpZXcucGlwZXM7XG4gICAgICAgIGNvbnRleHQgPSBjb250YWluZXJBcHBFbGVtZW50LnBhcmVudFZpZXcuY29udGV4dDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFZpZXdUeXBlLkhPU1Q6XG4gICAgICAgIHBpcGVzID0gbnVsbDtcbiAgICAgICAgY29udGV4dCA9IEVNUFRZX0NPTlRFWFQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLnBpcGVzID0gcGlwZXM7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgfVxuXG4gIGluaXQocm9vdE5vZGVzT3JBcHBFbGVtZW50czogYW55W10sIGFsbE5vZGVzOiBhbnlbXSwgZGlzcG9zYWJsZXM6IEZ1bmN0aW9uW10sXG4gICAgICAgYXBwRWxlbWVudHM6IEFwcEVsZW1lbnRbXSkge1xuICAgIHRoaXMucm9vdE5vZGVzT3JBcHBFbGVtZW50cyA9IHJvb3ROb2Rlc09yQXBwRWxlbWVudHM7XG4gICAgdGhpcy5hbGxOb2RlcyA9IGFsbE5vZGVzO1xuICAgIHRoaXMuZGlzcG9zYWJsZXMgPSBkaXNwb3NhYmxlcztcbiAgICB0aGlzLmFwcEVsZW1lbnRzID0gYXBwRWxlbWVudHM7XG4gICAgdmFyIGxvY2Fsc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKFxuICAgICAgICB0aGlzLnByb3RvLnRlbXBsYXRlVmFyaWFibGVCaW5kaW5ncyxcbiAgICAgICAgKHRlbXBsYXRlTmFtZTogc3RyaW5nLCBfOiBzdHJpbmcpID0+IHsgbG9jYWxzTWFwLnNldCh0ZW1wbGF0ZU5hbWUsIG51bGwpOyB9KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFwcEVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYXBwRWwgPSBhcHBFbGVtZW50c1tpXTtcbiAgICAgIHZhciBwcm92aWRlclRva2VucyA9IFtdO1xuICAgICAgaWYgKGlzUHJlc2VudChhcHBFbC5wcm90by5wcm90b0luamVjdG9yKSkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFwcEVsLnByb3RvLnByb3RvSW5qZWN0b3IubnVtYmVyT2ZQcm92aWRlcnM7IGorKykge1xuICAgICAgICAgIHByb3ZpZGVyVG9rZW5zLnB1c2goYXBwRWwucHJvdG8ucHJvdG9JbmplY3Rvci5nZXRQcm92aWRlckF0SW5kZXgoaikua2V5LnRva2VuKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKGFwcEVsLnByb3RvLmRpcmVjdGl2ZVZhcmlhYmxlQmluZGluZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRpcmVjdGl2ZUluZGV4OiBudW1iZXIsIG5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQmxhbmsoZGlyZWN0aXZlSW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2Fsc01hcC5zZXQobmFtZSwgYXBwRWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbHNNYXAuc2V0KG5hbWUsIGFwcEVsLmdldERpcmVjdGl2ZUF0SW5kZXgoZGlyZWN0aXZlSW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudERlYnVnSW5mbyhcbiAgICAgICAgICBhcHBFbC5uYXRpdmVFbGVtZW50LCBuZXcgUmVuZGVyRGVidWdJbmZvKGFwcEVsLmdldEluamVjdG9yKCksIGFwcEVsLmdldENvbXBvbmVudCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJUb2tlbnMsIGxvY2Fsc01hcCkpO1xuICAgIH1cbiAgICB2YXIgcGFyZW50TG9jYWxzID0gbnVsbDtcbiAgICBpZiAodGhpcy5wcm90by50eXBlICE9PSBWaWV3VHlwZS5DT01QT05FTlQpIHtcbiAgICAgIHBhcmVudExvY2FscyA9XG4gICAgICAgICAgaXNQcmVzZW50KHRoaXMuY29udGFpbmVyQXBwRWxlbWVudCkgPyB0aGlzLmNvbnRhaW5lckFwcEVsZW1lbnQucGFyZW50Vmlldy5sb2NhbHMgOiBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm90by50eXBlID09PSBWaWV3VHlwZS5DT01QT05FTlQpIHtcbiAgICAgIC8vIE5vdGU6IHRoZSByZW5kZXIgbm9kZXMgaGF2ZSBiZWVuIGF0dGFjaGVkIHRvIHRoZWlyIGhvc3QgZWxlbWVudFxuICAgICAgLy8gaW4gdGhlIFZpZXdGYWN0b3J5IGFscmVhZHkuXG4gICAgICB0aGlzLmNvbnRhaW5lckFwcEVsZW1lbnQuYXR0YWNoQ29tcG9uZW50Vmlldyh0aGlzKTtcbiAgICAgIHRoaXMuY29udGFpbmVyQXBwRWxlbWVudC5wYXJlbnRWaWV3LmNoYW5nZURldGVjdG9yLmFkZFZpZXdDaGlsZCh0aGlzLmNoYW5nZURldGVjdG9yKTtcbiAgICB9XG4gICAgdGhpcy5sb2NhbHMgPSBuZXcgTG9jYWxzKHBhcmVudExvY2FscywgbG9jYWxzTWFwKTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yLmh5ZHJhdGUodGhpcy5jb250ZXh0LCB0aGlzLmxvY2FscywgdGhpcywgdGhpcy5waXBlcyk7XG4gICAgdGhpcy52aWV3TWFuYWdlci5vblZpZXdDcmVhdGVkKHRoaXMpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5kZXN0cm95ZWQpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdUaGlzIHZpZXcgaGFzIGFscmVhZHkgYmVlbiBkZXN0cm95ZWQhJyk7XG4gICAgfVxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGVzdHJveVJlY3Vyc2l2ZSgpO1xuICB9XG5cbiAgbm90aWZ5T25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICB2YXIgaG9zdEVsZW1lbnQgPVxuICAgICAgICB0aGlzLnByb3RvLnR5cGUgPT09IFZpZXdUeXBlLkNPTVBPTkVOVCA/IHRoaXMuY29udGFpbmVyQXBwRWxlbWVudC5uYXRpdmVFbGVtZW50IDogbnVsbDtcbiAgICB0aGlzLnJlbmRlcmVyLmRlc3Ryb3lWaWV3KGhvc3RFbGVtZW50LCB0aGlzLmFsbE5vZGVzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGlzcG9zYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuZGlzcG9zYWJsZXNbaV0oKTtcbiAgICB9XG4gICAgdGhpcy52aWV3TWFuYWdlci5vblZpZXdEZXN0cm95ZWQodGhpcyk7XG4gIH1cblxuICBnZXQgY2hhbmdlRGV0ZWN0b3JSZWYoKTogQ2hhbmdlRGV0ZWN0b3JSZWYgeyByZXR1cm4gdGhpcy5jaGFuZ2VEZXRlY3Rvci5yZWY7IH1cblxuICBnZXQgZmxhdFJvb3ROb2RlcygpOiBhbnlbXSB7IHJldHVybiBmbGF0dGVuTmVzdGVkVmlld1JlbmRlck5vZGVzKHRoaXMucm9vdE5vZGVzT3JBcHBFbGVtZW50cyk7IH1cblxuICBoYXNMb2NhbChjb250ZXh0TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFN0cmluZ01hcFdyYXBwZXIuY29udGFpbnModGhpcy5wcm90by50ZW1wbGF0ZVZhcmlhYmxlQmluZGluZ3MsIGNvbnRleHROYW1lKTtcbiAgfVxuXG4gIHNldExvY2FsKGNvbnRleHROYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaGFzTG9jYWwoY29udGV4dE5hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0ZW1wbGF0ZU5hbWUgPSB0aGlzLnByb3RvLnRlbXBsYXRlVmFyaWFibGVCaW5kaW5nc1tjb250ZXh0TmFtZV07XG4gICAgdGhpcy5sb2NhbHMuc2V0KHRlbXBsYXRlTmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgLy8gZGlzcGF0Y2ggdG8gZWxlbWVudCBpbmplY3RvciBvciB0ZXh0IG5vZGVzIGJhc2VkIG9uIGNvbnRleHRcbiAgbm90aWZ5T25CaW5kaW5nKGI6IEJpbmRpbmdUYXJnZXQsIGN1cnJlbnRWYWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKGIuaXNUZXh0Tm9kZSgpKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFRleHQodGhpcy5hbGxOb2Rlc1tiLmVsZW1lbnRJbmRleF0sIGN1cnJlbnRWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBuYXRpdmVFbGVtZW50ID0gdGhpcy5hcHBFbGVtZW50c1tiLmVsZW1lbnRJbmRleF0ubmF0aXZlRWxlbWVudDtcbiAgICAgIGlmIChiLmlzRWxlbWVudFByb3BlcnR5KCkpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkobmF0aXZlRWxlbWVudCwgYi5uYW1lLCBjdXJyZW50VmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChiLmlzRWxlbWVudEF0dHJpYnV0ZSgpKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZShuYXRpdmVFbGVtZW50LCBiLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ByZXNlbnQoY3VycmVudFZhbHVlKSA/IGAke2N1cnJlbnRWYWx1ZX1gIDogbnVsbCk7XG4gICAgICB9IGVsc2UgaWYgKGIuaXNFbGVtZW50Q2xhc3MoKSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRDbGFzcyhuYXRpdmVFbGVtZW50LCBiLm5hbWUsIGN1cnJlbnRWYWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGIuaXNFbGVtZW50U3R5bGUoKSkge1xuICAgICAgICB2YXIgdW5pdCA9IGlzUHJlc2VudChiLnVuaXQpID8gYi51bml0IDogJyc7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKG5hdGl2ZUVsZW1lbnQsIGIubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQcmVzZW50KGN1cnJlbnRWYWx1ZSkgPyBgJHtjdXJyZW50VmFsdWV9JHt1bml0fWAgOiBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdVbnN1cHBvcnRlZCBkaXJlY3RpdmUgcmVjb3JkJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbG9nQmluZGluZ1VwZGF0ZShiOiBCaW5kaW5nVGFyZ2V0LCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKGIuaXNEaXJlY3RpdmUoKSB8fCBiLmlzRWxlbWVudFByb3BlcnR5KCkpIHtcbiAgICAgIHZhciBuYXRpdmVFbGVtZW50ID0gdGhpcy5hcHBFbGVtZW50c1tiLmVsZW1lbnRJbmRleF0ubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QmluZGluZ0RlYnVnSW5mbyhcbiAgICAgICAgICBuYXRpdmVFbGVtZW50LCBgJHtSRUZMRUNUX1BSRUZJWH0ke2NhbWVsQ2FzZVRvRGFzaENhc2UoYi5uYW1lKX1gLCBgJHt2YWx1ZX1gKTtcbiAgICB9XG4gIH1cblxuICBub3RpZnlBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgIHZhciBjb3VudCA9IHRoaXMuYXBwRWxlbWVudHMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSBjb3VudCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB0aGlzLmFwcEVsZW1lbnRzW2ldLm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpO1xuICAgIH1cbiAgfVxuXG4gIG5vdGlmeUFmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgdmFyIGNvdW50ID0gdGhpcy5hcHBFbGVtZW50cy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IGNvdW50IC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHRoaXMuYXBwRWxlbWVudHNbaV0ubmdBZnRlclZpZXdDaGVja2VkKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGVidWdDb250ZXh0KGFwcEVsZW1lbnQ6IEFwcEVsZW1lbnQsIGVsZW1lbnRJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlSW5kZXg6IG51bWJlcik6IERlYnVnQ29udGV4dCB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChpc0JsYW5rKGFwcEVsZW1lbnQpICYmIGVsZW1lbnRJbmRleCA8IHRoaXMuYXBwRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGFwcEVsZW1lbnQgPSB0aGlzLmFwcEVsZW1lbnRzW2VsZW1lbnRJbmRleF07XG4gICAgICB9XG4gICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5jb250YWluZXJBcHBFbGVtZW50O1xuXG4gICAgICB2YXIgZWxlbWVudCA9IGlzUHJlc2VudChhcHBFbGVtZW50KSA/IGFwcEVsZW1lbnQubmF0aXZlRWxlbWVudCA6IG51bGw7XG4gICAgICB2YXIgY29tcG9uZW50RWxlbWVudCA9IGlzUHJlc2VudChjb250YWluZXIpID8gY29udGFpbmVyLm5hdGl2ZUVsZW1lbnQgOiBudWxsO1xuICAgICAgdmFyIGRpcmVjdGl2ZSA9XG4gICAgICAgICAgaXNQcmVzZW50KGRpcmVjdGl2ZUluZGV4KSA/IGFwcEVsZW1lbnQuZ2V0RGlyZWN0aXZlQXRJbmRleChkaXJlY3RpdmVJbmRleCkgOiBudWxsO1xuICAgICAgdmFyIGluamVjdG9yID0gaXNQcmVzZW50KGFwcEVsZW1lbnQpID8gYXBwRWxlbWVudC5nZXRJbmplY3RvcigpIDogbnVsbDtcblxuICAgICAgcmV0dXJuIG5ldyBEZWJ1Z0NvbnRleHQoZWxlbWVudCwgY29tcG9uZW50RWxlbWVudCwgZGlyZWN0aXZlLCB0aGlzLmNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbG9jYWxzVG9TdHJpbmdNYXAodGhpcy5sb2NhbHMpLCBpbmplY3Rvcik7XG5cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBUT0RPOiB2c2F2a2luIGxvZyB0aGUgZXhjZXB0aW9uIG9uY2Ugd2UgaGF2ZSBhIGdvb2Qgd2F5IHRvIGxvZyBlcnJvcnMgYW5kIHdhcm5pbmdzXG4gICAgICAvLyBpZiBhbiBlcnJvciBoYXBwZW5zIGR1cmluZyBnZXR0aW5nIHRoZSBkZWJ1ZyBjb250ZXh0LCB3ZSByZXR1cm4gbnVsbC5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGdldERpcmVjdGl2ZUZvcihkaXJlY3RpdmU6IERpcmVjdGl2ZUluZGV4KTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5hcHBFbGVtZW50c1tkaXJlY3RpdmUuZWxlbWVudEluZGV4XS5nZXREaXJlY3RpdmVBdEluZGV4KGRpcmVjdGl2ZS5kaXJlY3RpdmVJbmRleCk7XG4gIH1cblxuICBnZXREZXRlY3RvckZvcihkaXJlY3RpdmU6IERpcmVjdGl2ZUluZGV4KTogQ2hhbmdlRGV0ZWN0b3Ige1xuICAgIHZhciBjb21wb25lbnRWaWV3ID0gdGhpcy5hcHBFbGVtZW50c1tkaXJlY3RpdmUuZWxlbWVudEluZGV4XS5jb21wb25lbnRWaWV3O1xuICAgIHJldHVybiBpc1ByZXNlbnQoY29tcG9uZW50VmlldykgPyBjb21wb25lbnRWaWV3LmNoYW5nZURldGVjdG9yIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyB0aGUgZXZlbnQgaGFuZGxlcnMgZm9yIHRoZSBlbGVtZW50IGFuZCB0aGUgZGlyZWN0aXZlcy5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgaW50ZW5kZWQgdG8gYmUgY2FsbGVkIGZyb20gZGlyZWN0aXZlIEV2ZW50RW1pdHRlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICogQHBhcmFtIHsqfSBldmVudE9ialxuICAgKiBAcGFyYW0ge251bWJlcn0gYm91bmRFbGVtZW50SW5kZXhcbiAgICogQHJldHVybiBmYWxzZSBpZiBwcmV2ZW50RGVmYXVsdCBtdXN0IGJlIGFwcGxpZWQgdG8gdGhlIERPTSBldmVudFxuICAgKi9cbiAgdHJpZ2dlckV2ZW50SGFuZGxlcnMoZXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50T2JqOiBFdmVudCwgYm91bmRFbGVtZW50SW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNoYW5nZURldGVjdG9yLmhhbmRsZUV2ZW50KGV2ZW50TmFtZSwgYm91bmRFbGVtZW50SW5kZXgsIGV2ZW50T2JqKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfbG9jYWxzVG9TdHJpbmdNYXAobG9jYWxzOiBMb2NhbHMpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIHZhciByZXMgPSB7fTtcbiAgdmFyIGMgPSBsb2NhbHM7XG4gIHdoaWxlIChpc1ByZXNlbnQoYykpIHtcbiAgICByZXMgPSBTdHJpbmdNYXBXcmFwcGVyLm1lcmdlKHJlcywgTWFwV3JhcHBlci50b1N0cmluZ01hcChjLmN1cnJlbnQpKTtcbiAgICBjID0gYy5wYXJlbnQ7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQXBwUHJvdG9WaWV3IHtcbiAgc3RhdGljIGNyZWF0ZShtZXRhZGF0YUNhY2hlOiBSZXNvbHZlZE1ldGFkYXRhQ2FjaGUsIHR5cGU6IFZpZXdUeXBlLCBwaXBlczogVHlwZVtdLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVmFyaWFibGVCaW5kaW5nczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pOiBBcHBQcm90b1ZpZXcge1xuICAgIHZhciBwcm90b1BpcGVzID0gbnVsbDtcbiAgICBpZiAoaXNQcmVzZW50KHBpcGVzKSAmJiBwaXBlcy5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgYm91bmRQaXBlcyA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShwaXBlcy5sZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwaXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBib3VuZFBpcGVzW2ldID0gbWV0YWRhdGFDYWNoZS5nZXRSZXNvbHZlZFBpcGVNZXRhZGF0YShwaXBlc1tpXSk7XG4gICAgICB9XG4gICAgICBwcm90b1BpcGVzID0gUHJvdG9QaXBlcy5mcm9tUHJvdmlkZXJzKGJvdW5kUGlwZXMpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEFwcFByb3RvVmlldyh0eXBlLCBwcm90b1BpcGVzLCB0ZW1wbGF0ZVZhcmlhYmxlQmluZGluZ3MpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIHR5cGU6IFZpZXdUeXBlLCBwdWJsaWMgcHJvdG9QaXBlczogUHJvdG9QaXBlcyxcbiAgICAgICAgICAgICAgcHVibGljIHRlbXBsYXRlVmFyaWFibGVCaW5kaW5nczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pIHt9XG59XG5cblxuQENPTlNUKClcbmV4cG9ydCBjbGFzcyBIb3N0Vmlld0ZhY3Rvcnkge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2VsZWN0b3I6IHN0cmluZywgcHVibGljIHZpZXdGYWN0b3J5OiBGdW5jdGlvbikge31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5OZXN0ZWRWaWV3UmVuZGVyTm9kZXMobm9kZXM6IGFueVtdKTogYW55W10ge1xuICByZXR1cm4gX2ZsYXR0ZW5OZXN0ZWRWaWV3UmVuZGVyTm9kZXMobm9kZXMsIFtdKTtcbn1cblxuZnVuY3Rpb24gX2ZsYXR0ZW5OZXN0ZWRWaWV3UmVuZGVyTm9kZXMobm9kZXM6IGFueVtdLCByZW5kZXJOb2RlczogYW55W10pOiBhbnlbXSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbm9kZSA9IG5vZGVzW2ldO1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXBwRWxlbWVudCkge1xuICAgICAgdmFyIGFwcEVsID0gPEFwcEVsZW1lbnQ+bm9kZTtcbiAgICAgIHJlbmRlck5vZGVzLnB1c2goYXBwRWwubmF0aXZlRWxlbWVudCk7XG4gICAgICBpZiAoaXNQcmVzZW50KGFwcEVsLm5lc3RlZFZpZXdzKSkge1xuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGFwcEVsLm5lc3RlZFZpZXdzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgX2ZsYXR0ZW5OZXN0ZWRWaWV3UmVuZGVyTm9kZXMoYXBwRWwubmVzdGVkVmlld3Nba10ucm9vdE5vZGVzT3JBcHBFbGVtZW50cywgcmVuZGVyTm9kZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbmRlck5vZGVzLnB1c2gobm9kZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZW5kZXJOb2Rlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRMYXN0UmVuZGVyTm9kZShub2RlOiBhbnkpOiBhbnkge1xuICB2YXIgbGFzdE5vZGU7XG4gIGlmIChub2RlIGluc3RhbmNlb2YgQXBwRWxlbWVudCkge1xuICAgIHZhciBhcHBFbCA9IDxBcHBFbGVtZW50Pm5vZGU7XG4gICAgbGFzdE5vZGUgPSBhcHBFbC5uYXRpdmVFbGVtZW50O1xuICAgIGlmIChpc1ByZXNlbnQoYXBwRWwubmVzdGVkVmlld3MpKSB7XG4gICAgICAvLyBOb3RlOiBWaWV3cyBtaWdodCBoYXZlIG5vIHJvb3Qgbm9kZXMgYXQgYWxsIVxuICAgICAgZm9yICh2YXIgaSA9IGFwcEVsLm5lc3RlZFZpZXdzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHZhciBuZXN0ZWRWaWV3ID0gYXBwRWwubmVzdGVkVmlld3NbaV07XG4gICAgICAgIGlmIChuZXN0ZWRWaWV3LnJvb3ROb2Rlc09yQXBwRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxhc3ROb2RlID0gZmluZExhc3RSZW5kZXJOb2RlKFxuICAgICAgICAgICAgICBuZXN0ZWRWaWV3LnJvb3ROb2Rlc09yQXBwRWxlbWVudHNbbmVzdGVkVmlldy5yb290Tm9kZXNPckFwcEVsZW1lbnRzLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsYXN0Tm9kZSA9IG5vZGU7XG4gIH1cbiAgcmV0dXJuIGxhc3ROb2RlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tTbG90Q291bnQoY29tcG9uZW50TmFtZTogc3RyaW5nLCBleHBlY3RlZFNsb3RDb3VudDogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RhYmxlTm9kZXM6IGFueVtdW10pOiB2b2lkIHtcbiAgdmFyIGdpdmVuU2xvdENvdW50ID0gaXNQcmVzZW50KHByb2plY3RhYmxlTm9kZXMpID8gcHJvamVjdGFibGVOb2Rlcy5sZW5ndGggOiAwO1xuICBpZiAoZ2l2ZW5TbG90Q291bnQgPCBleHBlY3RlZFNsb3RDb3VudCkge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICBgVGhlIGNvbXBvbmVudCAke2NvbXBvbmVudE5hbWV9IGhhcyAke2V4cGVjdGVkU2xvdENvdW50fSA8bmctY29udGVudD4gZWxlbWVudHMsYCArXG4gICAgICAgIGAgYnV0IG9ubHkgJHtnaXZlblNsb3RDb3VudH0gc2xvdHMgd2VyZSBwcm92aWRlZC5gKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
