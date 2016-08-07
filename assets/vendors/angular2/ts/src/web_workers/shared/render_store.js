System.register(["angular2/src/core/di"], function(exports_1, context_1) {
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
    var di_1;
    var RenderStore;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            RenderStore = (function () {
                function RenderStore() {
                    this._nextIndex = 0;
                    this._lookupById = new Map();
                    this._lookupByObject = new Map();
                }
                RenderStore.prototype.allocateId = function () { return this._nextIndex++; };
                RenderStore.prototype.store = function (obj, id) {
                    this._lookupById.set(id, obj);
                    this._lookupByObject.set(obj, id);
                };
                RenderStore.prototype.remove = function (obj) {
                    var index = this._lookupByObject.get(obj);
                    this._lookupByObject.delete(obj);
                    this._lookupById.delete(index);
                };
                RenderStore.prototype.deserialize = function (id) {
                    if (id == null) {
                        return null;
                    }
                    if (!this._lookupById.has(id)) {
                        return null;
                    }
                    return this._lookupById.get(id);
                };
                RenderStore.prototype.serialize = function (obj) {
                    if (obj == null) {
                        return null;
                    }
                    return this._lookupByObject.get(obj);
                };
                RenderStore = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], RenderStore);
                return RenderStore;
            }());
            exports_1("RenderStore", RenderStore);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBR0E7Z0JBS0U7b0JBSlEsZUFBVSxHQUFXLENBQUMsQ0FBQztvQkFLN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO29CQUMxQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7Z0JBQ2hELENBQUM7Z0JBRUQsZ0NBQVUsR0FBVixjQUF1QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFbEQsMkJBQUssR0FBTCxVQUFNLEdBQVEsRUFBRSxFQUFVO29CQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztnQkFFRCw0QkFBTSxHQUFOLFVBQU8sR0FBUTtvQkFDYixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO2dCQUVELGlDQUFXLEdBQVgsVUFBWSxFQUFVO29CQUNwQixFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDZixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNkLENBQUM7b0JBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2QsQ0FBQztvQkFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xDLENBQUM7Z0JBRUQsK0JBQVMsR0FBVCxVQUFVLEdBQVE7b0JBQ2hCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNkLENBQUM7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO2dCQXpDSDtvQkFBQyxlQUFVLEVBQUU7OytCQUFBO2dCQTBDYixrQkFBQztZQUFELENBekNBLEFBeUNDLElBQUE7WUF6Q0QscUNBeUNDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9yZW5kZXJfc3RvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9kaVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVuZGVyU3RvcmUge1xuICBwcml2YXRlIF9uZXh0SW5kZXg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2xvb2t1cEJ5SWQ6IE1hcDxudW1iZXIsIGFueT47XG4gIHByaXZhdGUgX2xvb2t1cEJ5T2JqZWN0OiBNYXA8YW55LCBudW1iZXI+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2xvb2t1cEJ5SWQgPSBuZXcgTWFwPG51bWJlciwgYW55PigpO1xuICAgIHRoaXMuX2xvb2t1cEJ5T2JqZWN0ID0gbmV3IE1hcDxhbnksIG51bWJlcj4oKTtcbiAgfVxuXG4gIGFsbG9jYXRlSWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX25leHRJbmRleCsrOyB9XG5cbiAgc3RvcmUob2JqOiBhbnksIGlkOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9sb29rdXBCeUlkLnNldChpZCwgb2JqKTtcbiAgICB0aGlzLl9sb29rdXBCeU9iamVjdC5zZXQob2JqLCBpZCk7XG4gIH1cblxuICByZW1vdmUob2JqOiBhbnkpOiB2b2lkIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLl9sb29rdXBCeU9iamVjdC5nZXQob2JqKTtcbiAgICB0aGlzLl9sb29rdXBCeU9iamVjdC5kZWxldGUob2JqKTtcbiAgICB0aGlzLl9sb29rdXBCeUlkLmRlbGV0ZShpbmRleCk7XG4gIH1cblxuICBkZXNlcmlhbGl6ZShpZDogbnVtYmVyKTogYW55IHtcbiAgICBpZiAoaWQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9sb29rdXBCeUlkLmhhcyhpZCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9sb29rdXBCeUlkLmdldChpZCk7XG4gIH1cblxuICBzZXJpYWxpemUob2JqOiBhbnkpOiBudW1iZXIge1xuICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9sb29rdXBCeU9iamVjdC5nZXQob2JqKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
