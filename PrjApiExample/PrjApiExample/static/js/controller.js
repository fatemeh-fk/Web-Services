//debugger
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
        return jQuery.get(urls.GetUsers, function (data) {
            console.log(data);
        });
    }


    function addRecord(fname, lname, Bplace) {
        user = {

            'firsname': fname,
            'lastname': lname,
            'birhtplace': Bplace
        }
        return jQuery.post(urls.AddUsers,user,
             function (data, status, jqXHR) {
                // console.log(data);
            })
    }



    function deleteRecord(id) {

         $.ajax({
             url: urls.DeleteUsers + "/" + id,
            method: 'DELETE',
            success: function (result) {
                console.log("this id " + id+" is deleted");
            }
        });
        
        
    }


    function updateRecord(id) {
        user = {

           fname: "farshid",
            lname: "rezaei",
            Bplace: "jolfa"
        }
      return  $.ajax({
          url: urls.EditUsers + "/" + id,user,
            method: "PUT",
          success: function (data) {
              console.log("this id " + id + " " + user.fname);
                
            }
        });
    }

    



}

var myController = Controller();
myController.getItems();
//myController.addRecord('fatemeh', 'karimi', 'tehran');
myController.addRecord('fatemeh', 'karimi', 'tehran').then(function (user) {console.log(user) });
myController.deleteRecord(3);
myController.updateRecord(5);