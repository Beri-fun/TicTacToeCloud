

function isName() {
    let name_value = $('input[name="name"]').val();
    console.log(name_value);
    if ( name_value.length == 0){
        $('.required_name').html("The name is required to start the game")
        $('.required_name').css({'color':'red'});
    }
}


$(document).ready(function() {
    $('.start_game').each(function() {
        $(this).off("click").on("click", isName)
    });
    
});