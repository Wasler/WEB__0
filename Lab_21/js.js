$(document).ready(function(){
    $("#btn").click(function(){
        let textOfLink = $("#text").val();
        $("#link").attr("href", "https://" + textOfLink);
        $("#text").val("");
    });
});