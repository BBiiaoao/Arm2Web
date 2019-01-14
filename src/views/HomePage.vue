<template>
    <div id="homePage">
        <el-button class="btn" type="primary" v-on:click="changeView()">{{showChartContainer == true
            ?'显示实时表格':'显示实时折线图'}}
        </el-button>
        <el-button class="btn historyBtn" type="success" v-on:click="locationHistory()">历史记录</el-button>
        <div class="topNavContainer">
            <el-tabs tab-position="tap" type="border-card" @tab-click="show($event)">
                <el-tab-pane v-for="(Aitem,Aindex) in addressName" :key=Aindex :label=Aitem.message>
                    <div class="leftAreaContainer" v-if="showChartContainer">
                        <el-tabs tab-position="left" @tab-click="reload()">
                            <el-tab-pane v-for="(Nitem,Nindex) in name" :key=Nindex :label=Nitem>
                                <div class="rightAreaContainer">
                                    <div class="chart" v-cloak>
                                         <chart v-if="showChart" :measureOption=measureOption[Nindex]
                                                :name="name[Nindex]"
                                                :transmissionOption="transmissionOption[Nindex]"></chart>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="formContainer" v-if="showForm">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column fixed prop="data" width="120"></el-table-column>
                            <el-table-column prop="voltage" :label=name[0] width="120"></el-table-column>
                            <el-table-column prop="frequency" :label=name[1] width="120"></el-table-column>
                            <el-table-column prop="current" :label=name[2] width="120"></el-table-column>
                            <el-table-column prop="activePower" :label=name[3] width="120"></el-table-column>
                            <el-table-column prop="reactivePower" :label=name[4] width="120"></el-table-column>
                            <el-table-column prop="activeElectric" :label=name[5] width="120"></el-table-column>
                            <el-table-column prop="reactiveElectric" :label=name[6] width="120"></el-table-column>
                            <el-table-column prop="dcVoltage" :label=name[7] width="120"></el-table-column>
                            <el-table-column prop="dcCurrent" :label=name[8] width="120"></el-table-column>
                            <el-table-column prop="dcElectric" :label=name[9] width="120"></el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Chart from '../components/Chart'

    export default {
        name: "HomePage",
        components: {
            Chart
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                timeTag: {},
                tableData: [{
                    data: '传输数据',
                    voltage: 0,
                    frequency: 0,
                    current: 0,
                    activePower: 0,
                    reactivePower: 0,
                    activeElectric: 0,
                    reactiveElectric: 0,
                    dcVoltage: 0,
                    dcCurrent: 0,
                    dcElectric: 0
                }, {
                    data: '测量数据',
                    voltage: 0,
                    frequency: 0,
                    current: 0,
                    activePower: 0,
                    reactivePower: 0,
                    activeElectric: 0,
                    reactiveElectric: 0,
                    dcVoltage: 0,
                    dcCurrent: 0,
                    dcElectric: 0
                }],
                showForm: false,
                showChartContainer: true,
                showChart: false,
                name: ["交流电压", "频率", "交流电流", "有功功率", "无功功率", "有功电量", "无功电量", "直流电压", "直流电流", "直流电量"],
                addressName: [],
                currentAddress: 1,
                measureOption: [
                    [],//voltage
                    [],//frequency
                    [],//current
                    [],//activePower
                    [],//reactivePower
                    [],//activeElectric
                    [],//reactiveElectric
                    [],//dcVoltage
                    [],//dcCurrent
                    [],//dcElectric
                ],
                transmissionOption: [
                    [],//voltage
                    [],//frequency
                    [],//current
                    [],//activePower
                    [],//reactivePower
                    [],//activeElectric
                    [],//reactiveElectric
                    [],//dcVoltage
                    [],//dcCurrent
                    [],//dcElectric
                ]
            }
        },
        created() {
            this.getAddress();
            this.getData();
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例

        },
        methods: {
            getData() {
                clearTimeout(this.timeTag);
                let a;
                this.$axios.get("api/api/data?address=" + this.currentAddress)
                    .then(
                        res => {
                            const self = this;
                            const Data = res.data.data;
                            Data.forEach((item, index) => {
                                let measureData = item.measureData;
                                let transmissionData = item.transmissionData;
                                let mOption = 0;
                                let tOption = 0;
                                for (let key in measureData) {
                                    this.addObj(this.measureOption[mOption], index, measureData[key]);
                                    mOption++;
                                }
                                for (let key in transmissionData) {
                                    this.addObj(this.transmissionOption[tOption], index, transmissionData[key]);
                                    tOption++;
                                }
                            });
                            let i = 0;
                            for (let key in this.tableData[0]) {
                                if (key != 'data') {
                                    this.tableData[0][key] = this.measureOption[i][14];
                                    this.tableData[1][key] = this.transmissionOption[i][14];
                                    i++;
                                }
                            }
                            a = setTimeout(function () {
                                self.getData();
                                self.reload();
                            }, 2000);//2秒后定时发送请求
                            return a
                        }
                    ).then(
                    res => {
                        this.timeTag = res;
                    }
                )
            },
            getAddress() {
                this.$axios.get("api/api/address")
                    .then(
                        res => {
                            const addressName = res.data.data;
                            this.addressName = addressName;
                        }
                    )
            },
            reload() {
                this.showChart = false;
                this.$nextTick(() => {
                    this.showChart = true
                });
            },
            show(e) {
                this.reload();
                const {index} = e;
                this.currentAddress = index;
                this.getData();
            },
            changeView() {
                this.showForm = !this.showForm;
                this.showChartContainer = !this.showChartContainer;
            },
            addObj(accept, index, obj) {
                Vue.set(accept, index, obj)
            },
            locationHistory(){
                this.currentAddress++;
                const id=this.currentAddress;
                this.$router.push({
                    path: `/history/${id}`,
                })
            }
        }
    }
</script>

<style scoped>
    #homePage {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: relative;
        margin-top: 60px;
        text-align: center;
        color: #2c3e50;
    }


    .btn {
        margin-bottom: 10px !important;
    }

    .historyBtn {
        position: absolute;
        right: 5px;
    }

    .formContainer {
        margin: 0 auto;
        width: 80%;
    }

    .chart {
        margin-bottom: 20px;
    }
</style>