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
        'DeleteUsers':' https://my-json-server.typicode.com/wallouf/json-fake-server-test/users/<id>',
        'EditUsers':' https://my-json-server.typicode.com/wallouf/json-fake-server-test/users/<id>'
    }
    var clients = {};
    return service;


    function getItems() {
        return jQuery.get(urls.GetUsers, function (data) {
            console.log(data);
        });
    }


    function addRecord(fname, lanme, place) {

        return jQuery.post(urls.AddUsers,   // url
             { myData: { 'fname': clients.fname, 'lanme': clients.lanme, 'place': clients.place}}, // data to be submit
             function (data, status, jqXHR) {// success callback
                 clientobj = JSON.stringify(clients);
                 console.log(clientobj);
                 console.log(clients);
               console.log(' fname: ' + data.fname +', lanme: ' + data.lname +',place: ' + data.place);
            },'json')
    }



    function deleteRecord(id) {

         $.ajax({
             url: urls.DeleteUsers + "/" + clients.id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function (result) {
                console.log("this id " + clients.id+" is deleted");
            }
        });
        
        
    }


    function updateRecord(id, fname, lanme,place) {
      return  $.ajax({
          url: urls.EditUsers + "/" + clients.id,
            method: "PUT",
            data: {
                text: newcontent,
            },
            success: function (data) {
                console.log("this id " + clients.id + " is edited");
                
            }
        });
    }

    



}

var myController = Controller();
myController.getItems();
myController.addRecord(fatemeh, karimi, tehran);
myController.deleteRecord(3);
myController.updateRecord(3);