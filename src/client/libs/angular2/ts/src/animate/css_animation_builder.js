System.register(['./css_animation_options', './animation'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var css_animation_options_1, animation_1;
    var CssAnimationBuilder;
    return {
        setters:[
            function (css_animation_options_1_1) {
                css_animation_options_1 = css_animation_options_1_1;
            },
            function (animation_1_1) {
                animation_1 = animation_1_1;
            }],
        execute: function() {
            CssAnimationBuilder = (function () {
                /**
                 * Accepts public properties for CssAnimationBuilder
                 */
                function CssAnimationBuilder(browserDetails) {
                    this.browserDetails = browserDetails;
                    /** @type {CssAnimationOptions} */
                    this.data = new css_animation_options_1.CssAnimationOptions();
                }
                /**
                 * Adds a temporary class that will be removed at the end of the animation
                 * @param className
                 */
                CssAnimationBuilder.prototype.addAnimationClass = function (className) {
                    this.data.animationClasses.push(className);
                    return this;
                };
                /**
                 * Adds a class that will remain on the element after the animation has finished
                 * @param className
                 */
                CssAnimationBuilder.prototype.addClass = function (className) {
                    this.data.classesToAdd.push(className);
                    return this;
                };
                /**
                 * Removes a class from the element
                 * @param className
                 */
                CssAnimationBuilder.prototype.removeClass = function (className) {
                    this.data.classesToRemove.push(className);
                    return this;
                };
                /**
                 * Sets the animation duration (and overrides any defined through CSS)
                 * @param duration
                 */
                CssAnimationBuilder.prototype.setDuration = function (duration) {
                    this.data.duration = duration;
                    return this;
                };
                /**
                 * Sets the animation delay (and overrides any defined through CSS)
                 * @param delay
                 */
                CssAnimationBuilder.prototype.setDelay = function (delay) {
                    this.data.delay = delay;
                    return this;
                };
                /**
                 * Sets styles for both the initial state and the destination state
                 * @param from
                 * @param to
                 */
                CssAnimationBuilder.prototype.setStyles = function (from, to) {
                    return this.setFromStyles(from).setToStyles(to);
                };
                /**
                 * Sets the initial styles for the animation
                 * @param from
                 */
                CssAnimationBuilder.prototype.setFromStyles = function (from) {
                    this.data.fromStyles = from;
                    return this;
                };
                /**
                 * Sets the destination styles for the animation
                 * @param to
                 */
                CssAnimationBuilder.prototype.setToStyles = function (to) {
                    this.data.toStyles = to;
                    return this;
                };
                /**
                 * Starts the animation and returns a promise
                 * @param element
                 */
                CssAnimationBuilder.prototype.start = function (element) {
                    return new animation_1.Animation(element, this.data, this.browserDetails);
                };
                return CssAnimationBuilder;
            }());
            exports_1("CssAnimationBuilder", CssAnimationBuilder);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2FuaW1hdGUvY3NzX2FuaW1hdGlvbl9idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O1lBSUE7Z0JBSUU7O21CQUVHO2dCQUNILDZCQUFtQixjQUE4QjtvQkFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO29CQU5qRCxrQ0FBa0M7b0JBQ2xDLFNBQUksR0FBd0IsSUFBSSwyQ0FBbUIsRUFBRSxDQUFDO2dCQUtGLENBQUM7Z0JBRXJEOzs7bUJBR0c7Z0JBQ0gsK0NBQWlCLEdBQWpCLFVBQWtCLFNBQWlCO29CQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUVEOzs7bUJBR0c7Z0JBQ0gsc0NBQVEsR0FBUixVQUFTLFNBQWlCO29CQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNILHlDQUFXLEdBQVgsVUFBWSxTQUFpQjtvQkFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSCx5Q0FBVyxHQUFYLFVBQVksUUFBZ0I7b0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztvQkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUVEOzs7bUJBR0c7Z0JBQ0gsc0NBQVEsR0FBUixVQUFTLEtBQWE7b0JBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUVEOzs7O21CQUlHO2dCQUNILHVDQUFTLEdBQVQsVUFBVSxJQUEwQixFQUFFLEVBQXdCO29CQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xELENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSCwyQ0FBYSxHQUFiLFVBQWMsSUFBMEI7b0JBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUVEOzs7bUJBR0c7Z0JBQ0gseUNBQVcsR0FBWCxVQUFZLEVBQXdCO29CQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7b0JBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNILG1DQUFLLEdBQUwsVUFBTSxPQUFvQjtvQkFDeEIsTUFBTSxDQUFDLElBQUkscUJBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ2hFLENBQUM7Z0JBQ0gsMEJBQUM7WUFBRCxDQXhGQSxBQXdGQyxJQUFBO1lBeEZELHFEQXdGQyxDQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2FuaW1hdGUvY3NzX2FuaW1hdGlvbl9idWlsZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDc3NBbmltYXRpb25PcHRpb25zfSBmcm9tICcuL2Nzc19hbmltYXRpb25fb3B0aW9ucyc7XG5pbXBvcnQge0FuaW1hdGlvbn0gZnJvbSAnLi9hbmltYXRpb24nO1xuaW1wb3J0IHtCcm93c2VyRGV0YWlsc30gZnJvbSAnLi9icm93c2VyX2RldGFpbHMnO1xuXG5leHBvcnQgY2xhc3MgQ3NzQW5pbWF0aW9uQnVpbGRlciB7XG4gIC8qKiBAdHlwZSB7Q3NzQW5pbWF0aW9uT3B0aW9uc30gKi9cbiAgZGF0YTogQ3NzQW5pbWF0aW9uT3B0aW9ucyA9IG5ldyBDc3NBbmltYXRpb25PcHRpb25zKCk7XG5cbiAgLyoqXG4gICAqIEFjY2VwdHMgcHVibGljIHByb3BlcnRpZXMgZm9yIENzc0FuaW1hdGlvbkJ1aWxkZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBicm93c2VyRGV0YWlsczogQnJvd3NlckRldGFpbHMpIHt9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB0ZW1wb3JhcnkgY2xhc3MgdGhhdCB3aWxsIGJlIHJlbW92ZWQgYXQgdGhlIGVuZCBvZiB0aGUgYW5pbWF0aW9uXG4gICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICovXG4gIGFkZEFuaW1hdGlvbkNsYXNzKGNsYXNzTmFtZTogc3RyaW5nKTogQ3NzQW5pbWF0aW9uQnVpbGRlciB7XG4gICAgdGhpcy5kYXRhLmFuaW1hdGlvbkNsYXNzZXMucHVzaChjbGFzc05hbWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyB0aGF0IHdpbGwgcmVtYWluIG9uIHRoZSBlbGVtZW50IGFmdGVyIHRoZSBhbmltYXRpb24gaGFzIGZpbmlzaGVkXG4gICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZTogc3RyaW5nKTogQ3NzQW5pbWF0aW9uQnVpbGRlciB7XG4gICAgdGhpcy5kYXRhLmNsYXNzZXNUb0FkZC5wdXNoKGNsYXNzTmFtZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNsYXNzIGZyb20gdGhlIGVsZW1lbnRcbiAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lOiBzdHJpbmcpOiBDc3NBbmltYXRpb25CdWlsZGVyIHtcbiAgICB0aGlzLmRhdGEuY2xhc3Nlc1RvUmVtb3ZlLnB1c2goY2xhc3NOYW1lKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBhbmltYXRpb24gZHVyYXRpb24gKGFuZCBvdmVycmlkZXMgYW55IGRlZmluZWQgdGhyb3VnaCBDU1MpXG4gICAqIEBwYXJhbSBkdXJhdGlvblxuICAgKi9cbiAgc2V0RHVyYXRpb24oZHVyYXRpb246IG51bWJlcik6IENzc0FuaW1hdGlvbkJ1aWxkZXIge1xuICAgIHRoaXMuZGF0YS5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGFuaW1hdGlvbiBkZWxheSAoYW5kIG92ZXJyaWRlcyBhbnkgZGVmaW5lZCB0aHJvdWdoIENTUylcbiAgICogQHBhcmFtIGRlbGF5XG4gICAqL1xuICBzZXREZWxheShkZWxheTogbnVtYmVyKTogQ3NzQW5pbWF0aW9uQnVpbGRlciB7XG4gICAgdGhpcy5kYXRhLmRlbGF5ID0gZGVsYXk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBzdHlsZXMgZm9yIGJvdGggdGhlIGluaXRpYWwgc3RhdGUgYW5kIHRoZSBkZXN0aW5hdGlvbiBzdGF0ZVxuICAgKiBAcGFyYW0gZnJvbVxuICAgKiBAcGFyYW0gdG9cbiAgICovXG4gIHNldFN0eWxlcyhmcm9tOiB7W2tleTogc3RyaW5nXTogYW55fSwgdG86IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ3NzQW5pbWF0aW9uQnVpbGRlciB7XG4gICAgcmV0dXJuIHRoaXMuc2V0RnJvbVN0eWxlcyhmcm9tKS5zZXRUb1N0eWxlcyh0byk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgaW5pdGlhbCBzdHlsZXMgZm9yIHRoZSBhbmltYXRpb25cbiAgICogQHBhcmFtIGZyb21cbiAgICovXG4gIHNldEZyb21TdHlsZXMoZnJvbToge1trZXk6IHN0cmluZ106IGFueX0pOiBDc3NBbmltYXRpb25CdWlsZGVyIHtcbiAgICB0aGlzLmRhdGEuZnJvbVN0eWxlcyA9IGZyb207XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZGVzdGluYXRpb24gc3R5bGVzIGZvciB0aGUgYW5pbWF0aW9uXG4gICAqIEBwYXJhbSB0b1xuICAgKi9cbiAgc2V0VG9TdHlsZXModG86IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ3NzQW5pbWF0aW9uQnVpbGRlciB7XG4gICAgdGhpcy5kYXRhLnRvU3R5bGVzID0gdG87XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIHRoZSBhbmltYXRpb24gYW5kIHJldHVybnMgYSBwcm9taXNlXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqL1xuICBzdGFydChlbGVtZW50OiBIVE1MRWxlbWVudCk6IEFuaW1hdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBBbmltYXRpb24oZWxlbWVudCwgdGhpcy5kYXRhLCB0aGlzLmJyb3dzZXJEZXRhaWxzKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
