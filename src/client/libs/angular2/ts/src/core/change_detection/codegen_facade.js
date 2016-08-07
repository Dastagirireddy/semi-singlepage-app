System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    /**
     * Converts `funcOrValue` to a string which can be used in generated code.
     */
    function codify(obj) {
        return JSON.stringify(obj);
    }
    exports_1("codify", codify);
    function rawString(str) {
        return "'" + str + "'";
    }
    exports_1("rawString", rawString);
    /**
     * Combine the strings of generated code into a single interpolated string.
     * Each element of `vals` is expected to be a string literal or a codegen'd
     * call to a method returning a string.
     */
    function combineGeneratedStrings(vals) {
        return vals.join(' + ');
    }
    exports_1("combineGeneratedStrings", combineGeneratedStrings);
    return {
        setters:[],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jb2RlZ2VuX2ZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDQTs7T0FFRztJQUNILGdCQUF1QixHQUFRO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFGRCwyQkFFQyxDQUFBO0lBRUQsbUJBQTBCLEdBQVc7UUFDbkMsTUFBTSxDQUFDLE1BQUksR0FBRyxNQUFHLENBQUM7SUFDcEIsQ0FBQztJQUZELGlDQUVDLENBQUE7SUFFRDs7OztPQUlHO0lBQ0gsaUNBQXdDLElBQWM7UUFDcEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUZELDZEQUVDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL2NvZGVnZW5fZmFjYWRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jT3JWYWx1ZWAgdG8gYSBzdHJpbmcgd2hpY2ggY2FuIGJlIHVzZWQgaW4gZ2VuZXJhdGVkIGNvZGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb2RpZnkob2JqOiBhbnkpOiBzdHJpbmcge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhd1N0cmluZyhzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgJyR7c3RyfSdgO1xufVxuXG4vKipcbiAqIENvbWJpbmUgdGhlIHN0cmluZ3Mgb2YgZ2VuZXJhdGVkIGNvZGUgaW50byBhIHNpbmdsZSBpbnRlcnBvbGF0ZWQgc3RyaW5nLlxuICogRWFjaCBlbGVtZW50IG9mIGB2YWxzYCBpcyBleHBlY3RlZCB0byBiZSBhIHN0cmluZyBsaXRlcmFsIG9yIGEgY29kZWdlbidkXG4gKiBjYWxsIHRvIGEgbWV0aG9kIHJldHVybmluZyBhIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmVHZW5lcmF0ZWRTdHJpbmdzKHZhbHM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgcmV0dXJuIHZhbHMuam9pbignICsgJyk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
