Meteor.startup(function () {
    if (Ghcounts.find().count() === 0) {
        //插入测试数据
        Ghcounts.insert({
            depName:'门诊',
            year:2015,
            month:1,
            data:200,
        });
        Ghcounts.insert({
            depName:'门诊',
            year:2015,
            month:2,
            data:300,
        });
        Ghcounts.insert({
            depName:'门诊',
            year:2015,
            month:3,
            data:400,
        });
        Ghcounts.insert({
            depName:'门诊',
            year:2015,
            month:4,
            data:900,
        });
        Ghcounts.insert({
            depName:'门诊',
            year:2015,
            month:5,
            data:300,
        });
        Ghcounts.insert({
            depName:'门诊',
            year:2015,
            month:6,
            data:200,
        });
        Ghcounts.insert({
            depName:'门诊',
            year:2015,
            month:7,
            data:100,
        });
        Ghcounts.insert({
            depName:'门诊',
            year:2015,
            month:8,
            data:200,
        });
        Ghcounts.insert({
            depName:'门诊',
            year:2015,
            month:9,
            data:700,
        });
        Ghcounts.insert({
            depName:'门诊',
            year:2015,
            month:10,
            data:400,
        });
        Ghcounts.insert({
            depName:'门诊',
            year:2015,
            month:11,
            data:800,
        });
        Ghcounts.insert({
            depName:'门诊',
            year:2015,
            month:12,
            data:300,
        });
        Ghcounts.insert({
            depName:'门诊',
            year:2016,
            month:1,
            data:500,
        });
        Ghcounts.insert({
            depName:'门诊',
            year:2016,
            month:2,
            data:400,
        });
        Ghcounts.insert({
            depName:'门诊',
            year:2016,
            month:3,
            data:200,
        });
        Ghcounts.insert({
            depName:'门诊',
            year:2016,
            month:4,
            data:500,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2015,
            month:1,
            data:200,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2015,
            month:2,
            data:300,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2015,
            month:3,
            data:400,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2015,
            month:4,
            data:900,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2015,
            month:5,
            data:300,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2015,
            month:6,
            data:200,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2015,
            month:7,
            data:100,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2015,
            month:8,
            data:200,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2015,
            month:9,
            data:700,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2015,
            month:10,
            data:400,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2015,
            month:11,
            data:800,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2015,
            month:12,
            data:300,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2016,
            month:1,
            data:500,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2016,
            month:2,
            data:400,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2016,
            month:3,
            data:200,
        });
        Ghcounts.insert({
            depName:'急诊',
            year:2016,
            month:4,
            data:500,
        });

    }
});
