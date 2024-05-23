const myModal = document.getElementById('myModal');
const close = document.getElementById('close');
const myBtn = document.getElementById('myBtn');
const form = document.getElementsByClassName('form');  
  
  // Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAqUfCGHt7kd7Jm25tv-J5ambgaWrvNlc",
  authDomain: "anonyshare-9a82f.firebaseapp.com",
  projectId: "anonyshare-9a82f",
  storageBucket: "anonyshare-9a82f.appspot.com",
  messagingSenderId: "419222810439",
  appId: "1:419222810439:web:0e105e9b7a6317c02a6662",
  measurementId: "G-4RVT3LZJ7D"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get references to Firebase services
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  
  // DOM elements
  const fileInput = document.getElementById('fileInput');
  const uploadButton = document.getElementById('uploadButton');
  const searchInput = document.getElementById('searchInput');
  const mediaContainer = document.getElementById('mediaContainer');
  
  // Function to upload file to Firebase Storage and store metadata in Firestore
  function uploadFile(file) {
    const storageRef = storage.ref(`uploads/${file.name}`);
    const uploadTask = storageRef.put(file);
  
    uploadTask.on('state_changed',
      (snapshot) => {
        // Track upload progress if needed
      },
      (error) => {
        console.error('Upload error:', error);
      },
      () => {
        // Upload successful, get download URL and store metadata in Firestore
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          firestore.collection('media').add({
            name: file.name,
            type: file.type.startsWith('image/') ? 'image' : 'video',
            url: downloadURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          }).then((docRef) => {
            // Document added successfully
            console.log('Document added with ID:', docRef.id);
            alert("Document Uploaded. Refresh your page")
          }).catch((error) => {
            console.error('Error adding document:', error);
            alert("Error Uploading Document. Try again")
          });
        });
      }
    );
  }
  
  // Function to display media items
  function displayMediaItems(items) {
    mediaContainer.innerHTML = '';
    items.forEach((item) => {
      const mediaItem = document.createElement('div');
      mediaItem.classList.add('mediaItem');
      if (item.type === 'image') {
        mediaItem.innerHTML = `
          <img src="${item.url}" alt="${item.name}" width="150" class="tagline">
        
        `;
      } else if (item.type === 'video') {
        mediaItem.innerHTML = `
          <video controls width="150" class="tagline" controlsList="nodownload">
            <source src="${item.url}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        
        `;
      }
      mediaContainer.appendChild(mediaItem);
    });
  }
  
  // Event listener for upload button
//   uploadButton.addEventListener('click', () => {
    // Simulate file input click
    // const file = e.target.files[0];
    // if (file) {
    //   uploadFile(file);
    // }
    // fileInput.click();
//   });
  
//   Event listener for file input change
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
    myModal.style.display = "none";
  });
  
  // Event listener for search input
//   searchInput.addEventListener('input', (e) => {
//     const searchText = e.target.value.trim().toLowerCase();
//     if (searchText === '') {
//       // Clear search results if search input is empty
//       firestore.collection('media').orderBy('timestamp', 'desc').get().then((querySnapshot) => {
//         const items = [];
//         querySnapshot.forEach((doc) => {
//           items.push(doc.data());
//         });
//         displayMediaItems(items);
//       }).catch((error) => {
//         console.error('Error getting documents:', error);
//       });
//     } else {
//       // Search Firestore for matching documents
//       firestore.collection('media').where('name', '>=', searchText)
//         .orderBy('name').get().then((querySnapshot) => {
//           const items = [];
//           querySnapshot.forEach((doc) => {
//             items.push(doc.data());
//           });
//           displayMediaItems(items);
//         }).catch((error) => {
//           console.error('Error getting documents:', error);
//         });
//     }
//   });
  
  // Initial load: Display all media items
  firestore.collection('media').orderBy('timestamp', 'desc').get().then((querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    displayMediaItems(items);
  }).catch((error) => {
    console.error('Error getting documents:', error);
  });



  

  myModal.style.display = "none";

  myBtn.addEventListener('click', () => {
    myModal.style.display ="block";
  });

  close.addEventListener('click', () => {
    myModal.classList.add('close-modal');

    // form.reset();

    setTimeout(() => {
        myModal.style.display = 'none';
        myModal.classList.add('close-modal'); // Remove the fadeout class for subsequent modals
    }, 2000);

  });

  window.onclick = function(event) {
    if (event.target == myModal) {
      myModal.style.display = "none";
    }
  }


//   scroll js code
ScrollReveal().reveal('.headline')
ScrollReveal().reveal('.tagline', { delay: 1000 })
ScrollReveal().reveal('.punchline', { delay: 2000 })

