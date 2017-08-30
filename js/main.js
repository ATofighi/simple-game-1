function setGameTableHeight() {
    var winHeight = $(window).height()-150;
    var w = Math.min(600, Math.min($(window).width(),winHeight));
    $('#gameTable').height(w).width(w);
    $('.cell').css('font-size', ($('.cell').height()*0.9)+'px');
}

function getCell(x, y) {
    return $('#cell-'+x+'-'+y);
}

function cellMove(x, y, mx, my) {
    var $cell = getCell(x, y);
    $cell.animate({
        'top':((x+mx-1)*25+1.2)+'%',
        'left':((y+my-1)*25+1.2)+'%'
    }, 200);
}


/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function checkWin(){
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 4; j++) {
            if(cellArray[i][j] != 4*i+j+1) {
                return false;
            }
        }
    }
    var $win = $('<div />');
    $win.attr('id', 'win');
    $win.hide();
    $('#gameTable').append($win);
    $win.fadeIn().html('<h2>Win</h2>Moves: '+moves);

}

var moves = 0;


var cellArray = [];
{
    function clickCell(x, y) {
        var c00 = cellArray[x][y], c01 = cellArray[x][y+1], c10 = cellArray[x+1][y], c11 = cellArray[x+1][y+1];
	cellArray[x][y] = c10;
	cellArray[x][y+1] = c00;
	cellArray[x+1][y] = c11;
	cellArray[x+1][y+1] = c01;

    }

    for(var i = 0; i < 4; i++) {
        cellArray.push([])
        for(var j = 0; j < 4; j++) {
            cellArray[i].push(4*i+j+1);
        }
    }
    for(var rpt = 0; rpt < 10000; rpt++) {
        var x = parseInt(Math.random()*3);
        var y = parseInt(Math.random()*3);
	clickCell(x, y);
    }
}
for(var i = 0; i < 4; i++) {
    for(var j = 0; j < 4; j++) {
        var $cell = $('<div />');
        $cell.addClass('cell');
        $cell.css('top', (i*25+1.2)+'%');
        $cell.css('left', (j*25+1.2)+'%');
        $cell.attr('id', 'cell-'+(i+1)+'-'+(j+1));
        $cell.html(cellArray[i][j]);
        $('#gameTable').append($cell);
    }
}

for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 3; j++) {
        var $clickArea = $('<div />');
        $clickArea.addClass('clickArea');
        $clickArea.css('top', (i*25+12.5)+'%');
        $clickArea.css('left', (j*25+12.5)+'%');
        $clickArea.attr('id', 'clickArea-'+(i+1)+'-'+(j+1));
        $('#gameTable').append($clickArea);
    }
}

var inMove = false;

$('.clickArea').on('hover, mouseover', function(){
    var id = $(this).attr('id');
    var x = parseInt(id.split('-')[1]);
    var y = parseInt(id.split('-')[2]);
    for(var i = x; i < x+2; i++) {
        for(var j = y; j < y+2; j++) {
            $('#cell-'+i+'-'+j).addClass('hover');
        }
    }
}).mouseout(function(){
    var id = $(this).attr('id');
    var x = parseInt(id.split('-')[1]);
    var y = parseInt(id.split('-')[2]);
    for(var i = x; i < x+2; i++) {
        for(var j = y; j < y+2; j++) {
            $('#cell-'+i+'-'+j).removeClass('hover');
        }
    }
}).click(function(){
    if(inMove)
        return;
    var id = $(this).attr('id');
    var x = parseInt(id.split('-')[1]);
    var y = parseInt(id.split('-')[2]);
    inMove = true;
    cellMove(x, y, 0, +1);
    cellMove(x, y+1, +1, 0);
    cellMove(x+1, y, -1, 0);
    cellMove(x+1, y+1, 0, -1);
    var $c00 = getCell(x+0, y+0),
        $c11 = getCell(x+1, y+1),
        $c01 = getCell(x,y+1),
        $c10 = getCell(x+1, y);
    $c00.attr('id', 'cell-'+(x)+'-'+(y+1));//x,y -> x, y+1
    $c01.attr('id', 'cell-'+(x+1)+'-'+(y+1));//x, y+1 -> x+1, y+1
    $c10.attr('id', 'cell-'+(x)+'-'+(y));// x+1, y -> x, y
    $c11.attr('id', 'cell-'+(x+1)+'-'+(y));
    cellArray[x-1][y-1] = getCell(x, y).html();
    cellArray[x][y-1] = getCell(x+1, y).html();
    cellArray[x-1][y] = getCell(x, y+1).html();
    cellArray[x][y] = getCell(x+1, y+1).html();
    setTimeout(function(){
        inMove = false;
    }, 300);
    moves++;
    $('#moves').html('Moves: '+(moves));
    checkWin();
});
setGameTableHeight();
$(window).resize(setGameTableHeight);
