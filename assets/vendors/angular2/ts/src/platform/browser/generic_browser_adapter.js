System.register(['angular2/src/facade/collection', 'angular2/src/facade/lang', 'angular2/src/platform/dom/dom_adapter', 'angular2/src/platform/browser/xhr_impl'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var collection_1, lang_1, dom_adapter_1, xhr_impl_1;
    var GenericBrowserDomAdapter;
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            },
            function (xhr_impl_1_1) {
                xhr_impl_1 = xhr_impl_1_1;
            }],
        execute: function() {
            /**
             * Provides DOM operations in any browser environment.
             */
            GenericBrowserDomAdapter = (function (_super) {
                __extends(GenericBrowserDomAdapter, _super);
                function GenericBrowserDomAdapter() {
                    var _this = this;
                    _super.call(this);
                    this._animationPrefix = null;
                    this._transitionEnd = null;
                    try {
                        var element = this.createElement('div', this.defaultDoc());
                        if (lang_1.isPresent(this.getStyle(element, 'animationName'))) {
                            this._animationPrefix = '';
                        }
                        else {
                            var domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
                            for (var i = 0; i < domPrefixes.length; i++) {
                                if (lang_1.isPresent(this.getStyle(element, domPrefixes[i] + 'AnimationName'))) {
                                    this._animationPrefix = '-' + domPrefixes[i].toLowerCase() + '-';
                                    break;
                                }
                            }
                        }
                        var transEndEventNames = {
                            WebkitTransition: 'webkitTransitionEnd',
                            MozTransition: 'transitionend',
                            OTransition: 'oTransitionEnd otransitionend',
                            transition: 'transitionend'
                        };
                        collection_1.StringMapWrapper.forEach(transEndEventNames, function (value, key) {
                            if (lang_1.isPresent(_this.getStyle(element, key))) {
                                _this._transitionEnd = value;
                            }
                        });
                    }
                    catch (e) {
                        this._animationPrefix = null;
                        this._transitionEnd = null;
                    }
                }
                GenericBrowserDomAdapter.prototype.getXHR = function () { return xhr_impl_1.XHRImpl; };
                GenericBrowserDomAdapter.prototype.getDistributedNodes = function (el) { return el.getDistributedNodes(); };
                GenericBrowserDomAdapter.prototype.resolveAndSetHref = function (el, baseUrl, href) {
                    el.href = href == null ? baseUrl : baseUrl + '/../' + href;
                };
                GenericBrowserDomAdapter.prototype.supportsDOMEvents = function () { return true; };
                GenericBrowserDomAdapter.prototype.supportsNativeShadowDOM = function () {
                    return lang_1.isFunction(this.defaultDoc().body.createShadowRoot);
                };
                GenericBrowserDomAdapter.prototype.getAnimationPrefix = function () {
                    return lang_1.isPresent(this._animationPrefix) ? this._animationPrefix : "";
                };
                GenericBrowserDomAdapter.prototype.getTransitionEnd = function () { return lang_1.isPresent(this._transitionEnd) ? this._transitionEnd : ""; };
                GenericBrowserDomAdapter.prototype.supportsAnimation = function () {
                    return lang_1.isPresent(this._animationPrefix) && lang_1.isPresent(this._transitionEnd);
                };
                return GenericBrowserDomAdapter;
            }(dom_adapter_1.DomAdapter));
            exports_1("GenericBrowserDomAdapter", GenericBrowserDomAdapter);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL2dlbmVyaWNfYnJvd3Nlcl9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFNQTs7ZUFFRztZQUNIO2dCQUF1RCw0Q0FBVTtnQkFHL0Q7b0JBSEYsaUJBbURDO29CQS9DRyxpQkFBTyxDQUFDO29CQUhGLHFCQUFnQixHQUFXLElBQUksQ0FBQztvQkFDaEMsbUJBQWMsR0FBVyxJQUFJLENBQUM7b0JBR3BDLElBQUksQ0FBQzt3QkFDSCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQzt3QkFDM0QsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDdkQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQzt3QkFDN0IsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixJQUFJLFdBQVcsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUMvQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQ0FDNUMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBQ3hFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQztvQ0FDakUsS0FBSyxDQUFDO2dDQUNSLENBQUM7NEJBQ0gsQ0FBQzt3QkFDSCxDQUFDO3dCQUNELElBQUksa0JBQWtCLEdBQTRCOzRCQUNoRCxnQkFBZ0IsRUFBRSxxQkFBcUI7NEJBQ3ZDLGFBQWEsRUFBRSxlQUFlOzRCQUM5QixXQUFXLEVBQUUsK0JBQStCOzRCQUM1QyxVQUFVLEVBQUUsZUFBZTt5QkFDNUIsQ0FBQzt3QkFDRiw2QkFBZ0IsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsVUFBQyxLQUFhLEVBQUUsR0FBVzs0QkFDdEUsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDM0MsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7NEJBQzlCLENBQUM7d0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBRTtvQkFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNYLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7d0JBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO29CQUM3QixDQUFDO2dCQUNILENBQUM7Z0JBRUQseUNBQU0sR0FBTixjQUFpQixNQUFNLENBQUMsa0JBQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLHNEQUFtQixHQUFuQixVQUFvQixFQUFlLElBQVksTUFBTSxDQUFPLEVBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDeEYsb0RBQWlCLEdBQWpCLFVBQWtCLEVBQXFCLEVBQUUsT0FBZSxFQUFFLElBQVk7b0JBQ3BFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxPQUFPLEdBQUcsT0FBTyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQzdELENBQUM7Z0JBQ0Qsb0RBQWlCLEdBQWpCLGNBQStCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM3QywwREFBdUIsR0FBdkI7b0JBQ0UsTUFBTSxDQUFDLGlCQUFVLENBQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNwRSxDQUFDO2dCQUNELHFEQUFrQixHQUFsQjtvQkFDRSxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO2dCQUN2RSxDQUFDO2dCQUNELG1EQUFnQixHQUFoQixjQUE2QixNQUFNLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNoRyxvREFBaUIsR0FBakI7b0JBQ0UsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksZ0JBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzVFLENBQUM7Z0JBQ0gsK0JBQUM7WUFBRCxDQW5EQSxBQW1EQyxDQW5Ec0Qsd0JBQVUsR0FtRGhFO1lBbkRELCtEQW1EQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL2dlbmVyaWNfYnJvd3Nlcl9hZGFwdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMaXN0V3JhcHBlciwgU3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7aXNQcmVzZW50LCBpc0Z1bmN0aW9uLCBUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtEb21BZGFwdGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7WEhSSW1wbH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXIveGhyX2ltcGwnO1xuXG5cbi8qKlxuICogUHJvdmlkZXMgRE9NIG9wZXJhdGlvbnMgaW4gYW55IGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHZW5lcmljQnJvd3NlckRvbUFkYXB0ZXIgZXh0ZW5kcyBEb21BZGFwdGVyIHtcbiAgcHJpdmF0ZSBfYW5pbWF0aW9uUHJlZml4OiBzdHJpbmcgPSBudWxsO1xuICBwcml2YXRlIF90cmFuc2l0aW9uRW5kOiBzdHJpbmcgPSBudWxsO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRyeSB7XG4gICAgICB2YXIgZWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudCgnZGl2JywgdGhpcy5kZWZhdWx0RG9jKCkpO1xuICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmdldFN0eWxlKGVsZW1lbnQsICdhbmltYXRpb25OYW1lJykpKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblByZWZpeCA9ICcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGRvbVByZWZpeGVzID0gWydXZWJraXQnLCAnTW96JywgJ08nLCAnbXMnXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb21QcmVmaXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5nZXRTdHlsZShlbGVtZW50LCBkb21QcmVmaXhlc1tpXSArICdBbmltYXRpb25OYW1lJykpKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25QcmVmaXggPSAnLScgKyBkb21QcmVmaXhlc1tpXS50b0xvd2VyQ2FzZSgpICsgJy0nO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgdHJhbnNFbmRFdmVudE5hbWVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHtcbiAgICAgICAgV2Via2l0VHJhbnNpdGlvbjogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgICAgICBNb3pUcmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICAgIE9UcmFuc2l0aW9uOiAnb1RyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQnLFxuICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCdcbiAgICAgIH07XG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2godHJhbnNFbmRFdmVudE5hbWVzLCAodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgaWYgKGlzUHJlc2VudCh0aGlzLmdldFN0eWxlKGVsZW1lbnQsIGtleSkpKSB7XG4gICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbkVuZCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLl9hbmltYXRpb25QcmVmaXggPSBudWxsO1xuICAgICAgdGhpcy5fdHJhbnNpdGlvbkVuZCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgZ2V0WEhSKCk6IFR5cGUgeyByZXR1cm4gWEhSSW1wbDsgfVxuICBnZXREaXN0cmlidXRlZE5vZGVzKGVsOiBIVE1MRWxlbWVudCk6IE5vZGVbXSB7IHJldHVybiAoPGFueT5lbCkuZ2V0RGlzdHJpYnV0ZWROb2RlcygpOyB9XG4gIHJlc29sdmVBbmRTZXRIcmVmKGVsOiBIVE1MQW5jaG9yRWxlbWVudCwgYmFzZVVybDogc3RyaW5nLCBocmVmOiBzdHJpbmcpIHtcbiAgICBlbC5ocmVmID0gaHJlZiA9PSBudWxsID8gYmFzZVVybCA6IGJhc2VVcmwgKyAnLy4uLycgKyBocmVmO1xuICB9XG4gIHN1cHBvcnRzRE9NRXZlbnRzKCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxuICBzdXBwb3J0c05hdGl2ZVNoYWRvd0RPTSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNGdW5jdGlvbigoPGFueT50aGlzLmRlZmF1bHREb2MoKS5ib2R5KS5jcmVhdGVTaGFkb3dSb290KTtcbiAgfVxuICBnZXRBbmltYXRpb25QcmVmaXgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuX2FuaW1hdGlvblByZWZpeCkgPyB0aGlzLl9hbmltYXRpb25QcmVmaXggOiBcIlwiO1xuICB9XG4gIGdldFRyYW5zaXRpb25FbmQoKTogc3RyaW5nIHsgcmV0dXJuIGlzUHJlc2VudCh0aGlzLl90cmFuc2l0aW9uRW5kKSA/IHRoaXMuX3RyYW5zaXRpb25FbmQgOiBcIlwiOyB9XG4gIHN1cHBvcnRzQW5pbWF0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1ByZXNlbnQodGhpcy5fYW5pbWF0aW9uUHJlZml4KSAmJiBpc1ByZXNlbnQodGhpcy5fdHJhbnNpdGlvbkVuZCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
