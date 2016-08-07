System.register(['angular2/src/compiler/xhr', 'angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var xhr_1, collection_1, lang_1, exceptions_1, async_1;
    var MockXHR, _PendingRequest, _Expectation;
    return {
        setters:[
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            /**
             * A mock implementation of {@link XHR} that allows outgoing requests to be mocked
             * and responded to within a single test, without going to the network.
             */
            MockXHR = (function (_super) {
                __extends(MockXHR, _super);
                function MockXHR() {
                    _super.apply(this, arguments);
                    this._expectations = [];
                    this._definitions = new collection_1.Map();
                    this._requests = [];
                }
                MockXHR.prototype.get = function (url) {
                    var request = new _PendingRequest(url);
                    this._requests.push(request);
                    return request.getPromise();
                };
                /**
                 * Add an expectation for the given URL. Incoming requests will be checked against
                 * the next expectation (in FIFO order). The `verifyNoOutstandingExpectations` method
                 * can be used to check if any expectations have not yet been met.
                 *
                 * The response given will be returned if the expectation matches.
                 */
                MockXHR.prototype.expect = function (url, response) {
                    var expectation = new _Expectation(url, response);
                    this._expectations.push(expectation);
                };
                /**
                 * Add a definition for the given URL to return the given response. Unlike expectations,
                 * definitions have no order and will satisfy any matching request at any time. Also
                 * unlike expectations, unused definitions do not cause `verifyNoOutstandingExpectations`
                 * to return an error.
                 */
                MockXHR.prototype.when = function (url, response) { this._definitions.set(url, response); };
                /**
                 * Process pending requests and verify there are no outstanding expectations. Also fails
                 * if no requests are pending.
                 */
                MockXHR.prototype.flush = function () {
                    if (this._requests.length === 0) {
                        throw new exceptions_1.BaseException('No pending requests to flush');
                    }
                    do {
                        this._processRequest(this._requests.shift());
                    } while (this._requests.length > 0);
                    this.verifyNoOutstandingExpectations();
                };
                /**
                 * Throw an exception if any expectations have not been satisfied.
                 */
                MockXHR.prototype.verifyNoOutstandingExpectations = function () {
                    if (this._expectations.length === 0)
                        return;
                    var urls = [];
                    for (var i = 0; i < this._expectations.length; i++) {
                        var expectation = this._expectations[i];
                        urls.push(expectation.url);
                    }
                    throw new exceptions_1.BaseException("Unsatisfied requests: " + urls.join(', '));
                };
                MockXHR.prototype._processRequest = function (request) {
                    var url = request.url;
                    if (this._expectations.length > 0) {
                        var expectation = this._expectations[0];
                        if (expectation.url == url) {
                            collection_1.ListWrapper.remove(this._expectations, expectation);
                            request.complete(expectation.response);
                            return;
                        }
                    }
                    if (this._definitions.has(url)) {
                        var response = this._definitions.get(url);
                        request.complete(lang_1.normalizeBlank(response));
                        return;
                    }
                    throw new exceptions_1.BaseException("Unexpected request " + url);
                };
                return MockXHR;
            }(xhr_1.XHR));
            exports_1("MockXHR", MockXHR);
            _PendingRequest = (function () {
                function _PendingRequest(url) {
                    this.url = url;
                    this.completer = async_1.PromiseWrapper.completer();
                }
                _PendingRequest.prototype.complete = function (response) {
                    if (lang_1.isBlank(response)) {
                        this.completer.reject("Failed to load " + this.url, null);
                    }
                    else {
                        this.completer.resolve(response);
                    }
                };
                _PendingRequest.prototype.getPromise = function () { return this.completer.promise; };
                return _PendingRequest;
            }());
            _Expectation = (function () {
                function _Expectation(url, response) {
                    this.url = url;
                    this.response = response;
                }
                return _Expectation;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci94aHJfbW9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBTUE7OztlQUdHO1lBQ0g7Z0JBQTZCLDJCQUFHO2dCQUFoQztvQkFBNkIsOEJBQUc7b0JBQ3RCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztvQkFDbkMsaUJBQVksR0FBRyxJQUFJLGdCQUFHLEVBQWtCLENBQUM7b0JBQ3pDLGNBQVMsR0FBc0IsRUFBRSxDQUFDO2dCQStFNUMsQ0FBQztnQkE3RUMscUJBQUcsR0FBSCxVQUFJLEdBQVc7b0JBQ2IsSUFBSSxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUM5QixDQUFDO2dCQUVEOzs7Ozs7bUJBTUc7Z0JBQ0gsd0JBQU0sR0FBTixVQUFPLEdBQVcsRUFBRSxRQUFnQjtvQkFDbEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxZQUFZLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDdkMsQ0FBQztnQkFFRDs7Ozs7bUJBS0c7Z0JBQ0gsc0JBQUksR0FBSixVQUFLLEdBQVcsRUFBRSxRQUFnQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTdFOzs7bUJBR0c7Z0JBQ0gsdUJBQUssR0FBTDtvQkFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNLElBQUks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LENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ25DLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxvQ0FBVSxHQUFWLGNBQWdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLHNCQUFDO1lBQUQsQ0FsQkEsQUFrQkMsSUFBQTtZQUVEO2dCQUdFLHNCQUFZLEdBQVcsRUFBRSxRQUFnQjtvQkFDdkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7b0JBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQzNCLENBQUM7Z0JBQ0gsbUJBQUM7WUFBRCxDQVBBLEFBT0MsSUFBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIveGhyX21vY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1hIUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3hocic7XG5pbXBvcnQge0xpc3RXcmFwcGVyLCBNYXAsIE1hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzQmxhbmssIGlzUHJlc2VudCwgbm9ybWFsaXplQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb24sIFdyYXBwZWRFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1Byb21pc2VDb21wbGV0ZXIsIFByb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcblxuLyoqXG4gKiBBIG1vY2sgaW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIFhIUn0gdGhhdCBhbGxvd3Mgb3V0Z29pbmcgcmVxdWVzdHMgdG8gYmUgbW9ja2VkXG4gKiBhbmQgcmVzcG9uZGVkIHRvIHdpdGhpbiBhIHNpbmdsZSB0ZXN0LCB3aXRob3V0IGdvaW5nIHRvIHRoZSBuZXR3b3JrLlxuICovXG5leHBvcnQgY2xhc3MgTW9ja1hIUiBleHRlbmRzIFhIUiB7XG4gIHByaXZhdGUgX2V4cGVjdGF0aW9uczogX0V4cGVjdGF0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBfZGVmaW5pdGlvbnMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBwcml2YXRlIF9yZXF1ZXN0czogX1BlbmRpbmdSZXF1ZXN0W10gPSBbXTtcblxuICBnZXQodXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IF9QZW5kaW5nUmVxdWVzdCh1cmwpO1xuICAgIHRoaXMuX3JlcXVlc3RzLnB1c2gocmVxdWVzdCk7XG4gICAgcmV0dXJuIHJlcXVlc3QuZ2V0UHJvbWlzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBleHBlY3RhdGlvbiBmb3IgdGhlIGdpdmVuIFVSTC4gSW5jb21pbmcgcmVxdWVzdHMgd2lsbCBiZSBjaGVja2VkIGFnYWluc3RcbiAgICogdGhlIG5leHQgZXhwZWN0YXRpb24gKGluIEZJRk8gb3JkZXIpLiBUaGUgYHZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbnNgIG1ldGhvZFxuICAgKiBjYW4gYmUgdXNlZCB0byBjaGVjayBpZiBhbnkgZXhwZWN0YXRpb25zIGhhdmUgbm90IHlldCBiZWVuIG1ldC5cbiAgICpcbiAgICogVGhlIHJlc3BvbnNlIGdpdmVuIHdpbGwgYmUgcmV0dXJuZWQgaWYgdGhlIGV4cGVjdGF0aW9uIG1hdGNoZXMuXG4gICAqL1xuICBleHBlY3QodXJsOiBzdHJpbmcsIHJlc3BvbnNlOiBzdHJpbmcpIHtcbiAgICB2YXIgZXhwZWN0YXRpb24gPSBuZXcgX0V4cGVjdGF0aW9uKHVybCwgcmVzcG9uc2UpO1xuICAgIHRoaXMuX2V4cGVjdGF0aW9ucy5wdXNoKGV4cGVjdGF0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBkZWZpbml0aW9uIGZvciB0aGUgZ2l2ZW4gVVJMIHRvIHJldHVybiB0aGUgZ2l2ZW4gcmVzcG9uc2UuIFVubGlrZSBleHBlY3RhdGlvbnMsXG4gICAqIGRlZmluaXRpb25zIGhhdmUgbm8gb3JkZXIgYW5kIHdpbGwgc2F0aXNmeSBhbnkgbWF0Y2hpbmcgcmVxdWVzdCBhdCBhbnkgdGltZS4gQWxzb1xuICAgKiB1bmxpa2UgZXhwZWN0YXRpb25zLCB1bnVzZWQgZGVmaW5pdGlvbnMgZG8gbm90IGNhdXNlIGB2ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb25zYFxuICAgKiB0byByZXR1cm4gYW4gZXJyb3IuXG4gICAqL1xuICB3aGVuKHVybDogc3RyaW5nLCByZXNwb25zZTogc3RyaW5nKSB7IHRoaXMuX2RlZmluaXRpb25zLnNldCh1cmwsIHJlc3BvbnNlKTsgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHBlbmRpbmcgcmVxdWVzdHMgYW5kIHZlcmlmeSB0aGVyZSBhcmUgbm8gb3V0c3RhbmRpbmcgZXhwZWN0YXRpb25zLiBBbHNvIGZhaWxzXG4gICAqIGlmIG5vIHJlcXVlc3RzIGFyZSBwZW5kaW5nLlxuICAgKi9cbiAgZmx1c2goKSB7XG4gICAgaWYgKHRoaXMuX3JlcXVlc3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ05vIHBlbmRpbmcgcmVxdWVzdHMgdG8gZmx1c2gnKTtcbiAgICB9XG5cbiAgICBkbyB7XG4gICAgICB0aGlzLl9wcm9jZXNzUmVxdWVzdCh0aGlzLl9yZXF1ZXN0cy5zaGlmdCgpKTtcbiAgICB9IHdoaWxlICh0aGlzLl9yZXF1ZXN0cy5sZW5ndGggPiAwKTtcblxuICAgIHRoaXMudmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9ucygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRocm93IGFuIGV4Y2VwdGlvbiBpZiBhbnkgZXhwZWN0YXRpb25zIGhhdmUgbm90IGJlZW4gc2F0aXNmaWVkLlxuICAgKi9cbiAgdmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9ucygpIHtcbiAgICBpZiAodGhpcy5fZXhwZWN0YXRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgdmFyIHVybHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2V4cGVjdGF0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGV4cGVjdGF0aW9uID0gdGhpcy5fZXhwZWN0YXRpb25zW2ldO1xuICAgICAgdXJscy5wdXNoKGV4cGVjdGF0aW9uLnVybCk7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFVuc2F0aXNmaWVkIHJlcXVlc3RzOiAke3VybHMuam9pbignLCAnKX1gKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Byb2Nlc3NSZXF1ZXN0KHJlcXVlc3Q6IF9QZW5kaW5nUmVxdWVzdCkge1xuICAgIHZhciB1cmwgPSByZXF1ZXN0LnVybDtcblxuICAgIGlmICh0aGlzLl9leHBlY3RhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIGV4cGVjdGF0aW9uID0gdGhpcy5fZXhwZWN0YXRpb25zWzBdO1xuICAgICAgaWYgKGV4cGVjdGF0aW9uLnVybCA9PSB1cmwpIHtcbiAgICAgICAgTGlzdFdyYXBwZXIucmVtb3ZlKHRoaXMuX2V4cGVjdGF0aW9ucywgZXhwZWN0YXRpb24pO1xuICAgICAgICByZXF1ZXN0LmNvbXBsZXRlKGV4cGVjdGF0aW9uLnJlc3BvbnNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9kZWZpbml0aW9ucy5oYXModXJsKSkge1xuICAgICAgdmFyIHJlc3BvbnNlID0gdGhpcy5fZGVmaW5pdGlvbnMuZ2V0KHVybCk7XG4gICAgICByZXF1ZXN0LmNvbXBsZXRlKG5vcm1hbGl6ZUJsYW5rKHJlc3BvbnNlKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYFVuZXhwZWN0ZWQgcmVxdWVzdCAke3VybH1gKTtcbiAgfVxufVxuXG5jbGFzcyBfUGVuZGluZ1JlcXVlc3Qge1xuICB1cmw6IHN0cmluZztcbiAgY29tcGxldGVyOiBQcm9taXNlQ29tcGxldGVyPHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IodXJsKSB7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy5jb21wbGV0ZXIgPSBQcm9taXNlV3JhcHBlci5jb21wbGV0ZXIoKTtcbiAgfVxuXG4gIGNvbXBsZXRlKHJlc3BvbnNlOiBzdHJpbmcpIHtcbiAgICBpZiAoaXNCbGFuayhyZXNwb25zZSkpIHtcbiAgICAgIHRoaXMuY29tcGxldGVyLnJlamVjdChgRmFpbGVkIHRvIGxvYWQgJHt0aGlzLnVybH1gLCBudWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb21wbGV0ZXIucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0UHJvbWlzZSgpOiBQcm9taXNlPHN0cmluZz4geyByZXR1cm4gdGhpcy5jb21wbGV0ZXIucHJvbWlzZTsgfVxufVxuXG5jbGFzcyBfRXhwZWN0YXRpb24ge1xuICB1cmw6IHN0cmluZztcbiAgcmVzcG9uc2U6IHN0cmluZztcbiAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcsIHJlc3BvbnNlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
