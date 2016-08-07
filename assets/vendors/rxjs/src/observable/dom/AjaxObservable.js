System.register(['../../util/root', '../../util/tryCatch', '../../util/errorObject', '../../Observable', '../../Subscriber'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var root_1, tryCatch_1, errorObject_1, Observable_1, Subscriber_1;
    var AjaxObservable, AjaxSubscriber, AjaxResponse, AjaxError, AjaxTimeoutError;
    function getCORSRequest() {
        if (root_1.root.XMLHttpRequest) {
            var xhr = new root_1.root.XMLHttpRequest();
            if ('withCredentials' in xhr) {
                xhr.withCredentials = !!this.withCredentials;
            }
            return xhr;
        }
        else if (!!root_1.root.XDomainRequest) {
            return new root_1.root.XDomainRequest();
        }
        else {
            throw new Error('CORS is not supported by your browser');
        }
    }
    function getXMLHttpRequest() {
        if (root_1.root.XMLHttpRequest) {
            return new root_1.root.XMLHttpRequest();
        }
        else {
            var progId = void 0;
            try {
                var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
                for (var i = 0; i < 3; i++) {
                    try {
                        progId = progIds[i];
                        if (new root_1.root.ActiveXObject(progId)) {
                            break;
                        }
                    }
                    catch (e) {
                    }
                }
                return new root_1.root.ActiveXObject(progId);
            }
            catch (e) {
                throw new Error('XMLHttpRequest is not supported by your browser');
            }
        }
    }
    function defaultGetResultSelector(response) {
        return response.response;
    }
    function ajaxGet(url, resultSelector, headers) {
        if (resultSelector === void 0) { resultSelector = defaultGetResultSelector; }
        if (headers === void 0) { headers = null; }
        return new AjaxObservable({ method: 'GET', url: url, resultSelector: resultSelector, headers: headers });
    }
    exports_1("ajaxGet", ajaxGet);
    function ajaxPost(url, body, headers) {
        return new AjaxObservable({ method: 'POST', url: url, body: body, headers: headers });
    }
    exports_1("ajaxPost", ajaxPost);
    function ajaxDelete(url, headers) {
        return new AjaxObservable({ method: 'DELETE', url: url, headers: headers });
    }
    exports_1("ajaxDelete", ajaxDelete);
    function ajaxPut(url, body, headers) {
        return new AjaxObservable({ method: 'PUT', url: url, body: body, headers: headers });
    }
    exports_1("ajaxPut", ajaxPut);
    function ajaxGetJSON(url, resultSelector, headers) {
        var finalResultSelector = resultSelector ? function (res) { return resultSelector(res.response); } : function (res) { return res.response; };
        return new AjaxObservable({ method: 'GET', url: url, responseType: 'json', resultSelector: finalResultSelector, headers: headers });
    }
    exports_1("ajaxGetJSON", ajaxGetJSON);
    return {
        setters:[
            function (root_1_1) {
                root_1 = root_1_1;
            },
            function (tryCatch_1_1) {
                tryCatch_1 = tryCatch_1_1;
            },
            function (errorObject_1_1) {
                errorObject_1 = errorObject_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            }],
        execute: function() {
            ;
            ;
            ;
            ;
            ;
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            AjaxObservable = (function (_super) {
                __extends(AjaxObservable, _super);
                function AjaxObservable(urlOrRequest) {
                    _super.call(this);
                    var request = {
                        async: true,
                        createXHR: function () {
                            return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
                        },
                        crossDomain: false,
                        withCredentials: false,
                        headers: {},
                        method: 'GET',
                        responseType: 'json',
                        timeout: 0
                    };
                    if (typeof urlOrRequest === 'string') {
                        request.url = urlOrRequest;
                    }
                    else {
                        for (var prop in urlOrRequest) {
                            if (urlOrRequest.hasOwnProperty(prop)) {
                                request[prop] = urlOrRequest[prop];
                            }
                        }
                    }
                    this.request = request;
                }
                AjaxObservable.prototype._subscribe = function (subscriber) {
                    return new AjaxSubscriber(subscriber, this.request);
                };
                /**
                 * Creates an observable for an Ajax request with either a request object with
                 * url, headers, etc or a string for a URL.
                 *
                 * @example
                 * source = Rx.Observable.ajax('/products');
                 * source = Rx.Observable.ajax({ url: 'products', method: 'GET' });
                 *
                 * @param {string|Object} request Can be one of the following:
                 *   A string of the URL to make the Ajax call.
                 *   An object with the following properties
                 *   - url: URL of the request
                 *   - body: The body of the request
                 *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
                 *   - async: Whether the request is async
                 *   - headers: Optional headers
                 *   - crossDomain: true if a cross domain request, else false
                 *   - createXHR: a function to override if you need to use an alternate
                 *   XMLHttpRequest implementation.
                 *   - resultSelector: a function to use to alter the output value type of
                 *   the Observable. Gets {@link AjaxResponse} as an argument.
                 * @return {Observable} An observable sequence containing the XMLHttpRequest.
                 * @static true
                 * @name ajax
                 * @owner Observable
                */
                AjaxObservable.create = (function () {
                    var create = function (urlOrRequest) {
                        return new AjaxObservable(urlOrRequest);
                    };
                    create.get = ajaxGet;
                    create.post = ajaxPost;
                    create.delete = ajaxDelete;
                    create.put = ajaxPut;
                    create.getJSON = ajaxGetJSON;
                    return create;
                })();
                return AjaxObservable;
            }(Observable_1.Observable));
            exports_1("AjaxObservable", AjaxObservable);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            AjaxSubscriber = (function (_super) {
                __extends(AjaxSubscriber, _super);
                function AjaxSubscriber(destination, request) {
                    _super.call(this, destination);
                    this.request = request;
                    this.done = false;
                    var headers = request.headers = request.headers || {};
                    // force CORS if requested
                    if (!request.crossDomain && !headers['X-Requested-With']) {
                        headers['X-Requested-With'] = 'XMLHttpRequest';
                    }
                    // ensure content type is set
                    if (!('Content-Type' in headers) && !(root_1.root.FormData && request.body instanceof root_1.root.FormData)) {
                        headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                    }
                    // properly serialize body
                    request.body = this.serializeBody(request.body, request.headers['Content-Type']);
                    this.resultSelector = request.resultSelector;
                    this.send();
                }
                AjaxSubscriber.prototype.next = function (e) {
                    this.done = true;
                    var _a = this, resultSelector = _a.resultSelector, xhr = _a.xhr, request = _a.request, destination = _a.destination;
                    var response = new AjaxResponse(e, xhr, request);
                    if (resultSelector) {
                        var result = tryCatch_1.tryCatch(resultSelector)(response);
                        if (result === errorObject_1.errorObject) {
                            this.error(errorObject_1.errorObject.e);
                        }
                        else {
                            destination.next(result);
                        }
                    }
                    else {
                        destination.next(response);
                    }
                };
                AjaxSubscriber.prototype.send = function () {
                    var _a = this, request = _a.request, _b = _a.request, user = _b.user, method = _b.method, url = _b.url, async = _b.async, password = _b.password, headers = _b.headers, body = _b.body;
                    var createXHR = request.createXHR;
                    var xhr = tryCatch_1.tryCatch(createXHR).call(request);
                    if (xhr === errorObject_1.errorObject) {
                        this.error(errorObject_1.errorObject.e);
                    }
                    else {
                        this.xhr = xhr;
                        // open XHR first
                        var result = void 0;
                        if (user) {
                            result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async, user, password);
                        }
                        else {
                            result = tryCatch_1.tryCatch(xhr.open).call(xhr, method, url, async);
                        }
                        if (result === errorObject_1.errorObject) {
                            this.error(errorObject_1.errorObject.e);
                            return;
                        }
                        // timeout and responseType can be set once the XHR is open
                        xhr.timeout = request.timeout;
                        xhr.responseType = request.responseType;
                        // set headers
                        this.setHeaders(xhr, headers);
                        // now set up the events
                        this.setupEvents(xhr, request);
                        // finally send the request
                        if (body) {
                            xhr.send(body);
                        }
                        else {
                            xhr.send();
                        }
                    }
                };
                AjaxSubscriber.prototype.serializeBody = function (body, contentType) {
                    if (!body || typeof body === 'string') {
                        return body;
                    }
                    else if (root_1.root.FormData && body instanceof root_1.root.FormData) {
                        return body;
                    }
                    if (contentType) {
                        var splitIndex = contentType.indexOf(';');
                        if (splitIndex !== -1) {
                            contentType = contentType.substring(0, splitIndex);
                        }
                    }
                    switch (contentType) {
                        case 'application/x-www-form-urlencoded':
                            return Object.keys(body).map(function (key) { return (encodeURI(key) + "=" + encodeURI(body[key])); }).join('&');
                        case 'application/json':
                            return JSON.stringify(body);
                        default:
                            return body;
                    }
                };
                AjaxSubscriber.prototype.setHeaders = function (xhr, headers) {
                    for (var key in headers) {
                        if (headers.hasOwnProperty(key)) {
                            xhr.setRequestHeader(key, headers[key]);
                        }
                    }
                };
                AjaxSubscriber.prototype.setupEvents = function (xhr, request) {
                    var progressSubscriber = request.progressSubscriber;
                    xhr.ontimeout = function xhrTimeout(e) {
                        var _a = xhrTimeout, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
                        if (progressSubscriber) {
                            progressSubscriber.error(e);
                        }
                        subscriber.error(new AjaxTimeoutError(this, request)); //TODO: Make betterer.
                    };
                    xhr.ontimeout.request = request;
                    xhr.ontimeout.subscriber = this;
                    xhr.ontimeout.progressSubscriber = progressSubscriber;
                    if (xhr.upload && 'withCredentials' in xhr && root_1.root.XDomainRequest) {
                        if (progressSubscriber) {
                            xhr.onprogress = function xhrProgress(e) {
                                var progressSubscriber = xhrProgress.progressSubscriber;
                                progressSubscriber.next(e);
                            };
                            xhr.onprogress.progressSubscriber = progressSubscriber;
                        }
                        xhr.onerror = function xhrError(e) {
                            var _a = xhrError, progressSubscriber = _a.progressSubscriber, subscriber = _a.subscriber, request = _a.request;
                            if (progressSubscriber) {
                                progressSubscriber.error(e);
                            }
                            subscriber.error(new AjaxError('ajax error', this, request));
                        };
                        xhr.onerror.request = request;
                        xhr.onerror.subscriber = this;
                        xhr.onerror.progressSubscriber = progressSubscriber;
                    }
                    xhr.onreadystatechange = function xhrReadyStateChange(e) {
                        var _a = xhrReadyStateChange, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
                        if (this.readyState === 4) {
                            // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                            var status_1 = this.status === 1223 ? 204 : this.status;
                            var response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
                            // fix status code when it is 0 (0 status is undocumented).
                            // Occurs when accessing file resources or on Android 4.1 stock browser
                            // while retrieving files from application cache.
                            if (status_1 === 0) {
                                status_1 = response ? 200 : 0;
                            }
                            if (200 <= status_1 && status_1 < 300) {
                                if (progressSubscriber) {
                                    progressSubscriber.complete();
                                }
                                subscriber.next(e);
                                subscriber.complete();
                            }
                            else {
                                if (progressSubscriber) {
                                    progressSubscriber.error(e);
                                }
                                subscriber.error(new AjaxError('ajax error ' + status_1, this, request));
                            }
                        }
                    };
                    xhr.onreadystatechange.subscriber = this;
                    xhr.onreadystatechange.progressSubscriber = progressSubscriber;
                    xhr.onreadystatechange.request = request;
                };
                AjaxSubscriber.prototype.unsubscribe = function () {
                    var _a = this, done = _a.done, xhr = _a.xhr;
                    if (!done && xhr && xhr.readyState !== 4) {
                        xhr.abort();
                    }
                    _super.prototype.unsubscribe.call(this);
                };
                return AjaxSubscriber;
            }(Subscriber_1.Subscriber));
            exports_1("AjaxSubscriber", AjaxSubscriber);
            /**
             * A normalized AJAX response.
             *
             * @see {@link ajax}
             *
             * @class AjaxResponse
             */
            AjaxResponse = (function () {
                function AjaxResponse(originalEvent, xhr, request) {
                    this.originalEvent = originalEvent;
                    this.xhr = xhr;
                    this.request = request;
                    this.status = xhr.status;
                    this.responseType = xhr.responseType || request.responseType;
                    switch (this.responseType) {
                        case 'json':
                            if ('response' in xhr) {
                                //IE does not support json as responseType, parse it internally
                                this.response = xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || '');
                            }
                            else {
                                this.response = JSON.parse(xhr.responseText || '');
                            }
                            break;
                        case 'xml':
                            this.response = xhr.responseXML;
                            break;
                        case 'text':
                        default:
                            this.response = ('response' in xhr) ? xhr.response : xhr.responseText;
                            break;
                    }
                }
                return AjaxResponse;
            }());
            exports_1("AjaxResponse", AjaxResponse);
            /**
             * A normalized AJAX error.
             *
             * @see {@link ajax}
             *
             * @class AjaxError
             */
            AjaxError = (function (_super) {
                __extends(AjaxError, _super);
                function AjaxError(message, xhr, request) {
                    _super.call(this, message);
                    this.message = message;
                    this.xhr = xhr;
                    this.request = request;
                    this.status = xhr.status;
                }
                return AjaxError;
            }(Error));
            exports_1("AjaxError", AjaxError);
            /**
             * @see {@link ajax}
             *
             * @class AjaxTimeoutError
             */
            AjaxTimeoutError = (function (_super) {
                __extends(AjaxTimeoutError, _super);
                function AjaxTimeoutError(xhr, request) {
                    _super.call(this, 'ajax timeout', xhr, request);
                }
                return AjaxTimeoutError;
            }(AjaxError));
            exports_1("AjaxTimeoutError", AjaxTimeoutError);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvZG9tL0FqYXhPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUF5QkE7UUFDRSxFQUFFLENBQUMsQ0FBQyxXQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFNLEdBQUcsR0FBRyxJQUFJLFdBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixHQUFHLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQy9DLENBQUM7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2IsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLElBQUksV0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUMzRCxDQUFDO0lBQ0gsQ0FBQztJQUVEO1FBQ0UsRUFBRSxDQUFDLENBQUMsV0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLElBQUksV0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksTUFBTSxTQUFRLENBQUM7WUFDbkIsSUFBSSxDQUFDO2dCQUNILElBQU0sT0FBTyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztnQkFDOUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FB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LENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO29CQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQzNCLENBQUM7Z0JBQ0gsZ0JBQUM7WUFBRCxDQWpCQSxBQWlCQyxDQWpCOEIsS0FBSyxHQWlCbkM7WUFqQkQsaUNBaUJDLENBQUE7WUFFRDs7OztlQUlHO1lBQ0g7Z0JBQXNDLG9DQUFTO2dCQUM3QywwQkFBWSxHQUFtQixFQUFFLE9BQW9CO29CQUNuRCxrQkFBTSxjQUFjLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO2dCQUNILHVCQUFDO1lBQUQsQ0FKQSxBQUlDLENBSnFDLFNBQVMsR0FJOUM7WUFKRCwrQ0FJQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL29ic2VydmFibGUvZG9tL0FqYXhPYnNlcnZhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtyb290fSBmcm9tICcuLi8uLi91dGlsL3Jvb3QnO1xuaW1wb3J0IHt0cnlDYXRjaH0gZnJvbSAnLi4vLi4vdXRpbC90cnlDYXRjaCc7XG5pbXBvcnQge2Vycm9yT2JqZWN0fSBmcm9tICcuLi8uLi91dGlsL2Vycm9yT2JqZWN0JztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAnLi4vLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQge1N1YnNjcmliZXJ9IGZyb20gJy4uLy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHtUZWFyZG93bkxvZ2ljfSBmcm9tICcuLi8uLi9TdWJzY3JpcHRpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqYXhSZXF1ZXN0IHtcbiAgdXJsPzogc3RyaW5nO1xuICBib2R5PzogYW55O1xuICB1c2VyPzogc3RyaW5nO1xuICBhc3luYz86IGJvb2xlYW47XG4gIG1ldGhvZDogc3RyaW5nO1xuICBoZWFkZXJzPzogT2JqZWN0O1xuICB0aW1lb3V0PzogbnVtYmVyO1xuICBwYXNzd29yZD86IHN0cmluZztcbiAgaGFzQ29udGVudD86IGJvb2xlYW47XG4gIGNyb3NzRG9tYWluPzogYm9vbGVhbjtcbiAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgY3JlYXRlWEhSPzogKCkgPT4gWE1MSHR0cFJlcXVlc3Q7XG4gIHByb2dyZXNzU3Vic2NyaWJlcj86IFN1YnNjcmliZXI8YW55PjtcbiAgcmVzdWx0U2VsZWN0b3I/OiA8VD4ocmVzcG9uc2U6IEFqYXhSZXNwb25zZSkgPT4gVDtcbiAgcmVzcG9uc2VUeXBlPzogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBnZXRDT1JTUmVxdWVzdCgpOiBYTUxIdHRwUmVxdWVzdCB7XG4gIGlmIChyb290LlhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgY29uc3QgeGhyID0gbmV3IHJvb3QuWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gISF0aGlzLndpdGhDcmVkZW50aWFscztcbiAgICB9XG4gICAgcmV0dXJuIHhocjtcbiAgfSBlbHNlIGlmICghIXJvb3QuWERvbWFpblJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IHJvb3QuWERvbWFpblJlcXVlc3QoKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NPUlMgaXMgbm90IHN1cHBvcnRlZCBieSB5b3VyIGJyb3dzZXInKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRYTUxIdHRwUmVxdWVzdCgpOiBYTUxIdHRwUmVxdWVzdCB7XG4gIGlmIChyb290LlhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgcmV0dXJuIG5ldyByb290LlhNTEh0dHBSZXF1ZXN0KCk7XG4gIH0gZWxzZSB7XG4gICAgbGV0IHByb2dJZDogc3RyaW5nO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwcm9nSWRzID0gWydNc3htbDIuWE1MSFRUUCcsICdNaWNyb3NvZnQuWE1MSFRUUCcsICdNc3htbDIuWE1MSFRUUC40LjAnXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcHJvZ0lkID0gcHJvZ0lkc1tpXTtcbiAgICAgICAgICBpZiAobmV3IHJvb3QuQWN0aXZlWE9iamVjdChwcm9nSWQpKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvL3N1cHByZXNzIGV4Y2VwdGlvbnNcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyByb290LkFjdGl2ZVhPYmplY3QocHJvZ0lkKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1hNTEh0dHBSZXF1ZXN0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgeW91ciBicm93c2VyJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpheENyZWF0aW9uTWV0aG9kIHtcbiAgPFQ+KHVybE9yUmVxdWVzdDogc3RyaW5nIHwgQWpheFJlcXVlc3QpOiBPYnNlcnZhYmxlPFQ+O1xuICBnZXQ8VD4odXJsOiBzdHJpbmcsIHJlc3VsdFNlbGVjdG9yPzogKHJlc3BvbnNlOiBBamF4UmVzcG9uc2UpID0+IFQsIGhlYWRlcnM/OiBPYmplY3QpOiBPYnNlcnZhYmxlPFQ+O1xuICBwb3N0PFQ+KHVybDogc3RyaW5nLCBib2R5PzogYW55LCBoZWFkZXJzPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxUPjtcbiAgcHV0PFQ+KHVybDogc3RyaW5nLCBib2R5PzogYW55LCBoZWFkZXJzPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxUPjtcbiAgZGVsZXRlPFQ+KHVybDogc3RyaW5nLCBoZWFkZXJzPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxUPjtcbiAgZ2V0SlNPTjxULCBSPih1cmw6IHN0cmluZywgcmVzdWx0U2VsZWN0b3I/OiAoZGF0YTogVCkgPT4gUiwgaGVhZGVycz86IE9iamVjdCk6IE9ic2VydmFibGU8Uj47XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXRSZXN1bHRTZWxlY3RvcjxUPihyZXNwb25zZTogQWpheFJlc3BvbnNlKTogVCB7XG4gIHJldHVybiByZXNwb25zZS5yZXNwb25zZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFqYXhHZXQ8VD4odXJsOiBzdHJpbmcsIHJlc3VsdFNlbGVjdG9yOiAocmVzcG9uc2U6IEFqYXhSZXNwb25zZSkgPT4gVCA9IGRlZmF1bHRHZXRSZXN1bHRTZWxlY3RvciwgaGVhZGVyczogT2JqZWN0ID0gbnVsbCkge1xuICByZXR1cm4gbmV3IEFqYXhPYnNlcnZhYmxlPFQ+KHsgbWV0aG9kOiAnR0VUJywgdXJsLCByZXN1bHRTZWxlY3RvciwgaGVhZGVycyB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhamF4UG9zdDxUPih1cmw6IHN0cmluZywgYm9keT86IGFueSwgaGVhZGVycz86IE9iamVjdCk6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gbmV3IEFqYXhPYnNlcnZhYmxlPFQ+KHsgbWV0aG9kOiAnUE9TVCcsIHVybCwgYm9keSwgaGVhZGVycyB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhamF4RGVsZXRlPFQ+KHVybDogc3RyaW5nLCBoZWFkZXJzPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxUPiB7XG4gIHJldHVybiBuZXcgQWpheE9ic2VydmFibGU8VD4oeyBtZXRob2Q6ICdERUxFVEUnLCB1cmwsIGhlYWRlcnMgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gYWpheFB1dDxUPih1cmw6IHN0cmluZywgYm9keT86IGFueSwgaGVhZGVycz86IE9iamVjdCk6IE9ic2VydmFibGU8VD4ge1xuICByZXR1cm4gbmV3IEFqYXhPYnNlcnZhYmxlPFQ+KHsgbWV0aG9kOiAnUFVUJywgdXJsLCBib2R5LCBoZWFkZXJzIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFqYXhHZXRKU09OPFQsIFI+KHVybDogc3RyaW5nLCByZXN1bHRTZWxlY3Rvcj86IChkYXRhOiBUKSA9PiBSLCBoZWFkZXJzPzogT2JqZWN0KTogT2JzZXJ2YWJsZTxSPiB7XG4gIGNvbnN0IGZpbmFsUmVzdWx0U2VsZWN0b3IgPSByZXN1bHRTZWxlY3RvciA/IChyZXM6IEFqYXhSZXNwb25zZSkgPT4gcmVzdWx0U2VsZWN0b3IocmVzLnJlc3BvbnNlKSA6IChyZXM6IEFqYXhSZXNwb25zZSkgPT4gcmVzLnJlc3BvbnNlO1xuICByZXR1cm4gbmV3IEFqYXhPYnNlcnZhYmxlPFI+KHsgbWV0aG9kOiAnR0VUJywgdXJsLCByZXNwb25zZVR5cGU6ICdqc29uJywgcmVzdWx0U2VsZWN0b3I6IGZpbmFsUmVzdWx0U2VsZWN0b3IsIGhlYWRlcnMgfSk7XG59O1xuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIEFqYXhPYnNlcnZhYmxlPFQ+IGV4dGVuZHMgT2JzZXJ2YWJsZTxUPiB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIG9ic2VydmFibGUgZm9yIGFuIEFqYXggcmVxdWVzdCB3aXRoIGVpdGhlciBhIHJlcXVlc3Qgb2JqZWN0IHdpdGhcbiAgICogdXJsLCBoZWFkZXJzLCBldGMgb3IgYSBzdHJpbmcgZm9yIGEgVVJMLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBzb3VyY2UgPSBSeC5PYnNlcnZhYmxlLmFqYXgoJy9wcm9kdWN0cycpO1xuICAgKiBzb3VyY2UgPSBSeC5PYnNlcnZhYmxlLmFqYXgoeyB1cmw6ICdwcm9kdWN0cycsIG1ldGhvZDogJ0dFVCcgfSk7XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gcmVxdWVzdCBDYW4gYmUgb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAqICAgQSBzdHJpbmcgb2YgdGhlIFVSTCB0byBtYWtlIHRoZSBBamF4IGNhbGwuXG4gICAqICAgQW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzXG4gICAqICAgLSB1cmw6IFVSTCBvZiB0aGUgcmVxdWVzdFxuICAgKiAgIC0gYm9keTogVGhlIGJvZHkgb2YgdGhlIHJlcXVlc3RcbiAgICogICAtIG1ldGhvZDogTWV0aG9kIG9mIHRoZSByZXF1ZXN0LCBzdWNoIGFzIEdFVCwgUE9TVCwgUFVULCBQQVRDSCwgREVMRVRFXG4gICAqICAgLSBhc3luYzogV2hldGhlciB0aGUgcmVxdWVzdCBpcyBhc3luY1xuICAgKiAgIC0gaGVhZGVyczogT3B0aW9uYWwgaGVhZGVyc1xuICAgKiAgIC0gY3Jvc3NEb21haW46IHRydWUgaWYgYSBjcm9zcyBkb21haW4gcmVxdWVzdCwgZWxzZSBmYWxzZVxuICAgKiAgIC0gY3JlYXRlWEhSOiBhIGZ1bmN0aW9uIHRvIG92ZXJyaWRlIGlmIHlvdSBuZWVkIHRvIHVzZSBhbiBhbHRlcm5hdGVcbiAgICogICBYTUxIdHRwUmVxdWVzdCBpbXBsZW1lbnRhdGlvbi5cbiAgICogICAtIHJlc3VsdFNlbGVjdG9yOiBhIGZ1bmN0aW9uIHRvIHVzZSB0byBhbHRlciB0aGUgb3V0cHV0IHZhbHVlIHR5cGUgb2ZcbiAgICogICB0aGUgT2JzZXJ2YWJsZS4gR2V0cyB7QGxpbmsgQWpheFJlc3BvbnNlfSBhcyBhbiBhcmd1bWVudC5cbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZSBjb250YWluaW5nIHRoZSBYTUxIdHRwUmVxdWVzdC5cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIGFqYXhcbiAgICogQG93bmVyIE9ic2VydmFibGVcbiAgKi9cbiAgc3RhdGljIGNyZWF0ZTogQWpheENyZWF0aW9uTWV0aG9kID0gKCgpID0+IHtcbiAgICBjb25zdCBjcmVhdGU6IGFueSA9ICh1cmxPclJlcXVlc3Q6IHN0cmluZyB8IEFqYXhSZXF1ZXN0KSA9PiB7XG4gICAgICByZXR1cm4gbmV3IEFqYXhPYnNlcnZhYmxlKHVybE9yUmVxdWVzdCk7XG4gICAgfTtcblxuICAgIGNyZWF0ZS5nZXQgPSBhamF4R2V0O1xuICAgIGNyZWF0ZS5wb3N0ID0gYWpheFBvc3Q7XG4gICAgY3JlYXRlLmRlbGV0ZSA9IGFqYXhEZWxldGU7XG4gICAgY3JlYXRlLnB1dCA9IGFqYXhQdXQ7XG4gICAgY3JlYXRlLmdldEpTT04gPSBhamF4R2V0SlNPTjtcblxuICAgIHJldHVybiA8QWpheENyZWF0aW9uTWV0aG9kPmNyZWF0ZTtcbiAgfSkoKTtcblxuICBwcml2YXRlIHJlcXVlc3Q6IEFqYXhSZXF1ZXN0O1xuXG4gIGNvbnN0cnVjdG9yKHVybE9yUmVxdWVzdDogc3RyaW5nIHwgQWpheFJlcXVlc3QpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgY29uc3QgcmVxdWVzdDogQWpheFJlcXVlc3QgPSB7XG4gICAgICBhc3luYzogdHJ1ZSxcbiAgICAgIGNyZWF0ZVhIUjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyb3NzRG9tYWluID8gZ2V0Q09SU1JlcXVlc3QuY2FsbCh0aGlzKSA6IGdldFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB9LFxuICAgICAgY3Jvc3NEb21haW46IGZhbHNlLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcbiAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgdGltZW91dDogMFxuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIHVybE9yUmVxdWVzdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJlcXVlc3QudXJsID0gdXJsT3JSZXF1ZXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IHByb3AgaW4gdXJsT3JSZXF1ZXN0KSB7XG4gICAgICAgIGlmICh1cmxPclJlcXVlc3QuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICByZXF1ZXN0W3Byb3BdID0gdXJsT3JSZXF1ZXN0W3Byb3BdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gbmV3IEFqYXhTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucmVxdWVzdCk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBBamF4U3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8RXZlbnQ+IHtcbiAgcHJpdmF0ZSB4aHI6IFhNTEh0dHBSZXF1ZXN0O1xuICBwcml2YXRlIHJlc3VsdFNlbGVjdG9yOiAocmVzcG9uc2U6IEFqYXhSZXNwb25zZSkgPT4gVDtcbiAgcHJpdmF0ZSBkb25lOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VD4sIHB1YmxpYyByZXF1ZXN0OiBBamF4UmVxdWVzdCkge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcblxuICAgIGNvbnN0IGhlYWRlcnMgPSByZXF1ZXN0LmhlYWRlcnMgPSByZXF1ZXN0LmhlYWRlcnMgfHwge307XG5cbiAgICAvLyBmb3JjZSBDT1JTIGlmIHJlcXVlc3RlZFxuICAgIGlmICghcmVxdWVzdC5jcm9zc0RvbWFpbiAmJiAhaGVhZGVyc1snWC1SZXF1ZXN0ZWQtV2l0aCddKSB7XG4gICAgICBoZWFkZXJzWydYLVJlcXVlc3RlZC1XaXRoJ10gPSAnWE1MSHR0cFJlcXVlc3QnO1xuICAgIH1cblxuICAgIC8vIGVuc3VyZSBjb250ZW50IHR5cGUgaXMgc2V0XG4gICAgaWYgKCEoJ0NvbnRlbnQtVHlwZScgaW4gaGVhZGVycykgJiYgIShyb290LkZvcm1EYXRhICYmIHJlcXVlc3QuYm9keSBpbnN0YW5jZW9mIHJvb3QuRm9ybURhdGEpKSB7XG4gICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLTgnO1xuICAgIH1cblxuICAgIC8vIHByb3Blcmx5IHNlcmlhbGl6ZSBib2R5XG4gICAgcmVxdWVzdC5ib2R5ID0gdGhpcy5zZXJpYWxpemVCb2R5KHJlcXVlc3QuYm9keSwgcmVxdWVzdC5oZWFkZXJzWydDb250ZW50LVR5cGUnXSk7XG5cbiAgICB0aGlzLnJlc3VsdFNlbGVjdG9yID0gcmVxdWVzdC5yZXN1bHRTZWxlY3RvcjtcbiAgICB0aGlzLnNlbmQoKTtcbiAgfVxuXG4gIG5leHQoZTogRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgIGNvbnN0IHsgcmVzdWx0U2VsZWN0b3IsIHhociwgcmVxdWVzdCwgZGVzdGluYXRpb24gfSA9IHRoaXM7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgQWpheFJlc3BvbnNlKGUsIHhociwgcmVxdWVzdCk7XG5cbiAgICBpZiAocmVzdWx0U2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRyeUNhdGNoKHJlc3VsdFNlbGVjdG9yKShyZXNwb25zZSk7XG4gICAgICBpZiAocmVzdWx0ID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICB0aGlzLmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVzdGluYXRpb24ubmV4dChyZXN1bHQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0aW5hdGlvbi5uZXh0KHJlc3BvbnNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlbmQoKTogWE1MSHR0cFJlcXVlc3Qge1xuICAgIGNvbnN0IHtcbiAgICAgIHJlcXVlc3QsXG4gICAgICByZXF1ZXN0OiB7IHVzZXIsIG1ldGhvZCwgdXJsLCBhc3luYywgcGFzc3dvcmQsIGhlYWRlcnMsIGJvZHkgfVxuICAgIH0gPSB0aGlzO1xuICAgIGNvbnN0IGNyZWF0ZVhIUiA9IHJlcXVlc3QuY3JlYXRlWEhSO1xuICAgIGNvbnN0IHhocjogWE1MSHR0cFJlcXVlc3QgPSB0cnlDYXRjaChjcmVhdGVYSFIpLmNhbGwocmVxdWVzdCk7XG5cbiAgICBpZiAoPGFueT54aHIgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICB0aGlzLmVycm9yKGVycm9yT2JqZWN0LmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnhociA9IHhocjtcblxuICAgICAgLy8gb3BlbiBYSFIgZmlyc3RcbiAgICAgIGxldCByZXN1bHQ6IGFueTtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHJlc3VsdCA9IHRyeUNhdGNoKHhoci5vcGVuKS5jYWxsKHhociwgbWV0aG9kLCB1cmwsIGFzeW5jLCB1c2VyLCBwYXNzd29yZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSB0cnlDYXRjaCh4aHIub3BlbikuY2FsbCh4aHIsIG1ldGhvZCwgdXJsLCBhc3luYyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXN1bHQgPT09IGVycm9yT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gdGltZW91dCBhbmQgcmVzcG9uc2VUeXBlIGNhbiBiZSBzZXQgb25jZSB0aGUgWEhSIGlzIG9wZW5cbiAgICAgIHhoci50aW1lb3V0ID0gcmVxdWVzdC50aW1lb3V0O1xuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IHJlcXVlc3QucmVzcG9uc2VUeXBlO1xuXG4gICAgICAvLyBzZXQgaGVhZGVyc1xuICAgICAgdGhpcy5zZXRIZWFkZXJzKHhociwgaGVhZGVycyk7XG5cbiAgICAgIC8vIG5vdyBzZXQgdXAgdGhlIGV2ZW50c1xuICAgICAgdGhpcy5zZXR1cEV2ZW50cyh4aHIsIHJlcXVlc3QpO1xuXG4gICAgICAvLyBmaW5hbGx5IHNlbmQgdGhlIHJlcXVlc3RcbiAgICAgIGlmIChib2R5KSB7XG4gICAgICAgIHhoci5zZW5kKGJvZHkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlcmlhbGl6ZUJvZHkoYm9keTogYW55LCBjb250ZW50VHlwZT86IHN0cmluZykge1xuICAgIGlmICghYm9keSB8fCB0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBib2R5O1xuICAgIH0gZWxzZSBpZiAocm9vdC5Gb3JtRGF0YSAmJiBib2R5IGluc3RhbmNlb2Ygcm9vdC5Gb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIGJvZHk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRlbnRUeXBlKSB7XG4gICAgICBjb25zdCBzcGxpdEluZGV4ID0gY29udGVudFR5cGUuaW5kZXhPZignOycpO1xuICAgICAgaWYgKHNwbGl0SW5kZXggIT09IC0xKSB7XG4gICAgICAgIGNvbnRlbnRUeXBlID0gY29udGVudFR5cGUuc3Vic3RyaW5nKDAsIHNwbGl0SW5kZXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN3aXRjaCAoY29udGVudFR5cGUpIHtcbiAgICAgIGNhc2UgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc6XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhib2R5KS5tYXAoa2V5ID0+IGAke2VuY29kZVVSSShrZXkpfT0ke2VuY29kZVVSSShib2R5W2tleV0pfWApLmpvaW4oJyYnKTtcbiAgICAgIGNhc2UgJ2FwcGxpY2F0aW9uL2pzb24nOlxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gYm9keTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEhlYWRlcnMoeGhyOiBYTUxIdHRwUmVxdWVzdCwgaGVhZGVyczogT2JqZWN0KSB7XG4gICAgZm9yIChsZXQga2V5IGluIGhlYWRlcnMpIHtcbiAgICAgIGlmIChoZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBFdmVudHMoeGhyOiBYTUxIdHRwUmVxdWVzdCwgcmVxdWVzdDogQWpheFJlcXVlc3QpIHtcbiAgICBjb25zdCBwcm9ncmVzc1N1YnNjcmliZXIgPSByZXF1ZXN0LnByb2dyZXNzU3Vic2NyaWJlcjtcblxuICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiB4aHJUaW1lb3V0KGUpIHtcbiAgICAgIGNvbnN0IHtzdWJzY3JpYmVyLCBwcm9ncmVzc1N1YnNjcmliZXIsIHJlcXVlc3QgfSA9ICg8YW55PnhoclRpbWVvdXQpO1xuICAgICAgaWYgKHByb2dyZXNzU3Vic2NyaWJlcikge1xuICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIuZXJyb3IoZSk7XG4gICAgICB9XG4gICAgICBzdWJzY3JpYmVyLmVycm9yKG5ldyBBamF4VGltZW91dEVycm9yKHRoaXMsIHJlcXVlc3QpKTsgLy9UT0RPOiBNYWtlIGJldHRlcmVyLlxuICAgIH07XG4gICAgKDxhbnk+eGhyLm9udGltZW91dCkucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgKDxhbnk+eGhyLm9udGltZW91dCkuc3Vic2NyaWJlciA9IHRoaXM7XG4gICAgKDxhbnk+eGhyLm9udGltZW91dCkucHJvZ3Jlc3NTdWJzY3JpYmVyID0gcHJvZ3Jlc3NTdWJzY3JpYmVyO1xuXG4gICAgaWYgKHhoci51cGxvYWQgJiYgJ3dpdGhDcmVkZW50aWFscycgaW4geGhyICYmIHJvb3QuWERvbWFpblJlcXVlc3QpIHtcbiAgICAgIGlmIChwcm9ncmVzc1N1YnNjcmliZXIpIHtcbiAgICAgICAgeGhyLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiB4aHJQcm9ncmVzcyhlKSB7XG4gICAgICAgICAgY29uc3QgeyBwcm9ncmVzc1N1YnNjcmliZXIgfSA9ICg8YW55PnhoclByb2dyZXNzKTtcbiAgICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIubmV4dChlKTtcbiAgICAgICAgfTtcbiAgICAgICAgKDxhbnk+eGhyLm9ucHJvZ3Jlc3MpLnByb2dyZXNzU3Vic2NyaWJlciA9IHByb2dyZXNzU3Vic2NyaWJlcjtcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiB4aHJFcnJvcihlKSB7XG4gICAgICAgIGNvbnN0IHsgcHJvZ3Jlc3NTdWJzY3JpYmVyLCBzdWJzY3JpYmVyLCByZXF1ZXN0IH0gPSAoPGFueT54aHJFcnJvcik7XG4gICAgICAgIGlmIChwcm9ncmVzc1N1YnNjcmliZXIpIHtcbiAgICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaWJlci5lcnJvcihuZXcgQWpheEVycm9yKCdhamF4IGVycm9yJywgdGhpcywgcmVxdWVzdCkpO1xuICAgICAgfTtcbiAgICAgICg8YW55Pnhoci5vbmVycm9yKS5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICAgICg8YW55Pnhoci5vbmVycm9yKS5zdWJzY3JpYmVyID0gdGhpcztcbiAgICAgICg8YW55Pnhoci5vbmVycm9yKS5wcm9ncmVzc1N1YnNjcmliZXIgPSBwcm9ncmVzc1N1YnNjcmliZXI7XG4gICAgfVxuXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIHhoclJlYWR5U3RhdGVDaGFuZ2UoZSkge1xuICAgICAgY29uc3QgeyBzdWJzY3JpYmVyLCBwcm9ncmVzc1N1YnNjcmliZXIsIHJlcXVlc3QgfSA9ICg8YW55PnhoclJlYWR5U3RhdGVDaGFuZ2UpO1xuICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAvLyBub3JtYWxpemUgSUU5IGJ1ZyAoaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTQ1MClcbiAgICAgICAgbGV0IHN0YXR1czogbnVtYmVyID0gdGhpcy5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiB0aGlzLnN0YXR1cztcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBhbnkgPSAodGhpcy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/ICAoXG4gICAgICAgICAgdGhpcy5yZXNwb25zZSB8fCB0aGlzLnJlc3BvbnNlVGV4dCkgOiB0aGlzLnJlc3BvbnNlKTtcblxuICAgICAgICAvLyBmaXggc3RhdHVzIGNvZGUgd2hlbiBpdCBpcyAwICgwIHN0YXR1cyBpcyB1bmRvY3VtZW50ZWQpLlxuICAgICAgICAvLyBPY2N1cnMgd2hlbiBhY2Nlc3NpbmcgZmlsZSByZXNvdXJjZXMgb3Igb24gQW5kcm9pZCA0LjEgc3RvY2sgYnJvd3NlclxuICAgICAgICAvLyB3aGlsZSByZXRyaWV2aW5nIGZpbGVzIGZyb20gYXBwbGljYXRpb24gY2FjaGUuXG4gICAgICAgIGlmIChzdGF0dXMgPT09IDApIHtcbiAgICAgICAgICBzdGF0dXMgPSByZXNwb25zZSA/IDIwMCA6IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoMjAwIDw9IHN0YXR1cyAmJiBzdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICBpZiAocHJvZ3Jlc3NTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGUpO1xuICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAocHJvZ3Jlc3NTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICBwcm9ncmVzc1N1YnNjcmliZXIuZXJyb3IoZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IobmV3IEFqYXhFcnJvcignYWpheCBlcnJvciAnICsgc3RhdHVzLCB0aGlzLCByZXF1ZXN0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgICg8YW55Pnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UpLnN1YnNjcmliZXIgPSB0aGlzO1xuICAgICg8YW55Pnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UpLnByb2dyZXNzU3Vic2NyaWJlciA9IHByb2dyZXNzU3Vic2NyaWJlcjtcbiAgICAoPGFueT54aHIub25yZWFkeXN0YXRlY2hhbmdlKS5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgfVxuXG4gIHVuc3Vic2NyaWJlKCkge1xuICAgIGNvbnN0IHsgZG9uZSwgeGhyIH0gPSB0aGlzO1xuICAgIGlmICghZG9uZSAmJiB4aHIgJiYgeGhyLnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgIHhoci5hYm9ydCgpO1xuICAgIH1cbiAgICBzdXBlci51bnN1YnNjcmliZSgpO1xuICB9XG59XG5cbi8qKlxuICogQSBub3JtYWxpemVkIEFKQVggcmVzcG9uc2UuXG4gKlxuICogQHNlZSB7QGxpbmsgYWpheH1cbiAqXG4gKiBAY2xhc3MgQWpheFJlc3BvbnNlXG4gKi9cbmV4cG9ydCBjbGFzcyBBamF4UmVzcG9uc2Uge1xuICAvKiogQHR5cGUge251bWJlcn0gVGhlIEhUVFAgc3RhdHVzIGNvZGUgKi9cbiAgc3RhdHVzOiBudW1iZXI7XG5cbiAgLyoqIEB0eXBlIHtzdHJpbmd8QXJyYXlCdWZmZXJ8RG9jdW1lbnR8b2JqZWN0fGFueX0gVGhlIHJlc3BvbnNlIGRhdGEgKi9cbiAgcmVzcG9uc2U6IGFueTtcblxuICAvKiogQHR5cGUge3N0cmluZ30gVGhlIHJhdyByZXNwb25zZVRleHQgKi9cbiAgcmVzcG9uc2VUZXh0OiBzdHJpbmc7XG5cbiAgLyoqIEB0eXBlIHtzdHJpbmd9IFRoZSByZXNwb25zZVR5cGUgKGUuZy4gJ2pzb24nLCAnYXJyYXlidWZmZXInLCBvciAneG1sJykgKi9cbiAgcmVzcG9uc2VUeXBlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG9yaWdpbmFsRXZlbnQ6IEV2ZW50LCBwdWJsaWMgeGhyOiBYTUxIdHRwUmVxdWVzdCwgcHVibGljIHJlcXVlc3Q6IEFqYXhSZXF1ZXN0KSB7XG4gICAgdGhpcy5zdGF0dXMgPSB4aHIuc3RhdHVzO1xuICAgIHRoaXMucmVzcG9uc2VUeXBlID0geGhyLnJlc3BvbnNlVHlwZSB8fCByZXF1ZXN0LnJlc3BvbnNlVHlwZTtcblxuICAgIHN3aXRjaCAodGhpcy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIGNhc2UgJ2pzb24nOlxuICAgICAgICBpZiAoJ3Jlc3BvbnNlJyBpbiB4aHIpIHtcbiAgICAgICAgICAvL0lFIGRvZXMgbm90IHN1cHBvcnQganNvbiBhcyByZXNwb25zZVR5cGUsIHBhcnNlIGl0IGludGVybmFsbHlcbiAgICAgICAgICB0aGlzLnJlc3BvbnNlID0geGhyLnJlc3BvbnNlVHlwZSA/IHhoci5yZXNwb25zZSA6IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlIHx8IHhoci5yZXNwb25zZVRleHQgfHwgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQgfHwgJycpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAneG1sJzpcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHhoci5yZXNwb25zZVhNTDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSAoJ3Jlc3BvbnNlJyBpbiB4aHIpID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQSBub3JtYWxpemVkIEFKQVggZXJyb3IuXG4gKlxuICogQHNlZSB7QGxpbmsgYWpheH1cbiAqXG4gKiBAY2xhc3MgQWpheEVycm9yXG4gKi9cbmV4cG9ydCBjbGFzcyBBamF4RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIC8qKiBAdHlwZSB7WE1MSHR0cFJlcXVlc3R9IFRoZSBYSFIgaW5zdGFuY2UgYXNzb2NpYXRlZCB3aXRoIHRoZSBlcnJvciAqL1xuICB4aHI6IFhNTEh0dHBSZXF1ZXN0O1xuXG4gIC8qKiBAdHlwZSB7QWpheFJlcXVlc3R9IFRoZSBBamF4UmVxdWVzdCBhc3NvY2lhdGVkIHdpdGggdGhlIGVycm9yICovXG4gIHJlcXVlc3Q6IEFqYXhSZXF1ZXN0O1xuXG4gIC8qKiBAdHlwZSB7bnVtYmVyfSBUaGUgSFRUUCBzdGF0dXMgY29kZSAqL1xuICBzdGF0dXM6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIHhocjogWE1MSHR0cFJlcXVlc3QsIHJlcXVlc3Q6IEFqYXhSZXF1ZXN0KSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnhociA9IHhocjtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgIHRoaXMuc3RhdHVzID0geGhyLnN0YXR1cztcbiAgfVxufVxuXG4vKipcbiAqIEBzZWUge0BsaW5rIGFqYXh9XG4gKlxuICogQGNsYXNzIEFqYXhUaW1lb3V0RXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIEFqYXhUaW1lb3V0RXJyb3IgZXh0ZW5kcyBBamF4RXJyb3Ige1xuICBjb25zdHJ1Y3Rvcih4aHI6IFhNTEh0dHBSZXF1ZXN0LCByZXF1ZXN0OiBBamF4UmVxdWVzdCkge1xuICAgIHN1cGVyKCdhamF4IHRpbWVvdXQnLCB4aHIsIHJlcXVlc3QpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
