(this["webpackJsonp@edgewize/flask-dashboard"]=this["webpackJsonp@edgewize/flask-dashboard"]||[]).push([[8],{518:function(e,a,t){"use strict";function s(e,a){if(null==e)return{};var t,s,l=function(e,a){if(null==e)return{};var t,s,l={},c=Object.keys(e);for(s=0;s<c.length;s++)t=c[s],a.indexOf(t)>=0||(l[t]=e[t]);return l}(e,a);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(s=0;s<c.length;s++)t=c[s],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}t.d(a,"a",(function(){return s}))},551:function(e,a,t){"use strict";function s(){var e=this.constructor.getDerivedStateFromProps(this.props,this.state);null!==e&&void 0!==e&&this.setState(e)}function l(e){this.setState(function(a){var t=this.constructor.getDerivedStateFromProps(e,a);return null!==t&&void 0!==t?t:null}.bind(this))}function c(e,a){try{var t=this.props,s=this.state;this.props=e,this.state=a,this.__reactInternalSnapshotFlag=!0,this.__reactInternalSnapshot=this.getSnapshotBeforeUpdate(t,s)}finally{this.props=t,this.state=s}}function r(e){var a=e.prototype;if(!a||!a.isReactComponent)throw new Error("Can only polyfill class components");if("function"!==typeof e.getDerivedStateFromProps&&"function"!==typeof a.getSnapshotBeforeUpdate)return e;var t=null,r=null,m=null;if("function"===typeof a.componentWillMount?t="componentWillMount":"function"===typeof a.UNSAFE_componentWillMount&&(t="UNSAFE_componentWillMount"),"function"===typeof a.componentWillReceiveProps?r="componentWillReceiveProps":"function"===typeof a.UNSAFE_componentWillReceiveProps&&(r="UNSAFE_componentWillReceiveProps"),"function"===typeof a.componentWillUpdate?m="componentWillUpdate":"function"===typeof a.UNSAFE_componentWillUpdate&&(m="UNSAFE_componentWillUpdate"),null!==t||null!==r||null!==m){var n=e.displayName||e.name,i="function"===typeof e.getDerivedStateFromProps?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";throw Error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n"+n+" uses "+i+" but also contains the following legacy lifecycles:"+(null!==t?"\n  "+t:"")+(null!==r?"\n  "+r:"")+(null!==m?"\n  "+m:"")+"\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks")}if("function"===typeof e.getDerivedStateFromProps&&(a.componentWillMount=s,a.componentWillReceiveProps=l),"function"===typeof a.getSnapshotBeforeUpdate){if("function"!==typeof a.componentDidUpdate)throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");a.componentWillUpdate=c;var o=a.componentDidUpdate;a.componentDidUpdate=function(e,a,t){var s=this.__reactInternalSnapshotFlag?this.__reactInternalSnapshot:t;o.call(this,e,a,s)}}return e}t.d(a,"a",(function(){return r})),s.__suppressDeprecationWarning=!0,l.__suppressDeprecationWarning=!0,c.__suppressDeprecationWarning=!0},659:function(e,a,t){"use strict";t.r(a);var s=t(518),l=t(151),c=t(152),r=t(156),m=t(154),n=t(153),i=t(2),o=t.n(i),d=t(649),u=t(647),p=t(648),g=t(18),v=t(41),E=t(551),N=t(61),b=t.n(N),f=t(489),h=t.n(f),x=o.a.createContext({}),y=t(490),j={tag:y.e,activeTab:b.a.any,className:b.a.string,cssModule:b.a.object},O=function(e){function a(a){var t;return(t=e.call(this,a)||this).state={activeTab:t.props.activeTab},t}return Object(v.a)(a,e),a.getDerivedStateFromProps=function(e,a){return a.activeTab!==e.activeTab?{activeTab:e.activeTab}:null},a.prototype.render=function(){var e=this.props,a=e.className,t=e.cssModule,s=e.tag,l=Object(y.d)(this.props,Object.keys(j)),c=Object(y.c)(h()("tab-content",a),t);return o.a.createElement(x.Provider,{value:{activeTabId:this.state.activeTab}},o.a.createElement(s,Object(g.a)({},l,{className:c})))},a}(i.Component);Object(E.a)(O);var S=O;O.propTypes=j,O.defaultProps={tag:"div"};var P=t(49),k={tag:y.e,className:b.a.string,cssModule:b.a.object,tabId:b.a.any};function w(e){var a=e.className,t=e.cssModule,s=e.tabId,l=e.tag,c=Object(P.a)(e,["className","cssModule","tabId","tag"]),r=function(e){return Object(y.c)(h()("tab-pane",a,{active:s===e}),t)};return o.a.createElement(x.Consumer,null,(function(e){var a=e.activeTabId;return o.a.createElement(l,Object(g.a)({},c,{className:r(a)}))}))}w.propTypes=k,w.defaultProps={tag:"div"};var T={tag:y.e,flush:b.a.bool,className:b.a.string,cssModule:b.a.object,horizontal:b.a.oneOfType([b.a.bool,b.a.string])},M=function(e){var a=e.className,t=e.cssModule,s=e.tag,l=e.flush,c=e.horizontal,r=Object(P.a)(e,["className","cssModule","tag","flush","horizontal"]),m=Object(y.c)(h()(a,"list-group",l?"list-group-flush":function(e){return!1!==e&&(!0===e||"xs"===e?"list-group-horizontal":"list-group-horizontal-"+e)}(c)),t);return o.a.createElement(s,Object(g.a)({},r,{className:m}))};M.propTypes=T,M.defaultProps={tag:"ul",horizontal:!1};var U=M,z={tag:y.e,active:b.a.bool,disabled:b.a.bool,color:b.a.string,action:b.a.bool,className:b.a.any,cssModule:b.a.object},C=function(e){e.preventDefault()},L=function(e){var a=e.className,t=e.cssModule,s=e.tag,l=e.active,c=e.disabled,r=e.action,m=e.color,n=Object(P.a)(e,["className","cssModule","tag","active","disabled","action","color"]),i=Object(y.c)(h()(a,!!l&&"active",!!c&&"disabled",!!r&&"list-group-item-action",!!m&&"list-group-item-"+m,"list-group-item"),t);return c&&(n.onClick=C),o.a.createElement(s,Object(g.a)({},n,{className:i}))};L.propTypes=z,L.defaultProps={tag:"li"};var _=L,W={children:b.a.node,bar:b.a.bool,multi:b.a.bool,tag:y.e,value:b.a.oneOfType([b.a.string,b.a.number]),max:b.a.oneOfType([b.a.string,b.a.number]),animated:b.a.bool,striped:b.a.bool,color:b.a.string,className:b.a.string,barClassName:b.a.string,cssModule:b.a.object},D=function(e){var a=e.children,t=e.className,s=e.barClassName,l=e.cssModule,c=e.value,r=e.max,m=e.animated,n=e.striped,i=e.color,d=e.bar,u=e.multi,p=e.tag,v=Object(P.a)(e,["children","className","barClassName","cssModule","value","max","animated","striped","color","bar","multi","tag"]),E=Object(y.f)(c)/Object(y.f)(r)*100,N=Object(y.c)(h()(t,"progress"),l),b=Object(y.c)(h()("progress-bar",d&&t||s,m?"progress-bar-animated":null,i?"bg-"+i:null,n||m?"progress-bar-striped":null),l),f=u?a:o.a.createElement("div",{className:b,style:{width:E+"%"},role:"progressbar","aria-valuenow":c,"aria-valuemin":"0","aria-valuemax":r,children:a});return d?f:o.a.createElement(p,Object(g.a)({},v,{className:N,children:f}))};D.propTypes=W,D.defaultProps={tag:"div",value:0,max:100};var F=D,I=t(540),A=function(e){Object(m.a)(t,e);var a=Object(n.a)(t);function t(e){var s;return Object(l.a)(this,t),(s=a.call(this,e)).toggle=s.toggle.bind(Object(r.a)(s)),s.state={activeTab:"1"},s}return Object(c.a)(t,[{key:"toggle",value:function(e){this.state.activeTab!==e&&this.setState({activeTab:e})}},{key:"render",value:function(){var e=this,a=this.props;a.children,Object(s.a)(a,["children"]);return o.a.createElement(o.a.Fragment,null,o.a.createElement(d.a,{tabs:!0},o.a.createElement(u.a,null,o.a.createElement(p.a,{className:h()({active:"1"===this.state.activeTab}),onClick:function(){e.toggle("1")}},o.a.createElement("i",{className:"icon-list"}))),o.a.createElement(u.a,null,o.a.createElement(p.a,{className:h()({active:"2"===this.state.activeTab}),onClick:function(){e.toggle("2")}},o.a.createElement("i",{className:"icon-speech"}))),o.a.createElement(u.a,null,o.a.createElement(p.a,{className:h()({active:"3"===this.state.activeTab}),onClick:function(){e.toggle("3")}},o.a.createElement("i",{className:"icon-settings"})))),o.a.createElement(S,{activeTab:this.state.activeTab},o.a.createElement(w,{tabId:"1"},o.a.createElement(U,{className:"list-group-accent",tag:"div"},o.a.createElement(_,{className:"list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small"},"Today"),o.a.createElement(_,{action:!0,tag:"a",href:"#",className:"list-group-item-accent-warning list-group-item-divider"},o.a.createElement("div",{className:"avatar float-right"},o.a.createElement("img",{className:"img-avatar",src:"static/assets/img/avatars/7.jpg",alt:"admin@bootstrapmaster.com"})),o.a.createElement("div",null,"Meeting with ",o.a.createElement("strong",null,"Lucas")," "),o.a.createElement("small",{className:"text-muted mr-3"},o.a.createElement("i",{className:"icon-calendar"}),"\xa0 1 - 3pm"),o.a.createElement("small",{className:"text-muted"},o.a.createElement("i",{className:"icon-location-pin"})," Palo Alto, CA")),o.a.createElement(_,{action:!0,tag:"a",href:"#",className:"list-group-item-accent-info list-group-item-divider"},o.a.createElement("div",{className:"avatar float-right"},o.a.createElement("img",{className:"img-avatar",src:"static/assets/img/avatars/4.jpg",alt:"admin@bootstrapmaster.com"})),o.a.createElement("div",null,"Skype with ",o.a.createElement("strong",null,"Megan")),o.a.createElement("small",{className:"text-muted mr-3"},o.a.createElement("i",{className:"icon-calendar"}),"\xa0 4 - 5pm"),o.a.createElement("small",{className:"text-muted"},o.a.createElement("i",{className:"icon-social-skype"})," On-line")),o.a.createElement(_,{className:"list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small"},"Tomorrow"),o.a.createElement(_,{action:!0,tag:"a",href:"#",className:"list-group-item-accent-danger list-group-item-divider"},o.a.createElement("div",null,"New UI Project - ",o.a.createElement("strong",null,"deadline")),o.a.createElement("small",{className:"text-muted mr-3"},o.a.createElement("i",{className:"icon-calendar"}),"\xa0 10 - 11pm"),o.a.createElement("small",{className:"text-muted"},o.a.createElement("i",{className:"icon-home"}),"\xa0 creativeLabs HQ"),o.a.createElement("div",{className:"avatars-stack mt-2"},o.a.createElement("div",{className:"avatar avatar-xs"},o.a.createElement("img",{src:"static/assets/img/avatars/2.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"})),o.a.createElement("div",{className:"avatar avatar-xs"},o.a.createElement("img",{src:"static/assets/img/avatars/3.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"})),o.a.createElement("div",{className:"avatar avatar-xs"},o.a.createElement("img",{src:"static/assets/img/avatars/4.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"})),o.a.createElement("div",{className:"avatar avatar-xs"},o.a.createElement("img",{src:"static/assets/img/avatars/5.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"})),o.a.createElement("div",{className:"avatar avatar-xs"},o.a.createElement("img",{src:"static/assets/img/avatars/6.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"})))),o.a.createElement(_,{action:!0,tag:"a",href:"#",className:"list-group-item-accent-success list-group-item-divider"},o.a.createElement("div",null,o.a.createElement("strong",null,"#10 Startups.Garden")," Meetup"),o.a.createElement("small",{className:"text-muted mr-3"},o.a.createElement("i",{className:"icon-calendar"}),"\xa0 1 - 3pm"),o.a.createElement("small",{className:"text-muted"},o.a.createElement("i",{className:"icon-location-pin"}),"\xa0 Palo Alto, CA")),o.a.createElement(_,{action:!0,tag:"a",href:"#",className:"list-group-item-accent-primary list-group-item-divider"},o.a.createElement("div",null,o.a.createElement("strong",null,"Team meeting")),o.a.createElement("small",{className:"text-muted mr-3"},o.a.createElement("i",{className:"icon-calendar"}),"\xa0 4 - 6pm"),o.a.createElement("small",{className:"text-muted"},o.a.createElement("i",{className:"icon-home"}),"\xa0 creativeLabs HQ"),o.a.createElement("div",{className:"avatars-stack mt-2"},o.a.createElement("div",{className:"avatar avatar-xs"},o.a.createElement("img",{src:"static/assets/img/avatars/2.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"})),o.a.createElement("div",{className:"avatar avatar-xs"},o.a.createElement("img",{src:"static/assets/img/avatars/3.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"})),o.a.createElement("div",{className:"avatar avatar-xs"},o.a.createElement("img",{src:"static/assets/img/avatars/4.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"})),o.a.createElement("div",{className:"avatar avatar-xs"},o.a.createElement("img",{src:"static/assets/img/avatars/5.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"})),o.a.createElement("div",{className:"avatar avatar-xs"},o.a.createElement("img",{src:"static/assets/img/avatars/6.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"})),o.a.createElement("div",{className:"avatar avatar-xs"},o.a.createElement("img",{src:"static/assets/img/avatars/7.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"})),o.a.createElement("div",{className:"avatar avatar-xs"},o.a.createElement("img",{src:"static/assets/img/avatars/8.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"})))))),o.a.createElement(w,{tabId:"2",className:"p-3"},o.a.createElement("div",{className:"message"},o.a.createElement("div",{className:"py-3 pb-5 mr-3 float-left"},o.a.createElement("div",{className:"avatar"},o.a.createElement("img",{src:"static/assets/img/avatars/7.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"}),o.a.createElement("span",{className:"avatar-status badge-success"}))),o.a.createElement("div",null,o.a.createElement("small",{className:"text-muted"},"Lukasz Holeczek"),o.a.createElement("small",{className:"text-muted float-right mt-1"},"1:52 PM")),o.a.createElement("div",{className:"text-truncate font-weight-bold"},"Lorem ipsum dolor sit amet"),o.a.createElement("small",{className:"text-muted"},"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...")),o.a.createElement("hr",null),o.a.createElement("div",{className:"message"},o.a.createElement("div",{className:"py-3 pb-5 mr-3 float-left"},o.a.createElement("div",{className:"avatar"},o.a.createElement("img",{src:"static/assets/img/avatars/7.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"}),o.a.createElement("span",{className:"avatar-status badge-success"}))),o.a.createElement("div",null,o.a.createElement("small",{className:"text-muted"},"Lukasz Holeczek"),o.a.createElement("small",{className:"text-muted float-right mt-1"},"1:52 PM")),o.a.createElement("div",{className:"text-truncate font-weight-bold"},"Lorem ipsum dolor sit amet"),o.a.createElement("small",{className:"text-muted"},"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...")),o.a.createElement("hr",null),o.a.createElement("div",{className:"message"},o.a.createElement("div",{className:"py-3 pb-5 mr-3 float-left"},o.a.createElement("div",{className:"avatar"},o.a.createElement("img",{src:"static/assets/img/avatars/7.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"}),o.a.createElement("span",{className:"avatar-status badge-success"}))),o.a.createElement("div",null,o.a.createElement("small",{className:"text-muted"},"Lukasz Holeczek"),o.a.createElement("small",{className:"text-muted float-right mt-1"},"1:52 PM")),o.a.createElement("div",{className:"text-truncate font-weight-bold"},"Lorem ipsum dolor sit amet"),o.a.createElement("small",{className:"text-muted"},"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...")),o.a.createElement("hr",null),o.a.createElement("div",{className:"message"},o.a.createElement("div",{className:"py-3 pb-5 mr-3 float-left"},o.a.createElement("div",{className:"avatar"},o.a.createElement("img",{src:"static/assets/img/avatars/7.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"}),o.a.createElement("span",{className:"avatar-status badge-success"}))),o.a.createElement("div",null,o.a.createElement("small",{className:"text-muted"},"Lukasz Holeczek"),o.a.createElement("small",{className:"text-muted float-right mt-1"},"1:52 PM")),o.a.createElement("div",{className:"text-truncate font-weight-bold"},"Lorem ipsum dolor sit amet"),o.a.createElement("small",{className:"text-muted"},"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...")),o.a.createElement("hr",null),o.a.createElement("div",{className:"message"},o.a.createElement("div",{className:"py-3 pb-5 mr-3 float-left"},o.a.createElement("div",{className:"avatar"},o.a.createElement("img",{src:"static/assets/img/avatars/7.jpg",className:"img-avatar",alt:"admin@bootstrapmaster.com"}),o.a.createElement("span",{className:"avatar-status badge-success"}))),o.a.createElement("div",null,o.a.createElement("small",{className:"text-muted"},"Lukasz Holeczek"),o.a.createElement("small",{className:"text-muted float-right mt-1"},"1:52 PM")),o.a.createElement("div",{className:"text-truncate font-weight-bold"},"Lorem ipsum dolor sit amet"),o.a.createElement("small",{className:"text-muted"},"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt..."))),o.a.createElement(w,{tabId:"3",className:"p-3"},o.a.createElement("h6",null,"Settings"),o.a.createElement("div",{className:"aside-options"},o.a.createElement("div",{className:"clearfix mt-4"},o.a.createElement("small",null,o.a.createElement("b",null,"Option 1")),o.a.createElement(I.i,{className:"float-right",variant:"pill",label:!0,color:"success",defaultChecked:!0,size:"sm"})),o.a.createElement("div",null,o.a.createElement("small",{className:"text-muted"},"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."))),o.a.createElement("div",{className:"aside-options"},o.a.createElement("div",{className:"clearfix mt-3"},o.a.createElement("small",null,o.a.createElement("b",null,"Option 2")),o.a.createElement(I.i,{className:"float-right",variant:"pill",label:!0,color:"success",size:"sm"})),o.a.createElement("div",null,o.a.createElement("small",{className:"text-muted"},"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."))),o.a.createElement("div",{className:"aside-options"},o.a.createElement("div",{className:"clearfix mt-3"},o.a.createElement("small",null,o.a.createElement("b",null,"Option 3")),o.a.createElement(I.i,{className:"float-right",variant:"pill",label:!0,color:"success",defaultChecked:!0,size:"sm",disabled:!0}),o.a.createElement("div",null,o.a.createElement("small",{className:"text-muted"},"Option disabled.")))),o.a.createElement("div",{className:"aside-options"},o.a.createElement("div",{className:"clearfix mt-3"},o.a.createElement("small",null,o.a.createElement("b",null,"Option 4")),o.a.createElement(I.i,{className:"float-right",variant:"pill",label:!0,color:"success",defaultChecked:!0,size:"sm"}))),o.a.createElement("hr",null),o.a.createElement("h6",null,"System Utilization"),o.a.createElement("div",{className:"text-uppercase mb-1 mt-4"},o.a.createElement("small",null,o.a.createElement("b",null,"CPU Usage"))),o.a.createElement(F,{className:"progress-xs",color:"info",value:"25"}),o.a.createElement("small",{className:"text-muted"},"348 Processes. 1/4 Cores."),o.a.createElement("div",{className:"text-uppercase mb-1 mt-2"},o.a.createElement("small",null,o.a.createElement("b",null,"Memory Usage"))),o.a.createElement(F,{className:"progress-xs",color:"warning",value:"70"}),o.a.createElement("small",{className:"text-muted"},"11444GB/16384MB"),o.a.createElement("div",{className:"text-uppercase mb-1 mt-2"},o.a.createElement("small",null,o.a.createElement("b",null,"SSD 1 Usage"))),o.a.createElement(F,{className:"progress-xs",color:"danger",value:"95"}),o.a.createElement("small",{className:"text-muted"},"243GB/256GB"),o.a.createElement("div",{className:"text-uppercase mb-1 mt-2"},o.a.createElement("small",null,o.a.createElement("b",null,"SSD 2 Usage"))),o.a.createElement(F,{className:"progress-xs",color:"success",value:"10"}),o.a.createElement("small",{className:"text-muted"},"25GB/256GB"))))}}]),t}(i.Component);A.defaultProps={};a.default=A}}]);
//# sourceMappingURL=8.7d37577f.chunk.js.map