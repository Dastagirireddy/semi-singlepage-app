System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var lang_1;
    var OpaqueToken;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Creates a token that can be used in a DI Provider.
             *
             * ### Example ([live demo](http://plnkr.co/edit/Ys9ezXpj2Mnoy3Uc8KBp?p=preview))
             *
             * ```typescript
             * var t = new OpaqueToken("value");
             *
             * var injector = Injector.resolveAndCreate([
             *   provide(t, {useValue: "bindingValue"})
             * ]);
             *
             * expect(injector.get(t)).toEqual("bindingValue");
             * ```
             *
             * Using an `OpaqueToken` is preferable to using strings as tokens because of possible collisions
             * caused by multiple providers using the same string as two different tokens.
             *
             * Using an `OpaqueToken` is preferable to using an `Object` as tokens because it provides better
             * error messages.
             */
            OpaqueToken = (function () {
                function OpaqueToken(_desc) {
                    this._desc = _desc;
                }
                OpaqueToken.prototype.toString = function () { return "Token " + this._desc; };
                OpaqueToken = __decorate([
                    lang_1.CONST(), 
                    __metadata('design:paramtypes', [String])
                ], OpaqueToken);
                return OpaqueToken;
            }());
            exports_1("OpaqueToken", OpaqueToken);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2RpL29wYXF1ZV90b2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQW9CRztZQUVIO2dCQUNFLHFCQUFvQixLQUFhO29CQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7Z0JBQUcsQ0FBQztnQkFFckMsOEJBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsV0FBUyxJQUFJLENBQUMsS0FBTyxDQUFDLENBQUMsQ0FBQztnQkFKdEQ7b0JBQUMsWUFBSyxFQUFFOzsrQkFBQTtnQkFLUixrQkFBQztZQUFELENBSkEsQUFJQyxJQUFBO1lBSkQscUNBSUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29yZS9kaS9vcGFxdWVfdG9rZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NPTlNUfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIGluIGEgREkgUHJvdmlkZXIuXG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L1lzOWV6WHBqMk1ub3kzVWM4S0JwP3A9cHJldmlldykpXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogdmFyIHQgPSBuZXcgT3BhcXVlVG9rZW4oXCJ2YWx1ZVwiKTtcbiAqXG4gKiB2YXIgaW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtcbiAqICAgcHJvdmlkZSh0LCB7dXNlVmFsdWU6IFwiYmluZGluZ1ZhbHVlXCJ9KVxuICogXSk7XG4gKlxuICogZXhwZWN0KGluamVjdG9yLmdldCh0KSkudG9FcXVhbChcImJpbmRpbmdWYWx1ZVwiKTtcbiAqIGBgYFxuICpcbiAqIFVzaW5nIGFuIGBPcGFxdWVUb2tlbmAgaXMgcHJlZmVyYWJsZSB0byB1c2luZyBzdHJpbmdzIGFzIHRva2VucyBiZWNhdXNlIG9mIHBvc3NpYmxlIGNvbGxpc2lvbnNcbiAqIGNhdXNlZCBieSBtdWx0aXBsZSBwcm92aWRlcnMgdXNpbmcgdGhlIHNhbWUgc3RyaW5nIGFzIHR3byBkaWZmZXJlbnQgdG9rZW5zLlxuICpcbiAqIFVzaW5nIGFuIGBPcGFxdWVUb2tlbmAgaXMgcHJlZmVyYWJsZSB0byB1c2luZyBhbiBgT2JqZWN0YCBhcyB0b2tlbnMgYmVjYXVzZSBpdCBwcm92aWRlcyBiZXR0ZXJcbiAqIGVycm9yIG1lc3NhZ2VzLlxuICovXG5AQ09OU1QoKVxuZXhwb3J0IGNsYXNzIE9wYXF1ZVRva2VuIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGVzYzogc3RyaW5nKSB7fVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgVG9rZW4gJHt0aGlzLl9kZXNjfWA7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
