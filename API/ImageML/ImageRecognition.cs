using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Microsoft.ML;
using Microsoft.ML.Data;


namespace ImageML
{
    public class ImageRecognition
    {

        static string _assetsPath;
        //= Path.Combine(Environment.CurrentDirectory, "assets");

        static  string _imagesFolder ;
        static  string _trainTagsTsv  ;
        static  string _testTagsTsv ;
       // static string _predictSingleImage;// = Path.Combine(_imagesFolder, "a2.jpeg");
        static  string _inceptionTensorFlowModel  ;

        public string RecognizePicture(string imageName , string currentFolder)
        {
            DirectoryInfo info = Directory.GetParent(currentFolder);
            _assetsPath = Path.Combine(info.FullName, "assets");
            _imagesFolder = Path.Combine(_assetsPath, "images");
            _trainTagsTsv = Path.Combine(_imagesFolder, "tags.tsv");
            _testTagsTsv = Path.Combine(_imagesFolder, "test-tags.tsv");
            _inceptionTensorFlowModel = Path.Combine(_assetsPath, "inception", "tensorflow_inception_graph.pb");

            MLContext mlContext = new MLContext();
            ITransformer model = GenerateModel(mlContext);
            return ClassifySingleImage(mlContext, model, imageName);
        }

        private struct InceptionSettings
        {
            public const int ImageHeight = 224;
            public const int ImageWidth = 224;
            public const float Mean = 117;
            public const float Scale = 1;
            public const bool ChannelsLast = true;
        }

        private static ITransformer GenerateModel(MLContext mlContext)
        {
            IEstimator<ITransformer> pipeline = mlContext.Transforms.LoadImages(outputColumnName: "input", imageFolder: _imagesFolder, inputColumnName: nameof(ImageData.ImagePath))
               // The image transforms transform the images into the model's expected format.
               .Append(mlContext.Transforms.ResizeImages(outputColumnName: "input", imageWidth: InceptionSettings.ImageWidth, imageHeight: InceptionSettings.ImageHeight, inputColumnName: "input"))
               .Append(mlContext.Transforms.ExtractPixels(outputColumnName: "input", interleavePixelColors: InceptionSettings.ChannelsLast, offsetImage: InceptionSettings.Mean))
                .Append(mlContext.Model.LoadTensorFlowModel(_inceptionTensorFlowModel).
                     ScoreTensorFlowModel(outputColumnNames: new[] { "softmax2_pre_activation" }, inputColumnNames: new[] { "input" }, addBatchDimensionInput: true))
                .Append(mlContext.Transforms.Conversion.MapValueToKey(outputColumnName: "LabelKey", inputColumnName: "Label"))
                .Append(mlContext.MulticlassClassification.Trainers.LbfgsMaximumEntropy(labelColumnName: "LabelKey", featureColumnName: "softmax2_pre_activation"))
                .Append(mlContext.Transforms.Conversion.MapKeyToValue("PredictedLabelValue", "PredictedLabel"))
                .AppendCacheCheckpoint(mlContext);

            IDataView trainingData = mlContext.Data.LoadFromTextFile<ImageData>(path: _trainTagsTsv, hasHeader: false);
            ITransformer model = pipeline.Fit(trainingData);
            IDataView testData = mlContext.Data.LoadFromTextFile<ImageData>(path: _testTagsTsv, hasHeader: false);
            IDataView predictions = model.Transform(testData);

            // Create an IEnumerable for the predictions for displaying results
            IEnumerable<ImagePrediction> imagePredictionData = mlContext.Data.CreateEnumerable<ImagePrediction>(predictions, true);
            DisplayResults(imagePredictionData);

            MulticlassClassificationMetrics metrics =
                     mlContext.MulticlassClassification.Evaluate(predictions,
                            labelColumnName: "LabelKey",
                                    predictedLabelColumnName: "PredictedLabel");

            Console.WriteLine($"LogLoss is: {metrics.LogLoss}");
            Console.WriteLine($"PerClassLogLoss is: {String.Join(" , ", metrics.PerClassLogLoss.Select(c => c.ToString()))}");

            return model;


        }


        private static void DisplayResults(IEnumerable<ImagePrediction> imagePredictionData)
        {
            foreach (ImagePrediction prediction in imagePredictionData)
            {
                Console.WriteLine($"Image: {Path.GetFileName(prediction.ImagePath)} predicted as: {prediction.PredictedLabelValue} with score: {prediction.Score.Max()} ");
            }
        }

        private static string ClassifySingleImage(MLContext mlContext, ITransformer model, string predictSingleImage)
        {
            var imageData = new ImageData()
            {
                ImagePath = predictSingleImage
            };

            // Make prediction function (input = ImageData, output = ImagePrediction)
            var predictor = mlContext.Model.CreatePredictionEngine<ImageData, ImagePrediction>(model);
            var prediction = predictor.Predict(imageData);
            return $"Image: {Path.GetFileName(imageData.ImagePath)} predicted as: {prediction.PredictedLabelValue} with score: {prediction.Score.Max()} ";
        }

        private static IEnumerable<ImageData> ReadFromTsv(string file, string folder)
        {
            return File.ReadAllLines(file)
                    .Select(line => line.Split('\t'))
                         .Select(line => new ImageData()
                         {
                             ImagePath = Path.Combine(folder, line[0])
                         });
        }
    }


    public class ImageData
    {
        [LoadColumn(0)]
        public string ImagePath;

        [LoadColumn(1)]
        public string Label;
    }

    public class ImagePrediction : ImageData
    {
        public float[] Score;

        public string PredictedLabelValue;
    }
}
