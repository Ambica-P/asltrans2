const URL = 'model/'; // Ensure this path is correct

let model;

async function loadModel() {
    console.log('Loading model...');
    try {
        const modelURL = URL + 'model.json';
        model = await tmImage.load(modelURL);
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Error loading model:', error);
        document.getElementById('result').textContent = 'Failed to load model. Check the console for details.';
    }
}

async function classifyImage() {
    const imageElement = document.getElementById('uploadedImage');
    if (!imageElement.src) {
        console.log('No image uploaded');
        return;
    }

    if (!model) {
        console.log('Model not loaded');
        return;
    }

    console.log('Classifying image...');
    try {
        const prediction = await model.predict(imageElement);
        document.getElementById('result').textContent = JSON.stringify(prediction);
    } catch (error) {
        console.error('Error during prediction:', error);
        document.getElementById('result').textContent = 'Failed to classify image. Check the console for details.';
    }
}

window.onload = () => {
    loadModel();

    document.getElementById('imageUpload').addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('uploadedImage').src = e.target.result;
            document.getElementById('uploadedImage').style.display = 'block';
        };
        reader.readAsDataURL(file);
    });

    document.getElementById('classifyButton').addEventListener('click', classifyImage);
};
