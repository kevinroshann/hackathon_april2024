import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCd3mcaxi0rpAnWwOz5zOiIbQJj9nMvD5Q",
    authDomain: "medicine-login-test.firebaseapp.com",
    projectId: "medicine-login-test",
    storageBucket: "medicine-login-test.appspot.com",
    messagingSenderId: "28833280866",
    appId: "1:28833280866:web:03b6a047bc1e971341f23b",
    measurementId: "G-9NL70CG030"
  };

  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);
  
  function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in user:", user);
        // Redirect to the main page or handle successful login
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login error:", errorCode, errorMessage);
        alert(errorMessage); // Display error message to user
      });
  }
  
  const registerButton = document.getElementById('registerButton'); // Get the button element
  
  registerButton.addEventListener('click', () => {
    register(); // Call the register function when the button is clicked
  });
  
  function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User registered successfully:", user);
  
        const databaseRef = ref(database, `users/${user.uid}`); // Use template literal for path
        const userData = {
          email: email,
          password: password, // Consider not storing plain text passwords
          lastLogin: Date.now()
        };
  
        set(databaseRef, userData)
          .then(() => {
            console.log("User data saved to database");
            // Handle successful registration (e.g., redirect to login or display a success message)
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
            alert("Registration failed. Please try again."); // Inform user
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Registration error:", errorCode, errorMessage);
        alert(errorMessage); // Display error message to user
      });
  }
  