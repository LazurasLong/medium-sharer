import './style.css'

function extend(object) {
	if(arguments.length <= 0) {
		throw new Error('Missing arguments in extend function')
	}

	let result = object || {}
	for(let i = 1; i < arguments.length; i++) {
		let replacement = arguments[i] || {}	
		for(let key in replacement) {			
			if(typeof result[key] === 'object' && !isDomElement(result[key])) {				
				result[key] = extend(result[key], replacement[key])
			} else {				
				result[key] = result[key] || replacement[key]				
			}
		}
	}	
	return result
}

function MediumSharer(element, options) {
	options = extend(options, MediumSharer.defaultOptions)	

	this.element = element
	this.buttons = options.buttons	
}

MediumSharer.prototype = {
	constructor: MediumSharer,
	window: window,
	diffLeft: 0,
	diffTop: -10,

	init: function() {
		document.addEventListener('mouseup', function() {		
			setTimeout(function() {
				if(window.getSelection().toString()) {
					this.positionMenu(window.getSelection())		
					this.showMenu()
				} else {
					this.hideMenu()
				}
			}, 0)
		})		
	},

	getMenuElement: function() {
		if(!this.menu) {
			this.menu = document.getElementById('Toolbar')
		}
		return this.menu
	},

	isDisplayed: function() {
		return this.getMenuElement().classList.contains('share-menu-active')
	},

	showMenu: function() {
		if(!this.isDisplayed()) {
			this.getMenuElement().classList.add('share-menu-active')
		}
	},
	hideMenu: function() {
		if(this.isDisplayed()) {
			this.getMenuElement().classList.remove('share-menu-active')
		}
	},

	getMenuWidth: function() {
		let menuElement = this.getMenuElement()
		menuElement.style.left = '0'
		menuElement.style.right = 'initial'
		return menuElement.offsetWidth
	},

	getMenuHeight: function() {
		let menuElement = this.getMenuElement()
		menuElement.style.left = '0'
		menuElement.style.right = 'initial'
		return menuElement.offsetHeight	
	},
	getBoundary: function(selection) {
		let range = selection.getRangeAt(0)
		let boundary = range.getBoundingClientRect()
		if(!boundary || ((boundary.height === 0 && boundary.width === 0) && range.startContainer === range.endContainer)) {
			boundary = range.startContainer.getBoundingClientRect()
		}	
		return boundary
	},
	positionMenu: function(selection) {
		let boundary = this.getBoundary(selection)
		let containerWidth = this.window.innerWidth
		const menuElement = this.getMenuElement()
		const menuWidth = this.getMenuWidth()
  	const menuHeight = this.getMenuHeight()
		let halfOffsetWidth = menuWidth / 2
		let buttonHeight = 50
		let defaultLeft = this.diffLeft - halfOffsetWidth

		let elementsContainer = document.getElementById('Container')	

		let positions = {},
      relativeBoundary = {},
      middleBoundary, 
      elementsContainerBoundary;
		let elementsContainerAbsolute = ['absolute', 'fixed'].indexOf(window.getComputedStyle(elementsContainer).getPropertyValue('position')) > -1

		if(elementsContainerAbsolute) {
			console.log('Container is absolute')
		} else {
			positions.top = this.window.pageYOffset				
		}
			
		middleBoundary = boundary.left  + boundary.width / 2
		positions.top += boundary.top - menuHeight

		if(boundary.top < buttonHeight) {
			menuElement.classList.add('share-menu-arrow-over')
			menuElement.classList.remove('share-menu-arrow-under')
			positions.top += buttonHeight + boundary.height - this.diffTop
		} else {
			menuElement.classList.add('share-menu-arrow-under')
			menuElement.classList.remove('share-menu-arrow-over')
			positions.top += this.diffTop
		}

		if(middleBoundary < halfOffsetWidth) {
			positions.left = defaultLeft + halfOffsetWidth
			positions.right = 'initial'
		} else if((containerWidth - middleBoundary) < halfOffsetWidth) {				
			positions.left = 'auto'
			positions.right = '0'
		} else {
			positions.left = defaultLeft + middleBoundary
			positions.right = 'initial'
		}

		this.setToolbarPosition(positions)
	},

	setToolbarPosition: function(positions) {
		['top', 'left', 'right'].forEach(function(key) {
	   this.getMenuElement().style[key] = positions[key] + (isNaN(positions[key]) ? '' : 'px')
		}.bind(this))
	}
}

MediumSharer.defaultOptions = {
	element: 'body',
	buttons: [
		'twitter',
		'facebook',
		'linkedin',
	]
};