System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var core_1;
    var ref, Door, Lock, injector, door;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            // #docregion forward_ref_fn
            ref = core_1.forwardRef(function () { return Lock; });
            // #enddocregion
            // #docregion forward_ref
            Door = (function () {
                function Door(lock) {
                    this.lock = lock;
                }
                Door = __decorate([
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return Lock; }))), 
                    __metadata('design:paramtypes', [Lock])
                ], Door);
                return Door;
            }());
            // Only at this point Lock is defined.
            Lock = (function () {
                function Lock() {
                }
                return Lock;
            }());
            injector = core_1.Injector.resolveAndCreate([Door, Lock]);
            door = injector.get(Door);
            expect(door instanceof Door).toBe(true);
            expect(door.lock instanceof Lock).toBe(true);
            // #enddocregion
            // #docregion resolve_forward_ref
            ref = core_1.forwardRef(function () { return "refValue"; });
            expect(core_1.resolveForwardRef(ref)).toEqual("refValue");
            expect(core_1.resolveForwardRef("regularValue")).toEqual("regularValue");
        }
    }
});
// #enddocregion 

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvZXhhbXBsZXMvY29yZS9kaS90cy9mb3J3YXJkX3JlZi9mb3J3YXJkX3JlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1FBR0ksR0FBRyxjQVlILFFBQVEsRUFDUixJQUFJOzs7Ozs7O1lBZFIsNEJBQTRCO1lBQ3hCLEdBQUcsR0FBRyxpQkFBVSxDQUFDLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDLENBQUM7WUFDakMsZ0JBQWdCO1lBRWhCLHlCQUF5QjtZQUN6QjtnQkFFRSxjQUE0QyxJQUFVO29CQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUFDLENBQUM7Z0JBQWpFOytCQUFDLGFBQU0sQ0FBQyxpQkFBVSxDQUFDLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDLENBQUM7O3dCQUFBO2dCQUM3QyxXQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFFRCxzQ0FBc0M7WUFDdEM7Z0JBQUE7Z0JBQVksQ0FBQztnQkFBRCxXQUFDO1lBQUQsQ0FBWixBQUFhLElBQUE7WUFFVCxRQUFRLEdBQUcsZUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLGdCQUFnQjtZQUVoQixpQ0FBaUM7WUFDN0IsR0FBRyxHQUFHLGlCQUFVLENBQUMsY0FBTSxPQUFBLFVBQVUsRUFBVixDQUFVLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsd0JBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLHdCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7O0FBQ2xFLGdCQUFnQiIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvZGkvdHMvZm9yd2FyZF9yZWYvZm9yd2FyZF9yZWYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0b3IsIGZvcndhcmRSZWYsIHJlc29sdmVGb3J3YXJkUmVmLCBGb3J3YXJkUmVmRm59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG4vLyAjZG9jcmVnaW9uIGZvcndhcmRfcmVmX2ZuXG52YXIgcmVmID0gZm9yd2FyZFJlZigoKSA9PiBMb2NrKTtcbi8vICNlbmRkb2NyZWdpb25cblxuLy8gI2RvY3JlZ2lvbiBmb3J3YXJkX3JlZlxuY2xhc3MgRG9vciB7XG4gIGxvY2s6IExvY2s7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBMb2NrKSkgbG9jazogTG9jaykgeyB0aGlzLmxvY2sgPSBsb2NrOyB9XG59XG5cbi8vIE9ubHkgYXQgdGhpcyBwb2ludCBMb2NrIGlzIGRlZmluZWQuXG5jbGFzcyBMb2NrIHt9XG5cbnZhciBpbmplY3RvciA9IEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW0Rvb3IsIExvY2tdKTtcbnZhciBkb29yID0gaW5qZWN0b3IuZ2V0KERvb3IpO1xuZXhwZWN0KGRvb3IgaW5zdGFuY2VvZiBEb29yKS50b0JlKHRydWUpO1xuZXhwZWN0KGRvb3IubG9jayBpbnN0YW5jZW9mIExvY2spLnRvQmUodHJ1ZSk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gcmVzb2x2ZV9mb3J3YXJkX3JlZlxudmFyIHJlZiA9IGZvcndhcmRSZWYoKCkgPT4gXCJyZWZWYWx1ZVwiKTtcbmV4cGVjdChyZXNvbHZlRm9yd2FyZFJlZihyZWYpKS50b0VxdWFsKFwicmVmVmFsdWVcIik7XG5leHBlY3QocmVzb2x2ZUZvcndhcmRSZWYoXCJyZWd1bGFyVmFsdWVcIikpLnRvRXF1YWwoXCJyZWd1bGFyVmFsdWVcIik7XG4vLyAjZW5kZG9jcmVnaW9uIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
