const Tabs = function (options) {
  var elem = document.getElementById(options.elem);
  if (!elem) throw new Error('Element with ID "' + options.elem + '" not found');

  var open = typeof options.open === "number" ? options.open : 0;
  var titleClass = "js-tabs__title";
  var activeClass = "js-tabs__title-active";
  var contentClass = "js-tabs__content";
  var titles = elem.querySelectorAll("." + titleClass);
  var contents = elem.querySelectorAll("." + contentClass);
  var tabsNum = titles.length;

  render();

  function render(n) {
    elem.addEventListener("click", onClick);

    var init = typeof n === "number" ? checkTab(n) : checkTab(open);

    for (var i = 0; i < tabsNum; i++) {
      titles[i].setAttribute("data-index", i);
      if (i === init) openTab(i);
    }
  }

  function onClick(e) {
    var target = e.target.closest("." + titleClass);
    if (!target) return;

    e.preventDefault();

    var index = parseInt(target.getAttribute("data-index") || "0", 10);
    openTab(index);
  }

  function reset() {
    for (var i = 0; i < tabsNum; i++) {
      contents[i].style.display = "none";
      titles[i].className = removeClass(titles[i].className, activeClass);
    }
  }

  function removeClass(str, cls) {
    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)", "g");
    return str.replace(reg, " ").trim();
  }

  function checkTab(n) {
    return n < 0 || isNaN(n) || n >= tabsNum ? 0 : n;
  }

  function openTab(n) {
    reset();

    var i = checkTab(n);
    titles[i].classList.add(activeClass);
    contents[i].style.display = "";
  }

  function update(n) {
    destroy();
    reset();
    render(n);
  }

  function destroy() {
    elem.removeEventListener("click", onClick);
  }

  return {
    open: openTab,
    update: update,
    destroy: destroy,
  };
};
