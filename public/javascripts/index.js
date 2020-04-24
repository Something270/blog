function deletePost(id) {
    //HTTP request using JQuery
    $.post('/delete/'+ id, function(err){

        //callback
        window.location.reload();
    })
}