import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { Tooltip as BootstrapTooltip, Toast as BootStrapToast } from 'bootstrap';
import Routes from "../../Routers/Routes";

export default function SideNavBar({ setNavigationPage }) {
    const navigate = useNavigate();

    const handleRoutes = (route, setPage) => {
        navigate(route);
        setNavigationPage(setPage);
        // document.querySelector('.nav-link.active').classList.remove('bg-gradient-primary', 'active')
        // document.getElementById(`${current}`).classList.add('bg-gradient-primary', 'active');
        // console.log('current', current)
    };

    useEffect(() => {
        var win = navigator.platform.indexOf('Win') > -1;
        if (win) {
            document.querySelectorAll('.main-content, .sidenav, .fixed-plugin').forEach(el => {
                new PerfectScrollbar(el);
            });
        }

        if (document.getElementById("navbarBlur")) {
            navbarBlurOnScroll("navbarBlur");
        }

        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(tooltipTriggerEl => new BootstrapTooltip(tooltipTriggerEl));

        const allInputs = document.querySelectorAll("input.form-control");
        allInputs.forEach(input => {
            input.onfocus = () => focused(input);
            input.onblur = () => defocused(input);
        });

        const fixedPluginButton = document.querySelector(".fixed-plugin-button");
        const fixedPluginButtonNav = document.querySelector(".fixed-plugin-button-nav");
        const fixedPluginCloseButtons = document.querySelectorAll(".fixed-plugin-close-button");
        const fixedPlugin = document.querySelector(".fixed-plugin");

        if (fixedPluginButton) {
            fixedPluginButton.onclick = () => fixedPlugin.classList.toggle("show");
        }

        if (fixedPluginButtonNav) {
            fixedPluginButtonNav.onclick = () => fixedPlugin.classList.toggle("show");
        }

        fixedPluginCloseButtons.forEach(button => {
            button.onclick = () => fixedPlugin.classList.remove("show");
        });

        document.body.onclick = (e) => {
            if (!fixedPlugin.contains(e.target) && e.target !== fixedPluginButton && e.target !== fixedPluginButtonNav) {
                fixedPlugin.classList.remove("show");
            }
        };

        const toastElements = [].slice.call(document.querySelectorAll('.toast'));
        toastElements.map(toastEl => new BootStrapToast(toastEl));

        const toastButtons = [].slice.call(document.querySelectorAll('.toast-btn'));
        toastButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetToast = document.getElementById(button.dataset.target);
                if (targetToast) {
                    BootStrapToast.getInstance(targetToast).show();
                }
            });
        });

        const initNavs = () => {
            document.querySelectorAll(".nav-pills").forEach(nav => {
                const movingTab = document.createElement("div");
                const cloneLink = nav.querySelector("li:first-child .nav-link").cloneNode();
                cloneLink.innerHTML = "-";
                movingTab.classList.add("moving-tab", "position-absolute", "nav-link");
                movingTab.appendChild(cloneLink);
                nav.appendChild(movingTab);

                movingTab.style.padding = "0px";
                movingTab.style.width = `${nav.querySelector("li:nth-child(1)").offsetWidth}px`;
                movingTab.style.transform = "translate3d(0px, 0px, 0px)";
                movingTab.style.transition = ".5s ease";

                nav.onmouseover = (e) => {
                    const target = e.target.closest("li");
                    if (target) {
                        const siblings = Array.from(target.closest("ul").children);
                        const index = siblings.indexOf(target) + 1;

                        nav.querySelector(`li:nth-child(${index}) .nav-link`).onclick = () => {
                            let position = 0;
                            const movingTab = nav.querySelector(".moving-tab");

                            if (nav.classList.contains("flex-column")) {
                                for (let i = 1; i <= siblings.indexOf(target); i++) {
                                    position += nav.querySelector(`li:nth-child(${i})`).offsetHeight;
                                }
                                movingTab.style.transform = `translate3d(0px, ${position}px, 0px)`;
                                movingTab.style.height = `${nav.querySelector(`li:nth-child(${index})`).offsetHeight}px`;
                            } else {
                                for (let i = 1; i <= siblings.indexOf(target); i++) {
                                    position += nav.querySelector(`li:nth-child(${i})`).offsetWidth;
                                }
                                movingTab.style.transform = `translate3d(${position}px, 0px, 0px)`;
                                movingTab.style.width = `${nav.querySelector(`li:nth-child(${index})`).offsetWidth}px`;
                            }
                        };
                    }
                };
            });
        };

        setTimeout(() => {
            initNavs();
        }, 100);

        window.addEventListener("resize", handleResize);

        window.onload = () => {
            const inputs = document.querySelectorAll("input");
            inputs.forEach(input => {
                input.addEventListener("focus", () => focused(input));
                input.addEventListener("blur", () => defocused(input));
            });
        };

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    const handleResize = () => {
        const navPills = document.querySelectorAll(".nav-pills");
        navPills.forEach(nav => {
            nav.querySelector(".moving-tab").remove();
            const movingTab = document.createElement("div");
            const cloneLink = nav.querySelector(".nav-link.active").cloneNode();
            cloneLink.innerHTML = "-";
            movingTab.classList.add("moving-tab", "position-absolute", "nav-link");
            movingTab.appendChild(cloneLink);
            nav.appendChild(movingTab);

            movingTab.style.padding = "0px";
            movingTab.style.transition = ".5s ease";

            const activeItem = nav.querySelector(".nav-link.active").parentElement;
            if (activeItem) {
                const siblings = Array.from(activeItem.closest("ul").children);
                const index = siblings.indexOf(activeItem) + 1;

                let position = 0;
                if (nav.classList.contains("flex-column")) {
                    for (let i = 1; i <= siblings.indexOf(activeItem); i++) {
                        position += nav.querySelector(`li:nth-child(${i})`).offsetHeight;
                    }
                    movingTab.style.transform = `translate3d(0px, ${position}px, 0px)`;
                    movingTab.style.width = `${nav.querySelector(`li:nth-child(${index})`).offsetWidth}px`;
                    movingTab.style.height = `${nav.querySelector(`li:nth-child(${index})`).offsetHeight}px`;
                } else {
                    for (let i = 1; i <= siblings.indexOf(activeItem); i++) {
                        position += nav.querySelector(`li:nth-child(${i})`).offsetWidth;
                    }
                    movingTab.style.transform = `translate3d(${position}px, 0px, 0px)`;
                    movingTab.style.width = `${nav.querySelector(`li:nth-child(${index})`).offsetWidth}px`;
                }
            }
        });

        adjustNavForScreenWidth(navPills);
    };

    const adjustNavForScreenWidth = (navPills) => {
        if (window.innerWidth < 991) {
            navPills.forEach(nav => {
                if (!nav.classList.contains("flex-column")) {
                    nav.classList.remove("flex-row");
                    nav.classList.add("flex-column", "on-resize");

                    const activeItem = nav.querySelector(".nav-link.active").parentElement;
                    const siblings = Array.from(activeItem.closest("ul").children);
                    const index = siblings.indexOf(activeItem);

                    let position = 0;
                    for (let i = 1; i <= index; i++) {
                        position += nav.querySelector(`li:nth-child(${i})`).offsetHeight;
                    }
                    const movingTab = nav.querySelector(".moving-tab");
                    movingTab.style.width = `${nav.querySelector("li:nth-child(1)").offsetWidth}px`;
                    movingTab.style.transform = `translate3d(0px, ${position}px, 0px)`;
                }
            });
        } else {
            navPills.forEach(nav => {
                if (nav.classList.contains("on-resize")) {
                    nav.classList.remove("flex-column", "on-resize");
                    nav.classList.add("flex-row");

                    const activeItem = nav.querySelector(".nav-link.active").parentElement;
                    const siblings = Array.from(activeItem.closest("ul").children);
                    const index = siblings.indexOf(activeItem) + 1;

                    let position = 0;
                    for (let i = 1; i <= siblings.indexOf(activeItem); i++) {
                        position += nav.querySelector(`li:nth-child(${i})`).offsetWidth;
                    }
                    const movingTab = nav.querySelector(".moving-tab");
                    movingTab.style.transform = `translate3d(${position}px, 0px, 0px)`;
                    movingTab.style.width = `${nav.querySelector(`li:nth-child(${index})`).offsetWidth}px`;
                }
            });
        }
    };

    const focused = (input) => {
        if (input.parentElement.classList.contains("input-group")) {
            input.parentElement.classList.add("focused");
        }
    };

    const defocused = (input) => {
        if (input.parentElement.classList.contains("input-group")) {
            input.parentElement.classList.remove("focused");
        }
    };

    const debounce = (func, wait, immediate) => {
        var timeout;
        return function() {
          var context = this,
            args = arguments;
          var later = function() {
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
            window.onscroll = debounce(function() {
            if (window.scrollY > scrollDistance) {
                blurNavbar();
            } else {
                transparentNavbar();
            }
            }, 10);
        } else {
            window.onscroll = debounce(function() {
            transparentNavbar();
            }, 10);
        }

        var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows) {
            var content = document.querySelector('.main-content');
            if (navbarScrollActive === 'true') {
            content.addEventListener('ps-scroll-y', debounce(function() {
                if (content.scrollTop > scrollDistance) {
                blurNavbar();
                } else {
                transparentNavbar();
                }
            }, 10));
            } else {
            content.addEventListener('ps-scroll-y', debounce(function() {
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

    return (<>
        {/* Sidebar */}
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
            id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                    aria-hidden="true" id="iconSidenav"></i>
                <a className="navbar-brand m-0" onClick={() => handleRoutes(Routes.DASHBOARD, "Dashboard")}
                    target="_blank">
                    <img src="/img/payin-logo.png" className="navbar-brand-img h-100" alt="main_logo" />
                    {/* <span className="ms-1 font-weight-bold text-white">Material Dashboard 2</span> */}
                </a>
            </div>
            <hr className="horizontal light mb-2" />
            <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link text-white active bg-gradient-primary" id="dashboard" onClick={() => handleRoutes(Routes.DASHBOARD, "Dashboard")}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">dashboard</i>
                            </div>
                            <span className="nav-link-text ms-1">Dashboard</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" id="addfund" onClick={() => handleRoutes(Routes.ADDFUND, "Add Fund")}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">credit_card</i>
                            </div>
                            <span className="nav-link-text ms-1">Add Fund</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white " onClick={() => handleRoutes(Routes.SETTLEMENT, "Settlement Request")}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">receipt_long</i>
                            </div>
                            <span className="nav-link-text ms-1">Settlement</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="#">
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">view_in_ar</i>
                            </div>
                            <span className="nav-link-text ms-1">Bulk Payout</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white " onClick={() => handleRoutes(Routes.PAYINREQUEST, "Payin Request")}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">format_textdirection_r_to_l</i>
                            </div>
                            <span className="nav-link-text ms-1">Payin Request</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" onClick={() => handleRoutes(Routes.PAYINREPORT, "Payin Report")}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">notifications</i>
                            </div>
                            <span className="nav-link-text ms-1">Payin Report</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white " onClick={() => handleRoutes(Routes.REPORTS, "Reports")}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">notifications</i>
                            </div>
                            <span className="nav-link-text ms-1">Reports</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white " onClick={() => handleRoutes(Routes.APILOGSREPORT, "API Logs Report")}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">notifications</i>
                            </div>
                            <span className="nav-link-text ms-1">API Logs Report</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white " onClick={() => handleRoutes(Routes.APICREDENTIALS, "API Credentials")}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">notifications</i>
                            </div>
                            <span className="nav-link-text ms-1">API Key</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white " onClick={() => handleRoutes(Routes.ANALYTICS, "Analytics")}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">notifications</i>
                            </div>
                            <span className="nav-link-text ms-1">Analytics</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white " href="https://documenter.getpostman.com/view/26012909/2s9YR3cvVF" target="_blank" rel="noreferrer">
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">notifications</i>
                            </div>
                            <span className="nav-link-text ms-1">Payin Document</span>
                        </a>
                    </li>

                    <li className="nav-item mt-3">
                        <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white btn-outline-primary" href="../pages/profile.html">
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">person</i>
                            </div>
                            <span className="nav-link-text ms-1">Profile</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white bg-gradient-primary" href="../pages/sign-up.html" style={{ marginBottom: "3rem" }}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">assignment</i>
                            </div>
                            <span className="nav-link-text ms-1">Log Out</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
        {/* End Sidebar */}
        
    </>);
}
