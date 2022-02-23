
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/index","pages/community/index","pages/user/my","pages/home/detail","pages/find/index","pages/find/detail","pages/home/add","pages/find/add","pages/community/add","pages/community/detail","pages/cyclopedia/index","pages/cyclopedia/detail","pages/card/index","pages/path/adoptPath","pages/user/user","pages/article/index","pages/article/detail","pages/author/index","pages/chat/index","pages/chat/detail","pages/user/follow","pages/user/login","pages/user/register"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","enablePullDownRefresh":true},"tabBar":{"backgroundColor":"#ffffff","color":"#000000","selectedColor":"#ffaa00","list":[{"pagePath":"pages/home/index","iconPath":"static/tabber/home.png","text":"领养","selectedIconPath":"static/tabber/home_selected.png"},{"pagePath":"pages/find/index","iconPath":"static/tabber/find-pet.png","text":"寻宠","selectedIconPath":"static/tabber/find-pet_selected.png"},{"pagePath":"pages/community/index","iconPath":"static/tabber/circle.png","text":"宠物社区","selectedIconPath":"static/tabber/circle_selected.png"},{"pagePath":"pages/user/my","iconPath":"static/tabber/my.png","text":"我的","selectedIconPath":"static/tabber/my_selected.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"喵喵宠物圈","compilerVersion":"3.3.11","entryPagePath":"pages/home/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"宠物圈"}},{"path":"/pages/community/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"宠物社区"}},{"path":"/pages/user/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":false}},{"path":"/pages/home/detail","meta":{},"window":{"navigationBarTitleText":"宠物详情","enablePullDownRefresh":false}},{"path":"/pages/find/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"寻宠"}},{"path":"/pages/find/detail","meta":{},"window":{"navigationBarTitleText":"寻宠详情","enablePullDownRefresh":false}},{"path":"/pages/home/add","meta":{},"window":{"navigationBarTitleText":"发布领养","enablePullDownRefresh":false}},{"path":"/pages/find/add","meta":{},"window":{"navigationBarTitleText":"发布寻宠","enablePullDownRefresh":false}},{"path":"/pages/community/add","meta":{},"window":{"navigationBarTitleText":"发布动态","enablePullDownRefresh":false}},{"path":"/pages/community/detail","meta":{},"window":{"navigationBarTitleText":"宠物圈详情","enablePullDownRefresh":false}},{"path":"/pages/cyclopedia/index","meta":{},"window":{"navigationBarTitleText":"宠物科普"}},{"path":"/pages/cyclopedia/detail","meta":{},"window":{"navigationBarTitleText":"科普详情","enablePullDownRefresh":false}},{"path":"/pages/card/index","meta":{},"window":{"navigationBarTitleText":"打卡签到","enablePullDownRefresh":false}},{"path":"/pages/path/adoptPath","meta":{},"window":{"navigationBarTitleText":"领养流程","enablePullDownRefresh":false}},{"path":"/pages/user/user","meta":{},"window":{"navigationBarTitleText":"个人主页","enablePullDownRefresh":false}},{"path":"/pages/article/index","meta":{},"window":{"navigationBarTitleText":"文章列表"}},{"path":"/pages/article/detail","meta":{},"window":{"navigationBarTitleText":"文章详情","enablePullDownRefresh":false}},{"path":"/pages/author/index","meta":{},"window":{"navigationBarTitleText":"作者想说","enablePullDownRefresh":false}},{"path":"/pages/chat/index","meta":{},"window":{"navigationBarTitleText":"消息列表"}},{"path":"/pages/chat/detail","meta":{},"window":{"navigationBarTitleText":"消息详情","enablePullDownRefresh":false}},{"path":"/pages/user/follow","meta":{},"window":{"navigationBarTitleText":"关注列表"}},{"path":"/pages/user/login","meta":{},"window":{"navigationBarTitleText":"用户登录","enablePullDownRefresh":false}},{"path":"/pages/user/register","meta":{},"window":{"navigationBarTitleText":"用户注册","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
