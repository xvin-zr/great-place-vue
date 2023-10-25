<script setup>


</script>


<template>

<div class="place-detail">
        <h2 class="place-detail-title">Place 1</h2>
        <p class="place-detail-status">状态：未响应</p>
        <blockquote>
          <p class="place-detail-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum
            aperiam libero, tempore nam voluptas dolores adipisci earum.
            Voluptate, facilis repellendus. Quas, necessitatibus reprehenderit.
            Veritatis perferendis earum suscipit est illum quis.
          </p>
        </blockquote>

        <div class="place-detail-actions">
          <button class="action-btn">修改</button>
          <button class="action-btn">删除</button>
        </div>
      </div>

</template>


<style scoped>
.place-detail-title {
  font-size: 4.4rem;
  /* margin-bottom: 2.4rem; */
}

.place-detail-status {
  font-size: 1.8rem;
  font-weight: 500;
}

.place-detail-text {
  font-size: 1.8rem;
  line-height: 1.4;
}

.place-detail-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  gap: 16px;
  /* align-self: flex-end; */
  margin-top: auto;
}

.action-btn {
  font-size: 1.8rem;
  border: none;
  border-radius: 9px;
  padding: 0.8rem 2.4rem;
  cursor: pointer;
  background-color: #e67e22;
  color: #fff;
  transition: all 0.3s;
}

.action-btn:hover {
  background-color: #cf711f;
}
</style>