type action = { type: string, payload: any }
interface createStoreParams<T> {
  initState: T,
  reducer: (state: T, action: action) => T,
}

function MyCreateStore<T>({ initState, reducer }: createStoreParams<T>) {
  let state = initState; // store仓库存储的状态
  let listeners = []; // store仓库存储的回调

  // 订阅
  const subscribe = (listener: any): void => {
    listeners.push(listener);
  }

  // 发布
  const dispatch = (action: action): void => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  // 获取state
  const getState = (): T => {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState,
  }
}