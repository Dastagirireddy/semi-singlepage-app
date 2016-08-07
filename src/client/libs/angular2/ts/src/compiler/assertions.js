System.register(['../facade/lang', '../facade/exceptions'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1;
    function assertArrayOfStrings(identifier, value) {
        if (!lang_1.assertionsEnabled() || lang_1.isBlank(value)) {
            return;
        }
        if (!lang_1.isArray(value)) {
            throw new exceptions_1.BaseException("Expected '" + identifier + "' to be an array of strings.");
        }
        for (var i = 0; i < value.length; i += 1) {
            if (!lang_1.isString(value[i])) {
                throw new exceptions_1.BaseException("Expected '" + identifier + "' to be an array of strings.");
            }
        }
    }
    exports_1("assertArrayOfStrings", assertArrayOfStrings);
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvbXBpbGVyL2Fzc2VydGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUdBLDhCQUFxQyxVQUFrQixFQUFFLEtBQVU7UUFDakUsRUFBRSxDQUFDLENBQUMsQ0FBQyx3QkFBaUIsRUFBRSxJQUFJLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLElBQUksMEJBQWEsQ0FBQyxlQUFhLFVBQVUsaUNBQThCLENBQUMsQ0FBQztRQUNqRixDQUFDO1FBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sSUFBSSwwQkFBYSxDQUFDLGVBQWEsVUFBVSxpQ0FBOEIsQ0FBQyxDQUFDO1lBQ2pGLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQVpELHVEQVlDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvYXNzZXJ0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNBcnJheSwgaXNTdHJpbmcsIGlzQmxhbmssIGFzc2VydGlvbnNFbmFibGVkfSBmcm9tICcuLi9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJy4uL2ZhY2FkZS9leGNlcHRpb25zJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydEFycmF5T2ZTdHJpbmdzKGlkZW50aWZpZXI6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICBpZiAoIWFzc2VydGlvbnNFbmFibGVkKCkgfHwgaXNCbGFuayh2YWx1ZSkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCFpc0FycmF5KHZhbHVlKSkge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBFeHBlY3RlZCAnJHtpZGVudGlmaWVyfScgdG8gYmUgYW4gYXJyYXkgb2Ygc3RyaW5ncy5gKTtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKCFpc1N0cmluZyh2YWx1ZVtpXSkpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBFeHBlY3RlZCAnJHtpZGVudGlmaWVyfScgdG8gYmUgYW4gYXJyYXkgb2Ygc3RyaW5ncy5gKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
