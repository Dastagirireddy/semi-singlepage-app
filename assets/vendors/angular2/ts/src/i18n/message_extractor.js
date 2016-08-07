System.register(['angular2/src/compiler/html_ast', 'angular2/src/facade/lang', 'angular2/src/facade/collection', './message', './expander', './shared'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var html_ast_1, lang_1, collection_1, message_1, expander_1, shared_1;
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
            function (expander_1_1) {
                expander_1 = expander_1_1;
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
                    var res = this._htmlParser.parse(template, sourceUrl, true);
                    if (res.errors.length > 0) {
                        return new ExtractionResult([], res.errors);
                    }
                    else {
                        this._recurse(expander_1.expandNodes(res.rootNodes).nodes);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9pMThuL21lc3NhZ2VfZXh0cmFjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0lBa0NBOzs7Ozs7Ozs7O09BVUc7SUFDSCwwQkFBaUMsUUFBbUI7UUFDbEQsSUFBSSxJQUFJLEdBQTZCLEVBQUUsQ0FBQztRQUN4QyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLDZCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsWUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsWUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyw2QkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQVJELCtDQVFDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUExQkQ7O2VBRUc7WUFDSDtnQkFDRSwwQkFBbUIsUUFBbUIsRUFBUyxNQUFvQjtvQkFBaEQsYUFBUSxHQUFSLFFBQVEsQ0FBVztvQkFBUyxXQUFNLEdBQU4sTUFBTSxDQUFjO2dCQUFHLENBQUM7Z0JBQ3pFLHVCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCwrQ0FFQyxDQUFBO1lBdUJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBMERHO1lBQ0g7Z0JBSUUsMEJBQW9CLFdBQXVCLEVBQVUsT0FBZTtvQkFBaEQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7b0JBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUTtnQkFBRyxDQUFDO2dCQUV4RSxrQ0FBTyxHQUFQLFVBQVEsUUFBZ0IsRUFBRSxTQUFpQjtvQkFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxF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QUNsRSxDQUFFOzRCQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ1gsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLGtCQUFTLENBQUMsQ0FBQyxDQUFDO29DQUMzQixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDdEIsQ0FBQztnQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDTixNQUFNLENBQUMsQ0FBQztnQ0FDVixDQUFDOzRCQUNILENBQUM7d0JBQ0gsQ0FBQztvQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUNILHVCQUFDO1lBQUQsQ0EvREEsQUErREMsSUFBQTtZQS9ERCwrQ0ErREMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvaTE4bi9tZXNzYWdlX2V4dHJhY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SHRtbFBhcnNlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2h0bWxfcGFyc2VyJztcbmltcG9ydCB7UGFyc2VTb3VyY2VTcGFuLCBQYXJzZUVycm9yfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvcGFyc2VfdXRpbCc7XG5pbXBvcnQge1xuICBIdG1sQXN0LFxuICBIdG1sQXN0VmlzaXRvcixcbiAgSHRtbEVsZW1lbnRBc3QsXG4gIEh0bWxBdHRyQXN0LFxuICBIdG1sVGV4dEFzdCxcbiAgSHRtbENvbW1lbnRBc3QsXG4gIGh0bWxWaXNpdEFsbFxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvaHRtbF9hc3QnO1xuaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge1BhcnNlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2V4cHJlc3Npb25fcGFyc2VyL3BhcnNlcic7XG5pbXBvcnQge01lc3NhZ2UsIGlkfSBmcm9tICcuL21lc3NhZ2UnO1xuaW1wb3J0IHtleHBhbmROb2Rlc30gZnJvbSAnLi9leHBhbmRlcic7XG5pbXBvcnQge1xuICBJMThuRXJyb3IsXG4gIFBhcnQsXG4gIEkxOE5fQVRUUl9QUkVGSVgsXG4gIHBhcnRpdGlvbixcbiAgbWVhbmluZyxcbiAgZGVzY3JpcHRpb24sXG4gIHN0cmluZ2lmeU5vZGVzLFxuICBtZXNzYWdlRnJvbUF0dHJpYnV0ZVxufSBmcm9tICcuL3NoYXJlZCc7XG5cbi8qKlxuICogQWxsIG1lc3NhZ2VzIGV4dHJhY3RlZCBmcm9tIGEgdGVtcGxhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBFeHRyYWN0aW9uUmVzdWx0IHtcbiAgY29uc3RydWN0b3IocHVibGljIG1lc3NhZ2VzOiBNZXNzYWdlW10sIHB1YmxpYyBlcnJvcnM6IFBhcnNlRXJyb3JbXSkge31cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGR1cGxpY2F0ZSBtZXNzYWdlcy5cbiAqXG4gKiBFLmcuXG4gKlxuICogYGBgXG4gKiAgdmFyIG0gPSBbbmV3IE1lc3NhZ2UoXCJtZXNzYWdlXCIsIFwibWVhbmluZ1wiLCBcImRlc2MxXCIpLCBuZXcgTWVzc2FnZShcIm1lc3NhZ2VcIiwgXCJtZWFuaW5nXCIsXG4gKiBcImRlc2MyXCIpXTtcbiAqICBleHBlY3QocmVtb3ZlRHVwbGljYXRlcyhtKSkudG9FcXVhbChbbmV3IE1lc3NhZ2UoXCJtZXNzYWdlXCIsIFwibWVhbmluZ1wiLCBcImRlc2MxXCIpXSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUR1cGxpY2F0ZXMobWVzc2FnZXM6IE1lc3NhZ2VbXSk6IE1lc3NhZ2VbXSB7XG4gIGxldCB1bmlxOiB7W2tleTogc3RyaW5nXTogTWVzc2FnZX0gPSB7fTtcbiAgbWVzc2FnZXMuZm9yRWFjaChtID0+IHtcbiAgICBpZiAoIVN0cmluZ01hcFdyYXBwZXIuY29udGFpbnModW5pcSwgaWQobSkpKSB7XG4gICAgICB1bmlxW2lkKG0pXSA9IG07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIFN0cmluZ01hcFdyYXBwZXIudmFsdWVzKHVuaXEpO1xufVxuXG4vKipcbiAqIEV4dHJhY3RzIGFsbCBtZXNzYWdlcyBmcm9tIGEgdGVtcGxhdGUuXG4gKlxuICogQWxnb3JpdGhtOlxuICpcbiAqIFRvIHVuZGVyc3RhbmQgdGhlIGFsZ29yaXRobSwgeW91IG5lZWQgdG8ga25vdyBob3cgcGFydGl0aW9uaW5nIHdvcmtzLlxuICogUGFydGl0aW9uaW5nIGlzIHJlcXVpcmVkIGFzIHdlIGNhbiB1c2UgdHdvIGkxOG4gY29tbWVudHMgdG8gZ3JvdXAgbm9kZSBzaWJsaW5ncyB0b2dldGhlci5cbiAqIFRoYXQgaXMgd2h5IHdlIGNhbm5vdCBqdXN0IHVzZSBub2Rlcy5cbiAqXG4gKiBQYXJ0aXRpb25pbmcgdHJhbnNmb3JtcyBhbiBhcnJheSBvZiBIdG1sQXN0IGludG8gYW4gYXJyYXkgb2YgUGFydC5cbiAqIEEgcGFydCBjYW4gb3B0aW9uYWxseSBjb250YWluIGEgcm9vdCBlbGVtZW50IG9yIGEgcm9vdCB0ZXh0IG5vZGUuIEFuZCBpdCBjYW4gYWxzbyBjb250YWluXG4gKiBjaGlsZHJlbi5cbiAqIEEgcGFydCBjYW4gY29udGFpbiBpMThuIHByb3BlcnR5LCBpbiB3aGljaCBjYXNlIGl0IG5lZWRzIHRvIGJlIGV4dHJhY3RlZC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIFRoZSBmb2xsb3dpbmcgYXJyYXkgb2Ygbm9kZXMgd2lsbCBiZSBzcGxpdCBpbnRvIGZvdXIgcGFydHM6XG4gKlxuICogYGBgXG4gKiA8YT5BPC9hPlxuICogPGIgaTE4bj5CPC9iPlxuICogPCEtLSBpMThuIC0tPlxuICogPGM+QzwvYz5cbiAqIERcbiAqIDwhLS0gL2kxOG4gLS0+XG4gKiBFXG4gKiBgYGBcbiAqXG4gKiBQYXJ0IDEgY29udGFpbmluZyB0aGUgYSB0YWcuIEl0IHNob3VsZCBub3QgYmUgdHJhbnNsYXRlZC5cbiAqIFBhcnQgMiBjb250YWluaW5nIHRoZSBiIHRhZy4gSXQgc2hvdWxkIGJlIHRyYW5zbGF0ZWQuXG4gKiBQYXJ0IDMgY29udGFpbmluZyB0aGUgYyB0YWcgYW5kIHRoZSBEIHRleHQgbm9kZS4gSXQgc2hvdWxkIGJlIHRyYW5zbGF0ZWQuXG4gKiBQYXJ0IDQgY29udGFpbmluZyB0aGUgRSB0ZXh0IG5vZGUuIEl0IHNob3VsZCBub3QgYmUgdHJhbnNsYXRlZC4uXG4gKlxuICogSXQgaXMgYWxzbyBpbXBvcnRhbnQgdG8gdW5kZXJzdGFuZCBob3cgd2Ugc3RyaW5naWZ5IG5vZGVzIHRvIGNyZWF0ZSBhIG1lc3NhZ2UuXG4gKlxuICogV2Ugd2FsayB0aGUgdHJlZSBhbmQgcmVwbGFjZSBldmVyeSBlbGVtZW50IG5vZGUgd2l0aCBhIHBsYWNlaG9sZGVyLiBXZSBhbHNvIHJlcGxhY2VcbiAqIGFsbCBleHByZXNzaW9ucyBpbiBpbnRlcnBvbGF0aW9uIHdpdGggcGxhY2Vob2xkZXJzLiBXZSBhbHNvIGluc2VydCBhIHBsYWNlaG9sZGVyIGVsZW1lbnRcbiAqIHRvIHdyYXAgYSB0ZXh0IG5vZGUgY29udGFpbmluZyBpbnRlcnBvbGF0aW9uLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogVGhlIGZvbGxvd2luZyB0cmVlOlxuICpcbiAqIGBgYFxuICogPGE+QXt7SX19PC9hPjxiPkI8L2I+XG4gKiBgYGBcbiAqXG4gKiB3aWxsIGJlIHN0cmluZ2lmaWVkIGludG86XG4gKiBgYGBcbiAqIDxwaCBuYW1lPVwiZTBcIj48cGggbmFtZT1cInQxXCI+QTxwaCBuYW1lPVwiMFwiLz48L3BoPjwvcGg+PHBoIG5hbWU9XCJlMlwiPkI8L3BoPlxuICogYGBgXG4gKlxuICogVGhpcyBpcyB3aGF0IHRoZSBhbGdvcml0aG0gZG9lczpcbiAqXG4gKiAxLiBVc2UgdGhlIHByb3ZpZGVkIGh0bWwgcGFyc2VyIHRvIGdldCB0aGUgaHRtbCBBU1Qgb2YgdGhlIHRlbXBsYXRlLlxuICogMi4gUGFydGl0aW9uIHRoZSByb290IG5vZGVzLCBhbmQgcHJvY2VzcyBlYWNoIHBhcnQgc2VwYXJhdGVseS5cbiAqIDMuIElmIGEgcGFydCBkb2VzIG5vdCBoYXZlIHRoZSBpMThuIGF0dHJpYnV0ZSwgcmVjdXJzZSB0byBwcm9jZXNzIGNoaWxkcmVuIGFuZCBhdHRyaWJ1dGVzLlxuICogNC4gSWYgYSBwYXJ0IGhhcyB0aGUgaTE4biBhdHRyaWJ1dGUsIHN0cmluZ2lmeSB0aGUgbm9kZXMgdG8gY3JlYXRlIGEgTWVzc2FnZS5cbiAqL1xuZXhwb3J0IGNsYXNzIE1lc3NhZ2VFeHRyYWN0b3Ige1xuICBtZXNzYWdlczogTWVzc2FnZVtdO1xuICBlcnJvcnM6IFBhcnNlRXJyb3JbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odG1sUGFyc2VyOiBIdG1sUGFyc2VyLCBwcml2YXRlIF9wYXJzZXI6IFBhcnNlcikge31cblxuICBleHRyYWN0KHRlbXBsYXRlOiBzdHJpbmcsIHNvdXJjZVVybDogc3RyaW5nKTogRXh0cmFjdGlvblJlc3VsdCB7XG4gICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xuICAgIHRoaXMuZXJyb3JzID0gW107XG5cbiAgICBsZXQgcmVzID0gdGhpcy5faHRtbFBhcnNlci5wYXJzZSh0ZW1wbGF0ZSwgc291cmNlVXJsLCB0cnVlKTtcbiAgICBpZiAocmVzLmVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gbmV3IEV4dHJhY3Rpb25SZXN1bHQoW10sIHJlcy5lcnJvcnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZWN1cnNlKGV4cGFuZE5vZGVzKHJlcy5yb290Tm9kZXMpLm5vZGVzKTtcbiAgICAgIHJldHVybiBuZXcgRXh0cmFjdGlvblJlc3VsdCh0aGlzLm1lc3NhZ2VzLCB0aGlzLmVycm9ycyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZXh0cmFjdE1lc3NhZ2VzRnJvbVBhcnQocDogUGFydCk6IHZvaWQge1xuICAgIGlmIChwLmhhc0kxOG4pIHtcbiAgICAgIHRoaXMubWVzc2FnZXMucHVzaChwLmNyZWF0ZU1lc3NhZ2UodGhpcy5fcGFyc2VyKSk7XG4gICAgICB0aGlzLl9yZWN1cnNlVG9FeHRyYWN0TWVzc2FnZXNGcm9tQXR0cmlidXRlcyhwLmNoaWxkcmVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVjdXJzZShwLmNoaWxkcmVuKTtcbiAgICB9XG5cbiAgICBpZiAoaXNQcmVzZW50KHAucm9vdEVsZW1lbnQpKSB7XG4gICAgICB0aGlzLl9leHRyYWN0TWVzc2FnZXNGcm9tQXR0cmlidXRlcyhwLnJvb3RFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWN1cnNlKG5vZGVzOiBIdG1sQXN0W10pOiB2b2lkIHtcbiAgICBpZiAoaXNQcmVzZW50KG5vZGVzKSkge1xuICAgICAgbGV0IHBzID0gcGFydGl0aW9uKG5vZGVzLCB0aGlzLmVycm9ycyk7XG4gICAgICBwcy5mb3JFYWNoKHAgPT4gdGhpcy5fZXh0cmFjdE1lc3NhZ2VzRnJvbVBhcnQocCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlY3Vyc2VUb0V4dHJhY3RNZXNzYWdlc0Zyb21BdHRyaWJ1dGVzKG5vZGVzOiBIdG1sQXN0W10pOiB2b2lkIHtcbiAgICBub2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgaWYgKG4gaW5zdGFuY2VvZiBIdG1sRWxlbWVudEFzdCkge1xuICAgICAgICB0aGlzLl9leHRyYWN0TWVzc2FnZXNGcm9tQXR0cmlidXRlcyhuKTtcbiAgICAgICAgdGhpcy5fcmVjdXJzZVRvRXh0cmFjdE1lc3NhZ2VzRnJvbUF0dHJpYnV0ZXMobi5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9leHRyYWN0TWVzc2FnZXNGcm9tQXR0cmlidXRlcyhwOiBIdG1sRWxlbWVudEFzdCk6IHZvaWQge1xuICAgIHAuYXR0cnMuZm9yRWFjaChhdHRyID0+IHtcbiAgICAgIGlmIChhdHRyLm5hbWUuc3RhcnRzV2l0aChJMThOX0FUVFJfUFJFRklYKSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMubWVzc2FnZXMucHVzaChtZXNzYWdlRnJvbUF0dHJpYnV0ZSh0aGlzLl9wYXJzZXIsIHAsIGF0dHIpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgSTE4bkVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9ycy5wdXNoKGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
