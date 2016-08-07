System.register(['angular2/src/core/di', 'angular2/src/facade/math', 'angular2/src/platform/dom/dom_adapter'], function(exports_1, context_1) {
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
    var di_1, math_1, dom_adapter_1;
    var BrowserDetails, RafQueue;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (math_1_1) {
                math_1 = math_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            }],
        execute: function() {
            BrowserDetails = (function () {
                function BrowserDetails() {
                    this.elapsedTimeIncludesDelay = false;
                    this.doesElapsedTimeIncludesDelay();
                }
                /**
                 * Determines if `event.elapsedTime` includes transition delay in the current browser.  At this
                 * time, Chrome and Opera seem to be the only browsers that include this.
                 */
                BrowserDetails.prototype.doesElapsedTimeIncludesDelay = function () {
                    var _this = this;
                    var div = dom_adapter_1.DOM.createElement('div');
                    dom_adapter_1.DOM.setAttribute(div, 'style', "position: absolute; top: -9999px; left: -9999px; width: 1px;\n      height: 1px; transition: all 1ms linear 1ms;");
                    // Firefox requires that we wait for 2 frames for some reason
                    this.raf(function (timestamp) {
                        dom_adapter_1.DOM.on(div, 'transitionend', function (event) {
                            var elapsed = math_1.Math.round(event.elapsedTime * 1000);
                            _this.elapsedTimeIncludesDelay = elapsed == 2;
                            dom_adapter_1.DOM.remove(div);
                        });
                        dom_adapter_1.DOM.setStyle(div, 'width', '2px');
                    }, 2);
                };
                BrowserDetails.prototype.raf = function (callback, frames) {
                    if (frames === void 0) { frames = 1; }
                    var queue = new RafQueue(callback, frames);
                    return function () { return queue.cancel(); };
                };
                BrowserDetails = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], BrowserDetails);
                return BrowserDetails;
            }());
            exports_1("BrowserDetails", BrowserDetails);
            RafQueue = (function () {
                function RafQueue(callback, frames) {
                    this.callback = callback;
                    this.frames = frames;
                    this._raf();
                }
                RafQueue.prototype._raf = function () {
                    var _this = this;
                    this.currentFrameId =
                        dom_adapter_1.DOM.requestAnimationFrame(function (timestamp) { return _this._nextFrame(timestamp); });
                };
                RafQueue.prototype._nextFrame = function (timestamp) {
                    this.frames--;
                    if (this.frames > 0) {
                        this._raf();
                    }
                    else {
                        this.callback(timestamp);
                    }
                };
                RafQueue.prototype.cancel = function () {
                    dom_adapter_1.DOM.cancelAnimationFrame(this.currentFrameId);
                    this.currentFrameId = null;
                };
                return RafQueue;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2FuaW1hdGUvYnJvd3Nlcl9kZXRhaWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBS0E7Z0JBR0U7b0JBRkEsNkJBQXdCLEdBQUcsS0FBSyxDQUFDO29CQUVqQixJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztnQkFBQyxDQUFDO2dCQUV0RDs7O21CQUdHO2dCQUNILHFEQUE0QixHQUE1QjtvQkFBQSxpQkFhQztvQkFaQyxJQUFJLEdBQUcsR0FBRyxpQkFBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbkMsaUJBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxrSEFDZ0IsQ0FBQyxDQUFDO29CQUNqRCw2REFBNkQ7b0JBQzdELElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxTQUFjO3dCQUN0QixpQkFBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsZUFBZSxFQUFFLFVBQUMsS0FBVTs0QkFDdEMsSUFBSSxPQUFPLEdBQUcsV0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDOzRCQUNuRCxLQUFJLENBQUMsd0JBQXdCLEdBQUcsT0FBTyxJQUFJLENBQUMsQ0FBQzs0QkFDN0MsaUJBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2xCLENBQUMsQ0FBQyxDQUFDO3dCQUNILGlCQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3BDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDUixDQUFDO2dCQUVELDRCQUFHLEdBQUgsVUFBSSxRQUFrQixFQUFFLE1BQWtCO29CQUFsQixzQkFBa0IsR0FBbEIsVUFBa0I7b0JBQ3hDLElBQUksS0FBSyxHQUFhLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDckQsTUFBTSxDQUFDLGNBQU0sT0FBQSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQWQsQ0FBYyxDQUFDO2dCQUM5QixDQUFDO2dCQTVCSDtvQkFBQyxlQUFVLEVBQUU7O2tDQUFBO2dCQTZCYixxQkFBQztZQUFELENBNUJBLEFBNEJDLElBQUE7WUE1QkQsMkNBNEJDLENBQUE7WUFFRDtnQkFFRSxrQkFBbUIsUUFBa0IsRUFBUyxNQUFjO29CQUF6QyxhQUFRLEdBQVIsUUFBUSxDQUFVO29CQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7b0JBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUFDLENBQUM7Z0JBQ3RFLHVCQUFJLEdBQVo7b0JBQUEsaUJBR0M7b0JBRkMsSUFBSSxDQUFDLGNBQWM7d0JBQ2YsaUJBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxVQUFDLFNBQWlCLElBQUssT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUExQixDQUEwQixDQUFDLENBQUM7Z0JBQ25GLENBQUM7Z0JBQ08sNkJBQVUsR0FBbEIsVUFBbUIsU0FBaUI7b0JBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDZCxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzNCLENBQUM7Z0JBQ0gsQ0FBQztnQkFDRCx5QkFBTSxHQUFOO29CQUNFLGlCQUFHLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDN0IsQ0FBQztnQkFDSCxlQUFDO1lBQUQsQ0FuQkEsQUFtQkMsSUFBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9hbmltYXRlL2Jyb3dzZXJfZGV0YWlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtNYXRofSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL21hdGgnO1xuaW1wb3J0IHtET019IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX2FkYXB0ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQnJvd3NlckRldGFpbHMge1xuICBlbGFwc2VkVGltZUluY2x1ZGVzRGVsYXkgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgdGhpcy5kb2VzRWxhcHNlZFRpbWVJbmNsdWRlc0RlbGF5KCk7IH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpZiBgZXZlbnQuZWxhcHNlZFRpbWVgIGluY2x1ZGVzIHRyYW5zaXRpb24gZGVsYXkgaW4gdGhlIGN1cnJlbnQgYnJvd3Nlci4gIEF0IHRoaXNcbiAgICogdGltZSwgQ2hyb21lIGFuZCBPcGVyYSBzZWVtIHRvIGJlIHRoZSBvbmx5IGJyb3dzZXJzIHRoYXQgaW5jbHVkZSB0aGlzLlxuICAgKi9cbiAgZG9lc0VsYXBzZWRUaW1lSW5jbHVkZXNEZWxheSgpOiB2b2lkIHtcbiAgICB2YXIgZGl2ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIERPTS5zZXRBdHRyaWJ1dGUoZGl2LCAnc3R5bGUnLCBgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IC05OTk5cHg7IGxlZnQ6IC05OTk5cHg7IHdpZHRoOiAxcHg7XG4gICAgICBoZWlnaHQ6IDFweDsgdHJhbnNpdGlvbjogYWxsIDFtcyBsaW5lYXIgMW1zO2ApO1xuICAgIC8vIEZpcmVmb3ggcmVxdWlyZXMgdGhhdCB3ZSB3YWl0IGZvciAyIGZyYW1lcyBmb3Igc29tZSByZWFzb25cbiAgICB0aGlzLnJhZigodGltZXN0YW1wOiBhbnkpID0+IHtcbiAgICAgIERPTS5vbihkaXYsICd0cmFuc2l0aW9uZW5kJywgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgdmFyIGVsYXBzZWQgPSBNYXRoLnJvdW5kKGV2ZW50LmVsYXBzZWRUaW1lICogMTAwMCk7XG4gICAgICAgIHRoaXMuZWxhcHNlZFRpbWVJbmNsdWRlc0RlbGF5ID0gZWxhcHNlZCA9PSAyO1xuICAgICAgICBET00ucmVtb3ZlKGRpdik7XG4gICAgICB9KTtcbiAgICAgIERPTS5zZXRTdHlsZShkaXYsICd3aWR0aCcsICcycHgnKTtcbiAgICB9LCAyKTtcbiAgfVxuXG4gIHJhZihjYWxsYmFjazogRnVuY3Rpb24sIGZyYW1lczogbnVtYmVyID0gMSk6IEZ1bmN0aW9uIHtcbiAgICB2YXIgcXVldWU6IFJhZlF1ZXVlID0gbmV3IFJhZlF1ZXVlKGNhbGxiYWNrLCBmcmFtZXMpO1xuICAgIHJldHVybiAoKSA9PiBxdWV1ZS5jYW5jZWwoKTtcbiAgfVxufVxuXG5jbGFzcyBSYWZRdWV1ZSB7XG4gIGN1cnJlbnRGcmFtZUlkOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjYWxsYmFjazogRnVuY3Rpb24sIHB1YmxpYyBmcmFtZXM6IG51bWJlcikgeyB0aGlzLl9yYWYoKTsgfVxuICBwcml2YXRlIF9yYWYoKSB7XG4gICAgdGhpcy5jdXJyZW50RnJhbWVJZCA9XG4gICAgICAgIERPTS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWVzdGFtcDogbnVtYmVyKSA9PiB0aGlzLl9uZXh0RnJhbWUodGltZXN0YW1wKSk7XG4gIH1cbiAgcHJpdmF0ZSBfbmV4dEZyYW1lKHRpbWVzdGFtcDogbnVtYmVyKSB7XG4gICAgdGhpcy5mcmFtZXMtLTtcbiAgICBpZiAodGhpcy5mcmFtZXMgPiAwKSB7XG4gICAgICB0aGlzLl9yYWYoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYWxsYmFjayh0aW1lc3RhbXApO1xuICAgIH1cbiAgfVxuICBjYW5jZWwoKSB7XG4gICAgRE9NLmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuY3VycmVudEZyYW1lSWQpO1xuICAgIHRoaXMuY3VycmVudEZyYW1lSWQgPSBudWxsO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
