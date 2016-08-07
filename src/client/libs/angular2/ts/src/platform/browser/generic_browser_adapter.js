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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvZ2VuZXJpY19icm93c2VyX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU1BOztlQUVHO1lBQ0g7Z0JBQXVELDRDQUFVO2dCQUcvRDtvQkFIRixpQkFtREM7b0JBL0NHLGlCQUFPLENBQUM7b0JBSEYscUJBQWdCLEdBQVcsSUFBSSxDQUFDO29CQUNoQyxtQkFBYyxHQUFXLElBQUksQ0FBQztvQkFHcEMsSUFBSSxDQUFDO3dCQUNILElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO3dCQUMzRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN2RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO3dCQUM3QixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLElBQUksV0FBVyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBQy9DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dDQUM1QyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQ0FDeEUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDO29DQUNqRSxLQUFLLENBQUM7Z0NBQ1IsQ0FBQzs0QkFDSCxDQUFDO3dCQUNILENBQUM7d0JBQ0QsSUFBSSxrQkFBa0IsR0FBNEI7NEJBQ2hELGdCQUFnQixFQUFFLHFCQUFxQjs0QkFDdkMsYUFBYSxFQUFFLGVBQWU7NEJBQzlCLFdBQVcsRUFBRSwrQkFBK0I7NEJBQzVDLFVBQVUsRUFBRSxlQUFlO3lCQUM1QixDQUFDO3dCQUNGLDZCQUFnQixDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxVQUFDLEtBQWEsRUFBRSxHQUFXOzRCQUN0RSxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUMzQyxLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQzs0QkFDOUIsQ0FBQzt3QkFDSCxDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFFO29CQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ1gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQzt3QkFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7b0JBQzdCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCx5Q0FBTSxHQUFOLGNBQWlCLE1BQU0sQ0FBQyxrQkFBTyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsc0RBQW1CLEdBQW5CLFVBQW9CLEVBQWUsSUFBWSxNQUFNLENBQU8sRUFBRyxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN4RixvREFBaUIsR0FBakIsVUFBa0IsRUFBcUIsRUFBRSxPQUFlLEVBQUUsSUFBWTtvQkFDcEUsRUFBRSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLE9BQU8sR0FBRyxPQUFPLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDN0QsQ0FBQztnQkFDRCxvREFBaUIsR0FBakIsY0FBK0IsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLDBEQUF1QixHQUF2QjtvQkFDRSxNQUFNLENBQUMsaUJBQVUsQ0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3BFLENBQUM7Z0JBQ0QscURBQWtCLEdBQWxCO29CQUNFLE1BQU0sQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7Z0JBQ3ZFLENBQUM7Z0JBQ0QsbURBQWdCLEdBQWhCLGNBQTZCLE1BQU0sQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hHLG9EQUFpQixHQUFqQjtvQkFDRSxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxnQkFBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDNUUsQ0FBQztnQkFDSCwrQkFBQztZQUFELENBbkRBLEFBbURDLENBbkRzRCx3QkFBVSxHQW1EaEU7WUFuREQsK0RBbURDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vYnJvd3Nlci9nZW5lcmljX2Jyb3dzZXJfYWRhcHRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdFdyYXBwZXIsIFN0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNGdW5jdGlvbiwgVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7RG9tQWRhcHRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge1hIUkltcGx9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL3hocl9pbXBsJztcblxuXG4vKipcbiAqIFByb3ZpZGVzIERPTSBvcGVyYXRpb25zIGluIGFueSBicm93c2VyIGVudmlyb25tZW50LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2VuZXJpY0Jyb3dzZXJEb21BZGFwdGVyIGV4dGVuZHMgRG9tQWRhcHRlciB7XG4gIHByaXZhdGUgX2FuaW1hdGlvblByZWZpeDogc3RyaW5nID0gbnVsbDtcbiAgcHJpdmF0ZSBfdHJhbnNpdGlvbkVuZDogc3RyaW5nID0gbnVsbDtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0cnkge1xuICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHRoaXMuZGVmYXVsdERvYygpKTtcbiAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5nZXRTdHlsZShlbGVtZW50LCAnYW5pbWF0aW9uTmFtZScpKSkge1xuICAgICAgICB0aGlzLl9hbmltYXRpb25QcmVmaXggPSAnJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkb21QcmVmaXhlcyA9IFsnV2Via2l0JywgJ01veicsICdPJywgJ21zJ107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZG9tUHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaXNQcmVzZW50KHRoaXMuZ2V0U3R5bGUoZWxlbWVudCwgZG9tUHJlZml4ZXNbaV0gKyAnQW5pbWF0aW9uTmFtZScpKSkge1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uUHJlZml4ID0gJy0nICsgZG9tUHJlZml4ZXNbaV0udG9Mb3dlckNhc2UoKSArICctJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHRyYW5zRW5kRXZlbnROYW1lczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgICAgIFdlYmtpdFRyYW5zaXRpb246ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgICAgTW96VHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnXG4gICAgICB9O1xuICAgICAgU3RyaW5nTWFwV3JhcHBlci5mb3JFYWNoKHRyYW5zRW5kRXZlbnROYW1lcywgKHZhbHVlOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmIChpc1ByZXNlbnQodGhpcy5nZXRTdHlsZShlbGVtZW50LCBrZXkpKSkge1xuICAgICAgICAgIHRoaXMuX3RyYW5zaXRpb25FbmQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uUHJlZml4ID0gbnVsbDtcbiAgICAgIHRoaXMuX3RyYW5zaXRpb25FbmQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGdldFhIUigpOiBUeXBlIHsgcmV0dXJuIFhIUkltcGw7IH1cbiAgZ2V0RGlzdHJpYnV0ZWROb2RlcyhlbDogSFRNTEVsZW1lbnQpOiBOb2RlW10geyByZXR1cm4gKDxhbnk+ZWwpLmdldERpc3RyaWJ1dGVkTm9kZXMoKTsgfVxuICByZXNvbHZlQW5kU2V0SHJlZihlbDogSFRNTEFuY2hvckVsZW1lbnQsIGJhc2VVcmw6IHN0cmluZywgaHJlZjogc3RyaW5nKSB7XG4gICAgZWwuaHJlZiA9IGhyZWYgPT0gbnVsbCA/IGJhc2VVcmwgOiBiYXNlVXJsICsgJy8uLi8nICsgaHJlZjtcbiAgfVxuICBzdXBwb3J0c0RPTUV2ZW50cygpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cbiAgc3VwcG9ydHNOYXRpdmVTaGFkb3dET00oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24oKDxhbnk+dGhpcy5kZWZhdWx0RG9jKCkuYm9keSkuY3JlYXRlU2hhZG93Um9vdCk7XG4gIH1cbiAgZ2V0QW5pbWF0aW9uUHJlZml4KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlzUHJlc2VudCh0aGlzLl9hbmltYXRpb25QcmVmaXgpID8gdGhpcy5fYW5pbWF0aW9uUHJlZml4IDogXCJcIjtcbiAgfVxuICBnZXRUcmFuc2l0aW9uRW5kKCk6IHN0cmluZyB7IHJldHVybiBpc1ByZXNlbnQodGhpcy5fdHJhbnNpdGlvbkVuZCkgPyB0aGlzLl90cmFuc2l0aW9uRW5kIDogXCJcIjsgfVxuICBzdXBwb3J0c0FuaW1hdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNQcmVzZW50KHRoaXMuX2FuaW1hdGlvblByZWZpeCkgJiYgaXNQcmVzZW50KHRoaXMuX3RyYW5zaXRpb25FbmQpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
