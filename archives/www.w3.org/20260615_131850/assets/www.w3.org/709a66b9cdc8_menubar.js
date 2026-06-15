/*
  Contains event handlers to close a dropdown menu when another one is
  opened, and to handle arrow keys to navigate between menu items.

  On narrow screens, the script hides the main menu bar and shows a
  "hamburger" button to show/hide it.

  This script works on NAV elements inside HEADER elements, and NAV
  elements with an ID of "global-nav", and tries to make them behave a
  bit more like traditional menubars.

  The NAV element is assumed to contain A elements and DETAILS
  elements, the latter representing dropdown menus.

  The script adds or removes "open" attributes, which, on DETAILS
  elements, has the effect of opening or closing them. (The script
  also adds "open" attributes on A elements, which has no visual
  effect, but is used for bookkeeping.)

  The script attaches an event handler to the A and SUMMARY elements
  inside the menubar. The event handler runs when an elements gets the
  focus or when the mouse pointer enters it. The handler checks if any
  other descendant of the NAV currently is open (i.e., has an "open"
  attribute), and if so, it closes that element and opens the current
  element (or its parent, if the current element is a SUMMARY). The
  focus is also moved to the current element.

  The effect is that always at most one dropdown menu is open and that
  moving the mouse to the next menu opens that menu and closes the
  current one.

  Arrow keys pressed on SUMMARY or A element move the focus left,
  right, up or down to the next A or SUMMARY elements. The focus
  wraps: If there is no element to the left, the focus moves to the
  rightmost element, etc. The down arrow also opens a drop down menu
  if it was closed. (The enter key also still works.)

  The Escape key closes the current menu. A click also closes it.

  Note that this script does not change how the Tab, Space and Enter
  keys work.

  Thus there is a difference between moving left/right with the arrow
  keys and with Tab or Shift-Tab: If you move left or right with the
  arrow keys while there is a menu open, the focus moves but also the
  menu is closed and the next menu is opened. When you use the Tab
  key, the focus moves, but the open menu is not closed. (This is the
  expected beahvior of Tab.)

  And opening a menu with the up or down arrow keys closes any other
  menu that is currently open, but opening it with Space or Enter does
  not. (If you want that other menus also close in that case, you can
  set the "name" attribute on the DETAILS elements.)

  TODO: Support dragging with the mouse button depressed.
*/

'use strict';


(function () {

  let menubars = [];		// All menu bars
  let collapsible_menus = [];	// The menu bars with a hamburger button


  // maybe_change_menu -- if any menu is open, close it and open this one
  function maybe_change_menu(elem)
  {
    // Find the top-level menu this element belongs to.
    let menu = elem;
    while (menu.parentElement.tagName !== "NAV") menu = menu.parentElement;

    // If there is a different menu currently open, close it and open
    // the new one. If there is no menu currently open, this does nothing.
    for (const m of menubars)
      for (const e of m.children)
	if (e != menu && e.hasAttribute("open")) {
	  e.removeAttribute("open");
	  menu.setAttribute("open", "");
	}
  }


  // mouseover_action -- handle a mouseover event
  function mouseover_action(event)
  {
    maybe_change_menu(event.currentTarget);
  }


  // document_click_action -- check a click before it does anything
  function document_click_action(event)
  {
    // If the click occurred in a menu bar or one of its sub-menus,
    // let the normal action handle the click. Except that, when the
    // click occurred on an A, first close the top-level menu that A
    // is in (which may be the A itself).
    for (const m of menubars)
      for (const e of m.children)
	if (e.contains(event.target)) {
	  let x = event.target;
	  while (x !== e && x.tagName !== "A" && x.tagName !== "SUMMARY" &&
	      x.tagName !== "BUTTON") x = x.parentNode;
	  if (x.tagName === "A") {
	    while (x.parentElement.tagName !== "NAV") x = x.parentNode;
	    x.removeAttribute("open");
	  }
	  return;
	}

    // The click did not occur in a menu bar. If there is any menu
    // open, close it and consume the event. Otherwise, let the normal
    // action handle the click.
    for (const m of menubars)
      for (const e of m.children)
	if (e.hasAttribute("open")) {
	  e.removeAttribute("open");
	  event.preventDefault();
	  event.stopPropagation();
	}
  }


  // keyboard_action -- focus another menu item if an arrow key is pressed
  function keyboard_action(event)
  {
    let elt = event.target, x, h, i;

    switch (event.key) {

    case "ArrowLeft": case "Left":
      // Set elt to the nearest ancestor or self that is a child of the NAV.
      while (elt.parentElement.tagName !== "NAV") elt = elt.parentElement;
      x = elt;
      // Move left, wrapping around, to the next menu or menu item.
      do
	if (elt.previousElementSibling) elt = elt.previousElementSibling;
        else elt = elt.parentElement.lastElementChild;
      while (elt != x && elt.tagName != "A" && elt.tagName != "DETAILS" &&
	  elt.tagName != "INPUT");
      if (x != elt) {
	maybe_change_menu(elt);		// Move any "open" attribute
	(elt.tagName != "DETAILS" ? elt : elt.firstElementChild).focus();
      }
      break;

    case "ArrowRight": case "Right":
      while (elt.parentElement.tagName !== "NAV") elt = elt.parentElement;
      x = elt;
      do
	if (elt.nextElementSibling) elt = elt.nextElementSibling;
        else elt = elt.parentElement.firstElementChild;
      while (elt != x && elt.tagName != "A" && elt.tagName != "DETAILS" &&
	  elt.tagName != "INPUT");
      if (x != elt) {
	maybe_change_menu(elt);		// Move any "open" attribute
	(elt.tagName != "DETAILS" ? elt : elt.firstElementChild).focus();
      }
      break;

    case "ArrowUp": case "Up":
      x = elt;
      while (x.parentElement.tagName !== "NAV") x = x.parentElement;
      if (x.tagName === "DETAILS") { // We have a menu, so we can go up
	maybe_change_menu(x);	     // Close any other open menu
	x.setAttribute("open", "");
	h = x.querySelectorAll("SUMMARY, A");
	for (i = 0; h[i] != elt; i++);
	i = (i + h.length - 1) % h.length;
	h[i].focus();
      }
      break;

    case "ArrowDown": case "Down":
      x = elt;
      while (x.parentElement.tagName !== "NAV") x = x.parentElement;
      if (x.tagName === "DETAILS") { // We have a menu, so we can go down
	maybe_change_menu(x);	     // Close any other open menu
	x.setAttribute("open", "");
	h = x.querySelectorAll("SUMMARY, A");
	for (i = 0; h[i] != elt; i++);
	i = (i + 1) % h.length;
	h[i].focus();
      }
      break;

    case "Escape": case "Esc":
      while (elt.parentElement.tagName !== "NAV") elt = elt.parentElement;
      elt.removeAttribute("open");
      break;

    default:
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  }


  // window_resize_action -- handle a window resize event
  function window_resize_action()
  {
    if (window.innerWidth > 500)		// Window is wide
      for (const m of collapsible_menus) {
	const hamburger_button = m.children[1];
	if (hamburger_button.style.display !== "none") {
	  // This hamburger button is not yet hidden.
	  hamburger_button.style.display = "none";
	  if (hamburger_button.nextElementSibling.style.display === "none")
	    // This hamburger button's siblings are not yet visible.
	    toggle_menu_items(hamburger_button);
	}
      }
    else					// Window is narrow
      for (const m of collapsible_menus) {
	const hamburger_button = m.children[1];
	if (hamburger_button.style.display === "none") {
	  // This hamburger button is not yet visible.
	  hamburger_button.style.display = "";
	  if (hamburger_button.nextElementSibling.style.display !== "none")
	    // This hamburger button's siblings are not yet hidden.
	    toggle_menu_items(hamburger_button);
	}
      }
  }


  // hamburger_action -- handle a click on a hamburger menu button
  function hamburger_action(event)
  {
    toggle_menu_items(event.currentTarget);
    event.preventDefault();
    event.stopPropagation();
  }


  // toggle_menu_items -- hide or show all menu items after a hamburger button
  function toggle_menu_items(button)
  {
    // Hide or show all menu items after the hamburger button by
    // swapping the 'display' property with its previous value. If
    // there is no previous value yet, use 'none'.
    for (let e = button.nextElementSibling; e; e = e.nextElementSibling) {
      let h = e.saved_display ?? "none";
      e.saved_display = e.style.display;
      e.style.display = h;
      // If we're hiding the menu item, then also close it, in case it was open.
      if (e.style.display === "none") e.removeAttribute("open");
    }

    // Show the horizontal hamburger or the vertical one, depending on
    // whether the menu items are hidden. Update "aria-expanded".
    button.setAttribute("aria-expanded",
      button.nextElementSibling.style.display === "none" ? "false" : "true");
  }


  // initialize -- add event handlers to menubar buttons
  function initialize()
  {
    // Remember all menu bars in a global variable.
    menubars = document.querySelectorAll("HEADER NAV, #global-nav");

    // Attach event handlers to various elements inside the menu bars.
    for (const m of menubars) {
      for (const x of m.querySelectorAll("A, SUMMARY, INPUT")) {
	x.addEventListener("mouseover", mouseover_action);
	x.addEventListener("keydown", keyboard_action);
      }
    }

    // A handler for clicks that might close a menu.
    document.addEventListener("click", document_click_action, true);

    // Find all collapsible menu bars with more than two items. Then
    // insert a hamburger menu button after the first item of each
    // such menu. The hamburger menu button serves to show/hide the
    // rest of the items on small screens. (Currently only the menu
    // bar with id "global-nav" is collapsible.)
    for (const m of document.querySelectorAll("#global-nav"))
      if (m.childElementCount > 2) collapsible_menus.unshift(m);
    for (const m of collapsible_menus) {
      let button = document.createElement("button");
      button.innerHTML = '<svg height="32" viewBox="0 0 32 32" width="32"\
	fill="currentColor"><rect width="28" height="4" x="2" y="6"\
	ry="2"/><rect width="28" height="4" x="2" y="14"\
	ry="2"/><rect width="28" height="4" x="2" y="22" ry="2"/></svg>';
      // Alternative: "Â â®Â ";
      button.setAttribute("class", "hamburgermenu");
      button.setAttribute("aria-label", "show more items");
      button.style.display = "none";
      button.addEventListener("click", hamburger_action);
      m.firstElementChild.after(button);
    }

    // The window_resize_action() event handler hides/shows the
    // menu_button, depending on the size of the screen. We call it
    // once to initialize the button based on the current size of the
    // screen.
    window.addEventListener("resize", window_resize_action);
    window_resize_action();
  }


  // Don't load this script twice.
  if (document.menubar_dot_js_is_loaded) return;
  document.menubar_dot_js_is_loaded = true;

  // If `DOMContentLoaded` has already fired, initialize immediately.
  // Otherwise schedule a call to initialize() for when the DOM is ready.
  if (document.readyState !== 'loading') initialize();
  else document.addEventListener('DOMContentLoaded', initialize);

})();
