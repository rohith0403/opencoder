(this.webpackJsonpopencoder=this.webpackJsonpopencoder||[]).push([[0],{207:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(25),l=a.n(c),s=a(8),o=a(29),u=a(73),i=a(74),m=a(1),d=JSON.parse(localStorage.getItem("user")),p=d?{isLoggedIn:!0,user:d}:{isLoggedIn:!1,user:null},E={},f=a(26),b=[];var v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"CREATE_USER":return[].concat(Object(f.a)(e),[n]);case"GET_USER":case"RETRIEVE_USERS":return n;case"UPDATE_USER":return e.map((function(e){return e.id===n.id?Object(m.a)(Object(m.a)({},e),n):e}));case"DELETE_USER":return e.filter((function(e){return e.id!==n.id}));default:return e}},g=[];var h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"CREATE_QUESTION":return[].concat(Object(f.a)(e),[n]);case"GET_QUESTION":case"RETRIEVE_QUESTIONS":return n;case"UPDATE_QUESTION":return e.map((function(e){return e.id===n.id?Object(m.a)(Object(m.a)({},e),n):e}));case"DELETE_QUESTION":return e.filter((function(e){return e.id!==n.id}));default:return e}},O=Object(o.combineReducers)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"REGISTER_SUCCESS":case"REGISTER_FAIL":return Object(m.a)(Object(m.a)({},e),{},{isLoggedIn:!1});case"LOGIN_SUCCESS":return Object(m.a)(Object(m.a)({},e),{},{isLoggedIn:!0,user:n.user});case"LOGIN_FAIL":case"LOGOUT":return Object(m.a)(Object(m.a)({},e),{},{isLoggedIn:!1,user:null});default:return e}},message:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"SET_MESSAGE":return{message:n};case"CLEAR_MESSAGE":return{message:""};default:return e}},users:v,questions:h}),N=[i.a],j=Object(o.createStore)(O,{},Object(u.composeWithDevTools)(o.applyMiddleware.apply(void 0,N))),y=(a(92),a(5)),S=a(9),C=a(12),w=(a(93),a(94),a(37)),x=a.n(w),I=a(27),k=a.n(I),U=a(38),T=a.n(U),_=a(10),R=a.n(_),P="http://192.168.1.8:8080/api/auth/",A=function(e,t,a){return R.a.post(P+"signup",{username:e,email:t,password:a})},q=function(e,t){return R.a.post(P+"signin",{username:e,password:t}).then((function(e){return e.data.accessToken&&localStorage.setItem("user",JSON.stringify(e.data)),e.data}))},L=function(){localStorage.removeItem("user")},Q=function(e){if(!e)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"This field is required!")},G=function(e){var t=Object(n.useRef)(),a=Object(n.useRef)(),c=Object(n.useState)(""),l=Object(y.a)(c,2),o=l[0],u=l[1],i=Object(n.useState)(""),m=Object(y.a)(i,2),d=m[0],p=m[1],E=Object(n.useState)(!1),f=Object(y.a)(E,2),b=f[0],v=f[1],g=Object(s.c)((function(e){return e.auth})).isLoggedIn,h=Object(s.c)((function(e){return e.message})).message,O=Object(s.b)();return g?r.a.createElement(S.a,{to:"/profile"}):r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"card card-container"},r.a.createElement("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),r.a.createElement(x.a,{onSubmit:function(n){n.preventDefault(),v(!0),t.current.validateAll(),0===a.current.context._errors.length?O(function(e,t){return function(a){return q(e,t).then((function(e){return a({type:"LOGIN_SUCCESS",payload:{user:e}}),Promise.resolve()}),(function(e){var t=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();return a({type:"LOGIN_FAIL"}),a({type:"SET_MESSAGE",payload:t}),Promise.reject()}))}}(o,d)).then((function(){e.history.push("/profile"),window.location.reload()})).catch((function(){v(!1)})):v(!1)},ref:t},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"username"},"Username"),r.a.createElement(k.a,{type:"text",className:"form-control",name:"username",value:o,onChange:function(e){var t=e.target.value;u(t)},validations:[Q]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement(k.a,{type:"password",className:"form-control",name:"password",value:d,onChange:function(e){var t=e.target.value;p(t)},validations:[Q]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-primary btn-block",disabled:b},b&&r.a.createElement("span",{className:"spinner-border spinner-border-sm"}),r.a.createElement("span",null,"Login"))),h&&r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{className:"alert alert-danger",role:"alert"},h)),r.a.createElement(T.a,{style:{display:"none"},ref:a}))))},D=a(76),F=function(e){if(!e)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"This field is required!")},M=function(e){if(!Object(D.isEmail)(e))return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"This is not a valid email.")},B=function(e){if(e.length<3||e.length>20)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"The username must be between 3 and 20 characters.")},H=function(e){if(e.length<6||e.length>40)return r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"The password must be between 6 and 40 characters.")},J=function(){var e=Object(n.useRef)(),t=Object(n.useRef)(),a=Object(n.useState)(""),c=Object(y.a)(a,2),l=c[0],o=c[1],u=Object(n.useState)(""),i=Object(y.a)(u,2),m=i[0],d=i[1],p=Object(n.useState)(""),E=Object(y.a)(p,2),f=E[0],b=E[1],v=Object(n.useState)(!1),g=Object(y.a)(v,2),h=g[0],O=g[1],N=Object(s.c)((function(e){return e.message})).message,j=Object(s.b)();return r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"card card-container"},r.a.createElement("img",{src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",alt:"profile-img",className:"profile-img-card"}),r.a.createElement(x.a,{onSubmit:function(a){a.preventDefault(),O(!1),e.current.validateAll(),0===t.current.context._errors.length&&j(function(e,t,a){return function(n){return A(e,t,a).then((function(e){return n({type:"REGISTER_SUCCESS"}),n({type:"SET_MESSAGE",payload:e.data.message}),Promise.resolve()}),(function(e){var t=e.response&&e.response.data&&e.response.data.message||e.message||e.toString();return n({type:"REGISTER_FAIL"}),n({type:"SET_MESSAGE",payload:t}),Promise.reject()}))}}(l,m,f)).then((function(){O(!0)})).catch((function(){O(!1)}))},ref:e},!h&&r.a.createElement("div",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"username"},"Username"),r.a.createElement(k.a,{type:"text",className:"form-control",name:"username",value:l,onChange:function(e){var t=e.target.value;o(t)},validations:[F,B]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement(k.a,{type:"text",className:"form-control",name:"email",value:m,onChange:function(e){var t=e.target.value;d(t)},validations:[F,M]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement(k.a,{type:"password",className:"form-control",name:"password",value:f,onChange:function(e){var t=e.target.value;b(t)},validations:[F,H]})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{className:"btn btn-primary btn-block"},"Sign Up"))),N&&r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{className:h?"alert alert-success":"alert alert-danger",role:"alert"},N)),r.a.createElement(T.a,{style:{display:"none"},ref:t}))))};function V(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.accessToken?{"x-access-token":e.accessToken}:{}}var Y,W="http://192.168.1.8:8080/api/test/",X={getPublicContent:function(){return R.a.get(W+"all")},createUser:function(e){return R.a.post(W+"users",e,{headers:V()})},updateUser:function(e,t){return R.a.put(W+"users/".concat(e),t,{headers:V()})},getUser:function(e){return R.a.get(W+"users/".concat(e),{headers:V()})},getAllusers:function(){return R.a.get(W+"users",{headers:V()})},deleteUser:function(e){return R.a.delete(W+"users/".concat(e),{headers:V()})},findByUsername:function(e){return R.a.get(W+"users?username=".concat(e),{headers:V()})}},z=function(){var e=Object(n.useState)(""),t=Object(y.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){X.getPublicContent().then((function(e){c(e.data)}),(function(e){var t=e.response&&e.response.data||e.message||e.toString();c(t)}))}),[]),r.a.createElement("div",{className:"container"},r.a.createElement("header",{className:"jumbotron"},r.a.createElement("h3",null,a)))},K=function(){var e=Object(s.c)((function(e){return e.auth})).user;return e?r.a.createElement("div",{className:"container"},r.a.createElement("header",{className:"jumbotron"},r.a.createElement("h3",null,r.a.createElement("strong",null,e.username)," Profile")),r.a.createElement("p",null,r.a.createElement("strong",null,"Token:")," ",e.accessToken.substring(0,20)," ..."," ",e.accessToken.substr(e.accessToken.length-20)),r.a.createElement("p",null,r.a.createElement("strong",null,"Id:")," ",e.id),r.a.createElement("p",null,r.a.createElement("strong",null,"Email:")," ",e.email),r.a.createElement("strong",null,"Authorities:"),r.a.createElement("ul",null,e.roles&&e.roles.map((function(e,t){return r.a.createElement("li",{key:t},e)})))):r.a.createElement(S.a,{to:"/login"})},Z=a(7),$=a.n(Z),ee=a(13),te=a(21),ae=a(213),ne=function(){var e={id:null,username:"",email:"",password:"",roles:[],submitted:!1},t=Object(n.useState)(e),a=Object(y.a)(t,2),c=a[0],l=a[1],o=Object(n.useState)(!1),u=Object(y.a)(o,2),i=u[0],d=u[1],p=Object(s.b)(),E=function(e){var t=e.target,a=t.name,n=t.value;l(Object(m.a)(Object(m.a)({},c),{},Object(te.a)({},a,n)))},f=function(){var e=Object(ee.a)($.a.mark((function e(t){var a;return $.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[t],e.next=3,l(Object(m.a)(Object(m.a)({},c),{},{roles:a}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"submit-form"},i?r.a.createElement("div",null,r.a.createElement("h4",null,"You submitted successfully!"),r.a.createElement("button",{className:"btn btn-success",onClick:function(){l(e),d(!1)}},"Add")):r.a.createElement("div",null,r.a.createElement("div",{className:"dropdown",id:"roleDropdown"},r.a.createElement(ae.a,null,r.a.createElement(ae.a.Toggle,{variant:"success",id:"roles",value:c.roles,onChange:E,name:"roles"},"Roles"),r.a.createElement(ae.a.Menu,null,r.a.createElement(ae.a.Item,{href:"#",onClick:function(){f("admin")}},"admin"),r.a.createElement(ae.a.Item,{href:"#",onClick:function(){f("professor")}},"professor"),r.a.createElement(ae.a.Item,{href:"#",onClick:function(){f("student")}},"student")))),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"username"},"Username"),r.a.createElement("input",{type:"text",className:"form-control",id:"username",required:!0,value:c.username,onChange:E,name:"username"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("input",{type:"text",className:"form-control",id:"email",required:!0,value:c.email,onChange:E,name:"email"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"text",className:"form-control",id:"password",required:!0,value:c.password,onChange:E,name:"password"})),r.a.createElement("button",{onClick:function(){var e=c.username,t=c.email,a=c.password,n=c.roles;p(function(e,t,a,n){return function(){var r=Object(ee.a)($.a.mark((function r(c){var l,s;return $.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,l={username:e,email:t,password:a,roles:n},r.next=4,X.createUser(l);case 4:return s=r.sent,c({type:"CREATE_USER",payload:s.data}),r.abrupt("return",Promise.resolve(s.data));case 9:return r.prev=9,r.t0=r.catch(0),r.abrupt("return",Promise.reject(r.t0));case 12:case"end":return r.stop()}}),r,null,[[0,9]])})));return function(e){return r.apply(this,arguments)}}()}(e,t,a,n)).then((function(e){l({username:e.username,email:e.email,password:e.password,roles:e.roles}),d(!0),console.log(e)})).catch((function(e){console.log(e)}))},className:"btn btn-success"},"Submit")))},re=function(e){var t=Object(n.useState)({id:null,username:"",email:"",password:""}),a=Object(y.a)(t,2),c=a[0],l=a[1],o=Object(n.useState)(""),u=Object(y.a)(o,2),i=u[0],d=u[1],p=Object(s.c)((function(e){return e.users})),E=Object(s.b)();Object(n.useEffect)((function(){var t;t=e.match.params.id,0!==p.length?(console.log(p),p.filter((function(e){return e._id===t})),l(p.filter((function(e){return e._id===t}))[0])):X.getUser(t).then((function(e){l(e.data),console.log(e.data)})).catch((function(e){console.log(e)}))}),[e.match.params.id]);var f=function(e){var t=e.target,a=t.name,n=t.value;l(Object(m.a)(Object(m.a)({},c),{},Object(te.a)({},a,n)))};return r.a.createElement("div",null,c?r.a.createElement("div",{className:"edit-form"},r.a.createElement("h4",null,"User"),r.a.createElement("form",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"username"},"Username"),r.a.createElement("input",{type:"text",className:"form-control",id:"username",value:c.username,onChange:f,name:"username"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("input",{type:"text",className:"form-control",id:"email",value:c.email,onChange:f,name:"email"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"text",className:"form-control",id:"password",value:c.password,onChange:f,name:"password"}))),r.a.createElement("button",{className:"badge badge-danger mr-2",onClick:function(){var t;E((t=c._id,function(){var e=Object(ee.a)($.a.mark((function e(a){return $.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,X.deleteUser(t);case 3:a({type:"DELETE_USER",payload:{id:t}}),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}())).then((function(){e.history.push("/users")})).catch((function(e){console.log(e)}))}},"Delete"),r.a.createElement("button",{type:"submit",className:"badge badge-success",onClick:function(){var e,t;E((e=c._id,t=c,function(){var a=Object(ee.a)($.a.mark((function a(n){var r;return $.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,X.updateUser(e,t);case 3:return r=a.sent,n({type:"UPDATE_USER",payload:t}),a.abrupt("return",Promise.resolve(r.data));case 8:return a.prev=8,a.t0=a.catch(0),a.abrupt("return",Promise.reject(a.t0));case 11:case"end":return a.stop()}}),a,null,[[0,8]])})));return function(e){return a.apply(this,arguments)}}())).then((function(e){console.log(e),d("The user was updated successfully!")})).catch((function(e){console.log(e)}))}},"Update"),r.a.createElement("p",null,i)):r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("p",null,"Please click on a User...")))},ce=a(212),le=function(){var e=Object(n.useState)(null),t=Object(y.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(-1),o=Object(y.a)(l,2),u=o[0],i=o[1],m=Object(n.useState)(""),d=Object(y.a)(m,2),p=d[0],E=d[1],f=Object(s.c)((function(e){return e.users})),b=Object(s.b)();Object(n.useEffect)((function(){b(function(){var e=Object(ee.a)($.a.mark((function e(t){var a;return $.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,X.getAllusers();case 3:a=e.sent,t({type:"RETRIEVE_USERS",payload:a.data}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}())}),[]);return r.a.createElement("div",{className:"list row"},r.a.createElement("div",{className:"col-md-8"},r.a.createElement("div",{className:"input-group mb-3"},r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Search by username",value:p,onChange:function(e){var t=e.target.value;E(t)}}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{className:"btn btn-outline-secondary",type:"button",onClick:function(){var e;c(null),i(-1),b((e=p,function(){var t=Object(ee.a)($.a.mark((function t(a){var n;return $.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,X.findByUsername(e);case 3:n=t.sent,a({type:"RETRIEVE_USERS",payload:n.data}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()))}},"Search")))),r.a.createElement("div",{className:"col-md-6"},r.a.createElement("h4",null,"Users List"),r.a.createElement("ul",{className:"list-group"},f&&f.map((function(e,t){return r.a.createElement("li",{className:"list-group-item "+(t===u?"active":""),onClick:function(){return function(e,t){c(e),i(t)}(e,t)},key:t},e.username)})))),r.a.createElement("div",{className:"col-md-6"},a?r.a.createElement("div",null,r.a.createElement("h4",null,"User"),r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("strong",null,"Username:"))," ",a.username),r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("strong",null,"Email:"))," ",a.email),r.a.createElement(C.a,{to:"/users/"+a._id,className:"badge badge-warning"},r.a.createElement(ce.a,{bg:"warning",text:"dark"},"Edit")," ")):r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("p",null,"Please click on a User..."))))},se="http://192.168.1.8:8080/api/test/",oe={createQuestion:function(e){return R.a.post(se+"questions",e,{headers:V()})},updateQuestion:function(e,t){return R.a.put(se+"questions/".concat(e),t,{headers:V()})},getQuestion:function(e){return R.a.get(se+"questions/".concat(e),{headers:V()})},getAllQuestions:function(){return R.a.get(se+"questions",{headers:V()})},deleteQuestion:function(e){return R.a.delete(se+"questions/".concat(e),{headers:V()})},findByQuestionname:function(e){return R.a.get(se+"questions?qname=".concat(e),{headers:V()})},getQuestionByProf:function(e){return R.a.get(se+"questions?userId=".concat(e),{headers:V()})}},ue=JSON.parse(localStorage.getItem("user")),ie=function(){var e={id:null,userId:ue.id,qname:"",description:"",submitted:!1},t=Object(n.useState)(e),a=Object(y.a)(t,2),c=a[0],l=a[1],o=Object(n.useState)(!1),u=Object(y.a)(o,2),i=u[0],d=u[1],p=Object(s.b)(),E=function(e){var t=e.target,a=t.name,n=t.value;l(Object(m.a)(Object(m.a)({},c),{},Object(te.a)({},a,n)))};return r.a.createElement("div",{className:"submit-form"},i?r.a.createElement("div",null,r.a.createElement("h4",null,"You submitted successfully!"),r.a.createElement("button",{className:"btn btn-success",onClick:function(){l(e),d(!1)}},"Add")):r.a.createElement("div",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"qname"},"Question Name"),r.a.createElement("input",{type:"text",className:"form-control",id:"qname",required:!0,value:c.qname,onChange:E,name:"qname"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"description"},"Question"),r.a.createElement("input",{type:"text",className:"form-control",id:"description",required:!0,value:c.description,onChange:E,name:"description"})),r.a.createElement("button",{onClick:function(){var e=c.userId,t=c.qname,a=c.description;p(function(e,t,a){return function(){var n=Object(ee.a)($.a.mark((function n(r){var c,l;return $.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,c={userId:e,qname:t,description:a},console.log(c),n.next=5,oe.createQuestion(c);case 5:return l=n.sent,r({type:"CREATE_QUESTION",payload:l.data}),n.abrupt("return",Promise.resolve(l.data));case 10:return n.prev=10,n.t0=n.catch(0),n.abrupt("return",Promise.reject(n.t0));case 13:case"end":return n.stop()}}),n,null,[[0,10]])})));return function(e){return n.apply(this,arguments)}}()}(e,t,a)).then((function(e){l({userId:ue.id,qname:e.qname,description:e.description}),d(!0),console.log(e)})).catch((function(e){console.log(e)}))},className:"btn btn-success"},"Submit")))},me=JSON.parse(localStorage.getItem("user")),de=function(){var e=Object(n.useState)(null),t=Object(y.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(-1),o=Object(y.a)(l,2),u=o[0],i=o[1],m=Object(n.useState)(""),d=Object(y.a)(m,2),p=d[0],E=d[1],f=Object(s.c)((function(e){return e.questions})),b=Object(s.b)();Object(n.useEffect)((function(){var e;b((e=me.id,function(){var t=Object(ee.a)($.a.mark((function t(a){var n;return $.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,oe.getQuestionByProf(e);case 3:n=t.sent,a({type:"RETRIEVE_QUESTIONS",payload:n.data}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()))}),[]);return r.a.createElement("div",{className:"list row"},r.a.createElement("div",{className:"col-md-8"},r.a.createElement("div",{className:"input-group mb-3"},r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Search by question name",value:p,onChange:function(e){var t=e.target.value;E(t)}}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{className:"btn btn-outline-secondary",type:"button",onClick:function(){var e;c(null),i(-1),b((e=p,function(){var t=Object(ee.a)($.a.mark((function t(a){var n;return $.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,oe.findByQuestionname(e);case 3:n=t.sent,a({type:"RETRIEVE_QUESTIONS",payload:n.data}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()))}},"Search")))),r.a.createElement("div",{className:"col-md-6"},r.a.createElement("h4",null,"Questions List"),r.a.createElement("ul",{className:"list-group"},f&&f.map((function(e,t){return r.a.createElement("li",{className:"list-group-item "+(t===u?"active":""),onClick:function(){return function(e,t){c(e),i(t)}(e,t)},key:t},e.qname)})))),r.a.createElement("div",{className:"col-md-6"},a?r.a.createElement("div",null,r.a.createElement("h4",null,"Question"),r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("strong",null,"Qusetion Name:"))," ",a.qname),r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("strong",null,"Question:"))," ",a.description),r.a.createElement(C.a,{to:"/questions/"+a._id,className:"badge badge-warning"},r.a.createElement(ce.a,{bg:"warning",text:"dark"},"Edit")," ")):r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("p",null,"Please click on a User..."))))},pe=function(e){var t=Object(n.useState)({id:null,qname:"",description:"",submitted:!1}),a=Object(y.a)(t,2),c=a[0],l=a[1],o=Object(n.useState)(""),u=Object(y.a)(o,2),i=u[0],d=u[1],p=Object(s.c)((function(e){return e.questions})),E=Object(s.b)();Object(n.useEffect)((function(){var t;t=e.match.params.id,0!==p.length?(p.filter((function(e){return e._id===t})),l(p.filter((function(e){return e._id===t}))[0])):oe.getQuestion(t).then((function(e){l(e.data),console.log(e.data)})).catch((function(e){console.log(e)}))}),[e.match.params.id]);var f=function(e){var t=e.target,a=t.name,n=t.value;l(Object(m.a)(Object(m.a)({},c),{},Object(te.a)({},a,n)))};return r.a.createElement("div",null,c?r.a.createElement("div",{className:"edit-form"},r.a.createElement("h4",null,"Question"),r.a.createElement("form",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"qname"},"Question Name"),r.a.createElement("input",{type:"text",className:"form-control",id:"qname",value:c.qname,onChange:f,name:"qname"})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"description"},"Question"),r.a.createElement("input",{type:"text",className:"form-control",id:"description",value:c.description,onChange:f,name:"description"}))),r.a.createElement("button",{className:"badge badge-danger mr-2",onClick:function(){var t;console.log(c._id),E((t=c._id,function(){var e=Object(ee.a)($.a.mark((function e(a){return $.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,oe.deleteQuestion(t);case 3:a({type:"DELETE_QUESTION",payload:{id:t}}),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}())).then((function(){e.history.push("/questions")})).catch((function(e){console.log(e)}))}},"Delete"),r.a.createElement("button",{type:"submit",className:"badge badge-success",onClick:function(){var e,t;E((e=c._id,t=c,function(){var a=Object(ee.a)($.a.mark((function a(n){var r;return $.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,oe.updateQuestion(e,t);case 3:return r=a.sent,n({type:"UPDATE_QUESTION",payload:t}),a.abrupt("return",Promise.resolve(r.data));case 8:return a.prev=8,a.t0=a.catch(0),a.abrupt("return",Promise.reject(a.t0));case 11:case"end":return a.stop()}}),a,null,[[0,8]])})));return function(e){return a.apply(this,arguments)}}())).then((function(e){console.log(e),d("The question was updated successfully!")})).catch((function(e){console.log(e)}))}},"Update"),r.a.createElement("p",null,i)):r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("p",null,"Please click on a Question...")))},Ee="#include<stdio.h>\nint main() {\n    // your Code will come here\n    return 0;\n}\n",fe="#include<bits/stdc++.h> \nusing namespace std;\n\nint main() {\n\t//your Code will come here\n\treturn 0;\n}\n",be="class test {\n    public static void main(String args[]){\n        // your Code will come here\n    }\n}\n",ve="# your code will com",ge="// Write your code here ",he=function(e,t){switch(t.type){case"DISPLAY_OUTPUT":return Object(m.a)(Object(m.a)({},e),{},{result:t.payload});case"CODE_CHANGE":return Object(m.a)(Object(m.a)({},e),{},{code:t.payload});case"PREVIOUS_INPUT":case"INPUT_CHANGE":return Object(m.a)(Object(m.a)({},e),{},{input:t.payload});case"LANG_CHANGE":if("cpp"===t.payload)return Object(m.a)(Object(m.a)({},e),{},{lang:t.payload,code:fe});if("c"===t.payload)return Object(m.a)(Object(m.a)({},e),{},{lang:t.payload,code:Ee});if("java"===t.payload)return Object(m.a)(Object(m.a)({},e),{},{lang:t.payload,code:be});if("python"===t.payload)return Object(m.a)(Object(m.a)({},e),{},{lang:t.payload,code:ve});if("javascript"===t.payload)return Object(m.a)(Object(m.a)({},e),{},{lang:t.payload,code:ge});default:return e}},Oe={code:fe,result:"Run and Submit code to see result",lang:"python",input:"Enter your input"},Ne=Object(n.createContext)(Oe),je=function(e){var t=e.children,a=Object(n.useReducer)(he,Oe),c=Object(y.a)(a,2),l=c[0],s=c[1];return r.a.createElement(Ne.Provider,{value:{code:l.code,lang:l.lang,result:l.result,input:l.input,handleCodeChange:function(e){s({type:"CODE_CHANGE",payload:e})},handleLangChange:function(e){s({type:"LANG_CHANGE",payload:e})},handleInputChange:function(e){Y=e,s({type:"INPUT_CHANGE",payload:e})},displayOutput:function(e){s({type:"DISPLAY_OUTPUT",payload:e})},download:function(){var e=document.createElement("a");console.log(l.code),e.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(l.code)),e.setAttribute("download","code.txt"),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e)},storePreviousInput:function(){console.log(Y,"this is stored"),localStorage.setItem("lastInput",Y||"")},loadPreviousInput:function(){var e=""!=localStorage.getItem("lastInput")?localStorage.getItem("lastInput"):"";s({type:"PREVIOUS_INPUT",payload:e})}}},t)},ye=a(82),Se=(a(195),a(196),a(81));var Ce=function(){var e=Object(n.useContext)(Ne).code,t=Object(n.useContext)(Ne).lang,a=Object(n.useContext)(Ne).result,c=Object(n.useContext)(Ne).handleLangChange,l=Object(n.useContext)(Ne).handleInputChange,s=Object(n.useContext)(Ne).input,o=Object(n.useContext)(Ne).displayOutput,u=Object(n.useContext)(Ne).download,i=Object(n.useContext)(Ne).loadPreviousInput,m=Object(n.useContext)(Ne).storePreviousInput,d={code:e,result:a,lang:t,input:s};return console.log(d),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"options"},r.a.createElement("div",{className:"optionsbox1"},r.a.createElement("div",{className:"btncont"},r.a.createElement("button",{className:"optionsbtn",onClick:function(e){e.preventDefault(),console.log(Ne),alert("Submit Code"),R.a.post("http://192.168.1.8:8080/api/code/submit",d).then((function(e){console.log("this is it"+JSON.stringify(e.data));var t=e.data;t.err&&(console.log("options"+d),"RangeError [ERR_CHILD_PROCESS_STDIO_MAXBUFFER]: stdout maxBuffer length exceeded"==t.output&&alert("Possible infinite loop or recurssion call"),o(t.error)),o(t.output)})).catch((function(e){console.log(e)}))}},"Run",r.a.createElement("span",{className:"btnicon"},r.a.createElement("img",{src:""}))),r.a.createElement("button",{className:"optionsbtn",onClick:u},"Download",r.a.createElement("span",{className:"btnicon"},r.a.createElement("img",{src:""}))),r.a.createElement("button",{className:"optionsbtn",onClick:m},"Store Input"),r.a.createElement("button",{className:"optionsbtn",onClick:i},"Load Input")),r.a.createElement(Se.a,{className:"select",options:[{value:"python",label:"python"},{value:"java",label:"java"},{value:"cpp",label:"cpp"},{value:"c",label:"c"}],onChange:function(e){return c(e.value)}})),r.a.createElement("div",{className:"optionsbox2"},r.a.createElement("textarea",{className:"optionswritearea",placeholder:s,onChange:function(e){l(e.target.value)}}))))};var we=function(){var e=Object(n.useContext)(Ne).result;return r.a.createElement("div",{className:"outputarea"},console.log("outputara "+e),r.a.createElement("textarea",{className:"textarea",value:e}))};var xe=function(e){e.onCodeChangeHandler;var t=Object(n.useContext)(Ne).code,a=(Object(n.useContext)(Ne).lang,Object(n.useContext)(Ne).handleCodeChange);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"codearea"},r.a.createElement(Ce,null),r.a.createElement("div",{className:"codewritearea"},r.a.createElement(ye.a,{width:"100%",height:"80vh",theme:"hc-black",value:t,options:{selectOnLineNumbers:!0,renderIndentGuides:!0,colorDecorators:!0,cursorBlinking:"blink",autoClosingQuotes:"always",find:{autoFindInSelection:"always"},snippetSuggestions:"inline"},onChange:function(e){return a(e)},editorDidMount:function(e){console.log("Editor Mounted")}})),r.a.createElement(we,null)))},Ie=a(14),ke=Object(Ie.a)(),Ue={on:function(e,t){document.addEventListener(e,(function(e){return t(e.detail)}))},dispatch:function(e,t){document.dispatchEvent(new CustomEvent(e,{detail:t}))},remove:function(e,t){document.removeEventListener(e,t)}},Te=function(){var e=Object(n.useState)(!1),t=Object(y.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(!1),o=Object(y.a)(l,2),u=o[0],i=o[1],m=Object(n.useState)(!1),d=Object(y.a)(m,2),p=d[0],E=d[1],f=Object(s.c)((function(e){return e.auth})).user,b=Object(s.b)();Object(n.useEffect)((function(){ke.listen((function(e){b({type:"CLEAR_MESSAGE"})}))}),[b]);var v=Object(n.useCallback)((function(){b((function(e){L(),e({type:"LOGOUT"})}))}),[b]);return Object(n.useEffect)((function(){return f?(E(f.roles.includes("ROLE_STUDENT")),c(f.roles.includes("ROLE_PROFESSOR")),i(f.roles.includes("ROLE_ADMIN"))):(c(!1),i(!1),E(!1)),Ue.on("logout",(function(){v()})),function(){Ue.remove("logout")}}),[f,v]),r.a.createElement(je,null,r.a.createElement(S.c,{history:ke},r.a.createElement("div",null,r.a.createElement("nav",{className:"navbar navbar-expand navbar-dark bg-dark"},r.a.createElement(C.a,{to:"/",className:"navbar-brand"},"Opencoder"),r.a.createElement("div",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(C.a,{to:"/home",className:"nav-link"},"Home")),a&&r.a.createElement("li",{className:"nav-item"},r.a.createElement(C.a,{to:"/addquestion",className:"nav-link"},"Add Questions")),a&&r.a.createElement("li",{className:"nav-item"},r.a.createElement(C.a,{to:"/questions",className:"nav-link"},"Questions")),p&&r.a.createElement("li",{className:"nav-item"},r.a.createElement(C.a,{to:"/editor",className:"nav-link"},"Editor")),u&&r.a.createElement("li",{className:"nav-item"},r.a.createElement(C.a,{to:"/adduser",className:"nav-link"},"Add User")),u&&r.a.createElement("li",{className:"nav-item"},r.a.createElement(C.a,{to:"/users",className:"nav-link"},"Users"))),f?r.a.createElement("div",{className:"navbar-nav ms-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(C.a,{to:"/profile",className:"nav-link"},f.username)),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{href:"/login",className:"nav-link",onClick:v},"LogOut"))):r.a.createElement("div",{className:"navbar-nav ms-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(C.a,{to:"/login",className:"nav-link"},"Login")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(C.a,{to:"/register",className:"nav-link"},"Sign Up")))),r.a.createElement("div",{className:"container mt-3"},r.a.createElement(S.d,null,r.a.createElement(S.b,{exact:!0,path:["/","/home"],component:z}),r.a.createElement(S.b,{exact:!0,path:"/login",component:G}),r.a.createElement(S.b,{exact:!0,path:"/register",component:J}),r.a.createElement(S.b,{exact:!0,path:"/profile",component:K}),r.a.createElement(S.b,{path:"/addquestion",component:ie}),r.a.createElement(S.b,{path:"/adduser",component:ne}),r.a.createElement(S.b,{path:"/users/:id",component:re}),r.a.createElement(S.b,{path:"/users",component:le}),r.a.createElement(S.b,{path:"/editor",component:xe}),r.a.createElement(S.b,{path:"/questions/:id",component:pe}),r.a.createElement(S.b,{path:"/questions",component:de}))))))};l.a.render(r.a.createElement(s.a,{store:j},r.a.createElement(Te,null)),document.getElementById("root"))},84:function(e,t,a){e.exports=a(207)},92:function(e,t,a){},94:function(e,t,a){}},[[84,1,2]]]);
//# sourceMappingURL=main.97a6223d.chunk.js.map