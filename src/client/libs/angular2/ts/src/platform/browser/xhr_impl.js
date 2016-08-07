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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2Jyb3dzZXIveGhyX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUlBO2dCQUE2QiwyQkFBRztnQkFBaEM7b0JBQTZCLDhCQUFHO2dCQWtDaEMsQ0FBQztnQkFqQ0MscUJBQUcsR0FBSCxVQUFJLEdBQVc7b0JBQ2IsSUFBSSxTQUFTLEdBQStCLHdCQUFjLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ3ZFLElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7b0JBQy9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDM0IsR0FBRyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7b0JBRTFCLEdBQUcsQ0FBQyxNQUFNLEdBQUc7d0JBQ1gsbUZBQW1GO3dCQUNuRiwwRkFBMEY7d0JBQzFGLElBQUksUUFBUSxHQUFHLGdCQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQzt3QkFFekUseURBQXlEO3dCQUN6RCxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxLQUFLLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQzt3QkFFcEQsMkRBQTJEO3dCQUMzRCx1RUFBdUU7d0JBQ3ZFLGlEQUFpRDt3QkFDakQsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2pCLE1BQU0sR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQzt3QkFDOUIsQ0FBQzt3QkFFRCxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksTUFBTSxJQUFJLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUNuQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUM5QixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQWtCLEdBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDbEQsQ0FBQztvQkFDSCxDQUFDLENBQUM7b0JBRUYsR0FBRyxDQUFDLE9BQU8sR0FBRyxjQUFhLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQWtCLEdBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFOUUsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNYLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2dCQUMzQixDQUFDO2dCQUNILGNBQUM7WUFBRCxDQWxDQSxBQWtDQyxDQWxDNEIsU0FBRyxHQWtDL0I7WUFsQ0QsNkJBa0NDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vYnJvd3Nlci94aHJfaW1wbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UHJvbWlzZVdyYXBwZXIsIFByb21pc2VDb21wbGV0ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvcHJvbWlzZSc7XG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7WEhSfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIveGhyJztcblxuZXhwb3J0IGNsYXNzIFhIUkltcGwgZXh0ZW5kcyBYSFIge1xuICBnZXQodXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHZhciBjb21wbGV0ZXI6IFByb21pc2VDb21wbGV0ZXIgPCBzdHJpbmcgPj0gUHJvbWlzZVdyYXBwZXIuY29tcGxldGVyKCk7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSAndGV4dCc7XG5cbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyByZXNwb25zZVRleHQgaXMgdGhlIG9sZC1zY2hvb2wgd2F5IG9mIHJldHJpZXZpbmcgcmVzcG9uc2UgKHN1cHBvcnRlZCBieSBJRTggJiA5KVxuICAgICAgLy8gcmVzcG9uc2UvcmVzcG9uc2VUeXBlIHByb3BlcnRpZXMgd2VyZSBpbnRyb2R1Y2VkIGluIFhIUiBMZXZlbDIgc3BlYyAoc3VwcG9ydGVkIGJ5IElFMTApXG4gICAgICB2YXIgcmVzcG9uc2UgPSBpc1ByZXNlbnQoeGhyLnJlc3BvbnNlKSA/IHhoci5yZXNwb25zZSA6IHhoci5yZXNwb25zZVRleHQ7XG5cbiAgICAgIC8vIG5vcm1hbGl6ZSBJRTkgYnVnIChodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xNDUwKVxuICAgICAgdmFyIHN0YXR1cyA9IHhoci5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiB4aHIuc3RhdHVzO1xuXG4gICAgICAvLyBmaXggc3RhdHVzIGNvZGUgd2hlbiBpdCBpcyAwICgwIHN0YXR1cyBpcyB1bmRvY3VtZW50ZWQpLlxuICAgICAgLy8gT2NjdXJzIHdoZW4gYWNjZXNzaW5nIGZpbGUgcmVzb3VyY2VzIG9yIG9uIEFuZHJvaWQgNC4xIHN0b2NrIGJyb3dzZXJcbiAgICAgIC8vIHdoaWxlIHJldHJpZXZpbmcgZmlsZXMgZnJvbSBhcHBsaWNhdGlvbiBjYWNoZS5cbiAgICAgIGlmIChzdGF0dXMgPT09IDApIHtcbiAgICAgICAgc3RhdHVzID0gcmVzcG9uc2UgPyAyMDAgOiAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoMjAwIDw9IHN0YXR1cyAmJiBzdGF0dXMgPD0gMzAwKSB7XG4gICAgICAgIGNvbXBsZXRlci5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBsZXRlci5yZWplY3QoYEZhaWxlZCB0byBsb2FkICR7dXJsfWAsIG51bGwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkgeyBjb21wbGV0ZXIucmVqZWN0KGBGYWlsZWQgdG8gbG9hZCAke3VybH1gLCBudWxsKTsgfTtcblxuICAgIHhoci5zZW5kKCk7XG4gICAgcmV0dXJuIGNvbXBsZXRlci5wcm9taXNlO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
