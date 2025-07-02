import os
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, StackingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from xgboost import XGBRegressor

class PricePredictionModel:
    def __init__(self, data):
        self.data = data
        self.scaler = None
        self.poly = None
        self.feature_columns = None
        self.model = None

    def preprocess_data(self):
        # Keep only the relevant columns
        self.data = self.data[['name', 'area', 'landOptions', 'price']]

        # One-hot encode categorical features
        self.data = pd.get_dummies(self.data, columns=['name', 'landOptions'], drop_first=True)

        # Rename columns to remove any special characters
        self.data.columns = self.data.columns.str.replace('[', '', regex=False).str.replace(']', '', regex=False)

        # Scale and polynomial transform the 'area' feature
        self.scaler = StandardScaler()
        self.data[['area']] = self.scaler.fit_transform(self.data[['area']])
        
        # Initialize polynomial features
        self.poly = PolynomialFeatures(degree=2, include_bias=False)
        area_poly = self.poly.fit_transform(self.data[['area']])
        
        # Convert polynomial features to DataFrame and rename columns
        area_poly_df = pd.DataFrame(area_poly, columns=['area', 'area_squared'], index=self.data.index)
        self.data = pd.concat([self.data.drop(columns=['area']), area_poly_df], axis=1)

        # Save feature column names for alignment in prediction
        self.feature_columns = self.data.drop(['price'], axis=1).columns
        joblib.dump(self.feature_columns, 'feature_columns.joblib')

        # Separate features and target variable
        X = self.data.drop('price', axis=1)
        y = self.data['price']
        
        return train_test_split(X, y, test_size=0.2, random_state=42)

    def train_model(self):
        X_train, X_test, y_train, y_test = self.preprocess_data()

        # Define a stacking model
        self.model = StackingRegressor(
            estimators=[
                ('rf', RandomForestRegressor()),
                ('gb', GradientBoostingRegressor()),
                ('xgb', XGBRegressor(objective='reg:squarederror'))
            ],
            final_estimator=LinearRegression()
        )
        self.model.fit(X_train, y_train)

        # Evaluate the model
        predictions = self.model.predict(X_test)
        mse = mean_squared_error(y_test, predictions)
        r2 = r2_score(y_test, predictions)

        # Save the model, scaler, and polynomial transformer
        joblib.dump(self.model, 'house_price_predictor.joblib')
        joblib.dump(self.scaler, 'scaler_enhanced.joblib')
        joblib.dump(self.poly, 'poly_features.joblib')

    def predict_price(self, features):
        # Convert input features into a DataFrame
        features_df = pd.DataFrame([features])

        # One-hot encode categorical features and align with training features
        features_df = pd.get_dummies(features_df, columns=['name', 'landOptions'], drop_first=True)
        features_df = features_df.reindex(columns=self.feature_columns, fill_value=0)

        # Scale and apply polynomial transformation to 'area'
        features_df[['area']] = self.scaler.transform(features_df[['area']])
        area_poly = self.poly.transform(features_df[['area']])
        features_df[['area', 'area_squared']] = area_poly

        # Predict price
        price_pred = self.model.predict(features_df)
        return price_pred[0]


# ✅ Use a Relative Path for CSV file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Get current script directory
csv_file_path = os.path.join(BASE_DIR, 'cleaned_house_data.csv')  # Ensure CSV is in the same directory

# Load the cleaned dataset
data = pd.read_csv(csv_file_path)

# Train and save the model
price_model = PricePredictionModel(data)
price_model.train_model()

# Predict a sample price
sample_features = {
    "name": "Bungalow",
    "area": 2000,
    "landOptions": "Suburban",
}
predicted_price = price_model.predict_price(sample_features)
print(predicted_price)
