<template>
  <div class="silderBar">
        <div class="logoArea">
            喵播后台管理
        </div>
        <Menu :theme="theme" :accordion="true" width="200px" :active-name="acName">
         <Submenu name="11">
            <template slot="title">
                <Icon type="ios-contact"></Icon>
                菜单管理
            </template>
            <Menu-item to="/menu" name="11-1">菜单</Menu-item>
        </Submenu>

        <Submenu name="1">
            <template slot="title">
                <Icon type="md-mail-open" />
                房间管理
            </template>
            <Menu-item to="/paymentmenu" name="/paymentmenu">支付菜单</Menu-item>
            <Menu-item to="/hostlength" name="1-2">主播时长查询</Menu-item>
            <Menu-item to="/supervisor" name="1-3">室主管理</Menu-item>
            <Menu-item to="/hotListadvertising" name="1-4">热门列表广告管理</Menu-item>
            <Menu-item to="/advertising" name="1-5">广告管理</Menu-item>
            <Menu-item to="/hothostlist" name="1-6">热门主播列表</Menu-item>
            <Menu-item to="/hostlevelrecommendation" name="1-7">主播一级推荐</Menu-item>
            <Menu-item to="/gifthotpush" name="1-8">礼物热推管理</Menu-item>
            <Menu-item to="/hostlevel2recommendation" name="1-9">主播二级推荐</Menu-item>
            <Menu-item to="/roomhangup" name="1-10">房间挂机查询</Menu-item>
            <Menu-item to="/titleofwheat" name="1-11">封号封麦</Menu-item>
            <Menu-item to="/userlivevideo" name="1-12">用户直播视频流</Menu-item>
            <Menu-item to="/roomdeletion" name="1-13">房间管理删除</Menu-item>
            <Menu-item to="/userroomserver" name="1-14">用户房间服务器</Menu-item>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-contact"></Icon>
                用户管理
            </template>
            <Menu-item to="/membershiplist" name="2-1">会员列表</Menu-item>
            <Menu-item to="/anchorbankcard" name="2-2">主播银行卡资料</Menu-item>
            <Menu-item to="/crownlist" name="2-3">皇冠列表</Menu-item>
            <Menu-item to="/staranchorsettings" name="2-4">星级主播设置</Menu-item>
            <Menu-item to="/overpipenumber" name="2-5">超管号管理</Menu-item>
            <Menu-item to="/unscramblewheat" name="2-6">解号解麦</Menu-item>
            <Menu-item to="/hostnew" name="2-7">主播新进管理</Menu-item>
            <Menu-item to="/videowall" name="2-8">视频墙管理</Menu-item>
            <Menu-item to="/newanchordeleted" name="2-9">新进主播删除</Menu-item>
            <Menu-item to="/dischargeofprohibitions" name="2-10">禁言解除管理</Menu-item>
            <Menu-item to="/openingauditofnonstar" name="2-11">非星级主播开播审核</Menu-item>
            <Menu-item to="/cephalometry" name="2-12">头像审核</Menu-item>
            <Menu-item to="/hotblacklist" name="2-13">热门黑名单</Menu-item>
            <Menu-item to="/equipmentnumberquery" name="2-14">设备号查询</Menu-item>
            <Menu-item to="/userbindingmobile" name="2-15">用户绑定手机查询</Menu-item>
            <Menu-item to="/newuserrecommendedanchor" name="2-16">新用户推荐主播</Menu-item>
            <Menu-item to="/useraccountunlocking" name="2-17">用户账号解锁</Menu-item>
            <Menu-item to="/starratedanchorblacklist" name="2-18">星级主播黑名单</Menu-item>
            <Menu-item to="/retailhost" name="2-19">散户主播管理</Menu-item>
            <Menu-item to="/authenticatedanchor" name="2-20">认证主播家族管理</Menu-item>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="logo-twitter" ></Icon>
                销售业务
            </template>
           <Menu-item to="/rechargeable" name="3-1">充值流水</Menu-item>
           <Menu-item to="/refilldetails" name="3-2">充值明细</Menu-item>
           <Menu-item to="/dailyrecharge" name="3-3">每日充值人数</Menu-item>
           <Menu-item to="/recharge" name="3-4">充值新增统计</Menu-item>
           <Menu-item to="/numbersales" name="3-5">号码销售管理</Menu-item>
           <Menu-item to="/systemdegraded" name="3-6">系统降级查询</Menu-item>
           <Menu-item to="/numberofgifts" name="3-7">赠送礼物数量查询</Menu-item>
           <Menu-item to="/applerecharge" name="3-8">苹果充值渠道统计</Menu-item>
           <Menu-item to="/ordersystem" name="3-9">订单系统</Menu-item>
           <Menu-item to="/invoiceinquiry" name="3-10">调单查询</Menu-item>
        </Submenu>
        <Submenu name="4">
            <template slot="title">
                <Icon type="logo-bitcoin" ></Icon>
                货币管理
            </template>
            <Menu-item to="/canadiandollar" name="4-1">后台加币</Menu-item>
            <Menu-item to="/usercurrency" name="4-2">用户币信息</Menu-item>
            <Menu-item to="/currencydetailed" name="4-3">币明细统计</Menu-item>
            <Menu-item to="/giftmoney" name="4-4">赠送币统计</Menu-item>
            <Menu-item to="/cleanupmoney" name="4-5">清除货币</Menu-item>
            <Menu-item to="/currencyfreeze" name="4-6">货币冻结</Menu-item>
        </Submenu>
        <Submenu name="5">
            <template slot="title">
                <Icon type="md-egg" ></Icon>
                礼物管理
            </template>
            <Menu-item to="/luckygift" name="5-1">幸运礼物统计</Menu-item>
            <Menu-item to="/giftmanagement" name="5-2">礼物管理</Menu-item>
            <Menu-item to="/giftprobability" name="5-3">礼物概率管理</Menu-item>
            <Menu-item to="/detailedstatistics" name="5-4">幸运礼物明细统计</Menu-item>
            <Menu-item to="/biggiftstatistics" name="5-5">大礼物统计</Menu-item>
        </Submenu>
        <Submenu name="6">
            <template slot="title">
                <Icon type="ios-pie-outline" ></Icon>
                房间统计
            </template>
            <Menu-item to="/newregistration" name="6-1">注册新增统计</Menu-item>
            <Menu-item to="/timeregistration" name="6-2">分时注册统计</Menu-item>
            <Menu-item to="/onlinenumber" name="6-3">在线人数统计</Menu-item>
            <Menu-item to="/roompopularity" name="6-4">房间人气</Menu-item>
            <Menu-item to="/roomconsumption" name="6-5">房间流水消耗</Menu-item>
            <Menu-item to="/individualanchors" name="6-6">单个主播明细</Menu-item>
            <Menu-item to="/dailyanchor" name="6-7">每日主播明细</Menu-item>
            <Menu-item to="/contrastchart" name="6-8">开播人数对比图</Menu-item>
            <Menu-item to="/dailytask" name="6-9">每日任务统计</Menu-item>
            <Menu-item to="/hostPipeline" name="6-10">主播流水消耗</Menu-item>
            <Menu-item to="/anchordoll" name="6-11">主播娃娃兑换</Menu-item>
        </Submenu>
        <Submenu name="7">
            <template slot="title">
                <Icon type="ios-megaphone" ></Icon>
                代理商管理
            </template>
            <Menu-item to="/agencyrecharge" name="7-1">代理账号充值</Menu-item>
            <Menu-item to="/agentfinance" name="7-2">代理商管理（财务）</Menu-item>
            <Menu-item to="/pointcard" name="7-3">点卡查询</Menu-item>
            <Menu-item to="/dailyturnover" name="7-4">每日交易额查询</Menu-item>
            <Menu-item to="/monthlyturnover" name="7-5">每月交易额统计</Menu-item>
        </Submenu>
        <Submenu name="8">
            <template slot="title">
                <Icon type="ios-construct" ></Icon>
                系统设置
            </template>
            <Menu-item to="/keyword" name="8-1">关键字管理</Menu-item>
            <Menu-item to="/systemconfiguration" name="8-2">系统配置</Menu-item>
            <Menu-item to="/administrator" name="8-3">管理员管理</Menu-item>
            <Menu-item to="/allocationprivileges" name="8-4">权限分配</Menu-item>
            <Menu-item to="/household" name="8-5">室主公告管理</Menu-item>
            <Menu-item to="/systemmessage" name="8-6">系统消息发送</Menu-item>
            <Menu-item to="/itservers" name="8-7">IT服务端人数</Menu-item>
            <Menu-item to="/itroom" name="8-8">IT配置管理（房间）</Menu-item>
            <Menu-item to="/itagent" name="8-9">IT配置管理（代理）</Menu-item>
            <Menu-item to="/itlogin" name="8-10">IT配置管理（登录）</Menu-item>
            <Menu-item to="/roomserver" name="8-11">房间服务器更换</Menu-item>
            <Menu-item to="/versioncontrol" name="8-12">版本控制</Menu-item>
            <Menu-item to="/versionusage" name="8-13">版本使用统计</Menu-item>
            <Menu-item to="/cdnhandover" name="8-14">CDN切换</Menu-item>     
        </Submenu>
    </Menu>  
  </div>
</template>

<script>


  export default {
    name: 'Slider',
    data() {
      return {
        theme: 'dark',//silder 背景颜色 light  dark
        acName:'',//菜单激活的name
      }
    },
    created () {
      
    },
    methods: {

    }
     
  }
</script>

<style scoped lang="scss">
.silderBar{
    .logoArea{
        width: 160px;
        margin:20px auto;
        background: #2D8CF0;
        border-radius:10px 5px 5px 0;
        color:#fff;
        font-weight: 900;
        line-height: 34px;
        font-size: 22px;
        color:#fff;
        
    }
}
</style>
