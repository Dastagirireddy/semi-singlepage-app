System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var win, document, location, gc, performance, Event, MouseEvent, KeyboardEvent, EventTarget, History, Location, EventListener;
    return {
        setters:[],
        execute: function() {
            /**
             * JS version of browser APIs. This library can only run in the browser.
             */
            win = window;
            exports_1("window", win);
            exports_1("document", document = window.document);
            exports_1("location", location = window.location);
            exports_1("gc", gc = window['gc'] ? function () { return window['gc'](); } : function () { return null; });
            exports_1("performance", performance = window['performance'] ? window['performance'] : null);
            exports_1("Event", Event = window['Event']);
            exports_1("MouseEvent", MouseEvent = window['MouseEvent']);
            exports_1("KeyboardEvent", KeyboardEvent = window['KeyboardEvent']);
            exports_1("EventTarget", EventTarget = window['EventTarget']);
            exports_1("History", History = window['History']);
            exports_1("Location", Location = window['Location']);
            exports_1("EventListener", EventListener = window['EventListener']);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9mYWNhZGUvYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFHSSxHQUFHLEVBR0ksUUFBUSxFQUNSLFFBQVEsRUFDUixFQUFFLEVBQ0YsV0FBVyxFQUNULEtBQUssRUFDTCxVQUFVLEVBQ1YsYUFBYSxFQUNiLFdBQVcsRUFDWCxPQUFPLEVBQ1AsUUFBUSxFQUNSLGFBQWE7Ozs7WUFoQjFCOztlQUVHO1lBQ0MsR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUVGLHdCQUFNO1lBQ1Ysc0JBQUEsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUEsQ0FBQztZQUMzQixzQkFBQSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQSxDQUFDO1lBQzNCLGdCQUFBLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBTSxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFkLENBQWMsR0FBRyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQSxDQUFDO1lBQ3RELHlCQUFBLFdBQVcsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQSxDQUFDO1lBQ2pFLG1CQUFBLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQztZQUN4Qix3QkFBQSxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUM7WUFDbEMsMkJBQUEsYUFBYSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQSxDQUFDO1lBQ3hDLHlCQUFBLFdBQVcsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUEsQ0FBQztZQUNwQyxxQkFBQSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUM7WUFDNUIsc0JBQUEsUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDO1lBQzlCLDJCQUFBLGFBQWEsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUEsQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvZmFjYWRlL2Jyb3dzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEpTIHZlcnNpb24gb2YgYnJvd3NlciBBUElzLiBUaGlzIGxpYnJhcnkgY2FuIG9ubHkgcnVuIGluIHRoZSBicm93c2VyLlxuICovXG52YXIgd2luID0gd2luZG93O1xuXG5leHBvcnQge3dpbiBhcyB3aW5kb3d9O1xuZXhwb3J0IHZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcbmV4cG9ydCB2YXIgbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XG5leHBvcnQgdmFyIGdjID0gd2luZG93WydnYyddID8gKCkgPT4gd2luZG93WydnYyddKCkgOiAoKSA9PiBudWxsO1xuZXhwb3J0IHZhciBwZXJmb3JtYW5jZSA9IHdpbmRvd1sncGVyZm9ybWFuY2UnXSA/IHdpbmRvd1sncGVyZm9ybWFuY2UnXSA6IG51bGw7XG5leHBvcnQgY29uc3QgRXZlbnQgPSB3aW5kb3dbJ0V2ZW50J107XG5leHBvcnQgY29uc3QgTW91c2VFdmVudCA9IHdpbmRvd1snTW91c2VFdmVudCddO1xuZXhwb3J0IGNvbnN0IEtleWJvYXJkRXZlbnQgPSB3aW5kb3dbJ0tleWJvYXJkRXZlbnQnXTtcbmV4cG9ydCBjb25zdCBFdmVudFRhcmdldCA9IHdpbmRvd1snRXZlbnRUYXJnZXQnXTtcbmV4cG9ydCBjb25zdCBIaXN0b3J5ID0gd2luZG93WydIaXN0b3J5J107XG5leHBvcnQgY29uc3QgTG9jYXRpb24gPSB3aW5kb3dbJ0xvY2F0aW9uJ107XG5leHBvcnQgY29uc3QgRXZlbnRMaXN0ZW5lciA9IHdpbmRvd1snRXZlbnRMaXN0ZW5lciddO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
