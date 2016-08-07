System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function stringify(obj) {
        if (typeof obj == 'function')
            return obj.name || obj.toString();
        return '' + obj;
    }
    exports_1("stringify", stringify);
    function onError(e) {
        // TODO: (misko): We seem to not have a stack trace here!
        console.log(e, e.stack);
        throw e;
    }
    exports_1("onError", onError);
    function controllerKey(name) {
        return '$' + name + 'Controller';
    }
    exports_1("controllerKey", controllerKey);
    return {
        setters:[],
        execute: function() {
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy91cGdyYWRlL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQ0EsbUJBQTBCLEdBQVE7UUFDaEMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDO1lBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFIRCxpQ0FHQyxDQUFBO0lBR0QsaUJBQXdCLENBQU07UUFDNUIseURBQXlEO1FBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsQ0FBQztJQUNWLENBQUM7SUFKRCw2QkFJQyxDQUFBO0lBRUQsdUJBQThCLElBQVk7UUFDeEMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFGRCx5Q0FFQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy91cGdyYWRlL3V0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkob2JqOiBhbnkpOiBzdHJpbmcge1xuICBpZiAodHlwZW9mIG9iaiA9PSAnZnVuY3Rpb24nKSByZXR1cm4gb2JqLm5hbWUgfHwgb2JqLnRvU3RyaW5nKCk7XG4gIHJldHVybiAnJyArIG9iajtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gb25FcnJvcihlOiBhbnkpIHtcbiAgLy8gVE9ETzogKG1pc2tvKTogV2Ugc2VlbSB0byBub3QgaGF2ZSBhIHN0YWNrIHRyYWNlIGhlcmUhXG4gIGNvbnNvbGUubG9nKGUsIGUuc3RhY2spO1xuICB0aHJvdyBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udHJvbGxlcktleShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gJyQnICsgbmFtZSArICdDb250cm9sbGVyJztcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
