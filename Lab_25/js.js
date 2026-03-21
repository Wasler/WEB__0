let slider = function(){
    let delay = 5000;

    let numImages = $('.img').length;
    let previousImage = numImages;
    let cuttentImage = 1;
    let nextImage = 2;
    let previewhover = false;

    let sliderWidth = $("#slider").width + 2;

    let sizeImages = function(){
        $("img").width(sliderWidth);
    };
    sizeImages();

    for(let i = 1; i <= numImages; i++){
        $("#dots").find('ul').append($('<li class = "dot '+ i+ '"></li>'));
    }

    let resetImages = function(){
        $('.img').css({"left": sliderWidth+"px"});
        $('.img').first().css({"left":"0px"});
        $('.1').addClass("active");
    }
    resetImages();

    let slideNextImegeLeft = function(){
        $('.image-' + nextImage).css({"left" : sliderWidth+"px"});
        $('.image-' + currentImage).animate({left : slider * -1}, 1000);
        $('.image-' + nextImage).animate({left: "0px"}, 1000);
        currentImage = nextImage;
        increaseImage();
    }

    let slidePreviousImageRight = function(){
        $('.image-'+ previousImage).css({"left" : (sliderWidth * -1)+"px"});
        $('.image-'+ currentImage).animate({left : sliderWidth}, 1000);
        $('.image-'+ previousImage).animate({left : "0px"}, 1000);
        currentImage = previousImage;
        increaseImage();
    }

    let increaseImage = function(){
        if(currentImage === numImages){
            nextImage = -1;
        } else{
            nextImage = currentImage + 1;
            if(currentImage === 1){
                previousImage = numImages;
            }
            else{
                previousImage = currentImage - 1;
            }
        }
        $('#dots').find('li').removeClass("active");
        $('#dots').find('.' + currentImage).addClass("active");
        if(previewhover !== false){
            showPreview();
        }
    }
}
