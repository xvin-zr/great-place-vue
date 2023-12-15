<script setup>
import "../views/find-welcome.css";
import { computed, inject, ref, watchEffect } from "vue";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const props = defineProps(['modelValue'])

const emit =defineEmits(['update:modelValue'])
const isModifingHyl = inject("isModifingHyl");
const place = inject("place");

const description = ref("");
const file = ref(null);
const filePath = ref("");

watchEffect(() => {
  if (!place.value) return; 
   description.value = place.value.hyl?.description;
   filePath.value = place.value.hyl?.filePath;
});

async function ModifyHyl1() {
  if (file.value) {
    filePath.value = await uploadFile(file.value);
  }
  try {
    const bodyObj = {
      xqcId: `${place.value.id}`,
      publishUserId:`${place.value.publishUserId}`,
      description: description.value,
      filePath: filePath.value,
    };
    for (const [key, value] of Object.entries(bodyObj)) {
      if ((value === "" || value === "0") && key !== "filePath") {
        alert("请填写完整");
        return;
      }
    }

    const res = await fetch(`${BASE_URL}/hyl/response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(bodyObj),
      redirect: "follow",
    });

    const data = await res.json();

    if (data.flag == 1) {
      alert("成功提交");
      isModifingHyl.value = false;
      emit('update:modelValue',false);
      location.reload();
    } else alert("提交失败：" + data.msg);
    
  } catch (error) {
    console.error(error);
  }
}

async function ModifyHyl2() {
  if (!confirm("确认修改?")) {
    return;
  }
  if (file.value) {
    filePath.value = await uploadFile(file.value);
  }
  try {
    const bodyObj = {
      xqcId: `${place.value.id}`,
      publishUserId:`${place.value.publishUserId}`,
      description: description.value,
      filePath: filePath.value,
      id:`${place.value.hyl.id}`,
    };
    for (const [key, value] of Object.entries(bodyObj)) {
      if ((value === "" || value === "0") && key !== "filePath") {
        alert("请填写完整");
        return;
      }
    }
    
    const res = await fetch(`${BASE_URL}/hyl/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(bodyObj),
      redirect: "follow",
    });

    const data = await res.json();
    
    if (data.flag == 1) {
      alert("修改成功");
      isModifingHyl.value = false;
      location.reload();
    } else alert("修改失败：" + data.msg);
   
  } catch (error) {
    console.error(error);
  }
}
async function uploadFile(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    console.log("file", file);
    const url = "http://localhost:3000/upload";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        type: "welcome",
      },
      body: formData,
      redirect: "follow",
    });
    const data = await res.json();
    console.log("uploadFile", data);
    return data.path;

  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <section v-if="isModifingHyl" class="section-find-place">
    <div class="find-place">
      <form action="#" class="find-place-form">
        <header class="find-place-header">
          <h3 v-if="props.modelValue" class="header-heading">发布「欢迎来」</h3>
          <h3 v-else class="header-heading">修改「欢迎来」</h3>
          <button class="header-btn" @click.prevent="isModifingHyl = false">
            &times;
          </button>
        </header>

        <div class="form-group">
          <label for="hylDescription">描述:</label>
          <textarea
            v-model="description"
            type="text"
            id="hylDescription"
            name="hylDescription"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="imgfile">介绍文件:</label>
          <input
            @change="file = $event.target.files[0]"
            type="file"
            id="imgfile"
            name="imgfile"
          />
        </div>


        <button v-if="props.modelValue" @click.prevent="ModifyHyl1" class="upload-btn">
          提交
        </button>

        <button v-else @click.prevent="ModifyHyl2" class="upload-btn">
          完成修改
        </button>
      </form>
    </div>
  </section>
</template>
