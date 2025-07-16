/*!
* Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
* Copyright 2011-2022 The Bootstrap Authors
* Licensed under the Creative Commons Attribution 3.0 Unported License.
*/

const storedTheme = localStorage.getItem('theme')

const getPreferredTheme = (isOnload = false) => {
  if (storedTheme) {
    return storedTheme
  }

  if(isOnload){
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const setTheme = function (theme, isChangeFavicon = false) {
  if(isChangeFavicon){
    let favicon = document.querySelector('link[rel="shortcut icon"]');

    if (window.matchMedia('(prefers-color-scheme: dark)').matches && !favicon.href.includes('light')) { // theme === 'auto' && 
      favicon.href = favicon.href.replace('favicon', 'favicon-light');
    //   document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      favicon.href = favicon.href.replace('favicon-light', 'favicon');
    //   document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  document.documentElement.setAttribute('data-bs-theme', theme)
}

setTheme(getPreferredTheme(true), true)

const showActiveTheme = theme => {
  const activeThemeIcon = document.querySelector('.theme-icon-active')
  const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
  const svgOfActiveBtn = btnToActive.querySelector('i').getAttribute('data-href')

  document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
    element.classList.remove('active');
  })

  btnToActive.classList.add('active');
  if (activeThemeIcon) {
    activeThemeIcon.classList.remove(activeThemeIcon.getAttribute('data-href').slice(1));
    activeThemeIcon.classList.add(svgOfActiveBtn.slice(1));
    activeThemeIcon.setAttribute('data-href', svgOfActiveBtn);
  }
} 

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (storedTheme !== 'light' || storedTheme !== 'dark') {
    setTheme(getPreferredTheme(), true)
  }
})

window.addEventListener('DOMContentLoaded', () => {
  showActiveTheme(getPreferredTheme(true))

  document.querySelectorAll('[data-bs-theme-value]')
    .forEach(toggle => {
      toggle.addEventListener('click', () => {
        const theme = toggle.getAttribute('data-bs-theme-value')
        localStorage.setItem('theme', theme)
        setTheme(theme)
        showActiveTheme(theme)
      })
    })
})
//End Dark Mode