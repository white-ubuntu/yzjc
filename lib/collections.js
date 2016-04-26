Ghcounts = new Mongo.Collection('ghcounts');
    if(Meteor.isServer){
        Meteor.methods({
           /* 每天晚上去平台调用接口，整理，更新每个月的收入*/
            getPlatMonthIncomes:function(){
                console.log("enter getPlatIncomes");
                this.unblock();
                return HTTP.call("GET","http://localhost:8889/plat/api/income");
            },

        });

    }

