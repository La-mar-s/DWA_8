import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

function PreviewBookFactory () {

  function createPreviewElement({ author, id, image, title }) {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

    return element;
  }

  function themeChanger(theme) {
    const root = document.documentElement;
    if (theme === "night") {
      root.style.setProperty(
        "--color-dark",
        "255, 255, 255"
      );
      root.style.setProperty("--color-light", "10, 10, 20");
    } else {
      root.style.setProperty("--color-dark", "10, 10, 20");
      root.style.setProperty(
        "--color-light",
        "255, 255, 255"
      );
    }
  }

  function dataList(pathArray, books) {
    let active = null;
    for (const node of pathArray) {
      if (active) break;

      if (node?.dataset?.preview) {
        let result = null;

        for (const singleBook of books) {
          if (result) break;
          if (singleBook.id === node?.dataset?.preview) result = singleBook;
        }

        active = result;
      }
      if (active) {
        document.querySelector("[data-list-active]").open = true;
        document.querySelector("[data-list-blur]").src = active.image;
        document.querySelector("[data-list-image]").src = active.image;
        document.querySelector("[data-list-title]").innerText = active.title;
        document.querySelector("[data-list-subtitle]").innerText = `${
          authors[active.author]
        } (${new Date(active.published).getFullYear()})`;
        document.querySelector("[data-list-description]").innerText =
          active.description;
      }
    }
  }
  return {
    createPreviewElement,
    themeChanger,
    dataList,
  };
};

export const bookFactory = PreviewBookFactory()

