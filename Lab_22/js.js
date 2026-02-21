$(document).ready(function(){
    let R = $("#R").val();
    let G = $("#G").val();
    let B = $("#B").val();

    document.body.style.background = `rgb(${R}, ${G}, ${B})`;
    $("input[type=text]").attr("value", R);

    $("#R").on("input", function(){
        $("R#_value").attr("value", "");
        R = this.value;
        $("#R_value").attr("value", R);
        document.body.style.background = `rgb(${R}, ${G}, ${B})`;
    });

    $("#R_value").on("input", function(){
        R = this.value;
        $("#R").val(R);
        document.body.style.background = `rgb(${R}, ${G}, ${B})`;
    });
});