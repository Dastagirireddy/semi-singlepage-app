System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getTypeOf(instance) {
        return instance.constructor;
    }
    exports_1("getTypeOf", getTypeOf);
    function instantiateType(type, params) {
        if (params === void 0) { params = []; }
        var instance = Object.create(type.prototype);
        instance.constructor.apply(instance, params);
        return instance;
    }
    exports_1("instantiateType", instantiateType);
    return {
        setters:[],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL2xhbmdfdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUEsbUJBQTBCLFFBQVE7UUFDaEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDOUIsQ0FBQztJQUZELGlDQUVDLENBQUE7SUFFRCx5QkFBZ0MsSUFBYyxFQUFFLE1BQWtCO1FBQWxCLHNCQUFrQixHQUFsQixXQUFrQjtRQUNoRSxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBSkQsNkNBSUMsQ0FBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvdGVzdGluZy9sYW5nX3V0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdldFR5cGVPZihpbnN0YW5jZSkge1xuICByZXR1cm4gaW5zdGFuY2UuY29uc3RydWN0b3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW50aWF0ZVR5cGUodHlwZTogRnVuY3Rpb24sIHBhcmFtczogYW55W10gPSBbXSkge1xuICB2YXIgaW5zdGFuY2UgPSBPYmplY3QuY3JlYXRlKHR5cGUucHJvdG90eXBlKTtcbiAgaW5zdGFuY2UuY29uc3RydWN0b3IuYXBwbHkoaW5zdGFuY2UsIHBhcmFtcyk7XG4gIHJldHVybiBpbnN0YW5jZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
