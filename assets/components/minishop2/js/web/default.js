"function"==typeof $.fn.jGrowl||document.write('<script src="'+miniShop2Config.jsUrl+'lib/jquery.jgrowl.min.js"></script>'),function(a,b,c,d){miniShop2.ajaxProgress=!1,miniShop2.setup=function(){this.actionName="ms2_action",this.action=":submit[name="+this.actionName+"]",this.form=".ms2_form",this.$doc=c(b),this.sendData={$form:null,action:null,formData:null}},miniShop2.initialize=function(){miniShop2.setup(),miniShop2.$doc.ajaxStart(function(){miniShop2.ajaxProgress=!0}).ajaxStop(function(){miniShop2.ajaxProgress=!1}).on("submit",miniShop2.form,function(a){a.preventDefault();var b=c(this),d=b.find(miniShop2.action).val();if(d){var e=b.serializeArray();e.push({name:miniShop2.actionName,value:d}),miniShop2.sendData={$form:b,action:d,formData:e},miniShop2.controller()}}),miniShop2.Cart.initialize(),miniShop2.Message.initialize(),miniShop2.Order.initialize(),miniShop2.Gallery.initialize()},miniShop2.controller=function(){var a=this;switch(a.sendData.action){case"cart/add":miniShop2.Cart.add();break;case"cart/remove":miniShop2.Cart.remove();break;case"cart/change":miniShop2.Cart.change();break;case"cart/clean":miniShop2.Cart.clean();break;case"order/submit":miniShop2.Order.submit();break;case"order/clean":miniShop2.Order.clean();break;default:return}},miniShop2.send=function(a,d,e){var f=function(a,b){return"function"==typeof a?a.apply(b,Array.prototype.slice.call(arguments,2)):!0};c.isArray(a)?a.push({name:"ctx",value:miniShop2Config.ctx}):c.isPlainObject(a)?a.ctx=miniShop2Config.ctx:"string"==typeof a&&(a+="&ctx="+miniShop2Config.ctx);var g=miniShop2.sendData.$form?miniShop2.sendData.$form.attr("action"):!1,h=g?g:miniShop2Config.actionUrl?miniShop2Config.actionUrl:b.location.href,i=miniShop2.sendData.$form?miniShop2.sendData.$form.attr("method"):!1,j=i?i:"post";if(f(d.before)!==!1&&f(e.before)!==!1)var k=function(b,d){return c[j](h,a,function(a){a.success?(a.message&&miniShop2.Message.success(a.message),f(b.response.success,miniShop2,a),f(d.response.success,miniShop2,a)):(miniShop2.Message.error(a.message),f(b.response.error,miniShop2,a),f(d.response.error,miniShop2,a))},"json").done(function(){f(b.ajax.done,miniShop2,k),f(d.ajax.done,miniShop2,k)}).fail(function(){f(b.ajax.fail,miniShop2,k),f(d.ajax.fail,miniShop2,k)}).always(function(){f(b.ajax.always,miniShop2,k),f(d.ajax.always,miniShop2,k)})}(d,e)},miniShop2.Cart={callbacks:{add:miniShop2Config.callbacksObjectTemplate(),remove:miniShop2Config.callbacksObjectTemplate(),change:miniShop2Config.callbacksObjectTemplate(),clean:miniShop2Config.callbacksObjectTemplate()},setup:function(){miniShop2.Cart.cart="#msCart",miniShop2.Cart.miniCart="#msMiniCart",miniShop2.Cart.miniCartNotEmptyClass="full",miniShop2.Cart.countInput="input[name=count]",miniShop2.Cart.totalWeight=".ms2_total_weight",miniShop2.Cart.totalCount=".ms2_total_count",miniShop2.Cart.totalCost=".ms2_total_cost"},initialize:function(){miniShop2.Cart.setup(),c(miniShop2.Cart.cart).length&&miniShop2.$doc.on("change",miniShop2.Cart.cart+" "+miniShop2.Cart.countInput,function(){c(this).closest(miniShop2.form).submit()})},add:function(){var a=miniShop2.Cart.callbacks;a.add.response.success=function(a){this.Cart.status(a.data)},miniShop2.send(miniShop2.sendData.formData,miniShop2.Cart.callbacks.add,miniShop2.Callbacks.Cart.add)},remove:function(){var a=miniShop2.Cart.callbacks;a.remove.response.success=function(a){this.Cart.remove_position(miniShop2.Utils.getValueFromSerializedArray("key")),this.Cart.status(a.data)},miniShop2.send(miniShop2.sendData.formData,miniShop2.Cart.callbacks.remove,miniShop2.Callbacks.Cart.remove)},change:function(){var a=miniShop2.Cart.callbacks;a.change.response.success=function(a){"undefined"==typeof a.data.key?this.Cart.remove_position(miniShop2.Utils.getValueFromSerializedArray("key")):c("#"+miniShop2.Utils.getValueFromSerializedArray("key")).find(""),this.Cart.status(a.data)},miniShop2.send(miniShop2.sendData.formData,miniShop2.Cart.callbacks.change,miniShop2.Callbacks.Cart.change)},status:function(a){if(a.total_count<1)location.reload();else{var b=(c(miniShop2.Cart.cart),c(miniShop2.Cart.miniCart));a.total_count>0&&!b.hasClass(miniShop2.Cart.miniCartNotEmptyClass)&&b.addClass(miniShop2.Cart.miniCartNotEmptyClass),c(miniShop2.Cart.totalWeight).text(miniShop2.Utils.formatWeight(a.total_weight)),c(miniShop2.Cart.totalCount).text(a.total_count),c(miniShop2.Cart.totalCost).text(miniShop2.Utils.formatPrice(a.total_cost)),c(miniShop2.Order.orderCost,miniShop2.Order.order).length&&miniShop2.Order.getcost()}},clean:function(){var a=miniShop2.Cart.callbacks;a.clean.response.success=function(a){this.Cart.status(a.data)},miniShop2.send(miniShop2.sendData.formData,miniShop2.Cart.callbacks.clean,miniShop2.Callbacks.Cart.clean)},remove_position:function(a){c("#"+a).remove()}},miniShop2.Gallery={setup:function(){miniShop2.Gallery.gallery="#msGallery",miniShop2.Gallery.mainImage="#mainImage",miniShop2.Gallery.thumbnail=".thumbnail"},initialize:function(){miniShop2.Gallery.setup(),c(miniShop2.Gallery.gallery).length&&(miniShop2.$doc.on("click",miniShop2.Gallery.gallery+" "+miniShop2.Gallery.thumbnail,function(a){var b=c(this).attr("href"),d=c(this).data("image");c(miniShop2.Gallery.mainImage,miniShop2.Gallery.gallery).attr("src",b).parent().attr("href",d),a.preventDefault()}),c(miniShop2.Gallery.thumbnail+":first",miniShop2.Gallery.gallery).trigger("click"))}},miniShop2.Order={callbacks:{add:miniShop2Config.callbacksObjectTemplate(),getcost:miniShop2Config.callbacksObjectTemplate(),clean:miniShop2Config.callbacksObjectTemplate(),submit:miniShop2Config.callbacksObjectTemplate(),getRequired:miniShop2Config.callbacksObjectTemplate()},setup:function(){miniShop2.Order.order="#msOrder",miniShop2.Order.deliveries="#deliveries",miniShop2.Order.payments="#payments",miniShop2.Order.deliveryInput='input[name="delivery"]',miniShop2.Order.inputParent=".input-parent",miniShop2.Order.paymentInput='input[name="payment"]',miniShop2.Order.paymentInputUniquePrefix="input#payment_",miniShop2.Order.deliveryInputUniquePrefix="input#delivery_",miniShop2.Order.orderCost="#ms2_order_cost"},initialize:function(){if(miniShop2.Order.setup(),c(miniShop2.Order.order).length){miniShop2.$doc.on("click",miniShop2.Order.order+' [name="'+miniShop2.actionName+'"][value="order/clean"]',function(a){miniShop2.Order.clean(),a.preventDefault()}).on("change",miniShop2.Order.order+" input, textarea",function(a){var b=c(this),d=b.attr("name"),e=b.val();miniShop2.Order.add(d,e)});var a=c(miniShop2.Order.deliveryInput+":checked",miniShop2.Order.order);a.trigger("change"),miniShop2.Order.updatePayments(a.data("payments"))}},updatePayments:function(a){var b=c(miniShop2.Order.paymentInput,miniShop2.Order.order);if(b.attr("disabled",!0).prop("disabled",!0).closest(miniShop2.Order.inputParent).hide(),a.length>0)for(var d in a)a.hasOwnProperty(d)&&b.filter(miniShop2.Order.paymentInputUniquePrefix+a[d]).attr("disabled",!1).prop("disabled",!1).closest(miniShop2.Order.inputParent).show();0==b.filter(":visible:checked").length&&b.filter(":visible:first").trigger("click")},add:function(a,b){var d=miniShop2.Order.callbacks,e=b;d.add.response.success=function(d){!function(a,b,e){var f=c('[name="'+a+'"]',miniShop2.Order.order);switch(a){case"delivery":f=c(miniShop2.Order.deliveryInputUniquePrefix+d.data[a]),d.data[a]!=e?f.trigger("click"):(miniShop2.Order.getRequired(b),miniShop2.Order.updatePayments(f.data("payments")),miniShop2.Order.getcost());break;case"payment":f=c(miniShop2.Order.paymentInputUniquePrefix+d.data[a]),d.data[a]!=e?f.trigger("click"):miniShop2.Order.getcost()}f.val(d.data[a]).removeClass("error").closest(miniShop2.Order.inputParent).removeClass("error")}(a,b,e)},d.add.response.error=function(b){!function(a){var b=c('[name="'+a+'"]',miniShop2.Order.order);"checkbox"==b.attr("type")||"radio"==b.attr("type")?b.closest(miniShop2.Order.inputParent).addClass("error"):b.addClass("error")}(a)};var f={key:a,value:b};f[miniShop2.actionName]="order/add",miniShop2.send(f,miniShop2.Order.callbacks.add,miniShop2.Callbacks.Order.add)},getcost:function(){var a=miniShop2.Order.callbacks;a.getcost.response.success=function(a){c(miniShop2.Order.orderCost,miniShop2.Order.order).text(miniShop2.Utils.formatPrice(a.data.cost))};var b={};b[miniShop2.actionName]="order/getcost",miniShop2.send(b,miniShop2.Order.callbacks.getcost,miniShop2.Callbacks.Order.getcost)},clean:function(){var a=miniShop2.Order.callbacks;a.clean.response.success=function(a){location.reload()};var b={};b[miniShop2.actionName]="order/clean",miniShop2.send(b,miniShop2.Order.callbacks.clean,miniShop2.Callbacks.Order.clean)},submit:function(){if(miniShop2.Message.close(),miniShop2.ajaxProgress)return miniShop2.$doc.ajaxComplete(function(){miniShop2.ajaxProgress=!1,miniShop2.$doc.unbind("ajaxComplete"),miniShop2.Order.submit()}),!1;var a=miniShop2.Order.callbacks;return a.submit.before=function(){c(":button, a",miniShop2.Order.order).attr("disabled",!0).prop("disabled",!0)},a.submit.ajax.always=function(a){c(":button, a",miniShop2.Order.order).attr("disabled",!1).prop("disabled",!1)},a.submit.response.success=function(a){a.data.redirect?b.location.href=a.data.redirect:a.data.msorder?b.location.href=/\?/.test(b.location.href)?b.location.href+"&msorder="+a.data.msorder:b.location.href+"?msorder="+a.data.msorder:location.reload()},a.submit.response.error=function(a){c("[name]",miniShop2.Order.order).removeClass("error").closest(miniShop2.Order.inputParent).removeClass("error");for(var b in a.data)if(a.data.hasOwnProperty(b)){var d=a.data[b],e=c('[name="'+d+'"]',miniShop2.Order.order);"checkbox"==e.attr("type")||"radio"==e.attr("type")?e.closest(miniShop2.Order.inputParent).addClass("error"):e.addClass("error")}},miniShop2.send(miniShop2.sendData.formData,miniShop2.Order.callbacks.submit,miniShop2.Callbacks.Order.submit)},getRequired:function(a){var b=miniShop2.Order.callbacks;b.getRequired.response.success=function(a){c("[name]",miniShop2.Order.order).removeClass("required").closest(miniShop2.Order.inputParent).removeClass("required");for(var b=a.data.requires,d=0,e=b.length;e>d;d++)c("[name="+b[d]+"]",miniShop2.Order.order).addClass("required").closest(miniShop2.Order.inputParent).addClass("required")},b.getRequired.response.error=function(a){c("[name]",miniShop2.Order.order).removeClass("required").closest(miniShop2.Order.inputParent).removeClass("required")};var d={id:a};d[miniShop2.actionName]="order/getrequired",miniShop2.send(d,miniShop2.Order.callbacks.getRequired,miniShop2.Callbacks.Order.getRequired)}},miniShop2.Message={initialize:function(){"undefined"!=typeof c.fn.jGrowl?(c.jGrowl.defaults.closerTemplate="<div>[ "+miniShop2Config.close_all_message+" ]</div>",miniShop2.Message.close=function(){c.jGrowl("close")},miniShop2.Message.show=function(a,b){a&&c.jGrowl(a,b)}):(miniShop2.Message.close=function(){},miniShop2.Message.show=function(a){a&&alert(a)})},success:function(a){miniShop2.Message.show(a,{theme:"ms2-message-success",sticky:!1})},error:function(a){miniShop2.Message.show(a,{theme:"ms2-message-error",sticky:!1})},info:function(a){miniShop2.Message.show(a,{theme:"ms2-message-info",sticky:!1})}},miniShop2.Utils={empty:function(a){return"undefined"==typeof a||0==a||null===a||a===!1||"string"==typeof a&&""==a.replace(/\s+/g,"")||"array"==typeof a&&0==a.length},formatPrice:function(a){var b=miniShop2Config.price_format;return a=this.number_format(a,b[0],b[1],b[2]),miniShop2Config.price_format_no_zeros&&(a=a.replace(/(0+)$/,""),a=a.replace(/[^0-9]$/,"")),a},formatWeight:function(a){var b=miniShop2Config.weight_format;return a=this.number_format(a,b[0],b[1],b[2]),miniShop2Config.weight_format_no_zeros&&(a=a.replace(/(0+)$/,""),a=a.replace(/[^0-9]$/,"")),a},number_format:function(a,b,c,e){var f,g,h,i,j;return isNaN(b=Math.abs(b))&&(b=2),c==d&&(c=","),e==d&&(e="."),f=parseInt(a=(+a||0).toFixed(b))+"",(g=f.length)>3?g%=3:g=0,j=g?f.substr(0,g)+e:"",h=f.substr(g).replace(/(\d{3})(?=\d)/g,"$1"+e),i=b?c+Math.abs(a-f).toFixed(b).replace(/-/,"0").slice(2):"",j+h+i},getValueFromSerializedArray:function(a,b){c.isArray(b)||(b=miniShop2.sendData.formData);for(var d=0,e=b.length;e>d;d++)if(b[d].name=a)return b[d].value;return null}},c(b).ready(function(a){miniShop2.initialize();var b=a("html");b.removeClass("no-js"),b.hasClass("js")||b.addClass("js")})}(this,document,jQuery);