Router.configure({
    // we use the  appBody template to define the layout for the entire app
    layoutTemplate: 'appBody',

    // the appNotFound template is used for unknown routes and missing lists
    notFoundTemplate: 'appNotFound',

    // show the appLoading template whilst the subscriptions below load their data
    loadingTemplate: 'appLoading',

    // wait on the following subscriptions before rendering the pages to ensure
    // the data it's expecting is present
    waitOn: function() {
        return [

        ];
    }
});

dataReadyHold = null;

if (Meteor.isClient) {
    // Keep showing the launch screen on mobile devices until we have loaded
    // the app's data
    dataReadyHold = LaunchScreen.hold();

    // Show the loading screen on desktop
    Router.onBeforeAction('loading', {except: ['join', 'signin']});
    Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}
Router.route('signin',{
    path:'/signin',
    action:function(){
        this.render('signin');
    }
});
Router.route('join',{
    path:'/join',
    action:function(){
        this.render('join');
    }
});

Router.route('ghcounts',{
    path:'/ghcounts',
    waitOn: function () {
        return [Meteor.subscribe('ghcounts')];
    },
    action:function(){
        this.render('ghcounts');
    }
});
Router.route('home', {
    path: '/',
    action: function() {
        Router.go('ghcounts');
    }
});

