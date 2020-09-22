(this.webpackJsonp=this.webpackJsonp||[]).push([[8],{589:function(e,t,l){},590:function(e,t,l){},593:function(e,t,l){"use strict";l(25),l(28);var c=l(626),n=l(627),r=l.n(n),main=(l(53),l(631)),o=l(628),h=l.n(o);l(629);var d={name:"VueUploadMultipleImage",props:{label:{type:String,default:"label"},dragText:{type:String,default:"Drag image (multiple)"},browseText:{type:String,default:"(or) Select"},primaryText:{type:String,default:"Default"},markIsPrimaryText:{type:String,default:"Set as default"},popupText:{type:String,default:"This image will be displayed as the default"},dropText:{type:String,default:"Drop your files here ..."},accept:{type:String,default:"image/gif,image/jpeg,image/png,image/bmp,image/jpg"},dataImages:{type:Array,default:function(){return[]}},placeholder:{type:String},multiple:{type:Boolean,default:!0},edit:{type:Boolean,default:!1},showPrimary:{type:Boolean,default:!0},maxImage:{type:Number,default:5},idUpload:{type:String,default:"image-upload"},idEdit:{type:String,default:"image-edit"}},data:function(){return{currentIndexImage:0,images:[],isDragover:!1,showLightbox:!1,arrLightBox:[],infoImages:[],categorySave:"",initialSelected:[],popupActivo4:!1,needUpload:!1,selectedCategory:"",categories:[],selectedImages:[]}},components:{Popper:r.a,VueImageLightboxCarousel:main.a,VueSelectImage:h.a},computed:{imagePreview:function(){var e=Object(c.findIndex)(this.images,{highlight:1});return e>-1?this.images[e].path:this.images.length?this.images[0].path:""},imageDefault:function(){if(this.images[this.currentIndexImage])return this.images[this.currentIndexImage].default},app_active_user:function(){return this.$store.state.user.app_active_user}},methods:{onSelectMultipleImage:function(i){for(var e=[],t=0;t<i.length;t++)e.push(i[t].downloadURL);this.selectedImages=e},emitChanges:function(){this.submitStore(),this.$emit("input",this.selectedImages),this.popupActivo4=!1,this.needUpload=!1},submitStore:function(){this.$store.commit("form/UPLOADED_IMAGES",this.selectedImages)},AddCategory:function(){this.$fireStore.collection("user").doc("images").collection("images").doc("category").collection(this.app_active_user.uid).add({category:this.categorySave})},setImages:function(){for(var e=this,t=[],l=this.$fireStorage.ref(),c=this.$fireStore.collection("user").doc("images").collection("images").doc("images").collection(this.app_active_user.uid),n=function(i){l.child("".concat(e.app_active_user.uid,"/").concat(e.images[i].name)).put(e.images[i].file).then((function(l){l.ref.getDownloadURL().then((function(l){t.push(l),e.imageUrls=l,c.add({downloadURL:l,category:"Agri Ensights",alt:e.images[i].name})}))}))},i=0;i<this.images.length;i++)n(i);this.needUpload=!1},onDrop:function(e){var t=this;this.isDragover=!1,e.stopPropagation(),e.preventDefault();var l=e.dataTransfer.files;return!!l.length&&(!!this.isValidNumberOfImages(l.length)&&(Object(c.forEach)(l,(function(e,l){if(t.createImage(e),!t.multiple)return!1})),void(document.getElementById(this.idUpload)&&(document.getElementById(this.idUpload).value=[]))))},onDragover:function(){this.isDragover=!0},createImage:function(e){var t=this,l=new FileReader,c=new FormData;c.append("file",e),l.onload=function(l){var n=l.target.result;n&&(t.images.length?t.images.push({name:e.name,path:n,file:e,highlight:0,default:0}):(t.images.push({name:e.name,file:e,path:n,highlight:1,default:1}),t.currentIndexImage=0),t.$emit("upload-success",c,t.images.length-1,t.images))},l.readAsDataURL(e)},editImage:function(e){var t=this,l=new FileReader,c=new FormData;c.append("file",e),l.onload=function(l){var c=l.target.result;c&&t.images.length&&t.images[t.currentIndexImage]&&(t.images[t.currentIndexImage].path=c,t.images[t.currentIndexImage].name=e.name)},l.readAsDataURL(e),this.$emit("edit-image",c,this.currentIndexImage,this.images)},uploadFieldChange:function(e){var t=this,l=e.target.files||e.dataTransfer.files;return!!l.length&&(!!this.isValidNumberOfImages(l.length)&&(Object(c.forEach)(l,(function(e,l){t.createImage(e)})),void(document.getElementById(this.idUpload)&&(document.getElementById(this.idUpload).value=[]))))},editFieldChange:function(e){var t=this,l=e.target.files||e.dataTransfer.files;return!!l.length&&(!!this.isValidNumberOfImages(l.length)&&(Object(c.forEach)(l,(function(e,l){t.editImage(e)})),void(document.getElementById(this.idEdit)&&(document.getElementById(this.idEdit).value=""))))},changeHighlight:function(e){this.currentIndexImage=e;var t=this.images;this.images=[],t.map((function(t,l){return t.highlight=e===l?1:0,t})),this.images=t},markIsPrimary:function(e){this.images.map((function(t,l){return e===l?(t.highlight=1,t.default=1):(t.highlight=0,t.default=0),t})),this.currentIndexImage=0,this.images=Object(c.orderBy)(this.images,"default","desc"),this.$emit("mark-is-primary",e,this.images)},deleteImage:function(e){var t=this;this.$emit("before-remove",e,(function(){1===t.images[e].default&&(t.images[0].default=1),t.images.splice(e,1),t.currentIndexImage=0,t.images.length&&(t.images[0].highlight=1)}),this.images)},openGallery:function(e){this.showLightbox=!0,this.$refs.lightbox.showImage(e)},onOpenedLightBox:function(e){this.showLightbox=!!e},isValidNumberOfImages:function(e){return!(e>this.maxImage)||(this.$emit("limit-exceeded",e),!1)}},watch:{dataImages:{handler:function(e){this.images=e},deep:!0}},mounted:function(){var e=this;["drag","dragstart","dragend","dragover","dragenter","dragleave","drop"].forEach((function(e){window.addEventListener(e,(function(e){e.preventDefault(),e.stopPropagation()}))})),document.body.addEventListener("dragleave",(function(t){t.stopPropagation(),t.preventDefault(),e.isDragover=!1}))},created:function(){var e=this;this.images=[],this.images=Object(c.cloneDeep)(this.dataImages),this.$fireStore.collection("user").doc("images").collection("images").doc("images").collection(this.app_active_user.uid).onSnapshot((function(t){t.docChanges().forEach((function(t){var l=t.doc;e.infoImages.push({id:l.id,category:l.data().category,downloadURL:l.data().downloadURL,src:l.data().downloadURL,alt:l.data().alt})}))})),this.$fireStore.collection("user").doc("images").collection("images").doc("category").collection(this.app_active_user.uid).onSnapshot((function(t){t.docChanges().forEach((function(t){var l=t.doc;e.categories.push({id:l.id,category:l.data().category})}))}))}},m=(l(608),l(609),l(7)),component=Object(m.a)(d,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("small",[e._v(e._s(e.label))]),e._v(" "),l("br"),e._v(" "),l("vs-button",{attrs:{icon:"done",color:"primary"},on:{click:function(t){e.popupActivo4=!0}}},[e._v(e._s(e.label))]),e._v(" "),l("vs-popup",{staticStyle:{"z-index":"65000"},attrs:{fullscreen:"",title:e.label,active:e.popupActivo4},on:{"update:active":function(t){e.popupActivo4=t}}},[l("vs-button",{staticStyle:{float:"right"},attrs:{color:"success",type:"border"},on:{click:function(t){e.needUpload=!0}}},[e._v("Upload More")]),e._v(" "),l("vs-button",{attrs:{color:"primary",type:"border"},on:{click:e.emitChanges}},[e._v("Use Selected")]),e._v(" "),e.needUpload?e._e():l("vue-select-image",{attrs:{dataImages:e.infoImages,"is-multiple":!0,selectedImages:e.initialSelected,w:"150px",h:"150px"},on:{onselectmultipleimage:e.onSelectMultipleImage}}),e._v(" "),e.needUpload?l("div",{staticClass:"w-full mt-5"},[l("div",{staticStyle:{outline:"none"}},[e.images.length?l("div",{staticClass:"text-center image-container position-relative image-list"},[l("div",{staticClass:"cursor-pointer preview-image full-width position-relative",on:{click:function(t){return e.openGallery(e.currentIndexImage)}}},[l("div",{staticClass:"image-overlay position-relative full-width full-height"}),e._v(" "),l("div",{staticClass:"image-overlay-details full-width"},[l("svg",{staticClass:"icon-overlay",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"}},[l("path",{attrs:{d:"M283.9 186.4h-64.6l-.4-71.1c-.1-8.8-7.2-15.9-16-15.9h-.1c-8.8.1-16 7.3-15.9 16.1l.4 70.9h-64.4c-8.8 0-16 7.2-16 16s7.2 16 16 16h64.6l.4 71.1c.1 8.8 7.2 15.9 16 15.9h.1c8.8-.1 16-7.3 15.9-16.1l-.4-70.9h64.4c8.8 0 16-7.2 16-16s-7.1-16-16-16z"}}),e._v(" "),l("path",{attrs:{d:"M511.3 465.3L371.2 325.2c-1-1-2.6-1-3.6 0l-11.5 11.5c31.6-35.9 50.8-82.9 50.8-134.3C406.9 90.3 315.6-1 203.4-1 91.3-1 0 90.3 0 202.4s91.3 203.4 203.4 203.4c51.4 0 98.5-19.2 134.3-50.8l-11.5 11.5c-1 1-1 2.6 0 3.6l140.1 140.1c1 1 2.6 1 3.6 0l41.4-41.4c.9-.9.9-2.5 0-3.5zm-307.9-92.5C109.5 372.8 33 296.4 33 202.4S109.5 32.1 203.4 32.1s170.4 76.4 170.4 170.4-76.4 170.3-170.4 170.3z"}})])]),e._v(" "),l("div",{staticClass:"show-image centered"},[l("img",{staticClass:"show-img img-responsive",attrs:{src:e.imagePreview}})])]),e._v(" "),l("div",{staticClass:"image-bottom display-flex position-absolute full-width align-items-center justify-content-between",class:!e.showPrimary&&"justify-content-end"},[e.showPrimary?l("div",{staticClass:"image-bottom-left display-flex align-items-center"},[l("div",{directives:[{name:"show",rawName:"v-show",value:e.imageDefault,expression:"imageDefault"}],staticClass:"display-flex align-items-center"},[l("span",{staticClass:"image-primary display-flex align-items-center"},[l("svg",{staticClass:"image-icon-primary",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"}},[l("circle",{attrs:{fill:"#10BC83",cx:"256",cy:"256",r:"256"}}),e._v(" "),l("path",{attrs:{fill:"#FFF",d:"M216.7 350.9h-.1c-5.1 0-9.9-2.1-13.4-5.7l-74.2-76c-7.4-7.5-7.2-19.5.4-26.8 7.5-7.4 19.5-7.2 26.8.4L217 305l139.7-138.5c7.5-7.4 19.5-7.4 26.8.1s7.4 19.5-.1 26.8l-153.2 152c-3.7 3.5-8.5 5.5-13.5 5.5z"}})]),e._v("\n                    "+e._s(e.primaryText)+"\n                  ")]),e._v(" "),l("popper",{attrs:{trigger:"click",options:{placement:"top"}}},[l("div",{staticClass:"popper popper-custom"},[e._v(e._s(e.popupText))]),e._v(" "),l("i",{staticClass:"cursor-pointer display-flex align-items-center",attrs:{slot:"reference"},slot:"reference"},[l("svg",{staticClass:"image-icon-info",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"}},[l("path",{attrs:{d:"M256 32c30.3 0 59.6 5.9 87.2 17.6 26.7 11.3 50.6 27.4 71.2 48s36.7 44.5 48 71.2c11.7 27.6 17.6 56.9 17.6 87.2s-5.9 59.6-17.6 87.2c-11.3 26.7-27.4 50.6-48 71.2s-44.5 36.7-71.2 48C315.6 474.1 286.3 480 256 480s-59.6-5.9-87.2-17.6c-26.7-11.3-50.6-27.4-71.2-48s-36.7-44.5-48-71.2C37.9 315.6 32 286.3 32 256s5.9-59.6 17.6-87.2c11.3-26.7 27.4-50.6 48-71.2s44.5-36.7 71.2-48C196.4 37.9 225.7 32 256 32m0-32C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0z"}}),e._v(" "),l("path",{attrs:{d:"M304.2 352H296c-4.4 0-8-3.6-8-8v-94.8c0-15.3-11.5-28.1-26.7-29.8-2.5-.3-4.8-.5-6.7-.5-23.7 0-44.6 11.9-57 30.1l-.1.1v-.1c-1 2-1.7 5.3.7 6.5.6.3 1.2.5 1.8.5h16c4.4 0 8 3.6 8 8v80c0 4.4-3.6 8-8 8h-8.2c-8.7 0-15.8 7.1-15.8 15.8v.3c0 8.7 7.1 15.8 15.8 15.8h96.4c8.7 0 15.8-7.1 15.8-15.8v-.3c0-8.7-7.1-15.8-15.8-15.8zM256 128c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"}})])])])],1),e._v(" "),l("a",{directives:[{name:"show",rawName:"v-show",value:!e.imageDefault,expression:"!imageDefault"}],staticClass:"cursor-pointer text-small mark-text-primary",on:{click:function(t){return t.preventDefault(),e.markIsPrimary(e.currentIndexImage)}}},[e._v(e._s(e.markIsPrimaryText))])]):e._e(),e._v(" "),l("div",{staticClass:"display-flex"},[l("label",{staticClass:"cursor-pointer image-edit display-flex",attrs:{for:e.idEdit}},[l("svg",{staticClass:"image-icon-edit",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"512",height:"512",viewBox:"0 0 512 512"}},[l("path",{attrs:{d:"M469.56 42.433C420.927-6.199 382.331-.168 378.087.68l-4.8.96L36.895 338.001 0 512l173.985-36.894 336.431-336.399.941-4.86c.826-4.257 6.65-42.984-41.797-91.414zM41.944 470.057L64.3 364.617c12.448 3.347 31.968 11.255 50.51 29.794 18.96 18.963 27.84 39.986 31.875 53.436l-104.741 22.21zm132.504-41.134c-6.167-16.597-17.199-37.794-36.775-57.371C119 352.88 99.435 342.57 83.739 336.879l155.156-155.15 97.066-97.051c11.069 2.074 34.864 8.95 57.253 31.338 22.708 22.708 30.95 48.358 33.734 60.428l-96.685 96.663-155.815 155.816zm278.41-278.383c-6.167-16.6-17.196-37.8-36.781-57.384-18.669-18.667-38.228-28.977-53.92-34.668l26.118-26.113c8.785.484 30.373 4.87 58.423 32.918l.001.002c28.085 28.074 32.467 49.675 32.946 58.463l-26.787 26.782z"}})])]),e._v(" "),l("a",{staticClass:"cursor-pointer image-delete display-flex",on:{click:function(t){return t.preventDefault(),e.deleteImage(e.currentIndexImage)}}},[l("svg",{staticClass:"image-icon-delete",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"512",height:"512",viewBox:"0 0 512 512"}},[l("path",{attrs:{d:"M448 64h-96V0H159.9l.066 64H32v32h32v416h384V96h32V64h-32zM192 32h128v32H192V32zm224 448H96V96h320v384zM192 160h32v256h-32V160zm96 0h32v256h-32V160z"}})])])])])]):l("div",{staticClass:"text-center image-container position-relative"},[e.isDragover?l("div",{staticClass:"drag-upload-cover position-absolute",on:{drop:e.onDrop}},[l("div",{staticClass:"text-center centered full-width text-primary"},[l("svg",{staticClass:"icon-drag-drop",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"}},[l("path",{attrs:{d:"M444.5 15C407.7 15 378 44.8 378 81.5s29.8 66.5 66.5 66.5S511 118.2 511 81.5 481.2 15 444.5 15zm29.4 72.4h-23.5l.1 25.9c0 3.2-2.6 5.8-5.8 5.9-3.2 0-5.8-2.6-5.8-5.8l-.1-26h-23.6c-3.2 0-5.8-2.6-5.8-5.8s2.6-5.8 5.8-5.8h23.5l-.1-25.9c0-3.2 2.6-5.8 5.8-5.9 3.2 0 5.8 2.6 5.8 5.8l.1 26h23.6c3.3 0 5.8 2.6 5.8 5.8s-2.6 5.8-5.8 5.8zM199.3 191.3c21.5 0 38.9 17.6 38.9 39.3s-17.4 39.3-38.9 39.3-38.9-17.6-38.9-39.3c0-21.7 17.5-39.3 38.9-39.3zm185.4 201.3H86.3c-6.5 0-11.9-5.3-11.9-11.9v-32.4c0-2.5.7-4.8 2.1-6.9l41.3-58.4c3.7-5.2 10.8-6.5 16.1-3.1l56.4 36.8c4.5 3 10.3 2.5 14.4-1L313 220.1c5.1-4.5 13.1-3.8 17.2 1.7l61.5 79.7c1.6 2 2.5 4.6 2.5 7.2v74.4c0 5.2-4.3 9.5-9.5 9.5zm7.9 117.6h-58.8v-12h58.8v12zm-78.4 0h-58.8v-12h58.8v12zm-78.5 0h-58.8v-12h58.8v12zm-78.4 0H98.4v-12h58.8v12h.1zm-78.5 0H57.7c-14.3 0-27.9-5.4-38.3-15.3l8.3-8.7c8.2 7.8 18.8 12 30.1 12h21.1l-.1 12zm333.6-.1l-.3-12c17.8-.4 33.4-11.5 39.8-28.2l11.2 4.3c-8.1 21.3-28 35.4-50.7 35.9zM6.8 477c-3.2-7.1-4.7-14.7-4.7-22.5v-38.2h12v38.2c0 6.1 1.3 12.1 3.7 17.6l-11 4.9zm459.9-24.1h-12v-58.8h12v58.8zM14.1 396.7h-12v-58.8h12v58.8zm452.6-22.3h-12v-58.8h12v58.8zM14.1 318.3h-12v-58.8h12v58.8zM466.7 296h-12v-58.8h12V296zM14.1 239.8h-12V181h12v58.8zm452.6-22.2h-12v-58.8h12v58.8zM14.1 161.4h-12v-58.8h12v58.8zm2.4-76.1L5.3 81.2C13 59.9 33.4 45.5 56.1 45.5h.2v12h-.2c-17.7 0-33.6 11.2-39.6 27.8zm353.6-27.8h-58.8v-12h58.8v12zm-78.5 0h-58.8v-12h58.8v12zm-78.4 0h-58.8v-12h58.8v12zm-78.5 0H75.9v-12h58.8v12z"}})]),e._v(" "),l("h4",{staticClass:"drop-text-here"},[l("b",[e._v(e._s(e.dropText))])])])]):l("div",{staticClass:"image-center position-absolute display-flex flex-column justify-content-center align-items-center",on:{dragover:function(t){return t.preventDefault(),e.onDragover(t)}}},[l("div",[l("svg",{staticClass:"image-icon-drag",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"}},[l("path",{attrs:{d:"M383.6 229l-.5 1.5.7 1.7c-.2-1.1-.2-2.2-.2-3.2zm-119.7-5.4l-.3 1.4.6 1.3c-.2-.8-.3-1.8-.3-2.7zm62.4 3.8l-.2 1 .5 1.1-.3-2.1z"}}),e._v(" "),l("path",{attrs:{d:"M483 326.2l-43.5-100.5c-3.6-8.4-10.3-14.9-18.7-18.4-8.5-3.6-17.8-3.5-26.1.1L391 209c-3.3 1.4-6.1 3.6-8.4 6.3-3.6-8.2-10.2-14.6-18.6-18-8.5-3.4-17.7-3.3-26.1.3-6.1 2.7-10.9 6.8-13.9 12-3.7-8-10.2-14.3-18.4-17.6-8.5-3.4-17.8-3.3-26.1.3l-3.7 1.6c-6.3 2.7-11.2 7.1-14.3 12.4l-20.3-46.9c-4.2-9.8-10.7-16.8-18.7-20.2-8.1-3.5-17.2-3.2-26.5.8l-3.7 1.6c-8 3.5-13.3 9.3-15.5 16.9-2.1 7.3-1 16.2 3.1 25.6l83.4 188.2-64.7-39.8c-11.2-6.8-25.7-4.7-34.4 5.1-11.3 12.5-10.3 31.9 2 43.3l55.8 51.5 50.8 43.4c17.6 16.7 38.2 28.1 59.6 32.9 7.7 1.7 15.5 2.5 23.2 2.5 14.9 0 29.7-3.1 44.2-9.4l27.9-12.1c31.2-13.5 52.8-37.1 62.6-68.4 9.2-29.2 6.6-63-7.3-95.1zM383.6 229c0 1 .1 2.1.2 3.1l-.7-1.7.5-1.4zM281.7 466.6c-.2-.2-.5-.5-.7-.6l-50.4-43.1-55.6-51.5c-7.3-6.7-7.9-18.2-1.2-25.6 4.7-5.3 12.5-6.4 18.5-2.6l65.6 40.2c4.7 2.9 10.4 2.4 14.5-1.3 4.1-3.6 5.3-9.2 3.2-14.2l-83.7-189c-3.2-7.4-3.9-13.4-2.1-18.1 1.7-4.3 5.2-6.5 7.9-7.7l3.7-1.6c12.3-5.3 22.8-.6 28.6 12.9L310.2 350c1.4 3.2 5.1 4.6 8.3 3.3 3.2-1.4 4.7-5.1 3.3-8.3l-48.7-112.5c-2.2-5.2-3-10.8-2-15.4 1.1-5.4 4.5-9.3 9.9-11.7l3.7-1.6c5.3-2.3 11.1-2.3 16.4-.2 5.3 2.2 9.5 6.3 11.8 11.6l43.9 101.5c.7 1.6 1.9 2.7 3.5 3.4 1.6.6 3.3.6 4.8-.1 3.2-1.4 4.7-5.1 3.3-8.3l-32.8-75.9c-8.2-18.9 4.8-25.6 7.5-26.8 10.8-4.7 23.5.4 28.2 11.3l28.9 66.7c1.4 3.2 5.1 4.7 8.3 3.3 3.2-1.4 4.7-5.1 3.3-8.3l-19.4-44.8c-1.3-3-4.9-13.2 3.8-16.9l3.7-1.6c5.2-2.3 11.1-2.3 16.4 0 5.3 2.3 9.6 6.4 11.9 11.8L471.7 331c12.7 29.3 15.1 59.9 6.8 86.3-8.7 27.6-27.9 48.5-55.6 60.5L395 489.9c-38.9 16.9-80.1 8.4-113.3-23.3zm44.6-239.2l.3 2.1-.5-1.1.2-1zm-62.4-3.8l.3 2.7-.6-1.3.3-1.4zM31 217c3.2 0 6-2.6 6-5.7v-40c0-3.2-2.8-5.7-6-5.7s-6 2.6-6 5.7v40c0 3.2 2.8 5.7 6 5.7zm0-66.3c3.2 0 6-2.6 6-5.7v-40c0-3.2-2.8-5.7-6-5.7s-6 2.6-6 5.7v40c0 3.1 2.8 5.7 6 5.7zM148 296h-40c-3.2 0-5.7 2.3-5.7 5.5s2.6 5.5 5.7 5.5h40c3.2 0 5.7-2.3 5.7-5.5s-2.6-5.5-5.7-5.5zM37 237.6c0-3.2-2.8-5.7-6-5.7s-6 2.6-6 5.7v40c0 3.2 2.8 5.7 6 5.7s6-2.6 6-5.7v-40zM31 84.4c3.2 0 6-2.6 6-5.7v-40c0-3.2-2.8-5.7-6-5.7s-6 2.6-6 5.7v40c0 3.1 2.8 5.7 6 5.7zM81.6 296H49.1c-1.7 0-3.4-.6-5-1.3-2.9-1.3-6.3-.1-7.5 2.8-1.3 2.9 0 6.3 2.9 7.5 3 1.3 6.3 2 9.6 2h32.5c3.2 0 5.7-2.3 5.7-5.5s-2.5-5.5-5.7-5.5zm60.6-281c3.2 0 5.7-2.8 5.7-6s-2.6-6-5.7-6h-40c-3.2 0-5.7 2.8-5.7 6s2.6 6 5.7 6h40z"}}),e._v(" "),l("path",{attrs:{d:"M323 122.4c-3.2 0-6 2.6-6 5.7v39.2c0 3.2 2.8 5.7 6 5.7s6-2.6 6-5.7v-39.2c0-3.1-2.8-5.7-6-5.7zm6-60.6c0-3.2-2.8-5.7-6-5.7s-6 2.6-6 5.7v40c0 3.2 2.8 5.7 6 5.7s6-2.6 6-5.7v-40zM301.2 15h3.6c6.8 0 12.2 5.6 12.2 12.4v8.1c0 3.2 2.8 5.7 6 5.7s6-2.6 6-5.7v-8.1C329 14.3 317.9 3 304.8 3h-3.6c-3.2 0-5.7 2.8-5.7 6s2.5 6 5.7 6zm-66.3 0h40c3.2 0 5.7-2.8 5.7-6s-2.6-6-5.7-6h-40c-3.2 0-5.7 2.8-5.7 6s2.5 6 5.7 6zm-60.6 292h40c3.2 0 5.7-2.3 5.7-5.5s-2.6-5.5-5.7-5.5h-40c-3.2 0-5.7 2.3-5.7 5.5s2.5 5.5 5.7 5.5zm-5.8-292h40c3.2 0 5.7-2.8 5.7-6s-2.6-6-5.7-6h-40c-3.2 0-5.7 2.8-5.7 6s2.6 6 5.7 6zM37.1 19.8c1.4 0 2.7-.6 3.8-1.5 2.3-2 5.2-3.2 8.2-3.2h26.8c3.2 0 5.7-2.8 5.7-6s-2.6-6-5.7-6H49.1c-5.9 0-11.5 2.5-15.9 6.5-2.3 2.1-2.5 5.9-.4 8.2 1.1 1.2 2.7 2 4.3 2z"}})])]),e._v(" "),l("div",{staticClass:"text-center"},[l("label",{staticClass:"drag-text"},[e._v(e._s(e.dragText))]),e._v(" "),l("br"),e._v(" "),l("a",{staticClass:"browse-text"},[e._v(e._s(e.browseText))])]),e._v(" "),l("div",{staticClass:"image-input position-absolute full-width full-height"},[l("label",{staticClass:"cursor-pointer full-width full-height",attrs:{for:e.idUpload}})])])]),e._v(" "),e.images.length&&e.multiple?l("div",{staticClass:"flex-wrap image-list-container display-flex"},[e._l(e.images,(function(image,t){return l("div",{key:t,staticClass:"cursor-pointer image-list-item position-relative",class:image.highlight&&"image-highlight",on:{click:function(l){return e.changeHighlight(t)}}},[l("div",{staticClass:"centered"},[l("img",{staticClass:"show-img img-responsive",attrs:{src:image.path}})])])})),e._v(" "),e.images.length<e.maxImage?l("div",{staticClass:"cursor-pointer image-list-item position-relative display-flex justify-content-center align-items-center"},[l("svg",{staticClass:"icon add-image-svg",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"512",height:"512",viewBox:"0 0 512 512"}},[l("path",{attrs:{d:"M511.5 227.5h-227V.5h-57v227H-.5v57h228v228h57v-228h227z"}})]),e._v(" "),l("div",{staticClass:"input-add-image position-absolute full-width full-height"},[l("label",{staticClass:"cursor-pointer display-block full-width full-height",attrs:{for:e.idUpload}})])]):e._e()],2):e._e(),e._v(" "),l("div",[l("input",{staticClass:"display-none",attrs:{label:"Image upload",id:e.idUpload,name:"images",multiple:e.multiple,accept:e.accept,type:"file"},on:{change:e.uploadFieldChange}}),e._v(" "),l("input",{staticClass:"display-none",attrs:{label:"Image Upload",id:e.idEdit,name:"image",accept:e.accept,type:"file"},on:{change:e.editFieldChange}})]),e._v(" "),l("vue-image-lightbox-carousel",{ref:"lightbox",attrs:{show:e.showLightbox,images:e.images,showCaption:!1},on:{close:function(t){e.showLightbox=!1},change:e.changeHighlight}})],1),e._v(" "),l("vs-button",{staticClass:"my-6",on:{click:e.setImages}},[e._v("Use Image")])],1):e._e()],1)],1)}),[],!1,null,"aa7670fe",null);t.a=component.exports},608:function(e,t,l){"use strict";var c=l(589);l.n(c).a},609:function(e,t,l){"use strict";var c=l(590);l.n(c).a}}]);