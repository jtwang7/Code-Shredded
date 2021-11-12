function imgLazyLoad() {
  let imgList = [...document.querySelectorAll('img[data-src]')]; // 基于 css 属性选择器，查找所有要懒加载的 image 元素
  // 图片加载的函数
  const loadImage = (imgElem) => {
    imgElem.style.setProperty('src', imgElem.style.getPropertyValue('data-src'));
    // 在图片完成挂载后，移除 data-src 属性
    imgElem.addEventListener('load', function () {
      imgElem.style.removeProperty('data-src');
    })
  }

  // 实例化 IntersectionObserver 监听器
  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    // 遍历监听器传给回调函数的监听对象
    entries.forEach((entry) => {
      // 当目标元素与根元素相交时，触发图片加载，并移除对该目标元素的后续监听
      if (entry.isIntersecting) {
        loadImage(entry.target);
        observer.unobserve(entry.target);
      }
    })
  });

  imgList.forEach((item) => {
    intersectionObserver.observe(item); // 将每个懒加载的 image 元素，添加到 observer 的监听列表中
  })
}