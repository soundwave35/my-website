export default {
  data() {
    return {
      input: '',
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    };
  },
  methods: {
    addTask() {
      if (this.input.length === 0) {
        return
      }

      const push = {
        readonly: true,
        value: this.input
      }

      this.tasks.push(push)

      this.input = ''

      this.saveToLocalStorage()
    },

    updateTask(index, value) {
      if (value.length === 0) {
        return
      }

      this.tasks[index] = {
        value: value,
        readonly: true,
      }

      this.saveToLocalStorage()
    },

    deleteTask(index) {
      this.tasks.splice(index, 1)

      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  },
  template: `
    <header>
      <h1>TO DO LIST</h1>
      
      <form @submit.prevent="addTask" id="new-task-form">
        <input
          v-model="input"
          type="text" 
          id="new-task-input"
          placeholder="What is Your Plan?" />

        <input 
          type="submit"
          id="new-task-submit"
          value="Add task"/>
      </form>
    </header>

    <main>
      <section class="task-list">
        <h2 v-if="tasks.length">Tasks</h2>
        <div id="tasks">
          <div v-for="(task, index) in tasks" :key="index" class="task">
            <div class="content">
              <input v-model="task.value" class="text" type="text" :readonly="task.readonly">
            </div>
            <div class="actions">
              <button v-if="task.readonly" @click="task.readonly = false" class="edit">Edit</button>
              <button v-else @click="updateTask(index, task.value)" class="save">Save</button>
              <button @click="deleteTask(index)" class="delete">Delete</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  `
};
