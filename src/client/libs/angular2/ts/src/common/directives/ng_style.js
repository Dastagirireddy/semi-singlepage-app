System.register(['angular2/core', 'angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var core_1, lang_1;
    var NgStyle;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * The `NgStyle` directive changes styles based on a result of expression evaluation.
             *
             * An expression assigned to the `ngStyle` property must evaluate to an object and the
             * corresponding element styles are updated based on changes to this object. Style names to update
             * are taken from the object's keys, and values - from the corresponding object's values.
             *
             * ### Syntax
             *
             * - `<div [ngStyle]="{'font-style': style}"></div>`
             * - `<div [ngStyle]="styleExp"></div>` - here the `styleExp` must evaluate to an object
             *
             * ### Example ([live demo](http://plnkr.co/edit/YamGS6GkUh9GqWNQhCyM?p=preview)):
             *
             * ```
             * import {Component} from 'angular2/core';
             * import {NgStyle} from 'angular2/common';
             *
             * @Component({
             *  selector: 'ngStyle-example',
             *  template: `
             *    <h1 [ngStyle]="{'font-style': style, 'font-size': size, 'font-weight': weight}">
             *      Change style of this text!
             *    </h1>
             *
             *    <hr>
             *
             *    <label>Italic: <input type="checkbox" (change)="changeStyle($event)"></label>
             *    <label>Bold: <input type="checkbox" (change)="changeWeight($event)"></label>
             *    <label>Size: <input type="text" [value]="size" (change)="size = $event.target.value"></label>
             *  `,
             *  directives: [NgStyle]
             * })
             * export class NgStyleExample {
             *    style = 'normal';
             *    weight = 'normal';
             *    size = '20px';
             *
             *    changeStyle($event: any) {
             *      this.style = $event.target.checked ? 'italic' : 'normal';
             *    }
             *
             *    changeWeight($event: any) {
             *      this.weight = $event.target.checked ? 'bold' : 'normal';
             *    }
             * }
             * ```
             *
             * In this example the `font-style`, `font-size` and `font-weight` styles will be updated
             * based on the `style` property's value changes.
             */
            NgStyle = (function () {
                function NgStyle(_differs, _ngEl, _renderer) {
                    this._differs = _differs;
                    this._ngEl = _ngEl;
                    this._renderer = _renderer;
                }
                Object.defineProperty(NgStyle.prototype, "rawStyle", {
                    set: function (v) {
                        this._rawStyle = v;
                        if (lang_1.isBlank(this._differ) && lang_1.isPresent(v)) {
                            this._differ = this._differs.find(this._rawStyle).create(null);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                NgStyle.prototype.ngDoCheck = function () {
                    if (lang_1.isPresent(this._differ)) {
                        var changes = this._differ.diff(this._rawStyle);
                        if (lang_1.isPresent(changes)) {
                            this._applyChanges(changes);
                        }
                    }
                };
                NgStyle.prototype._applyChanges = function (changes) {
                    var _this = this;
                    changes.forEachAddedItem(function (record) { _this._setStyle(record.key, record.currentValue); });
                    changes.forEachChangedItem(function (record) { _this._setStyle(record.key, record.currentValue); });
                    changes.forEachRemovedItem(function (record) { _this._setStyle(record.key, null); });
                };
                NgStyle.prototype._setStyle = function (name, val) {
                    this._renderer.setElementStyle(this._ngEl.nativeElement, name, val);
                };
                NgStyle = __decorate([
                    core_1.Directive({ selector: '[ngStyle]', inputs: ['rawStyle: ngStyle'] }), 
                    __metadata('design:paramtypes', [core_1.KeyValueDiffers, core_1.ElementRef, core_1.Renderer])
                ], NgStyle);
                return NgStyle;
            }());
            exports_1("NgStyle", NgStyle);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9kaXJlY3RpdmVzL25nX3N0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBV0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBa0RHO1lBRUg7Z0JBTUUsaUJBQW9CLFFBQXlCLEVBQVUsS0FBaUIsRUFDcEQsU0FBbUI7b0JBRG5CLGFBQVEsR0FBUixRQUFRLENBQWlCO29CQUFVLFVBQUssR0FBTCxLQUFLLENBQVk7b0JBQ3BELGNBQVMsR0FBVCxTQUFTLENBQVU7Z0JBQUcsQ0FBQztnQkFFM0Msc0JBQUksNkJBQVE7eUJBQVosVUFBYSxDQUEwQjt3QkFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7d0JBQ25CLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZ0JBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDakUsQ0FBQztvQkFDSCxDQUFDOzs7bUJBQUE7Z0JBRUQsMkJBQVMsR0FBVDtvQkFDRSxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDaEQsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzlCLENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUVPLCtCQUFhLEdBQXJCLFVBQXNCLE9BQVk7b0JBQWxDLGlCQU9DO29CQU5DLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FDcEIsVUFBQyxNQUE0QixJQUFPLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUYsT0FBTyxDQUFDLGtCQUFrQixDQUN0QixVQUFDLE1BQTRCLElBQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1RixPQUFPLENBQUMsa0JBQWtCLENBQ3RCLFVBQUMsTUFBNEIsSUFBTyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0UsQ0FBQztnQkFFTywyQkFBUyxHQUFqQixVQUFrQixJQUFZLEVBQUUsR0FBVztvQkFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDO2dCQXJDSDtvQkFBQyxnQkFBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFDLENBQUM7OzJCQUFBO2dCQXNDbEUsY0FBQztZQUFELENBckNBLEFBcUNDLElBQUE7WUFyQ0QsNkJBcUNDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL2RpcmVjdGl2ZXMvbmdfc3R5bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEb0NoZWNrLFxuICBLZXlWYWx1ZURpZmZlcixcbiAgS2V5VmFsdWVEaWZmZXJzLFxuICBFbGVtZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIFJlbmRlcmVyXG59IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmssIHByaW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtLZXlWYWx1ZUNoYW5nZVJlY29yZH0gZnJvbSBcIi4uLy4uL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9kaWZmZXJzL2RlZmF1bHRfa2V5dmFsdWVfZGlmZmVyXCI7XG5cbi8qKlxuICogVGhlIGBOZ1N0eWxlYCBkaXJlY3RpdmUgY2hhbmdlcyBzdHlsZXMgYmFzZWQgb24gYSByZXN1bHQgb2YgZXhwcmVzc2lvbiBldmFsdWF0aW9uLlxuICpcbiAqIEFuIGV4cHJlc3Npb24gYXNzaWduZWQgdG8gdGhlIGBuZ1N0eWxlYCBwcm9wZXJ0eSBtdXN0IGV2YWx1YXRlIHRvIGFuIG9iamVjdCBhbmQgdGhlXG4gKiBjb3JyZXNwb25kaW5nIGVsZW1lbnQgc3R5bGVzIGFyZSB1cGRhdGVkIGJhc2VkIG9uIGNoYW5nZXMgdG8gdGhpcyBvYmplY3QuIFN0eWxlIG5hbWVzIHRvIHVwZGF0ZVxuICogYXJlIHRha2VuIGZyb20gdGhlIG9iamVjdCdzIGtleXMsIGFuZCB2YWx1ZXMgLSBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIG9iamVjdCdzIHZhbHVlcy5cbiAqXG4gKiAjIyMgU3ludGF4XG4gKlxuICogLSBgPGRpdiBbbmdTdHlsZV09XCJ7J2ZvbnQtc3R5bGUnOiBzdHlsZX1cIj48L2Rpdj5gXG4gKiAtIGA8ZGl2IFtuZ1N0eWxlXT1cInN0eWxlRXhwXCI+PC9kaXY+YCAtIGhlcmUgdGhlIGBzdHlsZUV4cGAgbXVzdCBldmFsdWF0ZSB0byBhbiBvYmplY3RcbiAqXG4gKiAjIyMgRXhhbXBsZSAoW2xpdmUgZGVtb10oaHR0cDovL3BsbmtyLmNvL2VkaXQvWWFtR1M2R2tVaDlHcVdOUWhDeU0/cD1wcmV2aWV3KSk6XG4gKlxuICogYGBgXG4gKiBpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG4gKiBpbXBvcnQge05nU3R5bGV9IGZyb20gJ2FuZ3VsYXIyL2NvbW1vbic7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgc2VsZWN0b3I6ICduZ1N0eWxlLWV4YW1wbGUnLFxuICogIHRlbXBsYXRlOiBgXG4gKiAgICA8aDEgW25nU3R5bGVdPVwieydmb250LXN0eWxlJzogc3R5bGUsICdmb250LXNpemUnOiBzaXplLCAnZm9udC13ZWlnaHQnOiB3ZWlnaHR9XCI+XG4gKiAgICAgIENoYW5nZSBzdHlsZSBvZiB0aGlzIHRleHQhXG4gKiAgICA8L2gxPlxuICpcbiAqICAgIDxocj5cbiAqXG4gKiAgICA8bGFiZWw+SXRhbGljOiA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgKGNoYW5nZSk9XCJjaGFuZ2VTdHlsZSgkZXZlbnQpXCI+PC9sYWJlbD5cbiAqICAgIDxsYWJlbD5Cb2xkOiA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgKGNoYW5nZSk9XCJjaGFuZ2VXZWlnaHQoJGV2ZW50KVwiPjwvbGFiZWw+XG4gKiAgICA8bGFiZWw+U2l6ZTogPGlucHV0IHR5cGU9XCJ0ZXh0XCIgW3ZhbHVlXT1cInNpemVcIiAoY2hhbmdlKT1cInNpemUgPSAkZXZlbnQudGFyZ2V0LnZhbHVlXCI+PC9sYWJlbD5cbiAqICBgLFxuICogIGRpcmVjdGl2ZXM6IFtOZ1N0eWxlXVxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBOZ1N0eWxlRXhhbXBsZSB7XG4gKiAgICBzdHlsZSA9ICdub3JtYWwnO1xuICogICAgd2VpZ2h0ID0gJ25vcm1hbCc7XG4gKiAgICBzaXplID0gJzIwcHgnO1xuICpcbiAqICAgIGNoYW5nZVN0eWxlKCRldmVudDogYW55KSB7XG4gKiAgICAgIHRoaXMuc3R5bGUgPSAkZXZlbnQudGFyZ2V0LmNoZWNrZWQgPyAnaXRhbGljJyA6ICdub3JtYWwnO1xuICogICAgfVxuICpcbiAqICAgIGNoYW5nZVdlaWdodCgkZXZlbnQ6IGFueSkge1xuICogICAgICB0aGlzLndlaWdodCA9ICRldmVudC50YXJnZXQuY2hlY2tlZCA/ICdib2xkJyA6ICdub3JtYWwnO1xuICogICAgfVxuICogfVxuICogYGBgXG4gKlxuICogSW4gdGhpcyBleGFtcGxlIHRoZSBgZm9udC1zdHlsZWAsIGBmb250LXNpemVgIGFuZCBgZm9udC13ZWlnaHRgIHN0eWxlcyB3aWxsIGJlIHVwZGF0ZWRcbiAqIGJhc2VkIG9uIHRoZSBgc3R5bGVgIHByb3BlcnR5J3MgdmFsdWUgY2hhbmdlcy5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmdTdHlsZV0nLCBpbnB1dHM6IFsncmF3U3R5bGU6IG5nU3R5bGUnXX0pXG5leHBvcnQgY2xhc3MgTmdTdHlsZSBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICAvKiogQGludGVybmFsICovXG4gIF9yYXdTdHlsZToge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2RpZmZlcjogS2V5VmFsdWVEaWZmZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLCBwcml2YXRlIF9uZ0VsOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIpIHt9XG5cbiAgc2V0IHJhd1N0eWxlKHY6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9KSB7XG4gICAgdGhpcy5fcmF3U3R5bGUgPSB2O1xuICAgIGlmIChpc0JsYW5rKHRoaXMuX2RpZmZlcikgJiYgaXNQcmVzZW50KHYpKSB7XG4gICAgICB0aGlzLl9kaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQodGhpcy5fcmF3U3R5bGUpLmNyZWF0ZShudWxsKTtcbiAgICB9XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgaWYgKGlzUHJlc2VudCh0aGlzLl9kaWZmZXIpKSB7XG4gICAgICB2YXIgY2hhbmdlcyA9IHRoaXMuX2RpZmZlci5kaWZmKHRoaXMuX3Jhd1N0eWxlKTtcbiAgICAgIGlmIChpc1ByZXNlbnQoY2hhbmdlcykpIHtcbiAgICAgICAgdGhpcy5fYXBwbHlDaGFuZ2VzKGNoYW5nZXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FwcGx5Q2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcbiAgICBjaGFuZ2VzLmZvckVhY2hBZGRlZEl0ZW0oXG4gICAgICAgIChyZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkKSA9PiB7IHRoaXMuX3NldFN0eWxlKHJlY29yZC5rZXksIHJlY29yZC5jdXJyZW50VmFsdWUpOyB9KTtcbiAgICBjaGFuZ2VzLmZvckVhY2hDaGFuZ2VkSXRlbShcbiAgICAgICAgKHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmQpID0+IHsgdGhpcy5fc2V0U3R5bGUocmVjb3JkLmtleSwgcmVjb3JkLmN1cnJlbnRWYWx1ZSk7IH0pO1xuICAgIGNoYW5nZXMuZm9yRWFjaFJlbW92ZWRJdGVtKFxuICAgICAgICAocmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZCkgPT4geyB0aGlzLl9zZXRTdHlsZShyZWNvcmQua2V5LCBudWxsKTsgfSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRTdHlsZShuYW1lOiBzdHJpbmcsIHZhbDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHRoaXMuX25nRWwubmF0aXZlRWxlbWVudCwgbmFtZSwgdmFsKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
