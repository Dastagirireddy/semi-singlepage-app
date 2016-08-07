System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', '../output/output_ast', '../identifiers'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, o, identifiers_1;
    function getPropertyInView(property, callingView, definedView) {
        if (callingView === definedView) {
            return property;
        }
        else {
            var viewProp = o.THIS_EXPR;
            var currView = callingView;
            while (currView !== definedView && lang_1.isPresent(currView.declarationElement.view)) {
                currView = currView.declarationElement.view;
                viewProp = viewProp.prop('parent');
            }
            if (currView !== definedView) {
                throw new exceptions_1.BaseException("Internal error: Could not calculate a property in a parent view: " + property);
            }
            if (property instanceof o.ReadPropExpr) {
                var readPropExpr_1 = property;
                // Note: Don't cast for members of the AppView base class...
                if (definedView.fields.some(function (field) { return field.name == readPropExpr_1.name; }) ||
                    definedView.getters.some(function (field) { return field.name == readPropExpr_1.name; })) {
                    viewProp = viewProp.cast(definedView.classType);
                }
            }
            return o.replaceVarInExpression(o.THIS_EXPR.name, viewProp, property);
        }
    }
    exports_1("getPropertyInView", getPropertyInView);
    function injectFromViewParentInjector(token, optional) {
        var args = [createDiTokenExpression(token)];
        if (optional) {
            args.push(o.NULL_EXPR);
        }
        return o.THIS_EXPR.prop('parentInjector').callMethod('get', args);
    }
    exports_1("injectFromViewParentInjector", injectFromViewParentInjector);
    function getViewFactoryName(component, embeddedTemplateIndex) {
        return "viewFactory_" + component.type.name + embeddedTemplateIndex;
    }
    exports_1("getViewFactoryName", getViewFactoryName);
    function createDiTokenExpression(token) {
        if (lang_1.isPresent(token.value)) {
            return o.literal(token.value);
        }
        else if (token.identifierIsInstance) {
            return o.importExpr(token.identifier)
                .instantiate([], o.importType(token.identifier, [], [o.TypeModifier.Const]));
        }
        else {
            return o.importExpr(token.identifier);
        }
    }
    exports_1("createDiTokenExpression", createDiTokenExpression);
    function createFlatArray(expressions) {
        var lastNonArrayExpressions = [];
        var result = o.literalArr([]);
        for (var i = 0; i < expressions.length; i++) {
            var expr = expressions[i];
            if (expr.type instanceof o.ArrayType) {
                if (lastNonArrayExpressions.length > 0) {
                    result =
                        result.callMethod(o.BuiltinMethod.ConcatArray, [o.literalArr(lastNonArrayExpressions)]);
                    lastNonArrayExpressions = [];
                }
                result = result.callMethod(o.BuiltinMethod.ConcatArray, [expr]);
            }
            else {
                lastNonArrayExpressions.push(expr);
            }
        }
        if (lastNonArrayExpressions.length > 0) {
            result =
                result.callMethod(o.BuiltinMethod.ConcatArray, [o.literalArr(lastNonArrayExpressions)]);
        }
        return result;
    }
    exports_1("createFlatArray", createFlatArray);
    function createPureProxy(fn, argCount, pureProxyProp, view) {
        view.fields.push(new o.ClassField(pureProxyProp.name, null, [o.StmtModifier.Private]));
        var pureProxyId = argCount < identifiers_1.Identifiers.pureProxies.length ? identifiers_1.Identifiers.pureProxies[argCount] : null;
        if (lang_1.isBlank(pureProxyId)) {
            throw new exceptions_1.BaseException("Unsupported number of argument for pure functions: " + argCount);
        }
        view.createMethod.addStmt(o.THIS_EXPR.prop(pureProxyProp.name).set(o.importExpr(pureProxyId).callFn([fn])).toStmt());
    }
    exports_1("createPureProxy", createPureProxy);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (o_1) {
                o = o_1;
            },
            function (identifiers_1_1) {
                identifiers_1 = identifiers_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQVlBLDJCQUFrQyxRQUFzQixFQUFFLFdBQXdCLEVBQ2hELFdBQXdCO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDbEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxRQUFRLEdBQWlCLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDekMsSUFBSSxRQUFRLEdBQWdCLFdBQVcsQ0FBQztZQUN4QyxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQUksZ0JBQVMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDL0UsUUFBUSxHQUFHLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7Z0JBQzVDLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxJQUFJLDBCQUFhLENBQ25CLHNFQUFvRSxRQUFVLENBQUMsQ0FBQztZQUN0RixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLGNBQVksR0FBbUIsUUFBUSxDQUFDO2dCQUM1Qyw0REFBNEQ7Z0JBQzVELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSyxDQUFDLElBQUksSUFBSSxjQUFZLENBQUMsSUFBSSxFQUEvQixDQUErQixDQUFDO29CQUNuRSxXQUFXLENBQUMsT0FBTyxD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QyxPQUFPLENBQ3JCLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBVkQsNkNBVUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvdmlld19jb21waWxlci91dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5cbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtcbiAgQ29tcGlsZVRva2VuTWV0YWRhdGEsXG4gIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YVxufSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCB7Q29tcGlsZVZpZXd9IGZyb20gJy4vY29tcGlsZV92aWV3JztcbmltcG9ydCB7SWRlbnRpZmllcnN9IGZyb20gJy4uL2lkZW50aWZpZXJzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3BlcnR5SW5WaWV3KHByb3BlcnR5OiBvLkV4cHJlc3Npb24sIGNhbGxpbmdWaWV3OiBDb21waWxlVmlldyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZpbmVkVmlldzogQ29tcGlsZVZpZXcpOiBvLkV4cHJlc3Npb24ge1xuICBpZiAoY2FsbGluZ1ZpZXcgPT09IGRlZmluZWRWaWV3KSB7XG4gICAgcmV0dXJuIHByb3BlcnR5O1xuICB9IGVsc2Uge1xuICAgIHZhciB2aWV3UHJvcDogby5FeHByZXNzaW9uID0gby5USElTX0VYUFI7XG4gICAgdmFyIGN1cnJWaWV3OiBDb21waWxlVmlldyA9IGNhbGxpbmdWaWV3O1xuICAgIHdoaWxlIChjdXJyVmlldyAhPT0gZGVmaW5lZFZpZXcgJiYgaXNQcmVzZW50KGN1cnJWaWV3LmRlY2xhcmF0aW9uRWxlbWVudC52aWV3KSkge1xuICAgICAgY3VyclZpZXcgPSBjdXJyVmlldy5kZWNsYXJhdGlvbkVsZW1lbnQudmlldztcbiAgICAgIHZpZXdQcm9wID0gdmlld1Byb3AucHJvcCgncGFyZW50Jyk7XG4gICAgfVxuICAgIGlmIChjdXJyVmlldyAhPT0gZGVmaW5lZFZpZXcpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgIGBJbnRlcm5hbCBlcnJvcjogQ291bGQgbm90IGNhbGN1bGF0ZSBhIHByb3BlcnR5IGluIGEgcGFyZW50IHZpZXc6ICR7cHJvcGVydHl9YCk7XG4gICAgfVxuICAgIGlmIChwcm9wZXJ0eSBpbnN0YW5jZW9mIG8uUmVhZFByb3BFeHByKSB7XG4gICAgICBsZXQgcmVhZFByb3BFeHByOiBvLlJlYWRQcm9wRXhwciA9IHByb3BlcnR5O1xuICAgICAgLy8gTm90ZTogRG9uJ3QgY2FzdCBmb3IgbWVtYmVycyBvZiB0aGUgQXBwVmlldyBiYXNlIGNsYXNzLi4uXG4gICAgICBpZiAoZGVmaW5lZFZpZXcuZmllbGRzLnNvbWUoKGZpZWxkKSA9PiBmaWVsZC5uYW1lID09IHJlYWRQcm9wRXhwci5uYW1lKSB8fFxuICAgICAgICAgIGRlZmluZWRWaWV3LmdldHRlcnMuc29tZSgoZmllbGQpID0+IGZpZWxkLm5hbWUgPT0gcmVhZFByb3BFeHByLm5hbWUpKSB7XG4gICAgICAgIHZpZXdQcm9wID0gdmlld1Byb3AuY2FzdChkZWZpbmVkVmlldy5jbGFzc1R5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gby5yZXBsYWNlVmFySW5FeHByZXNzaW9uKG8uVEhJU19FWFBSLm5hbWUsIHZpZXdQcm9wLCBwcm9wZXJ0eSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdEZyb21WaWV3UGFyZW50SW5qZWN0b3IodG9rZW46IENvbXBpbGVUb2tlbk1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWw6IGJvb2xlYW4pOiBvLkV4cHJlc3Npb24ge1xuICB2YXIgYXJncyA9IFtjcmVhdGVEaVRva2VuRXhwcmVzc2lvbih0b2tlbildO1xuICBpZiAob3B0aW9uYWwpIHtcbiAgICBhcmdzLnB1c2goby5OVUxMX0VYUFIpO1xuICB9XG4gIHJldHVybiBvLlRISVNfRVhQUi5wcm9wKCdwYXJlbnRJbmplY3RvcicpLmNhbGxNZXRob2QoJ2dldCcsIGFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Vmlld0ZhY3RvcnlOYW1lKGNvbXBvbmVudDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWJlZGRlZFRlbXBsYXRlSW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBgdmlld0ZhY3RvcnlfJHtjb21wb25lbnQudHlwZS5uYW1lfSR7ZW1iZWRkZWRUZW1wbGF0ZUluZGV4fWA7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpVG9rZW5FeHByZXNzaW9uKHRva2VuOiBDb21waWxlVG9rZW5NZXRhZGF0YSk6IG8uRXhwcmVzc2lvbiB7XG4gIGlmIChpc1ByZXNlbnQodG9rZW4udmFsdWUpKSB7XG4gICAgcmV0dXJuIG8ubGl0ZXJhbCh0b2tlbi52YWx1ZSk7XG4gIH0gZWxzZSBpZiAodG9rZW4uaWRlbnRpZmllcklzSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gby5pbXBvcnRFeHByKHRva2VuLmlkZW50aWZpZXIpXG4gICAgICAgIC5pbnN0YW50aWF0ZShbXSwgby5pbXBvcnRUeXBlKHRva2VuLmlkZW50aWZpZXIsIFtdLCBbby5UeXBlTW9kaWZpZXIuQ29uc3RdKSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG8uaW1wb3J0RXhwcih0b2tlbi5pZGVudGlmaWVyKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxhdEFycmF5KGV4cHJlc3Npb25zOiBvLkV4cHJlc3Npb25bXSk6IG8uRXhwcmVzc2lvbiB7XG4gIHZhciBsYXN0Tm9uQXJyYXlFeHByZXNzaW9ucyA9IFtdO1xuICB2YXIgcmVzdWx0OiBvLkV4cHJlc3Npb24gPSBvLmxpdGVyYWxBcnIoW10pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cHJlc3Npb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGV4cHIgPSBleHByZXNzaW9uc1tpXTtcbiAgICBpZiAoZXhwci50eXBlIGluc3RhbmNlb2Ygby5BcnJheVR5cGUpIHtcbiAgICAgIGlmIChsYXN0Tm9uQXJyYXlFeHByZXNzaW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlc3VsdCA9XG4gICAgICAgICAgICByZXN1bHQuY2FsbE1ldGhvZChvLkJ1aWx0aW5NZXRob2QuQ29uY2F0QXJyYXksIFtvLmxpdGVyYWxBcnIobGFzdE5vbkFycmF5RXhwcmVzc2lvbnMpXSk7XG4gICAgICAgIGxhc3ROb25BcnJheUV4cHJlc3Npb25zID0gW107XG4gICAgICB9XG4gICAgICByZXN1bHQgPSByZXN1bHQuY2FsbE1ldGhvZChvLkJ1aWx0aW5NZXRob2QuQ29uY2F0QXJyYXksIFtleHByXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3ROb25BcnJheUV4cHJlc3Npb25zLnB1c2goZXhwcik7XG4gICAgfVxuICB9XG4gIGlmIChsYXN0Tm9uQXJyYXlFeHByZXNzaW9ucy5sZW5ndGggPiAwKSB7XG4gICAgcmVzdWx0ID1cbiAgICAgICAgcmVzdWx0LmNhbGxNZXRob2Qoby5CdWlsdGluTWV0aG9kLkNvbmNhdEFycmF5LCBbby5saXRlcmFsQXJyKGxhc3ROb25BcnJheUV4cHJlc3Npb25zKV0pO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQdXJlUHJveHkoZm46IG8uRXhwcmVzc2lvbiwgYXJnQ291bnQ6IG51bWJlciwgcHVyZVByb3h5UHJvcDogby5SZWFkUHJvcEV4cHIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXc6IENvbXBpbGVWaWV3KSB7XG4gIHZpZXcuZmllbGRzLnB1c2gobmV3IG8uQ2xhc3NGaWVsZChwdXJlUHJveHlQcm9wLm5hbWUsIG51bGwsIFtvLlN0bXRNb2RpZmllci5Qcml2YXRlXSkpO1xuICB2YXIgcHVyZVByb3h5SWQgPVxuICAgICAgYXJnQ291bnQgPCBJZGVudGlmaWVycy5wdXJlUHJveGllcy5sZW5ndGggPyBJZGVudGlmaWVycy5wdXJlUHJveGllc1thcmdDb3VudF0gOiBudWxsO1xuICBpZiAoaXNCbGFuayhwdXJlUHJveHlJZCkpIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgVW5zdXBwb3J0ZWQgbnVtYmVyIG9mIGFyZ3VtZW50IGZvciBwdXJlIGZ1bmN0aW9uczogJHthcmdDb3VudH1gKTtcbiAgfVxuICB2aWV3LmNyZWF0ZU1ldGhvZC5hZGRTdG10KFxuICAgICAgby5USElTX0VYUFIucHJvcChwdXJlUHJveHlQcm9wLm5hbWUpLnNldChvLmltcG9ydEV4cHIocHVyZVByb3h5SWQpLmNhbGxGbihbZm5dKSkudG9TdG10KCkpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
