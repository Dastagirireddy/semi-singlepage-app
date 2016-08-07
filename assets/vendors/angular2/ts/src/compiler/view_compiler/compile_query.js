System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', '../output/output_ast', '../identifiers', './util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, collection_1, o, identifiers_1, util_1;
    var ViewQueryValues, CompileQuery;
    function createQueryValues(viewValues) {
        return collection_1.ListWrapper.flatten(viewValues.values.map(function (entry) {
            if (entry instanceof ViewQueryValues) {
                return mapNestedViews(entry.view.declarationElement.appElement, entry.view, createQueryValues(entry));
            }
            else {
                return entry;
            }
        }));
    }
    function mapNestedViews(declarationAppElement, view, expressions) {
        var adjustedExpressions = expressions.map(function (expr) {
            return o.replaceVarInExpression(o.THIS_EXPR.name, o.variable('nestedView'), expr);
        });
        return declarationAppElement.callMethod('mapNestedViews', [
            o.variable(view.className),
            o.fn([new o.FnParam('nestedView', view.classType)], [new o.ReturnStatement(o.literalArr(adjustedExpressions))])
        ]);
    }
    function createQueryList(query, directiveInstance, propertyName, compileView) {
        compileView.fields.push(new o.ClassField(propertyName, o.importType(identifiers_1.Identifiers.QueryList), [o.StmtModifier.Private]));
        var expr = o.THIS_EXPR.prop(propertyName);
        compileView.createMethod.addStmt(o.THIS_EXPR.prop(propertyName)
            .set(o.importExpr(identifiers_1.Identifiers.QueryList).instantiate([]))
            .toStmt());
        return expr;
    }
    exports_1("createQueryList", createQueryList);
    function addQueryToTokenMap(map, query) {
        query.meta.selectors.forEach(function (selector) {
            var entry = map.get(selector);
            if (lang_1.isBlank(entry)) {
                entry = [];
                map.add(selector, entry);
            }
            entry.push(query);
        });
    }
    exports_1("addQueryToTokenMap", addQueryToTokenMap);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (o_1) {
                o = o_1;
            },
            function (identifiers_1_1) {
                identifiers_1 = identifiers_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            }],
        execute: function() {
            ViewQueryValues = (function () {
                function ViewQueryValues(view, values) {
                    this.view = view;
                    this.values = values;
                }
                return ViewQueryValues;
            }());
            CompileQuery = (function () {
                function CompileQuery(meta, queryList, ownerDirectiveExpression, view) {
                    this.meta = meta;
                    this.queryList = queryList;
                    this.ownerDirectiveExpression = ownerDirectiveExpression;
                    this.view = view;
                    this._values = new ViewQueryValues(view, []);
                }
                CompileQuery.prototype.addValue = function (value, view) {
                    var currentView = view;
                    var elPath = [];
                    while (lang_1.isPresent(currentView) && currentView !== this.view) {
                        var parentEl = currentView.declarationElement;
                        elPath.unshift(parentEl);
                        currentView = parentEl.view;
                    }
                    var queryListForDirtyExpr = util_1.getPropertyInView(this.queryList, view, this.view);
                    var viewValues = this._values;
                    elPath.forEach(function (el) {
                        var last = viewValues.values.length > 0 ? viewValues.values[viewValues.values.length - 1] : null;
                        if (last instanceof ViewQueryValues && last.view === el.embeddedView) {
                            viewValues = last;
                        }
                        else {
                            var newViewValues = new ViewQueryValues(el.embeddedView, []);
                            viewValues.values.push(newViewValues);
                            viewValues = newViewValues;
                        }
                    });
                    viewValues.values.push(value);
                    if (elPath.length > 0) {
                        view.dirtyParentQueriesMethod.addStmt(queryListForDirtyExpr.callMethod('setDirty', []).toStmt());
                    }
                };
                CompileQuery.prototype.afterChildren = function (targetMethod) {
                    var values = createQueryValues(this._values);
                    var updateStmts = [this.queryList.callMethod('reset', [o.literalArr(values)]).toStmt()];
                    if (lang_1.isPresent(this.ownerDirectiveExpression)) {
                        var valueExpr = this.meta.first ? this.queryList.prop('first') : this.queryList;
                        updateStmts.push(this.ownerDirectiveExpression.prop(this.meta.propertyName).set(valueExpr).toStmt());
                    }
                    if (!this.meta.first) {
                        updateStmts.push(this.queryList.callMethod('notifyOnChanges', []).toStmt());
                    }
                    targetMethod.addStmt(new o.IfStmt(this.queryList.prop('dirty'), updateStmts));
                };
                return CompileQuery;
            }());
            exports_1("CompileQuery", CompileQuery);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL2NvbXBpbGVfcXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUEwRUEsMkJBQTJCLFVBQTJCO1FBQ3BELE1BQU0sQ0FBQyx3QkFBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUs7WUFDckQsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLElBQUksRUFDcEQsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFlLEtBQUssQ0FBQztZQUM3QixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCx3QkFBd0IscUJBQW1DLEVBQUUsSUFBaUIsRUFDdEQsV0FBMkI7UUFDakQsSUFBSSxtQkFBbUIsR0FBbUIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUk7WUFDN0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN4RCxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsSUFBSSxD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dmlld19jb21waWxlci9jb21waWxlX3F1ZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuXG5pbXBvcnQgKiBhcyBvIGZyb20gJy4uL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7SWRlbnRpZmllcnN9IGZyb20gJy4uL2lkZW50aWZpZXJzJztcblxuaW1wb3J0IHtcbiAgQ29tcGlsZVF1ZXJ5TWV0YWRhdGEsXG4gIENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEsXG4gIENvbXBpbGVUb2tlbk1hcFxufSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcblxuaW1wb3J0IHtDb21waWxlVmlld30gZnJvbSAnLi9jb21waWxlX3ZpZXcnO1xuaW1wb3J0IHtDb21waWxlRWxlbWVudH0gZnJvbSAnLi9jb21waWxlX2VsZW1lbnQnO1xuaW1wb3J0IHtDb21waWxlTWV0aG9kfSBmcm9tICcuL2NvbXBpbGVfbWV0aG9kJztcbmltcG9ydCB7Z2V0UHJvcGVydHlJblZpZXd9IGZyb20gJy4vdXRpbCc7XG5cbmNsYXNzIFZpZXdRdWVyeVZhbHVlcyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3OiBDb21waWxlVmlldywgcHVibGljIHZhbHVlczogQXJyYXk8by5FeHByZXNzaW9uIHwgVmlld1F1ZXJ5VmFsdWVzPikge31cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBpbGVRdWVyeSB7XG4gIHByaXZhdGUgX3ZhbHVlczogVmlld1F1ZXJ5VmFsdWVzO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZXRhOiBDb21waWxlUXVlcnlNZXRhZGF0YSwgcHVibGljIHF1ZXJ5TGlzdDogby5FeHByZXNzaW9uLFxuICAgICAgICAgICAgICBwdWJsaWMgb3duZXJEaXJlY3RpdmVFeHByZXNzaW9uOiBvLkV4cHJlc3Npb24sIHB1YmxpYyB2aWV3OiBDb21waWxlVmlldykge1xuICAgIHRoaXMuX3ZhbHVlcyA9IG5ldyBWaWV3UXVlcnlWYWx1ZXModmlldywgW10pO1xuICB9XG5cbiAgYWRkVmFsdWUodmFsdWU6IG8uRXhwcmVzc2lvbiwgdmlldzogQ29tcGlsZVZpZXcpIHtcbiAgICB2YXIgY3VycmVudFZpZXcgPSB2aWV3O1xuICAgIHZhciBlbFBhdGg6IENvbXBpbGVFbGVtZW50W10gPSBbXTtcbiAgICB3aGlsZSAoaXNQcmVzZW50KGN1cnJlbnRWaWV3KSAmJiBjdXJyZW50VmlldyAhPT0gdGhpcy52aWV3KSB7XG4gICAgICB2YXIgcGFyZW50RWwgPSBjdXJyZW50Vmlldy5kZWNsYXJhdGlvbkVsZW1lbnQ7XG4gICAgICBlbFBhdGgudW5zaGlmdChwYXJlbnRFbCk7XG4gICAgICBjdXJyZW50VmlldyA9IHBhcmVudEVsLnZpZXc7XG4gICAgfVxuICAgIHZhciBxdWVyeUxpc3RGb3JEaXJ0eUV4cHIgPSBnZXRQcm9wZXJ0eUluVmlldyh0aGlzLnF1ZXJ5TGlzdCwgdmlldywgdGhpcy52aWV3KTtcblxuICAgIHZhciB2aWV3VmFsdWVzID0gdGhpcy5fdmFsdWVzO1xuICAgIGVsUGF0aC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgdmFyIGxhc3QgPVxuICAgICAgICAgIHZpZXdWYWx1ZXMudmFsdWVzLmxlbmd0aCA+IDAgPyB2aWV3VmFsdWVzLnZhbHVlc1t2aWV3VmFsdWVzLnZhbHVlcy5sZW5ndGggLSAxXSA6IG51bGw7XG4gICAgICBpZiAobGFzdCBpbnN0YW5jZW9mIFZpZXdRdWVyeVZhbHVlcyAmJiBsYXN0LnZpZXcgPT09IGVsLmVtYmVkZGVkVmlldykge1xuICAgICAgICB2aWV3VmFsdWVzID0gbGFzdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBuZXdWaWV3VmFsdWVzID0gbmV3IFZpZXdRdWVyeVZhbHVlcyhlbC5lbWJlZGRlZFZpZXcsIFtdKTtcbiAgICAgICAgdmlld1ZhbHVlcy52YWx1ZXMucHVzaChuZXdWaWV3VmFsdWVzKTtcbiAgICAgICAgdmlld1ZhbHVlcyA9IG5ld1ZpZXdWYWx1ZXM7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdmlld1ZhbHVlcy52YWx1ZXMucHVzaCh2YWx1ZSk7XG5cbiAgICBpZiAoZWxQYXRoLmxlbmd0aCA+IDApIHtcbiAgICAgIHZpZXcuZGlydHlQYXJlbnRRdWVyaWVzTWV0aG9kLmFkZFN0bXQoXG4gICAgICAgICAgcXVlcnlMaXN0Rm9yRGlydHlFeHByLmNhbGxNZXRob2QoJ3NldERpcnR5JywgW10pLnRvU3RtdCgpKTtcbiAgICB9XG4gIH1cblxuICBhZnRlckNoaWxkcmVuKHRhcmdldE1ldGhvZDogQ29tcGlsZU1ldGhvZCkge1xuICAgIHZhciB2YWx1ZXMgPSBjcmVhdGVRdWVyeVZhbHVlcyh0aGlzLl92YWx1ZXMpO1xuICAgIHZhciB1cGRhdGVTdG10cyA9IFt0aGlzLnF1ZXJ5TGlzdC5jYWxsTWV0aG9kKCdyZXNldCcsIFtvLmxpdGVyYWxBcnIodmFsdWVzKV0pLnRvU3RtdCgpXTtcbiAgICBpZiAoaXNQcmVzZW50KHRoaXMub3duZXJEaXJlY3RpdmVFeHByZXNzaW9uKSkge1xuICAgICAgdmFyIHZhbHVlRXhwciA9IHRoaXMubWV0YS5maXJzdCA/IHRoaXMucXVlcnlMaXN0LnByb3AoJ2ZpcnN0JykgOiB0aGlzLnF1ZXJ5TGlzdDtcbiAgICAgIHVwZGF0ZVN0bXRzLnB1c2goXG4gICAgICAgICAgdGhpcy5vd25lckRpcmVjdGl2ZUV4cHJlc3Npb24ucHJvcCh0aGlzLm1ldGEucHJvcGVydHlOYW1lKS5zZXQodmFsdWVFeHByKS50b1N0bXQoKSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5tZXRhLmZpcnN0KSB7XG4gICAgICB1cGRhdGVTdG10cy5wdXNoKHRoaXMucXVlcnlMaXN0LmNhbGxNZXRob2QoJ25vdGlmeU9uQ2hhbmdlcycsIFtdKS50b1N0bXQoKSk7XG4gICAgfVxuICAgIHRhcmdldE1ldGhvZC5hZGRTdG10KG5ldyBvLklmU3RtdCh0aGlzLnF1ZXJ5TGlzdC5wcm9wKCdkaXJ0eScpLCB1cGRhdGVTdG10cykpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVF1ZXJ5VmFsdWVzKHZpZXdWYWx1ZXM6IFZpZXdRdWVyeVZhbHVlcyk6IG8uRXhwcmVzc2lvbltdIHtcbiAgcmV0dXJuIExpc3RXcmFwcGVyLmZsYXR0ZW4odmlld1ZhbHVlcy52YWx1ZXMubWFwKChlbnRyeSkgPT4ge1xuICAgIGlmIChlbnRyeSBpbnN0YW5jZW9mIFZpZXdRdWVyeVZhbHVlcykge1xuICAgICAgcmV0dXJuIG1hcE5lc3RlZFZpZXdzKGVudHJ5LnZpZXcuZGVjbGFyYXRpb25FbGVtZW50LmFwcEVsZW1lbnQsIGVudHJ5LnZpZXcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlUXVlcnlWYWx1ZXMoZW50cnkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDxvLkV4cHJlc3Npb24+ZW50cnk7XG4gICAgfVxuICB9KSk7XG59XG5cbmZ1bmN0aW9uIG1hcE5lc3RlZFZpZXdzKGRlY2xhcmF0aW9uQXBwRWxlbWVudDogby5FeHByZXNzaW9uLCB2aWV3OiBDb21waWxlVmlldyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb25zOiBvLkV4cHJlc3Npb25bXSk6IG8uRXhwcmVzc2lvbiB7XG4gIHZhciBhZGp1c3RlZEV4cHJlc3Npb25zOiBvLkV4cHJlc3Npb25bXSA9IGV4cHJlc3Npb25zLm1hcCgoZXhwcikgPT4ge1xuICAgIHJldHVybiBvLnJlcGxhY2VWYXJJbkV4cHJlc3Npb24oby5USElTX0VYUFIubmFtZSwgby52YXJpYWJsZSgnbmVzdGVkVmlldycpLCBleHByKTtcbiAgfSk7XG4gIHJldHVybiBkZWNsYXJhdGlvbkFwcEVsZW1lbnQuY2FsbE1ldGhvZCgnbWFwTmVzdGVkVmlld3MnLCBbXG4gICAgby52YXJpYWJsZSh2aWV3LmNsYXNzTmFtZSksXG4gICAgby5mbihbbmV3IG8uRm5QYXJhbSgnbmVzdGVkVmlldycsIHZpZXcuY2xhc3NUeXBlKV0sXG4gICAgICAgICBbbmV3IG8uUmV0dXJuU3RhdGVtZW50KG8ubGl0ZXJhbEFycihhZGp1c3RlZEV4cHJlc3Npb25zKSldKVxuICBdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVF1ZXJ5TGlzdChxdWVyeTogQ29tcGlsZVF1ZXJ5TWV0YWRhdGEsIGRpcmVjdGl2ZUluc3RhbmNlOiBvLkV4cHJlc3Npb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZTogc3RyaW5nLCBjb21waWxlVmlldzogQ29tcGlsZVZpZXcpOiBvLkV4cHJlc3Npb24ge1xuICBjb21waWxlVmlldy5maWVsZHMucHVzaChuZXcgby5DbGFzc0ZpZWxkKHByb3BlcnR5TmFtZSwgby5pbXBvcnRUeXBlKElkZW50aWZpZXJzLlF1ZXJ5TGlzdCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW28uU3RtdE1vZGlmaWVyLlByaXZhdGVdKSk7XG4gIHZhciBleHByID0gby5USElTX0VYUFIucHJvcChwcm9wZXJ0eU5hbWUpO1xuICBjb21waWxlVmlldy5jcmVhdGVNZXRob2QuYWRkU3RtdChvLlRISVNfRVhQUi5wcm9wKHByb3BlcnR5TmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXQoby5pbXBvcnRFeHByKElkZW50aWZpZXJzLlF1ZXJ5TGlzdCkuaW5zdGFudGlhdGUoW10pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvU3RtdCgpKTtcbiAgcmV0dXJuIGV4cHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRRdWVyeVRvVG9rZW5NYXAobWFwOiBDb21waWxlVG9rZW5NYXA8Q29tcGlsZVF1ZXJ5W10+LCBxdWVyeTogQ29tcGlsZVF1ZXJ5KSB7XG4gIHF1ZXJ5Lm1ldGEuc2VsZWN0b3JzLmZvckVhY2goKHNlbGVjdG9yKSA9PiB7XG4gICAgdmFyIGVudHJ5ID0gbWFwLmdldChzZWxlY3Rvcik7XG4gICAgaWYgKGlzQmxhbmsoZW50cnkpKSB7XG4gICAgICBlbnRyeSA9IFtdO1xuICAgICAgbWFwLmFkZChzZWxlY3RvciwgZW50cnkpO1xuICAgIH1cbiAgICBlbnRyeS5wdXNoKHF1ZXJ5KTtcbiAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
