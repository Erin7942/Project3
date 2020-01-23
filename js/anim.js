$(document).ready(function() {  
  setTimeout(function() {
    $('.ani_txt').addClass('zoom');
    $('.ani_txt .initial').addClass('transInStart');
    $('.ani_txt .underlay').addClass('show');
    setTimeout(function() {
      $('.ani_txt .initial').removeClass('transInStart');
      $('.ani_txt .underlay').removeClass('show');
    },50);
    setTimeout(function() {
      $('.ani_txt .initial').removeClass('transInStart').addClass('transInMid');
      $('.ani_txt .underlay').addClass('show');      
    },125);
    setTimeout(function() {
      $('.ani_txt .initial').removeClass('transInMid').addClass('transInFin');
      $('.ani_txt .underlay').removeClass('show');
    },175);
    
    setTimeout(function() {
      $('.ani_txt .final').addClass('transInStart');
    $('.ani_txt .underlay').addClass('show');
    },3500);
    setTimeout(function() {
      $('.ani_txt .final').removeClass('transInStart')
      $('.ani_txt .underlay').removeClass('show');
    },3550);
    setTimeout(function() {
      $('.ani_txt .final').addClass('transInStepOne');
      $('.ani_txt .underlay').addClass('show');
    },3650);
    setTimeout(function() {      
      $('.ani_txt .initial').addClass('transOutStart');
      $('.ani_txt .final').removeClass('transInStepOne').addClass('transInStepTwo');
      $('.ani_txt .underlay').removeClass('show');
    },3750);
    setTimeout(function() {
      $('.ani_txt .final').removeClass('transInStepTwo').addClass('transInStepThree');
      $('.ani_txt .final span').first().addClass('show');
    },3900);
    setTimeout(function() {
      $('.ani_txt .final').removeClass('transInStepThree');
      $('.ani_txt .underlay').addClass('show');
    },3975);
    setTimeout(function() {
      $('.ani_txt .initial').removeClass('transOutStart').addClass('transOutFin');
      $('.ani_txt .final').removeClass('transInStepThree');
      $('.ani_txt .final span:nth-child(2)').addClass('show');
      $('.ani_txt .underlay').removeClass('show');
    },4050);  
    
  }, 4000); 
});

//circle 애니메이션 - 선생님것
//getTotalLength()로 길이 확인함
window.onload = function () {
  var size1 = document.querySelector('.outer').getTotalLength();
  var size2 = document.querySelector('.inner').getTotalLength();
  console.log(size1, size2); //282.2865905761719
}

// content 관련 스크립트
window.onload=function(){
  var HeroCircles = function(el) {
    this.$el = $(el);
    this.$circles = this.$el.find('.circle');
    this.$expander = this.$el.find('.circle-expander');
    this.$cur_circle = null;
  };
  
  HeroCircles.prototype._placeBG = function() {
  
    // get parent position and dimensions
    var self = this,
        parent_pos = this.$el.offset(),
        parent_width = this.$el.width(),
        parent_height = this.$el.height();
  
    this.$circles.each(function() {
      var $circle = $(this),
          offset = $circle.offset(),
          $bg = $circle.children('.bg');
  
      // set position
      $bg.css({
        'top': parent_pos.top - offset.top + 'px',
        'left': parent_pos.left - offset.left + 'px',
        'width': parent_width + 'px',
        'height': parent_height + 'px'
      });
    });
  
  };
  
  HeroCircles.prototype._animateInTitle = function(delay) {
    var self = this,
        $title = this.$expander.children('.title-overlay'),
        cur_class = this.$cur_circle.data('name'),
        $expander_nav = this.$expander.children('.expander-nav').children('a').not('.' + cur_class);
  
    TweenLite.set($expander_nav.last(), { x: 160, right: 4,  left: 'auto', delay: delay });
    TweenLite.set($expander_nav.first(), {
      x: -160,
      left: 4,
      right: 'auto',
      delay: delay,
      onComplete: function() {
        // add content to title overlay after delay
        $title.html(self.$cur_circle.siblings('.tagline').html());
      }
    });
  
    // animate in title overlay
    TweenLite.to($title, 0.5, {
      y: 40,
      delay: delay,
      ease: Back.easeOut
    });
  
    TweenLite.to($expander_nav, 0.15, {
      x: 0,
      delay: delay + 0.5
    });
  };
  
  HeroCircles.prototype._animateOutTitle = function() {
    var $title = this.$expander.children('.title-overlay'),
        cur_class = this.$cur_circle.data('name'),
        $expander_nav = this.$expander.children('.expander-nav').children('a').not('.' + cur_class);
  
    // animate out title overlay
    TweenLite.to($title, 0.5, {
      y: $title.outerHeight()
    });
  
    // animate out circles
    TweenLite.to($expander_nav.first(), 0.15, {
      x: -160
    });
    TweenLite.to($expander_nav.last(), 0.15, {
      x: 160
    });
  };
  
  HeroCircles.prototype._animateIn = function(circle) {
    var $circle = $(circle),
        $border = $circle.siblings('.border'),
        img = $circle.children('.bg').data('bg');
  
    // set current circle
    this.$cur_circle = $circle;
  
    // set bg image for expander div
    this.$expander.css('z-index', 4);
    this.$expander.children('.bg').css('background-image', 'url(' + img + ')');
  
    // add active class to li
    $circle.parent('li').addClass('active');
  
    // expand circle
    TweenLite.to($border, 0.3, {
      scale: 7
    });
  
    // fade in expander
    TweenLite.to(this.$expander, 0.5, {
      opacity: 1,
      delay: 0.5,
      onComplete: function() {
        TweenLite.set($border, { scale: 1 });
      }
    });
  
    // animate in title overlay
    this._animateInTitle(1);
  };
  
  HeroCircles.prototype._animateOut = function() {
    var self = this;
  
    // remove active class and scale down border
    this.$el.find('li').removeClass('active');
  
    // animate out title
    this._animateOutTitle();
  
    // fade out expander
    TweenLite.to(this.$expander, 0.5, {
      opacity: 0,
      delay: 0.5,
      onComplete: function() {
        self.$expander.css({
          'z-index': -1
        });
      }
    });
  
  };
  
  HeroCircles.prototype._animateSwitch = function(circle) {
    this._animateOutTitle();
  
    this.$cur_circle = $(circle);
  
    var img = this.$cur_circle.children('.bg').data('bg'),
        $bg = this.$expander.children('.bg');
  
    // switch active class
    this.$el.find('li').removeClass('active');
    this.$cur_circle.parent('li').addClass('active');
  
    TweenLite.to($bg, 0.3, {
      opacity: 0,
      delay: 0.5,
      onComplete: function() {
        $bg.css('background-image', 'url(' + img + ')');
        TweenLite.to($bg, 0.3, { opacity: 1 });
      }
    });
  
    this._animateInTitle(1);
  };
  
  /* contents 관련 스크립트 */
  var HeroCircles = function(el) {
    this.$el = $(el);
    this.$circles = this.$el.find('.circle');
    this.$expander = this.$el.find('.circle-expander');
    this.$cur_circle = null;
  };
  
  HeroCircles.prototype._placeBG = function() {
  
    // get parent position and dimensions
    var self = this,
        parent_pos = this.$el.offset(),
        parent_width = this.$el.width(),
        parent_height = this.$el.height();
  
    this.$circles.each(function() {
      var $circle = $(this),
          offset = $circle.offset(),
          $bg = $circle.children('.bg');
  
      // set position
      $bg.css({
        'top': parent_pos.top - offset.top + 'px',
        'left': parent_pos.left - offset.left + 'px',
        'width': parent_width + 'px',
        'height': parent_height + 'px'
      });
    });
  
  };
  
  HeroCircles.prototype._animateInTitle = function(delay) {
    var self = this,
        $title = this.$expander.children('.title-overlay'),
        cur_class = this.$cur_circle.data('name'),
        $expander_nav = this.$expander.children('.expander-nav').children('a').not('.' + cur_class);
  
    TweenLite.set($expander_nav.last(), { x: 160, right: 4,  left: 'auto', delay: delay });
    TweenLite.set($expander_nav.first(), {
      x: -160,
      left: 4,
      right: 'auto',
      delay: delay,
      onComplete: function() {
        // add content to title overlay after delay
        $title.html(self.$cur_circle.siblings('.tagline').html());
      }
    });
  
    // animate in title overlay
    TweenLite.to($title, 0.5, {
      y: 40,
      delay: delay,
      ease: Back.easeOut
    });
  
    TweenLite.to($expander_nav, 0.15, {
      x: 0,
      delay: delay + 0.5
    });
  };
  
  HeroCircles.prototype._animateOutTitle = function() {
    var $title = this.$expander.children('.title-overlay'),
        cur_class = this.$cur_circle.data('name'),
        $expander_nav = this.$expander.children('.expander-nav').children('a').not('.' + cur_class);
  
    // animate out title overlay
    TweenLite.to($title, 0.5, {
      y: $title.outerHeight()
    });
  
    // animate out circles
    TweenLite.to($expander_nav.first(), 0.15, {
      x: -160
    });
    TweenLite.to($expander_nav.last(), 0.15, {
      x: 160
    });
  };
  
  HeroCircles.prototype._animateIn = function(circle) {
    var $circle = $(circle),
        $border = $circle.siblings('.border'),
        img = $circle.children('.bg').data('bg');
  
    // set current circle
    this.$cur_circle = $circle;
  
    // set bg image for expander div
    this.$expander.css('z-index', 4);
    this.$expander.children('.bg').css('background-image', 'url(' + img + ')');
  
    // add active class to li
    $circle.parent('li').addClass('active');
  
    // expand circle
    TweenLite.to($border, 0.3, {
      scale: 7
    });
  
    // fade in expander
    TweenLite.to(this.$expander, 0.5, {
      opacity: 1,
      delay: 0.5,
      onComplete: function() {
        TweenLite.set($border, { scale: 1 });
      }
    });
  
    // animate in title overlay
    this._animateInTitle(1);
  };
  
  HeroCircles.prototype._animateOut = function() {
    var self = this;
  
    // remove active class and scale down border
    this.$el.find('li').removeClass('active');
  
    // animate out title
    this._animateOutTitle();
  
    // fade out expander
    TweenLite.to(this.$expander, 0.5, {
      opacity: 0,
      delay: 0.5,
      onComplete: function() {
        self.$expander.css({
          'z-index': -1
        });
      }
    });
  
  };
  
  HeroCircles.prototype._animateSwitch = function(circle) {
    this._animateOutTitle();
  
    this.$cur_circle = $(circle);
  
    var img = this.$cur_circle.children('.bg').data('bg'),
        $bg = this.$expander.children('.bg');
  
    // switch active class
    this.$el.find('li').removeClass('active');
    this.$cur_circle.parent('li').addClass('active');
  
    TweenLite.to($bg, 0.3, {
      opacity: 0,
      delay: 0.5,
      onComplete: function() {
        $bg.css('background-image', 'url(' + img + ')');
        TweenLite.to($bg, 0.3, { opacity: 1 });
      }
    });
  
    this._animateInTitle(1);
  };
  
  HeroCircles.prototype.init = function() {
    var self = this;
  
    this._placeBG();
  
    // add click events
    this.$el.on('click', '.circle', function() {
      self._animateIn(this);
    });
    this.$el.find('.close-btn').on('click', function(e) {
      e.preventDefault();
      self._animateOut();
    });
    this.$expander.children('.expander-nav').on('click', 'a', function(e) {
      e.preventDefault();
      var new_class = $(this).attr('class'),
          $circle = self.$el.find('ul .' + new_class);
  
      console.log("new class is", new_class, "new circle is", $circle[0]);
      self._animateSwitch($circle);
    });
  };
  
  HeroCircles.prototype.initMobile = function() {
    var self = this,
        $mobile_slider = this.$el.find('.mobile-slider');
  
    this.$el.on('click', '.circle', function() {
      var $this = $(this),
          bg = $this.children('.bg').data('bg');
  
      self.$circles.removeClass('active');
      $this.addClass('active');
  
      $mobile_slider.html('<div>' + $this.siblings('.tagline').html() + '</div>');
      $mobile_slider.css('background-image', 'url(' + bg + ')');
    });
  
    this.$circles.first().trigger('click');
  };
  
  var hero_circles = new HeroCircles('.hero-circles');
  if ( window.innerWidth > 580 ) {
    hero_circles.init();
  } else {
    hero_circles.initMobile();
  }

}
