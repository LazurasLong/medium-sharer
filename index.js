(function() {

	let sharer = {
		window: window,
		diffLeft: 0,

		getMenu: function() {
			if(!this.menu) {
				this.menu = document.getElementById('Toolbar')
			}
			return this.menu			
		}, 

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
			let defaultLeft = this.diffLeft - halfOffsetWidth
			let elementsContainer = document.getElementById('Container')
			let positions = {},
        	relativeBoundary = {},
        	middleBoundary, elementsContainerBoundary;

			let elementsContainerAbsolute = ['absolute', 'fixed'].indexOf(window.getComputedStyle(elementsContainer).getPropertyValue('position')) > -1

			if(elementsContainerAbsolute) {

			} else {
				positions.top = this.window.pageYOffset
			}


			middleBoundary = boundary.left  + boundary.width / 2
			positions.top += boundary.top - menuHeight

			if(boundary.top < buttonHeight) {
				menuElement.classList.add('share-menu-over')
				menuElement.classList.remove('share-menu-under')
				positions.top += buttonHeight + boundary.height - 50
			} else {
				menuElement.classList.add('share-menu-under')
				menuElement.classList.remove('share-menu-over')
				positions.top += 50px
			}


			console.log(middleBoundary, positions.top)
			setToolbarPosition(middleBoundary, positions.top)

		}
	}

	let Toolbar = document.getElementById('Toolbar')

	document.addEventListener('mouseup', function() {
		let texto = window.getSelection().toString()
		let startOffset = window.getSelection().getRangeAt(0).startOffset
		let endOffset = window.getSelection().getRangeAt(0).endOffset
		sharer.positionMenu(window.getSelection())


	})

	function setToolbarPosition(x, y) {
		Toolbar.style.left = `${x}px`
		Toolbar.style.top = `${y}px`
	}


})()
