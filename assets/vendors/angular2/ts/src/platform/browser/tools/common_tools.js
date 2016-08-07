System.register(['angular2/src/core/application_ref', 'angular2/src/facade/lang', 'angular2/src/facade/browser', 'angular2/src/platform/dom/dom_adapter'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var application_ref_1, lang_1, browser_1, dom_adapter_1;
    var ChangeDetectionPerfRecord, AngularTools, AngularProfiler;
    return {
        setters:[
            function (application_ref_1_1) {
                application_ref_1 = application_ref_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            }],
        execute: function() {
            ChangeDetectionPerfRecord = (function () {
                function ChangeDetectionPerfRecord(msPerTick, numTicks) {
                    this.msPerTick = msPerTick;
                    this.numTicks = numTicks;
                }
                return ChangeDetectionPerfRecord;
            }());
            exports_1("ChangeDetectionPerfRecord", ChangeDetectionPerfRecord);
            /**
             * Entry point for all Angular debug tools. This object corresponds to the `ng`
             * global variable accessible in the dev console.
             */
            AngularTools = (function () {
                function AngularTools(ref) {
                    this.profiler = new AngularProfiler(ref);
                }
                return AngularTools;
            }());
            exports_1("AngularTools", AngularTools);
            /**
             * Entry point for all Angular profiling-related debug tools. This object
             * corresponds to the `ng.profiler` in the dev console.
             */
            AngularProfiler = (function () {
                function AngularProfiler(ref) {
                    this.appRef = ref.injector.get(application_ref_1.ApplicationRef);
                }
                /**
                 * Exercises change detection in a loop and then prints the average amount of
                 * time in milliseconds how long a single round of change detection takes for
                 * the current state of the UI. It runs a minimum of 5 rounds for a minimum
                 * of 500 milliseconds.
                 *
                 * Optionally, a user may pass a `config` parameter containing a map of
                 * options. Supported options are:
                 *
                 * `record` (boolean) - causes the profiler to record a CPU profile while
                 * it exercises the change detector. Example:
                 *
                 * ```
                 * ng.profiler.timeChangeDetection({record: true})
                 * ```
                 */
                AngularProfiler.prototype.timeChangeDetection = function (config) {
                    var record = lang_1.isPresent(config) && config['record'];
                    var profileName = 'Change Detection';
                    // Profiler is not available in Android browsers, nor in IE 9 without dev tools opened
                    var isProfilerAvailable = lang_1.isPresent(browser_1.window.console.profile);
                    if (record && isProfilerAvailable) {
                        browser_1.window.console.profile(profileName);
                    }
                    var start = dom_adapter_1.DOM.performanceNow();
                    var numTicks = 0;
                    while (numTicks < 5 || (dom_adapter_1.DOM.performanceNow() - start) < 500) {
                        this.appRef.tick();
                        numTicks++;
                    }
                    var end = dom_adapter_1.DOM.performanceNow();
                    if (record && isProfilerAvailable) {
                        // need to cast to <any> because type checker thinks there's no argument
                        // while in fact there is:
                        //
                        // https://developer.mozilla.org/en-US/docs/Web/API/Console/profileEnd
                        browser_1.window.console.profileEnd(profileName);
                    }
                    var msPerTick = (end - start) / numTicks;
                    browser_1.window.console.log("ran " + numTicks + " change detection cycles");
                    browser_1.window.console.log(lang_1.NumberWrapper.toFixed(msPerTick, 2) + " ms per check");
                    return new ChangeDetectionPerfRecord(msPerTick, numTicks);
                };
                return AngularProfiler;
            }());
            exports_1("AngularProfiler", AngularProfiler);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL3Rvb2xzL2NvbW1vbl90b29scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQU1BO2dCQUNFLG1DQUFtQixTQUFpQixFQUFTLFFBQWdCO29CQUExQyxjQUFTLEdBQVQsU0FBUyxDQUFRO29CQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7Z0JBQUcsQ0FBQztnQkFDbkUsZ0NBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELGlFQUVDLENBQUE7WUFFRDs7O2VBR0c7WUFDSDtnQkFHRSxzQkFBWSxHQUFpQjtvQkFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUM7Z0JBQzlFLG1CQUFDO1lBQUQsQ0FKQSxBQUlDLElBQUE7WUFKRCx1Q0FJQyxDQUFBO1lBRUQ7OztlQUdHO1lBQ0g7Z0JBR0UseUJBQVksR0FBaUI7b0JBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQ0FBYyxDQUFDLENBQUM7Z0JBQUMsQ0FBQztnQkFFbEY7Ozs7Ozs7Ozs7Ozs7OzttQkFlRztnQkFDSCw2Q0FBbUIsR0FBbkIsVUFBb0IsTUFBVztvQkFDN0IsSUFBSSxNQUFNLEdBQUcsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ25ELElBQUksV0FBVyxHQUFHLGtCQUFrQixDQUFDO29CQUNyQyxzRkFBc0Y7b0JBQ3RGLElBQUksbUJBQW1CLEdBQUcsZ0JBQVMsQ0FBQyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDNUQsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLG1CQUFtQixDQUFDLENBQUMsQ0FBQzt3QkFDbEMsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN0QyxDQUFDO29CQUNELElBQUksS0FBSyxHQUFHLGlCQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ2pDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztvQkFDakIsT0FBTyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQUcsQ0FBQyxjQUFjLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQzt3QkFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDbkIsUUFBUSxFQUFFLENBQUM7b0JBQ2IsQ0FBQztvQkFDRCxJQUFJLEdBQUcsR0FBRyxpQkFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUMvQixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksbUJBQW1CLENBQUMsQ0FBQyxDQUFDO3dCQUNsQyx3RUFBd0U7d0JBQ3hFLDBCQUEwQjt3QkFDMUIsRUFBRTt3QkFDRixzRUFBc0U7d0JBQ2hFLGdCQUFNLENBQUMsT0FBTyxDQUFDLFVBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDaEQsQ0FBQztvQkFDRCxJQUFJLFNBQVMsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUM7b0JBQ3pDLGdCQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFPLFFBQVEsNkJBQTBCLENBQUMsQ0FBQztvQkFDOUQsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFJLG9CQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsa0JBQWUsQ0FBQyxDQUFDO29CQUUxRSxNQUFNLENBQUMsSUFBSSx5QkFBeUIsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzVELENBQUM7Z0JBQ0gsc0JBQUM7WUFBRCxDQWpEQSxBQWlEQyxJQUFBO1lBakRELDZDQWlEQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9wbGF0Zm9ybS9icm93c2VyL3Rvb2xzL2NvbW1vbl90b29scy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXBwbGljYXRpb25SZWZ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2FwcGxpY2F0aW9uX3JlZic7XG5pbXBvcnQge0NvbXBvbmVudFJlZn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5JztcbmltcG9ydCB7aXNQcmVzZW50LCBOdW1iZXJXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHt3aW5kb3d9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYnJvd3Nlcic7XG5pbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5cbmV4cG9ydCBjbGFzcyBDaGFuZ2VEZXRlY3Rpb25QZXJmUmVjb3JkIHtcbiAgY29uc3RydWN0b3IocHVibGljIG1zUGVyVGljazogbnVtYmVyLCBwdWJsaWMgbnVtVGlja3M6IG51bWJlcikge31cbn1cblxuLyoqXG4gKiBFbnRyeSBwb2ludCBmb3IgYWxsIEFuZ3VsYXIgZGVidWcgdG9vbHMuIFRoaXMgb2JqZWN0IGNvcnJlc3BvbmRzIHRvIHRoZSBgbmdgXG4gKiBnbG9iYWwgdmFyaWFibGUgYWNjZXNzaWJsZSBpbiB0aGUgZGV2IGNvbnNvbGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBBbmd1bGFyVG9vbHMge1xuICBwcm9maWxlcjogQW5ndWxhclByb2ZpbGVyO1xuXG4gIGNvbnN0cnVjdG9yKHJlZjogQ29tcG9uZW50UmVmKSB7IHRoaXMucHJvZmlsZXIgPSBuZXcgQW5ndWxhclByb2ZpbGVyKHJlZik7IH1cbn1cblxuLyoqXG4gKiBFbnRyeSBwb2ludCBmb3IgYWxsIEFuZ3VsYXIgcHJvZmlsaW5nLXJlbGF0ZWQgZGVidWcgdG9vbHMuIFRoaXMgb2JqZWN0XG4gKiBjb3JyZXNwb25kcyB0byB0aGUgYG5nLnByb2ZpbGVyYCBpbiB0aGUgZGV2IGNvbnNvbGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBBbmd1bGFyUHJvZmlsZXIge1xuICBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmO1xuXG4gIGNvbnN0cnVjdG9yKHJlZjogQ29tcG9uZW50UmVmKSB7IHRoaXMuYXBwUmVmID0gcmVmLmluamVjdG9yLmdldChBcHBsaWNhdGlvblJlZik7IH1cblxuICAvKipcbiAgICogRXhlcmNpc2VzIGNoYW5nZSBkZXRlY3Rpb24gaW4gYSBsb29wIGFuZCB0aGVuIHByaW50cyB0aGUgYXZlcmFnZSBhbW91bnQgb2ZcbiAgICogdGltZSBpbiBtaWxsaXNlY29uZHMgaG93IGxvbmcgYSBzaW5nbGUgcm91bmQgb2YgY2hhbmdlIGRldGVjdGlvbiB0YWtlcyBmb3JcbiAgICogdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIFVJLiBJdCBydW5zIGEgbWluaW11bSBvZiA1IHJvdW5kcyBmb3IgYSBtaW5pbXVtXG4gICAqIG9mIDUwMCBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIE9wdGlvbmFsbHksIGEgdXNlciBtYXkgcGFzcyBhIGBjb25maWdgIHBhcmFtZXRlciBjb250YWluaW5nIGEgbWFwIG9mXG4gICAqIG9wdGlvbnMuIFN1cHBvcnRlZCBvcHRpb25zIGFyZTpcbiAgICpcbiAgICogYHJlY29yZGAgKGJvb2xlYW4pIC0gY2F1c2VzIHRoZSBwcm9maWxlciB0byByZWNvcmQgYSBDUFUgcHJvZmlsZSB3aGlsZVxuICAgKiBpdCBleGVyY2lzZXMgdGhlIGNoYW5nZSBkZXRlY3Rvci4gRXhhbXBsZTpcbiAgICpcbiAgICogYGBgXG4gICAqIG5nLnByb2ZpbGVyLnRpbWVDaGFuZ2VEZXRlY3Rpb24oe3JlY29yZDogdHJ1ZX0pXG4gICAqIGBgYFxuICAgKi9cbiAgdGltZUNoYW5nZURldGVjdGlvbihjb25maWc6IGFueSk6IENoYW5nZURldGVjdGlvblBlcmZSZWNvcmQge1xuICAgIHZhciByZWNvcmQgPSBpc1ByZXNlbnQoY29uZmlnKSAmJiBjb25maWdbJ3JlY29yZCddO1xuICAgIHZhciBwcm9maWxlTmFtZSA9ICdDaGFuZ2UgRGV0ZWN0aW9uJztcbiAgICAvLyBQcm9maWxlciBpcyBub3QgYXZhaWxhYmxlIGluIEFuZHJvaWQgYnJvd3NlcnMsIG5vciBpbiBJRSA5IHdpdGhvdXQgZGV2IHRvb2xzIG9wZW5lZFxuICAgIHZhciBpc1Byb2ZpbGVyQXZhaWxhYmxlID0gaXNQcmVzZW50KHdpbmRvdy5jb25zb2xlLnByb2ZpbGUpO1xuICAgIGlmIChyZWNvcmQgJiYgaXNQcm9maWxlckF2YWlsYWJsZSkge1xuICAgICAgd2luZG93LmNvbnNvbGUucHJvZmlsZShwcm9maWxlTmFtZSk7XG4gICAgfVxuICAgIHZhciBzdGFydCA9IERPTS5wZXJmb3JtYW5jZU5vdygpO1xuICAgIHZhciBudW1UaWNrcyA9IDA7XG4gICAgd2hpbGUgKG51bVRpY2tzIDwgNSB8fCAoRE9NLnBlcmZvcm1hbmNlTm93KCkgLSBzdGFydCkgPCA1MDApIHtcbiAgICAgIHRoaXMuYXBwUmVmLnRpY2soKTtcbiAgICAgIG51bVRpY2tzKys7XG4gICAgfVxuICAgIHZhciBlbmQgPSBET00ucGVyZm9ybWFuY2VOb3coKTtcbiAgICBpZiAocmVjb3JkICYmIGlzUHJvZmlsZXJBdmFpbGFibGUpIHtcbiAgICAgIC8vIG5lZWQgdG8gY2FzdCB0byA8YW55PiBiZWNhdXNlIHR5cGUgY2hlY2tlciB0aGlua3MgdGhlcmUncyBubyBhcmd1bWVudFxuICAgICAgLy8gd2hpbGUgaW4gZmFjdCB0aGVyZSBpczpcbiAgICAgIC8vXG4gICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ29uc29sZS9wcm9maWxlRW5kXG4gICAgICAoPGFueT53aW5kb3cuY29uc29sZS5wcm9maWxlRW5kKShwcm9maWxlTmFtZSk7XG4gICAgfVxuICAgIHZhciBtc1BlclRpY2sgPSAoZW5kIC0gc3RhcnQpIC8gbnVtVGlja3M7XG4gICAgd2luZG93LmNvbnNvbGUubG9nKGByYW4gJHtudW1UaWNrc30gY2hhbmdlIGRldGVjdGlvbiBjeWNsZXNgKTtcbiAgICB3aW5kb3cuY29uc29sZS5sb2coYCR7TnVtYmVyV3JhcHBlci50b0ZpeGVkKG1zUGVyVGljaywgMil9IG1zIHBlciBjaGVja2ApO1xuXG4gICAgcmV0dXJuIG5ldyBDaGFuZ2VEZXRlY3Rpb25QZXJmUmVjb3JkKG1zUGVyVGljaywgbnVtVGlja3MpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
