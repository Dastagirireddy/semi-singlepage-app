System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var TextAst, BoundTextAst, AttrAst, BoundElementPropertyAst, BoundEventAst, VariableAst, ElementAst, EmbeddedTemplateAst, BoundDirectivePropertyAst, DirectiveAst, NgContentAst, PropertyBindingType;
    /**
     * Visit every node in a list of {@link TemplateAst}s with the given {@link TemplateAstVisitor}.
     */
    function templateVisitAll(visitor, asts, context) {
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
    exports_1("templateVisitAll", templateVisitAll);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * A segment of text within the template.
             */
            TextAst = (function () {
                function TextAst(value, ngContentIndex, sourceSpan) {
                    this.value = value;
                    this.ngContentIndex = ngContentIndex;
                    this.sourceSpan = sourceSpan;
                }
                TextAst.prototype.visit = function (visitor, context) { return visitor.visitText(this, context); };
                return TextAst;
            }());
            exports_1("TextAst", TextAst);
            /**
             * A bound expression within the text of a template.
             */
            BoundTextAst = (function () {
                function BoundTextAst(value, ngContentIndex, sourceSpan) {
                    this.value = value;
                    this.ngContentIndex = ngContentIndex;
                    this.sourceSpan = sourceSpan;
                }
                BoundTextAst.prototype.visit = function (visitor, context) {
                    return visitor.visitBoundText(this, context);
                };
                return BoundTextAst;
            }());
            exports_1("BoundTextAst", BoundTextAst);
            /**
             * A plain attribute on an element.
             */
            AttrAst = (function () {
                function AttrAst(name, value, sourceSpan) {
                    this.name = name;
                    this.value = value;
                    this.sourceSpan = sourceSpan;
                }
                AttrAst.prototype.visit = function (visitor, context) { return visitor.visitAttr(this, context); };
                return AttrAst;
            }());
            exports_1("AttrAst", AttrAst);
            /**
             * A binding for an element property (e.g. `[property]="expression"`).
             */
            BoundElementPropertyAst = (function () {
                function BoundElementPropertyAst(name, type, value, unit, sourceSpan) {
                    this.name = name;
                    this.type = type;
                    this.value = value;
                    this.unit = unit;
                    this.sourceSpan = sourceSpan;
                }
                BoundElementPropertyAst.prototype.visit = function (visitor, context) {
                    return visitor.visitElementProperty(this, context);
                };
                return BoundElementPropertyAst;
            }());
            exports_1("BoundElementPropertyAst", BoundElementPropertyAst);
            /**
             * A binding for an element event (e.g. `(event)="handler()"`).
             */
            BoundEventAst = (function () {
                function BoundEventAst(name, target, handler, sourceSpan) {
                    this.name = name;
                    this.target = target;
                    this.handler = handler;
                    this.sourceSpan = sourceSpan;
                }
                BoundEventAst.prototype.visit = function (visitor, context) {
                    return visitor.visitEvent(this, context);
                };
                Object.defineProperty(BoundEventAst.prototype, "fullName", {
                    get: function () {
                        if (lang_1.isPresent(this.target)) {
                            return this.target + ":" + this.name;
                        }
                        else {
                            return this.name;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return BoundEventAst;
            }());
            exports_1("BoundEventAst", BoundEventAst);
            /**
             * A variable declaration on an element (e.g. `#var="expression"`).
             */
            VariableAst = (function () {
                function VariableAst(name, value, sourceSpan) {
                    this.name = name;
                    this.value = value;
                    this.sourceSpan = sourceSpan;
                }
                VariableAst.prototype.visit = function (visitor, context) {
                    return visitor.visitVariable(this, context);
                };
                return VariableAst;
            }());
            exports_1("VariableAst", VariableAst);
            /**
             * An element declaration in a template.
             */
            ElementAst = (function () {
                function ElementAst(name, attrs, inputs, outputs, exportAsVars, directives, children, ngContentIndex, sourceSpan) {
                    this.name = name;
                    this.attrs = attrs;
                    this.inputs = inputs;
                    this.outputs = outputs;
                    this.exportAsVars = exportAsVars;
                    this.directives = directives;
                    this.children = children;
                    this.ngContentIndex = ngContentIndex;
                    this.sourceSpan = sourceSpan;
                }
                ElementAst.prototype.visit = function (visitor, context) {
                    return visitor.visitElement(this, context);
                };
                /**
                 * Whether the element has any active bindings (inputs, outputs, vars, or directives).
                 */
                ElementAst.prototype.isBound = function () {
                    return (this.inputs.length > 0 || this.outputs.length > 0 || this.exportAsVars.length > 0 ||
                        this.directives.length > 0);
                };
                /**
                 * Get the component associated with this element, if any.
                 */
                ElementAst.prototype.getComponent = function () {
                    return this.directives.length > 0 && this.directives[0].directive.isComponent ?
                        this.directives[0].directive :
                        null;
                };
                return ElementAst;
            }());
            exports_1("ElementAst", ElementAst);
            /**
             * A `<template>` element included in an Angular template.
             */
            EmbeddedTemplateAst = (function () {
                function EmbeddedTemplateAst(attrs, outputs, vars, directives, children, ngContentIndex, sourceSpan) {
                    this.attrs = attrs;
                    this.outputs = outputs;
                    this.vars = vars;
                    this.directives = directives;
                    this.children = children;
                    this.ngContentIndex = ngContentIndex;
                    this.sourceSpan = sourceSpan;
                }
                EmbeddedTemplateAst.prototype.visit = function (visitor, context) {
                    return visitor.visitEmbeddedTemplate(this, context);
                };
                return EmbeddedTemplateAst;
            }());
            exports_1("EmbeddedTemplateAst", EmbeddedTemplateAst);
            /**
             * A directive property with a bound value (e.g. `*ngIf="condition").
             */
            BoundDirectivePropertyAst = (function () {
                function BoundDirectivePropertyAst(directiveName, templateName, value, sourceSpan) {
                    this.directiveName = directiveName;
                    this.templateName = templateName;
                    this.value = value;
                    this.sourceSpan = sourceSpan;
                }
                BoundDirectivePropertyAst.prototype.visit = function (visitor, context) {
                    return visitor.visitDirectiveProperty(this, context);
                };
                return BoundDirectivePropertyAst;
            }());
            exports_1("BoundDirectivePropertyAst", BoundDirectivePropertyAst);
            /**
             * A directive declared on an element.
             */
            DirectiveAst = (function () {
                function DirectiveAst(directive, inputs, hostProperties, hostEvents, exportAsVars, sourceSpan) {
                    this.directive = directive;
                    this.inputs = inputs;
                    this.hostProperties = hostProperties;
                    this.hostEvents = hostEvents;
                    this.exportAsVars = exportAsVars;
                    this.sourceSpan = sourceSpan;
                }
                DirectiveAst.prototype.visit = function (visitor, context) {
                    return visitor.visitDirective(this, context);
                };
                return DirectiveAst;
            }());
            exports_1("DirectiveAst", DirectiveAst);
            /**
             * Position where content is to be projected (instance of `<ng-content>` in a template).
             */
            NgContentAst = (function () {
                function NgContentAst(index, ngContentIndex, sourceSpan) {
                    this.index = index;
                    this.ngContentIndex = ngContentIndex;
                    this.sourceSpan = sourceSpan;
                }
                NgContentAst.prototype.visit = function (visitor, context) {
                    return visitor.visitNgContent(this, context);
                };
                return NgContentAst;
            }());
            exports_1("NgContentAst", NgContentAst);
            /**
             * Enumeration of types of property bindings.
             */
            (function (PropertyBindingType) {
                /**
                 * A normal binding to a property (e.g. `[property]="expression"`).
                 */
                PropertyBindingType[PropertyBindingType["Property"] = 0] = "Property";
                /**
                 * A binding to an element attribute (e.g. `[attr.name]="expression"`).
                 */
                PropertyBindingType[PropertyBindingType["Attribute"] = 1] = "Attribute";
                /**
                 * A binding to a CSS class (e.g. `[class.name]="condition"`).
                 */
                PropertyBindingType[PropertyBindingType["Class"] = 2] = "Class";
                /**
                 * A binding to a style rule (e.g. `[style.rule]="expression"`).
                 */
                PropertyBindingType[PropertyBindingType["Style"] = 3] = "Style";
            })(PropertyBindingType || (PropertyBindingType = {}));
            exports_1("PropertyBindingType", PropertyBindingType);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztJQWdOQTs7T0FFRztJQUNILDBCQUFpQyxPQUEyQixFQUFFLElBQW1CLEVBQ2hELE9BQW1CO1FBQW5CLHVCQUFtQixHQUFuQixjQUFtQjtRQUNsRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDZCxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM1QyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN6QixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFWRCwrQ0FVQyxDQUFBOzs7Ozs7O1lBek1EOztlQUVHO1lBQ0g7Z0JBQ0UsaUJBQW1CLEtBQWEsRUFBUyxjQUFzQixFQUM1QyxVQUEyQjtvQkFEM0IsVUFBSyxHQUFMLEtBQUssQ0FBUTtvQkFBUyxtQkFBYyxHQUFkLGNBQWMsQ0FBUTtvQkFDNUMsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7Z0JBQUcsQ0FBQztnQkFDbEQsdUJBQUssR0FBTCxVQUFNLE9BQTJCLEVBQUUsT0FBWSxJQUFTLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BHLGNBQUM7WUFBRCxDQUpBLEFBSUMsSUFBQTtZQUpELDZCQUlDLENBQUE7WUFFRDs7ZUFFRztZQUNIO2dCQUNFLHNCQUFtQixLQUFVLEVBQVMsY0FBc0IsRUFDekMsVUFBMkI7b0JBRDNCLFVBQUssR0FBTCxLQUFL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RztnQkFDSCwrREFBSyxDQUFBO1lBQ1AsQ0FBQyxFQXJCVyxtQkFBbUIsS0FBbkIsbUJBQW1CLFFBcUI5QjtrRUFBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci90ZW1wbGF0ZV9hc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FTVH0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmltcG9ydCB7aXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtDb21waWxlRGlyZWN0aXZlTWV0YWRhdGF9IGZyb20gJy4vZGlyZWN0aXZlX21ldGFkYXRhJztcbmltcG9ydCB7UGFyc2VTb3VyY2VTcGFufSBmcm9tICcuL3BhcnNlX3V0aWwnO1xuXG4vKipcbiAqIEFuIEFic3RyYWN0IFN5bnRheCBUcmVlIG5vZGUgcmVwcmVzZW50aW5nIHBhcnQgb2YgYSBwYXJzZWQgQW5ndWxhciB0ZW1wbGF0ZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZW1wbGF0ZUFzdCB7XG4gIC8qKlxuICAgKiBUaGUgc291cmNlIHNwYW4gZnJvbSB3aGljaCB0aGlzIG5vZGUgd2FzIHBhcnNlZC5cbiAgICovXG4gIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbjtcblxuICAvKipcbiAgICogVmlzaXQgdGhpcyBub2RlIGFuZCBwb3NzaWJseSB0cmFuc2Zvcm0gaXQuXG4gICAqL1xuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueTtcbn1cblxuLyoqXG4gKiBBIHNlZ21lbnQgb2YgdGV4dCB3aXRoaW4gdGhlIHRlbXBsYXRlLlxuICovXG5leHBvcnQgY2xhc3MgVGV4dEFzdCBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBzdHJpbmcsIHB1YmxpYyBuZ0NvbnRlbnRJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiB2aXNpdG9yLnZpc2l0VGV4dCh0aGlzLCBjb250ZXh0KTsgfVxufVxuXG4vKipcbiAqIEEgYm91bmQgZXhwcmVzc2lvbiB3aXRoaW4gdGhlIHRleHQgb2YgYSB0ZW1wbGF0ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEJvdW5kVGV4dEFzdCBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBBU1QsIHB1YmxpYyBuZ0NvbnRlbnRJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRCb3VuZFRleHQodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHBsYWluIGF0dHJpYnV0ZSBvbiBhbiBlbGVtZW50LlxuICovXG5leHBvcnQgY2xhc3MgQXR0ckFzdCBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIHZhbHVlOiBzdHJpbmcsIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG4gIHZpc2l0KHZpc2l0b3I6IFRlbXBsYXRlQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIHZpc2l0b3IudmlzaXRBdHRyKHRoaXMsIGNvbnRleHQpOyB9XG59XG5cbi8qKlxuICogQSBiaW5kaW5nIGZvciBhbiBlbGVtZW50IHByb3BlcnR5IChlLmcuIGBbcHJvcGVydHldPVwiZXhwcmVzc2lvblwiYCkuXG4gKi9cbmV4cG9ydCBjbGFzcyBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdCBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIHR5cGU6IFByb3BlcnR5QmluZGluZ1R5cGUsIHB1YmxpYyB2YWx1ZTogQVNULFxuICAgICAgICAgICAgICBwdWJsaWMgdW5pdDogc3RyaW5nLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRFbGVtZW50UHJvcGVydHkodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGJpbmRpbmcgZm9yIGFuIGVsZW1lbnQgZXZlbnQgKGUuZy4gYChldmVudCk9XCJoYW5kbGVyKClcImApLlxuICovXG5leHBvcnQgY2xhc3MgQm91bmRFdmVudEFzdCBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIHRhcmdldDogc3RyaW5nLCBwdWJsaWMgaGFuZGxlcjogQVNULFxuICAgICAgICAgICAgICBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRFdmVudCh0aGlzLCBjb250ZXh0KTtcbiAgfVxuICBnZXQgZnVsbE5hbWUoKSB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLnRhcmdldCkpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLnRhcmdldH06JHt0aGlzLm5hbWV9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBIHZhcmlhYmxlIGRlY2xhcmF0aW9uIG9uIGFuIGVsZW1lbnQgKGUuZy4gYCN2YXI9XCJleHByZXNzaW9uXCJgKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZhcmlhYmxlQXN0IGltcGxlbWVudHMgVGVtcGxhdGVBc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgdmFsdWU6IHN0cmluZywgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cbiAgdmlzaXQodmlzaXRvcjogVGVtcGxhdGVBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0VmFyaWFibGUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBlbGVtZW50IGRlY2xhcmF0aW9uIGluIGEgdGVtcGxhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBFbGVtZW50QXN0IGltcGxlbWVudHMgVGVtcGxhdGVBc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgYXR0cnM6IEF0dHJBc3RbXSxcbiAgICAgICAgICAgICAgcHVibGljIGlucHV0czogQm91bmRFbGVtZW50UHJvcGVydHlBc3RbXSwgcHVibGljIG91dHB1dHM6IEJvdW5kRXZlbnRBc3RbXSxcbiAgICAgICAgICAgICAgcHVibGljIGV4cG9ydEFzVmFyczogVmFyaWFibGVBc3RbXSwgcHVibGljIGRpcmVjdGl2ZXM6IERpcmVjdGl2ZUFzdFtdLFxuICAgICAgICAgICAgICBwdWJsaWMgY2hpbGRyZW46IFRlbXBsYXRlQXN0W10sIHB1YmxpYyBuZ0NvbnRlbnRJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXRFbGVtZW50KHRoaXMsIGNvbnRleHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGVsZW1lbnQgaGFzIGFueSBhY3RpdmUgYmluZGluZ3MgKGlucHV0cywgb3V0cHV0cywgdmFycywgb3IgZGlyZWN0aXZlcykuXG4gICAqL1xuICBpc0JvdW5kKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5pbnB1dHMubGVuZ3RoID4gMCB8fCB0aGlzLm91dHB1dHMubGVuZ3RoID4gMCB8fCB0aGlzLmV4cG9ydEFzVmFycy5sZW5ndGggPiAwIHx8XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGl2ZXMubGVuZ3RoID4gMCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb21wb25lbnQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZWxlbWVudCwgaWYgYW55LlxuICAgKi9cbiAgZ2V0Q29tcG9uZW50KCk6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSB7XG4gICAgcmV0dXJuIHRoaXMuZGlyZWN0aXZlcy5sZW5ndGggPiAwICYmIHRoaXMuZGlyZWN0aXZlc1swXS5kaXJlY3RpdmUuaXNDb21wb25lbnQgP1xuICAgICAgICAgICAgICAgdGhpcy5kaXJlY3RpdmVzWzBdLmRpcmVjdGl2ZSA6XG4gICAgICAgICAgICAgICBudWxsO1xuICB9XG59XG5cbi8qKlxuICogQSBgPHRlbXBsYXRlPmAgZWxlbWVudCBpbmNsdWRlZCBpbiBhbiBBbmd1bGFyIHRlbXBsYXRlLlxuICovXG5leHBvcnQgY2xhc3MgRW1iZWRkZWRUZW1wbGF0ZUFzdCBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGF0dHJzOiBBdHRyQXN0W10sIHB1YmxpYyBvdXRwdXRzOiBCb3VuZEV2ZW50QXN0W10sIHB1YmxpYyB2YXJzOiBWYXJpYWJsZUFzdFtdLFxuICAgICAgICAgICAgICBwdWJsaWMgZGlyZWN0aXZlczogRGlyZWN0aXZlQXN0W10sIHB1YmxpYyBjaGlsZHJlbjogVGVtcGxhdGVBc3RbXSxcbiAgICAgICAgICAgICAgcHVibGljIG5nQ29udGVudEluZGV4OiBudW1iZXIsIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG4gIHZpc2l0KHZpc2l0b3I6IFRlbXBsYXRlQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEVtYmVkZGVkVGVtcGxhdGUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSBwcm9wZXJ0eSB3aXRoIGEgYm91bmQgdmFsdWUgKGUuZy4gYCpuZ0lmPVwiY29uZGl0aW9uXCIpLlxuICovXG5leHBvcnQgY2xhc3MgQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGRpcmVjdGl2ZU5hbWU6IHN0cmluZywgcHVibGljIHRlbXBsYXRlTmFtZTogc3RyaW5nLCBwdWJsaWMgdmFsdWU6IEFTVCxcbiAgICAgICAgICAgICAgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cbiAgdmlzaXQodmlzaXRvcjogVGVtcGxhdGVBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RGlyZWN0aXZlUHJvcGVydHkodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSBkZWNsYXJlZCBvbiBhbiBlbGVtZW50LlxuICovXG5leHBvcnQgY2xhc3MgRGlyZWN0aXZlQXN0IGltcGxlbWVudHMgVGVtcGxhdGVBc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlyZWN0aXZlOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICAgICAgICAgIHB1YmxpYyBpbnB1dHM6IEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3RbXSxcbiAgICAgICAgICAgICAgcHVibGljIGhvc3RQcm9wZXJ0aWVzOiBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdFtdLCBwdWJsaWMgaG9zdEV2ZW50czogQm91bmRFdmVudEFzdFtdLFxuICAgICAgICAgICAgICBwdWJsaWMgZXhwb3J0QXNWYXJzOiBWYXJpYWJsZUFzdFtdLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXREaXJlY3RpdmUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBQb3NpdGlvbiB3aGVyZSBjb250ZW50IGlzIHRvIGJlIHByb2plY3RlZCAoaW5zdGFuY2Ugb2YgYDxuZy1jb250ZW50PmAgaW4gYSB0ZW1wbGF0ZSkuXG4gKi9cbmV4cG9ydCBjbGFzcyBOZ0NvbnRlbnRBc3QgaW1wbGVtZW50cyBUZW1wbGF0ZUFzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpbmRleDogbnVtYmVyLCBwdWJsaWMgbmdDb250ZW50SW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICAgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cbiAgdmlzaXQodmlzaXRvcjogVGVtcGxhdGVBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0TmdDb250ZW50KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbi8qKlxuICogRW51bWVyYXRpb24gb2YgdHlwZXMgb2YgcHJvcGVydHkgYmluZGluZ3MuXG4gKi9cbmV4cG9ydCBlbnVtIFByb3BlcnR5QmluZGluZ1R5cGUge1xuXG4gIC8qKlxuICAgKiBBIG5vcm1hbCBiaW5kaW5nIHRvIGEgcHJvcGVydHkgKGUuZy4gYFtwcm9wZXJ0eV09XCJleHByZXNzaW9uXCJgKS5cbiAgICovXG4gIFByb3BlcnR5LFxuXG4gIC8qKlxuICAgKiBBIGJpbmRpbmcgdG8gYW4gZWxlbWVudCBhdHRyaWJ1dGUgKGUuZy4gYFthdHRyLm5hbWVdPVwiZXhwcmVzc2lvblwiYCkuXG4gICAqL1xuICBBdHRyaWJ1dGUsXG5cbiAgLyoqXG4gICAqIEEgYmluZGluZyB0byBhIENTUyBjbGFzcyAoZS5nLiBgW2NsYXNzLm5hbWVdPVwiY29uZGl0aW9uXCJgKS5cbiAgICovXG4gIENsYXNzLFxuXG4gIC8qKlxuICAgKiBBIGJpbmRpbmcgdG8gYSBzdHlsZSBydWxlIChlLmcuIGBbc3R5bGUucnVsZV09XCJleHByZXNzaW9uXCJgKS5cbiAgICovXG4gIFN0eWxlXG59XG5cbi8qKlxuICogQSB2aXNpdG9yIGZvciB7QGxpbmsgVGVtcGxhdGVBc3R9IHRyZWVzIHRoYXQgd2lsbCBwcm9jZXNzIGVhY2ggbm9kZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUZW1wbGF0ZUFzdFZpc2l0b3Ige1xuICB2aXNpdE5nQ29udGVudChhc3Q6IE5nQ29udGVudEFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEVtYmVkZGVkVGVtcGxhdGUoYXN0OiBFbWJlZGRlZFRlbXBsYXRlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0RWxlbWVudChhc3Q6IEVsZW1lbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRWYXJpYWJsZShhc3Q6IFZhcmlhYmxlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0RXZlbnQoYXN0OiBCb3VuZEV2ZW50QXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0RWxlbWVudFByb3BlcnR5KGFzdDogQm91bmRFbGVtZW50UHJvcGVydHlBc3QsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRBdHRyKGFzdDogQXR0ckFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEJvdW5kVGV4dChhc3Q6IEJvdW5kVGV4dEFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdFRleHQoYXN0OiBUZXh0QXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0RGlyZWN0aXZlKGFzdDogRGlyZWN0aXZlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0RGlyZWN0aXZlUHJvcGVydHkoYXN0OiBCb3VuZERpcmVjdGl2ZVByb3BlcnR5QXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG59XG5cbi8qKlxuICogVmlzaXQgZXZlcnkgbm9kZSBpbiBhIGxpc3Qgb2Yge0BsaW5rIFRlbXBsYXRlQXN0fXMgd2l0aCB0aGUgZ2l2ZW4ge0BsaW5rIFRlbXBsYXRlQXN0VmlzaXRvcn0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZVZpc2l0QWxsKHZpc2l0b3I6IFRlbXBsYXRlQXN0VmlzaXRvciwgYXN0czogVGVtcGxhdGVBc3RbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IGFueSA9IG51bGwpOiBhbnlbXSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgYXN0cy5mb3JFYWNoKGFzdCA9PiB7XG4gICAgdmFyIGFzdFJlc3VsdCA9IGFzdC52aXNpdCh2aXNpdG9yLCBjb250ZXh0KTtcbiAgICBpZiAoaXNQcmVzZW50KGFzdFJlc3VsdCkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGFzdFJlc3VsdCk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
