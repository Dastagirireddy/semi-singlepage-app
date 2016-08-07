System.register(['angular2/src/facade/lang', 'angular2/src/facade/intl', 'angular2/core', 'angular2/src/facade/collection', './invalid_pipe_argument_exception'], function(exports_1, context_1) {
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
    var lang_1, intl_1, core_1, collection_1, invalid_pipe_argument_exception_1;
    var defaultLocale, DatePipe;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (intl_1_1) {
                intl_1 = intl_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (invalid_pipe_argument_exception_1_1) {
                invalid_pipe_argument_exception_1 = invalid_pipe_argument_exception_1_1;
            }],
        execute: function() {
            // TODO: move to a global configurable location along with other i18n components.
            defaultLocale = 'en-US';
            /**
             * Formats a date value to a string based on the requested format.
             *
             * WARNINGS:
             * - this pipe is marked as pure hence it will not be re-evaluated when the input is mutated.
             *   Instead users should treat the date as an immutable object and change the reference when the
             *   pipe needs to re-run (this is to avoid reformatting the date on every change detection run
             *   which would be an expensive operation).
             * - this pipe uses the Internationalization API. Therefore it is only reliable in Chrome and Opera
             *   browsers.
             *
             * ## Usage
             *
             *     expression | date[:format]
             *
             * where `expression` is a date object or a number (milliseconds since UTC epoch) and
             * `format` indicates which date/time components to include:
             *
             *  | Component | Symbol | Short Form   | Long Form         | Numeric   | 2-digit   |
             *  |-----------|:------:|--------------|-------------------|-----------|-----------|
             *  | era       |   G    | G (AD)       | GGGG (Anno Domini)| -         | -         |
             *  | year      |   y    | -            | -                 | y (2015)  | yy (15)   |
             *  | month     |   M    | MMM (Sep)    | MMMM (September)  | M (9)     | MM (09)   |
             *  | day       |   d    | -            | -                 | d (3)     | dd (03)   |
             *  | weekday   |   E    | EEE (Sun)    | EEEE (Sunday)     | -         | -         |
             *  | hour      |   j    | -            | -                 | j (13)    | jj (13)   |
             *  | hour12    |   h    | -            | -                 | h (1 PM)  | hh (01 PM)|
             *  | hour24    |   H    | -            | -                 | H (13)    | HH (13)   |
             *  | minute    |   m    | -            | -                 | m (5)     | mm (05)   |
             *  | second    |   s    | -            | -                 | s (9)     | ss (09)   |
             *  | timezone  |   z    | -            | z (Pacific Standard Time)| -  | -         |
             *  | timezone  |   Z    | Z (GMT-8:00) | -                 | -         | -         |
             *
             * In javascript, only the components specified will be respected (not the ordering,
             * punctuations, ...) and details of the formatting will be dependent on the locale.
             * On the other hand in Dart version, you can also include quoted text as well as some extra
             * date/time components such as quarter. For more information see:
             * https://api.dartlang.org/apidocs/channels/stable/dartdoc-viewer/intl/intl.DateFormat.
             *
             * `format` can also be one of the following predefined formats:
             *
             *  - `'medium'`: equivalent to `'yMMMdjms'` (e.g. Sep 3, 2010, 12:05:08 PM for en-US)
             *  - `'short'`: equivalent to `'yMdjm'` (e.g. 9/3/2010, 12:05 PM for en-US)
             *  - `'fullDate'`: equivalent to `'yMMMMEEEEd'` (e.g. Friday, September 3, 2010 for en-US)
             *  - `'longDate'`: equivalent to `'yMMMMd'` (e.g. September 3, 2010)
             *  - `'mediumDate'`: equivalent to `'yMMMd'` (e.g. Sep 3, 2010 for en-US)
             *  - `'shortDate'`: equivalent to `'yMd'` (e.g. 9/3/2010 for en-US)
             *  - `'mediumTime'`: equivalent to `'jms'` (e.g. 12:05:08 PM for en-US)
             *  - `'shortTime'`: equivalent to `'jm'` (e.g. 12:05 PM for en-US)
             *
             * Timezone of the formatted text will be the local system timezone of the end-users machine.
             *
             * ### Examples
             *
             * Assuming `dateObj` is (year: 2015, month: 6, day: 15, hour: 21, minute: 43, second: 11)
             * in the _local_ time and locale is 'en-US':
             *
             * ```
             *     {{ dateObj | date }}               // output is 'Jun 15, 2015'
             *     {{ dateObj | date:'medium' }}      // output is 'Jun 15, 2015, 9:43:11 PM'
             *     {{ dateObj | date:'shortTime' }}   // output is '9:43 PM'
             *     {{ dateObj | date:'mmss' }}        // output is '43:11'
             * ```
             *
             * {@example core/pipes/ts/date_pipe/date_pipe_example.ts region='DatePipe'}
             */
            DatePipe = (function () {
                function DatePipe() {
                }
                DatePipe.prototype.transform = function (value, args) {
                    if (lang_1.isBlank(value))
                        return null;
                    if (!this.supports(value)) {
                        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(DatePipe, value);
                    }
                    var pattern = lang_1.isPresent(args) && args.length > 0 ? args[0] : 'mediumDate';
                    if (lang_1.isNumber(value)) {
                        value = lang_1.DateWrapper.fromMillis(value);
                    }
                    if (collection_1.StringMapWrapper.contains(DatePipe._ALIASES, pattern)) {
                        pattern = collection_1.StringMapWrapper.get(DatePipe._ALIASES, pattern);
                    }
                    return intl_1.DateFormatter.format(value, defaultLocale, pattern);
                };
                DatePipe.prototype.supports = function (obj) { return lang_1.isDate(obj) || lang_1.isNumber(obj); };
                /** @internal */
                DatePipe._ALIASES = {
                    'medium': 'yMMMdjms',
                    'short': 'yMdjm',
                    'fullDate': 'yMMMMEEEEd',
                    'longDate': 'yMMMMd',
                    'mediumDate': 'yMMMd',
                    'shortDate': 'yMd',
                    'mediumTime': 'jms',
                    'shortTime': 'jm'
                };
                DatePipe = __decorate([
                    lang_1.CONST(),
                    core_1.Pipe({ name: 'date', pure: true }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DatePipe);
                return DatePipe;
            }());
            exports_1("DatePipe", DatePipe);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbW1vbi9waXBlcy9kYXRlX3BpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQWtCSSxhQUFhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRGpCLGlGQUFpRjtZQUM3RSxhQUFhLEdBQVcsT0FBTyxDQUFDO1lBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQWlFRztZQUlIO2dCQUFBO2dCQWdDQSxDQUFDO2dCQWxCQyw0QkFBUyxHQUFULFVBQVUsS0FBVSxFQUFFLElBQVc7b0JBQy9CLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUVoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixNQUFNLElBQUksOERBQTRCLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUMxRCxDQUFDO29CQUVELElBQUksT0FBTyxHQUFXLGdCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQztvQkFDbEYsRUFBRSxDQUFDLENBQUMsZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsS0FBSyxHQUFHLGtCQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN4QyxDQUFDO29CQUNELEVBQUUsQ0FBQyxDQUFDLDZCQUFnQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDMUQsT0FBTyxHQUFXLDZCQUFnQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNyRSxDQUFDO29CQUNELE1BQU0sQ0FBQyxvQkFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM3RCxDQUFDO2dCQUVELDJCQUFRLEdBQVIsVUFBUyxHQUFRLElBQWEsTUFBTSxDQUFDLGFBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxlQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQTlCcEUsZ0JBQWdCO2dCQUNULGlCQUFRLEdBQTRCO29CQUN6QyxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLFVBQVUsRUFBRSxZQUFZO29CQUN4QixVQUFVLEVBQUUsUUFBUTtvQkFDcEIsWUFBWSxFQUFFLE9BQU87b0JBQ3JCLFdBQVcsRUFBRSxLQUFLO29CQUNsQixZQUFZLEVBQUUsS0FBSztvQkFDbkIsV0FBVyxFQUFFLElBQUk7aUJBQ2xCLENBQUM7Z0JBZEo7b0JBQUMsWUFBSyxFQUFFO29CQUNQLFdBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO29CQUNoQyxpQkFBVSxFQUFFOzs0QkFBQTtnQkFpQ2IsZUFBQztZQUFELENBaENBLEFBZ0NDLElBQUE7WUFoQ0QsK0JBZ0NDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tbW9uL3BpcGVzL2RhdGVfcGlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGlzRGF0ZSxcbiAgaXNOdW1iZXIsXG4gIGlzUHJlc2VudCxcbiAgRGF0ZSxcbiAgRGF0ZVdyYXBwZXIsXG4gIENPTlNULFxuICBpc0JsYW5rLFxuICBGdW5jdGlvbldyYXBwZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7RGF0ZUZvcm1hdHRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9pbnRsJztcbmltcG9ydCB7UGlwZVRyYW5zZm9ybSwgV3JhcHBlZFZhbHVlLCBQaXBlLCBJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlciwgTGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmltcG9ydCB7SW52YWxpZFBpcGVBcmd1bWVudEV4Y2VwdGlvbn0gZnJvbSAnLi9pbnZhbGlkX3BpcGVfYXJndW1lbnRfZXhjZXB0aW9uJztcblxuXG4vLyBUT0RPOiBtb3ZlIHRvIGEgZ2xvYmFsIGNvbmZpZ3VyYWJsZSBsb2NhdGlvbiBhbG9uZyB3aXRoIG90aGVyIGkxOG4gY29tcG9uZW50cy5cbnZhciBkZWZhdWx0TG9jYWxlOiBzdHJpbmcgPSAnZW4tVVMnO1xuXG4vKipcbiAqIEZvcm1hdHMgYSBkYXRlIHZhbHVlIHRvIGEgc3RyaW5nIGJhc2VkIG9uIHRoZSByZXF1ZXN0ZWQgZm9ybWF0LlxuICpcbiAqIFdBUk5JTkdTOlxuICogLSB0aGlzIHBpcGUgaXMgbWFya2VkIGFzIHB1cmUgaGVuY2UgaXQgd2lsbCBub3QgYmUgcmUtZXZhbHVhdGVkIHdoZW4gdGhlIGlucHV0IGlzIG11dGF0ZWQuXG4gKiAgIEluc3RlYWQgdXNlcnMgc2hvdWxkIHRyZWF0IHRoZSBkYXRlIGFzIGFuIGltbXV0YWJsZSBvYmplY3QgYW5kIGNoYW5nZSB0aGUgcmVmZXJlbmNlIHdoZW4gdGhlXG4gKiAgIHBpcGUgbmVlZHMgdG8gcmUtcnVuICh0aGlzIGlzIHRvIGF2b2lkIHJlZm9ybWF0dGluZyB0aGUgZGF0ZSBvbiBldmVyeSBjaGFuZ2UgZGV0ZWN0aW9uIHJ1blxuICogICB3aGljaCB3b3VsZCBiZSBhbiBleHBlbnNpdmUgb3BlcmF0aW9uKS5cbiAqIC0gdGhpcyBwaXBlIHVzZXMgdGhlIEludGVybmF0aW9uYWxpemF0aW9uIEFQSS4gVGhlcmVmb3JlIGl0IGlzIG9ubHkgcmVsaWFibGUgaW4gQ2hyb21lIGFuZCBPcGVyYVxuICogICBicm93c2Vycy5cbiAqXG4gKiAjIyBVc2FnZVxuICpcbiAqICAgICBleHByZXNzaW9uIHwgZGF0ZVs6Zm9ybWF0XVxuICpcbiAqIHdoZXJlIGBleHByZXNzaW9uYCBpcyBhIGRhdGUgb2JqZWN0IG9yIGEgbnVtYmVyIChtaWxsaXNlY29uZHMgc2luY2UgVVRDIGVwb2NoKSBhbmRcbiAqIGBmb3JtYXRgIGluZGljYXRlcyB3aGljaCBkYXRlL3RpbWUgY29tcG9uZW50cyB0byBpbmNsdWRlOlxuICpcbiAqICB8IENvbXBvbmVudCB8IFN5bWJvbCB8IFNob3J0IEZvcm0gICB8IExvbmcgRm9ybSAgICAgICAgIHwgTnVtZXJpYyAgIHwgMi1kaWdpdCAgIHxcbiAqICB8LS0tLS0tLS0tLS18Oi0tLS0tLTp8LS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLXwtLS0tLS0tLS0tLXxcbiAqICB8IGVyYSAgICAgICB8ICAgRyAgICB8IEcgKEFEKSAgICAgICB8IEdHR0cgKEFubm8gRG9taW5pKXwgLSAgICAgICAgIHwgLSAgICAgICAgIHxcbiAqICB8IHllYXIgICAgICB8ICAgeSAgICB8IC0gICAgICAgICAgICB8IC0gICAgICAgICAgICAgICAgIHwgeSAoMjAxNSkgIHwgeXkgKDE1KSAgIHxcbiAqICB8IG1vbnRoICAgICB8ICAgTSAgICB8IE1NTSAoU2VwKSAgICB8IE1NTU0gKFNlcHRlbWJlcikgIHwgTSAoOSkgICAgIHwgTU0gKDA5KSAgIHxcbiAqICB8IGRheSAgICAgICB8ICAgZCAgICB8IC0gICAgICAgICAgICB8IC0gICAgICAgICAgICAgICAgIHwgZCAoMykgICAgIHwgZGQgKDAzKSAgIHxcbiAqICB8IHdlZWtkYXkgICB8ICAgRSAgICB8IEVFRSAoU3VuKSAgICB8IEVFRUUgKFN1bmRheSkgICAgIHwgLSAgICAgICAgIHwgLSAgICAgICAgIHxcbiAqICB8IGhvdXIgICAgICB8ICAgaiAgICB8IC0gICAgICAgICAgICB8IC0gICAgICAgICAgICAgICAgIHwgaiAoMTMpICAgIHwgamogKDEzKSAgIHxcbiAqICB8IGhvdXIxMiAgICB8ICAgaCAgICB8IC0gICAgICAgICAgICB8IC0gICAgICAgICAgICAgICAgIHwgaCAoMSBQTSkgIHwgaGggKDAxIFBNKXxcbiAqICB8IGhvdXIyNCAgICB8ICAgSCAgICB8IC0gICAgICAgICAgICB8IC0gICAgICAgICAgICAgICAgIHwgSCAoMTMpICAgIHwgSEggKDEzKSAgIHxcbiAqICB8IG1pbnV0ZSAgICB8ICAgbSAgICB8IC0gICAgICAgICAgICB8IC0gICAgICAgICAgICAgICAgIHwgbSAoNSkgICAgIHwgbW0gKDA1KSAgIHxcbiAqICB8IHNlY29uZCAgICB8ICAgcyAgICB8IC0gICAgICAgICAgICB8IC0gICAgICAgICAgICAgICAgIHwgcyAoOSkgICAgIHwgc3MgKDA5KSAgIHxcbiAqICB8IHRpbWV6b25lICB8ICAgeiAgICB8IC0gICAgICAgICAgICB8IHogKFBhY2lmaWMgU3RhbmRhcmQgVGltZSl8IC0gIHwgLSAgICAgICAgIHxcbiAqICB8IHRpbWV6b25lICB8ICAgWiAgICB8IFogKEdNVC04OjAwKSB8IC0gICAgICAgICAgICAgICAgIHwgLSAgICAgICAgIHwgLSAgICAgICAgIHxcbiAqXG4gKiBJbiBqYXZhc2NyaXB0LCBvbmx5IHRoZSBjb21wb25lbnRzIHNwZWNpZmllZCB3aWxsIGJlIHJlc3BlY3RlZCAobm90IHRoZSBvcmRlcmluZyxcbiAqIHB1bmN0dWF0aW9ucywgLi4uKSBhbmQgZGV0YWlscyBvZiB0aGUgZm9ybWF0dGluZyB3aWxsIGJlIGRlcGVuZGVudCBvbiB0aGUgbG9jYWxlLlxuICogT24gdGhlIG90aGVyIGhhbmQgaW4gRGFydCB2ZXJzaW9uLCB5b3UgY2FuIGFsc28gaW5jbHVkZSBxdW90ZWQgdGV4dCBhcyB3ZWxsIGFzIHNvbWUgZXh0cmFcbiAqIGRhdGUvdGltZSBjb21wb25lbnRzIHN1Y2ggYXMgcXVhcnRlci4gRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlOlxuICogaHR0cHM6Ly9hcGkuZGFydGxhbmcub3JnL2FwaWRvY3MvY2hhbm5lbHMvc3RhYmxlL2RhcnRkb2Mtdmlld2VyL2ludGwvaW50bC5EYXRlRm9ybWF0LlxuICpcbiAqIGBmb3JtYXRgIGNhbiBhbHNvIGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nIHByZWRlZmluZWQgZm9ybWF0czpcbiAqXG4gKiAgLSBgJ21lZGl1bSdgOiBlcXVpdmFsZW50IHRvIGAneU1NTWRqbXMnYCAoZS5nLiBTZXAgMywgMjAxMCwgMTI6MDU6MDggUE0gZm9yIGVuLVVTKVxuICogIC0gYCdzaG9ydCdgOiBlcXVpdmFsZW50IHRvIGAneU1kam0nYCAoZS5nLiA5LzMvMjAxMCwgMTI6MDUgUE0gZm9yIGVuLVVTKVxuICogIC0gYCdmdWxsRGF0ZSdgOiBlcXVpdmFsZW50IHRvIGAneU1NTU1FRUVFZCdgIChlLmcuIEZyaWRheSwgU2VwdGVtYmVyIDMsIDIwMTAgZm9yIGVuLVVTKVxuICogIC0gYCdsb25nRGF0ZSdgOiBlcXVpdmFsZW50IHRvIGAneU1NTU1kJ2AgKGUuZy4gU2VwdGVtYmVyIDMsIDIwMTApXG4gKiAgLSBgJ21lZGl1bURhdGUnYDogZXF1aXZhbGVudCB0byBgJ3lNTU1kJ2AgKGUuZy4gU2VwIDMsIDIwMTAgZm9yIGVuLVVTKVxuICogIC0gYCdzaG9ydERhdGUnYDogZXF1aXZhbGVudCB0byBgJ3lNZCdgIChlLmcuIDkvMy8yMDEwIGZvciBlbi1VUylcbiAqICAtIGAnbWVkaXVtVGltZSdgOiBlcXVpdmFsZW50IHRvIGAnam1zJ2AgKGUuZy4gMTI6MDU6MDggUE0gZm9yIGVuLVVTKVxuICogIC0gYCdzaG9ydFRpbWUnYDogZXF1aXZhbGVudCB0byBgJ2ptJ2AgKGUuZy4gMTI6MDUgUE0gZm9yIGVuLVVTKVxuICpcbiAqIFRpbWV6b25lIG9mIHRoZSBmb3JtYXR0ZWQgdGV4dCB3aWxsIGJlIHRoZSBsb2NhbCBzeXN0ZW0gdGltZXpvbmUgb2YgdGhlIGVuZC11c2VycyBtYWNoaW5lLlxuICpcbiAqICMjIyBFeGFtcGxlc1xuICpcbiAqIEFzc3VtaW5nIGBkYXRlT2JqYCBpcyAoeWVhcjogMjAxNSwgbW9udGg6IDYsIGRheTogMTUsIGhvdXI6IDIxLCBtaW51dGU6IDQzLCBzZWNvbmQ6IDExKVxuICogaW4gdGhlIF9sb2NhbF8gdGltZSBhbmQgbG9jYWxlIGlzICdlbi1VUyc6XG4gKlxuICogYGBgXG4gKiAgICAge3sgZGF0ZU9iaiB8IGRhdGUgfX0gICAgICAgICAgICAgICAvLyBvdXRwdXQgaXMgJ0p1biAxNSwgMjAxNSdcbiAqICAgICB7eyBkYXRlT2JqIHwgZGF0ZTonbWVkaXVtJyB9fSAgICAgIC8vIG91dHB1dCBpcyAnSnVuIDE1LCAyMDE1LCA5OjQzOjExIFBNJ1xuICogICAgIHt7IGRhdGVPYmogfCBkYXRlOidzaG9ydFRpbWUnIH19ICAgLy8gb3V0cHV0IGlzICc5OjQzIFBNJ1xuICogICAgIHt7IGRhdGVPYmogfCBkYXRlOidtbXNzJyB9fSAgICAgICAgLy8gb3V0cHV0IGlzICc0MzoxMSdcbiAqIGBgYFxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL3BpcGVzL3RzL2RhdGVfcGlwZS9kYXRlX3BpcGVfZXhhbXBsZS50cyByZWdpb249J0RhdGVQaXBlJ31cbiAqL1xuQENPTlNUKClcbkBQaXBlKHtuYW1lOiAnZGF0ZScsIHB1cmU6IHRydWV9KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgc3RhdGljIF9BTElBU0VTOiB7W2tleTogc3RyaW5nXTogU3RyaW5nfSA9IHtcbiAgICAnbWVkaXVtJzogJ3lNTU1kam1zJyxcbiAgICAnc2hvcnQnOiAneU1kam0nLFxuICAgICdmdWxsRGF0ZSc6ICd5TU1NTUVFRUVkJyxcbiAgICAnbG9uZ0RhdGUnOiAneU1NTU1kJyxcbiAgICAnbWVkaXVtRGF0ZSc6ICd5TU1NZCcsXG4gICAgJ3Nob3J0RGF0ZSc6ICd5TWQnLFxuICAgICdtZWRpdW1UaW1lJzogJ2ptcycsXG4gICAgJ3Nob3J0VGltZSc6ICdqbSdcbiAgfTtcblxuXG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCBhcmdzOiBhbnlbXSk6IHN0cmluZyB7XG4gICAgaWYgKGlzQmxhbmsodmFsdWUpKSByZXR1cm4gbnVsbDtcblxuICAgIGlmICghdGhpcy5zdXBwb3J0cyh2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkUGlwZUFyZ3VtZW50RXhjZXB0aW9uKERhdGVQaXBlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgdmFyIHBhdHRlcm46IHN0cmluZyA9IGlzUHJlc2VudChhcmdzKSAmJiBhcmdzLmxlbmd0aCA+IDAgPyBhcmdzWzBdIDogJ21lZGl1bURhdGUnO1xuICAgIGlmIChpc051bWJlcih2YWx1ZSkpIHtcbiAgICAgIHZhbHVlID0gRGF0ZVdyYXBwZXIuZnJvbU1pbGxpcyh2YWx1ZSk7XG4gICAgfVxuICAgIGlmIChTdHJpbmdNYXBXcmFwcGVyLmNvbnRhaW5zKERhdGVQaXBlLl9BTElBU0VTLCBwYXR0ZXJuKSkge1xuICAgICAgcGF0dGVybiA9IDxzdHJpbmc+U3RyaW5nTWFwV3JhcHBlci5nZXQoRGF0ZVBpcGUuX0FMSUFTRVMsIHBhdHRlcm4pO1xuICAgIH1cbiAgICByZXR1cm4gRGF0ZUZvcm1hdHRlci5mb3JtYXQodmFsdWUsIGRlZmF1bHRMb2NhbGUsIHBhdHRlcm4pO1xuICB9XG5cbiAgc3VwcG9ydHMob2JqOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIGlzRGF0ZShvYmopIHx8IGlzTnVtYmVyKG9iaik7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
