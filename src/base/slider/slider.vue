<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <!--插槽-->
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    name: 'slider',
    props: {
      loop: {
        // 循环轮播
        type: Boolean,
        default: true
      },
      autoPlay: {
        // 自动轮播
        type: Boolean,
        default: true
      },
      interval: {
        // 自动轮播的间隔
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0 // 控制dot的active
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots() // 先于this._initSlider(),因为小点点只有5个,但是图片为了做无缝滚动被克隆了2份
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      // 因为浏览器的刷新是17ms一次，所以写20ms
      }, 20)

      window.addEventListener('resize', () => {
        if (!this.slider) {
          // 如果better-scroll没有初始化，直接return
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh() // better-scroll方法refresh方法
      })
    },
    activated() {
      // keep-alive 组件激活时调用,该钩子在服务器端渲染期间不被调用
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      // keep-alive 组件停用时调用,该钩子在服务器端渲染期间不被调用。
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      // 实例销毁之前调用
      clearTimeout(this.timer)
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children

        let width = 0 // 父容器sliderGroup的宽度
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item') // 来自dom.js

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          // 如果可以无缝循环，需要克隆两份图片
          // isResize代表是不是窗口尺寸变化调用的
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false, // 惯性
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })

        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX // getCurrentPage是better-scroll的方法
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex

          if (this.autoPlay) {
            this._play()
          }
        })

        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400) // goToPage是better-scroll的方法,0代表y方向的，400表示间隔与snapSpeed的400保持一致
        }, this.interval)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>