window.addEventListener('DOMContentLoaded', function () {
	function initMenu() {
		const $html = document.querySelector('html')
		const $headerMenu = document.querySelector('.header__menu-inner')
		const $headerBtn = document.querySelector('.header__burger')
		const $headerCloseBtn = document.querySelector('.header__close')
		const $headerOverlay = document.querySelector('.overlay')
		const TRANSITION_DELAY = 400
		const MOBILE_MENU_BREAKPOINT = 1024

		let isInit = false

		const checkScreenWidth = () => {
			// Активируем меню только на экранах <= 1024
			if (window.innerWidth <= MOBILE_MENU_BREAKPOINT && !isInit) {
				isInit = true
				$headerBtn.addEventListener('click', openMenu)
				$headerCloseBtn.addEventListener('click', closeMenu)
				$headerOverlay.addEventListener('click', closeMenu)
			} else {
				window.addEventListener('resize', checkScreenWidth)
			}
		}

		checkScreenWidth()

		function openMenu() {
			$headerOverlay.style.display = 'block'
			$headerMenu.style.display = 'block'
			$html.classList.add('overflow-hidden')
			setTimeout(function () {
				$headerOverlay.classList.add('active')
				$headerMenu.classList.add('active')
			}, 1)
		}

		function closeMenu() {
			$headerOverlay.classList.remove('active')
			$headerMenu.classList.remove('active')
			$html.classList.remove('overflow-hidden')

			setTimeout(function () {
				$headerOverlay.style.display = ''
				$headerMenu.style.display = ''
			}, TRANSITION_DELAY)
		}
		function initMenuHover() {
			const $items = document.querySelectorAll('.navigation__list > li')
			const $links = document.querySelectorAll('.navigation__list > li > a')
			const $overlay = document.querySelector('.overlay')
			const TRANSITION_DELAY = 300

			if (window.innerWidth > MOBILE_MENU_BREAKPOINT) {
				$items.forEach(item => {
					let isHover = false

					item.addEventListener('mouseenter', function () {
						isHover = true
						// Показываем блок
						$overlay.classList.add('active')
						setTimeout(function () {
							// Добавляем стили
						}, 1)
					})
					item.addEventListener('mouseleave', function () {
						isHover = false
						// Убираем стили
						$overlay.classList.remove('active')
						setTimeout(function () {
							if (!isHover) {
								// Скрываем блок
							}
						}, TRANSITION_DELAY)
					})
				})
			} else {
				$links.forEach(link => {
					link.addEventListener('click', function(e) {
						e.preventDefault();
						link.nextElementSibling.classList.toggle('active');
					})
				})
			}
		}
		initMenuHover()
	}
	initMenu()
})