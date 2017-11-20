var counter_hw;

var get_counter_hw = () => {
    $.ajax({
        url : "https://luffy.ee.ncku.edu.tw/~csielee/homework-database.php",
        dataType : "json",
        method : "GET",
    }).done( function(data) {
        //$(counter_hw).children("span:nth-child(1)").html(data.now);
        $(counter_hw).children("span:nth-child(1)").html(data.total);
    });

    setTimeout(() => get_counter_hw(), 1000);
};


$(document).ready(()=>{
    $.ajax({
        url : "https://luffy.ee.ncku.edu.tw/~csielee/homework-database.php",
        type : "POST",
        data : {
            'exit' : "no"
        }
    }).then(()=>{
        $('body').append(counter_hw);
        
        get_counter_hw();
    });

    counter_hw = $("<div>總拜訪人數 : <span>0</span></div>");
    counter_hw.css({
        "width" : "auto",
        "height" : "auto",
        "background-color"  : "rgba(0,0,0,0)",
        "position" : "fixed",
        "bottom" : "4vh",
        "right" : "2vh",
        "font-size" : "3vh"
    });

});

window.onunload = () => {/*
    $.ajax({
        url : "https://luffy.ee.ncku.edu.tw/~csielee/homework-database.php",
        type : "POST",
        data : {
            'exit' : "yes"
        }
    }).done((data)=> {
        console.log("close : "+data);
    });

    alert();*/
};

window.onbeforeunload = function () {
    /*var blocked = true;

    $.ajax({
        url : "https://luffy.ee.ncku.edu.tw/~csielee/homework-database.php",
        type : "POST",
        data : {
            'exit' : "yes"
        }
    }).then(()=>{
        blocked = false;
    }).done((data)=> {
        console.log("close : "+data);
    });

    while(blocked);*/
};