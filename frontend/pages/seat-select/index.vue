<template lang="pug">
.seat-select
  v-container
    .seat-select-header.d-flex.align-center.justify-space-between
      h1.title Chọn ghế
      v-btn(
        variant="outlined"
      )
        v-icon mdi mdi-reload
        | Đặt lại
    span.screen.text-center
      p.screen-text Màn hình
    .seat-map
      v-container(style="border-bottom: 5px solid #f9f8f3")
        v-row.align-center.justify-center.flex-column
          v-col(cols="12" v-for="searRow in seatRowList").d-flex.align-center.justify-center
            span.mx-2 {{ searRow }}
            span(v-for="seatColumn in seatColumnList" :key="seatColumn")
              span.single-seat-area.cursor-pointer
                v-icon mdi mdi-sofa-single
    v-row.seat-color-guide.my-2
      v-col(cols="6")
        p.seat-guide-text *Nhấp lại vào chỗ ngồi đã chọn để hủy.
      v-col(cols="6").d-flex
        .d-flex.mr-6
          v-icon(style="color: #848484").mr-1 mdi mdi-sofa-single
          p Ghế có thể chọn
        .d-flex.mr-6
          v-icon(style="color: #000000").mr-1 mdi mdi-sofa-single
          p Ghế bạn đã chọn
        .d-flex.mr-6
          v-icon(style="color: #e96106").mr-1 mdi mdi-sofa-single
          p Ghế đã bị mua
</template>
<script setup>
const seatRowList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const seatColumnList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14]
</script>
<style scoped lang="sass">
.screen
  display: block
  width: 100%
  height: 30px
  background-color: #ccc
  margin: 20px 0
.screen-text
  font-size: 20px
  line-height: 30px
.single-seat-area
  margin-right: 4px
  color: #848484
.single-seat-area:hover
  opacity: 0.8
.seat-guide-text
  font-size: 12px
  color: #666
  line-height: 18px
</style>