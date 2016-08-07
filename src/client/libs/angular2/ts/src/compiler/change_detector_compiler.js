System.register(['./source_module', 'angular2/src/core/change_detection/change_detection_jit_generator', 'angular2/src/core/change_detection/abstract_change_detector', 'angular2/src/core/change_detection/change_detection_util', 'angular2/src/core/change_detection/constants', './change_definition_factory', 'angular2/src/facade/lang', 'angular2/src/core/change_detection/change_detection', 'angular2/src/transform/template_compiler/change_detector_codegen', './util', 'angular2/src/core/di'], function(exports_1, context_1) {
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
    var source_module_1, change_detection_jit_generator_1, abstract_change_detector_1, change_detection_util_1, constants_1, change_definition_factory_1, lang_1, change_detection_1, change_detector_codegen_1, util_1, di_1;
    var ABSTRACT_CHANGE_DETECTOR, UTIL, CHANGE_DETECTOR_STATE, CHANGE_DETECTION_JIT_IMPORTS, ABSTRACT_CHANGE_DETECTOR_MODULE, UTIL_MODULE, PREGEN_PROTO_CHANGE_DETECTOR_MODULE, CONSTANTS_MODULE, ChangeDetectionCompiler;
    return {
        setters:[
            function (source_module_1_1) {
                source_module_1 = source_module_1_1;
            },
            function (change_detection_jit_generator_1_1) {
                change_detection_jit_generator_1 = change_detection_jit_generator_1_1;
            },
            function (abstract_change_detector_1_1) {
                abstract_change_detector_1 = abstract_change_detector_1_1;
            },
            function (change_detection_util_1_1) {
                change_detection_util_1 = change_detection_util_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (change_definition_factory_1_1) {
                change_definition_factory_1 = change_definition_factory_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (change_detection_1_1) {
                change_detection_1 = change_detection_1_1;
            },
            function (change_detector_codegen_1_1) {
                change_detector_codegen_1 = change_detector_codegen_1_1;
            },
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            ABSTRACT_CHANGE_DETECTOR = "AbstractChangeDetector";
            UTIL = "ChangeDetectionUtil";
            CHANGE_DETECTOR_STATE = "ChangeDetectorState";
            exports_1("CHANGE_DETECTION_JIT_IMPORTS", CHANGE_DETECTION_JIT_IMPORTS = lang_1.CONST_EXPR({
                'AbstractChangeDetector': abstract_change_detector_1.AbstractChangeDetector,
                'ChangeDetectionUtil': change_detection_util_1.ChangeDetectionUtil,
                'ChangeDetectorState': constants_1.ChangeDetectorState
            }));
            ABSTRACT_CHANGE_DETECTOR_MODULE = source_module_1.moduleRef("package:angular2/src/core/change_detection/abstract_change_detector" + util_1.MODULE_SUFFIX);
            UTIL_MODULE = source_module_1.moduleRef("package:angular2/src/core/change_detection/change_detection_util" + util_1.MODULE_SUFFIX);
            PREGEN_PROTO_CHANGE_DETECTOR_MODULE = source_module_1.moduleRef("package:angular2/src/core/change_detection/pregen_proto_change_detector" + util_1.MODULE_SUFFIX);
            CONSTANTS_MODULE = source_module_1.moduleRef("package:angular2/src/core/change_detection/constants" + util_1.MODULE_SUFFIX);
            ChangeDetectionCompiler = (function () {
                function ChangeDetectionCompiler(_genConfig) {
                    this._genConfig = _genConfig;
                }
                ChangeDetectionCompiler.prototype.compileComponentRuntime = function (componentType, strategy, parsedTemplate) {
                    var _this = this;
                    var changeDetectorDefinitions = change_definition_factory_1.createChangeDetectorDefinitions(componentType, strategy, this._genConfig, parsedTemplate);
                    return changeDetectorDefinitions.map(function (definition) {
                        return _this._createChangeDetectorFactory(definition);
                    });
                };
                ChangeDetectionCompiler.prototype._createChangeDetectorFactory = function (definition) {
                    var proto = new change_detection_1.DynamicProtoChangeDetector(definition);
                    return function () { return proto.instantiate(); };
                };
                ChangeDetectionCompiler.prototype.compileComponentCodeGen = function (componentType, strategy, parsedTemplate) {
                    var changeDetectorDefinitions = change_definition_factory_1.createChangeDetectorDefinitions(componentType, strategy, this._genConfig, parsedTemplate);
                    var factories = [];
                    var index = 0;
                    var sourceParts = changeDetectorDefinitions.map(function (definition) {
                        var codegen;
                        var sourcePart;
                        // TODO(tbosch): move the 2 code generators to the same place, one with .dart and one with .ts
                        // suffix
                        // and have the same API for calling them!
                        if (lang_1.IS_DART) {
                            codegen = new change_detector_codegen_1.Codegen(PREGEN_PROTO_CHANGE_DETECTOR_MODULE);
                            var className = "_" + definition.id;
                            var typeRef = (index === 0 && componentType.isHost) ?
                                'dynamic' :
                                "" + source_module_1.moduleRef(componentType.moduleUrl) + componentType.name;
                            codegen.generate(typeRef, className, definition);
                            factories.push(className + ".newChangeDetector");
                            sourcePart = codegen.toString();
                        }
                        else {
                            codegen = new change_detection_jit_generator_1.ChangeDetectorJITGenerator(definition, "" + UTIL_MODULE + UTIL, "" + ABSTRACT_CHANGE_DETECTOR_MODULE + ABSTRACT_CHANGE_DETECTOR, "" + CONSTANTS_MODULE + CHANGE_DETECTOR_STATE);
                            factories.push("function() { return new " + codegen.typeName + "(); }");
                            sourcePart = codegen.generateSource();
                        }
                        index++;
                        return sourcePart;
                    });
                    return new source_module_1.SourceExpressions(sourceParts, factories);
                };
                ChangeDetectionCompiler = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [change_detection_1.ChangeDetectorGenConfig])
                ], ChangeDetectionCompiler);
                return ChangeDetectionCompiler;
            }());
            exports_1("ChangeDetectionCompiler", ChangeDetectionCompiler);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2NoYW5nZV9kZXRlY3Rvcl9jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBd0JNLHdCQUF3QixFQUN4QixJQUFJLEVBQ0oscUJBQXFCLEVBRWQsNEJBQTRCLEVBTXJDLCtCQUErQixFQUUvQixXQUFXLEVBRVgsbUNBQW1DLEVBRW5DLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQWhCZCx3QkFBd0IsR0FBRyx3QkFBd0IsQ0FBQztZQUNwRCxJQUFJLEdBQUcscUJBQXFCLENBQUM7WUFDN0IscUJBQXFCLEdBQUcscUJBQXFCLENBQUM7WUFFdkMsMENBQUEsNEJBQTRCLEdBQUcsaUJBQVUsQ0FBQztnQkFDckQsd0JBQXdCLEVBQUUsaURBQXNCO2dCQUNoRCxxQkFBcUIsRUFBRSwyQ0FBbUI7Z0JBQzFDLHFCQUFxQixFQUFFLCtCQUFtQjthQUMzQyxDQUFDLENBQUEsQ0FBQztZQUVDLCtCQUErQixHQUFHLHlCQUFTLENBQzNDLHdFQUFzRSxvQkFBZSxDQUFDLENBQUM7WUFDdkYsV0FBVyxHQUNYLHlCQUFTLENBQUMscUVBQW1FLG9CQUFlLENBQUMsQ0FBQztZQUM5RixtQ0FBbUMsR0FBRyx5QkFBUyxDQUMvQyw0RUFBMEUsb0JBQWUsQ0FBQyxDQUFDO1lBQzNGLGdCQUFnQixHQUNoQix5QkFBUyxDQUFDLHlEQUF1RCxvQkFBZSxDQUFDLENBQUM7WUFHdEY7Z0JBQ0UsaUNBQW9CLFVBQW1DO29CQUFuQyxlQUFVLEdBQVYsVUFBVSxDQUF5QjtnQkFBRyxDQUFDO2dCQUUzRCx5REFBdUIsR0FBdkIsVUFBd0IsYUFBa0MsRUFBRSxRQUFpQyxFQUNyRSxjQUE2QjtvQkFEckQsaUJBTUM7b0JBSkMsSUFBSSx5QkFBeUIsR0FDekIsMkRBQStCLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUM5RixNQUFNLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLFVBQUEsVUFBVTt3QkFDTixPQUFBLEtBQUksQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUM7b0JBQTdDLENBQTZDLENBQUMsQ0FBQztnQkFDMUYsQ0FBQztnQkFFTyw4REFBNEIsR0FBcEMsVUFBcUMsVUFBb0M7b0JBQ3ZFLElBQUksS0FBSyxHQUFHLElBQUksNkNBQTBCLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3ZELE1BQU0sQ0FBQyxjQUFNLE9BQUEsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFuQixDQUFtQixDQUFDO2dCQUNuQyxDQUFDO2dCQUVELHlEQUF1QixHQUF2QixVQUF3QixhQUFrQyxFQUFFLFFBQWlDLEVBQ3JFLGNBQTZCO29CQUNuRCxJQUFJLHlCQUF5QixHQUN6QiwyREFBK0IsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7b0JBQzlGLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztvQkFDbkIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUNkLElBQUksV0FBVyxHQUFHLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxVQUFBLFVBQVU7d0JBQ3hELElBQUksT0FBWSxDQUFDO3dCQUNqQixJQUFJLFVBQWtCLENBQUM7d0JBQ3ZCLDhGQUE4Rjt3QkFDOUYsU0FBUzt3QkFDVCwwQ0FBMEM7d0JBQzFDLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxDQUFDLENBQUM7NEJBQ1osT0FBTyxHQUFHLElBQUksaUNBQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDOzRCQUMzRCxJQUFJLFNBQVMsR0FBRyxNQUFJLFVBQVUsQ0FBQyxFQUFJLENBQUM7NEJBQ3BDLElBQUksT0FBTyxHQUFHLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDO2dDQUNqQyxTQUFTO2dDQUNULEtBQUcseUJBQVMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQU0sQ0FBQzs0QkFDL0UsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDOzRCQUNqRCxTQUFTLENBQUMsSUFBSSxDQUFJLFNBQVMsdUJBQW9CLENBQUMsQ0FBQzs0QkFDakQsVUFBVSxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDbEMsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixPQUFPLEdBQUcsSUFBSSwyREFBMEIsQ0FDcEMsVUFBVSxFQUFFLEtBQUcsV0FBVyxHQUFHLElBQU0sRUFDbkMsS0FBRywrQkFBK0IsR0FBRyx3QkFBMEIsRUFDL0QsS0FBRyxnQkFBZ0IsR0FBRyxxQkFBdUIsQ0FBQyxDQUFDOzRCQUNuRCxTQUFTLENBQUMsSUFBSSxDQUFDLDZCQUEyQixPQUFPLENBQUMsUUFBUSxVQUFPLENBQUMsQ0FBQzs0QkFDbkUsVUFBVSxHQUFHLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDeEMsQ0FBQzt3QkFDRCxLQUFLLEVBQUUsQ0FBQzt3QkFDUixNQUFNLENBQUMsVUFBVSxDQUFDO29CQUNwQixDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsSUFBSSxpQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZELENBQUM7Z0JBbERIO29CQUFDLGVBQVUsRUFBRTs7MkNBQUE7Z0JBbURiLDhCQUFDO1lBQUQsQ0FsREEsQUFrREMsSUFBQTtZQWxERCw2REFrREMsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9jaGFuZ2VfZGV0ZWN0b3JfY29tcGlsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBpbGVUeXBlTWV0YWRhdGF9IGZyb20gJy4vZGlyZWN0aXZlX21ldGFkYXRhJztcbmltcG9ydCB7U291cmNlRXhwcmVzc2lvbnMsIG1vZHVsZVJlZn0gZnJvbSAnLi9zb3VyY2VfbW9kdWxlJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9ySklUR2VuZXJhdG9yXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbl9qaXRfZ2VuZXJhdG9yJztcbmltcG9ydCB7QWJzdHJhY3RDaGFuZ2VEZXRlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9hYnN0cmFjdF9jaGFuZ2VfZGV0ZWN0b3InO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25VdGlsfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb25fdXRpbCc7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yU3RhdGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY29uc3RhbnRzJztcblxuaW1wb3J0IHtjcmVhdGVDaGFuZ2VEZXRlY3RvckRlZmluaXRpb25zfSBmcm9tICcuL2NoYW5nZV9kZWZpbml0aW9uX2ZhY3RvcnknO1xuaW1wb3J0IHtJU19EQVJULCBpc0pzT2JqZWN0LCBDT05TVF9FWFBSfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZyxcbiAgQ2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9uLFxuICBEeW5hbWljUHJvdG9DaGFuZ2VEZXRlY3RvcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcblxuaW1wb3J0IHtUZW1wbGF0ZUFzdH0gZnJvbSAnLi90ZW1wbGF0ZV9hc3QnO1xuaW1wb3J0IHtDb2RlZ2VufSBmcm9tICdhbmd1bGFyMi9zcmMvdHJhbnNmb3JtL3RlbXBsYXRlX2NvbXBpbGVyL2NoYW5nZV9kZXRlY3Rvcl9jb2RlZ2VuJztcbmltcG9ydCB7TU9EVUxFX1NVRkZJWH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuXG5jb25zdCBBQlNUUkFDVF9DSEFOR0VfREVURUNUT1IgPSBcIkFic3RyYWN0Q2hhbmdlRGV0ZWN0b3JcIjtcbmNvbnN0IFVUSUwgPSBcIkNoYW5nZURldGVjdGlvblV0aWxcIjtcbmNvbnN0IENIQU5HRV9ERVRFQ1RPUl9TVEFURSA9IFwiQ2hhbmdlRGV0ZWN0b3JTdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgQ0hBTkdFX0RFVEVDVElPTl9KSVRfSU1QT1JUUyA9IENPTlNUX0VYUFIoe1xuICAnQWJzdHJhY3RDaGFuZ2VEZXRlY3Rvcic6IEFic3RyYWN0Q2hhbmdlRGV0ZWN0b3IsXG4gICdDaGFuZ2VEZXRlY3Rpb25VdGlsJzogQ2hhbmdlRGV0ZWN0aW9uVXRpbCxcbiAgJ0NoYW5nZURldGVjdG9yU3RhdGUnOiBDaGFuZ2VEZXRlY3RvclN0YXRlXG59KTtcblxudmFyIEFCU1RSQUNUX0NIQU5HRV9ERVRFQ1RPUl9NT0RVTEUgPSBtb2R1bGVSZWYoXG4gICAgYHBhY2thZ2U6YW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9hYnN0cmFjdF9jaGFuZ2VfZGV0ZWN0b3Ike01PRFVMRV9TVUZGSVh9YCk7XG52YXIgVVRJTF9NT0RVTEUgPVxuICAgIG1vZHVsZVJlZihgcGFja2FnZTphbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb25fdXRpbCR7TU9EVUxFX1NVRkZJWH1gKTtcbnZhciBQUkVHRU5fUFJPVE9fQ0hBTkdFX0RFVEVDVE9SX01PRFVMRSA9IG1vZHVsZVJlZihcbiAgICBgcGFja2FnZTphbmd1bGFyMi9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL3ByZWdlbl9wcm90b19jaGFuZ2VfZGV0ZWN0b3Ike01PRFVMRV9TVUZGSVh9YCk7XG52YXIgQ09OU1RBTlRTX01PRFVMRSA9XG4gICAgbW9kdWxlUmVmKGBwYWNrYWdlOmFuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY29uc3RhbnRzJHtNT0RVTEVfU1VGRklYfWApO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2hhbmdlRGV0ZWN0aW9uQ29tcGlsZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9nZW5Db25maWc6IENoYW5nZURldGVjdG9yR2VuQ29uZmlnKSB7fVxuXG4gIGNvbXBpbGVDb21wb25lbnRSdW50aW1lKGNvbXBvbmVudFR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGEsIHN0cmF0ZWd5OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkVGVtcGxhdGU6IFRlbXBsYXRlQXN0W10pOiBGdW5jdGlvbltdIHtcbiAgICB2YXIgY2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9ucyA9XG4gICAgICAgIGNyZWF0ZUNoYW5nZURldGVjdG9yRGVmaW5pdGlvbnMoY29tcG9uZW50VHlwZSwgc3RyYXRlZ3ksIHRoaXMuX2dlbkNvbmZpZywgcGFyc2VkVGVtcGxhdGUpO1xuICAgIHJldHVybiBjaGFuZ2VEZXRlY3RvckRlZmluaXRpb25zLm1hcChkZWZpbml0aW9uID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVDaGFuZ2VEZXRlY3RvckZhY3RvcnkoZGVmaW5pdGlvbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlQ2hhbmdlRGV0ZWN0b3JGYWN0b3J5KGRlZmluaXRpb246IENoYW5nZURldGVjdG9yRGVmaW5pdGlvbik6IEZ1bmN0aW9uIHtcbiAgICB2YXIgcHJvdG8gPSBuZXcgRHluYW1pY1Byb3RvQ2hhbmdlRGV0ZWN0b3IoZGVmaW5pdGlvbik7XG4gICAgcmV0dXJuICgpID0+IHByb3RvLmluc3RhbnRpYXRlKCk7XG4gIH1cblxuICBjb21waWxlQ29tcG9uZW50Q29kZUdlbihjb21wb25lbnRUeXBlOiBDb21waWxlVHlwZU1ldGFkYXRhLCBzdHJhdGVneTogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZFRlbXBsYXRlOiBUZW1wbGF0ZUFzdFtdKTogU291cmNlRXhwcmVzc2lvbnMge1xuICAgIHZhciBjaGFuZ2VEZXRlY3RvckRlZmluaXRpb25zID1cbiAgICAgICAgY3JlYXRlQ2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9ucyhjb21wb25lbnRUeXBlLCBzdHJhdGVneSwgdGhpcy5fZ2VuQ29uZmlnLCBwYXJzZWRUZW1wbGF0ZSk7XG4gICAgdmFyIGZhY3RvcmllcyA9IFtdO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIHNvdXJjZVBhcnRzID0gY2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9ucy5tYXAoZGVmaW5pdGlvbiA9PiB7XG4gICAgICB2YXIgY29kZWdlbjogYW55O1xuICAgICAgdmFyIHNvdXJjZVBhcnQ6IHN0cmluZztcbiAgICAgIC8vIFRPRE8odGJvc2NoKTogbW92ZSB0aGUgMiBjb2RlIGdlbmVyYXRvcnMgdG8gdGhlIHNhbWUgcGxhY2UsIG9uZSB3aXRoIC5kYXJ0IGFuZCBvbmUgd2l0aCAudHNcbiAgICAgIC8vIHN1ZmZpeFxuICAgICAgLy8gYW5kIGhhdmUgdGhlIHNhbWUgQVBJIGZvciBjYWxsaW5nIHRoZW0hXG4gICAgICBpZiAoSVNfREFSVCkge1xuICAgICAgICBjb2RlZ2VuID0gbmV3IENvZGVnZW4oUFJFR0VOX1BST1RPX0NIQU5HRV9ERVRFQ1RPUl9NT0RVTEUpO1xuICAgICAgICB2YXIgY2xhc3NOYW1lID0gYF8ke2RlZmluaXRpb24uaWR9YDtcbiAgICAgICAgdmFyIHR5cGVSZWYgPSAoaW5kZXggPT09IDAgJiYgY29tcG9uZW50VHlwZS5pc0hvc3QpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2R5bmFtaWMnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7bW9kdWxlUmVmKGNvbXBvbmVudFR5cGUubW9kdWxlVXJsKX0ke2NvbXBvbmVudFR5cGUubmFtZX1gO1xuICAgICAgICBjb2RlZ2VuLmdlbmVyYXRlKHR5cGVSZWYsIGNsYXNzTmFtZSwgZGVmaW5pdGlvbik7XG4gICAgICAgIGZhY3Rvcmllcy5wdXNoKGAke2NsYXNzTmFtZX0ubmV3Q2hhbmdlRGV0ZWN0b3JgKTtcbiAgICAgICAgc291cmNlUGFydCA9IGNvZGVnZW4udG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvZGVnZW4gPSBuZXcgQ2hhbmdlRGV0ZWN0b3JKSVRHZW5lcmF0b3IoXG4gICAgICAgICAgICBkZWZpbml0aW9uLCBgJHtVVElMX01PRFVMRX0ke1VUSUx9YCxcbiAgICAgICAgICAgIGAke0FCU1RSQUNUX0NIQU5HRV9ERVRFQ1RPUl9NT0RVTEV9JHtBQlNUUkFDVF9DSEFOR0VfREVURUNUT1J9YCxcbiAgICAgICAgICAgIGAke0NPTlNUQU5UU19NT0RVTEV9JHtDSEFOR0VfREVURUNUT1JfU1RBVEV9YCk7XG4gICAgICAgIGZhY3Rvcmllcy5wdXNoKGBmdW5jdGlvbigpIHsgcmV0dXJuIG5ldyAke2NvZGVnZW4udHlwZU5hbWV9KCk7IH1gKTtcbiAgICAgICAgc291cmNlUGFydCA9IGNvZGVnZW4uZ2VuZXJhdGVTb3VyY2UoKTtcbiAgICAgIH1cbiAgICAgIGluZGV4Kys7XG4gICAgICByZXR1cm4gc291cmNlUGFydDtcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IFNvdXJjZUV4cHJlc3Npb25zKHNvdXJjZVBhcnRzLCBmYWN0b3JpZXMpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
