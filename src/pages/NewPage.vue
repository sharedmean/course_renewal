<template>
  <div>    
        <div class="main-block">
            <div class="left-block">
                 <h1> Слушатели </h1>
                 <v-data-table
                    v-if="users"
                    :search="search"
                    :headers="headers"
                    :items="users.rows"
                    @click:row="showListener"
                    style="cursor:pointer"
                    >
                <template v-slot:top>
                <v-text-field
                v-model="search"
                label="Поиск"
                ></v-text-field>
            </template>
                
                </v-data-table>

            </div>
            <div class="right-block">
                <div class="right-hat">
                    <h1> {{ rightHeader }} </h1>
                    <img @click="hideListener()" v-if="!newIsShow" src="/XXX.png" class="close-img"/> 
                </div>
                <form v-if="newIsShow"> 
                    <div class="container-right"> 
                        <div class="group">      
                            <input type="text" required style="width:200px" v-model="newLastName">
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Фамилия</label>
                        </div> 
                        <div class="group">      
                            <input type="text" required style="width:120px" v-model="newFirstName">
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Имя</label>
                        </div> 
                        <div class="group">      
                            <input type="text" required style="width:170px" v-model="newPatronymic">
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Отчество</label>
                        </div>  
                    </div> 
                    <div class="container-right" style="margin-top:0px"> 
                        <div class="group">      
                            <input type="text" required style="width:220px" v-model="newPhone">
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Мобильный телефон</label>
                        </div> 
                        <div class="group">      
                            <input type="text" required style="width:290px" v-model="newEmail">
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>E-mail</label>
                        </div>  
                    </div> 
                    <div class="tile-glow-right" style="font-size:15px;" @click="addNewListener">   
                        Добавить слушателя
                    </div>
                </form>
                <div v-if="!newIsShow" v-key="currentId">
                    
                    <form class="listeners-form"> 
                        <div class="container-right"> 
                            <div class="group">      
                                <input type="text" required style="width:200px" v-model="currentLastName">
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Фамилия</label>
                            </div> 
                            <div class="group">      
                                <input type="text" required style="width:120px" v-model="currentFirstName">
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Имя</label>
                            </div> 
                            <div class="group">      
                                <input type="text" required style="width:170px" v-model="currentPatronymic">
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Отчество</label>
                            </div>  
                        </div> 
                        <div class="container-right" style="margin-top:0px"> 
                            <div class="group">      
                                <input type="text" required style="width:220px" v-model="currentPhone">
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Мобильный телефон</label>
                            </div> 
                            <div class="group">      
                                <input type="text" required style="width:290px" v-model="currentEmail">
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>E-mail</label>
                            </div>  
                        </div> 
                        <div class="container-right" style="margin-top:0px"> 
                            <div class="group">      
                                <input type="text" required style="width:220px" v-model="currentLogin" disabled>
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label class="login-pass">Логин</label>
                            </div> 
                            <div class="group">      
                                <input type="text" required style="width:290px" v-model="currentPassword" disabled>
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label class="login-pass">Пароль</label>
                            </div>  
                        </div> 
                        <div class="tile-glow-right"  style="font-size:15px;" @click="editListener">   
                            Изменить данные
                        </div>
                    </form>
                <!--    <h1 style="padding-top: 20px; padding-bottom: 20px"> Курсы слушателя </h1>
                    <div class="container-right" style="margin-top:0px"> 
                        <select v-model="newCourseId" style="width:500px" >
                            <option v-for="list in showCurrentCourses" :key="list.id" v-bind:value="list.id"> {{ list.name }} </option>
                        </select>
                        <div class="tile-glow" @click="addCourse" style="font-size:15px;">   
                            Добавить курс
                        </div>
                    </div>
                    <table class="courses-table" >  
                        <tr class="table-hat">
                            <td>
                                Название курса
                            </td>
                            <td>
                                Дата начала
                            </td>
                            <td>
                                Договор
                            </td>
                            <td>
                                Счёт
                            </td>
                        </tr>                     
                        <tr v-for="list in showCourses" :key="list.idListener">
                            <td> {{ this.courses[list.idCourse].name }} </td>
                            <td> {{ this.courses[list.idCourse].startDate }} </td>
                            <td v-if="list.agreement==0" class="add-agreement"> 
                                <img src="/XXX.png" class="add-img" @click="addAgreement(list)" />
                            </td>
                            <td id="pdf-img-wait" v-if="list.agreement==1">
                                <img src="/pdf.png" class="pdf-img-wait" /> 
                            </td>
                            <td id="pdf-img-done" v-if="list.agreement==2">
                                <img src="/pdf.png" class="pdf-img-done" />  
                            </td>
                            <td id="pdf-img-cancelled" v-if="list.agreement==-1">
                                <img  src="/pdf.png"  class="pdf-img-cancelled"/>
                            </td>

                            <td v-if="list.invoice==1" class="add-agreement"> 
                                <img src="/XXX.png" class="add-img" @click="addInvoice(list)" />
                            </td>
                            <td id="pdf-img-done" v-if="list.invoice==2">
                                <img src="/pdf.png" class="pdf-img-done" /> 
                            </td>                      
                        </tr>
                    </table>
                    -->
                    <!-- Документы слушателя -->
                    <v-card>
                    <v-card-title class="cardTitle">Документы</v-card-title>
                    <!-- Документы в ожидании проверки -->
                    <div v-if="docs">
                    <div v-if="this.showDocsStatus0.length" v-key="currentId">
                        <v-divider color="#000000"></v-divider>
                        <v-card-subtitle class="cardSubtitle">Документы в ожидании</v-card-subtitle>
                        <v-divider color="#000000"></v-divider>
                        <v-card-text class="cardText">
                            <v-simple-table>
                                <template v-slot:default>                        
                                    <tbody id="simpleTable">
                                        <tr
                                            v-for="doc in showDocsStatus0"
                                            :key="doc.id"
                                        >
                                            <td>{{ doc.name }}</td>
                                            <td class="tableClicked"><img src="/pdf.png" style="width:30px;"/> </td>
                                            <td width="5" @click="acceptDoc(doc)" class="tableClicked">
                                                Принять
                                            </td>
                                            <td width="5" @click="cancelDoc(doc)" class="tableClicked">
                                                Отклонить
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                    </div>    
                    </div>
                        <!-- Загрузить новый документ -->
                    <div>
                        <v-divider color="#000000"></v-divider>
                        <v-card-subtitle class="cardSubtitle">Загрузить новый документ</v-card-subtitle>
                        <v-divider color="#000000"></v-divider>


                        <!-- Основная информация -->
                        <v-card-text class="cardText">
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
                    </div>
                    <div v-if="docs" v-key="currentId">
                        <!-- Загруженные документы -->
                        <v-divider color="#000000"></v-divider>
                        <v-card-subtitle class="cardSubtitle">Загруженные документы</v-card-subtitle>
                        <v-divider color="#000000"></v-divider>

                        <!-- Основная информация -->
                        <v-card-text id="cardText">
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
                                    <h4 v-if="item.status==-1" class="cancelledDoc">Отклонён</h4>
                                </template>

                            </v-data-table>
                        </v-card-text>
                        
                    </div>
                
                    
                    </v-card>
                    <!-- Курсы слушателя -->
                    <v-card>
                    <v-card-title class="cardTitle">Курсы</v-card-title>
                    <!-- Добавить курс слушателю -->
                    <div>
                        <v-divider color="#000000"></v-divider>
                        <v-card-subtitle class="cardSubtitle">Оформление на курс</v-card-subtitle>
                        <v-divider color="#000000"></v-divider>


                        <!-- Основная информация -->
                        <v-card-text class="cardText">
                            <v-row>
                                <v-col cols="11">
                                    <v-select
                                        color="#4b2a86"
                                        :items="courseTypes.rows"
                                        dense
                                        outlined
                                        label="Новый курс"
                                        hide-details
                                        v-model="selected"
                                        item-text="name"
                                        item-value="id"
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
                                                @click="addCourse(selected)" 
                                            > 
                                                <v-icon id="addDoc" size="45">mdi-plus-box</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Добавить</span>
                                    </v-tooltip>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </div>
                    <div v-if="courses" v-key="currentId">
                        <!-- Загруженные документы -->
                        <v-divider color="#000000"></v-divider>
                        <v-card-subtitle class="cardSubtitle">Информация о записи на курсы</v-card-subtitle>
                        <v-divider color="#000000"></v-divider>

                        <!-- Основная информация -->
                        <v-card-text id="cardText">
                            <v-data-table
                                :headers="coursesHeaders"
                                :items="courses.rows"
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

                               <!-- Договор -->
                                <template v-slot:[`item.agreements_link`]>
                                    <v-row justify="center" >
                                        <v-img src="pdf.png" max-width="30" class="tableClicked"></v-img>
                                    </v-row>
                                </template>

                                
                                 <!-- Счёт -->
                                <template v-slot:[`item.invoices_link`]="{ item }">
                                    <v-row  v-if="item.status==0 && item.invoice_status==0" justify="center" >
                                        <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn 
                                                v-bind="attrs"
                                                v-on="on"
                                                icon
                                                @click="editInvoice(item.invoice_id)" 
                                            > 
                                                <v-icon id="addInvoice" size="45">mdi-plus</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Добавить</span>
                                        </v-tooltip>
                                    </v-row>

                                    <v-row  v-if="item.status==0 && item.invoice_status==-1" justify="center" >
                                        <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn 
                                                v-bind="attrs"
                                                v-on="on"
                                                icon
                                                @click="createInvoice(item)" 
                                            > 
                                                <v-icon id="addInvoice" size="35">mdi-repeat</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Сформировать новый</span>
                                        </v-tooltip>
                                    </v-row>

                                    <v-row  v-if="item.status==1" justify="center" >
                                        <v-img src="pdf.png" max-width="30" class="tableClicked"></v-img>
                                    </v-row>
                                    <v-row  v-if="item.status==-1" justify="center" >
                                        <v-icon size="35">mdi-repeat-off</v-icon>
                                    </v-row>
                                </template>
                               

                            </v-data-table>
                        </v-card-text>
                        
                    </div>
                
                    
            
                    </v-card>
                   <!-- <h2 style="margin-bottom:30px" v-if:="this.currentId==0 && showWaitDocs.length"> Документы в ожидании </h2>
                    <table class="courses-table" v-if:="this.currentId==0 && showWaitDocs.length" style="box-shadow: 0 0 5px rgb(255, 204, 0);">
                        <tr v-for:="list in showWaitDocs" >
                            <td> {{ UserStore.docTypes[list.idDocType].name }}</td>
                            <td style="width: 60px"> <img src="/pdf.png" class="pdf-img" /> </td>
                            <td style="cursor:pointer;width: 60px" @click="AcceptDoc(list.id)">
                                Принять
                            </td>
                            <td style="cursor:pointer;width: 60px" @click="DenyDoc(list.id)">
                                Отклонить
                            </td>
                        </tr>
                    </table>
                    <h2> Загрузить новый документ </h2>
                    <div class="container-right" style="margin-top:0px; "> 
                        <select v-model="newDocId" style="width: 350px">
                            <option v-for="list in UserStore.docTypes" :key="list.id" v-bind:value="list.id"> {{ list.name }} </option>
                        </select>
                        <div class="tile-glow" style="width:50px; padding:0px;">     
                            <img @click="changeAddStatus" v-if:="this.addDocStatus!=1" src="/XXX.png" style="width:30px; transform: rotate(45deg); padding:3px; margin: 0 auto;"/>
                            <img v-if:="this.addDocStatus!=0" src="/pdf.png" style="width:30px; padding:3px; margin: 0 auto;"/> 
                        </div> 
                        <div class="tile-glow" @click="addDoc" style="text-align: center; font-size:14px">   
                            Добавить документ
                        </div>
                    </div>
                    
                    <h2 style="margin-bottom:30px"> Загруженные документы </h2>
                    <table class="courses-table" v-if:="this.currentId==0">
                        <tr class="table-hat">
                            <td>
                                Наименование документа
                            </td>
                            <td>
                                Статус
                            </td>   
                        </tr>
                        <tr v-for:="list in UserStore.listeners_docs">
                            <td> {{ UserStore.docTypes[list.idDocType].name }}</td>
                            <td v-if:="list.status==0"> В ожидании </td>
                            <td v-if:="list.status==1"> Загружен </td>
                            <td v-if:="list.status==-1"> Отклонён </td>
                        </tr>
                    </table> -->
                    </div>
                </div>
            </div>    
        </div>
</template>

<script>
import UserStore from "@/components/store/user"
export default {
    data() {
        return {
            selected: [],
            users: null,
            docs: null,
            errors: null,
            accept: 'Принять',
            cancel: 'Отклонить',
            courseTypes: null,
            agreements: null,
            courses: null,
            headers: [
                { text: 'Имя', value: 'first_name', align: 'center' },
                { text: 'Фамилия', value: 'last_name', align: 'center' },
                { text: 'Отчество', value: 'patronymic', align: 'center' },
                { text: 'Мобильный телефон', value: 'phone', align: 'center' }
            ],
            downloadedDocsHeadersStatus0: [
                { text: 'Наименование документа', value: 'name',  },
                { text: 'Принять', value: 'Принять', align: 'center' },
                { text: 'Отклонить', value: 'cancel', align: 'center' },
            ],
            coursesHeaders: [
                { text: 'Название курса', value: 'name' },
                { text: 'Соглашение', value: 'agreements_link' },
                { text: 'Счёт', value: 'invoices_link' },
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
            search: '',
            newDocId: -1,
            UserStore,
            rightHeader: 'Добавление слушателя',
            fio: '',
            newFirstName: '',
            newLastName: '',
            newPatronymic: '',
            newPhone: '',
            newEmail: '',
            currentId: -1,
            currentFirstName: '',
            currentLastName: '',
            currentPatronymic: '',
            currentPhone: '',
            currentEmail: '',
            currentLogin: '',
            currentPassword: '',
            newIsShow: true,
            newCourseId: -1,
            addDocStatus: 0,
            nextListenerId: 11,
        }
    },
     methods: {
        getUsers: function () {
            let fullURL = '/users/getUsers'

            this.axios.get(fullURL)
            .then((responce) => {
              this.users = responce.data;
            })
            .catch((error) => {
              this.errors = error.data.detail
            })
        },
        addNewListener: function () {
            let fullURL = '/users/addUser'
            
            this.axios.post(fullURL, {

              first_name: this.newFirstName,
              last_name: this.newLastName,
              patronymic: this.newPatronymic,
              phone: this.newPhone,
              email: this.newEmail,
              login: Math.random().toString(36).substring(2, 15),
              password: Math.random().toString(36).substring(2, 15),
              role_id: 1
            })
            .then((responce) => {
              this.results = responce.data;
              this.getUsers();
              this.newFirstName = '';
              this.newLastName = '';
              this.newPatronymic = '';
              this.newPhone = '';
              this.newEmail = ''
            })
            .catch((error) => {
              this.errors = error.data.detail
            })            
        },
        ifDocs: function() {
            if (this.currentId!=-1){
                let fullURL = '/docs/ifDocsUser/'+this.currentId+'/'
                this.axios.get(fullURL)
            .then((responce) => {
              return responce.data;
            })
            .catch((error) => {
              this.errors = error
            })
            }    
        },
        getDocs: function () {
            if (this.currentId!=-1){
                let fullURL = '/docs/getDocsUser/'+this.currentId+'/'
                this.axios.get(fullURL)
            .then((responce) => {
              this.docs = responce.data;

            })
            .catch((error) => {
              this.docs=null;
              this.errors = error
            })
            }    
        },
        cancelDoc: function (list) {
            let fullURL = '/docs/editDoc/'
            
            this.axios.post(fullURL, {
                id: list.id,
                name: list.name,
                link: list.link,
                status: -1,
                user_id: list.user_id
            })
            .then((responce) => {
              this.results = responce.data;
              this.getDocs();
            })
            .catch((error) => {
              this.errors = error.data.detail
            })  
        },
        acceptDoc: function (list) {
            let fullURL = '/docs/editDoc/'
            
            this.axios.post(fullURL, {
                id: list.id,
                name: list.name,
                link: list.link,
                status: 1,
                user_id: list.user_id
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
                status: 1,
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
        editInvoice: function (id) {
            let fullURL = '/invoices/editInvoice'
            this.axios.post(fullURL, {
              id: id,
              link: String(Math.random().toString(36).substring(2, 15))+'.pdf',
            })
            .then((responce) => {
              this.results = responce.data;
              this.getCourses();
            })
            .catch((error) => {
              this.errors = error.data.detail
            })     

        },
        createInvoice: function (item) {
       
            let fullURL = '/invoices/addRenewedInvoice'

            this.axios.post(fullURL, {
                amount: item.amount,
                agreement_id: item.agreement_id
            })
            .then((responce) => {
              this.results = responce.data;
              this.getCourses();
            })
            .catch((error) => {
              this.errors = error.data.detail
            })  

        },
        addCourse: function (id) {
            let fullURL = '/agreements/addAgreement/'
            this.axios.post(fullURL, {
                link: String(Math.random().toString(36).substring(2, 15))+'.pdf',
                status: 0,
                organization_id: 0,
                course_id: id,
                partnership_agreement_id: 0
            })
            .then((responce) => {
              this.results = responce.data;
            })
            .catch((error) => {
              this.errors = error.data.detail
            })  

            let amount = null;
            this.courseTypes.rows.forEach(element => {
                
                if (element.id==id) 
                    amount = element.price;
            });

            let fullURL2 = '/invoices/addInvoice/'+amount+'/'

            this.axios.post(fullURL2, { 
                amount: amount
            })
            .then((responce) => {
              this.results = responce.data;
            })
            .catch((error) => {
              this.errors = error.data.detail
            })

            let fullURL3 = '/listeners_agreements/addListenerAgreement/'+this.currentId+'/'
            
            this.axios.post(fullURL3, {
                user_id: this.currentId,
            })
            .then((responce) => {
              this.results = responce.data;
              this.getCourses();
            })
            .catch((error) => {
              this.errors = error.data.detail
            })

            
        },
        getCoursesTypes: function () {
            let fullURL = '/courses/getCoursesByDate'

            this.axios.get(fullURL)
            .then((responce) => {
              this.courseTypes = responce.data;
            })
            .catch((error) => {
              this.errors = error.data.detail
            })
        },
        getCourses: function () {
            if (this.currentId!=-1){
                let fullURL = '/listeners_agreements/getListenerAgreementByListener/'+this.currentId+'/'
                this.axios.get(fullURL)
            .then((responce) => {
              this.courses = responce.data;

            })
            .catch((error) => {
              this.courses=null;
              this.errors = error
            })
            }    
        },
        editListener () {
            let fullURL = '/users/editUser'
            this.axios.post(fullURL, {
              id: this.currentId,  
              first_name: this.currentFirstName,
              last_name: this.currentLastName,
              patronymic: this.currentPatronymic,
              phone: this.currentPhone,
              email: this.currentEmail,
              login: this.currentLogin,
              password: this.currentPassword,
              role_id: 1
            })
            .then((responce) => {
              this.results = responce.data;
              this.getUsers();
            })
            .catch((error) => {
              this.errors = error.data.detail
            })            
        },
        showListener (list) {
            this.currentId = list.id;
            this.currentFirstName = list.first_name;
            this.currentLastName = list.last_name;
            this.currentPatronymic = list.patronymic;
            this.currentPhone = list.phone;
            this.currentEmail = list.email;
            this.currentLogin = list.login;
            this.currentPassword = list.password;
            this.newIsShow = false;
            this.rightHeader = 'Данные о слушателе';
            this.getDocs();
            this.getCourses();
        },
        hideListener () {
            this.newIsShow = true;
            this.rightHeader = 'Добавление слушателя';
        },
        
    },
    computed: {
        showListeners: function () {
            return this.listeners.filter(listener => {
                return (listener.first_name + " " + listener.last_name).includes(this.fio);
            })
        },
        showCourses () {
            return this.listeners_courses.filter(listener_course => {
                return listener_course.idListener == this.currentId
            }).reverse();
        },  
        showCurrentCourses () {
            return this.courses.filter(course => {
                return course.status != -1
            });
        },   
        showDocsStatus0: function () {
            return this.docs.rows.filter(doc => {
                return (doc.status == 0);
            })
        },         
    },
    mounted () {
      this.getUsers()
      this.getCoursesTypes()
    }
}
</script>

<style scoped>
h1{
    font-size: 30px;
}
.cardTitle {
    background: linear-gradient(12deg, rgba(0,0,4,1) 0%, rgb(54 22 109) 79%, rgb(75 42 134) 79%);
    justify-content: center;
    color: white;
    font-size: 18px;
}
.simpleTable tr,td {
    background: #ffffff; 
    border-top: 1px solid rgba(0, 0, 0, .2);
    border-bottom: 1px solid rgba(0, 0, 0, .2);
    /* border: 1px solid rgb(0, 0, 0);  */
    color: black;
    text-align: center;
}
.cardSubtitle {
   /* background-color: #bdbbd0; */
    background: linear-gradient(12deg, #bdbbd0 0%, #bdbbd056 79%, #bdbbd088 79%);
    color: black;
    text-align: center;
}
#addDoc {
    color: #4b2a86;
    padding-right: 25px;
}
#addInvoice {
    color: #4b2a86;
}
.downloadedDoc {
    color: #4b2a86;
}
.waitingDoc {
    color:#bdbbd0;
}
.main-block{
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-between;
    padding-top: 30px;
}
.tableClicked:hover {
    cursor: pointer;   
}
#tableHeader  {
   text-align: center;
    color: black;
 }
.listeners-form{
    padding-bottom: 30px;
}

.tile-right-item {
   cursor: default;;
   margin:30px;
   width: 100%;
}

.right-hat{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.close-img{
    width: 40px;
    cursor: pointer;
}

.pdf-img-wait, .pdf-img-done, .pdf-img-cancelled, .pdf-img{
    width: 30px;
    cursor:pointer;
}

#pdf-img-wait{
    box-shadow: 0 0 5px rgb(255, 204, 0);
}

#pdf-img-done{
    box-shadow: 0 0 3px rgb(15, 159, 13);
}

#pdf-img-cancelled{
    box-shadow: 0 0 5px rgb(157, 3, 3);
}

.add-img{
    width:30px;
    transform: rotate(45deg);
}

.add-agreement :hover{
    box-shadow: 0 0 8px #4b2a86;
    transition-duration: 0.4s;
    border-radius: 50%;
    cursor: pointer;
}

.close-img:hover {
    transform: rotate(45deg);
    transition-duration: 0.5s;
}

.courses-table, .listeners-table{
   font-size: 14px;
   text-align: center;
   box-shadow: 0 0 3px #000000;
}

.courses-table {
    margin-top: 30px;
    width:100%;
    margin-bottom: 30px;
}

.courses-table tr, .courses-table td, .listeners-table tr, .listeners-table td{
   padding:10px;  
   box-shadow: 0 0 1px black;      
}

.listeners-table tr:hover{
   box-shadow: 0 0 10px #4b2a86;
   cursor: pointer;  
   transition-duration: 0.7s;
}
.table-hat{
    background: linear-gradient(12deg, rgba(75,42,134,1) 0%, rgba(0,0,4,1) 79%);
    color: white;
}
.nav-item {
    color: black;
    text-decoration: none;
}
.active {
    color: #4b2a86;
}

.left-block{
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    padding-right: 50px;
    border-right: 1px solid #4b2a86;
}

.right-block{
    display: flex;
    flex-direction: column;
    width:45%;
}

.tile-glow {
    display: flex;
    justify-content: center;
    width: 140px;
    box-shadow: 0 0 5px #0c0c0c;
    margin-left:20px;
    height:40px;
    align-items: center;
    padding: 5px;
}
.form-inner{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.tile-glow-right {
    display: flex;
    justify-content: center;
    box-shadow: 0 0 5px #0c0c0c;
    height:40px;
    align-items: center;
    padding: 5px;
    width: 200px;
    margin: 0 auto;
}
.tile-glow:hover, .tile-glow-right:hover{
   box-shadow: 0 0 10px #4b2a86;
   transition-duration: 0.3s;
   cursor:pointer;
}
/* basic stylings ------------------------------------------ */
.container{ 
  margin:30px auto 0; 
  display:flex; 
  flex-direction: row;
  background:#FFF;
  padding:10px 0px 0px;
}
.container-right{ 
  margin:30px auto 0px; 
  display:flex; 
  flex-direction: row;
  background:#FFF;
  padding:10px 0px 0px;
}
/* form starting stylings ------------------------------- */
.group 			  { 
  position:relative; 
  margin-bottom:45px; 
  margin-right: 20px;
}
input 				{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:350px;
  border:none;
  border-bottom:1px solid #757575;
}
input:focus 		{ outline:none; }

/* LABEL ======================================= */
label 				 {
  color:#999; 
  font-size:18px;
  font-weight:normal;
  position:absolute;
  pointer-events:none;
  left:5px;
  top:10px;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}

/* active state */
input:focus ~ label, input:valid ~ label, .login-pass 		{
  top:-20px;
  font-size:14px;
  color:#4b2a86;
}

/* BOTTOM BARS ================================= */
.bar 	{ position:relative; display:block; width:35x0px; }
.bar:before, .bar:after 	{
  content:'';
  height:2px; 
  width:0;
  bottom:0px; 
  position:absolute;
  background:#4b2a86; 
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
.bar:before {
  left:50%;
}
.bar:after {
  right:50%; 
}

/* active state */
input:focus ~ .bar:before, input:focus ~ .bar:after {
  width:50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position:absolute;
  height:60%; 
  width:100px; 
  top:25%; 
  left:0;
  pointer-events:none;
  opacity:0.5;
}

/* active state */
input:focus ~ .highlight {
  -webkit-animation:inputHighlighter 0.3s ease;
  -moz-animation:inputHighlighter 0.3s ease;
  animation:inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
	from { background:#7f6f9a; }
  to 	{ width:0; background:transparent; }
}
@-moz-keyframes inputHighlighter {
	from { background:#7f6f9a; }
  to 	{ width:0; background:transparent; }
}
@keyframes inputHighlighter {
	from { background:#7f6f9a; }
  to 	{ width:0; background:transparent; }
}
</style>