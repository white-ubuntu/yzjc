var Ghcounts=Meteor.publish('ghcounts', function() {
    return Ghcounts.find({});
});