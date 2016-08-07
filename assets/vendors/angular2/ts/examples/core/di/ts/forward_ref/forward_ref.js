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
            injector = core_1.ReflectiveInjector.resolveAndCreate([Door, Lock]);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL2V4YW1wbGVzL2NvcmUvZGkvdHMvZm9yd2FyZF9yZWYvZm9yd2FyZF9yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztRQVNJLEdBQUcsY0FZSCxRQUFRLEVBQ1IsSUFBSTs7Ozs7OztZQWRSLDRCQUE0QjtZQUN4QixHQUFHLEdBQUcsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUFDO1lBQ2pDLGdCQUFnQjtZQUVoQix5QkFBeUI7WUFDekI7Z0JBRUUsY0FBNEMsSUFBVTtvQkFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFBQyxDQUFDO2dCQUFqRTsrQkFBQyxhQUFNLENBQUMsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUFDOzt3QkFBQTtnQkFDN0MsV0FBQztZQUFELENBSEEsQUFHQyxJQUFBO1lBRUQsc0NBQXNDO1lBQ3RDO2dCQUFBO2dCQUFZLENBQUM7Z0JBQUQsV0FBQztZQUFELENBQVosQUFBYSxJQUFBO1lBRVQsUUFBUSxHQUFHLHlCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLGdCQUFnQjtZQUVoQixpQ0FBaUM7WUFDN0IsR0FBRyxHQUFHLGlCQUFVLENBQUMsY0FBTSxPQUFBLFVBQVUsRUFBVixDQUFVLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsd0JBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLHdCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7O0FBQ2xFLGdCQUFnQiIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9leGFtcGxlcy9jb3JlL2RpL3RzL2ZvcndhcmRfcmVmL2ZvcndhcmRfcmVmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5qZWN0LFxuICBSZWZsZWN0aXZlSW5qZWN0b3IsXG4gIGZvcndhcmRSZWYsXG4gIHJlc29sdmVGb3J3YXJkUmVmLFxuICBGb3J3YXJkUmVmRm5cbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbi8vICNkb2NyZWdpb24gZm9yd2FyZF9yZWZfZm5cbnZhciByZWYgPSBmb3J3YXJkUmVmKCgpID0+IExvY2spO1xuLy8gI2VuZGRvY3JlZ2lvblxuXG4vLyAjZG9jcmVnaW9uIGZvcndhcmRfcmVmXG5jbGFzcyBEb29yIHtcbiAgbG9jazogTG9jaztcbiAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IExvY2spKSBsb2NrOiBMb2NrKSB7IHRoaXMubG9jayA9IGxvY2s7IH1cbn1cblxuLy8gT25seSBhdCB0aGlzIHBvaW50IExvY2sgaXMgZGVmaW5lZC5cbmNsYXNzIExvY2sge31cblxudmFyIGluamVjdG9yID0gUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmVBbmRDcmVhdGUoW0Rvb3IsIExvY2tdKTtcbnZhciBkb29yID0gaW5qZWN0b3IuZ2V0KERvb3IpO1xuZXhwZWN0KGRvb3IgaW5zdGFuY2VvZiBEb29yKS50b0JlKHRydWUpO1xuZXhwZWN0KGRvb3IubG9jayBpbnN0YW5jZW9mIExvY2spLnRvQmUodHJ1ZSk7XG4vLyAjZW5kZG9jcmVnaW9uXG5cbi8vICNkb2NyZWdpb24gcmVzb2x2ZV9mb3J3YXJkX3JlZlxudmFyIHJlZiA9IGZvcndhcmRSZWYoKCkgPT4gXCJyZWZWYWx1ZVwiKTtcbmV4cGVjdChyZXNvbHZlRm9yd2FyZFJlZihyZWYpKS50b0VxdWFsKFwicmVmVmFsdWVcIik7XG5leHBlY3QocmVzb2x2ZUZvcndhcmRSZWYoXCJyZWd1bGFyVmFsdWVcIikpLnRvRXF1YWwoXCJyZWd1bGFyVmFsdWVcIik7XG4vLyAjZW5kZG9jcmVnaW9uIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
