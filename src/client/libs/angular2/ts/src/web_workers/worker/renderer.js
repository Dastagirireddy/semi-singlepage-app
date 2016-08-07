System.register(['angular2/src/core/render/api', "angular2/src/web_workers/shared/client_message_broker", "angular2/src/facade/lang", 'angular2/src/facade/collection', "angular2/src/core/di", 'angular2/src/web_workers/shared/render_store', 'angular2/src/web_workers/shared/messaging_api', 'angular2/src/web_workers/shared/serializer', 'angular2/src/web_workers/shared/message_bus', 'angular2/src/facade/async', 'angular2/src/core/metadata/view', './event_deserializer'], function(exports_1, context_1) {
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
    var api_1, client_message_broker_1, lang_1, collection_1, di_1, render_store_1, messaging_api_1, serializer_1, messaging_api_2, message_bus_1, async_1, view_1, event_deserializer_1;
    var WebWorkerRootRenderer, WebWorkerRenderer, NamedEventEmitter, WebWorkerRenderNode;
    function eventNameWithTarget(target, eventName) {
        return target + ":" + eventName;
    }
    return {
        setters:[
            function (api_1_1) {
                api_1 = api_1_1;
            },
            function (client_message_broker_1_1) {
                client_message_broker_1 = client_message_broker_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (render_store_1_1) {
                render_store_1 = render_store_1_1;
            },
            function (messaging_api_1_1) {
                messaging_api_1 = messaging_api_1_1;
                messaging_api_2 = messaging_api_1_1;
            },
            function (serializer_1_1) {
                serializer_1 = serializer_1_1;
            },
            function (message_bus_1_1) {
                message_bus_1 = message_bus_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (event_deserializer_1_1) {
                event_deserializer_1 = event_deserializer_1_1;
            }],
        execute: function() {
            WebWorkerRootRenderer = (function () {
                function WebWorkerRootRenderer(messageBrokerFactory, bus, _serializer, _renderStore) {
                    var _this = this;
                    this._serializer = _serializer;
                    this._renderStore = _renderStore;
                    this.globalEvents = new NamedEventEmitter();
                    this._componentRenderers = new Map();
                    this._messageBroker = messageBrokerFactory.createMessageBroker(messaging_api_1.RENDERER_CHANNEL);
                    bus.initChannel(messaging_api_2.EVENT_CHANNEL);
                    var source = bus.from(messaging_api_2.EVENT_CHANNEL);
                    async_1.ObservableWrapper.subscribe(source, function (message) { return _this._dispatchEvent(message); });
                }
                WebWorkerRootRenderer.prototype._dispatchEvent = function (message) {
                    var eventName = message['eventName'];
                    var target = message['eventTarget'];
                    var event = event_deserializer_1.deserializeGenericEvent(message['event']);
                    if (lang_1.isPresent(target)) {
                        this.globalEvents.dispatchEvent(eventNameWithTarget(target, eventName), event);
                    }
                    else {
                        var element = this._serializer.deserialize(message['element'], serializer_1.RenderStoreObject);
                        element.events.dispatchEvent(eventName, event);
                    }
                };
                WebWorkerRootRenderer.prototype.renderComponent = function (componentType) {
                    var result = this._componentRenderers.get(componentType.id);
                    if (lang_1.isBlank(result)) {
                        result = new WebWorkerRenderer(this, componentType);
                        this._componentRenderers.set(componentType.id, result);
                        var id = this._renderStore.allocateId();
                        this._renderStore.store(result, id);
                        this.runOnService('renderComponent', [
                            new client_message_broker_1.FnArg(componentType, api_1.RenderComponentType),
                            new client_message_broker_1.FnArg(result, serializer_1.RenderStoreObject),
                        ]);
                    }
                    return result;
                };
                WebWorkerRootRenderer.prototype.runOnService = function (fnName, fnArgs) {
                    var args = new client_message_broker_1.UiArguments(fnName, fnArgs);
                    this._messageBroker.runOnService(args, null);
                };
                WebWorkerRootRenderer.prototype.allocateNode = function () {
                    var result = new WebWorkerRenderNode();
                    var id = this._renderStore.allocateId();
                    this._renderStore.store(result, id);
                    return result;
                };
                WebWorkerRootRenderer.prototype.allocateId = function () { return this._renderStore.allocateId(); };
                WebWorkerRootRenderer.prototype.destroyNodes = function (nodes) {
                    for (var i = 0; i < nodes.length; i++) {
                        this._renderStore.remove(nodes[i]);
                    }
                };
                WebWorkerRootRenderer = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [client_message_broker_1.ClientMessageBrokerFactory, message_bus_1.MessageBus, serializer_1.Serializer, render_store_1.RenderStore])
                ], WebWorkerRootRenderer);
                return WebWorkerRootRenderer;
            }());
            exports_1("WebWorkerRootRenderer", WebWorkerRootRenderer);
            WebWorkerRenderer = (function () {
                function WebWorkerRenderer(_rootRenderer, _componentType) {
                    this._rootRenderer = _rootRenderer;
                    this._componentType = _componentType;
                }
                WebWorkerRenderer.prototype.renderComponent = function (componentType) {
                    return this._rootRenderer.renderComponent(componentType);
                };
                WebWorkerRenderer.prototype._runOnService = function (fnName, fnArgs) {
                    var fnArgsWithRenderer = [new client_message_broker_1.FnArg(this, serializer_1.RenderStoreObject)].concat(fnArgs);
                    this._rootRenderer.runOnService(fnName, fnArgsWithRenderer);
                };
                WebWorkerRenderer.prototype.selectRootElement = function (selector) {
                    var node = this._rootRenderer.allocateNode();
                    this._runOnService('selectRootElement', [new client_message_broker_1.FnArg(selector, null), new client_message_broker_1.FnArg(node, serializer_1.RenderStoreObject)]);
                    return node;
                };
                WebWorkerRenderer.prototype.createElement = function (parentElement, name) {
                    var node = this._rootRenderer.allocateNode();
                    this._runOnService('createElement', [
                        new client_message_broker_1.FnArg(parentElement, serializer_1.RenderStoreObject),
                        new client_message_broker_1.FnArg(name, null),
                        new client_message_broker_1.FnArg(node, serializer_1.RenderStoreObject)
                    ]);
                    return node;
                };
                WebWorkerRenderer.prototype.createViewRoot = function (hostElement) {
                    var viewRoot = this._componentType.encapsulation === view_1.ViewEncapsulation.Native ?
                        this._rootRenderer.allocateNode() :
                        hostElement;
                    this._runOnService('createViewRoot', [new client_message_broker_1.FnArg(hostElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(viewRoot, serializer_1.RenderStoreObject)]);
                    return viewRoot;
                };
                WebWorkerRenderer.prototype.createTemplateAnchor = function (parentElement) {
                    var node = this._rootRenderer.allocateNode();
                    this._runOnService('createTemplateAnchor', [new client_message_broker_1.FnArg(parentElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(node, serializer_1.RenderStoreObject)]);
                    return node;
                };
                WebWorkerRenderer.prototype.createText = function (parentElement, value) {
                    var node = this._rootRenderer.allocateNode();
                    this._runOnService('createText', [
                        new client_message_broker_1.FnArg(parentElement, serializer_1.RenderStoreObject),
                        new client_message_broker_1.FnArg(value, null),
                        new client_message_broker_1.FnArg(node, serializer_1.RenderStoreObject)
                    ]);
                    return node;
                };
                WebWorkerRenderer.prototype.projectNodes = function (parentElement, nodes) {
                    this._runOnService('projectNodes', [new client_message_broker_1.FnArg(parentElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(nodes, serializer_1.RenderStoreObject)]);
                };
                WebWorkerRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
                    this._runOnService('attachViewAfter', [new client_message_broker_1.FnArg(node, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(viewRootNodes, serializer_1.RenderStoreObject)]);
                };
                WebWorkerRenderer.prototype.detachView = function (viewRootNodes) {
                    this._runOnService('detachView', [new client_message_broker_1.FnArg(viewRootNodes, serializer_1.RenderStoreObject)]);
                };
                WebWorkerRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
                    this._runOnService('destroyView', [new client_message_broker_1.FnArg(hostElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(viewAllNodes, serializer_1.RenderStoreObject)]);
                    this._rootRenderer.destroyNodes(viewAllNodes);
                };
                WebWorkerRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
                    this._runOnService('setElementProperty', [
                        new client_message_broker_1.FnArg(renderElement, serializer_1.RenderStoreObject),
                        new client_message_broker_1.FnArg(propertyName, null),
                        new client_message_broker_1.FnArg(propertyValue, null)
                    ]);
                };
                WebWorkerRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
                    this._runOnService('setElementAttribute', [
                        new client_message_broker_1.FnArg(renderElement, serializer_1.RenderStoreObject),
                        new client_message_broker_1.FnArg(attributeName, null),
                        new client_message_broker_1.FnArg(attributeValue, null)
                    ]);
                };
                WebWorkerRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
                    this._runOnService('setBindingDebugInfo', [
                        new client_message_broker_1.FnArg(renderElement, serializer_1.RenderStoreObject),
                        new client_message_broker_1.FnArg(propertyName, null),
                        new client_message_broker_1.FnArg(propertyValue, null)
                    ]);
                };
                WebWorkerRenderer.prototype.setElementDebugInfo = function (renderElement, info) { };
                WebWorkerRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
                    this._runOnService('setElementClass', [
                        new client_message_broker_1.FnArg(renderElement, serializer_1.RenderStoreObject),
                        new client_message_broker_1.FnArg(className, null),
                        new client_message_broker_1.FnArg(isAdd, null)
                    ]);
                };
                WebWorkerRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
                    this._runOnService('setElementStyle', [
                        new client_message_broker_1.FnArg(renderElement, serializer_1.RenderStoreObject),
                        new client_message_broker_1.FnArg(styleName, null),
                        new client_message_broker_1.FnArg(styleValue, null)
                    ]);
                };
                WebWorkerRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
                    this._runOnService('invokeElementMethod', [
                        new client_message_broker_1.FnArg(renderElement, serializer_1.RenderStoreObject),
                        new client_message_broker_1.FnArg(methodName, null),
                        new client_message_broker_1.FnArg(args, null)
                    ]);
                };
                WebWorkerRenderer.prototype.setText = function (renderNode, text) {
                    this._runOnService('setText', [new client_message_broker_1.FnArg(renderNode, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(text, null)]);
                };
                WebWorkerRenderer.prototype.listen = function (renderElement, name, callback) {
                    var _this = this;
                    renderElement.events.listen(name, callback);
                    var unlistenCallbackId = this._rootRenderer.allocateId();
                    this._runOnService('listen', [
                        new client_message_broker_1.FnArg(renderElement, serializer_1.RenderStoreObject),
                        new client_message_broker_1.FnArg(name, null),
                        new client_message_broker_1.FnArg(unlistenCallbackId, null)
                    ]);
                    return function () {
                        renderElement.events.unlisten(name, callback);
                        _this._runOnService('listenDone', [new client_message_broker_1.FnArg(unlistenCallbackId, null)]);
                    };
                };
                WebWorkerRenderer.prototype.listenGlobal = function (target, name, callback) {
                    var _this = this;
                    this._rootRenderer.globalEvents.listen(eventNameWithTarget(target, name), callback);
                    var unlistenCallbackId = this._rootRenderer.allocateId();
                    this._runOnService('listenGlobal', [new client_message_broker_1.FnArg(target, null), new client_message_broker_1.FnArg(name, null), new client_message_broker_1.FnArg(unlistenCallbackId, null)]);
                    return function () {
                        _this._rootRenderer.globalEvents.unlisten(eventNameWithTarget(target, name), callback);
                        _this._runOnService('listenDone', [new client_message_broker_1.FnArg(unlistenCallbackId, null)]);
                    };
                };
                return WebWorkerRenderer;
            }());
            exports_1("WebWorkerRenderer", WebWorkerRenderer);
            NamedEventEmitter = (function () {
                function NamedEventEmitter() {
                }
                NamedEventEmitter.prototype._getListeners = function (eventName) {
                    if (lang_1.isBlank(this._listeners)) {
                        this._listeners = new Map();
                    }
                    var listeners = this._listeners.get(eventName);
                    if (lang_1.isBlank(listeners)) {
                        listeners = [];
                        this._listeners.set(eventName, listeners);
                    }
                    return listeners;
                };
                NamedEventEmitter.prototype.listen = function (eventName, callback) { this._getListeners(eventName).push(callback); };
                NamedEventEmitter.prototype.unlisten = function (eventName, callback) {
                    collection_1.ListWrapper.remove(this._getListeners(eventName), callback);
                };
                NamedEventEmitter.prototype.dispatchEvent = function (eventName, event) {
                    var listeners = this._getListeners(eventName);
                    for (var i = 0; i < listeners.length; i++) {
                        listeners[i](event);
                    }
                };
                return NamedEventEmitter;
            }());
            exports_1("NamedEventEmitter", NamedEventEmitter);
            WebWorkerRenderNode = (function () {
                function WebWorkerRenderNode() {
                    this.events = new NamedEventEmitter();
                }
                return WebWorkerRenderNode;
            }());
            exports_1("WebWorkerRenderNode", WebWorkerRenderNode);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQXdSQSw2QkFBNkIsTUFBYyxFQUFFLFNBQWlCO1FBQzVELE1BQU0sQ0FBSSxNQUFNLFNBQUksU0FBVyxDQUFDO0lBQ2xDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBalFEO2dCQU1FLCtCQUFZLG9CQUFnRCxFQUFFLEdBQWUsRUFDekQsV0FBdUIsRUFBVSxZQUF5QjtvQkFQaEYsaUJBNkRDO29CQXREcUIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7b0JBQVUsaUJBQVksR0FBWixZQUFZLENBQWE7b0JBTHZFLGlCQUFZLEdBQXNCLElBQUksaUJBQWlCLEVBQUUsQ0FBQztvQkFDekQsd0JBQW1CLEdBQ3ZCLElBQUksR0FBRyxFQUE2QixDQUFDO29CQUl2QyxJQUFJLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLGdDQUFnQixDQUFDLENBQUM7b0JBQ2pGLEdBQUcsQ0FBQyxXQUFXLENBQUMsNkJBQWEsQ0FBQyxDQUFDO29CQUMvQixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLDZCQUFhLENBQUMsQ0FBQztvQkFDckMseUJBQWlCLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxVQUFDLE9BQU8sSUFBSyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQztnQkFDakYsQ0FBQztnQkFFTyw4Q0FBYyxHQUF0QixVQUF1QixPQUE2QjtvQkFDbEQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNyQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3BDLElBQUksS0FBSyxHQUFHLDRDQUF1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QUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzlELENBQUM7Z0JBRUQseUNBQWEsR0FBYixVQUFjLFNBQWlCLEVBQUUsS0FBVTtvQkFDekMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDOUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQzFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdEIsQ0FBQztnQkFDSCxDQUFDO2dCQUNILHdCQUFDO1lBQUQsQ0EzQkEsQUEyQkMsSUFBQTtZQTNCRCxpREEyQkMsQ0FBQTtZQU1EO2dCQUFBO29CQUFtQyxXQUFNLEdBQXNCLElBQUksaUJBQWlCLEVBQUUsQ0FBQztnQkFBQyxDQUFDO2dCQUFELDBCQUFDO1lBQUQsQ0FBeEYsQUFBeUYsSUFBQTtZQUF6RixxREFBeUYsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy93b3JrZXIvcmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBSZW5kZXJlcixcbiAgUm9vdFJlbmRlcmVyLFxuICBSZW5kZXJDb21wb25lbnRUeXBlLFxuICBSZW5kZXJEZWJ1Z0luZm9cbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVuZGVyL2FwaSc7XG5pbXBvcnQge1xuICBDbGllbnRNZXNzYWdlQnJva2VyLFxuICBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgRm5BcmcsXG4gIFVpQXJndW1lbnRzXG59IGZyb20gXCJhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlclwiO1xuaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmssIHByaW50fSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nXCI7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvcmUvZGlcIjtcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlJztcbmltcG9ydCB7UkVOREVSRVJfQ0hBTk5FTH0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdpbmdfYXBpJztcbmltcG9ydCB7U2VyaWFsaXplciwgUmVuZGVyU3RvcmVPYmplY3R9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge0VWRU5UX0NIQU5ORUx9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIE9ic2VydmFibGVXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7Vmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhL3ZpZXcnO1xuaW1wb3J0IHtkZXNlcmlhbGl6ZUdlbmVyaWNFdmVudH0gZnJvbSAnLi9ldmVudF9kZXNlcmlhbGl6ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2ViV29ya2VyUm9vdFJlbmRlcmVyIGltcGxlbWVudHMgUm9vdFJlbmRlcmVyIHtcbiAgcHJpdmF0ZSBfbWVzc2FnZUJyb2tlcjtcbiAgcHVibGljIGdsb2JhbEV2ZW50czogTmFtZWRFdmVudEVtaXR0ZXIgPSBuZXcgTmFtZWRFdmVudEVtaXR0ZXIoKTtcbiAgcHJpdmF0ZSBfY29tcG9uZW50UmVuZGVyZXJzOiBNYXA8c3RyaW5nLCBXZWJXb3JrZXJSZW5kZXJlcj4gPVxuICAgICAgbmV3IE1hcDxzdHJpbmcsIFdlYldvcmtlclJlbmRlcmVyPigpO1xuXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2VCcm9rZXJGYWN0b3J5OiBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwgYnVzOiBNZXNzYWdlQnVzLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyLCBwcml2YXRlIF9yZW5kZXJTdG9yZTogUmVuZGVyU3RvcmUpIHtcbiAgICB0aGlzLl9tZXNzYWdlQnJva2VyID0gbWVzc2FnZUJyb2tlckZhY3RvcnkuY3JlYXRlTWVzc2FnZUJyb2tlcihSRU5ERVJFUl9DSEFOTkVMKTtcbiAgICBidXMuaW5pdENoYW5uZWwoRVZFTlRfQ0hBTk5FTCk7XG4gICAgdmFyIHNvdXJjZSA9IGJ1cy5mcm9tKEVWRU5UX0NIQU5ORUwpO1xuICAgIE9ic2VydmFibGVXcmFwcGVyLnN1YnNjcmliZShzb3VyY2UsIChtZXNzYWdlKSA9PiB0aGlzLl9kaXNwYXRjaEV2ZW50KG1lc3NhZ2UpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc3BhdGNoRXZlbnQobWVzc2FnZToge1trZXk6IHN0cmluZ106IGFueX0pOiB2b2lkIHtcbiAgICB2YXIgZXZlbnROYW1lID0gbWVzc2FnZVsnZXZlbnROYW1lJ107XG4gICAgdmFyIHRhcmdldCA9IG1lc3NhZ2VbJ2V2ZW50VGFyZ2V0J107XG4gICAgdmFyIGV2ZW50ID0gZGVzZXJpYWxpemVHZW5lcmljRXZlbnQobWVzc2FnZVsnZXZlbnQnXSk7XG4gICAgaWYgKGlzUHJlc2VudCh0YXJnZXQpKSB7XG4gICAgICB0aGlzLmdsb2JhbEV2ZW50cy5kaXNwYXRjaEV2ZW50KGV2ZW50TmFtZVdpdGhUYXJnZXQodGFyZ2V0LCBldmVudE5hbWUpLCBldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBlbGVtZW50ID1cbiAgICAgICAgICA8V2ViV29ya2VyUmVuZGVyTm9kZT50aGlzLl9zZXJpYWxpemVyLmRlc2VyaWFsaXplKG1lc3NhZ2VbJ2VsZW1lbnQnXSwgUmVuZGVyU3RvcmVPYmplY3QpO1xuICAgICAgZWxlbWVudC5ldmVudHMuZGlzcGF0Y2hFdmVudChldmVudE5hbWUsIGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICByZW5kZXJDb21wb25lbnQoY29tcG9uZW50VHlwZTogUmVuZGVyQ29tcG9uZW50VHlwZSk6IFJlbmRlcmVyIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5fY29tcG9uZW50UmVuZGVyZXJzLmdldChjb21wb25lbnRUeXBlLmlkKTtcbiAgICBpZiAoaXNCbGFuayhyZXN1bHQpKSB7XG4gICAgICByZXN1bHQgPSBuZXcgV2ViV29ya2VyUmVuZGVyZXIodGhpcywgY29tcG9uZW50VHlwZSk7XG4gICAgICB0aGlzLl9jb21wb25lbnRSZW5kZXJlcnMuc2V0KGNvbXBvbmVudFR5cGUuaWQsIHJlc3VsdCk7XG4gICAgICB2YXIgaWQgPSB0aGlzLl9yZW5kZXJTdG9yZS5hbGxvY2F0ZUlkKCk7XG4gICAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyZXN1bHQsIGlkKTtcbiAgICAgIHRoaXMucnVuT25TZXJ2aWNlKCdyZW5kZXJDb21wb25lbnQnLCBbXG4gICAgICAgIG5ldyBGbkFyZyhjb21wb25lbnRUeXBlLCBSZW5kZXJDb21wb25lbnRUeXBlKSxcbiAgICAgICAgbmV3IEZuQXJnKHJlc3VsdCwgUmVuZGVyU3RvcmVPYmplY3QpLFxuICAgICAgXSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBydW5PblNlcnZpY2UoZm5OYW1lOiBzdHJpbmcsIGZuQXJnczogRm5BcmdbXSkge1xuICAgIHZhciBhcmdzID0gbmV3IFVpQXJndW1lbnRzKGZuTmFtZSwgZm5BcmdzKTtcbiAgICB0aGlzLl9tZXNzYWdlQnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIGFsbG9jYXRlTm9kZSgpOiBXZWJXb3JrZXJSZW5kZXJOb2RlIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IFdlYldvcmtlclJlbmRlck5vZGUoKTtcbiAgICB2YXIgaWQgPSB0aGlzLl9yZW5kZXJTdG9yZS5hbGxvY2F0ZUlkKCk7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUocmVzdWx0LCBpZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGFsbG9jYXRlSWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3JlbmRlclN0b3JlLmFsbG9jYXRlSWQoKTsgfVxuXG4gIGRlc3Ryb3lOb2Rlcyhub2RlczogYW55W10pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9yZW5kZXJTdG9yZS5yZW1vdmUobm9kZXNbaV0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgV2ViV29ya2VyUmVuZGVyZXIgaW1wbGVtZW50cyBSZW5kZXJlciwgUmVuZGVyU3RvcmVPYmplY3Qge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb290UmVuZGVyZXI6IFdlYldvcmtlclJvb3RSZW5kZXJlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfY29tcG9uZW50VHlwZTogUmVuZGVyQ29tcG9uZW50VHlwZSkge31cblxuICByZW5kZXJDb21wb25lbnQoY29tcG9uZW50VHlwZTogUmVuZGVyQ29tcG9uZW50VHlwZSk6IFJlbmRlcmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcm9vdFJlbmRlcmVyLnJlbmRlckNvbXBvbmVudChjb21wb25lbnRUeXBlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3J1bk9uU2VydmljZShmbk5hbWU6IHN0cmluZywgZm5BcmdzOiBGbkFyZ1tdKSB7XG4gICAgdmFyIGZuQXJnc1dpdGhSZW5kZXJlciA9IFtuZXcgRm5BcmcodGhpcywgUmVuZGVyU3RvcmVPYmplY3QpXS5jb25jYXQoZm5BcmdzKTtcbiAgICB0aGlzLl9yb290UmVuZGVyZXIucnVuT25TZXJ2aWNlKGZuTmFtZSwgZm5BcmdzV2l0aFJlbmRlcmVyKTtcbiAgfVxuXG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcpOiBhbnkge1xuICAgIHZhciBub2RlID0gdGhpcy5fcm9vdFJlbmRlcmVyLmFsbG9jYXRlTm9kZSgpO1xuICAgIHRoaXMuX3J1bk9uU2VydmljZSgnc2VsZWN0Um9vdEVsZW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICBbbmV3IEZuQXJnKHNlbGVjdG9yLCBudWxsKSwgbmV3IEZuQXJnKG5vZGUsIFJlbmRlclN0b3JlT2JqZWN0KV0pO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChwYXJlbnRFbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLl9yb290UmVuZGVyZXIuYWxsb2NhdGVOb2RlKCk7XG4gICAgdGhpcy5fcnVuT25TZXJ2aWNlKCdjcmVhdGVFbGVtZW50JywgW1xuICAgICAgbmV3IEZuQXJnKHBhcmVudEVsZW1lbnQsIFJlbmRlclN0b3JlT2JqZWN0KSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lLCBudWxsKSxcbiAgICAgIG5ldyBGbkFyZyhub2RlLCBSZW5kZXJTdG9yZU9iamVjdClcbiAgICBdKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGNyZWF0ZVZpZXdSb290KGhvc3RFbGVtZW50OiBhbnkpOiBhbnkge1xuICAgIHZhciB2aWV3Um9vdCA9IHRoaXMuX2NvbXBvbmVudFR5cGUuZW5jYXBzdWxhdGlvbiA9PT0gVmlld0VuY2Fwc3VsYXRpb24uTmF0aXZlID9cbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm9vdFJlbmRlcmVyLmFsbG9jYXRlTm9kZSgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgaG9zdEVsZW1lbnQ7XG4gICAgdGhpcy5fcnVuT25TZXJ2aWNlKFxuICAgICAgICAnY3JlYXRlVmlld1Jvb3QnLFxuICAgICAgICBbbmV3IEZuQXJnKGhvc3RFbGVtZW50LCBSZW5kZXJTdG9yZU9iamVjdCksIG5ldyBGbkFyZyh2aWV3Um9vdCwgUmVuZGVyU3RvcmVPYmplY3QpXSk7XG4gICAgcmV0dXJuIHZpZXdSb290O1xuICB9XG5cbiAgY3JlYXRlVGVtcGxhdGVBbmNob3IocGFyZW50RWxlbWVudDogYW55KTogYW55IHtcbiAgICB2YXIgbm9kZSA9IHRoaXMuX3Jvb3RSZW5kZXJlci5hbGxvY2F0ZU5vZGUoKTtcbiAgICB0aGlzLl9ydW5PblNlcnZpY2UoXG4gICAgICAgICdjcmVhdGVUZW1wbGF0ZUFuY2hvcicsXG4gICAgICAgIFtuZXcgRm5BcmcocGFyZW50RWxlbWVudCwgUmVuZGVyU3RvcmVPYmplY3QpLCBuZXcgRm5Bcmcobm9kZSwgUmVuZGVyU3RvcmVPYmplY3QpXSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBjcmVhdGVUZXh0KHBhcmVudEVsZW1lbnQ6IGFueSwgdmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLl9yb290UmVuZGVyZXIuYWxsb2NhdGVOb2RlKCk7XG4gICAgdGhpcy5fcnVuT25TZXJ2aWNlKCdjcmVhdGVUZXh0JywgW1xuICAgICAgbmV3IEZuQXJnKHBhcmVudEVsZW1lbnQsIFJlbmRlclN0b3JlT2JqZWN0KSxcbiAgICAgIG5ldyBGbkFyZyh2YWx1ZSwgbnVsbCksXG4gICAgICBuZXcgRm5Bcmcobm9kZSwgUmVuZGVyU3RvcmVPYmplY3QpXG4gICAgXSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBwcm9qZWN0Tm9kZXMocGFyZW50RWxlbWVudDogYW55LCBub2RlczogYW55W10pIHtcbiAgICB0aGlzLl9ydW5PblNlcnZpY2UoXG4gICAgICAgICdwcm9qZWN0Tm9kZXMnLFxuICAgICAgICBbbmV3IEZuQXJnKHBhcmVudEVsZW1lbnQsIFJlbmRlclN0b3JlT2JqZWN0KSwgbmV3IEZuQXJnKG5vZGVzLCBSZW5kZXJTdG9yZU9iamVjdCldKTtcbiAgfVxuXG4gIGF0dGFjaFZpZXdBZnRlcihub2RlOiBhbnksIHZpZXdSb290Tm9kZXM6IGFueVtdKSB7XG4gICAgdGhpcy5fcnVuT25TZXJ2aWNlKFxuICAgICAgICAnYXR0YWNoVmlld0FmdGVyJyxcbiAgICAgICAgW25ldyBGbkFyZyhub2RlLCBSZW5kZXJTdG9yZU9iamVjdCksIG5ldyBGbkFyZyh2aWV3Um9vdE5vZGVzLCBSZW5kZXJTdG9yZU9iamVjdCldKTtcbiAgfVxuXG4gIGRldGFjaFZpZXcodmlld1Jvb3ROb2RlczogYW55W10pIHtcbiAgICB0aGlzLl9ydW5PblNlcnZpY2UoJ2RldGFjaFZpZXcnLCBbbmV3IEZuQXJnKHZpZXdSb290Tm9kZXMsIFJlbmRlclN0b3JlT2JqZWN0KV0pO1xuICB9XG5cbiAgZGVzdHJveVZpZXcoaG9zdEVsZW1lbnQ6IGFueSwgdmlld0FsbE5vZGVzOiBhbnlbXSkge1xuICAgIHRoaXMuX3J1bk9uU2VydmljZShcbiAgICAgICAgJ2Rlc3Ryb3lWaWV3JyxcbiAgICAgICAgW25ldyBGbkFyZyhob3N0RWxlbWVudCwgUmVuZGVyU3RvcmVPYmplY3QpLCBuZXcgRm5Bcmcodmlld0FsbE5vZGVzLCBSZW5kZXJTdG9yZU9iamVjdCldKTtcbiAgICB0aGlzLl9yb290UmVuZGVyZXIuZGVzdHJveU5vZGVzKHZpZXdBbGxOb2Rlcyk7XG4gIH1cblxuICBzZXRFbGVtZW50UHJvcGVydHkocmVuZGVyRWxlbWVudDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogYW55KSB7XG4gICAgdGhpcy5fcnVuT25TZXJ2aWNlKCdzZXRFbGVtZW50UHJvcGVydHknLCBbXG4gICAgICBuZXcgRm5BcmcocmVuZGVyRWxlbWVudCwgUmVuZGVyU3RvcmVPYmplY3QpLFxuICAgICAgbmV3IEZuQXJnKHByb3BlcnR5TmFtZSwgbnVsbCksXG4gICAgICBuZXcgRm5BcmcocHJvcGVydHlWYWx1ZSwgbnVsbClcbiAgICBdKTtcbiAgfVxuXG4gIHNldEVsZW1lbnRBdHRyaWJ1dGUocmVuZGVyRWxlbWVudDogYW55LCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIGF0dHJpYnV0ZVZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9ydW5PblNlcnZpY2UoJ3NldEVsZW1lbnRBdHRyaWJ1dGUnLCBbXG4gICAgICBuZXcgRm5BcmcocmVuZGVyRWxlbWVudCwgUmVuZGVyU3RvcmVPYmplY3QpLFxuICAgICAgbmV3IEZuQXJnKGF0dHJpYnV0ZU5hbWUsIG51bGwpLFxuICAgICAgbmV3IEZuQXJnKGF0dHJpYnV0ZVZhbHVlLCBudWxsKVxuICAgIF0pO1xuICB9XG5cbiAgc2V0QmluZGluZ0RlYnVnSW5mbyhyZW5kZXJFbGVtZW50OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLCBwcm9wZXJ0eVZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9ydW5PblNlcnZpY2UoJ3NldEJpbmRpbmdEZWJ1Z0luZm8nLCBbXG4gICAgICBuZXcgRm5BcmcocmVuZGVyRWxlbWVudCwgUmVuZGVyU3RvcmVPYmplY3QpLFxuICAgICAgbmV3IEZuQXJnKHByb3BlcnR5TmFtZSwgbnVsbCksXG4gICAgICBuZXcgRm5BcmcocHJvcGVydHlWYWx1ZSwgbnVsbClcbiAgICBdKTtcbiAgfVxuXG4gIHNldEVsZW1lbnREZWJ1Z0luZm8ocmVuZGVyRWxlbWVudDogYW55LCBpbmZvOiBSZW5kZXJEZWJ1Z0luZm8pIHt9XG5cbiAgc2V0RWxlbWVudENsYXNzKHJlbmRlckVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcsIGlzQWRkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcnVuT25TZXJ2aWNlKCdzZXRFbGVtZW50Q2xhc3MnLCBbXG4gICAgICBuZXcgRm5BcmcocmVuZGVyRWxlbWVudCwgUmVuZGVyU3RvcmVPYmplY3QpLFxuICAgICAgbmV3IEZuQXJnKGNsYXNzTmFtZSwgbnVsbCksXG4gICAgICBuZXcgRm5BcmcoaXNBZGQsIG51bGwpXG4gICAgXSk7XG4gIH1cblxuICBzZXRFbGVtZW50U3R5bGUocmVuZGVyRWxlbWVudDogYW55LCBzdHlsZU5hbWU6IHN0cmluZywgc3R5bGVWYWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcnVuT25TZXJ2aWNlKCdzZXRFbGVtZW50U3R5bGUnLCBbXG4gICAgICBuZXcgRm5BcmcocmVuZGVyRWxlbWVudCwgUmVuZGVyU3RvcmVPYmplY3QpLFxuICAgICAgbmV3IEZuQXJnKHN0eWxlTmFtZSwgbnVsbCksXG4gICAgICBuZXcgRm5Bcmcoc3R5bGVWYWx1ZSwgbnVsbClcbiAgICBdKTtcbiAgfVxuXG4gIGludm9rZUVsZW1lbnRNZXRob2QocmVuZGVyRWxlbWVudDogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGFyZ3M6IGFueVtdKSB7XG4gICAgdGhpcy5fcnVuT25TZXJ2aWNlKCdpbnZva2VFbGVtZW50TWV0aG9kJywgW1xuICAgICAgbmV3IEZuQXJnKHJlbmRlckVsZW1lbnQsIFJlbmRlclN0b3JlT2JqZWN0KSxcbiAgICAgIG5ldyBGbkFyZyhtZXRob2ROYW1lLCBudWxsKSxcbiAgICAgIG5ldyBGbkFyZyhhcmdzLCBudWxsKVxuICAgIF0pO1xuICB9XG5cbiAgc2V0VGV4dChyZW5kZXJOb2RlOiBhbnksIHRleHQ6IHN0cmluZykge1xuICAgIHRoaXMuX3J1bk9uU2VydmljZSgnc2V0VGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICAgIFtuZXcgRm5BcmcocmVuZGVyTm9kZSwgUmVuZGVyU3RvcmVPYmplY3QpLCBuZXcgRm5BcmcodGV4dCwgbnVsbCldKTtcbiAgfVxuXG4gIGxpc3RlbihyZW5kZXJFbGVtZW50OiBXZWJXb3JrZXJSZW5kZXJOb2RlLCBuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICByZW5kZXJFbGVtZW50LmV2ZW50cy5saXN0ZW4obmFtZSwgY2FsbGJhY2spO1xuICAgIHZhciB1bmxpc3RlbkNhbGxiYWNrSWQgPSB0aGlzLl9yb290UmVuZGVyZXIuYWxsb2NhdGVJZCgpO1xuICAgIHRoaXMuX3J1bk9uU2VydmljZSgnbGlzdGVuJywgW1xuICAgICAgbmV3IEZuQXJnKHJlbmRlckVsZW1lbnQsIFJlbmRlclN0b3JlT2JqZWN0KSxcbiAgICAgIG5ldyBGbkFyZyhuYW1lLCBudWxsKSxcbiAgICAgIG5ldyBGbkFyZyh1bmxpc3RlbkNhbGxiYWNrSWQsIG51bGwpXG4gICAgXSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHJlbmRlckVsZW1lbnQuZXZlbnRzLnVubGlzdGVuKG5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIHRoaXMuX3J1bk9uU2VydmljZSgnbGlzdGVuRG9uZScsIFtuZXcgRm5BcmcodW5saXN0ZW5DYWxsYmFja0lkLCBudWxsKV0pO1xuICAgIH07XG4gIH1cblxuICBsaXN0ZW5HbG9iYWwodGFyZ2V0OiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIHRoaXMuX3Jvb3RSZW5kZXJlci5nbG9iYWxFdmVudHMubGlzdGVuKGV2ZW50TmFtZVdpdGhUYXJnZXQodGFyZ2V0LCBuYW1lKSwgY2FsbGJhY2spO1xuICAgIHZhciB1bmxpc3RlbkNhbGxiYWNrSWQgPSB0aGlzLl9yb290UmVuZGVyZXIuYWxsb2NhdGVJZCgpO1xuICAgIHRoaXMuX3J1bk9uU2VydmljZShcbiAgICAgICAgJ2xpc3Rlbkdsb2JhbCcsXG4gICAgICAgIFtuZXcgRm5BcmcodGFyZ2V0LCBudWxsKSwgbmV3IEZuQXJnKG5hbWUsIG51bGwpLCBuZXcgRm5BcmcodW5saXN0ZW5DYWxsYmFja0lkLCBudWxsKV0pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLl9yb290UmVuZGVyZXIuZ2xvYmFsRXZlbnRzLnVubGlzdGVuKGV2ZW50TmFtZVdpdGhUYXJnZXQodGFyZ2V0LCBuYW1lKSwgY2FsbGJhY2spO1xuICAgICAgdGhpcy5fcnVuT25TZXJ2aWNlKCdsaXN0ZW5Eb25lJywgW25ldyBGbkFyZyh1bmxpc3RlbkNhbGxiYWNrSWQsIG51bGwpXSk7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTmFtZWRFdmVudEVtaXR0ZXIge1xuICBwcml2YXRlIF9saXN0ZW5lcnM6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uW10+O1xuXG4gIHByaXZhdGUgX2dldExpc3RlbmVycyhldmVudE5hbWU6IHN0cmluZyk6IEZ1bmN0aW9uW10ge1xuICAgIGlmIChpc0JsYW5rKHRoaXMuX2xpc3RlbmVycykpIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycyA9IG5ldyBNYXA8c3RyaW5nLCBGdW5jdGlvbltdPigpO1xuICAgIH1cbiAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzLmdldChldmVudE5hbWUpO1xuICAgIGlmIChpc0JsYW5rKGxpc3RlbmVycykpIHtcbiAgICAgIGxpc3RlbmVycyA9IFtdO1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLnNldChldmVudE5hbWUsIGxpc3RlbmVycyk7XG4gICAgfVxuICAgIHJldHVybiBsaXN0ZW5lcnM7XG4gIH1cblxuICBsaXN0ZW4oZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikgeyB0aGlzLl9nZXRMaXN0ZW5lcnMoZXZlbnROYW1lKS5wdXNoKGNhbGxiYWNrKTsgfVxuXG4gIHVubGlzdGVuKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBMaXN0V3JhcHBlci5yZW1vdmUodGhpcy5fZ2V0TGlzdGVuZXJzKGV2ZW50TmFtZSksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50OiBhbnkpIHtcbiAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZ2V0TGlzdGVuZXJzKGV2ZW50TmFtZSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxpc3RlbmVyc1tpXShldmVudCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGV2ZW50TmFtZVdpdGhUYXJnZXQodGFyZ2V0OiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3RhcmdldH06JHtldmVudE5hbWV9YDtcbn1cblxuZXhwb3J0IGNsYXNzIFdlYldvcmtlclJlbmRlck5vZGUgeyBldmVudHM6IE5hbWVkRXZlbnRFbWl0dGVyID0gbmV3IE5hbWVkRXZlbnRFbWl0dGVyKCk7IH1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
