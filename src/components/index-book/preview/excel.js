export function asynLoad(src, isCss = false) {
  return new Promise((res) => {
    let el;
    if (isCss) {
      el = document.createElement("link");
      el.rel = "stylesheet";
      el.href = src;
    } else {
      el = document.createElement("script");
      el.src = src;
    }
    document.documentElement.appendChild(el);
    el.onload = el.onreadystatechange = function () {
      if (
        !this.readyState ||
        this.readyState == "loaded" ||
        this.readyState == "complete"
      ) {
        res(true);
      }
      this.onload = this.onreadystatechange = null;
    };
  });
}
