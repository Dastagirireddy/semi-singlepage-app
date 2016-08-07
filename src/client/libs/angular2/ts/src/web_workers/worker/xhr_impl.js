System.register(['angular2/src/core/di', 'angular2/src/compiler/xhr', 'angular2/src/web_workers/shared/client_message_broker', 'angular2/src/web_workers/shared/messaging_api'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var di_1, xhr_1, client_message_broker_1, messaging_api_1;
    var WebWorkerXHRImpl;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            },
            function (client_message_broker_1_1) {
                client_message_broker_1 = client_message_broker_1_1;
            },
            function (messaging_api_1_1) {
                messaging_api_1 = messaging_api_1_1;
            }],
        execute: function() {
            /**
             * Implementation of compiler/xhr that relays XHR requests to the UI side where they are sent
             * and the result is proxied back to the worker
             */
            WebWorkerXHRImpl = (function (_super) {
                __extends(WebWorkerXHRImpl, _super);
                function WebWorkerXHRImpl(messageBrokerFactory) {
                    _super.call(this);
                    this._messageBroker = messageBrokerFactory.createMessageBroker(messaging_api_1.XHR_CHANNEL);
                }
                WebWorkerXHRImpl.prototype.get = function (url) {
                    var fnArgs = [new client_message_broker_1.FnArg(url, null)];
                    var args = new client_message_broker_1.UiArguments("get", fnArgs);
                    return this._messageBroker.runOnService(args, String);
                };
                WebWorkerXHRImpl = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [client_message_broker_1.ClientMessageBrokerFactory])
                ], WebWorkerXHRImpl);
                return WebWorkerXHRImpl;
            }(xhr_1.XHR));
            exports_1("WebWorkerXHRImpl", WebWorkerXHRImpl);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3dvcmtlci94aHJfaW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBVUE7OztlQUdHO1lBRUg7Z0JBQXNDLG9DQUFHO2dCQUd2QywwQkFBWSxvQkFBZ0Q7b0JBQzFELGlCQUFPLENBQUM7b0JBQ1IsSUFBSSxDQUFDLGNBQWMsR0FBRyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQywyQkFBVyxDQUFDLENBQUM7Z0JBQzlFLENBQUM7Z0JBRUQsOEJBQUcsR0FBSCxVQUFJLEdBQVc7b0JBQ2IsSUFBSSxNQUFNLEdBQVksQ0FBQyxJQUFJLDZCQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzdDLElBQUksSUFBSSxHQUFnQixJQUFJLG1DQUFXLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN4RCxDQUFDO2dCQWJIO29CQUFDLGVBQVUsRUFBRTs7b0NBQUE7Z0JBY2IsdUJBQUM7WUFBRCxDQWJBLEFBYUMsQ0FicUMsU0FBRyxHQWF4QztZQWJELCtDQWFDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvd2ViX3dvcmtlcnMvd29ya2VyL3hocl9pbXBsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1hIUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3hocic7XG5pbXBvcnQge1xuICBGbkFyZyxcbiAgVWlBcmd1bWVudHMsXG4gIENsaWVudE1lc3NhZ2VCcm9rZXIsXG4gIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5XG59IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7WEhSX0NIQU5ORUx9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5cbi8qKlxuICogSW1wbGVtZW50YXRpb24gb2YgY29tcGlsZXIveGhyIHRoYXQgcmVsYXlzIFhIUiByZXF1ZXN0cyB0byB0aGUgVUkgc2lkZSB3aGVyZSB0aGV5IGFyZSBzZW50XG4gKiBhbmQgdGhlIHJlc3VsdCBpcyBwcm94aWVkIGJhY2sgdG8gdGhlIHdvcmtlclxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2ViV29ya2VyWEhSSW1wbCBleHRlbmRzIFhIUiB7XG4gIHByaXZhdGUgX21lc3NhZ2VCcm9rZXI6IENsaWVudE1lc3NhZ2VCcm9rZXI7XG5cbiAgY29uc3RydWN0b3IobWVzc2FnZUJyb2tlckZhY3Rvcnk6IENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9tZXNzYWdlQnJva2VyID0gbWVzc2FnZUJyb2tlckZhY3RvcnkuY3JlYXRlTWVzc2FnZUJyb2tlcihYSFJfQ0hBTk5FTCk7XG4gIH1cblxuICBnZXQodXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHZhciBmbkFyZ3M6IEZuQXJnW10gPSBbbmV3IEZuQXJnKHVybCwgbnVsbCldO1xuICAgIHZhciBhcmdzOiBVaUFyZ3VtZW50cyA9IG5ldyBVaUFyZ3VtZW50cyhcImdldFwiLCBmbkFyZ3MpO1xuICAgIHJldHVybiB0aGlzLl9tZXNzYWdlQnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBTdHJpbmcpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
