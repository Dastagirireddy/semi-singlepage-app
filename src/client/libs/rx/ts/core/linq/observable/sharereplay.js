/// <reference path="./multicast.ts" />
(function () {
    var o;
    var oc;
    var is;
    var s;
    var a;
    o = o.shareReplay();
    o = o.shareReplay(1);
    o = o.shareReplay(1, 2);
    o = o.shareReplay(1, 2, Rx.Scheduler.default);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9saW5xL29ic2VydmFibGUvc2hhcmVyZXBsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQUFDQSx1Q0FEdUM7QUFzQnZDLENBQUM7SUFDRyxJQUFJLENBQXdCLENBQUM7SUFDN0IsSUFBSSxFQUFvQyxDQUFDO0lBQ3pDLElBQUksRUFBdUIsQ0FBQztJQUM1QixJQUFJLENBQXFCLENBQUM7SUFDMUIsSUFBSSxDQUF3QixDQUFDO0lBRTdCLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL3J4L3RzL2NvcmUvbGlucS9vYnNlcnZhYmxlL3NoYXJlcmVwbGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vbXVsdGljYXN0LnRzXCIgLz5cbm1vZHVsZSBSeCB7XG4gICAgZXhwb3J0IGludGVyZmFjZSBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgLyoqXG4gICAgICAgICogUmV0dXJucyBhbiBvYnNlcnZhYmxlIHNlcXVlbmNlIHRoYXQgc2hhcmVzIGEgc2luZ2xlIHN1YnNjcmlwdGlvbiB0byB0aGUgdW5kZXJseWluZyBzZXF1ZW5jZSByZXBsYXlpbmcgbm90aWZpY2F0aW9ucyBzdWJqZWN0IHRvIGEgbWF4aW11bSB0aW1lIGxlbmd0aCBmb3IgdGhlIHJlcGxheSBidWZmZXIuXG4gICAgICAgICogVGhpcyBvcGVyYXRvciBpcyBhIHNwZWNpYWxpemF0aW9uIG9mIHJlcGxheSB3aGljaCBjcmVhdGVzIGEgc3Vic2NyaXB0aW9uIHdoZW4gdGhlIG51bWJlciBvZiBvYnNlcnZlcnMgZ29lcyBmcm9tIHplcm8gdG8gb25lLCB0aGVuIHNoYXJlcyB0aGF0IHN1YnNjcmlwdGlvbiB3aXRoIGFsbCBzdWJzZXF1ZW50IG9ic2VydmVycyB1bnRpbCB0aGUgbnVtYmVyIG9mIG9ic2VydmVycyByZXR1cm5zIHRvIHplcm8sIGF0IHdoaWNoIHBvaW50IHRoZSBzdWJzY3JpcHRpb24gaXMgZGlzcG9zZWQuXG4gICAgICAgICpcbiAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAqIHZhciByZXMgPSBzb3VyY2Uuc2hhcmVSZXBsYXkoMyk7XG4gICAgICAgICogdmFyIHJlcyA9IHNvdXJjZS5zaGFyZVJlcGxheSgzLCA1MDApO1xuICAgICAgICAqIHZhciByZXMgPSBzb3VyY2Uuc2hhcmVSZXBsYXkoMywgNTAwLCBzY2hlZHVsZXIpO1xuICAgICAgICAqXG5cbiAgICAgICAgKiBAcGFyYW0gYnVmZmVyU2l6ZSBbT3B0aW9uYWxdIE1heGltdW0gZWxlbWVudCBjb3VudCBvZiB0aGUgcmVwbGF5IGJ1ZmZlci5cbiAgICAgICAgKiBAcGFyYW0gd2luZG93IFtPcHRpb25hbF0gTWF4aW11bSB0aW1lIGxlbmd0aCBvZiB0aGUgcmVwbGF5IGJ1ZmZlci5cbiAgICAgICAgKiBAcGFyYW0gc2NoZWR1bGVyIFtPcHRpb25hbF0gU2NoZWR1bGVyIHdoZXJlIGNvbm5lY3RlZCBvYnNlcnZlcnMgd2l0aGluIHRoZSBzZWxlY3RvciBmdW5jdGlvbiB3aWxsIGJlIGludm9rZWQgb24uXG4gICAgICAgICogQHJldHVybnMge09ic2VydmFibGV9IEFuIG9ic2VydmFibGUgc2VxdWVuY2UgdGhhdCBjb250YWlucyB0aGUgZWxlbWVudHMgb2YgYSBzZXF1ZW5jZSBwcm9kdWNlZCBieSBtdWx0aWNhc3RpbmcgdGhlIHNvdXJjZSBzZXF1ZW5jZS5cbiAgICAgICAgKi9cbiAgICAgICAgc2hhcmVSZXBsYXkoYnVmZmVyU2l6ZT86IG51bWJlciwgd2luZG93PzogbnVtYmVyLCBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKTogT2JzZXJ2YWJsZTxUPjtcbiAgICB9XG59XG5cbihmdW5jdGlvbigpIHtcbiAgICB2YXIgbzogUnguT2JzZXJ2YWJsZTxudW1iZXI+O1xuICAgIHZhciBvYzogUnguQ29ubmVjdGFibGVPYnNlcnZhYmxlPG51bWJlcj47XG4gICAgdmFyIGlzOiBSeC5JU3ViamVjdDxudW1iZXI+O1xuICAgIHZhciBzOiBSeC5TdWJqZWN0PG51bWJlcj47XG4gICAgdmFyIGE6IFJ4Lk9ic2VydmFibGU8c3RyaW5nPjtcblxuICAgIG8gPSBvLnNoYXJlUmVwbGF5KCk7XG4gICAgbyA9IG8uc2hhcmVSZXBsYXkoMSk7XG4gICAgbyA9IG8uc2hhcmVSZXBsYXkoMSwyKTtcbiAgICBvID0gby5zaGFyZVJlcGxheSgxLDIsIFJ4LlNjaGVkdWxlci5kZWZhdWx0KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9