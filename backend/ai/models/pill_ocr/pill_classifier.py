import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import pandas as pd

def load_resnet_model(model_path):
    return load_model(model_path)

def prepare_test_data(test_df, target_size=(128, 128)):
    test_datagen = ImageDataGenerator(rescale=1./255)
    test_generator = test_datagen.flow_from_dataframe(
        test_df,
        x_col='source_image_path',
        y_col='class_labels',
        target_size=target_size,
        batch_size=1,
        class_mode='categorical',
        shuffle=False
    )
    return test_generator

def predict_test_data(model, test_generator, class_labels):
    result = []
    predictions = model.predict(test_generator)
    predicted_classes = np.argmax(predictions, axis=1)
    for i, (filepath, label) in enumerate(zip(test_generator.filenames, predicted_classes)):
        result.append(class_labels[label])
    return result

def classify_pills(model, output_dir, class_labels):
    image_paths = [os.path.join(output_dir, fname) for fname in os.listdir(output_dir) if fname.endswith('.png')]
    test_df = pd.DataFrame({'source_image_path': image_paths, 'class_labels': ['unknown'] * len(image_paths)})
    test_generator = prepare_test_data(test_df)
    return predict_test_data(model, test_generator, class_labels)
