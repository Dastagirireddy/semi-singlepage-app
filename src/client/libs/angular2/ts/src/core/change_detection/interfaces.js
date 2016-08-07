System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DebugContext, ChangeDetectorGenConfig, ChangeDetectorDefinition;
    return {
        setters:[],
        execute: function() {
            DebugContext = (function () {
                function DebugContext(element, componentElement, directive, context, locals, injector) {
                    this.element = element;
                    this.componentElement = componentElement;
                    this.directive = directive;
                    this.context = context;
                    this.locals = locals;
                    this.injector = injector;
                }
                return DebugContext;
            }());
            exports_1("DebugContext", DebugContext);
            ChangeDetectorGenConfig = (function () {
                function ChangeDetectorGenConfig(genDebugInfo, logBindingUpdate, useJit) {
                    this.genDebugInfo = genDebugInfo;
                    this.logBindingUpdate = logBindingUpdate;
                    this.useJit = useJit;
                }
                return ChangeDetectorGenConfig;
            }());
            exports_1("ChangeDetectorGenConfig", ChangeDetectorGenConfig);
            ChangeDetectorDefinition = (function () {
                function ChangeDetectorDefinition(id, strategy, variableNames, bindingRecords, eventRecords, directiveRecords, genConfig) {
                    this.id = id;
                    this.strategy = strategy;
                    this.variableNames = variableNames;
                    this.bindingRecords = bindingRecords;
                    this.eventRecords = eventRecords;
                    this.directiveRecords = directiveRecords;
                    this.genConfig = genConfig;
                }
                return ChangeDetectorDefinition;
            }());
            exports_1("ChangeDetectorDefinition", ChangeDetectorDefinition);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9pbnRlcmZhY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7WUFNQTtnQkFDRSxzQkFBbUIsT0FBWSxFQUFTLGdCQUFxQixFQUFTLFNBQWMsRUFDakUsT0FBWSxFQUFTLE1BQVcsRUFBUyxRQUFhO29CQUR0RCxZQUFPLEdBQVAsT0FBTyxDQUFLO29CQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBSztvQkFBUyxjQUFTLEdBQVQsU0FBUyxDQUFLO29CQUNqRSxZQUFPLEdBQVAsT0FBTyxDQUFLO29CQUFTLFdBQU0sR0FBTixNQUFNLENBQUs7b0JBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBSztnQkFBRyxDQUFDO2dCQUMvRSxtQkFBQztZQUFELENBSEEsQUFHQyxJQUFBO1lBSEQsdUNBR0MsQ0FBQTtZQW9DRDtnQkFDRSxpQ0FBbUIsWUFBcUIsRUFBUyxnQkFBeUIsRUFDdkQsTUFBZTtvQkFEZixpQkFBWSxHQUFaLFlBQVksQ0FBUztvQkFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVM7b0JBQ3ZELFdBQU0sR0FBTixNQUFNLENBQVM7Z0JBQUcsQ0FBQztnQkFDeEMsOEJBQUM7WUFBRCxDQUhBLEFBR0MsSUFBQTtZQUhELDZEQUdDLENBQUE7WUFFRDtnQkFDRSxrQ0FBbUIsRUFBVSxFQUFTLFFBQWlDLEVBQ3BELGFBQXVCLEVBQVMsY0FBK0IsRUFDL0QsWUFBNkIsRUFBUyxnQkFBbUMsRUFDekUsU0FBa0M7b0JBSGxDLE9BQUUsR0FBRixFQUFFLENBQVE7b0JBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7b0JBQ3BELGtCQUFhLEdBQWIsYUFBYSxDQUFVO29CQUFTLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtvQkFDL0QsaUJBQVksR0FBWixZQUFZLENBQWlCO29CQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUI7b0JBQ3pFLGNBQVMsR0FBVCxTQUFTLENBQXlCO2dCQUFHLENBQUM7Z0JBQzNELCtCQUFDO1lBQUQsQ0FMQSxBQUtDLElBQUE7WUFMRCwrREFLQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9pbnRlcmZhY2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMb2NhbHN9IGZyb20gJy4vcGFyc2VyL2xvY2Fscyc7XG5pbXBvcnQge0JpbmRpbmdUYXJnZXQsIEJpbmRpbmdSZWNvcmR9IGZyb20gJy4vYmluZGluZ19yZWNvcmQnO1xuaW1wb3J0IHtEaXJlY3RpdmVSZWNvcmQsIERpcmVjdGl2ZUluZGV4fSBmcm9tICcuL2RpcmVjdGl2ZV9yZWNvcmQnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnLi9jaGFuZ2VfZGV0ZWN0b3JfcmVmJztcblxuZXhwb3J0IGNsYXNzIERlYnVnQ29udGV4dCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBhbnksIHB1YmxpYyBjb21wb25lbnRFbGVtZW50OiBhbnksIHB1YmxpYyBkaXJlY3RpdmU6IGFueSxcbiAgICAgICAgICAgICAgcHVibGljIGNvbnRleHQ6IGFueSwgcHVibGljIGxvY2FsczogYW55LCBwdWJsaWMgaW5qZWN0b3I6IGFueSkge31cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VEaXNwYXRjaGVyIHtcbiAgZ2V0RGVidWdDb250ZXh0KGFwcEVsZW1lbnQ6IGFueSwgZWxlbWVudEluZGV4OiBudW1iZXIsIGRpcmVjdGl2ZUluZGV4OiBudW1iZXIpOiBEZWJ1Z0NvbnRleHQ7XG4gIG5vdGlmeU9uQmluZGluZyhiaW5kaW5nVGFyZ2V0OiBCaW5kaW5nVGFyZ2V0LCB2YWx1ZTogYW55KTogdm9pZDtcbiAgbG9nQmluZGluZ1VwZGF0ZShiaW5kaW5nVGFyZ2V0OiBCaW5kaW5nVGFyZ2V0LCB2YWx1ZTogYW55KTogdm9pZDtcbiAgbm90aWZ5QWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkO1xuICBub3RpZnlBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQ7XG4gIG5vdGlmeU9uRGVzdHJveSgpOiB2b2lkO1xuICBnZXREZXRlY3RvckZvcihkaXJlY3RpdmVJbmRleDogRGlyZWN0aXZlSW5kZXgpOiBDaGFuZ2VEZXRlY3RvcjtcbiAgZ2V0RGlyZWN0aXZlRm9yKGRpcmVjdGl2ZUluZGV4OiBEaXJlY3RpdmVJbmRleCk6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VEZXRlY3RvciB7XG4gIHBhcmVudDogQ2hhbmdlRGV0ZWN0b3I7XG4gIG1vZGU6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5O1xuICByZWY6IENoYW5nZURldGVjdG9yUmVmO1xuXG4gIGFkZENvbnRlbnRDaGlsZChjZDogQ2hhbmdlRGV0ZWN0b3IpOiB2b2lkO1xuICBhZGRWaWV3Q2hpbGQoY2Q6IENoYW5nZURldGVjdG9yKTogdm9pZDtcbiAgcmVtb3ZlQ29udGVudENoaWxkKGNkOiBDaGFuZ2VEZXRlY3Rvcik6IHZvaWQ7XG4gIHJlbW92ZVZpZXdDaGlsZChjZDogQ2hhbmdlRGV0ZWN0b3IpOiB2b2lkO1xuICByZW1vdmUoKTogdm9pZDtcbiAgaHlkcmF0ZShjb250ZXh0OiBhbnksIGxvY2FsczogTG9jYWxzLCBkaXNwYXRjaGVyOiBDaGFuZ2VEaXNwYXRjaGVyLCBwaXBlczogYW55KTogdm9pZDtcbiAgZGVoeWRyYXRlKCk6IHZvaWQ7XG4gIG1hcmtQYXRoVG9Sb290QXNDaGVja09uY2UoKTogdm9pZDtcblxuICBoYW5kbGVFdmVudChldmVudE5hbWU6IHN0cmluZywgZWxJbmRleDogbnVtYmVyLCBldmVudDogYW55KTtcbiAgZGV0ZWN0Q2hhbmdlcygpOiB2b2lkO1xuICBjaGVja05vQ2hhbmdlcygpOiB2b2lkO1xuICBkZXN0cm95UmVjdXJzaXZlKCk6IHZvaWQ7XG4gIG1hcmtBc0NoZWNrT25jZSgpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb3RvQ2hhbmdlRGV0ZWN0b3IgeyBpbnN0YW50aWF0ZSgpOiBDaGFuZ2VEZXRlY3RvcjsgfVxuXG5leHBvcnQgY2xhc3MgQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWcge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2VuRGVidWdJbmZvOiBib29sZWFuLCBwdWJsaWMgbG9nQmluZGluZ1VwZGF0ZTogYm9vbGVhbixcbiAgICAgICAgICAgICAgcHVibGljIHVzZUppdDogYm9vbGVhbikge31cbn1cblxuZXhwb3J0IGNsYXNzIENoYW5nZURldGVjdG9yRGVmaW5pdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogc3RyaW5nLCBwdWJsaWMgc3RyYXRlZ3k6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgICAgICAgICAgICBwdWJsaWMgdmFyaWFibGVOYW1lczogc3RyaW5nW10sIHB1YmxpYyBiaW5kaW5nUmVjb3JkczogQmluZGluZ1JlY29yZFtdLFxuICAgICAgICAgICAgICBwdWJsaWMgZXZlbnRSZWNvcmRzOiBCaW5kaW5nUmVjb3JkW10sIHB1YmxpYyBkaXJlY3RpdmVSZWNvcmRzOiBEaXJlY3RpdmVSZWNvcmRbXSxcbiAgICAgICAgICAgICAgcHVibGljIGdlbkNvbmZpZzogQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWcpIHt9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
