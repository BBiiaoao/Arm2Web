<template>
    <div>
        <div class="btnContainer">
            <el-button class="btn" type="primary" v-on:click="locationHomePage()">返回首页</el-button>
        </div>
        <div class="formContainer">
            <el-table :data="chargingPile.records" height="600" border style="width: 100%">
                <el-table-column label="传输数据" align="center">
                    <el-table-column prop="voltage2" :label=name[0] width="120"></el-table-column>
                    <el-table-column prop="frequency2" :label=name[1] width="120"></el-table-column>
                    <el-table-column prop="current2" :label=name[2] width="120"></el-table-column>
                    <el-table-column prop="activePower2" :label=name[3] width="120"></el-table-column>
                    <el-table-column prop="reactivePower2" :label=name[4] width="120"></el-table-column>
                    <el-table-column prop="activeElectric2" :label=name[5] width="120"></el-table-column>
                    <el-table-column prop="reactiveElectric2" :label=name[6] width="120"></el-table-column>
                    <el-table-column prop="dcVoltage2" :label=name[7] width="120"></el-table-column>
                    <el-table-column prop="dcCurrent2" :label=name[8] width="120"></el-table-column>
                    <el-table-column prop="dcElectric2" :label=name[9] width="120"></el-table-column>
                </el-table-column>
                <el-table-column label="测量数据" align="center">
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
                </el-table-column>
                <el-table-column label="数据/充电桩选项" align="center">
                    <el-table-column prop="createTime" label="生成时间" width="180"></el-table-column>
                    <el-table-column prop="isBroken" label="是否损坏" width="180"></el-table-column>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination
                    layout="prev, pager, next"
                    :total=allPage
                    :current-page=currentPage
                    @current-change="loadNewPage"
                    style="text-align: center"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "History",
        data() {
            return {
                name: ["交流电压", "频率", "交流电流", "有功功率", "无功功率", "有功电量", "无功电量", "直流电压", "直流电流", "直流电量"],
                currentAddress: 1,
                currentPage:1,
                chargingPile: {},
                allPage:0
            }
        },
        created() {
            this.getAddress();
            this.getHistoryData();
        },
        methods: {
            getAddress() {
                this.currentAddress = this.$route.params.id
            },
            getHistoryData() {
                this.$axios.get("/api/api/history?address=" + this.currentAddress)
                    .then(
                        res => {
                            this.chargingPile = res.data.data;
                            console.log(this.chargingPile);
                            this.allPage=this.chargingPile.allPage*10;
                            const records=this.chargingPile.records;
                            records.forEach((item,index)=>{
                                if(item.isError)
                                    item.isBroken="已损坏"
                                else
                                    item.isBroken="未损坏"
                            })
                        }
                    )
            },
            loadNewPage(page){
                this.currentPage=page;
                this.$axios.get("/api/api/history?address=" + this.currentAddress+"&page="+this.currentPage)
                    .then(
                        res => {
                            this.chargingPile = res.data.data;
                            console.log(this.chargingPile);
                            const records=this.chargingPile.records;
                            records.forEach((item,index)=>{
                                if(item.isError)
                                    item.isBroken="已损坏"
                                else
                                    item.isBroken="未损坏"
                            })
                        }
                    )
            },
            locationHomePage(){
                this.$router.push({
                    path: '/homePage',
                })
            }
        }

    }
</script>

<style scoped>
.btnContainer{
    margin: 10px 0;
}
</style>