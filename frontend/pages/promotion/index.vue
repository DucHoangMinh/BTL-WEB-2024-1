<template>
  <div class="promotion-detail">
    <div class="promotion-background">
      <div class="promotion-box">
        <div class="promotion-header">
          <h1 class="promotion-title">{{ promotion.promotion_name }}</h1>
          <img :src="promotion.preview_image" alt="Promotion Preview" class="promotion-image" />
        </div>
        <div class="promotion-content">
          <div class="promotion-description">
            <p v-html="formattedDescription"></p>
            
            <p class="highlight-description">Thể lệ: Khi mua combo có sản phẩm ly Thỏ 7 Màu hoặc Halloween sẽ được Miễn phí refill Pepsi / Pepsi Black</p>
          </div>
          <div class="promotion-info">
            <p><strong>Thời gian diễn ra:</strong> {{ formattedStartDate }} - {{ formattedEndDate }}</p>
            <p v-if="promotion.discount_percentage"><strong>Giảm giá:</strong> {{ promotion.discount_percentage }}%</p>
            <p><strong>Địa điểm áp dụng:</strong> {{ promotion.location }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="promotion-thumbnail">
      <img :src="promotion.thumbnail" alt="Promotion Thumbnail" class="thumbnail-image" />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";

const route = useRoute()

const promotion = ref({});

// Computed properties
const formattedStartDate = ref('');
const formattedEndDate = ref('');
const formattedDescription = ref('');
const getPromotionDetail = async () => {
  const { data } = await axios.get(`https://api-btl-web-2024-1.vercel.app/promotions/${route.query.id}`)
  promotion.value = data.promotion
  formattedStartDate.value = new Date(promotion.value?.start_date)?.toLocaleDateString()
  formattedEndDate.value = new Date(promotion.value?.end_date)?.toLocaleDateString()
  formattedDescription.value = promotion.value?.description?.replace(/\n/g, '<br>')
}
const init = async () => {
  await getPromotionDetail()
}
onMounted(init)
</script>

<style lang="scss" scoped>
.promotion-detail {
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
  background-color: #e6f0fa; 
  min-height: 100vh; 

  .promotion-background {
    background-color: #e6f0fa; 
    padding-left: 20%;
    padding-right: 20%;
    padding-top: 3%;
    border-radius: 8px;
  }

  .promotion-box {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    
  }

  .promotion-header {
    text-align: center;
    margin-bottom: 30px;

    .promotion-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    .promotion-title {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }

  .promotion-content {
    margin-top: 20px;

    .promotion-description {
      margin-bottom: 20px;
      font-size: 16px;
      line-height: 1.5;
    }

    .highlight-description {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 16px;
      line-height: 1.5;
      font-weight: bold;
    }

    .promotion-info {
      font-size: 16px;

      p {
        margin: 10px 0;
      }

      strong {
        font-weight: bold;
      }
    }
  }

  .promotion-thumbnail {
    margin-top: 20px;
    text-align: center;

    .thumbnail-image {
      width: 60%;
      height: auto;
      border-radius: 8px;
    
    }
  }
}
</style>
