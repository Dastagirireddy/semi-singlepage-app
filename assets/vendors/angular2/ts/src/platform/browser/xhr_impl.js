System.register(['angular2/src/facade/promise', 'angular2/src/facade/lang', 'angular2/src/compiler/xhr'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var promise_1, lang_1, xhr_1;
    var XHRImpl;
    return {
        setters:[
            function (promise_1_1) {
                promise_1 = promise_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            }],
        execute: function() {
            XHRImpl = (function (_super) {
                __extends(XHRImpl, _super);
                function XHRImpl() {
                    _super.apply(this, arguments);
                }
                XHRImpl.prototype.get = function (url) {
                    var completer = promise_1.PromiseWrapper.completer();
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.responseType = 'text';
                    xhr.onload = function () {
                        // responseText is the old-school way of retrieving response (supported by IE8 & 9)
                        // response/responseType properties were introduced in XHR Level2 spec (supported by IE10)
                        var response = lang_1.isPresent(xhr.response) ? xhr.response : xhr.responseText;
                        // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                        var status = xhr.status === 1223 ? 204 : xhr.status;
                        // fix status code when it is 0 (0 status is undocumented).
                        // Occurs when accessing file resources or on Android 4.1 stock browser
                        // while retrieving files from application cache.
                        if (status === 0) {
                            status = response ? 200 : 0;
                        }
                        if (200 <= status && status <= 300) {
                            completer.resolve(response);
                        }
                        else {
                            completer.reject("Failed to load " + url, null);
                        }
                    };
                    xhr.onerror = function () { completer.reject("Failed to load " + url, null); };
                    xhr.send();
                    return completer.promise;
                };
                return XHRImpl;
            }(xhr_1.XHR));
            exports_1("XHRImpl", XHRImpl);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL3hocl9pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFJQTtnQkFBNkIsMkJBQUc7Z0JBQWhDO29CQUE2Qiw4QkFBRztnQkFrQ2hDLENBQUM7Z0JBakNDLHFCQUFHLEdBQUgsVUFBSSxHQUFXO29CQUNiLElBQUksU0FBUyxHQUErQix3QkFBYyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUN2RSxJQUFJLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO29CQUMvQixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzNCLEdBQUcsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO29CQUUxQixHQUFHLENBQUMsTUFBTSxHQUFHO3dCQUNYLG1GQUFtRjt3QkFDbkYsMEZBQTBGO3dCQUMxRixJQUFJLFFBQVEsR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUM7d0JBRXpFLHlEQUF5RDt3QkFDekQsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sS0FBSyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7d0JBRXBELDJEQUEyRDt3QkFDM0QsdUVBQXVFO3dCQUN2RSxpREFBaUQ7d0JBQ2pELEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNqQixNQUFNLEdBQUcsUUFBUSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7d0JBQzlCLENBQUM7d0JBRUQsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLE1BQU0sSUFBSSxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDbkMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDOUIsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFrQixHQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ2xELENBQUM7b0JBQ0gsQ0FBQyxDQUFDO29CQUVGLEdBQUcsQ0FBQyxPQUFPLEdBQUcsY0FBYSxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFrQixHQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRTlFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDWCxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztnQkFDM0IsQ0FBQztnQkFDSCxjQUFDO1lBQUQsQ0FsQ0EsQUFrQ0MsQ0FsQzRCLFNBQUcsR0FrQy9CO1lBbENELDZCQWtDQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL3hocl9pbXBsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQcm9taXNlV3JhcHBlciwgUHJvbWlzZUNvbXBsZXRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9wcm9taXNlJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtYSFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci94aHInO1xuXG5leHBvcnQgY2xhc3MgWEhSSW1wbCBleHRlbmRzIFhIUiB7XG4gIGdldCh1cmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgdmFyIGNvbXBsZXRlcjogUHJvbWlzZUNvbXBsZXRlciA8IHN0cmluZyA+PSBQcm9taXNlV3JhcHBlci5jb21wbGV0ZXIoKTtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0JztcblxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIHJlc3BvbnNlVGV4dCBpcyB0aGUgb2xkLXNjaG9vbCB3YXkgb2YgcmV0cmlldmluZyByZXNwb25zZSAoc3VwcG9ydGVkIGJ5IElFOCAmIDkpXG4gICAgICAvLyByZXNwb25zZS9yZXNwb25zZVR5cGUgcHJvcGVydGllcyB3ZXJlIGludHJvZHVjZWQgaW4gWEhSIExldmVsMiBzcGVjIChzdXBwb3J0ZWQgYnkgSUUxMClcbiAgICAgIHZhciByZXNwb25zZSA9IGlzUHJlc2VudCh4aHIucmVzcG9uc2UpID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dDtcblxuICAgICAgLy8gbm9ybWFsaXplIElFOSBidWcgKGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzE0NTApXG4gICAgICB2YXIgc3RhdHVzID0geGhyLnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHhoci5zdGF0dXM7XG5cbiAgICAgIC8vIGZpeCBzdGF0dXMgY29kZSB3aGVuIGl0IGlzIDAgKDAgc3RhdHVzIGlzIHVuZG9jdW1lbnRlZCkuXG4gICAgICAvLyBPY2N1cnMgd2hlbiBhY2Nlc3NpbmcgZmlsZSByZXNvdXJjZXMgb3Igb24gQW5kcm9pZCA0LjEgc3RvY2sgYnJvd3NlclxuICAgICAgLy8gd2hpbGUgcmV0cmlldmluZyBmaWxlcyBmcm9tIGFwcGxpY2F0aW9uIGNhY2hlLlxuICAgICAgaWYgKHN0YXR1cyA9PT0gMCkge1xuICAgICAgICBzdGF0dXMgPSByZXNwb25zZSA/IDIwMCA6IDA7XG4gICAgICB9XG5cbiAgICAgIGlmICgyMDAgPD0gc3RhdHVzICYmIHN0YXR1cyA8PSAzMDApIHtcbiAgICAgICAgY29tcGxldGVyLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcGxldGVyLnJlamVjdChgRmFpbGVkIHRvIGxvYWQgJHt1cmx9YCwgbnVsbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7IGNvbXBsZXRlci5yZWplY3QoYEZhaWxlZCB0byBsb2FkICR7dXJsfWAsIG51bGwpOyB9O1xuXG4gICAgeGhyLnNlbmQoKTtcbiAgICByZXR1cm4gY29tcGxldGVyLnByb21pc2U7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
