<template>
  <div class="doc-container">
    <h3 style="line-height: 1.5; border-bottom: 2px solid #000">管理文章</h3>
    <div class="doc-searchOption">
      <div class="inline-block">
        <label for class="search-label">文章id：</label>
        <el-input placeholder="id"></el-input>
      </div>
      <div class="inline-block">
        <label for class="search-label">文章标题：</label>
        <el-input placeholder="请输入文章标题"></el-input>
      </div>
      <div class="inline-block">
        <label for class="search-label">作者：</label>
        <el-input placeholder="请输入作者"></el-input>
      </div>
      <div class="inline-block">
        <label for class="search-label">文章类型：</label>
        <el-select
          v-model="searchOptions.searchType"
          placeholder="请选择文章类型："
        >
          <el-option
            v-for="item in selectOptions.articletTitle"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="inline-block">
        <label for class="search-label">文章标签：</label>
        <el-input placeholder="请输入文章标签"></el-input>
      </div>
      <div style="margin-bottom: 20px">
        <div class="inline-block">
          <label for class="search-label">创建时间：</label>
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
        <div class="inline-block">
          <label for class="search-label">修改时间：</label>
          <el-date-picker
            v-model="searchOptions.edittime"
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
        <el-button type="primary" style="margin-left: 10px"> 新增 </el-button>
      </div>
    </div>
    <div class="doc-list">
      <el-table :data="tableData" style="width: 100%" stripe max-height="850">
        <el-table-column type="index" label="序号" width="70">
        </el-table-column>
        <el-table-column prop="id" label="id" width="100"> </el-table-column>
        <el-table-column prop="title" label="文章标题"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column prop="editTime" label="编辑时间"> </el-table-column>
        <el-table-column prop="docTags" label="文章标签"> </el-table-column>
        <el-table-column prop="author" label="作者" width="200">
        </el-table-column>
        <el-table-column prop="docType" label="文章类型" width="100">
        </el-table-column>
        <el-table-column prop="docMsg" label="留言数量" width="100">
        </el-table-column>
        <el-table-column prop="docAgree" label="点赞数量" width="100">
        </el-table-column>
        <el-table-column prop="docOppose" label="反对数量" width="100">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [
        {
          id: 10001,
          title: "测试回显",
          createTime: "2022-01-20",
          editTime: "2022-01-20",
          author: "三石",
          docType: "3",
        },
        {
          id: 10002,
          title: "测试回显2",
          createTime: "2022-01-20",
          editTime: "2022-01-20",
          author: "三石",
          docType: "4",
          docTags: ["2", "3"],
        },
        {
          id: 10002,
          title: "测试回显2",
          createTime: "2022-01-20",
          editTime: "2022-01-20",
          author: "三石",
          docType: "4",
          docTags: ["2", "3"],
        },
        {
          id: 10002,
          title: "测试回显2",
          createTime: "2022-01-20",
          editTime: "2022-01-20",
          author: "三石",
          docType: "4",
          docTags: ["2", "3"],
        },
        {
          id: 10002,
          title: "测试回显2",
          createTime: "2022-01-20",
          editTime: "2022-01-20",
          author: "三石",
          docType: "4",
          docTags: ["2", "3"],
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
  computed: {
    ...mapState(["selectOptions"]),
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
.doc-container {
  padding: 30px 45px 20px 50px;
}
.doc-list {
  margin: 30px 0;
}
.search-btn {
  align-items: center;
  justify-content: flex-end;
  display: flex;
}
</style>
