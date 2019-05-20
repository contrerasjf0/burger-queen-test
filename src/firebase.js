import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB8EwNaH0lFUEn5mISsh9upNOxndBpN1kg",
    authDomain: "burger-queen-test.firebaseapp.com",
    databaseURL: "https://burger-queen-test.firebaseio.com",
    projectId: "burger-queen-test",
    storageBucket: "burger-queen-test.appspot.com",
    messagingSenderId: "286422359724",
    appId: "1:286422359724:web:d99896dfebc5d3bc"
  };

firebase.initializeApp(firebaseConfig);

export const databaseRef = firebase.database().ref();

export const discountCodeRef = databaseRef.child("DiscountCode");
export const menuRef = databaseRef.child("Menu");
export const orderRef = databaseRef.child("Order");