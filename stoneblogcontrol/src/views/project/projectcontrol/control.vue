<template>
  <div class="project-control">
    <h3
      style="
        line-height: 1.5;
        border-bottom: 2px solid #000;
        margin-bottom: 30px;
      "
    >
      项目管理
    </h3>
    <div class="control-btn">
      <el-button-group>
        <el-button type="primary" icon="el-icon-search"></el-button>
        <el-button type="primary" icon="el-icon-refresh-right"></el-button>
      </el-button-group>
      <el-button type="primary" style="margin-left: 10px"> 新增 </el-button>
    </div>
    <div class="container">
      <el-table :data="tableData" style="width: 100%" stripe max-height="850">
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="id" label="项目id" width="100">
        </el-table-column>
        <el-table-column prop="title" label="项目标题">
          <template slot-scope="scope">
            {{ scope.row.title }}
            <span class="tags" v-if="cacheStack.includes(scope.row.id)">
              编辑中
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="globelimg" label="缩略图" width="150">
          <template>
            <el-image
              style="width: 80px; height: 80px"
              src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de2750e86df74c539ecb5be17dbd9b6c~tplv-k3u1fbpfcp-no-mark:720:720:720:480.awebp?"
              :preview-src-list="[
                'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de2750e86df74c539ecb5be17dbd9b6c~tplv-k3u1fbpfcp-no-mark:720:720:720:480.awebp?',
              ]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="200">
        </el-table-column>
        <el-table-column prop="tags" label="项目标签" width="350">
          <template slot-scope="scope">
            <span
              v-for="(item, index) in scope.row.tags"
              :key="index"
              class="tags"
            >
              {{ item }}
            </span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row, true)"
              type="text"
              size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer
      :title="openproject.title"
      :visible.sync="drawer"
      size="55%"
      :before-close="confirmCloseDrawer"
      class="drawer-box"
    >
      <div class="drawer-container">
        <el-form :model="openproject">
          <el-form-item label="项目名称：" style="width: 202px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="项目作者：" style="width: 202px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="项目标签：" style="width: 202px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="项目更新时间：" style="width: 202px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="项目地址：" style="width: 404px">
            {{ "http:\/\/127.0.0.1" }}
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="项目简介：">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="openproject.introduction"
            >
            </el-input>
          </el-form-item>
          <mavon-editor
            v-model="openproject.text"
            class="markdown-container"
            :subfield="false"
          ></mavon-editor>
        </el-form>
      </div>
      <div class="drawer-footer">
        <el-button>放弃更改</el-button>
        <el-button @click="drawer = false">暂存</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          title: "博客管理系统",
          author: "三石",
          tags: ["vue", "后台管理"],
          introduction: "哦哦哦哦这是测试哦\n哦哦哦哦",
          text: "这是111111111111111111",
        },
        {
          id: 2,
          title: "微前端",
          author: "三石",
          tags: ["vue", "后台管理"],
          introduction: "哈哈哈哈哈哈哈哈哈",
          text: "这是正文",
        },
      ],
      drawer: false,
      innerDrawer: false,
      editor: true,
      openproject: {},
      projectStack: [],
      cacheStack: [], // 保存有修改的id
      currentId: null,
    };
  },
  methods: {
    handleClick(item, Type) {
      this.currentId = item.id;
      if (this.cacheStack.includes(item.id)) {
        this.openproject = this.projectStack.filter(
          (val) => val.id == item.id
        )[0];
      } else {
        this.cacheStack.push(item.id);
        this.openproject = this.deepCopy(item);
        this.projectStack.push(this.openproject);
      }
      this.editor = Type;
      this.drawer = true;
    },
    deepCopy(obj) {
      // 深拷贝
      if (typeof obj !== "object") return;
      var newObj = obj instanceof Array ? [] : {};
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          newObj[key] =
            typeof obj[key] === "object" ? this.deepCopy(obj[key]) : obj[key];
        }
      }
      return newObj;
    },
    confirmCloseDrawer(done) {
      this.$confirm("确认不保存直接关闭吗?", "提示", {
        confirmButtonText: "放弃更改",
        cancelButtonText: "去提交",
        type: "warning",
      })
        .then(() => {
          this.cacheStack = [];
          this.openproject = {};
          this.currentId = null;
          this.projectStack = [];
          // this.cacheStack.splice(this.cacheStack.indexOf(this.currentId), 1);
          // this.openproject.splice();
          // 暂时做全部清空处理，待引入组件库
          done();
        })
        .catch(() => {});
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to && this.cacheStack.length != 0) {
      this.$confirm("有待保存的修改,确认直接退出吗?", "提示", {
        confirmButtonText: "放弃更改",
        cancelButtonText: "去提交",
        type: "warning",
      })
        .then(() => {
          next();
        })
        .catch(() => {}); // 后续需要跳转到其他路由时保存编辑状态，则需要存入vuex中
    } else {
      next();
    }
  },
};
</script>

<style lang="scss" scoped>
.project-control {
  padding: 30px 45px 20px 50px;
}
.tags {
  margin-right: 10px;
  height: 21px;
  padding: 0 8px;
  line-height: 21px;
  display: inline-block;
  font-size: 12px;
  color: #409eff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
}
.drawer-container {
  padding: 0 20px 20px 20px;
}
.control-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.drawer-box {
  .drawer-footer {
    padding-left: 20px;
    padding-bottom: 20px;
  }
}
</style>
