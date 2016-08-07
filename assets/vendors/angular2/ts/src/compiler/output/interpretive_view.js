System.register(['angular2/src/facade/lang', 'angular2/src/core/linker/view', 'angular2/src/facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lang_1, view_1, exceptions_1;
    var InterpretiveAppViewInstanceFactory, _InterpretiveAppView;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (view_1_1) {
                view_1 = view_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            InterpretiveAppViewInstanceFactory = (function () {
                function InterpretiveAppViewInstanceFactory() {
                }
                InterpretiveAppViewInstanceFactory.prototype.createInstance = function (superClass, clazz, args, props, getters, methods) {
                    if (superClass === view_1.AppView) {
                        return new _InterpretiveAppView(args, props, getters, methods);
                    }
                    throw new exceptions_1.BaseException("Can't instantiate class " + superClass + " in interpretative mode");
                };
                return InterpretiveAppViewInstanceFactory;
            }());
            exports_1("InterpretiveAppViewInstanceFactory", InterpretiveAppViewInstanceFactory);
            _InterpretiveAppView = (function (_super) {
                __extends(_InterpretiveAppView, _super);
                function _InterpretiveAppView(args, props, getters, methods) {
                    _super.call(this, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
                    this.props = props;
                    this.getters = getters;
                    this.methods = methods;
                }
                _InterpretiveAppView.prototype.createInternal = function (rootSelector) {
                    var m = this.methods.get('createInternal');
                    if (lang_1.isPresent(m)) {
                        return m(rootSelector);
                    }
                    else {
                        return _super.prototype.createInternal.call(this, rootSelector);
                    }
                };
                _InterpretiveAppView.prototype.injectorGetInternal = function (token, nodeIndex, notFoundResult) {
                    var m = this.methods.get('injectorGetInternal');
                    if (lang_1.isPresent(m)) {
                        return m(token, nodeIndex, notFoundResult);
                    }
                    else {
                        return _super.prototype.injectorGet.call(this, token, nodeIndex, notFoundResult);
                    }
                };
                _InterpretiveAppView.prototype.destroyInternal = function () {
                    var m = this.methods.get('destroyInternal');
                    if (lang_1.isPresent(m)) {
                        return m();
                    }
                    else {
                        return _super.prototype.destroyInternal.call(this);
                    }
                };
                _InterpretiveAppView.prototype.dirtyParentQueriesInternal = function () {
                    var m = this.methods.get('dirtyParentQueriesInternal');
                    if (lang_1.isPresent(m)) {
                        return m();
                    }
                    else {
                        return _super.prototype.dirtyParentQueriesInternal.call(this);
                    }
                };
                _InterpretiveAppView.prototype.detectChangesInternal = function (throwOnChange) {
                    var m = this.methods.get('detectChangesInternal');
                    if (lang_1.isPresent(m)) {
                        return m(throwOnChange);
                    }
                    else {
                        return _super.prototype.detectChangesInternal.call(this, throwOnChange);
                    }
                };
                return _InterpretiveAppView;
            }(view_1.AppView));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9vdXRwdXQvaW50ZXJwcmV0aXZlX3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU1BO2dCQUFBO2dCQVFBLENBQUM7Z0JBUEMsMkRBQWMsR0FBZCxVQUFlLFVBQWUsRUFBRSxLQUFVLEVBQUUsSUFBVyxFQUFFLEtBQXVCLEVBQ2pFLE9BQThCLEVBQUUsT0FBOEI7b0JBQzNFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxjQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixNQUFNLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDakUsQ0FBQztvQkFDRCxNQUFNLElBQUksMEJBQWEsQ0FBQyw2QkFBMkIsVUFBVSw0QkFBeUIsQ0FBQyxDQUFDO2dCQUMxRixDQUFDO2dCQUNILHlDQUFDO1lBQUQsQ0FSQSxBQVFDLElBQUE7WUFSRCxtRkFRQyxDQUFBO1lBRUQ7Z0JBQW1DLHdDQUFZO2dCQUM3Qyw4QkFBWSxJQUFXLEVBQVMsS0FBdUIsRUFBUyxPQUE4QixFQUMzRSxPQUE4QjtvQkFDL0Msa0JBQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFGekQsVUFBSyxHQUFMLEtBQUssQ0FBa0I7b0JBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7b0JBQzNFLFlBQU8sR0FBUCxPQUFPLENBQXVCO2dCQUVqRCxDQUFDO2dCQUNELDZDQUFjLEdBQWQsVUFBZSxZQUEwQjtvQkFDdkMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDM0MsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3pCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLGdCQUFLLENBQUMsY0FBYyxZQUFDLFlBQVksQ0FBQyxDQUFDO29CQUM1QyxDQUFDO2dCQUNILENBQUM7Z0JBQ0Qsa0RBQW1CLEdBQW5CLFVBQW9CLEtBQVUsRUFBRSxTQUFpQixFQUFFLGNBQW1CO29CQUNwRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUNoRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUM3QyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sQ0FBQyxnQkFBSyxDQUFDLFdBQVcsWUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUM3RCxDQUFDO2dCQUNILENBQUM7Z0JBQ0QsOENBQWUsR0FBZjtvQkFDRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUM1QyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNiLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxDQUFDLGdCQUFLLENBQUMsZUFBZSxXQUFFLENBQUM7b0JBQ2pDLENBQUM7Z0JBQ0gsQ0FBQztnQkFDRCx5REFBMEIsR0FBMUI7b0JBQ0UsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztvQkFDdkQsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDYixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sQ0FBQyxnQkFBSyxDQUFDLDBCQUEwQixXQUFFLENBQUM7b0JBQzVDLENBQUM7Z0JBQ0gsQ0FBQztnQkFDRCxvREFBcUIsR0FBckIsVUFBc0IsYUFBc0I7b0JBQzFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7b0JBQ2xELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUMxQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sQ0FBQyxnQkFBSyxDQUFDLHFCQUFxQixZQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNwRCxDQUFDO2dCQUNILENBQUM7Z0JBQ0gsMkJBQUM7WUFBRCxDQTdDQSxBQTZDQyxDQTdDa0MsY0FBTyxHQTZDekMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL291dHB1dC9pbnRlcnByZXRpdmVfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtBcHBWaWV3fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvdmlldyc7XG5pbXBvcnQge0FwcEVsZW1lbnR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9lbGVtZW50JztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7SW5zdGFuY2VGYWN0b3J5LCBEeW5hbWljSW5zdGFuY2V9IGZyb20gJy4vb3V0cHV0X2ludGVycHJldGVyJztcblxuZXhwb3J0IGNsYXNzIEludGVycHJldGl2ZUFwcFZpZXdJbnN0YW5jZUZhY3RvcnkgaW1wbGVtZW50cyBJbnN0YW5jZUZhY3Rvcnkge1xuICBjcmVhdGVJbnN0YW5jZShzdXBlckNsYXNzOiBhbnksIGNsYXp6OiBhbnksIGFyZ3M6IGFueVtdLCBwcm9wczogTWFwPHN0cmluZywgYW55PixcbiAgICAgICAgICAgICAgICAgZ2V0dGVyczogTWFwPHN0cmluZywgRnVuY3Rpb24+LCBtZXRob2RzOiBNYXA8c3RyaW5nLCBGdW5jdGlvbj4pOiBhbnkge1xuICAgIGlmIChzdXBlckNsYXNzID09PSBBcHBWaWV3KSB7XG4gICAgICByZXR1cm4gbmV3IF9JbnRlcnByZXRpdmVBcHBWaWV3KGFyZ3MsIHByb3BzLCBnZXR0ZXJzLCBtZXRob2RzKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYENhbid0IGluc3RhbnRpYXRlIGNsYXNzICR7c3VwZXJDbGFzc30gaW4gaW50ZXJwcmV0YXRpdmUgbW9kZWApO1xuICB9XG59XG5cbmNsYXNzIF9JbnRlcnByZXRpdmVBcHBWaWV3IGV4dGVuZHMgQXBwVmlldzxhbnk+IGltcGxlbWVudHMgRHluYW1pY0luc3RhbmNlIHtcbiAgY29uc3RydWN0b3IoYXJnczogYW55W10sIHB1YmxpYyBwcm9wczogTWFwPHN0cmluZywgYW55PiwgcHVibGljIGdldHRlcnM6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uPixcbiAgICAgICAgICAgICAgcHVibGljIG1ldGhvZHM6IE1hcDxzdHJpbmcsIEZ1bmN0aW9uPikge1xuICAgIHN1cGVyKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0sIGFyZ3NbNV0sIGFyZ3NbNl0sIGFyZ3NbN10sIGFyZ3NbOF0pO1xuICB9XG4gIGNyZWF0ZUludGVybmFsKHJvb3RTZWxlY3Rvcjogc3RyaW5nIHwgYW55KTogQXBwRWxlbWVudCB7XG4gICAgdmFyIG0gPSB0aGlzLm1ldGhvZHMuZ2V0KCdjcmVhdGVJbnRlcm5hbCcpO1xuICAgIGlmIChpc1ByZXNlbnQobSkpIHtcbiAgICAgIHJldHVybiBtKHJvb3RTZWxlY3Rvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdXBlci5jcmVhdGVJbnRlcm5hbChyb290U2VsZWN0b3IpO1xuICAgIH1cbiAgfVxuICBpbmplY3RvckdldEludGVybmFsKHRva2VuOiBhbnksIG5vZGVJbmRleDogbnVtYmVyLCBub3RGb3VuZFJlc3VsdDogYW55KTogYW55IHtcbiAgICB2YXIgbSA9IHRoaXMubWV0aG9kcy5nZXQoJ2luamVjdG9yR2V0SW50ZXJuYWwnKTtcbiAgICBpZiAoaXNQcmVzZW50KG0pKSB7XG4gICAgICByZXR1cm4gbSh0b2tlbiwgbm9kZUluZGV4LCBub3RGb3VuZFJlc3VsdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdXBlci5pbmplY3RvckdldCh0b2tlbiwgbm9kZUluZGV4LCBub3RGb3VuZFJlc3VsdCk7XG4gICAgfVxuICB9XG4gIGRlc3Ryb3lJbnRlcm5hbCgpOiB2b2lkIHtcbiAgICB2YXIgbSA9IHRoaXMubWV0aG9kcy5nZXQoJ2Rlc3Ryb3lJbnRlcm5hbCcpO1xuICAgIGlmIChpc1ByZXNlbnQobSkpIHtcbiAgICAgIHJldHVybiBtKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdXBlci5kZXN0cm95SW50ZXJuYWwoKTtcbiAgICB9XG4gIH1cbiAgZGlydHlQYXJlbnRRdWVyaWVzSW50ZXJuYWwoKTogdm9pZCB7XG4gICAgdmFyIG0gPSB0aGlzLm1ldGhvZHMuZ2V0KCdkaXJ0eVBhcmVudFF1ZXJpZXNJbnRlcm5hbCcpO1xuICAgIGlmIChpc1ByZXNlbnQobSkpIHtcbiAgICAgIHJldHVybiBtKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdXBlci5kaXJ0eVBhcmVudFF1ZXJpZXNJbnRlcm5hbCgpO1xuICAgIH1cbiAgfVxuICBkZXRlY3RDaGFuZ2VzSW50ZXJuYWwodGhyb3dPbkNoYW5nZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHZhciBtID0gdGhpcy5tZXRob2RzLmdldCgnZGV0ZWN0Q2hhbmdlc0ludGVybmFsJyk7XG4gICAgaWYgKGlzUHJlc2VudChtKSkge1xuICAgICAgcmV0dXJuIG0odGhyb3dPbkNoYW5nZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdXBlci5kZXRlY3RDaGFuZ2VzSW50ZXJuYWwodGhyb3dPbkNoYW5nZSk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
