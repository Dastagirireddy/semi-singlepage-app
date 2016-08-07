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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3hocl9tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNQTs7O2VBR0c7WUFDSDtnQkFBNkIsMkJBQUc7Z0JBQWhDO29CQUE2Qiw4QkFBRztvQkFDdEIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO29CQUNuQyxpQkFBWSxHQUFHLElBQUksZ0JBQUcsRUFBa0IsQ0FBQztvQkFDekMsY0FBUyxHQUFzQixFQUFFLENBQUM7Z0JBK0U1QyxDQUFDO2dCQTdFQyxxQkFBRyxHQUFILFVBQUksR0FBVztvQkFDYixJQUFJLE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzlCLENBQUM7Z0JBRUQ7Ozs7OzttQkFNRztnQkFDSCx3QkFBTSxHQUFOLFVBQU8sR0FBVyxFQUFFLFFBQWdCO29CQUNsQyxJQUFJLFdBQVcsR0FBRyxJQUFJLFlBQVksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ2xELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO2dCQUVEOzs7OzttQkFLRztnQkFDSCxzQkFBSSxHQUFKLFVBQUssR0FBVyxFQUFFLFFBQWdCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFN0U7OzttQkFHRztnQkFDSCx1QkFBSyxHQUFMO29CQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hDLE1BQU0s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LE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbkMsQ0FBQztnQkFDSCxDQUFDO2dCQUVELG9DQUFVLEdBQVYsY0FBZ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsc0JBQUM7WUFBRCxDQWxCQSxBQWtCQyxJQUFBO1lBRUQ7Z0JBR0Usc0JBQVksR0FBVyxFQUFFLFFBQWdCO29CQUN2QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztvQkFDZixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDM0IsQ0FBQztnQkFDSCxtQkFBQztZQUFELENBUEEsQUFPQyxJQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3hocl9tb2NrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtYSFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci94aHInO1xuaW1wb3J0IHtMaXN0V3JhcHBlciwgTWFwLCBNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtpc0JsYW5rLCBpc1ByZXNlbnQsIG5vcm1hbGl6ZUJsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtQcm9taXNlQ29tcGxldGVyLCBQcm9taXNlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5cbi8qKlxuICogQSBtb2NrIGltcGxlbWVudGF0aW9uIG9mIHtAbGluayBYSFJ9IHRoYXQgYWxsb3dzIG91dGdvaW5nIHJlcXVlc3RzIHRvIGJlIG1vY2tlZFxuICogYW5kIHJlc3BvbmRlZCB0byB3aXRoaW4gYSBzaW5nbGUgdGVzdCwgd2l0aG91dCBnb2luZyB0byB0aGUgbmV0d29yay5cbiAqL1xuZXhwb3J0IGNsYXNzIE1vY2tYSFIgZXh0ZW5kcyBYSFIge1xuICBwcml2YXRlIF9leHBlY3RhdGlvbnM6IF9FeHBlY3RhdGlvbltdID0gW107XG4gIHByaXZhdGUgX2RlZmluaXRpb25zID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBfcmVxdWVzdHM6IF9QZW5kaW5nUmVxdWVzdFtdID0gW107XG5cbiAgZ2V0KHVybDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBfUGVuZGluZ1JlcXVlc3QodXJsKTtcbiAgICB0aGlzLl9yZXF1ZXN0cy5wdXNoKHJlcXVlc3QpO1xuICAgIHJldHVybiByZXF1ZXN0LmdldFByb21pc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gZXhwZWN0YXRpb24gZm9yIHRoZSBnaXZlbiBVUkwuIEluY29taW5nIHJlcXVlc3RzIHdpbGwgYmUgY2hlY2tlZCBhZ2FpbnN0XG4gICAqIHRoZSBuZXh0IGV4cGVjdGF0aW9uIChpbiBGSUZPIG9yZGVyKS4gVGhlIGB2ZXJpZnlOb091dHN0YW5kaW5nRXhwZWN0YXRpb25zYCBtZXRob2RcbiAgICogY2FuIGJlIHVzZWQgdG8gY2hlY2sgaWYgYW55IGV4cGVjdGF0aW9ucyBoYXZlIG5vdCB5ZXQgYmVlbiBtZXQuXG4gICAqXG4gICAqIFRoZSByZXNwb25zZSBnaXZlbiB3aWxsIGJlIHJldHVybmVkIGlmIHRoZSBleHBlY3RhdGlvbiBtYXRjaGVzLlxuICAgKi9cbiAgZXhwZWN0KHVybDogc3RyaW5nLCByZXNwb25zZTogc3RyaW5nKSB7XG4gICAgdmFyIGV4cGVjdGF0aW9uID0gbmV3IF9FeHBlY3RhdGlvbih1cmwsIHJlc3BvbnNlKTtcbiAgICB0aGlzLl9leHBlY3RhdGlvbnMucHVzaChleHBlY3RhdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgZGVmaW5pdGlvbiBmb3IgdGhlIGdpdmVuIFVSTCB0byByZXR1cm4gdGhlIGdpdmVuIHJlc3BvbnNlLiBVbmxpa2UgZXhwZWN0YXRpb25zLFxuICAgKiBkZWZpbml0aW9ucyBoYXZlIG5vIG9yZGVyIGFuZCB3aWxsIHNhdGlzZnkgYW55IG1hdGNoaW5nIHJlcXVlc3QgYXQgYW55IHRpbWUuIEFsc29cbiAgICogdW5saWtlIGV4cGVjdGF0aW9ucywgdW51c2VkIGRlZmluaXRpb25zIGRvIG5vdCBjYXVzZSBgdmVyaWZ5Tm9PdXRzdGFuZGluZ0V4cGVjdGF0aW9uc2BcbiAgICogdG8gcmV0dXJuIGFuIGVycm9yLlxuICAgKi9cbiAgd2hlbih1cmw6IHN0cmluZywgcmVzcG9uc2U6IHN0cmluZykgeyB0aGlzLl9kZWZpbml0aW9ucy5zZXQodXJsLCByZXNwb25zZSk7IH1cblxuICAvKipcbiAgICogUHJvY2VzcyBwZW5kaW5nIHJlcXVlc3RzIGFuZCB2ZXJpZnkgdGhlcmUgYXJlIG5vIG91dHN0YW5kaW5nIGV4cGVjdGF0aW9ucy4gQWxzbyBmYWlsc1xuICAgKiBpZiBubyByZXF1ZXN0cyBhcmUgcGVuZGluZy5cbiAgICovXG4gIGZsdXNoKCkge1xuICAgIGlmICh0aGlzLl9yZXF1ZXN0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdObyBwZW5kaW5nIHJlcXVlc3RzIHRvIGZsdXNoJyk7XG4gICAgfVxuXG4gICAgZG8ge1xuICAgICAgdGhpcy5fcHJvY2Vzc1JlcXVlc3QodGhpcy5fcmVxdWVzdHMuc2hpZnQoKSk7XG4gICAgfSB3aGlsZSAodGhpcy5fcmVxdWVzdHMubGVuZ3RoID4gMCk7XG5cbiAgICB0aGlzLnZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvdyBhbiBleGNlcHRpb24gaWYgYW55IGV4cGVjdGF0aW9ucyBoYXZlIG5vdCBiZWVuIHNhdGlzZmllZC5cbiAgICovXG4gIHZlcmlmeU5vT3V0c3RhbmRpbmdFeHBlY3RhdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMuX2V4cGVjdGF0aW9ucy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIHZhciB1cmxzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9leHBlY3RhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBleHBlY3RhdGlvbiA9IHRoaXMuX2V4cGVjdGF0aW9uc1tpXTtcbiAgICAgIHVybHMucHVzaChleHBlY3RhdGlvbi51cmwpO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBVbnNhdGlzZmllZCByZXF1ZXN0czogJHt1cmxzLmpvaW4oJywgJyl9YCk7XG4gIH1cblxuICBwcml2YXRlIF9wcm9jZXNzUmVxdWVzdChyZXF1ZXN0OiBfUGVuZGluZ1JlcXVlc3QpIHtcbiAgICB2YXIgdXJsID0gcmVxdWVzdC51cmw7XG5cbiAgICBpZiAodGhpcy5fZXhwZWN0YXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBleHBlY3RhdGlvbiA9IHRoaXMuX2V4cGVjdGF0aW9uc1swXTtcbiAgICAgIGlmIChleHBlY3RhdGlvbi51cmwgPT0gdXJsKSB7XG4gICAgICAgIExpc3RXcmFwcGVyLnJlbW92ZSh0aGlzLl9leHBlY3RhdGlvbnMsIGV4cGVjdGF0aW9uKTtcbiAgICAgICAgcmVxdWVzdC5jb21wbGV0ZShleHBlY3RhdGlvbi5yZXNwb25zZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZGVmaW5pdGlvbnMuaGFzKHVybCkpIHtcbiAgICAgIHZhciByZXNwb25zZSA9IHRoaXMuX2RlZmluaXRpb25zLmdldCh1cmwpO1xuICAgICAgcmVxdWVzdC5jb21wbGV0ZShub3JtYWxpemVCbGFuayhyZXNwb25zZSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBVbmV4cGVjdGVkIHJlcXVlc3QgJHt1cmx9YCk7XG4gIH1cbn1cblxuY2xhc3MgX1BlbmRpbmdSZXF1ZXN0IHtcbiAgdXJsOiBzdHJpbmc7XG4gIGNvbXBsZXRlcjogUHJvbWlzZUNvbXBsZXRlcjxzdHJpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKHVybCkge1xuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHRoaXMuY29tcGxldGVyID0gUHJvbWlzZVdyYXBwZXIuY29tcGxldGVyKCk7XG4gIH1cblxuICBjb21wbGV0ZShyZXNwb25zZTogc3RyaW5nKSB7XG4gICAgaWYgKGlzQmxhbmsocmVzcG9uc2UpKSB7XG4gICAgICB0aGlzLmNvbXBsZXRlci5yZWplY3QoYEZhaWxlZCB0byBsb2FkICR7dGhpcy51cmx9YCwgbnVsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29tcGxldGVyLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldFByb21pc2UoKTogUHJvbWlzZTxzdHJpbmc+IHsgcmV0dXJuIHRoaXMuY29tcGxldGVyLnByb21pc2U7IH1cbn1cblxuY2xhc3MgX0V4cGVjdGF0aW9uIHtcbiAgdXJsOiBzdHJpbmc7XG4gIHJlc3BvbnNlOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nLCByZXNwb25zZTogc3RyaW5nKSB7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
