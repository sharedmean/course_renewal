<template>
    <div>    
        <v-row>
            <!-- Курсы -->
            <v-col cols="6">
                <v-card>
                    <!-- Заголовок -->
                    <v-card-title id="cardTitle">Курсы</v-card-title>
                    
                    <!-- Информация о текущих курсах -->
                    <v-divider color="#000000"></v-divider>
                    <v-card-subtitle id="cardSubtitle">Текущие курсы</v-card-subtitle>
                    <v-divider color="#000000"></v-divider>

                    <v-card-text id="cardText" v-if="this.havingCurrentCourses==1">
                        
                        <v-data-table
                            :headers="currentCoursesHeaders"
                            :items="currentCourses.rows"
                            hide-default-header
                            :items-per-page="5"
                            class="elevation-0"
                            :footer-props="{
                                showFirstLastPage: true,
                                firstIcon: 'mdi-chevron-double-left',
                                lastIcon: 'mdi-chevron-double-right',
                                prevIcon: 'mdi-chevron-left',
                                nextIcon: 'mdi-chevron-right'
                            }"
                        >
                            
                            <!-- Заголовки таблицы -->
                            <template v-slot:header="{ props: { headers } }">
                                <thead>
                                    <tr>
                                        <th v-for="head in headers" v-bind:key="head" id="tableHeader">
                                            <span>{{head.text}}</span>
                                        </th>
                                    </tr>
                                </thead>
                            </template>
                            
                            <!-- Программа курса -->
                            <template v-slot:[`item.program`]>
                                <v-row justify="center">
                                    <v-icon size=40 class="downloadedDoc" id="tableClicked"> mdi-file-pdf-outline </v-icon>
                                </v-row>
                            </template>


                            <!-- Расписание курса -->
                            <template v-slot:[`item.schedule`]>
                                <v-row justify="center">
                                    <v-icon size=40 class="downloadedDoc" id="tableClicked"> mdi-file-pdf-outline </v-icon>
                                </v-row>
                            </template>
                            
                          

                            <!-- Процент прохождения -->
                            <template v-slot:[`item.percent`]="{ item }">
                                <v-progress-circular
                                    :rotate="360"
                                    :size="50"
                                    :width="7"
                                    :value="item.percent"
                                    color="#4b2a86"
                                    class="my-1"
                                >
                                    {{ item.percent }}
                                </v-progress-circular>
                            </template>
                        </v-data-table>
                    </v-card-text>

                    <v-card-text id="cardText" v-if="this.havingCurrentCourses==0">
                            <v-simple-table>
                                <template v-slot:default>                        
                                    <tbody id="simpleTable">
                                        <tr>
                                            <td>В данный момент Вы не являетесь слушателем курса</td>      
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>

                    <!-- Информация о завершённых курсах -->
                    <v-divider color="#000000"></v-divider>
                    <v-card-subtitle id="cardSubtitle">Завершённые курсы</v-card-subtitle>
                    <v-divider color="#000000"></v-divider>

                    <v-card-text id="cardText" v-if="this.havingFinishedCourses==1">
                        <v-data-table
                            :headers="finishedCoursesHeaders"
                            :items="finishedCourses.rows"
                            hide-default-header
                            :items-per-page="5"
                            class="elevation-0"
                            :footer-props="{
                                showFirstLastPage: true,
                                firstIcon: 'mdi-chevron-double-left',
                                lastIcon: 'mdi-chevron-double-right',
                                prevIcon: 'mdi-chevron-left',
                                nextIcon: 'mdi-chevron-right'
                            }"
                        >
                            <!-- Заголовки таблицы -->
                            <template v-slot:header="{ props: { headers } }">
                                <thead>
                                    <tr>
                                        <th v-for="head in headers" v-bind:key="head" id="tableHeader">
                                            <span>{{head.text}}</span>
                                        </th>
                                    </tr>
                                </thead>
                            </template>

                            <!-- Программа курса -->
                            <template v-slot:[`item.program`]>
                                <v-row justify="center">
                                    <!--  <v-img src="pdf.png" max-width="30" id="tableClicked"></v-img> -->
                                    <v-icon size=40 class="downloadedDoc" id="tableClicked"> mdi-file-pdf-outline </v-icon>
                                </v-row>
                            </template>


                            <!-- Оценки -->
                            <template v-slot:[`item.score`]>
                                <v-row justify="center">
                                    <v-icon size=40 class="downloadedDoc" id="tableClicked"> mdi-file-pdf-outline </v-icon>
                                </v-row>
                            </template>

                            <!-- Сертификат -->
                            <template v-slot:[`item.certificate`]>
                                <v-row justify="center">
                                    <v-icon size=40 class="downloadedDoc" id="tableClicked"> mdi-file-pdf-outline </v-icon>
                                </v-row>
                            </template>

                            <!-- Процент успешности -->
                            <template v-slot:[`item.percent`]="{ item }">
                                <v-progress-circular
                                    :rotate="360"
                                    :size="50"
                                    :width="7"
                                    :value="item.percent"
                                    color="#4b2a86"
                                    class="my-1"
                                >
                                    {{ item.percent }}
                                </v-progress-circular>
                            </template>
                        </v-data-table>
                    </v-card-text>
                    <v-card-text id="cardText" v-if="this.havingFinishedCourses==0">
                            <v-simple-table>
                                <template v-slot:default>                        
                                    <tbody id="simpleTable">
                                        <tr>
                                            <td>В данный момент Вы не завершили ни одного курса</td>      
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                </v-card>
            </v-col>

            <!-- Документы -->
            <v-col cols="6">
                <v-card>
                    <v-card-title id="cardTitle">Документы</v-card-title>

                    <!-- Информация об отклонённых документах -->
                    <div v-if="this.havingDocs==1">
                        <div v-if="this.showCancelledDocs.length">
                            <v-divider color="#000000" ></v-divider>
                                <v-card-subtitle id="cardSubtitle">Отклонённые документы</v-card-subtitle>
                            <v-divider color="#000000"></v-divider>
                            
                            <!-- Основная информация -->
                            <v-card-text id="cardText">
                                <v-simple-table>
                                    <template v-slot:default>                        
                                        <tbody id="simpleTable">
                                            <tr
                                                v-for="doc in showCancelledDocs"
                                                :key="doc.id"
                                            >
                                                <td>{{ doc.name }}</td>
                                                <td width="5">
                                                    <v-icon id="deleteDoc" class="downloadedDoc" size=25 @click="deleteDoc(doc)">mdi-delete</v-icon>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-card-text>
                        </div>
                    </div>
                    <!-- Загрузить новый документ -->
                    <v-divider color="#000000"></v-divider>
                    <v-card-subtitle id="cardSubtitle">Загрузить новый документ</v-card-subtitle>
                    <v-divider color="#000000"></v-divider>


                    <!-- Основная информация -->
                    <v-card-text id="cardText">
                        <v-row>
                            <v-col cols="11">
                                <v-select
                                    color="#4b2a86"
                                    :items="docTypes"
                                    dense
                                    outlined
                                    label="Новый документ"
                                    hide-details
                                    v-model="selected"
                                ></v-select>
                            </v-col>

                            <!-- Кнопка добавления документа -->
                            <v-col cols="1">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn 
                                            v-bind="attrs"
                                            v-on="on"
                                            icon
                                            @click="addDoc(selected)" 
                                        > 
                                            <v-icon id="addDoc" size="45">mdi-plus-box</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Добавить</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <!-- Загруженные документы -->
                    <v-divider color="#000000"></v-divider>
                    <v-card-subtitle id="cardSubtitle">Загруженные документы</v-card-subtitle>
                    <v-divider color="#000000"></v-divider>

                    <!-- Основная информация -->
                    <v-card-text id="cardText" v-if="this.havingDocs==1">
                        <v-data-table
                            :headers="downloadedDocsHeaders"
                            :items="docs.rows"
                            hide-default-header
                            :items-per-page="5"
                            class="elevation-0"
                            :footer-props="{
                                showFirstLastPage: true,
                                firstIcon: 'mdi-chevron-double-left',
                                lastIcon: 'mdi-chevron-double-right',
                                prevIcon: 'mdi-chevron-left',
                                nextIcon: 'mdi-chevron-right'
                            }"
                        >
                            <!-- Заголовки таблицы -->
                            <template v-slot:header="{ props: { headers } }">
                                <thead>
                                    <tr>
                                        <th v-for="head in headers" v-bind:key="head" id="tableHeader">
                                            <span>{{head.text}}</span>
                                        </th>
                                    </tr>
                                </thead>
                            </template>

                            <!-- Статус -->
                            <template v-slot:[`item.status`]="{ item }">
                                <h4 v-if="item.status==1" class="downloadedDoc">Загружен</h4>
                                <h4 v-if="item.status==0" class="waitingDoc">В ожидании</h4>
                                <h4 v-if="item.status==-1" class="deniedDoc">Отклонён</h4>
                            </template>

                        </v-data-table>
                    </v-card-text>
                    <v-card-text id="cardText" v-if="this.havingDocs==0">
                            <v-simple-table>
                                <template v-slot:default>                        
                                    <tbody id="simpleTable">
                                        <tr>
                                            <td>В данный момент у Вас нет загруженных документов</td>      
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                </v-card>
            </v-col>
        </v-row>
  </div>
</template>

<script>

export default {
    components:{

    },

    data() {
        return {
            currentId: 16,
            docs: null,
            currentCourses: null,
            finishedCourses: null,
            havingDocs: 0,
            havingCurrentCourses: 0,
            havingFinishedCourses: 0,
            selected: [],
            currentCoursesHeaders: [
                { text: 'Наименование курса', value: 'name', align: 'center' },
                { text: 'Программа курса', value: 'program', align: 'center' },
                { text: 'Расписание курса', value: 'schedule', align: 'center' },
                { text: 'Процент прохождения', value: 'percent', align: 'center' },
            ],

            finishedCoursesHeaders: [
                { text: 'Наименование курса', value: 'name', align: 'center' },
                { text: 'Программа курса', value: 'program', align: 'center' },
                { text: 'Оценки', value: 'score', align: 'center' },
                { text: 'Сертификат', value: 'certificate', align: 'center' },
                { text: 'Процент успешности', value: 'percent', align: 'center' },
            ],
            
            docTypes: [
                'Паспорт',
                'СНИЛС',
                'Диплом о среднем профессиональном образовании',
                'Диплом о профессиональной переподготовке с присвоением квалификации'
            ],

            downloadedDocsHeaders: [
                { text: 'Наименование документа', value: 'name' },
                { text: 'Статус', value: 'status', align: 'center' },
            ],

            tableHeaderTiles: [
                'Название курса', 
                'Программа курса',
                'Оценки',
                'Процент успешности',
                'Сертификат'
            ],
            
        }
    },

    methods: {
        getDocs: function () {
            let fullURL = '/docs/getDocsUser/'+this.currentId+'/'
            this.axios.get(fullURL)
            .then((responce) => {
              this.docs = responce.data;
              this.havingDocs = 1;
            })
            .catch((error) => {
              this.docs=null
              this.errors = error.data.detail
            })  
        },
        deleteDoc: function (list) {
            let fullURL = '/docs/deleteDoc/'+list.id;
            
            this.axios.delete(fullURL, {
                id: list.id,
            })
            .then((responce) => {
              this.results = responce.data;
              this.getDocs();
            })
            .catch((error) => {
              this.errors = error.data.detail
            })  
        },
        addDoc: function (name) {
            let fullURL = '/docs/addDoc/'
            
            this.axios.post(fullURL, {
                name: name,
                link: "knjcfhjedhy.pdf",
                status: 0,
                user_id: this.currentId
            })
            .then((responce) => {
              this.results = responce.data;
              this.getDocs();
            })
            .catch((error) => {
              this.errors = error.data.detail
            })  
        },
        getCurrentCourses: function () {
            let fullURL = '/listeners_courses/getCurrentCourseByListener/'+this.currentId+'/'
            this.axios.get(fullURL)
            .then((responce) => {
              this.currentCourses = responce.data;
              this.havingCurrentCourses = 1;
            })
            .catch((error) => {
              this.currentCourses=null
              this.errors = error.data.detail
            })  
 
        },
        getFinishedCourses: function () {
            let fullURL = '/listeners_courses/getFinishedCourseByListener/'+this.currentId+'/'
            this.axios.get(fullURL)
            .then((responce) => {
              this.finishedCourses = responce.data;
              this.havingFinishedCourses = 1;
            })
            .catch((error) => {
              this.finishedCourses=null
              this.errors = error.data.detail
            })  
        },
    },
    computed: {
        showCancelledDocs: function () {
            return this.docs.rows.filter(doc => {
                return (doc.status == -1);
            })
        },   
    },

    mounted () {
        this.getDocs()
        this.getCurrentCourses()
        this.getFinishedCourses()
    }
}
</script>

<style lang="css" scoped>
    #cardTitle {
        background: linear-gradient(12deg, rgba(0,0,4,1) 0%, rgb(54 22 109) 79%, rgb(75 42 134) 79%);
        justify-content: center;
        color: white;
        font-size: 18px;
    }

    #cardSubtitle {
       /* background-color: #bdbbd0; */
       background: linear-gradient(12deg, #bdbbd0 0%, #bdbbd056 79%, #bdbbd088 79%);
        color: black;
        text-align: center;
        font-weight: bold;
    }

    #tableHeader  {
        text-align: center;
        color: black;
    }

    #tableClicked:hover {
        cursor: pointer;
    }

    #simpleTable tr,td {
        background: #ffffff; 
        border-top: 1px solid rgba(0, 0, 0, .2);
        border-bottom: 1px solid rgba(0, 0, 0, .2);
        /* border: 1px solid rgb(0, 0, 0);  */
        color: black;
        text-align: center;
    }

    .downloadedDoc {
        color: #2f1a54;
    }

    .waitingDoc {
        color:#bdbbd0;
    }

    #deleteDoc:hover {
        cursor: pointer;
        color: rgb(163, 30, 30);
    }

    #addDoc {
        color: #2f1a54;
        padding-right: 20px;
    }

    #addDoc:hover {
        cursor: pointer;
        color: #bdbbd0;
    }
/* 
h2{
    margin-top:0px !important;
}

.table-hat{
    background: linear-gradient(12deg, rgba(75,42,134,1) 0%, rgba(0,0,4,1) 79%);
    color: white;
}

h1{
    border-bottom: 1px solid #4b2a86;
    padding-bottom: 30px;
    margin-bottom: 30px;
    font-size: 30px;
}

.main-block{
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-between;
}
.left-block{
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    padding-right: 50px;
    border-right: 1px solid #4b2a86;
    width:50%;
}
.right-block{
    display: flex;
    flex-direction: column;
}
.pdf-img-big{
   width:40px;
}
h2{
    margin: 0 auto;
    margin-top: 10px;
    font-weight: 600;
    font-size: 20px;
}
.right-block-tiles{
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #4b2a86;
    margin-bottom:30px;
}
.tile-right-item {
   cursor: default;;
   margin:30px;
   width: 100%;
}
.tile-glow, .tile-glow2{
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding:10px;
   box-shadow: 0 0 5px #0c0c0c;
   width:100%;
   margin:30px;
   margin-left: 0px;
   margin-right: 0px;
   margin-bottom:0px;
}
.tile-select{
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding:10px;
   width:100%;
   margin:30px;
   margin-left: 0px;
   margin-right: 0px;
   margin-bottom:0px;
}
.tile-glow3{
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding:20px;
   box-shadow: 0 0 5px #0c0c0c;
   margin-left: 0px;
   margin-right: 0px;
   
}
.tile-glow:hover{
   box-shadow: 0 0 10px #4b2a86;
   transition-duration: 0.3s;
   cursor:pointer;
}
.percent{
   border: 7px inset #4b2a86;
   padding-top: 14px;
   font-size: 24px;
   border-radius: 50%;
   height: 70px;
   width: 70px;
   align-items: center;
   vertical-align: middle;
   text-align: center;
}
.percent-small{
   border: 5px inset #4b2a86;
   padding-top: 10px;
   font-size: 14px;
   border-radius: 50%;
   height: 45px;
   width: 45px;
   margin: 0 auto;
}
.pdf-img-big{
   width:40px;
}
.pdf-img{
   width:30px;
}

.courses-table{
   font-size: 13px;
   text-align: center;
   box-shadow: 0 0 2px #000000;
   margin:0px;
   margin-top: 30px;
   width: 100%;
}
.cancelled{
    box-shadow: 0 0 10px #4b0808;
}
.courses-table tr, .courses-table td{
   box-shadow: 0 0 1px #000000;
   padding:10px;        
}
.form-inner{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
a{
    text-decoration: none;
    color: black;
} */
</style>