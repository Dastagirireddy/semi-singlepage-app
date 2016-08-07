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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9hbmltYXRlL2FuaW1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQWVBO2dCQTRCRTs7Ozs7bUJBS0c7Z0JBQ0gsbUJBQW1CLE9BQW9CLEVBQVMsSUFBeUIsRUFDdEQsY0FBOEI7b0JBbkNuRCxpQkF3TEM7b0JBdEpvQixZQUFPLEdBQVAsT0FBTyxDQUFhO29CQUFTLFNBQUksR0FBSixJQUFJLENBQXFCO29CQUN0RCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7b0JBbENqRCw2Q0FBNkM7b0JBQzdDLGNBQVMsR0FBZSxFQUFFLENBQUM7b0JBVzNCLDZDQUE2QztvQkFDN0Msd0JBQW1CLEdBQWUsRUFBRSxDQUFDO29CQUVyQyxtRUFBbUU7b0JBQ25FLGNBQVMsR0FBWSxLQUFLLENBQUM7b0JBRW5CLGtCQUFhLEdBQVcsRUFBRSxDQUFDO29CQWlCakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxrQkFBVyxDQUFDLFFBQVEsQ0FBQyxrQkFBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQ3pELElBQUksQ0FBQyxhQUFhLEdBQUcsaUJBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO29CQUM5QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFDLFNBQWMsSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztnQkFsQkQsc0JBQUksZ0NBQVM7b0JBRGIsMEVBQTBFO3lCQUMxRTt3QkFDRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQzt3QkFDaEUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO3dCQUN6RSxNQUFNLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztvQkFDMUIsQ0FBQzs7O21CQUFBO2dCQWdCRCx3QkFBSSxHQUFKLFVBQUssUUFBa0I7b0JBQ3JCLDRDQUE0QztvQkFDNUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxDQUFDO2dCQUVEOzttQkFFRztnQkFDSCx5QkFBSyxHQUFMO29CQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQzt3QkFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3pFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQzt3QkFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksRUFBQyxDQUFDLENBQUM7b0JBQ2pGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksRUFBQyxDQUFDLENBQUM7Z0JBQzdFLENBQUM7Z0JBRUQ7O21CQUVHO2dCQUNILHlCQUFLLEdBQUw7b0JBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUM5QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7d0JBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNyRSxJQUFJLGNBQWMsR0FBRyxpQkFBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDeEQsSUFBSSxDQUFDLGFBQWE7d0JBQ2QsV0FBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQ3BCLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLGtCQUFrQixDQUFDLENBQUMsRUFDN0UsSUFBSSxDQUFDLG1CQUFtQixDQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsV0FBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUNwRCxJQUFJLENBQUMsYUFBYSxHQUFHLHFCQUFxQixDQUFDLENBQUMsRUFDaEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUN4RCxJQUFJLENBQUMsYUFBYSxHQUFHLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuRixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ25CLENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSCwrQkFBVyxHQUFYLFVBQVksTUFBNEI7b0JBQXhDLGlCQVNDO29CQVJDLDZCQUFnQixDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFVLEVBQUUsR0FBVzt3QkFDdkQsSUFBSSxXQUFXLEdBQUcsMEJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzNDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsaUJBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDdkQsaUJBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7d0JBQzVELENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04saUJBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDakYsQ0FBQztvQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUVEOzs7bUJBR0c7Z0JBQ0gsOEJBQVUsR0FBVixVQUFXLE9BQWlCO29CQUMxQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUU7d0JBQUUsaUJBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0YsQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNILGlDQUFhLEdBQWIsVUFBYyxPQUFpQjtvQkFDN0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFO3dCQUFFLGlCQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hHLENBQUM7Z0JBRUQ7O21CQUVHO2dCQUNILDZCQUFTLEdBQVQ7b0JBQUEsaUJBT0M7b0JBTkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGlCQUFHLENBQUMsV0FBVyxDQUN6QyxJQUFJLENBQUMsT0FBTyxFQUFFLGlCQUFHLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDLENBQUM7b0JBQy9GLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7b0JBQ2xDLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCx3Q0FBb0IsR0FBcEIsVUFBcUIsS0FBVTtvQkFDN0IsSUFBSSxXQUFXLEdBQUcsV0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUN2RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUM7d0JBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7b0JBQ3JGLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDeEIsRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7d0JBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7Z0JBQ3JFLENBQUM7Z0JBRUQ7O21CQUVHO2dCQUNILDRDQUF3QixHQUF4QjtvQkFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLEVBQUUsRUFBSixDQUFJLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0gsOEJBQVUsR0FBVixVQUFXLFFBQWtCO29CQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsUUFBUSxFQUFFLENBQUM7b0JBQ2IsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDaEMsQ0FBQztvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0gsdUNBQW1CLEdBQW5CLFVBQW9CLFFBQWdCO29CQUNsQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7b0JBQ2pCLHdFQUF3RTtvQkFDeEUsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVDLE1BQU0sQ0FBQyxRQUFRLENBQUM7b0JBQ2xCLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUMzRCxJQUFJLEtBQUssR0FBRyxvQkFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUNwRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDOzRCQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3pDLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUMxRCxJQUFJLEVBQUUsR0FBRyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUN0RSxJQUFJLEtBQUssR0FBRyxXQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUMzQixFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDOzRCQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3pDLENBQUM7b0JBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFDbEIsQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDSCxnQ0FBWSxHQUFaLFVBQWEsR0FBVztvQkFDdEIsTUFBTSxDQUFDLG9CQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxvQkFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ2pGLENBQUM7Z0JBQ0gsZ0JBQUM7WUFBRCxDQXhMQSxBQXdMQyxJQUFBO1lBeExELGlDQXdMQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9hbmltYXRlL2FuaW1hdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERhdGVXcmFwcGVyLFxuICBTdHJpbmdXcmFwcGVyLFxuICBSZWdFeHBXcmFwcGVyLFxuICBOdW1iZXJXcmFwcGVyLFxuICBpc1ByZXNlbnRcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7TWF0aH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9tYXRoJztcbmltcG9ydCB7Y2FtZWxDYXNlVG9EYXNoQ2FzZX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS91dGlsJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcblxuaW1wb3J0IHtCcm93c2VyRGV0YWlsc30gZnJvbSAnLi9icm93c2VyX2RldGFpbHMnO1xuaW1wb3J0IHtDc3NBbmltYXRpb25PcHRpb25zfSBmcm9tICcuL2Nzc19hbmltYXRpb25fb3B0aW9ucyc7XG5cbmV4cG9ydCBjbGFzcyBBbmltYXRpb24ge1xuICAvKiogZnVuY3Rpb25zIHRvIGJlIGNhbGxlZCB1cG9uIGNvbXBsZXRpb24gKi9cbiAgY2FsbGJhY2tzOiBGdW5jdGlvbltdID0gW107XG5cbiAgLyoqIHRoZSBkdXJhdGlvbiAobXMpIG9mIHRoZSBhbmltYXRpb24gKHdoZXRoZXIgZnJvbSBDU1Mgb3IgbWFudWFsbHkgc2V0KSAqL1xuICBjb21wdXRlZER1cmF0aW9uOiBudW1iZXI7XG5cbiAgLyoqIHRoZSBhbmltYXRpb24gZGVsYXkgKG1zKSAod2hldGhlciBmcm9tIENTUyBvciBtYW51YWxseSBzZXQpICovXG4gIGNvbXB1dGVkRGVsYXk6IG51bWJlcjtcblxuICAvKiogdGltZXN0YW1wIG9mIHdoZW4gdGhlIGFuaW1hdGlvbiBzdGFydGVkICovXG4gIHN0YXJ0VGltZTogbnVtYmVyO1xuXG4gIC8qKiBmdW5jdGlvbnMgZm9yIHJlbW92aW5nIGV2ZW50IGxpc3RlbmVycyAqL1xuICBldmVudENsZWFyRnVuY3Rpb25zOiBGdW5jdGlvbltdID0gW107XG5cbiAgLyoqIGZsYWcgdXNlZCB0byB0cmFjayB3aGV0aGVyIG9yIG5vdCB0aGUgYW5pbWF0aW9uIGhhcyBmaW5pc2hlZCAqL1xuICBjb21wbGV0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF9zdHJpbmdQcmVmaXg6IHN0cmluZyA9ICcnO1xuXG4gIC8qKiB0b3RhbCBhbW91bnQgb2YgdGltZSB0aGF0IHRoZSBhbmltYXRpb24gc2hvdWxkIHRha2UgaW5jbHVkaW5nIGRlbGF5ICovXG4gIGdldCB0b3RhbFRpbWUoKTogbnVtYmVyIHtcbiAgICBsZXQgZGVsYXkgPSB0aGlzLmNvbXB1dGVkRGVsYXkgIT0gbnVsbCA/IHRoaXMuY29tcHV0ZWREZWxheSA6IDA7XG4gICAgbGV0IGR1cmF0aW9uID0gdGhpcy5jb21wdXRlZER1cmF0aW9uICE9IG51bGwgPyB0aGlzLmNvbXB1dGVkRHVyYXRpb24gOiAwO1xuICAgIHJldHVybiBkZWxheSArIGR1cmF0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlcyB0aGUgc3RhcnQgdGltZSBhbmQgc3RhcnRzIHRoZSBhbmltYXRpb25cbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHBhcmFtIGJyb3dzZXJEZXRhaWxzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQsIHB1YmxpYyBkYXRhOiBDc3NBbmltYXRpb25PcHRpb25zLFxuICAgICAgICAgICAgICBwdWJsaWMgYnJvd3NlckRldGFpbHM6IEJyb3dzZXJEZXRhaWxzKSB7XG4gICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlV3JhcHBlci50b01pbGxpcyhEYXRlV3JhcHBlci5ub3coKSk7XG4gICAgdGhpcy5fc3RyaW5nUHJlZml4ID0gRE9NLmdldEFuaW1hdGlvblByZWZpeCgpO1xuICAgIHRoaXMuc2V0dXAoKTtcbiAgICB0aGlzLndhaXQoKHRpbWVzdGFtcDogYW55KSA9PiB0aGlzLnN0YXJ0KCkpO1xuICB9XG5cbiAgd2FpdChjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAvLyBGaXJlZm94IHJlcXVpcmVzIDIgZnJhbWVzIGZvciBzb21lIHJlYXNvblxuICAgIHRoaXMuYnJvd3NlckRldGFpbHMucmFmKGNhbGxiYWNrLCAyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHVwIHRoZSBpbml0aWFsIHN0eWxlcyBiZWZvcmUgdGhlIGFuaW1hdGlvbiBpcyBzdGFydGVkXG4gICAqL1xuICBzZXR1cCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXRhLmZyb21TdHlsZXMgIT0gbnVsbCkgdGhpcy5hcHBseVN0eWxlcyh0aGlzLmRhdGEuZnJvbVN0eWxlcyk7XG4gICAgaWYgKHRoaXMuZGF0YS5kdXJhdGlvbiAhPSBudWxsKVxuICAgICAgdGhpcy5hcHBseVN0eWxlcyh7J3RyYW5zaXRpb25EdXJhdGlvbic6IHRoaXMuZGF0YS5kdXJhdGlvbi50b1N0cmluZygpICsgJ21zJ30pO1xuICAgIGlmICh0aGlzLmRhdGEuZGVsYXkgIT0gbnVsbClcbiAgICAgIHRoaXMuYXBwbHlTdHlsZXMoeyd0cmFuc2l0aW9uRGVsYXknOiB0aGlzLmRhdGEuZGVsYXkudG9TdHJpbmcoKSArICdtcyd9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZnRlciB0aGUgaW5pdGlhbCBzZXR1cCBoYXMgb2NjdXJyZWQsIHRoaXMgbWV0aG9kIGFkZHMgdGhlIGFuaW1hdGlvbiBzdHlsZXNcbiAgICovXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIHRoaXMuYWRkQ2xhc3Nlcyh0aGlzLmRhdGEuY2xhc3Nlc1RvQWRkKTtcbiAgICB0aGlzLmFkZENsYXNzZXModGhpcy5kYXRhLmFuaW1hdGlvbkNsYXNzZXMpO1xuICAgIHRoaXMucmVtb3ZlQ2xhc3Nlcyh0aGlzLmRhdGEuY2xhc3Nlc1RvUmVtb3ZlKTtcbiAgICBpZiAodGhpcy5kYXRhLnRvU3R5bGVzICE9IG51bGwpIHRoaXMuYXBwbHlTdHlsZXModGhpcy5kYXRhLnRvU3R5bGVzKTtcbiAgICB2YXIgY29tcHV0ZWRTdHlsZXMgPSBET00uZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnQpO1xuICAgIHRoaXMuY29tcHV0ZWREZWxheSA9XG4gICAgICAgIE1hdGgubWF4KHRoaXMucGFyc2VEdXJhdGlvblN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgIGNvbXB1dGVkU3R5bGVzLmdldFByb3BlcnR5VmFsdWUodGhpcy5fc3RyaW5nUHJlZml4ICsgJ3RyYW5zaXRpb24tZGVsYXknKSksXG4gICAgICAgICAgICAgICAgIHRoaXMucGFyc2VEdXJhdGlvblN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHRoaXMuX3N0cmluZ1ByZWZpeCArICd0cmFuc2l0aW9uLWRlbGF5JykpKTtcbiAgICB0aGlzLmNvbXB1dGVkRHVyYXRpb24gPSBNYXRoLm1heCh0aGlzLnBhcnNlRHVyYXRpb25TdHJpbmcoY29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RyaW5nUHJlZml4ICsgJ3RyYW5zaXRpb24tZHVyYXRpb24nKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZUR1cmF0aW9uU3RyaW5nKHRoaXMuZWxlbWVudC5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdHJpbmdQcmVmaXggKyAndHJhbnNpdGlvbi1kdXJhdGlvbicpKSk7XG4gICAgdGhpcy5hZGRFdmVudHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRoZSBwcm92aWRlZCBzdHlsZXMgdG8gdGhlIGVsZW1lbnRcbiAgICogQHBhcmFtIHN0eWxlc1xuICAgKi9cbiAgYXBwbHlTdHlsZXMoc3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSk6IHZvaWQge1xuICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChzdHlsZXMsICh2YWx1ZTogYW55LCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgdmFyIGRhc2hDYXNlS2V5ID0gY2FtZWxDYXNlVG9EYXNoQ2FzZShrZXkpO1xuICAgICAgaWYgKGlzUHJlc2VudChET00uZ2V0U3R5bGUodGhpcy5lbGVtZW50LCBkYXNoQ2FzZUtleSkpKSB7XG4gICAgICAgIERPTS5zZXRTdHlsZSh0aGlzLmVsZW1lbnQsIGRhc2hDYXNlS2V5LCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIERPTS5zZXRTdHlsZSh0aGlzLmVsZW1lbnQsIHRoaXMuX3N0cmluZ1ByZWZpeCArIGRhc2hDYXNlS2V5LCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBwcm92aWRlZCBjbGFzc2VzIHRvIHRoZSBlbGVtZW50XG4gICAqIEBwYXJhbSBjbGFzc2VzXG4gICAqL1xuICBhZGRDbGFzc2VzKGNsYXNzZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNsYXNzZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIERPTS5hZGRDbGFzcyh0aGlzLmVsZW1lbnQsIGNsYXNzZXNbaV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHByb3ZpZGVkIGNsYXNzZXMgZnJvbSB0aGUgZWxlbWVudFxuICAgKiBAcGFyYW0gY2xhc3Nlc1xuICAgKi9cbiAgcmVtb3ZlQ2xhc3NlcyhjbGFzc2VzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSBET00ucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50LCBjbGFzc2VzW2ldKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50cyB0byB0cmFjayB3aGVuIGFuaW1hdGlvbnMgaGF2ZSBmaW5pc2hlZFxuICAgKi9cbiAgYWRkRXZlbnRzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvdGFsVGltZSA+IDApIHtcbiAgICAgIHRoaXMuZXZlbnRDbGVhckZ1bmN0aW9ucy5wdXNoKERPTS5vbkFuZENhbmNlbChcbiAgICAgICAgICB0aGlzLmVsZW1lbnQsIERPTS5nZXRUcmFuc2l0aW9uRW5kKCksIChldmVudDogYW55KSA9PiB0aGlzLmhhbmRsZUFuaW1hdGlvbkV2ZW50KGV2ZW50KSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhbmRsZUFuaW1hdGlvbkNvbXBsZXRlZCgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUFuaW1hdGlvbkV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICBsZXQgZWxhcHNlZFRpbWUgPSBNYXRoLnJvdW5kKGV2ZW50LmVsYXBzZWRUaW1lICogMTAwMCk7XG4gICAgaWYgKCF0aGlzLmJyb3dzZXJEZXRhaWxzLmVsYXBzZWRUaW1lSW5jbHVkZXNEZWxheSkgZWxhcHNlZFRpbWUgKz0gdGhpcy5jb21wdXRlZERlbGF5O1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmIChlbGFwc2VkVGltZSA+PSB0aGlzLnRvdGFsVGltZSkgdGhpcy5oYW5kbGVBbmltYXRpb25Db21wbGV0ZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdW5zIGFsbCBhbmltYXRpb24gY2FsbGJhY2tzIGFuZCByZW1vdmVzIHRlbXBvcmFyeSBjbGFzc2VzXG4gICAqL1xuICBoYW5kbGVBbmltYXRpb25Db21wbGV0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVDbGFzc2VzKHRoaXMuZGF0YS5hbmltYXRpb25DbGFzc2VzKTtcbiAgICB0aGlzLmNhbGxiYWNrcy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKCkpO1xuICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgdGhpcy5ldmVudENsZWFyRnVuY3Rpb25zLmZvckVhY2goZm4gPT4gZm4oKSk7XG4gICAgdGhpcy5ldmVudENsZWFyRnVuY3Rpb25zID0gW107XG4gICAgdGhpcy5jb21wbGV0ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW5pbWF0aW9uIGNhbGxiYWNrcyB0byBiZSBjYWxsZWQgdXBvbiBjb21wbGV0aW9uXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKiBAcmV0dXJucyB7QW5pbWF0aW9ufVxuICAgKi9cbiAgb25Db21wbGV0ZShjYWxsYmFjazogRnVuY3Rpb24pOiBBbmltYXRpb24ge1xuICAgIGlmICh0aGlzLmNvbXBsZXRlZCkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHRoZSBkdXJhdGlvbiBzdHJpbmcgdG8gdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHNcbiAgICogQHBhcmFtIGR1cmF0aW9uXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBwYXJzZUR1cmF0aW9uU3RyaW5nKGR1cmF0aW9uOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIHZhciBtYXhWYWx1ZSA9IDA7XG4gICAgLy8gZHVyYXRpb24gbXVzdCBoYXZlIGF0IGxlYXN0IDIgY2hhcmFjdGVycyB0byBiZSB2YWxpZC4gKG51bWJlciArIHR5cGUpXG4gICAgaWYgKGR1cmF0aW9uID09IG51bGwgfHwgZHVyYXRpb24ubGVuZ3RoIDwgMikge1xuICAgICAgcmV0dXJuIG1heFZhbHVlO1xuICAgIH0gZWxzZSBpZiAoZHVyYXRpb24uc3Vic3RyaW5nKGR1cmF0aW9uLmxlbmd0aCAtIDIpID09ICdtcycpIHtcbiAgICAgIGxldCB2YWx1ZSA9IE51bWJlcldyYXBwZXIucGFyc2VJbnQodGhpcy5zdHJpcExldHRlcnMoZHVyYXRpb24pLCAxMCk7XG4gICAgICBpZiAodmFsdWUgPiBtYXhWYWx1ZSkgbWF4VmFsdWUgPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGR1cmF0aW9uLnN1YnN0cmluZyhkdXJhdGlvbi5sZW5ndGggLSAxKSA9PSAncycpIHtcbiAgICAgIGxldCBtcyA9IE51bWJlcldyYXBwZXIucGFyc2VGbG9hdCh0aGlzLnN0cmlwTGV0dGVycyhkdXJhdGlvbikpICogMTAwMDtcbiAgICAgIGxldCB2YWx1ZSA9IE1hdGguZmxvb3IobXMpO1xuICAgICAgaWYgKHZhbHVlID4gbWF4VmFsdWUpIG1heFZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBtYXhWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHJpcHMgdGhlIGxldHRlcnMgZnJvbSB0aGUgZHVyYXRpb24gc3RyaW5nXG4gICAqIEBwYXJhbSBzdHJcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0cmlwTGV0dGVycyhzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFN0cmluZ1dyYXBwZXIucmVwbGFjZUFsbChzdHIsIFJlZ0V4cFdyYXBwZXIuY3JlYXRlKCdbXjAtOV0rJCcsICcnKSwgJycpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
