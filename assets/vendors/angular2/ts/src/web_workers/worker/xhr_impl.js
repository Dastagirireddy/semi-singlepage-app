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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy93b3JrZXIveGhyX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVVBOzs7ZUFHRztZQUVIO2dCQUFzQyxvQ0FBRztnQkFHdkMsMEJBQVksb0JBQWdEO29CQUMxRCxpQkFBTyxDQUFDO29CQUNSLElBQUksQ0FBQyxjQUFjLEdBQUcsb0JBQW9CLENBQUMsbUJBQW1CLENBQUMsMkJBQVcsQ0FBQyxDQUFDO2dCQUM5RSxDQUFDO2dCQUVELDhCQUFHLEdBQUgsVUFBSSxHQUFXO29CQUNiLElBQUksTUFBTSxHQUFZLENBQUMsSUFBSSw2QkFBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxJQUFJLElBQUksR0FBZ0IsSUFBSSxtQ0FBVyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDeEQsQ0FBQztnQkFiSDtvQkFBQyxlQUFVLEVBQUU7O29DQUFBO2dCQWNiLHVCQUFDO1lBQUQsQ0FiQSxBQWFDLENBYnFDLFNBQUcsR0FheEM7WUFiRCwrQ0FhQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy93b3JrZXIveGhyX2ltcGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7WEhSfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIveGhyJztcbmltcG9ydCB7XG4gIEZuQXJnLFxuICBVaUFyZ3VtZW50cyxcbiAgQ2xpZW50TWVzc2FnZUJyb2tlcixcbiAgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3Rvcnlcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9jbGllbnRfbWVzc2FnZV9icm9rZXInO1xuaW1wb3J0IHtYSFJfQ0hBTk5FTH0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdpbmdfYXBpJztcblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiBjb21waWxlci94aHIgdGhhdCByZWxheXMgWEhSIHJlcXVlc3RzIHRvIHRoZSBVSSBzaWRlIHdoZXJlIHRoZXkgYXJlIHNlbnRcbiAqIGFuZCB0aGUgcmVzdWx0IGlzIHByb3hpZWQgYmFjayB0byB0aGUgd29ya2VyXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJXb3JrZXJYSFJJbXBsIGV4dGVuZHMgWEhSIHtcbiAgcHJpdmF0ZSBfbWVzc2FnZUJyb2tlcjogQ2xpZW50TWVzc2FnZUJyb2tlcjtcblxuICBjb25zdHJ1Y3RvcihtZXNzYWdlQnJva2VyRmFjdG9yeTogQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnkpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX21lc3NhZ2VCcm9rZXIgPSBtZXNzYWdlQnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFhIUl9DSEFOTkVMKTtcbiAgfVxuXG4gIGdldCh1cmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgdmFyIGZuQXJnczogRm5BcmdbXSA9IFtuZXcgRm5BcmcodXJsLCBudWxsKV07XG4gICAgdmFyIGFyZ3M6IFVpQXJndW1lbnRzID0gbmV3IFVpQXJndW1lbnRzKFwiZ2V0XCIsIGZuQXJncyk7XG4gICAgcmV0dXJuIHRoaXMuX21lc3NhZ2VCcm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIFN0cmluZyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
