System.register(['angular2/src/facade/lang', './constants'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, constants_1;
    var DirectiveIndex, DirectiveRecord;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }],
        execute: function() {
            DirectiveIndex = (function () {
                function DirectiveIndex(elementIndex, directiveIndex) {
                    this.elementIndex = elementIndex;
                    this.directiveIndex = directiveIndex;
                }
                Object.defineProperty(DirectiveIndex.prototype, "name", {
                    get: function () { return this.elementIndex + "_" + this.directiveIndex; },
                    enumerable: true,
                    configurable: true
                });
                return DirectiveIndex;
            }());
            exports_1("DirectiveIndex", DirectiveIndex);
            DirectiveRecord = (function () {
                function DirectiveRecord(_a) {
                    var _b = _a === void 0 ? {} : _a, directiveIndex = _b.directiveIndex, callAfterContentInit = _b.callAfterContentInit, callAfterContentChecked = _b.callAfterContentChecked, callAfterViewInit = _b.callAfterViewInit, callAfterViewChecked = _b.callAfterViewChecked, callOnChanges = _b.callOnChanges, callDoCheck = _b.callDoCheck, callOnInit = _b.callOnInit, callOnDestroy = _b.callOnDestroy, changeDetection = _b.changeDetection, outputs = _b.outputs;
                    this.directiveIndex = directiveIndex;
                    this.callAfterContentInit = lang_1.normalizeBool(callAfterContentInit);
                    this.callAfterContentChecked = lang_1.normalizeBool(callAfterContentChecked);
                    this.callOnChanges = lang_1.normalizeBool(callOnChanges);
                    this.callAfterViewInit = lang_1.normalizeBool(callAfterViewInit);
                    this.callAfterViewChecked = lang_1.normalizeBool(callAfterViewChecked);
                    this.callDoCheck = lang_1.normalizeBool(callDoCheck);
                    this.callOnInit = lang_1.normalizeBool(callOnInit);
                    this.callOnDestroy = lang_1.normalizeBool(callOnDestroy);
                    this.changeDetection = changeDetection;
                    this.outputs = outputs;
                }
                DirectiveRecord.prototype.isDefaultChangeDetection = function () {
                    return constants_1.isDefaultChangeDetectionStrategy(this.changeDetection);
                };
                return DirectiveRecord;
            }());
            exports_1("DirectiveRecord", DirectiveRecord);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9kaXJlY3RpdmVfcmVjb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O1lBR0E7Z0JBQ0Usd0JBQW1CLFlBQW9CLEVBQVMsY0FBc0I7b0JBQW5ELGlCQUFZLEdBQVosWUFBWSxDQUFRO29CQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFRO2dCQUFHLENBQUM7Z0JBRTFFLHNCQUFJLGdDQUFJO3lCQUFSLGNBQWEsTUFBTSxDQUFJLElBQUksQ0FBQyxZQUFZLFNBQUksSUFBSSxDQUFDLGNBQWdCLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQ3RFLHFCQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFKRCwyQ0FJQyxDQUFBO1lBRUQ7Z0JBY0UseUJBQVksRUFjTjt3QkFkTSw0QkFjTixFQWRPLGtDQUFjLEVBQUUsOENBQW9CLEVBQUUsb0RBQXVCLEVBQUUsd0NBQWlCLEVBQ2hGLDhDQUFvQixFQUFFLGdDQUFhLEVBQUUsNEJBQVcsRUFBRSwwQkFBVSxFQUFFLGdDQUFhLEVBQzNFLG9DQUFlLEVBQUUsb0JBQU87b0JBYW5DLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO29CQUNyQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsb0JBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO29CQUNoRSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsb0JBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO29CQUN0RSxJQUFJLENBQUMsYUFBYSxHQUFHLG9CQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2xELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxvQkFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQzFELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7b0JBQ2hFLElBQUksQ0FBQyxXQUFXLEdBQUcsb0JBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLG9CQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2xELElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO29CQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDekIsQ0FBQztnQkFFRCxrREFBd0IsR0FBeEI7b0JBQ0UsTUFBTSxDQUFDLDRDQUFnQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDaEUsQ0FBQztnQkFDSCxzQkFBQztZQUFELENBN0NBLEFBNkNDLElBQUE7WUE3Q0QsNkNBNkNDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2RpcmVjdGl2ZV9yZWNvcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0cmluZ1dyYXBwZXIsIG5vcm1hbGl6ZUJvb2wsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge2lzRGVmYXVsdENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgY2xhc3MgRGlyZWN0aXZlSW5kZXgge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudEluZGV4OiBudW1iZXIsIHB1YmxpYyBkaXJlY3RpdmVJbmRleDogbnVtYmVyKSB7fVxuXG4gIGdldCBuYW1lKCkgeyByZXR1cm4gYCR7dGhpcy5lbGVtZW50SW5kZXh9XyR7dGhpcy5kaXJlY3RpdmVJbmRleH1gOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaXJlY3RpdmVSZWNvcmQge1xuICBkaXJlY3RpdmVJbmRleDogRGlyZWN0aXZlSW5kZXg7XG4gIGNhbGxBZnRlckNvbnRlbnRJbml0OiBib29sZWFuO1xuICBjYWxsQWZ0ZXJDb250ZW50Q2hlY2tlZDogYm9vbGVhbjtcbiAgY2FsbEFmdGVyVmlld0luaXQ6IGJvb2xlYW47XG4gIGNhbGxBZnRlclZpZXdDaGVja2VkOiBib29sZWFuO1xuICBjYWxsT25DaGFuZ2VzOiBib29sZWFuO1xuICBjYWxsRG9DaGVjazogYm9vbGVhbjtcbiAgY2FsbE9uSW5pdDogYm9vbGVhbjtcbiAgY2FsbE9uRGVzdHJveTogYm9vbGVhbjtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneTtcbiAgLy8gYXJyYXkgb2YgW2VtaXR0ZXIgcHJvcGVydHkgbmFtZSwgZXZlbnROYW1lXVxuICBvdXRwdXRzOiBzdHJpbmdbXVtdO1xuXG4gIGNvbnN0cnVjdG9yKHtkaXJlY3RpdmVJbmRleCwgY2FsbEFmdGVyQ29udGVudEluaXQsIGNhbGxBZnRlckNvbnRlbnRDaGVja2VkLCBjYWxsQWZ0ZXJWaWV3SW5pdCxcbiAgICAgICAgICAgICAgIGNhbGxBZnRlclZpZXdDaGVja2VkLCBjYWxsT25DaGFuZ2VzLCBjYWxsRG9DaGVjaywgY2FsbE9uSW5pdCwgY2FsbE9uRGVzdHJveSxcbiAgICAgICAgICAgICAgIGNoYW5nZURldGVjdGlvbiwgb3V0cHV0c306IHtcbiAgICBkaXJlY3RpdmVJbmRleD86IERpcmVjdGl2ZUluZGV4LFxuICAgIGNhbGxBZnRlckNvbnRlbnRJbml0PzogYm9vbGVhbixcbiAgICBjYWxsQWZ0ZXJDb250ZW50Q2hlY2tlZD86IGJvb2xlYW4sXG4gICAgY2FsbEFmdGVyVmlld0luaXQ/OiBib29sZWFuLFxuICAgIGNhbGxBZnRlclZpZXdDaGVja2VkPzogYm9vbGVhbixcbiAgICBjYWxsT25DaGFuZ2VzPzogYm9vbGVhbixcbiAgICBjYWxsRG9DaGVjaz86IGJvb2xlYW4sXG4gICAgY2FsbE9uSW5pdD86IGJvb2xlYW4sXG4gICAgY2FsbE9uRGVzdHJveT86IGJvb2xlYW4sXG4gICAgY2hhbmdlRGV0ZWN0aW9uPzogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgb3V0cHV0cz86IHN0cmluZ1tdW11cbiAgfSA9IHt9KSB7XG4gICAgdGhpcy5kaXJlY3RpdmVJbmRleCA9IGRpcmVjdGl2ZUluZGV4O1xuICAgIHRoaXMuY2FsbEFmdGVyQ29udGVudEluaXQgPSBub3JtYWxpemVCb29sKGNhbGxBZnRlckNvbnRlbnRJbml0KTtcbiAgICB0aGlzLmNhbGxBZnRlckNvbnRlbnRDaGVja2VkID0gbm9ybWFsaXplQm9vbChjYWxsQWZ0ZXJDb250ZW50Q2hlY2tlZCk7XG4gICAgdGhpcy5jYWxsT25DaGFuZ2VzID0gbm9ybWFsaXplQm9vbChjYWxsT25DaGFuZ2VzKTtcbiAgICB0aGlzLmNhbGxBZnRlclZpZXdJbml0ID0gbm9ybWFsaXplQm9vbChjYWxsQWZ0ZXJWaWV3SW5pdCk7XG4gICAgdGhpcy5jYWxsQWZ0ZXJWaWV3Q2hlY2tlZCA9IG5vcm1hbGl6ZUJvb2woY2FsbEFmdGVyVmlld0NoZWNrZWQpO1xuICAgIHRoaXMuY2FsbERvQ2hlY2sgPSBub3JtYWxpemVCb29sKGNhbGxEb0NoZWNrKTtcbiAgICB0aGlzLmNhbGxPbkluaXQgPSBub3JtYWxpemVCb29sKGNhbGxPbkluaXQpO1xuICAgIHRoaXMuY2FsbE9uRGVzdHJveSA9IG5vcm1hbGl6ZUJvb2woY2FsbE9uRGVzdHJveSk7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rpb24gPSBjaGFuZ2VEZXRlY3Rpb247XG4gICAgdGhpcy5vdXRwdXRzID0gb3V0cHV0cztcbiAgfVxuXG4gIGlzRGVmYXVsdENoYW5nZURldGVjdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kodGhpcy5jaGFuZ2VEZXRlY3Rpb24pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
