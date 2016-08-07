System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ParseLocation, ParseSourceFile, ParseSourceSpan, ParseError;
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
            ParseError = (function () {
                function ParseError(span, msg) {
                    this.span = span;
                    this.msg = msg;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3BhcnNlX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFBO2dCQUNFLHVCQUFtQixJQUFxQixFQUFTLE1BQWMsRUFBUyxJQUFZLEVBQ2pFLEdBQVc7b0JBRFgsU0FBSSxHQUFKLElBQUksQ0FBaUI7b0JBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtvQkFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO29CQUNqRSxRQUFHLEdBQUgsR0FBRyxDQUFRO2dCQUFHLENBQUM7Z0JBRWxDLGdDQUFRLEdBQVIsY0FBcUIsTUFBTSxDQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFJLElBQUksQ0FBQyxJQUFJLFNBQUksSUFBSSxDQUFDLEdBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLG9CQUFDO1lBQUQsQ0FMQSxBQUtDLElBQUE7WUFMRCx5Q0FLQyxDQUFBO1lBRUQ7Z0JBQ0UseUJBQW1CLE9BQWUsRUFBUyxHQUFXO29CQUFuQyxZQUFPLEdBQVAsT0FBTyxDQUFRO29CQUFTLFFBQUcsR0FBSCxHQUFHLENBQVE7Z0JBQUcsQ0FBQztnQkFDNUQsc0JBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELDZDQUVDLENBQUE7WUFFRDtnQkFDRSx5QkFBbUIsS0FBb0IsRUFBUyxHQUFrQjtvQkFBL0MsVUFBSyxHQUFMLEtBQUssQ0FBZTtvQkFBUyxRQUFHLEdBQUgsR0FBRyxDQUFlO2dCQUFHLENBQUM7Z0JBRXRFLGtDQUFRLEdBQVI7b0JBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0UsQ0FBQztnQkFDSCxzQkFBQztZQUFELENBTkEsQUFNQyxJQUFBO1lBTkQsNkNBTUMsQ0FBQTtZQUVEO2dCQUNFLG9CQUFtQixJQUFxQixFQUFTLEdBQVc7b0JBQXpDLFNBQUksR0FBSixJQUFJLENBQWlCO29CQUFTLFFBQUcsR0FBSCxHQUFHLENBQVE7Z0JBQUcsQ0FBQztnQkFFaEUsNkJBQVEsR0FBUjtvQkFDRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUMxQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQ3RDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDL0IsQ0FBQztvQkFDRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUM7b0JBQ3RCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDZixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7b0JBRWpCLE9BQU8sTUFBTSxHQUFHLEdBQUcsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUM7d0JBQ3BDLFFBQVEsRUFBRSxDQUFDO3dCQUNYLE1BQU0sRUFBRSxDQUFDO3dCQUNULEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUM3QixFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUNwQixLQUFLLENBQUM7NEJBQ1IsQ0FBQzt3QkFDSCxDQUFDO29CQUNILENBQUM7b0JBRUQsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDWCxRQUFRLEdBQUcsQ0FBQyxDQUFDO29CQUNiLE9BQU8sTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFDbEQsTUFBTSxFQUFFLENBQUM7d0JBQ1QsTUFBTSxFQUFFLENBQUM7d0JBQ1QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQzNCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ3BCLEtBQUssQ0FBQzs0QkFDUixDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQztvQkFFRCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxZQUFZO3dCQUNqRSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRW5FLE1BQU0sQ0FBSSxJQUFJLENBQUMsR0FBRyxZQUFNLE9BQU8sYUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQU8sQ0FBQztnQkFDMUQsQ0FBQztnQkFDSCxpQkFBQztZQUFELENBeENBLEFBd0NDLElBQUE7WUF4Q0QsbUNBd0NDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvcGFyc2VfdXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBQYXJzZUxvY2F0aW9uIHtcbiAgY29uc3RydWN0b3IocHVibGljIGZpbGU6IFBhcnNlU291cmNlRmlsZSwgcHVibGljIG9mZnNldDogbnVtYmVyLCBwdWJsaWMgbGluZTogbnVtYmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgY29sOiBudW1iZXIpIHt9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIGAke3RoaXMuZmlsZS51cmx9QCR7dGhpcy5saW5lfToke3RoaXMuY29sfWA7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFBhcnNlU291cmNlRmlsZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250ZW50OiBzdHJpbmcsIHB1YmxpYyB1cmw6IHN0cmluZykge31cbn1cblxuZXhwb3J0IGNsYXNzIFBhcnNlU291cmNlU3BhbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzdGFydDogUGFyc2VMb2NhdGlvbiwgcHVibGljIGVuZDogUGFyc2VMb2NhdGlvbikge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0LmZpbGUuY29udGVudC5zdWJzdHJpbmcodGhpcy5zdGFydC5vZmZzZXQsIHRoaXMuZW5kLm9mZnNldCk7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhcnNlRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3BhbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgbXNnOiBzdHJpbmcpIHt9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICB2YXIgc291cmNlID0gdGhpcy5zcGFuLnN0YXJ0LmZpbGUuY29udGVudDtcbiAgICB2YXIgY3R4U3RhcnQgPSB0aGlzLnNwYW4uc3RhcnQub2Zmc2V0O1xuICAgIGlmIChjdHhTdGFydCA+IHNvdXJjZS5sZW5ndGggLSAxKSB7XG4gICAgICBjdHhTdGFydCA9IHNvdXJjZS5sZW5ndGggLSAxO1xuICAgIH1cbiAgICB2YXIgY3R4RW5kID0gY3R4U3RhcnQ7XG4gICAgdmFyIGN0eExlbiA9IDA7XG4gICAgdmFyIGN0eExpbmVzID0gMDtcblxuICAgIHdoaWxlIChjdHhMZW4gPCAxMDAgJiYgY3R4U3RhcnQgPiAwKSB7XG4gICAgICBjdHhTdGFydC0tO1xuICAgICAgY3R4TGVuKys7XG4gICAgICBpZiAoc291cmNlW2N0eFN0YXJ0XSA9PSBcIlxcblwiKSB7XG4gICAgICAgIGlmICgrK2N0eExpbmVzID09IDMpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGN0eExlbiA9IDA7XG4gICAgY3R4TGluZXMgPSAwO1xuICAgIHdoaWxlIChjdHhMZW4gPCAxMDAgJiYgY3R4RW5kIDwgc291cmNlLmxlbmd0aCAtIDEpIHtcbiAgICAgIGN0eEVuZCsrO1xuICAgICAgY3R4TGVuKys7XG4gICAgICBpZiAoc291cmNlW2N0eEVuZF0gPT0gXCJcXG5cIikge1xuICAgICAgICBpZiAoKytjdHhMaW5lcyA9PSAzKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY29udGV4dCA9IHNvdXJjZS5zdWJzdHJpbmcoY3R4U3RhcnQsIHRoaXMuc3Bhbi5zdGFydC5vZmZzZXQpICsgJ1tFUlJPUiAtPl0nICtcbiAgICAgICAgICAgICAgICAgIHNvdXJjZS5zdWJzdHJpbmcodGhpcy5zcGFuLnN0YXJ0Lm9mZnNldCwgY3R4RW5kICsgMSk7XG5cbiAgICByZXR1cm4gYCR7dGhpcy5tc2d9IChcIiR7Y29udGV4dH1cIik6ICR7dGhpcy5zcGFuLnN0YXJ0fWA7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
