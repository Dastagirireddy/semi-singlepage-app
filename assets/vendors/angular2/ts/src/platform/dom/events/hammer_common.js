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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2hhbW1lcl9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1FBR0ksV0FBVzs7Ozs7Ozs7OztZQUFYLFdBQVcsR0FBRztnQkFDaEIsTUFBTTtnQkFDTixLQUFLLEVBQUUsSUFBSTtnQkFDWCxVQUFVLEVBQUUsSUFBSTtnQkFDaEIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixPQUFPLEVBQUUsSUFBSTtnQkFDYixTQUFTLEVBQUUsSUFBSTtnQkFDZixRQUFRO2dCQUNSLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFlBQVksRUFBRSxJQUFJO2dCQUNsQixXQUFXLEVBQUUsSUFBSTtnQkFDakIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixTQUFTLEVBQUUsSUFBSTtnQkFDZixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsUUFBUTtnQkFDUixPQUFPLEVBQUUsSUFBSTtnQkFDYixTQUFTLEVBQUUsSUFBSTtnQkFDZixTQUFTO2dCQUNULFFBQVEsRUFBRSxJQUFJO2dCQUNkLGFBQWEsRUFBRSxJQUFJO2dCQUNuQixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLGNBQWMsRUFBRSxJQUFJO2dCQUNwQixRQUFRO2dCQUNSLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLE1BQU07Z0JBQ04sS0FBSyxFQUFFLElBQUk7YUFDWixDQUFDO1lBR0Y7Z0JBQWdELDhDQUFrQjtnQkFDaEU7b0JBQWdCLGlCQUFPLENBQUM7Z0JBQUMsQ0FBQztnQkFFMUIsNkNBQVEsR0FBUixVQUFTLFNBQWlCO29CQUN4QixTQUFTLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNwQyxNQUFNLENBQUMsNkJBQWdCLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDM0QsQ0FBQztnQkFDSCxpQ0FBQztZQUFELENBUEEsQUFPQyxDQVArQyxrQ0FBa0IsR0FPakU7WUFQRCxtRUFPQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2hhbW1lcl9jb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50TWFuYWdlclBsdWdpbn0gZnJvbSAnLi9ldmVudF9tYW5hZ2VyJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxudmFyIF9ldmVudE5hbWVzID0ge1xuICAvLyBwYW5cbiAgJ3Bhbic6IHRydWUsXG4gICdwYW5zdGFydCc6IHRydWUsXG4gICdwYW5tb3ZlJzogdHJ1ZSxcbiAgJ3BhbmVuZCc6IHRydWUsXG4gICdwYW5jYW5jZWwnOiB0cnVlLFxuICAncGFubGVmdCc6IHRydWUsXG4gICdwYW5yaWdodCc6IHRydWUsXG4gICdwYW51cCc6IHRydWUsXG4gICdwYW5kb3duJzogdHJ1ZSxcbiAgLy8gcGluY2hcbiAgJ3BpbmNoJzogdHJ1ZSxcbiAgJ3BpbmNoc3RhcnQnOiB0cnVlLFxuICAncGluY2htb3ZlJzogdHJ1ZSxcbiAgJ3BpbmNoZW5kJzogdHJ1ZSxcbiAgJ3BpbmNoY2FuY2VsJzogdHJ1ZSxcbiAgJ3BpbmNoaW4nOiB0cnVlLFxuICAncGluY2hvdXQnOiB0cnVlLFxuICAvLyBwcmVzc1xuICAncHJlc3MnOiB0cnVlLFxuICAncHJlc3N1cCc6IHRydWUsXG4gIC8vIHJvdGF0ZVxuICAncm90YXRlJzogdHJ1ZSxcbiAgJ3JvdGF0ZXN0YXJ0JzogdHJ1ZSxcbiAgJ3JvdGF0ZW1vdmUnOiB0cnVlLFxuICAncm90YXRlZW5kJzogdHJ1ZSxcbiAgJ3JvdGF0ZWNhbmNlbCc6IHRydWUsXG4gIC8vIHN3aXBlXG4gICdzd2lwZSc6IHRydWUsXG4gICdzd2lwZWxlZnQnOiB0cnVlLFxuICAnc3dpcGVyaWdodCc6IHRydWUsXG4gICdzd2lwZXVwJzogdHJ1ZSxcbiAgJ3N3aXBlZG93bic6IHRydWUsXG4gIC8vIHRhcFxuICAndGFwJzogdHJ1ZSxcbn07XG5cblxuZXhwb3J0IGNsYXNzIEhhbW1lckdlc3R1cmVzUGx1Z2luQ29tbW9uIGV4dGVuZHMgRXZlbnRNYW5hZ2VyUGx1Z2luIHtcbiAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCk7IH1cblxuICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGV2ZW50TmFtZSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBTdHJpbmdNYXBXcmFwcGVyLmNvbnRhaW5zKF9ldmVudE5hbWVzLCBldmVudE5hbWUpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
