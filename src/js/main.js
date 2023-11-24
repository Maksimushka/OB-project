document.addEventListener('DOMContentLoaded', () => {
  // Сделать что-то при клике вне текущего элемента
  const detectClickOutsideElementAndApplyFunction = (
    elem,
    elemActivateBtn,
    callback
  ) => {
    document.addEventListener('click', function (e) {
      if (!elem.contains(e.target) && !elemActivateBtn.contains(e.target)) {
        callback.call(this, elem, elemActivateBtn)
      }
    })
  }

  // Функция для показа различных элементов по клику (меню, фильтры и тд)
  const activateByClick = (
    btnSelector,
    activationTargetSelector = null,
    detectOutsideClickAndDeactivate = false,
    closeBtn = null,
    stopBody = null
  ) => {
    const btnArray = document.querySelectorAll(btnSelector)
    let closeBtnArray = null
    let target = null
    let isOpen = false
    const html = document.querySelector('html')

    if (activationTargetSelector) {
      target = document.querySelector(activationTargetSelector)
    }

    const checkBody = () => {
      if (stopBody === 'stop') {
        html.classList.toggle('overflow-stop')
      }

      if (stopBody === 'stop-md') {
        html.classList.toggle('overflow-stop-md')
      }
    }

    const toggle = (btn) => {
      btn.classList.toggle('active')

      if (activationTargetSelector) {
        target.classList.toggle('active')
      }

      checkBody()
    }

    const closeAll = () => {
      btnArray.forEach((btn) => {
        btn.classList.remove('active')
      })
      target.classList.remove('active')

      checkBody()

      isOpen = false
    }

    if (closeBtn) {
      closeBtnArray = document.querySelectorAll(closeBtn)

      closeBtnArray.forEach((btn) => {
        btn.addEventListener('click', () => {
          closeAll()
        })
      })
    }

    btnArray.forEach((btn) => {
      if (detectOutsideClickAndDeactivate) {
        detectClickOutsideElementAndApplyFunction(target, btn, (elem, btn) => {
          if (isOpen) {
            closeAll()
          }
        })
      }

      btn.addEventListener('click', () => {
        toggle(btn)
        isOpen = !isOpen
      })
    })
  }

  activateByClick(
    '.js-open-searchbar',
    '.js-searchbar',
    false,
    '.js-searchbar-close',
    'stop'
  )

  activateByClick(
    '.js-open-form-join',
    '.js-form-join',
    false,
    '.js-form-join-close',
    'stop'
  )

  activateByClick(
    '.js-open-form-support',
    '.js-form-support',
    false,
    '.js-form-support-close',
    'stop'
  )

  activateByClick(
    '.js-show-constitution',
    '.js-show-constitution__container',
    false
  )

  // Активация плагина choices.js для select элементов
  const defaultSelect = (selector) => {
    const selects = document.querySelectorAll(selector)

    selects.forEach((elem) => {
      const choices = new Choices(elem, {
        itemSelectText: 'Нажмите Enter чтобы выбрать',
        searchEnabled: false,
        allowHTML: true
      })
    })
  }

  defaultSelect('.js-choices-select')

  // Ограничение только цифр в инпуте
  const allowInputNumbersOnly = (selector) => {
    const inputs = document.querySelectorAll(selector)

    inputs.forEach((input) => {
      input.addEventListener('input', function () {
        this.value = this.value.replace(/\D+/g, '')
      })
    })
  }

  // Ограничения ввода только цифр в инпуты + максимально и минимальное значение инпута
  const numberControls = (selector) => {
    const controls = document.querySelectorAll(selector)

    controls.forEach((control) => {
      const input = control.querySelector(`${selector}__input`)
      const minBtn = control.querySelector(`${selector}__min`)
      const plusBtn = control.querySelector(`${selector}__plus`)

      allowInputNumbersOnly('.js-input-number')

      const validateInput = (number) => {
        if (number <= 0) {
          return 0
        }
        if (input.value > 999) {
          return 999
        }
        return number
      }

      minBtn.addEventListener('click', () => {
        const newValue = validateInput(Number(input.value) - 1)
        input.value = newValue
      })

      plusBtn.addEventListener('click', () => {
        const newValue = validateInput(Number(input.value) + 1)
        input.value = newValue
      })

      input.addEventListener('input', () => {
        input.value = validateInput(Number(input.value.replace(/\D+/g, '')))
      })
    })
  }

  // Функциона аккордиона
  const createAccordionsBySelector = (
    selector,
    canToggleByCLick = true,
    isAllActiveAllowed = true
  ) => {
    const accordionItems = document.querySelectorAll(selector)

    const closeAllItems = (arrayOfItems) => {
      arrayOfItems.forEach((item) => {
        item.classList.remove('active')
      })
    }

    const toggleActiveItem = (title) => {
      if (canToggleByCLick) {
        title.classList.toggle('active')
      } else {
        title.classList.add('active')
      }
    }

    accordionItems.forEach((item) => {
      const accordionTitles = item.querySelectorAll(`${selector}__title`)

      accordionTitles.forEach((title) => {
        title.addEventListener('click', () => {
          if (!isAllActiveAllowed) {
            closeAllItems(accordionTitles)
          }
          toggleActiveItem(title)
        })
      })
    })
  }

  // Кнопка для очистки инпута в инпуте
  const searchBarClearButton = (selector) => {
    const searchbarsArray = document.querySelectorAll(selector)

    searchbarsArray.forEach((searchbar) => {
      const input = searchbar.querySelector(`${selector}__input`)
      const clearBtn = searchbar.querySelector(`${selector}__clear`)

      const checkValue = (inp) => {
        if (inp.value.length > 0) {
          clearBtn.classList.add('active')
        } else {
          clearBtn.classList.remove('active')
        }
      }

      input.addEventListener('input', () => {
        checkValue(input)
      })

      clearBtn.addEventListener('click', () => {
        input.value = ''
        checkValue(input)
      })
    })
  }

  // searchBarClearButton('.js-searchbar')

  const newsSlider = () => {
    const sliders = document.querySelectorAll('.js-news-slider')

    sliders.forEach((slider) => {
      const myCommonSLider = new Swiper(slider, {
        spaceBetween: 34,
        slidesPerView: 5,
        navigation: {
          nextEl: '.news-slider__btn--next',
          prevEl: '.news-slider__btn--prev'
        },
        watchOverflow: true,
        breakpoints: {
          // mobile + tablet - 320-990
          0: {
            spaceBetween: 34,
            slidesPerView: 'auto'
          },
          // desktop >= 768
          // 769: {
          //   spaceBetween: 20,
          //   slidesPerView: 4
          // },
          1201: {
            slidesPerView: 5
          }
        }
      })
    })
  }

  newsSlider()

  const constitutionSlider = () => {
    const sliders = document.querySelectorAll('.js-constitution-slider')

    sliders.forEach((slider) => {
      const myCommonSLider = new Swiper(slider, {
        spaceBetween: 34,
        slidesPerView: 1,
        navigation: {
          nextEl: '.constitution-slider__btn--next',
          prevEl: '.constitution-slider__btn--prev'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        watchOverflow: true,
        breakpoints: {
          // mobile + tablet - 320-990
          // 0: {
          //   spaceBetween: 34,
          //   slidesPerView: 'auto'
          // },
          // desktop >= 768
          // 769: {
          //   spaceBetween: 20,
          //   slidesPerView: 4
          // },
          1201: {
            slidesPerView: 1
          }
        }
      })
    })
  }

  constitutionSlider()

  const expertsSlider = () => {
    const sliders = document.querySelectorAll('.js-experts-slider')

    sliders.forEach((slider) => {
      const myCommonSLider = new Swiper(slider, {
        spaceBetween: 34,
        slidesPerView: 1,
        autoHeight: true,
        navigation: {
          nextEl: '.experts-slider__btn--next',
          prevEl: '.experts-slider__btn--prev'
        },
        watchOverflow: true,
        breakpoints: {
          // mobile + tablet - 320-990
          // 0: {
          //   spaceBetween: 34,
          //   slidesPerView: 'auto'
          // },
          // desktop >= 768
          // 769: {
          //   spaceBetween: 20,
          //   slidesPerView: 4
          // },
          1201: {
            slidesPerView: 1
          }
        }
      })
    })
  }

  expertsSlider()

  const bigSlider = () => {
    const sliders = document.querySelectorAll('.js-big-slider')

    sliders.forEach((slider) => {
      const myCommonSLider = new Swiper(slider, {
        spaceBetween: 85,
        slidesPerView: 1,
        initialSlide: 1,
        navigation: {
          nextEl: '.big-slider__btn--next',
          prevEl: '.big-slider__btn--prev'
        },
        watchOverflow: true,
        on: {
          slideChange: function () {
            const iframes = document.querySelectorAll('.swiper-slide iframe')

            iframes.forEach((iframe) => {
              iframe.contentWindow.postMessage(
                '{"event":"command","func":"stopVideo","args":""}',
                '*'
              )
            })
          }
        },
        breakpoints: {
          // mobile + tablet - 320-990
          // 0: {
          //   spaceBetween: 34,
          //   slidesPerView: 'auto'
          // },
          // desktop >= 768
          // 769: {
          //   spaceBetween: 20,
          //   slidesPerView: 4
          // },
          1201: {
            slidesPerView: 1
          }
        }
      })
    })
  }

  bigSlider()

  const peopleSLider = () => {
    let initPeople = false
    let mySliderPeople
    const slider = document.querySelector('.js-people-slider')

    const peopleSliderActivateSlider = () => {
      if (window.innerWidth <= 768) {
        if (!initPeople) {
          initPeople = true
          mySliderPeople = new Swiper(slider, {
            spaceBetween: 34,
            slidesPerView: 1,
            navigation: {
              nextEl: '.r-people__btn--next',
              prevEl: '.r-people__btn--prev'
            },
            watchOverflow: true,
            breakpoints: {
              1201: {
                slidesPerView: 1
              }
            }
          })
        }
      } else if (initPeople) {
        mySliderPeople.destroy()
        initPeople = false
      }
    }

    if (slider) {
      peopleSliderActivateSlider()

      window.addEventListener('resize', peopleSliderActivateSlider)
    }
  }

  peopleSLider()

  const mapTabs = () => {
    const links = document.querySelectorAll('.regions__map-link')
    const regions = document.querySelectorAll('[data-region-item]')

    console.log(regions)

    const removeAllClasses = () => {
      regions.forEach((region) => region.classList.remove('active'))
      links.forEach((link) => link.classList.remove('active'))
    }

    removeAllClasses()

    links.forEach((link, i) => {
      const targetNumber = link.dataset.mapTarget
      const target = document.querySelector(
        `[data-region-item="${targetNumber}"]`
      )

      if (i === 0) {
        target.classList.add('active')
        link.classList.add('active')
        console.log('tee')
      }

      link.addEventListener('click', (e) => {
        e.preventDefault()

        removeAllClasses()
        target.classList.add('active')
        link.classList.add('active')
      })
    })
  }

  mapTabs()

  const regionsSlider = () => {
    const sliders = document.querySelectorAll('.js-regions-slider')

    sliders.forEach((slider) => {
      const myCommonSLider = new Swiper(slider, {
        spaceBetween: 16,
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.regions__slider-btn--next',
          prevEl: '.regions__slider-btn--prev'
        },
        watchOverflow: true,
        breakpoints: {
          0: {
            spaceBetween: 13
          },
          993: {
            spaceBetween: 34
          }
        }
      })
    })
  }

  regionsSlider()

  const freeSlider = () => {
    const sliders = document.querySelectorAll('.js-free-slider')

    sliders.forEach((slider) => {
      const myCommonSLider = new Swiper(slider, {
        spaceBetween: 24,
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.free-slider__btn--next',
          prevEl: '.free-slider__btn--prev'
        },
        watchOverflow: true,
        breakpoints: {
          0: {
            spaceBetween: 13
          },
          769: {
            spaceBetween: 24
          }
        }
      })
    })
  }

  freeSlider()

  const gradientAnimation = () => {
    const gradient = document.querySelector('.js-animated-gradient')

    if (gradient !== null) {
      setInterval(() => {
        gradient.classList.toggle('active')
      }, 1800)
    }
  }

  gradientAnimation()

  function scrollToTopBtnFunction() {
    let rootElement = document.documentElement
    let scrollToTopBtn = document.querySelector('.js-scroll-to-top')

    const handleScroll = () => {
      var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight

      if (rootElement.scrollTop > 1000) {
        // Show button
        scrollToTopBtn.classList.add('active')
      } else {
        // Hide button
        scrollToTopBtn.classList.remove('active')
      }
    }

    function scrollToTop() {
      // Scroll to top logic
      rootElement.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    document.addEventListener('scroll', handleScroll)
    scrollToTopBtn.addEventListener('click', scrollToTop)
  }

  scrollToTopBtnFunction()

  const observerHideButtonConstitution = () => {
    const targetBlock = document.getElementById('targetBlock')
    const myButton = document.getElementById('myButton')

    if (targetBlock && myButton) {
      let observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            console.log('333')
            if (entry.isIntersecting) {
              myButton.style.display = 'block'
            } else {
              myButton.style.display = 'none'
            }
          })
        },
        {threshold: [0, 0.5, 1.0]}
      )

      observer.observe(targetBlock)
    }
  }

  observerHideButtonConstitution()
})
