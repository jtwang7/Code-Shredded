import EventEmitter from './EventEmitter.js'

let eventEmitter = new EventEmitter();

// 验证链式调用 / 回调队列
eventEmitter.on('deliverMilk', (number) => {
  console.log(`您订的牛奶已发货, 发货单号为${number}`);
}).on('deliverPaper', (number) => {
  console.log(`您订的报纸已发货, 发货单号为${number}`);
}).on('tel', () => {
  console.log('20:00 未接来电');
}).on('tel', () => {
  console.log('21：00 未接来电');
}).on('tel', () => {
  console.log('21：30 未接来电');
})
eventEmitter.emit('deliverMilk', 1220315674).emit('deliverPaper', 2315610231).emit('tel');

// 验证 once 方法
eventEmitter.once('strangeCall', () => console.log('您的外卖到了, 不再通知...'));
eventEmitter.emit('strangeCall').emit('strangeCall').emit('strangeCall');

// 验证 off 方法
eventEmitter.off('tel');
function strangeCall () {
  console.log('您的外卖到了, 不再通知...')
}
eventEmitter.once('strangeCall', strangeCall);
eventEmitter.off('strangeCall', strangeCall);
eventEmitter.emit('tel').emit('strangeCall');