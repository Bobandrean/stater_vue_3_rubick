<!-- Loading With Tailwind Overlay -->
<template>
  <div class="loading">
    <div class="loading__overlay">
      <div class="loading__spinner">
        <div
          class="flex flex-col items-center justify-end col-span-6 sm:col-span-3 xl:col-span-2"
        >
          <LoadingIcon color="#1E40AF" icon="puff" class="w-8 h-8" />
          <div class="mt-2 text-xs text-center">Loading</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}

.loading__overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
}

.loading__spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
