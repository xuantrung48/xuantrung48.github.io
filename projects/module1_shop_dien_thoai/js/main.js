$(document).on('click', '[data-toggle="lightbox"]', function (event) {
	event.preventDefault();
	$(this).ekkoLightbox();
});

digitGrouping = function(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

productsList = function() {
	$.ajax({
		url: "https://secondbestdb.herokuapp.com/Devices",
		method: "GET",
		datatype: "json",
		success: function(data){
			$.each(data, function(i, v){
				let imagesDevice = '<div class="row mx-auto">';
				for (let i = 1; i < v.Images.length; i++) {
					imagesDevice += '<a href="' + v.Images[i] + '"data-toggle="lightbox" data-gallery="gallery' + v.id + '" data-title="' + v.Name + '"><img src="' + v.Images[i] + '" height="50"></a>&nbsp;';
				}
				imagesDevice += '</div>';
				$("#Products").append(
					'<div class="col-lg-4 col-md-6 mb-4"><div class="card h-100"><a href="' + v.Images[0] + '"data-toggle="lightbox" data-gallery="gallery' + v.id + '" data-title="' + v.Name + '"><img class="card-img-top image0" src="' + v.Images[0] + '"></a><br>'+ imagesDevice +'<div class="card-body"><div class="text-center" style="height:50px"><h4 class="card-title">' + v.Name + '</h4></div><div class="card-text"><br><div class="text-center"><h4><span class="badge badge-danger">' + digitGrouping(v.Price) + ' ₫</span></h4></div><br><div class="text-center small" width="100%"><a href="javascript:void(0);" class="btn btn-primary buyBtn" onclick="buyDevice(' + v.id + ')">BUY NOW!</a>&nbsp;&nbsp;<a href="javascript:void(0);" class="btn btn-warning buyBtn" onclick="addToCart(' + v.id + ')">Add to Cart <i class="fa fa-cart-plus"></i></a></div><br>Brand: ' + v.Brand.Name + '<br>CPU: ' + v.CPU + '<br>Screen: '  + v.Screen + '<br>OS: ' + v.OS + '<br>Rear Camera: ' + v.RearCamera + '<br>Front Camera: ' + v.FrontCamera + '<br>Ram: ' + v.Ram + ' GB<br>Rom: ' + v.Rom + ' GB<br>Status: ' + v.Status + ' %</div></div></div>'
				);
			})
		}
	})
}

createRangeSlider = function() {
	$("#slider-range").slider({
		range: true,
		min: 0,
		max: 20000000,
		values: [0, 20000000],
		slide: function( event, ui ) {
			$("#amount").val(digitGrouping(ui.values[0]) + " ₫" + " - " + digitGrouping(ui.values[1]) + " ₫");
		}
	});
	$("#amount").val(digitGrouping($("#slider-range").slider("values", 0)) + " ₫" + " - " + digitGrouping($("#slider-range").slider("values", 1)) + " ₫");	
}

$("#enterSearch").on('keypress',function(e) {
    if(e.which == 13) {
		searchProduct();
    }
});

$("#clickSearch").click(function() {
	searchProduct();
})

$("#slider-range").click(function() {
	searchProduct();
})

$("#brandSearch").click(function() {
	searchProduct();
})

$("#pricesort").click(function() {
	searchProduct();
})

initBrand = function() {
	$.ajax({
		url: "https://secondbestdb.herokuapp.com/Brands",
		method: "GET",
		datatype: "json",
		success: function(data){
			$.each(data, function(i, v){
				$("#brandSearch").append(
					"<option value='" + v.id + "'>" + v.Name + "</option>"
				);
			})
		}
	})
}

searchProduct = function() {
	let keyword = $("#enterSearch").val().toLowerCase();

	$.ajax({
		url: "https://secondbestdb.herokuapp.com/Devices",
		method: "GET",
		datatype: "json",
		success: function(data){
			$("#Products").empty();
			$("#carouselExampleIndicators").empty();

			if ($("#pricesort").val() == "Ascending") {
				data.sort(function(a, b) {
					return parseFloat(a.Price) - parseFloat(b.Price);
				});
			}
			
			if ($("#pricesort").val() == "Descending") {
				data.sort(function(a, b) {
					return parseFloat(b.Price) - parseFloat(a.Price);
				});
			}

			$.each(data, function(i, v){
				let deviceName		= v.Name.toLowerCase();
				let deviceBrand		= v.Brand.Name.toLowerCase();
				let deviceCPU		= v.CPU.toLowerCase();
				let deviceOS		= v.OS.toLowerCase();


				if ((deviceName.includes(keyword) || deviceBrand.includes(keyword) || deviceCPU.includes(keyword) || deviceOS.includes(keyword)) && (v.Price >= $("#slider-range").slider("values", 0) && v.Price <=  $("#slider-range").slider("values", 1)) && $("#brandSearch").val() == "All") {
					let imagesDevice = '<div class="row mx-auto">';
					for (let i = 1; i < v.Images.length; i++) {
						imagesDevice += '<a href="' + v.Images[i] + '"data-toggle="lightbox" data-gallery="gallery' + v.id + '" data-title="' + v.Name + '"><img src="' + v.Images[i] + '" height="50"></a>&nbsp;';
					}
					imagesDevice += '</div>';
					$("#Products").append(
						'<div class="col-lg-4 col-md-6 mb-4"><div class="card h-100"><a href="' + v.Images[0] + '"data-toggle="lightbox" data-gallery="gallery' + v.id + '" data-title="' + v.Name + '"><img class="card-img-top image0" src="' + v.Images[0] + '"></a><br>'+ imagesDevice +'<div class="card-body"><div class="text-center" style="height:50px"><h4 class="card-title">' + v.Name + '</h4></div><div class="card-text"><br><div class="text-center"><h4><span class="badge badge-danger">' + digitGrouping(v.Price) + ' ₫</span></h4></div><br><div class="text-center" width="100%"><a href="javascript:void(0);" class="btn btn-primary buyBtn" onclick="buyDevice(' + v.id + ')">BUY NOW!</a>&nbsp;&nbsp;<a href="javascript:void(0);" class="btn btn-warning buyBtn" onclick="addToCart(' + v.id + ')">Add to Cart <i class="fa fa-cart-plus"></i></a></div><br>Brand: ' + v.Brand.Name + '<br>CPU: ' + v.CPU + '<br>Screen: '  + v.Screen + '<br>OS: ' + v.OS + '<br>Rear Camera: ' + v.RearCamera + '<br>Front Camera: ' + v.FrontCamera + '<br>Ram: ' + v.Ram + ' GB<br>Rom: ' + v.Rom + ' GB<br>Status: ' + v.Status + ' %</div></div></div>'
					);
				}
				
				if ((deviceName.includes(keyword) || deviceBrand.includes(keyword) || deviceCPU.includes(keyword) || deviceOS.includes(keyword)) && (v.Price >= $("#slider-range").slider("values", 0) && v.Price <=  $("#slider-range").slider("values", 1)) && v.Brand.id == $("#brandSearch").val()) {
					let imagesDevice = '<div class="row mx-auto">';
					for (let i = 1; i < v.Images.length; i++) {
						imagesDevice += '<a href="' + v.Images[i] + '"data-toggle="lightbox" data-gallery="gallery' + v.id + '" data-title="' + v.Name + '"><img src="' + v.Images[i] + '" height="50"></a>&nbsp;';
					}
					imagesDevice += '</div>';
					$("#Products").append(
						'<div class="col-lg-4 col-md-6 mb-4"><div class="card h-100"><a href="' + v.Images[0] + '"data-toggle="lightbox" data-gallery="gallery' + v.id + '" data-title="' + v.Name + '"><img class="card-img-top image0" src="' + v.Images[0] + '"></a><br>'+ imagesDevice +'<div class="card-body"><div class="text-center" style="height:50px"><h4 class="card-title">' + v.Name + '</h4></div><div class="card-text"><br><div class="text-center"><h4><span class="badge badge-danger">' + digitGrouping(v.Price) + ' ₫</span></h4></div><br><div class="text-center" width="100%"><a href="javascript:void(0);" class="btn btn-primary buyBtn" onclick="buyDevice(' + v.id + ')">BUY NOW!</a>&nbsp;&nbsp;<a href="javascript:void(0);" class="btn btn-warning buyBtn" onclick="addToCart(' + v.id + ')">Add to Cart <i class="fa fa-cart-plus"></i></a></div><br>Brand: ' + v.Brand.Name + '<br>CPU: ' + v.CPU + '<br>Screen: '  + v.Screen + '<br>OS: ' + v.OS + '<br>Rear Camera: ' + v.RearCamera + '<br>Front Camera: ' + v.FrontCamera + '<br>Ram: ' + v.Ram + ' GB<br>Rom: ' + v.Rom + ' GB<br>Status: ' + v.Status + ' %</div></div></div>'
					);
				}
			})
			
		}
	});
}

var order = {} || order;

order.save = function() {
	if($("#OrderForm").valid()) {
		var orderObj					= {};
		orderObj.Name					= $("#Name").val();
		orderObj.PhoneNumber			= $("#PhoneNumber").val();
		orderObj.Address				= $("#Address").val();
		orderObj.OrderStatus			= "Pending";
		orderObj.BuyDevice				= {};
		orderObj.BuyDevice.ID			= deviceID;
		orderObj.BuyDevice.Name			= deviceName;
		orderObj.BuyDevice.Images		= deviceImages;
		orderObj.BuyDevice.Brand		= deviceBrand;
		orderObj.BuyDevice.Status		= deviceStatus;
		orderObj.BuyDevice.Price		= devicePrice;
		orderObj.BuyDevice.CPU			= deviceCPU;
		orderObj.BuyDevice.Screen		= deviceScreen;
		orderObj.BuyDevice.OS			= deviceOS;
		orderObj.BuyDevice.RearCamera	= deviceRearCamera;
		orderObj.BuyDevice.FrontCamera	= deviceFrontCamera;
		orderObj.BuyDevice.Ram			= deviceRam;
		orderObj.BuyDevice.Rom			= deviceRom;
		$.ajax({
			url: "https://secondbestdb.herokuapp.com/Orders",
			method: "POST",
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify(orderObj),
			success: function(data) {
				$("#Products").empty();
				productsList();
				$('#OrderModal').modal('hide');
				bootbox.alert("Thank you for your order! We will be processing and shipping your order ASAP.");
				$.ajax({
					url: "https://secondbestdb.herokuapp.com/Devices/" + deviceID,
					method: "DELETE",
					dataType: "json"
				});
			}
		});
	}
}

var deviceID, deviceName, deviceImages, deviceBrand, deviceStatus, devicePrice, deviceCPU, deviceRam, deviceRom, deviceScreen, deviceOS, deviceRearCamera, deviceFrontCamera;
buyDevice = function(device) {
	resetOrderModal();
	$('#OrderModal').modal('show');
	$.ajax({
		url: "https://secondbestdb.herokuapp.com/Devices",
		method: "GET",
		datatype: "json",
		success: function(data){
			$.each(data, function(i, v){
				if (device == v.id) {
					deviceID			= v.id;
					deviceName			= v.Name;
					deviceImages		= v.Images;
					deviceBrand			= v.Brand;
					deviceStatus		= v.Status;
					devicePrice			= v.Price;
					deviceCPU			= v.CPU;
					deviceRam			= v.Ram;
					deviceRom			= v.Rom;
					deviceScreen		= v.Screen;
					deviceOS			= v.OS;
					deviceRearCamera	= v.RearCamera;
					deviceFrontCamera	= v.FrontCamera;
				}
			});
		}
	});
}


checkOut = function() {
	resetOrderModal();
	$('#OrderModal').modal('show');
}

orderCart = function() {
	if($("#OrderForm").valid()) {
        let tempCart = JSON.parse(localStorage.getItem('cart'));
        $.each(tempCart, function(i, v){
            let tempDevice = v;
            $.ajax({
                url: "https://secondbestdb.herokuapp.com/Devices/" + v.id,
                method: "DELETE",
                dataType: "json",
                success: function() {
                    let orderObj					= {};
					orderObj.Name					= $("#Name").val();
					orderObj.PhoneNumber			= $("#PhoneNumber").val();
					orderObj.Address				= $("#Address").val();
					orderObj.OrderStatus			= "Pending";
					orderObj.BuyDevice				= {};
					orderObj.BuyDevice.id			= tempDevice.id;
					orderObj.BuyDevice.Name			= tempDevice.Name;
					orderObj.BuyDevice.Images		= tempDevice.Images;
					orderObj.BuyDevice.Brand		= tempDevice.Brand;
					orderObj.BuyDevice.Status		= tempDevice.Status;
					orderObj.BuyDevice.Price		= tempDevice.Price;
					orderObj.BuyDevice.CPU			= tempDevice.CPU;
					orderObj.BuyDevice.Ram			= tempDevice.Ram;
					orderObj.BuyDevice.Rom			= tempDevice.Rom;
					orderObj.BuyDevice.Screen		= tempDevice.Screen;
					orderObj.BuyDevice.OS			= tempDevice.OS;
					orderObj.BuyDevice.RearCamera	= tempDevice.RearCamera;
					orderObj.BuyDevice.FrontCamera	= tempDevice.FrontCamera;
					
					$.ajax({
						url: "https://secondbestdb.herokuapp.com/Orders",
						method: "POST",
						dataType: "json",
						contentType: "application/json",
						data: JSON.stringify(orderObj)
					});

					$("#Cart").append("<h3 class='col-12' style='color:red'>You ordered " + tempDevice.Name + "! Thank you!</h3><br>");
                },
                error: function() {
                    $("#Cart").append("<h3 class='col-12' style='color:red'>We are sorry! " + tempDevice.Name + " has been sold!</h3><br>");
                }
            });
        })
		
		$('#OrderModal').modal('hide');
		
		bootbox.alert("Thank you for your order! We will be processing and shipping your order ASAP.");
		
		localStorage.setItem('cart', JSON.stringify([]));
		checkCart();
	}
}

checkCart = function() {
	let total = 0;
	let tempCart = [];

	if (JSON.parse(localStorage.getItem('cart')) != null) {
		tempCart = JSON.parse(localStorage.getItem('cart'));
	}

	if (tempCart.length == 0) {
		$("#cartHeading").text("Your Cart is empty");
		$("#checkOut").empty();
		$("#Cart").empty();
		$("#cart").text("");
	} else {
		$("#cart").html('<i class="fa fa-cart-plus"></i> (' + tempCart.length + ')');
		$("#cartHeading").text('You have ' + tempCart.length + ' items in your cart:');
		for (let i = 0; i < tempCart.length; i++) {
			total += +tempCart[i].Price;
		}
		$("#checkOut").html('<h4 style="color:red">Total: ' + digitGrouping(total) + ' ₫</h4><div class="text-center" onclick="checkOut()"><span class="btn btn-primary">Order Now!</span></div>');
	}
}


cartList = function() {
	let tempCart = JSON.parse(localStorage.getItem('cart'));
	
	$.each(tempCart, function(i, v){
		let imagesDevice = '<div class="row mx-auto">';
		for (let i = 1; i < v.Images.length; i++) {
			imagesDevice += '<a href="' + v.Images[i] + '"data-toggle="lightbox" data-gallery="gallery' + v.id + '" data-title="' + v.Name + '"><img src="' + v.Images[i] + '" height="50"></a>&nbsp;';
		}
		imagesDevice += '</div>';
		$("#Cart").append(
			'<div class="col-lg-4 mb-4"><div class="card h-100"><a href="' + v.Images[0] + '"data-toggle="lightbox" data-gallery="gallery' + v.id + '" data-title="' + v.Name + '"><img class="card-img-top image0" src="' + v.Images[0] + '"></a><br>'+ imagesDevice +'<div class="card-body"><div class="text-center" style="height:50px"><h4 class="card-title">' + v.Name + '</h4></div><div class="card-text"><br><div class="text-center"><h4><span class="badge badge-danger">' + digitGrouping(v.Price) + ' ₫</span></h4></div><br><div class="text-center" onclick="removeFromCart(' + v.id + ')"><span class="btn btn-warning">Remove from cart</span></div><br>Brand: ' + v.Brand.Name + '<br>CPU: ' + v.CPU + '<br>Screen: '  + v.Screen + '<br>OS: ' + v.OS + '<br>Rear Camera: ' + v.RearCamera + '<br>Front Camera: ' + v.FrontCamera + '<br>Ram: ' + v.Ram + ' GB<br>Rom: ' + v.Rom + ' GB<br>Status: ' + v.Status + ' %</div></div>'
		);
	});
}

addToCart = function(id) {
	let tempCart = [];

	if (localStorage.getItem('cart') != null) {
		tempCart = JSON.parse(localStorage.getItem('cart'));
	}

	$.ajax({
		url: "https://secondbestdb.herokuapp.com/Devices/" + id,
		method: "GET",
		datatype: "json",
		success: function(data){
			var deviceObj				= {};
			deviceObj.id				= data.id;
			deviceObj.Name				= data.Name;
			deviceObj.Images			= data.Images;
			deviceObj.Brand				= data.Brand;
			deviceObj.Status			= data.Status;
			deviceObj.Price				= data.Price;
			deviceObj.CPU				= data.CPU;
			deviceObj.Screen			= data.Screen;
			deviceObj.OS				= data.OS;
			deviceObj.RearCamera		= data.RearCamera;
			deviceObj.FrontCamera		= data.FrontCamera;
			deviceObj.Ram				= data.Ram;
			deviceObj.Rom				= data.Rom;
			
			let counter = 0;

			$.each(tempCart, function(i, v){
				if (v.id == deviceObj.id) {
					counter++;
				}
			});

			if (counter == 0) {
				tempCart.push(deviceObj);
				localStorage.setItem('cart', JSON.stringify(tempCart));
				checkCart();
				bootbox.alert(deviceObj.Name + " is added to your Cart!");
			} else {
				bootbox.alert(deviceObj.Name + " is already in your Cart!");
			}
		}
	});
	
}

removeFromCart = function(deviceID) {
	bootbox.confirm({
		title: "Remove device?",
		message: "Do you really want to remove this device from your Cart?",
		buttons: {
			cancel: {
				label: '<i class="fa fa-times"></i> No'
			},
			confirm: {
				label: '<i class="fa fa-check"></i> Yes'
			}
		},
		callback: function (result) {
			if (result) {
				let tempCart = JSON.parse(localStorage.getItem('cart'));
				for (i = 0; i < tempCart.length; i++) {
					if (tempCart[i].id == deviceID) {
						tempCart.splice(i, 1);
						localStorage.setItem('cart', JSON.stringify(tempCart));
						checkCart();
						$("#Cart").empty();
						cartList();
						bootbox.alert("Device removed!");
						break;
					}
				}
			}
		}
	});
}

resetOrderModal = function() {
	$("#id").val('0');
	$("#Name").val('');
	$("#PhoneNumber").val('');
	$("#Address").val('');
	var validator = $("#OrderForm").validate();
	validator.resetForm();
}

$("#email").on('keypress',function(e) {
    if(e.which == 13) {
		login();
    }
});

$("#password").on('keypress',function(e) {
    if(e.which == 13) {
		login();
    }
});

$(function() {
	$("button").click(function() {
		login();
	})
})

login = function() {
	$.ajax({
		url: "https://secondbestdb.herokuapp.com/AdminID/1",
		method: "GET",
		datatype: "json",
		success: function(data){
			if ($("#email").val() == data.Email && $("#password").val() == data.Password) {
				$(location).attr('href', 'admin/index.html');
			} else {
				$("#wrong").html('<div class="alert alert-danger">Wrong Email or Password!</div>');
			}
		}
	});
	
}