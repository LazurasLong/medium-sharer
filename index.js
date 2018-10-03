(function() {
	let Toolbar = document.getElementById('Toolbar')

	document.addEventListener('mouseup', function() {
		let texto = window.getSelection().toString()
		let startOffset = window.getSelection().getRangeAt(0).startOffset
		let endOffset = window.getSelection().getRangeAt(0).endOffset


		if(!boundary || ((boundary.height === 0 && boundary.width === 0) && range.startContainer === range.endContainer)) {
			boundary = range.startContainer.getBoundingClientRect()			
		}

		setToolbarPosition(boundary.left + boundary.width / 2, boundary.top)

	})

	function setToolbarPosition(x, y) {
		Toolbar.style.left = `${x}px`
		Toolbar.style.top = `${y}px`
	}


	let Sharer = {
		window: window
		diffLeft: 0

		getMenu: function() {
			if(!this.menu) {
				this.menu = document.getElementById('Toolbar')
			}
			return this.menu			
		} 

		positionMenu: function(selection) {
			this.getMenu().style.left = '0'
			this.getMenu().style.right = 'initial'

			let range = selection.getRangeAt(0)
			let boundary = range.getBoundingClientRect()

			if(!boundary || ((boundary.height === 0 && boundary.width === 0) && range.startContainer === range.endContainer)) {
				boundary = range.startContainer.getBoundingClientRect()
			}

			let containerWidth = this.window.innerWidth
			let menuElement = this.getMenu()
			let menuWidth = menuElement.offsetHeight
			let menuHeight = menuElement.offsetWidth

			let halfOffsetWidth = menuWidth / 2
			let buttonHeight = 50
			defaultLeft = this.diffLeft - halfOffsetWidth
			

		}
		

	}


})()
