<template>
  <TheModal @close="store.commit('changeShowPostUpload', false)">
    <div class="postUpload">
      <label class="upload">
        <img v-if="imageObjUrl" :src="imageObjUrl" class="preview" />
        <!-- <TheIcon v-else icon="upload-image" /> -->
         <img v-else src="../assets/upload.png" alt="">
        <!-- <h5 v-else>點擊上傳一張圖片</h5> -->
        <input
          type="file"
          accept="image/*"
          class="fileChooser"
          @change="handleImageUpload"
        />
      </label>
      <div class="postContent">
        <textarea
          :placeholder="user.username + ' ，' + '在想什麼呢?'"
          class="postContentInput"
          v-model="description"
        ></textarea>
        <TheButton class="pubBtn" @click="publishPost">發布</TheButton>
      </div>
    </div>
  </TheModal>
</template>
<script setup>
import TheModal from "./TheModal.vue";
import TheIcon from "./TheIcon.vue";
import TheButton from "./TheButton.vue";
import { useStore } from "vuex";
import { ref, computed } from "vue";

const store = useStore();
const imageObjUrl = ref("");

const image = ref(null);
const description = ref("");

const user = computed(() => store.state.user.user);

async function handleImageUpload(e) {
  // 只允許上傳一張圖片
  const imageFile = e.target.files[0];
  if (imageFile) {
    // 圖片預覽
    imageObjUrl.value = URL.createObjectURL(imageFile);
    // 設置圖片文件
    image.value = imageFile;
  }
}
function publishPost() {
  store.dispatch("uploadPost", {
    image: image.value,
    description: description.value,
  });
}
</script>
<style scoped>
.postUpload {
  width: 50vw;
  height: 70vh;
  display: grid;
  grid-template-rows: 4fr 1fr;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 0;
}
.upload {
  display: grid;
  place-items: center;
  cursor: pointer;
  min-height: 0;
}
.upload > svg {
  width: 254px;
  height: 316px;
}

.fileChooser {
  opacity: 0;
  position: absolute;
  cursor: pointer;
}

.postContent {
  display: grid;
}
.postContentInput {
  border-bottom: none;
  resize: none;
  padding: 12px 24px;
}

.postContentInput::placeholder {
  color: #757575;
}

.pubBtn {
  align-self: end;
  justify-self: end;
  position: relative;
  right: 24px;
  bottom: 18px;
}

.upload > img{
  width: 280px;
}

h5{
  font-size: 40px;
}
</style>
