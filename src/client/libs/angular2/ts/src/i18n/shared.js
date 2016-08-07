System.register(['angular2/src/compiler/parse_util', 'angular2/src/compiler/html_ast', 'angular2/src/facade/lang', './message'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var parse_util_1, html_ast_1, lang_1, message_1;
    var I18N_ATTR, I18N_ATTR_PREFIX, I18nError, Part, _StringifyVisitor;
    // Man, this is so ugly!
    function partition(nodes, errors) {
        var res = [];
        for (var i = 0; i < nodes.length; ++i) {
            var n = nodes[i];
            var temp = [];
            if (_isOpeningComment(n)) {
                var i18n = n.value.substring(5).trim();
                i++;
                while (!_isClosingComment(nodes[i])) {
                    temp.push(nodes[i++]);
                    if (i === nodes.length) {
                        errors.push(new I18nError(n.sourceSpan, "Missing closing 'i18n' comment."));
                        break;
                    }
                }
                res.push(new Part(null, null, temp, i18n, true));
            }
            else if (n instanceof html_ast_1.HtmlElementAst) {
                var i18n = _findI18nAttr(n);
                res.push(new Part(n, null, n.children, lang_1.isPresent(i18n) ? i18n.value : null, lang_1.isPresent(i18n)));
            }
            else if (n instanceof html_ast_1.HtmlTextAst) {
                res.push(new Part(null, n, null, null, false));
            }
        }
        return res;
    }
    exports_1("partition", partition);
    function _isOpeningComment(n) {
        return n instanceof html_ast_1.HtmlCommentAst && lang_1.isPresent(n.value) && n.value.startsWith("i18n:");
    }
    function _isClosingComment(n) {
        return n instanceof html_ast_1.HtmlCommentAst && lang_1.isPresent(n.value) && n.value == "/i18n";
    }
    function _findI18nAttr(p) {
        var i18n = p.attrs.filter(function (a) { return a.name == I18N_ATTR; });
        return i18n.length == 0 ? null : i18n[0];
    }
    function meaning(i18n) {
        if (lang_1.isBlank(i18n) || i18n == "")
            return null;
        return i18n.split("|")[0];
    }
    exports_1("meaning", meaning);
    function description(i18n) {
        if (lang_1.isBlank(i18n) || i18n == "")
            return null;
        var parts = i18n.split("|");
        return parts.length > 1 ? parts[1] : null;
    }
    exports_1("description", description);
    function messageFromAttribute(parser, p, attr) {
        var expectedName = attr.name.substring(5);
        var matching = p.attrs.filter(function (a) { return a.name == expectedName; });
        if (matching.length > 0) {
            var value = removeInterpolation(matching[0].value, matching[0].sourceSpan, parser);
            return new message_1.Message(value, meaning(attr.value), description(attr.value));
        }
        else {
            throw new I18nError(p.sourceSpan, "Missing attribute '" + expectedName + "'.");
        }
    }
    exports_1("messageFromAttribute", messageFromAttribute);
    function removeInterpolation(value, source, parser) {
        try {
            var parsed = parser.splitInterpolation(value, source.toString());
            if (lang_1.isPresent(parsed)) {
                var res = "";
                for (var i = 0; i < parsed.strings.length; ++i) {
                    res += parsed.strings[i];
                    if (i != parsed.strings.length - 1) {
                        res += "<ph name=\"" + i + "\"/>";
                    }
                }
                return res;
            }
            else {
                return value;
            }
        }
        catch (e) {
            return value;
        }
    }
    exports_1("removeInterpolation", removeInterpolation);
    function stringifyNodes(nodes, parser) {
        var visitor = new _StringifyVisitor(parser);
        return html_ast_1.htmlVisitAll(visitor, nodes).join("");
    }
    exports_1("stringifyNodes", stringifyNodes);
    return {
        setters:[
            function (parse_util_1_1) {
                parse_util_1 = parse_util_1_1;
            },
            function (html_ast_1_1) {
                html_ast_1 = html_ast_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (message_1_1) {
                message_1 = message_1_1;
            }],
        execute: function() {
            exports_1("I18N_ATTR", I18N_ATTR = "i18n");
            exports_1("I18N_ATTR_PREFIX", I18N_ATTR_PREFIX = "i18n-");
            /**
             * An i18n error.
             */
            I18nError = (function (_super) {
                __extends(I18nError, _super);
                function I18nError(span, msg) {
                    _super.call(this, span, msg);
                }
                return I18nError;
            }(parse_util_1.ParseError));
            exports_1("I18nError", I18nError);
            Part = (function () {
                function Part(rootElement, rootTextNode, children, i18n, hasI18n) {
                    this.rootElement = rootElement;
                    this.rootTextNode = rootTextNode;
                    this.children = children;
                    this.i18n = i18n;
                    this.hasI18n = hasI18n;
                }
                Object.defineProperty(Part.prototype, "sourceSpan", {
                    get: function () {
                        if (lang_1.isPresent(this.rootElement))
                            return this.rootElement.sourceSpan;
                        else if (lang_1.isPresent(this.rootTextNode))
                            return this.rootTextNode.sourceSpan;
                        else
                            return this.children[0].sourceSpan;
                    },
                    enumerable: true,
                    configurable: true
                });
                Part.prototype.createMessage = function (parser) {
                    return new message_1.Message(stringifyNodes(this.children, parser), meaning(this.i18n), description(this.i18n));
                };
                return Part;
            }());
            exports_1("Part", Part);
            _StringifyVisitor = (function () {
                function _StringifyVisitor(_parser) {
                    this._parser = _parser;
                    this._index = 0;
                }
                _StringifyVisitor.prototype.visitElement = function (ast, context) {
                    var name = this._index++;
                    var children = this._join(html_ast_1.htmlVisitAll(this, ast.children), "");
                    return "<ph name=\"e" + name + "\">" + children + "</ph>";
                };
                _StringifyVisitor.prototype.visitAttr = function (ast, context) { return null; };
                _StringifyVisitor.prototype.visitText = function (ast, context) {
                    var index = this._index++;
                    var noInterpolation = removeInterpolation(ast.value, ast.sourceSpan, this._parser);
                    if (noInterpolation != ast.value) {
                        return "<ph name=\"t" + index + "\">" + noInterpolation + "</ph>";
                    }
                    else {
                        return ast.value;
                    }
                };
                _StringifyVisitor.prototype.visitComment = function (ast, context) { return ""; };
                _StringifyVisitor.prototype._join = function (strs, str) {
                    return strs.filter(function (s) { return s.length > 0; }).join(str);
                };
                return _StringifyVisitor;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2kxOG4vc2hhcmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztRQWNhLFNBQVMsRUFDVCxnQkFBZ0I7SUFVN0Isd0JBQXdCO0lBQ3hCLG1CQUEwQixLQUFnQixFQUFFLE1BQW9CO1FBQzlELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUViLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZCxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksSUFBSSxHQUFvQixDQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDekQsQ0FBQyxFQUFFLENBQUM7Z0JBQ0osT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsaUNBQWlDLENBQUMsQ0FBQyxDQUFDO3dCQUM1RSxLQUFLLENBQUM7b0JBQ1IsQ0FBQztnQkFDSCxDQUFDO2dCQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFF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QWMsSUFBSSxXQUFLLFFBQVEsVUFBTyxDQUFDO2dCQUNoRCxDQUFDO2dCQUVELHFDQUFTLEdBQVQsVUFBVSxHQUFnQixFQUFFLE9BQVksSUFBUyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFL0QscUNBQVMsR0FBVCxVQUFVLEdBQWdCLEVBQUUsT0FBWTtvQkFDdEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUMxQixJQUFJLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNuRixFQUFFLENBQUMsQ0FBQyxlQUFlLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ2pDLE1BQU0sQ0FBQyxpQkFBYyxLQUFLLFdBQUssZUFBZSxVQUFPLENBQUM7b0JBQ3hELENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7b0JBQ25CLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCx3Q0FBWSxHQUFaLFVBQWEsR0FBbUIsRUFBRSxPQUFZLElBQVMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRTNELGlDQUFLLEdBQWIsVUFBYyxJQUFjLEVBQUUsR0FBVztvQkFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBWixDQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELENBQUM7Z0JBQ0gsd0JBQUM7WUFBRCxDQTNCQSxBQTJCQyxJQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2kxOG4vc2hhcmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQYXJzZVNvdXJjZVNwYW4sIFBhcnNlRXJyb3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9wYXJzZV91dGlsJztcbmltcG9ydCB7XG4gIEh0bWxBc3QsXG4gIEh0bWxBc3RWaXNpdG9yLFxuICBIdG1sRWxlbWVudEFzdCxcbiAgSHRtbEF0dHJBc3QsXG4gIEh0bWxUZXh0QXN0LFxuICBIdG1sQ29tbWVudEFzdCxcbiAgaHRtbFZpc2l0QWxsXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9odG1sX2FzdCc7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAnLi9tZXNzYWdlJztcbmltcG9ydCB7UGFyc2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL3BhcnNlci9wYXJzZXInO1xuXG5leHBvcnQgY29uc3QgSTE4Tl9BVFRSID0gXCJpMThuXCI7XG5leHBvcnQgY29uc3QgSTE4Tl9BVFRSX1BSRUZJWCA9IFwiaTE4bi1cIjtcblxuLyoqXG4gKiBBbiBpMThuIGVycm9yLlxuICovXG5leHBvcnQgY2xhc3MgSTE4bkVycm9yIGV4dGVuZHMgUGFyc2VFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHNwYW46IFBhcnNlU291cmNlU3BhbiwgbXNnOiBzdHJpbmcpIHsgc3VwZXIoc3BhbiwgbXNnKTsgfVxufVxuXG5cbi8vIE1hbiwgdGhpcyBpcyBzbyB1Z2x5IVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnRpdGlvbihub2RlczogSHRtbEFzdFtdLCBlcnJvcnM6IFBhcnNlRXJyb3JbXSk6IFBhcnRbXSB7XG4gIGxldCByZXMgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgKytpKSB7XG4gICAgbGV0IG4gPSBub2Rlc1tpXTtcbiAgICBsZXQgdGVtcCA9IFtdO1xuICAgIGlmIChfaXNPcGVuaW5nQ29tbWVudChuKSkge1xuICAgICAgbGV0IGkxOG4gPSAoPEh0bWxDb21tZW50QXN0Pm4pLnZhbHVlLnN1YnN0cmluZyg1KS50cmltKCk7XG4gICAgICBpKys7XG4gICAgICB3aGlsZSAoIV9pc0Nsb3NpbmdDb21tZW50KG5vZGVzW2ldKSkge1xuICAgICAgICB0ZW1wLnB1c2gobm9kZXNbaSsrXSk7XG4gICAgICAgIGlmIChpID09PSBub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICBlcnJvcnMucHVzaChuZXcgSTE4bkVycm9yKG4uc291cmNlU3BhbiwgXCJNaXNzaW5nIGNsb3NpbmcgJ2kxOG4nIGNvbW1lbnQuXCIpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzLnB1c2gobmV3IFBhcnQobnVsbCwgbnVsbCwgdGVtcCwgaTE4biwgdHJ1ZSkpO1xuXG4gICAgfSBlbHNlIGlmIChuIGluc3RhbmNlb2YgSHRtbEVsZW1lbnRBc3QpIHtcbiAgICAgIGxldCBpMThuID0gX2ZpbmRJMThuQXR0cihuKTtcbiAgICAgIHJlcy5wdXNoKG5ldyBQYXJ0KG4sIG51bGwsIG4uY2hpbGRyZW4sIGlzUHJlc2VudChpMThuKSA/IGkxOG4udmFsdWUgOiBudWxsLCBpc1ByZXNlbnQoaTE4bikpKTtcbiAgICB9IGVsc2UgaWYgKG4gaW5zdGFuY2VvZiBIdG1sVGV4dEFzdCkge1xuICAgICAgcmVzLnB1c2gobmV3IFBhcnQobnVsbCwgbiwgbnVsbCwgbnVsbCwgZmFsc2UpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgY2xhc3MgUGFydCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByb290RWxlbWVudDogSHRtbEVsZW1lbnRBc3QsIHB1YmxpYyByb290VGV4dE5vZGU6IEh0bWxUZXh0QXN0LFxuICAgICAgICAgICAgICBwdWJsaWMgY2hpbGRyZW46IEh0bWxBc3RbXSwgcHVibGljIGkxOG46IHN0cmluZywgcHVibGljIGhhc0kxOG46IGJvb2xlYW4pIHt9XG5cbiAgZ2V0IHNvdXJjZVNwYW4oKTogUGFyc2VTb3VyY2VTcGFuIHtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMucm9vdEVsZW1lbnQpKVxuICAgICAgcmV0dXJuIHRoaXMucm9vdEVsZW1lbnQuc291cmNlU3BhbjtcbiAgICBlbHNlIGlmIChpc1ByZXNlbnQodGhpcy5yb290VGV4dE5vZGUpKVxuICAgICAgcmV0dXJuIHRoaXMucm9vdFRleHROb2RlLnNvdXJjZVNwYW47XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bMF0uc291cmNlU3BhbjtcbiAgfVxuXG4gIGNyZWF0ZU1lc3NhZ2UocGFyc2VyOiBQYXJzZXIpOiBNZXNzYWdlIHtcbiAgICByZXR1cm4gbmV3IE1lc3NhZ2Uoc3RyaW5naWZ5Tm9kZXModGhpcy5jaGlsZHJlbiwgcGFyc2VyKSwgbWVhbmluZyh0aGlzLmkxOG4pLFxuICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbih0aGlzLmkxOG4pKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfaXNPcGVuaW5nQ29tbWVudChuOiBIdG1sQXN0KTogYm9vbGVhbiB7XG4gIHJldHVybiBuIGluc3RhbmNlb2YgSHRtbENvbW1lbnRBc3QgJiYgaXNQcmVzZW50KG4udmFsdWUpICYmIG4udmFsdWUuc3RhcnRzV2l0aChcImkxOG46XCIpO1xufVxuXG5mdW5jdGlvbiBfaXNDbG9zaW5nQ29tbWVudChuOiBIdG1sQXN0KTogYm9vbGVhbiB7XG4gIHJldHVybiBuIGluc3RhbmNlb2YgSHRtbENvbW1lbnRBc3QgJiYgaXNQcmVzZW50KG4udmFsdWUpICYmIG4udmFsdWUgPT0gXCIvaTE4blwiO1xufVxuXG5mdW5jdGlvbiBfZmluZEkxOG5BdHRyKHA6IEh0bWxFbGVtZW50QXN0KTogSHRtbEF0dHJBc3Qge1xuICBsZXQgaTE4biA9IHAuYXR0cnMuZmlsdGVyKGEgPT4gYS5uYW1lID09IEkxOE5fQVRUUik7XG4gIHJldHVybiBpMThuLmxlbmd0aCA9PSAwID8gbnVsbCA6IGkxOG5bMF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZWFuaW5nKGkxOG46IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChpc0JsYW5rKGkxOG4pIHx8IGkxOG4gPT0gXCJcIikgcmV0dXJuIG51bGw7XG4gIHJldHVybiBpMThuLnNwbGl0KFwifFwiKVswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc2NyaXB0aW9uKGkxOG46IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChpc0JsYW5rKGkxOG4pIHx8IGkxOG4gPT0gXCJcIikgcmV0dXJuIG51bGw7XG4gIGxldCBwYXJ0cyA9IGkxOG4uc3BsaXQoXCJ8XCIpO1xuICByZXR1cm4gcGFydHMubGVuZ3RoID4gMSA/IHBhcnRzWzFdIDogbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lc3NhZ2VGcm9tQXR0cmlidXRlKHBhcnNlcjogUGFyc2VyLCBwOiBIdG1sRWxlbWVudEFzdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyOiBIdG1sQXR0ckFzdCk6IE1lc3NhZ2Uge1xuICBsZXQgZXhwZWN0ZWROYW1lID0gYXR0ci5uYW1lLnN1YnN0cmluZyg1KTtcbiAgbGV0IG1hdGNoaW5nID0gcC5hdHRycy5maWx0ZXIoYSA9PiBhLm5hbWUgPT0gZXhwZWN0ZWROYW1lKTtcblxuICBpZiAobWF0Y2hpbmcubGVuZ3RoID4gMCkge1xuICAgIGxldCB2YWx1ZSA9IHJlbW92ZUludGVycG9sYXRpb24obWF0Y2hpbmdbMF0udmFsdWUsIG1hdGNoaW5nWzBdLnNvdXJjZVNwYW4sIHBhcnNlcik7XG4gICAgcmV0dXJuIG5ldyBNZXNzYWdlKHZhbHVlLCBtZWFuaW5nKGF0dHIudmFsdWUpLCBkZXNjcmlwdGlvbihhdHRyLnZhbHVlKSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEkxOG5FcnJvcihwLnNvdXJjZVNwYW4sIGBNaXNzaW5nIGF0dHJpYnV0ZSAnJHtleHBlY3RlZE5hbWV9Jy5gKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlSW50ZXJwb2xhdGlvbih2YWx1ZTogc3RyaW5nLCBzb3VyY2U6IFBhcnNlU291cmNlU3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlcjogUGFyc2VyKTogc3RyaW5nIHtcbiAgdHJ5IHtcbiAgICBsZXQgcGFyc2VkID0gcGFyc2VyLnNwbGl0SW50ZXJwb2xhdGlvbih2YWx1ZSwgc291cmNlLnRvU3RyaW5nKCkpO1xuICAgIGlmIChpc1ByZXNlbnQocGFyc2VkKSkge1xuICAgICAgbGV0IHJlcyA9IFwiXCI7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnNlZC5zdHJpbmdzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHJlcyArPSBwYXJzZWQuc3RyaW5nc1tpXTtcbiAgICAgICAgaWYgKGkgIT0gcGFyc2VkLnN0cmluZ3MubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHJlcyArPSBgPHBoIG5hbWU9XCIke2l9XCIvPmA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeU5vZGVzKG5vZGVzOiBIdG1sQXN0W10sIHBhcnNlcjogUGFyc2VyKSB7XG4gIGxldCB2aXNpdG9yID0gbmV3IF9TdHJpbmdpZnlWaXNpdG9yKHBhcnNlcik7XG4gIHJldHVybiBodG1sVmlzaXRBbGwodmlzaXRvciwgbm9kZXMpLmpvaW4oXCJcIik7XG59XG5cbmNsYXNzIF9TdHJpbmdpZnlWaXNpdG9yIGltcGxlbWVudHMgSHRtbEFzdFZpc2l0b3Ige1xuICBwcml2YXRlIF9pbmRleDogbnVtYmVyID0gMDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFyc2VyOiBQYXJzZXIpIHt9XG5cbiAgdmlzaXRFbGVtZW50KGFzdDogSHRtbEVsZW1lbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgbGV0IG5hbWUgPSB0aGlzLl9pbmRleCsrO1xuICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuX2pvaW4oaHRtbFZpc2l0QWxsKHRoaXMsIGFzdC5jaGlsZHJlbiksIFwiXCIpO1xuICAgIHJldHVybiBgPHBoIG5hbWU9XCJlJHtuYW1lfVwiPiR7Y2hpbGRyZW59PC9waD5gO1xuICB9XG5cbiAgdmlzaXRBdHRyKGFzdDogSHRtbEF0dHJBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG5cbiAgdmlzaXRUZXh0KGFzdDogSHRtbFRleHRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5faW5kZXgrKztcbiAgICBsZXQgbm9JbnRlcnBvbGF0aW9uID0gcmVtb3ZlSW50ZXJwb2xhdGlvbihhc3QudmFsdWUsIGFzdC5zb3VyY2VTcGFuLCB0aGlzLl9wYXJzZXIpO1xuICAgIGlmIChub0ludGVycG9sYXRpb24gIT0gYXN0LnZhbHVlKSB7XG4gICAgICByZXR1cm4gYDxwaCBuYW1lPVwidCR7aW5kZXh9XCI+JHtub0ludGVycG9sYXRpb259PC9waD5gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYXN0LnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHZpc2l0Q29tbWVudChhc3Q6IEh0bWxDb21tZW50QXN0LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gXCJcIjsgfVxuXG4gIHByaXZhdGUgX2pvaW4oc3Ryczogc3RyaW5nW10sIHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc3Rycy5maWx0ZXIocyA9PiBzLmxlbmd0aCA+IDApLmpvaW4oc3RyKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
