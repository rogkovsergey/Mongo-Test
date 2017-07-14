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
