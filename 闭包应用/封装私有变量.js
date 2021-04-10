// 确保用户无法直接获取并修改变量, 只能通过调用方法访问变量; 
function People() {
  let name = 'Siri';
  let age = 18;
  this.getPersonInfo = () => {
    console.log(`My name is ${name}, I'm ${age} years old.`);
  }
}

const name = 'none';
const age = 0;

const people = new People(); // new 绑定: this 指向了 new 创建的对象
console.log(name); // 无法访问私有变量
console.log(age);
people.getPersonInfo(); // 通过方法调用可获取闭包内私有变量.