(function(n){function e(e){for(var a,r,c=e[0],l=e[1],d=e[2],b=0,f=[];b<c.length;b++)r=c[b],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&f.push(o[r][0]),o[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(n[a]=l[a]);s&&s(e);while(f.length)f.shift()();return i.push.apply(i,d||[]),t()}function t(){for(var n,e=0;e<i.length;e++){for(var t=i[e],a=!0,c=1;c<t.length;c++){var l=t[c];0!==o[l]&&(a=!1)}a&&(i.splice(e--,1),n=r(r.s=t[0]))}return n}var a={},o={app:0},i=[];function r(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}r.m=n,r.c=a,r.d=function(n,e,t){r.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},r.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.t=function(n,e){if(1&e&&(n=r(n)),8&e)return n;if(4&e&&"object"===typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var a in n)r.d(t,a,function(e){return n[e]}.bind(null,a));return t},r.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return r.d(e,"a",e),e},r.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},r.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var d=0;d<c.length;d++)e(c[d]);var s=l;i.push([0,"chunk-vendors"]),t()})({0:function(n,e,t){n.exports=t("56d7")},"2e6c":function(n,e,t){e=n.exports=t("2350")(!1),e.push([n.i,"\n.main[data-v-50acb451] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n          justify-content: flex-start;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n          align-items: flex-start;\n  background-color: #f7f8fa;\n  overflow: hidden;\n}\n.nav[data-v-50acb451] {\n  width: 2.77778rem;\n  height: 100%;\n  background-color: white;\n  font-size: 0.09722rem;\n  color: #1a1a1a;\n  text-align: center;\n  overflow-y: auto;\n}\n.nav__card[data-v-50acb451] {\n  line-height: 0.55556rem;\n}\n.body[data-v-50acb451] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n          justify-content: flex-start;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  margin: 0;\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  background-color: white;\n}\n.body__header[data-v-50acb451] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n          justify-content: flex-start;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n          align-items: flex-start;\n  background-color: white;\n  width: 100%;\n}\n.body__header__overview[data-v-50acb451] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: space-evenly;\n  -webkit-justify-content: space-evenly;\n          justify-content: space-evenly;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n          align-items: flex-start;\n  margin: 0 0 0.06944rem 0.13889rem;\n  padding: 0.13889rem;\n  width: 5.55556rem;\n  height: 1.04167rem;\n  background-color: white;\n  border-radius: 0.06944rem;\n  box-shadow: 0 0 0.03472rem 0.03472rem #f5f6fa;\n  font-size: 0.15278rem;\n}\n.body__header__calendar[data-v-50acb451] {\n  margin: 0.13889rem;\n  min-width: 2.77778rem;\n  height: 2.08333rem;\n  box-shadow: 0 0 0.03472rem 0.03472rem #f5f6fa;\n}\n.body__content[data-v-50acb451] {\n  width: 100%;\n  background-color: white;\n}\n.body__content__title[data-v-50acb451] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  margin: 0 0.13889rem;\n  height: 0.55556rem;\n  color: #333;\n  font-size: 0.19444rem;\n  font-weight: 600;\n  background-color: white;\n}\n.body__content__title__icon[data-v-50acb451] {\n  margin-left: 0.13889rem;\n}\n.body__content__subtitle[data-v-50acb451] {\n  height: 0.20833rem;\n  font-size: 0.08333rem;\n  font-weight: 400;\n  color: #666;\n  border: unset;\n}\n.body__content__work[data-v-50acb451] {\n  margin: 0 0.13889rem 0.13889rem 0.13889rem;\n  padding: 0.13889rem;\n  background-color: white;\n  font-size: 0.11111rem;\n  border-radius: 0.06944rem;\n  box-shadow: 0 0 0.03472rem 0.03472rem #f5f6fa;\n}\n.body__content__work__date[data-v-50acb451] {\n  margin: 0.13889rem 0 0 0;\n  font-size: 0.08333rem;\n  color: #cccccc;\n}\n#copy-input[data-v-50acb451] {\n  position: absolute;\n  left: -6.94444rem;\n  z-index: -1000;\n}\n[data-v-50acb451] .van-sidebar-item {\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  box-sizing: border-box;\n  margin: 0.13889rem;\n  padding: 0.13889rem 0.08333rem;\n  overflow: hidden;\n  color: #323233;\n  font-size: 0.09722rem;\n  height: 0.69444rem;\n  text-align: center;\n  cursor: pointer;\n  -webkit-user-select: none;\n  user-select: none;\n  background-color: #fff;\n  border-radius: 0.06944rem;\n}\n[data-v-50acb451] .van-sidebar-item--select {\n  background-color: #1e80ff1a;\n}\n[data-v-50acb451] .van-sidebar-item--select:active {\n  background-color: #1e80ff1a;\n}\n[data-v-50acb451] .van-sidebar-item--select::before {\n  position: absolute;\n  top: 50%;\n  left: 0;\n  width: 0.03472rem;\n  height: 0.13889rem;\n  background-color: unset;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%);\n  content: '';\n}\n",""])},"56d7":function(n,e,t){"use strict";t.r(e);t("96cf");var a=t("3b8d"),o=(t("551c"),t("20d6"),t("6762"),t("2fdb"),t("2b0e")),i=(t("ac6a"),t("75fc")),r=o["a"].extend({name:"App",data:function(){return{calendars:[],calendarEventInfo:"",activeKey:0}},created:function(){var n=this;J2C.getCalendars({},(function(e){var t;console.log(e),(t=n.calendars).push.apply(t,Object(i["a"])(e.data)),n.handleCalendarCardClick(0)}))},methods:{handleCalendarCardClick:function(n){var e=this;console.log(this.calendars[n]),J2C.getCalendarEvent({id:this.calendars[n].id},(function(n){console.log(n),e.calendarEventInfo=n.data}))},handleSidebarClick:function(){},handleWebViewReload:function(){J2C.webViewReload()},printInfo:function(n){var e=[];"toady"===n&&this.calendarEventInfo.todayData.forEach((function(n,t){var a="".concat(t+1,". ").concat(n.title);e.push(a)})),"week"===n&&this.calendarEventInfo.data.forEach((function(n,t){var a="".concat(t+1,". ").concat(n.title);e.push(a)})),console.log(e);var t=e.join("\n");console.log(t)}}}),c=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{attrs:{id:"app"}},[t("div",{staticClass:"main"},[t("van-sidebar",{staticClass:"nav",model:{value:n.activeKey,callback:function(e){n.activeKey=e},expression:"activeKey"}},n._l(n.calendars,(function(e,a){return t("van-sidebar-item",{key:a,attrs:{title:e.title},on:{click:n.handleCalendarCardClick}})})),1),n._v(" "),t("div",{staticClass:"body"},[t("div",{staticClass:"body__header"},[t("div",{staticClass:"body__content__title"},[n._v("\n          概览\n          "),t("van-icon",{staticClass:"body__content__title__icon",attrs:{name:"replay"},on:{click:function(e){return n.handleWebViewReload()}}})],1),n._v(" "),t("div",{staticClass:"body__header__overview"},[t("div",[n._v("项目名称："+n._s(n.calendarEventInfo.calendarName))]),n._v(" "),t("div",[n._v("日期区间："+n._s(n.calendarEventInfo.dateInterval))]),n._v(" "),t("div",[n._v("总用时："+n._s(n.calendarEventInfo.totalHour)+" h")])])]),n._v(" "),t("div",{staticClass:"body__content"},[t("div",{staticClass:"body__content__title"},[t("div",[n._v("今日工作")]),n._v(" "),t("van-button",{staticClass:"body__content__subtitle",attrs:{icon:"notes-o"},on:{click:function(e){return n.printInfo("toady")}}},[n._v("打印")])],1),n._v(" "),n._l(n.calendarEventInfo.todayData,(function(e,a){return t("div",{key:"today-"+a,staticClass:"body__content__work"},[t("div",[n._v(n._s(a+1+"."+e.title))]),n._v(" "),t("div",{staticClass:"body__content__work__date"},[n._v("\n            "+n._s(e.startDate+" 至 "+e.endDate+" 耗时 "+e.lastHour+"h")+"\n          ")])])})),n._v(" "),t("div",{staticClass:"body__content__title"},[t("div",[n._v("本周工作")]),n._v(" "),t("van-button",{staticClass:"body__content__subtitle",attrs:{icon:"notes-o"},on:{click:function(e){return n.printInfo("week")}}},[n._v("打印")])],1),n._v(" "),n._l(n.calendarEventInfo.data,(function(e,a){return t("div",{key:a,staticClass:"body__content__work"},[t("div",[n._v(n._s(a+1+"."+e.title))]),n._v(" "),t("div",{staticClass:"body__content__work__date"},[n._v("\n            "+n._s(e.startDate+" 至 "+e.endDate+" 耗时 "+e.lastHour+"h")+"\n          ")])])}))],2)])],1)])},l=[],d=t("2455");function s(n){t("6dde")}var b=!1,f=s,u="data-v-50acb451",v=null,_=Object(d["a"])(r,c,l,b,f,u,v),w=_.exports,p=(t("cadf"),t("8c4f"));o["a"].use(p["a"]);var m=[{path:"/"}],k=t("d56b");k.keys().forEach((function(n){var e=k(n);m[0].children.push(e.default)})),console.log(m);var h=new p["a"]({routes:m}),y=h,x=t("2ef0"),g=t.n(x),C=t("b970"),j=(t("833e"),t("c59a"),t("5cfb"),t("3a34")),O=t.n(j);function E(){return I.apply(this,arguments)}function I(){return I=Object(a["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:new o["a"]({router:y,render:function(n){return n(w)}}).$mount("#app");case 1:case"end":return n.stop()}}),n)}))),I.apply(this,arguments)}o["a"].use(g.a),o["a"].use(C["a"]),o["a"].config.productionTip=!1,new O.a,o["a"].config.productionTip=!1,E().then((function(){}))},"6dde":function(n,e,t){var a=t("2e6c");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var o=t("499e").default;o("ded2cac4",a,!0,{})},d56b:function(n,e){function t(n){var e=new Error("Cannot find module '"+n+"'");throw e.code="MODULE_NOT_FOUND",e}t.keys=function(){return[]},t.resolve=t,n.exports=t,t.id="d56b"}});
//# sourceMappingURL=app.432a255c.js.map