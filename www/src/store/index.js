import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'

let api = axios.create({
    //   baseURL: '//zen-kanban.herokuapp.com/api/',
    baseURL: '//localhost:3000',
    timeout: 200000,
    withCredentials: true
})

let auth = axios.create({
    //   baseURL: '//zen-kanban.herokuapp.com/',
    baseURL: 'localhost:3000',
    timeout: 200000,
    withCredentials: true
})
vue.use(vuex)

var store = new vuex.Store({
    state: {
        user: {},
        preferredName: '',
        tasks: {},
        error: {},
        registered: false,
        loggedIn: null
    },
    mutations: {
        setTasks(state, data) {
            state.boards = data
        },
        setRegistered(state, data) {
            state.registered = true
        },
        setLoggedIn(state, value) {
            state.loggedIn = value;
        },
        setUser(state, user) {
            state.user = user;
            state.preferredName = user.name;
        },
        changePreferredName(state, name){
            debugger
            state.preferredName = name;
        },
        handleError(state, err) {
            state.error = err
        },
    },
    actions: {
        //when writing your auth routes (login, logout, register) be sure to use auth instead of api for the posts

        changePreferredName({commit, dispatch}, name) {
            commit('changePreferredName', name)
        },
        registerUser({ commit, dispatch }, newUser) {
            auth.post('/register', newUser)
                .then(res => {
                    commit('setRegistered')
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        login({ commit, dispatch }, credentials) {
            auth.post('/login', credentials)
                .then(res => {
                    commit('setLoggedIn', true)
                    commit('setUser', res.data.data)
                }).catch(err => {
                    commit('handleError', err)
                    commit('setLoggedIn', false)
                })
        },

        logout({ commit, dispatch }, credentials) {
            auth.delete('/logout')
                .then(res => {
                    console.log(res.message)
                    commit('setLoggedIn', false)
                }).catch(err => {
                    commit('handleError', err)
                })
        },

        authenticate({ commit, dispatch }) {
            auth('/authenticate')
                .then(res => {
                    if (res.data.data._id) {
                        console.log('Ready to commit!')
                        commit('setLoggedIn', true)
                        commit('setUser', res.data.data)
                        commit('setUser', res.data.data)
                    } else {
                        commit('setLoggedIn', false)
                        console.log('No session found!')
                    }
                }).catch(err => {
                    commit('handleError', err)
                    commit('setLoggedIn', false)
                })
        },

        // Task Stuff:
        getTasks({ commit, dispatch }, id) {
            api('tasks/') // created this in custom-routes/board-routes.js under boardLists
                .then(res => {
                    // console.log(res)
                    commit('setTasks', res.data.data)
                    // list.listId = list._id
                    // dispatch('getListTasks', list)
                })
                .catch(err => {
                    commit('handleError', err)
                })

        },
        addTask({ commit, dispatch }, list) {
            console.log(list)
            api.post('lists/', list)
                .then(res => {
                    console.log("came back with response after adding List")
                    dispatch('getLists', list.boardId)
                }).catch(err => {
                    console.log('failed to add list')
                    commit('handleError', err)
                })
        },
        deleteTask({ commit, dispatch }, taskId) {
            api.delete('tasks/' + taskId)
                .then(res => {
                    dispatch('getTasks', res.data.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        // Task Stuff
        getListTasks({ commit, dispatch }, data) {
            console.log(data.listId)
            api('boards/' + data.boardId + '/lists/' + data.listId + '/tasks')
                .then(res => {
                    res.data.listId = data.listId
                    commit('setListTasks', res.data) // check this
                })
                .catch(err => {
                    console.log('getLIstTasks failed')
                    commit('handleError', err)
                })
        },
        addTask({ commit, dispatch }, newTask) {
            if (newTask.name != '') {
                api.post('tasks/', newTask)
                    .then(res => {
                        // console.log(newTask)
                        dispatch('getListTasks', newTask)
                    })
            }
        },

        handleError({ commit, dispatch }, err) {
            commit('handleError', err)
        }
    } // end of actions

})


export default store