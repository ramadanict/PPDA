jQuery((function(t){"use strict";window.tablepress_open_shortcode_thickbox=function(){const e=t(window).width(),o=720<e?720:e;let i=t(window).height();t("#wpadminbar").length&&(i-=parseInt(t("#wpadminbar").css("height"),10)),tb_show(tablepress_editor_button.thickbox_title,tablepress_editor_button.thickbox_url+"&TB_iframe=true&height="+(i-85)+"&width="+(o-80),!1)},"undefined"!=typeof QTags&&QTags.addButton("tablepress_quicktags_button",tablepress_editor_button.caption,window.tablepress_open_shortcode_thickbox,!1,!1,tablepress_editor_button.title,115)}));