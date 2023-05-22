<template>
    <!--write a list page, using below data format, use el-container and v-for to loop through the data
    {
        "data": [
            {
            "id": 1,
            "system_prompt": "{system: I want you to be a summerization bot}",
            "few_shots": "{}",
            "updated_at": "2023-04-18T13:41:35",
            "user_prompt": "{}",
            "name": "Summarization",
            "description": "Prompt template for summarization",
            "created_at": "2023-04-18T13:41:35"
            },
            {
            "id": 2,
            "system_prompt": "{system: I want you to be a question answering bot }",
            "few_shots": "{}",
            "updated_at": "2023-04-18T13:41:35",
            "user_prompt": "{}",
            "name": "Question Answering",
            "description": "Prompt template for question answering",
            "created_at": "2023-04-18T13:41:35"
            },
            {
            "id": 3,
            "system_prompt": "{system: I want you to be a text generation bot}",
            "few_shots": "{}",
            "updated_at": "2023-04-18T13:41:35",
            "user_prompt": "{}",
            "name": "Text Generation",
            "description": "Prompt template for text generation",
            "created_at": "2023-04-18T13:41:35"
            }
        ],
            "meta": {
                "message": "success",
                "status": 200
            }
        }
    -->
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="8">
                    <el-input placeholder="Search" v-model="searchText" @keyup.enter.native="searchPromptTemplate" clearable>
                        <el-button slot="append" icon="el-icon-search" @click="searchPromptTemplate"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="12" style="margin-left: 5px;">
                    <el-button type="primary" @click="addPromptTemplate">Add Prompt Template</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-table :data="promptTemplateList" style="width: 100%">
                <el-table-column prop="id" label="ID" width="180">
                </el-table-column>
                <el-table-column prop="name" label="Name" width="180">
                </el-table-column>
                <el-table-column prop="description" label="Description" width="180">
                </el-table-column>
                <el-table-column prop="system_prompt" label="System Prompt" width="180">
                </el-table-column>
                <el-table-column prop="user_prompt" label="User Prompt" width="180">
                </el-table-column>
                <el-table-column prop="few_shots" label="Few Shots" width="180">
                </el-table-column>
                <el-table-column prop="created_at" label="Created At" width="180">
                </el-table-column>
                <el-table-column prop="updated_at" label="Updated At" width="180">
                </el-table-column>
                <el-table-column label="Action" width="180">
                    <el-button type="text" size="small" @click="editPromptTemplate(scope.row)">Edit</el-button>
                    <el-button type="text" size="small" @click="deletePromptTemplate(scope.row)">Delete</el-button>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
// write JS and use axios library to recieve data from api /prompt/templates
export default {
    name: "PromptTemplate",
    data() {
        return {
            promptTemplateList: [],
            searchText: ""
        };
    },
    methods: {
        getPromptTemplateList() {
            this.$axios.get("/prompt/templates").then(res => {
                this.promptTemplateList = res.data.data;
            });
        },
        searchPromptTemplate() {
            this.$axios
                .get("/prompt/templates", {
                    params: {
                        search: this.searchText
                    }
                })
                .then(res => {
                    this.promptTemplateList = res.data.data;
                });
        },
        addPromptTemplate() {
            this.$router.push("/prompt/template/add");
        },
        editPromptTemplate(row) {
            this.$router.push({
                path: "/prompt/template/edit",
                query: {
                    id: row.id
                }
            });
        },
        deletePromptTemplate(row) {
            this.$confirm("Are you sure to delete this prompt template?", "Delete", {
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                type: "warning"
            })
                .then(() => {
                    this.$axios.delete("/prompt/template/" + row.id).then(res => {
                        this.$message({
                            type: "success",
                            message: "Delete successfully!"
                        });
                        this.getPromptTemplateList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "Delete canceled"
                    });
                });
        }
    },
    mounted() {
        this.getPromptTemplateList();
    }
};
</script>

<style>
</style>