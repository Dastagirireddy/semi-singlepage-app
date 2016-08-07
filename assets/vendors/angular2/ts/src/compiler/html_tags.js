System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var NAMED_ENTITIES, HtmlTagContentType, HtmlTagDefinition, TAG_DEFINITIONS, DEFAULT_TAG_DEFINITION, NS_PREFIX_RE;
    function getHtmlTagDefinition(tagName) {
        var result = TAG_DEFINITIONS[tagName.toLowerCase()];
        return lang_1.isPresent(result) ? result : DEFAULT_TAG_DEFINITION;
    }
    exports_1("getHtmlTagDefinition", getHtmlTagDefinition);
    function splitNsName(elementName) {
        if (elementName[0] != '@') {
            return [null, elementName];
        }
        var match = lang_1.RegExpWrapper.firstMatch(NS_PREFIX_RE, elementName);
        return [match[1], match[2]];
    }
    exports_1("splitNsName", splitNsName);
    function getNsPrefix(elementName) {
        return splitNsName(elementName)[0];
    }
    exports_1("getNsPrefix", getNsPrefix);
    function mergeNsAndName(prefix, localName) {
        return lang_1.isPresent(prefix) ? "@" + prefix + ":" + localName : localName;
    }
    exports_1("mergeNsAndName", mergeNsAndName);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            // see http://www.w3.org/TR/html51/syntax.html#named-character-references
            // see https://html.spec.whatwg.org/multipage/entities.json
            // This list is not exhaustive to keep the compiler footprint low.
            // The `&#123;` / `&#x1ab;` syntax should be used when the named character reference does not exist.
            exports_1("NAMED_ENTITIES", NAMED_ENTITIES = lang_1.CONST_EXPR({
                'Aacute': '\u00C1',
                'aacute': '\u00E1',
                'Acirc': '\u00C2',
                'acirc': '\u00E2',
                'acute': '\u00B4',
                'AElig': '\u00C6',
                'aelig': '\u00E6',
                'Agrave': '\u00C0',
                'agrave': '\u00E0',
                'alefsym': '\u2135',
                'Alpha': '\u0391',
                'alpha': '\u03B1',
                'amp': '&',
                'and': '\u2227',
                'ang': '\u2220',
                'apos': '\u0027',
                'Aring': '\u00C5',
                'aring': '\u00E5',
                'asymp': '\u2248',
                'Atilde': '\u00C3',
                'atilde': '\u00E3',
                'Auml': '\u00C4',
                'auml': '\u00E4',
                'bdquo': '\u201E',
                'Beta': '\u0392',
                'beta': '\u03B2',
                'brvbar': '\u00A6',
                'bull': '\u2022',
                'cap': '\u2229',
                'Ccedil': '\u00C7',
                'ccedil': '\u00E7',
                'cedil': '\u00B8',
                'cent': '\u00A2',
                'Chi': '\u03A7',
                'chi': '\u03C7',
                'circ': '\u02C6',
                'clubs': '\u2663',
                'cong': '\u2245',
                'copy': '\u00A9',
                'crarr': '\u21B5',
                'cup': '\u222A',
                'curren': '\u00A4',
                'dagger': '\u2020',
                'Dagger': '\u2021',
                'darr': '\u2193',
                'dArr': '\u21D3',
                'deg': '\u00B0',
                'Delta': '\u0394',
                'delta': '\u03B4',
                'diams': '\u2666',
                'divide': '\u00F7',
                'Eacute': '\u00C9',
                'eacute': '\u00E9',
                'Ecirc': '\u00CA',
                'ecirc': '\u00EA',
                'Egrave': '\u00C8',
                'egrave': '\u00E8',
                'empty': '\u2205',
                'emsp': '\u2003',
                'ensp': '\u2002',
                'Epsilon': '\u0395',
                'epsilon': '\u03B5',
                'equiv': '\u2261',
                'Eta': '\u0397',
                'eta': '\u03B7',
                'ETH': '\u00D0',
                'eth': '\u00F0',
                'Euml': '\u00CB',
                'euml': '\u00EB',
                'euro': '\u20AC',
                'exist': '\u2203',
                'fnof': '\u0192',
                'forall': '\u2200',
                'frac12': '\u00BD',
                'frac14': '\u00BC',
                'frac34': '\u00BE',
                'frasl': '\u2044',
                'Gamma': '\u0393',
                'gamma': '\u03B3',
                'ge': '\u2265',
                'gt': '>',
                'harr': '\u2194',
                'hArr': '\u21D4',
                'hearts': '\u2665',
                'hellip': '\u2026',
                'Iacute': '\u00CD',
                'iacute': '\u00ED',
                'Icirc': '\u00CE',
                'icirc': '\u00EE',
                'iexcl': '\u00A1',
                'Igrave': '\u00CC',
                'igrave': '\u00EC',
                'image': '\u2111',
                'infin': '\u221E',
                'int': '\u222B',
                'Iota': '\u0399',
                'iota': '\u03B9',
                'iquest': '\u00BF',
                'isin': '\u2208',
                'Iuml': '\u00CF',
                'iuml': '\u00EF',
                'Kappa': '\u039A',
                'kappa': '\u03BA',
                'Lambda': '\u039B',
                'lambda': '\u03BB',
                'lang': '\u27E8',
                'laquo': '\u00AB',
                'larr': '\u2190',
                'lArr': '\u21D0',
                'lceil': '\u2308',
                'ldquo': '\u201C',
                'le': '\u2264',
                'lfloor': '\u230A',
                'lowast': '\u2217',
                'loz': '\u25CA',
                'lrm': '\u200E',
                'lsaquo': '\u2039',
                'lsquo': '\u2018',
                'lt': '<',
                'macr': '\u00AF',
                'mdash': '\u2014',
                'micro': '\u00B5',
                'middot': '\u00B7',
                'minus': '\u2212',
                'Mu': '\u039C',
                'mu': '\u03BC',
                'nabla': '\u2207',
                'nbsp': '\u00A0',
                'ndash': '\u2013',
                'ne': '\u2260',
                'ni': '\u220B',
                'not': '\u00AC',
                'notin': '\u2209',
                'nsub': '\u2284',
                'Ntilde': '\u00D1',
                'ntilde': '\u00F1',
                'Nu': '\u039D',
                'nu': '\u03BD',
                'Oacute': '\u00D3',
                'oacute': '\u00F3',
                'Ocirc': '\u00D4',
                'ocirc': '\u00F4',
                'OElig': '\u0152',
                'oelig': '\u0153',
                'Ograve': '\u00D2',
                'ograve': '\u00F2',
                'oline': '\u203E',
                'Omega': '\u03A9',
                'omega': '\u03C9',
                'Omicron': '\u039F',
                'omicron': '\u03BF',
                'oplus': '\u2295',
                'or': '\u2228',
                'ordf': '\u00AA',
                'ordm': '\u00BA',
                'Oslash': '\u00D8',
                'oslash': '\u00F8',
                'Otilde': '\u00D5',
                'otilde': '\u00F5',
                'otimes': '\u2297',
                'Ouml': '\u00D6',
                'ouml': '\u00F6',
                'para': '\u00B6',
                'permil': '\u2030',
                'perp': '\u22A5',
                'Phi': '\u03A6',
                'phi': '\u03C6',
                'Pi': '\u03A0',
                'pi': '\u03C0',
                'piv': '\u03D6',
                'plusmn': '\u00B1',
                'pound': '\u00A3',
                'prime': '\u2032',
                'Prime': '\u2033',
                'prod': '\u220F',
                'prop': '\u221D',
                'Psi': '\u03A8',
                'psi': '\u03C8',
                'quot': '\u0022',
                'radic': '\u221A',
                'rang': '\u27E9',
                'raquo': '\u00BB',
                'rarr': '\u2192',
                'rArr': '\u21D2',
                'rceil': '\u2309',
                'rdquo': '\u201D',
                'real': '\u211C',
                'reg': '\u00AE',
                'rfloor': '\u230B',
                'Rho': '\u03A1',
                'rho': '\u03C1',
                'rlm': '\u200F',
                'rsaquo': '\u203A',
                'rsquo': '\u2019',
                'sbquo': '\u201A',
                'Scaron': '\u0160',
                'scaron': '\u0161',
                'sdot': '\u22C5',
                'sect': '\u00A7',
                'shy': '\u00AD',
                'Sigma': '\u03A3',
                'sigma': '\u03C3',
                'sigmaf': '\u03C2',
                'sim': '\u223C',
                'spades': '\u2660',
                'sub': '\u2282',
                'sube': '\u2286',
                'sum': '\u2211',
                'sup': '\u2283',
                'sup1': '\u00B9',
                'sup2': '\u00B2',
                'sup3': '\u00B3',
                'supe': '\u2287',
                'szlig': '\u00DF',
                'Tau': '\u03A4',
                'tau': '\u03C4',
                'there4': '\u2234',
                'Theta': '\u0398',
                'theta': '\u03B8',
                'thetasym': '\u03D1',
                'thinsp': '\u2009',
                'THORN': '\u00DE',
                'thorn': '\u00FE',
                'tilde': '\u02DC',
                'times': '\u00D7',
                'trade': '\u2122',
                'Uacute': '\u00DA',
                'uacute': '\u00FA',
                'uarr': '\u2191',
                'uArr': '\u21D1',
                'Ucirc': '\u00DB',
                'ucirc': '\u00FB',
                'Ugrave': '\u00D9',
                'ugrave': '\u00F9',
                'uml': '\u00A8',
                'upsih': '\u03D2',
                'Upsilon': '\u03A5',
                'upsilon': '\u03C5',
                'Uuml': '\u00DC',
                'uuml': '\u00FC',
                'weierp': '\u2118',
                'Xi': '\u039E',
                'xi': '\u03BE',
                'Yacute': '\u00DD',
                'yacute': '\u00FD',
                'yen': '\u00A5',
                'yuml': '\u00FF',
                'Yuml': '\u0178',
                'Zeta': '\u0396',
                'zeta': '\u03B6',
                'zwj': '\u200D',
                'zwnj': '\u200C',
            }));
            (function (HtmlTagContentType) {
                HtmlTagContentType[HtmlTagContentType["RAW_TEXT"] = 0] = "RAW_TEXT";
                HtmlTagContentType[HtmlTagContentType["ESCAPABLE_RAW_TEXT"] = 1] = "ESCAPABLE_RAW_TEXT";
                HtmlTagContentType[HtmlTagContentType["PARSABLE_DATA"] = 2] = "PARSABLE_DATA";
            })(HtmlTagContentType || (HtmlTagContentType = {}));
            exports_1("HtmlTagContentType", HtmlTagContentType);
            HtmlTagDefinition = (function () {
                function HtmlTagDefinition(_a) {
                    var _this = this;
                    var _b = _a === void 0 ? {} : _a, closedByChildren = _b.closedByChildren, requiredParents = _b.requiredParents, implicitNamespacePrefix = _b.implicitNamespacePrefix, contentType = _b.contentType, closedByParent = _b.closedByParent, isVoid = _b.isVoid, ignoreFirstLf = _b.ignoreFirstLf;
                    this.closedByChildren = {};
                    this.closedByParent = false;
                    if (lang_1.isPresent(closedByChildren) && closedByChildren.length > 0) {
                        closedByChildren.forEach(function (tagName) { return _this.closedByChildren[tagName] = true; });
                    }
                    this.isVoid = lang_1.normalizeBool(isVoid);
                    this.closedByParent = lang_1.normalizeBool(closedByParent) || this.isVoid;
                    if (lang_1.isPresent(requiredParents) && requiredParents.length > 0) {
                        this.requiredParents = {};
                        this.parentToAdd = requiredParents[0];
                        requiredParents.forEach(function (tagName) { return _this.requiredParents[tagName] = true; });
                    }
                    this.implicitNamespacePrefix = implicitNamespacePrefix;
                    this.contentType = lang_1.isPresent(contentType) ? contentType : HtmlTagContentType.PARSABLE_DATA;
                    this.ignoreFirstLf = lang_1.normalizeBool(ignoreFirstLf);
                }
                HtmlTagDefinition.prototype.requireExtraParent = function (currentParent) {
                    if (lang_1.isBlank(this.requiredParents)) {
                        return false;
                    }
                    if (lang_1.isBlank(currentParent)) {
                        return true;
                    }
                    var lcParent = currentParent.toLowerCase();
                    return this.requiredParents[lcParent] != true && lcParent != 'template';
                };
                HtmlTagDefinition.prototype.isClosedByChild = function (name) {
                    return this.isVoid || lang_1.normalizeBool(this.closedByChildren[name.toLowerCase()]);
                };
                return HtmlTagDefinition;
            }());
            exports_1("HtmlTagDefinition", HtmlTagDefinition);
            // see http://www.w3.org/TR/html51/syntax.html#optional-tags
            // This implementation does not fully conform to the HTML5 spec.
            TAG_DEFINITIONS = {
                'base': new HtmlTagDefinition({ isVoid: true }),
                'meta': new HtmlTagDefinition({ isVoid: true }),
                'area': new HtmlTagDefinition({ isVoid: true }),
                'embed': new HtmlTagDefinition({ isVoid: true }),
                'link': new HtmlTagDefinition({ isVoid: true }),
                'img': new HtmlTagDefinition({ isVoid: true }),
                'input': new HtmlTagDefinition({ isVoid: true }),
                'param': new HtmlTagDefinition({ isVoid: true }),
                'hr': new HtmlTagDefinition({ isVoid: true }),
                'br': new HtmlTagDefinition({ isVoid: true }),
                'source': new HtmlTagDefinition({ isVoid: true }),
                'track': new HtmlTagDefinition({ isVoid: true }),
                'wbr': new HtmlTagDefinition({ isVoid: true }),
                'p': new HtmlTagDefinition({
                    closedByChildren: [
                        'address',
                        'article',
                        'aside',
                        'blockquote',
                        'div',
                        'dl',
                        'fieldset',
                        'footer',
                        'form',
                        'h1',
                        'h2',
                        'h3',
                        'h4',
                        'h5',
                        'h6',
                        'header',
                        'hgroup',
                        'hr',
                        'main',
                        'nav',
                        'ol',
                        'p',
                        'pre',
                        'section',
                        'table',
                        'ul'
                    ],
                    closedByParent: true
                }),
                'thead': new HtmlTagDefinition({ closedByChildren: ['tbody', 'tfoot'] }),
                'tbody': new HtmlTagDefinition({ closedByChildren: ['tbody', 'tfoot'], closedByParent: true }),
                'tfoot': new HtmlTagDefinition({ closedByChildren: ['tbody'], closedByParent: true }),
                'tr': new HtmlTagDefinition({
                    closedByChildren: ['tr'],
                    requiredParents: ['tbody', 'tfoot', 'thead'],
                    closedByParent: true
                }),
                'td': new HtmlTagDefinition({ closedByChildren: ['td', 'th'], closedByParent: true }),
                'th': new HtmlTagDefinition({ closedByChildren: ['td', 'th'], closedByParent: true }),
                'col': new HtmlTagDefinition({ requiredParents: ['colgroup'], isVoid: true }),
                'svg': new HtmlTagDefinition({ implicitNamespacePrefix: 'svg' }),
                'math': new HtmlTagDefinition({ implicitNamespacePrefix: 'math' }),
                'li': new HtmlTagDefinition({ closedByChildren: ['li'], closedByParent: true }),
                'dt': new HtmlTagDefinition({ closedByChildren: ['dt', 'dd'] }),
                'dd': new HtmlTagDefinition({ closedByChildren: ['dt', 'dd'], closedByParent: true }),
                'rb': new HtmlTagDefinition({ closedByChildren: ['rb', 'rt', 'rtc', 'rp'], closedByParent: true }),
                'rt': new HtmlTagDefinition({ closedByChildren: ['rb', 'rt', 'rtc', 'rp'], closedByParent: true }),
                'rtc': new HtmlTagDefinition({ closedByChildren: ['rb', 'rtc', 'rp'], closedByParent: true }),
                'rp': new HtmlTagDefinition({ closedByChildren: ['rb', 'rt', 'rtc', 'rp'], closedByParent: true }),
                'optgroup': new HtmlTagDefinition({ closedByChildren: ['optgroup'], closedByParent: true }),
                'option': new HtmlTagDefinition({ closedByChildren: ['option', 'optgroup'], closedByParent: true }),
                'pre': new HtmlTagDefinition({ ignoreFirstLf: true }),
                'listing': new HtmlTagDefinition({ ignoreFirstLf: true }),
                'style': new HtmlTagDefinition({ contentType: HtmlTagContentType.RAW_TEXT }),
                'script': new HtmlTagDefinition({ contentType: HtmlTagContentType.RAW_TEXT }),
                'title': new HtmlTagDefinition({ contentType: HtmlTagContentType.ESCAPABLE_RAW_TEXT }),
                'textarea': new HtmlTagDefinition({ contentType: HtmlTagContentType.ESCAPABLE_RAW_TEXT, ignoreFirstLf: true }),
            };
            DEFAULT_TAG_DEFINITION = new HtmlTagDefinition();
            NS_PREFIX_RE = /^@([^:]+):(.+)/g;
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9odG1sX3RhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztRQVlhLGNBQWMseUNBNFR2QixlQUFlLEVBNEVmLHNCQUFzQixFQU90QixZQUFZO0lBTGhCLDhCQUFxQyxPQUFlO1FBQ2xELElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLEdBQUcsc0JBQXNCLENBQUM7SUFDN0QsQ0FBQztJQUhELHVEQUdDLENBQUE7SUFJRCxxQkFBNEIsV0FBbUI7UUFDN0MsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFDRCxJQUFJLEtBQUssR0FBRyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDaEUsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFORCxxQ0FNQyxDQUFBO0lBRUQscUJBQTRCLFdBQW1CO1FBQzdDLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUZELHFDQUVDLENBQUE7SUFFRCx3QkFBK0IsTUFBYyxFQUFFLFNBQWlCO1FBQzlELE1BQU0sQ0FBQyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQUksTUFBTSxTQUFJLFNBQVcsR0FBRyxTQUFTLENBQUM7SUFDbkUsQ0FBQztJQUZELDJDQUVDLENBQUE7Ozs7Ozs7WUFuYUQseUVBQXlFO1lBQ3pFLDJEQUEyRDtZ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O2dCQUNqQixPQUFPLEVBQUUsUUFBUTtnQkFDakIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUTtnQkFDakIsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsUUFBUTtnQkFDZixPQUFPLEVBQUUsUUFBUTtnQkFDakIsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixPQUFPLEVBQUUsUUFBUTtnQkFDakIsT0FBTyxFQUFFLFFBQVE7Z0JBQ2pCLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixPQUFPLEVBQUUsUUFBUTtnQkFDakIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixPQUFPLEVBQUUsUUFBUTtnQkFDakIsT0FBTyxFQUFFLFFBQVE7Z0JBQ2pCLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLE9BQU8sRUFBRSxRQUFRO2dCQUNqQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsUUFBUTtnQkFDaEIsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLE1BQU0sRUFBRSxRQUFRO2dCQUNo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QkFBa0IsQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFDLENBQUM7YUFDL0UsQ0FBQztZQUVFLHNCQUFzQixHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztZQU9qRCxZQUFZLEdBQUcsaUJBQWlCLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2h0bWxfdGFncy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGlzUHJlc2VudCxcbiAgaXNCbGFuayxcbiAgbm9ybWFsaXplQm9vbCxcbiAgUmVnRXhwV3JhcHBlcixcbiAgQ09OU1RfRVhQUlxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG4vLyBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUxL3N5bnRheC5odG1sI25hbWVkLWNoYXJhY3Rlci1yZWZlcmVuY2VzXG4vLyBzZWUgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZW50aXRpZXMuanNvblxuLy8gVGhpcyBsaXN0IGlzIG5vdCBleGhhdXN0aXZlIHRvIGtlZXAgdGhlIGNvbXBpbGVyIGZvb3RwcmludCBsb3cuXG4vLyBUaGUgYCYjMTIzO2AgLyBgJiN4MWFiO2Agc3ludGF4IHNob3VsZCBiZSB1c2VkIHdoZW4gdGhlIG5hbWVkIGNoYXJhY3RlciByZWZlcmVuY2UgZG9lcyBub3QgZXhpc3QuXG5leHBvcnQgY29uc3QgTkFNRURfRU5USVRJRVMgPSBDT05TVF9FWFBSKHtcbiAgJ0FhY3V0ZSc6ICdcXHUwMEMxJyxcbiAgJ2FhY3V0ZSc6ICdcXHUwMEUxJyxcbiAgJ0FjaXJjJzogJ1xcdTAwQzInLFxuICAnYWNpcmMnOiAnXFx1MDBFMicsXG4gICdhY3V0ZSc6ICdcXHUwMEI0JyxcbiAgJ0FFbGlnJzogJ1xcdTAwQzYnLFxuICAnYWVsaWcnOiAnXFx1MDBFNicsXG4gICdBZ3JhdmUnOiAnXFx1MDBDMCcsXG4gICdhZ3JhdmUnOiAnXFx1MDBFMCcsXG4gICdhbGVmc3ltJzogJ1xcdTIxMzUnLFxuICAnQWxwaGEnOiAnXFx1MDM5MScsXG4gICdhbHBoYSc6ICdcXHUwM0IxJyxcbiAgJ2FtcCc6ICcmJyxcbiAgJ2FuZCc6ICdcXHUyMjI3JyxcbiAgJ2FuZyc6ICdcXHUyMjIwJyxcbiAgJ2Fwb3MnOiAnXFx1MDAyNycsXG4gICdBcmluZyc6ICdcXHUwMEM1JyxcbiAgJ2FyaW5nJzogJ1xcdTAwRTUnLFxuICAnYXN5bXAnOiAnXFx1MjI0OCcsXG4gICdBdGlsZGUnOiAnXFx1MDBDMycsXG4gICdhdGlsZGUnOiAnXFx1MDBFMycsXG4gICdBdW1sJzogJ1xcdTAwQzQnLFxuICAnYXVtbCc6ICdcXHUwMEU0JyxcbiAgJ2JkcXVvJzogJ1xcdTIwMUUnLFxuICAnQmV0YSc6ICdcXHUwMzkyJyxcbiAgJ2JldGEnOiAnXFx1MDNCMicsXG4gICdicnZiYXInOiAnXFx1MDBBNicsXG4gICdidWxsJzogJ1xcdTIwMjInLFxuICAnY2FwJzogJ1xcdTIyMjknLFxuICAnQ2NlZGlsJzogJ1xcdTAwQzcnLFxuICAnY2NlZGlsJzogJ1xcdTAwRTcnLFxuICAnY2VkaWwnOiAnXFx1MDBCOCcsXG4gICdjZW50JzogJ1xcdTAwQTInLFxuICAnQ2hpJzogJ1xcdTAzQTcnLFxuICAnY2hpJzogJ1xcdTAzQzcnLFxuICAnY2lyYyc6ICdcXHUwMkM2JyxcbiAgJ2NsdWJzJzogJ1xcdTI2NjMnLFxuICAnY29uZyc6ICdcXHUyMjQ1JyxcbiAgJ2NvcHknOiAnXFx1MDBBOScsXG4gICdjcmFycic6ICdcXHUyMUI1JyxcbiAgJ2N1cCc6ICdcXHUyMjJBJyxcbiAgJ2N1cnJlbic6ICdcXHUwMEE0JyxcbiAgJ2RhZ2dlcic6ICdcXHUyMDIwJyxcbiAgJ0RhZ2dlcic6ICdcXHUyMDIxJyxcbiAgJ2RhcnInOiAnXFx1MjE5MycsXG4gICdkQXJyJzogJ1xcdTIxRDMnLFxuICAnZGVnJzogJ1xcdTAwQjAnLFxuICAnRGVsdGEnOiAnXFx1MDM5NCcsXG4gICdkZWx0YSc6ICdcXHUwM0I0JyxcbiAgJ2RpYW1zJzogJ1xcdTI2NjYnLFxuICAnZGl2aWRlJzogJ1xcdTAwRjcnLFxuICAnRWFjdXRlJzogJ1xcdTAwQzknLFxuICAnZWFjdXRlJzogJ1xcdTAwRTknLFxuICAnRWNpcmMnOiAnXFx1MDBDQScsXG4gICdlY2lyYyc6ICdcXHUwMEVBJyxcbiAgJ0VncmF2ZSc6ICdcXHUwMEM4JyxcbiAgJ2VncmF2ZSc6ICdcXHUwMEU4JyxcbiAgJ2VtcHR5JzogJ1xcdTIyMDUnLFxuICAnZW1zcCc6ICdcXHUyMDAzJyxcbiAgJ2Vuc3AnOiAnXFx1MjAwMicsXG4gICdFcHNpbG9uJzogJ1xcdTAzOTUnLFxuICAnZXBzaWxvbic6ICdcXHUwM0I1JyxcbiAgJ2VxdWl2JzogJ1xcdTIyNjEnLFxuICAnRXRhJzogJ1xcdTAzOTcnLFxuICAnZXRhJzogJ1xcdTAzQjcnLFxuICAnRVRIJzogJ1xcdTAwRDAnLFxuICAnZXRoJzogJ1xcdTAwRjAnLFxuICAnRXVtbCc6ICdcXHUwMENCJyxcbiAgJ2V1bWwnOiAnXFx1MDBFQicsXG4gICdldXJvJzogJ1xcdTIwQUMnLFxuICAnZXhpc3QnOiAnXFx1MjIwMycsXG4gICdmbm9mJzogJ1xcdTAxOTInLFxuICAnZm9yYWxsJzogJ1xcdTIyMDAnLFxuICAnZnJhYzEyJzogJ1xcdTAwQkQnLFxuICAnZnJhYzE0JzogJ1xcdTAwQkMnLFxuICAnZnJhYzM0JzogJ1xcdTAwQkUnLFxuICAnZnJhc2wnOiAnXFx1MjA0NCcsXG4gICdHYW1tYSc6ICdcXHUwMzkzJyxcbiAgJ2dhbW1hJzogJ1xcdTAzQjMnLFxuICAnZ2UnOiAnXFx1MjI2NScsXG4gICdndCc6ICc+JyxcbiAgJ2hhcnInOiAnXFx1MjE5NCcsXG4gICdoQXJyJzogJ1xcdTIxRDQnLFxuICAnaGVhcnRzJzogJ1xcdTI2NjUnLFxuICAnaGVsbGlwJzogJ1xcdTIwMjYnLFxuICAnSWFjdXRlJzogJ1xcdTAwQ0QnLFxuICAnaWFjdXRlJzogJ1xcdTAwRUQnLFxuICAnSWNpcmMnOiAnXFx1MDBDRScsXG4gICdpY2lyYyc6ICdcXHUwMEVFJyxcbiAgJ2lleGNsJzogJ1xcdTAwQTEnLFxuICAnSWdyYXZlJzogJ1xcdTAwQ0MnLFxuICAnaWdyYXZlJzogJ1xcdTAwRUMnLFxuICAnaW1hZ2UnOiAnXFx1MjExMScsXG4gICdpbmZpbic6ICdcXHUyMjFFJyxcbiAgJ2ludCc6ICdcXHUyMjJCJyxcbiAgJ0lvdGEnOiAnXFx1MDM5OScsXG4gICdpb3RhJzogJ1xcdTAzQjknLFxuICAnaXF1ZXN0JzogJ1xcdTAwQkYnLFxuICAnaXNpbic6ICdcXHUyMjA4JyxcbiAgJ0l1bWwnOiAnXFx1MDBDRicsXG4gICdpdW1sJzogJ1xcdTAwRUYnLFxuICAnS2FwcGEnOiAnXFx1MDM5QScsXG4gICdrYXBwYSc6ICdcXHUwM0JBJyxcbiAgJ0xhbWJkYSc6ICdcXHUwMzlCJyxcbiAgJ2xhbWJkYSc6ICdcXHUwM0JCJyxcbiAgJ2xhbmcnOiAnXFx1MjdFOCcsXG4gICdsYXF1byc6ICdcXHUwMEFCJyxcbiAgJ2xhcnInOiAnXFx1MjE5MCcsXG4gICdsQXJyJzogJ1xcdTIxRDAnLFxuICAnbGNlaWwnOiAnXFx1MjMwOCcsXG4gICdsZHF1byc6ICdcXHUyMDFDJyxcbiAgJ2xlJzogJ1xcdTIyNjQnLFxuICAnbGZsb29yJzogJ1xcdTIzMEEnLFxuICAnbG93YXN0JzogJ1xcdTIyMTcnLFxuICAnbG96JzogJ1xcdTI1Q0EnLFxuICAnbHJtJzogJ1xcdTIwMEUnLFxuICAnbHNhcXVvJzogJ1xcdTIwMzknLFxuICAnbHNxdW8nOiAnXFx1MjAxOCcsXG4gICdsdCc6ICc8JyxcbiAgJ21hY3InOiAnXFx1MDBBRicsXG4gICdtZGFzaCc6ICdcXHUyMDE0JyxcbiAgJ21pY3JvJzogJ1xcdTAwQjUnLFxuICAnbWlkZG90JzogJ1xcdTAwQjcnLFxuICAnbWludXMnOiAnXFx1MjIxMicsXG4gICdNdSc6ICdcXHUwMzlDJyxcbiAgJ211JzogJ1xcdTAzQkMnLFxuICAnbmFibGEnOiAnXFx1MjIwNycsXG4gICduYnNwJzogJ1xcdTAwQTAnLFxuICAnbmRhc2gnOiAnXFx1MjAxMycsXG4gICduZSc6ICdcXHUyMjYwJyxcbiAgJ25pJzogJ1xcdTIyMEInLFxuICAnbm90JzogJ1xcdTAwQUMnLFxuICAnbm90aW4nOiAnXFx1MjIwOScsXG4gICduc3ViJzogJ1xcdTIyODQnLFxuICAnTnRpbGRlJzogJ1xcdTAwRDEnLFxuICAnbnRpbGRlJzogJ1xcdTAwRjEnLFxuICAnTnUnOiAnXFx1MDM5RCcsXG4gICdudSc6ICdcXHUwM0JEJyxcbiAgJ09hY3V0ZSc6ICdcXHUwMEQzJyxcbiAgJ29hY3V0ZSc6ICdcXHUwMEYzJyxcbiAgJ09jaXJjJzogJ1xcdTAwRDQnLFxuICAnb2NpcmMnOiAnXFx1MDBGNCcsXG4gICdPRWxpZyc6ICdcXHUwMTUyJyxcbiAgJ29lbGlnJzogJ1xcdTAxNTMnLFxuICAnT2dyYXZlJzogJ1xcdTAwRDInLFxuICAnb2dyYXZlJzogJ1xcdTAwRjInLFxuICAnb2xpbmUnOiAnXFx1MjAzRScsXG4gICdPbWVnYSc6ICdcXHUwM0E5JyxcbiAgJ29tZWdhJzogJ1xcdTAzQzknLFxuICAnT21pY3Jvbic6ICdcXHUwMzlGJyxcbiAgJ29taWNyb24nOiAnXFx1MDNCRicsXG4gICdvcGx1cyc6ICdcXHUyMjk1JyxcbiAgJ29yJzogJ1xcdTIyMjgnLFxuICAnb3JkZic6ICdcXHUwMEFBJyxcbiAgJ29yZG0nOiAnXFx1MDBCQScsXG4gICdPc2xhc2gnOiAnXFx1MDBEOCcsXG4gICdvc2xhc2gnOiAnXFx1MDBGOCcsXG4gICdPdGlsZGUnOiAnXFx1MDBENScsXG4gICdvdGlsZGUnOiAnXFx1MDBGNScsXG4gICdvdGltZXMnOiAnXFx1MjI5NycsXG4gICdPdW1sJzogJ1xcdTAwRDYnLFxuICAnb3VtbCc6ICdcXHUwMEY2JyxcbiAgJ3BhcmEnOiAnXFx1MDBCNicsXG4gICdwZXJtaWwnOiAnXFx1MjAzMCcsXG4gICdwZXJwJzogJ1xcdTIyQTUnLFxuICAnUGhpJzogJ1xcdTAzQTYnLFxuICAncGhpJzogJ1xcdTAzQzYnLFxuICAnUGknOiAnXFx1MDNBMCcsXG4gICdwaSc6ICdcXHUwM0MwJyxcbiAgJ3Bpdic6ICdcXHUwM0Q2JyxcbiAgJ3BsdXNtbic6ICdcXHUwMEIxJyxcbiAgJ3BvdW5kJzogJ1xcdTAwQTMnLFxuICAncHJpbWUnOiAnXFx1MjAzMicsXG4gICdQcmltZSc6ICdcXHUyMDMzJyxcbiAgJ3Byb2QnOiAnXFx1MjIwRicsXG4gICdwcm9wJzogJ1xcdTIyMUQnLFxuICAnUHNpJzogJ1xcdTAzQTgnLFxuICAncHNpJzogJ1xcdTAzQzgnLFxuICAncXVvdCc6ICdcXHUwMDIyJyxcbiAgJ3JhZGljJzogJ1xcdTIyMUEnLFxuICAncmFuZyc6ICdcXHUyN0U5JyxcbiAgJ3JhcXVvJzogJ1xcdTAwQkInLFxuICAncmFycic6ICdcXHUyMTkyJyxcbiAgJ3JBcnInOiAnXFx1MjFEMicsXG4gICdyY2VpbCc6ICdcXHUyMzA5JyxcbiAgJ3JkcXVvJzogJ1xcdTIwMUQnLFxuICAncmVhbCc6ICdcXHUyMTFDJyxcbiAgJ3JlZyc6ICdcXHUwMEFFJyxcbiAgJ3JmbG9vcic6ICdcXHUyMzBCJyxcbiAgJ1Jobyc6ICdcXHUwM0ExJyxcbiAgJ3Jobyc6ICdcXHUwM0MxJyxcbiAgJ3JsbSc6ICdcXHUyMDBGJyxcbiAgJ3JzYXF1byc6ICdcXHUyMDNBJyxcbiAgJ3JzcXVvJzogJ1xcdTIwMTknLFxuICAnc2JxdW8nOiAnXFx1MjAxQScsXG4gICdTY2Fyb24nOiAnXFx1MDE2MCcsXG4gICdzY2Fyb24nOiAnXFx1MDE2MScsXG4gICdzZG90JzogJ1xcdTIyQzUnLFxuICAnc2VjdCc6ICdcXHUwMEE3JyxcbiAgJ3NoeSc6ICdcXHUwMEFEJyxcbiAgJ1NpZ21hJzogJ1xcdTAzQTMnLFxuICAnc2lnbWEnOiAnXFx1MDNDMycsXG4gICdzaWdtYWYnOiAnXFx1MDNDMicsXG4gICdzaW0nOiAnXFx1MjIzQycsXG4gICdzcGFkZXMnOiAnXFx1MjY2MCcsXG4gICdzdWInOiAnXFx1MjI4MicsXG4gICdzdWJlJzogJ1xcdTIyODYnLFxuICAnc3VtJzogJ1xcdTIyMTEnLFxuICAnc3VwJzogJ1xcdTIyODMnLFxuICAnc3VwMSc6ICdcXHUwMEI5JyxcbiAgJ3N1cDInOiAnXFx1MDBCMicsXG4gICdzdXAzJzogJ1xcdTAwQjMnLFxuICAnc3VwZSc6ICdcXHUyMjg3JyxcbiAgJ3N6bGlnJzogJ1xcdTAwREYnLFxuICAnVGF1JzogJ1xcdTAzQTQnLFxuICAndGF1JzogJ1xcdTAzQzQnLFxuICAndGhlcmU0JzogJ1xcdTIyMzQnLFxuICAnVGhldGEnOiAnXFx1MDM5OCcsXG4gICd0aGV0YSc6ICdcXHUwM0I4JyxcbiAgJ3RoZXRhc3ltJzogJ1xcdTAzRDEnLFxuICAndGhpbnNwJzogJ1xcdTIwMDknLFxuICAnVEhPUk4nOiAnXFx1MDBERScsXG4gICd0aG9ybic6ICdcXHUwMEZFJyxcbiAgJ3RpbGRlJzogJ1xcdTAyREMnLFxuICAndGltZXMnOiAnXFx1MDBENycsXG4gICd0cmFkZSc6ICdcXHUyMTIyJyxcbiAgJ1VhY3V0ZSc6ICdcXHUwMERBJyxcbiAgJ3VhY3V0ZSc6ICdcXHUwMEZBJyxcbiAgJ3VhcnInOiAnXFx1MjE5MScsXG4gICd1QXJyJzogJ1xcdTIxRDEnLFxuICAnVWNpcmMnOiAnXFx1MDBEQicsXG4gICd1Y2lyYyc6ICdcXHUwMEZCJyxcbiAgJ1VncmF2ZSc6ICdcXHUwMEQ5JyxcbiAgJ3VncmF2ZSc6ICdcXHUwMEY5JyxcbiAgJ3VtbCc6ICdcXHUwMEE4JyxcbiAgJ3Vwc2loJzogJ1xcdTAzRDInLFxuICAnVXBzaWxvbic6ICdcXHUwM0E1JyxcbiAgJ3Vwc2lsb24nOiAnXFx1MDNDNScsXG4gICdVdW1sJzogJ1xcdTAwREMnLFxuICAndXVtbCc6ICdcXHUwMEZDJyxcbiAgJ3dlaWVycCc6ICdcXHUyMTE4JyxcbiAgJ1hpJzogJ1xcdTAzOUUnLFxuICAneGknOiAnXFx1MDNCRScsXG4gICdZYWN1dGUnOiAnXFx1MDBERCcsXG4gICd5YWN1dGUnOiAnXFx1MDBGRCcsXG4gICd5ZW4nOiAnXFx1MDBBNScsXG4gICd5dW1sJzogJ1xcdTAwRkYnLFxuICAnWXVtbCc6ICdcXHUwMTc4JyxcbiAgJ1pldGEnOiAnXFx1MDM5NicsXG4gICd6ZXRhJzogJ1xcdTAzQjYnLFxuICAnendqJzogJ1xcdTIwMEQnLFxuICAnenduaic6ICdcXHUyMDBDJyxcbn0pO1xuXG5leHBvcnQgZW51bSBIdG1sVGFnQ29udGVudFR5cGUge1xuICBSQVdfVEVYVCxcbiAgRVNDQVBBQkxFX1JBV19URVhULFxuICBQQVJTQUJMRV9EQVRBXG59XG5cbmV4cG9ydCBjbGFzcyBIdG1sVGFnRGVmaW5pdGlvbiB7XG4gIHByaXZhdGUgY2xvc2VkQnlDaGlsZHJlbjoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0ge307XG4gIHB1YmxpYyBjbG9zZWRCeVBhcmVudDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcmVxdWlyZWRQYXJlbnRzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn07XG4gIHB1YmxpYyBwYXJlbnRUb0FkZDogc3RyaW5nO1xuICBwdWJsaWMgaW1wbGljaXROYW1lc3BhY2VQcmVmaXg6IHN0cmluZztcbiAgcHVibGljIGNvbnRlbnRUeXBlOiBIdG1sVGFnQ29udGVudFR5cGU7XG4gIHB1YmxpYyBpc1ZvaWQ6IGJvb2xlYW47XG4gIHB1YmxpYyBpZ25vcmVGaXJzdExmOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHtjbG9zZWRCeUNoaWxkcmVuLCByZXF1aXJlZFBhcmVudHMsIGltcGxpY2l0TmFtZXNwYWNlUHJlZml4LCBjb250ZW50VHlwZSxcbiAgICAgICAgICAgICAgIGNsb3NlZEJ5UGFyZW50LCBpc1ZvaWQsIGlnbm9yZUZpcnN0TGZ9OiB7XG4gICAgY2xvc2VkQnlDaGlsZHJlbj86IHN0cmluZ1tdLFxuICAgIGNsb3NlZEJ5UGFyZW50PzogYm9vbGVhbixcbiAgICByZXF1aXJlZFBhcmVudHM/OiBzdHJpbmdbXSxcbiAgICBpbXBsaWNpdE5hbWVzcGFjZVByZWZpeD86IHN0cmluZyxcbiAgICBjb250ZW50VHlwZT86IEh0bWxUYWdDb250ZW50VHlwZSxcbiAgICBpc1ZvaWQ/OiBib29sZWFuLFxuICAgIGlnbm9yZUZpcnN0TGY/OiBib29sZWFuXG4gIH0gPSB7fSkge1xuICAgIGlmIChpc1ByZXNlbnQoY2xvc2VkQnlDaGlsZHJlbikgJiYgY2xvc2VkQnlDaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBjbG9zZWRCeUNoaWxkcmVuLmZvckVhY2godGFnTmFtZSA9PiB0aGlzLmNsb3NlZEJ5Q2hpbGRyZW5bdGFnTmFtZV0gPSB0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5pc1ZvaWQgPSBub3JtYWxpemVCb29sKGlzVm9pZCk7XG4gICAgdGhpcy5jbG9zZWRCeVBhcmVudCA9IG5vcm1hbGl6ZUJvb2woY2xvc2VkQnlQYXJlbnQpIHx8IHRoaXMuaXNWb2lkO1xuICAgIGlmIChpc1ByZXNlbnQocmVxdWlyZWRQYXJlbnRzKSAmJiByZXF1aXJlZFBhcmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5yZXF1aXJlZFBhcmVudHMgPSB7fTtcbiAgICAgIHRoaXMucGFyZW50VG9BZGQgPSByZXF1aXJlZFBhcmVudHNbMF07XG4gICAgICByZXF1aXJlZFBhcmVudHMuZm9yRWFjaCh0YWdOYW1lID0+IHRoaXMucmVxdWlyZWRQYXJlbnRzW3RhZ05hbWVdID0gdHJ1ZSk7XG4gICAgfVxuICAgIHRoaXMuaW1wbGljaXROYW1lc3BhY2VQcmVmaXggPSBpbXBsaWNpdE5hbWVzcGFjZVByZWZpeDtcbiAgICB0aGlzLmNvbnRlbnRUeXBlID0gaXNQcmVzZW50KGNvbnRlbnRUeXBlKSA/IGNvbnRlbnRUeXBlIDogSHRtbFRhZ0NvbnRlbnRUeXBlLlBBUlNBQkxFX0RBVEE7XG4gICAgdGhpcy5pZ25vcmVGaXJzdExmID0gbm9ybWFsaXplQm9vbChpZ25vcmVGaXJzdExmKTtcbiAgfVxuXG4gIHJlcXVpcmVFeHRyYVBhcmVudChjdXJyZW50UGFyZW50OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoaXNCbGFuayh0aGlzLnJlcXVpcmVkUGFyZW50cykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaXNCbGFuayhjdXJyZW50UGFyZW50KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbGV0IGxjUGFyZW50ID0gY3VycmVudFBhcmVudC50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiB0aGlzLnJlcXVpcmVkUGFyZW50c1tsY1BhcmVudF0gIT0gdHJ1ZSAmJiBsY1BhcmVudCAhPSAndGVtcGxhdGUnO1xuICB9XG5cbiAgaXNDbG9zZWRCeUNoaWxkKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzVm9pZCB8fCBub3JtYWxpemVCb29sKHRoaXMuY2xvc2VkQnlDaGlsZHJlbltuYW1lLnRvTG93ZXJDYXNlKCldKTtcbiAgfVxufVxuXG4vLyBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUxL3N5bnRheC5odG1sI29wdGlvbmFsLXRhZ3Ncbi8vIFRoaXMgaW1wbGVtZW50YXRpb24gZG9lcyBub3QgZnVsbHkgY29uZm9ybSB0byB0aGUgSFRNTDUgc3BlYy5cbnZhciBUQUdfREVGSU5JVElPTlM6IHtba2V5OiBzdHJpbmddOiBIdG1sVGFnRGVmaW5pdGlvbn0gPSB7XG4gICdiYXNlJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpc1ZvaWQ6IHRydWV9KSxcbiAgJ21ldGEnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2lzVm9pZDogdHJ1ZX0pLFxuICAnYXJlYSc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICdlbWJlZCc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICdsaW5rJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpc1ZvaWQ6IHRydWV9KSxcbiAgJ2ltZyc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICdpbnB1dCc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICdwYXJhbSc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICdocic6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICdicic6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICdzb3VyY2UnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2lzVm9pZDogdHJ1ZX0pLFxuICAndHJhY2snOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2lzVm9pZDogdHJ1ZX0pLFxuICAnd2JyJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpc1ZvaWQ6IHRydWV9KSxcbiAgJ3AnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe1xuICAgIGNsb3NlZEJ5Q2hpbGRyZW46IFtcbiAgICAgICdhZGRyZXNzJyxcbiAgICAgICdhcnRpY2xlJyxcbiAgICAgICdhc2lkZScsXG4gICAgICAnYmxvY2txdW90ZScsXG4gICAgICAnZGl2JyxcbiAgICAgICdkbCcsXG4gICAgICAnZmllbGRzZXQnLFxuICAgICAgJ2Zvb3RlcicsXG4gICAgICAnZm9ybScsXG4gICAgICAnaDEnLFxuICAgICAgJ2gyJyxcbiAgICAgICdoMycsXG4gICAgICAnaDQnLFxuICAgICAgJ2g1JyxcbiAgICAgICdoNicsXG4gICAgICAnaGVhZGVyJyxcbiAgICAgICdoZ3JvdXAnLFxuICAgICAgJ2hyJyxcbiAgICAgICdtYWluJyxcbiAgICAgICduYXYnLFxuICAgICAgJ29sJyxcbiAgICAgICdwJyxcbiAgICAgICdwcmUnLFxuICAgICAgJ3NlY3Rpb24nLFxuICAgICAgJ3RhYmxlJyxcbiAgICAgICd1bCdcbiAgICBdLFxuICAgIGNsb3NlZEJ5UGFyZW50OiB0cnVlXG4gIH0pLFxuICAndGhlYWQnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46IFsndGJvZHknLCAndGZvb3QnXX0pLFxuICAndGJvZHknOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46IFsndGJvZHknLCAndGZvb3QnXSwgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgJ3Rmb290JzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiBbJ3Rib2R5J10sIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICd0cic6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7XG4gICAgY2xvc2VkQnlDaGlsZHJlbjogWyd0ciddLFxuICAgIHJlcXVpcmVkUGFyZW50czogWyd0Ym9keScsICd0Zm9vdCcsICd0aGVhZCddLFxuICAgIGNsb3NlZEJ5UGFyZW50OiB0cnVlXG4gIH0pLFxuICAndGQnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46IFsndGQnLCAndGgnXSwgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgJ3RoJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiBbJ3RkJywgJ3RoJ10sIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICdjb2wnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe3JlcXVpcmVkUGFyZW50czogWydjb2xncm91cCddLCBpc1ZvaWQ6IHRydWV9KSxcbiAgJ3N2Zyc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aW1wbGljaXROYW1lc3BhY2VQcmVmaXg6ICdzdmcnfSksXG4gICdtYXRoJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpbXBsaWNpdE5hbWVzcGFjZVByZWZpeDogJ21hdGgnfSksXG4gICdsaSc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7Y2xvc2VkQnlDaGlsZHJlbjogWydsaSddLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAnZHQnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46IFsnZHQnLCAnZGQnXX0pLFxuICAnZGQnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46IFsnZHQnLCAnZGQnXSwgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgJ3JiJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiBbJ3JiJywgJ3J0JywgJ3J0YycsICdycCddLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAncnQnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46IFsncmInLCAncnQnLCAncnRjJywgJ3JwJ10sIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICdydGMnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46IFsncmInLCAncnRjJywgJ3JwJ10sIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICdycCc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7Y2xvc2VkQnlDaGlsZHJlbjogWydyYicsICdydCcsICdydGMnLCAncnAnXSwgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgJ29wdGdyb3VwJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiBbJ29wdGdyb3VwJ10sIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICdvcHRpb24nOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46IFsnb3B0aW9uJywgJ29wdGdyb3VwJ10sIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICdwcmUnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2lnbm9yZUZpcnN0TGY6IHRydWV9KSxcbiAgJ2xpc3RpbmcnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2lnbm9yZUZpcnN0TGY6IHRydWV9KSxcbiAgJ3N0eWxlJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjb250ZW50VHlwZTogSHRtbFRhZ0NvbnRlbnRUeXBlLlJBV19URVhUfSksXG4gICdzY3JpcHQnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2NvbnRlbnRUeXBlOiBIdG1sVGFnQ29udGVudFR5cGUuUkFXX1RFWFR9KSxcbiAgJ3RpdGxlJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjb250ZW50VHlwZTogSHRtbFRhZ0NvbnRlbnRUeXBlLkVTQ0FQQUJMRV9SQVdfVEVYVH0pLFxuICAndGV4dGFyZWEnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oXG4gICAgICB7Y29udGVudFR5cGU6IEh0bWxUYWdDb250ZW50VHlwZS5FU0NBUEFCTEVfUkFXX1RFWFQsIGlnbm9yZUZpcnN0TGY6IHRydWV9KSxcbn07XG5cbnZhciBERUZBVUxUX1RBR19ERUZJTklUSU9OID0gbmV3IEh0bWxUYWdEZWZpbml0aW9uKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIdG1sVGFnRGVmaW5pdGlvbih0YWdOYW1lOiBzdHJpbmcpOiBIdG1sVGFnRGVmaW5pdGlvbiB7XG4gIHZhciByZXN1bHQgPSBUQUdfREVGSU5JVElPTlNbdGFnTmFtZS50b0xvd2VyQ2FzZSgpXTtcbiAgcmV0dXJuIGlzUHJlc2VudChyZXN1bHQpID8gcmVzdWx0IDogREVGQVVMVF9UQUdfREVGSU5JVElPTjtcbn1cblxudmFyIE5TX1BSRUZJWF9SRSA9IC9eQChbXjpdKyk6KC4rKS9nO1xuXG5leHBvcnQgZnVuY3Rpb24gc3BsaXROc05hbWUoZWxlbWVudE5hbWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgaWYgKGVsZW1lbnROYW1lWzBdICE9ICdAJykge1xuICAgIHJldHVybiBbbnVsbCwgZWxlbWVudE5hbWVdO1xuICB9XG4gIGxldCBtYXRjaCA9IFJlZ0V4cFdyYXBwZXIuZmlyc3RNYXRjaChOU19QUkVGSVhfUkUsIGVsZW1lbnROYW1lKTtcbiAgcmV0dXJuIFttYXRjaFsxXSwgbWF0Y2hbMl1dO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TnNQcmVmaXgoZWxlbWVudE5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBzcGxpdE5zTmFtZShlbGVtZW50TmFtZSlbMF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU5zQW5kTmFtZShwcmVmaXg6IHN0cmluZywgbG9jYWxOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gaXNQcmVzZW50KHByZWZpeCkgPyBgQCR7cHJlZml4fToke2xvY2FsTmFtZX1gIDogbG9jYWxOYW1lO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
