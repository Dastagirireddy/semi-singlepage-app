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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvYmFja2VuZHMvanNvbnBfYmFja2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFZTSxxQkFBcUIsRUFDckIsc0JBQXNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRHRCLHFCQUFxQixHQUFHLGdEQUFnRCxDQUFDO1lBQ3pFLHNCQUFzQixHQUFHLDZDQUE2QyxDQUFDO1lBRTdFOztlQUVHO1lBQ0g7Z0JBQUE7Z0JBcUJBLENBQUM7Z0JBQUQsc0JBQUM7WUFBRCxDQXJCQSxBQXFCQyxJQUFBO1lBckJELDZDQXFCQyxDQUFBO1lBRUQ7Z0JBQXNDLG9DQUFlO2dCQU1uRCwwQkFBWSxHQUFZLEVBQVUsSUFBa0IsRUFDaEMsbUJBQXFDO29CQVAzRCxpQkEwRkM7b0JBbEZHLGlCQUFPLENBQUM7b0JBRndCLFNBQUksR0FBSixJQUFJLENBQWM7b0JBQ2hDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBa0I7b0JBSGpELGNBQVMsR0FBWSxLQUFLLENBQUM7b0JBS2pDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUsscUJBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUNyQyxNQUFNLDBCQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztvQkFDOUMsQ0FBQztvQkFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHVCQUFVLENBQUMsVUFBQyxnQkFBb0M7d0JBRWxFLEtBQUksQ0FBQyxVQUFVLEdBQUcsa0JBQVUsQ0FBQyxPQUFPLENBQUM7d0JBQ3JDLElBQUksRUFBRSxHQUFHLEtBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUV6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLEtBQUksQ0FBQyxDQUFD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SSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssa0JBQVUsQ0FBQyxTQUFTLENBQUM7d0JBQUMsTUFBTSxDQUFDO29CQUNyRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDNUIsQ0FBQztnQkFDSCx1QkFBQztZQUFELENBMUZBLEFBMEZDLENBMUZxQyxlQUFlLEdBMEZwRDtZQTFGRCwrQ0EwRkMsQ0FBQTtZQUVEOztlQUVHO1lBQ0g7Z0JBQTJDLGdDQUFpQjtnQkFBNUQ7b0JBQTJDLDhCQUFpQjtnQkFBRSxDQUFDO2dCQUFELG1CQUFDO1lBQUQsQ0FBOUQsQUFBK0QsQ0FBcEIsOEJBQWlCLEdBQUc7WUFBL0QsdUNBQStELENBQUE7WUFHL0Q7Z0JBQW1DLGlDQUFZO2dCQUM3Qyx1QkFBb0IsYUFBMkIsRUFBVSxvQkFBcUM7b0JBQzVGLGlCQUFPLENBQUM7b0JBRFUsa0JBQWEsR0FBYixhQUFhLENBQWM7b0JBQVUseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFpQjtnQkFFOUYsQ0FBQztnQkFFRCx3Q0FBZ0IsR0FBaEIsVUFBaUIsT0FBZ0I7b0JBQy9CLE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUN0RixDQUFDO2dCQVJIO29CQUFDLGlCQUFVLEVBQUU7O2lDQUFBO2dCQVNiLG9CQUFDO1lBQUQsQ0FSQSxBQVFDLENBUmtDLFlBQVksR0FROUM7WUFSRCx5Q0FRQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvYmFja2VuZHMvanNvbnBfYmFja2VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29ubmVjdGlvbkJhY2tlbmQsIENvbm5lY3Rpb259IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtSZWFkeVN0YXRlLCBSZXF1ZXN0TWV0aG9kLCBSZXNwb25zZVR5cGV9IGZyb20gJy4uL2VudW1zJztcbmltcG9ydCB7UmVxdWVzdH0gZnJvbSAnLi4vc3RhdGljX3JlcXVlc3QnO1xuaW1wb3J0IHtSZXNwb25zZX0gZnJvbSAnLi4vc3RhdGljX3Jlc3BvbnNlJztcbmltcG9ydCB7UmVzcG9uc2VPcHRpb25zLCBCYXNlUmVzcG9uc2VPcHRpb25zfSBmcm9tICcuLi9iYXNlX3Jlc3BvbnNlX29wdGlvbnMnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7QnJvd3Nlckpzb25wfSBmcm9tICcuL2Jyb3dzZXJfanNvbnAnO1xuaW1wb3J0IHttYWtlVHlwZUVycm9yfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtTdHJpbmdXcmFwcGVyLCBpc1ByZXNlbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge09ic2VydmVyfSBmcm9tICdyeGpzL09ic2VydmVyJztcblxuY29uc3QgSlNPTlBfRVJSX05PX0NBTExCQUNLID0gJ0pTT05QIGluamVjdGVkIHNjcmlwdCBkaWQgbm90IGludm9rZSBjYWxsYmFjay4nO1xuY29uc3QgSlNPTlBfRVJSX1dST05HX01FVEhPRCA9ICdKU09OUCByZXF1ZXN0cyBtdXN0IHVzZSBHRVQgcmVxdWVzdCBtZXRob2QuJztcblxuLyoqXG4gKiBBYnN0cmFjdCBiYXNlIGNsYXNzIGZvciBhbiBpbi1mbGlnaHQgSlNPTlAgcmVxdWVzdC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEpTT05QQ29ubmVjdGlvbiBpbXBsZW1lbnRzIENvbm5lY3Rpb24ge1xuICAvKipcbiAgICogVGhlIHtAbGluayBSZWFkeVN0YXRlfSBvZiB0aGlzIHJlcXVlc3QuXG4gICAqL1xuICByZWFkeVN0YXRlOiBSZWFkeVN0YXRlO1xuXG4gIC8qKlxuICAgKiBUaGUgb3V0Z29pbmcgSFRUUCByZXF1ZXN0LlxuICAgKi9cbiAgcmVxdWVzdDogUmVxdWVzdDtcblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IGNvbXBsZXRlcyB3aXRoIHRoZSByZXNwb25zZSwgd2hlbiB0aGUgcmVxdWVzdCBpcyBmaW5pc2hlZC5cbiAgICovXG4gIHJlc3BvbnNlOiBPYnNlcnZhYmxlPFJlc3BvbnNlPjtcblxuICAvKipcbiAgICogQ2FsbGJhY2sgY2FsbGVkIHdoZW4gdGhlIEpTT05QIHJlcXVlc3QgY29tcGxldGVzLCB0byBub3RpZnkgdGhlIGFwcGxpY2F0aW9uXG4gICAqIG9mIHRoZSBuZXcgZGF0YS5cbiAgICovXG4gIGFic3RyYWN0IGZpbmlzaGVkKGRhdGE/OiBhbnkpOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgSlNPTlBDb25uZWN0aW9uXyBleHRlbmRzIEpTT05QQ29ubmVjdGlvbiB7XG4gIHByaXZhdGUgX2lkOiBzdHJpbmc7XG4gIHByaXZhdGUgX3NjcmlwdDogRWxlbWVudDtcbiAgcHJpdmF0ZSBfcmVzcG9uc2VEYXRhOiBhbnk7XG4gIHByaXZhdGUgX2ZpbmlzaGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocmVxOiBSZXF1ZXN0LCBwcml2YXRlIF9kb206IEJyb3dzZXJKc29ucCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBiYXNlUmVzcG9uc2VPcHRpb25zPzogUmVzcG9uc2VPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAocmVxLm1ldGhvZCAhPT0gUmVxdWVzdE1ldGhvZC5HZXQpIHtcbiAgICAgIHRocm93IG1ha2VUeXBlRXJyb3IoSlNPTlBfRVJSX1dST05HX01FVEhPRCk7XG4gICAgfVxuICAgIHRoaXMucmVxdWVzdCA9IHJlcTtcbiAgICB0aGlzLnJlc3BvbnNlID0gbmV3IE9ic2VydmFibGUoKHJlc3BvbnNlT2JzZXJ2ZXI6IE9ic2VydmVyPFJlc3BvbnNlPikgPT4ge1xuXG4gICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLkxvYWRpbmc7XG4gICAgICBsZXQgaWQgPSB0aGlzLl9pZCA9IF9kb20ubmV4dFJlcXVlc3RJRCgpO1xuXG4gICAgICBfZG9tLmV4cG9zZUNvbm5lY3Rpb24oaWQsIHRoaXMpO1xuXG4gICAgICAvLyBXb3JrYXJvdW5kIERhcnRcbiAgICAgIC8vIHVybCA9IHVybC5yZXBsYWNlKC89SlNPTlBfQ0FMTEJBQ0soJnwkKS8sIGBnZW5lcmF0ZWQgbWV0aG9kYCk7XG4gICAgICBsZXQgY2FsbGJhY2sgPSBfZG9tLnJlcXVlc3RDYWxsYmFjayh0aGlzLl9pZCk7XG4gICAgICBsZXQgdXJsOiBzdHJpbmcgPSByZXEudXJsO1xuICAgICAgaWYgKHVybC5pbmRleE9mKCc9SlNPTlBfQ0FMTEJBQ0smJykgPiAtMSkge1xuICAgICAgICB1cmwgPSBTdHJpbmdXcmFwcGVyLnJlcGxhY2UodXJsLCAnPUpTT05QX0NBTExCQUNLJicsIGA9JHtjYWxsYmFja30mYCk7XG4gICAgICB9IGVsc2UgaWYgKHVybC5sYXN0SW5kZXhPZignPUpTT05QX0NBTExCQUNLJykgPT09IHVybC5sZW5ndGggLSAnPUpTT05QX0NBTExCQUNLJy5sZW5ndGgpIHtcbiAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygwLCB1cmwubGVuZ3RoIC0gJz1KU09OUF9DQUxMQkFDSycubGVuZ3RoKSArIGA9JHtjYWxsYmFja31gO1xuICAgICAgfVxuXG4gICAgICBsZXQgc2NyaXB0ID0gdGhpcy5fc2NyaXB0ID0gX2RvbS5idWlsZCh1cmwpO1xuXG4gICAgICBsZXQgb25Mb2FkID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBSZWFkeVN0YXRlLkNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLkRvbmU7XG4gICAgICAgIF9kb20uY2xlYW51cChzY3JpcHQpO1xuICAgICAgICBpZiAoIXRoaXMuX2ZpbmlzaGVkKSB7XG4gICAgICAgICAgbGV0IHJlc3BvbnNlT3B0aW9ucyA9XG4gICAgICAgICAgICAgIG5ldyBSZXNwb25zZU9wdGlvbnMoe2JvZHk6IEpTT05QX0VSUl9OT19DQUxMQkFDSywgdHlwZTogUmVzcG9uc2VUeXBlLkVycm9yLCB1cmx9KTtcbiAgICAgICAgICBpZiAoaXNQcmVzZW50KGJhc2VSZXNwb25zZU9wdGlvbnMpKSB7XG4gICAgICAgICAgICByZXNwb25zZU9wdGlvbnMgPSBiYXNlUmVzcG9uc2VPcHRpb25zLm1lcmdlKHJlc3BvbnNlT3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIuZXJyb3IobmV3IFJlc3BvbnNlKHJlc3BvbnNlT3B0aW9ucykpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXNwb25zZU9wdGlvbnMgPSBuZXcgUmVzcG9uc2VPcHRpb25zKHtib2R5OiB0aGlzLl9yZXNwb25zZURhdGEsIHVybH0pO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuYmFzZVJlc3BvbnNlT3B0aW9ucykpIHtcbiAgICAgICAgICByZXNwb25zZU9wdGlvbnMgPSB0aGlzLmJhc2VSZXNwb25zZU9wdGlvbnMubWVyZ2UocmVzcG9uc2VPcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIubmV4dChuZXcgUmVzcG9uc2UocmVzcG9uc2VPcHRpb25zKSk7XG4gICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH07XG5cbiAgICAgIGxldCBvbkVycm9yID0gKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBSZWFkeVN0YXRlLkNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLkRvbmU7XG4gICAgICAgIF9kb20uY2xlYW51cChzY3JpcHQpO1xuICAgICAgICBsZXQgcmVzcG9uc2VPcHRpb25zID0gbmV3IFJlc3BvbnNlT3B0aW9ucyh7Ym9keTogZXJyb3IubWVzc2FnZSwgdHlwZTogUmVzcG9uc2VUeXBlLkVycm9yfSk7XG4gICAgICAgIGlmIChpc1ByZXNlbnQoYmFzZVJlc3BvbnNlT3B0aW9ucykpIHtcbiAgICAgICAgICByZXNwb25zZU9wdGlvbnMgPSBiYXNlUmVzcG9uc2VPcHRpb25zLm1lcmdlKHJlc3BvbnNlT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5lcnJvcihuZXcgUmVzcG9uc2UocmVzcG9uc2VPcHRpb25zKSk7XG4gICAgICB9O1xuXG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZCk7XG4gICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcblxuICAgICAgX2RvbS5zZW5kKHNjcmlwdCk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFJlYWR5U3RhdGUuQ2FuY2VsbGVkO1xuICAgICAgICBzY3JpcHQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZCk7XG4gICAgICAgIHNjcmlwdC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgICBpZiAoaXNQcmVzZW50KHNjcmlwdCkpIHtcbiAgICAgICAgICB0aGlzLl9kb20uY2xlYW51cChzY3JpcHQpO1xuICAgICAgICB9XG5cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmaW5pc2hlZChkYXRhPzogYW55KSB7XG4gICAgLy8gRG9uJ3QgbGVhayBjb25uZWN0aW9uc1xuICAgIHRoaXMuX2ZpbmlzaGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9kb20ucmVtb3ZlQ29ubmVjdGlvbih0aGlzLl9pZCk7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gUmVhZHlTdGF0ZS5DYW5jZWxsZWQpIHJldHVybjtcbiAgICB0aGlzLl9yZXNwb25zZURhdGEgPSBkYXRhO1xuICB9XG59XG5cbi8qKlxuICogQSB7QGxpbmsgQ29ubmVjdGlvbkJhY2tlbmR9IHRoYXQgdXNlcyB0aGUgSlNPTlAgc3RyYXRlZ3kgb2YgbWFraW5nIHJlcXVlc3RzLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSlNPTlBCYWNrZW5kIGV4dGVuZHMgQ29ubmVjdGlvbkJhY2tlbmQge31cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEpTT05QQmFja2VuZF8gZXh0ZW5kcyBKU09OUEJhY2tlbmQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9icm93c2VySlNPTlA6IEJyb3dzZXJKc29ucCwgcHJpdmF0ZSBfYmFzZVJlc3BvbnNlT3B0aW9uczogUmVzcG9uc2VPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGNyZWF0ZUNvbm5lY3Rpb24ocmVxdWVzdDogUmVxdWVzdCk6IEpTT05QQ29ubmVjdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBKU09OUENvbm5lY3Rpb25fKHJlcXVlc3QsIHRoaXMuX2Jyb3dzZXJKU09OUCwgdGhpcy5fYmFzZVJlc3BvbnNlT3B0aW9ucyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
