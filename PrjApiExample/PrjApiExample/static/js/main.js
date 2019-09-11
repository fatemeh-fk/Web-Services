 var urls = {
        'GetUsers': 'https://my-json-server.typicode.com/wallouf/json-fake-server-test/users',
        'AddUsers': ' https://my-json-server.typicode.com/wallouf/json-fake-server-test/users',
        'DeleteUsers': 'https://my-json-server.typicode.com/wallouf/json-fake-server-test/users',
        'EditUsers': 'https://my-json-server.typicode.com/wallouf/json-fake-server-test/users'
    }
function render(newuser) {
    var i = 0;
    $('#myTable').append('<tr><td class="noedit idname" id="idname">' + newuser.id + '</td><td class="noedit fname" id="fname">' + newuser.firstname + '</td><td class="noedit lname" id="lname">' + newuser.lastname + '</td><td class="noedit bplace" id="bplace">' + newuser.birthplace + '</td><td><input type="submit" value="Edit" class="btn btn-primary Edit noedit" id="btnEdit" name="' + i + '" ></input><input type="submit" id=btnDelete value="Delete" class="btn btn-primary Delete" name="' + i + '"><input type="submit" id=btnCancle value="Cancle" class="CancleEdit btn btn-primary edit" name="' + i + '"><input type="submit" id=btnSave value="Save" class="btn btn-primary SaveEdit edit" name="' + i + '"></td></tr>');
    i++
}
$(function () {
    
var $container = $('#myTable');
    var $fname = $('#fname');
    var $lname = $('#lname');
    var $bplace = $('#bplace');
    //load user
        return jQuery.get(urls.GetUsers, function (items) {
            console.log(items);
           
            items.forEach((item) => {
                //var i=0
                //$('#myTable').append('<tr><td class="noedit idname" id="idname">' + item.id + '</td><td class="noedit fname" id="fname">' + item.firstname + '</td><td class="noedit lname" id="lname">' + item.lastname + '</td><td class="noedit bplace" id="bplace">' + item.birthplace + '</td><td><input type="submit" value="Edit" class="btn btn-primary Edit noedit" id="btnEdit"  name="' + i + '"></input><input type="submit" id=btnDelete value="Delete" class="btn btn-primary Delete" name="' + i + '"><input type="submit" id=btnCancle value="Cancle" class="btn btn-primary CancleEdit edit" name="' + i + '"><input type="submit" id=btnSave value="Save" class="btn btn-primary SaveEdit edit" name="' + i + '"></td></tr>');
                //i++;
                render(item);
            });

        });

   


});

//add
$(document).on('click', '#add', function () {
       
    var user = {
        firstname: $('#fname-').val(),
        lastname: $('#lname-').val(),
        birthplace: $('#bplace-').val(),
    };
    $.ajax({
        type: 'POST',
        url: urls.AddUsers,
        data: user,
        success: function (newuser) {
            console.log(newuser)
            //var i = 0;
            //$('#myTable').append('<tr><td class="noedit idname" id="idname">' + newuser.id + '</td><td class="noedit fname" id="fname">' + newuser.firstname + '</td><td class="noedit lname" id="lname">' + newuser.lastname + '</td><td class="noedit bplace" id="bplace">' + newuser.birthplace + '</td><td><input type="submit" value="Edit" class="btn btn-primary Edit noedit" id="btnEdit" name="' + i + '" ></input><input type="submit" id=btnDelete value="Delete" class="btn btn-primary Delete" name="' + i + '"><input type="submit" id=btnCancle value="Cancle" class="CancleEdit btn btn-primary edit" name="' + i + '"><input type="submit" id=btnSave value="Save" class="btn btn-primary SaveEdit edit" name="' + i + '"></td></tr>');
            //i++
            render(newuser)
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
    var $td = $tr.find("td");

    var fname = $(this).parents("tr").find("td:eq(1)").html();
    $(this).parents("tr").find("td:eq(1)").html('<input name="edit_name" id="fn" value="' + fname + '">');
    var lname = $(this).parents("tr").find("td:eq(2)").html();
    $(this).parents("tr").find("td:eq(2)").html('<input name="edit_name" id="ln" value="' + lname + '">');
    var bplace = $(this).parents("tr").find("td:eq(3)").html();
    $(this).parents("tr").find("td:eq(3)").html('<input name="edit_name"id="bp" value="' + bplace + '">');

    
    $td.addClass('edit');
    
});
//cancle
$(document).on('click', '#btnCancle', function () {

    var $tr = $(this).parent().parent();
    var $td = $tr.find("td");
    var $fn = $td.find("#fn").val();
    var $ln = $td.find("#ln").val();
    var $bp = $td.find("#bp").val();
    $(this).parents("tr").find("td:eq(1)").text($fn);
    $(this).parents("tr").find("td:eq(2)").text($ln);
    $(this).parents("tr").find("td:eq(3)").text($bp);
    $td.removeClass('edit');
   
});
//save
$(document).on('click', '#btnSave', function () {

    var $tr = $(this).parent().parent();
    var $td = $tr.find("td");
    var $fn = $td.find("#fn").val();
    var $ln = $td.find("#ln").val();
    var $bp = $td.find("#bp").val();
    $(this).parents("tr").find("td:eq(1)").text($fn);
    $(this).parents("tr").find("td:eq(2)").text($ln);
    $(this).parents("tr").find("td:eq(3)").text($bp);
    console.log("$fn", $fn)
    $td.removeClass('edit');
    var user={
        fname: $fn,
        lname: $ln,
        place: $bp
    }
    console.log(user);
    var id = $(this).parent().siblings(":first").text();
    console.log(id)
    $.ajax({
        
        url: urls.EditUsers + "/" + id,
        method: 'PUT',
        data:user,
        success: function (newuser) {
            console.log("hhh");
            var i = 0;
            $('#myTable').append('<tr><td class="noedit idname" id="idname">' + newuser.id + '<input class="edit idname"/></td><td class="noedit fname" id="fname">' + newuser.fname + '<input class="edit fname"/></td><td class="noedit lname" id="lname">' + newuser.lname + '<input class="edit lname"/></td><td class="noedit bplace" id="bplace">' + newuser.bplace + '<input class="edit bplace"/></td><td><input type="submit" value="Edit" class="Edit noedit" id="btnEdit" name="' + i + '" ></input><input type="submit" id=btnDelete value="Delete" class="Delete" name="' + i + '"><input type="submit" id=btnCancle value="Cancle" class="CancleEdit edit" name="' + i + '"><input type="submit" id=btnSave value="Save" class="SaveEdit edit" name="' + i + '"></td></tr>');
            i++

        },
        error: function (e) {
                alert("error");
           }
    });
});
