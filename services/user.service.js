var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });


var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.getALLreq = getALLreq;
service.getALLvend = getALLvend;
service.create = create;
service.countuser = countuser;
service.homeReq = homeReq;
service.update = update;
service.updateReq = updateReq;
service.delete = _delete;
service.createreq1 = createreq1;
module.exports = service;


function authenticate(username, password) {
    var deferred = Q.defer();

    db.collection('users').findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.collection('users').findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}
function getALLreq(first,second,third,fourth,fifth,pos,dept) {
    console.log('F&F: ',first,second,pos,dept);
     var deferred = Q.defer();
     if(pos =="user") {
     if(third=="Approved")
     { if(fourth=="Yes" && fifth=="Yes" )
       {
            db.collection('main').find({"stats.head":"Approved","stats.gate":"Approved",deliv:fourth,retur:fifth}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
            deferred.resolve(results);
          })
        }
        else if(fourth=="Yes" && fifth=="No" )
       {
            db.collection('main').find({"stats.head":"Approved","stats.gate":"Approved",deliv:fourth,retur:fifth}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
            deferred.resolve(results);
          })
        }
        else {
            db.collection('main').find({"stats.head":"Approved","stats.gate":"Approved",deliv:"No"}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
                deferred.resolve(results);
              })
        }
     }
     else if(third=="Rejected")
     {  
        db.collection('main').find({ $or:[ {"stats.head":"Rejected"}, {"stats.gate":"Rejected"}, {"stats.costt":"Rejected"} ]}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
            deferred.resolve(results);
          })
     }
    else if(third=="Pending"){
        console.log("In Pending")
       db.collection('main').find({$or:[ {"stats.head":"Pending"}, {"stats.gate":"Pending"}, {"stats.costt":"Pending"} ],"stats.gate":{ "$ne" : "Rejected"},"stats.head":{"$ne" : "Rejected"},"stats.costt":{"$ne" : "Rejected"}}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
        deferred.resolve(results);
      })
    }
    }  
    else if(pos =="head"){ 
        console.log('In else',pos,dept)
        if(third=="Approved")
     { if(fourth=="Yes" && fifth=="Yes" )
       {
            db.collection('main').find({"stats.head":third,deliv:fourth,retur:fifth,dep:dept}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
            deferred.resolve(results);
          })
        }
        else if(fourth=="Yes" && fifth=="No" )
       {
            db.collection('main').find({"stats.head":third,deliv:fourth,retur:fifth,dep:dept}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
            deferred.resolve(results);
          })
        }
        else {
            db.collection('main').find({"stats.head":third,"stats.gate":{ "$ne" : "Rejected"},"stats.head":{"$ne" : "Rejected"},"stats.costt":{"$ne" : "Rejected"},deliv:"No",dep:dept}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
                deferred.resolve(results);
              })
        }
     }
     else if(third=="Rejected")
     {  
        db.collection('main').find({ $or:[ {"stats.head":"Rejected"}, {"stats.gate":"Rejected"}, {"stats.costt":"Rejected"} ],dep:dept}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
            deferred.resolve(results);
          })
     }
     else if(third=="Pending"){
        console.log("In Pending in else", dept)
       db.collection('main').find({"stats.head": "Pending",dep: dept}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
        deferred.resolve(results);
      })
    }
    }  
    else if(pos == "gate"){
        if(third=="Approved")
        { if(fourth=="Yes" && fifth=="Yes" )
          {
               db.collection('main').find({"stats.head":"Approved","stats.costt":"Approved","stats.gate":"Approved",deliv:fourth,retur:fifth}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
               deferred.resolve(results);
             })
           }
           else if(fourth=="Yes" && fifth=="No" )
          {
               db.collection('main').find({"stats.head":"Approved","stats.costt":"Approved","stats.gate":"Approved",deliv:fourth,retur:fifth}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
               deferred.resolve(results);
             })
           }
           else {
               db.collection('main').find({"stats.head":"Approved","stats.costt":"Approved","stats.gate":"Approved",deliv:"No"}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
                   deferred.resolve(results);
                 })
           }
        }
        else if(third=="Rejected")
        {  
           db.collection('main').find({"stats.gate": "Rejected"}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
               deferred.resolve(results);
             })
        }
        else if(third=="Pending"){
           console.log("In Pending in Gate", dept)
          db.collection('main').find({"stats.head": "Approved","stats.costt":"Approved","stats.gate": "Pending"}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
           deferred.resolve(results);
         })
       }

    }
    else if(pos == "cost"){
        if(third=="Approved")
        { 
        
               db.collection('main').find({"stats.head":"Approved","stats.costt":"Approved"}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
                   deferred.resolve(results);
                 })
           
        }
        else if(third=="Rejected")
        {  
           db.collection('main').find({"stats.costt": "Rejected"}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
               deferred.resolve(results);
             })
        }
        else if(third=="Pending"){
           console.log("In Pending in Gate", dept)
          db.collection('main').find({"stats.head": "Approved","stats.costt": "Pending"}).sort( JSON.parse('{"'+second+'": -1}')).limit(5).skip(parseInt(first)).toArray(function(err, results){
           deferred.resolve(results);
         })
       }


    }
    return deferred.promise;
}
function updateReq(userParam1) {
    console.log('In update ',userParam1.rname);
     var deferred = Q.defer();
     
     if(userParam1.pos=="head"){
      db.collection('main').updateOne({"rname": userParam1.rname,"uname": userParam1.uname,"dt": userParam1.dt},{$set: {"stats.head": userParam1.con}},function(err, results){
      deferred.resolve();
          })
        }
        else if(userParam1.pos=="gate"){
            if(userParam1.del=="Yes"){
                db.collection('main').updateOne({"rname": userParam1.rname,"uname": userParam1.uname,"dt": userParam1.dt},{$set: {"deliv": "Yes"}},function(err, results){
                    deferred.resolve();
                        })
            }
            else if (userParam1.ret=="Yes"){
                db.collection('main').updateOne({"rname": userParam1.rname,"uname": userParam1.uname,"dt": userParam1.dt},{$set: {"retur": "Yes"}},function(err, results){
                    deferred.resolve();
                        })
            }
            else {
                db.collection('main').updateOne({"rname": userParam1.rname,"uname": userParam1.uname,"dt": userParam1.dt},{$set: {"stats.gate": userParam1.con}},function(err, results){
                    deferred.resolve();
                        })
            }
            }
         else if(userParam1.pos=="cost"){
                    db.collection('main').updateOne({"rname": userParam1.rname,"uname": userParam1.uname,"dt": userParam1.dt},{$set: {"stats.costt": userParam1.con}},function(err, results){
                    deferred.resolve();
                 })}
    
    return deferred.promise;
}
function countuser(pos,dept) {
    var count={count1:0,countapp: 0,countrej: 0,countcomp: 0,total: 0};
     var deferred = Q.defer();
     if(pos == "head") {
        db.collection('main').find({"stats.gate":{ "$ne" : "Rejected"},"stats.head":{"$ne" : "Rejected"},"stats.costt":{"$ne" : "Rejected"},retur:"No",dep: dept}).count(function(err, countt){
            console.log(countt)
         count.countapp = countt; 
         count.total = count.total+1;
       });
       db.collection('main').find({"stats.head":"Approved","stats.gate":"Approved","stats.costt":"Approved",retur:"Yes",dep: dept}).count(function(err, countt){
        console.log(countt)
        count.countcomp = countt;
        count.total = count.total+1;
      });
    
       db.collection('main').find({$or:[ {"stats.head":"Rejected"}, {"stats.gate":"Rejected"}, {"stats.costt":"Rejected"} ],dep: dept}).count(function(err, countt){
        console.log(countt)
        count.countrej = countt; 
        count.total = count.total+1;
      }); 
    
         db.collection('main').find({dep: dept}).count(function(err, countt){
               
            count.count1 = countt;
            deferred.resolve(count);
            count.total = count.total+1;
          });
     }
     else if (pos == "cost"){
        db.collection('main').find({"stats.head":"Approved","stats.costt":"Pending"}).count(function(err, countt){
            console.log(countt)
         count.countapp = countt; 
         count.total = count.total+1;
       });
       db.collection('main').find({"stats.head":"Approved","stats.costt":"Approved"}).count(function(err, countt){
        console.log(countt)
        count.countcomp = countt;
        count.total = count.total+1;
      });
    
       db.collection('main').find({"stats.head":"Approved","stats.costt":"Rejected"}).count(function(err, countt){
        console.log(countt)
        count.countrej = countt; 
        count.total = count.total+1;
      }); 
    
         db.collection('main').find({"stats.head":"Approved"}).count(function(err, countt){
               
            count.count1 = countt;
            deferred.resolve(count);
            count.total = count.total+1;
          });
     }
     else if (pos == "gate"){
        db.collection('main').find({"stats.head":"Approved","stats.costt":"Approved","stats.gate":{ "$ne": "Rejected"},retur:"No"}).count(function(err, countt){
            console.log(countt)
         count.countapp = countt; 
         count.total = count.total+1;
       });
       db.collection('main').find({"stats.head":"Approved","stats.gate":"Approved","stats.costt":"Approved",retur:"Yes"}).count(function(err, countt){
        console.log(countt)
        count.countcomp = countt;
        count.total = count.total+1;
      });
    
       db.collection('main').find({"stats.head":"Approved","stats.costt":"Approved","stats.gate":"Rejected"}).count(function(err, countt){
        console.log(countt)
        count.countrej = countt; 
        count.total = count.total+1;
      }); 
    
         db.collection('main').find({"stats.head":"Approved","stats.costt":"Approved"}).count(function(err, countt){
               
            count.count1 = countt;
            deferred.resolve(count);
            count.total = count.total+1;
          });
     }
     else {
        setTimeout(function(){ 
            db.collection('main').find({"stats.gate":{ "$ne" : "Rejected"},"stats.head":{"$ne" : "Rejected"},"stats.costt":{"$ne" : "Rejected"},retur:"No"}).count(function(err, countt){
                console.log(countt)
             count.countapp = countt; 
             count.total = count.total+1;
           });
           db.collection('main').find({"stats.head":"Approved","stats.gate":"Approved","stats.costt":"Approved",retur:"Yes"}).count(function(err, countt){
            console.log(countt)
            count.countcomp = countt;
            count.total = count.total+1;
          });
        
           db.collection('main').find({$or:[ {"stats.head":"Rejected"}, {"stats.gate":"Rejected"}, {"stats.costt":"Rejected"} ]}).count(function(err, countt){
            console.log(countt);
            
            count.countrej = countt; 
            count.total = count.total+1;
          }); 
        
             db.collection('main').find({}).count(function(err, countt){
                   
                count.count1 = countt;
                deferred.resolve(count);
                count.total = count.total+1;
                console.log("Count",count);
              });
         }, 2000);
       
     }
     
      console.log("Count",count);
      return deferred.promise;
}
function homeReq(pos,dept) {
    var deferred = Q.defer();
    if(pos == "head"){
        db.collection('main').find({dep: dept}).sort( {"dt": -1}).limit(5).skip(0).toArray(function(err, results){
            deferred.resolve(results);
          })
    }
    else if (pos == "cost"){
        db.collection('main').find({"stats.head":"Approved"}).sort( {"dt": -1}).limit(5).skip(0).toArray(function(err, results){
            deferred.resolve(results);
          })
    }
    else if (pos == "gate"){
        db.collection('main').find({"stats.head":"Approved","stats.costt":"Approved"}).sort( {"dt": -1}).limit(5).skip(0).toArray(function(err, results){
            deferred.resolve(results);
          })
    }
    else{
        db.collection('main').find({}).sort( {"dt": -1}).limit(5).skip(0).toArray(function(err, results){
            deferred.resolve(results);
          })
    }
    return deferred.promise;
}
function getALLvend(vendet){
    var deferred = Q.defer();
    console.log("In SERVICES For Vender Detail", vendet)
    db.collection('vendet').findOne({"venname":vendet},function(err, results){
        console.log("In innermost service",results)
        deferred.resolve(results);
      })
      return deferred.promise;
}
function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.collection('users').findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.collection('users').insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function createreq1(userParam) {
    var deferred = Q.defer();

    // validation
    createUser1();
        
    function createUser1() {
        // set user object to userParam without the cleartext password

        db.collection('main').insert(
            userParam,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}
/**function updatequerystat(user){
    
    console("In main service: ", user);
 
    var set = {
        "stats.head": "Approved"
    };

    db.collection('main').update(
        { dt: user.dt},
        { $set: set },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });
} */

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.collection('users').findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.collection('users').findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            username: userParam.username,
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.collection('users').update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.collection('users').remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}