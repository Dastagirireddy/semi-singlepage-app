System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var UnsubscriptionError;
    return {
        setters:[],
        execute: function() {
            /**
             * An error thrown when one or more errors have occurred during the
             * `unsubscribe` of a {@link Subscription}.
             */
            UnsubscriptionError = (function (_super) {
                __extends(UnsubscriptionError, _super);
                function UnsubscriptionError(errors) {
                    _super.call(this);
                    this.errors = errors;
                    var err = Error.call(this, errors ?
                        errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
                    this.name = err.name = 'UnsubscriptionError';
                    this.stack = err.stack;
                    this.message = err.message;
                }
                return UnsubscriptionError;
            }(Error));
            exports_1("UnsubscriptionError", UnsubscriptionError);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL3V0aWwvVW5zdWJzY3JpcHRpb25FcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7WUFBQTs7O2VBR0c7WUFDSDtnQkFBeUMsdUNBQUs7Z0JBQzVDLDZCQUFtQixNQUFhO29CQUM5QixpQkFBTyxDQUFDO29CQURTLFdBQU0sR0FBTixNQUFNLENBQU87b0JBRTlCLElBQU0sR0FBRyxHQUFRLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU07d0JBQ25DLE1BQU0sQ0FBQyxNQUFNLG1EQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRyxFQUFFLENBQUMsSUFBSyxPQUFBLEVBQUcsQ0FBQyxHQUFHLENBQUMsV0FBSyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUUsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDcEUsSUFBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLHFCQUFxQixDQUFDO29CQUM5QyxJQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7b0JBQ3hCLElBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztnQkFDckMsQ0FBQztnQkFDSCwwQkFBQztZQUFELENBVkEsQUFVQyxDQVZ3QyxLQUFLLEdBVTdDO1lBVkQscURBVUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFuIGVycm9yIHRocm93biB3aGVuIG9uZSBvciBtb3JlIGVycm9ycyBoYXZlIG9jY3VycmVkIGR1cmluZyB0aGVcbiAqIGB1bnN1YnNjcmliZWAgb2YgYSB7QGxpbmsgU3Vic2NyaXB0aW9ufS5cbiAqL1xuZXhwb3J0IGNsYXNzIFVuc3Vic2NyaXB0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlcnJvcnM6IGFueVtdKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zdCBlcnI6IGFueSA9IEVycm9yLmNhbGwodGhpcywgZXJyb3JzID9cbiAgICAgIGAke2Vycm9ycy5sZW5ndGh9IGVycm9ycyBvY2N1cnJlZCBkdXJpbmcgdW5zdWJzY3JpcHRpb246XG4gICR7ZXJyb3JzLm1hcCgoZXJyLCBpKSA9PiBgJHtpICsgMX0pICR7ZXJyLnRvU3RyaW5nKCl9YCkuam9pbignXFxuICAnKX1gIDogJycpO1xuICAgICg8YW55PiB0aGlzKS5uYW1lID0gZXJyLm5hbWUgPSAnVW5zdWJzY3JpcHRpb25FcnJvcic7XG4gICAgKDxhbnk+IHRoaXMpLnN0YWNrID0gZXJyLnN0YWNrO1xuICAgICg8YW55PiB0aGlzKS5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
