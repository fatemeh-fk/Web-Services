
function Controller() {

    
    var service = {
        addRecord: addRecord,
        deleteRecord: deleteRecord,
        updateRecord: updateRecord,
        getItems: getItems,


    };

    var urls = {
        'GetUsers': 'https://my-json-server.typicode.com/wallouf/json-fake-server-test/users',
        'AddUsers': ' https://my-json-server.typicode.com/wallouf/json-fake-server-test/users',
        'DeleteUsers': 'https://my-json-server.typicode.com/wallouf/json-fake-server-test/users',
        'EditUsers': 'https://my-json-server.typicode.com/wallouf/json-fake-server-test/users'
    }
    
    return service;


    function getItems() {
        return $.get(urls.GetUsers, function (data) {
            console.log(data);
        });
    }
    //add user
    //output:promise

    function addRecord(fname, lname, bplace) {
        user = {

            'firsname': fname,
            'lastname': lname,
            'birhtplace': bplace
        }
        return $.post(urls.AddUsers,user,
             function (data, status, jqXHR) {
                // console.log(data);
            }
            
          
        ) 

    }


    //delete user
    //output:promise
    function deleteRecord(id) {

         $.ajax({
             url: urls.DeleteUsers + "/" + id,
            method: 'DELETE',
            success: function (result) {
                console.log("this id " + id+" is deleted");
             }
             ,
             error: function (e) {
                 alert("error");
             }
        });
        
        
    }

    //edit user
    //output:promise
    function updateRecord(id,fname,lname,bplace) {
        user = {
            'id':id,
            'firsname': fname,
            'lastname': lname,
            'birhtplace': bplace
        }
      return  $.ajax({
          url: urls.EditUsers + "/" + id,user,
            method: "PUT",
          success: function (res) {
            // console.log("this id " + id + " " + user.firsname + "      edited");
                
          }
          ,
          error: function (e) {
              alert("error");
          }
        });
    }

    



}

//var myController = Controller();

////myController.addRecord('fatemeh', 'karimi', 'tehran');
//myController.addRecord('fatemeh', 'karimi', 'tehran').then(function (user) {console.log(user) });
//myController.deleteRecord(3);
//myController.updateRecord(2, 'farshid', 'rezaei', 'jolfa').then(function (res) { console.log(user)});

//myController.getItems();