<template>
  <div class="power-router">
    <h3
      style="
        line-height: 1.5;
        border-bottom: 2px solid #000;
        margin-bottom: 30px;
      "
    >
      路由管理
    </h3>
    这里设置路由，包括新增，路径的设置以及路由中一些方法对应的op
    <div class="router-select-container" style="margin-bottom: 20px">
      <div class="inline-block">
        <label for class="search-label">选择项目：</label>
        <el-select v-model="selectOptions" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.systemId"
            :label="item.title"
            :value="item.systemId"
          >
          </el-option>
        </el-select>
      </div>
      <el-button type="primary">新增路由</el-button
      ><small>功能待确定是否需要独立出来</small>
    </div>
    <div class="router-container">
      <small
        >路由管理页面暂时做成table的形式，考虑要不要做成与公司一致的形式，如果做成后者，需要引入自己的组件库并新增右键菜单指令;暂时只对父节点支持新增子节点的功能，也就是二级路由，后续如果要支持子级加路由</small
      >
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="path"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :row-class-name="sonoftree"
      >
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="path" label="路径path" width="280">
        </el-table-column>
        <el-table-column prop="name" label="路由name" width="280">
        </el-table-column>
        <el-table-column prop="meta.title" label="菜单名称" width="180">
        </el-table-column>
        <el-table-column label="菜单图标" width="180">
          <template slot-scope="scope">
            {{ scope.row.meta.icon ? scope.row.meta.icon : "无图标" }}
          </template>
        </el-table-column>
        <el-table-column label="节点等级" width="180">
          <template slot-scope="scope">
            {{ scope.row.children ? "父级路由" : "子路由" }}
          </template>
        </el-table-column>
        <el-table-column prop="redirect" label="重定向" width="200">
          <template slot-scope="scope">
            {{ scope.row.redirect ? scope.row.redirect : "否" }}
          </template>
        </el-table-column>
        <el-table-column label="页面权限列表" width="250">
          <template slot-scope="scope">
            <span
              v-for="(item, index) in scope.row.oplist"
              :key="index"
              class="tags"
            >
              {{ item.power }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="180">
          <!-- <template slot-scope="scope" v-if="scope.row.children">
            <el-button type="text" size="small">查看</el-button>
          </template> -->
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editRouter(scope.row, 'edit')"
              >编辑</el-button
            >
            <el-button type="text" size="small">删除</el-button>
            <el-button
              v-if="scope.row.children"
              type="text"
              size="small"
              @click="editRouter(scope.row, 'add')"
              >新增子路由</el-button
            >
            <!-- <el-button type="text" size="small">查看</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="poptype == 'edit' ? '编辑菜单' : '新增菜单'"
      :visible.sync="dialogVisible"
      width="50%"
      top="5vh"
    >
      <el-form :model="editRouterData">
        <el-form-item label="路径path：" class="inline-block">
          <el-input v-model="editRouterData.path"></el-input>
        </el-form-item>
        <el-form-item label="路由name：" class="inline-block">
          <el-input v-model="editRouterData.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称：" class="inline-block">
          <el-input v-model="editRouterData.meta.title"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标：" class="inline-block">
          <span :class="editRouterData.meta.icon"></span>
          <el-input v-model="editRouterData.meta.icon"></el-input>
        </el-form-item>
        <el-form-item label="重定向：" class="inline-block">
          <el-input v-model="editRouterData.redirect"></el-input>
        </el-form-item>
        <el-form-item label="显示Tags标签" prop="delivery">
          <el-switch v-model="editRouterData.meta.showTag"></el-switch>
        </el-form-item>
        <el-form-item label="可删除Tags" prop="delivery">
          <el-switch v-model="editRouterData.meta.canDelete"></el-switch>
        </el-form-item>
        <el-form-item label="页面权限" prop="delivery">
          <el-button
            size="mini"
            type="primary"
            @click="addOpList"
            v-if="!editRouterData.children"
            >新增功能权限</el-button
          >
          <el-table
            :data="editRouterData.oplist"
            height="250"
            border
            style="width: 100%"
          >
            <el-table-column type="index" width="50" label="序号">
            </el-table-column>
            <el-table-column prop="power" label="权限">
              <template slot-scope="scope">
                <el-input v-model="scope.row.power"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="权限名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="edituser" label="修改人"> </el-table-column>
            <el-table-column prop="edittime" label="修改时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleOplist(scope.$index)"
                  >删 除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-switch v-model="editRouterData.oplist"></el-switch> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewSubRouter">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerId: null,
      poptype: "edit",
      editRouterData: { meta: {} },
      edutRouterFather: {},
      dialogVisible: false,
      selectOptions: 1,
      options: [
        { systemId: 1, title: "博客后台管理系统" },
        { systemId: 2, title: "微前端导航" },
      ],
      tableData: [
        {
          path: "/document",
          name: "document",
          redirect: "/document/manageDoc",
          meta: { title: "文件管理", icon: "el-icon-folder" },
          children: [
            {
              path: "/document/manageDoc",
              name: "manage",
              meta: { title: "管理文档", canDelete: true, showTag: true },
              oplist: [
                {
                  power: "searchlist",
                  name: "搜索列表",
                  edituser: "超级管理员",
                  edittime: "2022-1-28",
                },
                {
                  power: "submit",
                  name: "提交表单",
                  edituser: "超级管理员",
                  edittime: "2022-1-28",
                },
                {
                  power: "submit",
                  name: "提交表单",
                  edituser: "超级管理员",
                  edittime: "2022-1-28",
                },
                {
                  power: "submit",
                  name: "提交表单",
                  edituser: "超级管理员",
                  edittime: "2022-1-28",
                },
                {
                  power: "submit",
                  name: "提交表单",
                  edituser: "超级管理员",
                  edittime: "2022-1-28",
                },
              ],
            },
            {
              path: "/document/addDoc",
              name: "addDoc",
              meta: { title: "新增文档", canDelete: true, showTag: true },
            },
          ],
        },
        {
          path: "/messageboard",
          name: "messageboard",
          redirect: "/messageboard/manageMsg",
          meta: { title: "留言板", icon: "el-icon-document" },
          children: [
            {
              path: "/messageboard/manageMsg",
              name: "manageMsg",
              meta: { title: "留言板管理", canDelete: true, showTag: true },
            },
          ],
        },
        {
          path: "/project",
          name: "project",
          redirect: "/project/projectshow",
          meta: { title: "项目管理", icon: "el-icon-document" },
          children: [
            {
              path: "/project/projectshow",
              name: "projectshow",
              meta: { title: "项目展示", canDelete: true, showTag: true },
            },
            {
              path: "/project/projectcontrol",
              name: "projectcontrol",
              meta: { title: "项目管理", canDelete: true, showTag: true },
            },
          ],
        },
        {
          path: "/power",
          name: "power",
          redirect: "/power/powerrole",
          meta: { title: "权限管理", icon: "el-icon-document" },
          children: [
            {
              path: "/power/powerrole",
              name: "powerrole",
              meta: { title: "账号管理", canDelete: true, showTag: true },
            },
            {
              path: "/power/powerrole/details",
              name: "powerrole/details",
              meta: { title: "权限详情", canDelete: true, showTag: false },
            },
            {
              path: "/power/powerpage",
              name: "powerpage",
              meta: { title: "角色管理", canDelete: true, showTag: true },
            },
            {
              path: "/power/powerrouter",
              name: "powerrouter",
              meta: { title: "路由管理", canDelete: true, showTag: true },
            },
          ],
        },
        {
          path: "/configuration",
          name: "configuration",
          redirect: "/configuration/userconfig",
          meta: { title: "配置", icon: "el-icon-document" },
          children: [
            {
              path: "/configuration/userconfig",
              name: "userconfig",
              meta: { title: "个人中心", canDelete: true, showTag: true },
            },
          ],
        },
        {
          path: "/components",
          name: "components",
          redirect: "/components/drag",
          meta: { title: "组件", icon: "el-icon-document" },
          children: [
            {
              path: "/components/drag",
              name: "drag",
              meta: { title: "自由拖拽", canDelete: true, showTag: true },
            },
            {
              path: "/components/timeline",
              name: "timeline",
              meta: { title: "自定义时间线", canDelete: true, showTag: true },
            },
            {
              path: "/components/todolist",
              name: "todolist",
              meta: { title: "待办清单", canDelete: true, showTag: true },
            },
            {
              path: "/components/workwave",
              name: "workwave",
              meta: { title: "待办清单", canDelete: true, showTag: true },
            },
          ],
        },
      ],
    };
  },
  methods: {
    sonoftree({ row }) {
      return row.children ? "" : "son-of-tree"; // 给子树加类名
    },
    editRouter(item, type) {
      this.poptype = type;
      this.dialogVisible = !this.dialogVisible;
      if (this.poptype == "edit") {
        this.editRouterData = item;
      } else {
        // 此处应该发送数据给后台，后台去添加。因为没做后台暂时前端模拟
        this.editRouterData = { meta: {} };
        this.edutRouterFather = item.path;
      }
    },
    addOpList() {
      let opt = {
        power: "",
        name: "",
        edituser: "",
        edittime: "",
      };
      if (this.editRouterData.oplist) {
        this.editRouterData.oplist.unshift(opt);
      } else {
        // this.editRouterData.oplist = [{ opt }];
        this.$set(this.editRouterData, "oplist", [{ opt }]);
      }
    },
    deleOplist(item) {
      this.editRouterData.oplist.splice(item, 1);
    },
    addNewSubRouter() {
      this.dialogVisible = false;
      if (this.poptype === "add") {
        this.tableData.some((item) => {
          if (this.edutRouterFather == item.path) {
            if (item.children) {
              item.children.push(this.editRouterData);
            } else {
              item.children = [this.editRouterData];
            }
            return;
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.power-router {
  padding: 30px 45px 20px 50px;
  ::v-deep.son-of-tree {
    background-color: rgb(250, 250, 250);
  }
}
.inline-block {
  display: inline-block;
  margin-right: 20px;
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
.oplist-item {
  width: 202px;
  margin: 10px 20px 0 0;
}
</style>
