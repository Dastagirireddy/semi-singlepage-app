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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvcnVsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7WUFJQTtnQkFPRSxtQkFBWSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNO29CQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO29CQUMxQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztvQkFDZixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7b0JBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDckIsQ0FBQztnQkFDSCxnQkFBQztZQUFELENBZkEsQUFlQyxJQUFBO1lBZkQsaUNBZUMsQ0FBQTtZQUVEO2dCQUVFLGVBQVksVUFBc0I7b0JBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7Z0JBQUMsQ0FBQztnQkFFckUsdUJBQU8sR0FBUCxVQUFRLEVBQWM7b0JBQ3BCLElBQUksUUFBUSxHQUFRLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUU1RSwyRkFBMkY7b0JBQzNGLFVBQVU7b0JBQ1YsTUFBTSxDQUFDLHNCQUFjLENBQUMsT0FBTyxDQUN6QixJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbkYsQ0FBQztnQkFDSCxZQUFDO1lBQUQsQ0FaQSxBQVlDLElBQUE7WUFaRCx5QkFZQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvcnVsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Byb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7RG9tQWRhcHRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9lbGVtZW50X3JlZic7XG5cbmV4cG9ydCBjbGFzcyBSZWN0YW5nbGUge1xuICBsZWZ0O1xuICByaWdodDtcbiAgdG9wO1xuICBib3R0b207XG4gIGhlaWdodDtcbiAgd2lkdGg7XG4gIGNvbnN0cnVjdG9yKGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IGxlZnQgKyB3aWR0aDtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IHRvcCArIGhlaWdodDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJ1bGVyIHtcbiAgZG9tQWRhcHRlcjogRG9tQWRhcHRlcjtcbiAgY29uc3RydWN0b3IoZG9tQWRhcHRlcjogRG9tQWRhcHRlcikgeyB0aGlzLmRvbUFkYXB0ZXIgPSBkb21BZGFwdGVyOyB9XG5cbiAgbWVhc3VyZShlbDogRWxlbWVudFJlZik6IFByb21pc2U8UmVjdGFuZ2xlPiB7XG4gICAgdmFyIGNsbnRSZWN0ID0gPGFueT50aGlzLmRvbUFkYXB0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgLy8gZXZlbiBpZiBnZXRCb3VuZGluZ0NsaWVudFJlY3QgaXMgc3luY2hyb25vdXMgd2UgdXNlIGFzeW5jIEFQSSBpbiBwcmVwYXJhdGlvbiBmb3IgZnVydGhlclxuICAgIC8vIGNoYW5nZXNcbiAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIucmVzb2x2ZShcbiAgICAgICAgbmV3IFJlY3RhbmdsZShjbG50UmVjdC5sZWZ0LCBjbG50UmVjdC50b3AsIGNsbnRSZWN0LndpZHRoLCBjbG50UmVjdC5oZWlnaHQpKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
