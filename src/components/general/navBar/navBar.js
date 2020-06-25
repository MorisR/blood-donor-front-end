import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import NavBarItem from "../navBarItem";
import "./navBar.css";

const navBarData = [
  {
    title: "home",
    redirectionLink: "/",
    iconSrc: "/img/icon-nav-home.svg",
  },
  {
    title: "Goal",
    redirectionLink: "/goals",
    iconSrc: "/img/icon-nav-flag.svg",
  },
  {
    title: "map",
    redirectionLink: "/map",
    iconSrc: "/img/icon-nav-map.svg",
  },
  {
    title: "personal",
    redirectionLink: "/personal",
    iconSrc: "/img/icon-nav-profile.svg",
  },
  {
    title: "settings",
    redirectionLink: "/settings",
    iconSrc: "/img/icon-nav-settings.svg",
  },
];

function NavBar({
  data = navBarData,
  className,
  elementClassName,
}) {
  //reference the dom elements
  let container = useRef(null);
  let selectionHighlight = useRef(null);
  let history = useHistory();

  //add an onClick event that:
  // 1. sets the size of the "selected item div" to equal to the provided dom element
  // 2. set the position of the "selected item div" based on the div child index
  function setSelectedItemDimensions(index, domElement) {
    selectionHighlight.current.style.height = `${domElement.offsetHeight}px`;
    selectionHighlight.current.style.width = `${domElement.offsetWidth}px`;
    selectionHighlight.current.style.left = `${index * domElement.clientWidth}px`;
  }

  useEffect(() => {
    //update the selected item to match the initial route
    let filterRes = data.filter(element => window.location.pathname === element.redirectionLink);
    if (!filterRes.length)
        filterRes= data.filter(element=> {
            if(element.redirectionLink ==="/")
                return false;
            const regex = new RegExp(`^${element.redirectionLink}`, 'ig')
            return regex.test(window.location.pathname)
        })


      console.log(filterRes)
    if (filterRes.length) {
      let index = navBarData.indexOf(filterRes[0]);
      setSelectedItemDimensions(index, container.current.children[index]);
    }
  });

  return (
    <header className="navBar">
      <nav className={`navBar_flexContainer ${className}`} ref={container}>
        {data.map((element, index) => (
          <NavBarItem
            key={index}
            src={element.iconSrc}
            title={element.title}
            className={`navBar_item ${elementClassName}`}
            onClick={(e) => {
              //add on click event to every child of the nav bar that sets the visuals
              setSelectedItemDimensions(index, e.currentTarget);
              //redirect the user to the given route
              history.push(element.redirectionLink);
            }}
          />
        ))}
        <div ref={selectionHighlight} className="navBar_selectedItem" />
      </nav>
    </header>
  );
}

export default NavBar;
