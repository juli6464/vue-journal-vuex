<template>
    <div class="entry-containter mb-3 pointer p-2"
    @click="$router.push({ name:'entry', params: { id:10 }})"
    >
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">15</span>
            <span class="mx-1 fs-5">Julio</span>
            <span class="mx-2 fw-light">2026, Jueves</span>
        </div>
        <div class="entry-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.entry-containter {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }
    .entry-title {
        font-size: 12px;
    }
}
</style>