; (function (win) {
    //武库 2020/9/9 新手指导构造函数	 
    win.noviceIntro = function () {
        this.title = "";
        this.backgroundColor = "";
        this.backgroundOpacity = "";
        this.steps = [];
        this.wrapElem = null;
        this.noviceIntrogContentElem = null;
        this.startButtnElem = null;
        this.isStartButton = false;
        this.callBack = null;
    }
    noviceIntro.prototype.initData = function (obj) {
        this.title = obj.title ? obj.title : null;
        this.backgroundColor = obj.backgroundColor ? obj.backgroundColor : "#000";
        this.isStartButton = obj.isStartButton;
        this.backgroundOpacity = obj.opacity ? obj.opacity : 0.5;
        this.steps = obj.steps ? obj.steps : [];
        this.wrapElem = $("<div>").addClass("noviceIntroAialog");
        this.callBack = obj.callBack ? obj.callBack : null;
        this.backgroundColor ? this.wrapElem.css({
            backgroundColor: this.backgroundColor
        }) : null;
        this.backgroundOpacity ? this.wrapElem.css({
            opacity: this.backgroundOpacity
        }) : null;

        if (typeof obj.startCallBack == "function") {
            obj.startCallBack();
        }

        $("body").append(this.wrapElem);
        this.noviceIntrogContentElem = $("<div>").addClass("noviceIntrogContent").attr("id", "noviceIntrogContent");
        $("body").append(this.noviceIntrogContentElem);
        if (this.isStartButton) {
            if (obj.startButtonTitle != "" && typeof obj.startButtonTitle != "undefined") {
                this.startButtnElem = $("<span>").addClass("noviceIntrogContent-start").attr("id", "closeNoviceIntroAialog").text(obj.startButtonTitle);
            } else {
                this.startButtnElem = $("<span>").addClass("noviceIntrogContent-start").attr("id", "closeNoviceIntroAialog").text(
					"跳过:开始使用");
            }
            this.wrapElem.append(this.startButtnElem);
        }
        var $controlDiv = $("<div>").addClass("oviceIntrogControlDiv").attr("id", "oviceIntrogControlDiv");
        var $div_up = $("<div>").addClass("oviceIntrogControlDiv-up");
        var $div_up_icon = $("<span>").addClass("oviceIntrogControlDiv-up-icon");
        var $div_middle = $("<div>").addClass("oviceIntrogControlDiv-middle");
        var $div_middle_img = $("<img>");
        var $div_middle_contentHtml = $("<div>").addClass("div_middle_contentHtml");
        var $div_down = $("<div>").addClass("oviceIntrogControlDiv-down");
        var $div_down_button01 = $("<span>").addClass("oviceIntrogControlDiv-down-upButton").attr("id",
			"oviceIntrog_upButton").text("上一步");
        var $div_down_button02 = $("<span>").addClass("oviceIntrogControlDiv-down-downButton").attr("id",
			"oviceIntrog_downButton").text("下一步");
        var $div_down_taget = $("<span>").addClass("oviceIntrogControlDiv-down-index").html(
			'<span id="oviceIntrogControlDiv_index"></span>/' + this.steps.length);

        this.noviceIntrogContentElem
			.append($controlDiv.append($div_up.append($div_up_icon))
				.append($div_middle.append($div_middle_img).append($div_middle_contentHtml))
				.append($div_down.append($div_down_button01).append($div_down_button02).append($div_down_taget))
			);

        this.showStep(0);
        this.nextOrPreStep();
        this.closeNoviceIntro();
    }
    noviceIntro.prototype.showStep = function (i) {

        if (this.steps.length > 0) {
            for (var j = 0; j < this.steps.length; j++) {
                $(this.steps[j].elem).removeClass("oviceIntrog-nosetBackgroundColor")
                $(this.steps[j].elem).parent().removeClass("stopNoviceIntroOperate")
            }
            $(this.steps[i].elem).addClass("oviceIntrog-nosetBackgroundColor");
            var $isOperate = this.steps[i].isStopOperate ? true : false;

            if (this.steps[i].elem) {

                
                if ($isOperate) {
                    $(this.steps[i].elem).parent().addClass("stopNoviceIntroOperate");               
                }
                var control = this.steps[i].control;

                if ($(this.steps[i].elem).length > 0) {
                    var $top = $(this.steps[i].elem).offset().top;
                    var $left = $(this.steps[i].elem).offset().left;
                    var $height = $(this.steps[i].elem).height();
                    var $width = $(this.steps[i].elem).width();
                } else {
                    var $top = -10;
                    var $left =1;
                    var $height = 1;
                    var $width = 1;
                }

                
                var $src = control.imgSrc ? control.imgSrc : "";
                var $arrowsAlign = control.arrowsAlign == 'right' ? 'url(/Scripts/noviceIntro/noviceIntro_step_right.png)' : 'url(/Scripts/noviceIntro/noviceIntro_step.png)';
                var middle_contentHtml = control.contentHtml ? control.contentHtml : "";

                this.steps[i].top = $top - 5 + "px";
                this.steps[i].left = $left - 5 + "px";

                if (control.buttonTitle != "" && typeof control.buttonTitle != "undefined") {
                    $("#oviceIntrog_downButton").text(control.buttonTitle);
                } else {
                    $("#oviceIntrog_downButton").text("下一步");
                }
                $(".noviceIntrogContent").css({
                    top: this.steps[i].top,
                    left: this.steps[i].left,
                    width: this.steps[i].width ? this.steps[i].width + "px" : $width + 10 + "px",
                    height: height = this.steps[i].height ? this.steps[i].height + "px" : $height + 10 + "px"
                });

                if ($(this.steps[i].elem).length > 0) {
                    $(".oviceIntrogControlDiv-up-icon").css({
                        top: control.arrowsTop ? control.arrowsTop : 0,
                        left: control.arrowsLeft ? control.arrowsLeft : 0,
                        display: "block",
                        backgroundImage: $arrowsAlign
                    })
                } else {
                    $(".oviceIntrogControlDiv-up-icon").css({display:"none"})
                }
                
                if ($src == "" || $(this.steps[i].elem).length == 0) {
                    $(".oviceIntrogControlDiv-middle>img").css({
                        display: "none"
                    });
                } else {
                    $(".oviceIntrogControlDiv-middle>img").css({
                        display: "inline-block"
                    }).attr("src", $src);
                }

                $(".div_middle_contentHtml").html(middle_contentHtml);
                if (typeof control.top != "undefined" && typeof control.left != "undefined") {
                    $(".oviceIntrogControlDiv").css({
                        top: parseInt(control.top),
                        left: parseInt(control.left)
                    });
                } else {
                    $(".oviceIntrogControlDiv").css({
                        top: control.top ? control.top : $height+10,
                        left: control.left ? control.left : 0
                    });
                }
                $("#oviceIntrogControlDiv_index").text(i + 1);
                $("#oviceIntrog_upButton").attr("data-index", i);
                $("#oviceIntrog_downButton").attr("data-index", i);
            }
        }
        if (i == 0) {
            $("#oviceIntrog_upButton").css({
                display: "none"
            })
        } else {
            $("#oviceIntrog_upButton").css({
                display: "inline-block"
            })
        }
        var $oviceIntrogControlDivHeight = $(".oviceIntrogControlDiv").height();
        var $postionHeight = $oviceIntrogControlDivHeight + $height + $top;
        var windowHeihgt = $(window).height();
        if ($postionHeight > windowHeihgt) {
            $("html,body").animate({
                scrollTop: $postionHeight - windowHeihgt
            })
        }
        if (typeof control.callBack == "function") {
            control.callBack();
        }
        var $iconTexts = this.steps[i].iconTexts;
        $(".oviceIntrogIconIndex").remove();
        if ($iconTexts && $iconTexts.length > 0) {
            for (var i = 0; i < $iconTexts.length; i++) {
                var $iconElem = $("<span>").addClass("oviceIntrogIconIndex").text($iconTexts[i].index).css({
                    top: $iconTexts[i].top,
                    left: $iconTexts[i].left
                })
                $("body").append($iconElem)
            }
        }
    }
    noviceIntro.prototype.nextOrPreStep = function () {
        var that = this;
        var index = 0;
        $("#oviceIntrog_upButton").on("click", function () {
            index = $(this).attr("data-index");
            if (index > 0) {
                that.showStep(--index);
            }
        })
        $("#oviceIntrog_downButton").on("click", function () {
            index = $(this).attr("data-index");
            if (index < that.steps.length - 1) {
                that.showStep(++index);
            } else {
                $(that.steps[index].elem).removeClass("oviceIntrog-nosetBackgroundColor")
                $(".noviceIntroAialog").remove();
                $(".noviceIntrogContent").remove();
                $(".oviceIntrogIconIndex").remove();
                if (typeof that.callBack== "function"){
                    that.callBack()
                }
            }
        })
    }

    noviceIntro.prototype.closeNoviceIntro = function () {
        $("#closeNoviceIntroAialog").on("click", function () {
            $(".noviceIntroAialog").remove();
            $(".noviceIntrogContent").remove();
            $(".oviceIntrogIconIndex").remove();
        })
    }

})(window)