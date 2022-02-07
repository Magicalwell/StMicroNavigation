<template>
  <div class="roles-detail">
    <h3
      style="
        line-height: 1.5;
        border-bottom: 2px solid #000;
        margin-bottom: 30px;
      "
    >
      权限详情{{ routerType == "edit" ? "修改" : "查看" }}
    </h3>
    <div class="container" :class="{ details: routerType == 'details' }">
      <div class="inline-block">
        <label for class="search-label">id：</label>
        <el-input
          placeholder="id"
          v-model="detailsData.id"
          :disabled="routerType == 'details'"
        ></el-input>
      </div>
      <div class="inline-block">
        <label for class="search-label">手机号：</label>
        <el-input
          placeholder="id"
          v-model="detailsData.phone"
          :disabled="routerType == 'details'"
        ></el-input>
      </div>
      <div class="inline-block">
        <label for class="search-label">使用人姓名：</label>
        <el-input
          placeholder="id"
          v-model="detailsData.nickname"
          :disabled="routerType == 'details'"
        ></el-input>
      </div>
      <div class="inline-block">
        <label for class="search-label">注册ip地址：</label>
        <el-input
          placeholder="id"
          v-model="detailsData.registerip"
          :disabled="routerType == 'details'"
        ></el-input>
      </div>
      <div class="inline-block">
        <label for class="search-label">最后修改人：</label>
        <el-input
          placeholder="id"
          v-model="detailsData.lastmodefined"
          :disabled="routerType == 'details'"
        ></el-input>
      </div>
      <div class="inline-block">
        <label for class="search-label">最后修改时间：</label>
        <el-input
          placeholder="id"
          v-model="detailsData.changetime"
          :disabled="routerType == 'details'"
        ></el-input>
      </div>
      <div class="inline-block">
        <label for class="search-label">账户状态：</label>
        <el-input
          placeholder="id"
          v-model="detailsData.status"
          :disabled="routerType == 'details'"
        ></el-input>
      </div>
      <div class="inline-block">
        <label for class="search-label">功能角色：</label>
        <el-select
          v-model="detailsData.roles"
          multiple
          collapse-tags
          style="margin-left: 20px"
          placeholder="请选择"
          :disabled="routerType == 'details'"
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="footer">
      <el-button class="btn-items" @click="submit">保存</el-button>
      <el-button class="btn-items" @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesChoose: [],
      detailsData: {},
      options: [
        {
          id: 1,
          label: "黄金糕",
        },
        {
          id: 2,
          label: "双皮奶",
        },
        {
          id: 3,
          label: "蚵仔煎",
        },
        {
          id: 4,
          label: "龙须面",
        },
        {
          id: 5,
          label: "北京烤鸭",
        },
      ],
      //       {
      //   id: 1,
      //   phone: 17712121212,
      //   nickname: "三石啊",
      //   registerip: "127.0.0.1",
      //   lastmodefined: "三石啊",
      //   changetime: "2022-2-26",
      //   status: 0,
      //   roles: [{ id: 1, rolesname: "超级管理员" }],
      // },
    };
  },
  created() {
    // url传数组刷新后会有问题，这里应该是只传id和type然后请求接口返回数据，目前先通过url传递，后续再改进
    this.detailsData = this.$route.query;
    console.log(this.$route.query);
    // this.rolesChoose = this.$route.query.roles.map((item) => item.id);
  },
  computed: {
    routerType() {
      return this.$route.query.type;
    },
  },
  methods: {
    submit() {},
  },
};
</script>

<style lang="scss" scoped>
.inline-block {
  margin: 30px 50px 0 0;
  display: inline-block;
  ::v-deep.el-input {
    display: inline-block;
    width: 202px;
  }
  // ::v-deep.el-form-item__content {
  //   display: inline-block;
  //   width: 202px;
  // }
}
.block {
  margin: 30px 50px 0 0;
  ::v-deep.el-form-item__content {
    display: inline-block;
  }
}
.container {
  margin-bottom: 30px;
}
.search-label {
  min-width: 108px;
}
.details {
  ::v-deep.el-input.is-disabled .el-input__inner {
    background-color: transparent;
    border-color: transparent;
    color: #000;
  }
}
.roles-detail {
  padding: 30px 45px 30px 50px;
}
</style>
