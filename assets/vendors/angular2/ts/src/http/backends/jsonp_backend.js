System.register(['../interfaces', '../enums', '../static_response', '../base_response_options', 'angular2/core', './browser_jsonp', 'angular2/src/facade/exceptions', 'angular2/src/facade/lang', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var interfaces_1, enums_1, static_response_1, base_response_options_1, core_1, browser_jsonp_1, exceptions_1, lang_1, Observable_1;
    var JSONP_ERR_NO_CALLBACK, JSONP_ERR_WRONG_METHOD, JSONPConnection, JSONPConnection_, JSONPBackend, JSONPBackend_;
    return {
        setters:[
            function (interfaces_1_1) {
                interfaces_1 = interfaces_1_1;
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            },
            function (static_response_1_1) {
                static_response_1 = static_response_1_1;
            },
            function (base_response_options_1_1) {
                base_response_options_1 = base_response_options_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_jsonp_1_1) {
                browser_jsonp_1 = browser_jsonp_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
            JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
            /**
             * Abstract base class for an in-flight JSONP request.
             */
            JSONPConnection = (function () {
                function JSONPConnection() {
                }
                return JSONPConnection;
            }());
            exports_1("JSONPConnection", JSONPConnection);
            JSONPConnection_ = (function (_super) {
                __extends(JSONPConnection_, _super);
                function JSONPConnection_(req, _dom, baseResponseOptions) {
                    var _this = this;
                    _super.call(this);
                    this._dom = _dom;
                    this.baseResponseOptions = baseResponseOptions;
                    this._finished = false;
                    if (req.method !== enums_1.RequestMethod.Get) {
                        throw exceptions_1.makeTypeError(JSONP_ERR_WRONG_METHOD);
                    }
                    this.request = req;
                    this.response = new Observable_1.Observable(function (responseObserver) {
                        _this.readyState = enums_1.ReadyState.Loading;
                        var id = _this._id = _dom.nextRequestID();
                        _dom.exposeConnection(id, _this);
                        // Workaround Dart
                        // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
                        var callback = _dom.requestCallback(_this._id);
                        var url = req.url;
                        if (url.indexOf('=JSONP_CALLBACK&') > -1) {
                            url = lang_1.StringWrapper.replace(url, '=JSONP_CALLBACK&', "=" + callback + "&");
                        }
                        else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
                            url = url.substring(0, url.length - '=JSONP_CALLBACK'.length) + ("=" + callback);
                        }
                        var script = _this._script = _dom.build(url);
                        var onLoad = function (event) {
                            if (_this.readyState === enums_1.ReadyState.Cancelled)
                                return;
                            _this.readyState = enums_1.ReadyState.Done;
                            _dom.cleanup(script);
                            if (!_this._finished) {
                                var responseOptions_1 = new base_response_options_1.ResponseOptions({ body: JSONP_ERR_NO_CALLBACK, type: enums_1.ResponseType.Error, url: url });
                                if (lang_1.isPresent(baseResponseOptions)) {
                                    responseOptions_1 = baseResponseOptions.merge(responseOptions_1);
                                }
                                responseObserver.error(new static_response_1.Response(responseOptions_1));
                                return;
                            }
                            var responseOptions = new base_response_options_1.ResponseOptions({ body: _this._responseData, url: url });
                            if (lang_1.isPresent(_this.baseResponseOptions)) {
                                responseOptions = _this.baseResponseOptions.merge(responseOptions);
                            }
                            responseObserver.next(new static_response_1.Response(responseOptions));
                            responseObserver.complete();
                        };
                        var onError = function (error) {
                            if (_this.readyState === enums_1.ReadyState.Cancelled)
                                return;
                            _this.readyState = enums_1.ReadyState.Done;
                            _dom.cleanup(script);
                            var responseOptions = new base_response_options_1.ResponseOptions({ body: error.message, type: enums_1.ResponseType.Error });
                            if (lang_1.isPresent(baseResponseOptions)) {
                                responseOptions = baseResponseOptions.merge(responseOptions);
                            }
                            responseObserver.error(new static_response_1.Response(responseOptions));
                        };
                        script.addEventListener('load', onLoad);
                        script.addEventListener('error', onError);
                        _dom.send(script);
                        return function () {
                            _this.readyState = enums_1.ReadyState.Cancelled;
                            script.removeEventListener('load', onLoad);
                            script.removeEventListener('error', onError);
                            if (lang_1.isPresent(script)) {
                                _this._dom.cleanup(script);
                            }
                        };
                    });
                }
                JSONPConnection_.prototype.finished = function (data) {
                    // Don't leak connections
                    this._finished = true;
                    this._dom.removeConnection(this._id);
                    if (this.readyState === enums_1.ReadyState.Cancelled)
                        return;
                    this._responseData = data;
                };
                return JSONPConnection_;
            }(JSONPConnection));
            exports_1("JSONPConnection_", JSONPConnection_);
            /**
             * A {@link ConnectionBackend} that uses the JSONP strategy of making requests.
             */
            JSONPBackend = (function (_super) {
                __extends(JSONPBackend, _super);
                function JSONPBackend() {
                    _super.apply(this, arguments);
                }
                return JSONPBackend;
            }(interfaces_1.ConnectionBackend));
            exports_1("JSONPBackend", JSONPBackend);
            JSONPBackend_ = (function (_super) {
                __extends(JSONPBackend_, _super);
                function JSONPBackend_(_browserJSONP, _baseResponseOptions) {
                    _super.call(this);
                    this._browserJSONP = _browserJSONP;
                    this._baseResponseOptions = _baseResponseOptions;
                }
                JSONPBackend_.prototype.createConnection = function (request) {
                    return new JSONPConnection_(request, this._browserJSONP, this._baseResponseOptions);
                };
                JSONPBackend_ = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [browser_jsonp_1.BrowserJsonp, base_response_options_1.ResponseOptions])
                ], JSONPBackend_);
                return JSONPBackend_;
            }(JSONPBackend));
            exports_1("JSONPBackend_", JSONPBackend_);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL2JhY2tlbmRzL2pzb25wX2JhY2tlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBWU0scUJBQXFCLEVBQ3JCLHNCQUFzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUR0QixxQkFBcUIsR0FBRyxnREFBZ0QsQ0FBQztZQUN6RSxzQkFBc0IsR0FBRyw2Q0FBNkMsQ0FBQztZQUU3RTs7ZUFFRztZQUNIO2dCQUFBO2dCQXFCQSxDQUFDO2dCQUFELHNCQUFDO1lBQUQsQ0FyQkEsQUFxQkMsSUFBQTtZQXJCRCw2Q0FxQkMsQ0FBQTtZQUVEO2dCQUFzQyxvQ0FBZTtnQkFNbkQsMEJBQVksR0FBWSxFQUFVLElBQWtCLEVBQ2hDLG1CQUFxQztvQkFQM0QsaUJBMEZDO29CQWxGRyxpQkFBTyxDQUFDO29CQUZ3QixTQUFJLEdBQUosSUFBSSxDQUFjO29CQUNoQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQWtCO29CQUhqRCxjQUFTLEdBQVksS0FBSyxDQUFDO29CQUtqQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLHFCQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDckMsTUFBTSwwQkFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQzlDLENBQUM7b0JBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7b0JBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSx1QkFBVSxDQUFXLFVBQUMsZ0JBQW9DO3dCQUU1RSxLQUFJLENBQUMsVUFBVSxHQUFHLGtCQUFVLENBQUMsT0FBTyxDQUFDO3dCQUNyQyxJQUFJLEVBQUUsR0FBRyxLQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFFekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxLQUFJLENBQUMsQ0FBQzt3QkFF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QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLGtCQUFVLENBQUMsU0FBUyxDQUFDO3dCQUFDLE1BQU0sQ0FBQztvQkFDckQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQzVCLENBQUM7Z0JBQ0gsdUJBQUM7WUFBRCxDQTFGQSxBQTBGQyxDQTFGcUMsZUFBZSxHQTBGcEQ7WUExRkQsK0NBMEZDLENBQUE7WUFFRDs7ZUFFRztZQUNIO2dCQUEyQyxnQ0FBaUI7Z0JBQTVEO29CQUEyQyw4QkFBaUI7Z0JBQUUsQ0FBQztnQkFBRCxtQkFBQztZQUFELENBQTlELEFBQStELENBQXBCLDhCQUFpQixHQUFHO1lBQS9ELHVDQUErRCxDQUFBO1lBRy9EO2dCQUFtQyxpQ0FBWTtnQkFDN0MsdUJBQW9CLGFBQTJCLEVBQVUsb0JBQXFDO29CQUM1RixpQkFBTyxDQUFDO29CQURVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO29CQUFVLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBaUI7Z0JBRTlGLENBQUM7Z0JBRUQsd0NBQWdCLEdBQWhCLFVBQWlCLE9BQWdCO29CQUMvQixNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDdEYsQ0FBQztnQkFSSDtvQkFBQyxpQkFBVSxFQUFFOztpQ0FBQTtnQkFTYixvQkFBQztZQUFELENBUkEsQUFRQyxDQVJrQyxZQUFZLEdBUTlDO1lBUkQseUNBUUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvaHR0cC9iYWNrZW5kcy9qc29ucF9iYWNrZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25uZWN0aW9uQmFja2VuZCwgQ29ubmVjdGlvbn0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge1JlYWR5U3RhdGUsIFJlcXVlc3RNZXRob2QsIFJlc3BvbnNlVHlwZX0gZnJvbSAnLi4vZW51bXMnO1xuaW1wb3J0IHtSZXF1ZXN0fSBmcm9tICcuLi9zdGF0aWNfcmVxdWVzdCc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi9zdGF0aWNfcmVzcG9uc2UnO1xuaW1wb3J0IHtSZXNwb25zZU9wdGlvbnMsIEJhc2VSZXNwb25zZU9wdGlvbnN9IGZyb20gJy4uL2Jhc2VfcmVzcG9uc2Vfb3B0aW9ucyc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtCcm93c2VySnNvbnB9IGZyb20gJy4vYnJvd3Nlcl9qc29ucCc7XG5pbXBvcnQge21ha2VUeXBlRXJyb3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1N0cmluZ1dyYXBwZXIsIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7T2JzZXJ2ZXJ9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuXG5jb25zdCBKU09OUF9FUlJfTk9fQ0FMTEJBQ0sgPSAnSlNPTlAgaW5qZWN0ZWQgc2NyaXB0IGRpZCBub3QgaW52b2tlIGNhbGxiYWNrLic7XG5jb25zdCBKU09OUF9FUlJfV1JPTkdfTUVUSE9EID0gJ0pTT05QIHJlcXVlc3RzIG11c3QgdXNlIEdFVCByZXF1ZXN0IG1ldGhvZC4nO1xuXG4vKipcbiAqIEFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIGFuIGluLWZsaWdodCBKU09OUCByZXF1ZXN0LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSlNPTlBDb25uZWN0aW9uIGltcGxlbWVudHMgQ29ubmVjdGlvbiB7XG4gIC8qKlxuICAgKiBUaGUge0BsaW5rIFJlYWR5U3RhdGV9IG9mIHRoaXMgcmVxdWVzdC5cbiAgICovXG4gIHJlYWR5U3RhdGU6IFJlYWR5U3RhdGU7XG5cbiAgLyoqXG4gICAqIFRoZSBvdXRnb2luZyBIVFRQIHJlcXVlc3QuXG4gICAqL1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgY29tcGxldGVzIHdpdGggdGhlIHJlc3BvbnNlLCB3aGVuIHRoZSByZXF1ZXN0IGlzIGZpbmlzaGVkLlxuICAgKi9cbiAgcmVzcG9uc2U6IE9ic2VydmFibGU8UmVzcG9uc2U+O1xuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBjYWxsZWQgd2hlbiB0aGUgSlNPTlAgcmVxdWVzdCBjb21wbGV0ZXMsIHRvIG5vdGlmeSB0aGUgYXBwbGljYXRpb25cbiAgICogb2YgdGhlIG5ldyBkYXRhLlxuICAgKi9cbiAgYWJzdHJhY3QgZmluaXNoZWQoZGF0YT86IGFueSk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBKU09OUENvbm5lY3Rpb25fIGV4dGVuZHMgSlNPTlBDb25uZWN0aW9uIHtcbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBfc2NyaXB0OiBFbGVtZW50O1xuICBwcml2YXRlIF9yZXNwb25zZURhdGE6IGFueTtcbiAgcHJpdmF0ZSBfZmluaXNoZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihyZXE6IFJlcXVlc3QsIHByaXZhdGUgX2RvbTogQnJvd3Nlckpzb25wLFxuICAgICAgICAgICAgICBwcml2YXRlIGJhc2VSZXNwb25zZU9wdGlvbnM/OiBSZXNwb25zZU9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChyZXEubWV0aG9kICE9PSBSZXF1ZXN0TWV0aG9kLkdldCkge1xuICAgICAgdGhyb3cgbWFrZVR5cGVFcnJvcihKU09OUF9FUlJfV1JPTkdfTUVUSE9EKTtcbiAgICB9XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxO1xuICAgIHRoaXMucmVzcG9uc2UgPSBuZXcgT2JzZXJ2YWJsZTxSZXNwb25zZT4oKHJlc3BvbnNlT2JzZXJ2ZXI6IE9ic2VydmVyPFJlc3BvbnNlPikgPT4ge1xuXG4gICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLkxvYWRpbmc7XG4gICAgICBsZXQgaWQgPSB0aGlzLl9pZCA9IF9kb20ubmV4dFJlcXVlc3RJRCgpO1xuXG4gICAgICBfZG9tLmV4cG9zZUNvbm5lY3Rpb24oaWQsIHRoaXMpO1xuXG4gICAgICAvLyBXb3JrYXJvdW5kIERhcnRcbiAgICAgIC8vIHVybCA9IHVybC5yZXBsYWNlKC89SlNPTlBfQ0FMTEJBQ0soJnwkKS8sIGBnZW5lcmF0ZWQgbWV0aG9kYCk7XG4gICAgICBsZXQgY2FsbGJhY2sgPSBfZG9tLnJlcXVlc3RDYWxsYmFjayh0aGlzLl9pZCk7XG4gICAgICBsZXQgdXJsOiBzdHJpbmcgPSByZXEudXJsO1xuICAgICAgaWYgKHVybC5pbmRleE9mKCc9SlNPTlBfQ0FMTEJBQ0smJykgPiAtMSkge1xuICAgICAgICB1cmwgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2UodXJsLCAnPUpTT05QX0NBTExCQUNLJicsIGA9JHtjYWxsYmFja30mYCk7XG4gICAgICB9IGVsc2UgaWYgKHVybC5sYXN0SW5kZXhPZignPUpTT05QX0NBTExCQUNLJykgPT09IHVybC5sZW5ndGggLSAnPUpTT05QX0NBTExCQUNLJy5sZW5ndGgpIHtcbiAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygwLCB1cmwubGVuZ3RoIC0gJz1KU09OUF9DQUxMQkFDSycubGVuZ3RoKSArIGA9JHtjYWxsYmFja31gO1xuICAgICAgfVxuXG4gICAgICBsZXQgc2NyaXB0ID0gdGhpcy5fc2NyaXB0ID0gX2RvbS5idWlsZCh1cmwpO1xuXG4gICAgICBsZXQgb25Mb2FkID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBSZWFkeVN0YXRlLkNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLkRvbmU7XG4gICAgICAgIF9kb20uY2xlYW51cChzY3JpcHQpO1xuICAgICAgICBpZiAoIXRoaXMuX2ZpbmlzaGVkKSB7XG4gICAgICAgICAgbGV0IHJlc3BvbnNlT3B0aW9ucyA9XG4gICAgICAgICAgICAgIG5ldyBSZXNwb25zZU9wdGlvbnMoe2JvZHk6IEpTT05QX0VSUl9OT19DQUxMQkFDSywgdHlwZTogUmVzcG9uc2VUeXBlLkVycm9yLCB1cmx9KTtcbiAgICAgICAgICBpZiAoaXNQcmVzZW50KGJhc2VSZXNwb25zZU9wdGlvbnMpKSB7XG4gICAgICAgICAgICByZXNwb25zZU9wdGlvbnMgPSBiYXNlUmVzcG9uc2VPcHRpb25zLm1lcmdlKHJlc3BvbnNlT3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIuZXJyb3IobmV3IFJlc3BvbnNlKHJlc3BvbnNlT3B0aW9ucykpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXNwb25zZU9wdGlvbnMgPSBuZXcgUmVzcG9uc2VPcHRpb25zKHtib2R5OiB0aGlzLl9yZXNwb25zZURhdGEsIHVybH0pO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuYmFzZVJlc3BvbnNlT3B0aW9ucykpIHtcbiAgICAgICAgICByZXNwb25zZU9wdGlvbnMgPSB0aGlzLmJhc2VSZXNwb25zZU9wdGlvbnMubWVyZ2UocmVzcG9uc2VPcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIubmV4dChuZXcgUmVzcG9uc2UocmVzcG9uc2VPcHRpb25zKSk7XG4gICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH07XG5cbiAgICAgIGxldCBvbkVycm9yID0gKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBSZWFkeVN0YXRlLkNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLkRvbmU7XG4gICAgICAgIF9kb20uY2xlYW51cChzY3JpcHQpO1xuICAgICAgICBsZXQgcmVzcG9uc2VPcHRpb25zID0gbmV3IFJlc3BvbnNlT3B0aW9ucyh7Ym9keTogZXJyb3IubWVzc2FnZSwgdHlwZTogUmVzcG9uc2VUeXBlLkVycm9yfSk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoYmFzZVJlc3BvbnNlT3B0aW9ucykpIHtcbiAgICAgICAgICByZXNwb25zZU9wdGlvbnMgPSBiYXNlUmVzcG9uc2VPcHRpb25zLm1lcmdlKHJlc3BvbnNlT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5lcnJvcihuZXcgUmVzcG9uc2UocmVzcG9uc2VPcHRpb25zKSk7XG4gICAgICB9O1xuXG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZCk7XG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcblxuICAgICAgX2RvbS5zZW5kKHNjcmlwdCk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFJlYWR5U3RhdGUuQ2FuY2VsbGVkO1xuICAgICAgICBzY3JpcHQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZCk7XG4gICAgICAgIHNjcmlwdC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHNjcmlwdCkpIHtcbiAgICAgICAgICB0aGlzLl9kb20uY2xlYW51cChzY3JpcHQpO1xuICAgICAgICB9XG5cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmaW5pc2hlZChkYXRhPzogYW55KSB7XG4gICAgLy8gRG9uJ3QgbGVhayBjb25uZWN0aW9uc1xuICAgIHRoaXMuX2ZpbmlzaGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9kb20ucmVtb3ZlQ29ubmVjdGlvbih0aGlzLl9pZCk7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gUmVhZHlTdGF0ZS5DYW5jZWxsZWQpIHJldHVybjtcbiAgICB0aGlzLl9yZXNwb25zZURhdGEgPSBkYXRhO1xuICB9XG59XG5cbi8qKlxuICogQSB7QGxpbmsgQ29ubmVjdGlvbkJhY2tlbmR9IHRoYXQgdXNlcyB0aGUgSlNPTlAgc3RyYXRlZ3kgb2YgbWFraW5nIHJlcXVlc3RzLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSlNPTlBCYWNrZW5kIGV4dGVuZHMgQ29ubmVjdGlvbkJhY2tlbmQge31cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEpTT05QQmFja2VuZF8gZXh0ZW5kcyBKU09OUEJhY2tlbmQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9icm93c2VySlNPTlA6IEJyb3dzZXJKc29ucCwgcHJpdmF0ZSBfYmFzZVJlc3BvbnNlT3B0aW9uczogUmVzcG9uc2VPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGNyZWF0ZUNvbm5lY3Rpb24ocmVxdWVzdDogUmVxdWVzdCk6IEpTT05QQ29ubmVjdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBKU09OUENvbm5lY3Rpb25fKHJlcXVlc3QsIHRoaXMuX2Jyb3dzZXJKU09OUCwgdGhpcy5fYmFzZVJlc3BvbnNlT3B0aW9ucyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
