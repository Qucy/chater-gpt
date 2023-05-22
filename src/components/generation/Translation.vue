<template>
  <!-- Breadcrumb menu-->
  <el-breadcrumb>
    <el-breadcrumb-item :to="{ path: '../' }">Homepage</el-breadcrumb-item>
    <el-breadcrumb-item>Generation</el-breadcrumb-item>
    <el-breadcrumb-item>Translation</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- Card View to display dropdown list -->
  <el-card style="height: 800px; overflow:auto;">
    <el-row :gutter="3">
        <!-- dropdown for target language -->
        <el-col :span="4" class="target_lang">
           Target Language:
        </el-col>
        <el-col :span="8">
            <el-select v-model="target_language" placeholder="Select">
                <el-option
                  v-for="item in trans_langs"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
            </el-select>
        </el-col>
        <!-- dropdown for translation style -->
        <el-col :span="4" class="target_lang">
           Translation style:
        </el-col>
        <el-col :span="6">
            <el-select v-model="target_style" placeholder="Select">
                <el-option
                  v-for="item in trans_styles"
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
            placeholder="Hello, how are you, how may I help you ?" 
            type="textarea"
            :autosize="{ minRows: 15, maxRows: 20 }"
            style="margin-top: 10px;"
            >
            </el-input>
        </el-col>
        <el-col :span="12">
            <el-input 
            v-model="output_content" 
            placeholder="你好，你好吗，有什么可以帮助你的吗？"
            type="textarea"
            :autosize="{ minRows: 15, maxRows: 20 }"
            style="margin-top: 10px;"
            >
            </el-input>
        </el-col>
        <el-col :span="3" style="margin-top: 10px" >
          <el-button type="info" @click="translate">Translate</el-button>
        </el-col>
    </el-row>


  </el-card>
</template>

<script>
export default {
    name: 'Translate',
    data() {
        return {
            drawer: true,
            target_language : 'Chinese',
            input_content : '',
            output_content : '',
            target_style : 'formal',
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
            trans_styles : [
                {
                    value: 'formal',
                    label: 'Formal'
                },
                {
                    value: 'informal',
                    label: 'Informal'
                }
            ],
        }
    },
    methods: {
        // call translation API
        translate() {
          // construct data
          const data = { 
            "chat_id": "string",
            "target_language": this.target_language,
            "style": this.target_style,
            "content": this.input_content
          }
          // call API
          this.$axios.post('/generate/translation', data).then(response => {
            // hanlde data
            const response_chat = JSON.parse(JSON.stringify(response.data))
            // update output content
            this.output_content = response_chat.data.content
          })
          .catch(error => {
            console.log(error)
           })
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