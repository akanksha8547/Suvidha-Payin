import React, { useState } from 'react';

function Plugin() {

    const [activeColor, setActiveColor] = useState('');

    const sidebarColor = (e) => {
        const currentActive = document.querySelector('.nav-link.active');
        const button = document.querySelector('.button')
        const newColor = e.target.getAttribute('data-color');

        if (currentActive) {
            currentActive.classList.remove('bg-gradient-primary', 'bg-gradient-dark', 'bg-gradient-info', 'bg-gradient-success', 'bg-gradient-warning', 'bg-gradient-danger');
            currentActive.classList.add(`bg-gradient-${newColor}`);
            button.classList.remove('bg-gradient-primary', 'bg-gradient-dark', 'bg-gradient-info', 'bg-gradient-success', 'bg-gradient-warning', 'bg-gradient-danger');
            button.classList.add(`bg-gradient-${newColor}`);
            setActiveColor(newColor); // Update the state if needed
        }
    };

    const sidebarType = (e) => {
        const t = e.currentTarget.parentElement.children;
        const s = e.currentTarget.getAttribute('data-class');
        const body = document.querySelector('body');
        const nonDarkBody = document.querySelector('body:not(.dark-version)');
        const isDarkVersion = body.classList.contains('dark-version');
        const sidenav = document.querySelector('.sidenav');

        const i = [];
        for (let r = 0; r < t.length; r++) {
            t[r].classList.remove('active');
            i.push(t[r].getAttribute('data-class'));
        }

        if (e.currentTarget.classList.contains('active')) {
            e.currentTarget.classList.remove('active');
        } else {
            e.currentTarget.classList.add('active');
        }

        for (let r = 0; r < i.length; r++) {
            sidenav.classList.remove(i[r]);
        }

        sidenav.classList.add(s);

        if (s === 'bg-transparent' || s === 'bg-white') {
            const u = document.querySelectorAll('.sidenav .text-white');
            for (let j = 0; j < u.length; j++) {
                u[j].classList.remove('text-white');
                u[j].classList.add('text-dark');
            }
        } else {
            const f = document.querySelectorAll('.sidenav .text-dark');
            for (let j = 0; j < f.length; j++) {
                f[j].classList.add('text-white');
                f[j].classList.remove('text-dark');
            }
        }

        if (s === 'bg-transparent' && isDarkVersion) {
            const f = document.querySelectorAll('.navbar-brand .text-dark');
            for (let j = 0; j < f.length; j++) {
                f[j].classList.add('text-white');
                f[j].classList.remove('text-dark');
            }
        }

        const navbarBrandImg = document.querySelector('.navbar-brand-img');
        let o = navbarBrandImg.src;

        if ((s === 'bg-transparent' || s === 'bg-white') && !nonDarkBody) {
            if (o.includes('logo-ct-dark.png')) {
                const c = o.replace('logo-ct-dark', 'logo-ct');
                navbarBrandImg.src = c;
            }
        } else {
            if (o.includes('logo-ct.png')) {
                const c = o.replace('logo-ct', 'logo-ct-dark');
                navbarBrandImg.src = c;
            }
        }

        if (s === 'bg-white' && isDarkVersion) {
            if (o.includes('logo-ct.png')) {
                const c = o.replace('logo-ct', 'logo-ct-dark');
                navbarBrandImg.src = c;
            }
        }
    };

    const debounce = (func, wait, immediate) => {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    const navbarBlurOnScroll = (id) => {
        const navbar = document.getElementById(id);
        let navbarScrollActive = navbar ? navbar.getAttribute("data-scroll") : false;
        let scrollDistance = 5;
        let classes = ['blur', 'shadow-blur', 'left-auto'];
        let toggleClasses = ['shadow-none'];

        if (navbarScrollActive === 'true') {
            window.onscroll = debounce(function () {
                if (window.scrollY > scrollDistance) {
                    blurNavbar();
                } else {
                    transparentNavbar();
                }
            }, 10);
        } else {
            window.onscroll = debounce(function () {
                transparentNavbar();
            }, 10);
        }

        var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows) {
            var content = document.querySelector('.main-content');
            if (navbarScrollActive === 'true') {
                content.addEventListener('ps-scroll-y', debounce(function () {
                    if (content.scrollTop > scrollDistance) {
                        blurNavbar();
                    } else {
                        transparentNavbar();
                    }
                }, 10));
            } else {
                content.addEventListener('ps-scroll-y', debounce(function () {
                    transparentNavbar();
                }, 10));
            }
        }

        function blurNavbar() {
            navbar.classList.add(...classes)
            navbar.classList.remove(...toggleClasses)

            toggleNavLinksColor('blur');
        }

        function transparentNavbar() {
            navbar.classList.remove(...classes)
            navbar.classList.add(...toggleClasses)

            toggleNavLinksColor('transparent');
        }

        function toggleNavLinksColor(type) {
            let navLinks = document.querySelectorAll('.navbar-main .nav-link')
            let navLinksToggler = document.querySelectorAll('.navbar-main .sidenav-toggler-line')

            if (type === "blur") {
                navLinks.forEach(element => {
                    element.classList.remove('text-body')
                });

                navLinksToggler.forEach(element => {
                    element.classList.add('bg-dark')
                });
            } else if (type === "transparent") {
                navLinks.forEach(element => {
                    element.classList.add('text-body')
                });

                navLinksToggler.forEach(element => {
                    element.classList.remove('bg-dark')
                });
            }
        }
    };

    const [isChecked, setIsChecked] = useState(false);

    const navbarFixed = (el) => {
        let classes = ['position-sticky', 'blur', 'shadow-blur', 'mt-4', 'left-auto', 'top-1', 'z-index-sticky'];
        const navbar = document.getElementById('navbarBlur');

        if (!isChecked) {
            navbar.classList.add(...classes);
            navbar.setAttribute('navbar-scroll', 'true');
            navbarBlurOnScroll('navbarBlur');
            setIsChecked(true);
        } else {
            navbar.classList.remove(...classes);
            navbar.setAttribute('navbar-scroll', 'false');
            navbarBlurOnScroll('navbarBlur');
            setIsChecked(false);
        }
    };

    const [isDarkMode, setIsDarkMode] = useState(false);

    const darkMode = () => {
        const body = document.getElementsByTagName('body')[0];
        const hr = document.querySelectorAll('div:not(.sidenav) > hr');
        const hr_card = document.querySelectorAll('div:not(.bg-gradient-dark) hr');
        const text_btn = document.querySelectorAll('button:not(.btn) > .text-dark');
        const text_span = document.querySelectorAll('span.text-dark, .breadcrumb .text-dark');
        const text_span_white = document.querySelectorAll('span.text-white, .breadcrumb .text-white');
        const text_strong = document.querySelectorAll('strong.text-dark');
        const text_strong_white = document.querySelectorAll('strong.text-white');
        const text_nav_link = document.querySelectorAll('a.nav-link.text-dark');
        const text_nav_link_white = document.querySelectorAll('a.nav-link.text-white');
        const secondary = document.querySelectorAll('.text-secondary');
        const bg_gray_100 = document.querySelectorAll('.bg-gray-100');
        const bg_gray_600 = document.querySelectorAll('.bg-gray-600');
        const btn_text_dark = document.querySelectorAll('.btn.btn-link.text-dark, .material-icons.text-dark');
        const btn_text_white = document.querySelectorAll('.btn.btn-link.text-white, .material-icons.text-white');
        const card_border = document.querySelectorAll('.card.border');
        const card_border_dark = document.querySelectorAll('.card.border.border-dark');
        const svg = document.querySelectorAll('g');

        if (!isDarkMode) {
            body.classList.add('dark-version');
            for (var i = 0; i < hr.length; i++) {
                if (hr[i].classList.contains('dark')) {
                    hr[i].classList.remove('dark');
                    hr[i].classList.add('light');
                }
            }

            for (i = 0; i < hr_card.length; i++) {
                if (hr_card[i].classList.contains('dark')) {
                    hr_card[i].classList.remove('dark');
                    hr_card[i].classList.add('light');
                }
            }
            for (i = 0; i < text_btn.length; i++) {
                if (text_btn[i].classList.contains('text-dark')) {
                    text_btn[i].classList.remove('text-dark');
                    text_btn[i].classList.add('text-white');
                }
            }
            for (i = 0; i < text_span.length; i++) {
                if (text_span[i].classList.contains('text-dark')) {
                    text_span[i].classList.remove('text-dark');
                    text_span[i].classList.add('text-white');
                }
            }
            for (i = 0; i < text_strong.length; i++) {
                if (text_strong[i].classList.contains('text-dark')) {
                    text_strong[i].classList.remove('text-dark');
                    text_strong[i].classList.add('text-white');
                }
            }
            for (i = 0; i < text_nav_link.length; i++) {
                if (text_nav_link[i].classList.contains('text-dark')) {
                    text_nav_link[i].classList.remove('text-dark');
                    text_nav_link[i].classList.add('text-white');
                }
            }
            for (i = 0; i < secondary.length; i++) {
                if (secondary[i].classList.contains('text-secondary')) {
                    secondary[i].classList.remove('text-secondary');
                    secondary[i].classList.add('text-white');
                    secondary[i].classList.add('opacity-8');
                }
            }
            for (i = 0; i < bg_gray_100.length; i++) {
                if (bg_gray_100[i].classList.contains('bg-gray-100')) {
                    bg_gray_100[i].classList.remove('bg-gray-100');
                    bg_gray_100[i].classList.add('bg-gray-600');
                }
            }
            for (i = 0; i < btn_text_dark.length; i++) {
                btn_text_dark[i].classList.remove('text-dark');
                btn_text_dark[i].classList.add('text-white');
            }
            for (i = 0; i < svg.length; i++) {
                if (svg[i].hasAttribute('fill')) {
                    svg[i].setAttribute('fill', '#fff');
                }
            }
            for (i = 0; i < card_border.length; i++) {
                card_border[i].classList.add('border-dark');
            }
            setIsDarkMode(true);
        } else {
            body.classList.remove('dark-version');
            for (i = 0; i < hr.length; i++) {
                if (hr[i].classList.contains('light')) {
                    hr[i].classList.add('dark');
                    hr[i].classList.remove('light');
                }
            }
            for (i = 0; i < hr_card.length; i++) {
                if (hr_card[i].classList.contains('light')) {
                    hr_card[i].classList.add('dark');
                    hr_card[i].classList.remove('light');
                }
            }
            for (i = 0; i < text_btn.length; i++) {
                if (text_btn[i].classList.contains('text-white')) {
                    text_btn[i].classList.remove('text-white');
                    text_btn[i].classList.add('text-dark');
                }
            }
            for (i = 0; i < text_span_white.length; i++) {
                if (text_span_white[i].classList.contains('text-white') && !text_span_white[i].closest('.sidenav') && !text_span_white[i].closest('.card.bg-gradient-dark')) {
                    text_span_white[i].classList.remove('text-white');
                    text_span_white[i].classList.add('text-dark');
                }
            }
            for (i = 0; i < text_strong_white.length; i++) {
                if (text_strong_white[i].classList.contains('text-white')) {
                    text_strong_white[i].classList.remove('text-white');
                    text_strong_white[i].classList.add('text-dark');
                }
            }
            for (i = 0; i < text_nav_link_white.length; i++) {
                if (text_nav_link_white[i].classList.contains('text-white') && !text_nav_link_white[i].closest('.sidenav')) {
                    text_nav_link_white[i].classList.remove('text-white');
                    text_nav_link_white[i].classList.add('text-dark');
                }
            }
            for (i = 0; i < secondary.length; i++) {
                if (secondary[i].classList.contains('text-white')) {
                    secondary[i].classList.remove('text-white');
                    secondary[i].classList.remove('opacity-8');
                    secondary[i].classList.add('text-dark');
                }
            }
            for (i = 0; i < bg_gray_600.length; i++) {
                if (bg_gray_600[i].classList.contains('bg-gray-600')) {
                    bg_gray_600[i].classList.remove('bg-gray-600');
                    bg_gray_600[i].classList.add('bg-gray-100');
                }
            }
            for (i = 0; i < svg.length; i++) {
                if (svg[i].hasAttribute('fill')) {
                    svg[i].setAttribute('fill', '#252f40');
                }
            }
            for (i = 0; i < btn_text_white.length; i++) {
                if (!btn_text_white[i].closest('.card.bg-gradient-dark')) {
                    btn_text_white[i].classList.remove('text-white');
                    btn_text_white[i].classList.add('text-dark');
                }
            }
            for (i = 0; i < card_border_dark.length; i++) {
                card_border_dark[i].classList.remove('border-dark');
            }
            setIsDarkMode(false);
        }
    };

    return (
        <div className="fixed-plugin">
            <a className="fixed-plugin-button text-dark position-fixed px-3 py-2">
                <i className="material-icons py-2">settings</i>
            </a>
            <div className="card shadow-lg">
                <div className="card-header pb-0 pt-3">
                    <div className="float-start">
                        <h5 className="mt-3 mb-0">Material UI Configurator</h5>
                        <p>See our dashboard options.</p>
                    </div>
                    <div className="float-end mt-4">
                        <button className="btn btn-link text-dark p-0 fixed-plugin-close-button">
                            <i className="material-icons">clear</i>
                        </button>
                    </div>
                    {/* End Toggle Button */}
                </div>
                <hr className="horizontal dark my-1" />
                <div className="card-body pt-sm-3 pt-0">
                    {/* Sidebar Backgrounds */}
                    <div>
                        <h6 className="mb-0">Sidebar Colors</h6>
                    </div>
                    <a className="switch-trigger background-color">
                        <div className="badge-colors my-2 text-start">
                            <span className="badge filter bg-gradient-primary active" data-color="primary" onClick={sidebarColor}></span>
                            <span className="badge filter bg-gradient-dark" data-color="dark" onClick={sidebarColor}></span>
                            <span className="badge filter bg-gradient-info" data-color="info" onClick={sidebarColor}></span>
                            <span className="badge filter bg-gradient-success" data-color="success" onClick={sidebarColor}></span>
                            <span className="badge filter bg-gradient-warning" data-color="warning" onClick={sidebarColor}></span>
                            <span className="badge filter bg-gradient-danger" data-color="danger" onClick={sidebarColor}></span>
                        </div>
                    </a>
                    {/* Sidenav Type */}
                    <hr className="horizontal dark my-sm-4" />
                    <div className="mt-3">
                        <h6 className="mb-0">Sidenav Type</h6>
                        <p className="text-sm">Choose between 3 different sidenav types.</p>
                    </div>
                    <div className="d-flex">
                        <button className="btn bg-gradient-dark px-3 mb-2 active" data-class="bg-gradient-dark"
                            onClick={sidebarType}>Dark</button>
                        <button className="btn bg-gradient-dark px-3 mb-2 ms-2" data-class="bg-transparent"
                            onClick={sidebarType}>Transparent</button>
                        <button className="btn bg-gradient-dark px-3 mb-2 ms-2" data-class="bg-white"
                            onClick={sidebarType}>White</button>
                    </div>
                    <hr className="horizontal dark my-sm-4" />
                    <p className="text-sm d-block mt-2">You can change the sidenav type just on desktop view.</p>
                    {/* Navbar Fixed */}
                    <div className="mt-3 d-flex">
                        <h6 className="mb-0">Navbar Fixed</h6>
                        <div className="form-check form-switch ps-0 ms-auto my-auto">
                            <input className="form-check-input mt-1 ms-auto" type="checkbox" id="navbarFixed" onClick={() => navbarFixed(this)} />
                        </div>
                    </div>
                    <hr className="horizontal dark my-3" />
                    <div className="mt-2 d-flex">
                        <h6 className="mb-0">Light / Dark</h6>
                        <div className="form-check form-switch ps-0 ms-auto my-auto">
                            <input className="form-check-input mt-1 ms-auto" type="checkbox" id="dark-version" onClick={darkMode} />
                        </div>
                    </div>
                    <hr className="horizontal dark my-sm-4" />
                    {/* <a className="btn bg-gradient-info w-100" href="https://www.creative-tim.com/product/material-dashboard-pro">Free
                        Download</a>
                    <a className="btn btn-outline-dark w-100"
                        href="https://www.creative-tim.com/learning-lab/bootstrap/overview/material-dashboard">View documentation</a>
                    <div className="w-100 text-center">
                        <a className="github-button" href="https://github.com/creativetimofficial/material-dashboard"
                            data-icon="octicon-star" data-size="large" data-show-count="true"
                            aria-label="Star creativetimofficial/material-dashboard on GitHub">Star</a> */}
                        <h6 className="mt-3 text-center">Thank you for choosing us!</h6>
                       {/* <a href="https://twitter.com/intent/tweet?text=Check%20Material%20UI%20Dashboard%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&amp;url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard"
                            className="btn btn-dark mb-0 me-2" target="_blank">
                            <i className="fab fa-twitter me-1" aria-hidden="true"></i> Tweet
                        </a>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/material-dashboard"
                            className="btn btn-dark mb-0 me-2" target="_blank">
                            <i className="fab fa-facebook-square me-1" aria-hidden="true"></i> Share
                        </a>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Plugin