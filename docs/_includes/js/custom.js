// Script to switch dark and light mode depending on client settings
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (event.matches) {
      jtd.setTheme("dark");
    } else {
      jtd.setTheme("light");
    }
  });

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  jtd.setTheme("dark");
}

document.addEventListener("DOMContentLoaded", () => {
  const tables = document.querySelectorAll("table");
  const addStickyHeaders = (tables) => {
    tables.forEach((table) => {
      if (table.offsetHeight >= 700) {
        table.classList.add("js-table");
      }
    });
  };
  addStickyHeaders(tables);
  setTimeout(() => {
    const tableElements = document.querySelectorAll(".js-table");
    tableElements.forEach((tableElement) => {
      new window.StickyTable(tableElement);
    });
  }, 500);
});
