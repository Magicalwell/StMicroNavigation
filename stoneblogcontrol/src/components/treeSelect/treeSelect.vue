<template>
    <div class="mechanism">
        <div class="rowDiv">
            <div class="leftDiv" v-if="detailType != 'details'">
                <div class="leftTitle">
                    <span class="circle"></span>
                    <span>{{ detailType == 'edit' ? '请选择项目角色：' : '请选择项目人员：' }}</span>
                </div>
                <div class="leftBody" :class="{ leftShow: detailType != 'add' }">
                    <el-row :gutter="10" style="margin-top: 10px; margin-bottom: 20px" v-if="detailType == 'add'">
                        <el-col :span="12" class="search-box">
                            <el-select
                                v-model="searchOptions.empName"
                                filterable
                                value-key="name"
                                clearable
                                remote
                                placeholder="请输入名字"
                                :popper-append-to-body="false"
                                :remote-method="remoteMethod"
                                :loading="loading"
                                style="width: 100%"
                                @change="chooseEmp"
                                class="emp-select"
                                no-data-text="没有匹配到任何结果"
                                ref="namesearch"
                                @hook:mounted="closeNameReadOnly"
                                @visible-change="closeNameReadOnly"
                            >
                                <el-option v-for="item in peopleList" :key="item.id" :label="item.name" :value="item">
                                    <div>
                                        <p style="font-size: 16px; height: 16px; line-height: 16px">{{ item.name }}</p>
                                        <small style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: PingFangSC-Regular, PingFang SC">
                                            {{ item.position }}
                                        </small>
                                    </div>
                                    <!-- <span style="float: left"></span>
                                    <span style="float: right; color: #8492a6; font-size: 13px"></span> -->
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="12">
                            <el-select
                                v-model="searchOptions.deptName"
                                filterable
                                clearable
                                value-key="name"
                                remote
                                placeholder="请输入部门"
                                :popper-append-to-body="false"
                                :remote-method="remoteMethodDep"
                                :loading="loading"
                                style="width: 100%"
                                @change="chooseDep"
                                class="dep-select"
                                no-data-text="没有匹配到任何结果"
                                ref="deptsearch"
                                @hook:mounted="closeDepReadOnly"
                                @visible-change="closeDepReadOnly"
                            >
                                <el-option v-for="item in depmentList" :key="item.id" :label="item.name" :value="item">
                                    <!-- <span style="float: left">{{ item.name }}</span> -->
                                    <span style="float: left" v-html="changeColor(item.name)"></span>
                                </el-option>
                            </el-select>
                        </el-col>
                        <!-- 原型图更新后不需要查询按钮 -->
                        <!-- <el-col :span="4">
                            <ws-enter-event>
                                <el-button style="width: 100%; text-align: center; padding: 12px 8px; overflow: hidden" @click="search">查询</el-button>
                            </ws-enter-event>
                        </el-col> -->
                    </el-row>
                    <div align="left">
                        <div class="breadcrumb" v-if="breadcrumbList.length">
                            <i @click="backToLevel" class="el-icon-arrow-left"></i>
                            <el-breadcrumb separator="/">
                                <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.id" @click.native="breadJump(item)">{{ item.label }}</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                        <el-checkbox
                            class="checkboxAll"
                            :indeterminate="isIndeterminate"
                            v-if="isCheckAllVisiable && detailType != 'edit'"
                            v-model="isCheckAll"
                            @change="funcRoleCheckAll"
                            :disabled="isDisabled"
                        >
                            全选
                        </el-checkbox>
                    </div>
                    <el-tree
                        show-checkbox
                        icon-class="el-icon-arrow-right"
                        node-key="id"
                        @check-change="checkChange"
                        @node-click="handleNodeClick"
                        @node-expand="handeleNodeExpend"
                        :expand-on-click-node="expandOnClickNode"
                        :default-checked-keys="funcDefaultKeys"
                        class="filter-tree"
                        :style="{ height: breadcrumbList.length ? (isCheckAllVisiable ? 'calc(100% - 100px)' : 'calc(100% - 75px)') : 'calc(100% - 50px)', paddingBottom: '20px' }"
                        v-loading="treeLoading"
                        :data="treeData"
                        :props="funcRoleProps"
                        :default-expand-all="false"
                        :lazy="true"
                        :load="loadNode"
                        ref="personTree"
                    >
                        <span class="custom-tree-node" slot-scope="{ data }">
                            <span class="elseSpan" v-if="!data.leaf">{{ data.name }}{{ data.leaf ? '' : `(${data.depCount || 0})人` }}</span>
                            <span v-else class="bigSpan">{{ data.name }}</span>
                        </span>
                    </el-tree>
                </div>
            </div>
            <div class="gap" v-if="detailType != 'details'"></div>
            <div class="rightDiv" :style="{ display: detailType == 'details' ? 'flex' : '' }">
                <label for="" style="width: 98px" v-if="detailType == 'details'">已选角色：</label>
                <div class="rightTitle" v-else>
                    <span class="circle"></span>
                    <span>已选：</span>
                    <span v-if="maxCount < Number.MAX_SAFE_INTEGER">{{ '(' + checkedNodeList.length + '/' + maxCount + ')' }}</span>
                    <span v-else>{{ '(' + checkedNodeList.length + '人' + ')' }}</span>
                </div>
                <div class="cardDiv">
                    <div v-if="detailType != 'details'">
                        <el-card shadow="never" v-for="(item, index) in checkedNodeList" :key="item.id">
                            <div class="content">
                                <span>{{ item.roleName ? item.roleName : item.name }}</span>
                                <i class="el-icon-circle-close" @click="removeCheckedNode(item, index)" v-if="detailType != 'details'"></i>
                            </div>
                        </el-card>
                    </div>
                    <div v-else>
                        <el-tag
                            v-for="(item, index) in checkedNodeList"
                            :key="item.id"
                            :closable="detailType != 'details'"
                            type="info"
                            @close="removeCheckedNode(item, index)"
                            class="role-details-tag"
                        >
                            {{ item.roleName ? item.roleName : item.name }}
                        </el-tag>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'treeSelect',
    props: {
        funcDefaultNode: {
            type: Array,
            default: () => {
                return [];
            }
        },
        rolesArr: {
            type: Array,
            default: () => {
                return [];
            }
        },
        isDisabled: { default: false },
        title: { type: String, default: '指定成员' },
        expandOnClickNode: { type: Boolean, default: false },
        moduleName: { type: String, default: '/peopleManagement' },
        listModuleName: { type: String, default: '/peopleManagement' },
        opObj: {
            type: Object,
            default: () => {
                return {
                    selectTree: 'organization', //查询树数据
                    selectList: 'listByFuzzyName', //模糊查询列表
                    deleteRole: 'getDelJudge'
                };
            }
        },
        funcRoleProps: {
            type: Object,
            default: () => {
                return {
                    label: 'name',
                    value: 'id',
                    children: 'children',
                    disabled: (data, node) => data.depType || data.roleStatus == 1,
                    isLeaf: (data, node) => !data.depType
                };
            }
        },
        maxCount: { type: Number, default: 50 },
        detailType: {
            type: String
        },
        detailId: {}
    },
    data() {
        return {
            breadcrumbList: [],
            searchOptions: {
                empName: '',
                deptName: ''
            },
            peopleList: [],
            depmentList: [],
            searchVal: '', // tree搜索
            treeData: [], // tree 数据
            treeLoading: false, // 功能授权loading
            isCheckAll: false,
            isCheckAllVisiable: false,
            isIndeterminate: false, // 全选的半选状态值
            checkedNodeList: [],
            children: [], //一级树数据
            funcDefaultKeys: [], //默认选中的树节点
            rolesList: [],
            loading: false,
            queryData: ''
        };
    },
    mounted() {
        // const selectDep = this.$refs.deptsearch;
        // const selectName = this.$refs.namesearch;
        // const inputName = selectName.$el.querySelector('.el-input__inner');
        // const inputDep = selectDep.$el.querySelector('.el-input__inner');
        // inputDep.removeAttribute('readonly');
        // inputName.removeAttribute('readonly');
    },
    watch: {
        funcDefaultNode: {
            handler(val, oldval) {
                if (this.detailType == 'details') {
                    this.checkedNodeList = val;
                } else {
                    this.setTreeDataFlag(this.treeData, val);
                    this.setDefaultCheckedNodeList(val);
                }
                // 这个地方由于详情里面获取数据的请求是在motuned阶段发送的，一定会比这个组件周期晚
            }
        },
        checkedNodeList: {
            handler(val, oldval) {
                let oldCheckedKeys = val.map(item => {
                    return item.id;
                });
                if (this.$refs.personTree) {
                    this.$refs.personTree.setCheckedKeys(oldCheckedKeys, false);
                }
                this.setIsIndeterminate();
                // }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        closeNameReadOnly(val) {
            this.$nextTick(() => {
                if (!val) {
                    const input = this.$refs.namesearch.$el.querySelector('.el-input__inner');
                    const timer = setTimeout(() => {
                        input.removeAttribute('readonly');
                        clearTimeout(timer);
                    }, 200);
                }
            });
        },
        closeDepReadOnly(val) {
            console.log(9999);
            this.$nextTick(() => {
                if (!val) {
                    const input = this.$refs.deptsearch.$el.querySelector('.el-input__inner');
                    const timer = setTimeout(() => {
                        input.removeAttribute('readonly');
                        clearTimeout(timer);
                    }, 200);
                }
            });
        },
        setTreeDataFlag(origin, target) {
            const tagObj = {};
            for (const k of target) {
                tagObj[k.id] = 1;
            }
            for (const i of origin) {
                if (tagObj[i.id]) {
                    i.flag = true;
                }
            }
            // return result;
        },
        //设置右侧列表默认选择项目
        setDefaultCheckedNodeList(nodeData) {
            this.$nextTick(() => {
                this.funcDefaultKeys = nodeData.map(item => {
                    return item.id;
                });
                this.$refs.personTree.setCheckedKeys(this.funcDefaultKeys, false);

                this.checkedNodeList = this.$baseMethod.deepClone(nodeData);

                // 这个地方的nextTick会改变传入的props,因为传入的是引用
            });
        },
        querySearch(queryString, cb) {
            this.$axios('/project/personnel/employ/select', {
                op: this.opObj.selectTree,
                data: { empName: this.searchOptions.empName, deptName: this.searchOptions.deptName }
            }).then(res => {
                if (res.code == 1) {
                    console.log(JSON.parse(res.data));
                    cb(JSON.parse(res.data));
                }
            });
        },
        handleSelect(item) {
            this.searchVal = '';
            if (
                !this.checkedNodeList.find(d => {
                    return d.id === item.id;
                })
            ) {
                this.checkedNodeList.push(item);
                let oldCheckedKeys = this.checkedNodeList.map(item => {
                    return item.id;
                });
                if (this.$refs.personTree) {
                    this.$refs.personTree.setCheckedKeys(oldCheckedKeys, false);
                }
            }
        },

        getModuleUrl(op) {
            return this.$getModuleUrl(this.moduleName, op);
        },
        // 功能授权全选
        funcRoleCheckAll(val) {
            let leaftreeData = this.$refs.personTree.data.filter(item => item.leaf); // 只计算可被选择的叶子节点
            console.log(leaftreeData);
            if (val) {
                if (leaftreeData.length + this.checkedNodeList.length > this.maxCount) {
                    this.$message.warning(`最多只能选${this.maxCount}个人员！`);
                    this.isCheckAll = false;
                    return;
                } else {
                    if (this.treeData.length) {
                        this.treeData.map(item => {
                            if (
                                !this.checkedNodeList.find(item2 => {
                                    return item2.id == item.id;
                                }) &&
                                !item.depType
                            ) {
                                this.checkedNodeList.push(item);
                            }
                        });
                        this.$refs.personTree.setCheckedKeys(
                            this.checkedNodeList.map(item => {
                                return item.id;
                            }),
                            false
                        );
                    }
                }
            } else {
                const checkedTreeData = this.$refs.personTree.getCheckedKeys(true);
                if (checkedTreeData.length) {
                    //这里从this.treeData.length修改成上面提供的leaftreeData 为了避免过多删除
                    checkedTreeData.map((item, index) => {
                        // let findIndex = this.checkedNodeList.findIndex((item2) => {
                        //     item2.id == item
                        //     console.log(item2.id == item);
                        // })
                        // 上面没有返回index，导致一直从后往前删除
                        // if (findIndex) {
                        //     this.checkedNodeList.splice(findIndex, 1)
                        // }
                        let findIndex = this.checkedNodeList.findIndex(val => val.id == item);
                        if (findIndex !== -1) {
                            this.checkedNodeList.splice(findIndex, 1);
                        }
                    });
                    this.$refs.personTree.setCheckedKeys(
                        this.checkedNodeList.map(item => {
                            return item.id;
                        }),
                        false
                    );
                }
            }
        },
        // tree 懒加载
        async loadNode(node, resolve) {
            if (this.detailType == 'edit') {
                const param = {
                    data: { roleName: '' },
                    op: 'selectRoleOption'
                };
                this.$axios('/project/personnel/role/select', param).then(res => {
                    let rolesList = JSON.parse(res.data);
                    rolesList.forEach(item => {
                        item.name = item.roleName;
                        item.children = [];
                        item.leaf = !(item.depType && item.depType !== null);
                    });
                    this.isCheckAllVisiable =
                        rolesList.some(item => {
                            return item.leaf;
                        }) && rolesList.length;
                    this.treeData = rolesList;
                });

                // this.rolesList = this.rolesArr;
                // console.log(this.rolesList);
                // this.rolesList.forEach(item => {
                //     item.name = item.roleName;
                //     item.children = [];
                //     item.leaf = !(item.depType && item.depType !== null);
                // });
                // this.isCheckAllVisiable =
                //     this.rolesList.some(item => {
                //         return item.leaf;
                //     }) && this.rolesList.length;
                // this.treeData = this.rolesList;
            } else {
                if (node.level === 0) {
                    const arr = await this.getTreeData('0', '0');
                    let childrenData;
                    // 走二级菜单加载方法【原因：后端返回数据连同1/2级数据都返回，需要处理分段加载】
                    childrenData = this.children;
                    childrenData.forEach(item => (item.leaf = !(item.depType && item.depType !== null)));
                    resolve(arr);
                }
                if (node.level >= 1) {
                    const childreAarr = await this.getTreeData(node.data.id, node.level);
                    return resolve(childreAarr || []); // 加上这个，防止在该节点没有子节点时一直转圈的问题发生。
                }
            }
        },

        // 获取组织架构数据
        async getTreeData(id, type, searchdata) {
            try {
                this.treeLoading = true;
                const param = {
                    data: { deptId: id, ...searchdata },
                    op: this.opObj.selectTree
                };
                const url = '/project/personnel/employ/select';
                // url && type < 2;
                const res = await this.$axios(url, param);
                this.treeLoading = false;
                let list;
                if (res.code == 1) {
                    //  type === '0' && (this.treeNode.childNodes = []);
                    const result = JSON.parse(res.data);
                    console.log('laile');
                    console.log(result);
                    list = type === '0' ? this.firstTree(result) : this.childrenHandle(...result);
                    console.log(list);
                } else {
                    list = [];
                }
                return list;
            } catch (err) {
                this.treeLoading = false;
                return [];
            }
        },
        firstTree(list) {
            console.log(list);
            const data = list.map(item => {
                console.log(item);
                const { deptChild, empChild } = item;
                this.children = [...(deptChild || []), ...(empChild || [])];
                // 处理子数据，区分部门和员工
                console.log(this.children);
                this.children.forEach(item => (item.type = item.depType && item.depType !== null ? 'department' : 'staff'));
                return {
                    ...item,
                    banDelete: true,
                    type: 'department'
                };
            });
            this.isCheckAllVisiable = false;
            return this.children;
        },
        childrenHandle(data) {
            const { deptChild, empChild } = data;
            const childrenData = [...(deptChild || []), ...(empChild || [])];
            childrenData.forEach(item => {
                item.type = item.depType && item.depType !== null ? 'department' : 'staff';
                item.leaf = !(item.depType && item.depType !== null);
            });
            this.isCheckAllVisiable =
                childrenData.some(item => {
                    return item.leaf;
                }) && childrenData.length;
            return childrenData;
        },
        // childrenHandle(data) {
        //     const { departmentChildren, employVoChildren, employschildren } = data;
        //     const childrenData = [...(employVoChildren || []), ...(departmentChildren || []), ...(employschildren || [])];
        //     childrenData.forEach(item => {
        //         item.type = item.depType && item.depType !== null ? 'department' : 'staff';
        //         item.leaf = !(item.depType && item.depType !== null);
        //     });
        //     this.isCheckAllVisiable =
        //         childrenData.some(item => {
        //             return item.leaf;
        //         }) && childrenData.length;
        //     return childrenData;
        // },
        checkChange(data, a, b) {
            // let curentNode = this.$refs.personTree.getNode(data.id);
            console.log(data, a, b);
            if (a) {
                if (1 + this.checkedNodeList.length > this.maxCount) {
                    this.$message.warning(`最多只能选${this.maxCount}个人员！`);
                    this.$refs.personTree.setCheckedKeys(
                        this.checkedNodeList.map(item => {
                            return item.id;
                        }),
                        false
                    );
                    return;
                } else {
                    if (
                        !this.checkedNodeList.find((item, index) => {
                            return item.id === data.id;
                        })
                    ) {
                        this.checkedNodeList.push(data);
                    }
                }
            } else {
                // this.removeCheckedNode(data);
                // console.log(data);
                console.log(data);
                if (data.flag) {
                    this.$axios('/project/personnel/employ/select', { data: { empId: this.detailId, roleId: data.id }, op: 'getDelJudge' }).then(res => {
                        if (res.code !== 1) {
                            this.$refs.personTree.setCheckedKeys(
                                this.checkedNodeList.map(item => {
                                    return item.id;
                                }),
                                true
                            );
                            return this.$message.error('产品代表角色已被工作流配置，且该人员是产品代表中最后一人，故不能删除！');
                        }
                        let keyIndex = this.checkedNodeList.findIndex(items => items.id === data.id);
                        if (keyIndex >= 0) {
                            this.checkedNodeList.splice(keyIndex, 1);
                        }
                    });
                } else {
                    let keyIndex = this.checkedNodeList.findIndex(items => items.id === data.id);
                    if (keyIndex >= 0) {
                        this.checkedNodeList.splice(keyIndex, 1);
                    }
                }
            }
        },
        //设置权限框的状态
        setIsIndeterminate() {
            //  let treeSelectedNode = this.$refs.personTree.getCheckedKeys(true)
            if (!this.checkedNodeList.length || !this.$refs.personTree) {
                this.isCheckAll = false;
                this.isIndeterminate = false;
                return;
            }
            // let treeData = this.$refs.personTree.data.map((item) => {
            //     return item.id
            // })
            let treeData = this.$refs.personTree.data.filter(item => item.leaf);
            treeData = treeData.map(item => {
                return item.id;
            });
            let isAllExit = treeData.every(item => {
                return (
                    this.checkedNodeList.findIndex(item2 => {
                        return item2.id == item;
                    }) >= 0
                );
            });
            let isSomeExit = treeData.some(item => {
                return (
                    this.checkedNodeList.findIndex(item2 => {
                        return item2.id == item;
                    }) >= 0
                );
            });
            if (isAllExit) {
                this.isCheckAll = true;
                this.isIndeterminate = false;
            } else if (isSomeExit && !isAllExit) {
                this.checkAll = false;
                this.isIndeterminate = true;
            } else if (!isSomeExit) {
                this.isCheckAll = false;
                this.isIndeterminate = false;
            }
        },
        handleNodeClick(data, node, nodeCom) {
            this.handeleNodeExpend(data, node, nodeCom);
        },
        async handeleNodeExpend(data, node, nodeCom) {
            let name = data.name ? data.name : '';
            let item = { id: node.data.id, label: name, level: node.level, data: node.data };
            if (!data.leaf) {
                if (
                    !this.breadcrumbList.find((item, index) => {
                        return item.id === data.id;
                    })
                ) {
                    this.breadcrumbList.push(item);
                }
                this.treeData = await this.getTreeData(data.id, node.level);
                console.log(this.treeData);
            }
            this.$nextTick(() => {
                this.setIsIndeterminate();
            });
        },
        async backToLevel() {
            this.breadcrumbList.splice(this.breadcrumbList.length - 1, 1);
            if (this.breadcrumbList.length > 0) {
                let item = this.breadcrumbList[this.breadcrumbList.length - 1];
                this.treeData = await this.getTreeData(item.id, item.level);
            } else {
                this.treeData = await this.getTreeData('0', '0');
            }
            let CheckedKeys = this.checkedNodeList.map(item => {
                return item.id;
            });
            this.$refs.personTree.setCheckedKeys(CheckedKeys, false);
            this.$nextTick(() => {
                this.setIsIndeterminate();
            });
        },
        removeCheckedNode(item, index) {
            if (!item.flag) {
                console.log(item);
                let keyIndex = this.checkedNodeList.findIndex(items => items.id === item.id);
                this.checkedNodeList.splice(keyIndex, 1);
                let CheckedKeys = this.checkedNodeList.map(item => {
                    return item.id;
                });
                this.$refs.personTree.setCheckedKeys(CheckedKeys, false);
            } else {
                this.$axios('/project/personnel/employ/select', { data: { empId: this.detailId, roleId: item.id }, op: 'getDelJudge' }).then(res => {
                    if (res.code != 1) return this.$message.error('产品代表角色已被工作流配置，且该人员是产品代表中最后一人，故不能删除！');
                    let keyIndex = this.checkedNodeList.findIndex(items => items.id === item.id);
                    this.checkedNodeList.splice(keyIndex, 1);

                    let CheckedKeys = this.checkedNodeList.map(item => {
                        return item.id;
                    });
                    this.$refs.personTree.setCheckedKeys(CheckedKeys, false);
                });
            }
        },
        remoteMethod(query) {
            this.queryData = query;
            let data = {
                data: JSON.stringify({ empName: query }),
                op: this.opObj.selectTree
            };
            // peopleList
            this.$axios('/project/personnel/employ/select', data).then(res => {
                const empList = JSON.parse(res.data);
                this.peopleList = empList[0].empChild;
            });
        },
        remoteMethodDep(query) {
            this.queryData = query;
            let data = {
                data: JSON.stringify({ deptName: query }),
                op: this.opObj.selectTree
            };
            this.$axios('/project/personnel/employ/select', data).then(res => {
                // depmentList
                const depList = JSON.parse(res.data);
                console.log(depList[0].deptChild);
                this.depmentList = depList[0].deptChild;
            });
        },
        changeColor(item) {
            let nt = '<span style="color:#0088FF">' + this.queryData + '</span>';
            return item.replace(this.queryData, nt);
        },
        chooseEmp(val) {
            console.log(val);
            if (!val) return;
            const items = { ...val, leaf: true, type: 'staff' };
            if (
                !this.checkedNodeList.find((item, index) => {
                    return item.id === items.id;
                })
            ) {
                this.checkedNodeList.push(items);
            }
        },
        async chooseDep(val) {
            console.log(val);
            if (val === '') {
                this.treeData = await this.getTreeData('0', '0');
                this.breadcrumbList = [];
            } else {
                let name = val.name ? val.name : '';
                let item = { id: val.id, label: name, level: 1, data: val };
                console.log(val.parentIds.replace(/\[|\]/g, '').split(',').reverse());
                console.log(this.breadcrumbList.map(item => item.id));
                this.breadcrumbList = [item];
                this.treeData = await this.getTreeData(item.id, item.level);
                this.$nextTick(() => {
                    this.setIsIndeterminate();
                });
            }
        },
        async breadJump(val) {
            let name = val.name ? val.name : '';
            let item = { id: val.id, label: name, level: 1, data: val };
            if (!val.leaf) {
                if (
                    !this.breadcrumbList.find((item, index) => {
                        return item.id === val.id;
                    })
                ) {
                    this.breadcrumbList.push(item);
                }
                this.treeData = await this.getTreeData(item.id, item.level);
            }
            this.$nextTick(() => {
                this.setIsIndeterminate();
            });
        },
        handleCancle() {
            this.$emit('update:dialogVisible', false);
            this.isDialogVisible = false;
        },
        handleCommit() {
            this.$emit('update:dialogVisible', false);
            this.$emit('checkedNodeChange', this.checkedNodeList);
            this.isDialogVisible = false;
        },
        handleClose(done) {
            this.$emit('update:dialogVisible', false);
        }
    },
    computed: {},
    created() {}
};
</script>

<style scoped lang="scss">
.mechanism {
    width: 100%;
    height: 500px;
    border-radius: 4px;
    // border: 1px solid #dcdfe6;
    margin-bottom: 45px;
    display: flex;
    flex-wrap: wrap;
    .emp-select {
        position: relative;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
        /deep/ .el-select-dropdown.el-popper {
            position: absolute !important;
            width: calc(200% + 10px);
        }
        /deep/ .el-select-dropdown__item {
            min-height: 34px;
            line-height: 1.5;
            padding: 14px 24px 14px 27px;
            // height: initial !important;
            height: 66px;
        }
        /deep/ .el-select-dropdown__empty {
            background: #f2f5fa;
        }
    }
    .dep-select {
        position: relative;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
        /deep/ .el-select-dropdown.el-popper {
            position: absolute !important;
            right: 0;
            left: initial !important;
            width: calc(200% + 10px);
            .popper__arrow {
                right: 35px;
                left: initial !important;
            }
        }
    }
    .rowDiv {
        height: 100%;
        background: white;
        display: flex;
        width: 100%;
        flex-direction: row;
        background: white;
        .leftTitle,
        .rightTitle {
            // font-family: Arial, Helvetica, sans-serif;
            font-weight: 500;
            font-size: 14px;
            display: flex;
            align-items: center;
            line-height: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            color: #303133;
            margin-bottom: 10px;
            /deep/ .el-scrollbar__view.el-select-dropdown__list {
                // background: #f2f5fa;
                padding: 0px 0 !important;
                background-color: #fff;
            }
            /deep/ .popper__arrow {
                &::after {
                    border-bottom-color: #f2f5fa;
                }
            }
        }
        .leftDiv {
            height: 100%;
            width: calc(50% - 10px);
            flex: 1;
            .leftBody {
                height: calc(100%);
                padding: 12px;
                border-radius: 8px;
                border: 1px solid #dcdfe6;
                overflow: hidden;
                /deep/ .el-scrollbar__view.el-select-dropdown__list {
                    // background: #f2f5fa;
                    padding: 0px 0 !important;
                    background-color: #fff;
                }
                &.leftShow {
                    height: 100% !important;
                }
                .checkboxAll {
                    padding-left: 5px;
                    margin: 10px 0 5px 0px;
                }
                .breadcrumb {
                    display: flex;
                    align-items: center;
                    height: fit-content;
                    margin: initial;
                    margin-top: 10px;
                    // background: #f0f0f0;
                    /deep/ .el-breadcrumb {
                        min-height: 28px;
                        height: initial;
                    }
                    .el-icon-arrow-left {
                        cursor: pointer;
                        font-size: 18px;
                        margin: 0 5px 0 0;
                        &:hover {
                            color: aqua;
                            transform: scale(1.1);
                        }
                    }
                    /deep/.el-breadcrumb__item {
                        // cursor:pointer
                        height: 28px;
                        line-height: 28px;
                        cursor: pointer;
                        .el-breadcrumb__inner {
                            font-size: 12px;
                            color: #303133;
                        }
                        .el-breadcrumb__separator {
                            color: #909399;
                            font-size: 12px;
                        }
                        &:last-child {
                            .el-breadcrumb__inner {
                                font-size: 12px;
                                font-weight: 400;
                                // color:aqua !important;
                                color: #999 !important;
                            }
                        }
                        &:hover {
                            .el-breadcrumb__inner {
                                // color:aqua !important;
                                color: #0088ff !important;
                            }
                        }
                    }
                }
                .filter-tree {
                    flex: 1;
                    width: 100%;
                    margin-top: 5px;
                    overflow: hidden auto;
                    /deep/ .el-tree-node {
                        padding-left: 5px;
                        .el-checkbox {
                            // &.is-disabled {
                            //     visibility: hidden;
                            // }
                            &.is-disabled {
                                visibility: visible;
                            }
                        }
                    }
                    /deep/ .el-tree-node__content {
                        height: 36px;
                    }
                    /deep/ .el-tree-node__content > .el-tree-node__expand-icon {
                        position: absolute;
                        right: 0;
                        color: rgb(20, 141, 221);
                        font-size: 15px;
                    }

                    /deep/.el-tree-node__expand-icon.is-leaf {
                        color: transparent;
                        cursor: default;
                    }

                    /* /deep/ .el-tree-node__content > .el-tree-node__expand-icon {
                        position: absolute;
                        right: 0;
                          color: rgb(20, 141, 221);
                        font-size: 15px;
                    }*/
                    .bigSpan {
                        font-size: 12px;
                        .leftSpan {
                            color: #909399 !important;
                        }
                        .rightSpan {
                            width: 500px;
                        }
                    }
                    .elseSpan {
                        color: rgba(48, 49, 51, 1);
                        font-size: 14px;
                        font-family: PingFangSC-Regular;
                        white-space: nowrap;
                        :first-child {
                            font-weight: 600;
                        }
                    }
                }
            }
        }
        .gap {
            width: 20px;
            height: 100%;
        }
        .rightDiv {
            height: 100%;
            width: calc(50% - 10px);
            position: relative;
            flex: 1;
            .cardDiv {
                flex: 1;
                height: 100%;
                overflow-y: auto;
                overflow-x: hidden;
                padding: 12px;
                border-radius: 8px;
                border: 1px solid #dcdfe6;
                background: rgb(245, 247, 250);
                .role-details-tag {
                    margin-bottom: 10px;
                    margin-right: 10px;
                    height: 40px;
                    line-height: 38px;
                    background: #ffffff;
                    border-radius: 4px;
                    border: 1px solid #dcdfe6;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #606266;
                }
                .el-card {
                    margin: 5px;
                    border: none;
                    background-color: transparent;
                    &:hover {
                        background-color: #dcdfe6;
                    }
                    /deep/ .el-card__body {
                        padding: 12px;
                    }
                    // el-select-dropdown__item hover
                    .content {
                        display: flex;
                        position: relative;
                        align-items: center;
                        i {
                            position: absolute;
                            right: 0;
                            cursor: pointer;
                            &:hover {
                                color: aqua;
                                transform: scale(1.2);
                            }
                        }
                    }
                }
            }
            .personCount {
                height: 30px;
                float: right;
                margin-right: 18px;
                display: flex;
                align-items: center;
                color: grey;
            }
        }
    }
    .btnDiv {
        width: 100%;
        height: 50px;
        text-align: right;
        margin-top: 45px;
        .el-button {
            width: 100px;
            height: 40px;
        }
    }
}
.circle {
    width: 12px;
    height: 12px;
    background: #c0c4cc;
    display: inline-block;
    border-radius: 12px;
    margin-right: 10px;
}
</style>
