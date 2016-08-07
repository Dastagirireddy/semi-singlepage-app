System.register(['./websocket', './utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var webSocketPatch, utils_1;
    var eventNames, unboundKey;
    function propertyDescriptorPatch(_global) {
        if (utils_1.isNode) {
            return;
        }
        var supportsWebSocket = typeof WebSocket !== 'undefined';
        if (canPatchViaPropertyDescriptor()) {
            // for browsers that we can patch the descriptor:  Chrome & Firefox
            if (utils_1.isBrowser) {
                utils_1.patchOnProperties(HTMLElement.prototype, eventNames);
            }
            utils_1.patchOnProperties(XMLHttpRequest.prototype, null);
            if (typeof IDBIndex !== 'undefined') {
                utils_1.patchOnProperties(IDBIndex.prototype, null);
                utils_1.patchOnProperties(IDBRequest.prototype, null);
                utils_1.patchOnProperties(IDBOpenDBRequest.prototype, null);
                utils_1.patchOnProperties(IDBDatabase.prototype, null);
                utils_1.patchOnProperties(IDBTransaction.prototype, null);
                utils_1.patchOnProperties(IDBCursor.prototype, null);
            }
            if (supportsWebSocket) {
                utils_1.patchOnProperties(WebSocket.prototype, null);
            }
        }
        else {
            // Safari, Android browsers (Jelly Bean)
            patchViaCapturingAllTheEvents();
            utils_1.patchClass('XMLHttpRequest');
            if (supportsWebSocket) {
                webSocketPatch.apply(_global);
            }
        }
    }
    exports_1("propertyDescriptorPatch", propertyDescriptorPatch);
    function canPatchViaPropertyDescriptor() {
        if (utils_1.isBrowser && !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onclick')
            && typeof Element !== 'undefined') {
            // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
            // IDL interface attributes are not configurable
            var desc = Object.getOwnPropertyDescriptor(Element.prototype, 'onclick');
            if (desc && !desc.configurable)
                return false;
        }
        Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {
            get: function () {
                return true;
            }
        });
        var req = new XMLHttpRequest();
        var result = !!req.onreadystatechange;
        Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {});
        return result;
    }
    // Whenever any eventListener fires, we check the eventListener target and all parents
    // for `onwhatever` properties and replace them with zone-bound functions
    // - Chrome (for now)
    function patchViaCapturingAllTheEvents() {
        for (var i = 0; i < eventNames.length; i++) {
            var property = eventNames[i];
            var onproperty = 'on' + property;
            document.addEventListener(property, function (event) {
                var elt = event.target, bound;
                var source = elt.constructor['name'] + '.' + onproperty;
                while (elt) {
                    if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                        bound = Zone.current.wrap(elt[onproperty], source);
                        bound[unboundKey] = elt[onproperty];
                        elt[onproperty] = bound;
                    }
                    elt = elt.parentElement;
                }
            }, true);
        }
        ;
    }
    return {
        setters:[
            function (webSocketPatch_1) {
                webSocketPatch = webSocketPatch_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            eventNames = 'copy cut paste abort blur focus canplay canplaythrough change click contextmenu dblclick drag dragend dragenter dragleave dragover dragstart drop durationchange emptied ended input invalid keydown keypress keyup load loadeddata loadedmetadata loadstart message mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup pause play playing progress ratechange reset scroll seeked seeking select show stalled submit suspend timeupdate volumechange waiting mozfullscreenchange mozfullscreenerror mozpointerlockchange mozpointerlockerror error webglcontextrestored webglcontextlost webglcontextcreationerror'.split(' ');
            ;
            unboundKey = utils_1.zoneSymbol('unbound');
            ;
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvem9uZS5qcy9saWIvYnJvd3Nlci9wcm9wZXJ0eS1kZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7UUFHSSxVQUFVLEVBdURWLFVBQVU7SUFyRGQsaUNBQXdDLE9BQU87UUFDN0MsRUFBRSxDQUFDLENBQUMsY0FBTSxDQUFDLENBQUEsQ0FBQztZQUNWLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxJQUFJLGlCQUFpQixHQUFHLE9BQU8sU0FBUyxLQUFLLFdBQVcsQ0FBQztRQUN6RCxFQUFFLENBQUMsQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQyxtRUFBbUU7WUFDbkUsRUFBRSxDQUFDLENBQUMsaUJBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QseUJBQWlCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN2RCxDQUFDO1lBQ0QseUJBQWlCLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsRCxFQUFFLENBQUMsQ0FBQyxPQUFPLFFBQVEsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyx5QkFBaUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM1Qyx5QkFBaUIsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM5Qyx5QkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3BELHlCQUFpQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLHlCQUFpQixDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2xELHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFD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LENBQUM7SUFDSixDQUFDOzs7Ozs7Ozs7O1lBN0VHLFVBQVUsR0FBRyx1bUJBQXVtQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQXFEbm9CLENBQUM7WUFFRSxVQUFVLEdBQUcsa0JBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQXNCdEMsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL3pvbmUuanMvbGliL2Jyb3dzZXIvcHJvcGVydHktZGVzY3JpcHRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHdlYlNvY2tldFBhdGNoIGZyb20gJy4vd2Vic29ja2V0JztcbmltcG9ydCB7em9uZVN5bWJvbCwgcGF0Y2hPblByb3BlcnRpZXMsIHBhdGNoQ2xhc3MsIGlzQnJvd3NlciwgaXNOb2RlfSBmcm9tICcuL3V0aWxzJztcblxudmFyIGV2ZW50TmFtZXMgPSAnY29weSBjdXQgcGFzdGUgYWJvcnQgYmx1ciBmb2N1cyBjYW5wbGF5IGNhbnBsYXl0aHJvdWdoIGNoYW5nZSBjbGljayBjb250ZXh0bWVudSBkYmxjbGljayBkcmFnIGRyYWdlbmQgZHJhZ2VudGVyIGRyYWdsZWF2ZSBkcmFnb3ZlciBkcmFnc3RhcnQgZHJvcCBkdXJhdGlvbmNoYW5nZSBlbXB0aWVkIGVuZGVkIGlucHV0IGludmFsaWQga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBsb2FkIGxvYWRlZGRhdGEgbG9hZGVkbWV0YWRhdGEgbG9hZHN0YXJ0IG1lc3NhZ2UgbW91c2Vkb3duIG1vdXNlZW50ZXIgbW91c2VsZWF2ZSBtb3VzZW1vdmUgbW91c2VvdXQgbW91c2VvdmVyIG1vdXNldXAgcGF1c2UgcGxheSBwbGF5aW5nIHByb2dyZXNzIHJhdGVjaGFuZ2UgcmVzZXQgc2Nyb2xsIHNlZWtlZCBzZWVraW5nIHNlbGVjdCBzaG93IHN0YWxsZWQgc3VibWl0IHN1c3BlbmQgdGltZXVwZGF0ZSB2b2x1bWVjaGFuZ2Ugd2FpdGluZyBtb3pmdWxsc2NyZWVuY2hhbmdlIG1vemZ1bGxzY3JlZW5lcnJvciBtb3pwb2ludGVybG9ja2NoYW5nZSBtb3pwb2ludGVybG9ja2Vycm9yIGVycm9yIHdlYmdsY29udGV4dHJlc3RvcmVkIHdlYmdsY29udGV4dGxvc3Qgd2ViZ2xjb250ZXh0Y3JlYXRpb25lcnJvcicuc3BsaXQoJyAnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHByb3BlcnR5RGVzY3JpcHRvclBhdGNoKF9nbG9iYWwpIHtcbiAgaWYgKGlzTm9kZSl7XG4gICAgcmV0dXJuO1xuICB9XG4gIFxuICB2YXIgc3VwcG9ydHNXZWJTb2NrZXQgPSB0eXBlb2YgV2ViU29ja2V0ICE9PSAndW5kZWZpbmVkJztcbiAgaWYgKGNhblBhdGNoVmlhUHJvcGVydHlEZXNjcmlwdG9yKCkpIHtcbiAgICAvLyBmb3IgYnJvd3NlcnMgdGhhdCB3ZSBjYW4gcGF0Y2ggdGhlIGRlc2NyaXB0b3I6ICBDaHJvbWUgJiBGaXJlZm94XG4gICAgaWYgKGlzQnJvd3Nlcikge1xuICAgICAgcGF0Y2hPblByb3BlcnRpZXMoSFRNTEVsZW1lbnQucHJvdG90eXBlLCBldmVudE5hbWVzKTtcbiAgICB9XG4gICAgcGF0Y2hPblByb3BlcnRpZXMoWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLCBudWxsKTtcbiAgICBpZiAodHlwZW9mIElEQkluZGV4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcGF0Y2hPblByb3BlcnRpZXMoSURCSW5kZXgucHJvdG90eXBlLCBudWxsKTtcbiAgICAgIHBhdGNoT25Qcm9wZXJ0aWVzKElEQlJlcXVlc3QucHJvdG90eXBlLCBudWxsKTtcbiAgICAgIHBhdGNoT25Qcm9wZXJ0aWVzKElEQk9wZW5EQlJlcXVlc3QucHJvdG90eXBlLCBudWxsKTtcbiAgICAgIHBhdGNoT25Qcm9wZXJ0aWVzKElEQkRhdGFiYXNlLnByb3RvdHlwZSwgbnVsbCk7XG4gICAgICBwYXRjaE9uUHJvcGVydGllcyhJREJUcmFuc2FjdGlvbi5wcm90b3R5cGUsIG51bGwpO1xuICAgICAgcGF0Y2hPblByb3BlcnRpZXMoSURCQ3Vyc29yLnByb3RvdHlwZSwgbnVsbCk7XG4gICAgfVxuICAgIGlmIChzdXBwb3J0c1dlYlNvY2tldCkge1xuICAgICAgcGF0Y2hPblByb3BlcnRpZXMoV2ViU29ja2V0LnByb3RvdHlwZSwgbnVsbCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFNhZmFyaSwgQW5kcm9pZCBicm93c2VycyAoSmVsbHkgQmVhbilcbiAgICBwYXRjaFZpYUNhcHR1cmluZ0FsbFRoZUV2ZW50cygpO1xuICAgIHBhdGNoQ2xhc3MoJ1hNTEh0dHBSZXF1ZXN0Jyk7XG4gICAgaWYgKHN1cHBvcnRzV2ViU29ja2V0KSB7XG4gICAgICB3ZWJTb2NrZXRQYXRjaC5hcHBseShfZ2xvYmFsKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FuUGF0Y2hWaWFQcm9wZXJ0eURlc2NyaXB0b3IoKSB7XG4gIGlmIChpc0Jyb3dzZXIgJiYgIU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoSFRNTEVsZW1lbnQucHJvdG90eXBlLCAnb25jbGljaycpXG4gICAgICAmJiB0eXBlb2YgRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBXZWJLaXQgaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEzNDM2NFxuICAgIC8vIElETCBpbnRlcmZhY2UgYXR0cmlidXRlcyBhcmUgbm90IGNvbmZpZ3VyYWJsZVxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFbGVtZW50LnByb3RvdHlwZSwgJ29uY2xpY2snKTtcbiAgICBpZiAoZGVzYyAmJiAhZGVzYy5jb25maWd1cmFibGUpIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsICdvbnJlYWR5c3RhdGVjaGFuZ2UnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICB2YXIgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHZhciByZXN1bHQgPSAhIXJlcS5vbnJlYWR5c3RhdGVjaGFuZ2U7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsICdvbnJlYWR5c3RhdGVjaGFuZ2UnLCB7fSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG52YXIgdW5ib3VuZEtleSA9IHpvbmVTeW1ib2woJ3VuYm91bmQnKTtcblxuLy8gV2hlbmV2ZXIgYW55IGV2ZW50TGlzdGVuZXIgZmlyZXMsIHdlIGNoZWNrIHRoZSBldmVudExpc3RlbmVyIHRhcmdldCBhbmQgYWxsIHBhcmVudHNcbi8vIGZvciBgb253aGF0ZXZlcmAgcHJvcGVydGllcyBhbmQgcmVwbGFjZSB0aGVtIHdpdGggem9uZS1ib3VuZCBmdW5jdGlvbnNcbi8vIC0gQ2hyb21lIChmb3Igbm93KVxuZnVuY3Rpb24gcGF0Y2hWaWFDYXB0dXJpbmdBbGxUaGVFdmVudHMoKSB7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBldmVudE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHByb3BlcnR5ID0gZXZlbnROYW1lc1tpXTtcbiAgICB2YXIgb25wcm9wZXJ0eSA9ICdvbicgKyBwcm9wZXJ0eTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHByb3BlcnR5LCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciBlbHQgPSA8Tm9kZT5ldmVudC50YXJnZXQsIGJvdW5kO1xuICAgICAgdmFyIHNvdXJjZSA9IGVsdC5jb25zdHJ1Y3RvclsnbmFtZSddICsgJy4nICsgb25wcm9wZXJ0eTtcbiAgICAgIHdoaWxlIChlbHQpIHtcbiAgICAgICAgaWYgKGVsdFtvbnByb3BlcnR5XSAmJiAhZWx0W29ucHJvcGVydHldW3VuYm91bmRLZXldKSB7XG4gICAgICAgICAgYm91bmQgPSBab25lLmN1cnJlbnQud3JhcChlbHRbb25wcm9wZXJ0eV0sIHNvdXJjZSk7XG4gICAgICAgICAgYm91bmRbdW5ib3VuZEtleV0gPSBlbHRbb25wcm9wZXJ0eV07XG4gICAgICAgICAgZWx0W29ucHJvcGVydHldID0gYm91bmQ7XG4gICAgICAgIH1cbiAgICAgICAgZWx0ID0gZWx0LnBhcmVudEVsZW1lbnQ7XG4gICAgICB9XG4gICAgfSwgdHJ1ZSk7XG4gIH07XG59O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
