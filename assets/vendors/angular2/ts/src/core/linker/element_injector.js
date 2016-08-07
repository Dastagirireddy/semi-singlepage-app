System.register(['angular2/src/facade/lang', 'angular2/src/core/di/injector'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, injector_1;
    var _UNDEFINED, ElementInjector;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (injector_1_1) {
                injector_1 = injector_1_1;
            }],
        execute: function() {
            _UNDEFINED = lang_1.CONST_EXPR(new Object());
            ElementInjector = (function (_super) {
                __extends(ElementInjector, _super);
                function ElementInjector(_view, _nodeIndex) {
                    _super.call(this);
                    this._view = _view;
                    this._nodeIndex = _nodeIndex;
                }
                ElementInjector.prototype.get = function (token, notFoundValue) {
                    if (notFoundValue === void 0) { notFoundValue = injector_1.THROW_IF_NOT_FOUND; }
                    var result = _UNDEFINED;
                    if (result === _UNDEFINED) {
                        result = this._view.injectorGet(token, this._nodeIndex, _UNDEFINED);
                    }
                    if (result === _UNDEFINED) {
                        result = this._view.parentInjector.get(token, notFoundValue);
                    }
                    return result;
                };
                return ElementInjector;
            }(injector_1.Injector));
            exports_1("ElementInjector", ElementInjector);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci9lbGVtZW50X2luamVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztRQUlNLFVBQVU7Ozs7Ozs7Ozs7WUFBVixVQUFVLEdBQUcsaUJBQVUsQ0FBQyxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFFNUM7Z0JBQXFDLG1DQUFRO2dCQUMzQyx5QkFBb0IsS0FBbUIsRUFBVSxVQUFrQjtvQkFBSSxpQkFBTyxDQUFDO29CQUEzRCxVQUFLLEdBQUwsS0FBSyxDQUFjO29CQUFVLGVBQVUsR0FBVixVQUFVLENBQVE7Z0JBQWEsQ0FBQztnQkFFakYsNkJBQUcsR0FBSCxVQUFJLEtBQVUsRUFBRSxhQUF1QztvQkFBdkMsNkJBQXVDLEdBQXZDLDZDQUF1QztvQkFDckQsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDO29CQUN4QixFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUN0RSxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztvQkFDL0QsQ0FBQztvQkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNoQixDQUFDO2dCQUNILHNCQUFDO1lBQUQsQ0FiQSxBQWFDLENBYm9DLG1CQUFRLEdBYTVDO1lBYkQsNkNBYUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29yZS9saW5rZXIvZWxlbWVudF9pbmplY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNCbGFuaywgc3RyaW5naWZ5LCBDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtJbmplY3RvciwgVEhST1dfSUZfTk9UX0ZPVU5EfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaS9pbmplY3Rvcic7XG5pbXBvcnQge0FwcFZpZXd9IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IF9VTkRFRklORUQgPSBDT05TVF9FWFBSKG5ldyBPYmplY3QoKSk7XG5cbmV4cG9ydCBjbGFzcyBFbGVtZW50SW5qZWN0b3IgZXh0ZW5kcyBJbmplY3RvciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZpZXc6IEFwcFZpZXc8YW55PiwgcHJpdmF0ZSBfbm9kZUluZGV4OiBudW1iZXIpIHsgc3VwZXIoKTsgfVxuXG4gIGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlOiBhbnkgPSBUSFJPV19JRl9OT1RfRk9VTkQpOiBhbnkge1xuICAgIHZhciByZXN1bHQgPSBfVU5ERUZJTkVEO1xuICAgIGlmIChyZXN1bHQgPT09IF9VTkRFRklORUQpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX3ZpZXcuaW5qZWN0b3JHZXQodG9rZW4sIHRoaXMuX25vZGVJbmRleCwgX1VOREVGSU5FRCk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgPT09IF9VTkRFRklORUQpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMuX3ZpZXcucGFyZW50SW5qZWN0b3IuZ2V0KHRva2VuLCBub3RGb3VuZFZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
