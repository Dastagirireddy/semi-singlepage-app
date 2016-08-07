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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztzREFxRVcsZ0NBQWdDLEVBWWhDLDRCQUE0QjtJQU12QywwQ0FDSSx1QkFBZ0Q7UUFDbEQsTUFBTSxDQUFDLGNBQU8sQ0FBQyx1QkFBdUIsQ0FBQztZQUNoQyx1QkFBdUIsS0FBSyx1QkFBdUIsQ0FBQyxPQUFPLENBQUM7SUFDckUsQ0FBQztJQUpELCtFQUlDLENBQUE7Ozs7Ozs7WUF6RkQ7O2VBRUc7WUFDSCxXQUFZLG1CQUFtQjtnQkFDN0I7OzttQkFHRztnQkFDSCw2RUFBWSxDQUFBO2dCQUVaOzs7bUJBR0c7Z0JBQ0gsK0VBQWEsQ0FBQTtnQkFFYjs7OzttQkFJRztnQkFDSCxtRUFBTyxDQUFBO1lBQ1QsQ0FBQyxFQW5CVyxtQkFBbUIsS0FBbkIsbUJBQW1CLFFBbUI5QjtrRUFBQTtZQUVEOzs7ZUFHRztZQUNILFdBQVksdUJBQXVCO2dCQUNqQzs7O21CQUdHO2dCQUNILCtFQUFTLENBQUE7Z0JBRVQ7OzttQkFHRztnQkFDSCwyRUFBTyxDQUFBO2dCQUVQOzs7bUJBR0c7Z0JBQ0gsbUZBQVcsQ0FBQTtnQkFFWDs7O21CQUdHO2dCQUNILDZFQUFRLENBQUE7Z0JBRVI7O21CQUVHO2dCQUNILHlFQUFNLENBQUE7Z0JBRU47O21CQUVHO2dCQUNILDJFQUFPLENBQUE7WUFDVCxDQUFDLEVBbENXLHVCQUF1QixLQUF2Qix1QkFBdUIsUUFrQ2xDOzBFQUFBO1lBRUQ7O2VBRUc7WUFDUSw4Q0FBQSxnQ0FBZ0MsR0FBRztnQkFDNUMsdUJBQXVCLENBQUMsU0FBUztnQkFDakMsdUJBQXVCLENBQUMsT0FBTztnQkFDL0IsdUJBQXVCLENBQUMsV0FBVztnQkFDbkMsdUJBQXVCLENBQUMsUUFBUTtnQkFDaEMsdUJBQXVCLENBQUMsTUFBTTtnQkFDOUIsdUJBQXVCLENBQUMsT0FBTzthQUNoQyxDQUFBLENBQUM7WUFFRjs7ZUFFRztZQUNRLDBDQUFBLDRCQUE0QixHQUFHO2dCQUN4QyxtQkFBbUIsQ0FBQyxZQUFZO2dCQUNoQyxtQkFBbUIsQ0FBQyxhQUFhO2dCQUNqQyxtQkFBbUIsQ0FBQyxPQUFPO2FBQzVCLENBQUEsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY29uc3RhbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdHJpbmdXcmFwcGVyLCBub3JtYWxpemVCb29sLCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgY2hhbmdlIGRldGVjdG9yLlxuICovXG5leHBvcnQgZW51bSBDaGFuZ2VEZXRlY3RvclN0YXRlIHtcbiAgLyoqXG4gICAqIGBOZXZlckNoZWNrZWRgIG1lYW5zIHRoYXQgdGhlIGNoYW5nZSBkZXRlY3RvciBoYXMgbm90IGJlZW4gY2hlY2tlZCB5ZXQsIGFuZFxuICAgKiBpbml0aWFsaXphdGlvbiBtZXRob2RzIHNob3VsZCBiZSBjYWxsZWQgZHVyaW5nIGRldGVjdGlvbi5cbiAgICovXG4gIE5ldmVyQ2hlY2tlZCxcblxuICAvKipcbiAgICogYENoZWNrZWRCZWZvcmVgIG1lYW5zIHRoYXQgdGhlIGNoYW5nZSBkZXRlY3RvciBoYXMgc3VjY2Vzc2Z1bGx5IGNvbXBsZXRlZCBhdCBsZWFzdFxuICAgKiBvbmUgZGV0ZWN0aW9uIHByZXZpb3VzbHkuXG4gICAqL1xuICBDaGVja2VkQmVmb3JlLFxuXG4gIC8qKlxuICAgKiBgRXJyb3JlZGAgbWVhbnMgdGhhdCB0aGUgY2hhbmdlIGRldGVjdG9yIGVuY291bnRlcmVkIGFuIGVycm9yIGNoZWNraW5nIGEgYmluZGluZ1xuICAgKiBvciBjYWxsaW5nIGEgZGlyZWN0aXZlIGxpZmVjeWNsZSBtZXRob2QgYW5kIGlzIG5vdyBpbiBhbiBpbmNvbnNpc3RlbnQgc3RhdGUuIENoYW5nZVxuICAgKiBkZXRlY3RvcnMgaW4gdGhpcyBzdGF0ZSB3aWxsIG5vIGxvbmdlciBkZXRlY3QgY2hhbmdlcy5cbiAgICovXG4gIEVycm9yZWRcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgd2l0aGluIHRoZSBjaGFuZ2UgZGV0ZWN0b3Igd2hpY2ggc3RyYXRlZ3kgd2lsbCBiZSB1c2VkIHRoZSBuZXh0IHRpbWUgY2hhbmdlXG4gKiBkZXRlY3Rpb24gaXMgdHJpZ2dlcmVkLlxuICovXG5leHBvcnQgZW51bSBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB7XG4gIC8qKlxuICAgKiBgQ2hlY2tlZE9uY2VgIG1lYW5zIHRoYXQgYWZ0ZXIgY2FsbGluZyBkZXRlY3RDaGFuZ2VzIHRoZSBtb2RlIG9mIHRoZSBjaGFuZ2UgZGV0ZWN0b3JcbiAgICogd2lsbCBiZWNvbWUgYENoZWNrZWRgLlxuICAgKi9cbiAgQ2hlY2tPbmNlLFxuXG4gIC8qKlxuICAgKiBgQ2hlY2tlZGAgbWVhbnMgdGhhdCB0aGUgY2hhbmdlIGRldGVjdG9yIHNob3VsZCBiZSBza2lwcGVkIHVudGlsIGl0cyBtb2RlIGNoYW5nZXMgdG9cbiAgICogYENoZWNrT25jZWAuXG4gICAqL1xuICBDaGVja2VkLFxuXG4gIC8qKlxuICAgKiBgQ2hlY2tBbHdheXNgIG1lYW5zIHRoYXQgYWZ0ZXIgY2FsbGluZyBkZXRlY3RDaGFuZ2VzIHRoZSBtb2RlIG9mIHRoZSBjaGFuZ2UgZGV0ZWN0b3JcbiAgICogd2lsbCByZW1haW4gYENoZWNrQWx3YXlzYC5cbiAgICovXG4gIENoZWNrQWx3YXlzLFxuXG4gIC8qKlxuICAgKiBgRGV0YWNoZWRgIG1lYW5zIHRoYXQgdGhlIGNoYW5nZSBkZXRlY3RvciBzdWIgdHJlZSBpcyBub3QgYSBwYXJ0IG9mIHRoZSBtYWluIHRyZWUgYW5kXG4gICAqIHNob3VsZCBiZSBza2lwcGVkLlxuICAgKi9cbiAgRGV0YWNoZWQsXG5cbiAgLyoqXG4gICAqIGBPblB1c2hgIG1lYW5zIHRoYXQgdGhlIGNoYW5nZSBkZXRlY3RvcidzIG1vZGUgd2lsbCBiZSBzZXQgdG8gYENoZWNrT25jZWAgZHVyaW5nIGh5ZHJhdGlvbi5cbiAgICovXG4gIE9uUHVzaCxcblxuICAvKipcbiAgICogYERlZmF1bHRgIG1lYW5zIHRoYXQgdGhlIGNoYW5nZSBkZXRlY3RvcidzIG1vZGUgd2lsbCBiZSBzZXQgdG8gYENoZWNrQWx3YXlzYCBkdXJpbmcgaHlkcmF0aW9uLlxuICAgKi9cbiAgRGVmYXVsdCxcbn1cblxuLyoqXG4gKiBMaXN0IG9mIHBvc3NpYmxlIHtAbGluayBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gdmFsdWVzLlxuICovXG5leHBvcnQgdmFyIENIQU5HRV9ERVRFQ1RJT05fU1RSQVRFR1lfVkFMVUVTID0gW1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5DaGVja09uY2UsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkNoZWNrZWQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkNoZWNrQWx3YXlzLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZXRhY2hlZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XG5dO1xuXG4vKipcbiAqIExpc3Qgb2YgcG9zc2libGUge0BsaW5rIENoYW5nZURldGVjdG9yU3RhdGV9IHZhbHVlcy5cbiAqL1xuZXhwb3J0IHZhciBDSEFOR0VfREVURUNUT1JfU1RBVEVfVkFMVUVTID0gW1xuICBDaGFuZ2VEZXRlY3RvclN0YXRlLk5ldmVyQ2hlY2tlZCxcbiAgQ2hhbmdlRGV0ZWN0b3JTdGF0ZS5DaGVja2VkQmVmb3JlLFxuICBDaGFuZ2VEZXRlY3RvclN0YXRlLkVycm9yZWRcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RlZmF1bHRDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneShcbiAgICBjaGFuZ2VEZXRlY3Rpb25TdHJhdGVneTogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kpOiBib29sZWFuIHtcbiAgcmV0dXJuIGlzQmxhbmsoY2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kpIHx8XG4gICAgICAgICBjaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSA9PT0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdDtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
