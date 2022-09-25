<template>
  <div class="form-group">
    <label for="ingredients" class="form-label">{{ label }}</label>
    <textarea
      :type="type"
      :class="'form-control ' + (error ? 'is-invalid' : '')"
      @change="onchange"
      rows="3"
      :value="value"
      :autofocus="autofocus"
      ></textarea
    >
    <div v-if="error" class="invalid-feedback">
        {{ errMsg }}
    </div>
  </div>
</template>

<script>
export default {
    name : 'TextArea',
    props : {
        onchange: Function,
        value : String,
        label : String,
        error : Boolean,
        errMsg : String,
        autofocus : Boolean,
        type : String
    }
};
</script>