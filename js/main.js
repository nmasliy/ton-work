window.addEventListener("DOMContentLoaded", function () {
	function initMenu() {
		const $html = document.querySelector("html");
		const $headerMenu = document.querySelector(".header__menu-inner");
		const $headerBtn = document.querySelector(".header__burger");
		const $headerCloseBtn = document.querySelector(".header__close");
		const $headerOverlay = document.querySelector(".overlay");
		const TRANSITION_DELAY = 400;
		const MOBILE_MENU_BREAKPOINT = 1024;

		let isInit = false;

		const checkScreenWidth = () => {
			// Активируем меню только на экранах <= 1024
			if (window.innerWidth <= MOBILE_MENU_BREAKPOINT && !isInit) {
				isInit = true;
				$headerBtn.addEventListener("click", openMenu);
				$headerCloseBtn.addEventListener("click", closeMenu);
				$headerOverlay.addEventListener("click", closeMenu);
			} else {
				window.addEventListener("resize", checkScreenWidth);
			}
		};

		checkScreenWidth();

		function openMenu() {
			$headerOverlay.style.display = "block";
			$headerMenu.style.display = "block";
			$html.classList.add("overflow-hidden");
			setTimeout(function () {
				$headerOverlay.classList.add("active");
				$headerMenu.classList.add("active");
			}, 1);
		}

		function closeMenu() {
			$headerOverlay.classList.remove("active");
			$headerMenu.classList.remove("active");
			$html.classList.remove("overflow-hidden");

			setTimeout(function () {
				$headerOverlay.style.display = "";
				$headerMenu.style.display = "";
			}, TRANSITION_DELAY);
		}
		function initMenuHover() {
			const $items = document.querySelectorAll(".navigation__list > li");
			const $links = document.querySelectorAll(".navigation__list > li > a");
			const $overlay = document.querySelector(".overlay");
			const TRANSITION_DELAY = 300;

			if (window.innerWidth > MOBILE_MENU_BREAKPOINT) {
				$items.forEach((item) => {
					// Исключаем наведение на элементы без вложенного меню
					if (item.querySelector(".navigation__submenu")) {
						let isHover = false;

						item.addEventListener("mouseenter", function () {
							isHover = true;
							// Показываем блок
							$overlay.classList.add("active");
							setTimeout(function () {
								// Добавляем стили
							}, 1);
						});
						item.addEventListener("mouseleave", function () {
							isHover = false;
							// Убираем стили
							$overlay.classList.remove("active");
							setTimeout(function () {
								if (!isHover) {
									// Скрываем блок
								}
							}, TRANSITION_DELAY);
						});
					}
				});
			} else {
				$links.forEach((link) => {
					link.addEventListener("click", function (e) {
						e.preventDefault();
						link.nextElementSibling.classList.toggle("active");
					});
				});
			}
		}
		initMenuHover();
	}

	function initCopyProfileLink() {
		const $button = document.querySelector(".profile__title button");

		if ($button) {
			$button.addEventListener("click", function () {
				const link = this.closest(".profile__title")
					.querySelector("a")
					.getAttribute("href");
				navigator.clipboard.writeText(link);
			});
		}
	}

	function initProfileNavigation() {
		const $items = document.querySelectorAll(".profile__nav li a");
		const $sections = document.querySelectorAll(".profile-box");

		if ($items.length > 0) {
			// Навигация по клику
			$items.forEach((item) => {
				item.addEventListener("click", function (e) {
					e.preventDefault();

					const $active = document.querySelector(".profile__nav li.active");
					const $section = document.querySelector(item.getAttribute("href"));

					$active.classList.remove("active");
					item.closest("li").classList.add("active");

					window.scrollTo({
						top: $section.offsetTop - 100,
						behavior: "smooth",
					});
				});
			});

			// Получаем нужный элемент

			var Visible = function (target) {
				// Все позиции элемента
				var targetPosition = {
						top: window.pageYOffset + target.getBoundingClientRect().top,
						left: window.pageXOffset + target.getBoundingClientRect().left,
						right: window.pageXOffset + target.getBoundingClientRect().right,
						bottom: window.pageYOffset + target.getBoundingClientRect().bottom,
					},
					// Получаем позиции окна
					windowPosition = {
						top: window.pageYOffset,
						left: window.pageXOffset,
						right: window.pageXOffset + document.documentElement.clientWidth,
						bottom: window.pageYOffset + document.documentElement.clientHeight,
					};

				if (
					targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
					targetPosition.top < windowPosition.bottom -100 && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
					targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
					targetPosition.left < windowPosition.right
				) {
					// Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
					// Если элемент полностью видно, то запускаем следующий код
					const $active = document.querySelector(".profile__nav li.active");
					$active.classList.remove("active");
					$currentLink = document.querySelector('a[href="#' + target.id + '"]')
					
					$currentLink.closest("li").classList.add("active");

				} else {
					// Если элемент не видно, то запускаем этот код
				}
			};

		// 	$sections.forEach((item) => {
		// 		// Запускаем функцию при прокрутке страницы
		// 		window.addEventListener("scroll", function () {
		// 			Visible(item);
		// 		});

		// 		// А также запустим функцию сразу. А то вдруг, элемент изначально видно
		// 		Visible(item);
		// 	});
		// 	window.addEventListener("scroll", function () {
		// 		Visible(document.querySelector('#profile'));
		// 	});
		}
	}

	initMenu();
	initCopyProfileLink();
	initProfileNavigation();
});
