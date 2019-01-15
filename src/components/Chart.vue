<template>
    <div id="echart">
        <p class="title">{{name}}</p>
        <div class="echartContainer" ref="echartContainer"></div>
        <div></div>
    </div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        inject: ['reload'],
        props: {
            measureOption: Array,
            transmissionOption: Array,
            name: String
        },
        data(){
            return{
              mOption:[]
            }
        },
        created() {
        },
        watch:{
            measureOption:function (newVal,oldVal) {
                this.mOption=newVal;
                this.showData();
            }
        },
        mounted() {
            const myChart = echarts.init(this.$refs.echartContainer);
            // 绘制图表
            const time = this.getXtime();
            myChart.clear();
            myChart.setOption({
                title: [{
                    textStyle: {
                        align: 'center'
                    }
                }],
                legend: {
                    data: ['测量数据', '传输数据']
                },
                tooltip: {},
                animation: false,
                xAxis: {
                    name: '时间',
                    //不从0开始
                    scale: true,
                    data: [time[0], time[1], time[2], time[3], time[4], time[5],
                        time[6], time[7], time[8], time[9], time[10], time[11],
                        time[12], time[13], time[14],],
                    //x值在刻度下面
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        //一条轴线从另一条轴线0开始
                        onZero: true
                    }
                },
                yAxis: {},
                series: [
                    {
                        name: '测量数据',
                        type: 'line',
                        data: [this.measureOption[0], this.measureOption[1], this.measureOption[2], this.measureOption[3], this.measureOption[4],
                            this.measureOption[5], this.measureOption[6], this.measureOption[7], this.measureOption[8], this.measureOption[9],
                            this.measureOption[10], this.measureOption[11], this.measureOption[12], this.measureOption[13], this.measureOption[14]]
                    },
                    {
                        name: '传输数据',
                        type: 'line',
                        data: [this.transmissionOption[0], this.transmissionOption[1], this.transmissionOption[2], this.transmissionOption[3], this.transmissionOption[4],
                            this.transmissionOption[5], this.transmissionOption[6], this.transmissionOption[7], this.transmissionOption[8], this.transmissionOption[9],
                            this.transmissionOption[10], this.transmissionOption[11], this.transmissionOption[12], this.transmissionOption[13], this.transmissionOption[14]]
                    }
                ]
            }, {notMerge: false, lazyUpdate: false, silent: false});
        },
        methods: {
            getXtime() {
                const myDate = new Date();//获取系统当前时间
                let t = [];
                for (let i = 1; i < 16; i++) {
                    if ((myDate.getSeconds() - i * 2) > 0) {
                        t.push(myDate.getHours() + ":" + myDate.getMinutes() + ":" + (myDate.getSeconds() - i * 2))
                    } else {
                        if (myDate.getMinutes() - 1)
                            t.push((myDate.getHours() - 1) + ":" + (myDate.getMinutes()) + ":" + (myDate.getSeconds() - i * 2 + 60))
                        t.push(myDate.getHours() + ":" + (myDate.getMinutes() - 1) + ":" + (myDate.getSeconds() - i * 2 + 60))
                    }
                }
                return t;
            },
            showData(){
                /*console.log(new Date());
                console.log(this.mOption);*/
            }
        }
    }
</script>

<style scoped>
    #echart {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        width: 80%;
        background: #FAFAFA;
        border-radius: 10px;
    }

    .title {
        width: 100%;
        margin: 10px 0 0;
        font-size: 20px;

    }

    .echartContainer {
        width: 100%;
        height: 400px;
    }
</style>