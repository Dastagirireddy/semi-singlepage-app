System.register(['angular2/src/compiler/parse_util', 'angular2/src/compiler/html_ast', 'angular2/src/facade/lang', './message'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var parse_util_1, html_ast_1, lang_1, message_1;
    var I18N_ATTR, I18N_ATTR_PREFIX, CUSTOM_PH_EXP, I18nError, Part, _StringifyVisitor;
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
            var usedNames = new Map();
            if (lang_1.isPresent(parsed)) {
                var res = "";
                for (var i = 0; i < parsed.strings.length; ++i) {
                    res += parsed.strings[i];
                    if (i != parsed.strings.length - 1) {
                        var customPhName = getPhNameFromBinding(parsed.expressions[i], i);
                        customPhName = dedupePhName(usedNames, customPhName);
                        res += "<ph name=\"" + customPhName + "\"/>";
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
    function getPhNameFromBinding(input, index) {
        var customPhMatch = lang_1.StringWrapper.split(input, CUSTOM_PH_EXP);
        return customPhMatch.length > 1 ? customPhMatch[1] : "" + index;
    }
    exports_1("getPhNameFromBinding", getPhNameFromBinding);
    function dedupePhName(usedNames, name) {
        var duplicateNameCount = usedNames.get(name);
        if (lang_1.isPresent(duplicateNameCount)) {
            usedNames.set(name, duplicateNameCount + 1);
            return name + "_" + duplicateNameCount;
        }
        else {
            usedNames.set(name, 1);
            return name;
        }
    }
    exports_1("dedupePhName", dedupePhName);
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
            CUSTOM_PH_EXP = /\/\/[\s\S]*i18n[\s\S]*\([\s\S]*ph[\s\S]*=[\s\S]*"([\s\S]*?)"[\s\S]*\)/g;
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
                _StringifyVisitor.prototype.visitExpansion = function (ast, context) { return null; };
                _StringifyVisitor.prototype.visitExpansionCase = function (ast, context) { return null; };
                _StringifyVisitor.prototype._join = function (strs, str) {
                    return strs.filter(function (s) { return s.length > 0; }).join(str);
                };
                return _StringifyVisitor;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9pMThuL3NoYXJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7UUFnQmEsU0FBUyxFQUNULGdCQUFnQixFQUN6QixhQUFhO0lBVWpCLHdCQUF3QjtJQUN4QixtQkFBMEIsS0FBZ0IsRUFBRSxNQUFvQjtRQUM5RCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2QsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLElBQUksR0FBb0IsQ0FBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3pELENBQUMsRUFBRSxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLGlDQUFpQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUUsS0FBSyxDQUFDO29CQUNSLENBQUM7Z0JBQ0gsQ0FBQztnQkFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElB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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGFyc2VTb3VyY2VTcGFuLCBQYXJzZUVycm9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvcGFyc2VfdXRpbCc7XG5pbXBvcnQge1xuICBIdG1sQXN0LFxuICBIdG1sQXN0VmlzaXRvcixcbiAgSHRtbEVsZW1lbnRBc3QsXG4gIEh0bWxBdHRyQXN0LFxuICBIdG1sVGV4dEFzdCxcbiAgSHRtbENvbW1lbnRBc3QsXG4gIEh0bWxFeHBhbnNpb25Bc3QsXG4gIEh0bWxFeHBhbnNpb25DYXNlQXN0LFxuICBodG1sVmlzaXRBbGxcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2h0bWxfYXN0JztcbmltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rLCBTdHJpbmdXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtNZXNzYWdlfSBmcm9tICcuL21lc3NhZ2UnO1xuaW1wb3J0IHtQYXJzZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9leHByZXNzaW9uX3BhcnNlci9wYXJzZXInO1xuXG5leHBvcnQgY29uc3QgSTE4Tl9BVFRSID0gXCJpMThuXCI7XG5leHBvcnQgY29uc3QgSTE4Tl9BVFRSX1BSRUZJWCA9IFwiaTE4bi1cIjtcbnZhciBDVVNUT01fUEhfRVhQID0gL1xcL1xcL1tcXHNcXFNdKmkxOG5bXFxzXFxTXSpcXChbXFxzXFxTXSpwaFtcXHNcXFNdKj1bXFxzXFxTXSpcIihbXFxzXFxTXSo/KVwiW1xcc1xcU10qXFwpL2c7XG5cbi8qKlxuICogQW4gaTE4biBlcnJvci5cbiAqL1xuZXhwb3J0IGNsYXNzIEkxOG5FcnJvciBleHRlbmRzIFBhcnNlRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihzcGFuOiBQYXJzZVNvdXJjZVNwYW4sIG1zZzogc3RyaW5nKSB7IHN1cGVyKHNwYW4sIG1zZyk7IH1cbn1cblxuXG4vLyBNYW4sIHRoaXMgaXMgc28gdWdseSFcbmV4cG9ydCBmdW5jdGlvbiBwYXJ0aXRpb24obm9kZXM6IEh0bWxBc3RbXSwgZXJyb3JzOiBQYXJzZUVycm9yW10pOiBQYXJ0W10ge1xuICBsZXQgcmVzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xuICAgIGxldCBuID0gbm9kZXNbaV07XG4gICAgbGV0IHRlbXAgPSBbXTtcbiAgICBpZiAoX2lzT3BlbmluZ0NvbW1lbnQobikpIHtcbiAgICAgIGxldCBpMThuID0gKDxIdG1sQ29tbWVudEFzdD5uKS52YWx1ZS5zdWJzdHJpbmcoNSkudHJpbSgpO1xuICAgICAgaSsrO1xuICAgICAgd2hpbGUgKCFfaXNDbG9zaW5nQ29tbWVudChub2Rlc1tpXSkpIHtcbiAgICAgICAgdGVtcC5wdXNoKG5vZGVzW2krK10pO1xuICAgICAgICBpZiAoaSA9PT0gbm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgZXJyb3JzLnB1c2gobmV3IEkxOG5FcnJvcihuLnNvdXJjZVNwYW4sIFwiTWlzc2luZyBjbG9zaW5nICdpMThuJyBjb21tZW50LlwiKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlcy5wdXNoKG5ldyBQYXJ0KG51bGwsIG51bGwsIHRlbXAsIGkxOG4sIHRydWUpKTtcblxuICAgIH0gZWxzZSBpZiAobiBpbnN0YW5jZW9mIEh0bWxFbGVtZW50QXN0KSB7XG4gICAgICBsZXQgaTE4biA9IF9maW5kSTE4bkF0dHIobik7XG4gICAgICByZXMucHVzaChuZXcgUGFydChuLCBudWxsLCBuLmNoaWxkcmVuLCBpc1ByZXNlbnQoaTE4bikgPyBpMThuLnZhbHVlIDogbnVsbCwgaXNQcmVzZW50KGkxOG4pKSk7XG4gICAgfSBlbHNlIGlmIChuIGluc3RhbmNlb2YgSHRtbFRleHRBc3QpIHtcbiAgICAgIHJlcy5wdXNoKG5ldyBQYXJ0KG51bGwsIG4sIG51bGwsIG51bGwsIGZhbHNlKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGNsYXNzIFBhcnQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcm9vdEVsZW1lbnQ6IEh0bWxFbGVtZW50QXN0LCBwdWJsaWMgcm9vdFRleHROb2RlOiBIdG1sVGV4dEFzdCxcbiAgICAgICAgICAgICAgcHVibGljIGNoaWxkcmVuOiBIdG1sQXN0W10sIHB1YmxpYyBpMThuOiBzdHJpbmcsIHB1YmxpYyBoYXNJMThuOiBib29sZWFuKSB7fVxuXG4gIGdldCBzb3VyY2VTcGFuKCk6IFBhcnNlU291cmNlU3BhbiB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLnJvb3RFbGVtZW50KSlcbiAgICAgIHJldHVybiB0aGlzLnJvb3RFbGVtZW50LnNvdXJjZVNwYW47XG4gICAgZWxzZSBpZiAoaXNQcmVzZW50KHRoaXMucm9vdFRleHROb2RlKSlcbiAgICAgIHJldHVybiB0aGlzLnJvb3RUZXh0Tm9kZS5zb3VyY2VTcGFuO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuWzBdLnNvdXJjZVNwYW47XG4gIH1cblxuICBjcmVhdGVNZXNzYWdlKHBhcnNlcjogUGFyc2VyKTogTWVzc2FnZSB7XG4gICAgcmV0dXJuIG5ldyBNZXNzYWdlKHN0cmluZ2lmeU5vZGVzKHRoaXMuY2hpbGRyZW4sIHBhcnNlciksIG1lYW5pbmcodGhpcy5pMThuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24odGhpcy5pMThuKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2lzT3BlbmluZ0NvbW1lbnQobjogSHRtbEFzdCk6IGJvb2xlYW4ge1xuICByZXR1cm4gbiBpbnN0YW5jZW9mIEh0bWxDb21tZW50QXN0ICYmIGlzUHJlc2VudChuLnZhbHVlKSAmJiBuLnZhbHVlLnN0YXJ0c1dpdGgoXCJpMThuOlwiKTtcbn1cblxuZnVuY3Rpb24gX2lzQ2xvc2luZ0NvbW1lbnQobjogSHRtbEFzdCk6IGJvb2xlYW4ge1xuICByZXR1cm4gbiBpbnN0YW5jZW9mIEh0bWxDb21tZW50QXN0ICYmIGlzUHJlc2VudChuLnZhbHVlKSAmJiBuLnZhbHVlID09IFwiL2kxOG5cIjtcbn1cblxuZnVuY3Rpb24gX2ZpbmRJMThuQXR0cihwOiBIdG1sRWxlbWVudEFzdCk6IEh0bWxBdHRyQXN0IHtcbiAgbGV0IGkxOG4gPSBwLmF0dHJzLmZpbHRlcihhID0+IGEubmFtZSA9PSBJMThOX0FUVFIpO1xuICByZXR1cm4gaTE4bi5sZW5ndGggPT0gMCA/IG51bGwgOiBpMThuWzBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVhbmluZyhpMThuOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoaXNCbGFuayhpMThuKSB8fCBpMThuID09IFwiXCIpIHJldHVybiBudWxsO1xuICByZXR1cm4gaTE4bi5zcGxpdChcInxcIilbMF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNjcmlwdGlvbihpMThuOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoaXNCbGFuayhpMThuKSB8fCBpMThuID09IFwiXCIpIHJldHVybiBudWxsO1xuICBsZXQgcGFydHMgPSBpMThuLnNwbGl0KFwifFwiKTtcbiAgcmV0dXJuIHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1sxXSA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXNzYWdlRnJvbUF0dHJpYnV0ZShwYXJzZXI6IFBhcnNlciwgcDogSHRtbEVsZW1lbnRBc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cjogSHRtbEF0dHJBc3QpOiBNZXNzYWdlIHtcbiAgbGV0IGV4cGVjdGVkTmFtZSA9IGF0dHIubmFtZS5zdWJzdHJpbmcoNSk7XG4gIGxldCBtYXRjaGluZyA9IHAuYXR0cnMuZmlsdGVyKGEgPT4gYS5uYW1lID09IGV4cGVjdGVkTmFtZSk7XG5cbiAgaWYgKG1hdGNoaW5nLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgdmFsdWUgPSByZW1vdmVJbnRlcnBvbGF0aW9uKG1hdGNoaW5nWzBdLnZhbHVlLCBtYXRjaGluZ1swXS5zb3VyY2VTcGFuLCBwYXJzZXIpO1xuICAgIHJldHVybiBuZXcgTWVzc2FnZSh2YWx1ZSwgbWVhbmluZyhhdHRyLnZhbHVlKSwgZGVzY3JpcHRpb24oYXR0ci52YWx1ZSkpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBJMThuRXJyb3IocC5zb3VyY2VTcGFuLCBgTWlzc2luZyBhdHRyaWJ1dGUgJyR7ZXhwZWN0ZWROYW1lfScuYCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUludGVycG9sYXRpb24odmFsdWU6IHN0cmluZywgc291cmNlOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXI6IFBhcnNlcik6IHN0cmluZyB7XG4gIHRyeSB7XG4gICAgbGV0IHBhcnNlZCA9IHBhcnNlci5zcGxpdEludGVycG9sYXRpb24odmFsdWUsIHNvdXJjZS50b1N0cmluZygpKTtcbiAgICBsZXQgdXNlZE5hbWVzID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcbiAgICBpZiAoaXNQcmVzZW50KHBhcnNlZCkpIHtcbiAgICAgIGxldCByZXMgPSBcIlwiO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJzZWQuc3RyaW5ncy5sZW5ndGg7ICsraSkge1xuICAgICAgICByZXMgKz0gcGFyc2VkLnN0cmluZ3NbaV07XG4gICAgICAgIGlmIChpICE9IHBhcnNlZC5zdHJpbmdzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBsZXQgY3VzdG9tUGhOYW1lID0gZ2V0UGhOYW1lRnJvbUJpbmRpbmcocGFyc2VkLmV4cHJlc3Npb25zW2ldLCBpKTtcbiAgICAgICAgICBjdXN0b21QaE5hbWUgPSBkZWR1cGVQaE5hbWUodXNlZE5hbWVzLCBjdXN0b21QaE5hbWUpO1xuICAgICAgICAgIHJlcyArPSBgPHBoIG5hbWU9XCIke2N1c3RvbVBoTmFtZX1cIi8+YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGhOYW1lRnJvbUJpbmRpbmcoaW5wdXQ6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gIGxldCBjdXN0b21QaE1hdGNoID0gU3RyaW5nV3JhcHBlci5zcGxpdChpbnB1dCwgQ1VTVE9NX1BIX0VYUCk7XG4gIHJldHVybiBjdXN0b21QaE1hdGNoLmxlbmd0aCA+IDEgPyBjdXN0b21QaE1hdGNoWzFdIDogYCR7aW5kZXh9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZHVwZVBoTmFtZSh1c2VkTmFtZXM6IE1hcDxzdHJpbmcsIG51bWJlcj4sIG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGxldCBkdXBsaWNhdGVOYW1lQ291bnQgPSB1c2VkTmFtZXMuZ2V0KG5hbWUpO1xuICBpZiAoaXNQcmVzZW50KGR1cGxpY2F0ZU5hbWVDb3VudCkpIHtcbiAgICB1c2VkTmFtZXMuc2V0KG5hbWUsIGR1cGxpY2F0ZU5hbWVDb3VudCArIDEpO1xuICAgIHJldHVybiBgJHtuYW1lfV8ke2R1cGxpY2F0ZU5hbWVDb3VudH1gO1xuICB9IGVsc2Uge1xuICAgIHVzZWROYW1lcy5zZXQobmFtZSwgMSk7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeU5vZGVzKG5vZGVzOiBIdG1sQXN0W10sIHBhcnNlcjogUGFyc2VyKTogc3RyaW5nIHtcbiAgbGV0IHZpc2l0b3IgPSBuZXcgX1N0cmluZ2lmeVZpc2l0b3IocGFyc2VyKTtcbiAgcmV0dXJuIGh0bWxWaXNpdEFsbCh2aXNpdG9yLCBub2Rlcykuam9pbihcIlwiKTtcbn1cblxuY2xhc3MgX1N0cmluZ2lmeVZpc2l0b3IgaW1wbGVtZW50cyBIdG1sQXN0VmlzaXRvciB7XG4gIHByaXZhdGUgX2luZGV4OiBudW1iZXIgPSAwO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYXJzZXI6IFBhcnNlcikge31cblxuICB2aXNpdEVsZW1lbnQoYXN0OiBIdG1sRWxlbWVudEFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBsZXQgbmFtZSA9IHRoaXMuX2luZGV4Kys7XG4gICAgbGV0IGNoaWxkcmVuID0gdGhpcy5fam9pbihodG1sVmlzaXRBbGwodGhpcywgYXN0LmNoaWxkcmVuKSwgXCJcIik7XG4gICAgcmV0dXJuIGA8cGggbmFtZT1cImUke25hbWV9XCI+JHtjaGlsZHJlbn08L3BoPmA7XG4gIH1cblxuICB2aXNpdEF0dHIoYXN0OiBIdG1sQXR0ckFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cblxuICB2aXNpdFRleHQoYXN0OiBIdG1sVGV4dEFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLl9pbmRleCsrO1xuICAgIGxldCBub0ludGVycG9sYXRpb24gPSByZW1vdmVJbnRlcnBvbGF0aW9uKGFzdC52YWx1ZSwgYXN0LnNvdXJjZVNwYW4sIHRoaXMuX3BhcnNlcik7XG4gICAgaWYgKG5vSW50ZXJwb2xhdGlvbiAhPSBhc3QudmFsdWUpIHtcbiAgICAgIHJldHVybiBgPHBoIG5hbWU9XCJ0JHtpbmRleH1cIj4ke25vSW50ZXJwb2xhdGlvbn08L3BoPmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhc3QudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgdmlzaXRDb21tZW50KGFzdDogSHRtbENvbW1lbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBcIlwiOyB9XG5cbiAgdmlzaXRFeHBhbnNpb24oYXN0OiBIdG1sRXhwYW5zaW9uQXN0LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuXG4gIHZpc2l0RXhwYW5zaW9uQ2FzZShhc3Q6IEh0bWxFeHBhbnNpb25DYXNlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuXG4gIHByaXZhdGUgX2pvaW4oc3Ryczogc3RyaW5nW10sIHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gc3Rycy5maWx0ZXIocyA9PiBzLmxlbmd0aCA+IDApLmpvaW4oc3RyKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
