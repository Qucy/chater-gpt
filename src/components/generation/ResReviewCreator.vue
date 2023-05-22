<template>
  <!-- Breadcrumb menu-->
  <el-breadcrumb>
    <el-breadcrumb-item :to="{ path: '../' }">Homepage</el-breadcrumb-item>
    <el-breadcrumb-item>Generation</el-breadcrumb-item>
    <el-breadcrumb-item>Restaurant review creator</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- Card View to display dropdown list -->
  <el-card style="height: 800px; overflow:auto;">
    <el-row :gutter="3">
        <!-- dropdown for target language -->
        <el-col :span="2" class="target_lang">
           Target Language:
        </el-col>
        <el-col :span="4">
            <el-select v-model="target_language" placeholder="Select">
                <el-option
                  v-for="item in trans_langs"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
            </el-select>
        </el-col>
        
        <!-- input for output content length -->
        <el-col :span="4" class="target_lang">
          Content length:
        </el-col>
        <el-col :span="4">
          <el-input v-model="content_length"></el-input>
        </el-col>
        
        <!-- input for output content length -->
        <el-col :span="4" class="target_lang">
          Category:
        </el-col>
        <el-col :span="4">
          <el-select v-model="content_category" placeholder="Select">
            <el-option
              v-for="item in review_cats"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
    </el-row>
    <el-divider />
    <!-- input box area -->
    <el-row :gutter="6">
        <el-col :span="12">
            <el-input 
            v-model="input_content" 
            placeholder="Input your keywords here. For example 'Chinese cuisine, slow, expensive, near the beach, good for family'" 
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
          <el-button type="info" @click="translate">Create Review</el-button>
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
            target_language : 'Chinese',
            input_content : '',
            output_content : '',
            content_length : 50,
            content_category: 'Positive',
            trans_langs : [
                {
                    value: 'English',
                    label: 'English'
                },
                {
                    value: 'Chinese',
                    label: 'Chinese'
                },
                {
                    value: 'Spanish',
                    label: 'Spanish'
                }
            ],
            review_cats : [
                {
                    value: 'Positive',
                    label: 'Positive'
                },
                {
                    value: 'Negative',
                    label: 'Negative'
                }
            ]
        }
    },
    methods: {
        // call translation API
        translate() {
          // construct data
          const data = { 
            "chat_id": "string",
            "target_language": this.target_language,
            "content_length": this.content_length,
            "content_category": this.content_category,
            "content": this.input_content
          }
          // call API
          this.$axios.post('/generate/resturantreview', data).then(response => {
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
    font-size: 8px;
    font-family: Arial, Helvetica, sans-serif;
}
</style>