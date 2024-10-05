
document.addEventListener('DOMContentLoaded', () => {
  const imageMosaicBtn = document.getElementById('image-mosaic-btn');
  const imagesDirBtn = document.getElementById('images-dir-btn');
  const imageOutputBtn = document.getElementById('image-output-btn');

  const processBtn = document.getElementById('process-btn');

  const imageMosaic = document.getElementById('image-mosaic');
  const imagesDir = document.getElementById('images-dir');
  const imageOutput = document.getElementById('image-output');


  const status = document.getElementById('status');

  imagesDirBtn.addEventListener('click', function(evt)  {
    evt.preventDefault();
    window.postMessage({ type: 'select-dir', value: 'images-dir' });
  });


  imageMosaicBtn.addEventListener('click', function(evt)  {
    evt.preventDefault();
    window.postMessage({ type: 'select-file', value: 'image-mosaic' });
  });


  imageOutputBtn.addEventListener('click', function(evt)  {
    evt.preventDefault();
    window.postMessage({ type: 'select-dir', value: 'image-output' });
  });

  processBtn.addEventListener('click', () => {
    const value = {
      imageMosaic: imageMosaic.value,
      imagesDir: imagesDir.value,
      imageOutput: imageOutput.value
    }

    if (!value.imageMosaic || !value.imageOutput || !value.imagesDir) {
      status.textContent = 'Por favor, selecciona ambas carpetas y el archivo.';
      return;
    }
    
    window.postMessage({ type: 'process', value });
    status.textContent = 'Procesando...';
  });


  window.electron.onUpdateButtonText((id, newText) => {
      document.getElementById(id).value = newText;
  });

});