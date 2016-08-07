System.register(['./differs/iterable_differs', './differs/default_iterable_differ', './differs/keyvalue_differs', './differs/default_keyvalue_differ', 'angular2/src/facade/lang', './parser/ast', './parser/lexer', './parser/parser', './parser/locals', './exceptions', './interfaces', './constants', './proto_change_detector', './jit_proto_change_detector', './binding_record', './directive_record', './dynamic_change_detector', './change_detector_ref', './change_detection_util'], function(exports_1, context_1) {
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
            function (ast_1_1) {
                exports_1({
                    "ASTWithSource": ast_1_1["ASTWithSource"],
                    "AST": ast_1_1["AST"],
                    "AstTransformer": ast_1_1["AstTransformer"],
                    "PropertyRead": ast_1_1["PropertyRead"],
                    "LiteralArray": ast_1_1["LiteralArray"],
                    "ImplicitReceiver": ast_1_1["ImplicitReceiver"]
                });
            },
            function (lexer_1_1) {
                exports_1({
                    "Lexer": lexer_1_1["Lexer"]
                });
            },
            function (parser_1_1) {
                exports_1({
                    "Parser": parser_1_1["Parser"]
                });
            },
            function (locals_1_1) {
                exports_1({
                    "Locals": locals_1_1["Locals"]
                });
            },
            function (exceptions_1_1) {
                exports_1({
                    "DehydratedException": exceptions_1_1["DehydratedException"],
                    "ExpressionChangedAfterItHasBeenCheckedException": exceptions_1_1["ExpressionChangedAfterItHasBeenCheckedException"],
                    "ChangeDetectionError": exceptions_1_1["ChangeDetectionError"]
                });
            },
            function (interfaces_1_1) {
                exports_1({
                    "ProtoChangeDetector": interfaces_1_1["ProtoChangeDetector"],
                    "ChangeDetector": interfaces_1_1["ChangeDetector"],
                    "ChangeDispatcher": interfaces_1_1["ChangeDispatcher"],
                    "ChangeDetectorDefinition": interfaces_1_1["ChangeDetectorDefinition"],
                    "DebugContext": interfaces_1_1["DebugContext"],
                    "ChangeDetectorGenConfig": interfaces_1_1["ChangeDetectorGenConfig"]
                });
            },
            function (constants_1_1) {
                exports_1({
                    "ChangeDetectionStrategy": constants_1_1["ChangeDetectionStrategy"],
                    "CHANGE_DETECTION_STRATEGY_VALUES": constants_1_1["CHANGE_DETECTION_STRATEGY_VALUES"]
                });
            },
            function (proto_change_detector_1_1) {
                exports_1({
                    "DynamicProtoChangeDetector": proto_change_detector_1_1["DynamicProtoChangeDetector"]
                });
            },
            function (jit_proto_change_detector_1_1) {
                exports_1({
                    "JitProtoChangeDetector": jit_proto_change_detector_1_1["JitProtoChangeDetector"]
                });
            },
            function (binding_record_1_1) {
                exports_1({
                    "BindingRecord": binding_record_1_1["BindingRecord"],
                    "BindingTarget": binding_record_1_1["BindingTarget"]
                });
            },
            function (directive_record_1_1) {
                exports_1({
                    "DirectiveIndex": directive_record_1_1["DirectiveIndex"],
                    "DirectiveRecord": directive_record_1_1["DirectiveRecord"]
                });
            },
            function (dynamic_change_detector_1_1) {
                exports_1({
                    "DynamicChangeDetector": dynamic_change_detector_1_1["DynamicChangeDetector"]
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
                    "SimpleChange": change_detection_util_1_1["SimpleChange"]
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUErRGEsVUFBVSxFQU1WLFlBQVksRUFHWixzQkFBc0IsRUFFdEIsc0JBQXNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBZG5DOztlQUVHO1lBQ1Usd0JBQUEsVUFBVSxHQUNuQixpQkFBVSxDQUFDLENBQUMsaUJBQVUsQ0FBQyxJQUFJLHNEQUE0QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUVqRTs7ZUFFRztZQUNVLDBCQUFBLFlBQVksR0FDckIsaUJBQVUsQ0FBQyxDQUFDLGlCQUFVLENBQUMsSUFBSSxzREFBNEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFFcEQsb0NBQUEsc0JBQXNCLEdBQUcsaUJBQVUsQ0FBQyxJQUFJLGtDQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBRXZFLG9DQUFBLHNCQUFzQixHQUFHLGlCQUFVLENBQUMsSUFBSSxrQ0FBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SXRlcmFibGVEaWZmZXJzLCBJdGVyYWJsZURpZmZlckZhY3Rvcnl9IGZyb20gJy4vZGlmZmVycy9pdGVyYWJsZV9kaWZmZXJzJztcbmltcG9ydCB7RGVmYXVsdEl0ZXJhYmxlRGlmZmVyRmFjdG9yeX0gZnJvbSAnLi9kaWZmZXJzL2RlZmF1bHRfaXRlcmFibGVfZGlmZmVyJztcbmltcG9ydCB7S2V5VmFsdWVEaWZmZXJzLCBLZXlWYWx1ZURpZmZlckZhY3Rvcnl9IGZyb20gJy4vZGlmZmVycy9rZXl2YWx1ZV9kaWZmZXJzJztcbmltcG9ydCB7XG4gIERlZmF1bHRLZXlWYWx1ZURpZmZlckZhY3RvcnksXG4gIEtleVZhbHVlQ2hhbmdlUmVjb3JkXG59IGZyb20gJy4vZGlmZmVycy9kZWZhdWx0X2tleXZhbHVlX2RpZmZlcic7XG5pbXBvcnQge0NPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmV4cG9ydCB7XG4gIERlZmF1bHRLZXlWYWx1ZURpZmZlckZhY3RvcnksXG4gIEtleVZhbHVlQ2hhbmdlUmVjb3JkXG59IGZyb20gJy4vZGlmZmVycy9kZWZhdWx0X2tleXZhbHVlX2RpZmZlcic7XG5leHBvcnQge1xuICBEZWZhdWx0SXRlcmFibGVEaWZmZXJGYWN0b3J5LFxuICBDb2xsZWN0aW9uQ2hhbmdlUmVjb3JkXG59IGZyb20gJy4vZGlmZmVycy9kZWZhdWx0X2l0ZXJhYmxlX2RpZmZlcic7XG5leHBvcnQge1xuICBBU1RXaXRoU291cmNlLFxuICBBU1QsXG4gIEFzdFRyYW5zZm9ybWVyLFxuICBQcm9wZXJ0eVJlYWQsXG4gIExpdGVyYWxBcnJheSxcbiAgSW1wbGljaXRSZWNlaXZlclxufSBmcm9tICcuL3BhcnNlci9hc3QnO1xuXG5leHBvcnQge0xleGVyfSBmcm9tICcuL3BhcnNlci9sZXhlcic7XG5leHBvcnQge1BhcnNlcn0gZnJvbSAnLi9wYXJzZXIvcGFyc2VyJztcbmV4cG9ydCB7TG9jYWxzfSBmcm9tICcuL3BhcnNlci9sb2NhbHMnO1xuXG5leHBvcnQge1xuICBEZWh5ZHJhdGVkRXhjZXB0aW9uLFxuICBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEV4Y2VwdGlvbixcbiAgQ2hhbmdlRGV0ZWN0aW9uRXJyb3Jcbn0gZnJvbSAnLi9leGNlcHRpb25zJztcbmV4cG9ydCB7XG4gIFByb3RvQ2hhbmdlRGV0ZWN0b3IsXG4gIENoYW5nZURldGVjdG9yLFxuICBDaGFuZ2VEaXNwYXRjaGVyLFxuICBDaGFuZ2VEZXRlY3RvckRlZmluaXRpb24sXG4gIERlYnVnQ29udGV4dCxcbiAgQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWdcbn0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmV4cG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENIQU5HRV9ERVRFQ1RJT05fU1RSQVRFR1lfVkFMVUVTfSBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQge0R5bmFtaWNQcm90b0NoYW5nZURldGVjdG9yfSBmcm9tICcuL3Byb3RvX2NoYW5nZV9kZXRlY3Rvcic7XG5leHBvcnQge0ppdFByb3RvQ2hhbmdlRGV0ZWN0b3J9IGZyb20gJy4vaml0X3Byb3RvX2NoYW5nZV9kZXRlY3Rvcic7XG5leHBvcnQge0JpbmRpbmdSZWNvcmQsIEJpbmRpbmdUYXJnZXR9IGZyb20gJy4vYmluZGluZ19yZWNvcmQnO1xuZXhwb3J0IHtEaXJlY3RpdmVJbmRleCwgRGlyZWN0aXZlUmVjb3JkfSBmcm9tICcuL2RpcmVjdGl2ZV9yZWNvcmQnO1xuZXhwb3J0IHtEeW5hbWljQ2hhbmdlRGV0ZWN0b3J9IGZyb20gJy4vZHluYW1pY19jaGFuZ2VfZGV0ZWN0b3InO1xuZXhwb3J0IHtDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnLi9jaGFuZ2VfZGV0ZWN0b3JfcmVmJztcbmV4cG9ydCB7XG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgSXRlcmFibGVEaWZmZXIsXG4gIEl0ZXJhYmxlRGlmZmVyRmFjdG9yeSxcbiAgVHJhY2tCeUZuXG59IGZyb20gJy4vZGlmZmVycy9pdGVyYWJsZV9kaWZmZXJzJztcbmV4cG9ydCB7S2V5VmFsdWVEaWZmZXJzLCBLZXlWYWx1ZURpZmZlciwgS2V5VmFsdWVEaWZmZXJGYWN0b3J5fSBmcm9tICcuL2RpZmZlcnMva2V5dmFsdWVfZGlmZmVycyc7XG5leHBvcnQge1BpcGVUcmFuc2Zvcm19IGZyb20gJy4vcGlwZV90cmFuc2Zvcm0nO1xuZXhwb3J0IHtXcmFwcGVkVmFsdWUsIFNpbXBsZUNoYW5nZX0gZnJvbSAnLi9jaGFuZ2VfZGV0ZWN0aW9uX3V0aWwnO1xuXG4vKipcbiAqIFN0cnVjdHVyYWwgZGlmZmluZyBmb3IgYE9iamVjdGBzIGFuZCBgTWFwYHMuXG4gKi9cbmV4cG9ydCBjb25zdCBrZXlWYWxEaWZmOiBLZXlWYWx1ZURpZmZlckZhY3RvcnlbXSA9XG4gICAgQ09OU1RfRVhQUihbQ09OU1RfRVhQUihuZXcgRGVmYXVsdEtleVZhbHVlRGlmZmVyRmFjdG9yeSgpKV0pO1xuXG4vKipcbiAqIFN0cnVjdHVyYWwgZGlmZmluZyBmb3IgYEl0ZXJhYmxlYCB0eXBlcyBzdWNoIGFzIGBBcnJheWBzLlxuICovXG5leHBvcnQgY29uc3QgaXRlcmFibGVEaWZmOiBJdGVyYWJsZURpZmZlckZhY3RvcnlbXSA9XG4gICAgQ09OU1RfRVhQUihbQ09OU1RfRVhQUihuZXcgRGVmYXVsdEl0ZXJhYmxlRGlmZmVyRmFjdG9yeSgpKV0pO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEl0ZXJhYmxlRGlmZmVycyA9IENPTlNUX0VYUFIobmV3IEl0ZXJhYmxlRGlmZmVycyhpdGVyYWJsZURpZmYpKTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRLZXlWYWx1ZURpZmZlcnMgPSBDT05TVF9FWFBSKG5ldyBLZXlWYWx1ZURpZmZlcnMoa2V5VmFsRGlmZikpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
