import{get}from"svelte/store";import{notifications}from"./../../table/svelte/notification/notifications";var tableProps=require("./props"),ajaxEvents={alertMessage:"Table Created, Successfully",submitTable:function(e){const t=this;let n=this.getModifiedRecords(get(e.rows)),o=get(e.workflow),s=this.getTriggers(o.triggers);const a=parseInt(e.tableID),i={table_id:a,table_title:tableProps.getTitle(),columns:get(e.columns),last_column_id:get(e.lastColumnID),triggers:s,editorState:get(e.editorState),display:get(e.display),style:get(e.style)};let c={table_id:a,records_deleted:get(e.recordsDeleted),records_inserted:n.insertedRecords,records_updated:n.updatedRecords,columns_deleted:get(e.columnsDeleted),columns_duplicated:get(e.columnsDuplicated)};a>0&&(t.alertMessage="Table Updated, Successfully"),fetch(tablesome_ajax_object.api_endpoints.create_or_update_table,{method:"post",headers:{"Content-Type":"application/json","X-WP-Nonce":tablesome_ajax_object.rest_nonce},body:JSON.stringify(i)}).then((function(e){return e.json()})).then((function(e){return e})).then((function(e){"success"==e.status&&e.table_id>0&&(c.table_id=parseInt(e.table_id),t.sendRecords(c))})).catch((function(e){}))},sendRecords:function(e){var t=this;fetch(tablesome_ajax_object.api_endpoints.prefix+e.table_id+"/records",{method:"post",headers:{"Content-Type":"application/json","X-WP-Nonce":tablesome_ajax_object.rest_nonce},body:JSON.stringify(e)}).then((function(n){notifications.success(t.alertMessage,"",5e3);let o=new URL(tablesome_ajax_object.edit_table_url);o.searchParams.set("post",e.table_id),window.location.replace(o)})).then((function(e){})).catch((function(e){}))},getModifiedRecords:function(e){let t=[],n=[];return e.map((function(e,o){0==e.record_id?t.push(e):n.push(e)})),{insertedRecords:t,updatedRecords:n}},getTriggers:function(e){return e.map((function(e){return e.actions&&e.actions.length>0&&(e.actions=e.actions.map((function(e){return e.match_columns&&e.match_columns.length>0&&(e.match_columns=e.match_columns.map((function(e){return{...e}}))),e.match_fields&&e.match_fields.length>0&&(e.match_fields=e.match_fields.map((function(e){return{...e}}))),e.conditions&&e.conditions.length>0&&(e.conditions=e.conditions.map((function(e){return{...e}}))),{...e}}))),{...e}}))}};export default ajaxEvents;