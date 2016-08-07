System.register(['angular2/core', 'angular2/src/facade/lang'], function(exports_1, context_1) {
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
    var core_1, lang_1;
    var _nextRequestId, JSONP_HOME, _jsonpConnections, BrowserJsonp;
    function _getJsonpConnections() {
        if (_jsonpConnections === null) {
            _jsonpConnections = lang_1.global[JSONP_HOME] = {};
        }
        return _jsonpConnections;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            _nextRequestId = 0;
            exports_1("JSONP_HOME", JSONP_HOME = '__ng_jsonp__');
            _jsonpConnections = null;
            // Make sure not to evaluate this in a non-browser environment!
            BrowserJsonp = (function () {
                function BrowserJsonp() {
                }
                // Construct a <script> element with the specified URL
                BrowserJsonp.prototype.build = function (url) {
                    var node = document.createElement('script');
                    node.src = url;
                    return node;
                };
                BrowserJsonp.prototype.nextRequestID = function () { return "__req" + _nextRequestId++; };
                BrowserJsonp.prototype.requestCallback = function (id) { return JSONP_HOME + "." + id + ".finished"; };
                BrowserJsonp.prototype.exposeConnection = function (id, connection) {
                    var connections = _getJsonpConnections();
                    connections[id] = connection;
                };
                BrowserJsonp.prototype.removeConnection = function (id) {
                    var connections = _getJsonpConnections();
                    connections[id] = null;
                };
                // Attach the <script> element to the DOM
                BrowserJsonp.prototype.send = function (node) { document.body.appendChild((node)); };
                // Remove <script> element from the DOM
                BrowserJsonp.prototype.cleanup = function (node) {
                    if (node.parentNode) {
                        node.parentNode.removeChild((node));
                    }
                };
                BrowserJsonp = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], BrowserJsonp);
                return BrowserJsonp;
            }());
            exports_1("BrowserJsonp", BrowserJsonp);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL2JhY2tlbmRzL2Jyb3dzZXJfanNvbnAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztRQUdJLGNBQWMsRUFDTCxVQUFVLEVBQ25CLGlCQUFpQjtJQUVyQjtRQUNFLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDL0IsaUJBQWlCLEdBQTBCLGFBQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdEUsQ0FBQztRQUNELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDOzs7Ozs7Ozs7O1lBVEcsY0FBYyxHQUFHLENBQUMsQ0FBQztZQUNWLHdCQUFBLFVBQVUsR0FBRyxjQUFjLENBQUEsQ0FBQztZQUNyQyxpQkFBaUIsR0FBeUIsSUFBSSxDQUFDO1lBU25ELCtEQUErRDtZQUUvRDtnQkFBQTtnQkErQkEsQ0FBQztnQkE5QkMsc0RBQXNEO2dCQUN0RCw0QkFBSyxHQUFMLFVBQU0sR0FBVztvQkFDZixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM1QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztvQkFDZixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7Z0JBRUQsb0NBQWEsR0FBYixjQUEwQixNQUFNLENBQUMsVUFBUSxjQUFjLEVBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRTlELHNDQUFlLEdBQWYsVUFBZ0IsRUFBVSxJQUFZLE1BQU0sQ0FBSSxVQUFVLFNBQUksRUFBRSxjQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUU5RSx1Q0FBZ0IsR0FBaEIsVUFBaUIsRUFBVSxFQUFFLFVBQWU7b0JBQzFDLElBQUksV0FBVyxHQUFHLG9CQUFvQixFQUFFLENBQUM7b0JBQ3pDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7Z0JBQy9CLENBQUM7Z0JBRUQsdUNBQWdCLEdBQWhCLFVBQWlCLEVBQVU7b0JBQ3pCLElBQUksV0FBVyxHQUFHLG9CQUFvQixFQUFFLENBQUM7b0JBQ3pDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRUQseUNBQXlDO2dCQUN6QywyQkFBSSxHQUFKLFVBQUssSUFBUyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTVELHVDQUF1QztnQkFDdkMsOEJBQU8sR0FBUCxVQUFRLElBQVM7b0JBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDNUMsQ0FBQztnQkFDSCxDQUFDO2dCQS9CSDtvQkFBQyxpQkFBVSxFQUFFOztnQ0FBQTtnQkFnQ2IsbUJBQUM7WUFBRCxDQS9CQSxBQStCQyxJQUFBO1lBL0JELHVDQStCQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9odHRwL2JhY2tlbmRzL2Jyb3dzZXJfanNvbnAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuaW1wb3J0IHtnbG9iYWx9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmxldCBfbmV4dFJlcXVlc3RJZCA9IDA7XG5leHBvcnQgY29uc3QgSlNPTlBfSE9NRSA9ICdfX25nX2pzb25wX18nO1xudmFyIF9qc29ucENvbm5lY3Rpb25zOiB7W2tleTogc3RyaW5nXTogYW55fSA9IG51bGw7XG5cbmZ1bmN0aW9uIF9nZXRKc29ucENvbm5lY3Rpb25zKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgaWYgKF9qc29ucENvbm5lY3Rpb25zID09PSBudWxsKSB7XG4gICAgX2pzb25wQ29ubmVjdGlvbnMgPSAoPHtba2V5OiBzdHJpbmddOiBhbnl9Pmdsb2JhbClbSlNPTlBfSE9NRV0gPSB7fTtcbiAgfVxuICByZXR1cm4gX2pzb25wQ29ubmVjdGlvbnM7XG59XG5cbi8vIE1ha2Ugc3VyZSBub3QgdG8gZXZhbHVhdGUgdGhpcyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJKc29ucCB7XG4gIC8vIENvbnN0cnVjdCBhIDxzY3JpcHQ+IGVsZW1lbnQgd2l0aCB0aGUgc3BlY2lmaWVkIFVSTFxuICBidWlsZCh1cmw6IHN0cmluZyk6IGFueSB7XG4gICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBub2RlLnNyYyA9IHVybDtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIG5leHRSZXF1ZXN0SUQoKTogc3RyaW5nIHsgcmV0dXJuIGBfX3JlcSR7X25leHRSZXF1ZXN0SWQrK31gOyB9XG5cbiAgcmVxdWVzdENhbGxiYWNrKGlkOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gYCR7SlNPTlBfSE9NRX0uJHtpZH0uZmluaXNoZWRgOyB9XG5cbiAgZXhwb3NlQ29ubmVjdGlvbihpZDogc3RyaW5nLCBjb25uZWN0aW9uOiBhbnkpIHtcbiAgICBsZXQgY29ubmVjdGlvbnMgPSBfZ2V0SnNvbnBDb25uZWN0aW9ucygpO1xuICAgIGNvbm5lY3Rpb25zW2lkXSA9IGNvbm5lY3Rpb247XG4gIH1cblxuICByZW1vdmVDb25uZWN0aW9uKGlkOiBzdHJpbmcpIHtcbiAgICB2YXIgY29ubmVjdGlvbnMgPSBfZ2V0SnNvbnBDb25uZWN0aW9ucygpO1xuICAgIGNvbm5lY3Rpb25zW2lkXSA9IG51bGw7XG4gIH1cblxuICAvLyBBdHRhY2ggdGhlIDxzY3JpcHQ+IGVsZW1lbnQgdG8gdGhlIERPTVxuICBzZW5kKG5vZGU6IGFueSkgeyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKDxOb2RlPihub2RlKSk7IH1cblxuICAvLyBSZW1vdmUgPHNjcmlwdD4gZWxlbWVudCBmcm9tIHRoZSBET01cbiAgY2xlYW51cChub2RlOiBhbnkpIHtcbiAgICBpZiAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoPE5vZGU+KG5vZGUpKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
