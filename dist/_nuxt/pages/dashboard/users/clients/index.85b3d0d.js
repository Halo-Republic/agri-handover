(this.webpackJsonp=this.webpackJsonp||[]).push([[50],{1137:function(e,t,n){"use strict";var r=n(798);n.n(r).a},1214:function(e,t,n){"use strict";n.r(t);n(28),n(25);var main=n(633),r=(n(611),n(137)),o=n.n(r),l=n(813),c=n(814),d=n(815),m=n(816),f=n(817),v=n(818),h=(n(797),{components:{AgGridVue:main.AgGridVue,vSelect:o.a,userRegistration:l.a,CellRendererLink:c.a,CellRendererStatus:d.a,CellRendererVerified:m.a,CellRendererActions:f.a,CellRendererAddStore:v.a},data:function(){return{usersData:[],roleFilter:{label:"All",value:"all"},roleOptions:[{label:"All",value:"all"},{label:"Admin",value:"admin"},{label:"User",value:"user"},{label:"Staff",value:"staff"}],statusFilter:{label:"All",value:"all"},statusOptions:[{label:"All",value:"all"},{label:"Active",value:"active"},{label:"Deactivated",value:"deactivated"},{label:"Blocked",value:"blocked"}],isVerifiedFilter:{label:"All",value:"all"},isVerifiedOptions:[{label:"All",value:"all"},{label:"Yes",value:"yes"},{label:"No",value:"no"}],departmentFilter:{label:"All",value:"all"},departmentOptions:[{label:"All",value:"all"},{label:"Sales",value:"sales"},{label:"Development",value:"development"},{label:"Management",value:"management"}],searchQuery:"",gridApi:null,gridOptions:{},defaultColDef:{sortable:!0,resizable:!0,suppressMenu:!0},columnDefs:[{headerName:"ID",field:"id",width:125,filter:!0,checkboxSelection:!0,headerCheckboxSelectionFilteredOnly:!0,headerCheckboxSelection:!0},{cellRendererFramework:"CellRendererLink",headerName:"avatar",field:"username",width:110},{headerName:"Username",field:"display_name",filter:!0,width:210},{headerName:"Email",field:"email",filter:!0,width:225},{headerName:"Name",field:"name",filter:!0,width:200},{headerName:"Surname",field:"surname",filter:!0,width:200},{headerName:"Role",field:"role",filter:!0,width:150},{headerName:"Status",field:"status",filter:!0,width:150,cellRendererFramework:"CellRendererStatus"},{headerName:"Verified",field:"is_verified",filter:!0,width:125,cellRendererFramework:"CellRendererVerified",cellClass:"text-center"},{headerName:"Department",field:"department",filter:!0,width:150},{headerName:"Actions",field:"transactions",width:150,cellRendererFramework:"CellRendererActions"}],components:{CellRendererLink:c.a,CellRendererStatus:d.a,CellRendererVerified:m.a,CellRendererActions:f.a,CellRendererAddStore:v.a}}},watch:{roleFilter:function(e){this.setColumnFilter("role",e.value)},statusFilter:function(e){this.setColumnFilter("status",e.value)},isVerifiedFilter:function(e){var t="all"===e.value?"all":"yes"==e.value?"true":"false";this.setColumnFilter("is_verified",t)},departmentFilter:function(e){this.setColumnFilter("department",e.value)}},computed:{myStaff:function(){return this.$store.state.crm.staff},activeBusinessInfo:function(){return this.$store.state.business.app_active_business},activeUserInfo:function(){return this.$store.state.user.app_displayed_user},activeCompanyInfo:function(){return this.$store.state.crm.company},paginationPageSize:function(){return this.gridApi?this.gridApi.paginationGetPageSize():10},totalPages:function(){return this.gridApi?this.gridApi.paginationGetTotalPages():0},currentPage:{get:function(){return this.gridApi?this.gridApi.paginationGetCurrentPage()+1:1},set:function(e){this.gridApi.paginationGoToPage(e-1)}}},methods:{setColumnFilter:function(e,t){var n=null;"all"!==t&&(n={type:"equals",filter:t}),this.gridApi.getFilterInstance(e).setModel(n),this.gridApi.onFilterChanged()},resetColFilters:function(){this.gridApi.setFilterModel(null),this.gridApi.onFilterChanged(),this.roleFilter=this.statusFilter=this.isVerifiedFilter=this.departmentFilter={label:"All",value:"all"},this.$refs.filterCard.removeRefreshAnimation()},updateSearchQuery:function(e){this.gridApi.setQuickFilter(e)}},created:function(){var e=[];this.$fireStore.collection("apps").doc("users").collection(this.activeBusinessInfo.b_uid).doc("info").collection("general").where("company_id"===this.activeCompanyInfo.id).onSnapshot((function(t){t.docChanges().forEach((function(t){var n=t.doc;e.push({company_id:n.data().company_id,status:n.data().status,online_status:n.data().online_status,role:n.data().role,uid:n.data().uid,display_name:n.data().display_name,avatar:n.data().avatar,email:n.data().email,name:n.data().name,surname:n.data().surname,company:n.data().company,position:n.data().position,branch:n.data().branch,p_notes:n.data().p_notes,verified:n.data().verified,last_active:n.data().last_active,created_month:n.data().created_month,timestamp:n.data().timestamp})}))})),this.$store.commit("crm/UPDATE_STAFF",e)},mounted:function(){if(this.gridApi=this.gridOptions.api,this.$vs.rtl){var header=this.$refs.agGridTable.$el.querySelector(".ag-header-container");header.style.left="-"+String(Number(header.style.transform.slice(11,-3))+9)+"px"}}}),_=(n(1137),n(7)),component=Object(_.a)(h,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"page-user-list"}},[n("vx-card",{ref:"filterCard",staticClass:"mb-8 user-list-filters",attrs:{title:"Filters",actionButtons:""},on:{refresh:e.resetColFilters,remove:e.resetColFilters}},[n("div",{staticClass:"vx-row"},[n("div",{staticClass:"w-full vx-col md:w-1/4 sm:w-1/2"},[n("label",{staticClass:"text-sm opacity-75"},[e._v("Role")]),e._v(" "),n("v-select",{staticClass:"mb-4 md:mb-0",attrs:{options:e.roleOptions,clearable:!1,dir:e.$vs.rtl?"rtl":"ltr"},model:{value:e.roleFilter,callback:function(t){e.roleFilter=t},expression:"roleFilter"}})],1),e._v(" "),n("div",{staticClass:"w-full vx-col md:w-1/4 sm:w-1/2"},[n("label",{staticClass:"text-sm opacity-75"},[e._v("Status")]),e._v(" "),n("v-select",{staticClass:"mb-4 md:mb-0",attrs:{options:e.statusOptions,clearable:!1,dir:e.$vs.rtl?"rtl":"ltr"},model:{value:e.statusFilter,callback:function(t){e.statusFilter=t},expression:"statusFilter"}})],1),e._v(" "),n("div",{staticClass:"w-full vx-col md:w-1/4 sm:w-1/2"},[n("label",{staticClass:"text-sm opacity-75"},[e._v("Verified")]),e._v(" "),n("v-select",{staticClass:"mb-4 sm:mb-0",attrs:{options:e.isVerifiedOptions,clearable:!1,dir:e.$vs.rtl?"rtl":"ltr"},model:{value:e.isVerifiedFilter,callback:function(t){e.isVerifiedFilter=t},expression:"isVerifiedFilter"}})],1),e._v(" "),n("div",{staticClass:"w-full vx-col md:w-1/4 sm:w-1/2"},[n("label",{staticClass:"text-sm opacity-75"},[e._v("Department")]),e._v(" "),n("v-select",{attrs:{options:e.departmentOptions,clearable:!1,dir:e.$vs.rtl?"rtl":"ltr"},model:{value:e.departmentFilter,callback:function(t){e.departmentFilter=t},expression:"departmentFilter"}})],1)])]),e._v(" "),n("div",{staticClass:"p-6 vx-card"},[n("div",{staticClass:"flex flex-wrap items-center"},[n("div",{staticClass:"flex-grow"},[n("vs-dropdown",{staticClass:"cursor-pointer",attrs:{"vs-trigger-click":""}},[n("div",{staticClass:"flex items-center justify-between p-4 font-medium border border-solid rounded-full cursor-pointer d-theme-border-grey-light d-theme-dark-bg"},[n("span",{staticClass:"mr-2"},[e._v(e._s(e.currentPage*e.paginationPageSize-(e.paginationPageSize-1))+"\n              -\n              "+e._s(e.usersData.length-e.currentPage*e.paginationPageSize>0?e.currentPage*e.paginationPageSize:e.usersData.length)+"\n              of "+e._s(e.usersData.length))]),e._v(" "),n("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e._v(" "),n("vs-dropdown-menu",[n("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(10)}}},[n("span",[e._v("10")])]),e._v(" "),n("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(20)}}},[n("span",[e._v("20")])]),e._v(" "),n("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(25)}}},[n("span",[e._v("25")])]),e._v(" "),n("vs-dropdown-item",{on:{click:function(t){return e.gridApi.paginationSetPageSize(30)}}},[n("span",[e._v("30")])])],1)],1)],1),e._v(" "),n("vs-input",{staticClass:"order-3 w-full mt-4 mr-0 sm:mr-4 sm:w-auto sm:order-normal sm:mt-0",attrs:{placeholder:"Search..."},on:{input:e.updateSearchQuery},model:{value:e.searchQuery,callback:function(t){e.searchQuery=t},expression:"searchQuery"}}),e._v(" "),n("vs-dropdown",{staticClass:"cursor-pointer",attrs:{"vs-trigger-click":""}},[n("div",{staticClass:"flex items-end justify-center w-32 p-3 text-lg font-medium rounded-lg cursor-pointer shadow-drop d-theme-dark-light-bg"},[n("span",{staticClass:"mr-2 leading-none"},[e._v("Actions")]),e._v(" "),n("feather-icon",{attrs:{icon:"ChevronDownIcon",svgClasses:"h-4 w-4"}})],1),e._v(" "),n("vs-dropdown-menu",[n("vs-dropdown-item",[n("span",{staticClass:"flex items-center"},[n("feather-icon",{staticClass:"mr-2",attrs:{icon:"TrashIcon",svgClasses:"h-4 w-4"}}),e._v(" "),n("span",[e._v("Delete")])],1)]),e._v(" "),n("vs-dropdown-item",[n("span",{staticClass:"flex items-center"},[n("feather-icon",{staticClass:"mr-2",attrs:{icon:"ArchiveIcon",svgClasses:"h-4 w-4"}}),e._v(" "),n("span",[e._v("Archive")])],1)]),e._v(" "),n("vs-dropdown-item",[n("span",{staticClass:"flex items-center"},[n("feather-icon",{staticClass:"mr-2",attrs:{icon:"FileIcon",svgClasses:"h-4 w-4"}}),e._v(" "),n("span",[e._v("Print")])],1)]),e._v(" "),n("vs-dropdown-item",[n("span",{staticClass:"flex items-center"},[n("feather-icon",{staticClass:"mr-2",attrs:{icon:"SaveIcon",svgClasses:"h-4 w-4"}}),e._v(" "),n("span",[e._v("CSV")])],1)])],1)],1)],1),e._v(" "),n("ag-grid-vue",{ref:"agGridTable",staticClass:"my-4 ag-theme-material w-100 ag-grid-table",attrs:{components:e.components,gridOptions:e.gridOptions,columnDefs:e.columnDefs,defaultColDef:e.defaultColDef,rowData:e.myStaff,rowSelection:"multiple",colResizeDefault:"shift",animateRows:!0,floatingFilter:!0,pagination:!0,paginationPageSize:e.paginationPageSize,suppressPaginationPanel:!0,enableRtl:e.$vs.rtl}}),e._v(" "),n("vs-pagination",{attrs:{total:e.totalPages,max:7},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1),e._v(" "),n("userRegistration")],1)}),[],!1,null,null,null);t.default=component.exports},655:function(e,t,n){},656:function(e,t,n){},657:function(e,t,n){},794:function(e,t,n){"use strict";var r=n(655);n.n(r).a},795:function(e,t,n){"use strict";var r=n(656);n.n(r).a},796:function(e,t,n){"use strict";var r=n(657);n.n(r).a},797:function(e,t,n){"use strict";n(25)},798:function(e,t,n){},813:function(e,t,n){"use strict";var r=n(1),o=n.n(r),l={components:{},data:function(){return{active:!1,contactperson:"",contactsurname:"",email:"",number:""}},computed:{activeBusinessInfo:function(){return this.$store.state.business.app_active_business}},methods:{newEmployee:function(){var e,t=this,n=this;this.$fireAuth.createUserWithEmailAndPassword(this.email,this.email).then((function(r){e=r,t.$fireStore.collection("apps").doc("users").collection(t.activeBusinessInfo.b_uid).doc("info").collection("general").doc(r.user.uid).set({status:"Active",online_status:"Online",role:"Staff",uid:r.user.uid,display_name:t.contactperson,photoURL:"",email:t.email,name:t.contactperson,surname:t.contactsurname,company:t.activeBusinessInfo.b_name,number:t.number,position:[],branch:[],push_notes:[],verified:!1,last_active:o()().format("DD-MM-YYYY"),created_month:o()().format("DD-MM-YYYY"),timestamp:Date.now()}).then((function(t){console.log("setting",e),n.$fireStore.collection("user").doc("info").collection("general").doc(e.user.uid).set({status:"online",uid:e.user.uid,display_name:n.contactperson,photoURL:"",number:n.number,email:n.email,name:n.contactperson,surname:n.contactsurname,last_active:o()().format("DD-MM-YYYY"),created_month:o()().format("DD-MM-YYYY"),timestamp:Date.now()})})).then((function(r){return console.log("next"),t.$fireStore.collection("user").doc("apps").collection(e.user.uid).doc(n.activeBusinessInfo.b_uid).set({b_uid:n.activeBusinessInfo.b_uid,uid:e.user.uid,b_name:n.activeBusinessInfo.b_name,un_name:n.activeBusinessInfo.un_name,logo:n.activeBusinessInfo.logo,indstr:n.activeBusinessInfo.indstr,c_person:n.activeBusinessInfo.c_person,c_surname:n.activeBusinessInfo.c_surname,c_company:n.activeBusinessInfo.b_name,c_email:n.activeBusinessInfo.c_email,c_number:n.activeBusinessInfo.c_number,month:o()().format("DD-MM-YYYY"),t_stamp:Date.now()})})).then((function(){n.successUpload()}))})).catch((function(e){console.log(e)}))},successUpload:function(){this.$vs.notify({color:"success",title:"Asset Added",text:"Whoop whoop, been uploaded"})}}},c=(n(794),n(7)),component=Object(c.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"theme-customizer"}},[n("vs-button",{staticClass:"customizer-btn",attrs:{color:"primary",type:"filled","icon-pack":"feather",icon:"icon-settings"},on:{click:function(t){t.stopPropagation(),e.active=!e.active}}},[e._v("Add Employee")]),e._v(" "),n("vs-sidebar",{staticClass:"items-no-padding",attrs:{"click-not-close":"","hidden-background":"","position-right":""},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[n("div",{staticClass:"h-full mx-4"},[n("div",{staticClass:"customizer-header mt-6 flex items-center justify-between px-6"},[n("div",[n("small",[e._v("Register your workers")])]),e._v(" "),n("feather-icon",{staticClass:"cursor-pointer",attrs:{icon:"XIcon"},on:{click:function(t){t.stopPropagation(),e.active=!1}}})],1),e._v(" "),n("vs-divider",{staticClass:"mb-0"}),e._v(" "),n("vs-input",{staticClass:"w-full mt-5",attrs:{label:"Client Name",name:"contactperson"},model:{value:e.contactperson,callback:function(t){e.contactperson=t},expression:"contactperson"}}),e._v(" "),n("vs-input",{staticClass:"w-full mt-5",attrs:{label:"Client Surname",name:"contactsurname"},model:{value:e.contactsurname,callback:function(t){e.contactsurname=t},expression:"contactsurname"}}),e._v(" "),n("vs-input",{staticClass:"w-full mt-5",attrs:{label:"Contact number",name:"number",type:"number"},model:{value:e.number,callback:function(t){e.number=t},expression:"number"}}),e._v(" "),n("vs-input",{staticClass:"w-full mt-5",attrs:{label:"Client email",name:"email",type:"email"},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),e._v(" "),n("div",{staticClass:"flex flex-wrap items-center justify-center p-6",attrs:{slot:"footer"},slot:"footer"},[n("vs-button",{staticClass:"mr-6",on:{click:e.newEmployee}},[e._v("Add Employee")]),e._v(" "),n("vs-button",{attrs:{type:"border",color:"danger"},on:{click:function(t){e.isSidebarActiveLocal=!1}}},[e._v("Cancel")])],1)],1)])],1)}),[],!1,null,null,null);t.a=component.exports},814:function(e,t,n){"use strict";n(95),n(14),n(12),n(10),n(23);var r=n(46);function o(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var c={name:"CellRendererLink",data:function(){return{general:{},info:{},social:{},noti:{}}},computed:{activeBusinessInfo:function(){return this.$store.state.business.app_active_business}},methods:{goto:function(data){this.general=data;var e=data.uid,t=this;this.$fireStore.collection("apps").doc("users").collection(this.activeBusinessInfo.b_uid).doc("info").collection("info").doc(e).get().then((function(n){n.exists?(t.info=n.data(),t.getSocial(e),t.getNoti(e)):console.log("No such document!")})).catch((function(e){console.log("Error getting document:",e)}))},getSocial:function(e){var t=this;this.$fireStore.collection("apps").doc("users").collection(this.activeBusinessInfo.b_uid).doc("info").collection("social_links").doc(e).get().then((function(e){e.exists?t.social=e.data():console.log("No such document!")})).catch((function(e){console.log("Error getting document:",e)}))},getNoti:function(e){var t=this;this.$fireStore.collection("apps").doc("users").collection(this.activeBusinessInfo.b_uid).doc("info").collection("notifications").doc(e).get().then((function(e){e.exists?(t.noti=e.data(),t.getGoing()):console.log("No such document!")})).catch((function(e){console.log("Error getting document:",e)}))},getGoing:function(){var data=l(l(l(l({},this.general),this.info),this.social),this.noti);this.$store.commit("user/APP_DISPLAYED_USER",data),this.$router.push("/dashboard/users/staff/user-view")}}},d=n(7),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"flex items-center"},[n("vs-avatar",{staticClass:"flex-shrink-0 mr-2",attrs:{src:e.params.data.photoURL,size:"30px"},on:{click:function(t){return e.goto(e.params.data)}}})],1)}),[],!1,null,null,null);t.a=component.exports},815:function(e,t,n){"use strict";var r={name:"CellRendererStatus",computed:{chipColor:function(){return function(e){return"active"===e?"success":"blocked"===e?"danger":"deactivated"===e?"warning":void 0}}}},o=(n(795),n(7)),component=Object(o.a)(r,(function(){var e=this.$createElement,t=this._self._c||e;return t("vs-chip",{staticClass:"ag-grid-cell-chip",attrs:{color:this.chipColor(this.params.value)}},[t("span",[this._v(this._s(this.params.value))])])}),[],!1,null,null,null);t.a=component.exports},816:function(e,t,n){"use strict";var r={name:"CellRendererVerified",computed:{textColor:function(){return this.params.value?"text-primary":"text-grey"}}},o=n(7),component=Object(o.a)(r,(function(){var e=this.$createElement;return(this._self._c||e)("feather-icon",{attrs:{icon:"CircleIcon",svgClasses:["fill-current h-4 w-4",this.textColor]}})}),[],!1,null,null,null);t.a=component.exports},817:function(e,t,n){"use strict";var r={name:"CellRendererActions",methods:{editRecord:function(){this.$router.push("/apps/user/user-edit/268").catch((function(){}))},confirmDeleteRecord:function(){this.$vs.dialog({type:"confirm",color:"danger",title:"Confirm Delete",text:'You are about to delete "'.concat(this.params.data.username,'"'),accept:this.deleteRecord,acceptText:"Delete"})},deleteRecord:function(){this.showDeleteSuccess()},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"User Deleted",text:"The selected user was successfully deleted"})}}},o=n(7),component=Object(o.a)(r,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{style:{direction:this.$vs.rtl?"rtl":"ltr"}},[t("feather-icon",{attrs:{icon:"Edit3Icon",svgClasses:"h-5 w-5 mr-4 hover:text-primary cursor-pointer"},on:{click:this.editRecord}}),this._v(" "),t("feather-icon",{attrs:{icon:"Trash2Icon",svgClasses:"h-5 w-5 hover:text-danger cursor-pointer"},on:{click:this.confirmDeleteRecord}})],1)}),[],!1,null,null,null);t.a=component.exports},818:function(e,t,n){"use strict";var r={name:"CellRendererAddStore",computed:{chipColor:function(){return function(e){return"active"===e?"success":"blocked"===e?"danger":"deactivated"===e?"warning":void 0}}},methods:{addParams:function(e){console.log("hwerer",e)},additemInCart:function(e){console.log("dispataching",e),this.$store.dispatch("eCommerce/additemInCart",e)},cartButtonClicked:function(e){this.additemInCart(e.data),this.successUpload()}}},o=(n(796),n(7)),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("vs-button",{on:{click:function(t){return e.cartButtonClicked(e.params)}}},[e._v("Add")])}),[],!1,null,null,null);t.a=component.exports}}]);