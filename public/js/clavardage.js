/* 
	Pour établir une communication socket il faut un premier appel de
	la fonction io()
	Cette fonction est incluse dans la librairie socket.io. 
	Cette fonction déclenche un événement connect vers le serveur
*/
window.onload = ()=>{
	socket = io();
	//console.log(socket.id);

	socket.on('connect', function(){
		console.log('Le socket id = ' + socket.id); 
		/* l'événement ackUser a été transmis par le serveur */ 
		socket.on('valide_user', function(data){
			console.log('data en provenance du serveur = ' + data.user);
			let elmEnregistrement = document.querySelector('#enregistrement');
			elmEnregistrement.style.display = 'none';
			let elmChat = document.querySelector('#chat');
			elmChat.style.display = 'flex';
		});
		socket.on('diffuser_list_user', function(data){
			affiche_table_users(data);
		});
		socket.on('valide_message', function(data){
			console.log('valide_message = ' + data);
			afficher_mon_message(data.user, data.message, '#0f0');
		});
		socket.on('diffuser_message', function(data){
			console.log('diffuer_message = ' + data);
			afficher_mon_message(data.user, data.message, '#00f');
		});

	});
}
/* Connexion ---------------------------------------------------------- */
function enregistrement(){
	var elmUser = document.querySelector('#enregistrement input');
	console.log(elmUser.value);
	/* l'événement « setUser » est transmit avec un objet */
	socket.emit('setUser', {user : elmUser.value});
}
/* Transmition du message --------------------------------------------- */
function transmettre_un_message(){
	var elmMessage = document.querySelector('#message_a_transmettre input');
	console.log(elmMessage.value);
	/* l'événement « setUser » est transmit avec un objet 
	*/
	socket.emit('setMessage', {message : elmMessage.value});
}
/* Ajouter les user dans les tables ---------------------------------------------------------- */
function affiche_table_users(data){
	let sChaine = ''
	for (id in data){
		sChaine += '<tr id="'+id+'">'
				+ '<td>' + id + '</td>'
				+ '<td>' + data[id] + '</td>' 
				+ '</tr>';
	}
	
	let elmListeUser = document.querySelector("#list_user");
	elmListeUser.innerHTML = sChaine;
}
function afficher_mon_message(user, message, couleur){
	let elmListeMessage = document.querySelector("#message");
	let ligneMessage = document.querySelector(".gabaritMessage");
	let clone = ligneMessage.cloneNode(true);
	// Mettre mes information dans les td
	clone.querySelector(".messageUser").innerText = user;
	clone.querySelector(".contenu").innerText = message;
	clone.style.color = couleur;
	clone.classList.remove("gabaritMessage");
	elmListeMessage.appendChild(clone);
}