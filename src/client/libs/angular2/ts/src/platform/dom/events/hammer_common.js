System.register(['./event_manager', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var event_manager_1, collection_1;
    var _eventNames, HammerGesturesPluginCommon;
    return {
        setters:[
            function (event_manager_1_1) {
                event_manager_1 = event_manager_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            _eventNames = {
                // pan
                'pan': true,
                'panstart': true,
                'panmove': true,
                'panend': true,
                'pancancel': true,
                'panleft': true,
                'panright': true,
                'panup': true,
                'pandown': true,
                // pinch
                'pinch': true,
                'pinchstart': true,
                'pinchmove': true,
                'pinchend': true,
                'pinchcancel': true,
                'pinchin': true,
                'pinchout': true,
                // press
                'press': true,
                'pressup': true,
                // rotate
                'rotate': true,
                'rotatestart': true,
                'rotatemove': true,
                'rotateend': true,
                'rotatecancel': true,
                // swipe
                'swipe': true,
                'swipeleft': true,
                'swiperight': true,
                'swipeup': true,
                'swipedown': true,
                // tap
                'tap': true,
            };
            HammerGesturesPluginCommon = (function (_super) {
                __extends(HammerGesturesPluginCommon, _super);
                function HammerGesturesPluginCommon() {
                    _super.call(this);
                }
                HammerGesturesPluginCommon.prototype.supports = function (eventName) {
                    eventName = eventName.toLowerCase();
                    return collection_1.StringMapWrapper.contains(_eventNames, eventName);
                };
                return HammerGesturesPluginCommon;
            }(event_manager_1.EventManagerPlugin));
            exports_1("HammerGesturesPluginCommon", HammerGesturesPluginCommon);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMvaGFtbWVyX2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7UUFHSSxXQUFXOzs7Ozs7Ozs7O1lBQVgsV0FBVyxHQUFHO2dCQUNoQixNQUFNO2dCQUNOLEtBQUssRUFBRSxJQUFJO2dCQUNYLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixTQUFTLEVBQUUsSUFBSTtnQkFDZixRQUFRLEVBQUUsSUFBSTtnQkFDZCxXQUFXLEVBQUUsSUFBSTtnQkFDakIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFFBQVE7Z0JBQ1IsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixRQUFRO2dCQUNSLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFNBQVM7Z0JBQ1QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLFlBQVksRUFBRSxJQUFJO2dCQUNsQixXQUFXLEVBQUUsSUFBSTtnQkFDakIsY0FBYyxFQUFFLElBQUk7Z0JBQ3BCLFFBQVE7Z0JBQ1IsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLFlBQVksRUFBRSxJQUFJO2dCQUNsQixTQUFTLEVBQUUsSUFBSTtnQkFDZixXQUFXLEVBQUUsSUFBSTtnQkFDakIsTUFBTTtnQkFDTixLQUFLLEVBQUUsSUFBSTthQUNaLENBQUM7WUFHRjtnQkFBZ0QsOENBQWtCO2dCQUNoRTtvQkFBZ0IsaUJBQU8sQ0FBQztnQkFBQyxDQUFDO2dCQUUxQiw2Q0FBUSxHQUFSLFVBQVMsU0FBaUI7b0JBQ3hCLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ3BDLE1BQU0sQ0FBQyw2QkFBZ0IsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUMzRCxDQUFDO2dCQUNILGlDQUFDO1lBQUQsQ0FQQSxBQU9DLENBUCtDLGtDQUFrQixHQU9qRTtZQVBELG1FQU9DLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9oYW1tZXJfY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vZXZlbnRfbWFuYWdlcic7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbnZhciBfZXZlbnROYW1lcyA9IHtcbiAgLy8gcGFuXG4gICdwYW4nOiB0cnVlLFxuICAncGFuc3RhcnQnOiB0cnVlLFxuICAncGFubW92ZSc6IHRydWUsXG4gICdwYW5lbmQnOiB0cnVlLFxuICAncGFuY2FuY2VsJzogdHJ1ZSxcbiAgJ3BhbmxlZnQnOiB0cnVlLFxuICAncGFucmlnaHQnOiB0cnVlLFxuICAncGFudXAnOiB0cnVlLFxuICAncGFuZG93bic6IHRydWUsXG4gIC8vIHBpbmNoXG4gICdwaW5jaCc6IHRydWUsXG4gICdwaW5jaHN0YXJ0JzogdHJ1ZSxcbiAgJ3BpbmNobW92ZSc6IHRydWUsXG4gICdwaW5jaGVuZCc6IHRydWUsXG4gICdwaW5jaGNhbmNlbCc6IHRydWUsXG4gICdwaW5jaGluJzogdHJ1ZSxcbiAgJ3BpbmNob3V0JzogdHJ1ZSxcbiAgLy8gcHJlc3NcbiAgJ3ByZXNzJzogdHJ1ZSxcbiAgJ3ByZXNzdXAnOiB0cnVlLFxuICAvLyByb3RhdGVcbiAgJ3JvdGF0ZSc6IHRydWUsXG4gICdyb3RhdGVzdGFydCc6IHRydWUsXG4gICdyb3RhdGVtb3ZlJzogdHJ1ZSxcbiAgJ3JvdGF0ZWVuZCc6IHRydWUsXG4gICdyb3RhdGVjYW5jZWwnOiB0cnVlLFxuICAvLyBzd2lwZVxuICAnc3dpcGUnOiB0cnVlLFxuICAnc3dpcGVsZWZ0JzogdHJ1ZSxcbiAgJ3N3aXBlcmlnaHQnOiB0cnVlLFxuICAnc3dpcGV1cCc6IHRydWUsXG4gICdzd2lwZWRvd24nOiB0cnVlLFxuICAvLyB0YXBcbiAgJ3RhcCc6IHRydWUsXG59O1xuXG5cbmV4cG9ydCBjbGFzcyBIYW1tZXJHZXN0dXJlc1BsdWdpbkNvbW1vbiBleHRlbmRzIEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XG5cbiAgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBldmVudE5hbWUgPSBldmVudE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyhfZXZlbnROYW1lcywgZXZlbnROYW1lKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
