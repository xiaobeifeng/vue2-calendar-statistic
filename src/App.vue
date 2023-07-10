<template>
  <div id="app" v-cloak>
    <div class="main">
      <van-sidebar class="nav" v-model="activeKey">
        <van-sidebar-item
          v-for="item in calendars"
          :key="item.id"
          :title="item.title"
          @click="handleCalendarCardClick"
        />
      </van-sidebar>
      <div class="body">
        <div class="body__header">
          <div class="body__content__title">概览</div>
          <div class="body__header__overview">
            <div>项目名称：{{ calendarEventInfo.calendarName }}</div>
            <div>日期区间：{{ calendarEventInfo.dateInterval }}</div>
            <div>总用时：{{ calendarEventInfo.totalHour }} h</div>
          </div>
          <!--          <van-calendar-->
          <!--            class="body__header__calendar"-->
          <!--            title="日历"-->
          <!--            :poppable="false"-->
          <!--            :show-confirm="false"-->
          <!--            :show-title="false"-->
          <!--            :show-subtitle="false"-->
          <!--            :default-date="new Date()"-->
          <!--          />-->
        </div>
        <div class="body__content">
          <div class="body__content__title">
            <div>本周工作</div>
            <van-button
              class="body__content__subtitle"
              icon="notes-o"
              @click="copyText"
              >复制本周工作内容</van-button
            >
          </div>
          <div
            class="body__content__work"
            v-for="(item, index) in calendarEventInfo.data"
            :key="index"
          >
            <div>{{ item.title }}</div>
            <div class="body__content__work__date">
              {{
                `${item.startDate} 至 ${item.endDate} 耗时 ${item.lastHour}h`
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import CustomCalendarCard from '@/components/custom-calendar-card.vue'
export default Vue.extend({
  name: 'App',
  components: { CustomCalendarCard },
  data() {
    return {
      calendars: [],
      calendarEventInfo: '',
      activeKey: 0
    }
  },
  created() {
    // eslint-disable-next-line no-undef
    J2C.getCalendars({}, (result) => {
      console.log(result)
      this.calendars.push(...result.data)
      this.handleCalendarCardClick(0)
    })
  },
  methods: {
    handleCalendarCardClick(index) {
      // eslint-disable-next-line no-undef
      console.log(this.calendars[index])
      J2C.getCalendarEvent({ id: this.calendars[index].id }, (result) => {
        console.log(result)
        this.calendarEventInfo = result.data
      })
    },
    handleSidebarClick() {},
    copyText() {
      // 数字没有 .length 不能执行selectText 需要转化成字符串
      let titles = []
      this.calendarEventInfo.data.forEach((item) => {
        let info = `${item.index}. ${item.title}`
        titles.push(info)
      })
      const textString = titles.join('\n')
      console.log(textString)
      let input = document.querySelector('#copy-input')
      if (!input) {
        input = document.createElement('input')
        input.id = 'copy-input'
        input.readOnly = 'readOnly' // 防止ios聚焦触发键盘事件
        input.style.position = 'absolute'
        input.style.left = '-1000px'
        input.style.zIndex = '-1000'
        document.body.appendChild(input)
      }
      input.value = textString
      // ios必须先选中文字且不支持 input.select();
      selectText(input, 0, textString.length)
      console.log(document.execCommand('copy'), 'execCommand')
      if (document.execCommand('copy')) {
        document.execCommand('copy')
        alert('已复制到粘贴板')
      }
      input.blur()

      // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
      // 选择文本。createTextRange(setSelectionRange)是input方法
      function selectText(textbox, startIndex, stopIndex) {
        if (textbox.createTextRange) {
          // ie
          const range = textbox.createTextRange()
          range.collapse(true)
          range.moveStart('character', startIndex) // 起始光标
          range.moveEnd('character', stopIndex - startIndex) // 结束光标
          range.select() // 不兼容苹果
        } else {
          // firefox/chrome
          textbox.setSelectionRange(startIndex, stopIndex)
          textbox.focus()
        }
      }
    }
  }
})
</script>

<style lang="less" scoped>
.main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f7f8fa;
  overflow: hidden;
}
.nav {
  width: 400px;
  height: 100%;
  background-color: white;
  font-size: 14px;
  color: #1a1a1a;
  text-align: center;
  overflow-y: auto;
  &__card {
    line-height: 80px;
  }
}
.body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: white;
  &__header {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: white;
    width: 100%;
    &__overview {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-start;
      margin: 0 0 10px 20px;
      padding: 20px;
      width: 800px;
      height: 150px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 0 5px 5px #f5f6fa;
      font-size: 22px;
    }
    &__calendar {
      margin: 20px;
      min-width: 400px;
      height: 300px;
      box-shadow: 0 0 5px 5px #f5f6fa;
    }
  }
  &__content {
    width: 100%;
    background-color: white;
    &__title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 0 20px;
      height: 80px;
      color: #333;
      font-size: 28px;
      font-weight: 600;
      background-color: white;
    }
    &__subtitle {
      height: 30px;
      font-size: 12px;
      font-weight: 400;
      color: #666;
      border: unset;
    }
    &__work {
      margin: 0 20px 20px 20px;
      padding: 20px;
      background-color: white;
      font-size: 16px;
      border-radius: 10px;
      box-shadow: 0 0 5px 5px #f5f6fa;
      &__date {
        margin: 20px 0 0 0;
        font-size: 12px;
        color: #cccccc;
      }
    }
  }
}
#copy-input {
  position: absolute;
  left: -1000px;
  z-index: -1000;
}
/deep/.van-sidebar-item {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 20px;
  padding: 0.13889rem 0.08333rem;
  overflow: hidden;
  color: #323233;
  font-size: 0.09722rem;
  height: 100px;
  text-align: center;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
  background-color: #fff;
  border-radius: 10px;
}
/deep/ .van-sidebar-item--select {
  background-color: #1e80ff1a;
}
/deep/ .van-sidebar-item--select:active {
  background-color: #1e80ff1a;
}
/deep/ .van-sidebar-item--select::before {
  position: absolute;
  top: 50%;
  left: 0;
  width: 5px;
  height: 20px;
  background-color: unset;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  content: '';
}
</style>
