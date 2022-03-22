// 参考：https://juejin.cn/post/6983904373508145189#heading-7

let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]

// 期望输出
// [
//   {
//       "id": 1,
//       "name": "部门1",
//       "pid": 0,
//       "children": [
//           {
//               "id": 2,
//               "name": "部门2",
//               "pid": 1,
//               "children": []
//           },
//           {
//               "id": 3,
//               "name": "部门3",
//               "pid": 1,
//               "children": [
//                   // 结果 ,,,
//               ]
//           }
//       ]
//   }
// ]

function arrayToTree(arr) {
  const map = {}; // data - tree 哈希映射表
  const res = []; // 结果

  // 创建各数据对应的树形结构
  for (let item of arr) {
    map[item.id] = {...item, children: []};
  }

  for (let item of arr) {
    const id = item.id; // 当前节点id
    const pid = item.pid; // 其父节点id
    const treeItem = map[id]; // 当前节点对应的树结构
    if (!pid) {
      // 父节点不存在，说明是根节点，推入数组
      res.push(treeItem);
    } else {
      // 父节点存在:
      // 若父节点没有创建对应的树结构，则先创建
      if (!map[pid]) {
        map[pid] = {
          children: [],
        }
      }
      // 将当前节点推入到父节点的children属性
      map[pid].children.push(treeItem);
    }
  }

  return res;
}

// test
console.log(arrayToTree(arr));