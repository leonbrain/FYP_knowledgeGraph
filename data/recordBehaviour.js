function recordBehaviour(tag, action, targetTag){
	switch (action) {
		case "yes_helpful":
			var element = document.getElementById('yesVote');
			element.style.color = 'orange';
			break;
		case "not_helpful":
			var element = document.getElementById('noVote');
			element.style.color = 'orange';
			break;
		default:
			break;
	}

	if (targetTag === undefined) {
		$.post('/sendBehaviour', {tag: tag, action: action, targetTag: ''});
	}
	else {
		$.post('/sendBehaviour', {tag: tag, action: action, targetTag: targetTag});
	}
}