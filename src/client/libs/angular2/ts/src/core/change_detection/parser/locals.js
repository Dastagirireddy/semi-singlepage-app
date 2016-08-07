System.register(['angular2/src/facade/lang', 'angular2/src/facade/exceptions', 'angular2/src/facade/collection'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1, exceptions_1, collection_1;
    var Locals;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            }],
        execute: function() {
            Locals = (function () {
                function Locals(parent, current) {
                    this.parent = parent;
                    this.current = current;
                }
                Locals.prototype.contains = function (name) {
                    if (this.current.has(name)) {
                        return true;
                    }
                    if (lang_1.isPresent(this.parent)) {
                        return this.parent.contains(name);
                    }
                    return false;
                };
                Locals.prototype.get = function (name) {
                    if (this.current.has(name)) {
                        return this.current.get(name);
                    }
                    if (lang_1.isPresent(this.parent)) {
                        return this.parent.get(name);
                    }
                    throw new exceptions_1.BaseException("Cannot find '" + name + "'");
                };
                Locals.prototype.set = function (name, value) {
                    // TODO(rado): consider removing this check if we can guarantee this is not
                    // exposed to the public API.
                    // TODO: vsavkin maybe it should check only the local map
                    if (this.current.has(name)) {
                        this.current.set(name, value);
                    }
                    else {
                        throw new exceptions_1.BaseException("Setting of new keys post-construction is not supported. Key: " + name + ".");
                    }
                };
                Locals.prototype.clearLocalValues = function () { collection_1.MapWrapper.clearValues(this.current); };
                return Locals;
            }());
            exports_1("Locals", Locals);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9wYXJzZXIvbG9jYWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBSUE7Z0JBQ0UsZ0JBQW1CLE1BQWMsRUFBUyxPQUFzQjtvQkFBN0MsV0FBTSxHQUFOLE1BQU0sQ0FBUTtvQkFBUyxZQUFPLEdBQVAsT0FBTyxDQUFlO2dCQUFHLENBQUM7Z0JBRXBFLHlCQUFRLEdBQVIsVUFBUyxJQUFZO29CQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2QsQ0FBQztvQkFFRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDcEMsQ0FBQztvQkFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNmLENBQUM7Z0JBRUQsb0JBQUcsR0FBSCxVQUFJLElBQVk7b0JBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hDLENBQUM7b0JBRUQsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQy9CLENBQUM7b0JBRUQsTUFBTSxJQUFJLDBCQUFhLENBQUMsa0JBQWdCLElBQUksTUFBRyxDQUFDLENBQUM7Z0JBQ25ELENBQUM7Z0JBRUQsb0JBQUcsR0FBSCxVQUFJLElBQVksRUFBRSxLQUFVO29CQUMxQiwyRUFBMkU7b0JBQzNFLDZCQUE2QjtvQkFDN0IseURBQXlEO29CQUN6RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDaEMsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixNQUFNLElBQUksMEJBQWEsQ0FDbkIsa0VBQWdFLElBQUksTUFBRyxDQUFDLENBQUM7b0JBQy9FLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxpQ0FBZ0IsR0FBaEIsY0FBMkIsdUJBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEUsYUFBQztZQUFELENBeENBLEFBd0NDLElBQUE7WUF4Q0QsMkJBd0NDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvY29yZS9jaGFuZ2VfZGV0ZWN0aW9uL3BhcnNlci9sb2NhbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIE1hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBMb2NhbHMge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFyZW50OiBMb2NhbHMsIHB1YmxpYyBjdXJyZW50OiBNYXA8YW55LCBhbnk+KSB7fVxuXG4gIGNvbnRhaW5zKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmN1cnJlbnQuaGFzKG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMucGFyZW50KSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmNvbnRhaW5zKG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldChuYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQuaGFzKG5hbWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50LmdldChuYW1lKTtcbiAgICB9XG5cbiAgICBpZiAoaXNQcmVzZW50KHRoaXMucGFyZW50KSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmdldChuYW1lKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgQ2Fubm90IGZpbmQgJyR7bmFtZX0nYCk7XG4gIH1cblxuICBzZXQobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgLy8gVE9ETyhyYWRvKTogY29uc2lkZXIgcmVtb3ZpbmcgdGhpcyBjaGVjayBpZiB3ZSBjYW4gZ3VhcmFudGVlIHRoaXMgaXMgbm90XG4gICAgLy8gZXhwb3NlZCB0byB0aGUgcHVibGljIEFQSS5cbiAgICAvLyBUT0RPOiB2c2F2a2luIG1heWJlIGl0IHNob3VsZCBjaGVjayBvbmx5IHRoZSBsb2NhbCBtYXBcbiAgICBpZiAodGhpcy5jdXJyZW50LmhhcyhuYW1lKSkge1xuICAgICAgdGhpcy5jdXJyZW50LnNldChuYW1lLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgIGBTZXR0aW5nIG9mIG5ldyBrZXlzIHBvc3QtY29uc3RydWN0aW9uIGlzIG5vdCBzdXBwb3J0ZWQuIEtleTogJHtuYW1lfS5gKTtcbiAgICB9XG4gIH1cblxuICBjbGVhckxvY2FsVmFsdWVzKCk6IHZvaWQgeyBNYXBXcmFwcGVyLmNsZWFyVmFsdWVzKHRoaXMuY3VycmVudCk7IH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
