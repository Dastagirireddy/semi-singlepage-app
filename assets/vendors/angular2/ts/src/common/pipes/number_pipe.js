System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/intl', 'angular2/core', './invalid_pipe_argument_exception'], function(exports_1, context_1) {
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
    var lang_1, exceptions_1, intl_1, core_1, invalid_pipe_argument_exception_1;
    var defaultLocale, _re, NumberPipe, DecimalPipe, PercentPipe, CurrencyPipe;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (intl_1_1) {
                intl_1 = intl_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (invalid_pipe_argument_exception_1_1) {
                invalid_pipe_argument_exception_1 = invalid_pipe_argument_exception_1_1;
            }],
        execute: function() {
            defaultLocale = 'en-US';
            _re = lang_1.RegExpWrapper.create('^(\\d+)?\\.((\\d+)(\\-(\\d+))?)?$');
            /**
             * Internal base class for numeric pipes.
             */
            NumberPipe = (function () {
                function NumberPipe() {
                }
                /** @internal */
                NumberPipe._format = function (value, style, digits, currency, currencyAsSymbol) {
                    if (currency === void 0) { currency = null; }
                    if (currencyAsSymbol === void 0) { currencyAsSymbol = false; }
                    if (lang_1.isBlank(value))
                        return null;
                    if (!lang_1.isNumber(value)) {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(NumberPipe, value);
                    }
                    var minInt = 1, minFraction = 0, maxFraction = 3;
                    if (lang_1.isPresent(digits)) {
                        var parts = lang_1.RegExpWrapper.firstMatch(_re, digits);
                        if (lang_1.isBlank(parts)) {
                            throw new exceptions_1.BaseException(digits + " is not a valid digit info for number pipes");
                        }
                        if (lang_1.isPresent(parts[1])) {
                            minInt = lang_1.NumberWrapper.parseIntAutoRadix(parts[1]);
                        }
                        if (lang_1.isPresent(parts[3])) {
                            minFraction = lang_1.NumberWrapper.parseIntAutoRadix(parts[3]);
                        }
                        if (lang_1.isPresent(parts[5])) {
                            maxFraction = lang_1.NumberWrapper.parseIntAutoRadix(parts[5]);
                        }
                    }
                    return intl_1.NumberFormatter.format(value, defaultLocale, style, {
                        minimumIntegerDigits: minInt,
                        minimumFractionDigits: minFraction,
                        maximumFractionDigits: maxFraction,
                        currency: currency,
                        currencyAsSymbol: currencyAsSymbol
                    });
                };
                NumberPipe = __decorate([
                    lang_1.CONST(),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], NumberPipe);
                return NumberPipe;
            }());
            exports_1("NumberPipe", NumberPipe);
            /**
             * WARNING: this pipe uses the Internationalization API.
             * Therefore it is only reliable in Chrome and Opera browsers.
             *
             * Formats a number as local text. i.e. group sizing and separator and other locale-specific
             * configurations are based on the active locale.
             *
             * ### Usage
             *
             *     expression | number[:digitInfo]
             *
             * where `expression` is a number and `digitInfo` has the following format:
             *
             *     {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
             *
             * - minIntegerDigits is the minimum number of integer digits to use. Defaults to 1.
             * - minFractionDigits is the minimum number of digits after fraction. Defaults to 0.
             * - maxFractionDigits is the maximum number of digits after fraction. Defaults to 3.
             *
             * For more information on the acceptable range for each of these numbers and other
             * details see your native internationalization library.
             *
             * ### Example
             *
             * {@example core/pipes/ts/number_pipe/number_pipe_example.ts region='NumberPipe'}
             */
            DecimalPipe = (function (_super) {
                __extends(DecimalPipe, _super);
                function DecimalPipe() {
                    _super.apply(this, arguments);
                }
                DecimalPipe.prototype.transform = function (value, digits) {
                    if (digits === void 0) { digits = null; }
                    return NumberPipe._format(value, intl_1.NumberFormatStyle.Decimal, digits);
                };
                DecimalPipe = __decorate([
                    lang_1.CONST(),
                    core_1.Pipe({ name: 'number' }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DecimalPipe);
                return DecimalPipe;
            }(NumberPipe));
            exports_1("DecimalPipe", DecimalPipe);
            /**
             * WARNING: this pipe uses the Internationalization API.
             * Therefore it is only reliable in Chrome and Opera browsers.
             *
             * Formats a number as local percent.
             *
             * ### Usage
             *
             *     expression | percent[:digitInfo]
             *
             * For more information about `digitInfo` see {@link DecimalPipe}
             *
             * ### Example
             *
             * {@example core/pipes/ts/number_pipe/number_pipe_example.ts region='PercentPipe'}
             */
            PercentPipe = (function (_super) {
                __extends(PercentPipe, _super);
                function PercentPipe() {
                    _super.apply(this, arguments);
                }
                PercentPipe.prototype.transform = function (value, digits) {
                    if (digits === void 0) { digits = null; }
                    return NumberPipe._format(value, intl_1.NumberFormatStyle.Percent, digits);
                };
                PercentPipe = __decorate([
                    lang_1.CONST(),
                    core_1.Pipe({ name: 'percent' }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], PercentPipe);
                return PercentPipe;
            }(NumberPipe));
            exports_1("PercentPipe", PercentPipe);
            /**
             * WARNING: this pipe uses the Internationalization API.
             * Therefore it is only reliable in Chrome and Opera browsers.
             *
             * Formats a number as local currency.
             *
             * ### Usage
             *
             *     expression | currency[:currencyCode[:symbolDisplay[:digitInfo]]]
             *
             * where `currencyCode` is the ISO 4217 currency code, such as "USD" for the US dollar and
             * "EUR" for the euro. `symbolDisplay` is a boolean indicating whether to use the currency
             * symbol (e.g. $) or the currency code (e.g. USD) in the output. The default for this value
             * is `false`.
             * For more information about `digitInfo` see {@link DecimalPipe}
             *
             * ### Example
             *
             * {@example core/pipes/ts/number_pipe/number_pipe_example.ts region='CurrencyPipe'}
             */
            CurrencyPipe = (function (_super) {
                __extends(CurrencyPipe, _super);
                function CurrencyPipe() {
                    _super.apply(this, arguments);
                }
                CurrencyPipe.prototype.transform = function (value, currencyCode, symbolDisplay, digits) {
                    if (currencyCode === void 0) { currencyCode = 'USD'; }
                    if (symbolDisplay === void 0) { symbolDisplay = false; }
                    if (digits === void 0) { digits = null; }
                    return NumberPipe._format(value, intl_1.NumberFormatStyle.Currency, digits, currencyCode, symbolDisplay);
                };
                CurrencyPipe = __decorate([
                    lang_1.CONST(),
                    core_1.Pipe({ name: 'currency' }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], CurrencyPipe);
                return CurrencyPipe;
            }(NumberPipe));
            exports_1("CurrencyPipe", CurrencyPipe);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21tb24vcGlwZXMvbnVtYmVyX3BpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBZ0JJLGFBQWEsRUFDYixHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBREgsYUFBYSxHQUFXLE9BQU8sQ0FBQztZQUNoQyxHQUFHLEdBQUcsb0JBQWEsQ0FBQyxNQUFNLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUVwRTs7ZUFFRztZQUdIO2dCQUFBO2dCQWdDQSxDQUFDO2dCQS9CQyxnQkFBZ0I7Z0JBQ1Qsa0JBQU8sR0FBZCxVQUFlLEtBQWEsRUFBRSxLQUF3QixFQUFFLE1BQWMsRUFBRSxRQUF1QixFQUNoRixnQkFBaUM7b0JBRHdCLHdCQUF1QixHQUF2QixlQUF1QjtvQkFDaEYsZ0NBQWlDLEdBQWpDLHdCQUFpQztvQkFDOUMsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckIsTUFBTSxJQUFJLDhEQUE0QixDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDNUQsQ0FBQztvQkFDRCxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUUsV0FBVyxHQUFHLENBQUMsRUFBRSxXQUFXLEdBQUcsQ0FBQyxDQUFDO29CQUNqRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEIsSUFBSSxLQUFLLEdBQUcsb0JBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUNsRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNuQixNQUFNLElBQUksMEJBQWEsQ0FB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O29CQUN4RSxzQkFBcUIsR0FBckIsYUFBcUI7b0JBQzdCLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSx3QkFBaUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDdkQsYUFBYSxDQUFDLENBQUM7Z0JBQzNDLENBQUM7Z0JBUkg7b0JBQUMsWUFBSyxFQUFFO29CQUNQLFdBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQztvQkFDeEIsaUJBQVUsRUFBRTs7Z0NBQUE7Z0JBT2IsbUJBQUM7WUFBRCxDQU5BLEFBTUMsQ0FOaUMsVUFBVSxHQU0zQztZQU5ELHVDQU1DLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy9udW1iZXJfcGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGlzTnVtYmVyLFxuICBpc1ByZXNlbnQsXG4gIGlzQmxhbmssXG4gIFN0cmluZ1dyYXBwZXIsXG4gIE51bWJlcldyYXBwZXIsXG4gIFJlZ0V4cFdyYXBwZXIsXG4gIENPTlNULFxuICBGdW5jdGlvbldyYXBwZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7TnVtYmVyRm9ybWF0dGVyLCBOdW1iZXJGb3JtYXRTdHlsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9pbnRsJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgUGlwZVRyYW5zZm9ybSwgV3JhcHBlZFZhbHVlLCBQaXBlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcblxuaW1wb3J0IHtJbnZhbGlkUGlwZUFyZ3VtZW50RXhjZXB0aW9ufSBmcm9tICcuL2ludmFsaWRfcGlwZV9hcmd1bWVudF9leGNlcHRpb24nO1xuXG52YXIgZGVmYXVsdExvY2FsZTogc3RyaW5nID0gJ2VuLVVTJztcbnZhciBfcmUgPSBSZWdFeHBXcmFwcGVyLmNyZWF0ZSgnXihcXFxcZCspP1xcXFwuKChcXFxcZCspKFxcXFwtKFxcXFxkKykpPyk/JCcpO1xuXG4vKipcbiAqIEludGVybmFsIGJhc2UgY2xhc3MgZm9yIG51bWVyaWMgcGlwZXMuXG4gKi9cbkBDT05TVCgpXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTnVtYmVyUGlwZSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgc3RhdGljIF9mb3JtYXQodmFsdWU6IG51bWJlciwgc3R5bGU6IE51bWJlckZvcm1hdFN0eWxlLCBkaWdpdHM6IHN0cmluZywgY3VycmVuY3k6IHN0cmluZyA9IG51bGwsXG4gICAgICAgICAgICAgICAgIGN1cnJlbmN5QXNTeW1ib2w6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgaWYgKGlzQmxhbmsodmFsdWUpKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIWlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRQaXBlQXJndW1lbnRFeGNlcHRpb24oTnVtYmVyUGlwZSwgdmFsdWUpO1xuICAgIH1cbiAgICB2YXIgbWluSW50ID0gMSwgbWluRnJhY3Rpb24gPSAwLCBtYXhGcmFjdGlvbiA9IDM7XG4gICAgaWYgKGlzUHJlc2VudChkaWdpdHMpKSB7XG4gICAgICB2YXIgcGFydHMgPSBSZWdFeHBXcmFwcGVyLmZpcnN0TWF0Y2goX3JlLCBkaWdpdHMpO1xuICAgICAgaWYgKGlzQmxhbmsocGFydHMpKSB7XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGAke2RpZ2l0c30gaXMgbm90IGEgdmFsaWQgZGlnaXQgaW5mbyBmb3IgbnVtYmVyIHBpcGVzYCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNQcmVzZW50KHBhcnRzWzFdKSkgeyAgLy8gbWluIGludGVnZXIgZGlnaXRzXG4gICAgICAgIG1pbkludCA9IE51bWJlcldyYXBwZXIucGFyc2VJbnRBdXRvUmFkaXgocGFydHNbMV0pO1xuICAgICAgfVxuICAgICAgaWYgKGlzUHJlc2VudChwYXJ0c1szXSkpIHsgIC8vIG1pbiBmcmFjdGlvbiBkaWdpdHNcbiAgICAgICAgbWluRnJhY3Rpb24gPSBOdW1iZXJXcmFwcGVyLnBhcnNlSW50QXV0b1JhZGl4KHBhcnRzWzNdKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ByZXNlbnQocGFydHNbNV0pKSB7ICAvLyBtYXggZnJhY3Rpb24gZGlnaXRzXG4gICAgICAgIG1heEZyYWN0aW9uID0gTnVtYmVyV3JhcHBlci5wYXJzZUludEF1dG9SYWRpeChwYXJ0c1s1XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBOdW1iZXJGb3JtYXR0ZXIuZm9ybWF0KHZhbHVlLCBkZWZhdWx0TG9jYWxlLCBzdHlsZSwge1xuICAgICAgbWluaW11bUludGVnZXJEaWdpdHM6IG1pbkludCxcbiAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogbWluRnJhY3Rpb24sXG4gICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IG1heEZyYWN0aW9uLFxuICAgICAgY3VycmVuY3k6IGN1cnJlbmN5LFxuICAgICAgY3VycmVuY3lBc1N5bWJvbDogY3VycmVuY3lBc1N5bWJvbFxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogV0FSTklORzogdGhpcyBwaXBlIHVzZXMgdGhlIEludGVybmF0aW9uYWxpemF0aW9uIEFQSS5cbiAqIFRoZXJlZm9yZSBpdCBpcyBvbmx5IHJlbGlhYmxlIGluIENocm9tZSBhbmQgT3BlcmEgYnJvd3NlcnMuXG4gKlxuICogRm9ybWF0cyBhIG51bWJlciBhcyBsb2NhbCB0ZXh0LiBpLmUuIGdyb3VwIHNpemluZyBhbmQgc2VwYXJhdG9yIGFuZCBvdGhlciBsb2NhbGUtc3BlY2lmaWNcbiAqIGNvbmZpZ3VyYXRpb25zIGFyZSBiYXNlZCBvbiB0aGUgYWN0aXZlIGxvY2FsZS5cbiAqXG4gKiAjIyMgVXNhZ2VcbiAqXG4gKiAgICAgZXhwcmVzc2lvbiB8IG51bWJlcls6ZGlnaXRJbmZvXVxuICpcbiAqIHdoZXJlIGBleHByZXNzaW9uYCBpcyBhIG51bWJlciBhbmQgYGRpZ2l0SW5mb2AgaGFzIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxuICpcbiAqICAgICB7bWluSW50ZWdlckRpZ2l0c30ue21pbkZyYWN0aW9uRGlnaXRzfS17bWF4RnJhY3Rpb25EaWdpdHN9XG4gKlxuICogLSBtaW5JbnRlZ2VyRGlnaXRzIGlzIHRoZSBtaW5pbXVtIG51bWJlciBvZiBpbnRlZ2VyIGRpZ2l0cyB0byB1c2UuIERlZmF1bHRzIHRvIDEuXG4gKiAtIG1pbkZyYWN0aW9uRGlnaXRzIGlzIHRoZSBtaW5pbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgZnJhY3Rpb24uIERlZmF1bHRzIHRvIDAuXG4gKiAtIG1heEZyYWN0aW9uRGlnaXRzIGlzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBkaWdpdHMgYWZ0ZXIgZnJhY3Rpb24uIERlZmF1bHRzIHRvIDMuXG4gKlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gdGhlIGFjY2VwdGFibGUgcmFuZ2UgZm9yIGVhY2ggb2YgdGhlc2UgbnVtYmVycyBhbmQgb3RoZXJcbiAqIGRldGFpbHMgc2VlIHlvdXIgbmF0aXZlIGludGVybmF0aW9uYWxpemF0aW9uIGxpYnJhcnkuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9waXBlcy90cy9udW1iZXJfcGlwZS9udW1iZXJfcGlwZV9leGFtcGxlLnRzIHJlZ2lvbj0nTnVtYmVyUGlwZSd9XG4gKi9cbkBDT05TVCgpXG5AUGlwZSh7bmFtZTogJ251bWJlcid9KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlY2ltYWxQaXBlIGV4dGVuZHMgTnVtYmVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgZGlnaXRzOiBzdHJpbmcgPSBudWxsKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTnVtYmVyUGlwZS5fZm9ybWF0KHZhbHVlLCBOdW1iZXJGb3JtYXRTdHlsZS5EZWNpbWFsLCBkaWdpdHMpO1xuICB9XG59XG5cbi8qKlxuICogV0FSTklORzogdGhpcyBwaXBlIHVzZXMgdGhlIEludGVybmF0aW9uYWxpemF0aW9uIEFQSS5cbiAqIFRoZXJlZm9yZSBpdCBpcyBvbmx5IHJlbGlhYmxlIGluIENocm9tZSBhbmQgT3BlcmEgYnJvd3NlcnMuXG4gKlxuICogRm9ybWF0cyBhIG51bWJlciBhcyBsb2NhbCBwZXJjZW50LlxuICpcbiAqICMjIyBVc2FnZVxuICpcbiAqICAgICBleHByZXNzaW9uIHwgcGVyY2VudFs6ZGlnaXRJbmZvXVxuICpcbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGFib3V0IGBkaWdpdEluZm9gIHNlZSB7QGxpbmsgRGVjaW1hbFBpcGV9XG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9waXBlcy90cy9udW1iZXJfcGlwZS9udW1iZXJfcGlwZV9leGFtcGxlLnRzIHJlZ2lvbj0nUGVyY2VudFBpcGUnfVxuICovXG5AQ09OU1QoKVxuQFBpcGUoe25hbWU6ICdwZXJjZW50J30pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGVyY2VudFBpcGUgZXh0ZW5kcyBOdW1iZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBkaWdpdHM6IHN0cmluZyA9IG51bGwpOiBzdHJpbmcge1xuICAgIHJldHVybiBOdW1iZXJQaXBlLl9mb3JtYXQodmFsdWUsIE51bWJlckZvcm1hdFN0eWxlLlBlcmNlbnQsIGRpZ2l0cyk7XG4gIH1cbn1cblxuLyoqXG4gKiBXQVJOSU5HOiB0aGlzIHBpcGUgdXNlcyB0aGUgSW50ZXJuYXRpb25hbGl6YXRpb24gQVBJLlxuICogVGhlcmVmb3JlIGl0IGlzIG9ubHkgcmVsaWFibGUgaW4gQ2hyb21lIGFuZCBPcGVyYSBicm93c2Vycy5cbiAqXG4gKiBGb3JtYXRzIGEgbnVtYmVyIGFzIGxvY2FsIGN1cnJlbmN5LlxuICpcbiAqICMjIyBVc2FnZVxuICpcbiAqICAgICBleHByZXNzaW9uIHwgY3VycmVuY3lbOmN1cnJlbmN5Q29kZVs6c3ltYm9sRGlzcGxheVs6ZGlnaXRJbmZvXV1dXG4gKlxuICogd2hlcmUgYGN1cnJlbmN5Q29kZWAgaXMgdGhlIElTTyA0MjE3IGN1cnJlbmN5IGNvZGUsIHN1Y2ggYXMgXCJVU0RcIiBmb3IgdGhlIFVTIGRvbGxhciBhbmRcbiAqIFwiRVVSXCIgZm9yIHRoZSBldXJvLiBgc3ltYm9sRGlzcGxheWAgaXMgYSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0byB1c2UgdGhlIGN1cnJlbmN5XG4gKiBzeW1ib2wgKGUuZy4gJCkgb3IgdGhlIGN1cnJlbmN5IGNvZGUgKGUuZy4gVVNEKSBpbiB0aGUgb3V0cHV0LiBUaGUgZGVmYXVsdCBmb3IgdGhpcyB2YWx1ZVxuICogaXMgYGZhbHNlYC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGFib3V0IGBkaWdpdEluZm9gIHNlZSB7QGxpbmsgRGVjaW1hbFBpcGV9XG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9waXBlcy90cy9udW1iZXJfcGlwZS9udW1iZXJfcGlwZV9leGFtcGxlLnRzIHJlZ2lvbj0nQ3VycmVuY3lQaXBlJ31cbiAqL1xuQENPTlNUKClcbkBQaXBlKHtuYW1lOiAnY3VycmVuY3knfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDdXJyZW5jeVBpcGUgZXh0ZW5kcyBOdW1iZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBjdXJyZW5jeUNvZGU6IHN0cmluZyA9ICdVU0QnLCBzeW1ib2xEaXNwbGF5OiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgICAgICBkaWdpdHM6IHN0cmluZyA9IG51bGwpOiBzdHJpbmcge1xuICAgIHJldHVybiBOdW1iZXJQaXBlLl9mb3JtYXQodmFsdWUsIE51bWJlckZvcm1hdFN0eWxlLkN1cnJlbmN5LCBkaWdpdHMsIGN1cnJlbmN5Q29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5bWJvbERpc3BsYXkpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
