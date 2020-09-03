let assert = require("assert");
let settingsbill = ("../settings-bill");

describe("The bill with settings factory function", function () {
    it('should be able to set the call cost', function () {
        let settingsBill = billSettings();

        settingsBill.setCallCost(1.85);
        assert.equal(1.85, settingsBill.getCallCost());

        let settingsBill2 = billSettings();

        settingsBill2.setCallCost(2.75);
        assert.equal(2.75, settingsBill2.getCallCost());
    });


    it('should be able to set the sms cost', function () {
        let settingsBill = billSettings();

        settingsBill.setSmsCost(0.85);
        assert.equal(0.85, settingsBill.getSmsCost())

        let settingsBill2 = billSettings();
        settingsBill2.setSmsCost(0.75);

        assert.equal(0.75, settingsBill2.getSmsCost());


    });

    it('should be able to set the sms cost and call cost', function () {
        let settingsBill = billSettings();

        settingsBill.setCallCost(2.75);
        settingsBill.setSmsCost(0.85);

        assert.equal(0.85, settingsBill.getSmsCost());
        assert.equal(2.75, settingsBill.getCallCost());


    });

    it('should be able to set the warning level', function () {
        let settingsBill = billSettings();

        settingsBill.setCriticalLevel(60)

        assert.equal(60, settingsBill.getCriticalLevel())

    });

    it('should be able to set the warning level and critical level', function () {
        let settingsBill = billSettings();

        settingsBill.setCriticalLevel(60);
        settingsBill.setWarningLevel(30);

        assert.equal(60, settingsBill.getCriticalLevel());
        assert.equal(30, settingsBill.getWarningLevel());
    });

    describe("use value", function () {

        it('should be able to use the call cost set', function () {
             
            let settingsBill = billSettings()
            settingsBill.setCriticalLevel(10);

            settingsBill.setCallCost(2.25)
            settingsBill.setSmsCost(0.85)

            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();

            assert.equal(6.75, settingsBill.getTotalCost());
            assert.equal(6.75, settingsBill.getTotalCallCost());
            assert.equal(0.00, settingsBill.getTotalSmsCost());
        });

        it('should be able to use the call cost set for 2 calls at 1.35 each', function () {
            let settingsBill = billSettings();

            settingsBill.setCriticalLevel(10);
            settingsBill.setCallCost(1.35);
            settingsBill.setSmsCost(0.85);

            settingsBill.makeCall();
            settingsBill.makeCall();

            assert.equal(2.70, settingsBill.getTotalCost());
            assert.equal(2.70, settingsBill.getTotalCallCost());
            assert.equal(0.00, settingsBill.getTotalSmsCost());


        });

        it('should be able to send 2 sms at 0.85 each', function () {
        let settingsBill = billSettings();

        settingsBill.setCriticalLevel(10);
        settingsBill.setSmsCost(0.85);
        settingsBill.setCallCost(0.00);

        settingsBill.sendSms();
        settingsBill.sendSms();
        assert.equal(1.70, settingsBill.getTotalCost());
        assert.equal(0.00, settingsBill.getTotalCallCost());
        assert.equal(1.70, settingsBill.getTotalSmsCost());

    });

    it('should be able to send 2 sms at 0.85 each and make a call at 1.35', function () {
        let settingsBill = billSettings();
        
        settingsBill.setCriticalLevel(10);
        settingsBill.setSmsCost(0.85);
        settingsBill.setCallCost(1.35);

        settingsBill.sendSms();
        settingsBill.makeCall();
        settingsBill.sendSms();

        assert.equal(3.05, settingsBill.getTotalCost());
        assert.equal(1.35, settingsBill.getTotalCallCost());
        assert.equal(1.70, settingsBill.getTotalSmsCost());

    });
});

describe("warning and critical level", function(){

    it('should return a class name of warning if warning level is reached', function(){

        let settingsBill = billSettings();

        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);
        settingsBill.setWarningLevel(5);
        settingsBill.setCriticalLevel(10);

        
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        
        assert.equal("warning", settingsBill.totalClassName());
       

    });

    //describe("warning and critical level", function(){

        it('should return a class name of critical if critical level is reached', function(){
            
            let settingsBill = billSettings();
    
        
            settingsBill.setSmsCost(2.50);
            settingsBill.setCallCost(0.85);
            settingsBill.setWarningLevel(5);
            settingsBill.setCriticalLevel(10);
    
            
            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();
            
            assert.isOk("critical", settingsBill.totalClassName());
           
    
        });

        it('should stop the total call cost from increasing when the critical level is reached', function(){
            
            let settingsBill = billSettings();
    
            
            settingsBill.setSmsCost(2.50);
            settingsBill.setCallCost(0.85);
            settingsBill.setWarningLevel(5);
            settingsBill.setCriticalLevel(10);
            
            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();
            
            assert.isOk("critical", settingsBill.totalClassName());
            assert.isOk(10, settingsBill.getTotalCallCost());
           
    
        });

        it('should allow the total to increase after reaching the critical level and then update the critical level', function(){
            
            let settingsBill = billSettings();
    
            
            settingsBill.setSmsCost(2.50);
            settingsBill.setCallCost(0.85);
            settingsBill.setWarningLevel(8)
            settingsBill.setCriticalLevel(10);
    
            
            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();
            settingsBill.makeCall();
            //alert(settingsBill.totalClassName())
            assert.isOk("critical", settingsBill.totalClassName());
            
            assert.isOk(10, settingsBill.getTotalCallCost());
           
            settingsBill.setCriticalLevel(20);
            
            assert.isOk("warning", settingsBill.totalClassName());

            settingsBill.makeCall();
            settingsBill.makeCall();

            assert.isOk(15, settingsBill.getTotalCallCost());
        });
});
});