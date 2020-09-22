(this.webpackJsonp=this.webpackJsonp||[]).push([[53],{1142:function(t,e,o){"use strict";var r=o(803);o.n(r).a},1219:function(t,e,o){"use strict";o.r(e);var r={data:function(){return{user_not_found:!1}},computed:{user_data:function(){return this.$store.state.user.app_displayed_user}},methods:{editUser:function(){this.$router.push("/dashboard/users/staff/user-edit")},confirmDeleteRecord:function(){this.$vs.dialog({type:"confirm",color:"danger",title:"Confirm Delete",text:'You are about to delete "'.concat(this.user_data.username,'"'),accept:this.deleteRecord,acceptText:"Delete"})},deleteRecord:function(){this.$router.push({name:"app-user-list"}),this.showDeleteSuccess()},showDeleteSuccess:function(){this.$vs.notify({color:"success",title:"User Deleted",text:"The selected user was successfully deleted"})}}},d=(o(1142),o(7)),component=Object(d.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"page-user-view"}},[o("vs-alert",{attrs:{color:"danger",title:"User Not Found",active:t.user_not_found},on:{"update:active":function(e){t.user_not_found=e}}},[o("span",[t._v("User record with id: "+t._s(t.$route.params.userId)+" not found. ")]),t._v(" "),o("span",[o("span",[t._v("Check ")]),o("nuxt-link",{staticClass:"underline text-inherit",attrs:{to:{name:"page-user-list"}}},[t._v("All Users")])],1)]),t._v(" "),t.user_data?o("div",{attrs:{id:"user-data"}},[o("vx-card",{staticClass:"mb-base",attrs:{title:"Account"}},[o("div",{staticClass:"vx-row"},[o("div",{staticClass:"vx-col",attrs:{id:"avatar-col"}},[o("div",{staticClass:"mb-4 img-container"},[o("img",{staticClass:"w-full rounded",attrs:{src:t.user_data.avatar}})])]),t._v(" "),o("div",{staticClass:"flex-1 vx-col",attrs:{id:"account-info-col-1"}},[o("table",[o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Username")]),t._v(" "),o("td",[t._v(t._s(t.user_data.disp_name))])]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Name")]),t._v(" "),o("td",[t._v(t._s(t.user_data.name))])]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Email")]),t._v(" "),o("td",[t._v(t._s(t.user_data.email))])])])]),t._v(" "),o("div",{staticClass:"flex-1 vx-col",attrs:{id:"account-info-col-2"}},[o("table",[o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Status")]),t._v(" "),o("td",[t._v(t._s(t.user_data.status))])]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Role")]),t._v(" "),o("td",[t._v(t._s(t.user_data.role))])]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Company")]),t._v(" "),o("td",[t._v(t._s(t.user_data.company))])]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Communication")]),t._v(" "),t.user_data.p_notes?o("td",[t._v("\n                "+t._s(t.user_data.p_notes.join(", "))+"\n              ")]):t._e()]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Branch")]),t._v(" "),o("td",[t._v(t._s(t.user_data.branch))])]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Position")]),t._v(" "),o("td",[t._v(t._s(t.user_data.position))])])])]),t._v(" "),o("div",{staticClass:"flex w-full vx-col",attrs:{id:"account-manage-buttons"}},[o("vs-button",{staticClass:"mr-4",attrs:{"icon-pack":"feather",icon:"icon-edit"},on:{click:t.editUser}},[t._v("Edit")]),t._v(" "),o("vs-button",{staticClass:"mr-4",attrs:{type:"border",color:"danger","icon-pack":"feather",icon:"icon-trash"},on:{click:t.confirmDeleteRecord}},[t._v("Delete")]),t._v(" "),o("vs-button",{staticClass:"mr-4",attrs:{"icon-pack":"feather",icon:"icon-edit",to:{name:"todo",params:{id:t.$route.params.userId}}}},[t._v("Todo")]),t._v(" "),o("vs-button",{staticClass:"mr-4",attrs:{"icon-pack":"feather",icon:"icon-edit",to:{name:"calendar-simple-calendar",params:{userId:t.$route.params.userId}}}},[t._v("Calendar")])],1)])]),t._v(" "),o("div",{staticClass:"vx-row"},[o("div",{staticClass:"w-full vx-col lg:w-1/2"},[o("vx-card",{staticClass:"mb-base",attrs:{title:"Information"}},[o("table",[o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Birth Date")]),t._v(" "),o("td",[t._v(t._s(t.user_data.dob))])]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Mobile")]),t._v(" "),o("td",[t._v(t._s(t.user_data.mobile))])]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Website")]),t._v(" "),o("td",[t._v(t._s(t.user_data.website))])]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Languages")]),t._v(" "),t._l(t.user_data.lang,(function(e){return o("td",{key:e},[t._v("\n                "+t._s(e.label)+",\n              ")])}))],2),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Gender")]),t._v(" "),o("td",[t._v(t._s(t.user_data.gender))])]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Contact")]),t._v(" "),o("td",[t._v(t._s(t.user_data.contact_options))])])])])],1),t._v(" "),o("div",{staticClass:"w-full vx-col lg:w-1/2"},[o("vx-card",{staticClass:"mb-base",attrs:{title:"Social Links"}},[o("table",[o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Twitter")]),t._v(" "),o("td",[t._v(t._s(t.user_data.twt))])]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Facebook")]),t._v(" "),o("td",[t._v(t._s(t.user_data.fb))])]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Instagram")]),t._v(" "),o("td",[t._v(t._s(t.user_data.insta))])]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Github")]),t._v(" "),o("td",[t._v(t._s(t.user_data.github))])]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("CodePen")]),t._v(" "),o("td",[t._v(t._s(t.user_data.codepen))])]),t._v(" "),o("tr",[o("td",{staticClass:"font-semibold"},[t._v("Slack")]),t._v(" "),o("td",[t._v(t._s(t.user_data.slack))])])])])],1)]),t._v(" "),o("vx-card",[o("div",{staticClass:"vx-row"},[o("div",{staticClass:"w-full vx-col"},[o("div",{staticClass:"flex items-end px-3"},[o("feather-icon",{staticClass:"mr-2",attrs:{svgClasses:"w-6 h-6",icon:"LockIcon"}}),t._v(" "),o("span",{staticClass:"text-lg font-medium leading-none"},[t._v("Permissions")])],1),t._v(" "),o("vs-divider")],1)]),t._v(" "),o("div",{staticClass:"block overflow-x-auto"},[o("table",{staticClass:"w-full permissions-table"},[o("tr",t._l(["Module","Read","Write","Create","Delete"],(function(e){return o("th",{key:e,staticClass:"px-3 py-2 text-base font-semibold text-left"},[t._v("\n              "+t._s(e)+"\n            ")])})),0),t._v(" "),t._l(t.user_data.permissions,(function(e,r){return o("tr",{key:r},[o("td",{staticClass:"px-3 py-2"},[t._v(t._s(r))]),t._v(" "),t._l(e,(function(r,d){return o("td",{key:d+r,staticClass:"px-3 py-2"},[o("vs-checkbox",{staticClass:"pointer-events-none",model:{value:e[d],callback:function(o){t.$set(e,d,o)},expression:"val[name]"}})],1)}))],2)}))],2)])])],1):t._e()],1)}),[],!1,null,null,null);e.default=component.exports},803:function(t,e,o){}}]);