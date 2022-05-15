<template>
    <div>
        <v-app-bar
            height="70"
            id="navbar"
            app
        >
            <!-- Логотип -->
            <v-img src="/Logo.png" id="logo"></v-img>

            <!-- Разделы -->
            <v-tabs background-color="transparent" color="white" centered>
                <v-tab id="nav-item" to="main">Домашняя страница</v-tab>
                <v-tab id="nav-item" to="profile">Личный кабинет слушателя</v-tab>
                <v-tab id="nav-item" to="tutor">Личный кабинет преподавателя</v-tab>
                <v-tab id="nav-item" to="users">Слушатели</v-tab>
                <v-tab id="nav-item" to="organizations">Организации</v-tab>
            </v-tabs>

            <!-- Кнопка выхода -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        v-bind="attrs"
                        v-on="on"
                        icon
                        @click="$router.push('/')" 
                    > 
                        <v-img src="exit.png" max-width="30"></v-img>
                    </v-btn>
                </template>
                <span>Выход</span>
            </v-tooltip>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    #navbar {
        background: linear-gradient(12deg, rgba(0,0,4,1) 0%, rgba(75,42,134,1) 79%);
        box-shadow: 2px 2px 4px gray;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 5%;
    }
    #nav-item {
        color:white;
        font-size: 14px;
        padding: 0 2%;
    }

    #nav-item:hover {
        background-color:#4b2a86;
    }

    #logo{
        height: 50px;
        width: 100px;
    }
</style>