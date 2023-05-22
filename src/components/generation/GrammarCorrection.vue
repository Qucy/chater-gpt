<template>
  <!-- Breadcrumb menu-->
  <el-breadcrumb>
    <el-breadcrumb-item :to="{ path: '../' }">Homepage</el-breadcrumb-item>
    <el-breadcrumb-item>Generation</el-breadcrumb-item>
    <el-breadcrumb-item>Grammer correction</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card style="height: 800px; overflow:auto;">
    <!-- input box area -->
    <el-row :gutter="6">
        <el-col :span="12">
            <el-input 
            v-model="input_content" 
            placeholder="Example: Hello, my name was jim." 
            type="textarea"
            :autosize="{ minRows: 15, maxRows: 20 }"
            style="margin-top: 10px;"
            >
            </el-input>
        </el-col>
        <el-col :span="12">
            <div style="font-style: italic;" v-html="markdownToHtml"></div>
        </el-col>
        <el-col :span="3" style="margin-top: 10px" >
          <el-button type="info" @click="gammarCorrection">Correct</el-button>
        </el-col>
    </el-row>


  </el-card>
</template>

<script>
import { marked } from 'marked'

export default {
    name: 'Translate',
    data() {
        return {
            drawer: true,
            input_content : '',
            output_content : 'Correction: \n\n Hello, my name **is Jim**. \n - was should be is, since it is a present tense. \n - Jim should be capitalized.',
        }
    },
    methods: {
        // call translation API
        gammarCorrection() {
          // construct data
          const data = { 
            "chat_id": "chat_id",
            "content": this.input_content
          }
          // call API
          this.$axios.post('/generate/gammarcorrection', data).then(response => {
            // hanlde data
            const response_chat = JSON.parse(JSON.stringify(response.data))
            // update output content
            this.output_content = response_chat.data.content
          })
          .catch(error => {
            console.log(error)
           })
        }
    },
    computed: {
      markdownToHtml() {
        return marked(this.output_content)
      }
    }
}
</script>

<style>
.target_lang{
    padding-top: 5px;
    font-size: 16px;
}
</style>