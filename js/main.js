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
			if (
				$headerMenu &&
				window.innerWidth <= MOBILE_MENU_BREAKPOINT &&
				!isInit
			) {
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
					// Исключаем наведение на элементы без вложенного меню
					if (item.querySelector('.navigation__submenu')) {
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
					}
				})
			} else {
				$links.forEach(link => {
					link.addEventListener('click', function (e) {
						if (link.nextElementSibling) {
							e.preventDefault()
							link.nextElementSibling.classList.toggle('active')
						}
					})
				})
			}
		}
		initMenuHover()
	}

	function initLoginMenu() {
		const $loginMenu = document.querySelector('.login-menu')
		const $avatar = document.querySelector('.header__avatar')
		const MOBILE_MENU_BREAKPOINT = 1024

		if ($avatar && $loginMenu && window.innerWidth > MOBILE_MENU_BREAKPOINT) {
			$avatar.addEventListener('click', function (e) {
				e.preventDefault()
				$loginMenu.classList.add('active')
			})
			document.body.addEventListener('click', function (e) {
				e.preventDefault()
				if (
					!e.target.closest('.header__avatar') &&
					!e.target.closest('.login-menu')
				) {
					$loginMenu.classList.remove('active')
				}
			})
		}
		
	}

	function initCopyProfileLink() {
		const $button = document.querySelector('.profile__title button')

		if ($button) {
			$button.addEventListener('click', function () {
				const link = this.closest('.profile__title')
					.querySelector('a')
					.getAttribute('href')
				navigator.clipboard.writeText(link)
			})
		}
	}

	function initProfileNavigation() {
		const $items = document.querySelectorAll('.profile__nav li a')
		const $sections = document.querySelectorAll('.profile-box')

		if ($items.length > 0) {
			// Навигация по клику
			$items.forEach(item => {
				item.addEventListener('click', function (e) {
					e.preventDefault()

					const $active = document.querySelector('.profile__nav li.active')
					const $section = document.querySelector(item.getAttribute('href'))

					$active.classList.remove('active')
					item.closest('li').classList.add('active')

					window.scrollTo({
						top: $section.offsetTop - 100,
						behavior: 'smooth',
					})
				})
			})

			function checkActiveSection(section) {
				if (
					document.documentElement.scrollTop >
					section.offsetTop - window.innerHeight / 2 + 100
				) {
					const $active = document.querySelector('.profile__nav li.active')
					$currentLink = document.querySelector('a[href="#' + section.id + '"]')

					$active.classList.remove('active')
					$currentLink.closest('li').classList.add('active')
				}
			}
			window.addEventListener('scroll', function () {
				const $profile = document.querySelector('#profile')
				checkActiveSection($profile)
			})
			$sections.forEach(item => {
				window.addEventListener('scroll', function () {
					if (item.id) {
						checkActiveSection(item)
					}
				})
			})
		}
	}

	function initProfileMore() {
		const $moreBtn = document.querySelector('.profile__arrow')
		const $moreBtnText = document.querySelector('.profile__arrow span')
		const $profile = document.querySelector('.profile__contacts')

		if ($moreBtn) {
			const moreText = $moreBtnText.dataset.show
			const lessText = $moreBtnText.dataset.hide
			$moreBtn.addEventListener('click', function () {
				if ($profile.classList.contains('active')) {
					$moreBtnText.textContent = moreText
					$profile.classList.remove('active')
				} else {
					$moreBtnText.textContent = lessText
					$profile.classList.add('active')
				}
			})
		}
	}

	function initPortfolioMore() {
		const $moreBtn = document.querySelector('.editing__portfolio-show')
		const $portfolio = document.querySelector('.editing__portfolio')

		if ($moreBtn) {
			const moreText = $moreBtn.dataset.show
			const lessText = $moreBtn.dataset.hide
			$moreBtn.addEventListener('click', function () {
				if ($portfolio.classList.contains('active')) {
					$moreBtn.textContent = moreText
					$portfolio.classList.remove('active')
				} else {
					$moreBtn.textContent = lessText
					$portfolio.classList.add('active')
				}
			})
		}
	}

	function initModals() {
		const $modals = document.querySelectorAll('.modal')
		const $html = document.querySelector('html')
		const $modalsTriggers = document.querySelectorAll(
			'[data-micromodal-trigger]'
		)

		if ($modals.length > 0) {
			MicroModal.init({
				onShow: modal => $html.classList.add('overflow-hidden'),
				onClose: modal => {
					$html.classList.remove('overflow-hidden')
					if (
						modal.id === 'modal-finish' &&
						modal.classList.contains('active')
					) {
						setTimeout(function () {
							modal.classList.remove('active')
						}, 300)
					}
				},
				awaitOpenAnimation: true,
				awaitCloseAnimation: true,
			})
			$modalsTriggers.forEach(item => {
				item.addEventListener('click', function (e) {
					e.preventDefault()
				})
			})
		}
	}

	function initFilter() {
		const $filter = document.querySelector('.filter')

		if ($filter) {
			$filter.addEventListener('click', function (e) {
				const $item = e.target
				if ($item.classList.contains('filter__name')) {
					$item.closest('.filter__item').classList.toggle('active')
				}
			})
		}
	}

	function initSelects() {
		$selects = document.querySelectorAll('.app-select')

		if ($selects.length > 0) {
			$selects.forEach(select => {
				initSelect(select)
			})
		}

		function initSelect($select) {
			const $current = $select.querySelector('.app-select__current')
			const $currentValue = $current.querySelector('.app-select__value')

			document.body.addEventListener('click', function (e) {
				const $currentSelect = e.target.closest(`#${$select.id}`)

				if ($currentSelect && !$select.classList.contains('active')) {
					// Клик по закрытому селекту
					$select.classList.add('active')
				} else if ($currentSelect && e.target.closest('.app-select__option')) {
					// Клик по опции, когда селект открыт
					const option = e.target.closest('.app-select__option')
					$currentValue.textContent = option.textContent
					$currentValue.dataset.value = option.dataset.value
					$select.classList.remove('active')
				} else {
					// Клик мимо селекта
					$select.classList.remove('active')
				}
			})
		}
	}

	function initTabs() {
		const $tabs = document.querySelectorAll('[data-tab-title]')

		if ($tabs.length > 0) {
			$tabs.forEach(tab => {
				tab.addEventListener('click', function (e) {
					e.preventDefault()

					const activeTab = document.querySelector('[data-tab-title].active')
					const activeContent = document.querySelector(
						'[data-tab-content].active'
					)
					const id = tab.getAttribute('data-tab')

					if (activeTab) {
						activeTab.classList.remove('active')
						activeContent.classList.remove('active')
					}
					const content = document.querySelector(
						'[data-tab-content][data-tab="' + id + '"]'
					)

					tab.classList.add('active')
					content.classList.add('active')
				})
			})
		}
	}

	function initFinishModal() {
		const $btn = document.querySelector('#modal-review-btn')

		if ($btn) {
			$btn.addEventListener('click', function () {
				$btn.closest('.modal-finish').classList.add('active')
			})
		}
	}

	function initStarsRating() {
		const $stars = document.querySelectorAll('.star-rating')

		if ($stars.length > 0) {
			$stars.forEach(rating => {
				new StarRating(rating, {
					tooltip: false
				})
			})
		}
	}

	initMenu()
	initCopyProfileLink()
	initProfileNavigation()
	initPortfolioMore()
	initModals()
	initFilter()
	initSelects()
	initTabs()
	initFinishModal()
	initStarsRating()
	initProfileMore()
	initLoginMenu()
})
