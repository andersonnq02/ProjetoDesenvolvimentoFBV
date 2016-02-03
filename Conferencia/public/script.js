var messageContainer, submitButton;
var pseudo = "";

// Init
$(function() {
    pseudo = decodeURIComponent(window.location.href.split("?")[1]);
    if(pseudo == undefined || pseudo === 'undefined' ||pseudo.length === 0){
        window.location.replace("/");
    }
    window.history.pushState("window.location", "Chat Multimídia", "/");
	messageContainer = $('#messageInput');
	submitButton = $("#submit");

    setPseudo();
    setUserName();

	submitButton.click(function(){
        sentMessage();
    });

	$('#messageInput').keypress(function(e) {
	    if (e.which === 13) {   //ENTER
            sentMessage();
        }
    });
    $("#chatMultimidia").click(function(){
        $('#creditos').modal('show');
    });
});

//Socket.io
var socket = io.connect();
socket.on('connect', function() {
	console.log('connected');
});
socket.on('nbUsers', function(msg) {
	$("#nbUsers").html(msg.nb);
});
socket.on('message', function(data) {
	addMessage(data['message'], data['pseudo'], new Date().toISOString(), false);
	console.log(data);
});

//Help functions
function sentMessage() {
	if (messageContainer.val() != "") 
	{
		if (pseudo == "") 
		{
			$('#modalPseudo').modal('show');
		}
		else 
		{
			socket.emit('message', messageContainer.val());
			addMessage(messageContainer.val(), "Eu", true);
			messageContainer.val('');
		}
	}
}
function addMessage(msg, pseudo, self) {
    var classDiv = self === true ? "alert alert-success" : "alert alert-warning";
    $("#chatEntries").append('<div class="'+classDiv+'" role="alert"><p class="infos"><span class="pseudo">'+pseudo+'</span></p><p>' + msg + '</p></div>');
    $("#chatEntries").scrollTop(10000);
}

function setPseudo() {
    socket.emit('setPseudo', pseudo);
    socket.on('pseudoStatus', function(data){
    })
}

function setUserName(){
    $("#userName").text(pseudo);
}


