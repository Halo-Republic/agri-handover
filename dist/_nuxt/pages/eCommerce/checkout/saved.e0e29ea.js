(this.webpackJsonp=this.webpackJsonp||[]).push([[55],{1139:function(t,e,n){"use strict";var r=n(800);n.n(r).a},1216:function(t,e,n){"use strict";n.r(e);n(25),n(28),n(8),n(21),n(22),n(10);var r=n(788),o=(n(789),n(1)),c=n.n(o),l=new(0,n(790).PayFastAPI)({merchant_id:"10017515",merchant_key:"omnkr3wlkmlfn",production:!1}),d={data:function(){return{checkBox1:"Delivery",paymentID:null,quoteRequest:!1,savedAddress:!1,deliveryToo:{},branchesAvail:[],transActionType:"",transactionDetails:{created_date:c()().format("DD-MM-YYYY"),created_month:c()().format("MM-YYYY"),timestamp:Date.now()},fullName:"",mobileNum:"",pincode:"",houseNum:"",area:"",landmark:"",city:"",state:"",addressType:"Home",addressTypeOptions:[{text:"Home",value:"Home"},{text:"Office",value:"Office"}],paymentMethod:"debit-card",cvv:""}},filters:{capitalize:function(t){return t?(t=t.toString()).charAt(0).toUpperCase()+t.slice(1):""},thousandSeprator:function(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}},computed:{shopType:function(){return this.$store.state.eCommerce.shopType},app_active_user:function(){return this.$store.state.user.app_active_user},userCompanies:function(){return this.$store.state.user.app_active_user.apps},cartItems:function(){return this.$store.state.eCommerce.cartItems.slice().reverse()},isInWishList:function(){var t=this;return function(e){return t.$store.getters["eCommerce/isInWishList"](e)}},cost:function(){for(var t=0,i=0;i<this.cartItems.length;i++){var e=parseInt(this.cartItems[i].price)*parseInt(this.cartItems[i].quantity);t+=e}return t},totalCost:function(){return this.cost+this.totalVat-this.totalDiscount},totalVat:function(){return 0},totalDiscount:function(){return 0}},methods:{buyingOwner:function(){for(var i=0;i<this.cartItems.length;i++){var t={m_payment_id:this.paymentID,client_uid:this.app_active_user.uid,client_displayname:this.app_active_user.display_name,client_email:this.app_active_user.email,cart_items:this.cartItems[i],price:this.cartItems[i].price,ctc:this.cartItems[i].ctc,item_ref:this.cartItems[i].objectID,total_price:Number(this.cartItems[i].price)*Number(this.cartItems[i].quantity),total_profit:(Number(this.cartItems[i].price)-Number(this.cartItems[i].ctc))*Number(this.cartItems[i].quantity),total_quantity:this.cartItems[i].quantity,total_CTC:Number(this.cartItems[i].ctc)*Number(this.cartItems[i].quantity),payment_received:!1,verify_payfast:!1,stage:this.transActionType,invoiced_date:c()().format("DD-MM-YYYY"),invoiced_month:c()().format("MM-YYYY"),created_date:c()().format("DD-MM-YYYY"),created_month:c()().format("MM-YYYY"),timestamp:Date.now()};"Invoice"==this.transActionType?(t.invoiced_date=c()().format("DD-MM-YYYY"),t.invoiced_month=c()().format("MM-YYYY")):"Quote"==this.transActionType?(t.quoted_date=c()().format("DD-MM-YYYY"),t.quoted_month=c()().format("MM-YYYY")):"Viewing"==this.transActionType&&(t.viewing_request_date=c()().format("DD-MM-YYYY"),t.viewing_request_month=c()().format("MM-YYYY")),this.savedAddress?(t.full_name=this.fullName,t.mobile_num=this.mobileNum,t.pincode=this.pincode,t.house_num=this.houseNum,t.area=this.area,t.landmark=this.landmark,t.city=this.city,t.state=this.state,t.address_type=this.addressType):t.deliveryToo=this.deliveryToo,this.$fireStore.collection("apps").doc("crm").collection(this.cartItems[i].sellerID).doc("sales").collection("sales").add(t)}this.buyingNow()},buyingNow:function(t){var e=this.app_active_user;this.paymentID=Math.floor(1e9*Math.random());var n;this.transActionType=t,"Invoice"==this.transActionType?(this.transactionDetails.invoiced_date=c()().format("DD-MM-YYYY"),this.transactionDetails.invoiced_month=c()().format("MM-YYYY")):"Quote"==this.transActionType?(this.transactionDetails.quoted_date=c()().format("DD-MM-YYYY"),this.transactionDetails.quoted_month=c()().format("MM-YYYY")):"Viewing"==this.transActionType&&(this.transactionDetails.viewing_request_date=c()().format("DD-MM-YYYY"),this.transactionDetails.viewing_request_month=c()().format("MM-YYYY")),this.savedAddress?(this.transactionDetails.full_name=this.fullName,this.transactionDetails.mobile_num=this.mobileNum,this.transactionDetails.pincode=this.pincode,this.transactionDetails.house_num=this.houseNum,this.transactionDetails.area=this.area,this.transactionDetails.landmark=this.landmark,this.transactionDetails.city=this.city,this.transactionDetails.state=this.state,this.transactionDetails.address_type=this.addressType):this.transactionDetails.deliveryToo=this.deliveryToo,this.transactionDetails.shopType=this.shopType,this.transactionDetails.m_payment_id=this.paymentID,this.transactionDetails.client_uid=this.app_active_user.uid,this.transactionDetails.client_displayname=this.app_active_user.display_name,this.transactionDetails.client_email=this.app_active_user.email,this.transactionDetails.cart_items=this.cartItems,this.transactionDetails.total_cost=this.totalCost,this.transactionDetails.collection_type=this.checkBox1,this.transactionDetails.paid_owner=!1,this.transactionDetails.verify_payfast=!1,this.transactionDetails.stage=this.transActionType,this.transactionDetails.comp_email=this.$store.state.business.app_main_business.contact_email,this.transactionDetails.comp_name=this.$store.state.business.app_main_business.appname,this.transactionDetails.comp_id=this.$store.state.business.app_main_business.b_uid,console.log("tra",this.transactionDetails),this.$fireStore.collection("apps").doc("crm").collection(this.$store.state.business.app_main_business.b_uid).doc("sales").collection("transactions").add(this.transactionDetails),l.addPaymentDetails({amount:this.totalCost,item_name:this.$store.state.business.app_main_business.appname,currency:"ZAR",email_address:e.email,item_description:this.cartItems,name_first:e.displayName,name_last:e.surname,payment_method:"PayFast"}),l.addReferenceDetails({m_payment_id:e.id,email_address:e.email,item_description:this.cartItems,name_first:e.displayName,name_last:e.surname}),n=window.location.hostname,l.returnURL("https://".concat(n,"/transaction/success")),l.cancelURL("https://".concat(n,"/transaction/cancelled")),l.notifyURL("https://".concat(n,"/success")),window.open(l.generateURL())},removeItemFromCart:function(t){this.$store.dispatch("eCommerce/toggleItemInCart",t)},wishListButtonClicked:function(t){this.isInWishList(t.objectID)?this.$router.push("/apps/eCommerce/wish-list").catch((function(){})):(this.toggleItemInWishList(t),this.removeItemFromCart(t))},toggleItemInWishList:function(t){this.$store.dispatch("eCommerce/toggleItemInWishList",t)},updateItemQuantity:function(t,e){var n=Math.abs(e+1-this.cartItems.length);this.$store.dispatch("eCommerce/updateItemQuantity",{quantity:t,index:n})},submitComp:function(t,e){var n=this;this.savedAddress=!1,this.deliveryToo.name=e.appname,this.deliveryToo.id=e.id,this.deliveryToo.type="company",console.log("comp",e.id),this.$fireStore.collection("apps").doc("info").collection("groups").doc(e.id).collection("branches").get().then((function(t){t.forEach((function(t){n.branchesAvail.push(t.data()),console.log(t.id," => ",t.data())}))})).catch((function(t){console.log("rer",t),alert("No Branches set")}))},submitAddress:function(t,e){this.savedAddress=!1,"Company"==t?(this.deliveryToo.branch=e.branch,this.deliveryToo.address=e.adr_address):(this.deliveryToo.name=this.app_active_user.display_name,this.deliveryToo.id=this.app_active_user.uid,this.deliveryToo.type="person"),this.$refs.checkoutWizard.nextTab()},submitNewAddressForm:function(){this.savedAddress=!0,this.$refs.checkoutWizard.nextTab()},makePayment:function(){var t=this;return new Promise((function(){t.$validator.validateAll("cvv-form").then((function(e){e?t.$vs.notify({title:"Success",text:"Payment received successfully",color:"success",iconPack:"feather",icon:"icon-check"}):t.$vs.notify({title:"Error",text:"Please enter valid details",color:"warning",iconPack:"feather",icon:"icon-alert-circle"})}))}))}},components:{ItemListView:function(){return n.e(14).then(n.bind(null,1226))},FormWizard:r.FormWizard,TabContent:r.TabContent}},v=(n(1139),n(7)),component=Object(v.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"ecommerce-checkout-demo"}},[n("form-wizard",{ref:"checkoutWizard",staticStyle:{"margin-top":"85px"},attrs:{color:"rgba(var(--vs-primary), 1)",title:null,subtitle:null,"hide-buttons":!0}},[n("tab-content",{staticClass:"mb-5",attrs:{title:"Cart",icon:"feather icon-shopping-cart"}},[t.cartItems.length?n("div",{staticClass:"vx-row"},[n("div",{staticClass:"vx-col lg:w-2/3 w-full relative"},t._l(t.cartItems,(function(e,r){return n("div",{key:e.objectID,staticClass:"items-list-view"},[n("item-list-view",{staticClass:"mb-base",attrs:{item:e}},[n("template",{slot:"item-meta"},[n("h6",{staticClass:"item-name font-semibold mb-1 cursor-pointer hover:text-primary",on:{click:function(n){return t.$router.push({name:"ecommerce-item-detail-view",params:{item_id:e.objectID}})}}},[t._v("\n                  "+t._s(e.name)+"\n                ")]),t._v(" "),n("p",{staticClass:"text-sm mb-2"},[t._v("\n                  By\n                  "),n("span",{staticClass:"font-semibold cursor-pointer"},[t._v(t._s(e.brand.brand))])]),t._v(" "),n("p",{staticClass:"text-success text-sm"},[t._v("In Stock")]),t._v(" "),n("p",{staticClass:"mt-4 font-bold text-sm"},[t._v("Quantity")]),t._v(" "),n("vs-input-number",{staticClass:"inline-flex",attrs:{min:"1",max:"10",value:e.quantity},on:{input:function(e){return t.updateItemQuantity(e,r)}}}),t._v(" "),n("p",{staticClass:"text-success font-medium"},[t._v("\n                  "+t._s(e.discount_in_percentage)+"% off\n                  "+t._s(e.offers_count)+" offers Available\n                ")])],1),t._v(" "),n("template",{slot:"action-buttons"},[n("div",{staticClass:"item-view-primary-action-btn p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3",on:{click:function(n){return t.removeItemFromCart(e)}}},[n("feather-icon",{attrs:{icon:"XIcon",svgClasses:"h-4 w-4"}}),t._v(" "),n("span",{staticClass:"text-sm font-semibold ml-2"},[t._v("REMOVE")])],1),t._v(" "),n("div",{staticClass:"item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer",on:{click:function(n){return t.wishListButtonClicked(e)}}},[n("feather-icon",{attrs:{icon:"HeartIcon",svgClasses:[{"text-white fill-current":t.isInWishList(e.objectID)},"h-4 w-4"]}}),t._v(" "),(t.isInWishList(e.objectID),n("span",{staticClass:"text-sm font-semibold ml-2"},[t._v("WISHLIST")]))],1)])],2)],1)})),0),t._v(" "),n("div",{staticClass:"vx-col lg:w-1/3 w-full"},[n("vx-card",[n("p",{staticClass:"text-grey mb-3"},[t._v("Options")]),t._v(" "),n("div",{staticClass:"flex justify-between"},[n("span",{staticClass:"font-semibold"},[t._v("Coupons")]),t._v(" "),n("span",{staticClass:"font-medium text-primary cursor-pointer"},[t._v("Apply")])]),t._v(" "),n("vs-divider"),t._v(" "),n("p",{staticClass:"font-semibold mb-3"},[t._v("Price Details")]),t._v(" "),n("div",{staticClass:"flex justify-between mb-2"},[n("span",{staticClass:"text-grey"},[t._v("Total MRP")]),t._v(" "),n("span",[t._v("R"+t._s(t._f("thousandSeprator")(t.cost)))])]),t._v(" "),n("div",{staticClass:"flex justify-between mb-2"},[n("span",{staticClass:"text-grey"},[t._v("Discount")]),t._v(" "),n("span",{staticClass:"text-success"},[t._v("R"+t._s(t._f("thousandSeprator")(t.totalDiscount)))])]),t._v(" "),n("div",{staticClass:"flex justify-between mb-2"},[n("span",{staticClass:"text-grey"},[t._v("Estimated Tax")]),t._v(" "),n("span",[t._v("R0")])]),t._v(" "),n("div",{staticClass:"flex justify-between mb-2"},[n("span",{staticClass:"text-grey"},[t._v("Delivery Charges")]),t._v(" "),n("span",{staticClass:"text-success"},[t._v("Not included")])]),t._v(" "),n("vs-divider"),t._v(" "),n("div",{staticClass:"flex justify-between font-semibold mb-3"},[n("span",[t._v("Total")]),t._v(" "),n("span",[t._v("R"+t._s(t._f("thousandSeprator")(t.totalCost)))])]),t._v(" "),n("vs-button",{staticClass:"w-full",on:{click:function(e){return t.$refs.checkoutWizard.nextTab()}}},[t._v("PLACE ORDER")])],1)],1)]):n("vx-card",{attrs:{title:"You don't have any items in your cart."}},[n("vs-button",{on:{click:function(e){return t.$router.push("/apps/eCommerce/shop")}}},[t._v("Browse Shop")])],1)],1),t._v(" "),n("tab-content",{staticClass:"mb-5",attrs:{title:"Address",icon:"feather icon-home"}},[n("div",[n("ul",{staticClass:"ml-10 mb-10"},[n("li",[n("vs-radio",{attrs:{"vs-name":"checkBox1","vs-value":"Delivery"},model:{value:t.checkBox1,callback:function(e){t.checkBox1=e},expression:"checkBox1"}},[t._v("Delivery")])],1),t._v(" "),n("li",[n("vs-radio",{attrs:{"vs-name":"checkBox1","vs-value":"Pickup"},model:{value:t.checkBox1,callback:function(e){t.checkBox1=e},expression:"checkBox1"}},[t._v("Pickup")])],1)])]),t._v(" "),"Pickup"==t.checkBox1?n("div",{staticClass:"vx-row"},[n("vx-card",{staticClass:"mb-base",attrs:{title:"Pick up",subtitle:'Be sure to check "Pickup at this address" when you have finished'}},[t._l(t.cartItems,(function(e){return n("div",{key:e.objectID,staticClass:"items-list-view"},[n("h6",{staticClass:"item-name font-semibold mb-1 cursor-pointer hover:text-primary",on:{click:function(n){return t.$router.push({name:"ecommerce-item-detail-view",params:{item_id:e.objectID}})}}},[t._v("\n              "+t._s(e.name)+"\n            ")]),t._v(" "),n("p",{staticClass:"text-sm mb-2"},[t._v("\n              By\n              "),n("span",{staticClass:"font-semibold cursor-pointer"},[t._v(t._s(e.brand))])]),t._v(" "),n("p",{staticClass:"text-success text-sm"},[t._v("In Stock")]),t._v(" "),n("p",{staticClass:"mt-4 font-bold text-sm"},[t._v("Pickup from:")]),t._v(" "),n("p",{staticClass:"text-sm mb-2"},[t._v("\n              Farm\n              "),n("span",{staticClass:"font-semibold cursor-pointer"},[t._v(t._s(e.sellerName))])]),t._v(" "),n("vs-divider")],1)})),t._v(" "),n("vs-button",{staticClass:"mt-6 ml-auto flex",on:{click:function(e){return t.$refs.checkoutWizard.nextTab()}}},[t._v("Continue")])],2)],1):t._e(),t._v(" "),"Delivery"==t.checkBox1?n("div",{staticClass:"vx-row"},[n("div",{staticClass:"vx-col lg:w-2/3 w-full"},[n("vx-card",{staticClass:"mb-base",attrs:{title:"Add New Address",subtitle:'Be sure to check "Deliver to this address" when you have finished'}},[n("form",{attrs:{"data-vv-scope":"add-new-address"}},[n("div",{staticClass:"vx-row"},[n("div",{staticClass:"vx-col sm:w-1/2 w-full"},[n("vs-input",{staticClass:"w-full mt-5",attrs:{"data-vv-as":"field",name:"fullName",label:"Full Name:"},model:{value:t.fullName,callback:function(e){t.fullName=e},expression:"fullName"}})],1),t._v(" "),n("div",{staticClass:"vx-col sm:w-1/2 w-full"},[n("vs-input",{staticClass:"w-full mt-5",attrs:{name:"mobileNum",label:"Mobile Number:"},model:{value:t.mobileNum,callback:function(e){t.mobileNum=e},expression:"mobileNum"}})],1)]),t._v(" "),n("div",{staticClass:"vx-row"},[n("div",{staticClass:"vx-col sm:w-1/2 w-full"},[n("vs-input",{staticClass:"w-full mt-5",attrs:{name:"houseNum",label:"Flat, House No:"},model:{value:t.houseNum,callback:function(e){t.houseNum=e},expression:"houseNum"}})],1),t._v(" "),n("div",{staticClass:"vx-col sm:w-1/2 w-full"},[n("vs-input",{staticClass:"w-full mt-5",attrs:{name:"landmark",label:"Landmark e.g. near apollo hospital:"},model:{value:t.landmark,callback:function(e){t.landmark=e},expression:"landmark"}})],1)]),t._v(" "),n("div",{staticClass:"vx-row"},[n("div",{staticClass:"vx-col sm:w-1/2 w-full"},[n("vs-input",{staticClass:"w-full mt-5",attrs:{name:"city",label:"Town/City:"},model:{value:t.city,callback:function(e){t.city=e},expression:"city"}})],1),t._v(" "),n("div",{staticClass:"vx-col sm:w-1/2 w-full"},[n("vs-input",{staticClass:"w-full mt-5",attrs:{name:"pincode",label:"Area Code:"},model:{value:t.pincode,callback:function(e){t.pincode=e},expression:"pincode"}})],1)]),t._v(" "),n("div",{staticClass:"vx-row"},[n("div",{staticClass:"vx-col sm:w-1/2 w-full"},[n("vs-input",{staticClass:"w-full mt-5",attrs:{name:"state",label:"Province:"},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}})],1),t._v(" "),n("div",{staticClass:"vx-col sm:w-1/2 w-full"},[n("vs-select",{staticClass:"w-full mt-5",attrs:{label:"Address Type:"},model:{value:t.addressType,callback:function(e){t.addressType=e},expression:"addressType"}},t._l(t.addressTypeOptions,(function(t,e){return n("vs-select-item",{key:e,attrs:{value:t.value,text:t.text}})})),1)],1)]),t._v(" "),n("vs-button",{staticClass:"mt-6 ml-auto flex",on:{click:function(e){return e.preventDefault(),t.submitNewAddressForm(e)}}},[t._v("SAVE AND DELIVER HERE")])],1)])],1),t._v(" "),n("div",{staticClass:"vx-col lg:w-1/3 w-full"},[t._l(t.userCompanies,(function(e){return n("vx-card",{key:e.id,attrs:{title:e.appname}},[n("div",{domProps:{innerHTML:t._s(e.address_html)}},[t._v("\n              "+t._s(e.address_html)+"\n            ")]),t._v(" "),n("vs-divider"),t._v(" "),n("vs-button",{staticClass:"w-full",on:{click:function(n){return t.submitComp("Company",e)}}},[t._v("DELIVER TO THIS ADDRESS")])],1)})),t._v(" "),t.branchesAvail?n("div",t._l(t.branchesAvail,(function(e){return n("vx-card",{key:e.id,attrs:{title:e.branch}},[n("div",{domProps:{innerHTML:t._s(e.adr_address)}},[t._v("\n                "+t._s(e.adr_address)+"\n              ")]),t._v(" "),n("vs-divider"),t._v(" "),n("vs-button",{staticClass:"w-full",on:{click:function(n){return t.submitAddress("Company",e)}}},[t._v("DELIVER TO THIS ADDRESS")])],1)})),1):t._e(),t._v(" "),n("vx-card",{attrs:{title:t.app_active_user.display_name}},[n("vs-divider"),t._v(" "),n("vs-button",{staticClass:"w-full",on:{click:function(e){return t.submitAddress("Personal","toets")}}},[t._v("DELIVER TO THIS ADDRESS")])],1)],2)]):t._e()]),t._v(" "),n("tab-content",{staticClass:"mb-5",attrs:{title:"Payment",icon:"feather icon-credit-card"}},[n("div",{staticClass:"vx-row"},[n("div",{staticClass:"vx-col lg:w-1/3 w-full"},[n("vx-card",{attrs:{title:"Pay now online"}},[n("div",{staticClass:"flex justify-between mb-2"},[n("span",[t._v("Price 3 Items")]),t._v(" "),n("span",{staticClass:"font-semibold"},[t._v("R"+t._s(t._f("thousandSeprator")(t.totalCost)))])]),t._v(" "),n("div",{staticClass:"flex justify-between mb-2"},[n("span",[t._v("Delivery Charges")]),t._v(" "),n("span",{staticClass:"text-success"},[t._v("Not included")])]),t._v(" "),n("vs-divider"),t._v(" "),n("div",{staticClass:"flex justify-between"},[n("span",[t._v("Amount Payable")]),t._v(" "),n("span",{staticClass:"font-semibold"},[t._v("R"+t._s(t._f("thousandSeprator")(t.totalCost)))])]),t._v(" "),n("vs-button",{staticClass:"mt-4",on:{click:function(e){return t.buyingNow("Payment")}}},[t._v("Buy Now")])],1)],1),t._v(" "),n("div",{staticClass:"vx-col lg:w-1/3 w-full"},[n("vx-card",{attrs:{title:"Get Quote"}},[n("div",{staticClass:"flex justify-between mb-2"},[n("span",[t._v("Price 3 Items")]),t._v(" "),n("span",{staticClass:"font-semibold"},[t._v("R"+t._s(t._f("thousandSeprator")(t.totalCost)))])]),t._v(" "),n("div",{staticClass:"flex justify-between mb-2"},[n("span",[t._v("Delivery Charges")]),t._v(" "),n("span",{staticClass:"text-success"},[t._v("Not included")])]),t._v(" "),n("vs-divider"),t._v(" "),n("div",{staticClass:"flex justify-between"},[n("span",[t._v("Amount Payable")]),t._v(" "),n("span",{staticClass:"font-semibold"},[t._v("R"+t._s(t._f("thousandSeprator")(t.totalCost)))])]),t._v(" "),n("vs-button",{staticClass:"mt-4",on:{click:function(e){return t.buyingNow("Quote")}}},[t._v("Get Quote")])],1)],1),t._v(" "),n("div",{staticClass:"vx-col lg:w-1/3 w-full"},[n("vx-card",{attrs:{title:"Arrange Viewing"}},[n("div",{staticClass:"flex justify-between mb-2"},[n("span",[t._v("Price 3 Items")]),t._v(" "),n("span",{staticClass:"font-semibold"},[t._v("R"+t._s(t._f("thousandSeprator")(t.totalCost)))])]),t._v(" "),n("div",{staticClass:"flex justify-between mb-2"},[n("span",[t._v("Delivery Charges")]),t._v(" "),n("span",{staticClass:"text-success"},[t._v("Not included")])]),t._v(" "),n("vs-divider"),t._v(" "),n("div",{staticClass:"flex justify-between"},[n("span",[t._v("Amount Payable")]),t._v(" "),n("span",{staticClass:"font-semibold"},[t._v("R"+t._s(t._f("thousandSeprator")(t.totalCost)))])]),t._v(" "),n("vs-button",{staticClass:"mt-4",on:{click:function(e){return t.buyingNow("Viewing")}}},[t._v("Arrange Viewing")])],1)],1)])])],1)],1)}),[],!1,null,"5e8d981e",null);e.default=component.exports},788:function(t,e,n){"undefined"!=typeof self&&self,t.exports=function(t){function e(n){if(a[n])return a[n].exports;var i=a[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var a={};return e.m=t,e.c=a,e.d=function(t,a,n){e.o(t,a)||Object.defineProperty(t,a,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,"a",a),a},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=7)}([function(t,e){t.exports=function(t,e,a,n,i,r){var s,o=t=t||{},c=typeof t.default;"object"!==c&&"function"!==c||(s=t,o=t.default);var l,u="function"==typeof o?o.options:o;if(e&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0),a&&(u.functional=!0),i&&(u._scopeId=i),r?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},u._ssrRegister=l):n&&(l=n),l){var d=u.functional,b=d?u.render:u.beforeCreate;d?(u._injectStyles=l,u.render=function(t,e){return l.call(e),b(t,e)}):u.beforeCreate=b?[].concat(b,l):[l]}return{esModule:s,exports:o,options:u}}},function(t,e,a){"use strict";var n=a(2),i=a(4),r=a(14);e.a={name:"form-wizard",components:{WizardButton:n.a,WizardStep:i.a},props:{title:{type:String,default:"Awesome Wizard"},subtitle:{type:String,default:"Split a complicated flow in multiple steps"},nextButtonText:{type:String,default:"Next"},backButtonText:{type:String,default:"Back"},finishButtonText:{type:String,default:"Finish"},hideButtons:{type:Boolean,default:!1},validateOnBack:Boolean,color:{type:String,default:"#e74c3c"},errorColor:{type:String,default:"#8b0000"},shape:{type:String,default:"circle"},layout:{type:String,default:"horizontal"},stepsClasses:{type:[String,Array],default:""},stepSize:{type:String,default:"md",validator:function(t){return-1!==["xs","sm","md","lg"].indexOf(t)}},transition:{type:String,default:""},startIndex:{type:Number,default:0,validator:function(t){return t>=0}}},provide:function(){return{addTab:this.addTab,removeTab:this.removeTab}},data:function(){return{activeTabIndex:0,currentPercentage:0,maxStep:0,loading:!1,tabs:[]}},computed:{slotProps:function(){return{nextTab:this.nextTab,prevTab:this.prevTab,activeTabIndex:this.activeTabIndex,isLastStep:this.isLastStep,fillButtonStyle:this.fillButtonStyle}},tabCount:function(){return this.tabs.length},isLastStep:function(){return this.activeTabIndex===this.tabCount-1},isVertical:function(){return"vertical"===this.layout},displayPrevButton:function(){return 0!==this.activeTabIndex},stepPercentage:function(){return 1/(2*this.tabCount)*100},progressBarStyle:function(){return{backgroundColor:this.color,width:this.progress+"%",color:this.color}},fillButtonStyle:function(){return{backgroundColor:this.color,borderColor:this.color,color:"white"}},progress:function(){return this.activeTabIndex>0?this.stepPercentage*(2*this.activeTabIndex+1):this.stepPercentage}},methods:{emitTabChange:function(t,e){this.$emit("on-change",t,e),this.$emit("update:startIndex",e)},addTab:function(t){var e=this.$slots.default.indexOf(t.$vnode);t.tabId=""+t.title.replace(/ /g,"")+e,this.tabs.splice(e,0,t),e<this.activeTabIndex+1&&(this.maxStep=e,this.changeTab(this.activeTabIndex+1,e))},removeTab:function(t){var e=this.tabs,a=e.indexOf(t);a>-1&&(a===this.activeTabIndex&&(this.maxStep=this.activeTabIndex-1,this.changeTab(this.activeTabIndex,this.activeTabIndex-1)),a<this.activeTabIndex&&(this.maxStep=this.activeTabIndex-1,this.activeTabIndex=this.activeTabIndex-1,this.emitTabChange(this.activeTabIndex+1,this.activeTabIndex)),e.splice(a,1))},reset:function(){this.maxStep=0,this.tabs.forEach((function(t){t.checked=!1})),this.navigateToTab(0)},activateAll:function(){this.maxStep=this.tabs.length-1,this.tabs.forEach((function(t){t.checked=!0}))},navigateToTab:function(t){var e=this,a=t>this.activeTabIndex;if(t<=this.maxStep){var n=function n(){a&&t-e.activeTabIndex>1?(e.changeTab(e.activeTabIndex,e.activeTabIndex+1),e.beforeTabChange(e.activeTabIndex,n)):(e.changeTab(e.activeTabIndex,t),e.afterTabChange(e.activeTabIndex))};a?this.beforeTabChange(this.activeTabIndex,n):(this.setValidationError(null),n())}return t<=this.maxStep},nextTab:function(){var t=this;this.beforeTabChange(this.activeTabIndex,(function(){t.activeTabIndex<t.tabCount-1?(t.changeTab(t.activeTabIndex,t.activeTabIndex+1),t.afterTabChange(t.activeTabIndex)):t.$emit("on-complete")}))},prevTab:function(){var t=this,e=function(){t.activeTabIndex>0&&(t.setValidationError(null),t.changeTab(t.activeTabIndex,t.activeTabIndex-1))};this.validateOnBack?this.beforeTabChange(this.activeTabIndex,e):e()},focusNextTab:function(){var t=Object(r.b)(this.tabs);if(-1!==t&&t<this.tabs.length-1){var e=this.tabs[t+1];e.checked&&Object(r.a)(e.tabId)}},focusPrevTab:function(){var t=Object(r.b)(this.tabs);if(-1!==t&&t>0){var e=this.tabs[t-1].tabId;Object(r.a)(e)}},setLoading:function(t){this.loading=t,this.$emit("on-loading",t)},setValidationError:function(t){this.tabs[this.activeTabIndex].validationError=t,this.$emit("on-error",t)},validateBeforeChange:function(t,e){var a=this;if(this.setValidationError(null),Object(r.c)(t))this.setLoading(!0),t.then((function(t){a.setLoading(!1);var n=!0===t;a.executeBeforeChange(n,e)})).catch((function(t){a.setLoading(!1),a.setValidationError(t)}));else{var n=!0===t;this.executeBeforeChange(n,e)}},executeBeforeChange:function(t,e){this.$emit("on-validate",t,this.activeTabIndex),t?e():this.tabs[this.activeTabIndex].validationError="error"},beforeTabChange:function(t,e){if(!this.loading){var a=this.tabs[t];if(a&&void 0!==a.beforeChange){var n=a.beforeChange();this.validateBeforeChange(n,e)}else e()}},afterTabChange:function(t){if(!this.loading){var e=this.tabs[t];e&&void 0!==e.afterChange&&e.afterChange()}},changeTab:function(t,e){var a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],n=this.tabs[t],i=this.tabs[e];return n&&(n.active=!1),i&&(i.active=!0),a&&this.activeTabIndex!==e&&this.emitTabChange(t,e),this.activeTabIndex=e,this.activateTabAndCheckStep(this.activeTabIndex),!0},tryChangeRoute:function(t){this.$router&&t.route&&this.$router.push(t.route)},checkRouteChange:function(t){var e=-1,a=this.tabs.find((function(a,n){var i=a.route===t;return i&&(e=n),i}));if(a&&!a.active){var n=e>this.activeTabIndex;this.navigateToTab(e,n)}},deactivateTabs:function(){this.tabs.forEach((function(t){t.active=!1}))},activateTab:function(t){this.deactivateTabs();var e=this.tabs[t];e&&(e.active=!0,e.checked=!0,this.tryChangeRoute(e))},activateTabAndCheckStep:function(t){this.activateTab(t),t>this.maxStep&&(this.maxStep=t),this.activeTabIndex=t},initializeTabs:function(){this.tabs.length>0&&0===this.startIndex&&this.activateTab(this.activeTabIndex),this.startIndex<this.tabs.length?this.activateTabAndCheckStep(this.startIndex):window.console.warn("Prop startIndex set to "+this.startIndex+" is greater than the number of tabs - "+this.tabs.length+". Make sure that the starting index is less than the number of tabs registered")}},mounted:function(){this.initializeTabs()},watch:{"$route.path":function(t){this.checkRouteChange(t)}}}},function(t,e,a){"use strict";var i=a(3),n=a(11),r=function(t){a(10)},o=a(0)(i.a,n.a,!1,r,null,null);e.a=o.exports},function(t,e,a){"use strict";e.a={}},function(t,e,a){"use strict";var i=a(5),n=a(13),r=function(t){a(12)},o=a(0)(i.a,n.a,!1,r,null,null);e.a=o.exports},function(t,e,a){"use strict";e.a={name:"wizard-step",props:{tab:{type:Object,default:function(){}},transition:{type:String,default:""},index:{type:Number,default:0}},computed:{iconActiveStyle:function(){return{backgroundColor:this.tab.color}},stepCheckedStyle:function(){return{borderColor:this.tab.color}},errorStyle:function(){return{borderColor:this.tab.errorColor,backgroundColor:this.tab.errorColor}},stepTitleStyle:function(){return{color:this.tab.validationError?this.tab.errorColor:this.tab.color}},isStepSquare:function(){return"square"===this.tab.shape},isTabShape:function(){return"tab"===this.tab.shape}}}},function(t,e,a){"use strict";e.a={name:"tab-content",props:{title:{type:String,default:""},icon:{type:String,default:""},beforeChange:{type:Function},afterChange:{type:Function},route:{type:[String,Object]},additionalInfo:{type:Object,default:function(){}}},inject:["addTab","removeTab"],data:function(){return{active:!1,validationError:null,checked:!1,tabId:""}},computed:{shape:function(){return this.$parent.shape},color:function(){return this.$parent.color},errorColor:function(){return this.$parent.errorColor}},mounted:function(){this.addTab(this)},destroyed:function(){this.$el&&this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el),this.removeTab(this)}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(8),i=a(16),r=a(2),s=a(4);a.d(e,"FormWizard",(function(){return n.a})),a.d(e,"TabContent",(function(){return i.a})),a.d(e,"WizardButton",(function(){return r.a})),a.d(e,"WizardStep",(function(){return s.a}));var o={install:function(t){t.component("form-wizard",n.a),t.component("tab-content",i.a),t.component("wizard-button",r.a),t.component("wizard-step",s.a)}};"undefined"!=typeof window&&window.Vue&&window.Vue.use(o),e.default=o},function(t,e,a){"use strict";var i=a(1),n=a(15),r=function(t){a(9)},o=a(0)(i.a,n.a,!1,r,null,null);e.a=o.exports},function(t,e){},function(t,e){},function(t,e,a){"use strict";var n={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("button",{staticClass:"wizard-btn",attrs:{tabindex:"-1",type:"button"}},[t._t("default")],2)},staticRenderFns:[]};e.a=n},function(t,e){},function(t,e,a){"use strict";var n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{class:{active:t.tab.active}},[a("a",{class:{disabled:!t.tab.checked},attrs:{href:"javascript:void(0)"}},[a("div",{staticClass:"wizard-icon-circle md",class:{checked:t.tab.checked,square_shape:t.isStepSquare,tab_shape:t.isTabShape},style:[t.tab.checked?t.stepCheckedStyle:{},t.tab.validationError?t.errorStyle:{}],attrs:{role:"tab",tabindex:t.tab.checked?0:"",id:"step-"+t.tab.tabId,"aria-controls":t.tab.tabId,"aria-disabled":t.tab.active,"aria-selected":t.tab.active}},[a("transition",{attrs:{name:t.transition,mode:"out-in"}},[t.tab.active?a("div",{staticClass:"wizard-icon-container",class:{square_shape:t.isStepSquare,tab_shape:t.isTabShape},style:[t.tab.active?t.iconActiveStyle:{},t.tab.validationError?t.errorStyle:{}]},[t._t("active-step",[t.tab.icon?a("i",{staticClass:"wizard-icon",class:t.tab.icon}):a("i",{staticClass:"wizard-icon"},[t._v(t._s(t.index+1))])])],2):t._e(),t._v(" "),t.tab.active?t._e():t._t("default",[!t.tab.active&&t.tab.icon?a("i",{staticClass:"wizard-icon",class:t.tab.icon}):t._e(),t._v(" "),t.tab.active||t.tab.icon?t._e():a("i",{staticClass:"wizard-icon"},[t._v(t._s(t.index+1))])])],2)],1),t._v(" "),t._t("title",[a("span",{staticClass:"stepTitle",class:{active:t.tab.active,has_error:t.tab.validationError},style:t.tab.active?t.stepTitleStyle:{}},[t._v("\n            "+t._s(t.tab.title)+"\n      ")])])],2)])},staticRenderFns:[]};e.a=n},function(t,e,a){"use strict";function n(){return document.activeElement.id}e.b=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=n();return t.findIndex((function(t){return t.tabId===e}))},e.a=function(t){document.getElementById(t).focus()},e.c=function(t){return t.then&&"function"==typeof t.then}},function(t,e,a){"use strict";var n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"vue-form-wizard",class:[t.stepSize,{vertical:t.isVertical}],on:{keyup:[function(e){return"button"in e||!t._k(e.keyCode,"right",39,e.key)?"button"in e&&2!==e.button?null:void t.focusNextTab(e):null},function(e){return"button"in e||!t._k(e.keyCode,"left",37,e.key)?"button"in e&&0!==e.button?null:void t.focusPrevTab(e):null}]}},[a("div",{staticClass:"wizard-header"},[t._t("title",[a("h4",{staticClass:"wizard-title"},[t._v(t._s(t.title))]),t._v(" "),a("p",{staticClass:"category"},[t._v(t._s(t.subtitle))])])],2),t._v(" "),a("div",{staticClass:"wizard-navigation"},[t.isVertical?t._e():a("div",{staticClass:"wizard-progress-with-circle"},[a("div",{staticClass:"wizard-progress-bar",style:t.progressBarStyle})]),t._v(" "),a("ul",{staticClass:"wizard-nav wizard-nav-pills",class:t.stepsClasses,attrs:{role:"tablist"}},[t._l(t.tabs,(function(e,n){return t._t("step",[a("wizard-step",{attrs:{tab:e,"step-size":t.stepSize,transition:t.transition,index:n},nativeOn:{click:function(e){t.navigateToTab(n)},keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.navigateToTab(n)}}})],{tab:e,index:n,navigateToTab:t.navigateToTab,stepSize:t.stepSize,transition:t.transition})}))],2),t._v(" "),a("div",{staticClass:"wizard-tab-content"},[t._t("default",null,null,t.slotProps)],2)]),t._v(" "),t.hideButtons?t._e():a("div",{staticClass:"wizard-card-footer clearfix"},[t._t("footer",[a("div",{staticClass:"wizard-footer-left"},[t.displayPrevButton?a("span",{attrs:{role:"button",tabindex:"0"},on:{click:t.prevTab,keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.prevTab(e)}}},[t._t("prev",[a("wizard-button",{style:t.fillButtonStyle,attrs:{disabled:t.loading}},[t._v("\n              "+t._s(t.backButtonText)+"\n            ")])],null,t.slotProps)],2):t._e(),t._v(" "),t._t("custom-buttons-left",null,null,t.slotProps)],2),t._v(" "),a("div",{staticClass:"wizard-footer-right"},[t._t("custom-buttons-right",null,null,t.slotProps),t._v(" "),t.isLastStep?a("span",{attrs:{role:"button",tabindex:"0"},on:{click:t.nextTab,keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.nextTab(e)}}},[t._t("finish",[a("wizard-button",{style:t.fillButtonStyle},[t._v("\n              "+t._s(t.finishButtonText)+"\n            ")])],null,t.slotProps)],2):a("span",{attrs:{role:"button",tabindex:"0"},on:{click:t.nextTab,keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.nextTab(e)}}},[t._t("next",[a("wizard-button",{style:t.fillButtonStyle,attrs:{disabled:t.loading}},[t._v("\n            "+t._s(t.nextButtonText)+"\n           ")])],null,t.slotProps)],2)],2)],null,t.slotProps)],2)])},staticRenderFns:[]};e.a=n},function(t,e,a){"use strict";var n=a(6),i=a(17),s=a(0)(n.a,i.a,!1,null,null,null);e.a=s.exports},function(t,e,a){"use strict";var n={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{directives:[{name:"show",rawName:"v-show",value:t.active,expression:"active"}],staticClass:"wizard-tab-container",attrs:{role:"tabpanel",id:t.tabId,"aria-hidden":!t.active,"aria-labelledby":"step-"+t.tabId}},[t._t("default",null,{active:t.active})],2)},staticRenderFns:[]};e.a=n}])},789:function(t,e,n){},790:function(t,e,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(t){for(var s,i=1,e=arguments.length;i<e;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=n(791),c=function(){function t(t){var e=t.merchant_id,n=t.merchant_key,r=t.production;this.merchant_id=e,this.merchant_key=n,this.url="https://"+(r?"payfast":"sandbox.payfast")+".co.za/eng/process",this.payment_details={amount:null,item_name:null},this.reference_details={m_payment_id:null,custom_str1:null,custom_str2:null},this.redirect_urls={}}return t.prototype.addPaymentDetails=function(t){this.payment_details.amount=t.amount,this.payment_details.item_name=t.item_name,this.payment_details.item_description=t.item_description,this.payment_details.currency=t.currency,this.payment_details.payment_method=t.payment_method,this.payment_details.name_first=t.name_first,this.payment_details.name_last=t.name_last,this.payment_details.email_address=t.email_address,this.payment_details.cell_number=t.cell_number},t.prototype.addReferenceDetails=function(t){this.reference_details.m_payment_id=t.m_payment_id,this.reference_details.custom_str1=t.custom_str1,this.reference_details.custom_str2=t.custom_str2},t.prototype.cancelURL=function(t){this.redirect_urls.cancel_url=t},t.prototype.returnURL=function(t){this.redirect_urls.return_url=t},t.prototype.notifyURL=function(t){this.redirect_urls.notify_url=t},t.prototype.generateURL=function(){return o(this.url,{queryParams:r({merchant_id:this.merchant_id,merchant_key:this.merchant_key},this.payment_details,this.redirect_urls,this.reference_details)})},t}();e.PayFastAPI=c},791:function(t,e,n){(function(){"use strict";var n=this,r=n.buildUrl,o=function(t,e){var n,r,o,c=[];if(o=!(!e||!e.lowerCase)&&!!e.lowerCase,null===t?r="":"object"==typeof t?(r="",e=t):r=t,r&&"/"===r[r.length-1]&&(r=r.slice(0,-1)),e){if(e.path){var l=String(e.path).trim();o&&(l=l.toLowerCase()),0===l.indexOf("/")?r+=l:r+="/"+l}if(e.queryParams){for(n in e.queryParams){var d;if(e.queryParams.hasOwnProperty(n)&&void 0!==e.queryParams[n])if(e.disableCSV&&Array.isArray(e.queryParams[n])&&e.queryParams[n].length)for(var i=0;i<e.queryParams[n].length;i++)d=encodeURIComponent(String(e.queryParams[n][i]).trim()),c.push(n+"="+d);else d=o?encodeURIComponent(String(e.queryParams[n]).trim().toLowerCase()):encodeURIComponent(String(e.queryParams[n]).trim()),c.push(n+"="+d)}r+="?"+c.join("&")}e.hash&&(r+=o?"#"+String(e.hash).trim().toLowerCase():"#"+String(e.hash).trim())}return r};o.noConflict=function(){return n.buildUrl=r,o},t.exports&&(e=t.exports=o),e.buildUrl=o}).call(this)},800:function(t,e,n){}}]);