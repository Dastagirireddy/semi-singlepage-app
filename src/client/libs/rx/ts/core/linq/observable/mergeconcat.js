/// <reference path="../../observable.ts" />
(function () {
    var o;
    var oo;
    var p;
    o = oo.merge(1);
    o = o.merge(p);
    o = o.merge(o);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9saW5xL29ic2VydmFibGUvbWVyZ2Vjb25jYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQUFDQSw0Q0FENEM7QUE0QjVDLENBQUM7SUFDRyxJQUFJLENBQXdCLENBQUM7SUFDN0IsSUFBSSxFQUF3QyxDQUFDO0lBQzdDLElBQUksQ0FBcUIsQ0FBQztJQUUxQixDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNmLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25CLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9saW5xL29ic2VydmFibGUvbWVyZ2Vjb25jYXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vb2JzZXJ2YWJsZS50c1wiIC8+XG5tb2R1bGUgUngge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgT2JzZXJ2YWJsZTxUPiB7XG4gICAgICAgIC8qKlxuICAgICAgICAqIE1lcmdlcyBhbiBvYnNlcnZhYmxlIHNlcXVlbmNlIG9mIG9ic2VydmFibGUgc2VxdWVuY2VzIGludG8gYW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZSwgbGltaXRpbmcgdGhlIG51bWJlciBvZiBjb25jdXJyZW50IHN1YnNjcmlwdGlvbnMgdG8gaW5uZXIgc2VxdWVuY2VzLlxuICAgICAgICAqIE9yIG1lcmdlcyB0d28gb2JzZXJ2YWJsZSBzZXF1ZW5jZXMgaW50byBhIHNpbmdsZSBvYnNlcnZhYmxlIHNlcXVlbmNlLlxuICAgICAgICAqXG4gICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgKiAxIC0gbWVyZ2VkID0gc291cmNlcy5tZXJnZSgxKTtcbiAgICAgICAgKiAyIC0gbWVyZ2VkID0gc291cmNlLm1lcmdlKG90aGVyU291cmNlKTtcbiAgICAgICAgKiBAcGFyYW0ge01peGVkfSBbbWF4Q29uY3VycmVudE9yT3RoZXJdIE1heGltdW0gbnVtYmVyIG9mIGlubmVyIG9ic2VydmFibGUgc2VxdWVuY2VzIGJlaW5nIHN1YnNjcmliZWQgdG8gY29uY3VycmVudGx5IG9yIHRoZSBzZWNvbmQgb2JzZXJ2YWJsZSBzZXF1ZW5jZS5cbiAgICAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZX0gVGhlIG9ic2VydmFibGUgc2VxdWVuY2UgdGhhdCBtZXJnZXMgdGhlIGVsZW1lbnRzIG9mIHRoZSBpbm5lciBzZXF1ZW5jZXMuXG4gICAgICAgICovXG4gICAgICAgIG1lcmdlKG1heENvbmN1cnJlbnQ6IG51bWJlcik6IFQ7XG4gICAgICAgIC8qKlxuICAgICAgICAqIE1lcmdlcyBhbiBvYnNlcnZhYmxlIHNlcXVlbmNlIG9mIG9ic2VydmFibGUgc2VxdWVuY2VzIGludG8gYW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZSwgbGltaXRpbmcgdGhlIG51bWJlciBvZiBjb25jdXJyZW50IHN1YnNjcmlwdGlvbnMgdG8gaW5uZXIgc2VxdWVuY2VzLlxuICAgICAgICAqIE9yIG1lcmdlcyB0d28gb2JzZXJ2YWJsZSBzZXF1ZW5jZXMgaW50byBhIHNpbmdsZSBvYnNlcnZhYmxlIHNlcXVlbmNlLlxuICAgICAgICAqXG4gICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgKiAxIC0gbWVyZ2VkID0gc291cmNlcy5tZXJnZSgxKTtcbiAgICAgICAgKiAyIC0gbWVyZ2VkID0gc291cmNlLm1lcmdlKG90aGVyU291cmNlKTtcbiAgICAgICAgKiBAcGFyYW0ge01peGVkfSBbbWF4Q29uY3VycmVudE9yT3RoZXJdIE1heGltdW0gbnVtYmVyIG9mIGlubmVyIG9ic2VydmFibGUgc2VxdWVuY2VzIGJlaW5nIHN1YnNjcmliZWQgdG8gY29uY3VycmVudGx5IG9yIHRoZSBzZWNvbmQgb2JzZXJ2YWJsZSBzZXF1ZW5jZS5cbiAgICAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZX0gVGhlIG9ic2VydmFibGUgc2VxdWVuY2UgdGhhdCBtZXJnZXMgdGhlIGVsZW1lbnRzIG9mIHRoZSBpbm5lciBzZXF1ZW5jZXMuXG4gICAgICAgICovXG4gICAgICAgIG1lcmdlKG90aGVyOiBPYnNlcnZhYmxlT3JQcm9taXNlPFQ+KTogT2JzZXJ2YWJsZTxUPjtcbiAgICB9XG59XG5cbihmdW5jdGlvbigpIHtcbiAgICB2YXIgbzogUnguT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICAgIHZhciBvbzogUnguT2JzZXJ2YWJsZTxSeC5PYnNlcnZhYmxlPHN0cmluZz4+O1xuICAgIHZhciBwOiBSeC5Qcm9taXNlPHN0cmluZz47XG5cbiAgICBvID0gb28ubWVyZ2UoMSk7XG4gICAgbyA9IG8ubWVyZ2UocCk7XG4gICAgbyA9IG8ubWVyZ2Uobyk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==