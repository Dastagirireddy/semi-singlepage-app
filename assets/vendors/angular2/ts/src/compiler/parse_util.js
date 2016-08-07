System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ParseLocation, ParseSourceFile, ParseSourceSpan, ParseErrorLevel, ParseError;
    return {
        setters:[],
        execute: function() {
            ParseLocation = (function () {
                function ParseLocation(file, offset, line, col) {
                    this.file = file;
                    this.offset = offset;
                    this.line = line;
                    this.col = col;
                }
                ParseLocation.prototype.toString = function () { return this.file.url + "@" + this.line + ":" + this.col; };
                return ParseLocation;
            }());
            exports_1("ParseLocation", ParseLocation);
            ParseSourceFile = (function () {
                function ParseSourceFile(content, url) {
                    this.content = content;
                    this.url = url;
                }
                return ParseSourceFile;
            }());
            exports_1("ParseSourceFile", ParseSourceFile);
            ParseSourceSpan = (function () {
                function ParseSourceSpan(start, end) {
                    this.start = start;
                    this.end = end;
                }
                ParseSourceSpan.prototype.toString = function () {
                    return this.start.file.content.substring(this.start.offset, this.end.offset);
                };
                return ParseSourceSpan;
            }());
            exports_1("ParseSourceSpan", ParseSourceSpan);
            (function (ParseErrorLevel) {
                ParseErrorLevel[ParseErrorLevel["WARNING"] = 0] = "WARNING";
                ParseErrorLevel[ParseErrorLevel["FATAL"] = 1] = "FATAL";
            })(ParseErrorLevel || (ParseErrorLevel = {}));
            exports_1("ParseErrorLevel", ParseErrorLevel);
            ParseError = (function () {
                function ParseError(span, msg, level) {
                    if (level === void 0) { level = ParseErrorLevel.FATAL; }
                    this.span = span;
                    this.msg = msg;
                    this.level = level;
                }
                ParseError.prototype.toString = function () {
                    var source = this.span.start.file.content;
                    var ctxStart = this.span.start.offset;
                    if (ctxStart > source.length - 1) {
                        ctxStart = source.length - 1;
                    }
                    var ctxEnd = ctxStart;
                    var ctxLen = 0;
                    var ctxLines = 0;
                    while (ctxLen < 100 && ctxStart > 0) {
                        ctxStart--;
                        ctxLen++;
                        if (source[ctxStart] == "\n") {
                            if (++ctxLines == 3) {
                                break;
                            }
                        }
                    }
                    ctxLen = 0;
                    ctxLines = 0;
                    while (ctxLen < 100 && ctxEnd < source.length - 1) {
                        ctxEnd++;
                        ctxLen++;
                        if (source[ctxEnd] == "\n") {
                            if (++ctxLines == 3) {
                                break;
                            }
                        }
                    }
                    var context = source.substring(ctxStart, this.span.start.offset) + '[ERROR ->]' +
                        source.substring(this.span.start.offset, ctxEnd + 1);
                    return this.msg + " (\"" + context + "\"): " + this.span.start;
                };
                return ParseError;
            }());
            exports_1("ParseError", ParseError);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9wYXJzZV91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7WUFBQTtnQkFDRSx1QkFBbUIsSUFBcUIsRUFBUyxNQUFjLEVBQVMsSUFBWSxFQUNqRSxHQUFXO29CQURYLFNBQUksR0FBSixJQUFJLENBQWlCO29CQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7b0JBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtvQkFDakUsUUFBRyxHQUFILEdBQUcsQ0FBUTtnQkFBRyxDQUFDO2dCQUVsQyxnQ0FBUSxHQUFSLGNBQXFCLE1BQU0sQ0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBSSxJQUFJLENBQUMsSUFBSSxTQUFJLElBQUksQ0FBQyxHQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxvQkFBQztZQUFELENBTEEsQUFLQyxJQUFBO1lBTEQseUNBS0MsQ0FBQTtZQUVEO2dCQUNFLHlCQUFtQixPQUFlLEVBQVMsR0FBVztvQkFBbkMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtvQkFBUyxRQUFHLEdBQUgsR0FBRyxDQUFRO2dCQUFHLENBQUM7Z0JBQzVELHNCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCw2Q0FFQyxDQUFBO1lBRUQ7Z0JBQ0UseUJBQW1CLEtBQW9CLEVBQVMsR0FBa0I7b0JBQS9DLFVBQUssR0FBTCxLQUFLLENBQWU7b0JBQVMsUUFBRyxHQUFILEdBQUcsQ0FBZTtnQkFBRyxDQUFDO2dCQUV0RSxrQ0FBUSxHQUFSO29CQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9FLENBQUM7Z0JBQ0gsc0JBQUM7WUFBRCxDQU5BLEFBTUMsSUFBQTtZQU5ELDZDQU1DLENBQUE7WUFFRCxXQUFZLGVBQWU7Z0JBQ3pCLDJEQUFPLENBQUE7Z0JBQ1AsdURBQUssQ0FBQTtZQUNQLENBQUMsRUFIVyxlQUFlLEtBQWYsZUFBZSxRQUcxQjswREFBQTtZQUVEO2dCQUNFLG9CQUFtQixJQUFxQixFQUFTLEdBQVcsRUFDekMsS0FBOEM7b0JBQXJELHFCQUFxRCxHQUFyRCxRQUFnQyxlQUFlLENBQUMsS0FBSztvQkFEOUMsU0FBSSxHQUFKLElBQUksQ0FBaUI7b0JBQVMsUUFBRyxHQUFILEdBQUcsQ0FBUTtvQkFDekMsVUFBSyxHQUFMLEtBQUssQ0FBeUM7Z0JBQUcsQ0FBQztnQkFFckUsNkJBQVEsR0FBUjtvQkFDRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUMxQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDL0IsQ0FBQztvQkFDRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUM7b0JBQ3RCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDZixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7b0JBRWpCLE9BQU8sTUFBTSxHQUFHLEdBQUcsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQ3BDLFFBQVEsRUFBRSxDQUFDO3dCQUNYLE1BQU0sRUFBRSxDQUFDO3dCQUNULEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUM3QixFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNwQixLQUFLLENBQUM7NEJBQ1IsQ0FBQzt3QkFDSCxDQUFDO29CQUNILENBQUM7b0JBRUQsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDWCxRQUFRLEdBQUcsQ0FBQyxDQUFDO29CQUNiLE9BQU8sTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFDbEQsTUFBTSxFQUFFLENBQUM7d0JBQ1QsTUFBTSxFQUFFLENBQUM7d0JBQ1QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQzNCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3BCLEtBQUssQ0FBQzs0QkFDUixDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQztvQkFFRCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxZQUFZO3dCQUNqRSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRW5FLE1BQU0sQ0FBSSxJQUFJLENBQUMsR0FBRyxZQUFNLE9BQU8sYUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQU8sQ0FBQztnQkFDMUQsQ0FBQztnQkFDSCxpQkFBQztZQUFELENBekNBLEFBeUNDLElBQUE7WUF6Q0QsbUNBeUNDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3BhcnNlX3V0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgUGFyc2VMb2NhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBmaWxlOiBQYXJzZVNvdXJjZUZpbGUsIHB1YmxpYyBvZmZzZXQ6IG51bWJlciwgcHVibGljIGxpbmU6IG51bWJlcixcbiAgICAgICAgICAgICAgcHVibGljIGNvbDogbnVtYmVyKSB7fVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgJHt0aGlzLmZpbGUudXJsfUAke3RoaXMubGluZX06JHt0aGlzLmNvbH1gOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXJzZVNvdXJjZUZpbGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udGVudDogc3RyaW5nLCBwdWJsaWMgdXJsOiBzdHJpbmcpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBQYXJzZVNvdXJjZVNwYW4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3RhcnQ6IFBhcnNlTG9jYXRpb24sIHB1YmxpYyBlbmQ6IFBhcnNlTG9jYXRpb24pIHt9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydC5maWxlLmNvbnRlbnQuc3Vic3RyaW5nKHRoaXMuc3RhcnQub2Zmc2V0LCB0aGlzLmVuZC5vZmZzZXQpO1xuICB9XG59XG5cbmV4cG9ydCBlbnVtIFBhcnNlRXJyb3JMZXZlbCB7XG4gIFdBUk5JTkcsXG4gIEZBVEFMXG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYXJzZUVycm9yIHtcbiAgY29uc3RydWN0b3IocHVibGljIHNwYW46IFBhcnNlU291cmNlU3BhbiwgcHVibGljIG1zZzogc3RyaW5nLFxuICAgICAgICAgICAgICBwdWJsaWMgbGV2ZWw6IFBhcnNlRXJyb3JMZXZlbCA9IFBhcnNlRXJyb3JMZXZlbC5GQVRBTCkge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHZhciBzb3VyY2UgPSB0aGlzLnNwYW4uc3RhcnQuZmlsZS5jb250ZW50O1xuICAgIHZhciBjdHhTdGFydCA9IHRoaXMuc3Bhbi5zdGFydC5vZmZzZXQ7XG4gICAgaWYgKGN0eFN0YXJ0ID4gc291cmNlLmxlbmd0aCAtIDEpIHtcbiAgICAgIGN0eFN0YXJ0ID0gc291cmNlLmxlbmd0aCAtIDE7XG4gICAgfVxuICAgIHZhciBjdHhFbmQgPSBjdHhTdGFydDtcbiAgICB2YXIgY3R4TGVuID0gMDtcbiAgICB2YXIgY3R4TGluZXMgPSAwO1xuXG4gICAgd2hpbGUgKGN0eExlbiA8IDEwMCAmJiBjdHhTdGFydCA+IDApIHtcbiAgICAgIGN0eFN0YXJ0LS07XG4gICAgICBjdHhMZW4rKztcbiAgICAgIGlmIChzb3VyY2VbY3R4U3RhcnRdID09IFwiXFxuXCIpIHtcbiAgICAgICAgaWYgKCsrY3R4TGluZXMgPT0gMykge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY3R4TGVuID0gMDtcbiAgICBjdHhMaW5lcyA9IDA7XG4gICAgd2hpbGUgKGN0eExlbiA8IDEwMCAmJiBjdHhFbmQgPCBzb3VyY2UubGVuZ3RoIC0gMSkge1xuICAgICAgY3R4RW5kKys7XG4gICAgICBjdHhMZW4rKztcbiAgICAgIGlmIChzb3VyY2VbY3R4RW5kXSA9PSBcIlxcblwiKSB7XG4gICAgICAgIGlmICgrK2N0eExpbmVzID09IDMpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBjb250ZXh0ID0gc291cmNlLnN1YnN0cmluZyhjdHhTdGFydCwgdGhpcy5zcGFuLnN0YXJ0Lm9mZnNldCkgKyAnW0VSUk9SIC0+XScgK1xuICAgICAgICAgICAgICAgICAgc291cmNlLnN1YnN0cmluZyh0aGlzLnNwYW4uc3RhcnQub2Zmc2V0LCBjdHhFbmQgKyAxKTtcblxuICAgIHJldHVybiBgJHt0aGlzLm1zZ30gKFwiJHtjb250ZXh0fVwiKTogJHt0aGlzLnNwYW4uc3RhcnR9YDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
