(this.webpackJsonp=this.webpackJsonp||[]).push([[68],{1105:function(t,e,o){"use strict";var r=o(762);o.n(r).a},1106:function(t,e,o){"use strict";var r=o(763);o.n(r).a},1180:function(t,e,o){"use strict";o.r(e);o(47),o(54),o(3);var r=o(883),n=(o(25),{props:["title"],data:function(){return{name:"",appname:"",description:"",uploadTask:"",images:[],comp:[],radios:!0,address:"",industry:"",imageName:"",imageFile:"",imageUrls:"",component:""}},methods:{onFileChange:function(t){var e=t.target.files||t.dataTransfer.files;e.length&&this.createImage(e)},createImage:function(t){for(var e=this,o=0;o<t.length;o++){this.imageName=t[0].name;var r=new FileReader;r.onload=function(t){var o=t.target.result;t.target.result,e.images.push(o)},this.imageUrls=this.images,this.imageFile=t[0],r.readAsDataURL(t[o])}},removeImage:function(t){this.images.splice(t,1)},newApp:function(){this.$store.dispatch("form/imageName",this.imageName),this.$store.dispatch("form/imageUrls",this.imageUrls),this.$store.dispatch("form/imageFile",this.imageFile)}},watch:{imageUrls:function(){this.newApp()}}}),l=o(7),c=Object(l.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("client-only",[o("div",[o("div",{attrs:{id:"app"}},[o("div",{staticClass:"w-full mt-5"},[o("h2",[t._v(t._s(t.title))]),t._v(" "),o("input",{staticClass:"mb-2 mr-4 sm:mb-0",attrs:{label:"Image Upload",color:"primary",type:"file",multiple:""},on:{change:t.onFileChange}})]),t._v(" "),t.images?o("div",t._l(t.images,(function(image,e){return o("div",{key:e},[o("img",{staticStyle:{height:"250px"},attrs:{src:image}}),t._v(" "),o("button",{on:{click:function(o){return t.removeImage(e)}}},[t._v("Remove image")])])})),0):t._e()])])])}),[],!1,null,null,null).exports,m=o(1),d=o.n(m),v=o(53),f=o.n(v),h={data:function(){return{data:{name:"".concat(this.$route.params.id),addingData:{schema:[{fieldType:"TextInput",placeholder:"Name",label:"Name",name:"name"}],Location:!1,ImageUpload:!0,Html:!0}},currentDate:d()(Date.now()).format("LLLL"),myPhoto:{description:""},active:!1,getPhotosDetails:[],name:"",title:"",description:"",component:"",currentComponent:"",imageName:"",imageFile:"",imageUrls:"",preview:!1,image:"",images:[],comp:[],settings:{maxScrollbarLength:60,wheelSpeed:.6}}},watch:{title:function(){this.preview=!0},description:function(){this.preview=!0},addFormData:function(){this.letsTry()}},created:function(){var t=this;this.$fireStore.collection("agri-ensights").doc("apps").collection("social").onSnapshot((function(e){e.docChanges().forEach((function(e){var o=e.doc;t.getPhotosDetails.push({id:o.id,description:o.data().description,name:o.data().name,title:o.data().title,downloadURL:o.data().downloadURL,downloadUrl:o.data().downloadUrl})}))}))},computed:{featureCurrent:function(){return this.$store.getters["feature/componentSet"]},companyDetails:function(){return this.$store.getters["app/companyDetails"]},userDetails:function(){return this.$store.getters["userManagement/userDetails"]},resellerName:function(){return this.$store.getters["app/resellerName"]},imageUrl:function(){return this.$store.getters["form/imageUrls"]},imageMulti:function(){return this.$store.getters["form/imageMulti"]},bucketName:function(){return this.$store.getters.storageBucket},blank_page:function(){return this.$store.getters.blank_page},blank_route:function(){return this.$store.getters.blank_route},addFormData:function(){return this.$store.getters["form/addFormData"]},route:function(){return this.$store.getters["route/route"]},routeID:function(){return this.$store.getters["route/routeID"]},routeDisplayName:function(){return this.$store.getters["route/routeDisplayName"]},routeName:function(){return this.$store.getters["route/routeName"]},is_blank:function(){return this.$store.getters["route/isBlank"]},isSidebarActiveLocal:{get:function(){return this.isSidebarActive},set:function(t){t||(this.$emit("closeSidebar"),this.initValues())}}},methods:{goBack:function(){this.$router.go(-1)},onFileChange:function(t){var e=t.target.files||t.dataTransfer.files;e.length&&this.createImage(e)},createImage:function(t){for(var e=this,o=0;o<t.length;o++){this.imageName=t[0].name;var r=new FileReader;r.onload=function(t){var o=t.target.result;t.target.result,e.images.push(o)},this.imageUrls=this.images,this.imageFile=t[0],r.readAsDataURL(t[o])}},removeImage:function(t){this.images.splice(t,1)},letsTry:function(){var t=this,e=(this.routeID,f.a.storage().ref().child("images/".concat(this.imageName))),o=this.bucketName,r=this.imageName,n=(this.companyDetails.reseller,this.$fireStore.collection("agri-ensights").doc("apps").collection("social"));e.put(this.imageFile).then((function(e){e.ref.getDownloadURL().then((function(e){t.imageUrls=e,n.add({downloadURL:e,downloadUrl:"https://firebasestorage.googleapis.com/v0/b/".concat(o,"/o/images")+"%2F"+"".concat(encodeURIComponent(r),"?alt=media"),uid:f.a.auth().currentUser.uid,customer_name:t.userDetails.name,customer_surname:t.userDetails.surname,author:t.userDetails.displayName,time:t.currentDate,isLiked:!1,text:t.description,media:"image",likes:0,comments:0,usersLiked:[],commentbox:"",usersCommented:[],created_date:d()().format("DD-MM-YYYY"),created_month:d()().format("MM-YYYY"),timestamp:Date.now()}),t.successUpload()}))}))},newApp:function(){var t=this;f.a.storage().ref().child("images/".concat(this.imageName)).put(this.imageFile).then((function(e){e.ref.getDownloadURL().then((function(e){t.imageUrls=e;var o=t.storageBucket,r=t.imageName;t.$fireStore.collection("agri-ensights").doc("apps").collection("social").add({downloadURL:e,downloadUrl:"https://firebasestorage.googleapis.com/v0/b/".concat(o,"/o/images")+"%2F"+"".concat(encodeURIComponent(r),"?alt=media"),uid:f.a.auth().currentUser.uid,customer_name:t.userDetails.name,customer_surname:t.userDetails.surname,author:t.userDetails.displayName,time:t.currentDate,isLiked:!1,text:t.description,media:[{img:e}],likes:0,comments:0,usersLiked:[],commentbox:"",usersCommented:[],created_date:d()().format("DD-MM-YYYY"),created_month:d()().format("MM-YYYY"),timestamp:Date.now()})}))})),this.successUpload()},successUpload:function(){this.$vs.notify({color:"success",title:"Upload Success",text:"Whoop whoop, been uploaded"})}},components:{imageUpload:c}},_=(o(1105),Object(l.a)(h,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"theme-customizer"}},[o("vs-button",{staticClass:"customizer-btn",attrs:{color:"primary",type:"filled","icon-pack":"feather",icon:"icon-settings"},on:{click:function(e){e.stopPropagation(),t.active=!t.active}}}),t._v(" "),o("vs-sidebar",{staticClass:"items-no-padding",attrs:{"click-not-close":"","hidden-background":"","position-right":""},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[o("div",{staticClass:"h-full"},[o("div",{staticClass:"flex items-center justify-between px-6 mt-6 customizer-header"},[o("div",[o("h4"),t._v(" "),o("small",[t._v("Send a Post")])]),t._v(" "),o("feather-icon",{staticClass:"cursor-pointer",attrs:{icon:"XIcon"},on:{click:function(e){e.stopPropagation(),t.active=!1}}})],1),t._v(" "),o("vs-divider",{staticClass:"mb-0"}),t._v(" "),o("div",{attrs:{parent:"body","default-index":"1",color:"primary"}},[o("div",{staticClass:"px-6"},[o("vs-input",{staticClass:"w-full mt-5",attrs:{label:"Title",name:"appname"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),t._v(" "),o("vs-textarea",{staticClass:"w-full mt-5",attrs:{label:"Message"},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}}),t._v(" "),o("div",{attrs:{id:"app"}},[o("div",{staticClass:"w-full mt-5"},[o("input",{attrs:{label:"file",type:"file",multiple:""},on:{change:t.onFileChange}})])]),t._v(" "),o("br"),t._v(" "),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("vs-row",{attrs:{"vs-justify":"flex-end"}},[o("vs-button",{attrs:{color:"primary",type:"gradient"},on:{click:t.letsTry}},[t._v("Submit")]),t._v(" "),o("vs-button",{attrs:{color:"danger",type:"gradient"},on:{click:t.goBack}},[t._v("Cancel")])],1)],1),t._v(" "),o("vs-divider",{attrs:{color:"primary",icon:"check"}}),t._v(" "),o("br")],1),t._v(" "),t.preview?o("vs-card",{staticClass:"px-6",attrs:{actionable:""}},[o("div",{staticClass:"flex justify-between px-6 mb-4 post-header"},[o("div",{staticClass:"flex items-center"},[o("div",[o("vs-avatar",{staticClass:"m-0",attrs:{src:t.userDetails.photoURL,size:"45px"}})],1),t._v(" "),o("div",{staticClass:"ml-4"},[o("h6",[t._v(t._s(t.userDetails.displayName))]),t._v(" "),o("small",[t._v(t._s(t.currentDate))])])]),t._v(" "),o("div",{staticClass:"flex"},[o("feather-icon",{staticClass:"ml-4",attrs:{icon:"HeartIcon",svgClasses:{"text-danger fill-current stroke-current":!1}}})],1)]),t._v(" "),o("div",{staticClass:"px-6 post-content"},[o("p",[o("b",[t._v(t._s(t.title))])])]),t._v(" "),o("div",{staticClass:"px-6 post-content"},[o("p",[t._v(t._s(t.description))])]),t._v(" "),o("div",{staticClass:"px-6 mt-4 mb-6 post-media-container"},[o("ul",{staticClass:"flex post-media-list"},[t.images?o("div",t._l(t.images,(function(t,e){return o("li",{key:e,staticClass:"w-full m-1 post-media"},[o("img",{staticClass:"rounded responsive",attrs:{src:t,alt:"user-upload"}})])})),0):t._e()])])]):t._e()],1)],1)])],1)}),[],!1,null,null,null).exports),w=(o(885),{components:{topScroll:o(614).a,videoPlayer:r.videoPlayer,addData:_},data:function(){return{isNavOpen:!1,isUserLogged:!1,suggestedPagesShow:!1,twitterFeedsShow:!1,suggestedFriendsShow:!1,userLatestPhotosShow:!1,userPostsShow:!1,pollsVote:!1,currentDate:d()(Date.now()).format("LLLL"),loadMore:!1,userPoll:"",user_info:{profile_img:o(757),cover_img:o(758)},mediaExtensions:{img:["jpg","jpeg","png","bmp","gif","exif","tiff"],video:["avi","flv","wmv","mov","mp4","3gp"]},usersPosts:[],userPosts:[],wasSidebarOpen:null}},computed:{userDetails:function(){return this.$store.state.user.app_active_user},mediaType:function(){var t=this;return function(e){if(e.img){var o=e.img.split(".").pop();if(t.mediaExtensions.img.includes(o))return"image"}else if(e.sources&&e.poster)return"video"}},playerOptions:function(){return function(t){return{height:"360",fluid:!0,autoplay:!1,muted:!0,language:"en",playbackRates:[.7,1,1.5,2],sources:t.sources,poster:t.poster}}}},methods:{instagram:function(){window.open("https://www.instagram.com/agri_ensights/","_blank")},twitter:function(){window.open("https://twitter.com/AEnsights","_blank")},facebook:function(){window.open("https://web.facebook.com/AgriEnsights/","_blank")},postComment:function(t){console.log("post",t);var e=this;this.routeID;console.log("this usersPosts",this.usersPosts);for(var i=0;i<this.usersPosts.length;i++)this.usersPosts[i].id==t.id&&(console.log("Im in"),this.usersPosts[i].usersCommented.push({comment:t.commentbox,author:e.userDetails.displayName,img:e.userDetails.photoURL,time:e.currentDate}));this.$fireStore.collection("agri-ensights").doc("apps").collection("social").doc(t.id).update({usersCommented:f.a.firestore.FieldValue.arrayUnion({comment:t.commentbox,author:e.userDetails.displayName,img:e.userDetails.photoURL,time:e.currentDate}),comments:1+t.comments}),this.successUpload()},successUpload:function(){this.$vs.notify({color:"success",title:"Upload Success",text:"Whoop whoop, been uploaded"})},userDetailsAdding:function(){var t=!this.userDetailsAdd;this.$store.dispatch("userManagement/userDetailsAdd",t)},loadContent:function(){var t=this;this.$vs.loading({background:this.backgroundLoading,color:this.colorLoading,container:"#button-load-more-posts",scale:.45}),setTimeout((function(){t.$vs.loading.close("#button-load-more-posts > .con-vs-loading")}),3e3)}},created:function(){var t=this,e=this;f.a.auth().onAuthStateChanged((function(t){e.isUserLogged=!!t}));this.routeID;this.$fireStore.collection("agri-ensights").doc("apps").collection("social").orderBy("timestamp").onSnapshot((function(e){e.docChanges().forEach((function(e){var o=e.doc;if("added"===e.type&&t.usersPosts.push({id:o.id,downloadURL:o.data().downloadURL,downloadUrl:o.data().downloadUrl,uid:o.data().uid,customer_name:o.data().customer_name,customer_surname:o.data().customer_surname,author:o.data().author,time:o.data().time,isLiked:o.data().isLiked,text:o.data().text,likes:o.data().likes,comments:o.data().comments,usersLiked:o.data().usersLiked,commentbox:o.data().commentbox,usersCommented:o.data().usersCommented,created_date:o.data().created_date,created_month:o.data().created_month,timestamp:o.data().timestamp}),"modified"===e.type)for(var i=0;i<t.usersPosts.length;i++)t.usersPosts[i].id==e.doc.id&&(t.usersPosts[i]={id:o.id,downloadURL:o.data().downloadURL,downloadUrl:o.data().downloadUrl,uid:o.data().uid,customer_name:o.data().customer_name,customer_surname:o.data().customer_surname,author:o.data().author,time:o.data().time,isLiked:o.data().isLiked,text:o.data().text,likes:o.data().likes,comments:o.data().comments,usersLiked:o.data().usersLiked,commentbox:o.data().commentbox,usersCommented:o.data().usersCommented,created_date:o.data().created_date,created_month:o.data().created_month,timestamp:o.data().timestamp});"removed"===e.type&&console.log("Removed city: ",e.doc.data())}))}))},mounted:function(){this.wasSidebarOpen=this.$store.state.reduceButton,this.$store.commit("TOGGLE_REDUCE_BUTTON",!0)},beforeDestroy:function(){this.wasSidebarOpen||this.$store.commit("TOGGLE_REDUCE_BUTTON",!1)}}),k=(o(1106),Object(l.a)(w,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("client-only",[o("topScroll",{staticStyle:{"margin-top":"80px","margin-bottom":"30px"}}),t._v(" "),o("div",{attrs:{id:"profile-page"}},[o("vs-tabs",{staticClass:"mt=10",attrs:{color:"green"}},[o("vs-tab",{attrs:{label:"Agri Ensights"},on:{click:function(e){t.colorx="success"}}},[o("vs-row",{attrs:{"vs-align":"center","vs-type":"flex","vs-justify":"space-around","vs-w":"12"}},[o("vs-col",{attrs:{"vs-type":"flex","vs-justify":"center","vs-align":"center","vs-w":"12"}},[o("div",{staticClass:"con-tab-ejemplo"},[o("div",{staticClass:"vx-row"},[o("div",{staticClass:"w-full vx-col"},t._l(t.usersPosts,(function(e,r){return o("vx-card",{key:r,staticClass:"mt-base"},[o("div",[o("div",{staticClass:"flex justify-between mb-4 post-header"},[o("div",{staticClass:"flex items-center"},[o("div",[o("vs-avatar",{staticClass:"m-0",attrs:{src:t.userDetails.avatar,size:"45px"}})],1),t._v(" "),o("div",{staticClass:"ml-4"},[o("h6",[t._v(t._s(e.author))]),t._v(" "),o("small",[t._v(t._s(e.time)+" ")])])]),t._v(" "),o("div",{staticClass:"flex"},[o("feather-icon",{staticClass:"ml-4",attrs:{icon:"HeartIcon",svgClasses:{"text-danger fill-current stroke-current":e.isLiked}}})],1)]),t._v(" "),o("div",{staticClass:"px-6 post-content"},[o("p",[o("b",[t._v(t._s(e.title))])])]),t._v(" "),o("div",{staticClass:"post-content"},[o("p",[t._v(t._s(e.text))])]),t._v(" "),o("div",{staticClass:"mt-4 mb-6 post-media-container"},[o("img",{staticClass:"rounded responsive",attrs:{src:e.downloadURL,alt:"user-upload"}})]),t._v(" "),o("div",[o("div",{staticClass:"flex justify-between"},[o("div",{staticClass:"flex items-center"},[o("div",{staticClass:"flex items-center"},[o("feather-icon",{staticClass:"mr-2",attrs:{icon:"HeartIcon",svgClasses:"h-5 w-5"}}),t._v(" "),o("span",[t._v(t._s(e.likes))])],1),t._v(" "),o("ul",{staticClass:"ml-3 users-liked user-list sm:ml-6"},t._l(e.usersLiked,(function(t,e){return o("li",{key:e},[o("vx-tooltip",{attrs:{text:t.name,position:"bottom"}},[o("vs-avatar",{staticClass:"-m-1 border-2 border-white border-solid",attrs:{src:t.img,size:"30px"}})],1)],1)})),0),t._v(" "),o("small",{staticClass:"ml-2"},[t._v("+"+t._s(e.likes-5)+" more")])]),t._v(" "),o("div",{staticClass:"flex items-center"},[o("feather-icon",{staticClass:"mr-2",attrs:{icon:"MessageSquareIcon",svgClasses:"h-5 w-5"}}),t._v(" "),o("span",[t._v(t._s(e.comments))])],1)]),t._v(" "),o("div",{staticClass:"mt-4 comments-container"},[o("ul",{staticClass:"user-comments-list"},t._l(e.usersCommented.slice(0,3),(function(e,r){return o("li",{key:r,staticClass:"flex items-center mb-4 commented-user"},[o("div",{staticClass:"mr-3"},[o("vs-avatar",{staticClass:"m-0",attrs:{src:e.img,size:"30px"}})],1),t._v(" "),o("div",{staticClass:"leading-tight"},[o("p",{staticClass:"font-medium"},[t._v("\n                                    "+t._s(e.author)+"\n                                  ")]),t._v(" "),o("span",{staticClass:"text-xs"},[t._v(t._s(e.comment))])]),t._v(" "),o("div",{staticClass:"ml-auto"},[o("div",{staticClass:"flex"},[o("feather-icon",{staticClass:"mr-2 cursor-pointer",attrs:{icon:"HeartIcon",svgClasses:"h-4 w-4"}}),t._v(" "),o("feather-icon",{staticClass:"cursor-pointer",attrs:{icon:"MessageSquareIcon",svgClasses:"h-4 w-4"}})],1)])])})),0),t._v(" "),e.usersCommented.length>3?o("span",{staticClass:"flex justify-end"},[o("a",{staticClass:"inline-flex items-center text-sm",attrs:{href:""}},[o("span",[t._v("View All")]),t._v(" "),o("feather-icon",{attrs:{icon:t.$vs.rtl?"ChevronsLeftIcon":"ChevronsRightIcon",svgClasses:"h-4 w-4"}})],1)]):t._e()]),t._v(" "),t.isUserLogged?o("div",{staticClass:"post-comment"},[o("vs-textarea",{staticClass:"mb-2",attrs:{label:"Add Comment"},model:{value:e.commentbox,callback:function(o){t.$set(e,"commentbox",o)},expression:"post.commentbox"}}),t._v(" "),o("vs-button",{attrs:{size:"small"},on:{click:function(o){return t.postComment(e)}}},[t._v("Post Comment")])],1):t._e()])])])})),1)]),t._v(" "),t.isUserLogged?o("addData"):t._e()],1)])],1)],1),t._v(" "),o("vs-tab",{attrs:{label:"Instagram"},on:{click:t.instagram}},[o("div",{staticClass:"con-tab-ejemplo"},[o("h3",[t._v("Please share us to your favourite medium")]),t._v(" "),o("social-sharing",{attrs:{url:"https://agri-ensights/",title:"Agri Ensight",description:"Agri Ensights ........ ",quote:"Agri Ensights ........",hashtags:"agri,farming,technology","twitter-user":"agriEnsights"},inlineTemplate:{render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"Black"},attrs:{network:"email"}},[o("i",{staticClass:"fas fa-envelope"},[t._v(" Email")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#1b80e4"},attrs:{network:"facebook"}},[o("i",{staticClass:"fab fa-facebook-square"},[t._v(" Facebook")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#00b900"},attrs:{network:"line"}},[o("i",{staticClass:"fab fa-line"},[t._v(" Line")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#1b80e4"},attrs:{network:"linkedin"}},[o("i",{staticClass:"fab fa-linkedin"},[t._v(" LinkedIn")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#ffc107"},attrs:{network:"odnoklassniki"}},[o("i",{staticClass:"fab fa-odnoklassniki"},[t._v(" Odnoklassniki")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#e53333"},attrs:{network:"pinterest"}},[o("i",{staticClass:"fab fa-pinterest-square"},[t._v(" Pinterest")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"Orange"},attrs:{network:"reddit"}},[o("i",{staticClass:"fab fa-reddit-square"},[t._v(" Reddit")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"Blue"},attrs:{network:"skype"}},[o("i",{staticClass:"fab fa-skype"},[t._v(" Skype")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"Black"},attrs:{network:"sms"}},[o("i",{staticClass:"fas fa-sms"},[t._v(" SMS")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"Blue"},attrs:{network:"telegram"}},[o("i",{staticClass:"fab fa-telegram"},[t._v(" Telegram")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#03acf8"},attrs:{network:"twitter"}},[o("i",{staticClass:"fab fa-twitter-square"},[t._v(" Twitter")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#03acf8"},attrs:{network:"vk"}},[o("i",{staticClass:"fab fa-vk"},[t._v(" VKontakte")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"red"},attrs:{network:"weibo"}},[o("i",{staticClass:"fab fa-weibo"},[t._v(" Weibo")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"green"},attrs:{network:"whatsapp"}},[o("i",{staticClass:"fab fa-whatsapp-square"},[t._v(" Whatsapp")])])],1)},staticRenderFns:[]}})],1)]),t._v(" "),o("vs-tab",{attrs:{label:"Facebook"},on:{click:t.facebook}},[o("div",{staticClass:"con-tab-ejemplo"},[o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"Black"},attrs:{network:"email"}},[o("i",{staticClass:"fas fa-envelope"},[t._v(" Email")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#1b80e4"},attrs:{network:"facebook"}},[o("i",{staticClass:"fab fa-facebook-square"},[t._v(" Facebook")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#00b900"},attrs:{network:"line"}},[o("i",{staticClass:"fab fa-line"},[t._v(" Line")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#1b80e4"},attrs:{network:"linkedin"}},[o("i",{staticClass:"fab fa-linkedin"},[t._v(" LinkedIn")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#ffc107"},attrs:{network:"odnoklassniki"}},[o("i",{staticClass:"fab fa-odnoklassniki"},[t._v(" Odnoklassniki")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#e53333"},attrs:{network:"pinterest"}},[o("i",{staticClass:"fab fa-pinterest-square"},[t._v(" Pinterest")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"Orange"},attrs:{network:"reddit"}},[o("i",{staticClass:"fab fa-reddit-square"},[t._v(" Reddit")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"Blue"},attrs:{network:"skype"}},[o("i",{staticClass:"fab fa-skype"},[t._v(" Skype")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"Black"},attrs:{network:"sms"}},[o("i",{staticClass:"fas fa-sms"},[t._v(" SMS")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"Blue"},attrs:{network:"telegram"}},[o("i",{staticClass:"fab fa-telegram"},[t._v(" Telegram")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#03acf8"},attrs:{network:"twitter"}},[o("i",{staticClass:"fab fa-twitter-square"},[t._v(" Twitter")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#03acf8"},attrs:{network:"vk"}},[o("i",{staticClass:"fab fa-vk"},[t._v(" VKontakte")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"red"},attrs:{network:"weibo"}},[o("i",{staticClass:"fab fa-weibo"},[t._v(" Weibo")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"green"},attrs:{network:"whatsapp"}},[o("i",{staticClass:"fab fa-whatsapp-square"},[t._v(" Whatsapp")])])],1)]),t._v(" "),o("vs-tab",{attrs:{label:"Twitter"},on:{click:t.twitter}},[o("div",{staticClass:"con-tab-ejemplo"},[o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"Black"},attrs:{network:"email"}},[o("i",{staticClass:"fas fa-envelope"},[t._v(" Email")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#1b80e4"},attrs:{network:"facebook"}},[o("i",{staticClass:"fab fa-facebook-square"},[t._v(" Facebook")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#00b900"},attrs:{network:"line"}},[o("i",{staticClass:"fab fa-line"},[t._v(" Line")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#1b80e4"},attrs:{network:"linkedin"}},[o("i",{staticClass:"fab fa-linkedin"},[t._v(" LinkedIn")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#ffc107"},attrs:{network:"odnoklassniki"}},[o("i",{staticClass:"fab fa-odnoklassniki"},[t._v(" Odnoklassniki")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#e53333"},attrs:{network:"pinterest"}},[o("i",{staticClass:"fab fa-pinterest-square"},[t._v(" Pinterest")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"Orange"},attrs:{network:"reddit"}},[o("i",{staticClass:"fab fa-reddit-square"},[t._v(" Reddit")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"Blue"},attrs:{network:"skype"}},[o("i",{staticClass:"fab fa-skype"},[t._v(" Skype")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"Black"},attrs:{network:"sms"}},[o("i",{staticClass:"fas fa-sms"},[t._v(" SMS")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"Blue"},attrs:{network:"telegram"}},[o("i",{staticClass:"fab fa-telegram"},[t._v(" Telegram")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#03acf8"},attrs:{network:"twitter"}},[o("i",{staticClass:"fab fa-twitter-square"},[t._v(" Twitter")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"#03acf8"},attrs:{network:"vk"}},[o("i",{staticClass:"fab fa-vk"},[t._v(" VKontakte")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"red"},attrs:{network:"weibo"}},[o("i",{staticClass:"fab fa-weibo"},[t._v(" Weibo")])]),t._v(" "),o("network",{staticClass:"px-2",staticStyle:{"font-size":"2em",color:"green"},attrs:{network:"whatsapp"}},[o("i",{staticClass:"fab fa-whatsapp-square"},[t._v(" Whatsapp")])])],1)])],1)],1)],1)],1)}),[],!1,null,null,null));e.default=k.exports},588:function(t,e,o){},599:function(t,e,o){t.exports=o.p+"img/ban4-min.422b2e3.jpg"},600:function(t,e,o){t.exports=o.p+"img/Banner1.be02a15.jpg"},601:function(t,e,o){t.exports=o.p+"img/ban3-min.8e99c65.jpg"},602:function(t,e,o){t.exports=o.p+"img/Banner2.e98d8ba.jpg"},603:function(t,e,o){t.exports=o.p+"img/ban1-min.f0f5fe2.jpg"},604:function(t,e,o){t.exports=o.p+"img/Banner3.56064a0.jpg"},605:function(t,e,o){t.exports=o.p+"img/ban2-min.02decc2.jpg"},606:function(t,e,o){t.exports=o.p+"img/Banner4.88e9043.jpg"},607:function(t,e,o){"use strict";var r=o(588);o.n(r).a},614:function(t,e,o){"use strict";var r=o(596),n=(o(632),{directives:{swiper:r.directive},data:function(){return{popupActivo:!1,swiperOption:{speed:600,parallax:!0,pagination:{el:".swiper-pagination",clickable:!0},autoplay:{delay:2500,stopOnLastSlide:!1,disableOnInteraction:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}}},computed:{isMobile:function(){return this.$store.getters["app/isMobile"]},windowWidth:function(){return this.$store.state.windowWidth}},created:function(){},components:{Swiper:r.Swiper,SwiperSlide:r.SwiperSlide}}),l=(o(607),o(7)),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("client-only",[r("div",{staticClass:"letsee"},[r("div",{directives:[{name:"swiper",rawName:"v-swiper",value:t.swiperOption,expression:"swiperOption"}]},[r("div",{staticClass:"swiper-wrapper"},[r("div",{staticClass:"swiper-slide swipe1"},[r("img",{staticClass:"hidden md:block",staticStyle:{width:"100%"},attrs:{src:o(599),alt:"text"}}),t._v(" "),r("img",{staticClass:" sm:block md:hidden",staticStyle:{width:"100%"},attrs:{src:o(600),alt:"text"}})]),t._v(" "),r("div",{staticClass:"swiper-slide swipe2"},[r("div",{staticClass:"title",attrs:{"data-swiper-parallax":"-100","vs-xs":"hidden"}}),t._v(" "),r("img",{staticClass:"hidden md:block",staticStyle:{width:"100%"},attrs:{src:o(601),alt:"text"}}),t._v(" "),r("img",{staticClass:" sm:block md:hidden",staticStyle:{width:"100%"},attrs:{src:o(602),alt:"text"}})]),t._v(" "),r("div",{staticClass:"swiper-slide swipe3"},[r("div",{staticClass:"title",attrs:{"data-swiper-parallax":"-100","vs-xs":"hidden"}}),t._v(" "),r("img",{staticClass:"hidden md:block",staticStyle:{width:"100%"},attrs:{src:o(603),alt:"text"}}),t._v(" "),r("img",{staticClass:" sm:block md:hidden",staticStyle:{width:"100%"},attrs:{src:o(604),alt:"text"}})]),t._v(" "),r("div",{staticClass:"swiper-slide swipe4"},[r("div",{staticClass:"title",attrs:{"data-swiper-parallax":"-100","vs-xs":"hidden"}}),t._v(" "),r("img",{staticClass:"hidden md:block",staticStyle:{width:"100%"},attrs:{src:o(605),alt:"text"}}),t._v(" "),r("img",{staticClass:" sm:block md:hidden",staticStyle:{width:"100%"},attrs:{src:o(606),alt:"text"}})])]),t._v(" "),r("div",{staticClass:"swiper-pagination swiper-pagination-white",attrs:{slot:"pagination"},slot:"pagination"}),t._v(" "),r("div",{staticClass:"swiper-button-prev swiper-button-white",attrs:{slot:"button-prev"},slot:"button-prev"}),t._v(" "),r("div",{staticClass:"swiper-button-next swiper-button-white",attrs:{slot:"button-next"},slot:"button-next"})])])])}),[],!1,null,"4b22e601",null);e.a=component.exports},757:function(t,e,o){t.exports=o.p+"img/user-13.005c80e.jpg"},758:function(t,e,o){t.exports=o.p+"img/cover.21a4037.jpg"},762:function(t,e,o){},763:function(t,e,o){},884:function(t,e){}}]);