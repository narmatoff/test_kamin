$(document).ready(function(){
	
	//разделение чисел на десятки сотни тысячи по классу goodsprice
	var priceSep = function (selPriceSep) {
		$(selPriceSep).each(function () {
			var str_price = $(this).text();
			$(this).text(str_price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '))
		});
	};
	
priceSep(".goodsprice");
priceSep(".cart_counternsum>p" );
priceSep(".price_td" );
priceSep(".cart_summary" );
priceSep(".summa_asidebl" );
priceSep(".summa_td" );
priceSep(".help_checkout>span" );
priceSep(".cart_itogo>div>span" );
	
	
	
/////////////////////////////////////////////////////////////////////////
	
	
	
	
	
	
$('#opaopaopapa').bind('submit', function(){
// alert ('1111');
    


    $.ajax({
                type: 'POST',
                url: '/webforms/send/',
                data: $("#opaopaopapa").serialize(),
                success: function (data) {
                    // alert ('спасибо')
                    $('#show1').html('<h2>Спасибо за Ваше обращение!</h2>')

                }
            });

    return false;

});


 $("a.outnstock").fancybox({

            'afterLoad': function(){
            id = $(this.element).attr('id');
            $.ajax({
                url: '/udata://webforms/add/313/?transform=/modules/forms_popap.xsl',
                dataType: 'html',
                success: function (data) {

                    text_before =  '<h2>Заказать товар</h2>';

                    text_after = '<input name="data[new][tovar]" type="hidden" value="' + id + '">';
                // alert (test);
                    $("div#forminputter").html(text_before + data + text_after);

                }
            });
            }

            });

$('#valueee').keyup(function() {
    nowval = $(this).val();
    $('#max_obem_parilki_from').attr('value', nowval);
    $('#min_obem_parilki_to').attr('value', nowval);
    // alert (nowval);
   
});


$("a.more_goods").click(function() {
     $("#clickerator").css('visibility','visible');
    id = $(this).attr('id');
    id_text = "#" + id;
    href =  "?" + $(this).attr("filter");
    total = parseInt($(this).attr("rel"));
    perpage =  parseInt($(this).attr("title"));
    tonext =  parseInt($(this).attr("alt"));
    parent =  parseInt($(this).attr("parent"));
    tonext_1 = tonext + 1
    if (parent) {
        urla = '/udata://catalog/getObjectsList/notemplate/' + id + '///15/' + href + "&p=" + tonext + '&transform=/modules/catalog_popap.xsl';
		
    }
    else
    {
         urla ='/udata://catalog/getObjectsList/notemplate/' + id + '///15' + href + "&p=" + tonext + '&transform=/modules/catalog_popap.xsl'
    } 

	
	
    next = tonext_1 * perpage;
    jQuery.ajax({
                url: urla,
                dataType: 'html',
                success: function (data) {
                // alert (test);
                $(".cat_item_plits:last-child").after(data);
                $(id_text).attr("alt", tonext + 1);
                $(id_text).attr("href", href + "&p=" + tonext_1 );

                if (next>=total){
                    $('.more_goods_inf').text('Показано ' + total + " товаров из " + total );
                    $("a.more_goods").remove();
					priceSep(".goodsprice" );
                }
                else{
                    $('.more_goods_inf').text('Показано ' + next + " товаров из " + total );
					priceSep(".goodsprice" );
                }
                 $("#clickerator").css('visibility','hidden');

                }
		
		
		
            });

	
    return false;
	
	
    });

//////////////////////////////////////////
// закладки описания на странице товара //
//////////////////////////////////////////

//////////////
// описание //
//////////////
$('div.good_moreinfobtn_about').click(function() {
        
    $('div.good_moreinfoblock_about').show();
    $('table.good_moreinfoblock_details').hide();
    
    // внешний вид кнопок при нажатии
    $(this).addClass('hoverbtnser');
    $('div.good_moreinfobtn_details').removeClass('hoverbtnser');
    });


////////////////////
// характеристики //
////////////////////
$('div.good_moreinfobtn_details').click(function() {
        
    $('div.good_moreinfoblock_about').hide();
    $('table.good_moreinfoblock_details').show();
    
    // внешний вид кнопок при нажатии
    $('div.good_moreinfobtn_about').removeClass('hoverbtnser');
    $(this).addClass('hoverbtnser');
    });


//всплывающее главное меню

    $('ul#my-menu1 ul').each(function(i) { // Check each submenu:
        $(this).css('display','none');
        $(this).prev().addClass('collapsible collapsed').mouseover(function() { // Attach an event listener



        var this_i = $('ul#my-menu1 ul').index($(this).next()); // The index of the submenu of the clicked link


            if ($(this).next().css('display') == 'none') {
                $(this).next().slideDown(200, function () { // Show submenu:
                    $(this).prev().removeClass('collapsed').addClass('expanded');
            //      cookieSet(this_i);
                });
            }else {
                $(this).next().slideUp(200, function () { // Hide submenu:
                    $(this).prev().removeClass('expanded').addClass('collapsed');
                    //cookieDel(this_i);
                    $(this).find('ul').each(function() {
                        $(this).hide(0, $('ul#my-menu1 ul').index($(this))).prev().removeClass('expanded').addClass('collapsed');
                    });
                });
            }
            return false; // Prohibit the browser to follow the link address
        });


    });

    function cookieSet(index) {
        $.cookie('submenuMark-' + index, 'opened', {expires: null, path: '/'}); // Set mark to cookie (submenu is shown):
    }
    function cookieDel(index) {
        $.cookie('submenuMark-' + index, null, {expires: null, path: '/'}); // Delete mark from cookie (submenu is hidden):
    }


});