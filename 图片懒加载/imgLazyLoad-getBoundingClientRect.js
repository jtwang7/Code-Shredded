// 利用 getBoundingClientRect() 监听滚动变化

// 图片懒加载 image 元素设置：<img src='' data-src='real-image-url'>
const imgLazyLoad = (function () {
  let imgList = [...document.querySelectorAll('img[data-src]')]; // 基于 css 属性选择器，查找所有要懒加载的 image 元素
  const lens = imgList.length; // 记录需要懒加载的图片个数
  let count = 0; // 记录当前已完成懒加载的图片个数

  // 实际监听的事件，每次滚动时触发
  return function () {
    let deleteImgListIdx = []; // 存储本轮完成图片加载的 image 索引，用于后续 imgList 的更新

    // 遍历 imgList，查看是否有符合条件的 image 元素触发图片加载。
    imgList.forEach((imgElement, idx) => {
      let rect = imgElement.getBoundingClientRect(); // image 元素的位置信息
      if (rect.top < window.innerHeight) {
        imgElement.style.setProperty('src', imgElement.style.getPropertyValue('data-src')); // 等价于 imgElement.src = imgElement['data-src'];
        // 在图片完成挂载后，移除 data-src 属性
        imgElement.addEventListener('load', function () {
          imgElement.style.removeProperty('data-src');
        })
        deleteImgListIdx.push(idx); // 记录已完成的 image 索引位置
        if (++count === lens) {
          // 若全部完成懒加载，则移除滚动监听事件
          document.removeEventListener('scroll', imgLazyLoad);
        }
      }
    })
    imgList = imgList.filter((item, idx) => !deleteImgListIdx.includes(idx)); // 更新 imgList，移除已经完成图片加载的 image 元素。不能在 forEach 中删除，因为会改变数组长度
  }
})(); // 立即执行，主要用于形成闭包

document.addEventListener('scroll', imgLazyLoad); // 添加滚动监听事件
