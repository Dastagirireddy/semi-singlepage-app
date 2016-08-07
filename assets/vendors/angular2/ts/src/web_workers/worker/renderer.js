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
                WebWorkerRenderer.prototype._runOnService = function (fnName, fnArgs) {
                    var fnArgsWithRenderer = [new client_message_broker_1.FnArg(this, serializer_1.RenderStoreObject)].concat(fnArgs);
                    this._rootRenderer.runOnService(fnName, fnArgsWithRenderer);
                };
                WebWorkerRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
                    var node = this._rootRenderer.allocateNode();
                    this._runOnService('selectRootElement', [new client_message_broker_1.FnArg(selectorOrNode, null), new client_message_broker_1.FnArg(node, serializer_1.RenderStoreObject)]);
                    return node;
                };
                WebWorkerRenderer.prototype.createElement = function (parentElement, name, debugInfo) {
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
                WebWorkerRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
                    var node = this._rootRenderer.allocateNode();
                    this._runOnService('createTemplateAnchor', [new client_message_broker_1.FnArg(parentElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(node, serializer_1.RenderStoreObject)]);
                    return node;
                };
                WebWorkerRenderer.prototype.createText = function (parentElement, value, debugInfo) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy93b3JrZXIvcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFrUkEsNkJBQTZCLE1BQWMsRUFBRSxTQUFpQjtRQUM1RCxNQUFNLENBQUksTUFBTSxTQUFJLFNBQVcsQ0FBQztJQUNsQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQTNQRDtnQkFNRSwrQkFBWSxvQkFBZ0QsRUFBRSxHQUFlLEVBQ3pELFdBQXVCLEVBQVUsWUFBeUI7b0JBUGhGLGlCQTZEQztvQkF0RHFCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO29CQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO29CQUx2RSxpQkFBWSxHQUFzQixJQUFJLGlCQUFpQixFQUFFLENBQUM7b0JBQ3pELHdCQUFtQixHQUN2QixJQUFJLEdBQUcsRUFBNkIsQ0FBQztvQkFJdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxnQ0FBZ0IsQ0FBQyxDQUFDO29CQUNqRixHQUFHLENBQUMsV0FBVyxDQUFDLDZCQUFhLENBQUMsQ0FBQztvQkFDL0IsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyw2QkFBYSxDQUFDLENBQUM7b0JBQ3JDLHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsVUFBQyxPQUFPLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQUM7Z0JBQ2pGLENBQUM7Z0JBRU8sOENBQWMsR0FBdEIsVUFBdUIsT0FBNkI7b0JBQ2xELElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDckMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNwQyxJQUFJLEtBQUssR0FBRyw0Q0FBdUIsQ0FB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QUFTLENBQUMsQ0FBQztvQkFDOUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQzFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdEIsQ0FBQztnQkFDSCxDQUFDO2dCQUNILHdCQUFDO1lBQUQsQ0EzQkEsQUEyQkMsSUFBQTtZQTNCRCxpREEyQkMsQ0FBQTtZQU1EO2dCQUFBO29CQUFtQyxXQUFNLEdBQXNCLElBQUksaUJBQWlCLEVBQUUsQ0FBQztnQkFBQyxDQUFDO2dCQUFELDBCQUFDO1lBQUQsQ0FBeEYsQUFBeUYsSUFBQTtZQUF6RixxREFBeUYsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvd2ViX3dvcmtlcnMvd29ya2VyL3JlbmRlcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUmVuZGVyZXIsXG4gIFJvb3RSZW5kZXJlcixcbiAgUmVuZGVyQ29tcG9uZW50VHlwZSxcbiAgUmVuZGVyRGVidWdJbmZvXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlbmRlci9hcGknO1xuaW1wb3J0IHtcbiAgQ2xpZW50TWVzc2FnZUJyb2tlcixcbiAgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gIEZuQXJnLFxuICBVaUFyZ3VtZW50c1xufSBmcm9tIFwiYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXJcIjtcbmltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rLCBwcmludH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZ1wiO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL2RpXCI7XG5pbXBvcnQge1JlbmRlclN0b3JlfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3JlbmRlcl9zdG9yZSc7XG5pbXBvcnQge1JFTkRFUkVSX0NIQU5ORUx9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFJlbmRlclN0b3JlT2JqZWN0fSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtFVkVOVF9DSEFOTkVMfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YS92aWV3JztcbmltcG9ydCB7ZGVzZXJpYWxpemVHZW5lcmljRXZlbnR9IGZyb20gJy4vZXZlbnRfZGVzZXJpYWxpemVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYldvcmtlclJvb3RSZW5kZXJlciBpbXBsZW1lbnRzIFJvb3RSZW5kZXJlciB7XG4gIHByaXZhdGUgX21lc3NhZ2VCcm9rZXI7XG4gIHB1YmxpYyBnbG9iYWxFdmVudHM6IE5hbWVkRXZlbnRFbWl0dGVyID0gbmV3IE5hbWVkRXZlbnRFbWl0dGVyKCk7XG4gIHByaXZhdGUgX2NvbXBvbmVudFJlbmRlcmVyczogTWFwPHN0cmluZywgV2ViV29ya2VyUmVuZGVyZXI+ID1cbiAgICAgIG5ldyBNYXA8c3RyaW5nLCBXZWJXb3JrZXJSZW5kZXJlcj4oKTtcblxuICBjb25zdHJ1Y3RvcihtZXNzYWdlQnJva2VyRmFjdG9yeTogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksIGJ1czogTWVzc2FnZUJ1cyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplciwgcHJpdmF0ZSBfcmVuZGVyU3RvcmU6IFJlbmRlclN0b3JlKSB7XG4gICAgdGhpcy5fbWVzc2FnZUJyb2tlciA9IG1lc3NhZ2VCcm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoUkVOREVSRVJfQ0hBTk5FTCk7XG4gICAgYnVzLmluaXRDaGFubmVsKEVWRU5UX0NIQU5ORUwpO1xuICAgIHZhciBzb3VyY2UgPSBidXMuZnJvbShFVkVOVF9DSEFOTkVMKTtcbiAgICBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUoc291cmNlLCAobWVzc2FnZSkgPT4gdGhpcy5fZGlzcGF0Y2hFdmVudChtZXNzYWdlKSk7XG4gIH1cblxuICBwcml2YXRlIF9kaXNwYXRjaEV2ZW50KG1lc3NhZ2U6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogdm9pZCB7XG4gICAgdmFyIGV2ZW50TmFtZSA9IG1lc3NhZ2VbJ2V2ZW50TmFtZSddO1xuICAgIHZhciB0YXJnZXQgPSBtZXNzYWdlWydldmVudFRhcmdldCddO1xuICAgIHZhciBldmVudCA9IGRlc2VyaWFsaXplR2VuZXJpY0V2ZW50KG1lc3NhZ2VbJ2V2ZW50J10pO1xuICAgIGlmIChpc1ByZXNlbnQodGFyZ2V0KSkge1xuICAgICAgdGhpcy5nbG9iYWxFdmVudHMuZGlzcGF0Y2hFdmVudChldmVudE5hbWVXaXRoVGFyZ2V0KHRhcmdldCwgZXZlbnROYW1lKSwgZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZWxlbWVudCA9XG4gICAgICAgICAgPFdlYldvcmtlclJlbmRlck5vZGU+dGhpcy5fc2VyaWFsaXplci5kZXNlcmlhbGl6ZShtZXNzYWdlWydlbGVtZW50J10sIFJlbmRlclN0b3JlT2JqZWN0KTtcbiAgICAgIGVsZW1lbnQuZXZlbnRzLmRpc3BhdGNoRXZlbnQoZXZlbnROYW1lLCBldmVudCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudFR5cGU6IFJlbmRlckNvbXBvbmVudFR5cGUpOiBSZW5kZXJlciB7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuX2NvbXBvbmVudFJlbmRlcmVycy5nZXQoY29tcG9uZW50VHlwZS5pZCk7XG4gICAgaWYgKGlzQmxhbmsocmVzdWx0KSkge1xuICAgICAgcmVzdWx0ID0gbmV3IFdlYldvcmtlclJlbmRlcmVyKHRoaXMsIGNvbXBvbmVudFR5cGUpO1xuICAgICAgdGhpcy5fY29tcG9uZW50UmVuZGVyZXJzLnNldChjb21wb25lbnRUeXBlLmlkLCByZXN1bHQpO1xuICAgICAgdmFyIGlkID0gdGhpcy5fcmVuZGVyU3RvcmUuYWxsb2NhdGVJZCgpO1xuICAgICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUocmVzdWx0LCBpZCk7XG4gICAgICB0aGlzLnJ1bk9uU2VydmljZSgncmVuZGVyQ29tcG9uZW50JywgW1xuICAgICAgICBuZXcgRm5BcmcoY29tcG9uZW50VHlwZSwgUmVuZGVyQ29tcG9uZW50VHlwZSksXG4gICAgICAgIG5ldyBGbkFyZyhyZXN1bHQsIFJlbmRlclN0b3JlT2JqZWN0KSxcbiAgICAgIF0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcnVuT25TZXJ2aWNlKGZuTmFtZTogc3RyaW5nLCBmbkFyZ3M6IEZuQXJnW10pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBVaUFyZ3VtZW50cyhmbk5hbWUsIGZuQXJncyk7XG4gICAgdGhpcy5fbWVzc2FnZUJyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cblxuICBhbGxvY2F0ZU5vZGUoKTogV2ViV29ya2VyUmVuZGVyTm9kZSB7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBXZWJXb3JrZXJSZW5kZXJOb2RlKCk7XG4gICAgdmFyIGlkID0gdGhpcy5fcmVuZGVyU3RvcmUuYWxsb2NhdGVJZCgpO1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHJlc3VsdCwgaWQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBhbGxvY2F0ZUlkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9yZW5kZXJTdG9yZS5hbGxvY2F0ZUlkKCk7IH1cblxuICBkZXN0cm95Tm9kZXMobm9kZXM6IGFueVtdKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fcmVuZGVyU3RvcmUucmVtb3ZlKG5vZGVzW2ldKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFdlYldvcmtlclJlbmRlcmVyIGltcGxlbWVudHMgUmVuZGVyZXIsIFJlbmRlclN0b3JlT2JqZWN0IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm9vdFJlbmRlcmVyOiBXZWJXb3JrZXJSb290UmVuZGVyZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2NvbXBvbmVudFR5cGU6IFJlbmRlckNvbXBvbmVudFR5cGUpIHt9XG5cbiAgcHJpdmF0ZSBfcnVuT25TZXJ2aWNlKGZuTmFtZTogc3RyaW5nLCBmbkFyZ3M6IEZuQXJnW10pIHtcbiAgICB2YXIgZm5BcmdzV2l0aFJlbmRlcmVyID0gW25ldyBGbkFyZyh0aGlzLCBSZW5kZXJTdG9yZU9iamVjdCldLmNvbmNhdChmbkFyZ3MpO1xuICAgIHRoaXMuX3Jvb3RSZW5kZXJlci5ydW5PblNlcnZpY2UoZm5OYW1lLCBmbkFyZ3NXaXRoUmVuZGVyZXIpO1xuICB9XG5cbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IHN0cmluZywgZGVidWdJbmZvOiBSZW5kZXJEZWJ1Z0luZm8pOiBhbnkge1xuICAgIHZhciBub2RlID0gdGhpcy5fcm9vdFJlbmRlcmVyLmFsbG9jYXRlTm9kZSgpO1xuICAgIHRoaXMuX3J1bk9uU2VydmljZSgnc2VsZWN0Um9vdEVsZW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICBbbmV3IEZuQXJnKHNlbGVjdG9yT3JOb2RlLCBudWxsKSwgbmV3IEZuQXJnKG5vZGUsIFJlbmRlclN0b3JlT2JqZWN0KV0pO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChwYXJlbnRFbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgZGVidWdJbmZvOiBSZW5kZXJEZWJ1Z0luZm8pOiBhbnkge1xuICAgIHZhciBub2RlID0gdGhpcy5fcm9vdFJlbmRlcmVyLmFsbG9jYXRlTm9kZSgpO1xuICAgIHRoaXMuX3J1bk9uU2VydmljZSgnY3JlYXRlRWxlbWVudCcsIFtcbiAgICAgIG5ldyBGbkFyZyhwYXJlbnRFbGVtZW50LCBSZW5kZXJTdG9yZU9iamVjdCksXG4gICAgICBuZXcgRm5BcmcobmFtZSwgbnVsbCksXG4gICAgICBuZXcgRm5Bcmcobm9kZSwgUmVuZGVyU3RvcmVPYmplY3QpXG4gICAgXSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBjcmVhdGVWaWV3Um9vdChob3N0RWxlbWVudDogYW55KTogYW55IHtcbiAgICB2YXIgdmlld1Jvb3QgPSB0aGlzLl9jb21wb25lbnRUeXBlLmVuY2Fwc3VsYXRpb24gPT09IFZpZXdFbmNhcHN1bGF0aW9uLk5hdGl2ZSA/XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RSZW5kZXJlci5hbGxvY2F0ZU5vZGUoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgIGhvc3RFbGVtZW50O1xuICAgIHRoaXMuX3J1bk9uU2VydmljZShcbiAgICAgICAgJ2NyZWF0ZVZpZXdSb290JyxcbiAgICAgICAgW25ldyBGbkFyZyhob3N0RWxlbWVudCwgUmVuZGVyU3RvcmVPYmplY3QpLCBuZXcgRm5Bcmcodmlld1Jvb3QsIFJlbmRlclN0b3JlT2JqZWN0KV0pO1xuICAgIHJldHVybiB2aWV3Um9vdDtcbiAgfVxuXG4gIGNyZWF0ZVRlbXBsYXRlQW5jaG9yKHBhcmVudEVsZW1lbnQ6IGFueSwgZGVidWdJbmZvOiBSZW5kZXJEZWJ1Z0luZm8pOiBhbnkge1xuICAgIHZhciBub2RlID0gdGhpcy5fcm9vdFJlbmRlcmVyLmFsbG9jYXRlTm9kZSgpO1xuICAgIHRoaXMuX3J1bk9uU2VydmljZShcbiAgICAgICAgJ2NyZWF0ZVRlbXBsYXRlQW5jaG9yJyxcbiAgICAgICAgW25ldyBGbkFyZyhwYXJlbnRFbGVtZW50LCBSZW5kZXJTdG9yZU9iamVjdCksIG5ldyBGbkFyZyhub2RlLCBSZW5kZXJTdG9yZU9iamVjdCldKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGNyZWF0ZVRleHQocGFyZW50RWxlbWVudDogYW55LCB2YWx1ZTogc3RyaW5nLCBkZWJ1Z0luZm86IFJlbmRlckRlYnVnSW5mbyk6IGFueSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLl9yb290UmVuZGVyZXIuYWxsb2NhdGVOb2RlKCk7XG4gICAgdGhpcy5fcnVuT25TZXJ2aWNlKCdjcmVhdGVUZXh0JywgW1xuICAgICAgbmV3IEZuQXJnKHBhcmVudEVsZW1lbnQsIFJlbmRlclN0b3JlT2JqZWN0KSxcbiAgICAgIG5ldyBGbkFyZyh2YWx1ZSwgbnVsbCksXG4gICAgICBuZXcgRm5Bcmcobm9kZSwgUmVuZGVyU3RvcmVPYmplY3QpXG4gICAgXSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBwcm9qZWN0Tm9kZXMocGFyZW50RWxlbWVudDogYW55LCBub2RlczogYW55W10pIHtcbiAgICB0aGlzLl9ydW5PblNlcnZpY2UoXG4gICAgICAgICdwcm9qZWN0Tm9kZXMnLFxuICAgICAgICBbbmV3IEZuQXJnKHBhcmVudEVsZW1lbnQsIFJlbmRlclN0b3JlT2JqZWN0KSwgbmV3IEZuQXJnKG5vZGVzLCBSZW5kZXJTdG9yZU9iamVjdCldKTtcbiAgfVxuXG4gIGF0dGFjaFZpZXdBZnRlcihub2RlOiBhbnksIHZpZXdSb290Tm9kZXM6IGFueVtdKSB7XG4gICAgdGhpcy5fcnVuT25TZXJ2aWNlKFxuICAgICAgICAnYXR0YWNoVmlld0FmdGVyJyxcbiAgICAgICAgW25ldyBGbkFyZyhub2RlLCBSZW5kZXJTdG9yZU9iamVjdCksIG5ldyBGbkFyZyh2aWV3Um9vdE5vZGVzLCBSZW5kZXJTdG9yZU9iamVjdCldKTtcbiAgfVxuXG4gIGRldGFjaFZpZXcodmlld1Jvb3ROb2RlczogYW55W10pIHtcbiAgICB0aGlzLl9ydW5PblNlcnZpY2UoJ2RldGFjaFZpZXcnLCBbbmV3IEZuQXJnKHZpZXdSb290Tm9kZXMsIFJlbmRlclN0b3JlT2JqZWN0KV0pO1xuICB9XG5cbiAgZGVzdHJveVZpZXcoaG9zdEVsZW1lbnQ6IGFueSwgdmlld0FsbE5vZGVzOiBhbnlbXSkge1xuICAgIHRoaXMuX3J1bk9uU2VydmljZShcbiAgICAgICAgJ2Rlc3Ryb3lWaWV3JyxcbiAgICAgICAgW25ldyBGbkFyZyhob3N0RWxlbWVudCwgUmVuZGVyU3RvcmVPYmplY3QpLCBuZXcgRm5Bcmcodmlld0FsbE5vZGVzLCBSZW5kZXJTdG9yZU9iamVjdCldKTtcbiAgICB0aGlzLl9yb290UmVuZGVyZXIuZGVzdHJveU5vZGVzKHZpZXdBbGxOb2Rlcyk7XG4gIH1cblxuICBzZXRFbGVtZW50UHJvcGVydHkocmVuZGVyRWxlbWVudDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogYW55KSB7XG4gICAgdGhpcy5fcnVuT25TZXJ2aWNlKCdzZXRFbGVtZW50UHJvcGVydHknLCBbXG4gICAgICBuZXcgRm5BcmcocmVuZGVyRWxlbWVudCwgUmVuZGVyU3RvcmVPYmplY3QpLFxuICAgICAgbmV3IEZuQXJnKHByb3BlcnR5TmFtZSwgbnVsbCksXG4gICAgICBuZXcgRm5BcmcocHJvcGVydHlWYWx1ZSwgbnVsbClcbiAgICBdKTtcbiAgfVxuXG4gIHNldEVsZW1lbnRBdHRyaWJ1dGUocmVuZGVyRWxlbWVudDogYW55LCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIGF0dHJpYnV0ZVZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9ydW5PblNlcnZpY2UoJ3NldEVsZW1lbnRBdHRyaWJ1dGUnLCBbXG4gICAgICBuZXcgRm5BcmcocmVuZGVyRWxlbWVudCwgUmVuZGVyU3RvcmVPYmplY3QpLFxuICAgICAgbmV3IEZuQXJnKGF0dHJpYnV0ZU5hbWUsIG51bGwpLFxuICAgICAgbmV3IEZuQXJnKGF0dHJpYnV0ZVZhbHVlLCBudWxsKVxuICAgIF0pO1xuICB9XG5cbiAgc2V0QmluZGluZ0RlYnVnSW5mbyhyZW5kZXJFbGVtZW50OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLCBwcm9wZXJ0eVZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9ydW5PblNlcnZpY2UoJ3NldEJpbmRpbmdEZWJ1Z0luZm8nLCBbXG4gICAgICBuZXcgRm5BcmcocmVuZGVyRWxlbWVudCwgUmVuZGVyU3RvcmVPYmplY3QpLFxuICAgICAgbmV3IEZuQXJnKHByb3BlcnR5TmFtZSwgbnVsbCksXG4gICAgICBuZXcgRm5BcmcocHJvcGVydHlWYWx1ZSwgbnVsbClcbiAgICBdKTtcbiAgfVxuXG4gIHNldEVsZW1lbnRDbGFzcyhyZW5kZXJFbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nLCBpc0FkZDogYm9vbGVhbikge1xuICAgIHRoaXMuX3J1bk9uU2VydmljZSgnc2V0RWxlbWVudENsYXNzJywgW1xuICAgICAgbmV3IEZuQXJnKHJlbmRlckVsZW1lbnQsIFJlbmRlclN0b3JlT2JqZWN0KSxcbiAgICAgIG5ldyBGbkFyZyhjbGFzc05hbWUsIG51bGwpLFxuICAgICAgbmV3IEZuQXJnKGlzQWRkLCBudWxsKVxuICAgIF0pO1xuICB9XG5cbiAgc2V0RWxlbWVudFN0eWxlKHJlbmRlckVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3J1bk9uU2VydmljZSgnc2V0RWxlbWVudFN0eWxlJywgW1xuICAgICAgbmV3IEZuQXJnKHJlbmRlckVsZW1lbnQsIFJlbmRlclN0b3JlT2JqZWN0KSxcbiAgICAgIG5ldyBGbkFyZyhzdHlsZU5hbWUsIG51bGwpLFxuICAgICAgbmV3IEZuQXJnKHN0eWxlVmFsdWUsIG51bGwpXG4gICAgXSk7XG4gIH1cblxuICBpbnZva2VFbGVtZW50TWV0aG9kKHJlbmRlckVsZW1lbnQ6IGFueSwgbWV0aG9kTmFtZTogc3RyaW5nLCBhcmdzOiBhbnlbXSkge1xuICAgIHRoaXMuX3J1bk9uU2VydmljZSgnaW52b2tlRWxlbWVudE1ldGhvZCcsIFtcbiAgICAgIG5ldyBGbkFyZyhyZW5kZXJFbGVtZW50LCBSZW5kZXJTdG9yZU9iamVjdCksXG4gICAgICBuZXcgRm5BcmcobWV0aG9kTmFtZSwgbnVsbCksXG4gICAgICBuZXcgRm5BcmcoYXJncywgbnVsbClcbiAgICBdKTtcbiAgfVxuXG4gIHNldFRleHQocmVuZGVyTm9kZTogYW55LCB0ZXh0OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9ydW5PblNlcnZpY2UoJ3NldFRleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICBbbmV3IEZuQXJnKHJlbmRlck5vZGUsIFJlbmRlclN0b3JlT2JqZWN0KSwgbmV3IEZuQXJnKHRleHQsIG51bGwpXSk7XG4gIH1cblxuICBsaXN0ZW4ocmVuZGVyRWxlbWVudDogV2ViV29ya2VyUmVuZGVyTm9kZSwgbmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gICAgcmVuZGVyRWxlbWVudC5ldmVudHMubGlzdGVuKG5hbWUsIGNhbGxiYWNrKTtcbiAgICB2YXIgdW5saXN0ZW5DYWxsYmFja0lkID0gdGhpcy5fcm9vdFJlbmRlcmVyLmFsbG9jYXRlSWQoKTtcbiAgICB0aGlzLl9ydW5PblNlcnZpY2UoJ2xpc3RlbicsIFtcbiAgICAgIG5ldyBGbkFyZyhyZW5kZXJFbGVtZW50LCBSZW5kZXJTdG9yZU9iamVjdCksXG4gICAgICBuZXcgRm5BcmcobmFtZSwgbnVsbCksXG4gICAgICBuZXcgRm5BcmcodW5saXN0ZW5DYWxsYmFja0lkLCBudWxsKVxuICAgIF0pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZW5kZXJFbGVtZW50LmV2ZW50cy51bmxpc3RlbihuYW1lLCBjYWxsYmFjayk7XG4gICAgICB0aGlzLl9ydW5PblNlcnZpY2UoJ2xpc3RlbkRvbmUnLCBbbmV3IEZuQXJnKHVubGlzdGVuQ2FsbGJhY2tJZCwgbnVsbCldKTtcbiAgICB9O1xuICB9XG5cbiAgbGlzdGVuR2xvYmFsKHRhcmdldDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICB0aGlzLl9yb290UmVuZGVyZXIuZ2xvYmFsRXZlbnRzLmxpc3RlbihldmVudE5hbWVXaXRoVGFyZ2V0KHRhcmdldCwgbmFtZSksIGNhbGxiYWNrKTtcbiAgICB2YXIgdW5saXN0ZW5DYWxsYmFja0lkID0gdGhpcy5fcm9vdFJlbmRlcmVyLmFsbG9jYXRlSWQoKTtcbiAgICB0aGlzLl9ydW5PblNlcnZpY2UoXG4gICAgICAgICdsaXN0ZW5HbG9iYWwnLFxuICAgICAgICBbbmV3IEZuQXJnKHRhcmdldCwgbnVsbCksIG5ldyBGbkFyZyhuYW1lLCBudWxsKSwgbmV3IEZuQXJnKHVubGlzdGVuQ2FsbGJhY2tJZCwgbnVsbCldKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdGhpcy5fcm9vdFJlbmRlcmVyLmdsb2JhbEV2ZW50cy51bmxpc3RlbihldmVudE5hbWVXaXRoVGFyZ2V0KHRhcmdldCwgbmFtZSksIGNhbGxiYWNrKTtcbiAgICAgIHRoaXMuX3J1bk9uU2VydmljZSgnbGlzdGVuRG9uZScsIFtuZXcgRm5BcmcodW5saXN0ZW5DYWxsYmFja0lkLCBudWxsKV0pO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE5hbWVkRXZlbnRFbWl0dGVyIHtcbiAgcHJpdmF0ZSBfbGlzdGVuZXJzOiBNYXA8c3RyaW5nLCBGdW5jdGlvbltdPjtcblxuICBwcml2YXRlIF9nZXRMaXN0ZW5lcnMoZXZlbnROYW1lOiBzdHJpbmcpOiBGdW5jdGlvbltdIHtcbiAgICBpZiAoaXNCbGFuayh0aGlzLl9saXN0ZW5lcnMpKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMgPSBuZXcgTWFwPHN0cmluZywgRnVuY3Rpb25bXT4oKTtcbiAgICB9XG4gICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycy5nZXQoZXZlbnROYW1lKTtcbiAgICBpZiAoaXNCbGFuayhsaXN0ZW5lcnMpKSB7XG4gICAgICBsaXN0ZW5lcnMgPSBbXTtcbiAgICAgIHRoaXMuX2xpc3RlbmVycy5zZXQoZXZlbnROYW1lLCBsaXN0ZW5lcnMpO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdGVuZXJzO1xuICB9XG5cbiAgbGlzdGVuKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHsgdGhpcy5fZ2V0TGlzdGVuZXJzKGV2ZW50TmFtZSkucHVzaChjYWxsYmFjayk7IH1cblxuICB1bmxpc3RlbihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgTGlzdFdyYXBwZXIucmVtb3ZlKHRoaXMuX2dldExpc3RlbmVycyhldmVudE5hbWUpLCBjYWxsYmFjayk7XG4gIH1cblxuICBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBldmVudDogYW55KSB7XG4gICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVycyhldmVudE5hbWUpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsaXN0ZW5lcnNbaV0oZXZlbnQpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudE5hbWVXaXRoVGFyZ2V0KHRhcmdldDogc3RyaW5nLCBldmVudE5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgJHt0YXJnZXR9OiR7ZXZlbnROYW1lfWA7XG59XG5cbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJSZW5kZXJOb2RlIHsgZXZlbnRzOiBOYW1lZEV2ZW50RW1pdHRlciA9IG5ldyBOYW1lZEV2ZW50RW1pdHRlcigpOyB9XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
