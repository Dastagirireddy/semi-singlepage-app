System.register(['angular2/src/core/di', 'angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var di_1, lang_1;
    var _warnImpl, Console;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            // Note: Need to rename warn as in Dart
            // class members and imports can't use the same name.
            _warnImpl = lang_1.warn;
            Console = (function () {
                function Console() {
                }
                Console.prototype.log = function (message) { lang_1.print(message); };
                // Note: for reporting errors use `DOM.logError()` as it is platform specific
                Console.prototype.warn = function (message) { _warnImpl(message); };
                Console = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Console);
                return Console;
            }());
            exports_1("Console", Console);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb3JlL2NvbnNvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQUtJLFNBQVM7Ozs7Ozs7Ozs7WUFGYix1Q0FBdUM7WUFDdkMscURBQXFEO1lBQ2pELFNBQVMsR0FBRyxXQUFJLENBQUM7WUFHckI7Z0JBQUE7Z0JBSUEsQ0FBQztnQkFIQyxxQkFBRyxHQUFILFVBQUksT0FBZSxJQUFVLFlBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLDZFQUE2RTtnQkFDN0Usc0JBQUksR0FBSixVQUFLLE9BQWUsSUFBVSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUpyRDtvQkFBQyxlQUFVLEVBQUU7OzJCQUFBO2dCQUtiLGNBQUM7WUFBRCxDQUpBLEFBSUMsSUFBQTtZQUpELDZCQUlDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY29uc29sZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtwcmludCwgd2Fybn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLy8gTm90ZTogTmVlZCB0byByZW5hbWUgd2FybiBhcyBpbiBEYXJ0XG4vLyBjbGFzcyBtZW1iZXJzIGFuZCBpbXBvcnRzIGNhbid0IHVzZSB0aGUgc2FtZSBuYW1lLlxubGV0IF93YXJuSW1wbCA9IHdhcm47XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25zb2xlIHtcbiAgbG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQgeyBwcmludChtZXNzYWdlKTsgfVxuICAvLyBOb3RlOiBmb3IgcmVwb3J0aW5nIGVycm9ycyB1c2UgYERPTS5sb2dFcnJvcigpYCBhcyBpdCBpcyBwbGF0Zm9ybSBzcGVjaWZpY1xuICB3YXJuKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQgeyBfd2FybkltcGwobWVzc2FnZSk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
