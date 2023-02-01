import{get}from"svelte/store";class ActionsHandler{store;ActionsList=[];constructor(e){this.store=e}doAction(e){switch(e.type){case"ENTER_KEY_IN_CELL":this.enterKeyPressedInCell(e);break;case"TAB_KEY_IN_CELL":this.tabKeyPressedInCell(e);break;case"CHANGE_NAME_OF_COLUMN":this.changeNameOfColumn(e);break;case"ADD_COLUMN":this.addColumn(e);break;case"MOVE_COLUMN":this.moveColumn(e);break;case"DELETE_COLUMN":this.deleteColumn(e);break;case"DUPLICATE_COLUMN":this.duplicateColumn(e);break;case"ADD_ROW":this.addRow(e);break;case"DELETE_ROW":this.deleteRow(e);break;case"DUPLICATE_ROW":this.duplicateRow(e);break;case"DRAGGED_ROW":this.draggedRow(e);break;case"CHANGE_CELL_TYPE":this.cellTypeChange(e);break;case"CHANGE_COLUMN_OPTIONS":this.updateColumnOptions(e);break;case"UPDATE_CURRENT_ROW_AND_CELL":this.updateCurrentRowAndCell(e);break;case"UPDATE_CELL_DATA":this.updateCellData(e);break;case"GO_TO_NEXT_PAGE":this.goToNextPage(e);break;case"CHANGE_CURRENT_PAGE":this.changeCurrentPage(e);break;case"CHANGE_SORT_ORDER":this.changeSortOrder(e);break;case"CHANGE_SEARCH_QUERY":this.changeSearchQuery(e);break;case"CHANGE_OPTION_STATUS":this.changeOptionStatus(e);break;case"ADD_FILTER":this.addFilter(e);break;case"DELETE_FILTER":this.deleteFilter(e);break;case"UPDATE_FILTER":this.updateFilter(e);break;case"UPDATE_FILTERS":this.updateFilters(e);break;case"UPDATE_EDITOR_STATE":this.updateEditorState(e);break;case"SET_DISPLAY_FIELD":this.setDisplayField(e);break;case"SET_STYLE_FIELD":this.setStyleField(e)}}addAction(e){return e.action_id="",actionsList.push(e),e.action_id}removeAction(e){}updateAction(e,t){}preventAction(e){}asyncActions(e){}changeNameOfColumn(e){this.store.changeColumnName(e.payload.columnName,e.payload.columnIndex)}addColumn(e){if(0!=get(this.store.filters).length)return void alert("Can't add the column because it is being used by the filter.");if(get(this.store.columns).length==this.store.columnLimit)return void alert("You have exceeded the table column limit!");let t=e.payload;this.store.addColumn(t.columnIndex,t.direction)}moveColumn(e){if(0!=get(this.store.filters).length)return void alert("Can't add the column because it is being used by the filter.");let t=e.payload;this.store.moveColumn(t.columnIndex,t.direction)}deleteColumn(e){0==get(this.store.filters).length?1!=get(this.store.columns).length?confirm("Are you sure you want to delete the selected column?")&&this.store.deleteColumn(e.payload.columnIndex):alert("Couldn't remove the column. Table must have one column atleast!"):alert("Can't remove the column because it is being used by the filter.")}duplicateColumn(e){get(this.store.columns).length!=this.store.columnLimit?this.store.duplicateColumn(e.payload.columnIndex):alert("You have exceeded the table column limit!")}addRow(e){get(this.store.rows).length!=this.store.rowLimit?this.store.addRow(e.payload.rowIndex):alert("You have exceeded the table rows limit!")}deleteRow(e){if(1!=get(this.store.rows).length){if(confirm("Are you sure you want to delete the selected row?")){const t=1==get(this.store.viewableRecords).length;this.store.deleteRow(e.payload.rowIndex),t&&0!=e.payload.rowIndex&&this.goToPreviousPage()}}else alert("Couldn't remove the row. Table must have one row atleast!")}duplicateRow(e){get(this.store.rows).length!=this.store.rowLimit?this.store.recordDuplicate(e.payload.rowIndex):alert("You have exceeded the table rows limit!")}draggedRow(e){this.store.recordDragged(e.payload.prevRowIndex,e.payload.nextRowIndex,e.payload.draggingRowIndex)}cellTypeChange(e){this.store.changeCellType(e.payload.columnIndex,e.payload.cellType)}updateColumnOptions(e){this.store.changeColumnOptions(e.payload.columnIndex,e.payload.optionName,e.payload.optionValue)}enterKeyPressedInCell(e){const t=this,a=get(this.store.rows),s=a.findIndex((t=>t.stateRecordID===e.payload.stateRecordID)),o=s+1,r=this._isLastRowOnPage(o),l=o>=a.length,i=o>=this.store.rowLimit;e.payload.rowIndex=o,setTimeout((function(){r&&!i&&t.goToNextPage(),l&&(e.payload.rowIndex=s,t.addRow(e))}),10),this.updateCurrentRowAndCell(e)}tabKeyPressedInCell(e){if("SHIFT_TAB_KEY_EVENT"==e.payload.keyEvent)return void this.shiftTabKeyPressedInCell(e);let t=parseInt(e.payload.rowIndex),a=0;const s=t+1,o=parseInt(e.payload.cellIndex)+1,r=s>=get(this.store.rows).length,l=this._isLastColumnOnPage(o),i=this._isLastRowOnPage(s);l&&(t=s),l&&i&&!r&&this.goToNextPage(),l||(a=o),e.payload.rowIndex=t,e.payload.cellIndex=a,this.updateCurrentRowAndCell(e)}shiftTabKeyPressedInCell(e){let t=0,a=0;const s=parseInt(e.payload.rowIndex),o=parseInt(e.payload.cellIndex),r=s-1,l=o-1,i=0==s,d=this._isFirstColumnOnPage(o),n=this._isFirstRowOnPage(s);d&&(t=r,a=get(this.store.columns).length-1),d&&n&&!i&&(t=r,a=get(this.store.columns).length-1,this.goToPreviousPage()),d||(t=s,a=l),e.payload.rowIndex=t,e.payload.cellIndex=a,this.updateCurrentRowAndCell(e)}updateCurrentRowAndCell(e){this.store.setActiveRowIndex(e.payload.rowIndex),this.store.setActiveCellIndex(e.payload.cellIndex)}updateCellData(e){this.store.updateCellValue(e.payload.data)}goToNextPage(){let e=get(this.store.currentPage)+1;this.store.setCurrentPage(e)}goToPreviousPage(){let e=get(this.store.currentPage)-1;this.store.setCurrentPage(e)}changeCurrentPage(e){this.store.setCurrentPage(e.payload.currentPage)}changeSortOrder(e){this.store.setActiveColumnIndex(e.payload.columnIndex),this.store.setSortOrder(e.payload.order),this.store.setActiveCellIndex(null)}changeSearchQuery(e){this.store.setSearchQuery(e.payload.searchQuery),this.store.setSortOrder(e.payload.sortOrder),this.store.setCurrentPage(e.payload.currentPage),this.store.setActiveCellIndex(null)}changeOptionStatus(e){this.store.setOptionStatus(e.payload)}addFilter(e){this.store.addFilter()}deleteFilter(e){this.store.deleteFilter(e.payload.index)}updateFilter(e){this.store.updateFilter(e.payload.filter,e.payload.index),this.store.setCurrentPage(e.payload.currentPage)}updateFilters(e){this.store.updateFilters(e.payload.values),this.store.setCurrentPage(e.payload.currentPage)}updateEditorState(e){this.store.updateEditorState(e.payload.id,e.payload.value)}setDisplayField(e){this.store.setDisplayField(e.payload.id,e.payload.value)}setStyleField(e){this.store.setStyleField(e.payload.id,e.payload.value);let t=e.payload.value,a={};e.payload.extra&&"extra"in e.payload&&"themes"in e.payload.extra&&(a=e.payload.extra.themes[t]?e.payload.extra.themes[t]:{}),e.payload.extra&&"extra"in e.payload&&"values"in e.payload.extra&&(t=e.payload.extra.values[t]?e.payload.extra.values[t]:t),e.payload.extra&&"extra"in e.payload&&"fields"in e.payload.extra&&e.payload.extra.fields.forEach((e=>{a[e]=t}));for(const[e,t]of Object.entries(a))this.store.setStyleField(e,t)}_isLastRowOnPage(e){const t=parseInt(this.store.numOfRecordsPerPage),a=e%t;return a<=t&&0==a}_isLastColumnOnPage(e){return e==get(this.store.columns).length}_isFirstRowOnPage(e){const t=e+1,a=parseInt(this.store.numOfRecordsPerPage),s=t%a;return s<a&&1==s}_isFirstColumnOnPage(e){return e<=0}}export default ActionsHandler;