webpackJsonp([14],{15:function(e,t,n){"use strict";var a=(n(4),n(1)),r=n(18),s=a.createClass({displayName:"ConfirmButton",propTypes:{children:a.PropTypes.node,disabled:a.PropTypes.bool,onClick:a.PropTypes.func,className:a.PropTypes.string},handleClick:function(e){this.props.disabled||(this.props.onClick||function(){})(e)},render:function(){var e=r({"cpn-primary-button":!0,disabled:this.props.disabled});return a.createElement("button",{className:e+" "+(this.props.className||""),onClick:this.handleClick},this.props.children)}});e.exports=s},165:function(e,t,n){e.exports=n.p+"asset/0c0256446e77023a9fc3c3638f44a8ec.png"},166:function(e,t,n){e.exports=n.p+"asset/e05d4035dbe292b19503356f1ddd6983.png"},526:function(e,t,n){"use strict";var a=n(1),r=n(327),s=n(22),o=n(527),i=n(530),c=n(528),l=n(529),m=n(5),u=n(8),d=n(6).StoreWatchMixin,h=n(37),p=n(2).redirect,g=["www.maizuo.com","m.maizuo.com","maizuo.com"],E=a.createClass({displayName:"LoginView",mixins:[u,d("AuthStore")],getStateFromFlux:function(){var e=this.getFlux().store("AuthStore");return{isLogged:e.getStatus()}},propTypes:{redirectUri:a.PropTypes.string},componentDidUpdate:function(){var e=this.props.redirectUri||"#!/center";if(this.state.isLogged)return setTimeout(function(){var t=r.parse(e),n=t.hostname;n&&!~g.indexOf(n)&&(window.confirm("你接下来将要访问的并非卖座电影的网页，是否继续?")||(e="#!/center")),p(e,{trigger:!0,replace:!0})},0)},componentDidMount:function(){this.getFlux().actions.application.setNavbar({title:"登录"})},render:function(){var e,t=!!s(m.COOKIE_DEBUG);return e=h.app.isWechat()?a.createElement(i,null):h.app.isQQ()?a.createElement(l,null):h.app.isMQQBrowser()?a.createElement(c,null):t?"":a.createElement(o,null),a.createElement("section",{className:"login-view"},a.createElement("div",null,t?a.createElement(o,null):""),a.createElement("div",null,e))}});e.exports=E},527:function(e,t,n){"use strict";var a=n(1),r=(n(11),n(2).redirect,n(2).isMobile),s=n(2).isEmail,o=n(2).trim,i=n(7),c=n(18),l=n(8),m=n(6).StoreWatchMixin,u=n(5),d=(n(12),{INVALID_USERNAME:"请输入正确手机号或邮箱",INVALID_EMPTY_PASSWORD:"密码不能为空",INVALID_EMPTY_NAME:"手机号或邮箱不能为空",INVALID_EMPTY_CAPTCHA:"请输入图形验证码"}),h=a.createClass({displayName:"SmsCode",getInitialState:function(){return{msg:"发送验证码"}},handleClick:function(){this.props.hasSendSmsCode||this.props.onClick()},render:function(){return a.createElement("span",{className:"sms-code",onClick:this.handleClick},a.createElement("i",{className:"sms-code-row"}),a.createElement("i",{className:"sms-code-tex"},this.props.hasSendSmsCode?"重发("+this.props.cuntdownTime+")":this.state.msg))}}),p=a.createClass({displayName:"LoginForm",mixins:[l,m("AuthStore")],getStateFromFlux:function(){this.getFlux().store("AuthStore");return{}},getInitialState:function(){return{userType:u.AUTH_LOGIN_USER_TYPE_IS_INVALID,isShowCaptcha:!1,errorMsg:"",hasSendSmsCode:!1,hasDologged:!1,cuntdownTime:59,captchaUrl:"",captchaKey:""}},handleSubmit:function(e){var t=this;return e.preventDefault(),t.setState({errorMsg:""}),t.username=o(t.refs.username.value),t.password=o(t.refs.pwd.value),t.captcha=o(t.refs.code.value),""===t.username?t.setState({errorMsg:d.INVALID_EMPTY_NAME}):t.state.userType===u.AUTH_LOGIN_USER_TYPE_IS_INVALID?t.setState({errorMsg:d.INVALID_USERNAME}):""===t.password?t.setState({errorMsg:d.INVALID_EMPTY_PASSWORD}):""===t.captcha&&t.state.isShowCaptcha?t.setState({errorMsg:d.INVALID_EMPTY_CAPTCHA}):(t.confirmLoginType(),void t.doLogin())},confirmLoginType:function(){var e=this;if(e.state.userType===u.AUTH_LOGIN_USER_TYPE_IS_MOBILE){var t=e.password.length;(isNaN(e.password)||6!==t)&&(e.loginType=u.AUTH_LOGIN_TYPE_IS_DEFAULT)}},doLogin:function(){var e=this;e.state.hasDologged||(e.setState({hasDologged:!0}),this.getFlux().actions.auth.login({username:e.username,password:e.password,loginType:e.loginType,code:e.captcha,codeKey:e.state.captchaKey},function(t,n){var a;e.setState({hasDologged:!1}),t&&confirm("登录失败，请重试")&&e.doLogin(),a=+i.get(n,"status"),0!==a&&(a===-23117&&e.showCaptcha(),e.setState({errorMsg:i.get(n,"msg")}))}))},showCaptcha:function(){var e=this;e.getFlux().actions.auth.getCaptcha(function(t,n){return t?e.setState({errorMsg:t}):void e.setState({isShowCaptcha:!0,captchaUrl:n.url,captchaKey:n.key})})},changeUserType:function(e){this.setState({userType:e})},onUserNameChange:function(e){var t=o(e.target.value);this.setUserName(t)},setUserName:function(e){var t=this;t.loginType=u.AUTH_LOGIN_TYPE_IS_DEFAULT,r(e)?t.changeUserType(u.AUTH_LOGIN_USER_TYPE_IS_MOBILE):s(e)?t.changeUserType(u.AUTH_LOGIN_USER_TYPE_IS_EMAIL):t.changeUserType(u.AUTH_LOGIN_USER_TYPE_IS_INVALID)},sendSmsCode:function(){var e=this;e.state.hasSendSmsCode||e.getFlux().actions.auth.sendCode(e.refs.username.value,function(t,n){return t?e.setState({errorMsg:t}):(e.loginType=u.AUTH_LOGIN_TYPE_IS_CODE,e.setState({hasSendSmsCode:!0,errorMsg:""}),void e.timerCuntdown())})},timerCuntdown:function(){var e=this,t=59;e.timer=null,e.timer=setInterval(function(){0==t?(e.setState({hasSendSmsCode:!1}),clearInterval(e.timer),e.timer=null):e.setState({cuntdownTime:t--})},1e3)},componentWillUnmount:function(){var e=this;clearInterval(e.timer)},componentDidMount:function(){this.getFlux().actions.me.get();var e=this.refs.username;o(e.value)||e.focus()},render:function(){var e=this,t=c({"form-group":!0,captcha:!0,active:e.state.isShowCaptcha});return a.createElement("form",{onSubmit:this.handleSubmit},a.createElement("div",{className:"form-group"},a.createElement("input",{type:"text",className:"form-control",onChange:this.onUserNameChange,placeholder:"输入手机号/邮箱",ref:"username"}),1==this.state.userType?a.createElement(h,{hasSendSmsCode:this.state.hasSendSmsCode,cuntdownTime:this.state.cuntdownTime,onClick:this.sendSmsCode}):"",a.createElement("div",{className:"input-bg"})),a.createElement("div",{className:"form-group"},a.createElement("input",{type:"password",className:"form-control",placeholder:"输入密码/验证码",ref:"pwd"}),a.createElement("div",{className:"input-bg"})),a.createElement("div",{className:t},a.createElement("input",{type:"text",className:"form-control code",placeholder:"图形验证码",ref:"code"}),a.createElement("img",{src:e.state.captchaUrl,width:"100",height:"30",onClick:this.showCaptcha}),a.createElement("div",{className:"input-bg"})),a.createElement("span",{className:"worng-msg"},this.state.errorMsg),a.createElement("button",{type:"submit",className:"center-block submit"},"登录"))}});e.exports=p},528:function(e,t,n){"use strict";var a=n(1),r=n(2).redirect,s=n(15),o=n(5),i=n(22),c=n(8),l=n(6).StoreWatchMixin,m=function(){return i(o.COOKIE_IGNORE_MQQBROWSER)===o.COOKIE_IGNORE_MQQBROWSER_IS_ALL},u=a.createClass({displayName:"MQQBrowserForm",mixins:[c,l("AuthStore")],getStateFromFlux:function(){var e=this.getFlux().store("AuthStore");return{isLogged:e.getStatus()}},componentDidMount:function(){this.getFlux().actions.me.get()},componentDidUpdate:function(){m()||i(o.COOKIE_DEBUG)||this.handleConnect()},handleConnect:function(){var e=window.location,t="/act/connect/m-qq-browser?url="+encodeURIComponent(e.href);r(t)},render:function(){var e=this.state.isLogged===!1;return i(o.COOKIE_DEBUG)?a.createElement("article",{className:"login-debug"},a.createElement(s,{onClick:this.handleConnect},"再次连接登录")):m()?e?a.createElement("article",{className:"m-qq-browser-form"},a.createElement(s,{onClick:this.handleConnect},"再次连接登录"),a.createElement("p",null,"QQ浏览器授权信息已过期")):a.createElement("article",{className:"m-qq-browser-form"},a.createElement(s,{onClick:this.handleConnect,disabled:!0},"正在同步登录数据...")):a.createElement("div",null)}});e.exports=u},529:function(e,t,n){"use strict";var a=n(1),r=n(22),s=(n(11),n(2).redirect),o=n(15),i=n(5),c=n(8),l=n(6).StoreWatchMixin,m=a.createClass({displayName:"QQForm",mixins:[c,l("AuthStore")],getStateFromFlux:function(){var e=this.getFlux().store("AuthStore");return{isLogged:e.getStatus()}},componentDidMount:function(){this.getFlux().actions.me.get()},handleConnect:function(){var e=window.location,t="/act/connect/qq?url="+encodeURIComponent(e.href);s(t)},render:function(){var e=this.state.isLogged===!1;return r(i.COOKIE_DEBUG)?a.createElement("article",{className:"login-debug"},a.createElement(o,{onClick:this.handleConnect},"再次连接登录")):e?a.createElement("article",{className:"wechat-form"},a.createElement("p",null,a.createElement("img",{src:n(165),alt:"qq",width:"44"})),a.createElement(o,{onClick:this.handleConnect},"再次连接登录"),a.createElement("p",null,"QQ授权信息已过期")):a.createElement("article",{className:"wechat-form"},a.createElement("p",null,a.createElement("img",{src:n(165),alt:"qq",width:"44"})),a.createElement(o,{onClick:this.handleConnect,disabled:!0},"正在连接登录..."))}});e.exports=m},530:function(e,t,n){"use strict";var a=n(1),r=n(22),s=(n(11),n(2).redirect),o=n(15),i=n(5),c=n(8),l=n(6).StoreWatchMixin,m=a.createClass({displayName:"WechatForm",mixins:[c,l("AuthStore")],getStateFromFlux:function(){var e=this.getFlux().store("AuthStore");return{isLogged:e.getStatus()}},componentDidMount:function(){this.getFlux().actions.me.get()},handleConnect:function(){var e=window.location,t="/act/connect/wechat?url="+encodeURIComponent(e.href);s(t)},render:function(){var e=this.state.isLogged===!1;return r(i.COOKIE_DEBUG)?a.createElement("article",{className:"login-debug"},a.createElement(o,{onClick:this.handleConnect},"再次连接微信登录")):e?a.createElement("article",{className:"wechat-form"},a.createElement("p",null,a.createElement("img",{src:n(166),alt:"微信",width:"44"})),a.createElement(o,{onClick:this.handleConnect},"再次连接微信登录"),a.createElement("p",null,"微信授权信息已过期")):a.createElement("article",{className:"wechat-form"},a.createElement("p",null,a.createElement("img",{src:n(166),alt:"微信",width:"44"})),a.createElement(o,{onClick:this.handleConnect,disabled:!0},"正在连接微信登录..."))}});e.exports=m}});