<template>
  <div>    
        <div class="main-block">
            <div class="left-block">
                 <h1> Организации </h1>
                 <v-data-table
                    v-if="organizations"
                    :search="search"
                    :headers="headers"
                    :items="organizations.rows"
                    @click:row="showOrganization"
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
                    <img @click="hideOrganization()" v-if="!newIsShow" src="/XXX.png" class="close-img"/> 
                </div>
                <div  v-if="newIsShow">
                    <!-- добавление организации-->
                <form> 
                    <div class="container-right"> 
                        <div class="group">      
                            <input type="text" required style="width:210px" v-model="newName">
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Название организации</label>
                        </div> 
                        <div class="group">      
                            <input type="text" required style="width:300px" v-model="newDirector">
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Руководитель</label>
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
                    <div class="tile-glow-right" style="font-size:15px;" @click="addNewOrganization">   
                        Добавить организацию
                    </div>
                </form>
                </div>
                <!-- Изменение данных организации -->
                <div v-if="!newIsShow" v-key="currentId">
                    
                    <form class="listeners-form"> 
                        <div class="container-right"> 
                            <div class="group">      
                                <input type="text" required style="width:210px" v-model="currentName">
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Название организации</label>
                            </div> 
                            <div class="group">      
                                <input type="text" required style="width:300px" v-model="currentDirector">
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label>Руководитель</label>
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
                        <div class="tile-glow-right"  style="font-size:15px;" @click="editOrganization">   
                            Изменить данные
                        </div>
                    </form>
                </div>
                </div>
            </div>    
        </div>
</template>

<script>
export default {
    data() {
        return {
            selected: [],
            organizations: null,
            errors: null,
            headers: [
                { text: 'Название организации', value: 'name', align: 'center' },
                { text: 'Руководитель', value: 'director', align: 'center' },
                { text: 'Телефон', value: 'phone', align: 'center' },
            ],
            search: '',
            rightHeader: 'Добавление организации',
            newName: '',
            newDirector: '',
            newPhone: '',
            newEmail: '',
            currentId: -1,
            currentName: '',
            currentDirector: '',
            currentPhone: '',
            currentEmail: '',
            newIsShow: true,
        }
    },
     methods: {
        getOrganizations: function () {
            let fullURL = '/organizations/getOrganizations'

            this.axios.get(fullURL)
            .then((responce) => {
              this.organizations = responce.data;
            })
            .catch((error) => {
              this.errors = error.data.detail
            })
        },
        editOrganization () {
            let fullURL = '/organizations/editOrganization'
            this.axios.post(fullURL, {
              id: this.currentId,  
              name: this.currentName,
              director: this.currentDirector,
              phone: this.currentPhone,
              email: this.currentEmail,
            })
            .then((responce) => {
              this.results = responce.data;
              this.getOrganizations();
            })
            .catch((error) => {
              this.errors = error.data.detail
            })            
        },
        showOrganization (list) {
            this.currentId = list.id;
            this.currentName = list.name;
            this.currentDirector = list.director;
            this.currentPhone = list.phone;
            this.currentEmail = list.email;
            this.newIsShow = false;
            this.rightHeader = 'Данные об организации';
        },
        hideOrganization () {
            this.newIsShow = true;
            this.rightHeader = 'Добавление организации';
        },
        addNewOrganization: function () {
            let fullURL = '/organizations/addOrganization'
            
            this.axios.post(fullURL, {

              name: this.newName,
              director: this.newDirector,
              phone: this.newPhone,
              email: this.newEmail,
            })
            .then((responce) => {
              this.results = responce.data;
              this.getOrganizations();
              this.newName = '';
              this.newDirector = '';
              this.newPhone = '';
              this.newEmail = ''
            })
            .catch((error) => {
              this.errors = error.data.detail
            })            
        },
    },
    computed: {
    },
    mounted () {
      this.getOrganizations()
    }
}
</script>

<style scoped>
h1{
    font-size: 30px;
}
.downloadedDoc {
   color: #2f1a54;
}
.docsStatus0{
    padding-top: 40px;
    padding-bottom: 15px;
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
    color: #2f1a54;
    padding-right: 25px;
}
#addInvoice {
    color: #2f1a54;
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