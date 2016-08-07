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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy90ZXN0aW5nL3BlcmZfdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFFSSxVQUFVLEVBQ1YsSUFBSSxFQUNKLE9BQU87SUFFWCwyQkFBa0MsTUFBTTtRQUN0QyxPQUFPLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO1FBQ3hELElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RSxNQUFNLENBQUMsSUFBSSxHQUFHLGNBQWEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFTLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRixNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFMRCxpREFLQyxDQUFBO0lBRUQsc0JBQTZCLE1BQU07UUFDakMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7YUFDbEQsSUFBSSxDQUFDLFVBQVMsV0FBVztZQUN4QixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFTLEtBQUs7b0JBQ2xDLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ3RCLElBQUksS0FBSyxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO29CQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQztvQkFDdkMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFO29CQUNiLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSTtvQkFDcEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPO29CQUN2QixZQUFZLEVBQUUsTUFBTSxDQUFDLFlBQVk7b0JBQ2pDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ2xFLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBeEJELHVDQXdCQyxDQUFBO0lBRUQsd0JBQXdCLGdCQUFnQjtRQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQzthQUNyRCxJQUFJLENBQUMsVUFBUyxTQUFpQjtZQUM5QixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDcEIsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVMsS0FBSztnQkFDckMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxXQUFXLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDNUIsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNULENBQUM7SUFFRCwwQkFBMEIsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ2xELENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7SUFDSCxDQUFDOzs7Ozs7Ozs7WUE1REcsVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNsQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztZQUN2QixPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvdGVzdGluZy9wZXJmX3V0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge3ZlcmlmeU5vQnJvd3NlckVycm9yc30gZnJvbSAnLi9lMmVfdXRpbCc7XG5cbnZhciBiZW5jaHByZXNzID0gZ2xvYmFsWydiZW5jaHByZXNzJ107XG52YXIgYmluZCA9IGJlbmNocHJlc3MuYmluZDtcbnZhciBPcHRpb25zID0gYmVuY2hwcmVzcy5PcHRpb25zO1xuXG5leHBvcnQgZnVuY3Rpb24gcnVuQ2xpY2tCZW5jaG1hcmsoY29uZmlnKSB7XG4gIGJyb3dzZXIuaWdub3JlU3luY2hyb25pemF0aW9uID0gIWNvbmZpZy53YWl0Rm9yQW5ndWxhcjI7XG4gIHZhciBidXR0b25zID0gY29uZmlnLmJ1dHRvbnMubWFwKGZ1bmN0aW9uKHNlbGVjdG9yKSB7IHJldHVybiAkKHNlbGVjdG9yKTsgfSk7XG4gIGNvbmZpZy53b3JrID0gZnVuY3Rpb24oKSB7IGJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHsgYnV0dG9uLmNsaWNrKCk7IH0pOyB9O1xuICByZXR1cm4gcnVuQmVuY2htYXJrKGNvbmZpZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5CZW5jaG1hcmsoY29uZmlnKSB7XG4gIHJldHVybiBnZXRTY2FsZUZhY3Rvcihicm93c2VyLnBhcmFtcy5iZW5jaG1hcmsuc2NhbGluZylcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHNjYWxlRmFjdG9yKSB7XG4gICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IHt9O1xuICAgICAgICB2YXIgdXJsUGFyYW1zID0gW107XG4gICAgICAgIGlmIChjb25maWcucGFyYW1zKSB7XG4gICAgICAgICAgY29uZmlnLnBhcmFtcy5mb3JFYWNoKGZ1bmN0aW9uKHBhcmFtKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IHBhcmFtLm5hbWU7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBhcHBseVNjYWxlRmFjdG9yKHBhcmFtLnZhbHVlLCBzY2FsZUZhY3RvciwgcGFyYW0uc2NhbGUpO1xuICAgICAgICAgICAgdXJsUGFyYW1zLnB1c2gobmFtZSArICc9JyArIHZhbHVlKTtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVybCA9IGVuY29kZVVSSShjb25maWcudXJsICsgJz8nICsgdXJsUGFyYW1zLmpvaW4oJyYnKSk7XG4gICAgICAgIHJldHVybiBicm93c2VyLmdldCh1cmwpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGdsb2JhbFsnYmVuY2hwcmVzc1J1bm5lciddLnNhbXBsZSh7XG4gICAgICAgICAgICBpZDogY29uZmlnLmlkLFxuICAgICAgICAgICAgZXhlY3V0ZTogY29uZmlnLndvcmssXG4gICAgICAgICAgICBwcmVwYXJlOiBjb25maWcucHJlcGFyZSxcbiAgICAgICAgICAgIG1pY3JvTWV0cmljczogY29uZmlnLm1pY3JvTWV0cmljcyxcbiAgICAgICAgICAgIGJpbmRpbmdzOiBbYmluZChPcHRpb25zLlNBTVBMRV9ERVNDUklQVElPTikudG9WYWx1ZShkZXNjcmlwdGlvbildXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFNjYWxlRmFjdG9yKHBvc3NpYmxlU2NhbGluZ3MpIHtcbiAgcmV0dXJuIGJyb3dzZXIuZXhlY3V0ZVNjcmlwdCgncmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQnKVxuICAgICAgLnRoZW4oZnVuY3Rpb24odXNlckFnZW50OiBzdHJpbmcpIHtcbiAgICAgICAgdmFyIHNjYWxlRmFjdG9yID0gMTtcbiAgICAgICAgcG9zc2libGVTY2FsaW5ncy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgaWYgKHVzZXJBZ2VudC5tYXRjaChlbnRyeS51c2VyQWdlbnQpKSB7XG4gICAgICAgICAgICBzY2FsZUZhY3RvciA9IGVudHJ5LnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzY2FsZUZhY3RvcjtcbiAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBhcHBseVNjYWxlRmFjdG9yKHZhbHVlLCBzY2FsZUZhY3RvciwgbWV0aG9kKSB7XG4gIGlmIChtZXRob2QgPT09ICdsb2cyJykge1xuICAgIHJldHVybiB2YWx1ZSArIE1hdGgubG9nKHNjYWxlRmFjdG9yKSAvIE1hdGguTE4yO1xuICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ3NxcnQnKSB7XG4gICAgcmV0dXJuIHZhbHVlICogTWF0aC5zcXJ0KHNjYWxlRmFjdG9yKTtcbiAgfSBlbHNlIGlmIChtZXRob2QgPT09ICdsaW5lYXInKSB7XG4gICAgcmV0dXJuIHZhbHVlICogc2NhbGVGYWN0b3I7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
