System.register(['angular2/src/facade/lang', 'angular2/src/facade/collection', 'angular2/src/facade/exceptions', './view_type', './element_ref', './view_container_ref'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, collection_1, exceptions_1, view_type_1, element_ref_1, view_container_ref_1;
    var AppElement;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (view_type_1_1) {
                view_type_1 = view_type_1_1;
            },
            function (element_ref_1_1) {
                element_ref_1 = element_ref_1_1;
            },
            function (view_container_ref_1_1) {
                view_container_ref_1 = view_container_ref_1_1;
            }],
        execute: function() {
            /**
             * An AppElement is created for elements that have a ViewContainerRef,
             * a nested component or a <template> element to keep data around
             * that is needed for later instantiations.
             */
            AppElement = (function () {
                function AppElement(index, parentIndex, parentView, nativeElement) {
                    this.index = index;
                    this.parentIndex = parentIndex;
                    this.parentView = parentView;
                    this.nativeElement = nativeElement;
                    this.nestedViews = null;
                    this.componentView = null;
                }
                Object.defineProperty(AppElement.prototype, "elementRef", {
                    get: function () { return new element_ref_1.ElementRef(this.nativeElement); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppElement.prototype, "vcRef", {
                    get: function () { return new view_container_ref_1.ViewContainerRef_(this); },
                    enumerable: true,
                    configurable: true
                });
                AppElement.prototype.initComponent = function (component, componentConstructorViewQueries, view) {
                    this.component = component;
                    this.componentConstructorViewQueries = componentConstructorViewQueries;
                    this.componentView = view;
                };
                Object.defineProperty(AppElement.prototype, "parentInjector", {
                    get: function () { return this.parentView.injector(this.parentIndex); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppElement.prototype, "injector", {
                    get: function () { return this.parentView.injector(this.index); },
                    enumerable: true,
                    configurable: true
                });
                AppElement.prototype.mapNestedViews = function (nestedViewClass, callback) {
                    var result = [];
                    if (lang_1.isPresent(this.nestedViews)) {
                        this.nestedViews.forEach(function (nestedView) {
                            if (nestedView.clazz === nestedViewClass) {
                                result.push(callback(nestedView));
                            }
                        });
                    }
                    return result;
                };
                AppElement.prototype.attachView = function (view, viewIndex) {
                    if (view.type === view_type_1.ViewType.COMPONENT) {
                        throw new exceptions_1.BaseException("Component views can't be moved!");
                    }
                    var nestedViews = this.nestedViews;
                    if (nestedViews == null) {
                        nestedViews = [];
                        this.nestedViews = nestedViews;
                    }
                    collection_1.ListWrapper.insert(nestedViews, viewIndex, view);
                    var refRenderNode;
                    if (viewIndex > 0) {
                        var prevView = nestedViews[viewIndex - 1];
                        refRenderNode = prevView.lastRootNode;
                    }
                    else {
                        refRenderNode = this.nativeElement;
                    }
                    if (lang_1.isPresent(refRenderNode)) {
                        view.renderer.attachViewAfter(refRenderNode, view.flatRootNodes);
                    }
                    view.addToContentChildren(this);
                };
                AppElement.prototype.detachView = function (viewIndex) {
                    var view = collection_1.ListWrapper.removeAt(this.nestedViews, viewIndex);
                    if (view.type === view_type_1.ViewType.COMPONENT) {
                        throw new exceptions_1.BaseException("Component views can't be moved!");
                    }
                    view.renderer.detachView(view.flatRootNodes);
                    view.removeFromContentChildren(this);
                    return view;
                };
                return AppElement;
            }());
            exports_1("AppElement", AppElement);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2xpbmtlci9lbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBY0E7Ozs7ZUFJRztZQUNIO2dCQU9FLG9CQUFtQixLQUFhLEVBQVMsV0FBbUIsRUFBUyxVQUF3QixFQUMxRSxhQUFrQjtvQkFEbEIsVUFBSyxHQUFMLEtBQUssQ0FBUTtvQkFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtvQkFBUyxlQUFVLEdBQVYsVUFBVSxDQUFjO29CQUMxRSxrQkFBYSxHQUFiLGFBQWEsQ0FBSztvQkFQOUIsZ0JBQVcsR0FBbUIsSUFBSSxDQUFDO29CQUNuQyxrQkFBYSxHQUFpQixJQUFJLENBQUM7Z0JBTUYsQ0FBQztnQkFFekMsc0JBQUksa0NBQVU7eUJBQWQsY0FBK0IsTUFBTSxDQUFDLElBQUksd0JBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBRTNFLHNCQUFJLDZCQUFLO3lCQUFULGNBQWlDLE1BQU0sQ0FBQyxJQUFJLHNDQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUV0RSxrQ0FBYSxHQUFiLFVBQWMsU0FBYyxFQUFFLCtCQUFpRCxFQUNqRSxJQUFrQjtvQkFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBQzNCLElBQUksQ0FBQywrQkFBK0IsR0FBRywrQkFBK0IsQ0FBQztvQkFDdkUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQzVCLENBQUM7Z0JBRUQsc0JBQUksc0NBQWM7eUJBQWxCLGNBQWlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBQ3JGLHNCQUFJLGdDQUFRO3lCQUFaLGNBQTJCLE1BQU0sQ0FB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cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rLCBUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtMaXN0V3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuXG5pbXBvcnQge0FwcFZpZXd9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQge1ZpZXdUeXBlfSBmcm9tICcuL3ZpZXdfdHlwZSc7XG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gJy4vZWxlbWVudF9yZWYnO1xuXG5pbXBvcnQge1ZpZXdDb250YWluZXJSZWYsIFZpZXdDb250YWluZXJSZWZffSBmcm9tICcuL3ZpZXdfY29udGFpbmVyX3JlZic7XG5cbmltcG9ydCB7UXVlcnlMaXN0fSBmcm9tICcuL3F1ZXJ5X2xpc3QnO1xuXG4vKipcbiAqIEFuIEFwcEVsZW1lbnQgaXMgY3JlYXRlZCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIGEgVmlld0NvbnRhaW5lclJlZixcbiAqIGEgbmVzdGVkIGNvbXBvbmVudCBvciBhIDx0ZW1wbGF0ZT4gZWxlbWVudCB0byBrZWVwIGRhdGEgYXJvdW5kXG4gKiB0aGF0IGlzIG5lZWRlZCBmb3IgbGF0ZXIgaW5zdGFudGlhdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBFbGVtZW50IHtcbiAgcHVibGljIG5lc3RlZFZpZXdzOiBBcHBWaWV3PGFueT5bXSA9IG51bGw7XG4gIHB1YmxpYyBjb21wb25lbnRWaWV3OiBBcHBWaWV3PGFueT4gPSBudWxsO1xuXG4gIHB1YmxpYyBjb21wb25lbnQ6IGFueTtcbiAgcHVibGljIGNvbXBvbmVudENvbnN0cnVjdG9yVmlld1F1ZXJpZXM6IFF1ZXJ5TGlzdDxhbnk+W107XG5cbiAgY29uc3RydWN0b3IocHVibGljIGluZGV4OiBudW1iZXIsIHB1YmxpYyBwYXJlbnRJbmRleDogbnVtYmVyLCBwdWJsaWMgcGFyZW50VmlldzogQXBwVmlldzxhbnk+LFxuICAgICAgICAgICAgICBwdWJsaWMgbmF0aXZlRWxlbWVudDogYW55KSB7fVxuXG4gIGdldCBlbGVtZW50UmVmKCk6IEVsZW1lbnRSZWYgeyByZXR1cm4gbmV3IEVsZW1lbnRSZWYodGhpcy5uYXRpdmVFbGVtZW50KTsgfVxuXG4gIGdldCB2Y1JlZigpOiBWaWV3Q29udGFpbmVyUmVmXyB7IHJldHVybiBuZXcgVmlld0NvbnRhaW5lclJlZl8odGhpcyk7IH1cblxuICBpbml0Q29tcG9uZW50KGNvbXBvbmVudDogYW55LCBjb21wb25lbnRDb25zdHJ1Y3RvclZpZXdRdWVyaWVzOiBRdWVyeUxpc3Q8YW55PltdLFxuICAgICAgICAgICAgICAgIHZpZXc6IEFwcFZpZXc8YW55Pikge1xuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgIHRoaXMuY29tcG9uZW50Q29uc3RydWN0b3JWaWV3UXVlcmllcyA9IGNvbXBvbmVudENvbnN0cnVjdG9yVmlld1F1ZXJpZXM7XG4gICAgdGhpcy5jb21wb25lbnRWaWV3ID0gdmlldztcbiAgfVxuXG4gIGdldCBwYXJlbnRJbmplY3RvcigpOiBJbmplY3RvciB7IHJldHVybiB0aGlzLnBhcmVudFZpZXcuaW5qZWN0b3IodGhpcy5wYXJlbnRJbmRleCk7IH1cbiAgZ2V0IGluamVjdG9yKCk6IEluamVjdG9yIHsgcmV0dXJuIHRoaXMucGFyZW50Vmlldy5pbmplY3Rvcih0aGlzLmluZGV4KTsgfVxuXG4gIG1hcE5lc3RlZFZpZXdzKG5lc3RlZFZpZXdDbGFzczogYW55LCBjYWxsYmFjazogRnVuY3Rpb24pOiBhbnlbXSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGlmIChpc1ByZXNlbnQodGhpcy5uZXN0ZWRWaWV3cykpIHtcbiAgICAgIHRoaXMubmVzdGVkVmlld3MuZm9yRWFjaCgobmVzdGVkVmlldykgPT4ge1xuICAgICAgICBpZiAobmVzdGVkVmlldy5jbGF6eiA9PT0gbmVzdGVkVmlld0NsYXNzKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goY2FsbGJhY2sobmVzdGVkVmlldykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG5cbiAgYXR0YWNoVmlldyh2aWV3OiBBcHBWaWV3PGFueT4sIHZpZXdJbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKHZpZXcudHlwZSA9PT0gVmlld1R5cGUuQ09NUE9ORU5UKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgQ29tcG9uZW50IHZpZXdzIGNhbid0IGJlIG1vdmVkIWApO1xuICAgIH1cbiAgICB2YXIgbmVzdGVkVmlld3MgPSB0aGlzLm5lc3RlZFZpZXdzO1xuICAgIGlmIChuZXN0ZWRWaWV3cyA9PSBudWxsKSB7XG4gICAgICBuZXN0ZWRWaWV3cyA9IFtdO1xuICAgICAgdGhpcy5uZXN0ZWRWaWV3cyA9IG5lc3RlZFZpZXdzO1xuICAgIH1cbiAgICBMaXN0V3JhcHBlci5pbnNlcnQobmVzdGVkVmlld3MsIHZpZXdJbmRleCwgdmlldyk7XG4gICAgdmFyIHJlZlJlbmRlck5vZGU7XG4gICAgaWYgKHZpZXdJbmRleCA+IDApIHtcbiAgICAgIHZhciBwcmV2VmlldyA9IG5lc3RlZFZpZXdzW3ZpZXdJbmRleCAtIDFdO1xuICAgICAgcmVmUmVuZGVyTm9kZSA9IHByZXZWaWV3Lmxhc3RSb290Tm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVmUmVuZGVyTm9kZSA9IHRoaXMubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgaWYgKGlzUHJlc2VudChyZWZSZW5kZXJOb2RlKSkge1xuICAgICAgdmlldy5yZW5kZXJlci5hdHRhY2hWaWV3QWZ0ZXIocmVmUmVuZGVyTm9kZSwgdmlldy5mbGF0Um9vdE5vZGVzKTtcbiAgICB9XG4gICAgdmlldy5hZGRUb0NvbnRlbnRDaGlsZHJlbih0aGlzKTtcbiAgfVxuXG4gIGRldGFjaFZpZXcodmlld0luZGV4OiBudW1iZXIpOiBBcHBWaWV3PGFueT4ge1xuICAgIHZhciB2aWV3ID0gTGlzdFdyYXBwZXIucmVtb3ZlQXQodGhpcy5uZXN0ZWRWaWV3cywgdmlld0luZGV4KTtcbiAgICBpZiAodmlldy50eXBlID09PSBWaWV3VHlwZS5DT01QT05FTlQpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBDb21wb25lbnQgdmlld3MgY2FuJ3QgYmUgbW92ZWQhYCk7XG4gICAgfVxuXG4gICAgdmlldy5yZW5kZXJlci5kZXRhY2hWaWV3KHZpZXcuZmxhdFJvb3ROb2Rlcyk7XG5cbiAgICB2aWV3LnJlbW92ZUZyb21Db250ZW50Q2hpbGRyZW4odGhpcyk7XG4gICAgcmV0dXJuIHZpZXc7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
