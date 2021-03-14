<template>
  <b-container  >
  <!-- Content here -->
    <b-row class = "pt-4 mb-4">
      <span class = "h1 m-auto "> RSA Algorithm</span>
    </b-row>


    <b-row class = "pt-4 mb-4">
      <span class = "h3 m-auto "> Tạo key</span>
    </b-row>

    <b-row>

        <b-col cols=3 class="h3" > Nhập độ dài key </b-col>
        <b-col cols=9 class="px-0" >
         
          <b-form @submit.prevent ="create_key">
          
            <b-row class="w-100 d-flex justify-content-between mx-0">
              <b-col cols=9 class="px-0"> <b-input type ="number" class="mx-0" placeholder="512bit-length" v-model="length"></b-input>  </b-col>
              <b-col cols=3 class="text-right pr-0" > <b-button type="submit" class ="bg-primary "> Tạo key tự động </b-button></b-col>
            </b-row>
        
            

          
          </b-form>
        </b-col>
        

    </b-row>


    <b-row class = "pt-4 mb-4">
      <span class = "h3 m-auto "> Thông tin key</span>
    </b-row>

    <b-row class ="mb-4" style="height =150px">
      <b-col cols=3 class="h3 align-self-start">Module (N)</b-col>
      <b-col cols=9  class="border border-dashed overflow-auto">
        {{ n }}
      </b-col>
   
    </b-row>

    <b-row class ="mb-4" style="height =150px">
      <b-col cols=3 class="h3 align-self-start">Mũ mã hóa(E)</b-col>
      <b-col cols=9 style="height =150px" class="border border-dashed overflow-auto align-self-center py-4">
        {{ e }}
      </b-col>
    </b-row>

    <b-row class ="mb-4" style="height =150px">
      <b-col cols=3 class="h3 align-self-start">Mũ giải mã(D)</b-col>
      <b-col cols=9 style="height =150px" class="border border-dashed overflow-auto">
        {{ d }}
      </b-col>
    </b-row>

    <b-row class = "pt-4 mb-4">
      <span class = "h3 m-auto ">Mã hóa</span>
    </b-row>

    <b-row>
      <b-col cols=3 class="h3">Nhập text</b-col>
      <b-col cols=9 class="px-0" >
        <b-form @submit.prevent="onSent">
          <b-form-textarea
            v-model="text"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
            required
            
          ></b-form-textarea>


          <div class="d-flex justify-content-end mt-3 ">
            <b-button type="submit" variant="primary"> Bấm gửi </b-button>
          </div>
          
      </b-form>
      </b-col>
  
    </b-row>

    <b-row class="mb-4">
      <b-col cols=12 class="h2">
        Chữ được mã hóa
      </b-col>
      <b-col style ="height : 100px;" cols=12 class ="border border-primary overflow-auto">
        {{ encrypted_text }}
      </b-col>
    </b-row>

    <b-row>
      <b-col cols=12 class="h2">
        Chữ được giải mã
      </b-col>
      <b-col style ="height : 100px;" cols=12 class ="border border-primary">
        {{ decrypted_text }}
      </b-col>
    </b-row>

    <b-row style="height:80px">

    </b-row>
  
  </b-container>
</template>

<script>
import NodeRSA from "node-rsa"
import pem2jwk from "pem2jwk"
// import TextDecoder from "text-encoding"
export default {
  data(){
    return {
      length : null,

      public_key : "",
      private_key : "",
      n : "",
      e : "",
      d : "",
      key : "",
      text : "",
      encrypted_text : "",
      decrypted_text : ""
    }
  },
  methods : {
    getNED : function(private_key){
      var temp = pem2jwk(private_key)
      return [temp["n"], temp["e"], temp["d"]]
    },
    create_key : function(){
      
      this.key = new NodeRSA({b: this.length});
      this.public_key = this.key.exportKey('public');
      this.private_key = this.key.exportKey('private');

      this.n= this.getNED(this.private_key)[0]
      this.e = this.getNED(this.private_key)[1]
      this.d = this.getNED(this.private_key)[2]

    },

    onSent  : function(){
      this.encrypted_text = this.key.encrypt(this.text, 'base64');
      this.decrypted_text = this.key.decrypt(this.encrypted_text, 'utf8');

    }
  },
  computed : {
  
  },

}
</script>

<style>

</style>