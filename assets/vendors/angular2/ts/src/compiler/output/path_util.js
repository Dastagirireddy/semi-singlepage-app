System.register(['angular2/src/facade/exceptions', 'angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var exceptions_1, lang_1;
    var _ASSET_URL_RE, _PATH_SEP, _PATH_SEP_RE, ImportEnv, _AssetUrl;
    /**
     * Returns the module path to use for an import.
     */
    function getImportModulePath(moduleUrlStr, importedUrlStr, importEnv) {
        var absolutePathPrefix = importEnv === ImportEnv.Dart ? "package:" : '';
        var moduleUrl = _AssetUrl.parse(moduleUrlStr, false);
        var importedUrl = _AssetUrl.parse(importedUrlStr, true);
        if (lang_1.isBlank(importedUrl)) {
            return importedUrlStr;
        }
        // Try to create a relative path first
        if (moduleUrl.firstLevelDir == importedUrl.firstLevelDir &&
            moduleUrl.packageName == importedUrl.packageName) {
            return getRelativePath(moduleUrl.modulePath, importedUrl.modulePath, importEnv);
        }
        else if (importedUrl.firstLevelDir == 'lib') {
            return "" + absolutePathPrefix + importedUrl.packageName + "/" + importedUrl.modulePath;
        }
        throw new exceptions_1.BaseException("Can't import url " + importedUrlStr + " from " + moduleUrlStr);
    }
    exports_1("getImportModulePath", getImportModulePath);
    function getRelativePath(modulePath, importedPath, importEnv) {
        var moduleParts = modulePath.split(_PATH_SEP_RE);
        var importedParts = importedPath.split(_PATH_SEP_RE);
        var longestPrefix = getLongestPathSegmentPrefix(moduleParts, importedParts);
        var resultParts = [];
        var goParentCount = moduleParts.length - 1 - longestPrefix;
        for (var i = 0; i < goParentCount; i++) {
            resultParts.push('..');
        }
        if (goParentCount <= 0 && importEnv === ImportEnv.JS) {
            resultParts.push('.');
        }
        for (var i = longestPrefix; i < importedParts.length; i++) {
            resultParts.push(importedParts[i]);
        }
        return resultParts.join(_PATH_SEP);
    }
    exports_1("getRelativePath", getRelativePath);
    function getLongestPathSegmentPrefix(arr1, arr2) {
        var prefixSize = 0;
        var minLen = lang_1.Math.min(arr1.length, arr2.length);
        while (prefixSize < minLen && arr1[prefixSize] == arr2[prefixSize]) {
            prefixSize++;
        }
        return prefixSize;
    }
    exports_1("getLongestPathSegmentPrefix", getLongestPathSegmentPrefix);
    return {
        setters:[
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            // asset:<package-name>/<realm>/<path-to-module>
            _ASSET_URL_RE = /asset:([^\/]+)\/([^\/]+)\/(.+)/g;
            _PATH_SEP = '/';
            _PATH_SEP_RE = /\//g;
            (function (ImportEnv) {
                ImportEnv[ImportEnv["Dart"] = 0] = "Dart";
                ImportEnv[ImportEnv["JS"] = 1] = "JS";
            })(ImportEnv || (ImportEnv = {}));
            exports_1("ImportEnv", ImportEnv);
            _AssetUrl = (function () {
                function _AssetUrl(packageName, firstLevelDir, modulePath) {
                    this.packageName = packageName;
                    this.firstLevelDir = firstLevelDir;
                    this.modulePath = modulePath;
                }
                _AssetUrl.parse = function (url, allowNonMatching) {
                    var match = lang_1.RegExpWrapper.firstMatch(_ASSET_URL_RE, url);
                    if (lang_1.isPresent(match)) {
                        return new _AssetUrl(match[1], match[2], match[3]);
                    }
                    if (allowNonMatching) {
                        return null;
                    }
                    throw new exceptions_1.BaseException("Url " + url + " is not a valid asset: url");
                };
                return _AssetUrl;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy9jb21waWxlci9vdXRwdXQvcGF0aF91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFJSSxhQUFhLEVBRWIsU0FBUyxFQUNULFlBQVk7SUFPaEI7O09BRUc7SUFDSCw2QkFBb0MsWUFBb0IsRUFBRSxjQUFzQixFQUM1QyxTQUFvQjtRQUN0RCxJQUFJLGtCQUFrQixHQUFXLFNBQVMsS0FBSyxTQUFTLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEYsSUFBSSxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEQsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ3hCLENBQUM7UUFFRCxzQ0FBc0M7UUFDdEMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGFBQWEsSUFBSSxXQUFXLENBQUMsYUFBYTtZQUNwRCxTQUFTLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxLQUFHLGtCQUFrQixHQUFHLFdBQVcsQ0FBQyxXQUFXLFNBQUksV0FBVyxDQUFDLFVBQVksQ0FBQztRQUNyRixDQUFDO1FBQ0QsTUFBTSxJQUFJLDBCQUFhLENBQUMsc0JBQW9CLGNBQWMsY0FBUyxZQUFjLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBakJELHFEQWlCQyxDQUFBO0lBa0JELHlCQUFnQyxVQUFrQixFQUFFLFlBQW9CLEVBQ3hDLFNBQW9CO1FBQ2xELElBQUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakQsSUFBSSxhQUFhLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRCxJQUFJLGFBQWEsR0FBRywyQkFBMkIsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFNUUsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksYUFBYSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQztRQUMzRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3ZDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksU0FBUyxLQUFLLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JELFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLGFBQWEsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFELFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUNELE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFsQkQsNkNBa0JDLENBQUE7SUFFRCxxQ0FBNEMsSUFBYyxFQUFFLElBQWM7UUFDeEUsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksTUFBTSxHQUFHLFdBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsT0FBTyxVQUFVLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUNuRSxVQUFVLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFQRCxxRUFPQyxDQUFBOzs7Ozs7Ozs7O1lBNUVELGdEQUFnRDtZQUM1QyxhQUFhLEdBQUcsaUNBQWlDLENBQUM7WUFFbEQsU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUNoQixZQUFZLEdBQUcsS0FBSyxDQUFDO1lBRXpCLFdBQVksU0FBUztnQkFDbkIseUNBQUksQ0FBQTtnQkFDSixxQ0FBRSxDQUFBO1lBQ0osQ0FBQyxFQUhXLFNBQVMsS0FBVCxTQUFTLFFBR3BCOzhDQUFBO1lBd0JEO2dCQVlFLG1CQUFtQixXQUFtQixFQUFTLGFBQXFCLEVBQVMsVUFBa0I7b0JBQTVFLGdCQUFXLEdBQVgsV0FBVyxDQUFRO29CQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFRO29CQUFTLGVBQVUsR0FBVixVQUFVLENBQVE7Z0JBQy9GLENBQUM7Z0JBWk0sZUFBSyxHQUFaLFVBQWEsR0FBVyxFQUFFLGdCQUF5QjtvQkFDakQsSUFBSSxLQUFLLEdBQUcsb0JBQWEsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN6RCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckIsTUFBTSxDQUFDLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JELENBQUM7b0JBQ0QsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO3dCQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNkLENBQUM7b0JBQ0QsTUFBTSxJQUFJLDBCQUFhLENBQUMsU0FBTyxHQUFHLCtCQUE0QixDQUFDLENBQUM7Z0JBQ2xFLENBQUM7Z0JBSUgsZ0JBQUM7WUFBRCxDQWRBLEFBY0MsSUFBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvY29tcGlsZXIvb3V0cHV0L3BhdGhfdXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7aXNQcmVzZW50LCBpc0JsYW5rLCBSZWdFeHBXcmFwcGVyLCBNYXRofSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG4vLyBhc3NldDo8cGFja2FnZS1uYW1lPi88cmVhbG0+LzxwYXRoLXRvLW1vZHVsZT5cbnZhciBfQVNTRVRfVVJMX1JFID0gL2Fzc2V0OihbXlxcL10rKVxcLyhbXlxcL10rKVxcLyguKykvZztcblxudmFyIF9QQVRIX1NFUCA9ICcvJztcbnZhciBfUEFUSF9TRVBfUkUgPSAvXFwvL2c7XG5cbmV4cG9ydCBlbnVtIEltcG9ydEVudiB7XG4gIERhcnQsXG4gIEpTXG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbW9kdWxlIHBhdGggdG8gdXNlIGZvciBhbiBpbXBvcnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbXBvcnRNb2R1bGVQYXRoKG1vZHVsZVVybFN0cjogc3RyaW5nLCBpbXBvcnRlZFVybFN0cjogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1wb3J0RW52OiBJbXBvcnRFbnYpOiBzdHJpbmcge1xuICB2YXIgYWJzb2x1dGVQYXRoUHJlZml4OiBzdHJpbmcgPSBpbXBvcnRFbnYgPT09IEltcG9ydEVudi5EYXJ0ID8gYHBhY2thZ2U6YCA6ICcnO1xuICB2YXIgbW9kdWxlVXJsID0gX0Fzc2V0VXJsLnBhcnNlKG1vZHVsZVVybFN0ciwgZmFsc2UpO1xuICB2YXIgaW1wb3J0ZWRVcmwgPSBfQXNzZXRVcmwucGFyc2UoaW1wb3J0ZWRVcmxTdHIsIHRydWUpO1xuICBpZiAoaXNCbGFuayhpbXBvcnRlZFVybCkpIHtcbiAgICByZXR1cm4gaW1wb3J0ZWRVcmxTdHI7XG4gIH1cblxuICAvLyBUcnkgdG8gY3JlYXRlIGEgcmVsYXRpdmUgcGF0aCBmaXJzdFxuICBpZiAobW9kdWxlVXJsLmZpcnN0TGV2ZWxEaXIgPT0gaW1wb3J0ZWRVcmwuZmlyc3RMZXZlbERpciAmJlxuICAgICAgbW9kdWxlVXJsLnBhY2thZ2VOYW1lID09IGltcG9ydGVkVXJsLnBhY2thZ2VOYW1lKSB7XG4gICAgcmV0dXJuIGdldFJlbGF0aXZlUGF0aChtb2R1bGVVcmwubW9kdWxlUGF0aCwgaW1wb3J0ZWRVcmwubW9kdWxlUGF0aCwgaW1wb3J0RW52KTtcbiAgfSBlbHNlIGlmIChpbXBvcnRlZFVybC5maXJzdExldmVsRGlyID09ICdsaWInKSB7XG4gICAgcmV0dXJuIGAke2Fic29sdXRlUGF0aFByZWZpeH0ke2ltcG9ydGVkVXJsLnBhY2thZ2VOYW1lfS8ke2ltcG9ydGVkVXJsLm1vZHVsZVBhdGh9YDtcbiAgfVxuICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgQ2FuJ3QgaW1wb3J0IHVybCAke2ltcG9ydGVkVXJsU3RyfSBmcm9tICR7bW9kdWxlVXJsU3RyfWApO1xufVxuXG5jbGFzcyBfQXNzZXRVcmwge1xuICBzdGF0aWMgcGFyc2UodXJsOiBzdHJpbmcsIGFsbG93Tm9uTWF0Y2hpbmc6IGJvb2xlYW4pOiBfQXNzZXRVcmwge1xuICAgIHZhciBtYXRjaCA9IFJlZ0V4cFdyYXBwZXIuZmlyc3RNYXRjaChfQVNTRVRfVVJMX1JFLCB1cmwpO1xuICAgIGlmIChpc1ByZXNlbnQobWF0Y2gpKSB7XG4gICAgICByZXR1cm4gbmV3IF9Bc3NldFVybChtYXRjaFsxXSwgbWF0Y2hbMl0sIG1hdGNoWzNdKTtcbiAgICB9XG4gICAgaWYgKGFsbG93Tm9uTWF0Y2hpbmcpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgVXJsICR7dXJsfSBpcyBub3QgYSB2YWxpZCBhc3NldDogdXJsYCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFja2FnZU5hbWU6IHN0cmluZywgcHVibGljIGZpcnN0TGV2ZWxEaXI6IHN0cmluZywgcHVibGljIG1vZHVsZVBhdGg6IHN0cmluZykge1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWxhdGl2ZVBhdGgobW9kdWxlUGF0aDogc3RyaW5nLCBpbXBvcnRlZFBhdGg6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1wb3J0RW52OiBJbXBvcnRFbnYpOiBzdHJpbmcge1xuICB2YXIgbW9kdWxlUGFydHMgPSBtb2R1bGVQYXRoLnNwbGl0KF9QQVRIX1NFUF9SRSk7XG4gIHZhciBpbXBvcnRlZFBhcnRzID0gaW1wb3J0ZWRQYXRoLnNwbGl0KF9QQVRIX1NFUF9SRSk7XG4gIHZhciBsb25nZXN0UHJlZml4ID0gZ2V0TG9uZ2VzdFBhdGhTZWdtZW50UHJlZml4KG1vZHVsZVBhcnRzLCBpbXBvcnRlZFBhcnRzKTtcblxuICB2YXIgcmVzdWx0UGFydHMgPSBbXTtcbiAgdmFyIGdvUGFyZW50Q291bnQgPSBtb2R1bGVQYXJ0cy5sZW5ndGggLSAxIC0gbG9uZ2VzdFByZWZpeDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBnb1BhcmVudENvdW50OyBpKyspIHtcbiAgICByZXN1bHRQYXJ0cy5wdXNoKCcuLicpO1xuICB9XG4gIGlmIChnb1BhcmVudENvdW50IDw9IDAgJiYgaW1wb3J0RW52ID09PSBJbXBvcnRFbnYuSlMpIHtcbiAgICByZXN1bHRQYXJ0cy5wdXNoKCcuJyk7XG4gIH1cbiAgZm9yICh2YXIgaSA9IGxvbmdlc3RQcmVmaXg7IGkgPCBpbXBvcnRlZFBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzdWx0UGFydHMucHVzaChpbXBvcnRlZFBhcnRzW2ldKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0UGFydHMuam9pbihfUEFUSF9TRVApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9uZ2VzdFBhdGhTZWdtZW50UHJlZml4KGFycjE6IHN0cmluZ1tdLCBhcnIyOiBzdHJpbmdbXSk6IG51bWJlciB7XG4gIHZhciBwcmVmaXhTaXplID0gMDtcbiAgdmFyIG1pbkxlbiA9IE1hdGgubWluKGFycjEubGVuZ3RoLCBhcnIyLmxlbmd0aCk7XG4gIHdoaWxlIChwcmVmaXhTaXplIDwgbWluTGVuICYmIGFycjFbcHJlZml4U2l6ZV0gPT0gYXJyMltwcmVmaXhTaXplXSkge1xuICAgIHByZWZpeFNpemUrKztcbiAgfVxuICByZXR1cm4gcHJlZml4U2l6ZTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
