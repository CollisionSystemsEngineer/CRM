$('.list-group-item').on('click', function (e) {
    
    $(this).addClass('active');
    $(this).siblings().removeClass('active');  
  });