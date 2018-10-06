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
		isDisplayed: function() {
			return this.getMenu().classList.contains('share-menu-active')
		},
		showMenu: function() {
			if(!this.isDisplayed()) {
				this.getMenu().classList.add('share-menu-active')
			}
		},
		hideMenu: function() {
			if(this.isDisplayed()) {
				this.getMenu().classList.remove('share-menu-active')
			}
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
			let menuWidth = menuElement.offsetWidth
			let menuHeight = menuElement.offsetHeight

			console.log('Menu ', menuWidth, menuHeight)

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
				menuElement.classList.add('share-menu-arrow-over')
				menuElement.classList.remove('share-menu-arrow-under')
				positions.top += buttonHeight + boundary.height - 50
			} else {
				menuElement.classList.add('share-menu-arrow-under')
				menuElement.classList.remove('share-menu-arrow-over')
				positions.top += 50
			}

			if(middleBoundary < halfOffsetWidth) {
				positions.left = defaultLeft + halfOffsetWidth
				positions.right = 'initial'
			} else if((containerWidth - middleBoundary) < halfOffsetWidth) {
				positions.left = 'auto'
				positions.right = 0
			} else {
				positions.left = defaultLeft + middleBoundary
				positions.right = 'initial'
			}

			console.log(middleBoundary, positions.top)
			setToolbarPosition(middleBoundary, positions.top)

		}
	}

	document.addEventListener('mouseup', function() {		

		if(window.getSelection().toString()) {
			sharer.positionMenu(window.getSelection())		
			sharer.showMenu()
		} else {
			sharer.hideMenu()
		}
	})

	function setToolbarPosition(x, y) {
		Toolbar.style.left = `${x}px`
		Toolbar.style.top = `${y}px`
	}
})()
