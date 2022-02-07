<template>
  <div class="pop-change-roles">
    <el-dialog
      title="角色授权"
      :visible.sync="dialogTableVisible"
      center
      width="65%"
    >
      <div class="roles-container">
        <div class="title" style="display: flex; margin-bottom: 20px">
          <p class="label">角色：</p>
          {{ roleData.rolesname }}
          <small>
            两种方法：1.两次获取，第一次获取全部的菜单，第二次获取选中的。2.一次获取，给菜单添加一个标记;组件内部只去请求所有的菜单数据，外面的点击只是用于传递id和数据，点击授权向父级发出一个时间，里面携带参数请求接口
          </small>
        </div>
        <div
          class="roles-tree"
          style="display: flex; margin-bottom: 20px"
          v-loading="loading"
        >
          <div class="op-container" style="display: flex; flex: 1">
            <div class="label">授权功能：</div>
            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps"
              class="tree"
              ref="optree"
            >
            </el-tree>
          </div>
          <div class="router-container" style="display: flex; flex: 1">
            <div class="label">授权菜单：</div>
            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps"
              style="flex: 1"
              ref="routertree"
              class="tree"
            >
            </el-tree>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">授 权</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    rolesId: {
      type: Number,
    },
    showControl: {
      type: Boolean,
      default: false,
    },
    roleData: {
      type: Object,
    },
    checkNodes: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      data: [],
      tempdata: [
        {
          id: 1,
          label: "后台管理系统",
          children: [
            {
              id: 3,
              label: "文件管理",
              children: [
                {
                  id: 7,
                  label: "管理文档",
                  children: [
                    {
                      id: 10,
                      label: "删除文档",
                    },
                  ],
                },
                {
                  id: 8,
                  label: "新增文档",
                },
              ],
            },
            {
              id: 4,
              label: "留言板",
              children: [
                {
                  id: 9,
                  label: "留言板管理",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "主页导航系统",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
      ],
      dialogTableVisible: false,
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    submit() {
      console.log(this.$refs.optree.getCheckedKeys(true));

      this.dialogTableVisible = false;
      this.$emit("setRoles", {
        oplist: this.$refs.optree.getCheckedKeys(true),
        menulist: [
          ...this.$refs.routertree.getCheckedKeys(),
          ...this.$refs.routertree.getHalfCheckedKeys(),
        ],
      });
    },
    getOpAndMenuList() {
      this.loading = true;
      setTimeout(() => {
        this.data = this.tempdata;
        this.loading = false;
      }, 1500);
    },
  },
  watch: {
    showControl: {
      handler(val) {
        this.dialogTableVisible = val;
      },
    },
    dialogTableVisible: {
      handler(val) {
        if (val) {
          console.log("open");
        }
        this.$emit("update:showControl", val);
      },
    },
    rolesId: {
      handler(val) {
        console.log(val);
        if (val) {
          console.log(val);
          this.data = [];
          this.getOpAndMenuList();
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  width: 80px;
  text-align: right;
}
.tree {
  flex: 1;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
}
</style>
