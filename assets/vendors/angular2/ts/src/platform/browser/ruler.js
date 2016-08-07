System.register(['angular2/src/facade/async'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var async_1;
    var Rectangle, Ruler;
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            Rectangle = (function () {
                function Rectangle(left, top, width, height) {
                    this.left = left;
                    this.right = left + width;
                    this.top = top;
                    this.bottom = top + height;
                    this.height = height;
                    this.width = width;
                }
                return Rectangle;
            }());
            exports_1("Rectangle", Rectangle);
            Ruler = (function () {
                function Ruler(domAdapter) {
                    this.domAdapter = domAdapter;
                }
                Ruler.prototype.measure = function (el) {
                    var clntRect = this.domAdapter.getBoundingClientRect(el.nativeElement);
                    // even if getBoundingClientRect is synchronous we use async API in preparation for further
                    // changes
                    return async_1.PromiseWrapper.resolve(new Rectangle(clntRect.left, clntRect.top, clntRect.width, clntRect.height));
                };
                return Ruler;
            }());
            exports_1("Ruler", Ruler);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL3J1bGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBSUE7Z0JBT0UsbUJBQVksSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTTtvQkFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztvQkFDMUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7b0JBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO29CQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQkFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLENBQUM7Z0JBQ0gsZ0JBQUM7WUFBRCxDQWZBLEFBZUMsSUFBQTtZQWZELGlDQWVDLENBQUE7WUFFRDtnQkFFRSxlQUFZLFVBQXNCO29CQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO2dCQUFDLENBQUM7Z0JBRXJFLHVCQUFPLEdBQVAsVUFBUSxFQUFjO29CQUNwQixJQUFJLFFBQVEsR0FBUSxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFFNUUsMkZBQTJGO29CQUMzRixVQUFVO29CQUNWLE1BQU0sQ0FBQyxzQkFBYyxDQUFDLE9BQU8sQ0FDekIsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ25GLENBQUM7Z0JBQ0gsWUFBQztZQUFELENBWkEsQUFZQyxJQUFBO1lBWkQseUJBWUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vYnJvd3Nlci9ydWxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtEb21BZGFwdGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcbmltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2VsZW1lbnRfcmVmJztcblxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSB7XG4gIGxlZnQ7XG4gIHJpZ2h0O1xuICB0b3A7XG4gIGJvdHRvbTtcbiAgaGVpZ2h0O1xuICB3aWR0aDtcbiAgY29uc3RydWN0b3IobGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gbGVmdCArIHdpZHRoO1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMuYm90dG9tID0gdG9wICsgaGVpZ2h0O1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUnVsZXIge1xuICBkb21BZGFwdGVyOiBEb21BZGFwdGVyO1xuICBjb25zdHJ1Y3Rvcihkb21BZGFwdGVyOiBEb21BZGFwdGVyKSB7IHRoaXMuZG9tQWRhcHRlciA9IGRvbUFkYXB0ZXI7IH1cblxuICBtZWFzdXJlKGVsOiBFbGVtZW50UmVmKTogUHJvbWlzZTxSZWN0YW5nbGU+IHtcbiAgICB2YXIgY2xudFJlY3QgPSA8YW55PnRoaXMuZG9tQWRhcHRlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoZWwubmF0aXZlRWxlbWVudCk7XG5cbiAgICAvLyBldmVuIGlmIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpcyBzeW5jaHJvbm91cyB3ZSB1c2UgYXN5bmMgQVBJIGluIHByZXBhcmF0aW9uIGZvciBmdXJ0aGVyXG4gICAgLy8gY2hhbmdlc1xuICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5yZXNvbHZlKFxuICAgICAgICBuZXcgUmVjdGFuZ2xlKGNsbnRSZWN0LmxlZnQsIGNsbnRSZWN0LnRvcCwgY2xudFJlY3Qud2lkdGgsIGNsbnRSZWN0LmhlaWdodCkpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
