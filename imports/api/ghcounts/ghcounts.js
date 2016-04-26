var ArrayUtil={
    getDataArray:function(arrs){
        var newArr=[];
        for(var i=0;i<arrs.length;i++){
            newArr.push(arrs[i].data);
        }
        return newArr;
    },
    getDataArrayPlus:function(arrs){
        var resultPlus=0;
        for(var i=0;i<arrs.length;i++){
            resultPlus+=arrs[i].data;
        }
        return resultPlus;
    }
}
/*
 * Function to draw the column chart
 *
 * ghcountMapper
 */
const INCOMEDATA='incomedata';
function builtColumnReactive(chartData){
    console.log(chartData);
    $('#container-column').highcharts({

        chart: {
            type: chartData.chartOption.chart.type,
            height:chartData.chartOption.chart.height
        },

        title: {
            text: '预约挂号人数'
        },

        subtitle: {
            text: 'Source: www.ijoy.com'
        },

        credits: {
            enabled: false
        },


        xAxis: {
            categories:chartData.categories
        },
        yAxis: {
            min: 0,

        },

        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} 人</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series:chartData.data

    });
}
var queryDataManyYear=function(depNameArr,yearArr,quarterArr){
    var arrayData={};
    arrayData.data=[];
    arrayData.categories=yearArr;
    var pie;
    for(var i=0;i<depNameArr.length;i++){
        pie={}
        var d=[];
        var e;
        for(var j=0;j<yearArr.length;j++){
            e=ArrayUtil.getDataArrayPlus(Ghcounts.find({depName:depNameArr[i],year:yearArr[j]},{sort:{year:-1}}).fetch());
            d.push(e);
        }
        pie.data=d;


        pie.name=depNameArr[i];
        arrayData.data.push(pie);
    }
    return arrayData;
}
/*
 选则一年 多个季度
 */
var modifay=function(quarterArr){
    var newArr=[];
    for(var i=0;i<quarterArr.length;i++){
        newArr.push(quarterArr[i]+"季度");
    }
    return newArr;
}
var queryDataOneYearManyQuart=function(depNameArr,yearArr,quarterArr){

    var arrayData={};
    arrayData.data=[];
    arrayData.categories=modifay(quarterArr);
    var pie;
    for(var i=0;i<depNameArr.length;i++){
        pie={}
        var d=[];
        var e;
        for(var j=0;j<quarterArr.length;j++){

            e=ArrayUtil.getDataArrayPlus(Ghcounts.find({depName:depNameArr[i],year:yearArr[0],month:{$gte:(quarterArr[j]-1)*4+1,$lte:quarterArr[j]*4}},{sort:{month:-1}}).fetch());
            d.push(e);
        }
        pie.data=d;


        pie.name=depNameArr[i];
        arrayData.data.push(pie);
    }
    return arrayData;
}
/*
 旋转一年，一个季节
 */
var queryDataOneYearOneQuart=function(depNameArr,yearArr,quarterArr){
    var arrayData={};
    var monthArr=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    arrayData.data=[];
    var k=quarterArr[0];
    arrayData.categories=new Array(monthArr[(k-1)*3+1],monthArr[(k-1)*3+2],monthArr[(k-1)*3+3]);
    var pie;
    for(var i=0;i<depNameArr.length;i++){
        pie={}
        pie.data=ArrayUtil.getDataArray(Ghcounts.find({depName:depNameArr[i],year:yearArr[0],month:{$gte:(quarterArr[0]-1)*3+1,$lte:quarterArr[0]*3}},{sort:{month:-1}}).fetch());
        pie.name=depNameArr[i];
        arrayData.data.push(pie);
    }
    return arrayData;
}
/*
 选择一年
 */
var queryDataOneYear=function(depNameArr,yearArr,quarterArr){
    var arrayData={};
    var monthArr=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    arrayData.data=[];
    arrayData.categories=monthArr;
    var pie;
    for(var i=0;i<depNameArr.length;i++){
        pie={}
        pie.data=ArrayUtil.getDataArray(Ghcounts.find({depName:depNameArr[i],year:yearArr[0]},{sort:{month:-1}}).fetch());
        pie.name=depNameArr[i];
        arrayData.data.push(pie);
    }
    return arrayData;
}
/*
 如果选择多个年份，则安照年份来
 */
var queryData=function(depNameArr,yearArr,quarterArr){
    //1,选则多个年。
    if(yearArr.length>1)return queryDataManyYear(depNameArr,yearArr,quarterArr);
    //2。选则一年 多个季度
    if(yearArr.length==1 && quarterArr.length>1) return queryDataOneYearManyQuart(depNameArr,yearArr,quarterArr);
    //3.旋转一年，一个季节
    if(yearArr.length==1 && quarterArr.length==1)  return queryDataOneYearOneQuart(depNameArr,yearArr,quarterArr);
    //4.选择一年
    if(yearArr.length==1 && quarterArr.length==0)  return queryDataOneYear(depNameArr,yearArr,quarterArr);

} ;

/*
 * Call the function to built the chart when the template is rendered
 */
Template.ghcounts.rendered = function() {

}

Template.chartRender.rendered=function(){
    //根据年数组,科室数组查找数据
    var yearArr=Session.get('yearArr')==undefined?[2015]:Session.get('yearArr');
    var quarterArr=Session.get('quarterArr')==undefined?[]:Session.get('quarterArr');
    var depNameArr=Session.get('depNameArr')==undefined?['门诊','急诊']:Session.get('depNameArr');
    var result=queryData(depNameArr,yearArr,quarterArr);
    if(Session.get('chartOption')!=undefined && Session.get('chartOption')!=null){
        result.chartOption=Session.get('chartOption')
    }else {
        result.chartOption={chart:{type:'column'}};
    }
    console.log(result);
    builtColumnReactive(result);
};


//1:点击 图标，能显示扩大的图标，

Template.ghcounts.events({
    'click #container-column':function(event,template){
        const icon$=template.$("[class^='icon']");
        if(icon$)icon$.toggleClass("disable");
    },
    'click .icon-enlarge2':function(event,template){
        //横屏
        if(Session.get('chartOption')==undefined){
            Session.set('chartOption',{chart:{type:'bar',height:600}});
        }else if(Session.get('chartOption').chart.type=='column'){
            Session.set('chartOption',{chart:{type:'bar',height:600}});
        }else {
            Session.set('chartOption',{chart:{type:'column',height:400}});
        }

        Template.chartRender.rendered();
        console.log('-----------');
    },
    'click .icon-arrow-down':function(event,template){
        template.$("#quickSearch").css('display','block');
        $(event.target).css('display','none');
        Session.set(showQuickSearchFlag,true);
    },
    'click .icon-search':function(event,template){
        if(Session.get(showQuickSearchFlag)){
            var yearArr=[];
            $.each(template.$(".year li.choosed"),function(e,v){
                yearArr.push(parseInt($(this).html()));
            });

            var quarterArr=[];
            $.each(template.$(".quarter li.choosed"),function(e,v){
                quarterArr.push(parseInt($(this).attr('data_v')));
            });
            var depNameArr=['门诊','急诊'];
            Session.set('yearArr',yearArr);
            Session.set('quarterArr',quarterArr);
            Session.set('depNameArr',depNameArr);
            Template.chartRender.rendered();
            template.$("#quickSearch").css('display','none');
            Session.set(showQuickSearchFlag,false);
        }
    },
    'click li:not(.title)':function(event,template){
        $(event.target).toggleClass("choosed");
    }
});

const showQuickSearchFlag='showQuickSearchFlag';
Template.ghcounts.helpers({
    showQuickSearch:function(){
        return Session.get(showQuickSearchFlag);
    }
});


