System.register(['./differs/iterable_differs', './differs/default_iterable_differ', './differs/keyvalue_differs', './differs/default_keyvalue_differ', 'angular2/src/facade/lang', './constants', './change_detector_ref', './change_detection_util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var iterable_differs_1, default_iterable_differ_1, keyvalue_differs_1, default_keyvalue_differ_1, lang_1;
    var keyValDiff, iterableDiff, defaultIterableDiffers, defaultKeyValueDiffers;
    return {
        setters:[
            function (iterable_differs_1_1) {
                iterable_differs_1 = iterable_differs_1_1;
                exports_1({
                    "IterableDiffers": iterable_differs_1_1["IterableDiffers"],
                    "IterableDiffer": iterable_differs_1_1["IterableDiffer"],
                    "IterableDifferFactory": iterable_differs_1_1["IterableDifferFactory"],
                    "TrackByFn": iterable_differs_1_1["TrackByFn"]
                });
            },
            function (default_iterable_differ_1_1) {
                default_iterable_differ_1 = default_iterable_differ_1_1;
                exports_1({
                    "DefaultIterableDifferFactory": default_iterable_differ_1_1["DefaultIterableDifferFactory"],
                    "CollectionChangeRecord": default_iterable_differ_1_1["CollectionChangeRecord"]
                });
            },
            function (keyvalue_differs_1_1) {
                keyvalue_differs_1 = keyvalue_differs_1_1;
                exports_1({
                    "KeyValueDiffers": keyvalue_differs_1_1["KeyValueDiffers"],
                    "KeyValueDiffer": keyvalue_differs_1_1["KeyValueDiffer"],
                    "KeyValueDifferFactory": keyvalue_differs_1_1["KeyValueDifferFactory"]
                });
            },
            function (default_keyvalue_differ_1_1) {
                default_keyvalue_differ_1 = default_keyvalue_differ_1_1;
                exports_1({
                    "DefaultKeyValueDifferFactory": default_keyvalue_differ_1_1["DefaultKeyValueDifferFactory"],
                    "KeyValueChangeRecord": default_keyvalue_differ_1_1["KeyValueChangeRecord"]
                });
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (constants_1_1) {
                exports_1({
                    "ChangeDetectionStrategy": constants_1_1["ChangeDetectionStrategy"],
                    "CHANGE_DETECTION_STRATEGY_VALUES": constants_1_1["CHANGE_DETECTION_STRATEGY_VALUES"],
                    "ChangeDetectorState": constants_1_1["ChangeDetectorState"],
                    "CHANGE_DETECTOR_STATE_VALUES": constants_1_1["CHANGE_DETECTOR_STATE_VALUES"],
                    "isDefaultChangeDetectionStrategy": constants_1_1["isDefaultChangeDetectionStrategy"]
                });
            },
            function (change_detector_ref_1_1) {
                exports_1({
                    "ChangeDetectorRef": change_detector_ref_1_1["ChangeDetectorRef"]
                });
            },
            function (change_detection_util_1_1) {
                exports_1({
                    "WrappedValue": change_detection_util_1_1["WrappedValue"],
                    "ValueUnwrapper": change_detection_util_1_1["ValueUnwrapper"],
                    "SimpleChange": change_detection_util_1_1["SimpleChange"],
                    "devModeEqual": change_detection_util_1_1["devModeEqual"],
                    "looseIdentical": change_detection_util_1_1["looseIdentical"],
                    "uninitialized": change_detection_util_1_1["uninitialized"]
                });
            }],
        execute: function() {
            /**
             * Structural diffing for `Object`s and `Map`s.
             */
            exports_1("keyValDiff", keyValDiff = lang_1.CONST_EXPR([lang_1.CONST_EXPR(new default_keyvalue_differ_1.DefaultKeyValueDifferFactory())]));
            /**
             * Structural diffing for `Iterable` types such as `Array`s.
             */
            exports_1("iterableDiff", iterableDiff = lang_1.CONST_EXPR([lang_1.CONST_EXPR(new default_iterable_differ_1.DefaultIterableDifferFactory())]));
            exports_1("defaultIterableDiffers", defaultIterableDiffers = lang_1.CONST_EXPR(new iterable_differs_1.IterableDiffers(iterableDiff)));
            exports_1("defaultKeyValueDiffers", defaultKeyValueDiffers = lang_1.CONST_EXPR(new keyvalue_differs_1.KeyValueDiffers(keyValDiff)));
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1FBK0NhLFVBQVUsRUFNVixZQUFZLEVBR1osc0JBQXNCLEVBRXRCLHNCQUFzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFkbkM7O2VBRUc7WUFDVSx3QkFBQSxVQUFVLEdBQ25CLGlCQUFVLENBQUMsQ0FBQyxpQkFBVSxDQUFDLElBQUksc0RBQTRCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBRWpFOztlQUVHO1lBQ1UsMEJBQUEsWUFBWSxHQUNyQixpQkFBVSxDQUFDLENBQUMsaUJBQVUsQ0FBQyxJQUFJLHNEQUE0QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUVwRCxvQ0FBQSxzQkFBc0IsR0FBRyxpQkFBVSxDQUFDLElBQUksa0NBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFFdkUsb0NBQUEsc0JBQXNCLEdBQUcsaUJBQVUsQ0FBQyxJQUFJLGtDQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SXRlcmFibGVEaWZmZXJzLCBJdGVyYWJsZURpZmZlckZhY3Rvcnl9IGZyb20gJy4vZGlmZmVycy9pdGVyYWJsZV9kaWZmZXJzJztcbmltcG9ydCB7RGVmYXVsdEl0ZXJhYmxlRGlmZmVyRmFjdG9yeX0gZnJvbSAnLi9kaWZmZXJzL2RlZmF1bHRfaXRlcmFibGVfZGlmZmVyJztcbmltcG9ydCB7S2V5VmFsdWVEaWZmZXJzLCBLZXlWYWx1ZURpZmZlckZhY3Rvcnl9IGZyb20gJy4vZGlmZmVycy9rZXl2YWx1ZV9kaWZmZXJzJztcbmltcG9ydCB7XG4gIERlZmF1bHRLZXlWYWx1ZURpZmZlckZhY3RvcnksXG4gIEtleVZhbHVlQ2hhbmdlUmVjb3JkXG59IGZyb20gJy4vZGlmZmVycy9kZWZhdWx0X2tleXZhbHVlX2RpZmZlcic7XG5pbXBvcnQge0NPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmV4cG9ydCB7XG4gIERlZmF1bHRLZXlWYWx1ZURpZmZlckZhY3RvcnksXG4gIEtleVZhbHVlQ2hhbmdlUmVjb3JkXG59IGZyb20gJy4vZGlmZmVycy9kZWZhdWx0X2tleXZhbHVlX2RpZmZlcic7XG5leHBvcnQge1xuICBEZWZhdWx0SXRlcmFibGVEaWZmZXJGYWN0b3J5LFxuICBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkXG59IGZyb20gJy4vZGlmZmVycy9kZWZhdWx0X2l0ZXJhYmxlX2RpZmZlcic7XG5cbmV4cG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDSEFOR0VfREVURUNUSU9OX1NUUkFURUdZX1ZBTFVFUyxcbiAgQ2hhbmdlRGV0ZWN0b3JTdGF0ZSxcbiAgQ0hBTkdFX0RFVEVDVE9SX1NUQVRFX1ZBTFVFUyxcbiAgaXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnLi9jb25zdGFudHMnO1xuZXhwb3J0IHtDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnLi9jaGFuZ2VfZGV0ZWN0b3JfcmVmJztcbmV4cG9ydCB7XG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgSXRlcmFibGVEaWZmZXIsXG4gIEl0ZXJhYmxlRGlmZmVyRmFjdG9yeSxcbiAgVHJhY2tCeUZuXG59IGZyb20gJy4vZGlmZmVycy9pdGVyYWJsZV9kaWZmZXJzJztcbmV4cG9ydCB7S2V5VmFsdWVEaWZmZXJzLCBLZXlWYWx1ZURpZmZlciwgS2V5VmFsdWVEaWZmZXJGYWN0b3J5fSBmcm9tICcuL2RpZmZlcnMva2V5dmFsdWVfZGlmZmVycyc7XG5leHBvcnQge1BpcGVUcmFuc2Zvcm19IGZyb20gJy4vcGlwZV90cmFuc2Zvcm0nO1xuXG5leHBvcnQge1xuICBXcmFwcGVkVmFsdWUsXG4gIFZhbHVlVW53cmFwcGVyLFxuICBTaW1wbGVDaGFuZ2UsXG4gIGRldk1vZGVFcXVhbCxcbiAgbG9vc2VJZGVudGljYWwsXG4gIHVuaW5pdGlhbGl6ZWRcbn0gZnJvbSAnLi9jaGFuZ2VfZGV0ZWN0aW9uX3V0aWwnO1xuXG4vKipcbiAqIFN0cnVjdHVyYWwgZGlmZmluZyBmb3IgYE9iamVjdGBzIGFuZCBgTWFwYHMuXG4gKi9cbmV4cG9ydCBjb25zdCBrZXlWYWxEaWZmOiBLZXlWYWx1ZURpZmZlckZhY3RvcnlbXSA9XG4gICAgQ09OU1RfRVhQUihbQ09OU1RfRVhQUihuZXcgRGVmYXVsdEtleVZhbHVlRGlmZmVyRmFjdG9yeSgpKV0pO1xuXG4vKipcbiAqIFN0cnVjdHVyYWwgZGlmZmluZyBmb3IgYEl0ZXJhYmxlYCB0eXBlcyBzdWNoIGFzIGBBcnJheWBzLlxuICovXG5leHBvcnQgY29uc3QgaXRlcmFibGVEaWZmOiBJdGVyYWJsZURpZmZlckZhY3RvcnlbXSA9XG4gICAgQ09OU1RfRVhQUihbQ09OU1RfRVhQUihuZXcgRGVmYXVsdEl0ZXJhYmxlRGlmZmVyRmFjdG9yeSgpKV0pO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEl0ZXJhYmxlRGlmZmVycyA9IENPTlNUX0VYUFIobmV3IEl0ZXJhYmxlRGlmZmVycyhpdGVyYWJsZURpZmYpKTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRLZXlWYWx1ZURpZmZlcnMgPSBDT05TVF9FWFBSKG5ldyBLZXlWYWx1ZURpZmZlcnMoa2V5VmFsRGlmZikpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
