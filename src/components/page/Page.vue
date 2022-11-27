<template>
  <div class="page">
    <div class="query">
      <template class="page-form">
        <slot name="query"></slot>
      </template>
    </div>
    <div class="separate" />
    <div class="result">
      <slot name="result"></slot>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scope lang="scss">
@import "@/styles/globle.scss";

.page {
  height: 100%;

  .query {
    padding: 15px 10px;

    .page-form {
      display: flex;
      justify-content: left;
      align-items: center;
      background-color: #f0f0f0;
      height: 80px;
      min-height: 60px;
    }

    .ant-form-inline .ant-form-item {
      flex: none;
      flex-wrap: nowrap;
      margin-right: 20px;
      margin-bottom: 0;
      width: 23%;
    }
  }

  .separate {
    height: 3%;
    background: $globle-background-color;
  }

  .result {
    padding: 10px 10px;

    .result-button {
      display: flex;
      justify-content: right;
      align-items: center;
      padding: 0px 23px 5px 0px;
    }
  }
}
</style>
