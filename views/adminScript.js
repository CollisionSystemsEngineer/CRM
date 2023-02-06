$('.tab a').on('click', function (e) {
    
    $(this).addClass('active');
    $(this).siblings().removeClass('active');  
  });