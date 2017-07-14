var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


    queryMongoDB();



function queryMongoDB() {

    MongoClient.connect('mongodb://localhost:27017/mongomart', function(err, db) {
        
        assert.equal(err, null);
        console.log("Successfully connected to MongoDB");
        
        var cursor = db.collection('items').aggregate([{$group:{_id:"$category", num:{$sum:1}}},{$sort:{_id:1}}]);
        
        cursor.forEach(
            function(doc) {
            console.log("Result:" + doc[0]._id)
            },
            function(err) {
                assert.equal(err, null);
                console.log("Error");
                return db.close();
            }
        );
        
    });
    
}


function queryDocument(options) {

    console.log(options);
    
    var query = {
        "tag_list": {"$regex": "social-networking"}
        /* TODO: Complete this statement to match the regular expression "social-networking" */        
    };

    if (("firstYear" in options) && ("lastYear" in options)) {
         query.founded_year = { "$gte": options.firstYear, "$lte": options.lastYear };
        /* 
           TODO: Write one line of code to ensure that if both firstYear and lastYear 
           appear in the options object, we will match documents that have a value for 
           the "founded_year" field of companies documents in the correct range. 
        */
    } else if ("firstYear" in options) {
        query.founded_year = { "$gte": options.firstYear };
    } else if ("lastYear" in options) {
        query.founded_year = { "$lte": options.lastYear };
    }

    if ("city" in options) {

        query["offices.city"] = options.city;

               /*  TODO: Write one line of code to ensure that we do an equality match on the 
           "offices.city" field. The "offices" field stores an array in which each element 
           is a nested document containing fields that describe a corporate office. Each office
           document contains a "city" field. A company may have multiple corporate offices. 
      */  
    }
        
    return query;
    
}


function report(options) {
    var totalEmployees = 0;
    for (key in companiesSeen) {
        totalEmployees = totalEmployees + companiesSeen[key].number_of_employees;
    }

    var companiesList = Object.keys(companiesSeen).sort();
    console.log("Companies found: " + companiesList);
    console.log("Total employees in companies identified: " + totalEmployees);
    console.log("Total unique companies: " + companiesList.length);
    console.log("Average number of employees per company: " + Math.floor(totalEmployees / companiesList.length));
}









