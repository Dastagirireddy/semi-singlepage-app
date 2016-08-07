System.register(['angular2/src/facade/async', './ng_zone_impl', '../../facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var async_1, ng_zone_impl_1, exceptions_1;
    var NgZone;
    return {
        setters:[
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (ng_zone_impl_1_1) {
                ng_zone_impl_1 = ng_zone_impl_1_1;
                exports_1({
                    "NgZoneError": ng_zone_impl_1_1["NgZoneError"]
                });
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
            /**
             * An injectable service for executing work inside or outside of the Angular zone.
             *
             * The most common use of this service is to optimize performance when starting a work consisting of
             * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
             * Angular. Such tasks can be kicked off via {@link #runOutsideAngular} and if needed, these tasks
             * can reenter the Angular zone via {@link #run}.
             *
             * <!-- TODO: add/fix links to:
             *   - docs explaining zones and the use of zones in Angular and change-detection
             *   - link to runOutsideAngular/run (throughout this file!)
             *   -->
             *
             * ### Example ([live demo](http://plnkr.co/edit/lY9m8HLy7z06vDoUaSN2?p=preview))
             * ```
             * import {Component, View, NgZone} from 'angular2/core';
             * import {NgIf} from 'angular2/common';
             *
             * @Component({
             *   selector: 'ng-zone-demo'.
             *   template: `
             *     <h2>Demo: NgZone</h2>
             *
             *     <p>Progress: {{progress}}%</p>
             *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
             *
             *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
             *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
             *   `,
             *   directives: [NgIf]
             * })
             * export class NgZoneDemo {
             *   progress: number = 0;
             *   label: string;
             *
             *   constructor(private _ngZone: NgZone) {}
             *
             *   // Loop inside the Angular zone
             *   // so the UI DOES refresh after each setTimeout cycle
             *   processWithinAngularZone() {
             *     this.label = 'inside';
             *     this.progress = 0;
             *     this._increaseProgress(() => console.log('Inside Done!'));
             *   }
             *
             *   // Loop outside of the Angular zone
             *   // so the UI DOES NOT refresh after each setTimeout cycle
             *   processOutsideOfAngularZone() {
             *     this.label = 'outside';
             *     this.progress = 0;
             *     this._ngZone.runOutsideAngular(() => {
             *       this._increaseProgress(() => {
             *       // reenter the Angular zone and display done
             *       this._ngZone.run(() => {console.log('Outside Done!') });
             *     }}));
             *   }
             *
             *
             *   _increaseProgress(doneCallback: () => void) {
             *     this.progress += 1;
             *     console.log(`Current progress: ${this.progress}%`);
             *
             *     if (this.progress < 100) {
             *       window.setTimeout(() => this._increaseProgress(doneCallback)), 10)
             *     } else {
             *       doneCallback();
             *     }
             *   }
             * }
             * ```
             */
            NgZone = (function () {
                /**
                 * @param {bool} enableLongStackTrace whether to enable long stack trace. They should only be
                 *               enabled in development mode as they significantly impact perf.
                 */
                function NgZone(_a) {
                    var _this = this;
                    var _b = _a.enableLongStackTrace, enableLongStackTrace = _b === void 0 ? false : _b;
                    this._hasPendingMicrotasks = false;
                    this._hasPendingMacrotasks = false;
                    /** @internal */
                    this._isStable = true;
                    /** @internal */
                    this._nesting = 0;
                    /** @internal */
                    this._onUnstable = new async_1.EventEmitter(false);
                    /** @internal */
                    this._onMicrotaskEmpty = new async_1.EventEmitter(false);
                    /** @internal */
                    this._onStable = new async_1.EventEmitter(false);
                    /** @internal */
                    this._onErrorEvents = new async_1.EventEmitter(false);
                    this._zoneImpl = new ng_zone_impl_1.NgZoneImpl({
                        trace: enableLongStackTrace,
                        onEnter: function () {
                            // console.log('ZONE.enter', this._nesting, this._isStable);
                            _this._nesting++;
                            if (_this._isStable) {
                                _this._isStable = false;
                                _this._onUnstable.emit(null);
                            }
                        },
                        onLeave: function () {
                            _this._nesting--;
                            // console.log('ZONE.leave', this._nesting, this._isStable);
                            _this._checkStable();
                        },
                        setMicrotask: function (hasMicrotasks) {
                            _this._hasPendingMicrotasks = hasMicrotasks;
                            _this._checkStable();
                        },
                        setMacrotask: function (hasMacrotasks) { _this._hasPendingMacrotasks = hasMacrotasks; },
                        onError: function (error) { return _this._onErrorEvents.emit(error); }
                    });
                }
                NgZone.isInAngularZone = function () { return ng_zone_impl_1.NgZoneImpl.isInAngularZone(); };
                NgZone.assertInAngularZone = function () {
                    if (!ng_zone_impl_1.NgZoneImpl.isInAngularZone()) {
                        throw new exceptions_1.BaseException('Expected to be in Angular Zone, but it is not!');
                    }
                };
                NgZone.assertNotInAngularZone = function () {
                    if (ng_zone_impl_1.NgZoneImpl.isInAngularZone()) {
                        throw new exceptions_1.BaseException('Expected to not be in Angular Zone, but it is!');
                    }
                };
                NgZone.prototype._checkStable = function () {
                    var _this = this;
                    if (this._nesting == 0) {
                        if (!this._hasPendingMicrotasks && !this._isStable) {
                            try {
                                // console.log('ZONE.microtaskEmpty');
                                this._nesting++;
                                this._onMicrotaskEmpty.emit(null);
                            }
                            finally {
                                this._nesting--;
                                if (!this._hasPendingMicrotasks) {
                                    try {
                                        // console.log('ZONE.stable', this._nesting, this._isStable);
                                        this.runOutsideAngular(function () { return _this._onStable.emit(null); });
                                    }
                                    finally {
                                        this._isStable = true;
                                    }
                                }
                            }
                        }
                    }
                };
                ;
                Object.defineProperty(NgZone.prototype, "onUnstable", {
                    /**
                     * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
                     */
                    get: function () { return this._onUnstable; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgZone.prototype, "onMicrotaskEmpty", {
                    /**
                     * Notifies when there is no more microtasks enqueue in the current VM Turn.
                     * This is a hint for Angular to do change detection, which may enqueue more microtasks.
                     * For this reason this event can fire multiple times per VM Turn.
                     */
                    get: function () { return this._onMicrotaskEmpty; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgZone.prototype, "onStable", {
                    /**
                     * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
                     * implies we are about to relinquish VM turn.
                     * This event gets called just once.
                     */
                    get: function () { return this._onStable; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgZone.prototype, "onError", {
                    /**
                     * Notify that an error has been delivered.
                     */
                    get: function () { return this._onErrorEvents; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgZone.prototype, "hasPendingMicrotasks", {
                    /**
                     * Whether there are any outstanding microtasks.
                     */
                    get: function () { return this._hasPendingMicrotasks; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NgZone.prototype, "hasPendingMacrotasks", {
                    /**
                     * Whether there are any outstanding microtasks.
                     */
                    get: function () { return this._hasPendingMacrotasks; },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Executes the `fn` function synchronously within the Angular zone and returns value returned by
                 * the function.
                 *
                 * Running functions via `run` allows you to reenter Angular zone from a task that was executed
                 * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
                 *
                 * Any future tasks or microtasks scheduled from within this function will continue executing from
                 * within the Angular zone.
                 */
                NgZone.prototype.run = function (fn) { return this._zoneImpl.runInner(fn); };
                /**
                 * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
                 * the function.
                 *
                 * Running functions via `runOutsideAngular` allows you to escape Angular's zone and do work that
                 * doesn't trigger Angular change-detection or is subject to Angular's error handling.
                 *
                 * Any future tasks or microtasks scheduled from within this function will continue executing from
                 * outside of the Angular zone.
                 *
                 * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
                 */
                NgZone.prototype.runOutsideAngular = function (fn) { return this._zoneImpl.runOuter(fn); };
                return NgZone;
            }());
            exports_1("NgZone", NgZone);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvem9uZS9uZ196b25lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFzRUc7WUFDSDtnQkErQkU7OzttQkFHRztnQkFDSCxnQkFBWSxFQUE4QjtvQkFuQzVDLGlCQTZJQzt3QkExR2MsNEJBQTRCLEVBQTVCLGlEQUE0QjtvQkFwQmpDLDBCQUFxQixHQUFZLEtBQUssQ0FBQztvQkFDdkMsMEJBQXFCLEdBQVksS0FBSyxDQUFDO29CQUUvQyxnQkFBZ0I7b0JBQ1IsY0FBUyxHQUFHLElBQUksQ0FBQztvQkFDekIsZ0JBQWdCO29CQUNSLGFBQVEsR0FBRyxDQUFDLENBQUM7b0JBQ3JCLGdCQUFnQjtvQkFDUixnQkFBVyxHQUFzQixJQUFJLG9CQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2pFLGdCQUFnQjtvQkFDUixzQkFBaUIsR0FBc0IsSUFBSSxvQkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2RSxnQkFBZ0I7b0JBQ1IsY0FBUyxHQUFzQixJQUFJLG9CQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQy9ELGdCQUFnQjtvQkFDUixtQkFBYyxHQUFzQixJQUFJLG9CQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBT2xFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSx5QkFBVSxDQUFDO3dCQUM5QixLQUFLLEVBQUUsb0JBQW9CO3dCQUMzQixPQUFPLEVBQUU7NEJBQ1AsNERBQTREOzRCQUM1RCxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQ2hCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dDQUNuQixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQ0FD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QUFJLDJCQUFPO29CQUhYOzt1QkFFRzt5QkFDSCxjQUFtQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFLaEUsc0JBQUksd0NBQW9CO29CQUh4Qjs7dUJBRUc7eUJBQ0gsY0FBc0MsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFLMUUsc0JBQUksd0NBQW9CO29CQUh4Qjs7dUJBRUc7eUJBQ0gsY0FBc0MsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7OzttQkFBQTtnQkFFMUU7Ozs7Ozs7OzttQkFTRztnQkFDSCxvQkFBRyxHQUFILFVBQUksRUFBYSxJQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRS9EOzs7Ozs7Ozs7OzttQkFXRztnQkFDSCxrQ0FBaUIsR0FBakIsVUFBa0IsRUFBYSxJQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9FLGFBQUM7WUFBRCxDQTdJQSxBQTZJQyxJQUFBO1lBN0lELDJCQTZJQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvem9uZS9uZ196b25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtOZ1pvbmVJbXBsLCBOZ1pvbmVFcnJvcn0gZnJvbSAnLi9uZ196b25lX2ltcGwnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICcuLi8uLi9mYWNhZGUvZXhjZXB0aW9ucyc7XG5leHBvcnQge05nWm9uZUVycm9yfSBmcm9tICcuL25nX3pvbmVfaW1wbCc7XG5cblxuLyoqXG4gKiBBbiBpbmplY3RhYmxlIHNlcnZpY2UgZm9yIGV4ZWN1dGluZyB3b3JrIGluc2lkZSBvciBvdXRzaWRlIG9mIHRoZSBBbmd1bGFyIHpvbmUuXG4gKlxuICogVGhlIG1vc3QgY29tbW9uIHVzZSBvZiB0aGlzIHNlcnZpY2UgaXMgdG8gb3B0aW1pemUgcGVyZm9ybWFuY2Ugd2hlbiBzdGFydGluZyBhIHdvcmsgY29uc2lzdGluZyBvZlxuICogb25lIG9yIG1vcmUgYXN5bmNocm9ub3VzIHRhc2tzIHRoYXQgZG9uJ3QgcmVxdWlyZSBVSSB1cGRhdGVzIG9yIGVycm9yIGhhbmRsaW5nIHRvIGJlIGhhbmRsZWQgYnlcbiAqIEFuZ3VsYXIuIFN1Y2ggdGFza3MgY2FuIGJlIGtpY2tlZCBvZmYgdmlhIHtAbGluayAjcnVuT3V0c2lkZUFuZ3VsYXJ9IGFuZCBpZiBuZWVkZWQsIHRoZXNlIHRhc2tzXG4gKiBjYW4gcmVlbnRlciB0aGUgQW5ndWxhciB6b25lIHZpYSB7QGxpbmsgI3J1bn0uXG4gKlxuICogPCEtLSBUT0RPOiBhZGQvZml4IGxpbmtzIHRvOlxuICogICAtIGRvY3MgZXhwbGFpbmluZyB6b25lcyBhbmQgdGhlIHVzZSBvZiB6b25lcyBpbiBBbmd1bGFyIGFuZCBjaGFuZ2UtZGV0ZWN0aW9uXG4gKiAgIC0gbGluayB0byBydW5PdXRzaWRlQW5ndWxhci9ydW4gKHRocm91Z2hvdXQgdGhpcyBmaWxlISlcbiAqICAgLS0+XG4gKlxuICogIyMjIEV4YW1wbGUgKFtsaXZlIGRlbW9dKGh0dHA6Ly9wbG5rci5jby9lZGl0L2xZOW04SEx5N3owNnZEb1VhU04yP3A9cHJldmlldykpXG4gKiBgYGBcbiAqIGltcG9ydCB7Q29tcG9uZW50LCBWaWV3LCBOZ1pvbmV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuICogaW1wb3J0IHtOZ0lmfSBmcm9tICdhbmd1bGFyMi9jb21tb24nO1xuICpcbiAqIEBDb21wb25lbnQoe1xuICogICBzZWxlY3RvcjogJ25nLXpvbmUtZGVtbycuXG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICAgPGgyPkRlbW86IE5nWm9uZTwvaDI+XG4gKlxuICogICAgIDxwPlByb2dyZXNzOiB7e3Byb2dyZXNzfX0lPC9wPlxuICogICAgIDxwICpuZ0lmPVwicHJvZ3Jlc3MgPj0gMTAwXCI+RG9uZSBwcm9jZXNzaW5nIHt7bGFiZWx9fSBvZiBBbmd1bGFyIHpvbmUhPC9wPlxuICpcbiAqICAgICA8YnV0dG9uIChjbGljayk9XCJwcm9jZXNzV2l0aGluQW5ndWxhclpvbmUoKVwiPlByb2Nlc3Mgd2l0aGluIEFuZ3VsYXIgem9uZTwvYnV0dG9uPlxuICogICAgIDxidXR0b24gKGNsaWNrKT1cInByb2Nlc3NPdXRzaWRlT2ZBbmd1bGFyWm9uZSgpXCI+UHJvY2VzcyBvdXRzaWRlIG9mIEFuZ3VsYXIgem9uZTwvYnV0dG9uPlxuICogICBgLFxuICogICBkaXJlY3RpdmVzOiBbTmdJZl1cbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgTmdab25lRGVtbyB7XG4gKiAgIHByb2dyZXNzOiBudW1iZXIgPSAwO1xuICogICBsYWJlbDogc3RyaW5nO1xuICpcbiAqICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHt9XG4gKlxuICogICAvLyBMb29wIGluc2lkZSB0aGUgQW5ndWxhciB6b25lXG4gKiAgIC8vIHNvIHRoZSBVSSBET0VTIHJlZnJlc2ggYWZ0ZXIgZWFjaCBzZXRUaW1lb3V0IGN5Y2xlXG4gKiAgIHByb2Nlc3NXaXRoaW5Bbmd1bGFyWm9uZSgpIHtcbiAqICAgICB0aGlzLmxhYmVsID0gJ2luc2lkZSc7XG4gKiAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gKiAgICAgdGhpcy5faW5jcmVhc2VQcm9ncmVzcygoKSA9PiBjb25zb2xlLmxvZygnSW5zaWRlIERvbmUhJykpO1xuICogICB9XG4gKlxuICogICAvLyBMb29wIG91dHNpZGUgb2YgdGhlIEFuZ3VsYXIgem9uZVxuICogICAvLyBzbyB0aGUgVUkgRE9FUyBOT1QgcmVmcmVzaCBhZnRlciBlYWNoIHNldFRpbWVvdXQgY3ljbGVcbiAqICAgcHJvY2Vzc091dHNpZGVPZkFuZ3VsYXJab25lKCkge1xuICogICAgIHRoaXMubGFiZWwgPSAnb3V0c2lkZSc7XG4gKiAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gKiAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAqICAgICAgIHRoaXMuX2luY3JlYXNlUHJvZ3Jlc3MoKCkgPT4ge1xuICogICAgICAgLy8gcmVlbnRlciB0aGUgQW5ndWxhciB6b25lIGFuZCBkaXNwbGF5IGRvbmVcbiAqICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge2NvbnNvbGUubG9nKCdPdXRzaWRlIERvbmUhJykgfSk7XG4gKiAgICAgfX0pKTtcbiAqICAgfVxuICpcbiAqXG4gKiAgIF9pbmNyZWFzZVByb2dyZXNzKGRvbmVDYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICogICAgIHRoaXMucHJvZ3Jlc3MgKz0gMTtcbiAqICAgICBjb25zb2xlLmxvZyhgQ3VycmVudCBwcm9ncmVzczogJHt0aGlzLnByb2dyZXNzfSVgKTtcbiAqXG4gKiAgICAgaWYgKHRoaXMucHJvZ3Jlc3MgPCAxMDApIHtcbiAqICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuX2luY3JlYXNlUHJvZ3Jlc3MoZG9uZUNhbGxiYWNrKSksIDEwKVxuICogICAgIH0gZWxzZSB7XG4gKiAgICAgICBkb25lQ2FsbGJhY2soKTtcbiAqICAgICB9XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgTmdab25lIHtcbiAgc3RhdGljIGlzSW5Bbmd1bGFyWm9uZSgpOiBib29sZWFuIHsgcmV0dXJuIE5nWm9uZUltcGwuaXNJbkFuZ3VsYXJab25lKCk7IH1cbiAgc3RhdGljIGFzc2VydEluQW5ndWxhclpvbmUoKTogdm9pZCB7XG4gICAgaWYgKCFOZ1pvbmVJbXBsLmlzSW5Bbmd1bGFyWm9uZSgpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbignRXhwZWN0ZWQgdG8gYmUgaW4gQW5ndWxhciBab25lLCBidXQgaXQgaXMgbm90IScpO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgYXNzZXJ0Tm90SW5Bbmd1bGFyWm9uZSgpOiB2b2lkIHtcbiAgICBpZiAoTmdab25lSW1wbC5pc0luQW5ndWxhclpvbmUoKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ0V4cGVjdGVkIHRvIG5vdCBiZSBpbiBBbmd1bGFyIFpvbmUsIGJ1dCBpdCBpcyEnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF96b25lSW1wbDogTmdab25lSW1wbDtcblxuICBwcml2YXRlIF9oYXNQZW5kaW5nTWljcm90YXNrczogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9oYXNQZW5kaW5nTWFjcm90YXNrczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfaXNTdGFibGUgPSB0cnVlO1xuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgX25lc3RpbmcgPSAwO1xuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgX29uVW5zdGFibGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfb25NaWNyb3Rhc2tFbXB0eTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9vblN0YWJsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcml2YXRlIF9vbkVycm9yRXZlbnRzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2x9IGVuYWJsZUxvbmdTdGFja1RyYWNlIHdoZXRoZXIgdG8gZW5hYmxlIGxvbmcgc3RhY2sgdHJhY2UuIFRoZXkgc2hvdWxkIG9ubHkgYmVcbiAgICogICAgICAgICAgICAgICBlbmFibGVkIGluIGRldmVsb3BtZW50IG1vZGUgYXMgdGhleSBzaWduaWZpY2FudGx5IGltcGFjdCBwZXJmLlxuICAgKi9cbiAgY29uc3RydWN0b3Ioe2VuYWJsZUxvbmdTdGFja1RyYWNlID0gZmFsc2V9KSB7XG4gICAgdGhpcy5fem9uZUltcGwgPSBuZXcgTmdab25lSW1wbCh7XG4gICAgICB0cmFjZTogZW5hYmxlTG9uZ1N0YWNrVHJhY2UsXG4gICAgICBvbkVudGVyOiAoKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdaT05FLmVudGVyJywgdGhpcy5fbmVzdGluZywgdGhpcy5faXNTdGFibGUpO1xuICAgICAgICB0aGlzLl9uZXN0aW5nKys7XG4gICAgICAgIGlmICh0aGlzLl9pc1N0YWJsZSkge1xuICAgICAgICAgIHRoaXMuX2lzU3RhYmxlID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5fb25VbnN0YWJsZS5lbWl0KG51bGwpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25MZWF2ZTogKCkgPT4ge1xuICAgICAgICB0aGlzLl9uZXN0aW5nLS07XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdaT05FLmxlYXZlJywgdGhpcy5fbmVzdGluZywgdGhpcy5faXNTdGFibGUpO1xuICAgICAgICB0aGlzLl9jaGVja1N0YWJsZSgpO1xuICAgICAgfSxcbiAgICAgIHNldE1pY3JvdGFzazogKGhhc01pY3JvdGFza3M6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgdGhpcy5faGFzUGVuZGluZ01pY3JvdGFza3MgPSBoYXNNaWNyb3Rhc2tzO1xuICAgICAgICB0aGlzLl9jaGVja1N0YWJsZSgpO1xuICAgICAgfSxcbiAgICAgIHNldE1hY3JvdGFzazogKGhhc01hY3JvdGFza3M6IGJvb2xlYW4pID0+IHsgdGhpcy5faGFzUGVuZGluZ01hY3JvdGFza3MgPSBoYXNNYWNyb3Rhc2tzOyB9LFxuICAgICAgb25FcnJvcjogKGVycm9yOiBOZ1pvbmVFcnJvcikgPT4gdGhpcy5fb25FcnJvckV2ZW50cy5lbWl0KGVycm9yKVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hlY2tTdGFibGUoKSB7XG4gICAgaWYgKHRoaXMuX25lc3RpbmcgPT0gMCkge1xuICAgICAgaWYgKCF0aGlzLl9oYXNQZW5kaW5nTWljcm90YXNrcyAmJiAhdGhpcy5faXNTdGFibGUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnWk9ORS5taWNyb3Rhc2tFbXB0eScpO1xuICAgICAgICAgIHRoaXMuX25lc3RpbmcrKztcbiAgICAgICAgICB0aGlzLl9vbk1pY3JvdGFza0VtcHR5LmVtaXQobnVsbCk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgdGhpcy5fbmVzdGluZy0tO1xuICAgICAgICAgIGlmICghdGhpcy5faGFzUGVuZGluZ01pY3JvdGFza3MpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdaT05FLnN0YWJsZScsIHRoaXMuX25lc3RpbmcsIHRoaXMuX2lzU3RhYmxlKTtcbiAgICAgICAgICAgICAgdGhpcy5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB0aGlzLl9vblN0YWJsZS5lbWl0KG51bGwpKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgIHRoaXMuX2lzU3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIE5vdGlmaWVzIHdoZW4gY29kZSBlbnRlcnMgQW5ndWxhciBab25lLiBUaGlzIGdldHMgZmlyZWQgZmlyc3Qgb24gVk0gVHVybi5cbiAgICovXG4gIGdldCBvblVuc3RhYmxlKCk6IEV2ZW50RW1pdHRlcjxhbnk+IHsgcmV0dXJuIHRoaXMuX29uVW5zdGFibGU7IH1cblxuICAvKipcbiAgICogTm90aWZpZXMgd2hlbiB0aGVyZSBpcyBubyBtb3JlIG1pY3JvdGFza3MgZW5xdWV1ZSBpbiB0aGUgY3VycmVudCBWTSBUdXJuLlxuICAgKiBUaGlzIGlzIGEgaGludCBmb3IgQW5ndWxhciB0byBkbyBjaGFuZ2UgZGV0ZWN0aW9uLCB3aGljaCBtYXkgZW5xdWV1ZSBtb3JlIG1pY3JvdGFza3MuXG4gICAqIEZvciB0aGlzIHJlYXNvbiB0aGlzIGV2ZW50IGNhbiBmaXJlIG11bHRpcGxlIHRpbWVzIHBlciBWTSBUdXJuLlxuICAgKi9cbiAgZ2V0IG9uTWljcm90YXNrRW1wdHkoKTogRXZlbnRFbWl0dGVyPGFueT4geyByZXR1cm4gdGhpcy5fb25NaWNyb3Rhc2tFbXB0eTsgfVxuXG4gIC8qKlxuICAgKiBOb3RpZmllcyB3aGVuIHRoZSBsYXN0IGBvbk1pY3JvdGFza0VtcHR5YCBoYXMgcnVuIGFuZCB0aGVyZSBhcmUgbm8gbW9yZSBtaWNyb3Rhc2tzLCB3aGljaFxuICAgKiBpbXBsaWVzIHdlIGFyZSBhYm91dCB0byByZWxpbnF1aXNoIFZNIHR1cm4uXG4gICAqIFRoaXMgZXZlbnQgZ2V0cyBjYWxsZWQganVzdCBvbmNlLlxuICAgKi9cbiAgZ2V0IG9uU3RhYmxlKCk6IEV2ZW50RW1pdHRlcjxhbnk+IHsgcmV0dXJuIHRoaXMuX29uU3RhYmxlOyB9XG5cbiAgLyoqXG4gICAqIE5vdGlmeSB0aGF0IGFuIGVycm9yIGhhcyBiZWVuIGRlbGl2ZXJlZC5cbiAgICovXG4gIGdldCBvbkVycm9yKCk6IEV2ZW50RW1pdHRlcjxhbnk+IHsgcmV0dXJuIHRoaXMuX29uRXJyb3JFdmVudHM7IH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGVyZSBhcmUgYW55IG91dHN0YW5kaW5nIG1pY3JvdGFza3MuXG4gICAqL1xuICBnZXQgaGFzUGVuZGluZ01pY3JvdGFza3MoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oYXNQZW5kaW5nTWljcm90YXNrczsgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZXJlIGFyZSBhbnkgb3V0c3RhbmRpbmcgbWljcm90YXNrcy5cbiAgICovXG4gIGdldCBoYXNQZW5kaW5nTWFjcm90YXNrcygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hhc1BlbmRpbmdNYWNyb3Rhc2tzOyB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIHRoZSBgZm5gIGZ1bmN0aW9uIHN5bmNocm9ub3VzbHkgd2l0aGluIHRoZSBBbmd1bGFyIHpvbmUgYW5kIHJldHVybnMgdmFsdWUgcmV0dXJuZWQgYnlcbiAgICogdGhlIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBSdW5uaW5nIGZ1bmN0aW9ucyB2aWEgYHJ1bmAgYWxsb3dzIHlvdSB0byByZWVudGVyIEFuZ3VsYXIgem9uZSBmcm9tIGEgdGFzayB0aGF0IHdhcyBleGVjdXRlZFxuICAgKiBvdXRzaWRlIG9mIHRoZSBBbmd1bGFyIHpvbmUgKHR5cGljYWxseSBzdGFydGVkIHZpYSB7QGxpbmsgI3J1bk91dHNpZGVBbmd1bGFyfSkuXG4gICAqXG4gICAqIEFueSBmdXR1cmUgdGFza3Mgb3IgbWljcm90YXNrcyBzY2hlZHVsZWQgZnJvbSB3aXRoaW4gdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnRpbnVlIGV4ZWN1dGluZyBmcm9tXG4gICAqIHdpdGhpbiB0aGUgQW5ndWxhciB6b25lLlxuICAgKi9cbiAgcnVuKGZuOiAoKSA9PiBhbnkpOiBhbnkgeyByZXR1cm4gdGhpcy5fem9uZUltcGwucnVuSW5uZXIoZm4pOyB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIHRoZSBgZm5gIGZ1bmN0aW9uIHN5bmNocm9ub3VzbHkgaW4gQW5ndWxhcidzIHBhcmVudCB6b25lIGFuZCByZXR1cm5zIHZhbHVlIHJldHVybmVkIGJ5XG4gICAqIHRoZSBmdW5jdGlvbi5cbiAgICpcbiAgICogUnVubmluZyBmdW5jdGlvbnMgdmlhIGBydW5PdXRzaWRlQW5ndWxhcmAgYWxsb3dzIHlvdSB0byBlc2NhcGUgQW5ndWxhcidzIHpvbmUgYW5kIGRvIHdvcmsgdGhhdFxuICAgKiBkb2Vzbid0IHRyaWdnZXIgQW5ndWxhciBjaGFuZ2UtZGV0ZWN0aW9uIG9yIGlzIHN1YmplY3QgdG8gQW5ndWxhcidzIGVycm9yIGhhbmRsaW5nLlxuICAgKlxuICAgKiBBbnkgZnV0dXJlIHRhc2tzIG9yIG1pY3JvdGFza3Mgc2NoZWR1bGVkIGZyb20gd2l0aGluIHRoaXMgZnVuY3Rpb24gd2lsbCBjb250aW51ZSBleGVjdXRpbmcgZnJvbVxuICAgKiBvdXRzaWRlIG9mIHRoZSBBbmd1bGFyIHpvbmUuXG4gICAqXG4gICAqIFVzZSB7QGxpbmsgI3J1bn0gdG8gcmVlbnRlciB0aGUgQW5ndWxhciB6b25lIGFuZCBkbyB3b3JrIHRoYXQgdXBkYXRlcyB0aGUgYXBwbGljYXRpb24gbW9kZWwuXG4gICAqL1xuICBydW5PdXRzaWRlQW5ndWxhcihmbjogKCkgPT4gYW55KTogYW55IHsgcmV0dXJuIHRoaXMuX3pvbmVJbXBsLnJ1bk91dGVyKGZuKTsgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
