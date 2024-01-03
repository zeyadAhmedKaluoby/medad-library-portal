'use client'
import { usePathname, useRouter } from 'next/navigation'
import { randomId } from "javascript-functions";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { BsCircleHalf, BsGlobe2 } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import Link from "next/link"
import { useEffect, useState } from 'react'
import { trans } from '../../../utils/helpers';
import { Dropdown } from 'antd';
export const Header = ({ translations, lang, headerData }: any) => {
    const pathname = usePathname()
    const router = useRouter()
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const handleToggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };
    const listenScreenResize = () => {
        window.addEventListener("resize", () => {
            if (window.innerWidth > 1024) {
                setShowMobileMenu(false);
            }
        });
    };
    const renderHeaderLogo = () => (
        <div className="flex items-center me-3">
            {/* burger icon */}
            <button type="button" className="me-1 rtl:scale-x-[-1] lg:hidden" onClick={handleToggleMobileMenu}>
                <HiOutlineMenuAlt2 size={38} />
            </button>

            {/* logo */}
            <Link href={`${lang}/`}>
                <img className="w-28 sm:w-32" src={headerData.logo} alt="Logo" />
            </Link>
        </div>
    );
    const renderSingleNavItem = ({ item, device }: any) => {
        const classNames: any = {
            mobile: "mb-4 cursor-pointer text-base font-semibold border rounded hover:bg-neutral-100 overflow-hidden",
            desktop: "cursor-pointer text-sm font-semibold xl:text-base",
        };

        const toggle = () => {
            if (device === "mobile") {
                handleToggleMobileMenu();
            }
        };

        const navLinkClassName = (isActive: any) => `${isActive ? `active-link-${device}` : ""} ${device === "mobile" ? "block w-full p-3" : "block w-full"}`;
        const renderDDLChildren = (childs: any) => {
            const children = childs.map((ele: any, i: any) => ({
                key: i,
                label: (
                    <button type="button" className="flex items-center text-sm text-neutral-500 hover:text-secondary-color">
                        <a href={ele.url} className="mx-1">
                            {trans(translations, ele.title)}
                        </a>
                    </button>
                ),
            }));

            return children;
        };
        const renderAnchor = (el: any) => {
            switch (el.route_id) {
                case "home":
                    return (
                        <Link onClick={toggle} href={`/${lang}`}>
                            {trans(translations, "Home")}
                        </Link>
                    );
                case "subject_categories":
                    return (
                        <Link
                            onClick={toggle}
                            href={`/${lang}/`}
                        >
                            {trans(translations, "Subject Categories")}
                        </Link>
                    );
                case "kids_categories":
                    return (
                        <Link
                            onClick={toggle}

                            href={`/${lang}`}
                        >
                            {trans(translations, "Kids Categories")}
                        </Link>
                    );
                case "eservices": {
                    return (
                        <Link
                            onClick={toggle}
                            href={`/${lang}`}
                        >
                            {trans(translations, "E-Services")}
                        </Link>
                    );
                }
                case "contact_us": {
                    const contactUsSearchQuery = `formId=${headerData.contact_us_key}&isAccess=1`;
                    return (
                        <Link
                            onClick={toggle}
                            href={`/${lang}`}
                        >
                            {trans(translations, "Contact Us")}
                        </Link>
                    );
                }
                default:
                    return (
                        <a onClick={toggle} href={el.url}>
                            {trans(translations, el.title)}
                        </a>
                    );
            }
        };

        return (
            item.is_enabled &&
            !!renderAnchor(item) && (
                <li key={item.title} className={classNames[device]}>
                    {/* without children */}
                    {!item?.children?.length && renderAnchor(item)}

                    {/* if has children */}
                    {item?.children?.length && (
                        <Dropdown menu={{ items: renderDDLChildren(item.children) }} trigger={["click"]}>
                            <div className="flex w-full items-center justify-center p-3 lg:p-0">
                                <a href={item.url} onClick={toggle}>
                                    {trans(translations, item.title)}
                                </a>
                                <IoMdArrowDropdown size={18} />
                            </div>
                        </Dropdown>
                    )}
                </li>
            )
        );
    };
    const renderDesktopMenu = () => (
        <div className="my-3 text-center lg:my-0">
            <ul className="mt-2 hidden gap-3 lg:inline-flex">{headerData.main_menu.map((ele: any) => renderSingleNavItem({ item: ele, device: "desktop" }))}</ul>
        </div>
    );
    const renderLangsDDL = () => {
        const langs: any = [];

        headerData?.languages.forEach((ele: any, i: any) => {
            langs.push({
                key: i,
                label: (
                    <button
                        type="button"
                        className="flex items-center text-sm text-neutral-500 hover:text-secondary-color"
                        onClick={() => {
                            router.push(`${ele.abbr}/${pathname.split('/')?.filter((i: string, index: number) => index != 0 && index != 1 && index != 2)?.join('/')}`);
                            setTimeout(() => {
                                router.refresh()
                            }, 500);
                        }}
                    >
                        <div className="flex items-center justify-center gap-1">
                            {/* <span>{supportedLangsWithFlags[ele.abbr]}</span> */}
                            <span>{ele.label}</span>
                        </div>
                    </button>
                ),
            });
        });

        return langs;
    };
    const renderSwitchers = () => (
        <div className="flex items-start gap-1 xs:gap-2">
            {/* gray mode switcher */}
            <button
                type="button"
                title={trans(translations, "Gray Mode")}
                onClick={() => {
                }}
            >
                <BsCircleHalf size={24} />
            </button>

            {/* langs switcher */}
            <Dropdown menu={{ items: renderLangsDDL() }} trigger={["click"]}>
                <button title={trans(translations, "Language")} type="button" className="flex items-center">
                    <BsGlobe2 size={24} />
                    <IoMdArrowDropdown size={18} />
                </button>
            </Dropdown>
        </div>
    );

    useEffect(() => {
        listenScreenResize();
    }, []);

    return <>
        {headerData && (
            <div className="flex w-full items-center justify-between px-2 4xl:mx-auto 4xl:w-[1820px]">
                <div className="my-3 flex items-center text-left lg:my-0">
                    {renderHeaderLogo()}
                    {/* desktop menu */}
                    {renderDesktopMenu()}
                </div>

                <div className="flex items-center">
                    {/* Switchers */}
                    {renderSwitchers()}

                    {/* Profile */}
                    {/*userData?.tokens?.access_token && renderProfileDDL()*/}

                    {/* buttons */}
                    {/*!userData?.tokens?.access_token && renderHeaderButtons()*/}
                </div>
            </div>
        )}
        {/*         <Link locale="en"  href={`/[lang]/${pathname.split('/')?.filter((i: string, index: number) => index != 0 && index != 1)?.join('/')}`} as={`/en/${pathname.split('/')?.filter((i: string, index: number) => index != 0 && index != 1)?.join('/')}`}>
            English
        </Link>
        {' | '}
        <Link locale="ar" href={`/[lang]/${pathname.split('/')?.filter((i: string, index: number) => index != 0 && index != 1)?.join('/')}`} as={`/ar/${pathname.split('/')?.filter((i: string, index: number) => index != 0 && index != 1)?.join('/')}`}>
            Arabic
        </Link> */}
    </>
}