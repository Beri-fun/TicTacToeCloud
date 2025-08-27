buttons_ids = ["11", "12", "13", "21", "22", "23", "31", "32", "33"];
icon_O = '<i class="fa-solid fa-o fa-5x o_icon"></i>'
icon_X = '<i class="fa-solid fa-x fa-5x x_icon"></i>'
game_status = 'waiting';
buttons_counter = 0;

const handleButton = function(event) {
    event.preventDefault();
    if ($(this).attr('data-icon') != 'Yes') {
        $(this).attr('data-icon','Yes');
        symbol = $('#symbol').attr('data-symbol')
        $(this).attr('data-icon-type', symbol);
        if (symbol == 'O') {
            $(this).html(icon_O);
        } else {
            $(this).html(icon_X);
        }
        buttons_counter += 1;
        sendMove($(this).attr('id'));
        checkResult()
        
    }
};

function checkResult() {
    symbol = $('#symbol').attr('data-symbol');
    if (new Set([$('#11').attr('data-icon-type'), $('#12').attr('data-icon-type'), $('#13').attr('data-icon-type')]).size === 1 && $('#11').attr('data-icon-type') !== undefined){
        if ($('#11').attr('data-icon-type') === symbol){
            showPlayerWin()
        } else {
            showPlayerLoose()
        }
        return 'Yes'
    }
    if (new Set([$('#21').attr('data-icon-type'), $('#22').attr('data-icon-type'), $('#23').attr('data-icon-type')]).size === 1 && $('#21').attr('data-icon-type') !== undefined){
        if ($('#21').attr('data-icon-type') === symbol){
            showPlayerWin()
        } else {
            showPlayerLoose()
        }
        return 'Yes'
    }
    if (new Set([$('#31').attr('data-icon-type'), $('#32').attr('data-icon-type'), $('#33').attr('data-icon-type')]).size === 1 && $('#31').attr('data-icon-type') !== undefined){
        if ($('#31').attr('data-icon-type') === symbol){
            showPlayerWin()
        } else {
            showPlayerLoose()
        }
        return 'Yes'
    }
    if (new Set([$('#11').attr('data-icon-type'), $('#22').attr('data-icon-type'), $('#33').attr('data-icon-type')]).size === 1 && $('#11').attr('data-icon-type') !== undefined){
        if ($('#11').attr('data-icon-type') === symbol){
            showPlayerWin()
        } else {
            showPlayerLoose()
        }
        return 'Yes'
    }
    if (new Set([$('#13').attr('data-icon-type'), $('#22').attr('data-icon-type'), $('#31').attr('data-icon-type')]).size === 1 && $('#13').attr('data-icon-type') !== undefined){
        if ($('#13').attr('data-icon-type') === symbol){
            showPlayerWin()
        } else {
            showPlayerLoose()
        }
        return 'Yes'
    }
    if (new Set([$('#11').attr('data-icon-type'), $('#21').attr('data-icon-type'), $('#31').attr('data-icon-type')]).size === 1 && $('#11').attr('data-icon-type') !== undefined){
        if ($('#11').attr('data-icon-type') === symbol){
            showPlayerWin()
        } else {
            showPlayerLoose()
        }
        return 'Yes'
    }
    if (new Set([$('#12').attr('data-icon-type'), $('#22').attr('data-icon-type'), $('#32').attr('data-icon-type')]).size === 1 && $('#12').attr('data-icon-type') !== undefined){
        if ($('#12').attr('data-icon-type') === symbol){
            showPlayerWin()
        } else {
            showPlayerLoose()
        }
        return 'Yes'
    }
    if (new Set([$('#13').attr('data-icon-type'), $('#23').attr('data-icon-type'), $('#33').attr('data-icon-type')]).size === 1 && $('#13').attr('data-icon-type') !== undefined){
        if ($('#13').attr('data-icon-type') === symbol){
            showPlayerWin()

        } else {
            showPlayerLoose()
        }
        return 'Yes'
    }
    if (buttons_counter == 9){
        showDraw()
    }

    return 'No'

}

function showDraw() {
    disable_buttons()
    $('.resultInfo').removeClass('d-none');
    $('.resultInfo').html(`<h4>It's draw :)</h4>`);
    game_status = 'finish';
    $('.Info_about_who_move').html("");
    clearInterval(myInterval)
}

function showPlayerWin() {
    disable_buttons()
    $('.resultInfo').removeClass('d-none');
    $('.resultInfo').html(`<h4>You win :)</h4>`);
    game_status = 'finish';
    $('.Info_about_who_move').html("");
    clearInterval(myInterval)

}

function showPlayerLoose() {
    disable_buttons()
    $('.resultInfo').removeClass('d-none');
    $('.resultInfo').html(`<h4>You loose :(</h4>`);
    game_status = 'finish';
    $('.Info_about_who_move').html("");
    clearInterval(myInterval)
}


function sendMove(cell_with_move) {

    let data={csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(), 'move': cell_with_move, 'username': $('#username').attr('data-username')};
    checkResult();
    
    if (game_status === 'finish'){
        data['finish'] = '1';
        $('.Info_about_who_move').html("");
    } else {
        data['finish'] = '0';
    }
    $.ajax({
        url: "/make_move",
        method: "post",
        dataType: "json",
        data: data,
        success() {
            $('.Info_about_who_move').html(`<h3>Waiting for the opponent's move</h3>`)
            disable_buttons()
            myInterval = setInterval(checkMove, 2000)
        }
    })

}

function checkMove() {
    if (game_status == 'finish') {
        clearInterval(myInterval)
        $('.Info_about_who_move').html("");
        disable_buttons()

    } else {
        data = {'username': $('#username').attr('data-username')};
        $.ajax({
            url: "/check_move",
            method: "get",
            data: data,
            success(data) {
                if (data['move'] == 'your_move') {
                    $('.Info_about_who_move').html(`<h3>Make your move</h3>`)
                    clearInterval(myInterval)
                    enable_buttons()
                    checkResult()
                    
                }
                if (buttons_ids.includes(data['move'])) {
                    cell_move = data['move'];
                    $(`#${cell_move}`).attr('data-icon','Yes');
                    symbol = $('#symbol').attr('data-symbol');
                    buttons_counter += 1;
                    if (symbol == 'O') {
                        $(`#${cell_move}`).html(icon_X);
                        $(`#${cell_move}`).attr('data-icon-type', 'X');
                    } else {
                        $(`#${cell_move}`).html(icon_O);
                        $(`#${cell_move}`).attr('data-icon-type', 'O');
                    }
                    $('.Info_about_who_move').html(`<h3>Make your move</h3>`);
                    
                    clearInterval(myInterval)
                    enable_buttons()
                    checkResult()
                    
                }

            }
        })

    }

}


function disable_buttons() {
    $('.eachButton').each(function() {
        $(this).addClass('disabled')
    });
}

function enable_buttons() {
    $('.eachButton').each(function() {
        $(this).removeClass('disabled')
    });
}
    


$(document).ready(function() {
    $('.eachButton').each(function() {
        $(this).off("click").on("click", handleButton)
    });
    myInterval = setInterval(checkMove, 2000)
    
});