<template>

  <div class="content">

   <!-- <b-container class="bv-example-row">
      <b-row>
        <b-col>1 of 3</b-col>
        <b-col>2 of 3</b-col>
        <b-col>3 of 3</b-col>
      </b-row>
    </b-container> -->

    <div class="md-layout">

      <div class="md-layout-item md-medium-size-100 md-size-66">

      <b-container fluid>





        <b-container fluid>
        <h2> Type how much fire threat you except in a region :</h2>
        </b-container>

        <b-container fluid style="margin-top: 50px">

        <form @submit="formSubmit">

          <b-row class="my-1">

            <div>
              <!--<b-form-input v-model="name" placeholder="Enter a region"></b-form-input> -->
              <vue-google-autocomplete
                      id="from_address"
                      ref="address"
                      classname="form-control"
                      placeholder="Enter a region"
                      v-on:placechanged="getAddressData"
                      v-model="name"

              >
              </vue-google-autocomplete>
              <!--<div class="mt-2">Typing: {{ name }}</div> -->
            </div>


            <div style="margin-left: 10px">
              <b-form-input v-model="description" size="lg" type="number" min="0" max="100" placeholder="0% - 100%" ></b-form-input>
              <!--<div class="mt-2">Value: {{ description }}</div> -->
            </div>

            <b-button style="margin-left: 10px" variant="dark" type="submit">Submit</b-button>
          </b-row>
        </form>

        </b-container>
        <!--<form @change="test">
          <div class="form-group">
            <label for="formControlRange">Percentage</label>
            <input type="range" min="0"  max="100" class="form-control-range" id="formControlRange" onchange="updateTextInput(this.value);">
          </div>
        </form> -->

        <pre>

         <h3> {{output}} </h3>


        </pre>


        <!--<place-autocomplete-field placeholder="Enter an an address, zipcode, or location" label="Address" name="field1" api-key="AIzaSyBHCWxL5mmhM1uvljRSJy2JlqpR48ZfVoI"></place-autocomplete-field> -->





       <!-- <div>
          <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
          <div class="mt-2">Value: {{ text }}</div>
        </div>  -->


        <!--<pure-vue-chart
                :points="dataPoints"
                :width="chartWidth"
                :height="chartHeight"
                :show-values="true"
        /> -->



      </b-container>

      </div>

    </div>



  </div>
</template>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBHCWxL5mmhM1uvljRSJy2JlqpR48ZfVoI&amp;libraries=places"></script>

<script src="https://cdn.jsdelivr.net/npm/vue-place-autocomplete@0.5.3/dist/VuePlaceAutocomplete.umd.min.js"></script>




<script>

  import VueGoogleAutocomplete from 'vue-google-autocomplete';



  import axios from 'axios';



  var vm = new Vue({
    data: {
      // declare message with an empty value
      description: '',
      name: '',
      output: '',
      value: '2',
      text: '',
    },
    //template: '<div>{{ message }}</div>'
  })



  export default {


    components: {VueGoogleAutocomplete},

    data: function () {
      return {
        address: ''
      }
    },

    mounted() {
      console.log('Component mounted.')
    },

    data() {
      return {
        description: '',
        name: '',
        output: '',
        value: '2',
        text: '',
      };
    },
    data: function() {
      return {
        from_address:{},
        to_address:{}
      }
    },

    methods: {

      getAddressData: function (addressData, placeResultData, id) {
        this.address = addressData;
        this.name = this.address;
      },

      formSubmit(e) {
        console.log('TESTESTETEETEST');
        console.log(vm.description);
        //this.name = "Portland";
        console.log(vm.name);
        e.preventDefault();
        let currentObj = vm;
        currentObj.output = "You successfully sent your estimate to our database";
        axios.get('https://api.envaia.com/admit_community?reg='+vm.name+"&val="+vm.description, {
          reg: vm.name,
          val: vm.description
        })
                .then(function (response) {
                  currentObj.output = response.data + ": Your estimate is in our database!" ;
                })
                .catch(function (error) {
                  currentObj.output = error;
                });
      }
    }
  }



</script>



