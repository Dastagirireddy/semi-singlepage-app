System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NumberFormatStyle, NumberFormatter, dateFormatterCache, DateFormatter;
    function digitCondition(len) {
        return len == 2 ? '2-digit' : 'numeric';
    }
    function nameCondition(len) {
        return len < 4 ? 'short' : 'long';
    }
    function extractComponents(pattern) {
        var ret = {};
        var i = 0, j;
        while (i < pattern.length) {
            j = i;
            while (j < pattern.length && pattern[j] == pattern[i])
                j++;
            var len = j - i;
            switch (pattern[i]) {
                case 'G':
                    ret.era = nameCondition(len);
                    break;
                case 'y':
                    ret.year = digitCondition(len);
                    break;
                case 'M':
                    if (len >= 3)
                        ret.month = nameCondition(len);
                    else
                        ret.month = digitCondition(len);
                    break;
                case 'd':
                    ret.day = digitCondition(len);
                    break;
                case 'E':
                    ret.weekday = nameCondition(len);
                    break;
                case 'j':
                    ret.hour = digitCondition(len);
                    break;
                case 'h':
                    ret.hour = digitCondition(len);
                    ret.hour12 = true;
                    break;
                case 'H':
                    ret.hour = digitCondition(len);
                    ret.hour12 = false;
                    break;
                case 'm':
                    ret.minute = digitCondition(len);
                    break;
                case 's':
                    ret.second = digitCondition(len);
                    break;
                case 'z':
                    ret.timeZoneName = 'long';
                    break;
                case 'Z':
                    ret.timeZoneName = 'short';
                    break;
            }
            i = j;
        }
        return ret;
    }
    return {
        setters:[],
        execute: function() {
            (function (NumberFormatStyle) {
                NumberFormatStyle[NumberFormatStyle["Decimal"] = 0] = "Decimal";
                NumberFormatStyle[NumberFormatStyle["Percent"] = 1] = "Percent";
                NumberFormatStyle[NumberFormatStyle["Currency"] = 2] = "Currency";
            })(NumberFormatStyle || (NumberFormatStyle = {}));
            exports_1("NumberFormatStyle", NumberFormatStyle);
            NumberFormatter = (function () {
                function NumberFormatter() {
                }
                NumberFormatter.format = function (num, locale, style, _a) {
                    var _b = _a === void 0 ? {} : _a, _c = _b.minimumIntegerDigits, minimumIntegerDigits = _c === void 0 ? 1 : _c, _d = _b.minimumFractionDigits, minimumFractionDigits = _d === void 0 ? 0 : _d, _e = _b.maximumFractionDigits, maximumFractionDigits = _e === void 0 ? 3 : _e, currency = _b.currency, _f = _b.currencyAsSymbol, currencyAsSymbol = _f === void 0 ? false : _f;
                    var intlOptions = {
                        minimumIntegerDigits: minimumIntegerDigits,
                        minimumFractionDigits: minimumFractionDigits,
                        maximumFractionDigits: maximumFractionDigits
                    };
                    intlOptions.style = NumberFormatStyle[style].toLowerCase();
                    if (style == NumberFormatStyle.Currency) {
                        intlOptions.currency = currency;
                        intlOptions.currencyDisplay = currencyAsSymbol ? 'symbol' : 'code';
                    }
                    return new Intl.NumberFormat(locale, intlOptions).format(num);
                };
                return NumberFormatter;
            }());
            exports_1("NumberFormatter", NumberFormatter);
            dateFormatterCache = new Map();
            DateFormatter = (function () {
                function DateFormatter() {
                }
                DateFormatter.format = function (date, locale, pattern) {
                    var key = locale + pattern;
                    if (dateFormatterCache.has(key)) {
                        return dateFormatterCache.get(key).format(date);
                    }
                    var formatter = new Intl.DateTimeFormat(locale, extractComponents(pattern));
                    dateFormatterCache.set(key, formatter);
                    return formatter.format(date);
                };
                return DateFormatter;
            }());
            exports_1("DateFormatter", DateFormatter);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2ZhY2FkZS9pbnRsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs0Q0FzSUksa0JBQWtCO0lBN0R0Qix3QkFBd0IsR0FBVztRQUNqQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzFDLENBQUM7SUFDRCx1QkFBdUIsR0FBVztRQUNoQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3BDLENBQUM7SUFDRCwyQkFBMkIsT0FBZTtRQUN4QyxJQUFJLEdBQUcsR0FBK0IsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDYixPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDMUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQUUsQ0FBQyxFQUFFLENBQUM7WUFDM0QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixLQUFLLEdBQUc7b0JBQ04sR0FBRyxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzdCLEtBQUssQ0FBQztnQkFDUixLQUFLLEdBQUc7b0JBQ04sR0FBRyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQy9CLEtBQUssQ0FBQztnQkFDUixLQUFLLEdBQUc7b0JBQ04sRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQzt3QkFDWCxHQUFHLENBQUMsS0FBSyxH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LElBQUE7WUF0QkQsNkNBc0JDLENBQUE7WUErREcsa0JBQWtCLEdBQXFDLElBQUksR0FBRyxFQUErQixDQUFDO1lBRWxHO2dCQUFBO2dCQVVBLENBQUM7Z0JBVFEsb0JBQU0sR0FBYixVQUFjLElBQVUsRUFBRSxNQUFjLEVBQUUsT0FBZTtvQkFDdkQsSUFBSSxHQUFHLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQztvQkFDM0IsRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2xELENBQUM7b0JBQ0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUM1RSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUN2QyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFDSCxvQkFBQztZQUFELENBVkEsQUFVQyxJQUFBO1lBVkQseUNBVUMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9mYWNhZGUvaW50bC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8gTW9kaWZpZWQgdmVyc2lvbiBvZiBpbnRlcm5hbCBUeXBlc2NyaXB0IGludGwuZC50cy5cbi8vIFRPRE8ocGlsb29waW4pOiByZW1vdmUgd2hlbiBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzM1MjEgaXMgc2hpcHBlZC5cbmRlY2xhcmUgbW9kdWxlIEludGwge1xuICBpbnRlcmZhY2UgTnVtYmVyRm9ybWF0T3B0aW9ucyB7XG4gICAgbG9jYWxlTWF0Y2hlcj86IHN0cmluZztcbiAgICBzdHlsZT86IHN0cmluZztcbiAgICBjdXJyZW5jeT86IHN0cmluZztcbiAgICBjdXJyZW5jeURpc3BsYXk/OiBzdHJpbmc7XG4gICAgdXNlR3JvdXBpbmc/OiBib29sZWFuO1xuICAgIG1pbmltdW1JbnRlZ2VyRGlnaXRzPzogbnVtYmVyO1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0cz86IG51bWJlcjtcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM/OiBudW1iZXI7XG4gIH1cblxuICBpbnRlcmZhY2UgTnVtYmVyRm9ybWF0IHtcbiAgICBmb3JtYXQodmFsdWU6IG51bWJlcik6IHN0cmluZztcbiAgfVxuXG4gIHZhciBOdW1iZXJGb3JtYXQ6IHtuZXcgKGxvY2FsZT86IHN0cmluZywgb3B0aW9ucz86IE51bWJlckZvcm1hdE9wdGlvbnMpOiBOdW1iZXJGb3JtYXR9O1xuXG4gIGludGVyZmFjZSBEYXRlVGltZUZvcm1hdE9wdGlvbnMge1xuICAgIGxvY2FsZU1hdGNoZXI/OiBzdHJpbmc7XG4gICAgd2Vla2RheT86IHN0cmluZztcbiAgICBlcmE/OiBzdHJpbmc7XG4gICAgeWVhcj86IHN0cmluZztcbiAgICBtb250aD86IHN0cmluZztcbiAgICBkYXk/OiBzdHJpbmc7XG4gICAgaG91cj86IHN0cmluZztcbiAgICBtaW51dGU/OiBzdHJpbmc7XG4gICAgc2Vjb25kPzogc3RyaW5nO1xuICAgIHRpbWVab25lTmFtZT86IHN0cmluZztcbiAgICBmb3JtYXRNYXRjaGVyPzogc3RyaW5nO1xuICAgIGhvdXIxMj86IGJvb2xlYW47XG4gIH1cblxuICBpbnRlcmZhY2UgRGF0ZVRpbWVGb3JtYXQge1xuICAgIGZvcm1hdChkYXRlPzogRGF0ZSB8IG51bWJlcik6IHN0cmluZztcbiAgfVxuXG4gIHZhciBEYXRlVGltZUZvcm1hdDoge25ldyAobG9jYWxlPzogc3RyaW5nLCBvcHRpb25zPzogRGF0ZVRpbWVGb3JtYXRPcHRpb25zKTogRGF0ZVRpbWVGb3JtYXR9O1xufVxuXG5leHBvcnQgZW51bSBOdW1iZXJGb3JtYXRTdHlsZSB7XG4gIERlY2ltYWwsXG4gIFBlcmNlbnQsXG4gIEN1cnJlbmN5XG59XG5cbmV4cG9ydCBjbGFzcyBOdW1iZXJGb3JtYXR0ZXIge1xuICBzdGF0aWMgZm9ybWF0KG51bTogbnVtYmVyLCBsb2NhbGU6IHN0cmluZywgc3R5bGU6IE51bWJlckZvcm1hdFN0eWxlLFxuICAgICAgICAgICAgICAgIHttaW5pbXVtSW50ZWdlckRpZ2l0cyA9IDEsIG1pbmltdW1GcmFjdGlvbkRpZ2l0cyA9IDAsIG1heGltdW1GcmFjdGlvbkRpZ2l0cyA9IDMsXG4gICAgICAgICAgICAgICAgIGN1cnJlbmN5LCBjdXJyZW5jeUFzU3ltYm9sID0gZmFsc2V9OiB7XG4gICAgICAgICAgICAgICAgICBtaW5pbXVtSW50ZWdlckRpZ2l0cz86IG51bWJlcixcbiAgICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0cz86IG51bWJlcixcbiAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0cz86IG51bWJlcixcbiAgICAgICAgICAgICAgICAgIGN1cnJlbmN5Pzogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgY3VycmVuY3lBc1N5bWJvbD86IGJvb2xlYW5cbiAgICAgICAgICAgICAgICB9ID0ge30pOiBzdHJpbmcge1xuICAgIHZhciBpbnRsT3B0aW9uczogSW50bC5OdW1iZXJGb3JtYXRPcHRpb25zID0ge1xuICAgICAgbWluaW11bUludGVnZXJEaWdpdHM6IG1pbmltdW1JbnRlZ2VyRGlnaXRzLFxuICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBtaW5pbXVtRnJhY3Rpb25EaWdpdHMsXG4gICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IG1heGltdW1GcmFjdGlvbkRpZ2l0c1xuICAgIH07XG4gICAgaW50bE9wdGlvbnMuc3R5bGUgPSBOdW1iZXJGb3JtYXRTdHlsZVtzdHlsZV0udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoc3R5bGUgPT0gTnVtYmVyRm9ybWF0U3R5bGUuQ3VycmVuY3kpIHtcbiAgICAgIGludGxPcHRpb25zLmN1cnJlbmN5ID0gY3VycmVuY3k7XG4gICAgICBpbnRsT3B0aW9ucy5jdXJyZW5jeURpc3BsYXkgPSBjdXJyZW5jeUFzU3ltYm9sID8gJ3N5bWJvbCcgOiAnY29kZSc7XG4gICAgfVxuICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQobG9jYWxlLCBpbnRsT3B0aW9ucykuZm9ybWF0KG51bSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGlnaXRDb25kaXRpb24obGVuOiBudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gbGVuID09IDIgPyAnMi1kaWdpdCcgOiAnbnVtZXJpYyc7XG59XG5mdW5jdGlvbiBuYW1lQ29uZGl0aW9uKGxlbjogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIGxlbiA8IDQgPyAnc2hvcnQnIDogJ2xvbmcnO1xufVxuZnVuY3Rpb24gZXh0cmFjdENvbXBvbmVudHMocGF0dGVybjogc3RyaW5nKTogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMge1xuICB2YXIgcmV0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyA9IHt9O1xuICB2YXIgaSA9IDAsIGo7XG4gIHdoaWxlIChpIDwgcGF0dGVybi5sZW5ndGgpIHtcbiAgICBqID0gaTtcbiAgICB3aGlsZSAoaiA8IHBhdHRlcm4ubGVuZ3RoICYmIHBhdHRlcm5bal0gPT0gcGF0dGVybltpXSkgaisrO1xuICAgIGxldCBsZW4gPSBqIC0gaTtcbiAgICBzd2l0Y2ggKHBhdHRlcm5baV0pIHtcbiAgICAgIGNhc2UgJ0cnOlxuICAgICAgICByZXQuZXJhID0gbmFtZUNvbmRpdGlvbihsZW4pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3knOlxuICAgICAgICByZXQueWVhciA9IGRpZ2l0Q29uZGl0aW9uKGxlbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTSc6XG4gICAgICAgIGlmIChsZW4gPj0gMylcbiAgICAgICAgICByZXQubW9udGggPSBuYW1lQ29uZGl0aW9uKGxlbik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXQubW9udGggPSBkaWdpdENvbmRpdGlvbihsZW4pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2QnOlxuICAgICAgICByZXQuZGF5ID0gZGlnaXRDb25kaXRpb24obGVuKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdFJzpcbiAgICAgICAgcmV0LndlZWtkYXkgPSBuYW1lQ29uZGl0aW9uKGxlbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaic6XG4gICAgICAgIHJldC5ob3VyID0gZGlnaXRDb25kaXRpb24obGVuKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdoJzpcbiAgICAgICAgcmV0LmhvdXIgPSBkaWdpdENvbmRpdGlvbihsZW4pO1xuICAgICAgICByZXQuaG91cjEyID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdIJzpcbiAgICAgICAgcmV0LmhvdXIgPSBkaWdpdENvbmRpdGlvbihsZW4pO1xuICAgICAgICByZXQuaG91cjEyID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbSc6XG4gICAgICAgIHJldC5taW51dGUgPSBkaWdpdENvbmRpdGlvbihsZW4pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3MnOlxuICAgICAgICByZXQuc2Vjb25kID0gZGlnaXRDb25kaXRpb24obGVuKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd6JzpcbiAgICAgICAgcmV0LnRpbWVab25lTmFtZSA9ICdsb25nJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdaJzpcbiAgICAgICAgcmV0LnRpbWVab25lTmFtZSA9ICdzaG9ydCc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpID0gajtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG52YXIgZGF0ZUZvcm1hdHRlckNhY2hlOiBNYXA8c3RyaW5nLCBJbnRsLkRhdGVUaW1lRm9ybWF0PiA9IG5ldyBNYXA8c3RyaW5nLCBJbnRsLkRhdGVUaW1lRm9ybWF0PigpO1xuXG5leHBvcnQgY2xhc3MgRGF0ZUZvcm1hdHRlciB7XG4gIHN0YXRpYyBmb3JtYXQoZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcsIHBhdHRlcm46IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdmFyIGtleSA9IGxvY2FsZSArIHBhdHRlcm47XG4gICAgaWYgKGRhdGVGb3JtYXR0ZXJDYWNoZS5oYXMoa2V5KSkge1xuICAgICAgcmV0dXJuIGRhdGVGb3JtYXR0ZXJDYWNoZS5nZXQoa2V5KS5mb3JtYXQoZGF0ZSk7XG4gICAgfVxuICAgIHZhciBmb3JtYXR0ZXIgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIGV4dHJhY3RDb21wb25lbnRzKHBhdHRlcm4pKTtcbiAgICBkYXRlRm9ybWF0dGVyQ2FjaGUuc2V0KGtleSwgZm9ybWF0dGVyKTtcbiAgICByZXR1cm4gZm9ybWF0dGVyLmZvcm1hdChkYXRlKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
