<template>
  <div >

    <component
      v-for="(field, index) in schema"
      :key="index"
      :edit="edit"
      :front='front'
      :valueIn="valueIn"
      :is="field.fieldType"
      :value="formData[field.name]"
      @input="updateForm(field.name, $event)"
      v-bind="field"
 
    ></component>
  </div>
</template>

<script>
import NumberInput from "./components/numberInput";
import SelectList from "./components/selectList";
import SelectListUser from './components/selectListUser'
import TextInput from "./components/textInput";
import RadioButton from "./components/radioButtons";
import SwitchSelect from "./components/switch";
import ColorSelect from "./components/colorSelect";
import TextArea from "./components/textAreaInput";
import Divider from './components/divider';
import Slider from './components/slider';
import QuilEditor from './components/quill-Editor';
import DatePicker from './components/datePicker';
import DateTimePicker from './components/dateTimePicker';
import TimePicker from './components/timePicker';
import StarRating from './components/starRating';
import CheckBox from './components/checkBox';
import ImageUpload from './components/imageUpload';
import GoogleAddress from './components/googleAddress'

export default {
  name: "FormGenerator",
  components: {
    NumberInput,
    ImageUpload,
    GoogleAddress,
    CheckBox,
    StarRating,
    SelectList,
    TextInput,
    RadioButton,
    SwitchSelect,
    ColorSelect,
    TextArea,
    SelectListUser,
    Divider,
    Slider,
    QuilEditor,
    DatePicker,
    DateTimePicker,
    TimePicker
  },
  props: ["schema", "value", "edit", "valueIn", "front"],
  data() {
    return {
      formData: this.value || {}
    };
  },
 
  methods: {
    updateForm(fieldName, value) {
      this.$set(this.formData, fieldName, value);
      this.$emit("input", this.formData);
    }
  }
};
</script>
