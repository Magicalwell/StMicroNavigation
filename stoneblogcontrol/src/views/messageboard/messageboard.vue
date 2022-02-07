<template>
  <div class="messageboard-container">
    <h3 style="line-height: 1.5; border-bottom: 2px solid #000">留言板管理</h3>
    <div class="doc-searchOption">
      <div class="inline-block">
        <label for class="search-label">id：</label>
        <el-input placeholder="id" v-model="searchOptions.id"></el-input>
      </div>
      <div class="inline-block">
        <label for class="search-label">昵称：</label>
        <el-input
          placeholder="请输入留言用户昵称"
          v-model="searchOptions.nickname"
        ></el-input>
      </div>
      <div class="inline-block">
        <label for class="search-label">账号：</label>
        <el-input
          placeholder="请输入用户账号"
          v-model="searchOptions.account"
        ></el-input>
      </div>
      <div>
        <div class="inline-block">
          <label for class="search-label">留言内容：</label>
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
      <div class="search-btn">
        <el-button-group>
          <el-button
            type="primary"
            icon="el-icon-search"
            style="width: 100px"
          ></el-button>
          <el-button type="primary" icon="el-icon-refresh-right"></el-button>
        </el-button-group>
      </div>
    </div>
    <div class="doc-list">
      <el-table :data="tableData" style="width: 100%" stripe max-height="850">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="留言内容">
                <span>{{ scope.row.text }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="id" label="id" width="100"> </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120">
        </el-table-column>
        <el-table-column prop="account" label="账号" width="120">
        </el-table-column>
        <el-table-column prop="text" label="留言内容"> </el-table-column>
        <el-table-column prop="creattime" label="留言时间" width="200">
        </el-table-column>
        <el-table-column prop="agree" label="点赞数量" width="120">
        </el-table-column>
        <el-table-column prop="oppose" label="反对数量" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentpage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        style="text-align: right"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          nickname: "ddddwqeq",
          account: "812081428",
          text: "这波theshy来了全杀了",
          creattime: "2022-1-23",
          agree: 150,
          oppose: 0,
        },
        {
          id: 1,
          nickname: "ddddwqeq",
          account: "812081428",
          text: "这波theshy来了全杀了",
          creattime: "2022-1-23",
          agree: 150,
          oppose: 0,
        },
        {
          id: 1,
          nickname: "ddddwqeq",
          account: "812081428",
          text: "这波theshy来了全杀了",
          creattime: "2022-1-23",
          agree: 150,
          oppose: 0,
        },
        {
          id: 1,
          nickname: "ddddwqeq",
          account: "812081428",
          text: "这波theshy来了全杀了",
          creattime: "2022-1-23",
          agree: 150,
          oppose: 0,
        },
      ],
      currentpage: 1,
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
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>

<style lang="scss" scoped>
.search-label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 8px 0 0;
  box-sizing: border-box;
  min-width: 80px;
}
.messageboard-container {
  padding: 30px 45px 20px 50px;
  margin-bottom: 20px;
}
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
.doc-list {
  margin-bottom: 30px;
}
.search-btn {
  margin: 20px 0;
  align-items: center;
  justify-content: flex-end;
  display: flex;
}
</style>
