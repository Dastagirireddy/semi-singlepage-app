System.register(['../../Observable', '../../operator/publish'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, publish_1;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (publish_1_1) {
                publish_1 = publish_1_1;
            }],
        execute: function() {
            Observable_1.Observable.prototype.publish = publish_1.publish;
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL2FkZC9vcGVyYXRvci9wdWJsaXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7WUFJQSx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQVEsaUJBQU8sQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9yeGpzL3NyYy9hZGQvb3BlcmF0b3IvcHVibGlzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICcuLi8uLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7cHVibGlzaCwgUHVibGlzaFNpZ25hdHVyZX0gZnJvbSAnLi4vLi4vb3BlcmF0b3IvcHVibGlzaCc7XG5cbk9ic2VydmFibGUucHJvdG90eXBlLnB1Ymxpc2ggPSA8YW55PnB1Ymxpc2g7XG5cbmRlY2xhcmUgbW9kdWxlICcuLi8uLi9PYnNlcnZhYmxlJyB7XG4gIGludGVyZmFjZSBPYnNlcnZhYmxlPFQ+IHtcbiAgICBwdWJsaXNoOiBQdWJsaXNoU2lnbmF0dXJlPFQ+O1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
