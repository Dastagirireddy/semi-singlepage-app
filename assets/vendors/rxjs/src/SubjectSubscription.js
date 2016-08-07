System.register(['./Subscription'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscription_1;
    var SubjectSubscription;
    return {
        setters:[
            function (Subscription_1_1) {
                Subscription_1 = Subscription_1_1;
            }],
        execute: function() {
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            SubjectSubscription = (function (_super) {
                __extends(SubjectSubscription, _super);
                function SubjectSubscription(subject, subscriber) {
                    _super.call(this);
                    this.subject = subject;
                    this.subscriber = subscriber;
                    this.isUnsubscribed = false;
                }
                SubjectSubscription.prototype.unsubscribe = function () {
                    if (this.isUnsubscribed) {
                        return;
                    }
                    this.isUnsubscribed = true;
                    var subject = this.subject;
                    var observers = subject.observers;
                    this.subject = null;
                    if (!observers || observers.length === 0 || subject.isStopped || subject.isUnsubscribed) {
                        return;
                    }
                    var subscriberIndex = observers.indexOf(this.subscriber);
                    if (subscriberIndex !== -1) {
                        observers.splice(subscriberIndex, 1);
                    }
                };
                return SubjectSubscription;
            }(Subscription_1.Subscription));
            exports_1("SubjectSubscription", SubjectSubscription);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL3J4anMvc3JjL1N1YmplY3RTdWJzY3JpcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztZQUlBOzs7O2VBSUc7WUFDSDtnQkFBNEMsdUNBQVk7Z0JBR3RELDZCQUFtQixPQUFtQixFQUFTLFVBQXVCO29CQUNwRSxpQkFBTyxDQUFDO29CQURTLFlBQU8sR0FBUCxPQUFPLENBQVk7b0JBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBYTtvQkFGdEUsbUJBQWMsR0FBWSxLQUFLLENBQUM7Z0JBSWhDLENBQUM7Z0JBRUQseUNBQVcsR0FBWDtvQkFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzt3QkFDeEIsTUFBTSxDQUFDO29CQUNULENBQUM7b0JBRUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7b0JBRTNCLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQzdCLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7b0JBRXBDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUVwQixFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO3dCQUN4RixNQUFNLENBQUM7b0JBQ1QsQ0FBQztvQkFFRCxJQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFM0QsRUFBRSxDQUFDLENBQUMsZUFBZSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLENBQUM7Z0JBQ0gsQ0FBQztnQkFDSCwwQkFBQztZQUFELENBN0JBLEFBNkJDLENBN0IyQywyQkFBWSxHQTZCdkQ7WUE3QkQscURBNkJDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvcnhqcy9zcmMvU3ViamVjdFN1YnNjcmlwdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3ViamVjdH0gZnJvbSAnLi9TdWJqZWN0JztcbmltcG9ydCB7T2JzZXJ2ZXJ9IGZyb20gJy4vT2JzZXJ2ZXInO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmV4cG9ydCBjbGFzcyBTdWJqZWN0U3Vic2NyaXB0aW9uPFQ+IGV4dGVuZHMgU3Vic2NyaXB0aW9uIHtcbiAgaXNVbnN1YnNjcmliZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgc3ViamVjdDogU3ViamVjdDxUPiwgcHVibGljIHN1YnNjcmliZXI6IE9ic2VydmVyPFQ+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHVuc3Vic2NyaWJlKCkge1xuICAgIGlmICh0aGlzLmlzVW5zdWJzY3JpYmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5pc1Vuc3Vic2NyaWJlZCA9IHRydWU7XG5cbiAgICBjb25zdCBzdWJqZWN0ID0gdGhpcy5zdWJqZWN0O1xuICAgIGNvbnN0IG9ic2VydmVycyA9IHN1YmplY3Qub2JzZXJ2ZXJzO1xuXG4gICAgdGhpcy5zdWJqZWN0ID0gbnVsbDtcblxuICAgIGlmICghb2JzZXJ2ZXJzIHx8IG9ic2VydmVycy5sZW5ndGggPT09IDAgfHwgc3ViamVjdC5pc1N0b3BwZWQgfHwgc3ViamVjdC5pc1Vuc3Vic2NyaWJlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN1YnNjcmliZXJJbmRleCA9IG9ic2VydmVycy5pbmRleE9mKHRoaXMuc3Vic2NyaWJlcik7XG5cbiAgICBpZiAoc3Vic2NyaWJlckluZGV4ICE9PSAtMSkge1xuICAgICAgb2JzZXJ2ZXJzLnNwbGljZShzdWJzY3JpYmVySW5kZXgsIDEpO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
