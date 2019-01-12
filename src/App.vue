<template>
    <div id="app">
        <div class="topNavContainer">
            <el-tabs tab-position="tap" type="border-card" @tab-click="show($event)">
                <el-tab-pane v-for="(Aitem,Aindex) in addressName" :key=Aindex :label=Aitem.message>
                    <div class="leftAreaContainer">
                        <el-tabs tab-position="left"  @tab-click="reload()">
                            <el-tab-pane v-for="(Nitem,Nindex) in name" :key=Nindex :label=Nitem>
                                <div class="rightAreaContainer">
                                    <div class="chart">
                                        <chart v-if="showChart" :parameter=option. :name="name[Nindex]"></chart>
                                    </div>
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
                showChart: false,
                name: ["交流电压", "频率", "交流电流", "有功功率", "无功功率", "有功电量", "无功电量", "直流电压", "直流电流", "直流电量"],
                addressName:[],
                currentAddress:0,
                option:[
                    [],//voltage
                    [],//frequency
                    [],//
                    [],//
                    [],//
                    [],//
                    [],//
                    [],//
                    [],//
                    [],//
                ],
                voltage: [],
                frequency: [],
                current: [],
                activePower: [],
                reactivePower: [],
                reactiveElectric: [],
                activeElectric: [],
                dcCurrent: [],
                dcElectric: [],
                dcVoltage: [],
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
                this.$axios.get("/api/arm2web/api/data?address="+this.currentAddress)
                    .then(
                        res => {
                            const self = this;
                            const Data = res.data.data;
                            Data.forEach((item, index) => {
                                let measureData = item.measureData;
                                this.addObj(this.option.voltage, index, measureData.voltage);
                                this.addObj(this.option.frequency, index, measureData.frequency);
                                this.addObj(this.option.current, index, measureData.current);
                                this.addObj(this.option.activePower, index, measureData.activePower);
                                this.addObj(this.option.reactivePower, index, measureData.reactivePower);
                                this.addObj(this.option.reactiveElectric, index, measureData.reactiveElectric);
                                this.addObj(this.option.activeElectric, index, measureData.activeElectric);
                                this.addObj(this.option.dcCurrent, index, measureData.dcCurrent);
                                this.addObj(this.option.dcElectric, index, measureData.dcElectric);
                                this.addObj(this.option.dcVoltage, index, measureData.dcVoltage);
                            });
                            this.showChart = true;
                            setTimeout(function () {
                                self.getData();
                                self.reload();
                            }, 2000);//2秒后定时发送请求
                        }
                    );
            },
            getAddress(){
                this.$axios.get("/api/arm2web/api/address")
                    .then(
                        res=>{
                            const addressName=res.data.data;
                            this.addressName=addressName;
                            console.log(this.addressName);
                        }
                    )
            },
            reload() {
                this.showChart = false;
                this.$nextTick(() => {
                    this.showChart = true
                })
            },
            show(e){
                this.reload();
                const {index}=e;
                this.currentAddress=index;
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
    .leftAreaContainer{

     }
    .chart {
        margin-bottom: 20px;
    }
</style>
