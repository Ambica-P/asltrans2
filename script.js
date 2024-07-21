const URL = 'model/'; // URL to the model directory

let model;

async function loadModel() {
    console.log('Loading model...');
    const modelURL = URL + 'model.json';
    model = await tmImage.load(modelURL);
    console.log('Model loaded');
}

async function classifyImage() {
    const imageElement = document.getElementById('uploadedImage');
    if (!imageElement.src) {
        console.log('No image uploaded');
        return;
    }

    console.log('Classifying image...');
    const prediction = await model.predict(imageElement);
    document.getElementById('result').textContent = JSON.stringify(prediction);
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
