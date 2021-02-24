<template>
  <div class="paraminfo" v-if="Object.keys(paraminfo).length!==0">
    <table rules='rows' v-for="(table,index) in paraminfo.rule.tables" :key="index" class="tb1">
      <tr v-for="(tr,indey) in table" :key="indey"><!-- 循环出tr6行 -->
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td><!-- 循环出每行的数据 -->
      </tr>
    </table>
   <table rules='rows' class="tb2"><!-- 12个表 -->
      <tr v-for="(tr,index) in paraminfo.info.set" :key="index"><!-- 循环出13行 -->
        <td>{{tr.key}}</td>
        <td>{{tr.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name:'DetailParamInfo',
  props: {
    paraminfo:{
    type:Object,
    default(){
      return {}
    }
  }
  }
}
</script>

<style scoped>
  /* 只显示内横线是 rules=rows 实现的 */
  .paraminfo table{
    width:90%;
    padding:10px;
    color: rgb(121, 121, 121);
    font-size: 15px;
    margin-left: 15px;
  }
  .tb1{
    margin-top: 20px;
    box-shadow: 0px 5px 1px rgb(228, 228, 228);
  }
  .tb2 td,.tb1 td{
    text-align: left;
    width: 20%;
    height: 50px;
  }
  .tb2 td:nth-child(2){
    color: rgb(255, 113, 113);
  }
</style>