module.exports = function billSettings() {
    var smsCost;
    var callCost;
    var warningLevel;
    var criticalLevel;

    var callCostTotal = 0;

    var smsCostTotal = 0;

    var actionList = []

    function setSettings(settings) {
        smsCost = Number(settings.smsCost);
        callCost = Number(settings.callCost);
        warningLevel = settings.warningLevel;
        criticalLevel = settings.criticalLevel;

    }

    function getSettings() {
        return {
            smsCost,
            callCost,
            warningLevel,
            criticalLevel

        }

    }

    function recordAction(action) {
        if(action){
      if(!hasReachedCriticalLevel()){

        let cost = 0;
        if (action === 'sms') {
            cost = smsCost;

        }

        else if (action === 'call') {
            cost = callCost;

        }
        actionList.push({
            type: action,
            cost,
            timestamp: new Date()
        });
    }
    }
    }
    function actions() {

        return actionList;
    }

    function actionFor(type) {

        return actionList.filter((action) => action.type === type);

    }

    function getTotal(type) {

        return actionList.reduce((total, action) => {

            let val = action.type === type ? action.cost : 0;

            return total + val;
        }, 0);

    }
    function grandTotal() {

        return getTotal('sms') + getTotal('call')
    }

    function totals() {
        let smsTotal = getTotal('sms')
        let callTotal = getTotal('call')
        return {
            smsTotal,
            callTotal,
            grandTotal: grandTotal()
        }

    }

    function hasReachedWarningLevel() {

        const total = grandTotal()
        const reachedWarningLevel = total >= warningLevel
            && total < criticalLevel;
            return reachedWarningLevel;

    }

    function hasReachedCriticalLevel() {

        const total = grandTotal();
        return total >= criticalLevel && total > 0;
    }
    function totalClassName() {

        if (hasReachedCriticalLevel()) {
            return "danger";
        }
        else if (hasReachedWarningLevel()) {
            return "warning";
        }
    }

    return {
        setSettings,
        getSettings,
        recordAction,
        actions,
        actionFor,
        getTotal,
        grandTotal,
        totals,
        hasReachedWarningLevel,
        hasReachedCriticalLevel,
        totalClassName

    }
}

