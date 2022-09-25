<template>
  <div class="form-group">
    <label for="name" class="form-label">{{ label }}</label>
    <input
      :type="type"
      :class="' form-control ' + (error ? 'is-invalid' : '')"
      aria-describedby="emailHelp"
      :autofocus="autofocus"
      :value="value"
      @change="onchange"
    />
    <div v-if="error" class="invalid-feedback">
        {{ errMsg }}
    </div>
  </div>
</template>

<script>
export default {
    name : 'TextInput',
    props : {
        onchange: Function,
        value : undefined,
        label : String,
        error : Boolean,
        errMsg : String,
        autofocus : Boolean,
        type : String
    }
}
</script>