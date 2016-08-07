System.register(['./e2e_util'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var benchpress, bind, Options;
    function runClickBenchmark(config) {
        browser.ignoreSynchronization = !config.waitForAngular2;
        var buttons = config.buttons.map(function (selector) { return $(selector); });
        config.work = function () { buttons.forEach(function (button) { button.click(); }); };
        return runBenchmark(config);
    }
    exports_1("runClickBenchmark", runClickBenchmark);
    function runBenchmark(config) {
        return getScaleFactor(browser.params.benchmark.scaling)
            .then(function (scaleFactor) {
            var description = {};
            var urlParams = [];
            if (config.params) {
                config.params.forEach(function (param) {
                    var name = param.name;
                    var value = applyScaleFactor(param.value, scaleFactor, param.scale);
                    urlParams.push(name + '=' + value);
                    description[name] = value;
                });
            }
            var url = encodeURI(config.url + '?' + urlParams.join('&'));
            return browser.get(url).then(function () {
                return global['benchpressRunner'].sample({
                    id: config.id,
                    execute: config.work,
                    prepare: config.prepare,
                    microMetrics: config.microMetrics,
                    bindings: [bind(Options.SAMPLE_DESCRIPTION).toValue(description)]
                });
            });
        });
    }
    exports_1("runBenchmark", runBenchmark);
    function getScaleFactor(possibleScalings) {
        return browser.executeScript('return navigator.userAgent')
            .then(function (userAgent) {
            var scaleFactor = 1;
            possibleScalings.forEach(function (entry) {
                if (userAgent.match(entry.userAgent)) {
                    scaleFactor = entry.value;
                }
            });
            return scaleFactor;
        });
    }
    function applyScaleFactor(value, scaleFactor, method) {
        if (method === 'log2') {
            return value + Math.log(scaleFactor) / Math.LN2;
        }
        else if (method === 'sqrt') {
            return value * Math.sqrt(scaleFactor);
        }
        else if (method === 'linear') {
            return value * scaleFactor;
        }
        else {
            return value;
        }
    }
    return {
        setters:[
            function (e2e_util_1_1) {
                exports_1({
                    "verifyNoBrowserErrors": e2e_util_1_1["verifyNoBrowserErrors"]
                });
            }],
        execute: function() {
            benchpress = global['benchpress'];
            bind = benchpress.bind;
            Options = benchpress.Options;
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvcGVyZl91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztRQUVJLFVBQVUsRUFDVixJQUFJLEVBQ0osT0FBTztJQUVYLDJCQUFrQyxNQUFNO1FBQ3RDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDeEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBUyxRQUFRLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsY0FBYSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUxELGlEQUtDLENBQUE7SUFFRCxzQkFBNkIsTUFBTTtRQUNqQyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQzthQUNsRCxJQUFJLENBQUMsVUFBUyxXQUFXO1lBQ3hCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUNyQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVMsS0FBSztvQkFDbEMsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDdEIsSUFBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNwRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7b0JBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQzVCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUNELElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUMzQixNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDO29CQUN2QyxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUU7b0JBQ2IsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJO29CQUNwQixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87b0JBQ3ZCLFlBQVksRUFBRSxNQUFNLENBQUMsWUFBWTtvQkFDakMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDbEUsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNULENBQUM7SUF4QkQsdUNBd0JDLENBQUE7SUFFRCx3QkFBd0IsZ0JBQWdCO1FBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDO2FBQ3JELElBQUksQ0FBQyxVQUFTLFNBQWlCO1lBQzlCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztZQUNwQixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLO2dCQUNyQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUM1QixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUVELDBCQUEwQixLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU07UUFDbEQsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDbEQsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUM3QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7Ozs7Ozs7OztZQTVERyxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2xDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3Rlc3RpbmcvcGVyZl91dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHt2ZXJpZnlOb0Jyb3dzZXJFcnJvcnN9IGZyb20gJy4vZTJlX3V0aWwnO1xuXG52YXIgYmVuY2hwcmVzcyA9IGdsb2JhbFsnYmVuY2hwcmVzcyddO1xudmFyIGJpbmQgPSBiZW5jaHByZXNzLmJpbmQ7XG52YXIgT3B0aW9ucyA9IGJlbmNocHJlc3MuT3B0aW9ucztcblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bkNsaWNrQmVuY2htYXJrKGNvbmZpZykge1xuICBicm93c2VyLmlnbm9yZVN5bmNocm9uaXphdGlvbiA9ICFjb25maWcud2FpdEZvckFuZ3VsYXIyO1xuICB2YXIgYnV0dG9ucyA9IGNvbmZpZy5idXR0b25zLm1hcChmdW5jdGlvbihzZWxlY3RvcikgeyByZXR1cm4gJChzZWxlY3Rvcik7IH0pO1xuICBjb25maWcud29yayA9IGZ1bmN0aW9uKCkgeyBidXR0b25zLmZvckVhY2goZnVuY3Rpb24oYnV0dG9uKSB7IGJ1dHRvbi5jbGljaygpOyB9KTsgfTtcbiAgcmV0dXJuIHJ1bkJlbmNobWFyayhjb25maWcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuQmVuY2htYXJrKGNvbmZpZykge1xuICByZXR1cm4gZ2V0U2NhbGVGYWN0b3IoYnJvd3Nlci5wYXJhbXMuYmVuY2htYXJrLnNjYWxpbmcpXG4gICAgICAudGhlbihmdW5jdGlvbihzY2FsZUZhY3Rvcikge1xuICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSB7fTtcbiAgICAgICAgdmFyIHVybFBhcmFtcyA9IFtdO1xuICAgICAgICBpZiAoY29uZmlnLnBhcmFtcykge1xuICAgICAgICAgIGNvbmZpZy5wYXJhbXMuZm9yRWFjaChmdW5jdGlvbihwYXJhbSkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBwYXJhbS5uYW1lO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gYXBwbHlTY2FsZUZhY3RvcihwYXJhbS52YWx1ZSwgc2NhbGVGYWN0b3IsIHBhcmFtLnNjYWxlKTtcbiAgICAgICAgICAgIHVybFBhcmFtcy5wdXNoKG5hbWUgKyAnPScgKyB2YWx1ZSk7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbltuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciB1cmwgPSBlbmNvZGVVUkkoY29uZmlnLnVybCArICc/JyArIHVybFBhcmFtcy5qb2luKCcmJykpO1xuICAgICAgICByZXR1cm4gYnJvd3Nlci5nZXQodXJsKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBnbG9iYWxbJ2JlbmNocHJlc3NSdW5uZXInXS5zYW1wbGUoe1xuICAgICAgICAgICAgaWQ6IGNvbmZpZy5pZCxcbiAgICAgICAgICAgIGV4ZWN1dGU6IGNvbmZpZy53b3JrLFxuICAgICAgICAgICAgcHJlcGFyZTogY29uZmlnLnByZXBhcmUsXG4gICAgICAgICAgICBtaWNyb01ldHJpY3M6IGNvbmZpZy5taWNyb01ldHJpY3MsXG4gICAgICAgICAgICBiaW5kaW5nczogW2JpbmQoT3B0aW9ucy5TQU1QTEVfREVTQ1JJUFRJT04pLnRvVmFsdWUoZGVzY3JpcHRpb24pXVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRTY2FsZUZhY3Rvcihwb3NzaWJsZVNjYWxpbmdzKSB7XG4gIHJldHVybiBicm93c2VyLmV4ZWN1dGVTY3JpcHQoJ3JldHVybiBuYXZpZ2F0b3IudXNlckFnZW50JylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHVzZXJBZ2VudDogc3RyaW5nKSB7XG4gICAgICAgIHZhciBzY2FsZUZhY3RvciA9IDE7XG4gICAgICAgIHBvc3NpYmxlU2NhbGluZ3MuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgIGlmICh1c2VyQWdlbnQubWF0Y2goZW50cnkudXNlckFnZW50KSkge1xuICAgICAgICAgICAgc2NhbGVGYWN0b3IgPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2NhbGVGYWN0b3I7XG4gICAgICB9KTtcbn1cblxuZnVuY3Rpb24gYXBwbHlTY2FsZUZhY3Rvcih2YWx1ZSwgc2NhbGVGYWN0b3IsIG1ldGhvZCkge1xuICBpZiAobWV0aG9kID09PSAnbG9nMicpIHtcbiAgICByZXR1cm4gdmFsdWUgKyBNYXRoLmxvZyhzY2FsZUZhY3RvcikgLyBNYXRoLkxOMjtcbiAgfSBlbHNlIGlmIChtZXRob2QgPT09ICdzcXJ0Jykge1xuICAgIHJldHVybiB2YWx1ZSAqIE1hdGguc3FydChzY2FsZUZhY3Rvcik7XG4gIH0gZWxzZSBpZiAobWV0aG9kID09PSAnbGluZWFyJykge1xuICAgIHJldHVybiB2YWx1ZSAqIHNjYWxlRmFjdG9yO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
