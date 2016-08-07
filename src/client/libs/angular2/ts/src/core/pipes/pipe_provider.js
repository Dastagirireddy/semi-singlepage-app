System.register(['angular2/src/core/di/provider', 'angular2/src/core/di'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var provider_1, di_1;
    var PipeProvider;
    return {
        setters:[
            function (provider_1_1) {
                provider_1 = provider_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            PipeProvider = (function (_super) {
                __extends(PipeProvider, _super);
                function PipeProvider(name, pure, key, resolvedFactories, multiBinding) {
                    _super.call(this, key, resolvedFactories, multiBinding);
                    this.name = name;
                    this.pure = pure;
                }
                PipeProvider.createFromType = function (type, metadata) {
                    var provider = new di_1.Provider(type, { useClass: type });
                    var rb = provider_1.resolveProvider(provider);
                    return new PipeProvider(metadata.name, metadata.pure, rb.key, rb.resolvedFactories, rb.multiProvider);
                };
                return PipeProvider;
            }(provider_1.ResolvedProvider_));
            exports_1("PipeProvider", PipeProvider);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvcGlwZXMvcGlwZV9wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBS0E7Z0JBQWtDLGdDQUFpQjtnQkFDakQsc0JBQW1CLElBQVksRUFBUyxJQUFhLEVBQUUsR0FBUSxFQUNuRCxpQkFBb0MsRUFBRSxZQUFxQjtvQkFDckUsa0JBQU0sR0FBRyxFQUFFLGlCQUFpQixFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUYzQixTQUFJLEdBQUosSUFBSSxDQUFRO29CQUFTLFNBQUksR0FBSixJQUFJLENBQVM7Z0JBR3JELENBQUM7Z0JBRU0sMkJBQWMsR0FBckIsVUFBc0IsSUFBVSxFQUFFLFFBQXNCO29CQUN0RCxJQUFJLFFBQVEsR0FBRyxJQUFJLGFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztvQkFDcEQsSUFBSSxFQUFFLEdBQUcsMEJBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbkMsTUFBTSxDQUFDLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsRUFDMUQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDO2dCQUNILG1CQUFDO1lBQUQsQ0FaQSxBQVlDLENBWmlDLDRCQUFpQixHQVlsRDtZQVpELHVDQVlDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9waXBlcy9waXBlX3Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtSZXNvbHZlZEZhY3RvcnksIHJlc29sdmVQcm92aWRlciwgUmVzb2x2ZWRQcm92aWRlcl99IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpL3Byb3ZpZGVyJztcbmltcG9ydCB7S2V5LCBSZXNvbHZlZFByb3ZpZGVyLCBQcm92aWRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtQaXBlTWV0YWRhdGF9IGZyb20gJy4uL21ldGFkYXRhL2RpcmVjdGl2ZXMnO1xuXG5leHBvcnQgY2xhc3MgUGlwZVByb3ZpZGVyIGV4dGVuZHMgUmVzb2x2ZWRQcm92aWRlcl8ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgcHVyZTogYm9vbGVhbiwga2V5OiBLZXksXG4gICAgICAgICAgICAgIHJlc29sdmVkRmFjdG9yaWVzOiBSZXNvbHZlZEZhY3RvcnlbXSwgbXVsdGlCaW5kaW5nOiBib29sZWFuKSB7XG4gICAgc3VwZXIoa2V5LCByZXNvbHZlZEZhY3RvcmllcywgbXVsdGlCaW5kaW5nKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVGcm9tVHlwZSh0eXBlOiBUeXBlLCBtZXRhZGF0YTogUGlwZU1ldGFkYXRhKTogUGlwZVByb3ZpZGVyIHtcbiAgICB2YXIgcHJvdmlkZXIgPSBuZXcgUHJvdmlkZXIodHlwZSwge3VzZUNsYXNzOiB0eXBlfSk7XG4gICAgdmFyIHJiID0gcmVzb2x2ZVByb3ZpZGVyKHByb3ZpZGVyKTtcbiAgICByZXR1cm4gbmV3IFBpcGVQcm92aWRlcihtZXRhZGF0YS5uYW1lLCBtZXRhZGF0YS5wdXJlLCByYi5rZXksIHJiLnJlc29sdmVkRmFjdG9yaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJiLm11bHRpUHJvdmlkZXIpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
