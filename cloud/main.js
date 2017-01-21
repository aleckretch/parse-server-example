Parse.Cloud.define("getAllowedEmails", function(request, response) {
    var emails = ["email.arizona.edu", "u.nus.edu"];
    response.success(emails);
});

Parse.Cloud.define("getMarketName", function(request, response) { //TODO delete this method and corresponding unused database categories
    var emailName = request.params.emailName;
    var query = new Parse.Query("Marketnames");
    query.equalTo("emailName", emailName);
    query.first({
        success: function(market) {
            var marketName = market.get("marketName");
            var marketplace = market.get("marketplace");
            var campusName = market.get("campusName");
            var campusAbbreviation = market.get("campusAbbreviation");
            var bottomMessage = market.get("bottomMessage");
            var categories = market.get("categories");
            var businessUsers = market.get("businessUsers");
            var bookstoreUsers = market.get("bookstoreUsers");
            var homeCategories = market.get("homeCategories");
            var campusPhoto = market.get("campusPhoto");
            var universityEmoji = market.get("universityEmoji");
            var universityUsers = market.get("universityUsers");
            var nickname = market.get("nickname");
            var returnArray = [marketName, marketplace, campusName, campusAbbreviation, bottomMessage, categories, businessUsers, bookstoreUsers, homeCategories, campusPhoto, universityEmoji, universityUsers, nickname];
            response.success(returnArray);
        },
        error: function(error) {
            console.error(error);
            response.error("An error occured while looking up the marketplace");
        }
    });
});

Parse.Cloud.define("getMarketplace", function(request, response) {
    var emailName = request.params.emailName;
    var query = new Parse.Query("Marketnames");
    query.equalTo("emailName", emailName);
    query.first({
        success: function(market) {
            var marketplace = market.get("marketplace");
            var nickname = market.get("nickname");
            var campusAbbreviation = market.get("campusAbbreviation");
            var universityEmoji = market.get("universityEmoji");
            var categoryDictionaries = market.get("categoryDictionaries");
            var campusPhoto = market.get("campusPhoto");
            var autoImages = market.get("autoImages");
            var currency = market.get("currency");
            var universityUsers = market.get("universityUsers");
            var featuredUserDictionaries = market.get("featuredUserDictionaries");
            var moderatorUsers = market.get("moderatorUsers");
            var campusName = market.get("campusName");
            var sectionDictionaries = market.get("sectionDictionaries");
            var concentrationDictionaries = market.get("concentrationDictionaries");
            var mustSeeListingIds = market.get("mustSeeListingIds");
            var newsDictionaries = market.get("newsDictionaries");
            var returnArray = [marketplace, nickname, campusAbbreviation, universityEmoji, categoryDictionaries, campusPhoto, autoImages, currency, universityUsers, featuredUserDictionaries, moderatorUsers, campusName, sectionDictionaries, concentrationDictionaries, mustSeeListingIds, newsDictionaries];
            response.success(returnArray);
        },
        error: function(error) {
            console.error(error);
            response.error("An error occured while looking up the marketplace");
        }
    });
});

Parse.Cloud.define("getDefaults", function(request, response) {
    var emailName = request.params.emailName;
    var query = new Parse.Query("Defaults");
    query.first({
        success: function(market) {
            var majors = market.get("majorDictionaries");
            response.success(majors);
        },
        error: function(error) {
            console.error(error);
            response.error("An error occured while looking up the marketplace");
        }
    });
});

Parse.Cloud.define("sendPushToUser", function(request, response) {
    var userId = request.params.userId;
    var message = request.params.message;
    var listingId = request.params.listingId;
    var fromUserId = request.params.fromUserId;
    var infoMessage = request.params.infoMessage;
                   
    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo("userId", userId);
                   
    Parse.Push.send({
        where: pushQuery,
        data: {
            alert: message,
            lId: listingId,
            fId: fromUserId,
            iMe: infoMessage
        }
    }, {useMasterKey: true}).then(function() {
        response.success("Push was sent successfully.")
    }, function(error) {
        response.error("Push failed to send with error: " + error.message);
    });
});

Parse.Cloud.define("setUserArrayValuesEmpty", function(request, response) {
    // Parse.Cloud.useMasterKey();
    var userId = request.params.userId;
    var query = new Parse.Query(Parse.User);
                   
    query.equalTo("objectId", userId);
    query.first({
        success: function(user){
            user.set("notificationSubscriptions", []);
            user.set("seenMustSeeListingIds", []);
            user.set("viewedListings", []);
            user.set("visitedCategories", []);
            user.save(null, {useMasterKey: true});
                               
            response.success(user);
        },
                               
        error: function(error) {
            console.error(error);
            response.error("An error occurred while looking up the username");
        }
                               
    });
});

Parse.Cloud.define("setHasNotificationsToYes", function(request, response) {
    // Parse.Cloud.useMasterKey();
    var userId = request.params.userId;
    var query = new Parse.Query(Parse.User);
                   
    query.equalTo("objectId", userId);
    query.first({
        success: function(user){
            user.set("hasNotifications", true);
            user.save(null, {useMasterKey: true});
                               
            response.success(user);
        },
                               
        error: function(error) {
            console.error(error);
            response.error("An error occurred while looking up the username");
        }
                               
    });
});