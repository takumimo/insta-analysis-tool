import classNames from "classnames";
import React, { useState, useMemo } from "react";
import { logo_name } from "../config";
import { ArrowIcon } from "./icons/ArrowIcon";
import { Logo } from "./icons/Logo";
import { PcIcon } from "./icons/PcIcon";
import { PageIcon } from "./icons/PageIcon";
import { BarChartIcon } from "./icons/BarChartIcon";
import { GearIcon } from "./icons/GearIcon";
import { useRouter } from "next/router";
import Link from "next/link";

const menuItems = [
  { id: 1, label: "ダッシュボード", icon: PcIcon, link: "/" },
  { id: 2, label: "投稿分析", icon: PageIcon, link: "/posts" },
  { id: 3, label: "競合分析", icon: BarChartIcon, link: "/others" },
  { id: 4, label: "設定", icon: GearIcon, link: "/settings" },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-indigo-700 text-white flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-blue-200 rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-blue-200"]: activeMenu?.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <div
              className={classNames("flex text-lg", {
                hidden: toggleCollapse,
              })}
            >
              <Logo />
              <div className="flex mt-4 ml-1">{logo_name}</div>
            </div>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <ArrowIcon />
            </button>
          )}
        </div>
        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div className={classes}>
                <Link href={menu.link}>
                  <a className="flex py-4 px-3 items-center w-full h-full">
                    <div style={{ width: "2.5rem" }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
