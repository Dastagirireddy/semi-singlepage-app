System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var HtmlTextAst, HtmlAttrAst, HtmlElementAst, HtmlCommentAst;
    function htmlVisitAll(visitor, asts, context) {
        if (context === void 0) { context = null; }
        var result = [];
        asts.forEach(function (ast) {
            var astResult = ast.visit(visitor, context);
            if (lang_1.isPresent(astResult)) {
                result.push(astResult);
            }
        });
        return result;
    }
    exports_1("htmlVisitAll", htmlVisitAll);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            HtmlTextAst = (function () {
                function HtmlTextAst(value, sourceSpan) {
                    this.value = value;
                    this.sourceSpan = sourceSpan;
                }
                HtmlTextAst.prototype.visit = function (visitor, context) { return visitor.visitText(this, context); };
                return HtmlTextAst;
            }());
            exports_1("HtmlTextAst", HtmlTextAst);
            HtmlAttrAst = (function () {
                function HtmlAttrAst(name, value, sourceSpan) {
                    this.name = name;
                    this.value = value;
                    this.sourceSpan = sourceSpan;
                }
                HtmlAttrAst.prototype.visit = function (visitor, context) { return visitor.visitAttr(this, context); };
                return HtmlAttrAst;
            }());
            exports_1("HtmlAttrAst", HtmlAttrAst);
            HtmlElementAst = (function () {
                function HtmlElementAst(name, attrs, children, sourceSpan, startSourceSpan, endSourceSpan) {
                    this.name = name;
                    this.attrs = attrs;
                    this.children = children;
                    this.sourceSpan = sourceSpan;
                    this.startSourceSpan = startSourceSpan;
                    this.endSourceSpan = endSourceSpan;
                }
                HtmlElementAst.prototype.visit = function (visitor, context) { return visitor.visitElement(this, context); };
                return HtmlElementAst;
            }());
            exports_1("HtmlElementAst", HtmlElementAst);
            HtmlCommentAst = (function () {
                function HtmlCommentAst(value, sourceSpan) {
                    this.value = value;
                    this.sourceSpan = sourceSpan;
                }
                HtmlCommentAst.prototype.visit = function (visitor, context) { return visitor.visitComment(this, context); };
                return HtmlCommentAst;
            }());
            exports_1("HtmlCommentAst", HtmlCommentAst);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2h0bWxfYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0lBc0NBLHNCQUE2QixPQUF1QixFQUFFLElBQWUsRUFBRSxPQUFtQjtRQUFuQix1QkFBbUIsR0FBbkIsY0FBbUI7UUFDeEYsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ2QsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDNUMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBVEQsdUNBU0MsQ0FBQTs7Ozs7OztZQXRDRDtnQkFDRSxxQkFBbUIsS0FBYSxFQUFTLFVBQTJCO29CQUFqRCxVQUFLLEdBQUwsS0FBSyxDQUFRO29CQUFTLGVBQVUsR0FBVixVQUFVLENBQWlCO2dCQUFHLENBQUM7Z0JBQ3hFLDJCQUFLLEdBQUwsVUFBTSxPQUF1QixFQUFFLE9BQVksSUFBUyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRyxrQkFBQztZQUFELENBSEEsQUFHQyxJQUFBO1lBSEQscUNBR0MsQ0FBQTtZQUVEO2dCQUNFLHFCQUFtQixJQUFZLEVBQVMsS0FBYSxFQUFTLFVBQTJCO29CQUF0RSxTQUFJLEdBQUosSUFBSSxDQUFRO29CQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7b0JBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7Z0JBQUcsQ0FBQztnQkFDN0YsMkJBQUssR0FBTCxVQUFNLE9BQXVCLEVBQUUsT0FBWSxJQUFTLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hHLGtCQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCxxQ0FHQyxDQUFBO1lBRUQ7Z0JBQ0Usd0JBQW1CLElBQVksRUFBUyxLQUFvQixFQUFTLFFBQW1CLEVBQ3JFLFVBQTJCLEVBQVMsZUFBZ0MsRUFDcEUsYUFBOEI7b0JBRjlCLFNBQUksR0FBSixJQUFJLENBQVE7b0JBQVMsVUFBSyxHQUFMLEtBQUssQ0FBZTtvQkFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO29CQUNyRSxlQUFVLEdBQVYsVUFBVSxDQUFpQjtvQkFBUyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7b0JBQ3BFLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtnQkFBRyxDQUFDO2dCQUNyRCw4QkFBSyxHQUFMLFVBQU0sT0FBdUIsRUFBRSxPQUFZLElBQVMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkcscUJBQUM7WUFBRCxDQUxBLEFBS0MsSUFBQTtZQUxELDJDQUtDLENBQUE7WUFFRDtnQkFDRSx3QkFBbUIsS0FBYSxFQUFTLFVBQTJCO29CQUFqRCxVQUFLLEdBQUwsS0FBSyxDQUFRO29CQUFTLGVBQVUsR0FBVixVQUFVLENBQWlCO2dCQUFHLENBQUM7Z0JBQ3hFLDhCQUFLLEdBQUwsVUFBTSxPQUF1QixFQUFFLE9BQVksSUFBUyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRyxxQkFBQztZQUFELENBSEEsQUFHQyxJQUFBO1lBSEQsMkNBR0MsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9odG1sX2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5pbXBvcnQge1BhcnNlU291cmNlU3Bhbn0gZnJvbSAnLi9wYXJzZV91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBIdG1sQXN0IHtcbiAgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuO1xuICB2aXNpdCh2aXNpdG9yOiBIdG1sQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgSHRtbFRleHRBc3QgaW1wbGVtZW50cyBIdG1sQXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBzdHJpbmcsIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG4gIHZpc2l0KHZpc2l0b3I6IEh0bWxBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdFRleHQodGhpcywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEh0bWxBdHRyQXN0IGltcGxlbWVudHMgSHRtbEFzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB2YWx1ZTogc3RyaW5nLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBIdG1sQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRBdHRyKHRoaXMsIGNvbnRleHQpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBIdG1sRWxlbWVudEFzdCBpbXBsZW1lbnRzIEh0bWxBc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgYXR0cnM6IEh0bWxBdHRyQXN0W10sIHB1YmxpYyBjaGlsZHJlbjogSHRtbEFzdFtdLFxuICAgICAgICAgICAgICBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgc3RhcnRTb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgIHB1YmxpYyBlbmRTb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG4gIHZpc2l0KHZpc2l0b3I6IEh0bWxBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdEVsZW1lbnQodGhpcywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEh0bWxDb21tZW50QXN0IGltcGxlbWVudHMgSHRtbEFzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogc3RyaW5nLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBIdG1sQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRDb21tZW50KHRoaXMsIGNvbnRleHQpOyB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSHRtbEFzdFZpc2l0b3Ige1xuICB2aXNpdEVsZW1lbnQoYXN0OiBIdG1sRWxlbWVudEFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEF0dHIoYXN0OiBIdG1sQXR0ckFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFRleHQoYXN0OiBIdG1sVGV4dEFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdENvbW1lbnQoYXN0OiBIdG1sQ29tbWVudEFzdCwgY29udGV4dDogYW55KTogYW55O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHRtbFZpc2l0QWxsKHZpc2l0b3I6IEh0bWxBc3RWaXNpdG9yLCBhc3RzOiBIdG1sQXN0W10sIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnlbXSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgYXN0cy5mb3JFYWNoKGFzdCA9PiB7XG4gICAgdmFyIGFzdFJlc3VsdCA9IGFzdC52aXNpdCh2aXNpdG9yLCBjb250ZXh0KTtcbiAgICBpZiAoaXNQcmVzZW50KGFzdFJlc3VsdCkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGFzdFJlc3VsdCk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
