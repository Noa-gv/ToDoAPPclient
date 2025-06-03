import axios from './axiosConfig';

const service = {
  async getTasks() {
    try {
      const response = await axios.get('https://todoappserver-m5hw.onrender.com/items');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  },

  async addTask(newTask) {
    try {
      const response = await axios.post('https://todoappserver-m5hw.onrender.com/items', { name: newTask, isComplite: false });
      return response.data;
    } catch (error) {
      console.error("Error adding task:", error);
    }
  },

  async setCompleted(idItems, isComplite) {
    try {
      const response = await axios.put(`https://todoappserver-m5hw.onrender.com/items/${idItems}`, { isComplite });
      return response.data;
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  },

  async deleteTask(idItems) {
    try {
      await axios.delete(`https://todoappserver-m5hw.onrender.com/items/${idItems}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  },

  async getUsers() {
    try {
      const response = await axios.get('https://todoappserver-m5hw.onrender.com/users');
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },

  // פונקציה להוספת משתמש
  async addUser(nameUser, passwordHash) {
    try {
      const response = await axios.post('https://todoappserver-m5hw.onrender.com/users', { nameUser, passwordHash });
      return response.data;
    } catch (error) {
      console.error("Error adding user:", error);
    }
  },

  // פונקציה לעדכון פרטי משתמש
  async updateUser(idusers, userDetails) {
    try {
      const response = await axios.put(`https://todoappserver-m5hw.onrender.com/users/${idusers}`, userDetails);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },

  // פונקציה למחיקת משתמש
  async deleteUser(idusers) {
    try {
      await axios.delete(`https://todoappserver-m5hw.onrender.com/users/${idusers}`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  },
  
  // async signup(nameUser, passwordHash) {
  //   try {
  //     const response = await axios.post('https://todoappserver-m5hw.onrender.com/signup', { nameUser, passwordHash });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error during signup:", error);
  //     throw error;
  //   }
  // },

  // async login(nameUser, passwordHash) {
  //   try {
  //     // בצע בקשת התחברות לשרת
  //     const response = await axios.post('https://todoappserver-m5hw.onrender.com/login', { nameUser, passwordHash });
  //     // נניח שהשרת מחזיר טוקן, אחסון בטוקן ב-localStorage
  //     localStorage.setItem('authToken', response.data.token);
  //   } catch (error) {
  //     throw new Error('Login failed');
  //   }
  // }
};

export default service;
