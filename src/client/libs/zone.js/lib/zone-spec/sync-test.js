(function () {
    var SyncTestZoneSpec = (function () {
        function SyncTestZoneSpec(namePrefix) {
            this.runZone = Zone.current;
            this.name = 'syncTestZone for ' + namePrefix;
        }
        SyncTestZoneSpec.prototype.onScheduleTask = function (delegate, current, target, task) {
            switch (task.type) {
                case 'microTask':
                case 'macroTask':
                    throw new Error("Cannot call " + task.source + " from within a sync test.");
                case 'eventTask':
                    task = delegate.scheduleTask(target, task);
                    break;
            }
            return task;
        };
        return SyncTestZoneSpec;
    }());
    // Export the class so that new instances can be created with proper
    // constructor params.
    Zone['SyncTestZoneSpec'] = SyncTestZoneSpec;
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvem9uZS5qcy9saWIvem9uZS1zcGVjL3N5bmMtdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxDQUFDO0lBQ0M7UUFHRSwwQkFBWSxVQUFrQjtZQUY5QixZQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUdyQixJQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFtQixHQUFHLFVBQVUsQ0FBQztRQUMvQyxDQUFDO1FBTUQseUNBQWMsR0FBZCxVQUFlLFFBQXNCLEVBQUUsT0FBYSxFQUFFLE1BQVksRUFBRSxJQUFVO1lBQzVFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixLQUFLLFdBQVcsQ0FBQztnQkFDakIsS0FBSyxXQUFXO29CQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWUsSUFBSSxDQUFDLE1BQU0sOEJBQTJCLENBQUMsQ0FBQztnQkFDekUsS0FBSyxXQUFXO29CQUNkLElBQUksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDM0MsS0FBSyxDQUFDO1lBQ1YsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0gsdUJBQUM7SUFBRCxDQXRCQSxBQXNCQyxJQUFBO0lBRUQsb0VBQW9FO0lBQ3BFLHNCQUFzQjtJQUN0QixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztBQUM5QyxDQUFDLENBQUMsRUFBRSxDQUFDIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvem9uZS5qcy9saWIvem9uZS1zcGVjL3N5bmMtdGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbiAgY2xhc3MgU3luY1Rlc3Rab25lU3BlYyBpbXBsZW1lbnRzIFpvbmVTcGVjIHtcbiAgICBydW5ab25lID0gWm9uZS5jdXJyZW50O1xuXG4gICAgY29uc3RydWN0b3IobmFtZVByZWZpeDogc3RyaW5nKSB7XG4gICAgICB0aGlzLm5hbWUgPSAnc3luY1Rlc3Rab25lIGZvciAnICsgbmFtZVByZWZpeDtcbiAgICB9XG5cbiAgICAvLyBab25lU3BlYyBpbXBsZW1lbnRhdGlvbiBiZWxvdy5cblxuICAgIG5hbWU6IHN0cmluZztcblxuICAgIG9uU2NoZWR1bGVUYXNrKGRlbGVnYXRlOiBab25lRGVsZWdhdGUsIGN1cnJlbnQ6IFpvbmUsIHRhcmdldDogWm9uZSwgdGFzazogVGFzayk6IFRhc2sge1xuICAgICAgc3dpdGNoICh0YXNrLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbWljcm9UYXNrJzpcbiAgICAgICAgY2FzZSAnbWFjcm9UYXNrJzpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBjYWxsICR7dGFzay5zb3VyY2V9IGZyb20gd2l0aGluIGEgc3luYyB0ZXN0LmApO1xuICAgICAgICBjYXNlICdldmVudFRhc2snOlxuICAgICAgICAgIHRhc2sgPSBkZWxlZ2F0ZS5zY2hlZHVsZVRhc2sodGFyZ2V0LCB0YXNrKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiB0YXNrO1xuICAgIH1cbiAgfVxuXG4gIC8vIEV4cG9ydCB0aGUgY2xhc3Mgc28gdGhhdCBuZXcgaW5zdGFuY2VzIGNhbiBiZSBjcmVhdGVkIHdpdGggcHJvcGVyXG4gIC8vIGNvbnN0cnVjdG9yIHBhcmFtcy5cbiAgWm9uZVsnU3luY1Rlc3Rab25lU3BlYyddID0gU3luY1Rlc3Rab25lU3BlYztcbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
