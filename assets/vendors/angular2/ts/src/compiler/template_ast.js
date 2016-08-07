System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var TextAst, BoundTextAst, AttrAst, BoundElementPropertyAst, BoundEventAst, ReferenceAst, VariableAst, ElementAst, EmbeddedTemplateAst, BoundDirectivePropertyAst, DirectiveAst, ProviderAst, ProviderAstType, NgContentAst, PropertyBindingType;
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
             * A reference declaration on an element (e.g. `let someName="expression"`).
             */
            ReferenceAst = (function () {
                function ReferenceAst(name, value, sourceSpan) {
                    this.name = name;
                    this.value = value;
                    this.sourceSpan = sourceSpan;
                }
                ReferenceAst.prototype.visit = function (visitor, context) {
                    return visitor.visitReference(this, context);
                };
                return ReferenceAst;
            }());
            exports_1("ReferenceAst", ReferenceAst);
            /**
             * A variable declaration on a <template> (e.g. `var-someName="someLocalName"`).
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
                function ElementAst(name, attrs, inputs, outputs, references, directives, providers, hasViewContainer, children, ngContentIndex, sourceSpan) {
                    this.name = name;
                    this.attrs = attrs;
                    this.inputs = inputs;
                    this.outputs = outputs;
                    this.references = references;
                    this.directives = directives;
                    this.providers = providers;
                    this.hasViewContainer = hasViewContainer;
                    this.children = children;
                    this.ngContentIndex = ngContentIndex;
                    this.sourceSpan = sourceSpan;
                }
                ElementAst.prototype.visit = function (visitor, context) {
                    return visitor.visitElement(this, context);
                };
                /**
                 * Get the component associated with this element, if any.
                 */
                ElementAst.prototype.getComponent = function () {
                    for (var i = 0; i < this.directives.length; i++) {
                        var dirAst = this.directives[i];
                        if (dirAst.directive.isComponent) {
                            return dirAst.directive;
                        }
                    }
                    return null;
                };
                return ElementAst;
            }());
            exports_1("ElementAst", ElementAst);
            /**
             * A `<template>` element included in an Angular template.
             */
            EmbeddedTemplateAst = (function () {
                function EmbeddedTemplateAst(attrs, outputs, references, variables, directives, providers, hasViewContainer, children, ngContentIndex, sourceSpan) {
                    this.attrs = attrs;
                    this.outputs = outputs;
                    this.references = references;
                    this.variables = variables;
                    this.directives = directives;
                    this.providers = providers;
                    this.hasViewContainer = hasViewContainer;
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
                function DirectiveAst(directive, inputs, hostProperties, hostEvents, sourceSpan) {
                    this.directive = directive;
                    this.inputs = inputs;
                    this.hostProperties = hostProperties;
                    this.hostEvents = hostEvents;
                    this.sourceSpan = sourceSpan;
                }
                DirectiveAst.prototype.visit = function (visitor, context) {
                    return visitor.visitDirective(this, context);
                };
                return DirectiveAst;
            }());
            exports_1("DirectiveAst", DirectiveAst);
            /**
             * A provider declared on an element
             */
            ProviderAst = (function () {
                function ProviderAst(token, multiProvider, eager, providers, providerType, sourceSpan) {
                    this.token = token;
                    this.multiProvider = multiProvider;
                    this.eager = eager;
                    this.providers = providers;
                    this.providerType = providerType;
                    this.sourceSpan = sourceSpan;
                }
                ProviderAst.prototype.visit = function (visitor, context) {
                    // No visit method in the visitor for now...
                    return null;
                };
                return ProviderAst;
            }());
            exports_1("ProviderAst", ProviderAst);
            (function (ProviderAstType) {
                ProviderAstType[ProviderAstType["PublicService"] = 0] = "PublicService";
                ProviderAstType[ProviderAstType["PrivateService"] = 1] = "PrivateService";
                ProviderAstType[ProviderAstType["Component"] = 2] = "Component";
                ProviderAstType[ProviderAstType["Directive"] = 3] = "Directive";
                ProviderAstType[ProviderAstType["Builtin"] = 4] = "Builtin";
            })(ProviderAstType || (ProviderAstType = {}));
            exports_1("ProviderAstType", ProviderAstType);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci90ZW1wbGF0ZV9hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUF5UEE7O09BRUc7SUFDSCwwQkFBaUMsT0FBMkIsRUFBRSxJQUFtQixFQUNoRCxPQUFtQjtRQUFuQix1QkFBbUIsR0FBbkIsY0FBbUI7UUFDbEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ2QsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDNUMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBVkQsK0NBVUMsQ0FBQTs7Ozs7OztZQTVPRDs7ZUFFRztZQUNIO2dCQUNFLGlCQUFtQixLQUFhLEVBQVMsY0FBc0IsRUFDNUMsVUFBMkI7b0JBRDNCLFVBQUssR0FBTCxLQUFLLENBQVE7b0JBQVMsbUJBQWMsR0FBZCxjQUFjLENBQVE7b0JBQzVDLGVBQVUsR0FBVixVQUFVLENBQWlCO2dCQUFHLENBQUM7Z0JBQ2xELHVCQUFLLEdBQUwsVUFBTSxPQUEyQixFQUFFLE9BQVksSUFBUyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRyxjQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFKRCw2QkFJQyxDQUFBO1lBRUQ7O2VBRUc7WUFDSDtnQkFDRSxzQkFBbUIsS0FBVSxFQUFTLGNBQXNCLEVBQ3pDLFVBQTJCO29CQUQzQixVQUFLLEdBQUwsS0FBSyxDQUFL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RUc7Z0JBQ0gsK0RBQUssQ0FBQTtnQkFFTDs7bUJBRUc7Z0JBQ0gsK0RBQUssQ0FBQTtZQUNQLENBQUMsRUFyQlcsbUJBQW1CLEtBQW5CLG1CQUFtQixRQXFCOUI7a0VBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL3RlbXBsYXRlX2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QVNUfSBmcm9tICcuL2V4cHJlc3Npb25fcGFyc2VyL2FzdCc7XG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7XG4gIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgQ29tcGlsZVRva2VuTWV0YWRhdGEsXG4gIENvbXBpbGVQcm92aWRlck1ldGFkYXRhLFxuICBDb21waWxlVG9rZW5NYXAsXG4gIENvbXBpbGVRdWVyeU1ldGFkYXRhXG59IGZyb20gJy4vY29tcGlsZV9tZXRhZGF0YSc7XG5pbXBvcnQge1BhcnNlU291cmNlU3Bhbn0gZnJvbSAnLi9wYXJzZV91dGlsJztcblxuLyoqXG4gKiBBbiBBYnN0cmFjdCBTeW50YXggVHJlZSBub2RlIHJlcHJlc2VudGluZyBwYXJ0IG9mIGEgcGFyc2VkIEFuZ3VsYXIgdGVtcGxhdGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVtcGxhdGVBc3Qge1xuICAvKipcbiAgICogVGhlIHNvdXJjZSBzcGFuIGZyb20gd2hpY2ggdGhpcyBub2RlIHdhcyBwYXJzZWQuXG4gICAqL1xuICBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW47XG5cbiAgLyoqXG4gICAqIFZpc2l0IHRoaXMgbm9kZSBhbmQgcG9zc2libHkgdHJhbnNmb3JtIGl0LlxuICAgKi9cbiAgdmlzaXQodmlzaXRvcjogVGVtcGxhdGVBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnk7XG59XG5cbi8qKlxuICogQSBzZWdtZW50IG9mIHRleHQgd2l0aGluIHRoZSB0ZW1wbGF0ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFRleHRBc3QgaW1wbGVtZW50cyBUZW1wbGF0ZUFzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogc3RyaW5nLCBwdWJsaWMgbmdDb250ZW50SW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICAgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cbiAgdmlzaXQodmlzaXRvcjogVGVtcGxhdGVBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gdmlzaXRvci52aXNpdFRleHQodGhpcywgY29udGV4dCk7IH1cbn1cblxuLyoqXG4gKiBBIGJvdW5kIGV4cHJlc3Npb24gd2l0aGluIHRoZSB0ZXh0IG9mIGEgdGVtcGxhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBCb3VuZFRleHRBc3QgaW1wbGVtZW50cyBUZW1wbGF0ZUFzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogQVNULCBwdWJsaWMgbmdDb250ZW50SW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICAgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cbiAgdmlzaXQodmlzaXRvcjogVGVtcGxhdGVBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0Qm91bmRUZXh0KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbi8qKlxuICogQSBwbGFpbiBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEF0dHJBc3QgaW1wbGVtZW50cyBUZW1wbGF0ZUFzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB2YWx1ZTogc3RyaW5nLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiB2aXNpdG9yLnZpc2l0QXR0cih0aGlzLCBjb250ZXh0KTsgfVxufVxuXG4vKipcbiAqIEEgYmluZGluZyBmb3IgYW4gZWxlbWVudCBwcm9wZXJ0eSAoZS5nLiBgW3Byb3BlcnR5XT1cImV4cHJlc3Npb25cImApLlxuICovXG5leHBvcnQgY2xhc3MgQm91bmRFbGVtZW50UHJvcGVydHlBc3QgaW1wbGVtZW50cyBUZW1wbGF0ZUFzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB0eXBlOiBQcm9wZXJ0eUJpbmRpbmdUeXBlLCBwdWJsaWMgdmFsdWU6IEFTVCxcbiAgICAgICAgICAgICAgcHVibGljIHVuaXQ6IHN0cmluZywgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cbiAgdmlzaXQodmlzaXRvcjogVGVtcGxhdGVBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RWxlbWVudFByb3BlcnR5KHRoaXMsIGNvbnRleHQpO1xuICB9XG59XG5cbi8qKlxuICogQSBiaW5kaW5nIGZvciBhbiBlbGVtZW50IGV2ZW50IChlLmcuIGAoZXZlbnQpPVwiaGFuZGxlcigpXCJgKS5cbiAqL1xuZXhwb3J0IGNsYXNzIEJvdW5kRXZlbnRBc3QgaW1wbGVtZW50cyBUZW1wbGF0ZUFzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB0YXJnZXQ6IHN0cmluZywgcHVibGljIGhhbmRsZXI6IEFTVCxcbiAgICAgICAgICAgICAgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cbiAgdmlzaXQodmlzaXRvcjogVGVtcGxhdGVBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RXZlbnQodGhpcywgY29udGV4dCk7XG4gIH1cbiAgZ2V0IGZ1bGxOYW1lKCkge1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy50YXJnZXQpKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy50YXJnZXR9OiR7dGhpcy5uYW1lfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQSByZWZlcmVuY2UgZGVjbGFyYXRpb24gb24gYW4gZWxlbWVudCAoZS5nLiBgbGV0IHNvbWVOYW1lPVwiZXhwcmVzc2lvblwiYCkuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWZlcmVuY2VBc3QgaW1wbGVtZW50cyBUZW1wbGF0ZUFzdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB2YWx1ZTogQ29tcGlsZVRva2VuTWV0YWRhdGEsXG4gICAgICAgICAgICAgIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG4gIHZpc2l0KHZpc2l0b3I6IFRlbXBsYXRlQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdFJlZmVyZW5jZSh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG4vKipcbiAqIEEgdmFyaWFibGUgZGVjbGFyYXRpb24gb24gYSA8dGVtcGxhdGU+IChlLmcuIGB2YXItc29tZU5hbWU9XCJzb21lTG9jYWxOYW1lXCJgKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFZhcmlhYmxlQXN0IGltcGxlbWVudHMgVGVtcGxhdGVBc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgdmFsdWU6IHN0cmluZywgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cbiAgdmlzaXQodmlzaXRvcjogVGVtcGxhdGVBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0VmFyaWFibGUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBlbGVtZW50IGRlY2xhcmF0aW9uIGluIGEgdGVtcGxhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBFbGVtZW50QXN0IGltcGxlbWVudHMgVGVtcGxhdGVBc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgYXR0cnM6IEF0dHJBc3RbXSxcbiAgICAgICAgICAgICAgcHVibGljIGlucHV0czogQm91bmRFbGVtZW50UHJvcGVydHlBc3RbXSwgcHVibGljIG91dHB1dHM6IEJvdW5kRXZlbnRBc3RbXSxcbiAgICAgICAgICAgICAgcHVibGljIHJlZmVyZW5jZXM6IFJlZmVyZW5jZUFzdFtdLCBwdWJsaWMgZGlyZWN0aXZlczogRGlyZWN0aXZlQXN0W10sXG4gICAgICAgICAgICAgIHB1YmxpYyBwcm92aWRlcnM6IFByb3ZpZGVyQXN0W10sIHB1YmxpYyBoYXNWaWV3Q29udGFpbmVyOiBib29sZWFuLFxuICAgICAgICAgICAgICBwdWJsaWMgY2hpbGRyZW46IFRlbXBsYXRlQXN0W10sIHB1YmxpYyBuZ0NvbnRlbnRJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuXG4gIHZpc2l0KHZpc2l0b3I6IFRlbXBsYXRlQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEVsZW1lbnQodGhpcywgY29udGV4dCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb21wb25lbnQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZWxlbWVudCwgaWYgYW55LlxuICAgKi9cbiAgZ2V0Q29tcG9uZW50KCk6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRpcmVjdGl2ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkaXJBc3QgPSB0aGlzLmRpcmVjdGl2ZXNbaV07XG4gICAgICBpZiAoZGlyQXN0LmRpcmVjdGl2ZS5pc0NvbXBvbmVudCkge1xuICAgICAgICByZXR1cm4gZGlyQXN0LmRpcmVjdGl2ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGA8dGVtcGxhdGU+YCBlbGVtZW50IGluY2x1ZGVkIGluIGFuIEFuZ3VsYXIgdGVtcGxhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBFbWJlZGRlZFRlbXBsYXRlQXN0IGltcGxlbWVudHMgVGVtcGxhdGVBc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgYXR0cnM6IEF0dHJBc3RbXSwgcHVibGljIG91dHB1dHM6IEJvdW5kRXZlbnRBc3RbXSxcbiAgICAgICAgICAgICAgcHVibGljIHJlZmVyZW5jZXM6IFJlZmVyZW5jZUFzdFtdLCBwdWJsaWMgdmFyaWFibGVzOiBWYXJpYWJsZUFzdFtdLFxuICAgICAgICAgICAgICBwdWJsaWMgZGlyZWN0aXZlczogRGlyZWN0aXZlQXN0W10sIHB1YmxpYyBwcm92aWRlcnM6IFByb3ZpZGVyQXN0W10sXG4gICAgICAgICAgICAgIHB1YmxpYyBoYXNWaWV3Q29udGFpbmVyOiBib29sZWFuLCBwdWJsaWMgY2hpbGRyZW46IFRlbXBsYXRlQXN0W10sXG4gICAgICAgICAgICAgIHB1YmxpYyBuZ0NvbnRlbnRJbmRleDogbnVtYmVyLCBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuXG4gIHZpc2l0KHZpc2l0b3I6IFRlbXBsYXRlQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdEVtYmVkZGVkVGVtcGxhdGUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSBwcm9wZXJ0eSB3aXRoIGEgYm91bmQgdmFsdWUgKGUuZy4gYCpuZ0lmPVwiY29uZGl0aW9uXCIpLlxuICovXG5leHBvcnQgY2xhc3MgQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCBpbXBsZW1lbnRzIFRlbXBsYXRlQXN0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGRpcmVjdGl2ZU5hbWU6IHN0cmluZywgcHVibGljIHRlbXBsYXRlTmFtZTogc3RyaW5nLCBwdWJsaWMgdmFsdWU6IEFTVCxcbiAgICAgICAgICAgICAgcHVibGljIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge31cbiAgdmlzaXQodmlzaXRvcjogVGVtcGxhdGVBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2aXNpdG9yLnZpc2l0RGlyZWN0aXZlUHJvcGVydHkodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSBkZWNsYXJlZCBvbiBhbiBlbGVtZW50LlxuICovXG5leHBvcnQgY2xhc3MgRGlyZWN0aXZlQXN0IGltcGxlbWVudHMgVGVtcGxhdGVBc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlyZWN0aXZlOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICAgICAgICAgIHB1YmxpYyBpbnB1dHM6IEJvdW5kRGlyZWN0aXZlUHJvcGVydHlBc3RbXSxcbiAgICAgICAgICAgICAgcHVibGljIGhvc3RQcm9wZXJ0aWVzOiBCb3VuZEVsZW1lbnRQcm9wZXJ0eUFzdFtdLCBwdWJsaWMgaG9zdEV2ZW50czogQm91bmRFdmVudEFzdFtdLFxuICAgICAgICAgICAgICBwdWJsaWMgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7fVxuICB2aXNpdCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHZpc2l0b3IudmlzaXREaXJlY3RpdmUodGhpcywgY29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHByb3ZpZGVyIGRlY2xhcmVkIG9uIGFuIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGNsYXNzIFByb3ZpZGVyQXN0IGltcGxlbWVudHMgVGVtcGxhdGVBc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdG9rZW46IENvbXBpbGVUb2tlbk1ldGFkYXRhLCBwdWJsaWMgbXVsdGlQcm92aWRlcjogYm9vbGVhbixcbiAgICAgICAgICAgICAgcHVibGljIGVhZ2VyOiBib29sZWFuLCBwdWJsaWMgcHJvdmlkZXJzOiBDb21waWxlUHJvdmlkZXJNZXRhZGF0YVtdLFxuICAgICAgICAgICAgICBwdWJsaWMgcHJvdmlkZXJUeXBlOiBQcm92aWRlckFzdFR5cGUsIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG5cbiAgdmlzaXQodmlzaXRvcjogVGVtcGxhdGVBc3RWaXNpdG9yLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIC8vIE5vIHZpc2l0IG1ldGhvZCBpbiB0aGUgdmlzaXRvciBmb3Igbm93Li4uXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGVudW0gUHJvdmlkZXJBc3RUeXBlIHtcbiAgUHVibGljU2VydmljZSxcbiAgUHJpdmF0ZVNlcnZpY2UsXG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBCdWlsdGluXG59XG5cbi8qKlxuICogUG9zaXRpb24gd2hlcmUgY29udGVudCBpcyB0byBiZSBwcm9qZWN0ZWQgKGluc3RhbmNlIG9mIGA8bmctY29udGVudD5gIGluIGEgdGVtcGxhdGUpLlxuICovXG5leHBvcnQgY2xhc3MgTmdDb250ZW50QXN0IGltcGxlbWVudHMgVGVtcGxhdGVBc3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5kZXg6IG51bWJlciwgcHVibGljIG5nQ29udGVudEluZGV4OiBudW1iZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBzb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pIHt9XG4gIHZpc2l0KHZpc2l0b3I6IFRlbXBsYXRlQXN0VmlzaXRvciwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gdmlzaXRvci52aXNpdE5nQ29udGVudCh0aGlzLCBjb250ZXh0KTtcbiAgfVxufVxuXG4vKipcbiAqIEVudW1lcmF0aW9uIG9mIHR5cGVzIG9mIHByb3BlcnR5IGJpbmRpbmdzLlxuICovXG5leHBvcnQgZW51bSBQcm9wZXJ0eUJpbmRpbmdUeXBlIHtcblxuICAvKipcbiAgICogQSBub3JtYWwgYmluZGluZyB0byBhIHByb3BlcnR5IChlLmcuIGBbcHJvcGVydHldPVwiZXhwcmVzc2lvblwiYCkuXG4gICAqL1xuICBQcm9wZXJ0eSxcblxuICAvKipcbiAgICogQSBiaW5kaW5nIHRvIGFuIGVsZW1lbnQgYXR0cmlidXRlIChlLmcuIGBbYXR0ci5uYW1lXT1cImV4cHJlc3Npb25cImApLlxuICAgKi9cbiAgQXR0cmlidXRlLFxuXG4gIC8qKlxuICAgKiBBIGJpbmRpbmcgdG8gYSBDU1MgY2xhc3MgKGUuZy4gYFtjbGFzcy5uYW1lXT1cImNvbmRpdGlvblwiYCkuXG4gICAqL1xuICBDbGFzcyxcblxuICAvKipcbiAgICogQSBiaW5kaW5nIHRvIGEgc3R5bGUgcnVsZSAoZS5nLiBgW3N0eWxlLnJ1bGVdPVwiZXhwcmVzc2lvblwiYCkuXG4gICAqL1xuICBTdHlsZVxufVxuXG4vKipcbiAqIEEgdmlzaXRvciBmb3Ige0BsaW5rIFRlbXBsYXRlQXN0fSB0cmVlcyB0aGF0IHdpbGwgcHJvY2VzcyBlYWNoIG5vZGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVtcGxhdGVBc3RWaXNpdG9yIHtcbiAgdmlzaXROZ0NvbnRlbnQoYXN0OiBOZ0NvbnRlbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRFbWJlZGRlZFRlbXBsYXRlKGFzdDogRW1iZWRkZWRUZW1wbGF0ZUFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEVsZW1lbnQoYXN0OiBFbGVtZW50QXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0UmVmZXJlbmNlKGFzdDogUmVmZXJlbmNlQXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0VmFyaWFibGUoYXN0OiBWYXJpYWJsZUFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEV2ZW50KGFzdDogQm91bmRFdmVudEFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdEVsZW1lbnRQcm9wZXJ0eShhc3Q6IEJvdW5kRWxlbWVudFByb3BlcnR5QXN0LCBjb250ZXh0OiBhbnkpOiBhbnk7XG4gIHZpc2l0QXR0cihhc3Q6IEF0dHJBc3QsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRCb3VuZFRleHQoYXN0OiBCb3VuZFRleHRBc3QsIGNvbnRleHQ6IGFueSk6IGFueTtcbiAgdmlzaXRUZXh0KGFzdDogVGV4dEFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdERpcmVjdGl2ZShhc3Q6IERpcmVjdGl2ZUFzdCwgY29udGV4dDogYW55KTogYW55O1xuICB2aXNpdERpcmVjdGl2ZVByb3BlcnR5KGFzdDogQm91bmREaXJlY3RpdmVQcm9wZXJ0eUFzdCwgY29udGV4dDogYW55KTogYW55O1xufVxuXG4vKipcbiAqIFZpc2l0IGV2ZXJ5IG5vZGUgaW4gYSBsaXN0IG9mIHtAbGluayBUZW1wbGF0ZUFzdH1zIHdpdGggdGhlIGdpdmVuIHtAbGluayBUZW1wbGF0ZUFzdFZpc2l0b3J9LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdGVtcGxhdGVWaXNpdEFsbCh2aXNpdG9yOiBUZW1wbGF0ZUFzdFZpc2l0b3IsIGFzdHM6IFRlbXBsYXRlQXN0W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBhbnkgPSBudWxsKTogYW55W10ge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGFzdHMuZm9yRWFjaChhc3QgPT4ge1xuICAgIHZhciBhc3RSZXN1bHQgPSBhc3QudmlzaXQodmlzaXRvciwgY29udGV4dCk7XG4gICAgaWYgKGlzUHJlc2VudChhc3RSZXN1bHQpKSB7XG4gICAgICByZXN1bHQucHVzaChhc3RSZXN1bHQpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
