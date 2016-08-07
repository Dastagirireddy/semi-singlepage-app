System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var ChangeDetectorState, ChangeDetectionStrategy, CHANGE_DETECTION_STRATEGY_VALUES, CHANGE_DETECTOR_STATE_VALUES;
    function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
        return lang_1.isBlank(changeDetectionStrategy) ||
            changeDetectionStrategy === ChangeDetectionStrategy.Default;
    }
    exports_1("isDefaultChangeDetectionStrategy", isDefaultChangeDetectionStrategy);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Describes the current state of the change detector.
             */
            (function (ChangeDetectorState) {
                /**
                 * `NeverChecked` means that the change detector has not been checked yet, and
                 * initialization methods should be called during detection.
                 */
                ChangeDetectorState[ChangeDetectorState["NeverChecked"] = 0] = "NeverChecked";
                /**
                 * `CheckedBefore` means that the change detector has successfully completed at least
                 * one detection previously.
                 */
                ChangeDetectorState[ChangeDetectorState["CheckedBefore"] = 1] = "CheckedBefore";
                /**
                 * `Errored` means that the change detector encountered an error checking a binding
                 * or calling a directive lifecycle method and is now in an inconsistent state. Change
                 * detectors in this state will no longer detect changes.
                 */
                ChangeDetectorState[ChangeDetectorState["Errored"] = 2] = "Errored";
            })(ChangeDetectorState || (ChangeDetectorState = {}));
            exports_1("ChangeDetectorState", ChangeDetectorState);
            /**
             * Describes within the change detector which strategy will be used the next time change
             * detection is triggered.
             */
            (function (ChangeDetectionStrategy) {
                /**
                 * `CheckedOnce` means that after calling detectChanges the mode of the change detector
                 * will become `Checked`.
                 */
                ChangeDetectionStrategy[ChangeDetectionStrategy["CheckOnce"] = 0] = "CheckOnce";
                /**
                 * `Checked` means that the change detector should be skipped until its mode changes to
                 * `CheckOnce`.
                 */
                ChangeDetectionStrategy[ChangeDetectionStrategy["Checked"] = 1] = "Checked";
                /**
                 * `CheckAlways` means that after calling detectChanges the mode of the change detector
                 * will remain `CheckAlways`.
                 */
                ChangeDetectionStrategy[ChangeDetectionStrategy["CheckAlways"] = 2] = "CheckAlways";
                /**
                 * `Detached` means that the change detector sub tree is not a part of the main tree and
                 * should be skipped.
                 */
                ChangeDetectionStrategy[ChangeDetectionStrategy["Detached"] = 3] = "Detached";
                /**
                 * `OnPush` means that the change detector's mode will be set to `CheckOnce` during hydration.
                 */
                ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 4] = "OnPush";
                /**
                 * `Default` means that the change detector's mode will be set to `CheckAlways` during hydration.
                 */
                ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 5] = "Default";
            })(ChangeDetectionStrategy || (ChangeDetectionStrategy = {}));
            exports_1("ChangeDetectionStrategy", ChangeDetectionStrategy);
            /**
             * List of possible {@link ChangeDetectionStrategy} values.
             */
            exports_1("CHANGE_DETECTION_STRATEGY_VALUES", CHANGE_DETECTION_STRATEGY_VALUES = [
                ChangeDetectionStrategy.CheckOnce,
                ChangeDetectionStrategy.Checked,
                ChangeDetectionStrategy.CheckAlways,
                ChangeDetectionStrategy.Detached,
                ChangeDetectionStrategy.OnPush,
                ChangeDetectionStrategy.Default
            ]);
            /**
             * List of possible {@link ChangeDetectorState} values.
             */
            exports_1("CHANGE_DETECTOR_STATE_VALUES", CHANGE_DETECTOR_STATE_VALUES = [
                ChangeDetectorState.NeverChecked,
                ChangeDetectorState.CheckedBefore,
                ChangeDetectorState.Errored
            ]);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7c0RBc0VXLGdDQUFnQyxFQVloQyw0QkFBNEI7SUFNdkMsMENBQ0ksdUJBQWdEO1FBQ2xELE1BQU0sQ0FBQyxjQUFPLENBQUMsdUJBQXVCLENBQUM7WUFDaEMsdUJBQXVCLEtBQUssdUJBQXVCLENBQUMsT0FBTyxDQUFDO0lBQ3JFLENBQUM7SUFKRCwrRUFJQyxDQUFBOzs7Ozs7O1lBMUZEOztlQUVHO1lBQ0gsV0FBWSxtQkFBbUI7Z0JBQzdCOzs7bUJBR0c7Z0JBQ0gsNkVBQVksQ0FBQTtnQkFFWjs7O21CQUdHO2dCQUNILCtFQUFhLENBQUE7Z0JBRWI7Ozs7bUJBSUc7Z0JBQ0gsbUVBQU8sQ0FBQTtZQUNULENBQUMsRUFuQlcsbUJBQW1CLEtBQW5CLG1CQUFtQixRQW1COUI7a0VBQUE7WUFHRDs7O2VBR0c7WUFDSCxXQUFZLHVCQUF1QjtnQkFDakM7OzttQkFHRztnQkFDSCwrRUFBUyxDQUFBO2dCQUVUOzs7bUJBR0c7Z0JBQ0gsMkVBQU8sQ0FBQTtnQkFFUDs7O21CQUdHO2dCQUNILG1GQUFXLENBQUE7Z0JBRVg7OzttQkFHRztnQkFDSCw2RUFBUSxDQUFBO2dCQUVSOzttQkFFRztnQkFDSCx5RUFBTSxDQUFBO2dCQUVOOzttQkFFRztnQkFDSCwyRUFBTyxDQUFBO1lBQ1QsQ0FBQyxFQWxDVyx1QkFBdUIsS0FBdkIsdUJBQXVCLFFBa0NsQzswRUFBQTtZQUVEOztlQUVHO1lBQ1EsOENBQUEsZ0NBQWdDLEdBQUc7Z0JBQzVDLHVCQUF1QixDQUFDLFNBQVM7Z0JBQ2pDLHVCQUF1QixDQUFDLE9BQU87Z0JBQy9CLHVCQUF1QixDQUFDLFdBQVc7Z0JBQ25DLHVCQUF1QixDQUFDLFFBQVE7Z0JBQ2hDLHVCQUF1QixDQUFDLE1BQU07Z0JBQzlCLHVCQUF1QixDQUFDLE9BQU87YUFDaEMsQ0FBQSxDQUFDO1lBRUY7O2VBRUc7WUFDUSwwQ0FBQSw0QkFBNEIsR0FBRztnQkFDeEMsbUJBQW1CLENBQUMsWUFBWTtnQkFDaEMsbUJBQW1CLENBQUMsYUFBYTtnQkFDakMsbUJBQW1CLENBQUMsT0FBTzthQUM1QixDQUFBLENBQUMiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jb25zdGFudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0cmluZ1dyYXBwZXIsIG5vcm1hbGl6ZUJvb2wsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbi8qKlxuICogRGVzY3JpYmVzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBjaGFuZ2UgZGV0ZWN0b3IuXG4gKi9cbmV4cG9ydCBlbnVtIENoYW5nZURldGVjdG9yU3RhdGUge1xuICAvKipcbiAgICogYE5ldmVyQ2hlY2tlZGAgbWVhbnMgdGhhdCB0aGUgY2hhbmdlIGRldGVjdG9yIGhhcyBub3QgYmVlbiBjaGVja2VkIHlldCwgYW5kXG4gICAqIGluaXRpYWxpemF0aW9uIG1ldGhvZHMgc2hvdWxkIGJlIGNhbGxlZCBkdXJpbmcgZGV0ZWN0aW9uLlxuICAgKi9cbiAgTmV2ZXJDaGVja2VkLFxuXG4gIC8qKlxuICAgKiBgQ2hlY2tlZEJlZm9yZWAgbWVhbnMgdGhhdCB0aGUgY2hhbmdlIGRldGVjdG9yIGhhcyBzdWNjZXNzZnVsbHkgY29tcGxldGVkIGF0IGxlYXN0XG4gICAqIG9uZSBkZXRlY3Rpb24gcHJldmlvdXNseS5cbiAgICovXG4gIENoZWNrZWRCZWZvcmUsXG5cbiAgLyoqXG4gICAqIGBFcnJvcmVkYCBtZWFucyB0aGF0IHRoZSBjaGFuZ2UgZGV0ZWN0b3IgZW5jb3VudGVyZWQgYW4gZXJyb3IgY2hlY2tpbmcgYSBiaW5kaW5nXG4gICAqIG9yIGNhbGxpbmcgYSBkaXJlY3RpdmUgbGlmZWN5Y2xlIG1ldGhvZCBhbmQgaXMgbm93IGluIGFuIGluY29uc2lzdGVudCBzdGF0ZS4gQ2hhbmdlXG4gICAqIGRldGVjdG9ycyBpbiB0aGlzIHN0YXRlIHdpbGwgbm8gbG9uZ2VyIGRldGVjdCBjaGFuZ2VzLlxuICAgKi9cbiAgRXJyb3JlZFxufVxuXG5cbi8qKlxuICogRGVzY3JpYmVzIHdpdGhpbiB0aGUgY2hhbmdlIGRldGVjdG9yIHdoaWNoIHN0cmF0ZWd5IHdpbGwgYmUgdXNlZCB0aGUgbmV4dCB0aW1lIGNoYW5nZVxuICogZGV0ZWN0aW9uIGlzIHRyaWdnZXJlZC5cbiAqL1xuZXhwb3J0IGVudW0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kge1xuICAvKipcbiAgICogYENoZWNrZWRPbmNlYCBtZWFucyB0aGF0IGFmdGVyIGNhbGxpbmcgZGV0ZWN0Q2hhbmdlcyB0aGUgbW9kZSBvZiB0aGUgY2hhbmdlIGRldGVjdG9yXG4gICAqIHdpbGwgYmVjb21lIGBDaGVja2VkYC5cbiAgICovXG4gIENoZWNrT25jZSxcblxuICAvKipcbiAgICogYENoZWNrZWRgIG1lYW5zIHRoYXQgdGhlIGNoYW5nZSBkZXRlY3RvciBzaG91bGQgYmUgc2tpcHBlZCB1bnRpbCBpdHMgbW9kZSBjaGFuZ2VzIHRvXG4gICAqIGBDaGVja09uY2VgLlxuICAgKi9cbiAgQ2hlY2tlZCxcblxuICAvKipcbiAgICogYENoZWNrQWx3YXlzYCBtZWFucyB0aGF0IGFmdGVyIGNhbGxpbmcgZGV0ZWN0Q2hhbmdlcyB0aGUgbW9kZSBvZiB0aGUgY2hhbmdlIGRldGVjdG9yXG4gICAqIHdpbGwgcmVtYWluIGBDaGVja0Fsd2F5c2AuXG4gICAqL1xuICBDaGVja0Fsd2F5cyxcblxuICAvKipcbiAgICogYERldGFjaGVkYCBtZWFucyB0aGF0IHRoZSBjaGFuZ2UgZGV0ZWN0b3Igc3ViIHRyZWUgaXMgbm90IGEgcGFydCBvZiB0aGUgbWFpbiB0cmVlIGFuZFxuICAgKiBzaG91bGQgYmUgc2tpcHBlZC5cbiAgICovXG4gIERldGFjaGVkLFxuXG4gIC8qKlxuICAgKiBgT25QdXNoYCBtZWFucyB0aGF0IHRoZSBjaGFuZ2UgZGV0ZWN0b3IncyBtb2RlIHdpbGwgYmUgc2V0IHRvIGBDaGVja09uY2VgIGR1cmluZyBoeWRyYXRpb24uXG4gICAqL1xuICBPblB1c2gsXG5cbiAgLyoqXG4gICAqIGBEZWZhdWx0YCBtZWFucyB0aGF0IHRoZSBjaGFuZ2UgZGV0ZWN0b3IncyBtb2RlIHdpbGwgYmUgc2V0IHRvIGBDaGVja0Fsd2F5c2AgZHVyaW5nIGh5ZHJhdGlvbi5cbiAgICovXG4gIERlZmF1bHQsXG59XG5cbi8qKlxuICogTGlzdCBvZiBwb3NzaWJsZSB7QGxpbmsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IHZhbHVlcy5cbiAqL1xuZXhwb3J0IHZhciBDSEFOR0VfREVURUNUSU9OX1NUUkFURUdZX1ZBTFVFUyA9IFtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuQ2hlY2tPbmNlLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5DaGVja2VkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5DaGVja0Fsd2F5cyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGV0YWNoZWQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxuXTtcblxuLyoqXG4gKiBMaXN0IG9mIHBvc3NpYmxlIHtAbGluayBDaGFuZ2VEZXRlY3RvclN0YXRlfSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCB2YXIgQ0hBTkdFX0RFVEVDVE9SX1NUQVRFX1ZBTFVFUyA9IFtcbiAgQ2hhbmdlRGV0ZWN0b3JTdGF0ZS5OZXZlckNoZWNrZWQsXG4gIENoYW5nZURldGVjdG9yU3RhdGUuQ2hlY2tlZEJlZm9yZSxcbiAgQ2hhbmdlRGV0ZWN0b3JTdGF0ZS5FcnJvcmVkXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3koXG4gICAgY2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3k6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5KTogYm9vbGVhbiB7XG4gIHJldHVybiBpc0JsYW5rKGNoYW5nZURldGVjdGlvblN0cmF0ZWd5KSB8fFxuICAgICAgICAgY2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgPT09IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQ7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
