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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvZGkvb3BhcXVlX3Rva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBb0JHO1lBRUg7Z0JBQ0UscUJBQW9CLEtBQWE7b0JBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtnQkFBRyxDQUFDO2dCQUVyQyw4QkFBUSxHQUFSLGNBQXFCLE1BQU0sQ0FBQyxXQUFTLElBQUksQ0FBQyxLQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUp0RDtvQkFBQyxZQUFLLEVBQUU7OytCQUFBO2dCQUtSLGtCQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFKRCxxQ0FJQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvZGkvb3BhcXVlX3Rva2VuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDT05TVH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCBpbiBhIERJIFByb3ZpZGVyLlxuICpcbiAqICMjIyBFeGFtcGxlIChbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9ZczllelhwajJNbm95M1VjOEtCcD9wPXByZXZpZXcpKVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIHZhciB0ID0gbmV3IE9wYXF1ZVRva2VuKFwidmFsdWVcIik7XG4gKlxuICogdmFyIGluamVjdG9yID0gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbXG4gKiAgIHByb3ZpZGUodCwge3VzZVZhbHVlOiBcImJpbmRpbmdWYWx1ZVwifSlcbiAqIF0pO1xuICpcbiAqIGV4cGVjdChpbmplY3Rvci5nZXQodCkpLnRvRXF1YWwoXCJiaW5kaW5nVmFsdWVcIik7XG4gKiBgYGBcbiAqXG4gKiBVc2luZyBhbiBgT3BhcXVlVG9rZW5gIGlzIHByZWZlcmFibGUgdG8gdXNpbmcgc3RyaW5ncyBhcyB0b2tlbnMgYmVjYXVzZSBvZiBwb3NzaWJsZSBjb2xsaXNpb25zXG4gKiBjYXVzZWQgYnkgbXVsdGlwbGUgcHJvdmlkZXJzIHVzaW5nIHRoZSBzYW1lIHN0cmluZyBhcyB0d28gZGlmZmVyZW50IHRva2Vucy5cbiAqXG4gKiBVc2luZyBhbiBgT3BhcXVlVG9rZW5gIGlzIHByZWZlcmFibGUgdG8gdXNpbmcgYW4gYE9iamVjdGAgYXMgdG9rZW5zIGJlY2F1c2UgaXQgcHJvdmlkZXMgYmV0dGVyXG4gKiBlcnJvciBtZXNzYWdlcy5cbiAqL1xuQENPTlNUKClcbmV4cG9ydCBjbGFzcyBPcGFxdWVUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Rlc2M6IHN0cmluZykge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYFRva2VuICR7dGhpcy5fZGVzY31gOyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
