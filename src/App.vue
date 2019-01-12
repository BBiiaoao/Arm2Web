<template>
    <div id="app">
        <div class="topNavContainer">
            <el-tabs tab-position="tap" type="border-card" @tab-click="show($event)">
                <el-tab-pane v-for="(Aitem,Aindex) in addressName" :key=Aindex :label=Aitem.message>
                    <div class="leftAreaContainer">
                        <el-tabs tab-position="left" @tab-click="reload()">
                            <el-tab-pane v-for="(Nitem,Nindex) in name" :key=Nindex :label=Nitem>
                                <div class="rightAreaContainer">
                                    <div class="chart">
                                        <chart v-if="showChart" :measureOption=measureOption[Nindex]
                                               :name="name[Nindex]" :transmissionOption="transmissionOption[Nindex]"></chart>
                                    </div>
                                </div>
                                <div class="formContainer">
                                    <el-table
                                            :data="tableData3"
                                            border
                                            style="width: 100%">
                                        <el-table-column
                                                fixed
                                                prop="date"
                                                label="日期"
                                                width="150">
                                        </el-table-column>
                                        <el-table-column
                                                prop="name"
                                                label="姓名"
                                                width="120">
                                        </el-table-column>
                                        <el-table-column
                                                prop="province"
                                                label="省份"
                                                width="120">
                                        </el-table-column>
                                        <el-table-column
                                                prop="city"
                                                label="市区"
                                                width="120">
                                        </el-table-column>
                                        <el-table-column
                                                prop="address"
                                                label="地址"
                                                width="300">
                                        </el-table-column>
                                        <el-table-column
                                                prop="zip"
                                                label="邮编"
                                                width="120">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Chart from './components/Chart'


    export default {
        name: 'app',
        components: {
            Chart,
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }],
                showChart: false,
                name: ["交流电压", "频率", "交流电流", "有功功率", "无功功率", "有功电量", "无功电量", "直流电压", "直流电流", "直流电量"],
                addressName: [],
                currentAddress: 0,
                measureOption: [
                    [],//voltage
                    [],//frequency
                    [],//current
                    [],//activePower
                    [],//reactivePower
                    [],//reactiveElectric
                    [],//activeElectric
                    [],//dcCurrent
                    [],//dcElectric
                    [],//dcVoltage
                ],
                transmissionOption: [
                    [],//voltage
                    [],//frequency
                    [],//current
                    [],//activePower
                    [],//reactivePower
                    [],//reactiveElectric
                    [],//activeElectric
                    [],//dcCurrent
                    [],//dcElectric
                    [],//dcVoltage
                ]
            }
        },
        created() {
            this.getData();
            this.getAddress();
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例

        },
        methods: {
            getData() {
                this.$axios.get("/api/arm2web/api/data?address=" + this.currentAddress)
                    .then(
                        res => {
                            const self = this;
                            const Data = res.data.data;
                            // console.log(Data);
                            Data.forEach((item, index) => {
                                let measureData = item.measureData;
                                let transmissionData=item.transmissionData;
                                this.addObj(this.measureOption[0], index, measureData.voltage);
                                this.addObj(this.measureOption[1], index, measureData.frequency);
                                this.addObj(this.measureOption[2], index, measureData.current);
                                this.addObj(this.measureOption[3], index, measureData.activePower);
                                this.addObj(this.measureOption[4], index, measureData.reactivePower);
                                this.addObj(this.measureOption[5], index, measureData.reactiveElectric);
                                this.addObj(this.measureOption[6], index, measureData.activeElectric);
                                this.addObj(this.measureOption[7], index, measureData.dcCurrent);
                                this.addObj(this.measureOption[8], index, measureData.dcElectric);
                                this.addObj(this.measureOption[9], index, measureData.dcVoltage);
                                this.addObj(this.transmissionOption[0], index, transmissionData.voltage);
                                this.addObj(this.transmissionOption[1], index, transmissionData.frequency);
                                this.addObj(this.transmissionOption[2], index, transmissionData.current);
                                this.addObj(this.transmissionOption[3], index, transmissionData.activePower);
                                this.addObj(this.transmissionOption[4], index, transmissionData.reactivePower);
                                this.addObj(this.transmissionOption[5], index, transmissionData.reactiveElectric);
                                this.addObj(this.transmissionOption[6], index, transmissionData.activeElectric);
                                this.addObj(this.transmissionOption[7], index, transmissionData.dcCurrent);
                                this.addObj(this.transmissionOption[8], index, transmissionData.dcElectric);
                                this.addObj(this.transmissionOption[9], index, transmissionData.dcVoltage);
                            });
                            this.showChart = true;
                            setTimeout(function () {
                                self.getData();
                                self.reload();
                            }, 2000);//2秒后定时发送请求
                        }
                    );
            },
            getAddress() {
                this.$axios.get("/api/arm2web/api/address")
                    .then(
                        res => {
                            console.log(res);
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
            addObj(accept, index, obj) {
                Vue.set(accept, index, obj)
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin-top: 60px;
        text-align: center;
        color: #2c3e50;
    }

    .leftAreaContainer {

    }
    .formContainer{
        margin: 0 auto;
        width: 80%;
    }
    .chart {
        margin-bottom: 20px;
    }
</style>
