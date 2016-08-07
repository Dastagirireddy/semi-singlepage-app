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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL2h0dHAvYmFja2VuZHMvYnJvd3Nlcl9qc29ucC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O1FBR0ksY0FBYyxFQUNMLFVBQVUsRUFDbkIsaUJBQWlCO0lBRXJCO1FBQ0UsRUFBRSxDQUFDLENBQUMsaUJBQWlCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMvQixpQkFBaUIsR0FBMEIsYUFBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN0RSxDQUFDO1FBQ0QsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7Ozs7Ozs7Ozs7WUFURyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1lBQ1Ysd0JBQUEsVUFBVSxHQUFHLGNBQWMsQ0FBQSxDQUFDO1lBQ3JDLGlCQUFpQixHQUF5QixJQUFJLENBQUM7WUFTbkQsK0RBQStEO1lBRS9EO2dCQUFBO2dCQStCQSxDQUFDO2dCQTlCQyxzREFBc0Q7Z0JBQ3RELDRCQUFLLEdBQUwsVUFBTSxHQUFXO29CQUNmLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzVDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO29CQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQztnQkFFRCxvQ0FBYSxHQUFiLGNBQTBCLE1BQU0sQ0FBQyxVQUFRLGNBQWMsRUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFOUQsc0NBQWUsR0FBZixVQUFnQixFQUFVLElBQVksTUFBTSxDQUFJLFVBQVUsU0FBSSxFQUFFLGNBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBRTlFLHVDQUFnQixHQUFoQixVQUFpQixFQUFVLEVBQUUsVUFBZTtvQkFDMUMsSUFBSSxXQUFXLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQztvQkFDekMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztnQkFDL0IsQ0FBQztnQkFFRCx1Q0FBZ0IsR0FBaEIsVUFBaUIsRUFBVTtvQkFDekIsSUFBSSxXQUFXLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQztvQkFDekMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDekIsQ0FBQztnQkFFRCx5Q0FBeUM7Z0JBQ3pDLDJCQUFJLEdBQUosVUFBSyxJQUFTLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFNUQsdUNBQXVDO2dCQUN2Qyw4QkFBTyxHQUFQLFVBQVEsSUFBUztvQkFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxDQUFDO2dCQUNILENBQUM7Z0JBL0JIO29CQUFDLGlCQUFVLEVBQUU7O2dDQUFBO2dCQWdDYixtQkFBQztZQUFELENBL0JBLEFBK0JDLElBQUE7WUEvQkQsdUNBK0JDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvaHR0cC9iYWNrZW5kcy9icm93c2VyX2pzb25wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7Z2xvYmFsfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5sZXQgX25leHRSZXF1ZXN0SWQgPSAwO1xuZXhwb3J0IGNvbnN0IEpTT05QX0hPTUUgPSAnX19uZ19qc29ucF9fJztcbnZhciBfanNvbnBDb25uZWN0aW9uczoge1trZXk6IHN0cmluZ106IGFueX0gPSBudWxsO1xuXG5mdW5jdGlvbiBfZ2V0SnNvbnBDb25uZWN0aW9ucygpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIGlmIChfanNvbnBDb25uZWN0aW9ucyA9PT0gbnVsbCkge1xuICAgIF9qc29ucENvbm5lY3Rpb25zID0gKDx7W2tleTogc3RyaW5nXTogYW55fT5nbG9iYWwpW0pTT05QX0hPTUVdID0ge307XG4gIH1cbiAgcmV0dXJuIF9qc29ucENvbm5lY3Rpb25zO1xufVxuXG4vLyBNYWtlIHN1cmUgbm90IHRvIGV2YWx1YXRlIHRoaXMgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudCFcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCcm93c2VySnNvbnAge1xuICAvLyBDb25zdHJ1Y3QgYSA8c2NyaXB0PiBlbGVtZW50IHdpdGggdGhlIHNwZWNpZmllZCBVUkxcbiAgYnVpbGQodXJsOiBzdHJpbmcpOiBhbnkge1xuICAgIGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgbm9kZS5zcmMgPSB1cmw7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBuZXh0UmVxdWVzdElEKCk6IHN0cmluZyB7IHJldHVybiBgX19yZXEke19uZXh0UmVxdWVzdElkKyt9YDsgfVxuXG4gIHJlcXVlc3RDYWxsYmFjayhpZDogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIGAke0pTT05QX0hPTUV9LiR7aWR9LmZpbmlzaGVkYDsgfVxuXG4gIGV4cG9zZUNvbm5lY3Rpb24oaWQ6IHN0cmluZywgY29ubmVjdGlvbjogYW55KSB7XG4gICAgbGV0IGNvbm5lY3Rpb25zID0gX2dldEpzb25wQ29ubmVjdGlvbnMoKTtcbiAgICBjb25uZWN0aW9uc1tpZF0gPSBjb25uZWN0aW9uO1xuICB9XG5cbiAgcmVtb3ZlQ29ubmVjdGlvbihpZDogc3RyaW5nKSB7XG4gICAgdmFyIGNvbm5lY3Rpb25zID0gX2dldEpzb25wQ29ubmVjdGlvbnMoKTtcbiAgICBjb25uZWN0aW9uc1tpZF0gPSBudWxsO1xuICB9XG5cbiAgLy8gQXR0YWNoIHRoZSA8c2NyaXB0PiBlbGVtZW50IHRvIHRoZSBET01cbiAgc2VuZChub2RlOiBhbnkpIHsgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCg8Tm9kZT4obm9kZSkpOyB9XG5cbiAgLy8gUmVtb3ZlIDxzY3JpcHQ+IGVsZW1lbnQgZnJvbSB0aGUgRE9NXG4gIGNsZWFudXAobm9kZTogYW55KSB7XG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKDxOb2RlPihub2RlKSk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
