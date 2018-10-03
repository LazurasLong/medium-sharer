(function() {
	let Toolbar = document.getElementById('Toolbar')

	document.addEventListener('mouseup', function() {
		let texto = window.getSelection().toString()
		let startOffset = window.getSelection().getRangeAt(0).startOffset
		let endOffset = window.getSelection().getRangeAt(0).endOffset

		let range = window.getSelection().getRangeAt(0)
		let boundary = range.getBoundingClientRect()

		if(!boundary || ((boundary.height === 0 && boundary.width === 0) && range.startContainer === range.endContainer)) {
			boundary = range.startContainer.getBoundingClientRect()			
		}

		setToolbarPosition(boundary.left + boundary.width / 2, boundary.top)

	})

	function setToolbarPosition(x, y) {
		Toolbar.style.left = `${x}px`
		Toolbar.style.top = `${y}px`
	}






})()
