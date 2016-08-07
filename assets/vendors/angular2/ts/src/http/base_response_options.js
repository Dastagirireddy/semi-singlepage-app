System.register(['angular2/core', 'angular2/src/facade/lang', './headers', './enums'], function(exports_1, context_1) {
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
    var core_1, lang_1, headers_1, enums_1;
    var ResponseOptions, BaseResponseOptions;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (headers_1_1) {
                headers_1 = headers_1_1;
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            }],
        execute: function() {
            /**
             * Creates a response options object to be optionally provided when instantiating a
             * {@link Response}.
             *
             * This class is based on the `ResponseInit` description in the [Fetch
             * Spec](https://fetch.spec.whatwg.org/#responseinit).
             *
             * All values are null by default. Typical defaults can be found in the
             * {@link BaseResponseOptions} class, which sub-classes `ResponseOptions`.
             *
             * This class may be used in tests to build {@link Response Responses} for
             * mock responses (see {@link MockBackend}).
             *
             * ### Example ([live demo](http://plnkr.co/edit/P9Jkk8e8cz6NVzbcxEsD?p=preview))
             *
             * ```typescript
             * import {ResponseOptions, Response} from 'angular2/http';
             *
             * var options = new ResponseOptions({
             *   body: '{"name":"Jeff"}'
             * });
             * var res = new Response(options);
             *
             * console.log('res.json():', res.json()); // Object {name: "Jeff"}
             * ```
             */
            ResponseOptions = (function () {
                function ResponseOptions(_a) {
                    var _b = _a === void 0 ? {} : _a, body = _b.body, status = _b.status, headers = _b.headers, statusText = _b.statusText, type = _b.type, url = _b.url;
                    this.body = lang_1.isPresent(body) ? body : null;
                    this.status = lang_1.isPresent(status) ? status : null;
                    this.headers = lang_1.isPresent(headers) ? headers : null;
                    this.statusText = lang_1.isPresent(statusText) ? statusText : null;
                    this.type = lang_1.isPresent(type) ? type : null;
                    this.url = lang_1.isPresent(url) ? url : null;
                }
                /**
                 * Creates a copy of the `ResponseOptions` instance, using the optional input as values to
                 * override
                 * existing values. This method will not change the values of the instance on which it is being
                 * called.
                 *
                 * This may be useful when sharing a base `ResponseOptions` object inside tests,
                 * where certain properties may change from test to test.
                 *
                 * ### Example ([live demo](http://plnkr.co/edit/1lXquqFfgduTFBWjNoRE?p=preview))
                 *
                 * ```typescript
                 * import {ResponseOptions, Response} from 'angular2/http';
                 *
                 * var options = new ResponseOptions({
                 *   body: {name: 'Jeff'}
                 * });
                 * var res = new Response(options.merge({
                 *   url: 'https://google.com'
                 * }));
                 * console.log('options.url:', options.url); // null
                 * console.log('res.json():', res.json()); // Object {name: "Jeff"}
                 * console.log('res.url:', res.url); // https://google.com
                 * ```
                 */
                ResponseOptions.prototype.merge = function (options) {
                    return new ResponseOptions({
                        body: lang_1.isPresent(options) && lang_1.isPresent(options.body) ? options.body : this.body,
                        status: lang_1.isPresent(options) && lang_1.isPresent(options.status) ? options.status : this.status,
                        headers: lang_1.isPresent(options) && lang_1.isPresent(options.headers) ? options.headers : this.headers,
                        statusText: lang_1.isPresent(options) && lang_1.isPresent(options.statusText) ? options.statusText :
                            this.statusText,
                        type: lang_1.isPresent(options) && lang_1.isPresent(options.type) ? options.type : this.type,
                        url: lang_1.isPresent(options) && lang_1.isPresent(options.url) ? options.url : this.url,
                    });
                };
                return ResponseOptions;
            }());
            exports_1("ResponseOptions", ResponseOptions);
            /**
             * Subclass of {@link ResponseOptions}, with default values.
             *
             * Default values:
             *  * status: 200
             *  * headers: empty {@link Headers} object
             *
             * This class could be extended and bound to the {@link ResponseOptions} class
             * when configuring an {@link Injector}, in order to override the default options
             * used by {@link Http} to create {@link Response Responses}.
             *
             * ### Example ([live demo](http://plnkr.co/edit/qv8DLT?p=preview))
             *
             * ```typescript
             * import {provide} from 'angular2/core';
             * import {bootstrap} from 'angular2/platform/browser';
             * import {HTTP_PROVIDERS, Headers, Http, BaseResponseOptions, ResponseOptions} from
             * 'angular2/http';
             * import {App} from './myapp';
             *
             * class MyOptions extends BaseResponseOptions {
             *   headers:Headers = new Headers({network: 'github'});
             * }
             *
             * bootstrap(App, [HTTP_PROVIDERS, provide(ResponseOptions, {useClass: MyOptions})]);
             * ```
             *
             * The options could also be extended when manually creating a {@link Response}
             * object.
             *
             * ### Example ([live demo](http://plnkr.co/edit/VngosOWiaExEtbstDoix?p=preview))
             *
             * ```
             * import {BaseResponseOptions, Response} from 'angular2/http';
             *
             * var options = new BaseResponseOptions();
             * var res = new Response(options.merge({
             *   body: 'Angular2',
             *   headers: new Headers({framework: 'angular'})
             * }));
             * console.log('res.headers.get("framework"):', res.headers.get('framework')); // angular
             * console.log('res.text():', res.text()); // Angular2;
             * ```
             */
            BaseResponseOptions = (function (_super) {
                __extends(BaseResponseOptions, _super);
                function BaseResponseOptions() {
                    _super.call(this, { status: 200, statusText: 'Ok', type: enums_1.ResponseType.Default, headers: new headers_1.Headers() });
                }
                BaseResponseOptions = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], BaseResponseOptions);
                return BaseResponseOptions;
            }(ResponseOptions));
            exports_1("BaseResponseOptions", BaseResponseOptions);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL2Jhc2VfcmVzcG9uc2Vfb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUF5Qkc7WUFDSDtnQkF3QkUseUJBQVksRUFBd0U7d0JBQXhFLDRCQUF3RSxFQUF2RSxjQUFJLEVBQUUsa0JBQU0sRUFBRSxvQkFBTyxFQUFFLDBCQUFVLEVBQUUsY0FBSSxFQUFFLFlBQUc7b0JBQ3ZELElBQUksQ0FBQyxJQUFJLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ25ELElBQUksQ0FBQyxVQUFVLEdBQUcsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUM1RCxJQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ3pDLENBQUM7Z0JBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkF3Qkc7Z0JBQ0gsK0JBQUssR0FBTCxVQUFNLE9BQTZCO29CQUNqQyxNQUFNLENBQUMsSUFBSSxlQUFlLENBQUM7d0JBQ3pCLElBQUksRUFBRSxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUk7d0JBQzlFLE1BQU0sRUFBRSxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU07d0JBQ3RGLE9BQU8sRUFBRSxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU87d0JBQzFGLFVBQVUsRUFBRSxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVOzRCQUNsQixJQUFJLENBQUMsVUFBVTt3QkFDakYsSUFBSSxFQUFFLGdCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksZ0JBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSTt3QkFDOUUsR0FBRyxFQUFFLGdCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksZ0JBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRztxQkFDM0UsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBQ0gsc0JBQUM7WUFBRCxDQXJFQSxBQXFFQyxJQUFBO1lBckVELDZDQXFFQyxDQUFBO1lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUEyQ0c7WUFFSDtnQkFBeUMsdUNBQWU7Z0JBQ3REO29CQUNFLGtCQUFNLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxvQkFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxpQkFBTyxFQUFFLEVBQUMsQ0FBQyxDQUFDO2dCQUM3RixDQUFDO2dCQUpIO29CQUFDLGlCQUFVLEVBQUU7O3VDQUFBO2dCQUtiLDBCQUFDO1lBQUQsQ0FKQSxBQUlDLENBSndDLGVBQWUsR0FJdkQ7WUFKRCxxREFJQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL2Jhc2VfcmVzcG9uc2Vfb3B0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNKc09iamVjdH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7SGVhZGVyc30gZnJvbSAnLi9oZWFkZXJzJztcbmltcG9ydCB7UmVzcG9uc2VUeXBlfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7UmVzcG9uc2VPcHRpb25zQXJnc30gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgcmVzcG9uc2Ugb3B0aW9ucyBvYmplY3QgdG8gYmUgb3B0aW9uYWxseSBwcm92aWRlZCB3aGVuIGluc3RhbnRpYXRpbmcgYVxuICoge0BsaW5rIFJlc3BvbnNlfS5cbiAqXG4gKiBUaGlzIGNsYXNzIGlzIGJhc2VkIG9uIHRoZSBgUmVzcG9uc2VJbml0YCBkZXNjcmlwdGlvbiBpbiB0aGUgW0ZldGNoXG4gKiBTcGVjXShodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jcmVzcG9uc2Vpbml0KS5cbiAqXG4gKiBBbGwgdmFsdWVzIGFyZSBudWxsIGJ5IGRlZmF1bHQuIFR5cGljYWwgZGVmYXVsdHMgY2FuIGJlIGZvdW5kIGluIHRoZVxuICoge0BsaW5rIEJhc2VSZXNwb25zZU9wdGlvbnN9IGNsYXNzLCB3aGljaCBzdWItY2xhc3NlcyBgUmVzcG9uc2VPcHRpb25zYC5cbiAqXG4gKiBUaGlzIGNsYXNzIG1heSBiZSB1c2VkIGluIHRlc3RzIHRvIGJ1aWxkIHtAbGluayBSZXNwb25zZSBSZXNwb25zZXN9IGZvclxuICogbW9jayByZXNwb25zZXMgKHNlZSB7QGxpbmsgTW9ja0JhY2tlbmR9KS5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvUDlKa2s4ZThjejZOVnpiY3hFc0Q/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge1Jlc3BvbnNlT3B0aW9ucywgUmVzcG9uc2V9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuICpcbiAqIHZhciBvcHRpb25zID0gbmV3IFJlc3BvbnNlT3B0aW9ucyh7XG4gKiAgIGJvZHk6ICd7XCJuYW1lXCI6XCJKZWZmXCJ9J1xuICogfSk7XG4gKiB2YXIgcmVzID0gbmV3IFJlc3BvbnNlKG9wdGlvbnMpO1xuICpcbiAqIGNvbnNvbGUubG9nKCdyZXMuanNvbigpOicsIHJlcy5qc29uKCkpOyAvLyBPYmplY3Qge25hbWU6IFwiSmVmZlwifVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNwb25zZU9wdGlvbnMge1xuICAvLyBUT0RPOiBBcnJheUJ1ZmZlciB8IEZvcm1EYXRhIHwgQmxvYlxuICAvKipcbiAgICogU3RyaW5nIG9yIE9iamVjdCByZXByZXNlbnRpbmcgdGhlIGJvZHkgb2YgdGhlIHtAbGluayBSZXNwb25zZX0uXG4gICAqL1xuICBib2R5OiBzdHJpbmcgfCBPYmplY3Q7XG4gIC8qKlxuICAgKiBIdHRwIHtAbGluayBodHRwOi8vd3d3LnczLm9yZy9Qcm90b2NvbHMvcmZjMjYxNi9yZmMyNjE2LXNlYzEwLmh0bWwgc3RhdHVzIGNvZGV9XG4gICAqIGFzc29jaWF0ZWQgd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAqL1xuICBzdGF0dXM6IG51bWJlcjtcbiAgLyoqXG4gICAqIFJlc3BvbnNlIHtAbGluayBIZWFkZXJzIGhlYWRlcnN9XG4gICAqL1xuICBoZWFkZXJzOiBIZWFkZXJzO1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBzdGF0dXNUZXh0OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHR5cGU6IFJlc3BvbnNlVHlwZTtcbiAgdXJsOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKHtib2R5LCBzdGF0dXMsIGhlYWRlcnMsIHN0YXR1c1RleHQsIHR5cGUsIHVybH06IFJlc3BvbnNlT3B0aW9uc0FyZ3MgPSB7fSkge1xuICAgIHRoaXMuYm9keSA9IGlzUHJlc2VudChib2R5KSA/IGJvZHkgOiBudWxsO1xuICAgIHRoaXMuc3RhdHVzID0gaXNQcmVzZW50KHN0YXR1cykgPyBzdGF0dXMgOiBudWxsO1xuICAgIHRoaXMuaGVhZGVycyA9IGlzUHJlc2VudChoZWFkZXJzKSA/IGhlYWRlcnMgOiBudWxsO1xuICAgIHRoaXMuc3RhdHVzVGV4dCA9IGlzUHJlc2VudChzdGF0dXNUZXh0KSA/IHN0YXR1c1RleHQgOiBudWxsO1xuICAgIHRoaXMudHlwZSA9IGlzUHJlc2VudCh0eXBlKSA/IHR5cGUgOiBudWxsO1xuICAgIHRoaXMudXJsID0gaXNQcmVzZW50KHVybCkgPyB1cmwgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoZSBgUmVzcG9uc2VPcHRpb25zYCBpbnN0YW5jZSwgdXNpbmcgdGhlIG9wdGlvbmFsIGlucHV0IGFzIHZhbHVlcyB0b1xuICAgKiBvdmVycmlkZVxuICAgKiBleGlzdGluZyB2YWx1ZXMuIFRoaXMgbWV0aG9kIHdpbGwgbm90IGNoYW5nZSB0aGUgdmFsdWVzIG9mIHRoZSBpbnN0YW5jZSBvbiB3aGljaCBpdCBpcyBiZWluZ1xuICAgKiBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgbWF5IGJlIHVzZWZ1bCB3aGVuIHNoYXJpbmcgYSBiYXNlIGBSZXNwb25zZU9wdGlvbnNgIG9iamVjdCBpbnNpZGUgdGVzdHMsXG4gICAqIHdoZXJlIGNlcnRhaW4gcHJvcGVydGllcyBtYXkgY2hhbmdlIGZyb20gdGVzdCB0byB0ZXN0LlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvMWxYcXVxRmZnZHVURkJXak5vUkU/cD1wcmV2aWV3KSlcbiAgICpcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBpbXBvcnQge1Jlc3BvbnNlT3B0aW9ucywgUmVzcG9uc2V9IGZyb20gJ2FuZ3VsYXIyL2h0dHAnO1xuICAgKlxuICAgKiB2YXIgb3B0aW9ucyA9IG5ldyBSZXNwb25zZU9wdGlvbnMoe1xuICAgKiAgIGJvZHk6IHtuYW1lOiAnSmVmZid9XG4gICAqIH0pO1xuICAgKiB2YXIgcmVzID0gbmV3IFJlc3BvbnNlKG9wdGlvbnMubWVyZ2Uoe1xuICAgKiAgIHVybDogJ2h0dHBzOi8vZ29vZ2xlLmNvbSdcbiAgICogfSkpO1xuICAgKiBjb25zb2xlLmxvZygnb3B0aW9ucy51cmw6Jywgb3B0aW9ucy51cmwpOyAvLyBudWxsXG4gICAqIGNvbnNvbGUubG9nKCdyZXMuanNvbigpOicsIHJlcy5qc29uKCkpOyAvLyBPYmplY3Qge25hbWU6IFwiSmVmZlwifVxuICAgKiBjb25zb2xlLmxvZygncmVzLnVybDonLCByZXMudXJsKTsgLy8gaHR0cHM6Ly9nb29nbGUuY29tXG4gICAqIGBgYFxuICAgKi9cbiAgbWVyZ2Uob3B0aW9ucz86IFJlc3BvbnNlT3B0aW9uc0FyZ3MpOiBSZXNwb25zZU9wdGlvbnMge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2VPcHRpb25zKHtcbiAgICAgIGJvZHk6IGlzUHJlc2VudChvcHRpb25zKSAmJiBpc1ByZXNlbnQob3B0aW9ucy5ib2R5KSA/IG9wdGlvbnMuYm9keSA6IHRoaXMuYm9keSxcbiAgICAgIHN0YXR1czogaXNQcmVzZW50KG9wdGlvbnMpICYmIGlzUHJlc2VudChvcHRpb25zLnN0YXR1cykgPyBvcHRpb25zLnN0YXR1cyA6IHRoaXMuc3RhdHVzLFxuICAgICAgaGVhZGVyczogaXNQcmVzZW50KG9wdGlvbnMpICYmIGlzUHJlc2VudChvcHRpb25zLmhlYWRlcnMpID8gb3B0aW9ucy5oZWFkZXJzIDogdGhpcy5oZWFkZXJzLFxuICAgICAgc3RhdHVzVGV4dDogaXNQcmVzZW50KG9wdGlvbnMpICYmIGlzUHJlc2VudChvcHRpb25zLnN0YXR1c1RleHQpID8gb3B0aW9ucy5zdGF0dXNUZXh0IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIHR5cGU6IGlzUHJlc2VudChvcHRpb25zKSAmJiBpc1ByZXNlbnQob3B0aW9ucy50eXBlKSA/IG9wdGlvbnMudHlwZSA6IHRoaXMudHlwZSxcbiAgICAgIHVybDogaXNQcmVzZW50KG9wdGlvbnMpICYmIGlzUHJlc2VudChvcHRpb25zLnVybCkgPyBvcHRpb25zLnVybCA6IHRoaXMudXJsLFxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogU3ViY2xhc3Mgb2Yge0BsaW5rIFJlc3BvbnNlT3B0aW9uc30sIHdpdGggZGVmYXVsdCB2YWx1ZXMuXG4gKlxuICogRGVmYXVsdCB2YWx1ZXM6XG4gKiAgKiBzdGF0dXM6IDIwMFxuICogICogaGVhZGVyczogZW1wdHkge0BsaW5rIEhlYWRlcnN9IG9iamVjdFxuICpcbiAqIFRoaXMgY2xhc3MgY291bGQgYmUgZXh0ZW5kZWQgYW5kIGJvdW5kIHRvIHRoZSB7QGxpbmsgUmVzcG9uc2VPcHRpb25zfSBjbGFzc1xuICogd2hlbiBjb25maWd1cmluZyBhbiB7QGxpbmsgSW5qZWN0b3J9LCBpbiBvcmRlciB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zXG4gKiB1c2VkIGJ5IHtAbGluayBIdHRwfSB0byBjcmVhdGUge0BsaW5rIFJlc3BvbnNlIFJlc3BvbnNlc30uXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L3F2OERMVD9wPXByZXZpZXcpKVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7cHJvdmlkZX0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG4gKiBpbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG4gKiBpbXBvcnQge0hUVFBfUFJPVklERVJTLCBIZWFkZXJzLCBIdHRwLCBCYXNlUmVzcG9uc2VPcHRpb25zLCBSZXNwb25zZU9wdGlvbnN9IGZyb21cbiAqICdhbmd1bGFyMi9odHRwJztcbiAqIGltcG9ydCB7QXBwfSBmcm9tICcuL215YXBwJztcbiAqXG4gKiBjbGFzcyBNeU9wdGlvbnMgZXh0ZW5kcyBCYXNlUmVzcG9uc2VPcHRpb25zIHtcbiAqICAgaGVhZGVyczpIZWFkZXJzID0gbmV3IEhlYWRlcnMoe25ldHdvcms6ICdnaXRodWInfSk7XG4gKiB9XG4gKlxuICogYm9vdHN0cmFwKEFwcCwgW0hUVFBfUFJPVklERVJTLCBwcm92aWRlKFJlc3BvbnNlT3B0aW9ucywge3VzZUNsYXNzOiBNeU9wdGlvbnN9KV0pO1xuICogYGBgXG4gKlxuICogVGhlIG9wdGlvbnMgY291bGQgYWxzbyBiZSBleHRlbmRlZCB3aGVuIG1hbnVhbGx5IGNyZWF0aW5nIGEge0BsaW5rIFJlc3BvbnNlfVxuICogb2JqZWN0LlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9Wbmdvc09XaWFFeEV0YnN0RG9peD9wPXByZXZpZXcpKVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtCYXNlUmVzcG9uc2VPcHRpb25zLCBSZXNwb25zZX0gZnJvbSAnYW5ndWxhcjIvaHR0cCc7XG4gKlxuICogdmFyIG9wdGlvbnMgPSBuZXcgQmFzZVJlc3BvbnNlT3B0aW9ucygpO1xuICogdmFyIHJlcyA9IG5ldyBSZXNwb25zZShvcHRpb25zLm1lcmdlKHtcbiAqICAgYm9keTogJ0FuZ3VsYXIyJyxcbiAqICAgaGVhZGVyczogbmV3IEhlYWRlcnMoe2ZyYW1ld29yazogJ2FuZ3VsYXInfSlcbiAqIH0pKTtcbiAqIGNvbnNvbGUubG9nKCdyZXMuaGVhZGVycy5nZXQoXCJmcmFtZXdvcmtcIik6JywgcmVzLmhlYWRlcnMuZ2V0KCdmcmFtZXdvcmsnKSk7IC8vIGFuZ3VsYXJcbiAqIGNvbnNvbGUubG9nKCdyZXMudGV4dCgpOicsIHJlcy50ZXh0KCkpOyAvLyBBbmd1bGFyMjtcbiAqIGBgYFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFzZVJlc3BvbnNlT3B0aW9ucyBleHRlbmRzIFJlc3BvbnNlT3B0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtzdGF0dXM6IDIwMCwgc3RhdHVzVGV4dDogJ09rJywgdHlwZTogUmVzcG9uc2VUeXBlLkRlZmF1bHQsIGhlYWRlcnM6IG5ldyBIZWFkZXJzKCl9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
