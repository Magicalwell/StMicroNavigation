<template>
  <div class="power-role">
    <h3
      style="
        line-height: 1.5;
        border-bottom: 2px solid #000;
        margin-bottom: 30px;
      "
    >
      账号管理
    </h3>
    <div class="doc-searchOption">
      <div class="inline-block">
        <label for class="search-label">id：</label>
        <el-input placeholder="id" v-model="searchOptions.id"></el-input>
      </div>
      <div class="inline-block">
        <label for class="search-label">手机号：</label>
        <el-input
          placeholder="请输入用户手机号"
          v-model="searchOptions.nickname"
        ></el-input>
      </div>
      <div class="inline-block">
        <label for class="search-label">使用人姓名：</label>
        <el-input
          placeholder="请输入使用人姓名"
          v-model="searchOptions.account"
        ></el-input>
      </div>
      <div>
        <div class="inline-block">
          <label for class="search-label">注册ip：</label>
          <el-input
            placeholder="支持模糊搜索哦"
            v-model="searchOptions.text"
          ></el-input>
        </div>
        <div class="inline-block">
          <label for class="search-label">最后修改人：</label>
          <el-input
            placeholder="支持模糊搜索哦"
            v-model="searchOptions.text"
          ></el-input>
        </div>
        <div class="inline-block">
          <label for class="search-label">角色：</label>
          <el-input
            placeholder="支持模糊搜索哦"
            v-model="searchOptions.text"
          ></el-input>
        </div>
        <div class="inline-block">
          <label for class="search-label">状态：</label>
          <el-input
            placeholder="支持模糊搜索哦"
            v-model="searchOptions.text"
          ></el-input>
        </div>
        <div class="inline-block">
          <label for class="search-label">留言时间：</label>
          <el-date-picker
            v-model="searchOptions.time"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="control-btn">
      <el-button-group>
        <el-button type="primary" icon="el-icon-search"></el-button>
        <el-button type="primary" icon="el-icon-refresh-right"></el-button>
      </el-button-group>
      <el-button type="primary" style="margin-left: 10px"> 新增 </el-button>
    </div>
    <div class="container">
      <el-table :data="tableData" style="width: 100%" stripe max-height="850">
        <!-- 序号 手机号 使用人姓名 使用人部门 最后修改人 修改时间 状态 -->
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="id" label="账号id" width="100">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="150">
        </el-table-column>
        <el-table-column prop="nickname" label="使用人姓名" width="150">
        </el-table-column>
        <el-table-column prop="registerip" label="注册ip" width="200">
        </el-table-column>
        <el-table-column prop="lastmodefined" label="最后修改人" width="250">
        </el-table-column>
        <el-table-column prop="changetime" label="修改时间" width="250">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
        </el-table-column>
        <el-table-column prop="roles" label="角色" width="300">
          <template slot-scope="scope">
            <span
              v-for="(item, index) in scope.row.roles"
              :key="index"
              class="roles-item"
              @click="showRoleControl(item)"
            >
              {{ item.rolesname }}
            </span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <!-- <template slot-scope="scope"> -->
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="rolesDetails('details', scope.row)"
              >查看</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="rolesDetails('edit', scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="checkStatus(scope.row)"
              >控制</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <change-Role
      :showControl.sync="dialogVisible"
      :roleData="roleData"
      :rolesId="openRoleId"
    ></change-Role>
    <el-dialog
      title="账户状态控制"
      :visible.sync="statusDialogVisible"
      width="20%"
      :close-on-click-modal="true"
    >
      <div>
        <div style="margin-bottom: 20px">当前状态：{{ roleData.status }}</div>
        <el-select v-model="newStatus" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in $store.state.selectOptions.accountStatus"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="statusDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeStatus">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import changeRole from "./components/changerole.vue";
export default {
  data() {
    return {
      openRoleId: null,
      dialogVisible: false,
      statusDialogVisible: false,
      tableData: [
        {
          id: 1,
          phone: 17712121212,
          nickname: "三石啊",
          registerip: "127.0.0.1",
          lastmodefined: "三石啊",
          changetime: "2022-2-26",
          status: 0,
          roles: [{ id: 1, rolesname: "超级管理员" }],
        },
        {
          id: 2,
          phone: 17712121212,
          nickname: "三石啊2222",
          registerip: "127.0.0.222",
          lastmodefined: "三石啊",
          changetime: "2022-2-26",
          status: 0,
          roles: [{ id: 2, rolesname: "默认角色" }],
        },
      ],
      searchOptions: {},
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      roleData: {},
      newStatus: null,
    };
  },
  methods: {
    showRoleControl(item) {
      this.roleData = item;
      this.openRoleId = item.id;
      this.dialogVisible = !this.dialogVisible;
    },
    rolesDetails(type, data) {
      const {
        id,
        phone,
        nickname,
        status,
        roles,
        registerip,
        lastmodefined,
        changetime,
      } = data;
      this.$router.push({
        path: "/power/powerrole/details",
        query: {
          type,
          id,
          phone,
          nickname,
          status,
          roles,
          registerip,
          lastmodefined,
          changetime,
        },
      });
    },
    checkStatus(item) {
      this.roleData = item;
      // this.openRoleId = item.id;
      this.statusDialogVisible = !this.statusDialogVisible;
    },
    changeStatus() {
      this.statusDialogVisible = false;
      if (this.newStatus && this.newStatus != this.roleData.status) {
        console.log("发送请求更改状态，返回成功则弹出窗口");
        this.roleData.status = this.newStatus;
      }
    },
  },
  computed: {},
  components: {
    changeRole,
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
.control-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 20px 0;
}
.power-role {
  padding: 30px 45px 30px 50px;
}
.roles-item {
  cursor: pointer;
  text-decoration: underline;
  color: #409eff;
}
</style>
