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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2ZhY2FkZS9icm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztRQUdJLEdBQUcsRUFHSSxRQUFRLEVBQ1IsUUFBUSxFQUNSLEVBQUUsRUFDRixXQUFXLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVixhQUFhLEVBQ2IsV0FBVyxFQUNYLE9BQU8sRUFDUCxRQUFRLEVBQ1IsYUFBYTs7OztZQWhCMUI7O2VBRUc7WUFDQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1lBRUYsd0JBQU07WUFDVixzQkFBQSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQSxDQUFDO1lBQzNCLHNCQUFBLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFBLENBQUM7WUFDM0IsZ0JBQUEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxjQUFNLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQWQsQ0FBYyxHQUFHLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFBLENBQUM7WUFDdEQseUJBQUEsV0FBVyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFBLENBQUM7WUFDakUsbUJBQUEsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDO1lBQ3hCLHdCQUFBLFVBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUEsQ0FBQztZQUNsQywyQkFBQSxhQUFhLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBLENBQUM7WUFDeEMseUJBQUEsV0FBVyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQSxDQUFDO1lBQ3BDLHFCQUFBLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQztZQUM1QixzQkFBQSxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUM7WUFDOUIsMkJBQUEsYUFBYSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2ZhY2FkZS9icm93c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBKUyB2ZXJzaW9uIG9mIGJyb3dzZXIgQVBJcy4gVGhpcyBsaWJyYXJ5IGNhbiBvbmx5IHJ1biBpbiB0aGUgYnJvd3Nlci5cbiAqL1xudmFyIHdpbiA9IHdpbmRvdztcblxuZXhwb3J0IHt3aW4gYXMgd2luZG93fTtcbmV4cG9ydCB2YXIgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XG5leHBvcnQgdmFyIGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uO1xuZXhwb3J0IHZhciBnYyA9IHdpbmRvd1snZ2MnXSA/ICgpID0+IHdpbmRvd1snZ2MnXSgpIDogKCkgPT4gbnVsbDtcbmV4cG9ydCB2YXIgcGVyZm9ybWFuY2UgPSB3aW5kb3dbJ3BlcmZvcm1hbmNlJ10gPyB3aW5kb3dbJ3BlcmZvcm1hbmNlJ10gOiBudWxsO1xuZXhwb3J0IGNvbnN0IEV2ZW50ID0gd2luZG93WydFdmVudCddO1xuZXhwb3J0IGNvbnN0IE1vdXNlRXZlbnQgPSB3aW5kb3dbJ01vdXNlRXZlbnQnXTtcbmV4cG9ydCBjb25zdCBLZXlib2FyZEV2ZW50ID0gd2luZG93WydLZXlib2FyZEV2ZW50J107XG5leHBvcnQgY29uc3QgRXZlbnRUYXJnZXQgPSB3aW5kb3dbJ0V2ZW50VGFyZ2V0J107XG5leHBvcnQgY29uc3QgSGlzdG9yeSA9IHdpbmRvd1snSGlzdG9yeSddO1xuZXhwb3J0IGNvbnN0IExvY2F0aW9uID0gd2luZG93WydMb2NhdGlvbiddO1xuZXhwb3J0IGNvbnN0IEV2ZW50TGlzdGVuZXIgPSB3aW5kb3dbJ0V2ZW50TGlzdGVuZXInXTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
