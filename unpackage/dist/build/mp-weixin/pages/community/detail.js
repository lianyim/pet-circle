(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/community/detail"],{"6b9b":function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return o}));var i=function(){var t=this,e=t.$createElement;t._self._c},u=[]},"6c62":function(t,e,n){},8705:function(t,e,n){"use strict";var o=n("6c62"),i=n.n(o);i.a},"97a2":function(t,e,n){"use strict";n.r(e);var o=n("6b9b"),i=n("a9d0");for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);n("8705");var r,s=n("f0c5"),c=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=c.exports},a9d0:function(t,e,n){"use strict";n.r(e);var o=n("cd7c"),i=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=i.a},cd7c:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("89c9"));function i(t){return t&&t.__esModule?t:{default:t}}var u={data:function(){return{user:{},openId:"",petCircle:{},comments:[],commentsChild:[],commentContent:"",peyCircleId:"",commentCount:0,isFollowUser:!1,type:"CIRCLE"}},onLoad:function(e){var n=this,o=t.getStorageSync("userInfo");this.user=o,this.openId=o.openId,this.peyCircleId=e.id,this.getCircle(e.id),this.queryComments(e.id,this.type),this.queryCommentCount(e.id,this.type),setTimeout((function(){n.isFollow()}),500)},methods:{getCircle:function(t){var e=this;o.default.getPetcircle({id:t}).then((function(t){e.petCircle=t.data}))},queryComments:function(t,e){var n=this;o.default.queryComments({fromId:t,type:e}).then((function(t){null!=t.data&&(n.commentsChild=[],n.comments=t.data,n.comments.map((function(t){null!=t.parentId&&n.commentsChild.push(t)})))}))},queryCommentCount:function(t,e){var n=this;o.default.queryCommentCount({fromId:t,type:e}).then((function(t){n.commentCount=t.data}))},previewImage:function(e){t.previewImage({current:e,urls:this.petCircle.pictures})},submit:function(e,n){var i=this,u=t.getStorageSync("userInfo"),r=u.openId;if(void 0===r)return t.showToast({title:"您未登录，请前往登录",icon:"none",duration:1500}),void setTimeout((function(){t.switchTab({url:"/pages/user/my"})}),1500);if(""!=this.commentContent){var s={parentId:e,grandId:n,ownerId:r,formId:this.peyCircleId,content:this.commentContent,type:this.type};o.default.addComment(s).then((function(e){if(1==e.data)return t.showToast({title:"发布成功",icon:"success"}),i.queryComments(i.peyCircleId,i.type),i.queryCommentCount(i.peyCircleId,i.type),void(i.commentContent="");t.showToast({title:"接口请求异常",icon:error})}))}else t.showToast({title:"请输入评论内容",icon:"none"})},reply:function(e,n){var i=this,u=t.getStorageSync("userInfo");e.ownerId==u.openId?t.showModal({title:"确定要删除吗",success:function(n){n.confirm&&o.default.deleteComment({id:e.id}).then((function(e){if(1==e.data)return t.showToast({title:"删除成功",icon:"success"}),i.queryComments(i.peyCircleId,i.type),void i.queryCommentCount(i.peyCircleId,i.type);t.showToast({title:"接口请求异常",icon:error})}))}}):t.showModal({title:"评论",confirmText:"回复",editable:!0,placeholderText:"回复@"+e.nickname,success:function(t){t.confirm&&(i.commentContent=t.content,i.submit(e.id,null!=n?n.id:null))}})},toUser:function(e){t.navigateTo({url:"/pages/user/user?openId=".concat(e)})},isFollow:function(){var t=this;""!=this.openId&&void 0!=this.openId&&o.default.isFollow({userId:this.openId,followId:this.petCircle.userId}).then((function(e){t.isFollowUser=e.data}))},follow:function(){var e=this;if(""!=this.openId&&void 0!=this.openId){var n={userId:this.openId,followId:this.petCircle.userId};o.default.addUserFollow(n).then((function(t){t.data&&(e.isFollowUser=!0)}))}else t.showToast({title:"登录后才能关注哦",icon:"none"})},unFollow:function(){var t=this,e={userId:this.openId,followId:this.petCircle.userId};o.default.unUserFollow(e).then((function(e){e.data&&(t.isFollowUser=!1)}))}}};e.default=u}).call(this,n("543d")["default"])},f41c:function(t,e,n){"use strict";(function(t){n("96ad");o(n("66fd"));var e=o(n("97a2"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])}},[["f41c","common/runtime","common/vendor"]]]);