 var urls = {
        'GetUsers': 'https://my-json-server.typicode.com/wallouf/json-fake-server-test/users',
        'AddUsers': ' https://my-json-server.typicode.com/wallouf/json-fake-server-test/users',
        'DeleteUsers': 'https://my-json-server.typicode.com/wallouf/json-fake-server-test/users',
        'EditUsers': 'https://my-json-server.typicode.com/wallouf/json-fake-server-test/users'
    }

$(function () {
    
var $container = $('#myTable');
    var $fname = $('#fname');
    var $lname = $('#lname');
    var $bplace = $('#bplace');
    //load user
        return jQuery.get(urls.GetUsers, function (items) {
            console.log(items);
            var i=0
            items.forEach((item) => {
               
                $('#myTable').append('<tr><td class="noedit idname" id="idname">' + item.id + '<input class="edit idname"/></td><td class="noedit fname" id="fname">' + item.firstname + '<input class="edit fname"/></td><td class="noedit lname" id="lname">' + item.lastname + '<input class="edit lname"/></td><td class="noedit bplace" id="bplace">' + item.birthplace + '<input class="edit bplace"/></td><td><input type="submit" value="Edit" class="Edit noedit" id="btnEdit"  name="' + i + '"></input><input type="submit" id=btnDelete value="Delete" class="Delete" name="' + i + '"><input type="submit" id=btnCancle value="Cancle" class="CancleEdit edit" name="' + i + '"><input type="submit" id=btnSave value="Save" class="SaveEdit edit" name="' + i + '"></td></tr>');
                i++;
            });

        });

   


});

//add
$(document).on('click', '#add', function () {
       
    var user = {
        fname: $('#fname-').val(),
        lname: $('#lname-').val(),
        bplace: $('#bplace-').val(),
    };
    $.ajax({
        type: 'POST',
        url: urls.AddUsers,
        data: user,
        success: function (newuser) {
            console.log(newuser)
            var i = 0;
            $('#myTable').append('<tr><td class="noedit idname" id="idname">' + newuser.id + '<input class="edit idname"/></td><td class="noedit fname" id="fname">' + newuser.fname + '<input class="edit fname"/></td><td class="noedit lname" id="lname">' + newuser.lname + '<input class="edit lname"/></td><td class="noedit bplace" id="bplace">' + newuser.bplace + '<input class="edit bplace"/></td><td><input type="submit" value="Edit" class="Edit noedit" id="btnEdit" name="' + i + '" ></input><input type="submit" id=btnDelete value="Delete" class="Delete" name="' + i + '"><input type="submit" id=btnCancle value="Cancle" class="CancleEdit edit" name="' + i + '"><input type="submit" id=btnSave value="Save" class="SaveEdit edit" name="' + i + '"></td></tr>');
            i++
        }

    });

});
//delete
$(document).on('click', '#btnDelete', function () {
    var $pos = $(this).parent().parent();
    var id = $(this).parent().siblings(":first").text();
    
    $.ajax({
        url: urls.DeleteUsers + "/" + id,
        method: 'DELETE',
        success: function (result) {
            $pos.fadeOut(300, function () {
                  $(this).remove();
            })
                
        }
        ,
        error: function (e) {
            alert("error");
        }
    });
});
//edit
$(document).on('click', '#btnEdit', function () {
    var $tr = $(this).parent().parent();
    var $td = $tr.parent().siblings();
    console.log($td);
    $tr.find('td input.fname').val($tr.find('td.fname').html());
    $tr.find('td input.lname').val($tr.find('td.lname').html());
    $tr.find('td input.bplace').val($tr.find('td.bplace').html());
    $tr.addClass('edit');
    
   
});
//cancle
$(document).on('click', '#btnCancle', function () {
    var $tr = $(this).parent().parent();
    $tr.removeClass('edit');
   
});
//save
$(document).on('click', '#btnSave', function () {
    var $tr = $(this).parent().parent();
    var order={
        fname: $tr.find('td.fname').val(),
            lname: $tr.find('td.fname').val(),
        place: $tr.find('td.fname').val(),
    }
    var id = $(this).parent().siblings(":first").text();
    $.ajax({
        url: urls.EditUsers + "/" + id,
        method: 'PUT',
        data:order,
        success: function (neworder) {
            var i = 0;
            $('#myTable').append('<tr><td class="noedit idname" id="idname">' + newuser.id + '<input class="edit idname"/></td><td class="noedit fname" id="fname">' + newuser.fname + '<input class="edit fname"/></td><td class="noedit lname" id="lname">' + newuser.lname + '<input class="edit lname"/></td><td class="noedit bplace" id="bplace">' + newuser.bplace + '<input class="edit bplace"/></td><td><input type="submit" value="Edit" class="Edit noedit" id="btnEdit" name="' + i + '" ></input><input type="submit" id=btnDelete value="Delete" class="Delete" name="' + i + '"><input type="submit" id=btnCancle value="Cancle" class="CancleEdit edit" name="' + i + '"><input type="submit" id=btnSave value="Save" class="SaveEdit edit" name="' + i + '"></td></tr>');
            i++

        }
    });
});
