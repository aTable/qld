(this.webpackJsonpqld=this.webpackJsonpqld||[]).push([[0],{227:function(e,t,a){e.exports=a(440)},438:function(e,t,a){},440:function(e,t,a){"use strict";a.r(t);var n,r,o,c,l=a(0),s=a.n(l),i=a(45),u=a.n(i),m=a(50),d=a(36),f=a(175),b=a(176),p=a(201),v=a(177),g=a(202),O=function(e){function t(){return Object(f.a)(this,t),Object(p.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{id:"not-found",className:"container"},s.a.createElement("h1",null,"404"),s.a.createElement("p",null,"Page could not be found"))}}]),t}(l.Component),h=a(111),E=a(10),y=a(445),S=a(447),P=a(446),N=[-27.470125,153.021072],D=a(51),j=a(178),R=a.n(j),U={serverUri:"https://a5c7zwf7e5.execute-api.ap-southeast-2.amazonaws.com"};function w(e){switch(e){case r["QPS District"]:return n["QPS District"];case r["Local Government Area"]:return n["Local Government Area"];case r["Neighbourhood Watch"]:return n["Neighbourhood Watch"];case r["QPS Division"]:return n["QPS Division"];case r.Suburb:return n.SUBURB;case r["QPS Patrol Group"]:return n["QPS Patrol Group"];case r["QPS Region"]:return n["QPS Region"];case r.POSTCODE:return void console.error("unsupported mapping: "+e)}}!function(e){e["QPS Division"]="QPS Division",e.SUBURB="SUBURB",e["QPS District"]="QPS District",e["QPS Patrol Group"]="QPS Patrol Group",e["Neighbourhood Watch"]="Neighbourhood Watch",e["Local Government Area"]="Local Government Area",e["QPS Region"]="QPS Region"}(n||(n={})),function(e){e["QPS Division"]="QPS Division",e.Suburb="Suburb",e.POSTCODE="POSTCODE",e["QPS District"]="QPS District",e["QPS Patrol Group"]="QPS Patrol Group",e["Neighbourhood Watch"]="Neighbourhood Watch",e["Local Government Area"]="Local Government Area",e["QPS Region"]="QPS Region"}(r||(r={})),function(e){e.SUBURB="SUBURB",e.LGA="LGA",e.DIVISION="DIVISION",e.REGION="REGION",e.DISTRICT="DISTRICT",e.NHW="NHW",e.POSTCODE="POSTCODE",e.PATROLGROUP="PATROLGROUP"}(o||(o={})),function(e){e.Arson="Arson",e.Assault="Assault",e["Drug Offences"]="Drug Offences",e.Fraud="Fraud",e["Gaming Racing & Betting Offences"]="Gaming Racing & Betting Offences",e["Good Order Offences"]="Good Order Offences",e["Handling Stolen Goods"]="Handling Stolen Goods",e["Homicide (Murder)"]="Homicide (Murder)",e["Liquor (excl. Drunkenness)"]="Liquor (excl. Drunkenness)",e["Miscellaneous Offences"]="Miscellaneous Offences",e["Other Homicide"]="Other Homicide",e["Other Offences Against the Person"]="Other Offences Against the Person",e["Other Property Damage"]="Other Property Damage",e["Other Theft (excl. Unlawful Entry)"]="Other Theft (excl. Unlawful Entry)",e["Prostitution Offences"]="Prostitution Offences",e.Robbery="Robbery",e["Stock Related Offences"]="Stock Related Offences",e["Traffic and Related Offences"]="Traffic and Related Offences",e["Trespassing and Vagrancy"]="Trespassing and Vagrancy",e["Unlawful Entry"]="Unlawful Entry",e["Unlawful Use of Motor Vehicle"]="Unlawful Use of Motor Vehicle",e["Weapons Act Offences"]="Weapons Act Offences"}(c||(c={}));var A=a(443),T=a(442),Q=R.a.create({baseURL:U.serverUri});function G(e,t){var a=function(e){switch(e){case n["Local Government Area"]:return"LGA";case n["Neighbourhood Watch"]:return"NHW";case n["QPS District"]:return"DISTRICT";case n["QPS Division"]:return"DIVISION";case n["QPS Patrol Group"]:return"PATROLGROUP";case n["QPS Region"]:return"REGION";case n.SUBURB:return"SUBURB";default:throw new Error("unsupported LocationType:"+e)}}(e),r=localStorage.getItem("".concat(Q.defaults.baseURL,"/dev/locations?locationType=").concat(a,"&locationName=").concat(encodeURIComponent(t)));return r?D.Promise.resolve(JSON.parse(r)):Q.get("/dev/locations?locationType=".concat(a,"&locationName=").concat(encodeURIComponent(t)))}Q.interceptors.request.use((function(e){return e}),void 0),Q.interceptors.response.use((function(e){return localStorage.setItem(e.config.url,JSON.stringify(e.data)),e.data}),(function(e){return e.response,D.Promise.reject(e)}));var M=a(23),B=a(193),I={};function C(e){return e in I||(I[e]="#"+Array.from(Array(6),(function(e){return"0123456789ABCDEF"[Math.floor(16*Math.random())]})).reduce((function(e,t){return e+t}),"")),I[e]}var L=function(e){var t=Object(B.groupBy)(e.offences,(function(e){return e.Type})),a=Object.entries(t).map((function(e){var t=Object(E.a)(e,2),a=t[0];return{name:a,value:t[1].length,fill:C(a)}}));return s.a.createElement("div",{className:""},s.a.createElement("p",null,s.a.createElement("strong",null,"Total: "),e.offences.length),s.a.createElement("div",{style:{height:"200px",width:"100%"}},s.a.createElement(M.g,null,s.a.createElement(M.b,{data:a,margin:{top:5,right:30,left:20,bottom:5}},s.a.createElement(M.c,{strokeDasharray:"3 3"}),s.a.createElement(M.i,{dataKey:"name"}),s.a.createElement(M.j,null),s.a.createElement(M.h,null),s.a.createElement(M.d,null),s.a.createElement(M.a,{dataKey:"value",fill:"#660000",isAnimationActive:!1})))),s.a.createElement("div",{style:{height:"250px",width:"100%"}},s.a.createElement(M.g,null,s.a.createElement(M.f,null,s.a.createElement(M.e,{data:a,dataKey:"value",label:function(e){return e.name},isAnimationActive:!1})))))},k=a(444),x=new Date,W=Object(A.a)(Object(k.a)(x,{years:5}),"yyyy-MM-dd"),H=Object(A.a)(Object(k.a)(x,{days:1}),"yyyy-MM-dd"),q=Object(A.a)(x,"yyyy-MM-dd"),J={startDate:Object(A.a)(Object(k.a)(x,{months:1}),"yyyy-MM-dd"),endDate:Object(A.a)(x,"yyyy-MM-dd")},z=function(e){var t=Object(l.useState)(N),a=Object(E.a)(t,2),r=a[0],c=a[1],i=Object(l.useState)(n.SUBURB),u=Object(E.a)(i,2),m=u[0],d=u[1],f=Object(l.useState)("Toowong"),b=Object(E.a)(f,2),p=b[0],v=b[1],g=Object(l.useState)(),O=Object(E.a)(g,2),j=O[0],R=O[1],U=Object(l.useState)(),M=Object(E.a)(U,2)[1],B=Object(l.useState)(),I=Object(E.a)(B,2),C=I[0],k=I[1],x=Object(l.useState)(J.startDate),z=Object(E.a)(x,2),V=z[0],_=z[1],F=Object(l.useState)(J.endDate),K=Object(E.a)(F,2),Y=K[0],$=K[1],X=Object(l.useState)([]),Z=Object(E.a)(X,2),ee=Z[0],te=Z[1];return Object(l.useEffect)((function(){(function(){var e=localStorage.getItem("".concat(Q.defaults.baseURL,"/dev/lut"));return e?D.Promise.resolve(JSON.parse(e)):Q.get("/dev/lut")})().then((function(e){R(e)}))}),[]),Object(l.useEffect)((function(){return p?j&&!j.find((function(e){return w(e.type)===m&&e.name===p}))?(k([]),void M([])):void G(m,p).then((function(e){M(e);var t=e.reduce((function(e,t){return[].concat(Object(h.a)(e),Object(h.a)(t.features))}),[]);k(t);var a=function(e){var t=e[0],a=e[e.length-1];t[0]===a[0]&&t[1]===a[1]||e.push(t);for(var n,r,o,c=0,l=0,s=0,i=e.length,u=0,m=i-1;u<i;m=u++)n=e[u],r=e[m],c+=o=n[0]*r[1]-r[0]*n[1],l+=(n[0]+r[0])*o,s+=(n[1]+r[1])*o;return{lat:l/(o=3*c),lng:s/o}}(e[0].features[0].geometry.coordinates[0].map((function(e){return[e[1],e[0]]})));c([a.lat,a.lng])})):(k([]),void M([]))}),[p,j,m]),Object(l.useEffect)((function(){p&&V&&Y&&(j&&!j.find((function(e){return w(e.type)===m&&e.name===p}))||function(e,t,a,n){var r=Object(A.a)(Object(T.a)(a),"MM-dd-yyyy"),o=Object(A.a)(Object(T.a)(n),"MM-dd-yyyy"),c=localStorage.getItem("".concat(Q.defaults.baseURL,"/dev/offences?locationType=").concat(e,"&startDate=").concat(a,"&locationName=").concat(t,"&endDate=").concat(n,"&format=JSON"));return c?D.Promise.resolve(JSON.parse(c)):Q.get("/dev/offences?locationType=".concat(e,"&startDate=").concat(r,"&locationName=").concat(t,"&endDate=").concat(o,"&format=JSON"))}(o.SUBURB,p,V,Y).then((function(e){te(e)})))}),[p,V,Y,j,m]),s.a.createElement("div",{className:"container-fluid"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-5"},s.a.createElement("form",null,s.a.createElement("div",{className:"form-row"},s.a.createElement("div",{className:"col-12"},s.a.createElement("label",null,s.a.createElement("strong",null,"Location"))),s.a.createElement("div",{className:"col"},s.a.createElement("input",{type:"text",className:"form-control",value:p,onChange:function(e){return v(e.target.value)}})),s.a.createElement("div",{className:"col"},s.a.createElement("select",{className:"form-control",value:m,onChange:function(e){return d(n[e.target.value])}},s.a.createElement("option",{value:""},"Select ..."),Object.values(n).map((function(e){return s.a.createElement("option",{key:e,value:e},e)}))))),s.a.createElement("div",{className:"form-row"},s.a.createElement("div",{className:"col-12"},s.a.createElement("label",null,s.a.createElement("strong",null,"Dates"))),s.a.createElement("div",{className:"col"},s.a.createElement("input",{type:"date",className:"form-control",value:V,onChange:function(e){return _(e.target.value)},min:W,max:H})),s.a.createElement("div",{className:"col"},s.a.createElement("input",{type:"date",className:"form-control",value:Y,onChange:function(e){return $(e.target.value)},max:q})))),s.a.createElement(L,{offences:ee})),s.a.createElement("div",{className:"col-7"},s.a.createElement(y.a,{center:r,zoom:13,style:{height:"800px",width:"100%"}},s.a.createElement(S.a,{attribution:"Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",url:"https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"}),C&&C.map((function(e){return s.a.createElement(P.a,{key:e.properties.Name,color:"#660000",positions:e.geometry.coordinates[0].map((function(e){return[e[1],e[0]]}))})}))))))},V=function(){return s.a.createElement("div",{className:"container"},s.a.createElement("h1",null,"Data"),s.a.createElement("p",null,"This is purely a visualization of the ",s.a.createElement("strong",null,"data that is generated and held data.qld.gov.au")),s.a.createElement("table",{className:"table table-bordered table-dark table-striped"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("td",null,"Dataset"),s.a.createElement("td",null,"License"))),s.a.createElement("tbody",null,s.a.createElement("tr",null,s.a.createElement("td",null,s.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.data.qld.gov.au/dataset/crime-locations-2000-present"},"QPS")),s.a.createElement("td",null,s.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://creativecommons.org/licenses/by/3.0/au/"},"Creative Commons Attribution 3.0 license"))),s.a.createElement("tr",null,s.a.createElement("td",null,s.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://carto.com/location-data-services/basemaps/"},"Map tiles by Carto")),s.a.createElement("td",null,s.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://opendatacommons.org/licenses/odbl/index.html"},"under CC BY 3.0. Data by OpenStreetMap, under ODbL."))))))},_=function(){return s.a.createElement("nav",{className:"navbar navbar-expand-sm navbar-dark bg-dark"},s.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarTogglerDemo01","aria-controls":"navbarTogglerDemo01","aria-expanded":"false","aria-label":"Toggle navigation"},s.a.createElement("span",{className:"navbar-toggler-icon"})),s.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarTogglerDemo01"},s.a.createElement(m.b,{className:"navbar-brand",to:"/"},"qld"),s.a.createElement("ul",{className:"navbar-nav mr-auto mt-2 mt-lg-0"},s.a.createElement("li",{className:"nav-item active"},s.a.createElement(m.b,{className:"nav-link",to:"/"},"Home",s.a.createElement("span",{className:"sr-only"},"(current)"))),s.a.createElement("li",{className:"nav-item"},s.a.createElement(m.b,{className:"nav-link",to:"/about"},"About")))))},F=a(14),K=a.n(F),Y=a(198),$=a.n(Y),X=a(199),Z=a.n(X),ee=a(200),te=a.n(ee);K.a.Marker.prototype.options.icon=K.a.icon({iconRetinaUrl:$.a,iconUrl:Z.a,shadowUrl:te.a,iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]});var ae=function(){return s.a.createElement(m.a,{basename:"qld"},s.a.createElement("div",{id:"application"},s.a.createElement(_,null),s.a.createElement(d.c,null,s.a.createElement(d.a,{exact:!0,path:"/",component:z}),s.a.createElement(d.a,{path:"/about",component:V}),s.a.createElement(d.a,{component:O}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ne=a(76),re=a.n(ne),oe=a(106);a(433),a(434),a(435),a(436),a(437),a(438);window.jQuery=re.a,window.$=re.a,window.Popper=oe.default,a(439),u.a.render(s.a.createElement(ae,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[227,1,2]]]);
//# sourceMappingURL=main.1ed11a43.chunk.js.map