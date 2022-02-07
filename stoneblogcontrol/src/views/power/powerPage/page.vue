<template>
  <div class="power-page page-container">
    这里进行角色的控制，新增和编辑，以及对应路由、op的授权
    <h3
      style="
        line-height: 1.5;
        border-bottom: 2px solid #000;
        margin-bottom: 30px;
      "
    >
      角色管理
    </h3>
    <div class="search-input" style="margin-bottom: 30px">
      <div class="inline-block">
        <label for class="search-label">角色名称：</label>
        <el-input
          placeholder="角色名称"
          v-model="searchOptions.rolename"
        ></el-input>
      </div>
      <div class="inline-block">
        <label for class="search-label">角色描述：</label>
        <el-input
          placeholder="角色描述"
          v-model="searchOptions.describe"
        ></el-input>
      </div>
      <div class="inline-block">
        <el-button-group>
          <el-button
            type="primary"
            icon="el-icon-search"
            style="width: 80px"
          ></el-button>
          <el-button type="primary" icon="el-icon-refresh-left"></el-button>
          <el-button type="primary" style="margin-left: 20px">新 增</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="role-control">
      <el-table :data="tableData" max-height="550" style="width: 100%" stripe>
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="roleid" label="角色id"> </el-table-column>
        <el-table-column prop="rolesname" label="角色名称"> </el-table-column>
        <el-table-column prop="describe" label="角色描述"> </el-table-column>
        <el-table-column prop="lastedituser" label="最后修改人">
        </el-table-column>
        <el-table-column prop="lastedittime" label="修改时间">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)"
              >修改</el-button
            >
            <el-button type="text" size="small">删除</el-button>
            <el-button
              type="text"
              size="small"
              @click="showRoleControl(scope.row)"
              >权限管理</el-button
            >
            <el-button type="text" size="small" @click="link(scope.row)"
              >关联账号</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <change-Role
      ref="changerole"
      :showControl.sync="dialogVisible"
      :roleData="roleData"
      :rolesId="openRoleId"
      @setRoles="updateRoles"
    ></change-Role>
    <el-dialog
      title="修改角色信息"
      :visible.sync="editdialogVisible"
      width="30%"
    >
      <el-form :model="roleData">
        <el-form-item label="角色名称：" class="block">
          <el-input v-model="roleData.rolesname"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：" class="block">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="roleData.describe"
            maxlength="4  0"
            show-word-limit
            >></el-input
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editdialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="关联账户" :visible.sync="linkdialogVisible" width="50%">
      <el-table :data="linkData" style="width: 100%">
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="nickname" label="使用人姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="lastmodefined" label="修改人"></el-table-column>
        <el-table-column prop="changetime" label="修改时间"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="linkdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="linkdialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import changeRole from "../powerRole/components/changerole.vue";
export default {
  data() {
    return {
      linkdialogVisible: false,
      editdialogVisible: false, // 两个弹框都应去请求接口，目前暂时用传递数据代替
      dialogVisible: false,
      tableData: [
        {
          roleid: 1,
          rolesname: "超级管理员",
          describe: "超级管理员是什么我不用说了吧",
          lastedituser: "无",
          lastedittime: "2020-1-27",
        },
        {
          roleid: 2,
          rolesname: "默认角色",
          describe: "默认角色是什么我不用说了吧",
          lastedituser: "无",
          lastedittime: "2020-1-27",
        },
      ],
      searchOptions: {},
      roleData: {},
      linkData: [
        {
          id: 1,
          phone: "123513213",
          nickname: "三十",
          lastmodefined: "三十",
          changetime: "2022-1-27",
        },
      ],
      openRoleId: null,
    };
  },
  methods: {
    showRoleControl(item) {
      this.roleData = item;
      this.openRoleId = item.roleid;
      this.dialogVisible = !this.dialogVisible;
    },
    edit(item) {
      this.roleData = item;
      this.openRoleId = item.id;
      this.editdialogVisible = !this.editdialogVisible;
    },
    link(item) {
      this.linkdialogVisible = !this.linkdialogVisible;
      console.log(item);
    },
    updateRoles(val) {
      console.log(val);
    },
  },
  components: {
    changeRole,
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin: 30px 0 0 0;
  ::v-deep.el-form-item__content {
    display: flex;
    .el-input {
      flex: 1;
    }
  }
}
</style>
