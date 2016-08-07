System.register(['angular2/src/facade/lang', 'angular2/src/facade/math', 'angular2/src/platform/dom/util', 'angular2/src/facade/collection', 'angular2/src/platform/dom/dom_adapter'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, math_1, util_1, collection_1, dom_adapter_1;
    var Animation;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (math_1_1) {
                math_1 = math_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            }],
        execute: function() {
            Animation = (function () {
                /**
                 * Stores the start time and starts the animation
                 * @param element
                 * @param data
                 * @param browserDetails
                 */
                function Animation(element, data, browserDetails) {
                    var _this = this;
                    this.element = element;
                    this.data = data;
                    this.browserDetails = browserDetails;
                    /** functions to be called upon completion */
                    this.callbacks = [];
                    /** functions for removing event listeners */
                    this.eventClearFunctions = [];
                    /** flag used to track whether or not the animation has finished */
                    this.completed = false;
                    this._stringPrefix = '';
                    this.startTime = lang_1.DateWrapper.toMillis(lang_1.DateWrapper.now());
                    this._stringPrefix = dom_adapter_1.DOM.getAnimationPrefix();
                    this.setup();
                    this.wait(function (timestamp) { return _this.start(); });
                }
                Object.defineProperty(Animation.prototype, "totalTime", {
                    /** total amount of time that the animation should take including delay */
                    get: function () {
                        var delay = this.computedDelay != null ? this.computedDelay : 0;
                        var duration = this.computedDuration != null ? this.computedDuration : 0;
                        return delay + duration;
                    },
                    enumerable: true,
                    configurable: true
                });
                Animation.prototype.wait = function (callback) {
                    // Firefox requires 2 frames for some reason
                    this.browserDetails.raf(callback, 2);
                };
                /**
                 * Sets up the initial styles before the animation is started
                 */
                Animation.prototype.setup = function () {
                    if (this.data.fromStyles != null)
                        this.applyStyles(this.data.fromStyles);
                    if (this.data.duration != null)
                        this.applyStyles({ 'transitionDuration': this.data.duration.toString() + 'ms' });
                    if (this.data.delay != null)
                        this.applyStyles({ 'transitionDelay': this.data.delay.toString() + 'ms' });
                };
                /**
                 * After the initial setup has occurred, this method adds the animation styles
                 */
                Animation.prototype.start = function () {
                    this.addClasses(this.data.classesToAdd);
                    this.addClasses(this.data.animationClasses);
                    this.removeClasses(this.data.classesToRemove);
                    if (this.data.toStyles != null)
                        this.applyStyles(this.data.toStyles);
                    var computedStyles = dom_adapter_1.DOM.getComputedStyle(this.element);
                    this.computedDelay =
                        math_1.Math.max(this.parseDurationString(computedStyles.getPropertyValue(this._stringPrefix + 'transition-delay')), this.parseDurationString(this.element.style.getPropertyValue(this._stringPrefix + 'transition-delay')));
                    this.computedDuration = math_1.Math.max(this.parseDurationString(computedStyles.getPropertyValue(this._stringPrefix + 'transition-duration')), this.parseDurationString(this.element.style.getPropertyValue(this._stringPrefix + 'transition-duration')));
                    this.addEvents();
                };
                /**
                 * Applies the provided styles to the element
                 * @param styles
                 */
                Animation.prototype.applyStyles = function (styles) {
                    var _this = this;
                    collection_1.StringMapWrapper.forEach(styles, function (value, key) {
                        var dashCaseKey = util_1.camelCaseToDashCase(key);
                        if (lang_1.isPresent(dom_adapter_1.DOM.getStyle(_this.element, dashCaseKey))) {
                            dom_adapter_1.DOM.setStyle(_this.element, dashCaseKey, value.toString());
                        }
                        else {
                            dom_adapter_1.DOM.setStyle(_this.element, _this._stringPrefix + dashCaseKey, value.toString());
                        }
                    });
                };
                /**
                 * Adds the provided classes to the element
                 * @param classes
                 */
                Animation.prototype.addClasses = function (classes) {
                    for (var i = 0, len = classes.length; i < len; i++)
                        dom_adapter_1.DOM.addClass(this.element, classes[i]);
                };
                /**
                 * Removes the provided classes from the element
                 * @param classes
                 */
                Animation.prototype.removeClasses = function (classes) {
                    for (var i = 0, len = classes.length; i < len; i++)
                        dom_adapter_1.DOM.removeClass(this.element, classes[i]);
                };
                /**
                 * Adds events to track when animations have finished
                 */
                Animation.prototype.addEvents = function () {
                    var _this = this;
                    if (this.totalTime > 0) {
                        this.eventClearFunctions.push(dom_adapter_1.DOM.onAndCancel(this.element, dom_adapter_1.DOM.getTransitionEnd(), function (event) { return _this.handleAnimationEvent(event); }));
                    }
                    else {
                        this.handleAnimationCompleted();
                    }
                };
                Animation.prototype.handleAnimationEvent = function (event) {
                    var elapsedTime = math_1.Math.round(event.elapsedTime * 1000);
                    if (!this.browserDetails.elapsedTimeIncludesDelay)
                        elapsedTime += this.computedDelay;
                    event.stopPropagation();
                    if (elapsedTime >= this.totalTime)
                        this.handleAnimationCompleted();
                };
                /**
                 * Runs all animation callbacks and removes temporary classes
                 */
                Animation.prototype.handleAnimationCompleted = function () {
                    this.removeClasses(this.data.animationClasses);
                    this.callbacks.forEach(function (callback) { return callback(); });
                    this.callbacks = [];
                    this.eventClearFunctions.forEach(function (fn) { return fn(); });
                    this.eventClearFunctions = [];
                    this.completed = true;
                };
                /**
                 * Adds animation callbacks to be called upon completion
                 * @param callback
                 * @returns {Animation}
                 */
                Animation.prototype.onComplete = function (callback) {
                    if (this.completed) {
                        callback();
                    }
                    else {
                        this.callbacks.push(callback);
                    }
                    return this;
                };
                /**
                 * Converts the duration string to the number of milliseconds
                 * @param duration
                 * @returns {number}
                 */
                Animation.prototype.parseDurationString = function (duration) {
                    var maxValue = 0;
                    // duration must have at least 2 characters to be valid. (number + type)
                    if (duration == null || duration.length < 2) {
                        return maxValue;
                    }
                    else if (duration.substring(duration.length - 2) == 'ms') {
                        var value = lang_1.NumberWrapper.parseInt(this.stripLetters(duration), 10);
                        if (value > maxValue)
                            maxValue = value;
                    }
                    else if (duration.substring(duration.length - 1) == 's') {
                        var ms = lang_1.NumberWrapper.parseFloat(this.stripLetters(duration)) * 1000;
                        var value = math_1.Math.floor(ms);
                        if (value > maxValue)
                            maxValue = value;
                    }
                    return maxValue;
                };
                /**
                 * Strips the letters from the duration string
                 * @param str
                 * @returns {string}
                 */
                Animation.prototype.stripLetters = function (str) {
                    return lang_1.StringWrapper.replaceAll(str, lang_1.RegExpWrapper.create('[^0-9]+$', ''), '');
                };
                return Animation;
            }());
            exports_1("Animation", Animation);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2FuaW1hdGUvYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBZUE7Z0JBNEJFOzs7OzttQkFLRztnQkFDSCxtQkFBbUIsT0FBb0IsRUFBUyxJQUF5QixFQUN0RCxjQUE4QjtvQkFuQ25ELGlCQXdMQztvQkF0Sm9CLFlBQU8sR0FBUCxPQUFPLENBQWE7b0JBQVMsU0FBSSxHQUFKLElBQUksQ0FBcUI7b0JBQ3RELG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtvQkFsQ2pELDZDQUE2QztvQkFDN0MsY0FBUyxHQUFlLEVBQUUsQ0FBQztvQkFXM0IsNkNBQTZDO29CQUM3Qyx3QkFBbUIsR0FBZSxFQUFFLENBQUM7b0JBRXJDLG1FQUFtRTtvQkFDbkUsY0FBUyxHQUFZLEtBQUssQ0FBQztvQkFFbkIsa0JBQWEsR0FBVyxFQUFFLENBQUM7b0JBaUJqQyxJQUFJLENBQUMsU0FBUyxHQUFHLGtCQUFXLENBQUMsUUFBUSxDQUFDLGtCQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDekQsSUFBSSxDQUFDLGFBQWEsR0FBRyxpQkFBRyxDQUFDLGtCQUFrQixFQUFFLENBQUM7b0JBQzlDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUMsU0FBYyxJQUFLLE9BQUEsS0FBSSxDQUFDLEtBQUssRUFBRSxFQUFaLENBQVksQ0FBQyxDQUFDO2dCQUM5QyxDQUFDO2dCQWxCRCxzQkFBSSxnQ0FBUztvQkFEYiwwRUFBMEU7eUJBQzFFO3dCQUNFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO3dCQUNoRSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFB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QkFDekMsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzFELElBQUksRUFBRSxHQUFHLG9CQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQ3RFLElBQUksS0FBSyxHQUFHLFdBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQzNCLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7NEJBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDekMsQ0FBQztvQkFDRCxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUNsQixDQUFDO2dCQUVEOzs7O21CQUlHO2dCQUNILGdDQUFZLEdBQVosVUFBYSxHQUFXO29CQUN0QixNQUFNLENBQUMsb0JBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLG9CQUFhLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDakYsQ0FBQztnQkFDSCxnQkFBQztZQUFELENBeExBLEFBd0xDLElBQUE7WUF4TEQsaUNBd0xDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvYW5pbWF0ZS9hbmltYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEYXRlV3JhcHBlcixcbiAgU3RyaW5nV3JhcHBlcixcbiAgUmVnRXhwV3JhcHBlcixcbiAgTnVtYmVyV3JhcHBlcixcbiAgaXNQcmVzZW50XG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge01hdGh9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbWF0aCc7XG5pbXBvcnQge2NhbWVsQ2FzZVRvRGFzaENhc2V9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vdXRpbCc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5cbmltcG9ydCB7QnJvd3NlckRldGFpbHN9IGZyb20gJy4vYnJvd3Nlcl9kZXRhaWxzJztcbmltcG9ydCB7Q3NzQW5pbWF0aW9uT3B0aW9uc30gZnJvbSAnLi9jc3NfYW5pbWF0aW9uX29wdGlvbnMnO1xuXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uIHtcbiAgLyoqIGZ1bmN0aW9ucyB0byBiZSBjYWxsZWQgdXBvbiBjb21wbGV0aW9uICovXG4gIGNhbGxiYWNrczogRnVuY3Rpb25bXSA9IFtdO1xuXG4gIC8qKiB0aGUgZHVyYXRpb24gKG1zKSBvZiB0aGUgYW5pbWF0aW9uICh3aGV0aGVyIGZyb20gQ1NTIG9yIG1hbnVhbGx5IHNldCkgKi9cbiAgY29tcHV0ZWREdXJhdGlvbjogbnVtYmVyO1xuXG4gIC8qKiB0aGUgYW5pbWF0aW9uIGRlbGF5IChtcykgKHdoZXRoZXIgZnJvbSBDU1Mgb3IgbWFudWFsbHkgc2V0KSAqL1xuICBjb21wdXRlZERlbGF5OiBudW1iZXI7XG5cbiAgLyoqIHRpbWVzdGFtcCBvZiB3aGVuIHRoZSBhbmltYXRpb24gc3RhcnRlZCAqL1xuICBzdGFydFRpbWU6IG51bWJlcjtcblxuICAvKiogZnVuY3Rpb25zIGZvciByZW1vdmluZyBldmVudCBsaXN0ZW5lcnMgKi9cbiAgZXZlbnRDbGVhckZ1bmN0aW9uczogRnVuY3Rpb25bXSA9IFtdO1xuXG4gIC8qKiBmbGFnIHVzZWQgdG8gdHJhY2sgd2hldGhlciBvciBub3QgdGhlIGFuaW1hdGlvbiBoYXMgZmluaXNoZWQgKi9cbiAgY29tcGxldGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfc3RyaW5nUHJlZml4OiBzdHJpbmcgPSAnJztcblxuICAvKiogdG90YWwgYW1vdW50IG9mIHRpbWUgdGhhdCB0aGUgYW5pbWF0aW9uIHNob3VsZCB0YWtlIGluY2x1ZGluZyBkZWxheSAqL1xuICBnZXQgdG90YWxUaW1lKCk6IG51bWJlciB7XG4gICAgbGV0IGRlbGF5ID0gdGhpcy5jb21wdXRlZERlbGF5ICE9IG51bGwgPyB0aGlzLmNvbXB1dGVkRGVsYXkgOiAwO1xuICAgIGxldCBkdXJhdGlvbiA9IHRoaXMuY29tcHV0ZWREdXJhdGlvbiAhPSBudWxsID8gdGhpcy5jb21wdXRlZER1cmF0aW9uIDogMDtcbiAgICByZXR1cm4gZGVsYXkgKyBkdXJhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9yZXMgdGhlIHN0YXJ0IHRpbWUgYW5kIHN0YXJ0cyB0aGUgYW5pbWF0aW9uXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBwYXJhbSBicm93c2VyRGV0YWlsc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwdWJsaWMgZGF0YTogQ3NzQW5pbWF0aW9uT3B0aW9ucyxcbiAgICAgICAgICAgICAgcHVibGljIGJyb3dzZXJEZXRhaWxzOiBCcm93c2VyRGV0YWlscykge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZVdyYXBwZXIudG9NaWxsaXMoRGF0ZVdyYXBwZXIubm93KCkpO1xuICAgIHRoaXMuX3N0cmluZ1ByZWZpeCA9IERPTS5nZXRBbmltYXRpb25QcmVmaXgoKTtcbiAgICB0aGlzLnNldHVwKCk7XG4gICAgdGhpcy53YWl0KCh0aW1lc3RhbXA6IGFueSkgPT4gdGhpcy5zdGFydCgpKTtcbiAgfVxuXG4gIHdhaXQoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgLy8gRmlyZWZveCByZXF1aXJlcyAyIGZyYW1lcyBmb3Igc29tZSByZWFzb25cbiAgICB0aGlzLmJyb3dzZXJEZXRhaWxzLnJhZihjYWxsYmFjaywgMik7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB1cCB0aGUgaW5pdGlhbCBzdHlsZXMgYmVmb3JlIHRoZSBhbmltYXRpb24gaXMgc3RhcnRlZFxuICAgKi9cbiAgc2V0dXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGF0YS5mcm9tU3R5bGVzICE9IG51bGwpIHRoaXMuYXBwbHlTdHlsZXModGhpcy5kYXRhLmZyb21TdHlsZXMpO1xuICAgIGlmICh0aGlzLmRhdGEuZHVyYXRpb24gIT0gbnVsbClcbiAgICAgIHRoaXMuYXBwbHlTdHlsZXMoeyd0cmFuc2l0aW9uRHVyYXRpb24nOiB0aGlzLmRhdGEuZHVyYXRpb24udG9TdHJpbmcoKSArICdtcyd9KTtcbiAgICBpZiAodGhpcy5kYXRhLmRlbGF5ICE9IG51bGwpXG4gICAgICB0aGlzLmFwcGx5U3R5bGVzKHsndHJhbnNpdGlvbkRlbGF5JzogdGhpcy5kYXRhLmRlbGF5LnRvU3RyaW5nKCkgKyAnbXMnfSk7XG4gIH1cblxuICAvKipcbiAgICogQWZ0ZXIgdGhlIGluaXRpYWwgc2V0dXAgaGFzIG9jY3VycmVkLCB0aGlzIG1ldGhvZCBhZGRzIHRoZSBhbmltYXRpb24gc3R5bGVzXG4gICAqL1xuICBzdGFydCgpOiB2b2lkIHtcbiAgICB0aGlzLmFkZENsYXNzZXModGhpcy5kYXRhLmNsYXNzZXNUb0FkZCk7XG4gICAgdGhpcy5hZGRDbGFzc2VzKHRoaXMuZGF0YS5hbmltYXRpb25DbGFzc2VzKTtcbiAgICB0aGlzLnJlbW92ZUNsYXNzZXModGhpcy5kYXRhLmNsYXNzZXNUb1JlbW92ZSk7XG4gICAgaWYgKHRoaXMuZGF0YS50b1N0eWxlcyAhPSBudWxsKSB0aGlzLmFwcGx5U3R5bGVzKHRoaXMuZGF0YS50b1N0eWxlcyk7XG4gICAgdmFyIGNvbXB1dGVkU3R5bGVzID0gRE9NLmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50KTtcbiAgICB0aGlzLmNvbXB1dGVkRGVsYXkgPVxuICAgICAgICBNYXRoLm1heCh0aGlzLnBhcnNlRHVyYXRpb25TdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICBjb21wdXRlZFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKHRoaXMuX3N0cmluZ1ByZWZpeCArICd0cmFuc2l0aW9uLWRlbGF5JykpLFxuICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlRHVyYXRpb25TdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSh0aGlzLl9zdHJpbmdQcmVmaXggKyAndHJhbnNpdGlvbi1kZWxheScpKSk7XG4gICAgdGhpcy5jb21wdXRlZER1cmF0aW9uID0gTWF0aC5tYXgodGhpcy5wYXJzZUR1cmF0aW9uU3RyaW5nKGNvbXB1dGVkU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0cmluZ1ByZWZpeCArICd0cmFuc2l0aW9uLWR1cmF0aW9uJykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VEdXJhdGlvblN0cmluZyh0aGlzLmVsZW1lbnQuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RyaW5nUHJlZml4ICsgJ3RyYW5zaXRpb24tZHVyYXRpb24nKSkpO1xuICAgIHRoaXMuYWRkRXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyB0aGUgcHJvdmlkZWQgc3R5bGVzIHRvIHRoZSBlbGVtZW50XG4gICAqIEBwYXJhbSBzdHlsZXNcbiAgICovXG4gIGFwcGx5U3R5bGVzKHN0eWxlczoge1trZXk6IHN0cmluZ106IGFueX0pOiB2b2lkIHtcbiAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goc3R5bGVzLCAodmFsdWU6IGFueSwga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIHZhciBkYXNoQ2FzZUtleSA9IGNhbWVsQ2FzZVRvRGFzaENhc2Uoa2V5KTtcbiAgICAgIGlmIChpc1ByZXNlbnQoRE9NLmdldFN0eWxlKHRoaXMuZWxlbWVudCwgZGFzaENhc2VLZXkpKSkge1xuICAgICAgICBET00uc2V0U3R5bGUodGhpcy5lbGVtZW50LCBkYXNoQ2FzZUtleSwgdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBET00uc2V0U3R5bGUodGhpcy5lbGVtZW50LCB0aGlzLl9zdHJpbmdQcmVmaXggKyBkYXNoQ2FzZUtleSwgdmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgcHJvdmlkZWQgY2xhc3NlcyB0byB0aGUgZWxlbWVudFxuICAgKiBAcGFyYW0gY2xhc3Nlc1xuICAgKi9cbiAgYWRkQ2xhc3NlcyhjbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSBET00uYWRkQ2xhc3ModGhpcy5lbGVtZW50LCBjbGFzc2VzW2ldKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBwcm92aWRlZCBjbGFzc2VzIGZyb20gdGhlIGVsZW1lbnRcbiAgICogQHBhcmFtIGNsYXNzZXNcbiAgICovXG4gIHJlbW92ZUNsYXNzZXMoY2xhc3Nlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY2xhc3Nlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykgRE9NLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudCwgY2xhc3Nlc1tpXSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudHMgdG8gdHJhY2sgd2hlbiBhbmltYXRpb25zIGhhdmUgZmluaXNoZWRcbiAgICovXG4gIGFkZEV2ZW50cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b3RhbFRpbWUgPiAwKSB7XG4gICAgICB0aGlzLmV2ZW50Q2xlYXJGdW5jdGlvbnMucHVzaChET00ub25BbmRDYW5jZWwoXG4gICAgICAgICAgdGhpcy5lbGVtZW50LCBET00uZ2V0VHJhbnNpdGlvbkVuZCgpLCAoZXZlbnQ6IGFueSkgPT4gdGhpcy5oYW5kbGVBbmltYXRpb25FdmVudChldmVudCkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oYW5kbGVBbmltYXRpb25Db21wbGV0ZWQoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVBbmltYXRpb25FdmVudChldmVudDogYW55KTogdm9pZCB7XG4gICAgbGV0IGVsYXBzZWRUaW1lID0gTWF0aC5yb3VuZChldmVudC5lbGFwc2VkVGltZSAqIDEwMDApO1xuICAgIGlmICghdGhpcy5icm93c2VyRGV0YWlscy5lbGFwc2VkVGltZUluY2x1ZGVzRGVsYXkpIGVsYXBzZWRUaW1lICs9IHRoaXMuY29tcHV0ZWREZWxheTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoZWxhcHNlZFRpbWUgPj0gdGhpcy50b3RhbFRpbWUpIHRoaXMuaGFuZGxlQW5pbWF0aW9uQ29tcGxldGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogUnVucyBhbGwgYW5pbWF0aW9uIGNhbGxiYWNrcyBhbmQgcmVtb3ZlcyB0ZW1wb3JhcnkgY2xhc3Nlc1xuICAgKi9cbiAgaGFuZGxlQW5pbWF0aW9uQ29tcGxldGVkKCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3Nlcyh0aGlzLmRhdGEuYW5pbWF0aW9uQ2xhc3Nlcyk7XG4gICAgdGhpcy5jYWxsYmFja3MuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjaygpKTtcbiAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICAgIHRoaXMuZXZlbnRDbGVhckZ1bmN0aW9ucy5mb3JFYWNoKGZuID0+IGZuKCkpO1xuICAgIHRoaXMuZXZlbnRDbGVhckZ1bmN0aW9ucyA9IFtdO1xuICAgIHRoaXMuY29tcGxldGVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuaW1hdGlvbiBjYWxsYmFja3MgdG8gYmUgY2FsbGVkIHVwb24gY29tcGxldGlvblxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICogQHJldHVybnMge0FuaW1hdGlvbn1cbiAgICovXG4gIG9uQ29tcGxldGUoY2FsbGJhY2s6IEZ1bmN0aW9uKTogQW5pbWF0aW9uIHtcbiAgICBpZiAodGhpcy5jb21wbGV0ZWQpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyB0aGUgZHVyYXRpb24gc3RyaW5nIHRvIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzXG4gICAqIEBwYXJhbSBkdXJhdGlvblxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgcGFyc2VEdXJhdGlvblN0cmluZyhkdXJhdGlvbjogc3RyaW5nKTogbnVtYmVyIHtcbiAgICB2YXIgbWF4VmFsdWUgPSAwO1xuICAgIC8vIGR1cmF0aW9uIG11c3QgaGF2ZSBhdCBsZWFzdCAyIGNoYXJhY3RlcnMgdG8gYmUgdmFsaWQuIChudW1iZXIgKyB0eXBlKVxuICAgIGlmIChkdXJhdGlvbiA9PSBudWxsIHx8IGR1cmF0aW9uLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybiBtYXhWYWx1ZTtcbiAgICB9IGVsc2UgaWYgKGR1cmF0aW9uLnN1YnN0cmluZyhkdXJhdGlvbi5sZW5ndGggLSAyKSA9PSAnbXMnKSB7XG4gICAgICBsZXQgdmFsdWUgPSBOdW1iZXJXcmFwcGVyLnBhcnNlSW50KHRoaXMuc3RyaXBMZXR0ZXJzKGR1cmF0aW9uKSwgMTApO1xuICAgICAgaWYgKHZhbHVlID4gbWF4VmFsdWUpIG1heFZhbHVlID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmIChkdXJhdGlvbi5zdWJzdHJpbmcoZHVyYXRpb24ubGVuZ3RoIC0gMSkgPT0gJ3MnKSB7XG4gICAgICBsZXQgbXMgPSBOdW1iZXJXcmFwcGVyLnBhcnNlRmxvYXQodGhpcy5zdHJpcExldHRlcnMoZHVyYXRpb24pKSAqIDEwMDA7XG4gICAgICBsZXQgdmFsdWUgPSBNYXRoLmZsb29yKG1zKTtcbiAgICAgIGlmICh2YWx1ZSA+IG1heFZhbHVlKSBtYXhWYWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gbWF4VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogU3RyaXBzIHRoZSBsZXR0ZXJzIGZyb20gdGhlIGR1cmF0aW9uIHN0cmluZ1xuICAgKiBAcGFyYW0gc3RyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdHJpcExldHRlcnMoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGwoc3RyLCBSZWdFeHBXcmFwcGVyLmNyZWF0ZSgnW14wLTldKyQnLCAnJyksICcnKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
