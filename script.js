
// state

var state = {
	items : []
};

var listItemTemplate = (
  '<li>' +
    '<span class="shopping-item js-shopping-item"></span><span class="count">x1</span>' +
    '<div class="shopping-item-controls">' +
      '<button class="js-shopping-item-toggle">' +
        '<span class="button-label">heck</span>' +
      '</button>' +
      '<button class="js-shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);


// modifiers

var addItem = function(state, item){
	state.items.push({
		displayName: item.displayName,
		itemCount: item.itemCount,
		checked: false
	});
}

var getItem = function(state, pos){
	return state.items[pos];
}

var changeItem = function(state, pos, itemName){
	state.items[pos] = itemName;
}

var deleteItem = function(state, pos){
	state.items.splice(pos, 1);
}

// renderer 

var renderItem = function(key, index, listItemTemplate, itemDataAttr){

	var element = $(listItemTemplate);
	element.find(".js-shopping-item").text(key.displayName);
	element.find(".count").text("x" + key.itemCount);
	element.attr(itemDataAttr, index);
	if(key.checked === true){
		element.find(".js-shopping-item").addClass("shopping-item__checked");
		element.find(".js-shopping-item-toggle span").text("uncheck");
	} else {
		element.find(".js-shopping-item").removeClass("shopping-item__checked");
		element.find(".js-shopping-item-toggle span").text("check");
	}
	return element;

}

var renderList = function(state, listElement, itemDataAttr){

	var itemsHTML = state.items.map(function(key, index){
		return renderItem(key, index, listItemTemplate, itemDataAttr);
	})

	listElement.html(itemsHTML);
}	


// ready function
$(document).ready(function(){

	var formElement = $("#js-shopping-list-form"); // form element where to submit
	var listElement = $(".shopping-list"); // where items displayed
	var inputElement = $("#shopping-list-entry"); // input element
	var countInputElement = $("#shopping-list-entry-count");
	var itemDataAttr = "data-list-item-id";	// storing of id index
	var removeBtn = ".js-shopping-item-delete"; // button for delete
	var toggleBtn = ".js-shopping-item-toggle"; // button for check

	// form submission
	formElement.submit(function(event){
		event.preventDefault();
		var newItem = inputElement.val().charAt(0).toUpperCase() + inputElement.val().substr(1);
		var newItemCount = countInputElement.val();
		var item = {
			displayName: newItem,
			itemCount: newItemCount
		}
		if (newItem === ""){
			// alert user no input
			alert("Error: No input!");
			inputElement.focus();
		} else {
		// remove required elements // not working 
		addItem(state, item);
		renderList(state, listElement, itemDataAttr);
		this.reset();
		}
	})

	// delete on click event
	listElement.on("click", removeBtn, function(event){
		var itemID = parseInt($(this).closest("li").attr(itemDataAttr));
		deleteItem(state, itemID);	
		renderList(state, listElement, itemDataAttr);
	})

	// toggle check
	listElement.on("click", toggleBtn, function(event){
		var itemID = parseInt($(this).closest("li").attr(itemDataAttr));
		var oldItem = getItem(state, itemID);

		changeItem(state, itemID, {
			displayName: oldItem.displayName,
			itemCount: oldItem.itemCount,
			checked: !oldItem.checked
		})
		renderList(state, listElement, itemDataAttr);
	})
})

	


