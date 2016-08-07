System.register(['angular2/core', 'angular2/src/facade/lang', './control_container', './shared', '../validators'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, lang_1, control_container_1, shared_1, validators_1;
    var controlGroupProvider, NgControlGroup;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (control_container_1_1) {
                control_container_1 = control_container_1_1;
            },
            function (shared_1_1) {
                shared_1 = shared_1_1;
            },
            function (validators_1_1) {
                validators_1 = validators_1_1;
            }],
        execute: function() {
            controlGroupProvider = lang_1.CONST_EXPR(new core_1.Provider(control_container_1.ControlContainer, { useExisting: core_1.forwardRef(function () { return NgControlGroup; }) }));
            /**
             * Creates and binds a control group to a DOM element.
             *
             * This directive can only be used as a child of {@link NgForm} or {@link NgFormModel}.
             *
             * ### Example ([live demo](http://plnkr.co/edit/7EJ11uGeaggViYM6T5nq?p=preview))
             *
             * ```typescript
             * @Component({
             *   selector: 'my-app',
             *   directives: [FORM_DIRECTIVES],
             *   template: `
             *     <div>
             *       <h2>Angular2 Control &amp; ControlGroup Example</h2>
             *       <form #f="ngForm">
             *         <div ngControlGroup="name" #cg-name="form">
             *           <h3>Enter your name:</h3>
             *           <p>First: <input ngControl="first" required></p>
             *           <p>Middle: <input ngControl="middle"></p>
             *           <p>Last: <input ngControl="last" required></p>
             *         </div>
             *         <h3>Name value:</h3>
             *         <pre>{{valueOf(cgName)}}</pre>
             *         <p>Name is {{cgName?.control?.valid ? "valid" : "invalid"}}</p>
             *         <h3>What's your favorite food?</h3>
             *         <p><input ngControl="food"></p>
             *         <h3>Form value</h3>
             *         <pre>{{valueOf(f)}}</pre>
             *       </form>
             *     </div>
             *   `,
             *   directives: [FORM_DIRECTIVES]
             * })
             * export class App {
             *   valueOf(cg: NgControlGroup): string {
             *     if (cg.control == null) {
             *       return null;
             *     }
             *     return JSON.stringify(cg.control.value, null, 2);
             *   }
             * }
             * ```
             *
             * This example declares a control group for a user's name. The value and validation state of
             * this group can be accessed separately from the overall form.
             */
            NgControlGroup = (function (_super) {
                __extends(NgControlGroup, _super);
                function NgControlGroup(parent, _validators, _asyncValidators) {
                    _super.call(this);
                    this._validators = _validators;
                    this._asyncValidators = _asyncValidators;
                    this._parent = parent;
                }
                NgControlGroup.prototype.ngOnInit = function () { this.formDirective.addControlGroup(this); };
                NgControlGroup.prototype.ngOnDestroy = function () { this.formDirective.removeControlGroup(this); };
                Object.defineProperty(NgControlGroup.prototype, "control", {
                    /**
                     * Get the {@link ControlGroup} backing this binding.
                     */
                    get: function () { return this.formDirective.getControlGroup(this); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgControlGroup.prototype, "path", {
                    /**
                     * Get the path to this control group.
                     */
                    get: function () { return shared_1.controlPath(this.name, this._parent); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgControlGroup.prototype, "formDirective", {
                    /**
                     * Get the {@link Form} to which this group belongs.
                     */
                    get: function () { return this._parent.formDirective; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgControlGroup.prototype, "validator", {
                    get: function () { return shared_1.composeValidators(this._validators); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgControlGroup.prototype, "asyncValidator", {
                    get: function () { return shared_1.composeAsyncValidators(this._asyncValidators); },
                    enumerable: true,
                    configurable: true
                });
                NgControlGroup = __decorate([
                    core_1.Directive({
                        selector: '[ngControlGroup]',
                        providers: [controlGroupProvider],
                        inputs: ['name: ngControlGroup'],
                        exportAs: 'ngForm'
                    }),
                    __param(0, core_1.Host()),
                    __param(0, core_1.SkipSelf()),
                    __param(1, core_1.Optional()),
                    __param(1, core_1.Self()),
                    __param(1, core_1.Inject(validators_1.NG_VALIDATORS)),
                    __param(2, core_1.Optional()),
                    __param(2, core_1.Self()),
                    __param(2, core_1.Inject(validators_1.NG_ASYNC_VALIDATORS)), 
                    __metadata('design:paramtypes', [control_container_1.ControlContainer, Array, Array])
                ], NgControlGroup);
                return NgControlGroup;
            }(control_container_1.ControlContainer));
            exports_1("NgControlGroup", NgControlGroup);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL25nX2NvbnRyb2xfZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBcUJNLG9CQUFvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQUFwQixvQkFBb0IsR0FDdEIsaUJBQVUsQ0FBQyxJQUFJLGVBQVEsQ0FBQyxvQ0FBZ0IsRUFBRSxFQUFDLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxjQUFjLEVBQWQsQ0FBYyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQTZDRztZQU9IO2dCQUFvQyxrQ0FBZ0I7Z0JBS2xELHdCQUFnQyxNQUF3QixFQUNPLFdBQWtCLEVBQ1osZ0JBQXVCO29CQUMxRixpQkFBTyxDQUFDO29CQUZxRCxnQkFBVyxHQUFYLFdBQVcsQ0FBTztvQkFDWixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQU87b0JBRTFGLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2dCQUN4QixDQUFDO2dCQUVELGlDQUFRLEdBQVIsY0FBbUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU5RCxvQ0FBVyxHQUFYLGNBQXNCLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUtwRSxzQkFBSSxtQ0FBTztvQkFIWDs7dUJBRUc7eUJBQ0gsY0FBOEIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUtoRixzQkFBSSxnQ0FBSTtvQkFIUjs7dUJBRUc7eUJBQ0gsY0FBdUIsTUFBTSxDQUFDLG9CQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7bUJBQUE7Z0JBS3JFLHNCQUFJLHlDQUFhO29CQUhqQjs7dUJBRUc7eUJBQ0gsY0FBNEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUVoRSxzQkFBSSxxQ0FBUzt5QkFBYixjQUErQixNQUFNLENBQUMsMEJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQUU1RSxzQkFBSSwwQ0FBYzt5QkFBbEIsY0FBeUMsTUFBTSxDQUFDLCtCQUFzQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O21CQUFBO2dCQXZDbEc7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsa0JBQWtCO3dCQUM1QixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQzt3QkFDakMsTUFBTSxFQUFFLENBQUMsc0JBQXNCLENBQUM7d0JBQ2hDLFFBQVEsRUFBRSxRQUFRO3FCQUNuQixDQUFDOytCQU1hLFdBQUksRUFBRTsrQkFBRSxlQUFRLEVBQUU7K0JBQ2xCLGVBQVEsRUFBRTsrQkFBRSxXQUFJLEVBQUU7K0JBQUUsYUFBTSxDQUFDLDBCQUFhLENBQUM7K0JBQ3pDLGVBQVEsRUFBRTsrQkFBRSxXQUFJLEVBQUU7K0JBQUUsYUFBTSxDQUFDLGdDQUFtQixDQUFDOztrQ0FSNUQ7Z0JBbUNGLHFCQUFDO1lBQUQsQ0FsQ0EsQUFrQ0MsQ0FsQ21DLG9DQUFnQixHQWtDbkQ7WUFsQ0QsMkNBa0NDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2Zvcm1zL2RpcmVjdGl2ZXMvbmdfY29udHJvbF9ncm91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBEaXJlY3RpdmUsXG4gIE9wdGlvbmFsLFxuICBJbmplY3QsXG4gIEhvc3QsXG4gIFNraXBTZWxmLFxuICBmb3J3YXJkUmVmLFxuICBQcm92aWRlcixcbiAgU2VsZlxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHtDb250cm9sQ29udGFpbmVyfSBmcm9tICcuL2NvbnRyb2xfY29udGFpbmVyJztcbmltcG9ydCB7Y29udHJvbFBhdGgsIGNvbXBvc2VWYWxpZGF0b3JzLCBjb21wb3NlQXN5bmNWYWxpZGF0b3JzfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQge0NvbnRyb2xHcm91cH0gZnJvbSAnLi4vbW9kZWwnO1xuaW1wb3J0IHtGb3JtfSBmcm9tICcuL2Zvcm1faW50ZXJmYWNlJztcbmltcG9ydCB7TkdfVkFMSURBVE9SUywgTkdfQVNZTkNfVkFMSURBVE9SU30gZnJvbSAnLi4vdmFsaWRhdG9ycyc7XG5pbXBvcnQge0FzeW5jVmFsaWRhdG9yRm4sIFZhbGlkYXRvckZufSBmcm9tICcuL3ZhbGlkYXRvcnMnO1xuXG5jb25zdCBjb250cm9sR3JvdXBQcm92aWRlciA9XG4gICAgQ09OU1RfRVhQUihuZXcgUHJvdmlkZXIoQ29udHJvbENvbnRhaW5lciwge3VzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nQ29udHJvbEdyb3VwKX0pKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuZCBiaW5kcyBhIGNvbnRyb2wgZ3JvdXAgdG8gYSBET00gZWxlbWVudC5cbiAqXG4gKiBUaGlzIGRpcmVjdGl2ZSBjYW4gb25seSBiZSB1c2VkIGFzIGEgY2hpbGQgb2Yge0BsaW5rIE5nRm9ybX0gb3Ige0BsaW5rIE5nRm9ybU1vZGVsfS5cbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvN0VKMTF1R2VhZ2dWaVlNNlQ1bnE/cD1wcmV2aWV3KSlcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdteS1hcHAnLFxuICogICBkaXJlY3RpdmVzOiBbRk9STV9ESVJFQ1RJVkVTXSxcbiAqICAgdGVtcGxhdGU6IGBcbiAqICAgICA8ZGl2PlxuICogICAgICAgPGgyPkFuZ3VsYXIyIENvbnRyb2wgJmFtcDsgQ29udHJvbEdyb3VwIEV4YW1wbGU8L2gyPlxuICogICAgICAgPGZvcm0gI2Y9XCJuZ0Zvcm1cIj5cbiAqICAgICAgICAgPGRpdiBuZ0NvbnRyb2xHcm91cD1cIm5hbWVcIiAjY2ctbmFtZT1cImZvcm1cIj5cbiAqICAgICAgICAgICA8aDM+RW50ZXIgeW91ciBuYW1lOjwvaDM+XG4gKiAgICAgICAgICAgPHA+Rmlyc3Q6IDxpbnB1dCBuZ0NvbnRyb2w9XCJmaXJzdFwiIHJlcXVpcmVkPjwvcD5cbiAqICAgICAgICAgICA8cD5NaWRkbGU6IDxpbnB1dCBuZ0NvbnRyb2w9XCJtaWRkbGVcIj48L3A+XG4gKiAgICAgICAgICAgPHA+TGFzdDogPGlucHV0IG5nQ29udHJvbD1cImxhc3RcIiByZXF1aXJlZD48L3A+XG4gKiAgICAgICAgIDwvZGl2PlxuICogICAgICAgICA8aDM+TmFtZSB2YWx1ZTo8L2gzPlxuICogICAgICAgICA8cHJlPnt7dmFsdWVPZihjZ05hbWUpfX08L3ByZT5cbiAqICAgICAgICAgPHA+TmFtZSBpcyB7e2NnTmFtZT8uY29udHJvbD8udmFsaWQgPyBcInZhbGlkXCIgOiBcImludmFsaWRcIn19PC9wPlxuICogICAgICAgICA8aDM+V2hhdCdzIHlvdXIgZmF2b3JpdGUgZm9vZD88L2gzPlxuICogICAgICAgICA8cD48aW5wdXQgbmdDb250cm9sPVwiZm9vZFwiPjwvcD5cbiAqICAgICAgICAgPGgzPkZvcm0gdmFsdWU8L2gzPlxuICogICAgICAgICA8cHJlPnt7dmFsdWVPZihmKX19PC9wcmU+XG4gKiAgICAgICA8L2Zvcm0+XG4gKiAgICAgPC9kaXY+XG4gKiAgIGAsXG4gKiAgIGRpcmVjdGl2ZXM6IFtGT1JNX0RJUkVDVElWRVNdXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIEFwcCB7XG4gKiAgIHZhbHVlT2YoY2c6IE5nQ29udHJvbEdyb3VwKTogc3RyaW5nIHtcbiAqICAgICBpZiAoY2cuY29udHJvbCA9PSBudWxsKSB7XG4gKiAgICAgICByZXR1cm4gbnVsbDtcbiAqICAgICB9XG4gKiAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNnLmNvbnRyb2wudmFsdWUsIG51bGwsIDIpO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBUaGlzIGV4YW1wbGUgZGVjbGFyZXMgYSBjb250cm9sIGdyb3VwIGZvciBhIHVzZXIncyBuYW1lLiBUaGUgdmFsdWUgYW5kIHZhbGlkYXRpb24gc3RhdGUgb2ZcbiAqIHRoaXMgZ3JvdXAgY2FuIGJlIGFjY2Vzc2VkIHNlcGFyYXRlbHkgZnJvbSB0aGUgb3ZlcmFsbCBmb3JtLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdDb250cm9sR3JvdXBdJyxcbiAgcHJvdmlkZXJzOiBbY29udHJvbEdyb3VwUHJvdmlkZXJdLFxuICBpbnB1dHM6IFsnbmFtZTogbmdDb250cm9sR3JvdXAnXSxcbiAgZXhwb3J0QXM6ICduZ0Zvcm0nXG59KVxuZXhwb3J0IGNsYXNzIE5nQ29udHJvbEdyb3VwIGV4dGVuZHMgQ29udHJvbENvbnRhaW5lciBpbXBsZW1lbnRzIE9uSW5pdCxcbiAgICBPbkRlc3Ryb3kge1xuICAvKiogQGludGVybmFsICovXG4gIF9wYXJlbnQ6IENvbnRyb2xDb250YWluZXI7XG5cbiAgY29uc3RydWN0b3IoQEhvc3QoKSBAU2tpcFNlbGYoKSBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19WQUxJREFUT1JTKSBwcml2YXRlIF92YWxpZGF0b3JzOiBhbnlbXSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX0FTWU5DX1ZBTElEQVRPUlMpIHByaXZhdGUgX2FzeW5jVmFsaWRhdG9yczogYW55W10pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQgeyB0aGlzLmZvcm1EaXJlY3RpdmUuYWRkQ29udHJvbEdyb3VwKHRoaXMpOyB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7IHRoaXMuZm9ybURpcmVjdGl2ZS5yZW1vdmVDb250cm9sR3JvdXAodGhpcyk7IH1cblxuICAvKipcbiAgICogR2V0IHRoZSB7QGxpbmsgQ29udHJvbEdyb3VwfSBiYWNraW5nIHRoaXMgYmluZGluZy5cbiAgICovXG4gIGdldCBjb250cm9sKCk6IENvbnRyb2xHcm91cCB7IHJldHVybiB0aGlzLmZvcm1EaXJlY3RpdmUuZ2V0Q29udHJvbEdyb3VwKHRoaXMpOyB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcGF0aCB0byB0aGlzIGNvbnRyb2wgZ3JvdXAuXG4gICAqL1xuICBnZXQgcGF0aCgpOiBzdHJpbmdbXSB7IHJldHVybiBjb250cm9sUGF0aCh0aGlzLm5hbWUsIHRoaXMuX3BhcmVudCk7IH1cblxuICAvKipcbiAgICogR2V0IHRoZSB7QGxpbmsgRm9ybX0gdG8gd2hpY2ggdGhpcyBncm91cCBiZWxvbmdzLlxuICAgKi9cbiAgZ2V0IGZvcm1EaXJlY3RpdmUoKTogRm9ybSB7IHJldHVybiB0aGlzLl9wYXJlbnQuZm9ybURpcmVjdGl2ZTsgfVxuXG4gIGdldCB2YWxpZGF0b3IoKTogVmFsaWRhdG9yRm4geyByZXR1cm4gY29tcG9zZVZhbGlkYXRvcnModGhpcy5fdmFsaWRhdG9ycyk7IH1cblxuICBnZXQgYXN5bmNWYWxpZGF0b3IoKTogQXN5bmNWYWxpZGF0b3JGbiB7IHJldHVybiBjb21wb3NlQXN5bmNWYWxpZGF0b3JzKHRoaXMuX2FzeW5jVmFsaWRhdG9ycyk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
