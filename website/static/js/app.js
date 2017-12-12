var users = [];

function clearGrid(){
	$(".computer").css("background-image", "")
	$(".computer").attr("data-user", "")
	//Add unwrapping a tag!!!
	//Add tooltip removal
}

function populateTooltip(tippy) {
	var tooltip = tippy.popper;
	var caller = $(tooltip._reference).find(".user");
	var img = $(tooltip).find("img");
	$(tooltip).find("#username").text(caller.data("user"));
	$(tooltip).find("#hostname").text(caller.data("host"));
	img.on('load', function(){
		tippy.show();
	});
	img.attr("src", 'https://cdn.intra.42.fr/users/medium_'+ caller.data("user") + '.jpg')
}

function updateUsers(){
	$.get({
		"url": "get_active_users",
		"success" : function(data){
			users = data
			users.forEach(function(user){
				computer = $(".computer[data-host='" + user.host + "']");
				computer.css("background-image", "url(" + "https://cdn.intra.42.fr/users/small_" + user.login + ".jpg" + ")");
				computer.wrap('<a class="profile-link" href="https://profile.intra.42.fr/users/' + user.login + '" target="_blank"></a>')
				computer.attr("data-user", user.login)
				computer.addClass("user")
			})
			tippy('.profile-link',{
				trigger: "manual",
				dynamicTitle: true,
				arrowTransform: "scale(1.5)",
				html: "#tooltip",
				performance: true,
				arrow: true,
				maxWidth: "300px",
				popperOptions: {
				  modifiers: {
					preventOverflow: {
					  enabled: false
					},
					hide: {
					  enabled: false
					}
				  }
				},
				onHidden: function(){
					caller = $(this._reference)
					$(this).find("img").attr("src", "")
				},
			})
			var users = new Bloodhound({
			  datumTokenizer: Bloodhound.tokenizers.obj.whitespace("login"),
			  queryTokenizer: Bloodhound.tokenizers.whitespace,
			  local: users
			});
			$('#autocomplete').typeahead({
				highlight: true
			},
			{
				"display": "login",
				"source": users
			}).bind('typeahead:select', function(ev, suggestion) {
				this.blur();
				var tippy = $(".user[data-user='" + suggestion.value + "']").parent()[0]._tippy;
				var hostname = suggestion.host;
				var tabId = "tab-zone" + hostname[3];
				$("#tabs a#" + tabId).tab('show');
				populateTooltip(tippy)
				$(window).scrollTop($(tippy.reference).offset().top - $(window).height()/2);
				$(window).scrollLeft($(tippy.reference).offset().left - $(window).width()/2);
			});
			$('a.profile-link').hover(function (e) {
				e.preventDefault();
				populateTooltip(e.currentTarget._tippy);
			}, function (e) {
				e.preventDefault();
				e.currentTarget._tippy.hide();
			});
		}
	})
}

function updateGrid(){
	clearGrid()
	updateUsers()
}

lastTip = null;

$(function(){
	updateUsers()
	$('#tabs a:first').tab('show');
	$('#tabs a').on('click', function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	})
	$("#autocomplete").keyup(function(e){
		if(e.which == 13) {
			$(".tt-suggestion:first-child").trigger('click');
		}
	});
	$("#search-button").click(function(e){
			$(".tt-suggestion:first-child").trigger('click');
	});
	lastTip = null;

	// if(mobile) {
	// 	$("a.profile-link").click(function(e) {
	// 			if(lastTip != e.target) {
	// 				e.preventDefault();
	// 				lastTip = e.target;
	// 				$(lastTip).trigger("hover");
	// 			}
	// 		});
	// 	}
	// }
	// $("#autocomplete").on("autocompleteselect", function( event, ui ){
	// 	var hostname = ui.item.host;
	// 	var zone = "zone" + hostname[3];

	// 	$(".user[data-user='" + ui.item.value + "']").css("border", "1px solid black");
	// });
			

	// $(".cell").click(function(){
	// 	var value = prompt($(this).data("host"))
	// 	if (value)
	// 	{
	// 		value = "e1z2r" + value.replace(" ", "p")
	// 		console.log(value)
	// 		$(this).data("host", value)
	// 	}
	// 	console.log($(this).data("host"))
	// 	data = [];
	// 	$("tr").each(function(){
	// 		row = [];
	// 		$(this).children(".cell").each(function(){
	// 			row.push($(this).data("host"))
	// 		})
	// 		data.push(row.slice())
	// 	})
	// 	console.log(data)
	// 	$.post({
	// 		url: "/savemap",
	// 		data: JSON.stringify(data),
	// 		success: function(){
	// 			location.reload();
	// 		}
	// 	})
	// })
})