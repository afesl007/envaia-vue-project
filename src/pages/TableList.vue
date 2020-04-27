<template>
  <div class="content">



    <div class="md-layout">


      <div class="md-layout-item md-medium-size-100 md-size-66">





        <form @submit="formSubmit">


            <div style="text-align: center;margin-top: 5%" id="allof" >

                <div>
                   <!-- <b-form-input v-model="name" placeholder="Type a region..."></b-form-input> -->
                    <!--<div class="mt-2">Typing: {{ name }}</div> -->

                    <vue-google-autocomplete
                            id="from_address"
                            classname="form-control"
                            placeholder="Enter a region"
                            v-model="name"
                    >
                    </vue-google-autocomplete>

                </div>


                <b-button style="margin-top: 10px" variant="dark" type="submit" size="lg">Submit</b-button>


            </div>

        </form>

        <pre>
           <!-- {{name}} -->
          <h3>{{description}}</h3>
        </pre>

        <h3>AI-generated prediction and user ratings:</h3>

        <pure-vue-chart

                :points="dataPoints"
                :width="chartWidth"
                :height="chartHeight"
                :show-values="true"
        />



      </div>

    </div>




  </div>
</template>


<script>

  import axios from 'axios';

  export default {

    mounted() {
      console.log('Component mounted.')
    },
    data() {
      return {
        name: '',
        description: '',
        dataPoints: [41.1, 1],
        dataPointObjects: [{label: 'AI', value: 41.1}, {label: 'Comm', value: 1}],
        chartWidth: 450,
        chartHeight: 200,
      };
    },
    created() {
      document.addEventListener('click', () => { this.changeData(); }, false);
    },
    methods: {

      changeData() {
        this.dataPoints = this.dataPoints.map(() => {
          return this.dataPoints[1], this.dataPoints[0]
        });
      },
      formSubmit(e) {
        console.log('TESTESTETEETEST')
        e.preventDefault();
        let currentObj = this;

        axios.get('https://api.envaia.com/get_community?reg='+this.name, {
          reg: this.name,
          val: this.description
        })
                .then(function (response) {
                  currentObj.description = "AVG of all users: "+ response.data;
                  currentObj.dataPoints[1] = response.data;
                  console.log("HAGAHAGAHAGAHAGAHAGAHAGAHAGAHAAHAAH: "+response.data)
                  currentObj.dataPoints[0] = 10;

                  //alert(currentObj.output);
                })
                .catch(function (error) {
                  currentObj.output = error;
                });
      }
    }
  }
</script>


