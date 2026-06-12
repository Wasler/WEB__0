let timeStorage = localStorage
let time

if (timeStorage.getItem("time") != null) {
    time = parseInt(timeStorage.getItem("time"));
} else {
    time = 300;
    timeStorage.setItem("time", null);
}

let answer = [
    ["Гаррі Поттер", "harry potter"],
    ["губка боб", "губка боб квадратні штани", "spongebob", "sponeg bob"],
    ["пірати", "пірати карибського моря", "капітан джек горобець", "pirates of the caribbean"],
    ["сімпсони", "simpsons", "the simpsons"],
    ["зоряні війни", "імпепрський марш", "star wars"],
    ["король лев", "сімба", "lion king", "the lion king"],
    ["крижане серце", "frozen"],
    ["шрек", "shrek"],
    ["шрек", "shrek"],
    ["роккі", "rocky"],
    ["індіана джонс", "indiana jones"],
    ["один дома", "home alone"],
    ["термінатор", "terminator"],
    ["назад в майбутьнє", "back to future"],
    ["мисливі за привидами", "ghost busters"],
];

let was = [];
let progress = 0;
let num = Math.floor(1 + Math.random() * 15);

$(document).ready(function () {
    $(".progress").knob({
        'min': 0,
        'max': 10,
        'angleOffset': -60,
        'angleArc': 120,
        "readOnly": true,
        'width': '100%',
        'thinckness': 0.2,
        'lineCap': 'round',
        'displayInput': false,
        'bgColor': '#cecae3',
        'fgColor': '#3b1b5b'
    });
    $(".time").knob({
        'min': 0,
        'max': 300,
        'angleOffset': 0,
        'angleArc': 360,
        "readOnly": true,
        'width': '100%',
        'thinckness': 0.2,
        'lineCap': 'butt',
        'displayInput': false,
        'bgColor': '#cecae3',
        'fgColor': '#3b1b5b'
    });

    $(".slideRules").click(function () {
        $("#rules").slideToggle();
    });

    $("#start").click(function () {
        $("#start").css('display', 'none');
        $(".sound").css('display', 'block');
        startRebus(num);
        startTime();
    });

    $("#btnTask").click(function () {
        if (answer[num - 1].indexOf($("#inputTask").val().toLowerCase()) != -1) {
            alertify.success("Right answer!");
            $("#inputTask").val("");
            progress++;
            $(".progress").val(progress).trigerr('change');
            was.push(num);
            console.log(was);

            if (progress < 10) {
                do {
                    num = Math.floor(1 + Math.random() * 15);
                } while (was.includes(num));
                startRebus(num);
            } else {
                $(".sound", "#btnTask", "inputaTask").css({ 'display': 'none' });
                $("#nextTask").css({ 'display': 'flex' });
                localStorage.removeItem("time");
            }
        } else {
            alertify.error("Wrong answer. Try again!");
        }
    });
});

function startRebus(arg){
    $("#melody").attr("src", `sound/${arg}.mp3`);
}

function startTime(){
    setInterval(function(){
        time = parseInt(localStorage.getItem("time")) - 1;
        $(".time").val(time).trigger('change');
        if(time == 0){
            alertify.error("Time is out!");
            setTimeout(() => window.open("../Task1/tasl1.html", "_self", false), 2000);
            localStorage.removeItem("time");
        }else if (time > 0){
            localStorage.setItem("time", time);
        }
    }, 1000);
}