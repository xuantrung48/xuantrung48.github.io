var lang = 0;
$(document).ready(function() {
  AOS.init( {
    // uncomment below for on-scroll animations to played only once
    once: true  
  });
  displayEn();
  $('#age').text((new Date).getFullYear() - 1989);
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});

changeLang = function() {
	if (lang == 0) {
		$('#Lang').text('EN');
		$('#title').text('Hồ Sơ Nguyễn Xuân Trung');
		$('#Name').text('Nguyễn Xuân Trung');
		$('.about').text('Giới thiệu');
		$('.skills').text('Kỹ năng');
		$('.portfolio').text('Danh mục dự án');
		$('.education').text('Học vấn');
		$('.contact').text('Liên hệ');
		$('#introduce').html('<p>Xin chào! Tôi là Nguyễn Xuân Trung. Tôi là một nhà phát triển Web.</p><p>Tôi là một người lập trình Full-Stack, và tôi chuyên về ASP.NET Core hoạt động hiệu quả trên tất cả các nền tảng. Tôi đặc biệt quan tâm đến việc xây dựng các mã code hiệu quả có thể sử dụng được và tối ưu hóa hiệu suất hệ thống.</p>');
		$('.information').text('Thông tin');
		$('.age').text('Tuổi');
		$('.gender').text('Giới tính');
		$('.male').text('Nam');
		$('.phone').text('Điện thoại');
		$('.address').text('Địa chỉ');
		$('.language').text('Ngôn ngữ');
		$('.envi').text('Tiếng Anh, Tiếng Việt');
		$('#position').text('Vị trí');
		$('.address-detail').text('33/39 Đào Duy Anh, Huế, Việt Nam');
		$('.full-stack-dev').text('Lập trình Web ASP.NET Core Full-Stack');
		$('#full-stack-dev-time').text('01/2020 - 09/2020');
		$('.tourism-name').text('Quản trị kinh doanh du lịch');
		$('#tourism-time').text('07/2007 - 07/2011');
		$('#codegym-hue').text('CodeGym Huế');
		$('#college').text('Trường Đại Học Kinh Tế Huế');
		$('#learn-codegym').text('Chương trình học bao gồm HTML/CSS/JS, Ajax Jquery, C#, SQL, SQL Server, Spring MVC, ASP.NET Core RESTful API, Angula và Git.');
		$('#learn-college').text('Có kiến ​​thức chuyên môn về du lịch, nhà hàng và khách sạn trong nền kinh tế thị trường.');
		$('.send-message').text('Gửi tin nhắn cho tôi');
		$('.send').text('Gửi');
		$('.thank-you').text('Xin cám ơn!');
		lang = 1;
	} else {
		displayEn();
	}
}

displayEn = function(){
	$('#Lang').text('VI');
	$('#title').text("Nguyen Xuan Trung's profile");
	$('#Name').text('Nguyen Xuan Trung');
	$('.about').text('About');
	$('.skills').text('Skills');
	$('.portfolio').text('Portfolio');
	$('.education').text('Education');
	$('.contact').text('Contact');
	$('#introduce').html('<p>Hello! My name is Nguyen Xuan Trung. I am a Web Developer.</p><p>I’m a Full-Stack developer, and I specialize in efficient ASP.NET Core that just work across all platforms. I care deeply about building effective codes that are usable and optimize system performance.</p>');
	$('.information').text('Information');
	$('.age').text('Age');
	$('.gender').text('Gender');
	$('.male').text('Male');
	$('.phone').text('Phone');
	$('.address').text('Address');
	$('.language').text('Language');
	$('.envi').text('English, Vietnamese');
	$('#position').text('Position');
	$('.address-detail').text('33/39 Dao Duy Anh, Hue, Vietnam');
	$('.full-stack-dev').text('Full-stack ASP.NET Core WEB Developer');
	$('#full-stack-dev-time').text('Jan 2020 - Sep 2020');
	$('.tourism-name').text('Tourism Management Administration');
	$('#tourism-time').text('Jul 2007 - Jul 2011');
	$('#codegym-hue').text('CodeGym Hue');
	$('#college').text('Hue College of Economics');
	$('#learn-codegym').text('Learning about HTML/CSS/JS, Ajax Jquery, C#, SQL, SQL Server, Spring MVC, ASP.NET Core RESTful API, Angula and Git.');
	$('#learn-college').text('Possess in-depth understanding and up-to-date knowledge of tourism, hotel and restaurant in market-oriented economy.');
	$('.send-message').text('Send me a message');
	$('.send').text('Send');
	$('.thank-you').text('THANK YOU!');
	lang = 0;
}