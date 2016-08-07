System.register(['angular2/src/compiler/html_ast', 'angular2/src/facade/lang', 'angular2/src/facade/collection', './message', './shared'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var html_ast_1, lang_1, collection_1, message_1, shared_1;
    var ExtractionResult, MessageExtractor;
    /**
     * Removes duplicate messages.
     *
     * E.g.
     *
     * ```
     *  var m = [new Message("message", "meaning", "desc1"), new Message("message", "meaning",
     * "desc2")];
     *  expect(removeDuplicates(m)).toEqual([new Message("message", "meaning", "desc1")]);
     * ```
     */
    function removeDuplicates(messages) {
        var uniq = {};
        messages.forEach(function (m) {
            if (!collection_1.StringMapWrapper.contains(uniq, message_1.id(m))) {
                uniq[message_1.id(m)] = m;
            }
        });
        return collection_1.StringMapWrapper.values(uniq);
    }
    exports_1("removeDuplicates", removeDuplicates);
    return {
        setters:[
            function (html_ast_1_1) {
                html_ast_1 = html_ast_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (message_1_1) {
                message_1 = message_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            }],
        execute: function() {
            /**
             * All messages extracted from a template.
             */
            ExtractionResult = (function () {
                function ExtractionResult(messages, errors) {
                    this.messages = messages;
                    this.errors = errors;
                }
                return ExtractionResult;
            }());
            exports_1("ExtractionResult", ExtractionResult);
            /**
             * Extracts all messages from a template.
             *
             * Algorithm:
             *
             * To understand the algorithm, you need to know how partitioning works.
             * Partitioning is required as we can use two i18n comments to group node siblings together.
             * That is why we cannot just use nodes.
             *
             * Partitioning transforms an array of HtmlAst into an array of Part.
             * A part can optionally contain a root element or a root text node. And it can also contain
             * children.
             * A part can contain i18n property, in which case it needs to be extracted.
             *
             * Example:
             *
             * The following array of nodes will be split into four parts:
             *
             * ```
             * <a>A</a>
             * <b i18n>B</b>
             * <!-- i18n -->
             * <c>C</c>
             * D
             * <!-- /i18n -->
             * E
             * ```
             *
             * Part 1 containing the a tag. It should not be translated.
             * Part 2 containing the b tag. It should be translated.
             * Part 3 containing the c tag and the D text node. It should be translated.
             * Part 4 containing the E text node. It should not be translated..
             *
             * It is also important to understand how we stringify nodes to create a message.
             *
             * We walk the tree and replace every element node with a placeholder. We also replace
             * all expressions in interpolation with placeholders. We also insert a placeholder element
             * to wrap a text node containing interpolation.
             *
             * Example:
             *
             * The following tree:
             *
             * ```
             * <a>A{{I}}</a><b>B</b>
             * ```
             *
             * will be stringified into:
             * ```
             * <ph name="e0"><ph name="t1">A<ph name="0"/></ph></ph><ph name="e2">B</ph>
             * ```
             *
             * This is what the algorithm does:
             *
             * 1. Use the provided html parser to get the html AST of the template.
             * 2. Partition the root nodes, and process each part separately.
             * 3. If a part does not have the i18n attribute, recurse to process children and attributes.
             * 4. If a part has the i18n attribute, stringify the nodes to create a Message.
             */
            MessageExtractor = (function () {
                function MessageExtractor(_htmlParser, _parser) {
                    this._htmlParser = _htmlParser;
                    this._parser = _parser;
                }
                MessageExtractor.prototype.extract = function (template, sourceUrl) {
                    this.messages = [];
                    this.errors = [];
                    var res = this._htmlParser.parse(template, sourceUrl);
                    if (res.errors.length > 0) {
                        return new ExtractionResult([], res.errors);
                    }
                    else {
                        this._recurse(res.rootNodes);
                        return new ExtractionResult(this.messages, this.errors);
                    }
                };
                MessageExtractor.prototype._extractMessagesFromPart = function (p) {
                    if (p.hasI18n) {
                        this.messages.push(p.createMessage(this._parser));
                        this._recurseToExtractMessagesFromAttributes(p.children);
                    }
                    else {
                        this._recurse(p.children);
                    }
                    if (lang_1.isPresent(p.rootElement)) {
                        this._extractMessagesFromAttributes(p.rootElement);
                    }
                };
                MessageExtractor.prototype._recurse = function (nodes) {
                    var _this = this;
                    if (lang_1.isPresent(nodes)) {
                        var ps = shared_1.partition(nodes, this.errors);
                        ps.forEach(function (p) { return _this._extractMessagesFromPart(p); });
                    }
                };
                MessageExtractor.prototype._recurseToExtractMessagesFromAttributes = function (nodes) {
                    var _this = this;
                    nodes.forEach(function (n) {
                        if (n instanceof html_ast_1.HtmlElementAst) {
                            _this._extractMessagesFromAttributes(n);
                            _this._recurseToExtractMessagesFromAttributes(n.children);
                        }
                    });
                };
                MessageExtractor.prototype._extractMessagesFromAttributes = function (p) {
                    var _this = this;
                    p.attrs.forEach(function (attr) {
                        if (attr.name.startsWith(shared_1.I18N_ATTR_PREFIX)) {
                            try {
                                _this.messages.push(shared_1.messageFromAttribute(_this._parser, p, attr));
                            }
                            catch (e) {
                                if (e instanceof shared_1.I18nError) {
                                    _this.errors.push(e);
                                }
                                else {
                                    throw e;
                                }
                            }
                        }
                    });
                };
                return MessageExtractor;
            }());
            exports_1("MessageExtractor", MessageExtractor);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2kxOG4vbWVzc2FnZV9leHRyYWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFpQ0E7Ozs7Ozs7Ozs7T0FVRztJQUNILDBCQUFpQyxRQUFtQjtRQUNsRCxJQUFJLElBQUksR0FBNkIsRUFBRSxDQUFDO1FBQ3hDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsNkJBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxZQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLDZCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBUkQsK0NBUUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQTFCRDs7ZUFFRztZQUNIO2dCQUNFLDBCQUFtQixRQUFtQixFQUFTLE1BQW9CO29CQUFoRCxhQUFRLEdBQVIsUUFBUSxDQUFXO29CQUFTLFdBQU0sR0FBTixNQUFNLENBQWM7Z0JBQUcsQ0FBQztnQkFDekUsdUJBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELCtDQUVDLENBQUE7WUF1QkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUEwREc7WUFDSDtnQkFJRSwwQkFBb0IsV0FBdUIsRUFBVSxPQUFlO29CQUFoRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtvQkFBVSxZQUFPLEdBQVAsT0FBTyxDQUFRO2dCQUFHLENBQUM7Z0JBRXhFLGtDQUFPLEdBQVAsVUFBUSxRQUFnQixFQUFFLFNBQWlCO29CQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFH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QyxDQUFDLENBQUMsQ0FBQztnQ0FDWCxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksa0JBQVMsQ0FBQyxDQUFDLENBQUM7b0NBQzNCLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUN0QixDQUFDO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNOLE1BQU0sQ0FBQyxDQUFDO2dDQUNWLENBQUM7NEJBQ0gsQ0FBQzt3QkFDSCxDQUFDO29CQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBQ0gsdUJBQUM7WUFBRCxDQS9EQSxBQStEQyxJQUFBO1lBL0RELCtDQStEQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2kxOG4vbWVzc2FnZV9leHRyYWN0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0bWxQYXJzZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9odG1sX3BhcnNlcic7XG5pbXBvcnQge1BhcnNlU291cmNlU3BhbiwgUGFyc2VFcnJvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3BhcnNlX3V0aWwnO1xuaW1wb3J0IHtcbiAgSHRtbEFzdCxcbiAgSHRtbEFzdFZpc2l0b3IsXG4gIEh0bWxFbGVtZW50QXN0LFxuICBIdG1sQXR0ckFzdCxcbiAgSHRtbFRleHRBc3QsXG4gIEh0bWxDb21tZW50QXN0LFxuICBodG1sVmlzaXRBbGxcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2h0bWxfYXN0JztcbmltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtQYXJzZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vcGFyc2VyL3BhcnNlcic7XG5pbXBvcnQge01lc3NhZ2UsIGlkfSBmcm9tICcuL21lc3NhZ2UnO1xuaW1wb3J0IHtcbiAgSTE4bkVycm9yLFxuICBQYXJ0LFxuICBJMThOX0FUVFJfUFJFRklYLFxuICBwYXJ0aXRpb24sXG4gIG1lYW5pbmcsXG4gIGRlc2NyaXB0aW9uLFxuICBzdHJpbmdpZnlOb2RlcyxcbiAgbWVzc2FnZUZyb21BdHRyaWJ1dGVcbn0gZnJvbSAnLi9zaGFyZWQnO1xuXG4vKipcbiAqIEFsbCBtZXNzYWdlcyBleHRyYWN0ZWQgZnJvbSBhIHRlbXBsYXRlLlxuICovXG5leHBvcnQgY2xhc3MgRXh0cmFjdGlvblJlc3VsdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZXNzYWdlczogTWVzc2FnZVtdLCBwdWJsaWMgZXJyb3JzOiBQYXJzZUVycm9yW10pIHt9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBkdXBsaWNhdGUgbWVzc2FnZXMuXG4gKlxuICogRS5nLlxuICpcbiAqIGBgYFxuICogIHZhciBtID0gW25ldyBNZXNzYWdlKFwibWVzc2FnZVwiLCBcIm1lYW5pbmdcIiwgXCJkZXNjMVwiKSwgbmV3IE1lc3NhZ2UoXCJtZXNzYWdlXCIsIFwibWVhbmluZ1wiLFxuICogXCJkZXNjMlwiKV07XG4gKiAgZXhwZWN0KHJlbW92ZUR1cGxpY2F0ZXMobSkpLnRvRXF1YWwoW25ldyBNZXNzYWdlKFwibWVzc2FnZVwiLCBcIm1lYW5pbmdcIiwgXCJkZXNjMVwiKV0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEdXBsaWNhdGVzKG1lc3NhZ2VzOiBNZXNzYWdlW10pOiBNZXNzYWdlW10ge1xuICBsZXQgdW5pcToge1trZXk6IHN0cmluZ106IE1lc3NhZ2V9ID0ge307XG4gIG1lc3NhZ2VzLmZvckVhY2gobSA9PiB7XG4gICAgaWYgKCFTdHJpbmdNYXBXcmFwcGVyLmNvbnRhaW5zKHVuaXEsIGlkKG0pKSkge1xuICAgICAgdW5pcVtpZChtKV0gPSBtO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBTdHJpbmdNYXBXcmFwcGVyLnZhbHVlcyh1bmlxKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0cyBhbGwgbWVzc2FnZXMgZnJvbSBhIHRlbXBsYXRlLlxuICpcbiAqIEFsZ29yaXRobTpcbiAqXG4gKiBUbyB1bmRlcnN0YW5kIHRoZSBhbGdvcml0aG0sIHlvdSBuZWVkIHRvIGtub3cgaG93IHBhcnRpdGlvbmluZyB3b3Jrcy5cbiAqIFBhcnRpdGlvbmluZyBpcyByZXF1aXJlZCBhcyB3ZSBjYW4gdXNlIHR3byBpMThuIGNvbW1lbnRzIHRvIGdyb3VwIG5vZGUgc2libGluZ3MgdG9nZXRoZXIuXG4gKiBUaGF0IGlzIHdoeSB3ZSBjYW5ub3QganVzdCB1c2Ugbm9kZXMuXG4gKlxuICogUGFydGl0aW9uaW5nIHRyYW5zZm9ybXMgYW4gYXJyYXkgb2YgSHRtbEFzdCBpbnRvIGFuIGFycmF5IG9mIFBhcnQuXG4gKiBBIHBhcnQgY2FuIG9wdGlvbmFsbHkgY29udGFpbiBhIHJvb3QgZWxlbWVudCBvciBhIHJvb3QgdGV4dCBub2RlLiBBbmQgaXQgY2FuIGFsc28gY29udGFpblxuICogY2hpbGRyZW4uXG4gKiBBIHBhcnQgY2FuIGNvbnRhaW4gaTE4biBwcm9wZXJ0eSwgaW4gd2hpY2ggY2FzZSBpdCBuZWVkcyB0byBiZSBleHRyYWN0ZWQuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGFycmF5IG9mIG5vZGVzIHdpbGwgYmUgc3BsaXQgaW50byBmb3VyIHBhcnRzOlxuICpcbiAqIGBgYFxuICogPGE+QTwvYT5cbiAqIDxiIGkxOG4+QjwvYj5cbiAqIDwhLS0gaTE4biAtLT5cbiAqIDxjPkM8L2M+XG4gKiBEXG4gKiA8IS0tIC9pMThuIC0tPlxuICogRVxuICogYGBgXG4gKlxuICogUGFydCAxIGNvbnRhaW5pbmcgdGhlIGEgdGFnLiBJdCBzaG91bGQgbm90IGJlIHRyYW5zbGF0ZWQuXG4gKiBQYXJ0IDIgY29udGFpbmluZyB0aGUgYiB0YWcuIEl0IHNob3VsZCBiZSB0cmFuc2xhdGVkLlxuICogUGFydCAzIGNvbnRhaW5pbmcgdGhlIGMgdGFnIGFuZCB0aGUgRCB0ZXh0IG5vZGUuIEl0IHNob3VsZCBiZSB0cmFuc2xhdGVkLlxuICogUGFydCA0IGNvbnRhaW5pbmcgdGhlIEUgdGV4dCBub2RlLiBJdCBzaG91bGQgbm90IGJlIHRyYW5zbGF0ZWQuLlxuICpcbiAqIEl0IGlzIGFsc28gaW1wb3J0YW50IHRvIHVuZGVyc3RhbmQgaG93IHdlIHN0cmluZ2lmeSBub2RlcyB0byBjcmVhdGUgYSBtZXNzYWdlLlxuICpcbiAqIFdlIHdhbGsgdGhlIHRyZWUgYW5kIHJlcGxhY2UgZXZlcnkgZWxlbWVudCBub2RlIHdpdGggYSBwbGFjZWhvbGRlci4gV2UgYWxzbyByZXBsYWNlXG4gKiBhbGwgZXhwcmVzc2lvbnMgaW4gaW50ZXJwb2xhdGlvbiB3aXRoIHBsYWNlaG9sZGVycy4gV2UgYWxzbyBpbnNlcnQgYSBwbGFjZWhvbGRlciBlbGVtZW50XG4gKiB0byB3cmFwIGEgdGV4dCBub2RlIGNvbnRhaW5pbmcgaW50ZXJwb2xhdGlvbi5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIFRoZSBmb2xsb3dpbmcgdHJlZTpcbiAqXG4gKiBgYGBcbiAqIDxhPkF7e0l9fTwvYT48Yj5CPC9iPlxuICogYGBgXG4gKlxuICogd2lsbCBiZSBzdHJpbmdpZmllZCBpbnRvOlxuICogYGBgXG4gKiA8cGggbmFtZT1cImUwXCI+PHBoIG5hbWU9XCJ0MVwiPkE8cGggbmFtZT1cIjBcIi8+PC9waD48L3BoPjxwaCBuYW1lPVwiZTJcIj5CPC9waD5cbiAqIGBgYFxuICpcbiAqIFRoaXMgaXMgd2hhdCB0aGUgYWxnb3JpdGhtIGRvZXM6XG4gKlxuICogMS4gVXNlIHRoZSBwcm92aWRlZCBodG1sIHBhcnNlciB0byBnZXQgdGhlIGh0bWwgQVNUIG9mIHRoZSB0ZW1wbGF0ZS5cbiAqIDIuIFBhcnRpdGlvbiB0aGUgcm9vdCBub2RlcywgYW5kIHByb2Nlc3MgZWFjaCBwYXJ0IHNlcGFyYXRlbHkuXG4gKiAzLiBJZiBhIHBhcnQgZG9lcyBub3QgaGF2ZSB0aGUgaTE4biBhdHRyaWJ1dGUsIHJlY3Vyc2UgdG8gcHJvY2VzcyBjaGlsZHJlbiBhbmQgYXR0cmlidXRlcy5cbiAqIDQuIElmIGEgcGFydCBoYXMgdGhlIGkxOG4gYXR0cmlidXRlLCBzdHJpbmdpZnkgdGhlIG5vZGVzIHRvIGNyZWF0ZSBhIE1lc3NhZ2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBNZXNzYWdlRXh0cmFjdG9yIHtcbiAgbWVzc2FnZXM6IE1lc3NhZ2VbXTtcbiAgZXJyb3JzOiBQYXJzZUVycm9yW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHRtbFBhcnNlcjogSHRtbFBhcnNlciwgcHJpdmF0ZSBfcGFyc2VyOiBQYXJzZXIpIHt9XG5cbiAgZXh0cmFjdCh0ZW1wbGF0ZTogc3RyaW5nLCBzb3VyY2VVcmw6IHN0cmluZyk6IEV4dHJhY3Rpb25SZXN1bHQge1xuICAgIHRoaXMubWVzc2FnZXMgPSBbXTtcbiAgICB0aGlzLmVycm9ycyA9IFtdO1xuXG4gICAgbGV0IHJlcyA9IHRoaXMuX2h0bWxQYXJzZXIucGFyc2UodGVtcGxhdGUsIHNvdXJjZVVybCk7XG4gICAgaWYgKHJlcy5lcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIG5ldyBFeHRyYWN0aW9uUmVzdWx0KFtdLCByZXMuZXJyb3JzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVjdXJzZShyZXMucm9vdE5vZGVzKTtcbiAgICAgIHJldHVybiBuZXcgRXh0cmFjdGlvblJlc3VsdCh0aGlzLm1lc3NhZ2VzLCB0aGlzLmVycm9ycyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZXh0cmFjdE1lc3NhZ2VzRnJvbVBhcnQocDogUGFydCk6IHZvaWQge1xuICAgIGlmIChwLmhhc0kxOG4pIHtcbiAgICAgIHRoaXMubWVzc2FnZXMucHVzaChwLmNyZWF0ZU1lc3NhZ2UodGhpcy5fcGFyc2VyKSk7XG4gICAgICB0aGlzLl9yZWN1cnNlVG9FeHRyYWN0TWVzc2FnZXNGcm9tQXR0cmlidXRlcyhwLmNoaWxkcmVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVjdXJzZShwLmNoaWxkcmVuKTtcbiAgICB9XG5cbiAgICBpZiAoaXNQcmVzZW50KHAucm9vdEVsZW1lbnQpKSB7XG4gICAgICB0aGlzLl9leHRyYWN0TWVzc2FnZXNGcm9tQXR0cmlidXRlcyhwLnJvb3RFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWN1cnNlKG5vZGVzOiBIdG1sQXN0W10pOiB2b2lkIHtcbiAgICBpZiAoaXNQcmVzZW50KG5vZGVzKSkge1xuICAgICAgbGV0IHBzID0gcGFydGl0aW9uKG5vZGVzLCB0aGlzLmVycm9ycyk7XG4gICAgICBwcy5mb3JFYWNoKHAgPT4gdGhpcy5fZXh0cmFjdE1lc3NhZ2VzRnJvbVBhcnQocCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlY3Vyc2VUb0V4dHJhY3RNZXNzYWdlc0Zyb21BdHRyaWJ1dGVzKG5vZGVzOiBIdG1sQXN0W10pOiB2b2lkIHtcbiAgICBub2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgaWYgKG4gaW5zdGFuY2VvZiBIdG1sRWxlbWVudEFzdCkge1xuICAgICAgICB0aGlzLl9leHRyYWN0TWVzc2FnZXNGcm9tQXR0cmlidXRlcyhuKTtcbiAgICAgICAgdGhpcy5fcmVjdXJzZVRvRXh0cmFjdE1lc3NhZ2VzRnJvbUF0dHJpYnV0ZXMobi5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9leHRyYWN0TWVzc2FnZXNGcm9tQXR0cmlidXRlcyhwOiBIdG1sRWxlbWVudEFzdCk6IHZvaWQge1xuICAgIHAuYXR0cnMuZm9yRWFjaChhdHRyID0+IHtcbiAgICAgIGlmIChhdHRyLm5hbWUuc3RhcnRzV2l0aChJMThOX0FUVFJfUFJFRklYKSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMubWVzc2FnZXMucHVzaChtZXNzYWdlRnJvbUF0dHJpYnV0ZSh0aGlzLl9wYXJzZXIsIHAsIGF0dHIpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgSTE4bkVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9ycy5wdXNoKGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
