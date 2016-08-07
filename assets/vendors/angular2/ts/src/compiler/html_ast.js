System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var HtmlTextAst, HtmlExpansionAst, HtmlExpansionCaseAst, HtmlAttrAst, HtmlElementAst, HtmlCommentAst;
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
            HtmlExpansionAst = (function () {
                function HtmlExpansionAst(switchValue, type, cases, sourceSpan, switchValueSourceSpan) {
                    this.switchValue = switchValue;
                    this.type = type;
                    this.cases = cases;
                    this.sourceSpan = sourceSpan;
                    this.switchValueSourceSpan = switchValueSourceSpan;
                }
                HtmlExpansionAst.prototype.visit = function (visitor, context) {
                    return visitor.visitExpansion(this, context);
                };
                return HtmlExpansionAst;
            }());
            exports_1("HtmlExpansionAst", HtmlExpansionAst);
            HtmlExpansionCaseAst = (function () {
                function HtmlExpansionCaseAst(value, expression, sourceSpan, valueSourceSpan, expSourceSpan) {
                    this.value = value;
                    this.expression = expression;
                    this.sourceSpan = sourceSpan;
                    this.valueSourceSpan = valueSourceSpan;
                    this.expSourceSpan = expSourceSpan;
                }
                HtmlExpansionCaseAst.prototype.visit = function (visitor, context) {
                    return visitor.visitExpansionCase(this, context);
                };
                return HtmlExpansionCaseAst;
            }());
            exports_1("HtmlExpansionCaseAst", HtmlExpansionCaseAst);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9odG1sX2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztJQTBEQSxzQkFBNkIsT0FBdUIsRUFBRSxJQUFlLEVBQUUsT0FBbUI7UUFBbkIsdUJBQW1CLEdBQW5CLGNBQW1CO1FBQ3hGLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUNkLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3pCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQVRELHVDQVNDLENBQUE7Ozs7Ozs7WUExREQ7Z0JBQ0UscUJBQW1CLEtBQWEsRUFBUyxVQUEyQjtvQkFBakQsVUFBSyxHQUFMLEtBQUssQ0FBUTtvQkFBUyxlQUFVLEdBQVYsVUFBVSxDQUFpQjtnQkFBRyxDQUFDO2dCQUN4RSwyQkFBSyxHQUFMLFVBQU0sT0FBdUIsRUFBRSxPQUFZLElBQVMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEcsa0JBQUM7WUFBRCxDQUhBLEFBR0MsSUFBQTtZQUhELHFDQUdDLENBQUE7WUFFRDtnQkFDRSwwQkFBbUIsV0FBbUIsRUFBUyxJQUFZLEVBQVMsS0FBNkIsRUFDOUUsVUFBMkIsRUFBUyxxQkFBc0M7b0JBRDFFLGdCQUFXLEdBQVgsV0FBVyxDQUFRO29CQUFTLFNBQUksR0FBSixJQUFJLENBQVE7b0JBQVMsVUFBSyxHQUFMLEtBQUssQ0FBd0I7b0JBQzlFLGVBQVUsR0FBVixVQUFVLENBQWlCO29CQUFTLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBaUI7Z0JBQUcsQ0FBQztnQkFDakcsZ0NBQUssR0FBTCxVQUFNLE9BQXVCLEVBQUUsT0FBWTtvQkFDekMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUMvQyxDQUFDO2dCQUNILHVCQUFDO1lBQUQsQ0FOQSxBQU1DLElBQUE7WUFORCwrQ0FNQyxDQUFBO1lBRUQ7Z0JBQ0UsOEJBQW1CLEtBQWEsRUFBUyxVQUFxQixFQUMzQyxVQUEyQixFQUFTLGVBQWdDLEVBQ3BFLGFBQThCO29CQUY5QixVQUFLLEdBQUwsS0FBSyxDQUFRO29CQUFTLGVBQVUsR0FBVixVQUFVLENBQVc7b0JBQzNDLGVBQVUsR0FBVixVQUFVLENBQWlCO29CQUFTLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtvQkFDcEUsa0JBQWEsR0FBYixhQUFhLENBQWlCO2dCQUFHLENBQUM7Z0JBRXJELG9DQUFLLEdBQUwsVUFBTSxPQUF1QixFQUFFLE9BQVk7b0JBQ3pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNuRCxDQUFDO2dCQUNILDJCQUFDO1lBQUQsQ0FSQSxBQVFDLElBQUE7WUFSRCx1REFRQyxDQUFBO1lBRUQ7Z0JBQ0UscUJBQW1CLElBQVksRUFBUyxLQUFhLEVBQVMsVUFBMkI7b0JBQXRFLFNBQUksR0FBSixJQUFJLENBQVE7b0JBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtvQkFBUyxlQUFVLEdBQVYsVUFBVSxDQUFpQjtnQkFBRyxDQUFDO2dCQUM3RiwyQkFBSyxHQUFMLFVBQU0sT0FBdUIsRUFBRSxPQUFZLElBQVMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEcsa0JBQUM7WUFBRCxDQUhBLEFBR0MsSUFBQTtZQUhELHFDQUdDLENBQUE7WUFFRDtnQkFDRSx3QkFBbUIsSUFBWSxFQUFTLEtBQW9CLEVBQVMsUUFBbUIsRUFDckUsVUFBMkIsRUFBUyxlQUFnQyxFQUNwRSxhQUE4QjtvQkFGOUIsU0FBSSxHQUFKLElBQUksQ0FBUTtvQkFBUyxVQUFLLEdBQUwsS0FBSyxDQUFlO29CQUFTLGFBQVEsR0FBUixRQUFRLENBQVc7b0JBQ3JFLGVBQVUsR0FBVixVQUFVLENBQWlCO29CQUFTLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtvQkFDcEUsa0JBQWEsR0FBYixhQUFhLENBQWlCO2dCQUFHLENBQUM7Z0JBQ3JELDhCQUFLLEdBQUwsVUFBTSxPQUF1QixFQUFFLE9BQVksSUFBUyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRyxxQkFBQztZQUFELENBTEEsQUFLQyxJQUFBO1lBTEQsMkNBS0MsQ0FBQTtZQUVEO2dCQUNFLHdCQUFtQixLQUFhLEVBQVMsVUFBMkI7b0JBQWpELFVBQUssR0FBTCxLQUFLLENBQVE7b0JBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7Z0JBQUcsQ0FBQztnQkFDeEUsOEJBQUssR0FBTCxVQUFNLE9BQXVCLEVBQUUsT0FBWSxJQUFTLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25HLHFCQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCwyQ0FHQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9odG1sX2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5pbXBvcnQge1BhcnNlU291cmNlU3Bhbn0gZnJvbSAnLi9wYXJzZV91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBIdG1sQXN0IHtcbiAgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuO1xuICB2aXNpdCh2aXNpdG9yOiBIdG1sQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgSHRtbFRleHRBc3QgaW1wbGVtZW50cyBIdG1sQXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBzdHJpbmcsIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG4gIHZpc2l0KHZpc2l0b3I6IEh0bWxBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdFRleHQodGhpcywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEh0bWxFeHBhbnNpb25Bc3QgaW1wbGVtZW50cyBIdG1sQXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHN3aXRjaFZhbHVlOiBzdHJpbmcsIHB1YmxpYyB0eXBlOiBzdHJpbmcsIHB1YmxpYyBjYXNlczogSHRtbEV4cGFuc2lvbkNhc2VBc3RbXSxcbiAgICAgICAgICAgICAgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgcHVibGljIHN3aXRjaFZhbHVlU291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBIdG1sQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEV4cGFuc2lvbih0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSHRtbEV4cGFuc2lvbkNhc2VBc3QgaW1wbGVtZW50cyBIdG1sQXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBzdHJpbmcsIHB1YmxpYyBleHByZXNzaW9uOiBIdG1sQXN0W10sXG4gICAgICAgICAgICAgIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyB2YWx1ZVNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbixcbiAgICAgICAgICAgICAgcHVibGljIGV4cFNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cblxuICB2aXNpdCh2aXNpdG9yOiBIdG1sQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEV4cGFuc2lvbkNhc2UodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEh0bWxBdHRyQXN0IGltcGxlbWVudHMgSHRtbEFzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB2YWx1ZTogc3RyaW5nLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBIdG1sQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRBdHRyKHRoaXMsIGNvbnRleHQpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBIdG1sRWxlbWVudEFzdCBpbXBsZW1lbnRzIEh0bWxBc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgYXR0cnM6IEh0bWxBdHRyQXN0W10sIHB1YmxpYyBjaGlsZHJlbjogSHRtbEFzdFtdLFxuICAgICAgICAgICAgICBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLCBwdWJsaWMgc3RhcnRTb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4sXG4gICAgICAgICAgICAgIHB1YmxpYyBlbmRTb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG4gIHZpc2l0KHZpc2l0b3I6IEh0bWxBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdEVsZW1lbnQodGhpcywgY29udGV4dCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEh0bWxDb21tZW50QXN0IGltcGxlbWVudHMgSHRtbEFzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogc3RyaW5nLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBIdG1sQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRDb21tZW50KHRoaXMsIGNvbnRleHQpOyB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSHRtbEFzdFZpc2l0b3Ige1xuICB2aXNpdEVsZW1lbnQoYXN0OiBIdG1sRWxlbWVudEFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEF0dHIoYXN0OiBIdG1sQXR0ckFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFRleHQoYXN0OiBIdG1sVGV4dEFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdENvbW1lbnQoYXN0OiBIdG1sQ29tbWVudEFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEV4cGFuc2lvbihhc3Q6IEh0bWxFeHBhbnNpb25Bc3QsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRFeHBhbnNpb25DYXNlKGFzdDogSHRtbEV4cGFuc2lvbkNhc2VBc3QsIGNvbnRleHQ6IGFueSk6IGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGh0bWxWaXNpdEFsbCh2aXNpdG9yOiBIdG1sQXN0VmlzaXRvciwgYXN0czogSHRtbEFzdFtdLCBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55W10ge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGFzdHMuZm9yRWFjaChhc3QgPT4ge1xuICAgIHZhciBhc3RSZXN1bHQgPSBhc3QudmlzaXQodmlzaXRvciwgY29udGV4dCk7XG4gICAgaWYgKGlzUHJlc2VudChhc3RSZXN1bHQpKSB7XG4gICAgICByZXN1bHQucHVzaChhc3RSZXN1bHQpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
