System.register(['angular2/src/facade/lang', 'angular2/src/compiler/html_ast', './message', 'angular2/src/compiler/html_parser', 'angular2/src/compiler/parse_util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, html_ast_1, message_1, html_parser_1, parse_util_1;
    var _PLACEHOLDER_REGEXP, _ID_ATTR, _MSG_ELEMENT, _BUNDLE_ELEMENT, XmbDeserializationResult, XmbDeserializationError;
    function serializeXmb(messages) {
        var ms = messages.map(function (m) { return _serializeMessage(m); }).join("");
        return "<message-bundle>" + ms + "</message-bundle>";
    }
    exports_1("serializeXmb", serializeXmb);
    function deserializeXmb(content, url) {
        var parser = new html_parser_1.HtmlParser();
        var normalizedContent = _expandPlaceholder(content.trim());
        var parsed = parser.parse(normalizedContent, url);
        if (parsed.errors.length > 0) {
            return new XmbDeserializationResult(null, {}, parsed.errors);
        }
        if (_checkRootElement(parsed.rootNodes)) {
            return new XmbDeserializationResult(null, {}, [new XmbDeserializationError(null, "Missing element \"" + _BUNDLE_ELEMENT + "\"")]);
        }
        var bundleEl = parsed.rootNodes[0]; // test this
        var errors = [];
        var messages = {};
        _createMessages(bundleEl.children, messages, errors);
        return (errors.length == 0) ?
            new XmbDeserializationResult(normalizedContent, messages, []) :
            new XmbDeserializationResult(null, {}, errors);
    }
    exports_1("deserializeXmb", deserializeXmb);
    function _checkRootElement(nodes) {
        return nodes.length < 1 || !(nodes[0] instanceof html_ast_1.HtmlElementAst) ||
            nodes[0].name != _BUNDLE_ELEMENT;
    }
    function _createMessages(nodes, messages, errors) {
        nodes.forEach(function (item) {
            if (item instanceof html_ast_1.HtmlElementAst) {
                var msg = item;
                if (msg.name != _MSG_ELEMENT) {
                    errors.push(new XmbDeserializationError(item.sourceSpan, "Unexpected element \"" + msg.name + "\""));
                    return;
                }
                var id_1 = _id(msg);
                if (lang_1.isBlank(id_1)) {
                    errors.push(new XmbDeserializationError(item.sourceSpan, "\"" + _ID_ATTR + "\" attribute is missing"));
                    return;
                }
                messages[id_1] = msg.children;
            }
        });
    }
    function _id(el) {
        var ids = el.attrs.filter(function (a) { return a.name == _ID_ATTR; });
        return ids.length > 0 ? ids[0].value : null;
    }
    function _serializeMessage(m) {
        var desc = lang_1.isPresent(m.description) ? " desc='" + m.description + "'" : "";
        return "<msg id='" + message_1.id(m) + "'" + desc + ">" + m.content + "</msg>";
    }
    function _expandPlaceholder(input) {
        return lang_1.RegExpWrapper.replaceAll(_PLACEHOLDER_REGEXP, input, function (match) {
            var nameWithQuotes = match[2];
            return "<ph name=" + nameWithQuotes + "></ph>";
        });
    }
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (html_ast_1_1) {
                html_ast_1 = html_ast_1_1;
            },
            function (message_1_1) {
                message_1 = message_1_1;
            },
            function (html_parser_1_1) {
                html_parser_1 = html_parser_1_1;
            },
            function (parse_util_1_1) {
                parse_util_1 = parse_util_1_1;
            }],
        execute: function() {
            _PLACEHOLDER_REGEXP = lang_1.RegExpWrapper.create("\\<ph(\\s)+name=(\"(\\w)+\")\\/\\>");
            _ID_ATTR = "id";
            _MSG_ELEMENT = "msg";
            _BUNDLE_ELEMENT = "message-bundle";
            XmbDeserializationResult = (function () {
                function XmbDeserializationResult(content, messages, errors) {
                    this.content = content;
                    this.messages = messages;
                    this.errors = errors;
                }
                return XmbDeserializationResult;
            }());
            exports_1("XmbDeserializationResult", XmbDeserializationResult);
            XmbDeserializationError = (function (_super) {
                __extends(XmbDeserializationError, _super);
                function XmbDeserializationError(span, msg) {
                    _super.call(this, span, msg);
                }
                return XmbDeserializationError;
            }(parse_util_1.ParseError));
            exports_1("XmbDeserializationError", XmbDeserializationError);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2kxOG4veG1iX3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1FBTUksbUJBQW1CLEVBQ2pCLFFBQVEsRUFDUixZQUFZLEVBQ1osZUFBZTtJQUVyQixzQkFBNkIsUUFBbUI7UUFDOUMsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFwQixDQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVELE1BQU0sQ0FBQyxxQkFBbUIsRUFBRSxzQkFBbUIsQ0FBQztJQUNsRCxDQUFDO0lBSEQsdUNBR0MsQ0FBQTtJQVdELHdCQUErQixPQUFlLEVBQUUsR0FBVztRQUN6RCxJQUFJLE1BQU0sR0FBRyxJQUFJLHdCQUFVLEVBQUUsQ0FBQztRQUM5QixJQUFJLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzNELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFbEQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsSUFBSSx3QkFBd0IsQ0FDL0IsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksdUJBQXVCLENBQUMsSUFBSSxFQUFFLHVCQUFvQixl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O1lBQ2hFLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsY0FBWSxjQUFjLFdBQVEsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUF4RkcsbUJBQW1CLEdBQUcsb0JBQWEsQ0FBQyxNQUFNLENBQUMsb0NBQWtDLENBQUMsQ0FBQztZQUM3RSxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDckIsZUFBZSxHQUFHLGdCQUFnQixDQUFDO1lBT3pDO2dCQUNFLGtDQUFtQixPQUFlLEVBQVMsUUFBb0MsRUFDNUQsTUFBb0I7b0JBRHBCLFlBQU8sR0FBUCxPQUFPLENBQVE7b0JBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBNEI7b0JBQzVELFdBQU0sR0FBTixNQUFNLENBQWM7Z0JBQUcsQ0FBQztnQkFDN0MsK0JBQUM7WUFBRCxDQUhBLEFBR0MsSUFBQTtZQUhELCtEQUdDLENBQUE7WUFFRDtnQkFBNkMsMkNBQVU7Z0JBQ3JELGlDQUFZLElBQXFCLEVBQUUsR0FBVztvQkFBSSxrQkFBTSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQUMsQ0FBQztnQkFDdkUsOEJBQUM7WUFBRCxDQUZBLEFBRUMsQ0FGNEMsdUJBQVUsR0FFdEQ7WUFGRCw2REFFQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2kxOG4veG1iX3NlcmlhbGl6ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgaXNCbGFuaywgUmVnRXhwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7SHRtbEFzdCwgSHRtbEVsZW1lbnRBc3R9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9odG1sX2FzdCc7XG5pbXBvcnQge01lc3NhZ2UsIGlkfSBmcm9tICcuL21lc3NhZ2UnO1xuaW1wb3J0IHtIdG1sUGFyc2VyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvaHRtbF9wYXJzZXInO1xuaW1wb3J0IHtQYXJzZVNvdXJjZVNwYW4sIFBhcnNlRXJyb3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9wYXJzZV91dGlsJztcblxubGV0IF9QTEFDRUhPTERFUl9SRUdFWFAgPSBSZWdFeHBXcmFwcGVyLmNyZWF0ZShgXFxcXDxwaChcXFxccykrbmFtZT0oXCIoXFxcXHcpK1wiKVxcXFwvXFxcXD5gKTtcbmNvbnN0IF9JRF9BVFRSID0gXCJpZFwiO1xuY29uc3QgX01TR19FTEVNRU5UID0gXCJtc2dcIjtcbmNvbnN0IF9CVU5ETEVfRUxFTUVOVCA9IFwibWVzc2FnZS1idW5kbGVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZVhtYihtZXNzYWdlczogTWVzc2FnZVtdKTogc3RyaW5nIHtcbiAgbGV0IG1zID0gbWVzc2FnZXMubWFwKChtKSA9PiBfc2VyaWFsaXplTWVzc2FnZShtKSkuam9pbihcIlwiKTtcbiAgcmV0dXJuIGA8bWVzc2FnZS1idW5kbGU+JHttc308L21lc3NhZ2UtYnVuZGxlPmA7XG59XG5cbmV4cG9ydCBjbGFzcyBYbWJEZXNlcmlhbGl6YXRpb25SZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29udGVudDogc3RyaW5nLCBwdWJsaWMgbWVzc2FnZXM6IHtba2V5OiBzdHJpbmddOiBIdG1sQXN0W119LFxuICAgICAgICAgICAgICBwdWJsaWMgZXJyb3JzOiBQYXJzZUVycm9yW10pIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBYbWJEZXNlcmlhbGl6YXRpb25FcnJvciBleHRlbmRzIFBhcnNlRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihzcGFuOiBQYXJzZVNvdXJjZVNwYW4sIG1zZzogc3RyaW5nKSB7IHN1cGVyKHNwYW4sIG1zZyk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplWG1iKGNvbnRlbnQ6IHN0cmluZywgdXJsOiBzdHJpbmcpOiBYbWJEZXNlcmlhbGl6YXRpb25SZXN1bHQge1xuICBsZXQgcGFyc2VyID0gbmV3IEh0bWxQYXJzZXIoKTtcbiAgbGV0IG5vcm1hbGl6ZWRDb250ZW50ID0gX2V4cGFuZFBsYWNlaG9sZGVyKGNvbnRlbnQudHJpbSgpKTtcbiAgbGV0IHBhcnNlZCA9IHBhcnNlci5wYXJzZShub3JtYWxpemVkQ29udGVudCwgdXJsKTtcblxuICBpZiAocGFyc2VkLmVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIG5ldyBYbWJEZXNlcmlhbGl6YXRpb25SZXN1bHQobnVsbCwge30sIHBhcnNlZC5lcnJvcnMpO1xuICB9XG5cbiAgaWYgKF9jaGVja1Jvb3RFbGVtZW50KHBhcnNlZC5yb290Tm9kZXMpKSB7XG4gICAgcmV0dXJuIG5ldyBYbWJEZXNlcmlhbGl6YXRpb25SZXN1bHQoXG4gICAgICAgIG51bGwsIHt9LCBbbmV3IFhtYkRlc2VyaWFsaXphdGlvbkVycm9yKG51bGwsIGBNaXNzaW5nIGVsZW1lbnQgXCIke19CVU5ETEVfRUxFTUVOVH1cImApXSk7XG4gIH1cblxuICBsZXQgYnVuZGxlRWwgPSA8SHRtbEVsZW1lbnRBc3Q+cGFyc2VkLnJvb3ROb2Rlc1swXTsgIC8vIHRlc3QgdGhpc1xuICBsZXQgZXJyb3JzID0gW107XG4gIGxldCBtZXNzYWdlczoge1trZXk6IHN0cmluZ106IEh0bWxBc3RbXX0gPSB7fTtcblxuICBfY3JlYXRlTWVzc2FnZXMoYnVuZGxlRWwuY2hpbGRyZW4sIG1lc3NhZ2VzLCBlcnJvcnMpO1xuXG4gIHJldHVybiAoZXJyb3JzLmxlbmd0aCA9PSAwKSA/XG4gICAgICAgICAgICAgbmV3IFhtYkRlc2VyaWFsaXphdGlvblJlc3VsdChub3JtYWxpemVkQ29udGVudCwgbWVzc2FnZXMsIFtdKSA6XG4gICAgICAgICAgICAgbmV3IFhtYkRlc2VyaWFsaXphdGlvblJlc3VsdChudWxsLCA8e1trZXk6IHN0cmluZ106IEh0bWxBc3RbXX0+e30sIGVycm9ycyk7XG59XG5cbmZ1bmN0aW9uIF9jaGVja1Jvb3RFbGVtZW50KG5vZGVzOiBIdG1sQXN0W10pOiBib29sZWFuIHtcbiAgcmV0dXJuIG5vZGVzLmxlbmd0aCA8IDEgfHwgIShub2Rlc1swXSBpbnN0YW5jZW9mIEh0bWxFbGVtZW50QXN0KSB8fFxuICAgICAgICAgKDxIdG1sRWxlbWVudEFzdD5ub2Rlc1swXSkubmFtZSAhPSBfQlVORExFX0VMRU1FTlQ7XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVNZXNzYWdlcyhub2RlczogSHRtbEFzdFtdLCBtZXNzYWdlczoge1trZXk6IHN0cmluZ106IEh0bWxBc3RbXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzOiBQYXJzZUVycm9yW10pOiB2b2lkIHtcbiAgbm9kZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGlmIChpdGVtIGluc3RhbmNlb2YgSHRtbEVsZW1lbnRBc3QpIHtcbiAgICAgIGxldCBtc2cgPSA8SHRtbEVsZW1lbnRBc3Q+aXRlbTtcblxuICAgICAgaWYgKG1zZy5uYW1lICE9IF9NU0dfRUxFTUVOVCkge1xuICAgICAgICBlcnJvcnMucHVzaChcbiAgICAgICAgICAgIG5ldyBYbWJEZXNlcmlhbGl6YXRpb25FcnJvcihpdGVtLnNvdXJjZVNwYW4sIGBVbmV4cGVjdGVkIGVsZW1lbnQgXCIke21zZy5uYW1lfVwiYCkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBpZCA9IF9pZChtc2cpO1xuICAgICAgaWYgKGlzQmxhbmsoaWQpKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKFxuICAgICAgICAgICAgbmV3IFhtYkRlc2VyaWFsaXphdGlvbkVycm9yKGl0ZW0uc291cmNlU3BhbiwgYFwiJHtfSURfQVRUUn1cIiBhdHRyaWJ1dGUgaXMgbWlzc2luZ2ApKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBtZXNzYWdlc1tpZF0gPSBtc2cuY2hpbGRyZW47XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gX2lkKGVsOiBIdG1sRWxlbWVudEFzdCk6IHN0cmluZyB7XG4gIGxldCBpZHMgPSBlbC5hdHRycy5maWx0ZXIoYSA9PiBhLm5hbWUgPT0gX0lEX0FUVFIpO1xuICByZXR1cm4gaWRzLmxlbmd0aCA+IDAgPyBpZHNbMF0udmFsdWUgOiBudWxsO1xufVxuXG5mdW5jdGlvbiBfc2VyaWFsaXplTWVzc2FnZShtOiBNZXNzYWdlKTogc3RyaW5nIHtcbiAgbGV0IGRlc2MgPSBpc1ByZXNlbnQobS5kZXNjcmlwdGlvbikgPyBgIGRlc2M9JyR7bS5kZXNjcmlwdGlvbn0nYCA6IFwiXCI7XG4gIHJldHVybiBgPG1zZyBpZD0nJHtpZChtKX0nJHtkZXNjfT4ke20uY29udGVudH08L21zZz5gO1xufVxuXG5mdW5jdGlvbiBfZXhwYW5kUGxhY2Vob2xkZXIoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBSZWdFeHBXcmFwcGVyLnJlcGxhY2VBbGwoX1BMQUNFSE9MREVSX1JFR0VYUCwgaW5wdXQsIChtYXRjaCkgPT4ge1xuICAgIGxldCBuYW1lV2l0aFF1b3RlcyA9IG1hdGNoWzJdO1xuICAgIHJldHVybiBgPHBoIG5hbWU9JHtuYW1lV2l0aFF1b3Rlc30+PC9waD5gO1xuICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
