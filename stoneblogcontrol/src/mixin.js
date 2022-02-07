import store from "./store";
let mixin = {
  data() {
    return {
      msg: "123",
      op: store.getters.opList,
    };
  },
};
export default mixin;
