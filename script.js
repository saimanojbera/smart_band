document.addEventListener("DOMContentLoaded", () => {
    const imageList = [
        'images/image1.jpg',
        'images/image2.jpg',
        'images/image3.jpg',
        'images/image4.jpg',
        'images/image5.jpg',
        'images/image6.jpg',
        'images/image7.jpg',
        'images/image8.jpg',
        'images/image9.jpg',
        'images/image10.jpg'
    ];
    let tapCount = 0;
    const imageElement = document.getElementById('image');
    const messageElement = document.getElementById('message');

    if ('NDEFReader' in window) {
        const nfcReader = new NDEFReader();

        async function startNFC() {
            try {
                await nfcReader.scan();
                nfcReader.onreading = event => {
                    if (tapCount < imageList.length) {
                        imageElement.src = imageList[tapCount];
                        messageElement.textContent = `Image ${tapCount + 1} displayed.`;
                        tapCount++;
                    } else {
                        tapCount = 0;
                        imageElement.src = imageList[tapCount];
                        messageElement.textContent = `Image ${tapCount + 1} displayed.`;
                    }
                };
            } catch (error) {
                console.error('Error reading NFC tag:', error);
                messageElement.textContent = 'Error reading NFC tag.';
            }
        }

        startNFC();
    } else {
        console.error('Web NFC is not supported on this browser.');
        messageElement.textContent = 'Web NFC is not supported on this browser.';
    }
});
