/**
 * Created by Cesar on 24/05/2015.
 */
var nick;


$(document).ready(function(){
    var enterButton = $("#pseudoSubmit");
    $(enterButton).click(function(){
        if($("#pseudoInput").val().length > 0){
            nick = $("#pseudoInput").val();
            window.location.replace("/chat.html?" + nick);
        }else{
            $("#alertPseudo").text("Nome é obrigatório!");
            $("#alertPseudo").show();
        }
    });

    $('#pseudoInput').keypress(function(e) {
        if (e.which === 13) {   //ENTER
            $(enterButton).click();
        }
    });
	
});